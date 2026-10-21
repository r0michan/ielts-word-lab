/* 間違いノート: everything the learner got wrong, across all practice types, with one-tap review. */
(() => {
  const css = `
  .nsec{display:flex;flex-direction:column;gap:10px}
  .nsec h3{font-size:16px;display:flex;align-items:center;gap:8px}
  .nsec h3 .n{font-family:var(--f-word);font-size:13px;background:var(--bad-soft);color:var(--bad);border-radius:99px;padding:0 9px}
  .nsum{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
  .nsum button{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px;text-align:left;cursor:pointer}
  .nsum button b{display:block;font-family:var(--f-word);font-size:24px;font-variant-numeric:tabular-nums}
  .nsum button span{font-size:12px;color:var(--muted)}
  .nq{border-top:1px solid var(--line);padding-top:8px;display:flex;flex-direction:column;gap:3px}
  .nq:first-of-type{border-top:0;padding-top:0}
  .nq .q{font-family:var(--f-word);font-size:15.5px}
  .nq .a{font-size:13px}
  .nq .w{font-size:12.5px;color:var(--muted)}
  .ntop{display:flex;flex-direction:column;gap:6px}
  .ntop div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;font-size:14px;border-bottom:1px dashed var(--line);padding-bottom:4px}
  .ntop b{font-family:var(--f-word);font-variant-numeric:tabular-nums;color:var(--bad)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  S.missed = S.missed || {read: [], listen: [], write: {}};
  const RD = () => window.READING || [], LS = () => window.LISTENING || [];
  const nz = x => String(x ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const lisRight = (q, a) => a != null && a !== '' && (q[0] !== 'gap' ? a === q[2] : q[2].split('/').some(x => nz(x) === nz(a)));

  /* ---------- recording: reading & listening questions, writing errors ---------- */
  function record(kind, id, qs, right) {
    let list = S.missed[kind].filter(m => m.id !== id || right[m.qi] === false);   // drop items answered correctly this time
    qs.forEach((q, i) => { if (!right[i] && !list.some(m => m.id === id && m.qi === i)) list.push({id, qi: i, t: Date.now()}); });
    S.missed[kind] = list.slice(-200); save();
  }
  const prevR = ACT.rcheck, prevL = ACT.lcheck;
  ACT.rcheck = (...a) => { const r = prevR(...a); const P0 = RD()[ui.read.i], F = READ_FLAT(P0); record('read', P0.id, F, F.map(q => q.ok(ui.read.ans[q.n]))); return r; };
  ACT.lcheck = (...a) => { const r = prevL(...a); const T = LS()[ui.lis.i]; record('listen', T.id, T.qs, T.qs.map((q, i) => lisRight(q, ui.lis.ans[i]))); return r; };
  const prevAnalyze = analyzeWriting;
  analyzeWriting = function (raw, p) {
    const res = prevAnalyze(raw, p);
    const errItem = res.out.find(x => x.lv === 'bad' && /誤り/.test(x.title));
    (errItem?.hits || []).forEach(h => { const k = h.includes('→') ? h.split('→').slice(1).join('→').trim() : h; S.missed.write[k] = (S.missed.write[k] || 0) + 1; });
    const inf = res.out.find(x => /くだけた表現/.test(x.title) && x.lv !== 'ok');
    (inf?.hits || []).forEach(h => { const k = '（文体）' + (h.includes('→') ? h.split('→').slice(1).join('→').trim() : h); S.missed.write[k] = (S.missed.write[k] || 0) + 1; });
    saveSoon();
    return res;
  };

  /* ---------- collecting ---------- */
  function collect() {
    const words = WORDS.filter(w => { const p = S.prog[w.id]; return p && ((p.qw || 0) > (p.qc || 0) || (p.seen && p.box <= 1) || (p.pb != null && p.pb < 60)); });
    const sents = SENT.filter(x => { const p = S.sprog[x.id]; return p && p.ng > 0 && p.ng >= p.ok; });
    const IDI = window.IDIOMS || [];
    const idioms = IDI.filter(i => { const p = S.iprog?.[i.id]; return p && p.ng > 0 && p.ng >= p.ok; });
    const J = window.JP_DATA || {ERRS: [], WASEI: []};
    const errs = J.ERRS.filter(e => { const p = S.jprog?.errs?.[e.wrong]; return p && p.ng > 0 && p.ng >= p.ok; });
    const wasei = J.WASEI.filter(w => { const p = S.jprog?.wasei?.[w.kata]; return p && p.ng > 0 && p.ng >= p.ok; });
    const sounds = Object.entries(S.jprog?.pairs || {}).map(([s, r]) => [s, r.ok / (r.ok + r.ng), r.ok + r.ng]).filter(([, pc, n]) => n >= 3 && pc < 0.8).sort((a, b) => a[1] - b[1]);
    const read = S.missed.read.map(m => { const P0 = RD().find(r => r.id === m.id); const q = P0 && READ_FLAT(P0)[m.qi]; return q && {...m, P0, q}; }).filter(Boolean);
    const listen = S.missed.listen.map(m => { const T = LS().find(r => r.id === m.id); return T && {...m, T, q: T.qs[m.qi]}; }).filter(Boolean);
    const write = Object.entries(S.missed.write).sort((a, b) => b[1] - a[1]).slice(0, 12);
    return {words, sents, idioms, errs, wasei, sounds, read, listen, write};
  }
  window.MISTAKES = collect;

  /* ---------- view ---------- */
  function vNotes() {
    const c = collect();
    const total = c.words.length + c.sents.length + c.idioms.length + c.errs.length + c.wasei.length + c.read.length + c.listen.length;
    const tile = (k, n, label) => `<button data-act="njump" data-k="${k}"><b>${n}</b><span>${label}</span></button>`;
    const sec = (id, title, n, body) => `<section class="sheet nsec" id="n-${id}"><h3>${title}<span class="n">${n}</span></h3>${body}</section>`;
    if (!total && !c.write.length && !c.sounds.length) return `<div class="sheet empty"><p><b>まだ間違いはありません。</b></p><p class="small" style="margin-top:8px">単語カード・クイズ・文トレ・読解・リスニング・イディオム・日本人の弱点・ライティングで間違えた問題が、ここに自動で集まります。</p></div>`;
    const LBL = {T: 'TRUE', F: 'FALSE', NG: 'NOT GIVEN'};
    return `<div class="sheet panel" style="gap:10px"><b>間違いノート</b><p class="small muted">全部の練習で間違えた問題が自動で集まります。正解できるようになると消えます。今は ${total} 件。</p>
      <div class="nsum">${tile('words', c.words.length, '単語')}${tile('sents', c.sents.length, '構文')}${tile('idioms', c.idioms.length, 'イディオム・前置詞')}${tile('read', c.read.length, '読解の問題')}${tile('listen', c.listen.length, 'リスニングの問題')}${tile('errs', c.errs.length + c.wasei.length, '日本人の弱点')}${tile('write', c.write.length, 'ライティングの誤り')}</div></div>
    ${c.words.length ? sec('words', '単語', c.words.length, `<div class="wordpills">${c.words.slice(0, 80).map(w => `<button class="wp" data-act="say" data-text="${esc(w.w)}">${lvChip(w.lv)} ${esc(w.w)} <span class="muted small">${esc(w.ja)}</span></button>`).join('')}</div>
      <div class="row"><button class="btn primary" data-act="nquiz" ${c.words.length < 4 ? 'disabled' : ''}>この単語でクイズ</button><button class="btn" data-act="ncards">単語カードの復習に入れる</button>${c.words.length < 4 ? '<span class="small muted">クイズは4語以上から</span>' : ''}</div>`) : ''}
    ${c.sents.length ? sec('sents', '構文', c.sents.length, `<div class="plist">${c.sents.slice(0, 30).map(x => `<div class="pitem"><button class="iconbtn" data-act="say" data-text="${esc(x.en)}" aria-label="再生">${ICON.speak}</button><div><span class="pat">${esc(x.pat)}</span><div class="en">${esc(x.en)}</div><div class="jp">${esc(x.ja)}</div></div></div>`).join('')}</div>
      <div class="row"><button class="btn primary" data-act="nsent" data-m="trans">和文英訳で練習</button><button class="btn" data-act="nsent" data-m="order">並べ替えで練習</button></div>`) : ''}
    ${c.idioms.length ? sec('idioms', 'イディオム・前置詞', c.idioms.length, `<div class="plist">${c.idioms.slice(0, 30).map(i => `<div class="pitem"><button class="iconbtn" data-act="say" data-text="${esc(i.plain)}" aria-label="再生">${ICON.speak}</button><div><span class="pat">${esc(i.phrase)}</span><div class="en">${esc(i.plain)}</div><div class="jp">${esc(i.ja)}</div></div></div>`).join('')}</div>
      <div class="row"><button class="btn primary" data-act="nidiom" ${c.idioms.length < 1 ? 'disabled' : ''}>この表現でテスト</button></div>`) : ''}
    ${c.read.length ? sec('read', '読解で間違えた問題', c.read.length, c.read.slice(-20).reverse().map(m => `<div class="nq"><span class="w">${esc(m.P0.title)} · 問${m.qi + 1}</span><span class="q">${esc(m.q.prompt)}</span><span class="a">正解：<b>${esc(m.q.answerText)}</b>${m.q.why ? ` — ${esc(m.q.why)}` : ''}</span></div>`).join('') + `<div class="row"><button class="btn" data-act="nread" data-id="${esc(c.read[c.read.length - 1].id)}">最後に間違えた文章を解き直す</button></div>`) : ''}
    ${c.listen.length ? sec('listen', 'リスニングで間違えた問題', c.listen.length, c.listen.slice(-20).reverse().map(m => `<div class="nq"><span class="w">Section ${m.T.section}：${esc(m.T.title)} · 問${m.qi + 1}</span><span class="q">${esc(m.q[1])}</span><span class="a">正解：<b>${esc(m.q[0] !== 'gap' ? ((m.q[3] || m.T.choices || '').split('|').find(o => o.startsWith(m.q[2])) || m.q[2]) : m.q[2].split('/')[0])}</b></span></div>`).join('') + `<div class="row"><button class="btn" data-act="nlisten" data-id="${esc(c.listen[c.listen.length - 1].id)}">最後に間違えたセクションを解き直す</button></div>`) : ''}
    ${c.errs.length || c.wasei.length || c.sounds.length ? sec('errs', '日本人の弱点', c.errs.length + c.wasei.length, `
      ${c.sounds.length ? `<div><span class="small muted">聞き分けが苦手な音</span><div class="weak" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">${c.sounds.map(([s, pc, n]) => `<span class="tag">${esc(s)} ${Math.round(pc * 100)}%（${n}回）</span>`).join('')}</div></div>` : ''}
      ${c.errs.map(e => `<div class="nq"><span class="q" style="color:var(--bad);text-decoration:line-through">${esc(e.wrong)}</span><span class="q" style="color:var(--good)">${esc(e.alts[0])}</span><span class="w">${esc(e.why)}</span></div>`).join('')}
      ${c.wasei.map(w => `<div class="nq"><span class="q">${esc(w.kata)} → <b>${esc(w.right)}</b></span><span class="w">${esc(w.note || '')}</span></div>`).join('')}
      <div class="row"><button class="btn" data-act="tab" data-tab="japan">日本人の弱点で練習する</button></div>`) : ''}
    ${c.write.length ? sec('write', 'ライティングでよく出る誤り', c.write.length, `<div class="ntop">${c.write.map(([k, n]) => `<div><span>${esc(k)}</span><b>×${n}</b></div>`).join('')}</div><p class="small muted">添削チェックで見つかった誤りの回数です。上にあるものほど癖になっています。</p>`) : ''}`;
  }

  Object.assign(ACT, {
    njump: d => document.getElementById('n-' + d.k)?.scrollIntoView({behavior: 'smooth', block: 'start'}),
    nquiz: () => { ui.quizPool = collect().words; ui.quiz = null; S.tab = 'quiz'; save(); render(); scrollTo({top: 0}); },
    qpoolclear: () => { ui.quizPool = null; ui.quiz = null; render(); },
    ncards: () => { collect().words.forEach(w => { const p = P(w.id); p.seen = Math.max(p.seen || 0, 1); p.box = Math.min(p.box || 0, 1); p.due = Date.now(); }); ui.cram = false; save(); S.tab = 'card'; render(); },
    nsent: d => { ui.sentPool = collect().sents; ui.sent.mode = d.m; ui.sent.src = 'pat'; ui.sent.item = null; S.tab = 'sent'; save(); render(); scrollTo({top: 0}); },
    spoolclear: () => { ui.sentPool = null; ui.sent.item = null; render(); },
    nidiom: () => { ui.expr.pool = collect().idioms; ui.expr.mode = 'idiom'; ui.expr.iq = null; S.tab = 'expr'; save(); render(); scrollTo({top: 0}); },
    nread: d => { ui.read.i = Math.max(0, RD().findIndex(r => r.id === d.id)); ui.read.ans = {}; ui.read.checked = false; S.tab = 'read'; save(); render(); scrollTo({top: 0}); },
    nlisten: d => { Object.assign(ui.lis, {i: Math.max(0, LS().findIndex(r => r.id === d.id)), ans: {}, checked: false, script: false, plays: 0}); S.tab = 'listen'; save(); render(); scrollTo({top: 0}); },
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), notes: vNotes};
  render();
})();
