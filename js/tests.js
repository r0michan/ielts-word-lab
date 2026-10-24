/* レベル制テスト。
   判定テスト（最初に1回）で現在レベル A1〜C2 を決め、デイリー／週間／マンスリーは現在レベルの問題（A1 の人は A2）で出題。
   レベルアップテストは次のレベルの問題で 80 点以上なら昇格。昇格から 1 か月以内の週間・マンスリーテストで 40 点以下なら自動で降格。 */
(() => {
  const css = `
  .tcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
  .tcard{background:var(--surface);border:1.5px solid var(--line);border-radius:22px;padding:16px 18px;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow)}
  .tcard h3{margin:0;font-size:18px}
  .tcard .meta{font-size:12.5px;color:var(--muted)}
  .tcard .st{font-weight:900;font-size:15px}
  .tcard.done{border-color:var(--good)}
  .tcard.lock{opacity:.55}
  .lvhero{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:center}
  .lvbadge{width:96px;height:96px;border-radius:28px;display:grid;place-items:center;font-family:var(--f-word);font-weight:800;font-size:40px;color:#fff;background:linear-gradient(135deg,var(--accent),var(--c2));box-shadow:var(--shadow)}
  .lvbadge small{display:block;font-size:11px;font-family:var(--f-ui);font-weight:700;margin-top:-6px;opacity:.9}
  .lvsteps{display:flex;gap:4px;flex-wrap:wrap}
  .lvsteps span{font-family:var(--f-word);font-weight:800;font-size:13px;border-radius:999px;padding:2px 10px;background:var(--sunk);color:var(--muted)}
  .lvsteps span.on{background:var(--accent);color:var(--on-accent)}
  .lvsteps span.past{background:var(--accent-soft);color:var(--accent)}
  .prob{background:var(--warn-soft);color:var(--warn);border-radius:14px;padding:8px 12px;font-size:13px;font-weight:700}
  .banner{border-radius:18px;padding:14px 16px;font-weight:900;font-size:17px;text-align:center}
  .banner.up{background:var(--good-soft);color:var(--good)} .banner.dn{background:var(--bad-soft);color:var(--bad)} .banner.info{background:var(--accent-soft);color:var(--accent)}
  .thead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
  .tsec{font-size:12px;font-weight:900;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:2px 10px}
  .ttime{font-family:var(--f-word);font-weight:800;font-size:22px;font-variant-numeric:tabular-nums}
  .ttime.low{color:var(--bad)}
  .tdots{display:flex;gap:4px;flex-wrap:wrap}
  .tdots i{width:16px;height:16px;border-radius:5px;background:var(--sunk);display:block}
  .tdots i.on{background:var(--good)} .tdots i.mid{background:var(--warn)} .tdots i.ng{background:var(--bad)}
  .tres{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
  .tres div{background:var(--sunk);border-radius:14px;padding:10px 12px}
  .tres b{display:block;font-family:var(--f-word);font-size:24px}
  .tres span{font-size:12px;color:var(--muted)}
  .trev{display:flex;flex-direction:column;gap:8px}
  .trev > div{border-top:1px dashed var(--line);padding-top:8px;font-size:14px}
  .tbars{display:flex;align-items:flex-end;gap:8px;height:120px;padding-top:8px}
  .tbars div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;font-size:11px;color:var(--muted)}
  .tbars i{display:block;width:100%;max-width:38px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--accent),var(--c2))}
  .upcard{position:relative;overflow:hidden;border-radius:22px;padding:18px 20px;background:var(--grad);color:#fff;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-lg)}
  .upcard p{font-size:13.5px;line-height:1.7;opacity:.95} .upcard .small{opacity:.85}
  .up-h{display:flex;align-items:baseline;gap:10px} .up-h b{font-family:var(--f-word);font-size:26px}
  .up-k{font-size:12px;font-weight:900;background:rgba(255,255,255,.2);border-radius:999px;padding:2px 10px}
  .upcard .btn{border:0} .up-go{background:#fff!important;color:#3E3BC4!important;box-shadow:0 6px 16px rgba(20,10,60,.2)} .up-alt{background:rgba(255,255,255,.16)!important;color:#fff!important}
  .tlist{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);overflow:hidden}
  .trow{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 16px;border-top:1px solid var(--line)}
  .trow:first-child{border-top:0}
  .tic{width:42px;height:42px;border-radius:13px;background:var(--sunk);display:grid;place-items:center;font-size:20px}
  .trow.done .tic{background:var(--good-soft)}
  .ttx{display:flex;flex-direction:column;gap:3px;min-width:0} .ttx b{font-size:15px} .ttx > span{font-size:12px;color:var(--muted)}
  .tact{display:flex;flex-direction:column;align-items:flex-end;gap:6px} .tact .st{font-size:12.5px;font-weight:900;color:var(--muted)}
  .trow .tdots i{width:11px;height:11px;border-radius:3px}
  @media (max-width:480px){.lvbadge{width:76px;height:76px;font-size:32px;border-radius:22px}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const D = window.DRILL;
  S.tests = S.tests || {};
  ['daily', 'weekly', 'monthly'].forEach(k => S.tests[k] = S.tests[k] || {});
  S.tests.levelup = S.tests.levelup || [];
  // S.lv = {cur, at, prev, probUntil, hist: [{t, from, to, why}]}
  const PASS = 80, FAIL = 40, PROBATION = 30 * 864e5;

  // remember when each word was last studied, so the weekly test can draw on "this week's" words
  const prevGrade = grade;
  grade = function (id, ok) { P(id).lt = Date.now(); return prevGrade.apply(this, arguments); };

  /* ---------- seeded randomness: the same day/week/month (and level) gives the same test ---------- */
  const rngOf = seed => { let a = 0; for (const c of seed) a = (Math.imul(a, 31) + c.charCodeAt(0)) | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const sh = (r, a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const take = (r, a, n) => sh(r, a).slice(0, n);
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const monthKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  function weekKey(d = new Date()) {   // ISO week
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day); const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
    return `${y}-W${pad(w)}`;
  }
  const pct = (s, n) => Math.round(s / Math.max(1, n) * 100);
  const nextLv = l => LEVELS[LEVELS.indexOf(l) + 1] || null;
  const prevLv = l => LEVELS[LEVELS.indexOf(l) - 1] || null;
  const testLv = () => S.lv?.cur === 'A1' ? 'A2' : S.lv?.cur;      // tests run from A2 up
  const eqOf = l => window.EXAM_EQ?.find(x => x.cefr === l);

  /* ---------- level-specific pools ---------- */
  const single = w => !/\s/.test(w.w) && ['n', 'v', 'adj', 'adv'].includes(w.pos) && w.ja;
  const byLv = {}; WORDS.forEach(w => { if (single(w)) (byLv[w.lv] = byLv[w.lv] || []).push(w); });
  const wordLv = new Map(WORDS.map(w => [w.w.toLowerCase(), w.lv]));
  const inEx = w => w.ex && w.ex.split(/\s+/).length >= 4 && w.ex.split(/\s+/).length <= 20 && new RegExp(`\\b${w.w}\\b`, 'i').test(w.ex);
  const exLv = {}; Object.entries(byLv).forEach(([l, ws]) => exLv[l] = ws.filter(inEx));
  function weekWords(L) {
    const since = Date.now() - 7 * 864e5, ws = (byLv[L] || []).filter(w => (S.prog[w.id]?.lt || 0) >= since);
    return ws.length >= 8 ? ws : [...ws, ...(byLv[L] || [])];
  }
  // paraphrase groups whose synonyms sit at (or near) the level
  function paraAt(L) {
    const i = LEVELS.indexOf(L);
    const ok = s => { const l = wordLv.get(s.toLowerCase()); return l ? Math.abs(LEVELS.indexOf(l) - i) <= 1 : i >= 3; };
    return D.PARA.map(g => ({g, syn: g.syn.filter(ok)})).filter(x => x.syn.length);
  }

  /* ---------- question generators ---------- */
  const mc = (sec, prompt, ans, others, extra = {}) => ({type: 'mc', sec, prompt, ans, opts: null, others, ...extra});
  function gMean(r, pool) {
    const w = pk(r, pool), ds = take(r, (byLv[w.lv] || pool).filter(x => x.pos === w.pos && x.ja !== w.ja), 12).map(x => x.ja).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    return mc('語彙', `<div class="small muted">この単語の意味は？</div><div class="vq" style="font-size:26px;font-weight:800">${esc(w.w)}</div>`, w.ja, ds, {say: w.w, lv: w.lv, explain: `${esc(w.w)}（${esc(w.pos)}）＝ ${esc(w.ja)}${w.ex ? `<div class="ex" style="font-size:15px">${esc(w.ex)}</div>` : ''}`});
  }
  function gRev(r, pool) {
    const w = pk(r, pool), ds = take(r, (byLv[w.lv] || pool).filter(x => x.pos === w.pos && x.id !== w.id && x.ja !== w.ja), 3).map(x => x.w);
    return mc('語彙', `<div class="small muted">日本語に合う英単語は？</div><div class="vq" style="font-size:22px;font-weight:800">${esc(w.ja)}</div>`, w.w, ds, {lv: w.lv, en: true, explain: `${esc(w.ja)} ＝ <b>${esc(w.w)}</b>${w.ex ? `<div class="ex" style="font-size:15px">${esc(w.ex)}</div>` : ''}`});
  }
  function gCloze(r, L) {
    const pool = exLv[L] || []; if (!pool.length) return gMean(r, byLv[L]);
    const w = pk(r, pool), re = new RegExp(`\\b${w.w}\\b`, 'i'), shown = esc(w.ex.replace(re, '＿＿＿')).replace('＿＿＿', '<b>＿＿＿</b>');
    const ds = take(r, (byLv[L] || []).filter(x => x.pos === w.pos && x.id !== w.id), 3).map(x => x.w);
    return mc('穴埋め', `<div class="small muted">空欄に入る語は？</div><div class="vq">${shown}</div>`, w.w, ds, {lv: L, en: true, say: w.ex, explain: `<span class="ex" style="font-size:15px">${esc(w.ex)}</span><div class="small">${esc(w.w)} ＝ ${esc(w.ja)}</div>`});
  }
  function gListen(r, L) {
    const pool = exLv[L] || []; if (!pool.length) return gMean(r, byLv[L]);
    const w = pk(r, pool), ex = w.ex.toLowerCase();
    const ds = take(r, (byLv[L] || []).filter(x => x.pos === w.pos && x.id !== w.id && !ex.includes(x.w.toLowerCase())), 3).map(x => x.w);
    return mc('リスニング', `<div class="small muted">音声を聞いて、文の中で使われていた単語を選んでください</div><div class="row"><button class="btn primary" data-act="ttsay">${ICON.speak}再生</button><button class="btn" data-act="ttsay" data-slow="1">${ICON.slow}ゆっくり</button></div>`, w.w, ds, {lv: L, en: true, say: w.ex, autoplay: true, explain: `<span class="ex" style="font-size:15px">${esc(w.ex)}</span>`});
  }
  function gPara(r, L) {
    const pool = paraAt(L); if (!pool.length) return gMean(r, byLv[L]);
    const {g, syn} = pk(r, pool), ans = pk(r, syn), ds = take(r, [...new Set(D.PARA.filter(x => x.c !== g.c).flatMap(x => x.syn))], 3);
    const hi = g.ex.replace(new RegExp('\\b' + g.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i'), m => `\u0001${m}\u0002`);
    return mc('言い換え', `<div class="small muted">太字の語と同じ意味で置き換えられるのは？</div><div class="vq">${esc(hi).replace('\u0001', '<b>').replace('\u0002', '</b>')}</div>`, ans, ds, {id: g.id, kind: 'para', lv: L, en: true, explain: `${esc(g.w)}（${esc(g.ja)}）→ ${g.syn.map(esc).join(' / ')}`});
  }
  function gItem(r, list, sec, kind, label) {
    const it = pk(r, list), full = it.q.replace('___', it.a);
    return mc(sec, `<div class="small muted">${label}</div><div class="vq">${esc(it.q).replace('___', '<b>＿＿＿</b>')}</div>`, it.a, it.wrong, {id: it.id, kind, en: true, say: full, explain: `<span class="ex" style="font-size:15px">${esc(full)}</span><div class="small">${esc(it.tip)}</div>`});
  }
  const gColl = r => gItem(r, D.COLL, 'コロケーション', 'coll', '空欄に入る最も自然な語は？');
  const gForm = r => gItem(r, D.FORM, '品詞（TOEIC型）', 'form', '空欄に入る正しい形は？');
  function gSpell(r) { const it = pk(r, D.HARD); return mc('つづり', `<div class="small muted">「${esc(it.ja)}」の正しいつづりは？</div>`, it.w, it.wrong, {id: it.id, kind: 'spell', say: it.w, en: true, explain: `正しくは <b>${esc(it.w)}</b>`}); }
  function gGram(r, L) {
    const q = window.GRAMMAR_BANK?.level(L, 1, r)[0]; if (!q) return gMean(r, byLv[L]);
    return mc('文法', `<div class="small muted">${q.lead}</div><div class="vq">${q.prompt}</div>`, q.ans, q.opts.filter(o => o !== q.ans), {en: !q.ja, lv: L, explain: `${q.full ? `<span class="ex" style="font-size:15px">${esc(q.full)}</span>` : ''}<div class="small">${esc(q.why || '')}</div>`});
  }
  function gNum(r) {
    const it = pk(r, D.IELTS_GEN)();
    return {type: 'type', sec: 'リスニング', prompt: `<div class="small muted"><span class="lv lv-B">${esc(it.kind)}</span> ${esc(it.ask)}</div><div class="row"><button class="btn primary" data-act="ttsay">${ICON.speak}再生</button><button class="btn" data-act="ttsay" data-slow="1">${ICON.slow}ゆっくり</button></div>`,
      say: it.en, autoplay: true, ok: it.ok, ans: it.show, explain: `正解：<b>${esc(it.show)}</b> <div class="small">${esc(it.tip)}</div>`};
  }

  // question mix per level (weights per 10 questions)
  const MIX = {
    A1: {mean: 4, rev: 2, cloze: 1, listen: 1, gram: 2},
    A2: {mean: 3, rev: 2, cloze: 1, listen: 1, spell: 1, gram: 2},
    B1: {mean: 2, rev: 1, cloze: 1, listen: 1, coll: 1, form: 1, para: 1, gram: 2},
    B2: {mean: 2, rev: 1, cloze: 1, listen: 1, coll: 1, form: 1, para: 1, gram: 2},
    C1: {mean: 2, rev: 2, cloze: 1, listen: 1, para: 2, gram: 2},
    C2: {mean: 2, rev: 2, cloze: 2, listen: 1, para: 1, gram: 2},
  };
  function mixed(r, L, n, opt = {}) {
    const w = MIX[L], tot = Object.values(w).reduce((a, b) => a + b, 0), plan = [];
    Object.entries(w).forEach(([k, v]) => { for (let i = 0; i < Math.round(v / tot * n); i++) plan.push(k); });
    while (plan.length > n) plan.splice(plan.indexOf('mean'), 1);
    while (plan.length < n) plan.push('mean');
    const words = opt.week ? weekWords(L) : byLv[L];
    const q = k => k === 'mean' ? gMean(r, words) : k === 'rev' ? gRev(r, words) : k === 'cloze' ? gCloze(r, L) : k === 'listen' ? gListen(r, L) : k === 'coll' ? gColl(r) : k === 'form' ? gForm(r) : k === 'para' ? gPara(r, L) : k === 'gram' ? gGram(r, L) : gSpell(r);
    const qs = plan.map(q);
    if (opt.num && LEVELS.indexOf(L) >= 2) qs.splice(-opt.num, opt.num, ...[...Array(opt.num)].map(() => gNum(r)));
    // the same question twice in one test reads as a bug: re-roll duplicates a few times
    const seen = new Set();
    return qs.map((x, i) => { let y = x; for (let t = 0; t < 6 && seen.has(y.prompt + y.ans); t++) y = q(plan[i] || 'mean'); seen.add(y.prompt + y.ans); return y; });
  }

  /* ---------- test definitions ---------- */
  const DEF = {
    place: {title: '判定テスト', n: '30問・約10分', instant: false, xp: 10,
      make: r => LEVELS.flatMap(L => { const g = MIX[L].para ? [gMean(r, byLv[L]), gMean(r, byLv[L]), gRev(r, byLv[L]), gCloze(r, L), gPara(r, L)] : [gMean(r, byLv[L]), gMean(r, byLv[L]), gRev(r, byLv[L]), gCloze(r, L), gListen(r, L)]; return g.map(q => ({...q, sec: L, lv: L})); })},
    daily: {title: 'デイリーテスト', key: dayKey, n: '10問・約3分', instant: true, xp: 5, make: (r, L) => mixed(r, L, 10)},
    weekly: {title: '週間テスト', key: weekKey, n: '25問・約12分', instant: false, xp: 15, make: (r, L) => mixed(r, L, 25, {week: true, num: 1})},
    monthly: {title: 'マンスリーテスト', key: monthKey, n: '40問・30分', instant: false, xp: 30, limit: 30, make: (r, L) => mixed(r, L, 40, {num: 2})},
    levelup: {title: 'レベルアップテスト', n: '30問・20分', instant: false, xp: 30, limit: 20, make: (r, L) => mixed(r, L, 30, {num: 1})},
  };
  function build(kind) {
    const d = DEF[kind], L = kind === 'place' ? null : kind === 'levelup' ? nextLv(S.lv.cur) : testLv();
    const key = d.key ? d.key() : String(Date.now());
    const r = rngOf(`${kind}:${key}:${L}`);
    const qs = d.make(r, L).map(q => q.type === 'mc' ? {...q, opts: sh(r, [q.ans, ...q.others.filter(o => o !== q.ans)].slice(0, 4))} : q);
    return {kind, key, L, qs, i: 0, picks: [], typed: [], start: Date.now(), end: d.limit ? Date.now() + d.limit * 60e3 : 0, done: null};
  }

  /* ---------- level changes ---------- */
  function setLevel(to, why, probation) {
    const from = S.lv?.cur || null;
    S.lv = {...(S.lv || {}), cur: to, at: Date.now(), prev: from, probUntil: probation ? Date.now() + PROBATION : 0, hist: [...(S.lv?.hist || []), {t: Date.now(), from, to, why}].slice(-50)};
    const i = LEVELS.indexOf(to); S.levels = LEVELS.slice(i, i + 2); ui.quiz = null; ui.cram = false;
  }
  // ケンブリッジ形式の昇格テスト（cambridge.js）から呼ばれる：合格ラインは本試験と同じ60%
  window.LEVEL_PROMOTE = (L, p, pass) => {
    const ok = p >= pass;
    S.tests.levelup = [...S.tests.levelup, {lv: L, from: S.lv?.cur, s: p, n: 100, p, pass: ok, at: Date.now(), cb: true}].slice(-40);
    if (ok && S.lv && LEVELS.indexOf(L) > LEVELS.indexOf(S.lv.cur)) setLevel(L, `昇格テスト（ケンブリッジ形式）${p}%`, true);
  };
  const onProbation = () => S.lv?.probUntil && Date.now() < S.lv.probUntil;

  /* ---------- runner ---------- */
  ui.tt = null; let timer = null;
  const right = (t, k) => { const q = t.qs[k]; return q.type === 'mc' ? t.picks[k] != null && q.opts[t.picks[k]] === q.ans : !!(t.typed[k] && q.ok(t.typed[k])); };
  function start(kind) {
    if (kind !== 'place' && !S.lv) kind = 'place';
    ui.tt = build(kind); clearInterval(timer);
    if (ui.tt.end) timer = setInterval(tick, 500);
    render(); scrollTo(0, 0); autoplay();
  }
  function autoplay() {}   // audio plays only when the learner presses 再生
  function tick() {
    const t = ui.tt; if (!t || t.done) { clearInterval(timer); return; }
    const left = Math.max(0, t.end - Date.now()), el = document.getElementById('ttime');
    if (el) { el.textContent = `${Math.floor(left / 60000)}:${pad(Math.floor(left / 1000) % 60)}`; el.classList.toggle('low', left < 5 * 60e3); }
    if (!left) finish();
  }
  function finish() {
    const t = ui.tt; clearInterval(timer);
    const ok = t.qs.map((_, k) => right(t, k)), score = ok.filter(Boolean).length, p = pct(score, t.qs.length), secs = {};
    t.qs.forEach((q, k) => { const s = secs[q.sec] || (secs[q.sec] = [0, 0]); s[1]++; if (ok[k]) s[0]++; if (q.id && q.kind) D.tally(q.kind, q.id, ok[k]); });
    const done = {ok, score, p, secs};
    if (t.kind === 'place') {
      const acc = {}; LEVELS.forEach(l => acc[l] = secs[l] ? secs[l][0] / secs[l][1] : 0);
      let lvl = 'A1', misses = 0;
      for (const l of LEVELS) { if (acc[l] >= 0.6) lvl = l; else if (++misses > 1) break; }
      setLevel(lvl, '判定テスト', false);
      const SIZES = {A1: 600, A2: 1200, B1: 1800, B2: 2400, C1: 2600, C2: 3000};
      S.place = {date: dayKey(), lvl, est: Math.round(LEVELS.reduce((s, l) => s + acc[l] * SIZES[l], 0) / 100) * 100, acc};   // also feeds the ホーム「レベル診断」card
      done.placed = lvl; done.acc = acc;
    } else if (t.kind === 'levelup') {
      done.pass = p >= PASS;
      S.tests.levelup = [...S.tests.levelup, {lv: t.L, from: S.lv.cur, s: score, n: t.qs.length, p, pass: done.pass, at: Date.now()}].slice(-40);
      if (done.pass) { done.promoted = [S.lv.cur, t.L]; setLevel(t.L, `レベルアップテスト ${p}点`, true); }
    } else {
      const rec = S.tests[t.kind], first = !rec[t.key];
      const entry = {s: score, n: t.qs.length, p, lv: t.L, secs, at: Date.now()};
      if (first || p > (rec[t.key].p ?? pct(rec[t.key].s, rec[t.key].n))) rec[t.key] = {...entry, tries: (rec[t.key]?.tries || 0) + 1};
      else rec[t.key].tries = (rec[t.key].tries || 1) + 1;
      done.first = first;
      if (t.kind !== 'daily' && onProbation() && p <= FAIL && prevLv(S.lv.cur)) { done.demoted = [S.lv.cur, prevLv(S.lv.cur)]; setLevel(prevLv(S.lv.cur), `${DEF[t.kind].title} ${p}点（昇格後1か月以内に${FAIL}点以下）`, false); }
    }
    t.done = done;
    if (done.promoted || done.placed || p === 100) SFX.fanfare(true); else if (done.demoted || done.pass === false) SFX.ng(); else if (p >= 80) SFX.fanfare(false); else SFX.pop();
    window.addXP?.(t.kind === 'place' || t.kind === 'levelup' || done.first ? DEF[t.kind].xp : 2, 'test'); save(); render(); scrollTo(0, 0);
  }
  function vRun() {
    const t = ui.tt, d = DEF[t.kind];
    if (t.done) return vResult();
    const q = t.qs[t.i], k = t.i, picked = t.picks[k], typed = t.typed[k], answered = q.type === 'mc' ? picked != null : typed != null;
    const reveal = d.instant && answered, isLast = k === t.qs.length - 1;
    const body = q.type === 'mc'
      ? `<div class="opts">${q.opts.map((o, j) => `<button class="opt ${q.en ? 'en' : ''} ${reveal ? (o === q.ans ? 'ok' : j === picked ? 'ng' : '') : j === picked ? 'ok' : ''}" data-act="ttpick" data-i="${j}" ${reveal ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`
      : `<form data-form="ttform"><input id="ttin" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="答えを入力して Enter" value="${esc(typed || '')}" ${reveal ? 'readonly' : ''}></form>`;
    const lvTag = t.kind === 'place' ? `<span class="tsec">${q.lv} レベルの問題</span>` : `<span class="lv lv-${t.L[0]}">${t.L}</span><span class="tsec">${esc(q.sec)}</span>`;
    return `<div class="sheet panel">
      <div class="thead"><div class="row"><b>${d.title}</b>${lvTag}</div>
        <div class="row">${t.end ? `<span class="ttime" id="ttime">${Math.floor(Math.max(0, t.end - Date.now()) / 60000)}:${pad(Math.floor(Math.max(0, t.end - Date.now()) / 1000) % 60)}</span>` : ''}<span class="small muted">${k + 1} / ${t.qs.length}</span></div></div>
      <div class="meter"><i style="width:${(k + (answered ? 1 : 0)) / t.qs.length * 100}%"></i></div>
      ${q.prompt}${body}
      ${reveal ? `<div class="panel" style="gap:6px"><b class="${right(t, k) ? 'up' : 'dn'}">${right(t, k) ? '正解！' : '不正解'}</b><div>${q.explain || ''}</div></div>` : ''}
      <div class="row">
        ${k > 0 && !d.instant ? `<button class="btn" data-act="ttprev">戻る</button>` : ''}
        ${q.type === 'type' && !answered ? `<button class="btn primary" data-act="ttsubmit">答えを確定</button>` : ''}
        ${answered || !d.instant ? `<button class="btn ${answered ? 'primary' : ''}" data-act="${isLast ? 'ttfinish' : 'ttnext'}">${isLast ? '採点する' : answered ? '次へ' : 'とばす'}</button>` : ''}
        <button class="btn ghost" data-act="ttquit">中断する</button>
      </div>
      ${t.kind === 'place' ? '<p class="small muted">A1 から C2 まで順に難しくなります。わからない問題は当てずっぽうにせず「とばす」で進むと、判定が正確になります。</p>' : !d.instant ? '<p class="small muted">答えは最後にまとめて表示されます。迷ったら先に進み、「戻る」で見直せます。</p>' : ''}
    </div>`;
  }
  function vResult() {
    const t = ui.tt, d = DEF[t.kind], r = t.done;
    const wrong = t.qs.map((q, k) => [q, k]).filter(([, k]) => !r.ok[k]);
    const mock = t.kind === 'monthly' ? (S.mocks || []).filter(m => m.kind === 'full' && m.date.startsWith(t.key)).pop() : null;
    let banner = '';
    if (r.placed) { const e = eqOf(r.placed); banner = `<div class="banner info">あなたの現在レベルは <span style="font-family:var(--f-word);font-size:26px">${r.placed}</span>${e ? `<div class="small" style="font-weight:700">IELTS ${e.ielts} ・ 英検 ${e.eiken} ・ TOEIC ${e.toeic} 相当</div>` : ''}</div>`; }
    if (r.promoted) banner = `<div class="banner up">🎉 合格！ ${r.promoted[0]} → <span style="font-family:var(--f-word);font-size:26px">${r.promoted[1]}</span> に昇格しました<div class="small" style="font-weight:700">これから1か月の週間・マンスリーテストで${FAIL}点以下を取ると ${r.promoted[0]} に戻ります</div></div>`;
    else if (t.kind === 'levelup') banner = `<div class="banner dn">不合格（${r.p}点）。合格は${PASS}点以上です</div>`;
    if (r.demoted) banner = `<div class="banner dn">${r.p}点のため ${r.demoted[0]} → ${r.demoted[1]} に降格しました<div class="small" style="font-weight:700">昇格から1か月以内の週間・マンスリーテストで${FAIL}点以下だったため。もう一度レベルアップテストに挑戦しましょう</div></div>`;
    const secsHtml = t.kind === 'place'
      ? LEVELS.map(l => `<div><b>${Math.round((r.acc[l] || 0) * 100)}%</b><span>${l}</span></div>`).join('')
      : Object.entries(r.secs).map(([s, [a, n]]) => `<div><b>${a}/${n}</b><span>${esc(s)}</span></div>`).join('');
    return `<div class="sheet panel" style="gap:14px">
      <div class="thead"><h2 style="font-size:20px">${d.title}の結果 ${t.L ? `<span class="lv lv-${t.L[0]}">${t.L}</span>` : ''}</h2>${r.first === false ? '<span class="small muted">（2回目以降：最高点のみ記録）</span>' : ''}</div>
      ${banner}
      <div class="tres"><div><b>${r.p}<small style="font-size:14px">点</small></b><span>${r.score}/${t.qs.length} 問正解</span></div>${secsHtml}</div>
      ${t.kind === 'monthly' ? `<div class="panel" style="gap:8px;background:var(--sunk);border-radius:16px;padding:12px 14px"><b>Part B：模擬試験（フル）</b>
        ${mock ? `<span class="small">今月の模擬試験：リスニング ${mock.L ?? '—'} ・ リーディング ${mock.R ?? '—'}（${esc(mock.date)}）</span>` : '<span class="small">4技能のバンドを測るため、今月中に模擬試験（フル）も受けましょう。結果はここに表示されます。</span>'}
        <div><button class="btn primary" data-act="tab" data-tab="mock">模擬試験へ</button></div></div>` : ''}
      ${t.kind !== 'place' ? (wrong.length ? `<b>間違えた問題（${wrong.length}）</b><div class="trev">${wrong.map(([q, k]) => `<div><span class="tsec">${esc(q.sec)}</span> ${q.prompt.replace(/<button[\s\S]*?<\/button>/g, '').replace(/<div class="row">\s*<\/div>/g, '')}
        <div class="small">あなた：${q.type === 'mc' ? (t.picks[k] != null ? esc(q.opts[t.picks[k]]) : '（未回答）') : esc(t.typed[k] || '（未回答）')} ／ 正解：<b>${esc(q.ans)}</b></div>${q.say ? `<div class="row">${sayBtn(q.say, '音声')}</div>` : ''}<div class="small">${q.explain || ''}</div></div>`).join('')}</div>` : '<p><b class="up">全問正解！</b></p>') : ''}
      <div class="row"><button class="btn primary" data-act="ttclose">テスト一覧に戻る</button>${t.kind === 'levelup' && !r.pass ? `<button class="btn" data-act="ttstart" data-k="levelup">もう一度挑戦</button>` : t.kind !== 'place' && t.kind !== 'levelup' ? `<button class="btn" data-act="ttstart" data-k="${t.kind}">もう一度</button>` : ''}</div>
    </div>`;
  }

  /* ---------- dashboard ---------- */
  function vTests() {
    if (ui.tt) return vRun();
    const cbv = window.CB_VIEW?.(); if (cbv) return cbv;
    if (!S.lv) return `<section class="sheet panel" style="gap:12px"><h2 style="font-size:20px">まず判定テストで現在レベルを決めましょう</h2>
        <p>A1〜C2 の各レベルから5問ずつ、全30問（約10分）。正答率 60% 以上のレベルを積み上げて、あなたの現在レベルを判定します。</p>
        <ul class="small" style="margin:0;padding-left:1.2em;line-height:1.9"><li>デイリー・週間・マンスリーテストは、判定されたレベルの問題で出題されます</li><li>次のレベルへは「昇格テスト」で合格すると昇格（試験形式の模試なら <b>60%以上</b>、30問のクイック版なら <b>${PASS}点以上</b>）</li><li>昇格から1か月以内の週間・マンスリーテストで <b>${FAIL}点以下</b> だと自動で降格</li></ul>
        <div><button class="btn primary big" data-act="ttstart" data-k="place">判定テストを始める</button></div></section>${window.CB_LIST ? CB_LIST() : ''}`;
    const T = S.tests, cur = S.lv.cur, L = testLv(), nx = nextLv(cur), e = eqOf(cur);
    const card = kind => { const d = DEF[kind], rec = T[kind][d.key()], p = rec ? (rec.p ?? pct(rec.s, rec.n)) : null;
      const when = kind === 'daily' ? '今日' : kind === 'weekly' ? '今週' : '今月';
      return `<div class="trow ${rec ? 'done' : ''}"><span class="tic">${{daily: '📅', weekly: '🗓', monthly: '🏁'}[kind]}</span>
        <span class="ttx"><b>${d.title}</b><span>${d.n} ・ ${L} の問題</span>
        ${kind === 'daily' ? `<span class="tdots" aria-label="過去14日">${[...Array(14)].map((_, i) => { const dd = new Date(); dd.setDate(dd.getDate() - 13 + i); const x = T.daily[dayKey(dd)], q = x ? (x.p ?? pct(x.s, x.n)) : null; return `<i class="${q == null ? '' : q >= 70 ? 'on' : q <= FAIL ? 'ng' : 'mid'}" title="${dayKey(dd)}${q != null ? ` ${q}点` : ''}"></i>`; }).join('')}</span>` : ''}</span>
        <span class="tact"><span class="st ${p == null ? '' : p >= 70 ? 'up' : p <= FAIL ? 'dn' : ''}">${p == null ? `${when}はまだ` : `${when} ${p}点`}</span><button class="btn ${rec ? '' : 'primary'}" data-act="ttstart" data-k="${kind}">${rec ? 'もう一度' : 'はじめる'}</button></span></div>`; };
    const lastUp = [...T.levelup].reverse().find(x => x.lv === nx);
    const daysLeft = onProbation() ? Math.ceil((S.lv.probUntil - Date.now()) / 864e5) : 0;
    const bars = list => `<div class="tbars">${list.map(([k, r]) => `<div><span>${r.p ?? pct(r.s, r.n)}</span><i style="height:${Math.max(4, r.p ?? pct(r.s, r.n))}%"></i><span>${esc(k.replace(/^\d{4}-/, ''))}${r.lv ? ' ' + r.lv : ''}</span></div>`).join('')}</div>`;
    const months = Object.entries(T.monthly).sort().slice(-6), weeks = Object.entries(T.weekly).sort().slice(-8);
    return `<section class="sheet panel" style="gap:12px">
        <div class="lvhero"><div class="lvbadge"><div>${cur}<small>現在レベル</small></div></div>
          <div class="panel" style="gap:6px">
            <div class="lvsteps">${LEVELS.map(l => `<span class="${l === cur ? 'on' : LEVELS.indexOf(l) < LEVELS.indexOf(cur) ? 'past' : ''}">${l}</span>`).join('')}</div>
            ${e ? `<span class="small">IELTS ${e.ielts} ・ 英検 ${e.eiken} ・ TOEIC ${e.toeic} 相当</span>` : ''}
            <span class="small muted">テストの出題レベル：${L}${cur === 'A1' ? '（A1 の人は A2 の問題に挑戦します）' : ''}</span>
          </div></div>
        ${daysLeft ? `<div class="prob">昇格おめでとう！ あと ${daysLeft} 日間は「お試し期間」です。この間の週間・マンスリーテストで ${FAIL} 点以下を取ると ${S.lv.prev} に降格します。</div>` : ''}
      </section>
      <section class="upcard">${nx ? `<div class="up-h"><span class="up-k">昇格テスト</span><b>${cur} → ${nx}</b></div>
          <p>${window.CAMBRIDGE?.[nx] ? `<b>${esc(CAMBRIDGE[nx].name)}</b>の試験形式（読む・書く・聞く）で <b>60%以上</b>なら昇格。本試験の合格ラインと同じ基準です。` : `${nx} レベルの30問で ${PASS}点以上なら昇格。`}</p>
          <span class="small">${lastUp ? `前回 ${lastUp.p}${lastUp.cb ? '%' : '点'}（${lastUp.pass ? '合格' : '不合格'}）` : 'まだ挑戦していません'}</span>
          <div class="row">${window.CAMBRIDGE?.[nx] ? `<button class="btn up-go" data-act="cbstart" data-l="${nx}" data-m="levelup">試験形式で挑戦（約${CAMBRIDGE[nx].minutes}分）</button>` : ''}<button class="btn up-alt" data-act="ttstart" data-k="levelup">${window.CAMBRIDGE?.[nx] ? 'クイック版 30問' : `${nx} に挑戦する`}</button></div>`
        : `<div class="up-h"><span class="up-k">最高レベル</span><b>C2 到達 🎉</b></div>`}</section>
      <section class="sect"><div class="sect-h"><h3>定期テスト</h3><span>週間・マンスリーは降格判定あり</span></div><div class="tlist">${card('daily')}${card('weekly')}${card('monthly')}</div></section>
      ${window.CB_LIST ? CB_LIST() : ''}
      ${weeks.length ? `<section class="sheet panel" style="gap:6px"><b>週間テストの推移（点）</b>${bars(weeks)}</section>` : ''}
      ${months.length ? `<section class="sheet panel" style="gap:6px"><b>マンスリーテストの推移（点）</b>${bars(months)}</section>` : ''}
      ${S.lv.hist?.length ? `<section class="sheet panel" style="gap:6px"><b>レベルの履歴</b>${[...S.lv.hist].reverse().slice(0, 8).map(h => `<div class="small">${new Date(h.t).toLocaleDateString('ja-JP')}　${h.from ? `${h.from} → ` : ''}<b>${h.to}</b>　<span class="muted">${esc(h.why)}</span></div>`).join('')}</section>` : ''}
      <p class="note">デイリー・週間・マンスリーは同じ日・週・月なら同じ問題です（やり直すと最高点を記録）。週間テストは今週「単語カード」で学んだ単語を優先して出題します。<button class="btn ghost" data-act="ttreplace">判定テストをやり直す</button></p>`;
  }

  Object.assign(ACT, {
    ttstart: x => start(x.k),
    ttpick: x => { const t = ui.tt; t.picks[t.i] = +x.i; if (DEF[t.kind].instant) right(t, t.i) ? SFX.ok() : SFX.ng(); else SFX.pop(); if (!DEF[t.kind].instant && t.i < t.qs.length - 1) { t.i++; render(); autoplay(); } else render(); },
    ttsubmit: () => { const t = ui.tt, v = ($('#ttin')?.value || '').trim(); if (!v) return; t.typed[t.i] = v; if (DEF[t.kind].instant) right(t, t.i) ? SFX.ok() : SFX.ng(); if (!DEF[t.kind].instant && t.i < t.qs.length - 1) { t.i++; render(); autoplay(); } else render(); },
    ttnext: () => { const t = ui.tt; if (t.qs[t.i].type === 'type' && t.typed[t.i] == null) { const v = ($('#ttin')?.value || '').trim(); if (v) t.typed[t.i] = v; } t.i = Math.min(t.i + 1, t.qs.length - 1); render(); autoplay(); },
    ttprev: () => { ui.tt.i = Math.max(0, ui.tt.i - 1); render(); },
    ttfinish: () => { const t = ui.tt; if (t.qs[t.i].type === 'type' && t.typed[t.i] == null) { const v = ($('#ttin')?.value || '').trim(); if (v) t.typed[t.i] = v; } finish(); },
    ttquit: () => { if (confirm('テストを中断しますか？（記録されません）')) { clearInterval(timer); ui.tt = null; render(); } },
    ttclose: () => { ui.tt = null; render(); },
    ttsay: x => { const q = ui.tt?.qs[ui.tt.i]; if (q?.say) speak(q.say, !!x.slow); },
    ttreplace: () => { if (confirm('判定テストをやり直しますか？ 結果で現在レベルが上書きされます。')) start('place'); },
    hplace: () => { ACT.tab({tab: 'tests'}); start('place'); },    // ホームの「レベル診断」もこの判定テストに一本化
  });
  document.addEventListener('submit', e => { if (e.target.dataset?.form === 'ttform') { e.preventDefault(); ACT.ttsubmit(); } });

  /* ---------- home: level + today's daily test ---------- */
  const baseHome = window.EXTRA_VIEWS.home;
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, tests: vTests, home: () => {
    const h = baseHome(); if (ui.place) return h;
    if (!S.lv) return `<section class="sheet panel" style="gap:8px;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div class="panel" style="gap:2px"><b>まずは判定テスト（30問・約10分）</b><span class="small muted">現在レベル（A1〜C2）を決めると、毎日のテストがあなたのレベルで出題されます</span></div>
      <button class="btn primary" data-act="tplace">判定テストを始める</button></section>` + h;
    const r = S.tests.daily[dayKey()], p = r ? (r.p ?? pct(r.s, r.n)) : null;
    return `<section class="sheet panel" style="gap:10px;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div class="row" style="gap:12px"><span class="lvbadge" style="width:56px;height:56px;font-size:24px;border-radius:18px">${S.lv.cur}</span>
        <div class="panel" style="gap:2px"><b>今日のデイリーテスト</b><span class="small muted">${r ? `済み：${p}点` : `${testLv()} レベル・10問・約3分`}${onProbation() ? ` ・ お試し期間あと${Math.ceil((S.lv.probUntil - Date.now()) / 864e5)}日` : ''}</span></div></div>
      <div class="row"><button class="btn ${r ? '' : 'primary'}" data-act="tdaily">${r ? 'もう一度' : 'はじめる'}</button><button class="btn ghost" data-act="tab" data-tab="tests">テスト一覧</button></div></section>` + h;
  }};
  ACT.tdaily = () => { ACT.tab({tab: 'tests'}); start('daily'); };
  ACT.tplace = () => { ACT.tab({tab: 'tests'}); start('place'); };
  render();
})();
