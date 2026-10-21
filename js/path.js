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
  .psec{border-radius:22px;padding:16px 18px;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:10px;cursor:pointer;border:0;text-align:left;width:100%;box-shadow:0 4px 0 rgba(0,0,0,.15)}
  .psec b{font-size:20px;font-family:var(--f-word)}
  .psec span{font-size:12.5px;opacity:.95;display:block}
  .psec .pc{font-family:var(--f-word);font-weight:800;font-size:15px;white-space:nowrap}
  .lvA1{background:#58CC71}.lvA2{background:#1CB0F6}.lvB1{background:#CE82FF}.lvB2{background:#FF9600}.lvC1{background:#FF4B4B}.lvC2{background:#2B70C9}
  .path{display:flex;flex-direction:column;align-items:center;gap:18px;padding:22px 0 10px;overflow-x:clip}
  .pnode{transform:translateX(var(--x))}
  .pnode.sel{z-index:40}
  @media (max-width:480px){.pnode{transform:translateX(calc(var(--x) * .6))}}
  .pnode{position:relative;display:flex;flex-direction:column;align-items:center}
  .pbtn{width:72px;height:66px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff;box-shadow:0 7px 0 rgba(0,0,0,.18);transition:transform .08s}
  .pbtn:active{transform:translateY(5px);box-shadow:0 2px 0 rgba(0,0,0,.18)}
  .pbtn svg{width:30px;height:30px;stroke-width:2.6}
  .pnode.ptodo .pbtn{background:#E5E5E5!important;color:#AFAFAF;box-shadow:0 7px 0 #CFCFCF}
  .pnode.pdone .pbtn{background:#FFC800!important;box-shadow:0 7px 0 #E5A100}
  .pnode.pnext .pbtn{animation:bob 1.6s ease-in-out infinite}
  .pnode.pnext::before{content:"";position:absolute;top:-9px;width:90px;height:90px;border-radius:50%;border:6px solid var(--line)}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .pstart{position:absolute;top:-46px;background:var(--surface);border:2px solid var(--line);border-radius:12px;padding:5px 12px;font-weight:900;font-size:13px;color:var(--accent);white-space:nowrap;animation:bob 1.6s ease-in-out infinite}
  .pstart::after{content:"";position:absolute;left:50%;bottom:-8px;margin-left:-7px;border:7px solid transparent;border-top-color:var(--line)}
  .ppop{position:absolute;top:84px;z-index:20;width:min(280px,78vw);border-radius:18px;padding:14px 16px;color:#fff;display:flex;flex-direction:column;gap:6px;text-align:left;box-shadow:0 10px 30px rgba(0,0,0,.2)}
  .ppop b{font-size:16px}
  .ppop span{font-size:13px;opacity:.95}
  .ppop button{border:0;border-radius:12px;background:#fff;font-weight:900;padding:11px;cursor:pointer;font-family:var(--f-ui);box-shadow:0 4px 0 rgba(0,0,0,.15)}
  .pcheck{width:110px;height:96px;border-radius:24px}
  .pmore{border:2px dashed var(--line);background:none;border-radius:16px;padding:10px 16px;color:var(--muted);font-weight:800;cursor:pointer}
  @media (prefers-reduced-motion:reduce){.pnode.pnext .pbtn,.pstart,.chest.ready{animation:none}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const IC = new Proxy({}, {get: (_, k) => window.SHELL_ICON?.[k] || ''});   // shell.js loads after this file
  const COLORS = {A1: '#58CC71', A2: '#1CB0F6', B1: '#CE82FF', B2: '#FF9600', C1: '#FF4B4B', C2: '#2B70C9'};
  const TROPHY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>';
  const pad = n => String(n).padStart(2, '0');
  const dk = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  S.path = S.path || {};
  ui.path = {open: {}, sel: null};

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
    return {title: nx ? `${n.L} → ${nx} 昇格テスト` : 'C2 修了', sub: nx ? '80点で次のレベルへ' : '最高レベルです', icon: TROPHY, cta: nx ? (S.lv ? '昇格テストに挑戦' : 'まず判定テストを受ける') : 'おめでとう！'};
  }
  const OFF = [0, 46, 72, 46, 0, -46, -72, -46];
  function section(L, open) {
    const ns = nodesFor(L), done = ns.filter(isDone).length, j = window.LEVEL_JP?.[L] || {};
    const next = ns.find(n => !isDone(n));
    const head = `<button class="psec lv${L}" data-act="psec" data-l="${L}"><span><b>${L}</b><span>${j.school || ''} ・ 英検 ${j.eiken || '—'} ・ TOEIC ${j.toeic || '—'}</span></span><span class="pc">${done} / ${ns.length} ${open ? '▲' : '▼'}</span></button>`;
    if (!open) return head;
    return head + `<div class="path">${ns.map((n, k) => {
      const d = isDone(n), nx = n === next, f = info(n), sel = ui.path.sel === n.key;
      return `<div class="pnode ${d ? 'pdone' : nx ? 'pnext' : 'ptodo'} ${sel ? 'sel' : ''}" id="pn-${n.key.replace(/[^a-z0-9-]/gi, '_')}" style="--x:${OFF[k % OFF.length]}px">
        ${nx && !sel ? '<span class="pstart">スタート</span>' : ''}
        <button class="pbtn ${n.t === 'c' ? 'pcheck' : ''}" style="background:${COLORS[L]}" data-act="psel" data-k="${n.key}" aria-label="${esc(f.title)}">${f.icon || ''}</button>
        ${sel ? `<div class="ppop" style="background:${d ? '#E5A100' : COLORS[L]}"><b>${esc(f.title)}</b><span>${esc(f.sub)}${d ? ' ・ 完了済み' : ''}</span><button style="color:${d ? '#E5A100' : COLORS[L]}" data-act="pgo" data-k="${n.key}">${d && n.t !== 'c' ? 'もう一度練習する' : esc(f.cta)}</button></div>` : ''}
      </div>`;
    }).join('')}</div>`;
  }
  function vPath() {
    const cur = curLevel();
    if (ui.path.open[cur] === undefined) ui.path.open[cur] = true;
    return `<div class="panel" style="gap:12px">${LEVELS.map(L => section(L, !!ui.path.open[L])).join('')}</div>`;
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
    ui.path.sel = null;
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
  window.PATH_FOCUS = () => setTimeout(() => { const el = document.querySelector('.pnode.pnext'); if (el) el.scrollIntoView({block: 'center', behavior: 'smooth'}); }, 80);

  /* ---------- daily quests ---------- */
  const POOL = [['correct', 20, '20問正解する', '🎯'], ['lesson', 2, 'レッスンを2つ完了する', '📘'], ['xp', 50, '50 XP 獲得する', '⚡'], ['cards', 20, '単語カードを20枚めくる', '🃏'], ['situ', 1, '会話ロールプレイを1回やる', '💬'], ['test', 1, 'テストを1回受ける', '📝'], ['combo', 5, '5問連続で正解する', '🔥'], ['perfect', 1, 'レッスンを全問正解する', '🏆']];
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
  const prevGrade = grade; grade = function (id, ok) { bump('cards'); return prevGrade.apply(this, arguments); };
  if (window.SFX) { const ok0 = SFX.ok.bind(SFX); SFX.ok = function () { ok0(); bump('correct'); bump('combo', SFX.combo, true); }; }
  addEventListener('lessondone', e => { bump('lesson'); if (e.detail.p === 100) bump('perfect'); });
  function vQuests() {
    const q = quest();
    return `<section class="sheet panel" style="gap:12px"><div class="row" style="justify-content:space-between"><b>デイリークエスト</b><span class="small muted">毎日0時に新しいクエスト</span></div>
      <div class="quests">${q.items.map(k => { const [, goal, label, ic] = POOL.find(p => p[0] === k), v = Math.min(goal, q.prog[k] || 0), got = q.claimed.includes(k), ready = v >= goal && !got;
        return `<div class="qrow"><span class="ic">${ic}</span><div><div class="t">${label}</div><div class="qbar"><i style="width:${v / goal * 100}%"></i><em>${v} / ${goal}</em></div></div><button class="chest ${got ? 'got' : ready ? 'ready' : ''}" data-act="qclaim" data-k="${k}" ${ready ? '' : 'disabled'} aria-label="${ready ? '報酬を受け取る' : got ? '受け取り済み' : '未達成'}">${got ? '✅' : '🎁'}</button></div>`; }).join('')}</div></section>`;
  }

  /* ---------- top stats ---------- */
  function streak() { let n = 0; const d = new Date(); if (!S.log?.[dk(d)]?.xp) d.setDate(d.getDate() - 1); while (S.log?.[dk(d)]?.xp) { n++; d.setDate(d.getDate() - 1); } return n; }
  function vStats() {
    const xp = S.log?.[dk()]?.xp || 0, goal = S.goal || 50, sk = streak();
    const mon = new Date(); mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
    const week = [...Array(7)].map((_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); const on = !!S.log?.[dk(d)]?.xp, today = dk(d) === dk(); return `<i class="${on ? 'on' : ''} ${today ? 'today' : ''}">${'月火水木金土日'[i]}</i>`; }).join('');
    const days = S.exam?.date ? Math.ceil((new Date(S.exam.date) - new Date(new Date().toDateString())) / 864e5) : null;
    return `<div class="hstats">
      <div class="hs fire"><span>連続記録</span><b>🔥 ${sk}日</b><div class="week">${week}</div></div>
      <div class="hs xp"><span>今日のXP</span><b>⚡ ${xp}<small style="font-size:13px;color:var(--muted)"> / ${goal}</small></b><div class="mini"><i style="width:${Math.min(100, xp / goal * 100)}%"></i></div></div>
      <button class="hs lv" data-act="tab" data-tab="tests"><span>現在レベル</span><b>${S.lv ? S.lv.cur : '—'}</b><span>${S.lv ? 'テスト・昇格へ' : '判定テストを受ける'}</span></button>
      ${days != null && days >= 0 ? `<div class="hs exam"><span>試験まで</span><b>${days}日</b><span>IELTS ${(S.exam?.target || 6.5).toFixed(1)} 目標</span></div>` : `<button class="hs exam" data-act="tab" data-tab="hub-record"><span>試験日</span><b style="font-size:16px">未設定</b><span>記録・設定で登録</span></button>`}
    </div>`;
  }

  window.PATH = {stats: vStats, quests: vQuests, path: vPath};
  Object.assign(ACT, {
    psec: x => { ui.path.open[x.l] = !ui.path.open[x.l]; render(); },
    psel: x => { ui.path.sel = ui.path.sel === x.k ? null : x.k; render(); },
    pgo: x => go(x.k),
    qclaim: x => { const q = quest(); if (q.claimed.includes(x.k)) return; q.claimed.push(x.k); baseXP?.(10, 'quest'); bump('xp', 10); save(); window.CONFETTI?.(70); render(); },
  });
  document.addEventListener('click', e => { if (ui.path.sel && !e.target.closest('.pnode')) { ui.path.sel = null; if (S.tab === 'home') render(); } });
})();
