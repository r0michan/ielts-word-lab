/* 模擬試験 (mock test in exam order with section timers) and the exam-date countdown & study plan on the home screen. */
(() => {
  const css = `
  .mhead{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--bg);padding-block:8px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-bottom:1px solid var(--line)}
  .msteps{display:flex;gap:4px;flex-wrap:wrap}
  .msteps span{font-size:12px;border-radius:6px;padding:2px 8px;background:var(--sunk);color:var(--muted)}
  .msteps span.on{background:var(--accent);color:var(--on-accent);font-weight:700}
  .msteps span.done{background:var(--good-soft);color:var(--good)}
  .mclock{font-family:var(--f-word);font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;margin-left:auto}
  .mclock.over{color:var(--bad)}
  .mockbody #lsel,.mockbody #rsel,.mockbody #wprompt,.mockbody [data-act="wtask"],.mockbody [data-act="spart"],.mockbody [data-act="snew"],.mockbody [data-act="lretry"],.mockbody [data-act="lnext"],.mockbody [data-act="rretry"],.mockbody [data-act="rnext"],.mockbody [data-act="sretry"]{display:none}
  .bands{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}
  .bands div{background:var(--sunk);border-radius:10px;padding:12px}
  .bands b{display:block;font-family:var(--f-word);font-size:28px;font-variant-numeric:tabular-nums}
  .bands span{font-size:12.5px;color:var(--muted)}
  .plan{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:center}
  .days{font-family:var(--f-word);font-size:44px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
  .plan ul{margin:0;padding-left:18px;font-size:14px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const DAY = 864e5;
  const RD = () => window.READING || [], LS = () => window.LISTENING || [];
  const nz = x => String(x ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const lisRight = (q, a) => a != null && a !== '' && (q[0] !== 'gap' ? a === q[2] : q[2].split('/').some(x => nz(x) === nz(a)));

  /* ---------- band estimates (IELTS 40-question tables, scaled) ---------- */
  const L_TABLE = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [6, 3.5], [4, 3], [0, 2.5]];
  const R_TABLE = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [0, 2.5]];
  const band = (ok, total, table) => { const raw = Math.round(ok / Math.max(total, 1) * 40); return table.find(([min]) => raw >= min)[1]; };

  /* ---------- exam plan on the home screen ---------- */
  S.exam = S.exam || null;
  S.mocks = S.mocks || [];
  function plan() {
    const e = S.exam; if (!e?.date) return null;
    const days = Math.ceil((new Date(e.date + 'T09:00') - Date.now()) / DAY);
    const lv = e.target >= 7.5 ? ['B2', 'C1', 'C2'] : e.target >= 6.5 ? ['B1', 'B2', 'C1'] : ['A2', 'B1', 'B2'];
    const wordsLeft = WORDS.filter(w => lv.includes(w.lv) && (S.prog[w.id]?.box || 0) < 4).length;
    const sentLeft = SENT.filter(x => !(S.sprog[x.id]?.ok)).length;
    const studyDays = Math.max(1, days - 7);                       // keep the last week for review
    const wpd = Math.min(80, Math.ceil(wordsLeft / studyDays)), spd = Math.min(20, Math.ceil(sentLeft / studyDays));
    const phase = days < 0 ? ['試験日を過ぎています', '新しい試験日を設定しましょう。'] :
      days <= 7 ? ['直前期', '新しいことは増やさず、間違いノートと模擬試験の見直しに集中。睡眠を優先。'] :
      days <= 20 ? ['仕上げ期', '週1回は模擬試験。間違いノートを毎日。ライティングは時間を計って。'] :
      days <= 60 ? ['実践期', '単語・構文に加えて、読解・リスニングを週2本ずつ。ライティングは週1本。'] :
      ['基礎固め期', '単語と構文を中心に。毎日少しずつ、スピーキングで口に出す習慣を。'];
    return {days, lv, wordsLeft, sentLeft, wpd, spd, phase, goal: wpd + spd * 2 + 20};
  }
  window.EXAM_PLAN = plan;
  function planCard() {
    const p = plan(), e = S.exam || {};
    const dateIn = `<input type="date" id="exdate" value="${esc(e.date || '')}" style="font-size:15px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;background:var(--surface)">`;
    const tgt = `<select id="extarget">${[5.5, 6, 6.5, 7, 7.5, 8].map(b => `<option value="${b}"${(e.target || 6.5) === b ? ' selected' : ''}>${b.toFixed(1)}</option>`).join('')}</select>`;
    const mod = `<select id="exmodule"><option value="ac"${e.module !== 'gt' ? ' selected' : ''}>Academic</option><option value="gt"${e.module === 'gt' ? ' selected' : ''}>General Training</option></select>`;
    if (!p) return `<section class="sheet panel" style="gap:10px"><b>試験日と目標</b><p class="small">試験日を入れると、残り日数から1日の学習量を自動で計算します。</p>
      <div class="row"><label class="small">試験日 ${dateIn}</label><label class="small">目標 ${tgt}</label><label class="small">${mod}</label></div></section>`;
    return `<section class="sheet panel" style="gap:12px">
      <div class="plan"><div><span class="small muted">試験まで</span><div class="days">${Math.max(0, p.days)}<span style="font-size:16px;font-family:var(--f-ui);font-weight:500"> 日</span></div></div>
        <div><b>${esc(p.phase[0])}</b><p class="small" style="margin-top:4px">${esc(p.phase[1])}</p></div></div>
      ${p.days >= 0 ? `<ul>
        <li>単語：目標レベル（${p.lv.join('・')}）で未定着 ${p.wordsLeft} 語 → <b>1日 ${p.wpd} 語</b></li>
        <li>構文：未習得 ${p.sentLeft} 文 → <b>1日 ${p.spd} 文</b></li>
        <li>読解・リスニング：週 2 本ずつ ／ ライティング：週 1〜2 本 ／ スピーキング：週 3 回</li>
        ${p.days <= 20 ? '<li><b>模擬試験を週1回</b>、終わったら間違いノートで見直し</li>' : ''}</ul>` : ''}
      <div class="row"><label class="small">試験日 ${dateIn}</label><label class="small">目標 ${tgt}</label><label class="small">${mod}</label>
        ${p.days >= 0 && S.goal !== nearestGoal(p.goal) ? `<button class="btn" data-act="exgoal">1日の目標を ${nearestGoal(p.goal)} pt にする</button>` : ''}
        ${S.levels.join() !== p.lv.join() ? `<button class="btn ghost" data-act="exlevels">出題範囲を ${p.lv.join('・')} にする</button>` : ''}</div>
    </section>`;
  }
  const nearestGoal = g => [20, 50, 100, 150, 200].reduce((a, b) => Math.abs(b - g) < Math.abs(a - g) ? b : a);
  const homeView = window.EXTRA_VIEWS?.home;
  if (homeView) window.EXTRA_VIEWS.home = () => (ui.place ? '' : planCard()) + homeView();

  /* ---------- mock test ---------- */
  ui.mock = null;
  const SECTION = {listen: 'リスニング', read: 'リーディング', write: 'ライティング', speak: 'スピーキング'};
  function buildSteps(kind) {
    const mod = S.exam?.module === 'gt' ? 'gt1' : 'ac1';
    const pickOf = arr => arr[Math.random() * arr.length | 0];
    const steps = [];
    if (kind === 'full') {
      [1, 2, 3, 4].forEach(n => { const c = LS().map((t, i) => [t, i]).filter(([t]) => t.section === n); if (c.length) steps.push({type: 'listen', i: pickOf(c)[1]}); });
      shuffle(RD().map((_, i) => i)).slice(0, 3).forEach(i => steps.push({type: 'read', i}));
      const ps = WRITING.prompts.map((p, i) => [p, i]);
      steps.push({type: 'write', task: mod, pi: pickOf(ps.filter(([p]) => p.task === mod))[1]});
      steps.push({type: 'write', task: 't2', pi: pickOf(ps.filter(([p]) => p.task === 't2'))[1]});
      [1, 2, 3].forEach(n => steps.push({type: 'speak', part: n, qi: pickOf(SPEAK_Q.map((q, i) => [q, i]).filter(([q]) => q.p === n))[1]}));
    } else {
      steps.push({type: 'listen', i: Math.random() * LS().length | 0});
      steps.push({type: 'read', i: Math.random() * RD().length | 0});
      steps.push({type: 'write', task: 't2', pi: pickOf(WRITING.prompts.map((p, i) => [p, i]).filter(([p]) => p.task === 't2'))[1]});
      steps.push({type: 'speak', part: 2, qi: pickOf(SPEAK_Q.map((q, i) => [q, i]).filter(([q]) => q.p === 2))[1]});
    }
    return steps;
  }
  const LIMIT = {full: {listen: 30, read: 60, write: 60, speak: 14}, mini: {listen: 10, read: 20, write: 40, speak: 5}};
  function enterStep() {
    const m = ui.mock, s = m.steps[m.cur];
    if (!m.sectionStart[s.type]) m.sectionStart[s.type] = Date.now();
    if (s.type === 'listen') { speechSynthesis.cancel(); Object.assign(ui.lis, {i: s.i, ans: {}, checked: false, script: false, plays: 0, playing: false}); }
    if (s.type === 'read') Object.assign(ui.read, {i: s.i, ans: {}, checked: false});
    if (s.type === 'write') { ui.write.task = s.task; ui.write.pi = s.pi; ui.write.feedback = null; ui.write.showModel = false; S.wtext['p' + s.pi] = ''; }
    if (s.type === 'speak') { spkReset(); ui.spk.part = s.part; ui.spk.qi = s.qi; }
  }
  function leaveStep() {
    const m = ui.mock, s = m.steps[m.cur], r = {type: s.type};
    if (s.type === 'listen') { if (!ui.lis.checked) ACT.lcheck(); const T = LS()[s.i]; r.ok = T.qs.filter((q, k) => lisRight(q, ui.lis.ans[k])).length; r.total = T.qs.length; r.title = T.title; }
    if (s.type === 'read') { if (!ui.read.checked) ACT.rcheck(); const P0 = RD()[s.i], F = READ_FLAT(P0); r.ok = F.filter(q => q.ok(ui.read.ans[q.n])).length; r.total = F.length; r.title = P0.title; }
    if (s.type === 'write') { const t = $('#essay')?.value || S.wtext['p' + s.pi] || ''; r.words = (cleanText(t).match(/[A-Za-z][A-Za-z'’-]*/g) || []).length; r.task = s.task; r.min = WRITING.tasks[s.task].min;
      const f = t.trim() ? analyzeWriting(t, WRITING.prompts[s.pi]) : null; r.bad = f ? f.out.filter(x => x.lv === 'bad').length : null; r.warn = f ? f.out.filter(x => x.lv === 'warn').length : null; }
    if (s.type === 'speak') { if (ui.spk.phase === 'talk') spkStop(); const n = ui.spk.final.trim() ? ui.spk.final.trim().split(/\s+/).length : 0; r.words = n; r.part = s.part; r.secs = ui.spk.t1 && ui.spk.t0 ? Math.round((ui.spk.t1 - ui.spk.t0) / 1000) : 0; spkReset(); }
    m.results[m.cur] = r;
  }
  function finish() {
    const m = ui.mock, res = m.results.filter(Boolean);
    const sum = t => res.filter(r => r.type === t).reduce((a, r) => [a[0] + r.ok, a[1] + r.total], [0, 0]);
    const [lo, lt] = sum('listen'), [ro, rt] = sum('read');
    const entry = {date: new Date().toISOString().slice(0, 10), kind: m.kind, L: lt ? band(lo, lt, L_TABLE) : null, R: rt ? band(ro, rt, R_TABLE) : null, lo, lt, ro, rt,
      W: res.filter(r => r.type === 'write'), Sp: res.filter(r => r.type === 'speak'), mins: Math.round((Date.now() - m.started) / 60000)};
    S.mocks.push(entry); S.mocks = S.mocks.slice(-30); addXP?.(30, 'mock'); save();
    m.done = entry; clearInterval(m.timer); render(); scrollTo({top: 0});
  }
  function tick() {
    const m = ui.mock; if (!m || m.done) return;
    const s = m.steps[m.cur], lim = LIMIT[m.kind][s.type] * 60000, left = Math.round((m.sectionStart[s.type] + lim - Date.now()) / 1000);
    const el = document.getElementById('mclock'); if (!el) return;
    el.textContent = left >= 0 ? `${SECTION[s.type]} 残り ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}` : `${SECTION[s.type]} 時間超過 ${Math.floor(-left / 60)}:${String(-left % 60).padStart(2, '0')}`;
    el.classList.toggle('over', left < 0);
  }
  function vMock() {
    const m = ui.mock;
    if (!m) {
      const hist = S.mocks.slice().reverse();
      return `<div class="sheet panel">
        <b>模擬試験</b>
        <p class="small">本番と同じ順番（リスニング → リーディング → ライティング → スピーキング）で解きます。各パートに制限時間のタイマーが付きます。終わるとリスニングとリーディングのバンド目安を出し、間違えた問題は間違いノートに入ります。</p>
        <div class="modes">
          <button class="mode" data-act="mstart" data-k="mini"><b>ミニ模試（約75分）</b><span class="muted small">リスニング1 · 読解1 · Task 2 · Part 2</span></button>
          <button class="mode" data-act="mstart" data-k="full"><b>フル模試（約2時間45分）</b><span class="muted small">リスニング4 · 読解3 · Task 1＋2 · Part 1〜3</span></button>
        </div>
        <p class="note">問題数は本番（リスニング・リーディング各40問）より少ないため、バンドは正答率から換算した参考値です。ライティング Task 1 は試験日の設定（Academic / General）に合わせて出題します。</p>
      </div>
      ${hist.length ? `<div class="sheet panel"><b>これまでの模擬試験</b><div class="tablewrap"><table><thead><tr><th>日付</th><th>種類</th><th>L</th><th>R</th><th>ライティング語数</th><th>時間</th></tr></thead><tbody>
        ${hist.map(h => `<tr><td class="n">${h.date}</td><td>${h.kind === 'full' ? 'フル' : 'ミニ'}</td><td class="n">${h.L ?? '—'}</td><td class="n">${h.R ?? '—'}</td><td class="n">${h.W.map(w => w.words).join(' / ') || '—'}</td><td class="n">${h.mins}分</td></tr>`).join('')}
      </tbody></table></div></div>` : ''}`;
    }
    if (m.done) {
      const d = m.done;
      return `<div class="sheet panel">
        <b>模擬試験の結果（${d.kind === 'full' ? 'フル' : 'ミニ'} · ${d.mins}分）</b>
        <div class="bands">
          <div><b>${d.L ?? '—'}</b><span>リスニング目安（${d.lo}/${d.lt}）</span></div>
          <div><b>${d.R ?? '—'}</b><span>リーディング目安（${d.ro}/${d.rt}）</span></div>
          ${d.W.map(w => `<div><b>${w.words}<small style="font-size:14px">語</small></b><span>${w.task === 't2' ? 'Task 2' : 'Task 1'}（${w.min}語以上）${w.bad != null ? ` · 要修正 ${w.bad} / 注意 ${w.warn}` : ' · 未記入'}</span></div>`).join('')}
          ${d.Sp.map(s => `<div><b>${s.words}<small style="font-size:14px">語</small></b><span>スピーキング Part ${s.part}（${s.secs}秒）</span></div>`).join('')}
        </div>
        ${S.exam?.target && d.L != null && d.R != null ? `<p class="small">目標 ${S.exam.target}：リスニング ${d.L >= S.exam.target ? '到達' : `あと ${(S.exam.target - d.L).toFixed(1)}`} · リーディング ${d.R >= S.exam.target ? '到達' : `あと ${(S.exam.target - d.R).toFixed(1)}`}</p>` : ''}
        <p class="note">ライティングとスピーキングは自動でバンドを出せないため、語数と添削チェックの結果だけを表示しています。</p>
        <div class="row"><button class="btn primary" data-act="tab" data-tab="notes">間違いノートで見直す</button><button class="btn" data-act="mexit">模擬試験のトップへ</button></div>
      </div>`;
    }
    const s = m.steps[m.cur];
    const body = s.type === 'listen' ? EXTRA_VIEWS.listen() : s.type === 'read' ? EXTRA_VIEWS.read() : s.type === 'write' ? vWrite() : vSpeak();
    if (s.type === 'write') setTimeout(() => { if (S.tab === 'mock') afterWriteRender(); }, 0);
    return `<div class="mhead">
        <div class="msteps">${m.steps.map((x, k) => `<span class="${k === m.cur ? 'on' : k < m.cur ? 'done' : ''}">${{listen: 'L', read: 'R', write: 'W', speak: 'S'}[x.type]}${k + 1}</span>`).join('')}</div>
        <span class="mclock" id="mclock"></span>
        <button class="btn primary" data-act="mnext">${m.cur + 1 < m.steps.length ? '次の問題へ →' : '採点して終了'}</button>
        <button class="btn ghost" data-act="mquit">中止</button>
      </div>
      ${ui.mockConfirmQuit ? `<div class="confirm">模擬試験を中止します。ここまでの解答は保存されません。<button class="btn bad" data-act="mquitok">中止する</button><button class="btn" data-act="mquitno">続ける</button></div>` : ''}
      <div class="mockbody panel">${body}</div>`;
  }
  Object.assign(ACT, {
    mstart: d => { ui.mock = {kind: d.k, steps: buildSteps(d.k), cur: 0, results: [], sectionStart: {}, started: Date.now(), timer: setInterval(tick, 500)}; enterStep(); render(); scrollTo({top: 0}); },
    mnext: () => { const m = ui.mock; leaveStep(); if (m.cur + 1 >= m.steps.length) return finish(); m.cur++; enterStep(); render(); scrollTo({top: 0}); },
    mquit: () => { ui.mockConfirmQuit = true; render(); },
    mquitno: () => { ui.mockConfirmQuit = false; render(); },
    mquitok: () => { clearInterval(ui.mock?.timer); speechSynthesis.cancel(); spkReset(); ui.mock = null; ui.mockConfirmQuit = false; render(); },
    mexit: () => { ui.mock = null; render(); },
    exgoal: () => { S.goal = nearestGoal(plan().goal); save(); render(); },
    exlevels: () => { S.levels = plan().lv; ui.cram = false; ui.quiz = null; save(); render(); },
  });
  // speaking stops re-render only the speaking tab; keep the mock view in sync too
  const prevStop = spkStop;
  spkStop = async function (...a) { const r = await prevStop.apply(this, a); if (S.tab === 'mock') render(); return r; };
  document.addEventListener('change', e => {
    const t = e.target;
    if (['exdate', 'extarget', 'exmodule'].includes(t.id)) {
      S.exam = {...(S.exam || {target: 6.5, module: 'ac'}), [{exdate: 'date', extarget: 'target', exmodule: 'module'}[t.id]]: t.id === 'extarget' ? +t.value : t.value};
      save(); render();
    }
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), mock: vMock};
  render();
})();
