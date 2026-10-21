/* シチュエーション会話：旅行・海外生活・仕事・人づきあい・トラブルの場面を「会話を見る → ロールプレイ → フレーズ」で練習。
   音声は再生ボタンを押したときだけ（自動再生しない）。ロールプレイはマイク（音声認識）か入力で自分のセリフを言う。 */
(() => {
  const css = `
  .sitlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}
  .sitcard{display:flex;flex-direction:column;gap:4px;background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:14px 16px;text-align:left;cursor:pointer;box-shadow:var(--shadow)}
  .sitcard:hover{border-color:var(--accent)}
  .sitcard b{font-size:15.5px}
  .sitcard .pl{font-family:var(--f-word);font-size:12.5px;color:var(--muted)}
  .sitcard .gl{font-size:12.5px;color:var(--muted)}
  .sitcard.done{border-color:color-mix(in srgb,var(--good) 60%,var(--line))}
  .chat{display:flex;flex-direction:column;gap:10px}
  .bub{max-width:88%;border-radius:18px;padding:10px 14px;display:flex;gap:8px;align-items:flex-start}
  .bub.a{align-self:flex-start;background:var(--sunk);border-bottom-left-radius:6px}
  .bub.y{align-self:flex-end;background:var(--accent-soft);border-bottom-right-radius:6px}
  .bub .who{font-size:11px;font-weight:900;color:var(--muted);display:block}
  .bub .en{font-family:var(--f-word);font-size:16.5px;line-height:1.5}
  .bub .jp{display:block;font-size:13px;color:var(--muted);margin-top:2px}
  .bub .pb{border:0;background:none;padding:2px;cursor:pointer;color:var(--muted);flex:none}
  .bub .pb svg{width:18px;height:18px}
  .bub.hide .en{color:transparent;background:var(--line);border-radius:6px;user-select:none}
  .rpbox{border:1.5px dashed var(--accent);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px}
  .tipbox{background:var(--warn-soft);border-radius:16px;padding:12px 14px;font-size:13.5px;line-height:1.75}
  .phr{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;padding:10px 0;border-bottom:1px solid var(--line);align-items:start}
  .phr .en{font-family:var(--f-word);font-size:16px;font-weight:700}
  .phr .alt{font-family:var(--f-word);font-size:13.5px;color:var(--muted)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const SIT = window.SITUATIONS || [];
  const CATS = [['all', 'すべて'], ['travel', '旅行'], ['life', '住まい・生活'], ['work', '仕事'], ['social', '人づきあい'], ['trouble', 'トラブル・緊急']];
  S.situ = S.situ || {};
  ui.st = {cat: 'all', id: null, mode: 'talk', showJa: true, k: 0, res: {}, sp: {busy: false, rec: null, err: '', audio: null}, quiz: null};
  const cur = () => SIT.find(s => s.id === ui.st.id);
  const playBtn = (text, slow) => `<button class="pb" data-act="say" data-text="${esc(text)}"${slow ? ' data-slow="1"' : ''} aria-label="再生">${slow ? ICON.slow : ICON.speak}</button>`;

  // play the whole dialogue only when asked: queue utterances one by one
  function playAll(lines) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    lines.forEach(([, en]) => { const u = new SpeechSynthesisUtterance(en); const v = pickVoice(); if (v) u.voice = v; u.lang = v ? v.lang : S.settings.accent; u.rate = S.settings.rate; speechSynthesis.speak(u); });
  }

  function listView() {
    const q = (ui.st.q || '').trim().toLowerCase(), hit = s => !q || [s.title, s.place, s.goal, ...s.lines.map(l => l[1] + l[2]), ...s.phrases.map(p => p[0] + p[1])].join(' ').toLowerCase().includes(q);
    const list = SIT.filter(s => (ui.st.cat === 'all' || s.cat === ui.st.cat) && hit(s)), done = SIT.filter(s => S.situ[s.id]?.done).length;
    return `<p class="lead">実際の旅行や海外生活でそのまま使える会話を、場面ごとに練習します。会話を聞いて → 自分の役を言ってみて → 言い換えフレーズを覚える、の順がおすすめ。</p>
      <div class="seg" role="group">${CATS.map(([k, v]) => `<button data-act="stcat" data-k="${k}" aria-pressed="${ui.st.cat === k}">${v}（${k === 'all' ? SIT.length : SIT.filter(s => s.cat === k).length}）</button>`).join('')}</div>
      <input type="search" id="stsearch" placeholder="場面や表現で検索（例：病院、refund、予約）" value="${esc(ui.st.q || '')}" aria-label="場面を検索">
      <div class="row" style="justify-content:space-between"><b>${list.length}場面</b><span class="small muted">ロールプレイ完了 ${done} / ${SIT.length}</span></div>
      <div class="sitlist">${list.map(s => `<button class="sitcard ${S.situ[s.id]?.done ? 'done' : ''}" data-act="stopen" data-id="${s.id}">
        <span class="row" style="justify-content:space-between;width:100%"><b>${esc(s.title)}</b><span class="lv lv-${s.lv[0]}">${s.lv}</span></span>
        <span class="pl">${esc(s.place)}</span><span class="gl">${esc(s.goal)}</span>${S.situ[s.id]?.best != null ? `<span class="small up">ロールプレイ ベスト ${S.situ[s.id].best}点</span>` : ''}</button>`).join('')}</div>`;
  }

  function talkView(s) {
    return `<div class="row" style="justify-content:space-between"><div class="row"><button class="btn primary" data-act="stplayall">${ICON.speak}会話を通して聞く</button><button class="btn" data-act="stja">${ui.st.showJa ? '日本語をかくす' : '日本語を表示'}</button></div><span class="small muted">相手：${esc(s.role)}</span></div>
      <div class="chat">${s.lines.map(([w, en, ja]) => `<div class="bub ${w === 'Y' ? 'y' : 'a'}">${playBtn(en)}<span><span class="who">${w === 'Y' ? 'あなた' : esc(s.role)}</span><span class="en ex">${esc(en)}</span>${ui.st.showJa ? `<span class="jp">${esc(ja)}</span>` : ''}</span></div>`).join('')}</div>
      <div><button class="btn primary big" data-act="stmode" data-k="role">ロールプレイに進む</button></div>`;
  }

  function roleView(s) {
    const k = ui.st.k, lines = s.lines, n = lines.length;
    if (k >= n) {
      const mine = lines.map((l, i) => [l, i]).filter(([l]) => l[0] === 'Y'), scores = mine.map(([, i]) => ui.st.res[i]?.score ?? 0), avg = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
      return `<div class="sheet panel" style="text-align:center;align-items:center;gap:10px"><div class="small muted">ロールプレイ完了</div>
        <div style="font-family:var(--f-word);font-size:52px;font-weight:800;line-height:1" class="${avg >= 80 ? 'up' : ''}">${avg}<small style="font-size:18px">点</small></div>
        <div class="small">あなたのセリフ ${mine.length} 文の平均（言えた語の割合）</div>
        <div class="row" style="justify-content:center"><button class="btn primary" data-act="strestart">もう一度</button><button class="btn" data-act="stmode" data-k="phr">フレーズを見る</button></div></div>`;
    }
    const past = lines.slice(0, k).map(([w, en, ja]) => `<div class="bub ${w === 'Y' ? 'y' : 'a'}">${playBtn(en)}<span><span class="who">${w === 'Y' ? 'あなた' : esc(s.role)}</span><span class="en">${esc(en)}</span></span></div>`).join('');
    const [w, en, ja] = lines[k], r = ui.st.res[k], sp = ui.st.sp;
    let now;
    if (w === 'A') now = `<div class="bub a">${playBtn(en)}${playBtn(en, true)}<span><span class="who">${esc(s.role)}</span><span class="en">${esc(en)}</span>${ui.st.showJa ? `<span class="jp">${esc(ja)}</span>` : ''}</span></div>
      <div><button class="btn primary" data-act="stnext">次へ（あなたの番）</button></div>`;
    else {
      const first = en.split(/\s+/).slice(0, 2).join(' ');
      now = `<div class="rpbox"><b>あなたの番：「${esc(ja)}」と言ってみよう</b><span class="small muted">ヒント：${esc(first)} …</span>
        ${r ? `<div class="dres" style="font-size:16.5px">${r.words.map((x, i) => `<span class="${r.marks[i] ? 'hit' : 'miss'}">${esc(x)}</span>`).join(' ')}</div>
          <div class="row"><b class="${r.score >= 80 ? 'up' : r.score >= 50 ? '' : 'dn'}">${r.score}点</b>${r.heard ? `<span class="small muted">認識：${esc(r.heard)}</span>` : ''}${playBtn(en)}</div>` : ''}
        ${sp.err ? `<p class="err">${esc(sp.err)}</p>` : ''}
        <div class="row">${SR ? `<button class="btn ${sp.busy ? 'rec pulse' : 'primary'}" data-act="stmic">${ICON.mic}${sp.busy ? '聞き取り中…（タップで終了）' : r ? 'もう一度言う' : 'マイクで言う'}</button>` : ''}<button class="btn" data-act="sttype">書いて答える</button><button class="btn ghost" data-act="stshow">答えを見る</button>${r ? `<button class="btn primary" data-act="stnext">次へ</button>` : ''}</div>
        ${ui.st.typing ? `<form data-form="stform" class="row" style="flex-wrap:nowrap"><input id="stin" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="英語で入力して Enter"></form>` : ''}
        ${sp.audio && r ? `<div class="row"><span class="small muted">自分の録音</span><audio controls src="${sp.audio}"></audio></div>` : ''}</div>`;
    }
    return `<div class="row" style="justify-content:space-between"><span class="small muted">${k + 1} / ${n}</span><label class="small row" style="gap:6px"><input type="checkbox" data-act="stja2" ${ui.st.showJa ? 'checked' : ''}>相手のセリフの日本語</label></div>
      <div class="meter"><i style="width:${k / n * 100}%"></i></div>
      <div class="chat">${past}${now}</div>
      <p class="note">あなたのセリフは日本語だけが出ます。英語で言ってみて、マイク（Chrome / Edge / Safari）か入力で答え合わせ。完璧でなくても、伝わる言い方が言えれば OK です。</p>`;
  }

  function phrView(s) {
    if (ui.st.quiz) return quizView(s);
    return `<div class="panel" style="gap:4px"><b>この場面で使えるフレーズと言い換え</b>
        ${s.phrases.map(([en, ja, alts]) => `<div class="phr">${playBtn(en)}<span><span class="en">${esc(en)}</span><span class="small" style="display:block">${esc(ja)}</span>${alts ? `<span class="alt">言い換え：${alts.split('|').map(esc).join(' ／ ')}</span>` : ''}</span></div>`).join('')}</div>
      ${s.hear?.length ? `<div class="panel" style="gap:4px"><div class="row" style="justify-content:space-between"><b>相手がこう言うことも（聞き取り練習）</b><button class="btn ghost" data-act="sthearja">${ui.st.hearJa ? '日本語をかくす' : '日本語を表示'}</button></div>
        ${s.hear.map(([en, ja]) => `<div class="phr">${playBtn(en)}<span><span class="en" style="font-weight:500">${esc(en)}</span>${ui.st.hearJa ? `<span class="small" style="display:block">${esc(ja)}</span>` : ''}</span></div>`).join('')}</div>` : ''}
      <div class="tipbox"><b>知っておくと安心</b><br>${s.tips.map(t => '・' + esc(t)).join('<br>')}</div>
      <div class="row"><button class="btn primary" data-act="stquiz">確認クイズ（${s.phrases.length + (s.hear?.length || 0)}問）</button></div>`;
  }
  function quizView(s) {
    const q = ui.st.quiz, it = q.items[q.i];
    if (!it) return `<div class="sheet panel" style="text-align:center;align-items:center"><div style="font-family:var(--f-word);font-size:46px;font-weight:800">${q.c} / ${q.items.length}</div><div class="row" style="justify-content:center"><button class="btn primary" data-act="stquiz">もう一度</button><button class="btn" data-act="stquizend">フレーズに戻る</button></div></div>`;
    const pickd = q.pick;
    if (it.type === 'hear') return `<div class="small muted">${q.i + 1} / ${q.items.length}　音声を聞いて、意味を選んでください</div>
      <div class="row"><button class="btn primary" data-act="say" data-text="${esc(it.en)}">${ICON.speak}再生</button><button class="btn" data-act="say" data-text="${esc(it.en)}" data-slow="1">${ICON.slow}ゆっくり</button></div>
      <div class="opts">${it.opts.map((o, j) => `<button class="opt ${pickd != null ? (o === it.ja ? 'ok' : j === pickd ? 'ng' : '') : ''}" data-act="stqans" data-i="${j}" ${pickd != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
      ${pickd != null ? `<div class="ex" style="font-size:16px">${esc(it.en)}</div><div><button class="btn primary" data-act="stqnext">次へ</button></div>` : ''}`;
    return `<div class="small muted">${q.i + 1} / ${q.items.length}　「${esc(it.ja)}」を英語で言うと？</div>
      <div class="opts">${it.opts.map((o, j) => `<button class="opt en ${pickd != null ? (o === it.en ? 'ok' : j === pickd ? 'ng' : '') : ''}" data-act="stqans" data-i="${j}" ${pickd != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
      ${pickd != null ? `<div class="row">${playBtn(it.en)}<button class="btn primary" data-act="stqnext">次へ</button></div>` : ''}`;
  }

  function detailView() {
    const s = cur();
    return `<div class="sheet panel" style="gap:12px">
      <div class="row" style="justify-content:space-between"><span><span class="lv lv-${s.lv[0]}">${s.lv}</span> <span class="small muted">${esc(CATS.find(c => c[0] === s.cat)[1])} ・ ${esc(s.place)}</span></span></div>
      <h2 style="font-size:21px">${esc(s.title)}</h2><p class="small">ゴール：${esc(s.goal)}</p>
      <div class="seg" role="group">${[['talk', '会話を見る'], ['role', 'ロールプレイ'], ['phr', 'フレーズ・言い換え']].map(([k, v]) => `<button data-act="stmode" data-k="${k}" aria-pressed="${ui.st.mode === k}">${v}</button>`).join('')}</div>
      ${ui.st.mode === 'role' ? roleView(s) : ui.st.mode === 'phr' ? phrView(s) : talkView(s)}
    </div>`;
  }
  const vSitu = () => ui.st.id ? detailView() : listView();

  function scoreTyped(target, typed) { const d = diffWords(target, typed); return {score: d.score, words: d.A, marks: d.mHit, heard: typed}; }
  function finishLine(res) {
    const s = cur(); ui.st.res[ui.st.k] = res; res.score >= 80 ? window.SFX?.ok() : window.SFX?.ng();
    const mine = s.lines.map((l, i) => i).filter(i => s.lines[i][0] === 'Y');
    if (mine.every(i => ui.st.res[i])) { const avg = Math.round(mine.reduce((a, i) => a + ui.st.res[i].score, 0) / mine.length); S.situ[s.id] = {done: true, best: Math.max(S.situ[s.id]?.best ?? 0, avg)}; window.addXP?.(5, 'situ'); save(); }
  }
  Object.assign(ACT, {
    stcat: x => { ui.st.cat = x.k; render(); },
    stopen: x => { Object.assign(ui.st, {id: x.id, mode: 'talk', k: 0, res: {}, quiz: null, typing: false}); ui.st.sp.err = ''; render(); scrollTo(0, 0); },
    stmode: x => { ui.st.mode = x.k; ui.st.quiz = null; if (x.k === 'role') { ui.st.k = 0; ui.st.res = {}; ui.st.typing = false; } render(); },
    stja: () => { ui.st.showJa = !ui.st.showJa; render(); },
    stja2: (x, el) => { ui.st.showJa = el.checked; render(); },
    stplayall: () => playAll(cur().lines),
    stnext: () => { ui.st.k++; ui.st.typing = false; ui.st.sp.err = ''; if (ui.st.sp.audio) { URL.revokeObjectURL(ui.st.sp.audio); ui.st.sp.audio = null; } render(); },
    strestart: () => { ui.st.k = 0; ui.st.res = {}; render(); },
    stshow: () => { const en = cur().lines[ui.st.k][1]; ui.st.res[ui.st.k] = {score: 0, words: en.split(/\s+/), marks: en.split(/\s+/).map(() => true), heard: ''}; render(); },
    sttype: () => { ui.st.typing = true; render(); setTimeout(() => $('#stin')?.focus(), 30); },
    stmic: () => { const en = cur().lines[ui.st.k][1]; listenOnce(ui.st.sp, alts => { const r = scoreSentence(en, alts); finishLine({score: r.score, words: r.words, marks: r.marks, heard: r.heard}); }, 'situ'); },
    stquiz: () => { const s = cur(), others = SIT.flatMap(x => x.phrases.map(p => p[0])), jas = SIT.flatMap(x => (x.hear || []).map(h => h[1]));
      const ph = s.phrases.map(([en, ja]) => ({en, ja, opts: shuffle([en, ...shuffle(others.filter(o => o !== en)).slice(0, 3)])}));
      const hr = (s.hear || []).map(([en, ja]) => ({type: 'hear', en, ja, opts: shuffle([ja, ...shuffle(jas.filter(o => o !== ja)).slice(0, 3)])}));
      ui.st.quiz = {i: 0, c: 0, pick: null, items: shuffle([...ph, ...hr])}; render(); },
    stqans: x => { const q = ui.st.quiz, it = q.items[q.i]; q.pick = +x.i; const ok = it.opts[q.pick] === (it.type === 'hear' ? it.ja : it.en); if (ok) q.c++; ok ? window.SFX?.ok() : window.SFX?.ng(); render(); },
    sthearja: () => { ui.st.hearJa = !ui.st.hearJa; render(); },
    stqnext: () => { const q = ui.st.quiz; q.i++; q.pick = null; render(); },
    stquizend: () => { ui.st.quiz = null; render(); },
  });
  document.addEventListener('input', e => { if (e.target.id === 'stsearch') { ui.st.q = e.target.value; const pos = e.target.selectionStart; render(); const el = $('#stsearch'); if (el) { el.focus(); el.setSelectionRange(pos, pos); } } });
  document.addEventListener('submit', e => { if (e.target.dataset?.form === 'stform') { e.preventDefault(); const v = ($('#stin')?.value || '').trim(); if (!v) return; finishLine(scoreTyped(cur().lines[ui.st.k][1], v)); ui.st.typing = false; render(); } });
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, situ: vSitu};
  (window.BACK_HANDLERS = window.BACK_HANDLERS || []).push(() => { if (S.tab !== 'situ' || !ui.st.id) return false; if (ui.st.quiz) ui.st.quiz = null; else ui.st.id = null; return true; });
})();
