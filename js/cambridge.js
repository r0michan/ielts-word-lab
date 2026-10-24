/* ケンブリッジ形式の模試エンジン（A1〜C2）。
   本物の試験（A1 Movers 〜 C2 Proficiency）のパート構成・設問形式・文章量をそろえたオリジナル問題を解き、
   正答率から Cambridge English Scale の目安と判定を出す。昇格テストとしても使う（合格ラインは本物と同じく約60%）。
   パートの種類: mcq / mc_cloze / open_cloze / wordform / kwt / gapped / matching / writing / listen */
(() => {
  const css = `
  .cbh{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
  .cbtabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px}
  .cbtabs::-webkit-scrollbar{display:none}
  .cbtabs button{flex:none;border:1.5px solid var(--line);background:var(--surface);border-radius:999px;padding:5px 12px;font-size:12.5px;font-weight:800;cursor:pointer;color:var(--ink)}
  .cbtabs button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
  .cbtabs button.full{border-color:var(--good)}
  .cbinst{background:var(--sunk);border-radius:14px;padding:10px 12px;font-size:13.5px;line-height:1.7}
  .cbtext{font-family:var(--f-word);font-size:16.5px;line-height:2.05;background:var(--surface);border:1.5px solid var(--line);border-radius:16px;padding:14px 16px}
  .cbtext p{margin:0 0 .8em}
  .cbgap{display:inline-flex;align-items:center;gap:3px;vertical-align:baseline}
  .cbgap .n{font-family:var(--f-ui);font-size:11px;font-weight:900;color:#fff;background:var(--c3);border-radius:6px;padding:0 5px}
  .cbgap select,.cbgap input{font-family:var(--f-word);font-size:15px;border:1.5px solid var(--line);border-radius:8px;padding:2px 6px;background:var(--surface);color:var(--ink);max-width:180px}
  .cbgap input{width:120px}
  .cbgap.ok select,.cbgap.ok input{border-color:var(--good);background:var(--good-soft)}
  .cbgap.ng select,.cbgap.ng input{border-color:var(--bad);background:var(--bad-soft)}
  .cbgap .stem{font-family:var(--f-ui);font-size:11px;font-weight:900;color:var(--c3)}
  .cbfix{font-size:12.5px;color:var(--good);font-weight:800;font-family:var(--f-ui)}
  .cbq{display:flex;flex-direction:column;gap:8px;border-top:1px dashed var(--line);padding-top:10px}
  .cbq:first-child{border-top:0;padding-top:0}
  .cbq .qq{font-weight:800}
  .cbopts{display:grid;gap:6px}
  .cbopt{display:flex;gap:10px;align-items:flex-start;text-align:left;border:1.5px solid var(--line);background:var(--surface);border-radius:12px;padding:9px 12px;cursor:pointer;color:var(--ink);font-size:15px}
  .cbopt .k{font-weight:900;color:var(--muted);flex:none;width:18px}
  .cbopt.sel{border-color:var(--c3);background:color-mix(in srgb,var(--c3) 10%,var(--surface))}
  .cbopt.ok{border-color:var(--good);background:var(--good-soft)} .cbopt.ng{border-color:var(--bad);background:var(--bad-soft)}
  .cbwhy{font-size:13px;color:var(--muted)}
  .cbkwt{display:flex;flex-direction:column;gap:6px;border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface)}
  .cbkwt .s1{font-family:var(--f-word);font-size:16px}
  .cbkwt .key{font-weight:900;letter-spacing:.08em;color:var(--c3)}
  .cbkwt input{width:100%;font-family:var(--f-word);font-size:15.5px;border:1.5px solid var(--line);border-radius:10px;padding:6px 10px}
  .cbmatch{display:grid;gap:10px}
  .cbmatch .tx{border:1.5px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface)}
  .cbmatch .tx b{color:var(--c3)}
  .cbmatch .tx p{font-family:var(--f-word);font-size:15px;line-height:1.75;margin:.3em 0 0}
  .cbmrow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;border-bottom:1px dashed var(--line);padding:6px 0;font-size:14.5px}
  .cbmrow select{font-weight:800}
  .cbwrite{width:100%;min-height:220px;font-family:var(--f-word);font-size:16px;line-height:1.7;border:1.5px solid var(--line);border-radius:14px;padding:12px}
  .cbres{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}
  .cbres div{background:var(--sunk);border-radius:14px;padding:10px 12px}
  .cbres b{display:block;font-family:var(--f-word);font-size:22px}
  .cbres span{font-size:12px;color:var(--muted)}
  .cbscale{font-family:var(--f-word);font-size:46px;font-weight:800;line-height:1}
  .cblist{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
  .cbcard{display:flex;flex-direction:column;gap:4px;text-align:left;border:1.5px solid var(--line);background:var(--surface);border-radius:16px;padding:12px 14px;cursor:pointer;color:var(--ink)}
  .cbcard:hover{border-color:var(--accent)}
  .cbcard b{font-size:15.5px} .cbcard span{font-size:12.5px;color:var(--muted)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const CB = window.CAMBRIDGE || {};
  S.cbres = S.cbres || {};
  ui.cb = null;
  // percentage → Cambridge English Scale band for each paper (60% ≈ pass at the level, 80% ≈ grade A / next level)
  const SCALE = {A1: [100, 120], A2: [120, 140], B1: [140, 160], B2: [160, 180], C1: [180, 200], C2: [200, 220]};
  const NEXT = {A1: 'A2', A2: 'B1', B1: 'B2', B2: 'C1', C1: 'C2', C2: 'C2'}, PREV = {A1: 'Pre-A1', A2: 'A1', B1: 'A2', B2: 'B1', C1: 'B2', C2: 'C1'};
  function scaleOf(L, p) {
    const [lo, hi] = SCALE[L]; // 60% → lo, 80% → hi, straight line either side
    return Math.round(lo + (p - 60) * (hi - lo) / 20);
  }
  function verdict(L, p) {
    if (p >= 80) return {g: 'A', t: `グレード A 相当（${NEXT[L]} レベルの力）`};
    if (p >= 75) return {g: 'B', t: `グレード B 相当（${L} 合格）`};
    if (p >= 60) return {g: 'C', t: `グレード C 相当（${L} 合格ライン）`};
    if (p >= 45) return {g: '-', t: `${PREV[L]} レベル相当（${L} には未到達）`};
    return {g: '×', t: `${L} の試験はまだ難しい段階です`};
  }

  /* ---------- answer checking ---------- */
  const norm = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[.,!?;:"]/g, ' ').replace(/\s+/g, ' ').trim();
  const accept = (typed, list) => { const t = norm(typed); return !!t && list.some(a => norm(a) === t); };
  const partItems = p => p.type === 'mcq' || p.type === 'listen' ? p.items.length : p.type === 'kwt' ? p.items.length * 2 : p.type === 'matching' ? p.items.length : p.type === 'writing' ? p.points || 10 : p.gaps.length;
  function scorePart(p, A) {
    let s = 0;
    if (['mc_cloze', 'gapped'].includes(p.type)) p.gaps.forEach((g, i) => { if (A[i] != null && +A[i] === g.a) s++; });
    else if (['open_cloze', 'wordform'].includes(p.type)) p.gaps.forEach((g, i) => { if (accept(A[i], g.a)) s++; });
    else if (p.type === 'kwt') p.items.forEach((it, i) => { if (accept(A[i], it.a)) s += 2; });
    else if (['mcq', 'listen'].includes(p.type)) p.items.forEach((it, i) => { if (A[i] != null && +A[i] === it.a) s++; });
    else if (p.type === 'matching') p.items.forEach((it, i) => { if (A[i] === it.a) s++; });
    else if (p.type === 'writing') { const n = (A.text || '').trim().split(/\s+/).filter(Boolean).length, ticks = Object.values(A.ticks || {}).filter(Boolean).length; s = n >= p.min ? Math.round((ticks / p.checks.length) * partItems(p)) : 0; }
    return s;
  }

  /* ---------- rendering of each part ---------- */
  const L8 = 'ABCDEFGHIJ';
  function gapText(p, A, done) {
    let k = -1;
    return p.text.split('\n').map(par => `<p>${esc(par).replace(/\{(\d+)\}/g, (_, d) => {
      const i = +d - 1, g = p.gaps[i], a = A[i]; k++;
      if (p.type === 'mc_cloze') {
        const ok = done && a != null && +a === g.a;
        return `<span class="cbgap ${done ? (ok ? 'ok' : 'ng') : ''}"><span class="n">${d}</span><select data-cb="${i}" ${done ? 'disabled' : ''}><option value="">—</option>${g.opts.map((o, j) => `<option value="${j}" ${a != null && +a === j ? 'selected' : ''}>${L8[j]} ${esc(o)}</option>`).join('')}</select>${done && !ok ? `<span class="cbfix">→ ${esc(g.opts[g.a])}</span>` : ''}</span>`;
      }
      if (p.type === 'gapped') {
        const ok = done && a != null && +a === g.a;
        return `<span class="cbgap ${done ? (ok ? 'ok' : 'ng') : ''}"><span class="n">${d}</span><select data-cb="${i}" ${done ? 'disabled' : ''}><option value="">—</option>${p.options.map((_, j) => `<option value="${j}" ${a != null && +a === j ? 'selected' : ''}>${L8[j]}</option>`).join('')}</select>${done && !ok ? `<span class="cbfix">→ ${L8[g.a]}</span>` : ''}</span>`;
      }
      const ok = done && accept(a, g.a);
      return `<span class="cbgap ${done ? (ok ? 'ok' : 'ng') : ''}"><span class="n">${d}</span><input data-cb="${i}" value="${esc(a || '')}" autocomplete="off" autocapitalize="off" spellcheck="false" ${done ? 'readonly' : ''}>${p.type === 'wordform' ? `<span class="stem">${esc(g.stem)}</span>` : ''}${done && !ok ? `<span class="cbfix">→ ${esc(g.a[0])}</span>` : ''}</span>`;
    })}</p>`).join('');
  }
  function partView(p, A, done) {
    let body = '';
    if (['mc_cloze', 'open_cloze', 'wordform', 'gapped'].includes(p.type)) {
      body = `<div class="cbtext">${gapText(p, A, done)}</div>`;
      if (p.type === 'gapped') body += `<div class="panel" style="gap:6px"><b class="small">入れる文（1つ余分）</b>${p.options.map((o, j) => `<div class="cbopt" style="cursor:default"><span class="k">${L8[j]}</span><span>${esc(o)}</span></div>`).join('')}</div>`;
      if (done) body += `<details class="lsn-review"><summary>解説を見る</summary>${p.gaps.map((g, i) => g.why ? `<div><b>${i + 1}.</b> ${esc(g.why)}</div>` : '').join('')}</details>`;
    } else if (p.type === 'kwt') {
      body = p.items.map((it, i) => { const ok = done && accept(A[i], it.a); return `<div class="cbkwt"><span class="s1">${i + 1}. ${esc(it.s1)}</span><span class="key">${esc(it.key)}</span><span class="s1">${esc(it.s2).replace('___', '<b>＿＿＿＿＿</b>')}</span>
        <input data-cb="${i}" value="${esc(A[i] || '')}" placeholder="キーワードを含めて${p.words || '2〜5'}語" autocomplete="off" autocapitalize="off" spellcheck="false" ${done ? 'readonly' : ''} style="${done ? (ok ? 'border-color:var(--good);background:var(--good-soft)' : 'border-color:var(--bad);background:var(--bad-soft)') : ''}">
        ${done ? `<span class="cbwhy">${ok ? '✓ 正解' : `正解例：<b>${esc(it.a[0])}</b>`}${it.why ? ' — ' + esc(it.why) : ''}</span>` : ''}</div>`; }).join('');
    } else if (p.type === 'mcq' || p.type === 'listen') {
      const top = p.text ? `<div class="cbtext">${p.text.split('\n').map(x => `<p>${esc(x)}</p>`).join('')}</div>` : '';
      body = top + p.items.map((it, i) => `<div class="cbq">
        ${it.text ? `<div class="cbtext" style="padding:10px 12px;line-height:1.75">${it.text.split('\n').map(x => `<p style="margin:0">${esc(x)}</p>`).join('')}</div>` : ''}
        ${p.type === 'listen' ? `<div class="row"><button class="btn primary" data-act="cbplay" data-i="${i}" ${(ui.cb.plays[ui.cb.pi + ':' + i] || 0) >= 2 && !done ? 'disabled' : ''}>${ICON.speak}再生（${2 - Math.min(2, ui.cb.plays[ui.cb.pi + ':' + i] || 0)}回）</button>${done ? `<details><summary class="small">スクリプト</summary><div class="small ex">${it.lines.map(l => esc(l[1])).join('<br>')}</div></details>` : ''}</div>` : ''}
        <span class="qq">${i + 1}. ${esc(it.q)}</span>
        <div class="cbopts">${it.opts.map((o, j) => `<button class="cbopt ${done ? (j === it.a ? 'ok' : A[i] != null && +A[i] === j ? 'ng' : '') : A[i] != null && +A[i] === j ? 'sel' : ''}" data-act="cbpick" data-i="${i}" data-j="${j}" ${done ? 'disabled' : ''}><span class="k">${L8[j]}</span><span>${esc(o)}</span></button>`).join('')}</div>
        ${done && it.why ? `<span class="cbwhy">${esc(it.why)}</span>` : ''}</div>`).join('');
    } else if (p.type === 'matching') {
      body = `<div class="cbmatch">${p.texts.map(t => `<div class="tx"><b>${t.k}</b> ${t.title ? `<b>${esc(t.title)}</b>` : ''}<p>${esc(t.body).replace(/\n/g, '<br>')}</p></div>`).join('')}</div>
        <div class="panel" style="gap:0">${p.items.map((it, i) => `<div class="cbmrow"><span>${i + 1}. ${esc(it.q)}${done && it.why ? `<span class="cbwhy" style="display:block">${esc(it.why)}</span>` : ''}</span><span class="cbgap ${done ? (A[i] === it.a ? 'ok' : 'ng') : ''}"><select data-cb="${i}" ${done ? 'disabled' : ''}><option value="">—</option>${p.texts.map(t => `<option value="${t.k}" ${A[i] === t.k ? 'selected' : ''}>${t.k}</option>`).join('')}</select>${done && A[i] !== it.a ? `<span class="cbfix">→ ${it.a}</span>` : ''}</span></div>`).join('')}</div>`;
    } else if (p.type === 'writing') {
      const n = (A.text || '').trim().split(/\s+/).filter(Boolean).length;
      body = `<div class="cbinst" style="background:var(--surface);border:1.5px solid var(--line)">${esc(p.prompt).replace(/\n/g, '<br>')}</div>
        <textarea class="cbwrite" data-cbw="1" spellcheck="false" ${done ? 'readonly' : ''} placeholder="ここに英語で書きましょう">${esc(A.text || '')}</textarea>
        <span class="small" id="cbwc" style="font-weight:800">${n}語（${p.min}〜${p.max}語）</span>
        <div class="panel ewchk" style="gap:0"><b style="margin-bottom:4px">書き終えたら自己採点（チェックした数が得点になります）</b>${p.checks.map((c, i) => `<label><input type="checkbox" data-cbt="${i}" ${A.ticks?.[i] ? 'checked' : ''} ${done ? 'disabled' : ''}> ${esc(c)}</label>`).join('')}</div>
        ${done && p.model ? `<details class="lsn-review" open><summary>模範解答</summary><div class="ewmodel ex">${esc(p.model)}</div></details>` : ''}`;
    }
    return `<div class="cbinst"><b>${esc(p.title)}</b>　${esc(p.instr)}</div>${body}`;
  }

  function examView() {
    const c = ui.cb, E = CB[c.L], P = E.parts, done = !!c.result;
    if (done && c.pi === -1) return resultView();
    const p = P[c.pi], A = c.ans[c.pi] || (c.ans[c.pi] = p.type === 'writing' ? {text: '', ticks: {}} : {});
    const left = Math.max(0, c.end - Date.now());
    return `<div class="sheet panel" style="gap:12px">
      <div class="cbh"><b>${esc(E.name)}${c.mode === 'levelup' ? ' ・ 昇格テスト' : ''}</b><span class="row" style="gap:8px">${done ? '' : `<span class="ttime" id="cbtime">${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}</span>`}${done ? `<button class="btn" data-act="cbresult">結果に戻る</button>` : ''}</span></div>
      <div class="cbtabs">${P.map((x, i) => { const a = c.ans[i], filled = a && Object.keys(a).length; return `<button data-act="cbpart" data-i="${i}" aria-pressed="${i === c.pi}" class="${filled ? 'full' : ''}">${esc(x.short || x.title)}</button>`; }).join('')}</div>
      ${partView(p, A, done)}
      <div class="row">${c.pi > 0 ? `<button class="btn" data-act="cbpart" data-i="${c.pi - 1}">前のパート</button>` : ''}${c.pi < P.length - 1 ? `<button class="btn primary" data-act="cbpart" data-i="${c.pi + 1}">次のパート</button>` : done ? '' : `<button class="btn primary" data-act="cbsubmit">採点する</button>`}${done ? '' : `<button class="btn ghost" data-act="cbquit">中断</button>`}</div>
    </div>`;
  }
  function resultView() {
    const c = ui.cb, E = CB[c.L], r = c.result, v = verdict(c.L, r.p);
    return `<div class="sheet panel" style="gap:14px">
      <div class="cbh"><b>${esc(E.name)} の結果${c.mode === 'levelup' ? '（昇格テスト）' : ''}</b><span class="small muted">${r.min}分</span></div>
      ${c.mode === 'levelup' ? `<div class="banner ${r.p >= 60 ? 'up' : 'dn'}">${r.p >= 60 ? `🎉 合格！ ${c.L} に昇格しました` : `不合格（${r.p}%）。合格ラインは60%です`}</div>` : ''}
      <div class="row" style="gap:16px;align-items:center"><div><div class="small muted">Cambridge English Scale（目安）</div><div class="cbscale">${scaleOf(c.L, r.p)}</div></div><div><b style="font-size:18px">${r.p}%</b><div class="small">${v.t}</div></div></div>
      <div class="cbres">${E.parts.map((p, i) => `<div><b>${r.parts[i]}/${partItems(p)}</b><span>${esc(p.short || p.title)}</span></div>`).join('')}</div>
      <p class="small muted">本物の試験と同じ形式・難易度を目指したオリジナル問題での目安です。ライティングは自己採点、スピーキングは含みません。正式な判定は公式の試験・公式問題集で確認してください。</p>
      <div class="row"><button class="btn primary" data-act="cbpart" data-i="0">答えと解説を見る</button><button class="btn" data-act="cbclose">一覧へ</button></div>
    </div>`;
  }
  function listView() {
    const Ls = LEVELS.filter(L => CB[L]);
    return `<section class="sheet panel" style="gap:10px"><b>ケンブリッジ形式の模試（A1〜C2）</b>
      <p class="small muted">本物のケンブリッジ英検と同じパート構成・設問形式・文章量のオリジナル問題です。結果は Cambridge English Scale の目安で表示します（約60%で各レベル合格、約80%で次のレベル相当）。</p>
      <div class="cblist">${Ls.map(L => { const E = CB[L], b = S.cbres[L]; return `<button class="cbcard" data-act="cbstart" data-l="${L}"><b><span class="lv lv-${L[0]}">${L}</span> ${esc(E.name)}</b><span>${E.parts.length}パート ・ 約${E.minutes}分</span><span>${b ? `ベスト ${b.p}%（スケール ${scaleOf(L, b.p)}）` : '未受験'}</span></button>`; }).join('')}</div></section>`;
  }

  /* ---------- flow ---------- */
  let timer = null;
  function start(L, mode = 'mock') {
    const E = CB[L]; if (!E) return false;
    ui.cb = {L, mode, pi: 0, ans: {}, plays: {}, start: Date.now(), end: Date.now() + E.minutes * 60e3, result: null};
    clearInterval(timer); timer = setInterval(() => { const c = ui.cb; if (!c || c.result) return clearInterval(timer); const el = document.getElementById('cbtime'), left = Math.max(0, c.end - Date.now()); if (el) el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; if (!left) submit(); }, 1000);
    ACT.tab({tab: 'tests'}); render(); scrollTo(0, 0); return true;
  }
  function collect() {
    const c = ui.cb; if (!c || c.result) return; const A = c.ans[c.pi] || (c.ans[c.pi] = {});
    document.querySelectorAll('[data-cb]').forEach(el => { const v = el.value; if (v !== '') A[el.dataset.cb] = v; else delete A[el.dataset.cb]; });
    const w = document.querySelector('[data-cbw]'); if (w) A.text = w.value;
    document.querySelectorAll('[data-cbt]').forEach(el => { (A.ticks = A.ticks || {})[el.dataset.cbt] = el.checked; });
  }
  function submit() {
    collect(); const c = ui.cb, E = CB[c.L]; clearInterval(timer);
    const parts = E.parts.map((p, i) => scorePart(p, c.ans[i] || {})), got = parts.reduce((a, b) => a + b, 0), max = E.parts.reduce((a, p) => a + partItems(p), 0);
    const p = Math.round(got / max * 100);
    c.result = {parts, p, min: Math.round((Date.now() - c.start) / 60000)}; c.pi = -1;
    if (!S.cbres[c.L] || p > S.cbres[c.L].p) S.cbres[c.L] = {p, at: Date.now()};
    window.addXP?.(30, 'test');
    if (c.mode === 'levelup') window.LEVEL_PROMOTE?.(c.L, p, 60);
    p >= 60 ? window.SFX?.fanfare(p >= 80) : window.SFX?.pop();
    save(); render(); scrollTo(0, 0);
  }
  // speak one listening extract: alternate two voices' pitch so speakers are distinguishable
  function play(i) {
    const c = ui.cb, it = CB[c.L].parts[c.pi].items[i], key = c.pi + ':' + i;
    if (!c.result && (c.plays[key] || 0) >= 2) return;
    c.plays[key] = (c.plays[key] || 0) + 1;
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const v = pickVoice(), names = [...new Set(it.lines.map(l => l[0]))];
    it.lines.forEach(([who, text]) => { const u = new SpeechSynthesisUtterance(text); if (v) u.voice = v; u.lang = v ? v.lang : S.settings.accent; u.rate = S.settings.rate * .95; u.pitch = names.indexOf(who) % 2 ? .8 : 1.15; speechSynthesis.speak(u); });
    collect(); render();
  }
  Object.assign(ACT, {
    cbstart: x => start(x.l, x.m || 'mock'),
    cbpart: x => { collect(); ui.cb.pi = +x.i; render(); scrollTo(0, 0); },
    cbpick: x => { window.SFX?.pop(); collect(); (ui.cb.ans[ui.cb.pi] = ui.cb.ans[ui.cb.pi] || {})[x.i] = x.j; render(); },
    cbplay: x => play(+x.i),
    cbsubmit: () => { collect(); const E = CB[ui.cb.L], empty = E.parts.filter((p, i) => !ui.cb.ans[i] || !Object.keys(ui.cb.ans[i]).length).length; if (empty && !confirm(`未回答のパートが ${empty} つあります。採点しますか？`)) return; submit(); },
    cbquit: () => { if (confirm('模試を中断しますか？（記録されません）')) { clearInterval(timer); ui.cb = null; render(); } },
    cbresult: () => { ui.cb.pi = -1; render(); scrollTo(0, 0); },
    cbclose: () => { ui.cb = null; render(); scrollTo(0, 0); },
  });
  document.addEventListener('input', e => { if (e.target.dataset?.cbw) { const c = $('#cbwc'), p = CB[ui.cb.L].parts[ui.cb.pi]; if (c) c.textContent = `${e.target.value.trim().split(/\s+/).filter(Boolean).length}語（${p.min}〜${p.max}語）`; } });
  window.CB_START = start;
  window.CB_VIEW = () => ui.cb ? examView() : null;
  window.CB_LIST = listView;
})();
