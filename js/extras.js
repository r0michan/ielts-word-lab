/* Extras: tap-to-lookup on English text, the Reading tab and the country score tab.
   Loaded after the main script; uses its globals (WORDS, S, ui, ACT, key, forms, speak, esc, lvChip, render, save, P). */
(() => {
  const css = `
  .lw{cursor:pointer;border-radius:3px;transition:background .12s}
  .lw:hover{background:var(--accent-soft)}
  .lw.on{background:var(--accent);color:var(--on-accent)}
  .lkpop{position:fixed;z-index:50;width:min(340px,calc(100vw - 24px));background:var(--surface);border:1px solid var(--line);border-radius:12px;
    box-shadow:0 10px 30px rgba(0,0,0,.18);padding:14px 16px;display:flex;flex-direction:column;gap:8px;font-size:14px}
  .lkpop .lk-w{font-family:var(--f-word);font-size:22px;font-weight:700}
  .lkpop .lk-ja{font-size:17px;font-weight:700}
  .lkpop .lk-ex{font-family:var(--f-word);font-size:15px;color:var(--muted)}
  .lkpop .lk-from{font-size:12px;color:var(--muted)}
  .lkpop a{color:var(--accent)}
  .lkpop .x{position:absolute;top:6px;right:8px;border:0;background:none;font-size:18px;color:var(--muted);cursor:pointer;line-height:1}
  @media (max-width:560px){.lkpop{left:12px!important;right:12px;top:auto!important;bottom:calc(12px + env(safe-area-inset-bottom,0px));width:auto}}
  .passage{font-family:var(--f-word);font-size:17.5px;line-height:1.75;display:flex;flex-direction:column;gap:14px}
  .passage .para{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px}
  .passage .pl{font-family:var(--f-ui);font-weight:700;color:var(--accent);font-size:14px;display:flex;flex-direction:column;align-items:center;gap:4px;padding-top:3px}
  .rq{display:flex;flex-direction:column;gap:12px;counter-reset:q}
  .rq li{list-style:none;display:flex;flex-direction:column;gap:6px;border-top:1px solid var(--line);padding-top:12px}
  .rq li:first-child{border-top:0;padding-top:0}
  .rq .st{font-family:var(--f-word);font-size:16.5px;background:none;padding:0;color:var(--ink);white-space:normal}
  .rq .seg button{font-size:13px;padding:5px 12px;letter-spacing:.03em}
  .rq .seg button.ok{background:var(--good);color:#fff} .rq .seg button.ng{background:var(--bad);color:#fff}
  .rq .why{font-size:13.5px;color:var(--muted)}
  .ctab{width:100%;border-collapse:collapse;font-size:14px}
  .ctab th,.ctab td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
  .ctab td.req{font-weight:700;white-space:nowrap}
  .ctab td.nt{font-size:13px;color:var(--muted);min-width:220px}
  .ctab tr:last-child td{border-bottom:0}
  .verdict{font-size:12.5px;font-weight:700;border-radius:6px;padding:2px 8px;white-space:nowrap}
  .verdict.y{background:var(--good-soft);color:var(--good)} .verdict.n{background:var(--bad-soft);color:var(--bad)} .verdict.na{background:var(--sunk);color:var(--muted)}
  .tgt{display:flex;flex-wrap:wrap;gap:12px 20px;align-items:end}
  .tgt label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:700}
  .tgt select{font-family:var(--f-word);font-size:17px}
  .ctest{font-size:13.5px;background:var(--sunk);border-radius:8px;padding:10px 12px}
  .clinks{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px}
  .clinks a{color:var(--accent)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- tap-to-lookup ---------- */
  const IRREG = {went:'go',gone:'go',children:'child',men:'man',women:'woman',feet:'foot',teeth:'tooth',better:'good',best:'good',worse:'bad',worst:'bad',
    did:'do',done:'do',made:'make',took:'take',taken:'take',gave:'give',given:'give',bought:'buy',brought:'bring',thought:'think',found:'find',got:'get',
    felt:'feel',kept:'keep',knew:'know',known:'know',grew:'grow',grown:'grow',rose:'rise',risen:'rise',fell:'fall',fallen:'fall',began:'begin',begun:'begin',
    spent:'spend',sent:'send',built:'build',paid:'pay',said:'say',told:'tell',saw:'see',seen:'see',came:'come',became:'become',ran:'run',wrote:'write',
    written:'write',spoke:'speak',spoken:'speak',chose:'choose',chosen:'choose',lost:'lose',met:'meet',led:'lead',held:'hold',stood:'stand',
    understood:'understand',taught:'teach',caught:'catch',drew:'draw',drawn:'draw',drove:'drive',driven:'drive',ate:'eat',eaten:'eat',broke:'break',
    broken:'break',flew:'fly',flown:'fly',lives:'life',criteria:'criterion',phenomena:'phenomenon',analyses:'analysis',crises:'crisis',stole:'steal',
    stolen:'steal',sold:'sell',slept:'sleep',sat:'sit',won:'win',hung:'hang',hurt:'hurt',woke:'wake',wore:'wear',worn:'wear',threw:'throw',thrown:'throw',
    forgot:'forget',forgotten:'forget',fought:'fight',sought:'seek',bore:'bear',borne:'bear',spread:'spread',arose:'arise',arisen:'arise',undertook:'undertake'};
  let LX = null, PH = null, LXn = -1;
  function index() {
    if (LX && LXn === WORDS.length) return LX;
    LX = new Map(); PH = new Map(); LXn = WORDS.length;
    WORDS.forEach(w => { const k = key(w.w); if (/\s/.test(k)) PH.set(k, w); else if (!LX.has(k)) LX.set(k, w); });
    WORDS.forEach(w => { const k = key(w.w); if (!/\s/.test(k)) forms(w.w).forEach(f => { if (!LX.has(f)) LX.set(f, w); }); });
    return LX;
  }
  function lookup(tok, next) {
    const ix = index(), k = key(tok);
    if (next) { const ph = PH.get(k + ' ' + key(next)); if (ph) return ph; }
    if (ix.get(k)) return ix.get(k);
    if (IRREG[k] && ix.get(IRREG[k])) return ix.get(IRREG[k]);
    // light stemming for forms the index does not list (planners → plan, studies → study)
    const tries = [k.replace(/s$/, ''), k.replace(/ies$/, 'y'), k.replace(/(\w)\1ers?$/, '$1'), k.replace(/ers?$/, ''), k.replace(/ers?$/, 'e'), k.replace(/ly$/, ''), k.replace(/ily$/, 'y'), k.replace(/ness$/, ''), k.replace(/ment$/, '')];
    for (const t of tries) if (t !== k && t.length > 2 && ix.get(t)) return ix.get(t);
    return null;
  }
  window.LOOKUP_WORD = tok => lookup(tok);
  const TARGET ='.ex, .sentq, .prompt, .model, .cue, .pitem .en, .passage .tx, .heard, .rq .st';
  const WORD_RE = /([A-Za-z][A-Za-z'’]*(?:-[A-Za-z]+)*)/g;
  function linkify(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {acceptNode: n =>
      n.parentElement.closest('.lw, .blank, button, select, textarea, input') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      if (!/[A-Za-z]/.test(n.nodeValue)) return;
      const frag = document.createDocumentFragment();
      n.nodeValue.split(WORD_RE).forEach((part, i) => {
        if (i % 2) { const s = document.createElement('span'); s.className = 'lw'; s.textContent = part; frag.appendChild(s); }
        else if (part) frag.appendChild(document.createTextNode(part));
      });
      n.replaceWith(frag);
    });
    el.dataset.lk = '1';
  }
  const SEL = '#panel ' + TARGET.split(', ').join(', #panel ');
  // runs as a microtask after each render; linkified elements are marked so the follow-up callback finds nothing to do
  new MutationObserver(() => document.querySelectorAll(SEL).forEach(el => { if (!el.dataset.lk) linkify(el); }))
    .observe(document.getElementById('panel'), {childList: true, subtree: true});

  const pop = document.createElement('div'); pop.className = 'lkpop'; pop.hidden = true; pop.setAttribute('role', 'dialog'); document.body.appendChild(pop);
  let active = null;
  const looked = window.LOOKED = [];
  function hide() { pop.hidden = true; active?.classList.remove('on'); active = null; }
  function nextWordSpan(s) { let n = s.nextSibling; while (n && n.nodeType === 3 && /^\s*$/.test(n.nodeValue)) n = n.nextSibling; return n && n.classList?.contains('lw') ? n : null; }
  function show(span) {
    hide(); active = span; span.classList.add('on');
    const tok = span.textContent, nx = nextWordSpan(span);
    const w = lookup(tok, nx?.textContent);
    if (w) { if (!looked.some(x => x.id === w.id)) looked.push(w); }
    const p = w && S.prog[w.id], inReview = p && p.seen && p.due <= Date.now();
    pop.innerHTML = `<button class="x" data-lkclose aria-label="閉じる">×</button>` + (w ? `
      <div class="row" style="gap:8px;padding-right:20px"><span class="lk-w">${esc(w.w)}</span>${lvChip(w.lv)}<span class="small muted">${esc(POS[w.pos] || w.pos)}</span></div>
      ${key(w.w) !== key(tok) ? `<span class="lk-from">「${esc(tok)}」の元の形</span>` : ''}
      ${w.ipa ? `<span class="ipa" style="font-size:16px">/${esc(w.ipa)}/</span>` : ''}
      <span class="lk-ja">${esc(w.ja)}</span>
      ${w.ex ? `<span class="lk-ex">${esc(w.ex)}</span>` : ''}
      <div class="row"><button class="btn" data-act="say" data-text="${esc(w.w)}">${ICON.speak}発音</button>
        <button class="btn ${inReview ? '' : 'primary'}" data-lkadd="${esc(w.id)}" ${inReview ? 'disabled' : ''}>${inReview ? '復習リストに入っています' : '単語カードで復習する'}</button></div>`
      : `<span class="lk-w" style="padding-right:20px">${esc(tok)}</span>
      <span class="small muted">この単語は収録語（${WORDS.length}語）にありません。</span>
      <div class="row"><button class="btn" data-act="say" data-text="${esc(tok)}">${ICON.speak}発音</button>
        <a class="btn" href="https://dictionary.cambridge.org/dictionary/english-japanese/${encodeURIComponent(tok.toLowerCase().replace(/[’']s$/, ''))}" target="_blank" rel="noopener">Cambridge 辞書で調べる</a></div>`);
    pop.hidden = false;
    const r = span.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    let left = Math.min(Math.max(12, r.left), innerWidth - pw - 12), top = r.bottom + 8;
    if (top + ph > innerHeight - 12) top = Math.max(12, r.top - ph - 8);
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  document.addEventListener('click', e => {
    const s = e.target.closest('.lw');
    if (s) { if (s === active) hide(); else show(s); return; }
    const add = e.target.closest('[data-lkadd]');
    if (add) { const p = P(add.dataset.lkadd); p.seen = Math.max(p.seen || 0, 1); p.box = Math.min(p.box || 0, 1); p.due = Date.now(); save(); add.textContent = '復習リストに追加しました'; add.disabled = true; add.classList.remove('primary'); return; }
    if (e.target.closest('[data-lkclose]') || !e.target.closest('.lkpop')) hide();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  addEventListener('scroll', () => { if (!pop.hidden && innerWidth > 560) hide(); }, {passive: true});

  /* ---------- reading ---------- */
  const RD = window.READING || [];
  ui.read = {i: 0, ans: {}, checked: false};
  S.readBest = S.readBest || {};
  const LBL = {T: 'TRUE', F: 'FALSE', NG: 'NOT GIVEN'};
  const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
  const PL = 'ABCDEFGH';
  const nzr = x => String(x ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const INTRO = {
    tfng: '本文の内容と一致すれば TRUE、矛盾すれば FALSE、本文に書かれていなければ NOT GIVEN を選びます。',
    heading: '各段落に最も合う見出しを選びます（使わない見出しもあります）。',
    mc: '正しいものを1つ選びます。',
    summary: '本文から語を選んで要約の空欄を埋めます。語数制限を守りましょう。',
    info: '次の情報が書かれている段落を選びます（同じ段落を2回選ぶこともあります）。',
  };
  // Every passage → flat list of questions {n, type, g, prompt, ok(answer), answerText, why}
  function flat(P0) {
    const groups = P0.groups || [{type: 'tfng', items: P0.qs}];
    const out = []; let n = 0;
    const picked = a => a !== '' && a != null;
    groups.forEach((g, gi) => g.items.forEach(it => {
      const q = {n: n++, type: g.type, g: gi};
      if (g.type === 'tfng') Object.assign(q, {prompt: it[0], ok: a => a === it[1], answerText: LBL[it[1]], why: it[2]});
      if (g.type === 'heading') Object.assign(q, {prompt: `段落 ${PL[it[0]]}`, ok: a => picked(a) && +a === it[1], answerText: `${ROMAN[it[1]]}. ${g.options[it[1]]}`, why: it[2] || ''});
      if (g.type === 'mc') Object.assign(q, {prompt: it[0], opts: it[1], ok: a => picked(a) && +a === it[2], answerText: `${'ABCD'[it[2]]}. ${it[1][it[2]]}`, why: it[3] || ''});
      if (g.type === 'summary') Object.assign(q, {prompt: it[0], ok: a => nzr(a) !== '' && it[1].split('/').some(x => nzr(x) === nzr(a)), answerText: it[1].split('/')[0], why: it[2] || ''});
      if (g.type === 'info') Object.assign(q, {prompt: it[0], ok: a => picked(a) && +a === it[1], answerText: `段落 ${PL[it[1]]}`, why: it[2] || ''});
      out.push(q);
    }));
    return out;
  }
  window.READ_FLAT = flat;
  function qInput(q, g, P0, a, checked) {
    if (q.type === 'tfng') return `<div class="seg" role="group" aria-label="問${q.n + 1}の答え">${['T', 'F', 'NG'].map(v => {
      let cls = ''; if (checked) { if (q.ok(v)) cls = 'ok'; else if (v === a) cls = 'ng'; }
      return `<button class="${cls}" data-act="rans" data-q="${q.n}" data-v="${v}" aria-pressed="${a === v}" ${checked ? 'disabled' : ''}>${LBL[v]}</button>`; }).join('')}</div>`;
    if (q.type === 'mc') return `<div class="opts">${q.opts.map((o, i) => { let c = 'opt'; if (checked && q.ok(String(i))) c += ' ok'; else if (checked && String(i) === a) c += ' ng';
      return `<button class="${c}" data-act="rans" data-q="${q.n}" data-v="${i}" ${checked ? 'disabled' : ''} style="${String(i) === a && !checked ? 'border-color:var(--accent);background:var(--accent-soft)' : ''}">${'ABCD'[i]}. ${esc(o)}</button>`; }).join('')}</div>`;
    if (q.type === 'heading') return `<select class="rpick" data-q="${q.n}" ${checked ? 'disabled' : ''} aria-label="段落の見出し"><option value="">— 見出しを選ぶ —</option>${g.options.map((o, i) => `<option value="${i}"${a === String(i) ? ' selected' : ''}>${ROMAN[i]}. ${esc(o)}</option>`).join('')}</select>`;
    if (q.type === 'info') return `<select class="rpick" data-q="${q.n}" ${checked ? 'disabled' : ''} aria-label="段落"><option value="">— 段落 —</option>${P0.paras.map((_, i) => `<option value="${i}"${a === String(i) ? ' selected' : ''}>${PL[i]}</option>`).join('')}</select>`;
    if (q.type === 'summary') return `<input type="text" class="rgap" data-q="${q.n}" value="${esc(a || '')}" ${checked ? 'disabled' : ''} autocomplete="off" spellcheck="false" style="font-family:var(--f-word);font-size:16px;max-width:240px" aria-label="空欄${q.n + 1}">`;
    return '';
  }
  function vReading() {
    const r = ui.read, P0 = RD[r.i];
    if (!P0) return '<div class="sheet empty">読解の文章がありません。</div>';
    const qs = flat(P0), groups = P0.groups || [{type: 'tfng', items: P0.qs}];
    const words = P0.paras.join(' ').split(/\s+/).length;
    const score = r.checked ? qs.filter(q => q.ok(r.ans[q.n])).length : null;
    const answered = qs.filter(q => r.ans[q.n] != null && r.ans[q.n] !== '').length;
    const idx = formIndex(), keyW = new Map();
    P0.paras.join(' ').split(/\s+/).forEach(t => { const w = idx.get(key(t)); if (w && ['B2', 'C1', 'C2'].includes(w.lv)) keyW.set(w.id, w); });
    const toks = new Set(key(P0.paras.join(' ')).split(' '));
    const mine = looked.filter(w => [...forms(w.w)].some(f => toks.has(f)));
    const types = [...new Set(groups.map(g => g.type))].map(t => ({tfng: 'T/F/NG', heading: '見出し', mc: '選択', summary: '穴埋め', info: '段落探し'}[t])).join('・');
    return `<div class="row"><select id="rsel" aria-label="文章">${RD.map((x, i) => `<option value="${i}"${i === r.i ? ' selected' : ''}>${esc(x.title)}（${x.lv} · ${esc(x.topic)}）${S.readBest[x.id] != null ? ` — ベスト ${S.readBest[x.id]}/${flat(x).length}` : ''}</option>`).join('')}</select>
      <span class="small muted">${words}語 · ${types} · わからない単語はタップすると意味が出ます</span></div>
    <article class="sheet panel">
      <div class="row" style="justify-content:space-between"><h2 style="font-family:var(--f-word);font-size:24px">${esc(P0.title)}</h2>${lvChip(P0.lv)}</div>
      <div class="passage">${P0.paras.map((t, i) => `<div class="para"><span class="pl">${PL[i]}<button class="iconbtn" data-act="say" data-text="${esc(t)}" aria-label="段落${PL[i]}を読み上げ">${ICON.speak}</button></span><p class="tx">${esc(t)}</p></div>`).join('')}</div>
    </article>
    <section class="sheet panel">
      ${groups.map((g, gi) => { const gq = qs.filter(q => q.g === gi);
        return `<div class="panel" style="gap:10px"><div><b>Questions ${gq[0].n + 1}–${gq[gq.length - 1].n + 1}</b><p class="small muted">${esc(g.intro || INTRO[g.type])}</p></div>
        ${g.type === 'heading' ? `<div class="small" style="background:var(--sunk);border-radius:8px;padding:8px 12px;font-family:var(--f-word)">${g.options.map((o, i) => `${ROMAN[i]}. ${esc(o)}`).join('<br>')}</div>` : ''}
        ${g.type === 'summary' && g.box ? `<div class="small" style="background:var(--sunk);border-radius:8px;padding:8px 12px;font-family:var(--f-word)">${g.box.map(esc).join(' · ')}</div>` : ''}
        <ol class="rq">${gq.map(q => { const a = r.ans[q.n];
          return `<li><span class="small muted">${q.n + 1}.</span><span class="st">${esc(q.prompt)}</span>${qInput(q, g, P0, a, r.checked)}
            ${r.checked ? `<span class="why">${q.ok(a) ? '✓ 正解' : `× 正解は ${esc(q.answerText)}`}${q.why ? ` — ${esc(q.why)}` : ''}</span>` : ''}</li>`; }).join('')}</ol></div>`; }).join('')}
      ${r.checked ? `<div class="row"><b style="font-size:18px">${score} / ${qs.length} 問正解</b><button class="btn" data-act="rretry">解き直す</button>${r.i + 1 < RD.length ? '<button class="btn primary" data-act="rnext">次の文章</button>' : ''}</div>`
        : `<div class="row"><button class="btn primary" data-act="rcheck">答え合わせ</button><span class="small muted">${answered} / ${qs.length} 回答済み</span></div>`}
    </section>
    ${keyW.size ? `<section class="panel" style="gap:8px"><span class="small muted">この文章の B2 以上の重要語（タップで発音）</span><div class="wordpills">${[...keyW.values()].map(w => `<button class="wp" data-act="say" data-text="${esc(w.w)}">${lvChip(w.lv)} ${esc(w.w)} <span class="muted small">${esc(w.ja)}</span></button>`).join('')}</div></section>` : ''}
    ${mine.length ? `<section class="panel" style="gap:8px"><span class="small muted">調べた単語</span><div class="wordpills">${mine.map(w => `<button class="wp" data-act="say" data-text="${esc(w.w)}">${esc(w.w)} <span class="muted small">${esc(w.ja)}</span></button>`).join('')}</div></section>` : ''}`;
  }
  const collectInputs = () => document.querySelectorAll('.rgap, .rpick').forEach(el => { ui.read.ans[+el.dataset.q] = el.value; });
  Object.assign(ACT, {
    rans: d => { if (ui.read.checked) return; collectInputs(); ui.read.ans[+d.q] = d.v; render(); },
    rcheck: () => { collectInputs(); const r = ui.read, P0 = RD[r.i]; r.checked = true; const sc = flat(P0).filter(q => q.ok(r.ans[q.n])).length; S.readBest[P0.id] = Math.max(S.readBest[P0.id] ?? 0, sc); save(); render(); },
    rretry: () => { ui.read.ans = {}; ui.read.checked = false; render(); scrollTo({top: 0}); },
    rnext: () => { ui.read.i++; ui.read.ans = {}; ui.read.checked = false; render(); scrollTo({top: 0}); },
  });
  document.addEventListener('input', e => { if (e.target.classList?.contains('rgap')) ui.read.ans[+e.target.dataset.q] = e.target.value; });
  document.addEventListener('change', e => { if (e.target.classList?.contains('rpick')) ui.read.ans[+e.target.dataset.q] = e.target.value; });

  /* ---------- country scores ---------- */
  const CD = window.COUNTRIES || {list: []};
  S.target = S.target || {o: 6.5, m: 6.0};
  ui.score = {c: 'all'};
  const bands = []; for (let b = 4; b <= 9; b += 0.5) bands.push(b);
  function verdict(r) {
    if (r.none) return '<span class="verdict na">IELTS 不要</span>';
    if (r.cefrOnly) return '<span class="verdict na">別試験で判定</span>';
    const okO = r.overall == null || S.target.o >= r.overall;
    const okE = r.each == null || S.target.m >= r.each;
    const okS = r.speaking == null || S.target.m >= r.speaking;
    return okO && okE && okS ? '<span class="verdict y">✓ 届く</span>' : '<span class="verdict n">× 不足</span>';
  }
  function vScore() {
    const sel = ui.score.c, list = CD.list.filter(c => sel === 'all' || c.id === sel);
    return `<div class="sheet panel" style="gap:12px">
      <div class="tgt">
        <label for="tgo">目標の総合バンド<select id="tgo">${bands.map(b => `<option value="${b}"${S.target.o === b ? ' selected' : ''}>${b.toFixed(1)}</option>`).join('')}</select></label>
        <label for="tgm">一番低いセクションの予想<select id="tgm">${bands.map(b => `<option value="${b}"${S.target.m === b ? ' selected' : ''}>${b.toFixed(1)}</option>`).join('')}</select></label>
        <div class="seg" role="group" aria-label="国">${[['all', 'すべて'], ...CD.list.map(c => [c.id, c.name])].map(([k, v]) => `<button data-act="cpick" data-c="${k}" aria-pressed="${sel === k}">${v}</button>`).join('')}</div>
      </div>
      <p class="small muted">多くのビザは「総合」ではなく「各セクションの最低点」で判定されます。リスニング・リーディング・ライティング・スピーキングのうち一番低いものを入れてください。</p>
    </div>
    ${list.map(c => `<section class="sheet panel" style="gap:12px">
      <div class="row" style="justify-content:space-between"><h2 style="font-size:20px">${esc(c.name)} <span class="muted" style="font-family:var(--f-word);font-weight:400;font-size:15px">${esc(c.en)}</span></h2></div>
      <p class="ctest">${esc(c.test)}</p>
      <div class="tablewrap"><table class="ctab"><thead><tr><th>目的</th><th>必要なスコア</th><th>あなたの目標で</th><th>補足</th></tr></thead><tbody>
      ${c.rows.map(r => `<tr><td>${esc(r.p)}</td><td class="req">${esc(r.req)}</td><td>${verdict(r)}</td><td class="nt">${esc(r.note || '')}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="clinks"><span class="small muted">公式情報:</span>${c.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div>
    </section>`).join('')}
    <p class="note">${esc(CD.checked)}時点で確認できた情報です。移民・ビザの英語要件は頻繁に変わり、職種や個人の状況でも異なります。申請の前に必ず各国の公式サイトか移民の専門家に確認してください。</p>`;
  }
  ACT.cpick = d => { ui.score.c = d.c; render(); };
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'rsel') { ui.read.i = +t.value; ui.read.ans = {}; ui.read.checked = false; render(); }
    if (t.id === 'tgo') { S.target.o = +t.value; if (S.target.m > S.target.o + 1) S.target.m = S.target.o; save(); render(); }
    if (t.id === 'tgm') { S.target.m = +t.value; save(); render(); }
  });

  window.EXTRA_VIEWS = {read: vReading, score: vScore};
  render();
})();
