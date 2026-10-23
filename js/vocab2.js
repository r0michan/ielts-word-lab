/* 単語学習の作り直し：
   - 単語カードはやめ、クイズに一本化。答えられなかった単語（不正解・「わからない」）は「苦手リスト」に入り、
     苦手リストからの出題で2回続けて正解すると卒業。1回分の間違いだけをすぐ解き直すこともできる。
   - 例文には日本語訳（data/exja_*.js）と、見出し語とセットで使う語（前置詞・to・that など）のつながりを色と線で表示。
   - 音声は再生ボタンを押したときだけ。 */
(() => {
  const css = `
  .exbox{display:flex;flex-direction:column;gap:6px;background:var(--sunk);border-radius:14px;padding:10px 12px}
  .exen{font-family:var(--f-word);font-size:18px;line-height:2.1}
  .exen .tw{background:color-mix(in srgb,var(--accent) 22%,transparent);color:var(--ink);border-radius:6px;padding:1px 4px;font-weight:800}
  .exen .chunk{border-bottom:3px solid var(--c3);padding-bottom:1px;position:relative}
  .exen .lk{color:var(--c3);font-weight:800;position:relative;display:inline-block;line-height:1.4}
  .exen .lk::before{content:"セット";position:absolute;left:50%;top:-1.25em;transform:translateX(-50%);white-space:nowrap;font-family:var(--f-ui);font-size:9.5px;font-weight:900;color:#fff;background:var(--c3);border-radius:5px;padding:0 4px;line-height:1.5;letter-spacing:.04em}
  .exja{font-size:14px;line-height:1.6}
  .exja b{color:var(--muted);font-weight:800;margin-right:4px}
  .expat{font-size:13px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .expat .pp{font-family:var(--f-word);font-weight:800;border:1.5px solid var(--c3);color:var(--c3);border-radius:999px;padding:0 9px}
  .exgl{display:flex;gap:5px;flex-wrap:wrap}
  .exgl span{font-size:12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:1px 7px}
  .exgl span i{font-style:normal;font-family:var(--f-word);font-weight:800;margin-right:4px}
  .missbox{display:flex;flex-direction:column;gap:10px;border:2px solid var(--bad);background:color-mix(in srgb,var(--bad) 6%,var(--surface));border-radius:18px;padding:14px 16px}
  .missbox.zero{border-color:var(--line);background:var(--surface)}
  .misspills{display:flex;gap:6px;flex-wrap:wrap;max-height:120px;overflow:auto}
  .misspills span{font-size:12.5px;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:2px 9px}
  .misspills span b{font-family:var(--f-word)}
  .qskip{color:var(--muted)}
  .qres{display:flex;flex-direction:column;gap:6px}
  .qres .r{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:start;border-bottom:1px dashed var(--line);padding:6px 0}
  .qres .r .m{font-weight:900;width:22px;text-align:center}
  .qres .r.ok .m{color:var(--good)} .qres .r.ng .m{color:var(--bad)} .qres .r.sk .m{color:var(--muted)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  S.miss = S.miss || {};
  const GRAD = 2;   // 苦手リストから連続で正解すると卒業する回数

  /* ---------- example sentence: translation + linked pattern + word gloss ---------- */
  const LINKS = new Set(['of', 'to', 'for', 'with', 'on', 'in', 'at', 'about', 'from', 'into', 'onto', 'up', 'out', 'off', 'down', 'over', 'by', 'as', 'against', 'towards', 'toward', 'through', 'back', 'away', 'that', 'between', 'among', 'upon', 'without']);
  const STOP = new Set('a an the i you he she it we they me him her us them my your his its our their this that these those is am are was were be been being do does did have has had will would can could shall should may might must not no and or but if so to of in on at for with from by as than then there here what which who whom whose when where why how all some any very too also just only more most much many'.split(' '));
  const VERBS = new Set('be do go get make take see come give find think know say tell help keep pay buy eat play work study learn live leave meet stay start stop try use win visit become change improve finish travel spend save avoid protect reduce'.split(' '));
  const clean = t => t.toLowerCase().replace(/[’‘]/g, "'").replace(/^[^a-z']+|[^a-z']+$/g, '');
  let gIndex = null;
  function glossIndex() {
    if (gIndex) return gIndex;
    gIndex = new Map();
    WORDS.forEach(w => { if (!/\s/.test(w.w)) forms(w.w).forEach(f => { if (!gIndex.has(f)) gIndex.set(f, w); }); });
    return gIndex;
  }
  const shortJa = ja => String(ja || '').split(/[・、,;／/]/)[0].trim();
  function findTarget(toks, w) {
    const parts = w.w.toLowerCase().split(/\s+/), fs = forms(parts[0]);
    for (let i = 0; i < toks.length; i++) {
      const c = key(clean(toks[i]));
      const hit = fs.has(c) || (c.length > 3 && parts[0].length > 3 && c.slice(0, 4) === key(parts[0]).slice(0, 4) && sim(c, key(parts[0])) >= .6);
      if (!hit) continue;
      if (parts.length === 1) return [i, i];
      // phrase: the remaining words must follow (allowing one word in between, e.g. "look it up")
      let j = i, ok = true;
      for (const p of parts.slice(1)) { const k = toks.slice(j + 1, j + 3).findIndex(t => clean(t) === p); if (k < 0) { ok = false; break; } j = j + 1 + k; }
      if (ok) return [i, j];
    }
    return null;
  }
  function exHtml(w, opt = {}) {
    if (!w?.ex) return '';
    const toks = w.ex.split(/\s+/), tg = findTarget(toks, w);
    let link = -1;
    if (tg && !/\s/.test(w.w)) {
      // the word right after (or after one adverb / object pronoun) that belongs with the headword
      for (let k = tg[1] + 1; k <= Math.min(tg[1] + 2, toks.length - 1); k++) {
        const c = clean(toks[k]);
        if (LINKS.has(c)) { if (!(c === 'to' && w.pos === 'n' && k > tg[1] + 1)) link = k; break; }
        if (!(/ly$/.test(c) || ['me', 'him', 'her', 'us', 'them', 'it', 'not', 'yourself', 'myself', 'himself', 'herself', 'themselves'].includes(c))) break;
        if (/[,.;:!?]$/.test(toks[k])) break;
      }
    }
    const html = toks.map((t, i) => {
      let s = esc(t);
      if (tg && i >= tg[0] && i <= tg[1]) s = `<span class="tw">${s}</span>`;
      if (i === link) s = `<span class="lk">${s}</span>`;
      if (link > 0 && i === tg[0]) s = `<span class="chunk">${s}`;
      if (link > 0 && i === link) s = `${s}</span>`;
      return s;
    }).join(' ');
    const ja = window.EXJA?.[w.id];
    const after = link > 0 ? clean(toks[link]) : '';
    const idx = glossIndex(), nx = clean(toks[link + 1] || ''), nxw = idx.get(key(nx));
    const toVerb = after === 'to' && (VERBS.has(nx) || (nxw && /^v/.test(nxw.pos) && nxw.w.toLowerCase() === nx));
    const pat = link > 0 ? `<div class="expat"><span class="pp">${esc(w.w)} ${after === 'that' ? 'that ＋ 文' : toVerb ? 'to ＋ 動詞の原形' : `${esc(after)} ＋ 名詞`}</span><span class="small muted">${after === 'that' ? 'that の後ろに「主語＋動詞」の文が続く形でセット' : toVerb ? '後ろに「to ＋ 動詞の原形」が続く形でセット' : `「${esc(after)}」とセットで覚えると、穴埋め・前置詞問題で迷いません`}</span></div>` : '';
    // gloss for the other content words, so the sentence can be understood even without a full translation
    const seen = new Set([w.id]);
    const gl = toks.map(clean).filter(c => c && !STOP.has(c)).map(c => idx.get(key(c))).filter(x => x && !seen.has(x.id) && seen.add(x.id)).slice(0, opt.full ? 8 : 5);
    return `<div class="exbox">
      <div class="exen">${html}</div>
      ${ja ? `<div class="exja"><b>訳</b>${esc(ja)}</div>` : ''}
      ${pat}
      ${gl.length && (opt.full || !ja) ? `<div class="exgl">${gl.map(x => `<span><i>${esc(x.w)}</i>${esc(shortJa(x.ja))}</span>`).join('')}</div>` : ''}
      <div class="row">${sayBtn(w.ex, '例文を聞く')}</div>
    </div>`;
  }
  window.EX_HTML = exHtml;

  /* ---------- the miss list ---------- */
  const missWords = () => Object.keys(S.miss).map(id => WORDS.find(w => w.id === id)).filter(Boolean);
  function markMiss(w) { const m = S.miss[w.id] || {n: 0}; S.miss[w.id] = {n: m.n + 1, ok: 0, at: Date.now()}; }
  function markHit(w, fromMiss) {
    const m = S.miss[w.id]; if (!m) return false;
    if (!fromMiss) return false;
    m.ok = (m.ok || 0) + 1;
    if (m.ok >= GRAD) { delete S.miss[w.id]; return true; }
    return false;
  }

  /* ---------- quiz ---------- */
  startQuiz = function (mode, opt = {}) {
    const src = opt.pool || ui.quizPool || filtered();
    if (!src.length) { ui.quiz = {error: '出題できる単語がありません。レベルの選択を増やしてください。'}; return render(); }
    const all = filtered().length >= 8 ? filtered() : WORDS;
    const weight = w => { const p = peek(w.id); return (S.miss[w.id] ? 3 : 0) + (p?.qw || 0) * 2 + (!p || p.due <= Date.now() ? 1 : 0) + Math.random() * 2; };
    const picks = opt.keepOrder ? src.slice(0, 20) : shuffle(src).slice(0, 400).sort((a, b) => weight(b) - weight(a)).slice(0, 10);
    const qs = picks.map(w => {
      const same = all.filter(x => x.id !== w.id && x.lv === w.lv && x.ja !== w.ja && x.w !== w.w);
      const others = shuffle(same.length >= 3 ? same : WORDS.filter(x => x.id !== w.id && x.ja !== w.ja)).slice(0, 3);
      return {w, opts: shuffle([w, ...others]), pick: null, typed: ''};
    });
    ui.quiz = {mode, qs, i: 0, score: 0, done: false, src: opt.src || (ui.quizPool ? 'pool' : 'all')};
    render(); scrollTo(0, 0);
  };
  const prevAnswer = answerQuiz;
  answerQuiz = function (correct) {
    const z = ui.quiz, q = z.qs[z.i];
    if (correct) { const grad = markHit(q.w, z.src === 'miss'); if (grad) q.graduated = true; }
    else markMiss(q.w);
    return prevAnswer.apply(this, arguments);
  };

  function menu() {
    const mw = missWords(), poolNote = ui.quizPool ? `<div class="confirm" style="background:var(--accent-soft)">${ui.quizPoolLabel || '間違いノートの単語'}（${ui.quizPool.length}語）から出題します。<button class="btn" data-act="qpoolclear">通常の出題に戻す</button></div>` : '';
    const worst = [...mw].sort((a, b) => S.miss[b.id].n - S.miss[a.id].n);
    return `${poolNote}
      <section class="missbox ${mw.length ? '' : 'zero'}">
        <div class="row" style="justify-content:space-between"><b style="font-size:16px">苦手リスト ${mw.length} 語</b><span class="small muted">${GRAD}回続けて正解で卒業</span></div>
        ${mw.length ? `<div class="misspills">${worst.slice(0, 40).map(w => `<span><b>${esc(w.w)}</b> ${esc(shortJa(w.ja))}${S.miss[w.id].n > 1 ? ` ×${S.miss[w.id].n}` : ''}</span>`).join('')}${mw.length > 40 ? `<span>ほか ${mw.length - 40} 語</span>` : ''}</div>
          <div class="row"><button class="btn primary" data-act="qmiss" data-mode="meaning">苦手リストを復習（意味）</button><button class="btn" data-act="qmiss" data-mode="reverse">英単語で復習</button><button class="btn" data-act="qmiss" data-mode="dictation">つづりで復習</button></div>`
        : `<span class="small">クイズで間違えた単語・「わからない」を押した単語がここにたまります。ここから解き直して、苦手をなくしていきましょう。</span>`}
      </section>
      ${ui.quiz?.error ? `<p class="err">${ui.quiz.error}</p>` : ''}
      <b style="margin-top:6px">新しくクイズを解く</b>
      <div class="modes">${Object.entries(QMODES).map(([k, m]) => `<button class="mode" data-act="quiz" data-mode="${k}"><b>${m.name}</b><span class="muted small">${m.d}</span></button>`).join('')}</div>
      <p class="note">現在のフィルター（${filtered().length}語）から、まだ覚えていない・間違えやすい単語を優先して10問出題します。わからないときは「わからない」でとばすと、苦手リストに入ります。</p>`;
  }
  function results(z) {
    const wrong = z.qs.filter(q => !q.correct), grads = z.qs.filter(q => q.graduated).length;
    return `<div class="sheet panel" style="gap:12px">
      <h2>${z.score} / ${z.qs.length} 問正解</h2>
      ${grads ? `<div class="banner up">苦手リストから ${grads} 語が卒業しました</div>` : ''}
      <div class="qres">${z.qs.map(q => `<div class="r ${q.correct ? 'ok' : q.skipped ? 'sk' : 'ng'}"><span class="m">${q.correct ? '○' : q.skipped ? '–' : '×'}</span><span><b class="ex" style="font-size:16px">${esc(q.w.w)}</b> ${esc(q.w.ja)}${q.skipped ? ' <span class="small muted">（わからない）</span>' : ''}</span></div>`).join('')}</div>
      <div class="row">
        ${wrong.length ? `<button class="btn primary" data-act="qretry">間違えた ${wrong.length} 語だけもう一度</button>` : ''}
        ${missWords().length ? `<button class="btn ${wrong.length ? '' : 'primary'}" data-act="qmiss" data-mode="${z.mode}">苦手リスト（${missWords().length}語）を復習</button>` : ''}
        <button class="btn" data-act="quiz" data-mode="${z.mode}">新しい10問</button><button class="btn ghost" data-act="quizmenu">メニュー</button>
      </div></div>`;
  }
  vQuiz = function () {
    const z = ui.quiz;
    if (!z || z.error) return menu();
    if (z.done) return results(z);
    const q = z.qs[z.i], answered = q.pick !== null;
    let prompt = '', body = '';
    if (z.mode === 'meaning') prompt = `<div class="hw">${esc(q.w.w)}</div>${q.w.ipa ? `<div class="ipa">/${esc(q.w.ipa)}/</div>` : ''}<div class="row">${sayBtn(q.w.w)}</div>`;
    if (z.mode === 'reverse') prompt = `<div class="ja">${esc(q.w.ja)}</div><div class="muted small">${POS[q.w.pos] || ''}</div>`;
    if (z.mode === 'listen' || z.mode === 'dictation') prompt = `<div class="row">${sayBtn(q.w.w, '聞く')}${sayBtn(q.w.w, 'ゆっくり', true)}</div>${z.mode === 'dictation' ? `<div class="small muted">ヒント：${esc(q.w.ja)}</div>` : ''}`;
    if (z.mode === 'dictation') {
      body = `<form class="row" data-form="dict"><input type="text" id="dict" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(q.typed)}" ${answered ? 'disabled' : ''} style="flex:1;min-width:0;font-family:var(--f-word);font-size:20px" aria-label="聞こえた単語"><button class="btn primary" ${answered ? 'disabled' : ''}>答える</button></form>
        ${answered ? `<p class="${q.correct ? '' : 'err'}">${q.correct ? '正解' : '正解は'} <b class="ex">${esc(q.w.w)}</b> — ${esc(q.w.ja)}</p>` : ''}`;
    } else {
      const en = z.mode !== 'meaning';
      body = `<div class="opts">${q.opts.map((o, i) => {
        let cls = 'opt' + (en ? ' en' : '');
        if (answered && o.id === q.w.id) cls += ' ok'; else if (answered && i === q.pick) cls += ' ng';
        return `<button class="${cls}" data-act="answer" data-i="${i}" ${answered ? 'disabled' : ''}>${esc(en ? o.w : o.ja)}</button>`; }).join('')}</div>`;
    }
    const fb = answered ? `<div class="panel" style="gap:8px">
        <b class="${q.correct ? 'up' : 'dn'}">${q.correct ? (q.graduated ? '正解！ 苦手リストから卒業 🎓' : '正解！') : q.skipped ? '答えを確認しましょう（苦手リストに追加）' : '不正解（苦手リストに追加）'}</b>
        <div><b class="ex" style="font-size:20px">${esc(q.w.w)}</b> <span class="small muted">${POS[q.w.pos] || ''}</span>　${esc(q.w.ja)}</div>
        ${exHtml(q.w)}</div>` : '';
    return `<div class="sheet panel">
      <div class="qhead"><span class="small muted">${z.src === 'miss' ? '苦手リスト · ' : z.src === 'retry' ? '解き直し · ' : ''}${QMODES[z.mode].name} · ${z.i + 1} / ${z.qs.length}</span><div class="meter"><i style="width:${(z.i + (answered ? 1 : 0)) / z.qs.length * 100}%"></i></div>${lvChip(q.w.lv)}</div>
      ${prompt}${body}${fb}
      <div class="row">${answered ? `<button class="btn primary" data-act="qnext">${z.i + 1 < z.qs.length ? '次へ' : '結果を見る'} <kbd>Enter</kbd></button>` : `<button class="btn ghost qskip" data-act="qskip">わからない（とばす） <kbd>0</kbd></button>`}<button class="btn ghost" data-act="quizmenu">やめる</button></div>
    </div>`;
  };

  Object.assign(ACT, {
    qskip: () => { const z = ui.quiz, q = z?.qs[z.i]; if (!q || q.pick !== null) return; q.pick = -1; q.skipped = true; answerQuiz(false); },
    qmiss: x => { const mw = missWords(); if (!mw.length) return; ui.quizPool = null; startQuiz(x.mode || 'meaning', {pool: mw, src: 'miss'}); },
    qretry: () => { const z = ui.quiz, wrong = z.qs.filter(q => !q.correct).map(q => q.w); startQuiz(z.mode, {pool: shuffle(wrong), keepOrder: true, src: z.src === 'miss' ? 'miss' : 'retry'}); },
    // no automatic audio: the learner presses 聞く
    qnext: () => { const z = ui.quiz; if (z.i + 1 >= z.qs.length) { z.done = true; render(); scrollTo(0, 0); return; } z.i++; render(); if (z.mode === 'dictation') setTimeout(() => $('#dict')?.focus(), 0); },
  });
  // dictation answers: the original handler compares spelling; keep it, but route a "skip" through 0
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,textarea,select') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (S.tab === 'quiz' && ui.quiz && !ui.quiz.done && !ui.quiz.error && e.key === '0') ACT.qskip();
  });

  /* ---------- 単語カード → クイズに一本化 ---------- */
  const prevTab = ACT.tab;
  ACT.tab = x => prevTab(x && x.tab === 'card' ? {...x, tab: 'quiz'} : x);
  if (S.tab === 'card') S.tab = 'quiz';
  vCard = function () { S.tab = 'quiz'; return vQuiz(); };

  // 単語帳でも例文をわかりやすく表示
  window.EX_FOR = id => exHtml(WORDS.find(w => w.id === id), {full: true});
  render();
})();
