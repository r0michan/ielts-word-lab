/* 学習パス（ホームの主役）・デイリークエスト・連続記録の週表示。
   A1〜C2 を1本の道にし、文法ユニット・単語ユニット（50語）・会話・昇格テストを順に並べる。
   ノードを押すと内容とスタートボタンが出て、そのままフォーカスモードのレッスンへ。 */
(() => {
  const css = `
  .hstats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
  .hs{background:var(--surface);border:2px solid var(--line);border-radius:18px;padding:10px 14px;display:flex;flex-direction:column;gap:4px;text-align:left}
  .hs b{font-family:var(--f-word);font-size:24px;line-height:1.1}
  .hs span{font-size:12px;color:var(--muted);font-weight:800}
  .hs.fire b{color:#FF9600} .hs.xp b{color:#E5A100} .hs.lv b{color:var(--accent)} .hs.exam b{color:var(--c3)}
  .hs .mini{height:8px;border-radius:99px;background:var(--sunk);overflow:hidden}
  .hs .mini i{display:block;height:100%;background:#FFC800;border-radius:99px}
  .week{display:flex;gap:4px}
  .week i{width:18px;height:18px;border-radius:50%;background:var(--sunk);display:grid;place-items:center;font-style:normal;font-size:10px;color:var(--muted);font-weight:800}
  .week i.on{background:#FF9600;color:#fff}
  .week i.today{outline:2px solid #FF9600;outline-offset:1px}
  .quests{display:flex;flex-direction:column;gap:10px}
  .qrow{display:grid;grid-template-columns:40px minmax(0,1fr) auto;gap:12px;align-items:center}
  .qrow .ic{font-size:26px;text-align:center}
  .qrow .t{font-weight:800;font-size:14.5px}
  .qbar{height:14px;border-radius:99px;background:var(--sunk);overflow:hidden;position:relative;margin-top:4px}
  .qbar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#FFC800,#FF9600)}
  .qbar em{position:absolute;inset:0;font-style:normal;font-size:10.5px;font-weight:900;display:grid;place-items:center;color:var(--ink)}
  .chest{border:0;background:none;font-size:28px;cursor:pointer;filter:grayscale(1);opacity:.5}
  .chest.ready{filter:none;opacity:1;animation:wiggle 1.2s ease-in-out infinite}
  .chest.got{filter:none;opacity:.4}
  @keyframes wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-12deg)}40%{transform:rotate(10deg)}60%{transform:rotate(-6deg)}}
  .chips-top{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px}
  .chips-top::-webkit-scrollbar{display:none}
  .ctop{flex:none;display:inline-flex;align-items:center;gap:4px;border:1.5px solid var(--line);background:var(--surface);border-radius:999px;padding:6px 12px;font-size:13px;font-weight:800;position:relative;overflow:hidden;cursor:default;color:var(--ink)}
  .ctop b{font-family:var(--f-word);font-size:16px}
  .ctop.fire b{color:#FF9600} .ctop.xp b{color:#E5A100} .ctop.lv{cursor:pointer} .ctop.lv b{color:var(--accent)} .ctop.ex b{color:var(--c3)}
  .ctop.xp i{position:absolute;left:0;bottom:0;height:3px;width:var(--p);background:#FFC800}
  .qcard{background:var(--surface);border:1.5px solid var(--line);border-radius:18px;overflow:hidden}
  .qdots{display:flex;gap:4px} .qdots i{width:10px;height:10px;border-radius:50%;background:var(--line)} .qdots i.on{background:#FFC800}
  .qcard .quests{padding:0 14px 14px}
  .cv{color:var(--muted);font-size:12px}
  .nextcard{display:flex;align-items:center;gap:14px;border-radius:20px;padding:14px 16px;background:color-mix(in srgb,var(--c) 12%,var(--surface));border:2px solid color-mix(in srgb,var(--c) 45%,transparent)}
  .nc-ic{width:48px;height:48px;border-radius:14px;background:var(--c);color:#fff;display:grid;place-items:center;flex:none}
  .nc-ic svg{width:26px;height:26px}
  .nc-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
  .nc-t b{font-size:16px;line-height:1.35}
  .nc-t > span:last-child{font-size:12.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .nc-k{font-size:11.5px;font-weight:900;color:var(--c)}
  .nc-go{flex:none;border:0;border-radius:14px;padding:11px 16px;font-weight:900;color:#fff;background:var(--c);box-shadow:0 3px 0 color-mix(in srgb,var(--c) 70%,#000);cursor:pointer;font-family:var(--f-ui)}
  .nc-go:active{transform:translateY(2px);box-shadow:0 1px 0 color-mix(in srgb,var(--c) 70%,#000)}
  .clist{gap:6px!important}
  .clevel{border-top:1px solid var(--line)} .clevel:first-of-type{border-top:0}
  .crow{width:100%;display:grid;grid-template-columns:auto auto minmax(40px,1fr) auto auto;align-items:center;gap:10px;border:0;background:none;padding:10px 2px;cursor:pointer;color:var(--ink);text-align:left}
  .cb{color:#fff;font-family:var(--f-word);font-weight:800;font-size:13px;border-radius:8px;padding:2px 8px}
  .cn{font-size:13.5px;font-weight:800;white-space:nowrap}
  .cn em{font-style:normal;font-size:10.5px;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:1px 7px;margin-left:6px}
  .cbar{height:8px;border-radius:99px;background:var(--sunk);overflow:hidden} .cbar i{display:block;height:100%;border-radius:99px}
  .cc{font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}
  .csteps{display:flex;flex-direction:column;gap:6px;padding:2px 0 12px}
  .cstep{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:10px;align-items:center;border:1.5px solid var(--line);background:var(--surface);border-radius:14px;padding:8px 10px;text-align:left;cursor:pointer;color:var(--ink)}
  .cstep:hover{border-color:var(--accent)}
  .cstep.now{border-color:var(--accent);background:var(--accent-soft)}
  .ci{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--sunk);color:var(--c);font-weight:900}
  .cstep.ok .ci{background:#FFC800;color:#fff} .cstep.now .ci{background:var(--c);color:#fff}
  .ci svg{width:18px;height:18px}
  .ct{display:flex;flex-direction:column;min-width:0} .ct b{font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .ct span{font-size:11.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .cgo{font-size:12px;font-weight:900;color:var(--muted)} .cstep.now .cgo{color:var(--accent)}
  .cmore{border:1.5px dashed var(--line);background:none;border-radius:12px;padding:7px;font-size:12.5px;font-weight:800;color:var(--muted);cursor:pointer}
  @media (prefers-reduced-motion:reduce){.chest.ready{animation:none}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const IC = new Proxy({}, {get: (_, k) => window.SHELL_ICON?.[k] || ''});   // shell.js loads after this file
  const COLORS = {A1: '#58CC71', A2: '#1CB0F6', B1: '#CE82FF', B2: '#FF9600', C1: '#FF4B4B', C2: '#2B70C9'};
  const TROPHY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>';
  const pad = n => String(n).padStart(2, '0');
  const dk = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  S.path = S.path || {};
  ui.path = {open: null, all: null, qopen: false};

  /* ---------- the path: nodes per level ---------- */
  const SIZE = 50;
  function nodesFor(L) {
    const gs = (window.GRAMMAR || []).filter(g => g.lv === L);
    const W = Math.ceil(WORDS.filter(w => w.lv === L).length / SIZE);
    const ss = (window.SITUATIONS || []).filter(s => s.lv === L);
    const out = [], gStep = Math.max(1, Math.ceil(W / Math.max(1, gs.length))), sStep = Math.max(1, Math.ceil(W / Math.max(1, ss.length)));
    let gi = 0, si = 0;
    if (gs.length) out.push({t: 'g', g: gs[gi++]});
    for (let u = 0; u < W; u++) {
      out.push({t: 'w', u});
      if ((u + 1) % gStep === 0 && gi < gs.length) out.push({t: 'g', g: gs[gi++]});
      if ((u + 1) % sStep === 0 && si < ss.length) out.push({t: 's', s: ss[si++]});
    }
    while (gi < gs.length) out.push({t: 'g', g: gs[gi++]});
    while (si < ss.length) out.push({t: 's', s: ss[si++]});
    out.push({t: 'c'});
    return out.map((n, i) => ({...n, L, i, key: n.t === 'g' ? n.g.id : n.t === 'w' ? `w:${L}:${n.u}` : n.t === 's' ? 's:' + n.s.id : 'c:' + L}));
  }
  const situDone = id => Object.keys(S.situ || {}).some(k => (k === id || k.startsWith(id + ':')) && S.situ[k]?.done);
  function isDone(n) {
    if (n.t === 'g') return (S.course?.[n.g.id]?.best || 0) >= 80;
    if (n.t === 'w') return (S.path[n.key] || 0) >= 80;
    if (n.t === 's') return situDone(n.s.id);
    return S.lv ? LEVELS.indexOf(S.lv.cur) > LEVELS.indexOf(n.L) : false;
  }
  const curLevel = () => S.lv?.cur || 'A1';
  function info(n) {
    if (n.t === 'g') return {title: n.g.title, sub: `文法 ・ ${n.g.school}で習う`, icon: IC.lessons, cta: (S.course?.[n.g.id] ? 'レッスン開始' : '解説を読んで始める') + ' +15 XP'};
    if (n.t === 'w') { const ws = WORDS.filter(w => w.lv === n.L).slice(n.u * SIZE, n.u * SIZE + SIZE); return {title: `単語 ${n.L} Unit ${n.u + 1}`, sub: `${ws[0]?.w || ''} 〜 ${ws[ws.length - 1]?.w || ''}（${ws.length}語）`, icon: IC.card, cta: 'レッスン開始 +15 XP'}; }
    if (n.t === 's') return {title: n.s.title, sub: `会話ロールプレイ ・ ${n.s.place}`, icon: IC.situ, cta: '会話を練習する +5 XP'};
    const nx = LEVELS[LEVELS.indexOf(n.L) + 1];
    return {title: nx ? `${n.L} → ${nx} 昇格テスト` : 'C2 修了', sub: nx ? '試験形式の模試で60%以上なら次のレベルへ' : '最高レベルです', icon: TROPHY, cta: nx ? (S.lv ? '昇格テストに挑戦' : 'まず判定テストを受ける') : 'おめでとう！'};
  }
  // compact course list: one "next lesson" card + one row per level; a level opens into a short list of steps
  const SHORT = {A1: '中学英語', A2: '高校基礎', B1: '高校卒業', B2: '大学・中上級', C1: '上級', C2: 'ネイティブ級'};
  function nextNode() {
    const start = LEVELS.indexOf(curLevel());
    for (let i = start; i < LEVELS.length; i++) { const n = nodesFor(LEVELS[i]).find(x => !isDone(x)); if (n) return n; }
    return null;
  }
  const TYPE = {g: '文法', w: '単語', s: '会話', c: 'テスト'};
  function stepRow(n, isNext) {
    const d = isDone(n), f = info(n);
    return `<button class="cstep ${d ? 'ok' : ''} ${isNext ? 'now' : ''}" data-act="pgo" data-k="${n.key}">
      <span class="ci" style="--c:${COLORS[n.L]}">${d ? '✓' : f.icon}</span>
      <span class="ct"><b>${esc(f.title)}</b><span>${n.t === 'w' ? '単語 ・ ' : ''}${esc(f.sub)}</span></span>
      <span class="cgo">${isNext ? 'スタート' : d ? '復習' : '›'}</span></button>`;
  }
  function vPath(opt = {}) {
    const nx = nextNode(), f = nx && info(nx);
    const hero = nx ? `<section class="nextcard" style="--c:${COLORS[nx.L]}">
        <span class="nc-ic">${f.icon}</span>
        <span class="nc-t"><span class="nc-k">次のレッスン ・ ${nx.L} ${TYPE[nx.t]}</span><b>${esc(f.title)}</b><span>${esc(f.sub)}</span></span>
        <button class="nc-go" data-act="pgo" data-k="${nx.key}">はじめる</button></section>`
      : `<section class="nextcard" style="--c:#FFC800"><span class="nc-t"><b>全レベル修了！</b><span>復習したいレベルを下から選べます</span></span></section>`;
    const rows = LEVELS.map(L => {
      const ns = nodesFor(L), done = ns.filter(isDone).length, open = ui.path.open === L;
      let list = '';
      if (open) {
        const ni = ns.findIndex(n => !isDone(n)), all = ui.path.all === L;
        const from = all ? 0 : Math.max(0, (ni < 0 ? ns.length : ni) - 2), shown = all ? ns : ns.slice(from, from + 8);
        list = `<div class="csteps">${!all && from > 0 ? `<button class="cmore" data-act="pall" data-l="${L}">前の ${from} 件を表示</button>` : ''}${shown.map(n => stepRow(n, nx && n.key === nx.key)).join('')}${!all && from + 8 < ns.length ? `<button class="cmore" data-act="pall" data-l="${L}">残り ${ns.length - from - 8} 件を表示</button>` : ''}</div>`;
      }
      return `<div class="clevel ${open ? 'open' : ''}"><button class="crow" data-act="psec" data-l="${L}" aria-expanded="${open}">
        <span class="cb" style="background:${COLORS[L]}">${L}</span><span class="cn">${SHORT[L]}${S.lv?.cur === L ? '<em>現在</em>' : ''}</span>
        <span class="cbar"><i style="width:${done / ns.length * 100}%;background:${COLORS[L]}"></i></span><span class="cc">${done}/${ns.length}</span><span class="cv">${open ? '▴' : '▾'}</span></button>${list}</div>`;
    }).join('');
    return `${opt.noHero ? '' : hero}<section class="sheet panel clist">${opt.noHero ? '' : '<div class="row" style="justify-content:space-between"><b>コース（A1〜C2）</b><span class="small muted">文法・単語・会話・テスト</span></div>'}${rows}</section>`;
  }

  /* ---------- lessons started from the path ---------- */
  function wordLesson(L, u) {
    const ws = WORDS.filter(w => w.lv === L).slice(u * SIZE, u * SIZE + SIZE).filter(w => w.ja), pool = WORDS.filter(w => w.lv === L && w.ja);
    const pickN = (n, f) => shuffle(ws.filter(f)).slice(0, n);
    const others = (w, key, n = 3) => [...new Set(shuffle(pool.filter(x => x.id !== w.id && x.pos === w.pos)).map(x => x[key]))].filter(v => v !== w[key]).slice(0, n);
    const qs = [];
    pickN(4, () => true).forEach(w => qs.push({type: 'mc', tag: '単語の意味', lead: 'この単語の意味は？', prompt: `<b>${esc(w.w)}</b>`, opts: shuffle([w.ja, ...others(w, 'ja')]), ans: w.ja, ja: true, full: w.ex || '', why: `${w.w}（${w.pos}）＝ ${w.ja}`}));
    pickN(4, w => !/\s/.test(w.w)).forEach(w => qs.push({type: 'mc', tag: '英単語', lead: `「${esc(w.ja)}」は英語で？`, prompt: '', opts: shuffle([w.w, ...others(w, 'w')]), ans: w.w, full: w.ex || ''}));
    pickN(2, () => true).forEach(w => qs.push({type: 'mc', tag: 'リスニング', lead: '音声を聞いて、単語を選んでください', prompt: `<button class="btn primary" data-act="say" data-text="${esc(w.w)}">${ICON.speak}再生</button> <button class="btn" data-act="say" data-text="${esc(w.w)}" data-slow="1">${ICON.slow}ゆっくり</button>`, opts: shuffle([w.w, ...others(w, 'w')]), ans: w.w, why: `${w.w} ＝ ${w.ja}`}));
    return shuffle(qs);
  }
  function go(key) {
    const L = LEVELS.find(l => nodesFor(l).some(n => n.key === key)), n = nodesFor(L).find(x => x.key === key);
    if (n.t === 'g') {
      if (!S.course?.[n.g.id]) { ui.cs.lv = L; ui.cs.unit = n.g.id; ACT.tab({tab: 'course'}); return; }
      ACT.tab({tab: 'course'});
      COURSE_RUN(n.g.title, GRAMMAR_BANK.unit(n.g, 10), p => { const c = S.course[n.g.id] || {}; S.course[n.g.id] = {best: Math.max(c.best || 0, p), at: Date.now()}; save(); }, {from: 'home'});
    } else if (n.t === 'w') {
      ACT.tab({tab: 'course'});
      COURSE_RUN(`単語 ${L} Unit ${n.u + 1}`, wordLesson(L, n.u), p => { S.path[n.key] = Math.max(S.path[n.key] || 0, p); save(); }, {from: 'home'});
    } else if (n.t === 's') { ACT.tab({tab: 'situ'}); ACT.stopen({id: n.s.id}); }
    else if (LEVELS[LEVELS.indexOf(L) + 1]) { ACT.tab({tab: 'tests'}); ACT.ttstart({k: S.lv ? 'levelup' : 'place'}); }
  }
  window.PATH_FOCUS = () => scrollTo(0, 0);

  /* ---------- daily quests ---------- */
  const POOL = [['correct', 20, '20問正解する', '🎯'], ['lesson', 2, 'レッスンを2つ完了する', '📘'], ['xp', 50, '50 XP 獲得する', '⚡'], ['cards', 20, '単語クイズに20問答える', '❓'], ['situ', 1, '会話ロールプレイを1回やる', '💬'], ['test', 1, 'テストを1回受ける', '📝'], ['combo', 5, '5問連続で正解する', '🔥'], ['perfect', 1, 'レッスンを全問正解する', '🏆']];
  function quest() {
    const d = dk();
    if (S.quest?.d !== d) {
      let h = 0; for (const c of d) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const pool = [...POOL], items = [];
      while (items.length < 3) { const i = h % pool.length; items.push(pool.splice(i, 1)[0][0]); h = Math.floor(h / 7) + 13; }
      S.quest = {d, items, prog: {}, claimed: []};
    }
    return S.quest;
  }
  const bump = (k, n = 1, max = false) => { const q = quest(); q.prog[k] = max ? Math.max(q.prog[k] || 0, n) : (q.prog[k] || 0) + n; saveSoon(); };
  const baseXP = window.addXP;
  window.addXP = (n, cat) => { baseXP?.(n, cat); bump('xp', n); if (cat === 'situ') bump('situ'); if (cat === 'test') bump('test'); };
  const prevAQ = answerQuiz; answerQuiz = function () { bump('cards'); return prevAQ.apply(this, arguments); };
  if (window.SFX) { const ok0 = SFX.ok.bind(SFX); SFX.ok = function () { ok0(); bump('correct'); bump('combo', SFX.combo, true); }; }
  addEventListener('lessondone', e => { bump('lesson'); if (e.detail.p === 100) bump('perfect'); });
  function vQuests() {
    const q = quest(), rows = q.items.map(k => { const [, goal, label, ic] = POOL.find(p => p[0] === k), v = Math.min(goal, q.prog[k] || 0); return {k, goal, label, ic, v, got: q.claimed.includes(k), ready: v >= goal && !q.claimed.includes(k)}; });
    const fin = rows.filter(r => r.v >= r.goal).length, ready = rows.some(r => r.ready), open = ui.path.qopen || ready;
    return `<section class="qcard"><button class="qhd" data-act="qtoggle" aria-expanded="${open}"><span>🎯 デイリークエスト</span><span class="qdots">${rows.map(r => `<i class="${r.v >= r.goal ? 'on' : ''}"></i>`).join('')}</span><span class="small muted">${fin}/3 ${ready ? '・ <b style="color:#E5A100">報酬あり</b>' : ''}</span><span class="cv">${open ? '▴' : '▾'}</span></button>
      ${open ? `<div class="quests">${rows.map(r => `<div class="qrow"><span class="ic">${r.ic}</span><div><div class="t">${r.label}</div><div class="qbar"><i style="width:${r.v / r.goal * 100}%"></i><em>${r.v} / ${r.goal}</em></div></div><button class="chest ${r.got ? 'got' : r.ready ? 'ready' : ''}" data-act="qclaim" data-k="${r.k}" ${r.ready ? '' : 'disabled'} aria-label="${r.ready ? '報酬を受け取る' : r.got ? '受け取り済み' : '未達成'}">${r.got ? '✅' : '🎁'}</button></div>`).join('')}</div>` : ''}</section>`;
  }

  /* ---------- top stats ---------- */
  function streak() { let n = 0; const d = new Date(); if (!S.log?.[dk(d)]?.xp) d.setDate(d.getDate() - 1); while (S.log?.[dk(d)]?.xp) { n++; d.setDate(d.getDate() - 1); } return n; }
  function vStats() {
    const xp = S.log?.[dk()]?.xp || 0, goal = S.goal || 50, sk = streak();
    const days = S.exam?.date ? Math.ceil((new Date(S.exam.date) - new Date(new Date().toDateString())) / 864e5) : null;
    return `<div class="chips-top">
      <span class="ctop fire" title="連続記録">🔥 <b>${sk}</b>日</span>
      <span class="ctop xp" title="今日のXP">⚡ <b>${xp}</b>/${goal}<i style="--p:${Math.min(100, xp / goal * 100)}%"></i></span>
      <button class="ctop lv" data-act="tab" data-tab="tests" title="現在レベル">Lv <b>${S.lv ? S.lv.cur : '—'}</b></button>
      ${days != null && days >= 0 ? `<span class="ctop ex" title="試験まで">📅 あと<b>${days}</b>日</span>` : ''}
    </div>`;
  }

  window.PATH = {stats: vStats, quests: vQuests, path: vPath, next: nextNode, info, go, streak, quest, COLORS, TYPE};
  Object.assign(ACT, {
    psec: x => { ui.path.open = ui.path.open === x.l ? null : x.l; ui.path.all = null; render(); },
    pall: x => { ui.path.all = x.l; render(); },
    qtoggle: () => { ui.path.qopen = !ui.path.qopen; render(); },
    pgo: x => go(x.k),
    qclaim: x => { const q = quest(); if (q.claimed.includes(x.k)) return; q.claimed.push(x.k); baseXP?.(10, 'quest'); bump('xp', 10); save(); window.CONFETTI?.(70); render(); },
  });
})();
