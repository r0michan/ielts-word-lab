/* レベル別コース：A1〜C2 ごとに「文法ユニット」「単語帳（50語ずつ）」「パート別練習」。
   各レベルに日本の学校段階・英検・TOEIC・IELTS の目安を付け、先生なしで進められる順番（解説 → 例文 → ミス → 練習）にする。 */
(() => {
  const css = `
  .lvchips{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px}
  .lvchips::-webkit-scrollbar{display:none}
  .lvchip{flex:none;border:1.5px solid var(--line);background:var(--surface);border-radius:14px;padding:6px 14px;cursor:pointer;display:flex;flex-direction:column;align-items:center;line-height:1.2}
  .lvchip b{font-family:var(--f-word);font-size:18px}
  .lvchip span{font-size:10.5px;color:var(--muted)}
  .lvchip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
  .lvchip[aria-pressed="true"] span{color:var(--on-accent);opacity:.85}
  .lvinfo{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px}
  .lvinfo div{background:var(--sunk);border-radius:14px;padding:8px 12px}
  @media (max-width:560px){.lvinfo{grid-template-columns:1fr 1fr}.lvinfo b{font-size:13px}}
  .lvinfo span{display:block;font-size:11.5px;color:var(--muted)}
  .lvinfo b{font-size:14.5px}
  .ulist{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}
  .ucard{display:flex;gap:12px;align-items:flex-start;background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:14px;text-align:left;cursor:pointer;box-shadow:var(--shadow)}
  .ucard:hover{border-color:var(--accent)}
  .ucard .no{width:34px;height:34px;border-radius:11px;background:var(--sunk);display:grid;place-items:center;font-family:var(--f-word);font-weight:800;flex:none;color:var(--muted)}
  .ucard.done .no{background:var(--good);color:#fff}
  .ucard b{display:block;font-size:15px}
  .ucard .sub{font-size:12.5px;color:var(--muted)}
  .ucard .tag{font-size:11px;margin-left:4px}
  .gx p{line-height:1.85}
  .gx .core{font-size:20px;font-weight:900;color:var(--accent);line-height:1.5}
  .gtab{width:100%;border-collapse:collapse;font-size:14px}
  .gtab td{border-bottom:1px solid var(--line);padding:8px 6px;vertical-align:top}
  .gtab td:first-child{color:var(--muted);font-weight:700;white-space:nowrap;padding-right:12px}
  .gtab td:last-child{font-family:var(--f-word)}
  .gex{display:flex;flex-direction:column;gap:8px}
  .gex div{display:flex;gap:8px;align-items:flex-start;background:var(--sunk);border-radius:14px;padding:10px 12px}
  .gex .t{flex:1;min-width:0}
  .gex .ja{display:block;font-size:13px;color:var(--muted);font-family:var(--f-ui)}
  .trapc{display:grid;gap:8px}
  .trapc div{border-radius:14px;padding:10px 12px;background:var(--bad-soft)}
  .trapc .x{color:var(--bad);font-family:var(--f-word);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--bad) 60%,transparent)}
  .trapc .o{color:var(--good);font-family:var(--f-word);font-weight:700;display:block}
  .trapc .why{font-size:13px;display:block;margin-top:2px}
  .stepnav{display:flex;gap:6px;flex-wrap:wrap}
  .stepnav span{font-size:12px;font-weight:800;border-radius:999px;padding:3px 10px;background:var(--sunk);color:var(--muted)}
  .stepnav span.on{background:var(--accent);color:var(--on-accent)}
  .wbrow{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:4px 12px;align-items:center;padding:10px 4px;border-bottom:1px solid var(--line)}
  .wbrow .w{font-family:var(--f-word);font-weight:800;font-size:17px;background:none;border:0;text-align:left;padding:0;cursor:pointer;color:var(--ink)}
  .wbrow .ipa2{font-family:var(--f-ipa);font-size:13px;color:var(--muted);display:block}
  .wbrow .m{font-size:14px}
  .wbrow .m.hide{background:var(--accent);color:transparent;border-radius:6px;cursor:pointer;user-select:none}
  .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--line);margin-right:6px}
  .dot.s1{background:var(--bad)} .dot.s2{background:var(--warn)} .dot.s3{background:var(--good)}
  .ubar{height:6px;border-radius:99px;background:var(--sunk);overflow:hidden}
  .ubar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--c2))}
  .pcard{background:var(--surface);border:1.5px solid var(--line);border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow)}
  .pcard h3{margin:0;font-size:17px}
  .pcard dl{margin:0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;font-size:13.5px}
  .pcard dt{font-weight:800;color:var(--muted)}
  .pcard dd{margin:0}
  .ordbox{min-height:52px;border:1.5px dashed var(--line);border-radius:14px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
  .ordchip{font-family:var(--f-word);font-size:16px;border:1.5px solid var(--line);background:var(--surface);border-radius:10px;padding:5px 10px;cursor:pointer}
  .ordchip.used{opacity:.3;pointer-events:none}
  .verdict{font-weight:900;font-size:18px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const G = window.GRAMMAR || [];
  const JP = {
    A1: {school: '中学英語', eiken: '5級〜3級', toeic: '120〜220', ielts: '—', can: '自己紹介・買い物・簡単な質問と答え'},
    A2: {school: '高校基礎（高1〜高2）', eiken: '準2級', toeic: '225〜545', ielts: '〜3.5', can: '身近な話題の簡単なやりとり、短い文章の理解'},
    B1: {school: '高校卒業〜大学受験', eiken: '2級', toeic: '550〜780', ielts: '4.0〜5.0', can: '旅行で困らない、経験や意見を簡単に説明できる'},
    B2: {school: '大学・社会人の中上級', eiken: '準1級', toeic: '785〜940', ielts: '5.5〜6.5', can: '自然に議論できる、専門的な文章の要点がわかる（留学・移住の目安）'},
    C1: {school: '大学上級・ビジネス', eiken: '1級', toeic: '945〜990', ielts: '7.0〜8.0', can: '複雑な話題を流暢かつ論理的に話し・書ける'},
    C2: {school: 'ネイティブに近い', eiken: '—', toeic: '—', ielts: '8.5〜9.0', can: 'ほぼすべてを理解し、細かいニュアンスまで表現できる'},
  };
  const SHORT = {A1: '中学', A2: '高校基礎', B1: '高校卒', B2: '大学', C1: '上級', C2: 'ネイティブ級'};
  window.LEVEL_JP = JP;
  S.course = S.course || {};
  ui.cs = {lv: null, seg: 'grammar', unit: null, step: 0, run: null, wunit: null, sheet: true, reveal: {}};
  const curLv = () => ui.cs.lv || S.lv?.cur || S.place?.lvl || 'A1';
  const XP = n => window.addXP?.(n, 'course');
  const sfx = ok => ok ? window.SFX?.ok() : window.SFX?.ng();

  /* ---------- answer checking for written (記述) questions ---------- */
  const CONTR = [[/\bi'm\b/g, 'i am'], [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'], [/\bdidn't\b/g, 'did not'], [/\bcan't\b/g, 'cannot'], [/\bcan not\b/g, 'cannot'], [/\bwon't\b/g, 'will not'], [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'], [/\bwasn't\b/g, 'was not'], [/\bweren't\b/g, 'were not'], [/\bhaven't\b/g, 'have not'], [/\bhasn't\b/g, 'has not'], [/\bhadn't\b/g, 'had not'], [/\bshouldn't\b/g, 'should not'], [/\bwouldn't\b/g, 'would not'], [/\bneedn't\b/g, 'need not'], [/\bmustn't\b/g, 'must not'], [/'ve\b/g, ' have'], [/'ll\b/g, ' will'], [/'re\b/g, ' are'], [/\b(i|you|he|she|we|they)'d\b/g, '$1 would'], [/\b(he|she|it|that|there|what)'s\b/g, '$1 is'], [/\bmt\.?\s/g, 'mount '], [/\bmum\b/g, 'mother'], [/\bmom\b/g, 'mother']];
  const canon = s => { let t = String(s).toLowerCase().replace(/[’‘]/g, "'"); CONTR.forEach(([a, b]) => t = t.replace(a, b)); return key(t); };
  function checkWrite(typed, model, alts) {
    const answers = [model, ...alts], c = canon(typed);
    if (answers.some(a => canon(a) === c)) return {ok: true, exact: true, best: model};
    let best = {score: -1};
    answers.forEach(a => { const d = diffWords(a, typed); if (d.score > best.score) best = {...d, model: a}; });
    const extra = best.B.filter((_, k) => !best.bHit[k]).length;
    return {ok: best.score >= 90 && extra <= 1, near: best.score >= 70, best: best.model, diff: best};
  }

  /* ---------- shared runner: mc / write / order ---------- */
  function startRun(title, qs, onDone) { ui.cs.run = {title, qs, i: 0, res: [], onDone}; window.SFX?.reset(); render(); scrollTo(0, 0); }
  function runView() {
    const r = ui.cs.run, q = r.qs[r.i], res = r.res[r.i], n = r.qs.length;
    if (r.i >= n) return runResult();
    let body = '', after = '';
    if (q.type === 'mc') {
      body = `${q.lead ? `<div class="small muted">${q.lead}</div>` : ''}<div class="vq">${q.prompt}</div><div class="opts">${q.opts.map((o, j) => `<button class="opt ${q.ja ? '' : 'en'} ${res ? (o === q.ans ? 'ok' : j === res.pick ? 'ng' : '') : ''}" data-act="crpick" data-i="${j}" ${res ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
      if (res) after = `<div class="verdict ${res.ok ? 'up' : 'dn'}">${res.ok ? '正解！' : '不正解'}</div><div class="small">${q.why ? esc(q.why) : ''}</div>${q.full ? `<div class="row"><span class="ex" style="font-size:16px">${esc(q.full)}</span>${sayBtn(q.full, '聞く')}</div>` : ''}`;
    } else if (q.type === 'write') {
      body = `<div class="small muted">日本語の意味になるように英語で書いてください${q.hint ? `（${esc(q.hint)}）` : ''}</div><div class="vq" style="font-family:var(--f-ui);font-weight:800">${esc(q.ja)}</div>
        <form data-form="crwrite"><textarea id="crin" rows="2" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="英文を入力" ${res ? 'readonly' : ''}>${esc(res?.typed || '')}</textarea></form>`;
      if (res) {
        const d = res.chk.diff;
        after = `<div class="verdict ${res.ok ? 'up' : res.chk.near ? '' : 'dn'}">${res.ok ? (res.chk.exact ? '正解！' : 'ほぼ正解！') : res.chk.near ? 'おしい！' : 'もう一歩'}</div>
          <div class="small muted">模範解答</div><div class="row"><span class="ex" style="font-size:17px">${esc(q.model)}</span>${sayBtn(q.model, '聞く')}</div>
          ${!res.chk.exact && d ? `<div class="small muted">あなたの答えとの比較（緑＝一致、赤＝足りない語、取り消し線＝余分な語）</div><div class="dres" style="font-size:16px">${d.A.map((w, i) => `<span class="${d.mHit[i] ? 'hit' : 'miss'}">${esc(w)}</span>`).join(' ')}${d.B.some((_, k) => !d.bHit[k]) ? ' ／ ' + d.B.map((b, k) => d.bHit[k] ? '' : `<span class="extra">${esc(b)}</span>`).join(' ') : ''}</div>` : ''}
          ${q.alts?.length ? `<div class="small">ほかの正解例：${q.alts.map(a => `<span style="font-family:var(--f-word)">${esc(a)}</span>`).join(' ／ ')}</div>` : ''}
          ${!res.ok ? `<div class="row"><button class="btn ghost" data-act="crself">自分の答えも正しいと思う（正解にする）</button></div>` : ''}`;
      }
    } else if (q.type === 'order') {
      const picked = r.pick || [];
      body = `<div class="small muted">単語をタップして正しい順に並べてください（${esc(q.ja)}）</div>
        <div class="ordbox">${picked.map((k, j) => `<button class="ordchip" data-act="crunpick" data-j="${j}" ${res ? 'disabled' : ''}>${esc(q.tokens[k])}</button>`).join('') || '<span class="small muted">ここに並びます</span>'}</div>
        <div class="row" style="gap:6px">${q.tokens.map((t, k) => `<button class="ordchip ${picked.includes(k) ? 'used' : ''}" data-act="crord" data-k="${k}" ${res ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>`;
      if (res) after = `<div class="verdict ${res.ok ? 'up' : 'dn'}">${res.ok ? '正解！' : '不正解'}</div><div class="row"><span class="ex" style="font-size:17px">${esc(q.full)}</span>${sayBtn(q.full, '聞く')}</div>`;
    }
    const can = q.type === 'mc' ? '' : res ? '' : q.type === 'write' ? `<button class="btn primary" data-act="crwrite">答え合わせ</button>` : `<button class="btn primary" data-act="crordcheck" ${(r.pick || []).length === q.tokens.length ? '' : 'disabled'}>答え合わせ</button><button class="btn ghost" data-act="crordreset">やり直す</button>`;
    return `<div class="sheet panel">
      <div class="thead"><b>${esc(r.title)}</b><span class="small muted">${r.i + 1} / ${n}</span></div>
      <div class="meter"><i style="width:${(r.i + (res ? 1 : 0)) / n * 100}%"></i></div>
      ${q.tag ? `<span class="tsec" style="align-self:flex-start">${esc(q.tag)}</span>` : ''}
      ${body}${after ? `<div class="panel" style="gap:8px">${after}</div>` : ''}
      <div class="row">${can}${res ? `<button class="btn primary" data-act="crnext">${r.i === n - 1 ? '結果を見る' : '次へ'}</button>` : ''}<button class="btn ghost" data-act="crquit">やめる</button></div>
    </div>`;
  }
  function runResult() {
    const r = ui.cs.run, ok = r.res.filter(x => x?.ok).length, p = Math.round(ok / r.qs.length * 100);
    if (!r.reported) { r.reported = true; r.onDone?.(p); p === 100 ? window.SFX?.fanfare(true) : p >= 80 ? window.SFX?.fanfare(false) : window.SFX?.pop(); }
    return `<div class="sheet panel" style="gap:12px;text-align:center;align-items:center">
      <div class="small muted">${esc(r.title)}</div>
      <div style="font-family:var(--f-word);font-size:56px;font-weight:800;line-height:1" class="${p >= 80 ? 'up' : p < 50 ? 'dn' : ''}">${p}<small style="font-size:20px">点</small></div>
      <div>${ok} / ${r.qs.length} 問正解 ${p >= 80 ? '・ 合格ライン（80点）クリア！' : '・ 80点で合格です'}</div>
      ${r.qs.some((q, i) => !r.res[i]?.ok) ? `<div class="panel" style="gap:6px;text-align:left;width:100%"><b>見直し</b>${r.qs.map((q, i) => r.res[i]?.ok ? '' : `<div class="small" style="border-top:1px dashed var(--line);padding-top:6px">${q.type === 'write' ? esc(q.ja) + ' → <b class="en" style="font-family:var(--f-word)">' + esc(q.model) + '</b>' : q.type === 'order' ? '<b style="font-family:var(--f-word)">' + esc(q.full) + '</b>' : q.prompt + ' → <b>' + esc(q.ans) + '</b>'}${q.why ? `<div class="muted">${esc(q.why)}</div>` : ''}</div>`).join('')}</div>` : ''}
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="crclose">もどる</button><button class="btn" data-act="crretry">もう一度</button></div>
    </div>`;
  }

  /* ---------- question builders ---------- */
  const mcFrom = (g, [s, a, wr, why], tag) => ({type: 'mc', tag, prompt: esc(s).replace('___', '<b>＿＿＿</b>'), opts: shuffle([a, ...wr.split(',').map(x => x.trim())]), ans: a, why, full: s.replace('___', a)});
  const wFrom = (g, [ja, model, alts], tag) => ({type: 'write', tag, ja, model, alts: (alts || '').split('|').map(x => x.trim()).filter(Boolean), hint: g ? g.title.replace(/（.*?）/g, '') + ' を使って' : ''});
  const unitQs = g => window.GRAMMAR_BANK ? GRAMMAR_BANK.unit(g, 10) : [...g.q.map(x => mcFrom(g, x)), ...g.w.map(x => wFrom(g, x))];
  const byLv = L => G.filter(g => g.lv === L);
  const single = w => !/\s/.test(w.w) && ['n', 'v', 'adj', 'adv'].includes(w.pos) && w.ja;
  const exOk = w => w.ex && /[.!?]$/.test(w.ex.trim()) && w.ex.split(/\s+/).length >= 4 && w.ex.split(/\s+/).length <= 12 && new RegExp(`\\b${w.w}\\b`, 'i').test(w.ex);
  function clozeQ(L) {
    const pool = WORDS.filter(w => w.lv === L && single(w) && exOk(w)); if (!pool.length) return null;
    const w = pick(pool), ds = shuffle(WORDS.filter(x => x.lv === L && single(x) && x.pos === w.pos && x.id !== w.id)).slice(0, 3).map(x => x.w);
    return {type: 'mc', tag: '短文・穴埋め', lead: `空欄に入る語は？（${esc(w.ja)}）`, prompt: esc(w.ex.replace(new RegExp(`\\b${w.w}\\b`, 'i'), '___')).replace('___', '<b>＿＿＿</b>'), opts: shuffle([w.w, ...ds]), ans: w.w, full: w.ex, why: `${w.w} ＝ ${w.ja}`};
  }
  function orderQ(L) {
    const pool = WORDS.filter(w => w.lv === L && exOk(w) && w.ex.split(/\s+/).length <= 9); if (!pool.length) return null;
    const w = pick(pool), toks = w.ex.replace(/[.!?]$/, '').split(/\s+/);
    let sh = shuffle(toks.map((_, i) => i)); if (sh.every((v, i) => v === i)) sh = sh.reverse();
    return {type: 'order', tag: '短文・並べ替え', ja: `ヒント：${w.w}（${w.ja}）`, tokens: sh.map(i => toks[i]), answer: toks.join(' '), full: w.ex};
  }

  /* ---------- views ---------- */
  function header(L) {
    const j = JP[L];
    return `<div class="lvchips" role="group" aria-label="レベル">${LEVELS.map(l => `<button class="lvchip" data-act="cslv" data-l="${l}" aria-pressed="${l === L}"><b>${l}</b><span>${SHORT[l]}</span></button>`).join('')}</div>
      <div class="lvinfo"><div><span>日本の学校</span><b>${j.school}</b></div><div><span>英検</span><b>${j.eiken}</b></div><div><span>TOEIC L&R</span><b>${j.toeic}</b></div><div><span>IELTS</span><b>${j.ielts}</b></div></div>
      <p class="small muted" style="margin-top:-4px">このレベルでできること：${j.can}${S.lv?.cur === L ? ' ・ <b class="up">あなたの現在レベル</b>' : ''}</p>
      <div class="seg" role="group">${[['grammar', '文法'], ['words', '単語帳'], ['parts', 'パート別練習']].map(([k, v]) => `<button data-act="csseg" data-k="${k}" aria-pressed="${ui.cs.seg === k}">${v}</button>`).join('')}</div>`;
  }
  function grammarList(L) {
    const us = byLv(L), done = us.filter(g => (S.course[g.id]?.best || 0) >= 80).length;
    return `<div class="row" style="justify-content:space-between"><b>${L} の文法（${us.length}ユニット）</b><span class="small muted">合格 ${done} / ${us.length}</span></div>
      <div class="ubar"><i style="width:${us.length ? done / us.length * 100 : 0}%"></i></div>
      <div class="ulist">${us.map((g, i) => { const b = S.course[g.id]?.best; return `<button class="ucard ${b >= 80 ? 'done' : ''}" data-act="csunit" data-id="${g.id}"><span class="no">${b >= 80 ? '✓' : i + 1}</span><span><b>${esc(g.title)}</b><span class="sub">${esc(g.core)}</span><span class="sub" style="display:block;margin-top:4px"><span class="lv lv-${L[0]}">${esc(g.school)}で習う</span>${b != null ? ` ・ ベスト ${b}点` : ''}</span></span></button>`; }).join('')}</div>
      <p class="note">1ユニット＝「ひとことで」→「しくみ」→「形」→「例文」→「日本人がやりがちなミス」→「練習（10問：穴埋め・正誤判定・誤文訂正・並べ替え・意味・聞き取り・記述。毎回ちがう問題が出ます）」。80点で合格です。学校で習う時期と、実際に使いこなせる CEFR レベルは違います（例：現在完了は中3で習いますが、使いこなせるのは B1）。</p>`;
  }
  function unitView() {
    const g = G.find(x => x.id === ui.cs.unit), us = byLv(g.lv), idx = us.indexOf(g), nx = us[idx + 1];
    return `<div class="sheet panel gx" style="gap:16px">
      <div class="row" style="justify-content:space-between"><span><span class="lv lv-${g.lv[0]}">${g.lv}</span> <span class="small muted">${esc(g.school)}で習う ・ ユニット ${idx + 1} / ${us.length}</span></span></div>
      <h2 style="font-size:22px">${esc(g.title)}</h2>
      <div><span class="small muted">ひとことで</span><div class="core">${esc(g.core)}</div></div>
      <div class="panel" style="gap:10px"><b>しくみ</b>${g.explain.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="panel" style="gap:6px"><b>形</b><table class="gtab">${g.form.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table></div>
      <div class="panel" style="gap:8px"><b>例文（タップで発音）</b><div class="gex">${g.ex.map(([en, ja]) => `<div><button class="btn ghost" style="padding:2px" data-act="say" data-text="${esc(en)}" aria-label="発音">${ICON.speak}</button><span class="t"><span class="ex" style="font-size:16.5px">${esc(en)}</span><span class="ja">${esc(ja)}</span></span></div>`).join('')}</div></div>
      <div class="panel" style="gap:8px"><b>日本人がやりがちなミス</b><div class="trapc">${g.trap.map(([x, o, why]) => `<div><span class="x">${esc(x.replace(/^×\s*/, ''))}</span><span class="o">→ ${esc(o.replace(/^○\s*/, ''))}</span><span class="why">${esc(why)}</span></div>`).join('')}</div></div>
      <div class="row"><button class="btn primary big" data-act="cspractice">練習する（10問・毎回ちがう問題）</button>${nx ? `<button class="btn" data-act="csunit" data-id="${nx.id}">次のユニットへ</button>` : ''}<button class="btn ghost" data-act="csback">一覧へ</button></div>
    </div>`;
  }
  const SIZE = 50;
  function wordsView(L) {
    const ws = WORDS.filter(w => w.lv === L), units = Math.ceil(ws.length / SIZE);
    const cnt = s => ws.filter(w => status(w.id) === s).length;
    if (ui.cs.wunit != null) return wunitView(L, ws);
    return `<div class="row" style="justify-content:space-between"><b>${L} の単語帳（${ws.length}語・${units}ユニット）</b><span class="small muted"><span class="dot s3"></span>定着 ${cnt(3)} <span class="dot s2"></span>学習中 ${cnt(2)} <span class="dot s1"></span>要復習 ${cnt(1)}</span></div>
      <div class="ulist">${[...Array(units)].map((_, u) => { const part = ws.slice(u * SIZE, u * SIZE + SIZE), d = part.filter(w => status(w.id) === 3).length, seen = part.filter(w => status(w.id) >= 1).length;
        return `<div class="ucard" style="cursor:default;flex-direction:column;gap:8px"><div class="row" style="justify-content:space-between;width:100%"><b>Unit ${u + 1}</b><span class="small muted">${part[0].w} 〜 ${part[part.length - 1].w}</span></div>
          <div class="ubar" style="width:100%"><i style="width:${d / part.length * 100}%"></i></div><span class="sub">定着 ${d} / ${part.length} ・ 学習済み ${seen}</span>
          <div class="row"><button class="btn primary" data-act="cswunit" data-u="${u}">覚える</button><button class="btn" data-act="cswquiz" data-u="${u}">クイズ</button></div></div>`; }).join('')}</div>
      <p class="note">50語ずつのユニットで、「覚える」（赤シート方式のリスト）→「クイズ」で確認、の順がおすすめ。クイズで間違えた単語は単語カードの復習に自動で入ります。</p>`;
  }
  function wunitView(L, ws) {
    const u = ui.cs.wunit, part = ws.slice(u * SIZE, u * SIZE + SIZE);
    return `<div class="row" style="justify-content:space-between"><button class="btn ghost" data-act="cswback">← ユニット一覧</button><b>${L} Unit ${u + 1}</b></div>
      <div class="row"><label class="small row" style="gap:6px"><input type="checkbox" data-act="cssheet" ${ui.cs.sheet ? 'checked' : ''}>赤シート（意味をかくす・タップで表示）</label><button class="btn primary" data-act="cswquiz" data-u="${u}">このユニットのクイズ</button></div>
      <div class="sheet" style="padding:6px 14px">${part.map(w => { const s = status(w.id), shown = !ui.cs.sheet || ui.cs.reveal[w.id];
        return `<div class="wbrow"><span><button class="w" data-act="say" data-text="${esc(w.w)}"><span class="dot ${s ? 's' + s : ''}"></span>${esc(w.w)}</button><span class="ipa2">${w.ipa ? '/' + esc(w.ipa) + '/' : ''} ${esc(w.pos)}</span></span>
          <span class="m ${shown ? '' : 'hide'}" data-act="csreveal" data-id="${esc(w.id)}">${esc(w.ja)}</span></div>`; }).join('')}</div>`;
  }
  const PARTS = [
    ['grammar', '文法問題', '空欄に入る正しい形・語を4択で選ぶ（TOEIC Part 5・英検の大問1と同じ形式）', '空欄の前後だけを見て「品詞・時制・主語との一致」を先に確認。意味から考えるのはその後。', 10],
    ['short', '短文問題', '短い英文の穴埋めと並べ替え', '主語と動詞を先に見つけて、文の骨組みを作ってから修飾語をつなげる。', 8],
    ['write', '記述問題（和文英訳）', '日本語を英語にする。IELTS ライティング・英検の英作文の土台', '日本語を「主語＋動詞」がはっきりした日本語に言い換えてから英語にする（例：「雨にもかかわらず」→ Despite the rain）。', 5],
    ['long', '長文問題', 'IELTS 形式の読解（T/F/NG・見出し・要約など）', '設問を先に読み、本文のどこに答えがあるかを言い換え（paraphrase）を手がかりに探す。全部を訳さない。', 0],
    ['listen', 'リスニング問題', 'IELTS Section 1〜4（会話・講義）', '音声の前に設問を読み、答えが「数字・名前・場所」のどれかを予想しておく。つづりミスに注意。', 0],
  ];
  function partsView(L) {
    const RD = (window.READING || []).filter(r => r.lv === L), LS = window.LISTENING || [];
    return `<p class="small">試験や学習で出てくる「問題の種類（パート）」ごとに、解き方のコツを確認してから練習できます。${L} レベルの文法ユニットと単語から出題します。</p>
      <div class="ulist">${PARTS.map(([k, t, what, tip, n]) => `<div class="pcard"><h3>${t}</h3><dl><dt>どんな問題</dt><dd>${what}</dd><dt>解き方のコツ</dt><dd>${tip}</dd></dl>
        <div class="row">${k === 'long' ? (RD.length ? `<button class="btn primary" data-act="cslong" data-id="${RD[0].id}">${esc(RD[0].title)}（${L}）</button>${RD.length > 1 ? `<span class="small muted">ほか${RD.length - 1}題</span>` : ''}` : `<button class="btn" data-act="tab" data-tab="read">読解へ（${L} の長文は準備中のため B1〜C1 から）</button>`)
          : k === 'listen' ? `<button class="btn primary" data-act="tab" data-tab="listen">リスニングへ（${LS.length}題）</button>`
          : `<button class="btn primary" data-act="cspart" data-k="${k}">${n}問に挑戦</button>`}</div></div>`).join('')}</div>`;
  }
  function vCourse() {
    if (ui.cs.run) return runView();
    if (ui.cs.unit) return unitView();
    const L = curLv();
    return header(L) + (ui.cs.seg === 'words' ? wordsView(L) : ui.cs.seg === 'parts' ? partsView(L) : grammarList(L));
  }

  /* ---------- actions ---------- */
  const R = () => ui.cs.run;
  function record(ok) { const r = R(); if (ok) XP(1); sfx(ok); render(); }
  Object.assign(ACT, {
    cslv: x => { ui.cs.lv = x.l; ui.cs.wunit = null; render(); },
    csseg: x => { ui.cs.seg = x.k; ui.cs.wunit = null; render(); },
    csunit: x => { ui.cs.unit = x.id; render(); scrollTo(0, 0); },
    csback: () => { ui.cs.unit = null; render(); },
    cspractice: () => { const g = G.find(x => x.id === ui.cs.unit); startRun(`${g.title} の練習`, unitQs(g), p => { const c = S.course[g.id] || {}; S.course[g.id] = {best: Math.max(c.best || 0, p), at: Date.now()}; save(); }); },
    cspart: x => {
      const L = curLv(), gs = byLv(L); let qs = [];
      if (x.k === 'grammar') { qs = window.GRAMMAR_BANK ? GRAMMAR_BANK.level(L, 10) : shuffle(gs.flatMap(g => g.q.map(q => mcFrom(g, q, g.title)))).slice(0, 10); if (['B1', 'B2'].includes(L) && window.DRILL) qs = shuffle([...qs.slice(0, 7), ...shuffle(DRILL.FORM).slice(0, 3).map(f => mcFrom(null, [f.q, f.a, f.wrong.join(','), f.tip], '品詞（TOEIC型）'))]); }
      if (x.k === 'short') qs = [...Array(4)].map(() => clozeQ(L)).concat([...Array(4)].map(() => orderQ(L))).filter(Boolean);
      if (x.k === 'write') qs = shuffle(gs.flatMap(g => g.w.map(w => wFrom(g, w, g.title)))).slice(0, 5);
      if (!qs.length) return;
      startRun(`${L} ${PARTS.find(p => p[0] === x.k)[1]}`, qs);
    },
    cslong: x => { const RD = window.READING || [], i = RD.findIndex(r => r.id === x.id); if (i >= 0 && ui.read) { ui.read.i = i; ui.read.ans = {}; ui.read.checked = false; } ACT.tab({tab: 'read'}); },
    cswunit: x => { ui.cs.wunit = +x.u; ui.cs.reveal = {}; render(); scrollTo(0, 0); },
    cswback: () => { ui.cs.wunit = null; render(); },
    cssheet: (x, el) => { ui.cs.sheet = el.checked; render(); },
    csreveal: x => { ui.cs.reveal[x.id] = !ui.cs.reveal[x.id]; render(); },
    cswquiz: x => { const L = curLv(), ws = WORDS.filter(w => w.lv === L).slice(+x.u * SIZE, +x.u * SIZE + SIZE); ui.quizPool = ws; ui.quizPoolLabel = `${L} Unit ${+x.u + 1} の単語`; ui.quiz = null; ACT.tab({tab: 'quiz'}); },
    crpick: x => { const r = R(), q = r.qs[r.i]; if (r.res[r.i]) return; const ok = q.opts[+x.i] === q.ans; r.res[r.i] = {pick: +x.i, ok}; record(ok); },
    crwrite: () => { const r = R(), q = r.qs[r.i]; if (r.res[r.i]) return; const typed = ($('#crin')?.value || '').trim(); if (!typed) return; const chk = checkWrite(typed, q.model, q.alts); r.res[r.i] = {typed, chk, ok: chk.ok}; record(chk.ok); },
    crself: () => { const r = R(); r.res[r.i].ok = true; window.SFX?.ok(); render(); },
    crord: x => { const r = R(); r.pick = [...(r.pick || []), +x.k]; render(); },
    crunpick: x => { const r = R(); r.pick = (r.pick || []).filter((_, j) => j !== +x.j); render(); },
    crordreset: () => { R().pick = []; render(); },
    crordcheck: () => { const r = R(), q = r.qs[r.i], ok = r.pick.map(k => q.tokens[k]).join(' ') === q.answer; r.res[r.i] = {ok}; record(ok); },
    crnext: () => { const r = R(); r.i++; r.pick = []; render(); setTimeout(() => $('#crin')?.focus(), 50); },
    crquit: () => { ui.cs.run = null; render(); },
    crclose: () => { ui.cs.run = null; render(); scrollTo(0, 0); },
    crretry: () => { const r = R(); startRun(r.title, r.qs.map(q => q.type === 'mc' ? {...q, opts: shuffle(q.opts)} : q.type === 'order' ? {...q, tokens: shuffle(q.tokens)} : q), r.onDone); },
  });
  document.addEventListener('submit', e => { if (e.target.dataset?.form === 'crwrite') { e.preventDefault(); ACT.crwrite(); } });
  document.addEventListener('keydown', e => {
    if (S.tab !== 'course' || !ui.cs.run || e.ctrlKey || e.metaKey || e.altKey) return;
    const r = R(), q = r.qs[r.i];
    if (e.key === 'Enter' && e.target.id === 'crin' && !e.shiftKey) { e.preventDefault(); r.res[r.i] ? ACT.crnext() : ACT.crwrite(); return; }
    if (e.target.closest('input,textarea,select')) return;
    if (e.key === 'Enter' && r.res[r.i]) ACT.crnext();
    else if (q?.type === 'mc' && /^[1-4]$/.test(e.key) && !r.res[r.i]) ACT.crpick({i: +e.key - 1});
  });
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, course: vCourse};
})();
