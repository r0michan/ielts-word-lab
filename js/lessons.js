/* レッスン (学ぶモード): grammar and IELTS-strategy lessons with examples, audio and quick checks. */
(() => {
  const css = `
  .lunit{display:flex;flex-direction:column;gap:8px}
  .lunit h3{font-size:15px;color:var(--muted);font-weight:700;letter-spacing:.04em}
  .llist{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
  .litem{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:10px;align-items:center;text-align:left;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 12px;cursor:pointer}
  .litem:hover{border-color:var(--accent)}
  .litem .num{font-family:var(--f-word);font-weight:700;color:var(--muted);text-align:center}
  .litem.done .num{color:var(--good)}
  .litem b{font-size:14.5px}
  .lbody{display:flex;flex-direction:column;gap:14px;max-width:760px}
  .lbody h4{font-size:16px;margin:6px 0 0;border-left:4px solid var(--accent);padding-left:8px}
  .lbody p{line-height:1.8}
  .lex{display:flex;flex-direction:column;gap:8px;background:var(--sunk);border-radius:10px;padding:12px 14px}
  .lex div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px}
  .lex .ex{font-size:17px}
  .lex .jp{grid-column:2;font-size:13px;color:var(--muted)}
  .ltip{background:var(--accent-soft);border-radius:10px;padding:10px 14px;font-size:14px}
  .ltip::before{content:"コツ ";font-weight:700;color:var(--accent)}
  .lwarn{background:var(--bad-soft);border-radius:10px;padding:10px 14px;font-size:14px}
  .lwarn::before{content:"注意 ";font-weight:700;color:var(--bad)}
  .ltable{overflow-x:auto}
  .ltable table{font-size:14px}
  .ltable td{font-family:var(--f-word)}
  .lq{border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px}
  .lq .opt{font-size:15px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const L = window.LESSONS || [], U = window.LESSON_UNITS || {};
  S.lessonDone = S.lessonDone || {};
  ui.lesson = {open: null, ans: {}};

  function vList() {
    const done = L.filter(l => S.lessonDone[l.id]).length;
    const groups = {};
    L.forEach((l, i) => (groups[l.unit] = groups[l.unit] || []).push([l, i]));
    return `<div class="sheet panel" style="gap:8px"><b>レッスン</b><p class="small muted">文法の基礎とIELTSの攻略法を順番に学べます。読み終えて確認問題に答えると「完了」になります。英文はタップで意味、再生ボタンで音声が聞けます。</p>
      <div class="row"><div class="meter" style="max-width:320px"><i style="width:${done / L.length * 100}%"></i></div><span class="small">${done} / ${L.length} 完了</span></div></div>
      ${Object.entries(groups).map(([u, ls]) => `<section class="lunit"><h3>${esc(U[u] || u)}</h3><div class="llist">${ls.map(([l, i]) =>
        `<button class="litem${S.lessonDone[l.id] ? ' done' : ''}" data-act="lopen" data-id="${l.id}"><span class="num">${S.lessonDone[l.id] ? '✓' : i + 1}</span><b>${esc(l.title)}</b>${l.lv !== '—' ? `<span class="lv lv-${l.lv[0]}">${l.lv}</span>` : '<span></span>'}</button>`).join('')}</div></section>`).join('')}`;
  }
  function block(b, k) {
    if (b.h) return `<h4>${esc(b.h)}</h4>`;
    if (b.p) return `<p>${esc(b.p)}</p>`;
    if (b.tip) return `<div class="ltip">${esc(b.tip)}</div>`;
    if (b.warn) return `<div class="lwarn">${esc(b.warn)}</div>`;
    if (b.ex) return `<div class="lex">${b.ex.map(([en, ja]) => `<div><button class="iconbtn" data-act="say" data-text="${esc(en)}" aria-label="再生">${ICON.speak}</button><span class="ex">${esc(en)}</span><span class="jp">${esc(ja)}</span></div>`).join('')}</div>`;
    if (b.table) return `<div class="ltable tablewrap"><table><thead><tr>${b.table[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${b.table.slice(1).map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b.q) {
      const [q, opts, ans, why] = b.q, a = ui.lesson.ans[k];
      return `<div class="lq"><b>確認問題</b><span>${esc(q)}</span><div class="opts">${opts.map((o, i) => {
        let c = 'opt' + (/[a-z]/i.test(o) ? ' en' : ''); if (a != null && i === ans) c += ' ok'; else if (a === i) c += ' ng';
        return `<button class="${c}" data-act="lqans" data-k="${k}" data-i="${i}" ${a != null ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>
        ${a != null ? `<span class="small">${a === ans ? '<b style="color:var(--good)">正解。</b>' : '<b style="color:var(--bad)">不正解。</b>'} ${esc(why)}</span>` : ''}</div>`;
    }
    if (b.go) return `<div><button class="btn" data-act="lgo" data-tab="${b.go[0]}" data-x="${esc(b.go[2] || '')}">${esc(b.go[1])} →</button></div>`;
    return '';
  }
  function vLesson() {
    const i = L.findIndex(l => l.id === ui.lesson.open), l = L[i];
    const qs = l.blocks.map((b, k) => b.q ? k : -1).filter(k => k >= 0);
    const answered = qs.filter(k => ui.lesson.ans[k] != null).length;
    return `<div class="row"><button class="btn" data-act="lclose">← レッスン一覧</button><span class="small muted">${esc(U[l.unit] || '')} · ${i + 1} / ${L.length}</span></div>
      <article class="sheet lbody"><h2 style="font-size:22px">${esc(l.title)}</h2>${l.blocks.map(block).join('')}
        <div class="row" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:12px">
          ${S.lessonDone[l.id] ? '<span class="small" style="color:var(--good)">✓ 完了済み</span>' : qs.length && answered < qs.length ? `<span class="small muted">確認問題 ${answered} / ${qs.length}</span>` : `<button class="btn primary" data-act="ldone">完了にする</button>`}
          <div class="row">${i > 0 ? `<button class="btn" data-act="lopen" data-id="${L[i - 1].id}">← 前</button>` : ''}${i + 1 < L.length ? `<button class="btn primary" data-act="lopen" data-id="${L[i + 1].id}">次のレッスン →</button>` : ''}</div>
        </div></article>`;
  }
  const vLessons = () => ui.lesson.open ? vLesson() : vList();

  Object.assign(ACT, {
    lopen: d => { ui.lesson = {open: d.id, ans: {}}; render(); scrollTo({top: 0}); },
    lclose: () => { ui.lesson.open = null; render(); },
    lqans: d => {
      const l = L.find(x => x.id === ui.lesson.open); ui.lesson.ans[+d.k] = +d.i;
      const qs = l.blocks.map((b, k) => b.q ? k : -1).filter(k => k >= 0);
      if (qs.every(k => ui.lesson.ans[k] != null)) { S.lessonDone[l.id] = Date.now(); window.addXP?.(5, 'lesson'); save(); }
      render();
    },
    ldone: () => { S.lessonDone[ui.lesson.open] = Date.now(); window.addXP?.(5, 'lesson'); save(); render(); },
    lgo: d => {
      const t = d.tab, x = d.x;
      if (t === 'sent' && x) { if (['order', 'trans', 'cloze', 'read', 'list'].includes(x)) ui.sent.mode = x; else { ui.sent.cat = x; ui.sent.src = 'pat'; ui.sent.mode = 'trans'; } ui.sent.item = null; }
      if (t === 'japan' && x) { ui.jp.mode = x; ui.jp.q = null; }
      if (t === 'expr' && x) ui.expr.mode = x;
      S.tab = t; save(); render(); scrollTo({top: 0});
    },
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), lessons: vLessons};
  render();
})();
