/* 短い作文（A1〜B2）と、IELTS ライティングのバンド別セルフチェック表。
   作文は自動チェック（語数・大文字・繰り返し・短縮形）＋自分で確認するチェックリスト＋模範解答で自己添削する。 */
(() => {
  const css = `
  .ewlist{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
  .ewcard{display:flex;flex-direction:column;gap:4px;text-align:left;background:var(--surface);border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;cursor:pointer;color:var(--ink)}
  .ewcard:hover{border-color:var(--accent)} .ewcard.done{border-color:color-mix(in srgb,var(--good) 60%,var(--line))}
  .ewcard b{font-size:15px} .ewcard span{font-size:12.5px;color:var(--muted)}
  .ewtask{background:var(--sunk);border-radius:16px;padding:12px 14px;line-height:1.7}
  .ewbox{width:100%;min-height:200px;font-family:var(--f-word);font-size:16.5px;line-height:1.7;border:1.5px solid var(--line);border-radius:16px;padding:12px 14px;background:var(--surface);resize:vertical}
  .ewmeta{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;font-weight:800}
  .ewauto li{margin:2px 0} .ewauto .okk{color:var(--good)} .ewauto .ngg{color:var(--warn)}
  .ewchk label{display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px dashed var(--line);font-size:14px}
  .ewmodel{white-space:pre-line;font-family:var(--f-word);font-size:15.5px;line-height:1.75;background:var(--good-soft);border-radius:16px;padding:12px 14px}
  .rub{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
  .rub th,.rub td{border-bottom:1px solid var(--line);padding:8px;vertical-align:top;text-align:left}
  .rub th{font-size:12px;color:var(--muted)} .rub td:first-child{font-weight:800;white-space:nowrap}
  .rub .b7{background:var(--accent-soft)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const EW = window.EASY_WRITING || [], RUB = window.BAND_RUBRIC || [];
  S.ewrite = S.ewrite || {}; S.ewcheck = S.ewcheck || {}; S.ewdone = S.ewdone || {};
  ui.ew = {lv: null, id: null, model: false};
  const curLv = () => ui.ew.lv || S.lv?.cur || 'A1';
  const words = t => (t.match(/[A-Za-z][A-Za-z'’-]*/g) || []);
  const STOP = new Set('the a an and or but so to of in on at for with is are was were be been it this that i you he she we they my your his her our their me him us them do does did not have has had will would can could should there here very also as if then than from by'.split(' '));
  function autoChecks(t, it) {
    const w = words(t), n = w.length, out = [];
    out.push([n >= it.min && n <= it.max, `語数 ${n}語（目安 ${it.min}〜${it.max}語）`]);
    const sents = t.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
    const lowStart = sents.filter(s => /^[a-z]/.test(s)).length;
    out.push([!lowStart, lowStart ? `小文字で始まっている文が ${lowStart} つあります` : '文の最初はすべて大文字']);
    const iLower = (t.match(/(^|\s)i(\s|'|’)/g) || []).length;
    out.push([!iLower, iLower ? `「i」が小文字になっている所が ${iLower} か所あります（I は常に大文字）` : '「I」は大文字で書けている']);
    const noEnd = t.trim() && !/[.!?)]$/.test(t.trim());
    out.push([!noEnd, noEnd ? '最後の文にピリオドがありません' : '最後はピリオドで終わっている']);
    const cnt = {}; w.map(x => x.toLowerCase()).filter(x => !STOP.has(x) && x.length > 3).forEach(x => cnt[x] = (cnt[x] || 0) + 1);
    const reps = Object.entries(cnt).filter(([, c]) => c >= (n > 150 ? 4 : 3)).map(([x, c]) => `${x}×${c}`);
    out.push([!reps.length, reps.length ? `繰り返しが多い語：${reps.join('、')}（言い換えを検討）` : '同じ語の繰り返しは少なめ']);
    if (/Dear Sir|Yours faithfully|I am writing/i.test(it.model)) { const c = (t.match(/\b\w+'(m|re|s|t|ll|ve|d)\b/g) || []).length; out.push([!c, c ? `フォーマルな文章に短縮形が ${c} か所あります（I'm → I am など）` : '短縮形を使っていない']); }
    return out;
  }
  function listView() {
    const L = curLv(), items = EW.filter(x => x.lv === L);
    return `<div class="lvchips" role="group">${['A1', 'A2', 'B1', 'B2'].map(l => `<button class="lvchip" data-act="ewlv" data-l="${l}" aria-pressed="${l === L}"><b>${l}</b><span>${EW.filter(x => x.lv === l).length}題</span></button>`).join('')}</div>
      <p class="small muted">レベルに合ったお題で書き、自動チェック → 自分でチェックリスト → 模範解答と比べる、の順で自己添削します。B2 は IELTS 本番と同じ形式です。</p>
      <div class="ewlist">${items.map(x => `<button class="ewcard ${S.ewdone[x.id] ? 'done' : ''}" data-act="ewopen" data-id="${x.id}"><b>${esc(x.title)}${S.ewdone[x.id] ? ' ✓' : ''}</b><span>${esc(x.task.length > 60 ? x.task.slice(0, 60) + '…' : x.task)}</span><span>${x.min}〜${x.max}語</span></button>`).join('')}</div>`;
  }
  function detailView() {
    const it = EW.find(x => x.id === ui.ew.id), t = S.ewrite[it.id] || '', ck = S.ewcheck[it.id] || {}, auto = t.trim() ? autoChecks(t, it) : [];
    return `<div class="sheet panel" style="gap:12px">
      <div class="row" style="justify-content:space-between"><span><span class="lv lv-${it.lv[0]}">${it.lv}</span> <b>${esc(it.title)}</b></span><button class="btn ghost" data-act="ewback">一覧へ</button></div>
      <div class="ewtask">${esc(it.task)}<div class="small muted">目安 ${it.min}〜${it.max}語</div></div>
      <textarea id="ewtext" class="ewbox" spellcheck="false" placeholder="ここに英語で書きましょう">${esc(t)}</textarea>
      <div class="ewmeta"><span id="ewcount">${words(t).length}語</span><span class="muted">自動保存されます</span></div>
      <div class="row"><button class="btn primary" data-act="ewcheck">自動チェック</button><button class="btn" data-act="ewmodel">${ui.ew.model ? '模範解答をかくす' : '模範解答を見る'}</button></div>
      ${auto.length ? `<div class="panel" style="gap:4px"><b>自動チェック</b><ul class="ewauto" style="margin:0;padding-left:1.2em">${auto.map(([ok, m]) => `<li class="${ok ? 'okk' : 'ngg'}">${ok ? '✓' : '△'} ${esc(m)}</li>`).join('')}</ul></div>` : ''}
      <div class="panel ewchk" style="gap:0"><b style="margin-bottom:4px">自分でチェック</b>${it.checks.map((c, i) => `<label><input type="checkbox" data-act="ewtick" data-i="${i}" ${ck[i] ? 'checked' : ''}> ${esc(c)}</label>`).join('')}</div>
      ${ui.ew.model ? `<div class="panel" style="gap:6px"><div class="row" style="justify-content:space-between"><b>模範解答</b>${sayBtn(it.model.replace(/\n/g, ' '), '聞く')}</div><div class="ewmodel ex">${esc(it.model)}</div><span class="small muted">丸写しではなく、使えそうな表現を3つ選んで自分の文に取り入れてみましょう。</span></div>` : ''}
      <div class="row"><button class="btn primary big" data-act="ewdone">書き終えた（+10 XP）</button></div>
    </div>`;
  }
  const vEw = () => ui.ew.id ? detailView() : listView();

  /* ---------- band rubric on the IELTS writing screen ---------- */
  ui.rub = {open: false, t: {}};
  function rubric() {
    if (!RUB.length) return '';
    const done = Object.values(ui.rub.t).filter(Boolean).length, total = RUB.reduce((a, r) => a + r.checks.length, 0);
    return `<section class="sheet panel" style="gap:10px"><button class="qhead" style="padding:0" data-act="rubtoggle" aria-expanded="${ui.rub.open}"><span>📋 バンド 6・7・8 セルフチェック表</span><span class="small muted">${done}/${total}</span><span class="cv">${ui.rub.open ? '▴' : '▾'}</span></button>
      ${ui.rub.open ? `<p class="small muted">IELTS ライティングは4つの観点で採点されます。書き終えたら、バンド7の欄を目標に自分の答案を見直しましょう（公式の評価基準をもとにした要約です）。</p>
        <div class="tablewrap" style="overflow-x:auto"><table class="rub"><thead><tr><th>観点</th><th>バンド6</th><th class="b7">バンド7（目標）</th><th>バンド8</th></tr></thead><tbody>${RUB.map(r => `<tr><td>${esc(r.name)}</td><td>${esc(r.b6)}</td><td class="b7">${esc(r.b7)}</td><td>${esc(r.b8)}</td></tr>`).join('')}</tbody></table></div>
        ${RUB.map(r => `<div class="ewchk"><b style="font-size:14px">${esc(r.name)}</b>${r.checks.map((c, i) => `<label><input type="checkbox" data-act="rubtick" data-k="${r.k}${i}" ${ui.rub.t[r.k + i] ? 'checked' : ''}> ${esc(c)}</label>`).join('')}</div>`).join('')}
        <button class="btn ghost" data-act="rubreset">チェックをリセット</button>` : ''}
    </section>`;
  }
  const baseWrite = vWrite;
  vWrite = function () { return baseWrite() + rubric(); };

  Object.assign(ACT, {
    ewlv: x => { ui.ew.lv = x.l; render(); },
    ewopen: x => { ui.ew.id = x.id; ui.ew.model = false; render(); scrollTo(0, 0); },
    ewback: () => { ui.ew.id = null; render(); },
    ewcheck: () => { S.ewrite[ui.ew.id] = $('#ewtext')?.value || ''; save(); render(); },
    ewmodel: () => { S.ewrite[ui.ew.id] = $('#ewtext')?.value || ''; ui.ew.model = !ui.ew.model; save(); render(); },
    ewtick: (x, el) => { const c = S.ewcheck[ui.ew.id] = S.ewcheck[ui.ew.id] || {}; c[x.i] = el.checked; saveSoon(); },
    ewdone: () => { const t = $('#ewtext')?.value || ''; S.ewrite[ui.ew.id] = t; if (t.trim().split(/\s+/).length < 10) { alert('もう少し書いてから押しましょう。'); return; } const first = !S.ewdone[ui.ew.id]; S.ewdone[ui.ew.id] = Date.now(); if (first) window.addXP?.(10, 'write'); window.CONFETTI?.(40); save(); ui.ew.id = null; render(); },
    ewfrom: x => { ui.ew.lv = x.l; ui.ew.id = null; ACT.tab({tab: 'ewrite'}); },
    rubtoggle: () => { ui.rub.open = !ui.rub.open; render(); },
    rubtick: (x, el) => { ui.rub.t[x.k] = el.checked; },
    rubreset: () => { ui.rub.t = {}; render(); },
  });
  document.addEventListener('input', e => { if (e.target.id === 'ewtext') { S.ewrite[ui.ew.id] = e.target.value; saveSoon(); const c = $('#ewcount'); if (c) c.textContent = words(e.target.value).length + '語'; } });
  (window.BACK_HANDLERS = window.BACK_HANDLERS || []).push(() => { if (S.tab !== 'ewrite' || !ui.ew.id) return false; ui.ew.id = null; return true; });
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, ewrite: vEw};
})();
