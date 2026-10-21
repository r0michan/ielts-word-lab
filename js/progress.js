/* Motivation: levels & titles from total points, badges with a toast when earned, and a history of your own recordings. */
(() => {
  const css = `
  .lvcard{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
  .lvnum{font-family:var(--f-word);font-size:40px;font-weight:700;line-height:1;color:var(--accent)}
  .lvnum small{font-family:var(--f-ui);font-size:13px;color:var(--muted);font-weight:500;display:block}
  .badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}
  .badge{background:var(--sunk);border-radius:10px;padding:10px 6px;text-align:center;font-size:11.5px;line-height:1.35;color:var(--muted);display:flex;flex-direction:column;align-items:center;gap:4px}
  .badge svg{width:30px;height:30px}
  .badge.on{background:var(--accent-soft);color:var(--ink)}
  .badge.on b{color:var(--accent)}
  .toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:60;background:var(--ink);color:var(--bg);border-radius:12px;padding:12px 18px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.25);max-width:calc(100vw - 32px)}
  .rec{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:center;border-top:1px solid var(--line);padding-top:10px}
  .rec:first-child{border-top:0;padding-top:0}
  .rec .t{font-family:var(--f-word);font-size:16px}
  .rec .d{font-size:12px;color:var(--muted)}
  .rec audio{grid-column:1 / -1}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const total = () => Object.values(S.log || {}).reduce((a, d) => a + (d.xp || 0), 0);

  /* ---------- level & title ---------- */
  const TITLES = [[1, '英語ビギナー'], [5, '単語コレクター'], [10, '構文ビルダー'], [15, 'IELTSチャレンジャー'], [20, 'バンド6の壁を越える者'], [30, 'バンド7ハンター'], [40, '英語マスター'], [60, '伝説の学習者']];
  // level n needs 25·n·(n+1) points in total
  const levelOf = xp => { let n = 1; while (25 * n * (n + 1) <= xp) n++; return n; };
  const need = n => 25 * n * (n + 1);
  const titleOf = n => TITLES.filter(([m]) => n >= m).pop()[1];

  /* ---------- badges ---------- */
  const daysKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  function bestStreak() {
    const days = Object.keys(S.log || {}).filter(k => S.log[k].xp).sort();
    let best = 0, cur = 0, prev = null;
    days.forEach(k => { const d = new Date(k + 'T12:00'); cur = prev && (d - prev) / 864e5 === 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = d; });
    return best;
  }
  const ICONS = {
    fire: '<path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 2-6 2 1 3 3 3 5 1-2 1-5 1-9z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h7"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
    ear: '<path d="M7 9a5 5 0 0 1 10 0c0 4-4 5-4 8a3 3 0 0 1-6 0"/>',
    flag: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  };
  const learned = () => WORDS.filter(w => (S.prog[w.id]?.box || 0) >= 4).length;
  const readPerfect = () => (window.READING || []).some(r => S.readBest?.[r.id] === READ_FLAT(r).length);
  const lisPerfect = () => (window.LISTENING || []).some(t => S.lisBest?.[t.id] === t.qs.length);
  const BADGES = [
    ['streak3', 'fire', '3日連続', () => bestStreak() >= 3],
    ['streak7', 'fire', '7日連続', () => bestStreak() >= 7],
    ['streak30', 'fire', '30日連続', () => bestStreak() >= 30],
    ['w100', 'book', '単語100語定着', () => learned() >= 100],
    ['w500', 'book', '単語500語定着', () => learned() >= 500],
    ['w1000', 'book', '単語1000語定着', () => learned() >= 1000],
    ['w3000', 'book', '単語3000語定着', () => learned() >= 3000],
    ['s50', 'pen', '構文50文', () => SENT.filter(x => S.sprog[x.id]?.ok).length >= 50],
    ['sall', 'pen', '構文コンプリート', () => SENT.every(x => S.sprog[x.id]?.ok)],
    ['lessons10', 'cap', 'レッスン10個', () => Object.keys(S.lessonDone || {}).length >= 10],
    ['lessonsAll', 'cap', 'レッスン全制覇', () => (window.LESSONS || []).every(l => S.lessonDone?.[l.id])],
    ['readFull', 'star', '読解で満点', readPerfect],
    ['lisFull', 'ear', 'リスニングで満点', lisPerfect],
    ['pron', 'mic', '発音90点を30語', () => Object.values(S.prog).filter(p => (p.pb ?? 0) >= 90).length >= 30],
    ['write5', 'pen', 'ライティング5本', () => Object.values(S.log || {}).reduce((a, d) => a + (d.write || 0), 0) >= 5],
    ['mock1', 'flag', '模擬試験を完走', () => (S.mocks || []).length >= 1],
    ['mock5', 'flag', '模擬試験5回', () => (S.mocks || []).length >= 5],
    ['target', 'star', '模試で目標バンド', () => (S.mocks || []).some(m => S.exam?.target && m.L >= S.exam.target && m.R >= S.exam.target)],
  ];
  S.badges = S.badges || {};
  const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }
  let lastLevel = levelOf(total());
  function checkAwards() {
    BADGES.forEach(([id, , name, test]) => { try { if (!S.badges[id] && test()) { S.badges[id] = Date.now(); toast(`バッジ獲得：${name}`); } } catch (e) {} });
    const lv = levelOf(total());
    if (lv > lastLevel) { toast(`レベルアップ！ Lv.${lv}「${titleOf(lv)}」`); lastLevel = lv; }
    prevSaveSoon();
  }
  // every point award ends in saveSoon(), so checking there catches all practice types
  const prevSaveSoon = saveSoon; let awardTimer = null;
  saveSoon = function () { prevSaveSoon(); clearTimeout(awardTimer); awardTimer = setTimeout(checkAwards, 800); };

  function card() {
    const xp = total(), lv = levelOf(xp), lo = lv > 1 ? need(lv - 1) : 0, hi = need(lv);
    const got = BADGES.filter(([id]) => S.badges[id]).length;
    return `<section class="sheet panel" style="gap:12px">
      <div class="lvcard"><div class="lvnum">Lv.${lv}<small>${esc(titleOf(lv))}</small></div>
        <div style="flex:1;min-width:180px"><div class="meter"><i style="width:${Math.round((xp - lo) / (hi - lo) * 100)}%"></i></div><span class="small muted">合計 ${xp} pt ・ 次のレベルまで ${hi - xp} pt</span></div></div>
      <div><b class="small">バッジ ${got} / ${BADGES.length}</b><div class="badges" style="margin-top:8px">${BADGES.map(([id, ic, name]) => `<div class="badge${S.badges[id] ? ' on' : ''}">${svg(ic)}<b>${esc(name)}</b>${S.badges[id] ? new Date(S.badges[id]).toLocaleDateString('ja-JP', {month: 'numeric', day: 'numeric'}) : '未獲得'}</div>`).join('')}</div></div>
    </section>`;
  }
  const homeView = window.EXTRA_VIEWS?.home;
  if (homeView) window.EXTRA_VIEWS.home = () => ui.place ? homeView() : homeView() + card();

  /* ---------- recording history (IndexedDB: audio stays on this device) ---------- */
  let dbp = null;
  const openDb = v => new Promise((res, rej) => {
    const r = v ? indexedDB.open('ieltsWordLabRec', v) : indexedDB.open('ieltsWordLabRec');
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('rec')) r.result.createObjectStore('rec', {keyPath: 'id', autoIncrement: true}); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  // if the database exists without its store (e.g. created by another tool), bump the version to add it
  const db = () => dbp || (dbp = openDb().then(d => { if (d.objectStoreNames.contains('rec')) return d; const v = d.version + 1; d.close(); return openDb(v); }));
  const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('rec', mode); const st = t.objectStore('rec'); const out = fn(st); t.oncomplete = () => res(out?.result ?? out); t.onerror = () => rej(t.error); }); };
  function currentText() {
    try {
      if (S.tab === 'pron') { const w = filtered()[ui.pron.i]; return ui.pron.mode === 'word' ? w.w : (w.ex || w.w); }
      if (S.tab === 'sent') return ui.sent.item?.en || '';
      if (S.tab === 'speak' || S.tab === 'mock') return SPEAK_Q[ui.spk.qi]?.q || '';
      if (S.tab === 'japan') return ui.jp.q?.p ? ui.jp.q.p[ui.jp.q.side] : '';
    } catch (e) {}
    return '';
  }
  async function saveRec(blob, text, kind) {
    try {
      await tx('readwrite', st => st.add({ts: Date.now(), text, kind, blob}));
      const all = await tx('readonly', st => st.getAllKeys());
      if (all.length > 60) await tx('readwrite', st => all.slice(0, all.length - 60).forEach(k => st.delete(k)));
    } catch (e) {}
  }
  const prevStart = startRecorder;
  startRecorder = async function () {
    const r = await prevStart(); if (!r) return r;
    const text = currentText(), kind = S.tab;
    return {stop: async () => { const url = await r.stop(); try { const blob = await (await fetch(url)).blob(); if (blob.size > 1000) saveRec(blob, text, kind); } catch (e) {} return url; }};
  };
  ui.recs = null; let urls = [];
  async function loadRecs() {
    try { const all = await tx('readonly', st => st.getAll()); ui.recs = all.reverse(); } catch (e) { ui.recs = []; }
    if (S.tab === 'pron' && ui.pron.mode === 'history') render();
  }
  window.REC_HISTORY_VIEW = () => {
    if (!ui.recs) { loadRecs(); return '<div class="sheet empty">読み込み中…</div>'; }
    urls.forEach(u => URL.revokeObjectURL(u)); urls = [];
    if (!ui.recs.length) return '<div class="sheet empty"><p><b>まだ録音がありません。</b></p><p class="small" style="margin-top:8px">発音練習・文トレの音読・スピーキングで話すと、自分の声がここに保存されます（このブラウザの中だけに保存され、外部には送られません）。</p></div>';
    const groups = new Map();
    ui.recs.forEach(r => { const k = r.text || '(テキストなし)'; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); });
    const KIND = {pron: '発音練習', sent: '音読', speak: 'スピーキング', mock: '模擬試験', japan: '聞き分け'};
    return `<p class="small muted">最新60件まで、このブラウザに保存されます。同じ単語・文を何度か録音すると並んで表示されるので、上達を聞き比べられます。</p>
      ${[...groups.entries()].map(([text, rs]) => `<div class="sheet panel" style="gap:10px"><div class="row" style="justify-content:space-between"><span class="ex" style="font-size:16px">${esc(text)}</span>${text !== '(テキストなし)' ? sayBtn(text, 'お手本') : ''}</div>
        ${rs.map(r => { const u = URL.createObjectURL(r.blob); urls.push(u); return `<div class="rec"><span class="d">${new Date(r.ts).toLocaleString('ja-JP', {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} · ${KIND[r.kind] || ''}</span><button class="btn ghost" data-act="recdel" data-id="${r.id}">削除</button><audio controls src="${u}"></audio></div>`; }).join('')}</div>`).join('')}`;
  };
  ACT.recdel = async d => { await tx('readwrite', st => st.delete(+d.id)); ui.recs = null; render(); };
  const prevPmode = ACT.pmode;
  ACT.pmode = d => { if (d.m === 'history') ui.recs = null; prevPmode(d); };

  checkAwards();
  render();
})();
