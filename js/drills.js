/* ディクテーション・語彙ドリル（言い換え／コロケーション／つづり）・スピーキング自己分析・
   弱点レーダーと週間レポート・学習リマインダー（.ics）。すべてブラウザ内で完結（APIなし）。 */
(() => {
  const css = `
  .dres{font-family:var(--f-word);font-size:18px;line-height:1.9;overflow-wrap:anywhere}
  .dres span{border-radius:5px;padding:0 2px}
  .dres .hit{background:var(--good-soft);color:var(--good)}
  .dres .miss{background:var(--bad-soft);color:var(--bad);text-decoration:underline wavy;text-underline-offset:4px}
  .dres .near{background:var(--warn-soft);color:var(--warn)}
  .dres .extra{color:var(--muted);text-decoration:line-through}
  .dinput{width:100%;font-family:var(--f-word);font-size:18px;padding:12px 14px}
  .dbig{font-family:var(--f-word);font-size:40px;font-weight:800;line-height:1.1}
  .vq{font-family:var(--f-word);font-size:20px;line-height:1.55}
  .vq b{background:var(--accent-soft);color:var(--accent);border-radius:6px;padding:0 4px}
  .vtable{width:100%;border-collapse:collapse;font-size:14px}
  .vtable td,.vtable th{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}
  .vtable td:first-child{font-family:var(--f-word);font-weight:700;white-space:nowrap}
  .vtable .en{font-family:var(--f-word)}
  .radarwrap{display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:16px;align-items:center}
  @media (max-width:640px){.radarwrap{grid-template-columns:minmax(0,1fr)}}
  .radar{width:100%;height:auto;display:block}
  .radar text{font:700 11px var(--f-ui);fill:var(--muted)}
  .wk{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px}
  .wk div{background:var(--sunk);border-radius:14px;padding:10px 12px}
  .wk b{display:block;font-family:var(--f-word);font-size:24px;font-variant-numeric:tabular-nums}
  .wk span{font-size:12px;color:var(--muted)}
  .up{color:var(--good)} .dn{color:var(--bad)}
  .anal{display:flex;flex-direction:column;gap:8px;border-top:1px dashed var(--line);padding-top:12px}
  .anal h4{margin:0;font-size:14px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const rows = raw => (raw || '').trim().split('\n').filter(l => l.trim()).map(l => l.split('|').map(x => x.trim()));
  const list = s => s.split(',').map(x => x.trim()).filter(Boolean);
  const PARA = rows(window.PARA_RAW).map(([c, w, syn, ja, ex]) => ({id: 'pa:' + w, c, w, syn: list(syn), ja, ex}));
  const COLL = rows(window.COLLOC_RAW).map(([q, a, wr, tip]) => ({id: 'co:' + q, q, a, wrong: list(wr), tip}));
  const UKUS = rows(window.SPELL_UKUS_RAW).map(([uk, us, ja, rule]) => ({id: 'uk:' + uk, uk, us, ja, rule}));
  const HARD = rows(window.SPELL_HARD_RAW).map(([w, wr, ja]) => ({id: 'hd:' + w, w, wrong: list(wr), ja}));
  const FORM = rows(window.FORM_RAW).map(([q, a, wr, tip]) => ({id: 'fm:' + q, q, a, wrong: list(wr), tip}));
  const TOPIC = rows(window.TOPIC_RAW).map(([k, name, tag, ph, task]) => ({k, name, tag, task, ph: ph.split(';').map(x => { const [en, ja] = x.split('='); return {id: 'tp:' + en, en: en.trim(), ja: (ja || '').trim()}; })}));
  window.PARA = PARA;

  S.drill = S.drill || {};
  S.drill.acc = S.drill.acc || {};
  S.drill.miss = S.drill.miss || {};
  S.drill.dict = S.drill.dict || {n: 0, sum: 0};
  const XP = (n, cat) => window.addXP?.(n, cat);
  function tally(kind, id, ok) {
    const a = S.drill.acc[kind] || (S.drill.acc[kind] = {c: 0, n: 0});
    a.n++; if (ok) a.c++;
    if (ok) delete S.drill.miss[id]; else S.drill.miss[id] = (S.drill.miss[id] || 0) + 1;
    saveSoon();
  }
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const seg = (items, cur, act) => `<div class="seg" role="group">${items.map(([k, v]) => `<button data-act="${act}" data-k="${k}" aria-pressed="${cur === k}">${v}</button>`).join('')}</div>`;

  /* =====================================================================
     ディクテーション
     ===================================================================== */
  ui.dc = {src: 'sent', item: null, checked: false, res: null, typed: '', hint: false};
  const DIG = ['oh', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const sayDigits = s => { const out = []; for (let i = 0; i < s.length; i++) { if (s[i] === ' ') { out.push('...'); continue; } if (s[i] === s[i + 1] && s[i] !== s[i + 2]) { out.push('double ' + DIG[+s[i]]); i++; } else out.push(DIG[+s[i]]); } return out.join(', ').replace(/, \.\.\., /g, '. '); };
  const spellOut = w => { const L = w.toUpperCase().replace(/[^A-Z0-9]/g, '').split(''), out = []; for (let i = 0; i < L.length; i++) { if (L[i] === L[i + 1]) { out.push('double ' + L[i]); i++; } else out.push(L[i]); } return out.join(', '); };
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ord = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
  const NAMES = ['Harrington', 'Whitaker', 'Fitzgerald', 'McAllister', 'Brookes', 'Kowalski', 'Thompson', 'Robertson', 'Callaghan', 'Pemberton', 'Ashworth', 'Gallagher', 'Henderson', 'Lockwood', 'Sheppard', 'Woolley', 'Abbott', 'Jennings', 'Matthews', 'Russell'];
  const STREETS = ['Mill Lane', 'Church Road', 'Station Street', 'Oakfield Avenue', 'Kingsley Close', 'Harbour View', 'Elm Grove', 'Marsh Way'];
  const NUM_WORDS = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' ');
  const TENS = {20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty'};
  const minWords = m => m <= 20 ? NUM_WORDS[m] : TENS[m - m % 10] + (m % 10 ? '-' + NUM_WORDS[m % 10] : '');
  const nz = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const IELTS_GEN = [
    () => { const d = '07' + Array.from({length: 9}, () => rnd(0, 9)).join(''), shown = d.slice(0, 5) + ' ' + d.slice(5);
      return {kind: '電話番号', ask: '電話番号を数字で書いてください', en: `My mobile number is ${sayDigits(shown)}.`, show: shown, ok: t => t.replace(/\D/g, '') === d, tip: '0 は “oh”、同じ数字が続くと “double” と読まれます。'}; },
    () => { const n = pick(NAMES); return {kind: '名前のつづり', ask: '名字（surname）を書いてください', en: `My surname is ${n}. That's ${spellOut(n)}.`, show: n, ok: t => nz(t) === nz(n), tip: '“double R” のように同じ文字が続くと double と言われます。1文字でも違うと不正解です。'}; },
    () => { const pc = String.fromCharCode(rnd(65, 90), rnd(65, 90)) + rnd(1, 9) + ' ' + rnd(1, 9) + String.fromCharCode(rnd(65, 90), rnd(65, 90));
      return {kind: '郵便番号', ask: '郵便番号（postcode）を書いてください', en: `The postcode is ${spellOut(pc.split(' ')[0])}... ${spellOut(pc.split(' ')[1])}.`, show: pc, ok: t => nz(t) === nz(pc), tip: 'イギリスの郵便番号は「文字＋数字」の組み合わせ。M と N、B と D と P は特に聞き分けに注意。'}; },
    () => { const p = rnd(2, 95), c = pick([0, 20, 25, 50, 75, 99]), v = p + c / 100, shown = '£' + v.toFixed(2);
      return {kind: '金額', ask: '金額を数字で書いてください（£ は省略可）', en: `The ticket costs ${c ? `${p} pounds ${c}` : `${p} pounds`}.`, show: shown, ok: t => Math.abs(parseFloat(t.replace(/[^0-9.]/g, '')) - v) < 0.001, tip: '“pounds fifty” は £x.50。fifteen（15）と fifty（50）は語尾の強さで聞き分けます。'}; },
    () => { const m = rnd(0, 11), d = rnd(1, 28), shown = `${d} ${MONTHS[m]}`;
      return {kind: '日付', ask: '日付を書いてください（例：23 March）', en: `The course starts on the ${ord(d)} of ${MONTHS[m]}.`, show: shown, ok: t => { const tl = t.toLowerCase(); return (tl.match(/\d+/) || [])[0] == d && tl.includes(MONTHS[m].slice(0, 3).toLowerCase()); }, tip: '“the 13th” と “the 30th” は特に紛らわしいので注意。月名のつづりミスも減点です。'}; },
    () => { const h = rnd(1, 11), m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
      const say = m === 0 ? `${NUM_WORDS[h]} o'clock` : m === 15 ? `quarter past ${NUM_WORDS[h]}` : m === 30 ? `half past ${NUM_WORDS[h]}` : m === 45 ? `quarter to ${NUM_WORDS[h + 1]}` : m < 30 ? `${minWords(m)} past ${NUM_WORDS[h]}` : `${minWords(60 - m)} to ${NUM_WORDS[h + 1]}`;
      const shown = `${h}:${String(m).padStart(2, '0')}`;
      return {kind: '時刻', ask: '時刻を数字で書いてください（例：7:45）', en: `The train leaves at ${say}.`, show: shown, ok: t => { const x = t.match(/(\d{1,2})\D+(\d{2})/) || t.match(/^(\d{1,2})$/); if (!x) return false; const hh = +x[1] % 12, mm = +(x[2] || 0); return hh === h % 12 && mm === m; }, tip: '“quarter to eight” は 7:45、“twenty to six” は 5:40。to は「〜分前」です。'}; },
    () => { const n = rnd(12, 98) * 10 + (Math.random() < .5 ? rnd(1, 9) : 0), s = pick(STREETS), shown = `${n} ${s}`;
      return {kind: '住所', ask: '番地と通りの名前を書いてください', en: `I live at ${n} ${s}.`, show: shown, ok: t => nz(t) === nz(shown), tip: '通りの名前（Road / Street / Lane / Avenue）までつづりを正確に。'}; },
    () => { const n = rnd(11, 990) * 100 + pick([0, 50]), shown = n.toLocaleString('en-GB');
      return {kind: '大きな数', ask: '数字で書いてください', en: `Last year the museum had ${shown} visitors.`, show: shown, ok: t => t.replace(/\D/g, '') === String(n), tip: 'thousand の位で区切って聞き取ります。イギリス英語では hundred の後に and が入ります。'}; },
  ];
  function dcNew() {
    const d = ui.dc; d.checked = false; d.res = null; d.typed = ''; d.hint = false;
    if (d.src === 'ielts') { d.item = pick(IELTS_GEN)(); return; }
    let pool;
    if (d.src === 'word') pool = filtered().filter(w => w.ex && w.ex.split(/\s+/).length >= 5 && w.ex.split(/\s+/).length <= 18).map(w => ({id: 'dw:' + w.id, en: w.ex, ja: `${w.w}（${w.ja}）`}));
    else pool = SENT.filter(x => x.en.split(/\s+/).length <= 20).map(x => ({id: 'ds:' + x.en, en: x.en, ja: x.ja}));
    if (d.missOnly) { const m = pool.filter(x => S.drill.miss[x.id]); if (m.length) pool = m; }
    d.item = pool.length ? pick(pool) : null;
  }
  const play = slow => { const it = ui.dc.item; if (it) speak(it.en, slow); };
  function dcCheck() {
    const d = ui.dc, it = d.item; if (!it || d.checked) return;
    d.typed = ($('#dcin')?.value || '').trim(); if (!d.typed) return;
    d.checked = true;
    if (d.src === 'ielts') { d.res = {ok: it.ok(d.typed), score: it.ok(d.typed) ? 100 : 0}; tally('dict', 'di:' + it.kind, d.res.ok); }
    else {
      const r = diffWords(it.en, d.typed);
      // near misses: model words not matched that look like a typed word that was not matched (spelling slips)
      const near = r.A.map((w, i) => { if (r.mHit[i] || !key(w)) return null; const j = r.B.findIndex((b, k) => !r.bHit[k] && sim(key(b), key(w)) >= .6); return j >= 0 ? r.B[j] : null; });
      d.res = {...r, near, ok: r.score === 100};
      tally('dict', it.id, r.score === 100);
    }
    S.drill.dict.n++; S.drill.dict.sum += d.res.score; XP(1, 'dict'); save(); render();
  }
  function vDict() {
    const d = ui.dc; if (!d.item) dcNew();
    const it = d.item, src = [['sent', '構文の例文'], ['word', '単語の例文'], ['ielts', '数字・つづり']];
    const avg = S.drill.dict.n ? Math.round(S.drill.dict.sum / S.drill.dict.n) : null;
    const missN = Object.keys(S.drill.miss).filter(k => k.startsWith('ds:') || k.startsWith('dw:')).length;
    let body;
    if (!it) body = `<div class="empty">この条件の例文がありません。</div>`;
    else {
      const res = d.res;
      let out = '';
      if (d.checked && d.src === 'ielts') out = `<div class="${res.ok ? 'up' : 'dn'}" style="font-weight:900;font-size:18px">${res.ok ? '正解！' : '不正解'}</div>
        <div class="row"><span class="small muted">正解</span><span class="dbig">${esc(it.show)}</span></div>${res.ok ? '' : `<div class="small">あなたの答え：<b>${esc(d.typed)}</b></div>`}
        <p class="note">${esc(it.tip)}</p><div class="small muted">読み上げた文：<span class="ex" style="font-size:15px">${esc(it.en)}</span></div>`;
      else if (d.checked) out = `<div class="row" style="justify-content:space-between"><b style="font-size:22px" class="${res.ok ? 'up' : ''}">${res.score}点</b><span class="small muted">緑＝正解　赤＝聞き逃し　オレンジ＝つづりミス　取り消し線＝余分</span></div>
        <div class="dres">${res.A.map((w, i) => res.mHit[i] || !key(w) ? `<span class="hit">${esc(w)}</span>` : res.near[i] ? `<span class="near" title="あなた: ${esc(res.near[i])}">${esc(w)}</span>` : `<span class="miss">${esc(w)}</span>`).join(' ')}</div>
        ${res.B.some((b, k) => !res.bHit[k] && !res.near.includes(b)) ? `<div class="dres small">${res.B.map((b, k) => res.bHit[k] || res.near.includes(b) ? '' : `<span class="extra">${esc(b)}</span>`).join(' ')}</div>` : ''}
        ${res.near.some(Boolean) ? `<div class="small">つづりミス：${res.near.map((n, i) => n ? `<b>${esc(n)}</b> → <b class="up">${esc(res.A[i])}</b>` : '').filter(Boolean).join('、')}</div>` : ''}
        <div class="small muted">意味：${esc(it.ja)}</div>`;
      body = `<div class="row">${d.src === 'ielts' ? `<span class="lv lv-B">${esc(it.kind)}</span><b>${esc(it.ask)}</b><span class="small muted">IELTS リスニング Part 1 型</span>` : `<b>聞こえた英文をそのまま書いてください</b>`}</div>
        <div class="row"><button class="btn primary big" data-act="dcplay">${ICON.speak}再生</button><button class="btn" data-act="dcplay" data-slow="1">${ICON.slow}ゆっくり</button>${d.src !== 'ielts' && !d.checked ? `<button class="btn ghost" data-act="dchint">${d.hint ? esc(it.ja) : 'ヒント（日本語）'}</button>` : ''}</div>
        <form data-form="dcform" class="row" style="flex-wrap:nowrap"><input id="dcin" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ここに入力して Enter" value="${esc(d.typed)}" ${d.checked ? 'readonly' : ''}></form>
        ${d.checked ? out + `<div class="row"><button class="btn primary" data-act="dcnext">次へ（Enter）</button><button class="btn" data-act="dcplay">${ICON.speak}もう一度聞く</button></div>` : `<div class="row"><button class="btn primary" data-act="dccheck">答え合わせ</button><button class="btn ghost" data-act="dcnext">スキップ</button></div>`}`;
    }
    return `<div class="row">${seg(src, d.src, 'dcsrc')}${d.src !== 'ielts' ? `<label class="small row" style="gap:4px"><input type="checkbox" data-act="dcmiss" ${d.missOnly ? 'checked' : ''}>間違えた文だけ（${missN}）</label>` : ''}</div>
      <div class="sheet panel">${body}</div>
      <p class="note">聞いた英文を書き取ると、聞き取れない音（弱く読まれる a / the / of、語尾の -s / -ed）と、つづりの弱点が同時にわかります。IELTS リスニングはつづりミスも不正解になるので、「数字・つづり」モードで Part 1 対策を。${avg != null ? `<br>これまで ${S.drill.dict.n} 問・平均 ${avg} 点。` : ''}${d.src === 'word' ? '<br>出題レベルは単語カードと同じレベル設定です。' : ''}</p>`;
  }
  Object.assign(ACT, {
    dcsrc: x => { ui.dc.src = x.k; ui.dc.item = null; render(); },
    dcmiss: (x, el) => { ui.dc.missOnly = el.checked; ui.dc.item = null; render(); },
    dcplay: x => play(!!x.slow),
    dchint: () => { ui.dc.hint = true; render(); },
    dccheck: () => dcCheck(),
    dcnext: () => { dcNew(); render(); $('#dcin')?.focus(); setTimeout(() => play(false), 250); },
  });

  window.DRILL = {PARA, COLL, UKUS, HARD, FORM, TOPIC, IELTS_GEN, tally};

  /* =====================================================================
     語彙ドリル：言い換え・コロケーション・つづり
     ===================================================================== */
  ui.vd = {mode: 'para', sub: 'hard', q: null, list: false, missOnly: false, s: {c: 0, n: 0}, topic: 'env', tquiz: false};
  const highlight = (ex, w) => { const m = ex.match(new RegExp('\\b' + reEsc(w) + '\\w*', 'i')); return m ? esc(ex.slice(0, m.index)) + `<b>${esc(m[0])}</b>` + esc(ex.slice(m.index + m[0].length)) : esc(ex); };
  function vdPool() {
    const v = ui.vd, base = v.mode === 'para' ? PARA : v.mode === 'coll' ? COLL : v.mode === 'form' ? FORM : v.mode === 'topic' ? (TOPIC.find(t => t.k === v.topic) || TOPIC[0]).ph : v.sub === 'ukus' ? UKUS : v.sub === 'hard' ? HARD : [...HARD, ...UKUS];
    if (!v.missOnly) return base;
    const m = base.filter(x => S.drill.miss[x.id] || S.drill.miss['ls:' + x.id]); return m.length ? m : base;
  }
  function vdNew() {
    const v = ui.vd, it = pick(vdPool());
    if (v.mode === 'para') {
      const ans = pick(it.syn), others = shuffle([...new Set(PARA.filter(g => g.c !== it.c).flatMap(g => g.syn))].filter(x => !it.syn.includes(x))).slice(0, 3);
      v.q = {it, kind: 'para', opts: shuffle([ans, ...others]), ans, pick: null};
    } else if (v.mode === 'coll') v.q = {it, kind: 'coll', opts: shuffle([it.a, ...it.wrong]), ans: it.a, pick: null};
    else if (v.mode === 'form') v.q = {it, kind: 'form', opts: shuffle([it.a, ...it.wrong]), ans: it.a, pick: null};
    else if (v.mode === 'topic') { const others = shuffle(TOPIC.flatMap(t => t.ph).filter(x => x.en !== it.en)).slice(0, 3).map(x => x.en); v.q = {it, kind: 'tphr', opts: shuffle([it.en, ...others]), ans: it.en, pick: null}; }
    else if (v.sub === 'listen') v.q = {it, kind: 'listen', pick: null, typed: ''};
    else if (it.uk) { const uk = Math.random() < .6; v.q = {it, kind: 'ukus', uk, opts: shuffle([it.uk, it.us]), ans: uk ? it.uk : it.us, pick: null}; }
    else v.q = {it, kind: 'hard', opts: shuffle([it.w, ...it.wrong]), ans: it.w, pick: null};
  }
  function vdAnswer(i) {
    const v = ui.vd, q = v.q; if (!q || q.pick !== null) return;
    q.pick = i; const ok = q.opts[i] === q.ans;
    v.s.n++; if (ok) v.s.c++;
    tally(q.kind === 'ukus' || q.kind === 'hard' ? 'spell' : q.kind === 'tphr' ? 'topic' : q.kind, q.it.id, ok); XP(1, 'vocab'); render();
  }
  function vdListenCheck() {
    const v = ui.vd, q = v.q; if (!q || q.pick !== null) return;
    q.typed = ($('#vdin')?.value || '').trim(); if (!q.typed) return;
    const t = q.typed.toLowerCase(), it = q.it;
    q.okWord = it.uk ? (t === it.uk.toLowerCase() ? 'uk' : t === it.us.toLowerCase() ? 'us' : '') : (t === it.w.toLowerCase() ? 'ok' : '');
    q.pick = 0; v.s.n++; if (q.okWord) v.s.c++;
    tally('spell', 'ls:' + it.id, !!q.okWord); XP(1, 'vocab'); render();
  }
  const sayWord = it => it.uk ? (S.settings.accent === 'en-US' ? it.us : it.uk) : it.w;
  function vdQuestion() {
    const v = ui.vd, q = v.q, it = q.it, done = q.pick !== null;
    const opts = () => `<div class="opts">${q.opts.map((o, i) => `<button class="opt en ${done ? (o === q.ans ? 'ok' : i === q.pick ? 'ng' : '') : ''}" data-act="vdans" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
    let head = '', after = '';
    if (q.kind === 'para') {
      head = `<div class="small muted">太字の語と<b>同じ意味で置き換えられる</b>のはどれ？</div><div class="vq">${highlight(it.ex, it.w)}</div>`;
      after = `<div class="small"><b class="en" style="font-family:var(--f-word)">${esc(it.w)}</b>（${esc(it.ja)}）の言い換え：<b style="font-family:var(--f-word)">${it.syn.map(esc).join(' / ')}</b></div>
        <div class="ex" style="font-size:16px">${esc(it.ex.replace(new RegExp('\\b' + reEsc(it.w) + '(\\w*)', 'i'), q.ans))}</div>
        <p class="note">言い換えた語の形（時制・三単現・複数形）は文に合わせて調整します。IELTS では「設問と本文で同じ語が使われない」のが基本。言い換えに気づけるかが読解・リスニングの鍵です。</p>`;
    } else if (q.kind === 'coll') {
      head = `<div class="small muted">空欄に入る、最も自然な語は？</div><div class="vq">${esc(it.q).replace('___', '<b>＿＿＿</b>')}</div>`;
      const full = it.q.replace('___', it.a);
      after = `<div class="row"><span class="ex" style="font-size:16px">${esc(full)}</span>${sayBtn(full, '聞く')}</div><p class="note">${esc(it.tip)}</p>`;
    } else if (q.kind === 'form') {
      head = `<div class="small muted"><span class="lv lv-B">TOEIC Part 5 型</span> 空欄に入る正しい形は？（空欄の前後から品詞を判断）</div><div class="vq">${esc(it.q).replace('___', '<b>＿＿＿</b>')}</div>`;
      const full = it.q.replace('___', it.a);
      after = `<div class="row"><span class="ex" style="font-size:16px">${esc(full)}</span>${sayBtn(full, '聞く')}</div><p class="note">${esc(it.tip)}</p>`;
    } else if (q.kind === 'tphr') {
      head = `<div class="small muted">「${esc(it.ja)}」を英語で言うと？</div>`;
      after = `<div class="row"><span class="dbig" style="font-size:24px">${esc(it.en)}</span>${sayBtn(it.en)}</div>`;
    } else if (q.kind === 'ukus') {
      head = `<div class="small muted">「${esc(it.ja)}」の<b>${q.uk ? 'イギリス式' : 'アメリカ式'}</b>つづりは？</div>`;
      after = `<div class="small">イギリス式 <b style="font-family:var(--f-word)">${esc(it.uk)}</b> ／ アメリカ式 <b style="font-family:var(--f-word)">${esc(it.us)}</b>（${esc(it.rule)}）</div><p class="note">IELTS はどちらのつづりでも正解ですが、1つの答案の中で混ぜないのが安全です。</p>`;
    } else if (q.kind === 'hard') {
      head = `<div class="small muted">「${esc(it.ja)}」の正しいつづりは？</div>`;
      after = `<div class="row"><span class="dbig" style="font-size:30px">${esc(it.w)}</span>${sayBtn(it.w)}</div><p class="note">よくある間違い：${it.wrong.map(esc).join('、')}</p>`;
    } else {
      head = `<div class="small muted">読み上げる単語を書いてください（${esc(it.ja)}）</div><div class="row"><button class="btn primary big" data-act="vdsay">${ICON.speak}再生</button><button class="btn" data-act="vdsay" data-slow="1">${ICON.slow}ゆっくり</button></div>
        <form data-form="vdform"><input id="vdin" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="つづりを入力して Enter" value="${esc(q.typed)}" ${done ? 'readonly' : ''}></form>`;
      if (done) after = `<div style="font-weight:900;font-size:18px" class="${q.okWord ? 'up' : 'dn'}">${q.okWord === 'us' ? '正解（アメリカ式）' : q.okWord ? '正解！' : '不正解'}</div>
        <div class="row"><span class="dbig" style="font-size:30px">${esc(it.uk || it.w)}</span>${it.uk ? `<span class="small muted">米：${esc(it.us)}</span>` : ''}</div>`;
      return `${head}${after}<div class="row">${done ? `<button class="btn primary" data-act="vdnext">次へ</button>` : `<button class="btn primary" data-act="vdcheck">答え合わせ</button>`}</div>`;
    }
    return `${head}${opts()}${done ? `<div class="panel" style="gap:8px">${after}</div><div><button class="btn primary" data-act="vdnext">次へ（Enter）</button></div>` : ''}`;
  }
  function vdList() {
    const v = ui.vd;
    if (v.mode === 'para') return `<table class="vtable"><tr><th>基本語</th><th>言い換え</th><th>意味</th></tr>${PARA.map(g => `<tr><td>${esc(g.w)}</td><td class="en">${g.syn.map(esc).join(', ')}</td><td>${esc(g.ja)}</td></tr>`).join('')}</table>`;
    if (v.mode === 'coll') return `<table class="vtable">${COLL.map(c => `<tr><td>${esc(c.a)}</td><td><span class="en">${esc(c.q.replace('___', c.a))}</span><div class="small muted">${esc(c.tip)}</div></td></tr>`).join('')}</table>`;
    if (v.mode === 'form') return `<table class="vtable">${FORM.map(c => `<tr><td>${esc(c.a)}</td><td><span class="en">${esc(c.q.replace('___', c.a))}</span><div class="small muted">${esc(c.tip)}</div></td></tr>`).join('')}</table>`;
    return `<table class="vtable"><tr><th>イギリス</th><th>アメリカ</th><th>意味・ルール</th></tr>${UKUS.map(x => `<tr><td>${esc(x.uk)}</td><td class="en">${esc(x.us)}</td><td>${esc(x.ja)} <span class="small muted">${esc(x.rule)}</span></td></tr>`).join('')}</table>
      <h3 style="font-size:15px;margin-top:14px">間違えやすいつづり</h3><table class="vtable">${HARD.map(x => `<tr><td>${esc(x.w)}</td><td class="small muted">× ${x.wrong.map(esc).join('、')}</td><td>${esc(x.ja)}</td></tr>`).join('')}</table>`;
  }
  function vTopic() {
    const v = ui.vd, T = TOPIC.find(t => t.k === v.topic) || TOPIC[0];
    const words = WORDS.filter(w => w.tags.includes(T.tag) && ['B1', 'B2', 'C1'].includes(w.lv)).sort((a, b) => LEVELS.indexOf(b.lv) - LEVELS.indexOf(a.lv)).slice(0, 30);
    const chips = `<div class="chips">${TOPIC.map(t => `<button class="chip" style="font-family:var(--f-ui)" data-act="vdtopic" data-k="${t.k}" aria-pressed="${t.k === T.k}">${esc(t.name)}</button>`).join('')}</div>`;
    if (v.tquiz) return `${chips}<div class="row" style="justify-content:space-between"><b>${esc(T.name)}：フレーズ確認テスト</b><button class="btn ghost" data-act="vdtquiz">覚える画面に戻る</button></div>${vdQuestion()}`;
    return `${chips}
      <div class="panel" style="gap:10px"><h3 style="font-size:17px">${esc(T.name)}でよく使うフレーズ</h3>
        <table class="vtable">${T.ph.map(x => `<tr><td><button class="btn ghost" style="padding:0;font-family:var(--f-word);font-size:15px;text-align:left" data-act="say" data-text="${esc(x.en)}">${esc(x.en)}</button></td><td>${esc(x.ja)}</td></tr>`).join('')}</table>
        <h3 style="font-size:15px">このトピックの重要語（B1〜C1・タップで発音）</h3>
        <div class="wordpills">${words.map(w => `<button class="wp" data-act="say" data-text="${esc(w.w)}" title="${esc(w.ja)}">${lvChip(w.lv)} ${esc(w.w)} <span class="muted small">${esc(w.ja)}</span></button>`).join('')}</div>
        <h3 style="font-size:15px">ライティング Task 2 の出題例</h3><div class="cue" style="font-size:16px">${esc(T.task)}</div>
        <div class="row"><button class="btn primary" data-act="vdtquiz">フレーズ確認テスト</button><button class="btn" data-act="vdtopicquiz" data-tag="${T.tag}">このトピックの単語でクイズ</button><button class="btn" data-act="tab" data-tab="write">ライティングで書いてみる</button></div>
      </div>`;
  }
  function vVocab() {
    const v = ui.vd; if (!v.q) vdNew();
    const modes = [['para', '言い換え'], ['coll', 'コロケーション'], ['form', '品詞（TOEIC型）'], ['spell', 'つづり'], ['topic', 'トピック別']];
    const subs = [['hard', '間違えやすい'], ['ukus', '英米差'], ['listen', '聞いて書く']];
    const acc = k => { const a = S.drill.acc[k]; return a && a.n ? `${Math.round(a.c / a.n * 100)}%（${a.n}問）` : '—'; };
    const intro = {para: 'IELTS は「本文と設問で同じ語を使わない」試験。important ↔ crucial のような言い換えに気づけるかが、読解・リスニングの正答率を左右します。ライティングでも同じ語の繰り返しを避けると語彙点が上がります。',
      coll: '単語同士の「相性」。make a decision / heavy rain のように、意味が合っていても組み合わせが不自然だと減点されます。日本語訳から考えると間違えやすいところ。',
      spell: 'IELTS はつづりミスが即不正解・減点。英米どちらのつづりも正解ですが、答案の中で混ぜないのが安全です。',
      form: 'TOEIC Part 5 でおなじみの「品詞問題」。空欄の前後（冠詞の後は名詞、名詞の前は形容詞、動詞を修飾するのは副詞）で答えを決めます。IELTS のライティングでも、品詞を正しく使い分けられるかが文法点に直結します。',
      topic: 'IELTS のライティング・スピーキングで繰り返し出るトピックごとに、使えるフレーズと重要語をまとめました。フレーズを覚えたら確認テスト、最後に出題例で1本書いてみましょう。'}[v.mode];
    return `<div class="row">${seg(modes, v.mode, 'vdmode')}${v.mode === 'spell' ? seg(subs, v.sub, 'vdsub') : ''}</div>
      <div class="sheet panel">
        <div class="row" style="justify-content:space-between">${v.mode === 'topic' ? `<b>IELTS 頻出トピック</b>` : `<span class="small muted">今回 ${v.s.c}/${v.s.n} 問正解 · 通算 ${acc(v.mode)}</span>`}
          ${v.mode === 'topic' ? '' : `<div class="row"><label class="small row" style="gap:4px"><input type="checkbox" data-act="vdmiss" ${v.missOnly ? 'checked' : ''}>間違えた問題だけ</label><button class="btn ghost" data-act="vdlist">${v.list ? '問題に戻る' : '一覧で覚える'}</button></div>`}</div>
        ${v.mode === 'topic' ? vTopic() : v.list ? vdList() : vdQuestion()}
      </div>
      <p class="note">${intro}</p>`;
  }
  Object.assign(ACT, {
    vdmode: x => { ui.vd.mode = x.k; ui.vd.q = null; ui.vd.s = {c: 0, n: 0}; render(); },
    vdsub: x => { ui.vd.sub = x.k; ui.vd.q = null; render(); },
    vdmiss: (x, el) => { ui.vd.missOnly = el.checked; ui.vd.q = null; render(); },
    vdlist: () => { ui.vd.list = !ui.vd.list; render(); },
    vdans: x => vdAnswer(+x.i),
    vdtopic: x => { ui.vd.topic = x.k; ui.vd.q = null; render(); },
    vdtquiz: () => { ui.vd.tquiz = !ui.vd.tquiz; ui.vd.q = null; vdNew(); render(); },
    vdtopicquiz: x => { S.topic = x.tag; ui.quiz = null; save(); ACT.tab({tab: 'quiz'}); },
    vdnext: () => { vdNew(); render(); if (ui.vd.q.kind === 'listen') { $('#vdin')?.focus(); setTimeout(() => speak(sayWord(ui.vd.q.it)), 250); } },
    vdcheck: () => vdListenCheck(),
    vdsay: x => speak(sayWord(ui.vd.q.it), !!x.slow),
  });

  document.addEventListener('submit', e => {
    const f = e.target.dataset?.form;
    if (f === 'dcform') { e.preventDefault(); ui.dc.checked ? ACT.dcnext() : dcCheck(); }
    if (f === 'vdform') { e.preventDefault(); ui.vd.q?.pick !== null ? ACT.vdnext() : vdListenCheck(); }
  });
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (S.tab === 'vocab' && !ui.vd.list && (ui.vd.mode !== 'topic' || ui.vd.tquiz) && ui.vd.q && ui.vd.q.kind !== 'listen' && !e.target.closest('input,textarea,select')) {
      if (e.key === 'Enter' && ui.vd.q.pick !== null) ACT.vdnext();
      else if (/^[1-4]$/.test(e.key) && ui.vd.q.pick === null && +e.key <= ui.vd.q.opts.length) vdAnswer(+e.key - 1);
    }
    if (S.tab === 'dict' && e.key === 'Enter' && ui.dc.checked && !e.target.closest('input,textarea,select')) ACT.dcnext();
  });

  /* =====================================================================
     スピーキング自己分析（文字起こしから）
     ===================================================================== */
  const FILLERS = [['um / uh / er', /\b(u+m+|u+h+|e+r+m*|a+h+)\b/g], ['like', /\blike\b/g], ['you know', /\byou know\b/g], ['I mean', /\bi mean\b/g], ['kind of / sort of', /\b(kind|sort) of\b/g], ['basically / actually', /\b(basically|actually)\b/g]];
  const LINKERS = ['however', 'moreover', 'furthermore', 'in addition', 'for example', 'for instance', 'on the other hand', 'although', 'whereas', 'therefore', 'as a result', 'because', 'since', 'so', 'but', 'firstly', 'secondly', 'finally', 'in my opinion', 'personally', 'i think', 'i believe', 'to be honest', 'what i mean is', 'apart from', 'as well as', 'especially', 'unless', 'while', 'even though'];
  const STOP = new Set('i me my we our you your he she it its they them their a an the and or but so to of in on at for with from by as is am are was were be been being have has had do does did not no yes this that these those there here then than very really just also can could will would should may might must about into over up down out if when what which who how why all some any more most much many one two get got go going like know think thing things lot well yeah because'.split(' '));
  const prevStats = speakStats;
  speakStats = function () {
    const base = prevStats(), s = ui.spk, text = s.final || '';
    const toks = key(text).split(' ').filter(Boolean); if (toks.length < 5) return base;
    const low = ' ' + key(text) + ' ';
    const fill = FILLERS.map(([n, re]) => [n, (low.match(re) || []).length]).filter(([, c]) => c);
    const fillN = fill.reduce((a, [, c]) => a + c, 0);
    const links = LINKERS.filter(l => low.includes(' ' + l + ' '));
    const content = toks.filter(t => !STOP.has(t) && t.length > 2);
    const variety = content.length ? Math.round(new Set(content).size / content.length * 100) : 0;
    const cnt = {}; content.forEach(t => cnt[t] = (cnt[t] || 0) + 1);
    const reps = Object.entries(cnt).filter(([, c]) => c >= 3).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const secs = Math.max(1, Math.round((s.t1 - s.t0) / 1000)), q = SPEAK_Q[s.qi];
    const syn = w => PARA.find(g => key(g.w) === w || forms(g.w).has(w));
    const tips = [];
    if (q.p === 2 && secs < 90) tips.push('Part 2 は2分近く話し続けるのが目標。カードの4項目を順番に、それぞれ具体例を1つずつ足すと長く話せます。');
    if (links.length < 3) tips.push('つなぎ言葉が少なめ。because / for example / on the other hand / to be honest などで理由や例を足しましょう（Fluency and Coherence の評価対象）。');
    if (fillN >= 4) tips.push('つなぎの “um / like” が多め。考える時間は “That\'s an interesting question…” や “Let me think…” でつなぐと自然です。');
    if (variety < 55) tips.push('同じ語の繰り返しが目立ちます。下の言い換え候補を使うと Lexical Resource の評価が上がります。');
    return base + `<div class="anal"><h4>話し方の分析</h4>
      <div class="stats"><div class="stat"><b>${fillN}</b><span>つなぎ言葉（um / like など）</span></div><div class="stat"><b>${links.length}</b><span>接続表現の種類</span></div><div class="stat"><b>${variety}%</b><span>語彙の多様さ（内容語の重複なし率）</span></div></div>
      ${fill.length ? `<div class="small">内訳：${fill.map(([n, c]) => `${esc(n)} ×${c}`).join('、')}</div>` : ''}
      ${links.length ? `<div class="wordpills">${links.map(l => `<span class="wp">${esc(l.replace(/i/g, 'I'))}</span>`).join('')}</div>` : ''}
      ${reps.length ? `<div class="small"><b>よく使った語：</b>${reps.map(([w, c]) => { const g = syn(w); return `<span style="font-family:var(--f-word)">${esc(w)} ×${c}</span>${g ? `（→ ${g.syn.slice(0, 3).map(esc).join(' / ')}）` : ''}`; }).join('、')}</div>` : ''}
      ${tips.map(t => `<p class="small">・${esc(t)}</p>`).join('')}
      <p class="small muted">※ 音声認識は “um / uh” を文字にしないことが多いため、つなぎ言葉の数は実際より少なく出ます。録音を聞き返して確認しましょう。</p></div>`;
  };

  /* =====================================================================
     ホーム：弱点レーダー・週間レポート・リマインダー
     ===================================================================== */
  const ratio = (c, n) => n ? c / n : null;
  function skills() {
    let qc = 0, qn = 0; Object.values(S.prog || {}).forEach(p => { qc += p.qc || 0; qn += (p.qc || 0) + (p.qw || 0); });
    let so = 0, sn = 0; Object.values(S.sprog || {}).forEach(p => { so += p.ok || 0; sn += (p.ok || 0) + (p.ng || 0); });
    const avgBest = (best, items, len) => { const xs = items.filter(x => best?.[x.id] != null).map(x => best[x.id] / Math.max(1, len(x))); return xs.length ? [xs.reduce((a, b) => a + b, 0) / xs.length, xs.length] : [null, 0]; };
    const [rd, rn] = avgBest(S.readBest, window.READING || [], x => window.READ_FLAT ? READ_FLAT(x).length : 1);
    const [ls, ln] = avgBest(S.lisBest, window.LISTENING || [], x => x.qs.length);
    const A = S.drill.acc, sp = A.spell || {c: 0, n: 0}, dc = S.drill.dict;
    const spN = sp.n + dc.n, spV = spN ? (sp.c + dc.sum / 100) / spN : null;
    return [
      ['単語', ratio(qc, qn), qn, 'quiz'], ['言い換え', ratio(A.para?.c, A.para?.n), A.para?.n || 0, 'vocab:para'], ['コロケ', ratio(A.coll?.c, A.coll?.n), A.coll?.n || 0, 'vocab:coll'],
      ['つづり', spV, spN, 'dict'], ['品詞', ratio(A.form?.c, A.form?.n), A.form?.n || 0, 'vocab:form'], ['構文', ratio(so, sn), sn, 'sent'], ['読解', rd, rn, 'read'], ['リスニング', ls, ln, 'listen'],
    ];
  }
  function radar(sk) {
    const N = sk.length, cx = 130, cy = 118, R = 84, pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    const ring = f => sk.map((_, i) => pt(i, R * f).map(v => v.toFixed(1)).join(',')).join(' ');
    const poly = sk.map(([, v], i) => pt(i, R * Math.max(.04, v ?? 0)).map(x => x.toFixed(1)).join(',')).join(' ');
    return `<svg class="radar" viewBox="-34 0 328 240" role="img" aria-label="スキル別の正答率">
      ${[.25, .5, .75, 1].map(f => `<polygon points="${ring(f)}" fill="none" stroke="var(--line)" stroke-width="1.2"/>`).join('')}
      ${sk.map((_, i) => { const [x, y] = pt(i, R); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)"/>`; }).join('')}
      <polygon points="${poly}" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round"/>
      ${sk.map(([, v], i) => { const [x, y] = pt(i, R * Math.max(.04, v ?? 0)); return v == null ? '' : `<circle cx="${x}" cy="${y}" r="3.5" fill="var(--accent)"/>`; }).join('')}
      ${sk.map(([n, v], i) => { const [x, y] = pt(i, R + 18); return `<text x="${x}" y="${y}" text-anchor="${x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle'}" dominant-baseline="middle">${n}${v == null ? '' : `<tspan font-weight="900" fill="var(--accent)"> ${Math.round(v * 100)}</tspan>`}</text>`; }).join('')}
    </svg>`;
  }
  const dk = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const CAT = {cards: '単語カード', quiz: 'クイズ', sent: '構文', read: '読解', listen: 'リスニング', write: 'ライティング', speak: 'スピーキング', idiom: 'イディオム', pron: '発音', dict: 'ディクテーション', vocab: '語彙ドリル', japan: '日本人の弱点'};
  function week(off) {
    const out = {xp: 0, days: 0, cat: {}}, d = new Date(); d.setDate(d.getDate() - off * 7);
    for (let i = 0; i < 7; i++) { const l = S.log?.[dk(d)]; if (l?.xp) { out.xp += l.xp; out.days++; Object.entries(l).forEach(([k, v]) => { if (k !== 'xp' && CAT[k]) out.cat[k] = (out.cat[k] || 0) + v; }); } d.setDate(d.getDate() - 1); }
    return out;
  }
  function report() {
    const sk = skills(), w = week(0), p = week(1);
    const tried = sk.filter(x => x[1] != null && x[2] >= 5), untried = sk.filter(x => x[2] < 5);
    const weak = [...tried].sort((a, b) => a[1] - b[1])[0];
    const diff = p.xp ? Math.round((w.xp - p.xp) / p.xp * 100) : null;
    const go = s => { const [tab, m] = s[3].split(':'); return `<button class="btn ${s === weak ? 'primary' : ''}" data-act="drgo" data-tab="${tab}" data-m="${m || ''}">${esc(s[0])}をやる</button>`; };
    const topCats = Object.entries(w.cat).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const missingCore = ['read', 'listen', 'write', 'speak'].filter(k => !w.cat[k]);
    return `<section class="sheet panel" style="gap:12px"><b>弱点レーダーと今週のレポート</b>
      <div class="radarwrap">${radar(sk)}
        <div class="panel" style="gap:10px">
          <div class="wk"><div><b>${w.xp}</b><span>今週のpt ${diff == null ? '' : `<em class="${diff >= 0 ? 'up' : 'dn'}" style="font-style:normal">${diff >= 0 ? '+' : ''}${diff}%</em>`}</span></div><div><b>${w.days}<small style="font-size:14px">/7日</small></b><span>学習した日</span></div><div><b>${p.xp}</b><span>先週のpt</span></div></div>
          ${topCats.length ? `<div class="wordpills">${topCats.map(([k, v]) => `<span class="wp" style="font-family:var(--f-ui);font-size:13px">${CAT[k]} ${v}</span>`).join('')}</div>` : '<span class="small muted">今週はまだ学習記録がありません。</span>'}
          ${weak ? `<p class="small">いちばん伸ばしどころ：<b>${esc(weak[0])}</b>（正答率 ${Math.round(weak[1] * 100)}%）</p>` : ''}
          ${missingCore.length ? `<p class="small muted">今週まだ手をつけていない試験パート：${missingCore.map(k => CAT[k]).join('・')}</p>` : ''}
          <div class="row">${weak ? go(weak) : ''}${untried.slice(0, 2).map(go).join('')}</div>
        </div>
      </div>
      <span class="small muted">数値は各練習の正答率（％）。つづり＝つづりドリル＋ディクテーション、コロケ＝コロケーション。5問以上解いた項目で比べます。</span>
    </section>
    <section class="sheet panel" style="gap:10px"><b>学習リマインダー</b>
      <p class="small">毎日決まった時間にスマホのカレンダーから通知が来るようにします。下の時刻を選んで「カレンダーに追加」を押し、ダウンロードしたファイルを開いてください（iPhone・Android・Google カレンダー対応）。</p>
      <div class="row"><label class="small">毎日 <input type="time" id="remtime" value="${esc(S.remind || '20:00')}"></label><button class="btn primary" data-act="remics">カレンダーに追加（.ics）</button></div>
    </section>`;
  }
  function icsFile() {
    const [h, m] = (S.remind || '20:00').split(':'), d = new Date(), p = n => String(n).padStart(2, '0');
    const start = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(h)}${p(m)}00`, now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const url = location.href.split('#')[0];
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//IELTS Word Lab//JA', 'BEGIN:VEVENT', `UID:ielts-word-lab-daily-${Date.now()}@local`, `DTSTAMP:${now}`, `DTSTART:${start}`, 'DURATION:PT15M', 'RRULE:FREQ=DAILY', 'SUMMARY:IELTS単語ラボ 今日の15分', `DESCRIPTION:単語カードの復習と今日のおすすめをやろう！\\n${url}`, `URL:${url}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:IELTS単語ラボの時間です', 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }
  Object.assign(ACT, {
    drgo: x => { if (x.tab === 'vocab' && x.m) { ui.vd.mode = x.m; ui.vd.q = null; } ACT.tab({tab: x.tab}); scrollTo(0, 0); },
    remics: () => {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([icsFile()], {type: 'text/calendar'})); a.download = 'ielts-word-lab-reminder.ics';
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    },
  });
  document.addEventListener('change', e => { if (e.target.id === 'remtime') { S.remind = e.target.value; save(); } });

  const baseHome = window.EXTRA_VIEWS.home;
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, dict: vDict, vocab: vVocab, home: () => {
    const h = baseHome(); if (ui.place) return h;
    const i = h.indexOf('今日のおすすめ'), j = i < 0 ? -1 : h.indexOf('</section>', i);
    return j < 0 ? h + report() : h.slice(0, j + 10) + report() + h.slice(j + 10);
  }};
  if (['home', 'dict', 'vocab'].includes(S.tab)) render();   // the first render ran before this script loaded
})();
