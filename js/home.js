/* ホーム: daily plan, streak and XP log, level diagnostic, backup, install. Uses the main script's globals. */
(() => {
  const css = `
  .hgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
  .hero{display:flex;gap:20px;align-items:center;flex-wrap:wrap}
  .ring{--v:0;width:118px;height:118px;border-radius:50%;flex:none;display:grid;place-items:center;background:conic-gradient(var(--accent) calc(var(--v)*1%),var(--sunk) 0)}
  .ring div{width:94px;height:94px;border-radius:50%;background:var(--surface);display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.1}
  .ring b{font-family:var(--f-word);font-size:28px;font-variant-numeric:tabular-nums}
  .ring span{font-size:11.5px;color:var(--muted)}
  .streak{font-family:var(--f-word);font-size:40px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
  .todo{display:flex;flex-direction:column;gap:8px}
  .todo button{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;text-align:left;border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:11px 14px;cursor:pointer}
  .todo button:hover{border-color:var(--accent)}
  .todo button b{display:block;font-size:15px}
  .todo button span{font-size:12.5px;color:var(--muted)}
  .todo button em{font-style:normal;font-family:var(--f-word);font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
  .todo button.done{opacity:.55}
  .bars text{fill:var(--muted);font:11px var(--f-ui)}
  .kv{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;font-size:14px}
  .kv b{font-family:var(--f-word);font-variant-numeric:tabular-nums;text-align:right}
  .lvres{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;text-align:center;font-size:12px}
  .lvres div{background:var(--sunk);border-radius:8px;padding:6px 2px}
  .lvres b{display:block;font-family:var(--f-word);font-size:16px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- activity log & XP ---------- */
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const isNew = !S.log && !Object.keys(S.prog || {}).length;
  S.log = S.log || {};
  S.goal = S.goal || 50;
  if (isNew) S.tab = 'home';
  function addXP(n, cat) {
    const d = S.log[today()] || (S.log[today()] = {xp: 0});
    d.xp += n; d[cat] = (d[cat] || 0) + 1; saveSoon();
  }
  window.addXP = addXP;
  const wrapFn = (fn, xp, cat, when) => function (...a) { const ok = !when || when(...a); const r = fn.apply(this, a); if (ok) addXP(xp, cat); return r; };
  grade = wrapFn(grade, 1, 'cards');
  answerQuiz = wrapFn(answerQuiz, 1, 'quiz');
  markSent = wrapFn(markSent, 2, 'sent');
  spkStop = wrapFn(spkStop, 10, 'speak', () => ui.spk.phase === 'talk');
  const wrapAct = (name, xp, cat, when) => { if (ACT[name]) ACT[name] = wrapFn(ACT[name], xp, cat, when); };
  wrapAct('rcheck', 10, 'read');
  wrapAct('xianswer', 1, 'idiom', () => ui.expr.iq && ui.expr.iq.qs[ui.expr.iq.i].pick === null);
  wrapAct('xranswer', 1, 'idiom', () => ui.expr.rq && ui.expr.rq.qs[ui.expr.rq.i].pick === null);
  wrapAct('wcheck', 15, 'write', () => ($('#essay')?.value || '').trim().length > 50);
  wrapAct('pmic', 1, 'pron', () => !ui.pron.busy);
  wrapAct('sreadmic', 1, 'pron', () => !ui.sent.busy);

  function streak() {
    let n = 0; const d = new Date();
    if (!S.log[today()]?.xp) d.setDate(d.getDate() - 1);           // today not started yet: count up to yesterday
    for (;;) { const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; if (S.log[k]?.xp) { n++; d.setDate(d.getDate() - 1); } else break; }
    return n;
  }
  function barChart() {
    const days = []; const d = new Date(); d.setDate(d.getDate() - 13);
    for (let i = 0; i < 14; i++) { const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; days.push([d.getDate(), S.log[k]?.xp || 0, d.getDay()]); d.setDate(d.getDate() + 1); }
    const max = Math.max(S.goal, ...days.map(x => x[1])), W = 560, H = 150, B = 22, bw = W / 14;
    const y = v => (H - B) * (1 - v / max);
    return `<svg class="bars" viewBox="0 0 ${W} ${H}" role="img" aria-label="過去14日の学習ポイント" style="width:100%;height:auto">
      <line x1="0" x2="${W}" y1="${y(S.goal)}" y2="${y(S.goal)}" stroke="var(--line)" stroke-dasharray="4 4"/><text x="${W - 4}" y="${y(S.goal) - 4}" text-anchor="end">目標 ${S.goal}</text>
      ${days.map(([dd, v, wd], i) => `<rect x="${i * bw + 6}" y="${y(v)}" width="${bw - 12}" height="${H - B - y(v)}" rx="3" fill="${v >= S.goal ? 'var(--accent)' : 'var(--c3)'}" opacity="${v ? 1 : 0.15}"/>
        <text x="${i * bw + bw / 2}" y="${H - 6}" text-anchor="middle"${i === 13 ? ' style="font-weight:700;fill:var(--ink)"' : ''}>${dd}</text>`).join('')}</svg>`;
  }

  /* ---------- diagnostic ---------- */
  const SIZES = {A1: 600, A2: 1200, B1: 1800, B2: 2400, C1: 2600, C2: 3000};   // rough word-family counts per band (for the estimate only)
  ui.place = null;
  function startPlacement() {
    const qs = [];
    LEVELS.forEach(l => {
      const pool = WORDS.filter(w => w.lv === l && w.src === 'base' && !/\s/.test(w.w));
      shuffle(pool).slice(0, 6).forEach(w => {
        const others = shuffle(pool.filter(o => o.ja !== w.ja)).slice(0, 3).map(o => o.ja);
        qs.push({w, opts: shuffle([w.ja, ...others]), pick: null});
      });
    });
    ui.place = {qs, i: 0};
  }
  function finishPlacement() {
    const acc = {};
    LEVELS.forEach(l => { const q = ui.place.qs.filter(x => x.w.lv === l); acc[l] = q.filter(x => x.pick === x.w.ja).length / q.length; });
    let lvl = 'A1', misses = 0;
    for (const l of LEVELS) { if (acc[l] >= 0.6) lvl = l; else if (++misses > 1) break; }
    const est = Math.round(LEVELS.reduce((s, l) => s + acc[l] * SIZES[l], 0) / 100) * 100;
    S.place = {date: today(), lvl, est, acc};
    ui.place = null; addXP(10, 'place'); save(); render();
  }
  function vPlacement() {
    const z = ui.place, q = z.qs[z.i];
    return `<div class="sheet panel">
      <div class="qhead"><span class="small muted">レベル診断 · ${z.i + 1} / ${z.qs.length}</span><div class="meter"><i style="width:${z.i / z.qs.length * 100}%"></i></div><button class="btn ghost" data-act="hplacequit">中止</button></div>
      <div class="hw">${esc(q.w.w)}</div>
      <div class="opts">${q.opts.map((o, i) => `<button class="opt" data-act="hplaceans" data-i="${i}">${esc(o)}</button>`).join('')}</div>
      <button class="btn" data-act="hplaceans" data-i="-1">わからない</button>
      <p class="note">知らない単語は当てずっぽうにせず「わからない」を選ぶと、診断が正確になります。</p>
    </div>`;
  }

  /* ---------- install prompt ---------- */
  let installEvt = null;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; if (S.tab === 'home') render(); });

  /* ---------- view ---------- */
  function vHome() {
    if (ui.place) return vPlacement();
    const t = S.log[today()] || {xp: 0}, pct = Math.min(100, Math.round(t.xp / S.goal * 100)), sk = streak();
    const list = filtered(), now = Date.now();
    const due = list.filter(w => { const p = S.prog[w.id]; return p && p.seen && p.due <= now; }).length;
    const fresh = list.filter(w => !S.prog[w.id]?.seen).length;
    const sentLeft = SENT.filter(x => !(S.sprog[x.id]?.ok)).length;
    const RD = window.READING || [], LS = window.LISTENING || [];
    const nextRead = RD.find(r => S.readBest?.[r.id] == null), nextLis = LS.find(r => S.lisBest?.[r.id] == null);
    const wroteThisWeek = S.drafts.some(d => now - d.ts < 7 * 864e5);
    const todo = [
      [due ? `単語カードの復習 ${due}枚` : '新しい単語を10個', due ? '忘れる前に復習すると定着します' : `未学習 ${fresh}語（${S.levels.join('・')}）`, 'card', t.cards || 0, due || 10],
      ['構文トレーニング 5問', `まだ正解していない構文 ${sentLeft}文`, 'sent', t.sent || 0, 5],
      ['日本人の弱点を1セット', 'L/R・和製英語・間違えやすい文', 'japan', t.japan || 0, 10],
      nextLis ? [`リスニング：${nextLis.title}`, `Section ${nextLis.section} · ${nextLis.accent === 'en-AU' ? 'オーストラリア英語' : nextLis.accent === 'en-US' ? 'アメリカ英語' : 'イギリス英語'}`, 'listen', t.listen || 0, 1] : ['リスニングの復習', '全セクション挑戦済み。満点を目指しましょう', 'listen', t.listen || 0, 1],
      nextRead ? [`読解：${nextRead.title}`, `${nextRead.lv} · ${nextRead.topic}`, 'read', t.read || 0, 1] : ['読解の復習', '全文章に挑戦済み', 'read', t.read || 0, 1],
      [wroteThisWeek ? 'ライティング（今週は書きました）' : 'ライティングを1本', '週に1本書いて添削チェックを受けましょう', 'write', t.write || 0, 1],
    ];
    const learned = WORDS.filter(w => (S.prog[w.id]?.box || 0) >= 4).length;
    const pl = S.place;
    return `<div class="hgrid">
      <section class="sheet hero">
        <div class="ring" style="--v:${pct}"><div><b>${t.xp}</b><span>/ ${S.goal} pt</span></div></div>
        <div class="panel" style="gap:6px">
          <span class="small muted">連続学習</span><span class="streak">${sk}<span style="font-size:16px;font-family:var(--f-ui);font-weight:500"> 日</span></span>
          <span class="small">${t.xp >= S.goal ? '今日の目標を達成しました' : `今日の目標まであと ${S.goal - t.xp} pt`}</span>
          <label class="small muted">1日の目標 <select id="hgoal">${[20, 50, 100, 150, 200].map(g => `<option value="${g}"${S.goal === g ? ' selected' : ''}>${g} pt</option>`).join('')}</select></label>
        </div>
      </section>
      <section class="sheet panel" style="gap:10px">
        <b>レベル診断</b>
        ${pl ? `<div class="row"><span class="lv lv-${pl.lvl[0]}" style="font-size:20px;padding:2px 12px">${pl.lvl}</span><span>推定語彙数 <b style="font-family:var(--f-word);font-size:20px">約${pl.est.toLocaleString()}語</b></span></div>
          <div class="lvres">${LEVELS.map(l => `<div>${l}<b>${Math.round(pl.acc[l] * 100)}%</b></div>`).join('')}</div>
          <span class="small muted">${pl.date} 診断 · IELTS 目安 ${LEVEL_INFO[pl.lvl].ie}</span>
          <div class="row"><button class="btn" data-act="hplaceapply">このレベルで学習する（${pl.lvl}${LEVELS[LEVELS.indexOf(pl.lvl) + 1] ? '・' + LEVELS[LEVELS.indexOf(pl.lvl) + 1] : ''}）</button><button class="btn ghost" data-act="hplace">もう一度診断</button></div>`
        : `<p class="small">36語の意味テスト（約3分）で、今のCEFRレベルと語彙数の目安がわかります。結果に合わせて出題範囲を設定できます。</p><div><button class="btn primary" data-act="hplace">診断テストを始める</button></div>`}
      </section>
    </div>
    <section class="sheet panel" style="gap:10px"><b>今日のおすすめ</b>
      <div class="todo">${todo.map(([title, sub, tab, did, goal]) => `<button data-act="tab" data-tab="${tab}" class="${did >= goal ? 'done' : ''}"><div><b>${esc(title)}</b><span>${esc(sub)}</span></div><em>${did >= goal ? '✓' : `${did}/${goal}`}</em></button>`).join('')}</div>
    </section>
    <div class="hgrid">
      <section class="sheet panel" style="gap:8px"><b>過去14日の学習ポイント</b>${barChart()}<span class="small muted">単語1枚=1pt · 構文=2pt · 読解/リスニング=10pt · ライティング=15pt · スピーキング=10pt</span></section>
      <section class="sheet panel" style="gap:8px"><b>これまでの成果</b>
        <div class="kv">
          <span>定着した単語</span><b>${learned} / ${WORDS.length}</b>
          <span>正解した構文</span><b>${SENT.filter(x => S.sprog[x.id]?.ok).length} / ${SENT.length}</b>
          <span>正解したイディオム・前置詞</span><b>${Object.values(S.iprog || {}).filter(p => p.ok).length}</b>
          <span>読解（ベストの合計）</span><b>${Object.values(S.readBest || {}).reduce((a, b) => a + b, 0)} 問</b>
          <span>リスニング（ベストの合計）</span><b>${Object.values(S.lisBest || {}).reduce((a, b) => a + b, 0)} 問</b>
          <span>ライティングの下書き</span><b>${S.drafts.length} 本</b>
          <span>学習した日数</span><b>${Object.values(S.log).filter(d => d.xp).length} 日</b>
        </div></section>
    </div>
    <section class="sheet panel" style="gap:10px"><b>データの保存と引っ越し</b>
      <p class="small muted">学習記録はこのブラウザだけに保存されています。別のパソコンに移すときや、念のための控えとして書き出しておけます。</p>
      <div class="row"><button class="btn" data-act="hexport">学習データを書き出す</button>
        <label class="btn" for="himport">書き出したファイルを読み込む</label><input type="file" id="himport" accept="application/json,.json" hidden>
        ${installEvt ? '<button class="btn primary" data-act="hinstall">アプリとしてインストール</button>' : ''}</div>
      ${ui.homeMsg ? `<p class="small">${esc(ui.homeMsg)}</p>` : ''}
      ${ui.importData ? `<div class="confirm">今の学習記録を、読み込んだファイル（${esc(ui.importData.name)}）の内容で置き換えます。<button class="btn bad" data-act="himportok">置き換える</button><button class="btn" data-act="himportno">やめる</button></div>` : ''}
    </section>`;
  }

  Object.assign(ACT, {
    hplace: () => { startPlacement(); render(); scrollTo({top: 0}); },
    hplacequit: () => { ui.place = null; render(); },
    hplaceans: d => { const z = ui.place, q = z.qs[z.i]; q.pick = +d.i >= 0 ? q.opts[+d.i] : null; if (z.i + 1 >= z.qs.length) finishPlacement(); else { z.i++; render(); } },
    hplaceapply: () => { const i = LEVELS.indexOf(S.place.lvl); S.levels = LEVELS.slice(i, i + 2); ui.cram = false; ui.quiz = null; save(); ui.homeMsg = `出題範囲を ${S.levels.join('・')} に設定しました。`; render(); },
    hexport: () => {
      const blob = new Blob([JSON.stringify({app: 'ielts-word-lab', version: 1, exported: new Date().toISOString(), data: S}, null, 1)], {type: 'application/json'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `ielts-word-lab-${today()}.json`; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000); ui.homeMsg = '学習データを書き出しました（ダウンロードフォルダを確認してください）。'; render();
    },
    hinstall: async () => { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice; installEvt = null; render(); },
    himportok: () => { S = {...S, ...ui.importData.data}; ui.importData = null; rebuild(); save(); renderBand(); ui.homeMsg = '学習データを読み込みました。'; render(); },
    himportno: () => { ui.importData = null; render(); },
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'hgoal') { S.goal = +t.value; save(); render(); }
    if (t.id === 'himport' && t.files[0]) {
      const f = t.files[0], r = new FileReader();
      r.onload = () => {
        try { const j = JSON.parse(r.result); if (j.app !== 'ielts-word-lab' || !j.data || typeof j.data !== 'object') throw 0; ui.importData = {name: f.name, data: j.data}; ui.homeMsg = ''; }
        catch (err) { ui.homeMsg = 'このファイルは読み込めません。このアプリで書き出した .json ファイルを選んでください。'; }
        render();
      };
      r.readAsText(f);
    }
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), home: vHome};
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
  render();
})();
