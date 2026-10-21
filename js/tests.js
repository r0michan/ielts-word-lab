/* デイリー・週間・マンスリーテスト。
   デイリー：その日の10問（答えはすぐ表示）／週間：その週に学んだ単語・構文から別形式で25問（最後にまとめて採点）／
   マンスリー：40問・30分の本番形式＋模擬試験（フル）で月ごとの実力を記録。 */
(() => {
  const css = `
  .tcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
  .tcard{background:var(--surface);border:1.5px solid var(--line);border-radius:22px;padding:16px 18px;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow)}
  .tcard h3{margin:0;font-size:18px}
  .tcard .meta{font-size:12.5px;color:var(--muted)}
  .tcard .st{font-weight:900;font-size:15px}
  .tcard.done{border-color:var(--good)}
  .thead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
  .tsec{font-size:12px;font-weight:900;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:2px 10px}
  .ttime{font-family:var(--f-word);font-weight:800;font-size:22px;font-variant-numeric:tabular-nums}
  .ttime.low{color:var(--bad)}
  .tdots{display:flex;gap:4px;flex-wrap:wrap}
  .tdots i{width:16px;height:16px;border-radius:5px;background:var(--sunk);display:block}
  .tdots i.on{background:var(--good)} .tdots i.mid{background:var(--warn)}
  .tres{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
  .tres div{background:var(--sunk);border-radius:14px;padding:10px 12px}
  .tres b{display:block;font-family:var(--f-word);font-size:24px}
  .tres span{font-size:12px;color:var(--muted)}
  .trev{display:flex;flex-direction:column;gap:8px}
  .trev > div{border-top:1px dashed var(--line);padding-top:8px;font-size:14px}
  .tbars{display:flex;align-items:flex-end;gap:8px;height:120px;padding-top:8px}
  .tbars div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;font-size:11px;color:var(--muted)}
  .tbars i{display:block;width:100%;max-width:38px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--accent),var(--c2))}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const D = window.DRILL;
  S.tests = S.tests || {daily: {}, weekly: {}, monthly: {}};

  // remember when each word was last studied, so the weekly test can draw on "this week's" words
  const prevGrade = grade;
  grade = function (id, ok) { P(id).lt = Date.now(); return prevGrade.apply(this, arguments); };

  /* ---------- seeded randomness: the same day/week/month gives the same test ---------- */
  const rngOf = seed => { let a = 0; for (const c of seed) a = (Math.imul(a, 31) + c.charCodeAt(0)) | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const sh = (r, a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const take = (r, a, n) => sh(r, a).slice(0, n);
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const monthKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  function weekKey(d = new Date()) {   // ISO week
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), day = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - day); const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
    return `${y}-W${pad(w)}`;
  }

  /* ---------- word pools ---------- */
  const single = w => !/\s/.test(w.w) && ['n', 'v', 'adj', 'adv'].includes(w.pos) && w.ja;
  const targetWords = (lv = S.levels) => WORDS.filter(w => lv.includes(w.lv) && single(w));
  function weekWords() {
    const since = Date.now() - 7 * 864e5, ws = WORDS.filter(w => single(w) && (S.prog[w.id]?.lt || 0) >= since);
    return ws.length >= 8 ? ws : [...ws, ...targetWords()];
  }
  function dueWords() {
    const now = Date.now(), ws = WORDS.filter(w => single(w) && S.prog[w.id]?.seen && S.prog[w.id].due <= now);
    return ws.length >= 3 ? ws : targetWords();
  }

  /* ---------- question generators ---------- */
  const mc = (sec, prompt, ans, others, extra = {}) => ({type: 'mc', sec, prompt, ans, opts: null, others, ...extra});
  function gMean(r, pool, w = pk(r, pool)) {
    const ds = take(r, targetWords().filter(x => x.pos === w.pos && x.ja !== w.ja), 12).map(x => x.ja).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    return mc('語彙', `<div class="small muted">この単語の意味は？</div><div class="vq" style="font-size:26px;font-weight:800">${esc(w.w)}</div>`, w.ja, ds, {say: w.w, explain: `${esc(w.w)}（${esc(w.pos)}）＝ ${esc(w.ja)}${w.ex ? `<div class="ex" style="font-size:15px">${esc(w.ex)}</div>` : ''}`, en: false});
  }
  function gRev(r, pool, w = pk(r, pool)) {
    const ds = take(r, WORDS.filter(x => single(x) && x.pos === w.pos && x.lv === w.lv && x.id !== w.id), 3).map(x => x.w);
    return mc('語彙', `<div class="small muted">日本語に合う英単語は？</div><div class="vq" style="font-size:22px;font-weight:800">${esc(w.ja)}</div>`, w.w, ds, {explain: `${esc(w.ja)} ＝ <b class="en">${esc(w.w)}</b>${w.ex ? `<div class="ex" style="font-size:15px">${esc(w.ex)}</div>` : ''}`, en: true});
  }
  const hi = (ex, w) => { const m = ex.match(new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*', 'i')); return m ? esc(ex.slice(0, m.index)) + `<b>${esc(m[0])}</b>` + esc(ex.slice(m.index + m[0].length)) : esc(ex); };
  function gPara(r) {
    const g = pk(r, D.PARA), ans = pk(r, g.syn), ds = take(r, [...new Set(D.PARA.filter(x => x.c !== g.c).flatMap(x => x.syn))], 3);
    return mc('言い換え', `<div class="small muted">太字の語と同じ意味で置き換えられるのは？</div><div class="vq">${hi(g.ex, g.w)}</div>`, ans, ds, {id: g.id, kind: 'para', explain: `${esc(g.w)}（${esc(g.ja)}）→ ${g.syn.map(esc).join(' / ')}`, en: true});
  }
  function gItem(r, list, sec, kind, label) {
    const it = pk(r, list), full = it.q.replace('___', it.a);
    return mc(sec, `<div class="small muted">${label}</div><div class="vq">${esc(it.q).replace('___', '<b>＿＿＿</b>')}</div>`, it.a, it.wrong, {id: it.id, kind, explain: `<span class="ex" style="font-size:15px">${esc(full)}</span><div class="small">${esc(it.tip)}</div>`, en: true});
  }
  const gColl = r => gItem(r, D.COLL, 'コロケーション', 'coll', '空欄に入る最も自然な語は？');
  const gForm = r => gItem(r, D.FORM, '品詞（TOEIC型）', 'form', '空欄に入る正しい形は？');
  function gSpell(r) { const it = pk(r, D.HARD); return mc('つづり', `<div class="small muted">「${esc(it.ja)}」の正しいつづりは？</div>`, it.w, it.wrong, {id: it.id, kind: 'spell', say: it.w, explain: `正しくは <b class="en">${esc(it.w)}</b>`, en: true}); }
  const STOPW = new Set('about above after again against because before being below between could doesn during every further having their there these those through under until where which while would should other people things think'.split(' '));
  function gCloze(r) {
    const s = pk(r, SENT.filter(x => x.en.split(' ').length >= 6 && x.en.split(' ').length <= 22));
    const toks = s.en.split(' '), cand = toks.map((t, i) => [t.replace(/[^A-Za-z'-]/g, ''), i]).filter(([t]) => t.length >= 5 && !STOPW.has(t.toLowerCase()));
    if (!cand.length) return gColl(r);
    const [ans, i] = pk(r, cand), pool = [...new Set(SENT.flatMap(x => x.en.split(' ').map(t => t.replace(/[^A-Za-z'-]/g, ''))).filter(t => t.length >= 5 && t.toLowerCase() !== ans.toLowerCase() && /^[a-z]/.test(t) === /^[a-z]/.test(ans)))];
    const shown = toks.map((t, k) => k === i ? t.replace(ans, '＿＿＿') : t).join(' ');
    return mc('構文', `<div class="small muted">空欄に入る語は？<span class="muted">（${esc(s.ja)}）</span></div><div class="vq">${esc(shown).replace('＿＿＿', '<b>＿＿＿</b>')}</div>`, ans, take(r, pool, 3), {explain: `<span class="ex" style="font-size:15px">${esc(s.en)}</span><div class="small">${esc(s.pat)}${s.tip ? ' — ' + esc(s.tip) : ''}</div>`, en: true});
  }
  function gListen(r) {
    const s = pk(r, SENT.filter(x => x.en.split(' ').length <= 16)), ds = take(r, SENT.filter(x => x.ja !== s.ja), 3).map(x => x.ja);
    return mc('リスニング', `<div class="small muted">音声を聞いて、意味として正しいものを選んでください</div><div class="row"><button class="btn primary" data-act="ttsay">${ICON.speak}再生</button><button class="btn" data-act="ttsay" data-slow="1">${ICON.slow}ゆっくり</button></div>`, s.ja, ds, {say: s.en, autoplay: true, explain: `<span class="ex" style="font-size:15px">${esc(s.en)}</span>`, en: false});
  }
  function gNum(r) {
    const it = pk(r, D.IELTS_GEN)();
    return {type: 'type', sec: 'リスニング', prompt: `<div class="small muted"><span class="lv lv-B">${esc(it.kind)}</span> ${esc(it.ask)}</div><div class="row"><button class="btn primary" data-act="ttsay">${ICON.speak}再生</button><button class="btn" data-act="ttsay" data-slow="1">${ICON.slow}ゆっくり</button></div>`,
      say: it.en, autoplay: true, ok: it.ok, ans: it.show, explain: `正解：<b>${esc(it.show)}</b> <div class="small">${esc(it.tip)}</div>`};
  }

  /* ---------- test definitions ---------- */
  const B2C1 = () => targetWords(['B2', 'C1']);
  const DEF = {
    daily: {title: 'デイリーテスト', key: dayKey, n: '10問・約3分', instant: true, xp: 5,
      desc: '復習中の単語を中心に、言い換え・コロケーション・つづり・リスニングを少しずつ。毎日の確認に。',
      make: r => [gMean(r, dueWords()), gMean(r, dueWords()), gMean(r, dueWords()), gRev(r, targetWords()), gPara(r), gPara(r), gColl(r), gForm(r), gSpell(r), gListen(r)]},
    weekly: {title: '週間テスト', key: weekKey, n: '25問・約12分', instant: false, xp: 15,
      desc: '今週学んだ単語・構文から、デイリーとは別の形式（日本語→英語・穴埋め・聞き取り）で出題。最後にまとめて採点します。',
      make: r => { const ww = weekWords(); return [...Array(5)].map(() => gRev(r, ww)).concat([...Array(3)].map(() => gMean(r, ww)), [...Array(5)].map(() => gCloze(r)), [gPara(r), gPara(r), gPara(r), gColl(r), gColl(r), gColl(r), gForm(r), gForm(r), gForm(r), gListen(r), gListen(r), gNum(r)]); }},
    monthly: {title: 'マンスリーテスト', key: monthKey, n: '40問・30分＋模擬試験', instant: false, xp: 30, limit: 30,
      desc: '本番さながらの時間制限つき。B2〜C1 の語彙・文法・言い換え・聞き取りを40問。終わったら模擬試験（フル）で4技能のバンドも測りましょう。',
      make: r => [...Array(8)].map(() => gForm(r)).concat([...Array(6)].map(() => gColl(r)), [...Array(6)].map(() => gPara(r)), [...Array(6)].map(() => gMean(r, B2C1())), [...Array(4)].map(() => gRev(r, B2C1())), [...Array(6)].map(() => gCloze(r)), [gListen(r), gListen(r), gNum(r), gNum(r)])},
  };
  function build(kind) {
    const d = DEF[kind], key = d.key(), r = rngOf(kind + ':' + key);
    const qs = d.make(r).map(q => q.type === 'mc' ? {...q, opts: sh(r, [q.ans, ...q.others.filter(o => o !== q.ans)].slice(0, 4))} : q);
    return {kind, key, qs, i: 0, picks: [], typed: [], start: Date.now(), end: d.limit ? Date.now() + d.limit * 60e3 : 0, done: null};
  }

  /* ---------- runner ---------- */
  ui.tt = null; let timer = null;
  const right = (t, k) => { const q = t.qs[k]; return q.type === 'mc' ? t.picks[k] != null && q.opts[t.picks[k]] === q.ans : !!(t.typed[k] && q.ok(t.typed[k])); };
  function start(kind) {
    ui.tt = build(kind); clearInterval(timer);
    if (ui.tt.end) timer = setInterval(tick, 500);
    render(); scrollTo(0, 0); autoplay();
  }
  function autoplay() { const q = ui.tt?.qs[ui.tt.i]; if (q?.autoplay) setTimeout(() => speak(q.say), 300); }
  function tick() {
    const t = ui.tt; if (!t || t.done) { clearInterval(timer); return; }
    const left = Math.max(0, t.end - Date.now()), el = document.getElementById('ttime');
    if (el) { el.textContent = `${Math.floor(left / 60000)}:${pad(Math.floor(left / 1000) % 60)}`; el.classList.toggle('low', left < 5 * 60e3); }
    if (!left) finish();
  }
  function finish() {
    const t = ui.tt; clearInterval(timer);
    const ok = t.qs.map((_, k) => right(t, k)), score = ok.filter(Boolean).length, secs = {};
    t.qs.forEach((q, k) => { const s = secs[q.sec] || (secs[q.sec] = [0, 0]); s[1]++; if (ok[k]) s[0]++; if (q.id && q.kind) D.tally(q.kind, q.id, ok[k]); });
    const rec = S.tests[t.kind], first = !rec[t.key];
    const entry = {s: score, n: t.qs.length, secs, mins: Math.round((Date.now() - t.start) / 60000), at: Date.now()};
    if (first || score > rec[t.key].s) rec[t.key] = {...entry, tries: (rec[t.key]?.tries || 0) + 1, first: rec[t.key]?.first ?? score};
    else rec[t.key].tries = (rec[t.key].tries || 1) + 1;
    t.done = {ok, score, secs, first};
    window.addXP?.(first ? DEF[t.kind].xp : 2, 'test'); save(); render(); scrollTo(0, 0);
  }
  const pct = (s, n) => Math.round(s / Math.max(1, n) * 100);
  const cefrFromPct = p => p >= 85 ? 'C1' : p >= 65 ? 'B2' : p >= 45 ? 'B1' : 'A2';
  function vRun() {
    const t = ui.tt, d = DEF[t.kind];
    if (t.done) return vResult();
    const q = t.qs[t.i], k = t.i, picked = t.picks[k], typed = t.typed[k], answered = q.type === 'mc' ? picked != null : typed != null;
    const reveal = d.instant && answered;
    const body = q.type === 'mc'
      ? `<div class="opts">${q.opts.map((o, j) => `<button class="opt ${q.en ? 'en' : ''} ${reveal ? (o === q.ans ? 'ok' : j === picked ? 'ng' : '') : j === picked ? 'ok' : ''}" data-act="ttpick" data-i="${j}" ${reveal ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`
      : `<form data-form="ttform"><input id="ttin" class="dinput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="答えを入力して Enter" value="${esc(typed || '')}" ${reveal ? 'readonly' : ''}></form>`;
    const isLast = k === t.qs.length - 1;
    return `<div class="sheet panel">
      <div class="thead"><div class="row"><b>${d.title}</b><span class="tsec">${esc(q.sec)}</span></div>
        <div class="row">${t.end ? `<span class="ttime" id="ttime">${Math.floor(Math.max(0, t.end - Date.now()) / 60000)}:${pad(Math.floor(Math.max(0, t.end - Date.now()) / 1000) % 60)}</span>` : ''}<span class="small muted">${k + 1} / ${t.qs.length}</span></div></div>
      <div class="meter"><i style="width:${(k + (answered ? 1 : 0)) / t.qs.length * 100}%"></i></div>
      ${q.prompt}${body}
      ${reveal ? `<div class="panel" style="gap:6px"><b class="${right(t, k) ? 'up' : 'dn'}">${right(t, k) ? '正解！' : '不正解'}</b><div>${q.explain || ''}</div></div>` : ''}
      <div class="row">
        ${k > 0 && !d.instant ? `<button class="btn" data-act="ttprev">戻る</button>` : ''}
        ${q.type === 'type' && !answered ? `<button class="btn primary" data-act="ttsubmit">答えを確定</button>` : ''}
        ${answered || !d.instant ? `<button class="btn ${answered ? 'primary' : ''}" data-act="${isLast ? 'ttfinish' : 'ttnext'}">${isLast ? '採点する' : answered ? '次へ' : 'とばす'}</button>` : ''}
        <button class="btn ghost" data-act="ttquit">中断する</button>
      </div>
      ${!d.instant ? '<p class="small muted">答えは最後にまとめて表示されます。迷ったら先に進み、「戻る」で見直せます。</p>' : ''}
    </div>`;
  }
  function vResult() {
    const t = ui.tt, d = DEF[t.kind], r = t.done, p = pct(r.score, t.qs.length), c = cefrFromPct(p), eq = window.EXAM_EQ?.find(x => x.cefr === c);
    const wrong = t.qs.map((q, k) => [q, k]).filter(([, k]) => !r.ok[k]);
    const mock = t.kind === 'monthly' ? (S.mocks || []).filter(m => m.kind === 'full' && m.date.startsWith(t.key)).pop() : null;
    return `<div class="sheet panel" style="gap:14px">
      <div class="thead"><h2 style="font-size:20px">${d.title}の結果 <span class="small muted">${esc(t.key)}</span></h2>${r.first ? '' : '<span class="small muted">（2回目以降：最高点のみ記録）</span>'}</div>
      <div class="tres"><div><b>${r.score}<small style="font-size:14px">/${t.qs.length}</small></b><span>正解数</span></div><div><b>${p}%</b><span>正答率</span></div>
        ${t.kind !== 'daily' ? `<div><b>${c}</b><span>CEFR の目安${eq ? `（IELTS ${eq.ielts}）` : ''}</span></div>` : ''}
        ${Object.entries(r.secs).map(([s, [a, n]]) => `<div><b>${a}/${n}</b><span>${esc(s)}</span></div>`).join('')}</div>
      ${t.kind === 'monthly' ? `<div class="panel" style="gap:8px;background:var(--sunk);border-radius:16px;padding:12px 14px"><b>Part B：模擬試験（フル）</b>
        ${mock ? `<span class="small">今月の模擬試験：リスニング ${mock.L ?? '—'} ・ リーディング ${mock.R ?? '—'}（${esc(mock.date)}）</span>` : '<span class="small">4技能のバンドを測るため、今月中に模擬試験（フル）も受けましょう。結果はここに表示されます。</span>'}
        <div><button class="btn primary" data-act="tab" data-tab="mock">模擬試験へ</button></div></div>` : ''}
      ${wrong.length ? `<b>間違えた問題（${wrong.length}）</b><div class="trev">${wrong.map(([q, k]) => `<div><span class="tsec">${esc(q.sec)}</span> ${q.prompt.replace(/<button[\s\S]*?<\/button>/g, '').replace(/<div class="row">\s*<\/div>/g, '')}
        <div class="small">あなた：${q.type === 'mc' ? (t.picks[k] != null ? esc(q.opts[t.picks[k]]) : '（未回答）') : esc(t.typed[k] || '（未回答）')} ／ 正解：<b>${esc(q.ans)}</b></div>${q.say ? `<div class="row">${sayBtn(q.say, '音声')}</div>` : ''}<div class="small">${q.explain || ''}</div></div>`).join('')}</div>` : '<p><b class="up">全問正解！</b></p>'}
      <div class="row"><button class="btn primary" data-act="ttclose">テスト一覧に戻る</button><button class="btn" data-act="ttstart" data-k="${t.kind}">もう一度</button></div>
    </div>`;
  }

  /* ---------- dashboard ---------- */
  function vTests() {
    if (ui.tt) return vRun();
    const T = S.tests, card = (kind, extra = '') => { const d = DEF[kind], rec = T[kind][d.key()];
      return `<div class="tcard ${rec ? 'done' : ''}"><h3>${d.title}</h3><span class="meta">${d.n}</span><p class="small">${d.desc}</p>
        <span class="st ${rec ? 'up' : ''}">${rec ? `${kind === 'daily' ? '今日' : kind === 'weekly' ? '今週' : '今月'}：${rec.s}/${rec.n}（${pct(rec.s, rec.n)}%）` : kind === 'daily' ? '今日はまだ' : kind === 'weekly' ? '今週はまだ' : '今月はまだ'}</span>
        ${extra}<div><button class="btn ${rec ? '' : 'primary'}" data-act="ttstart" data-k="${kind}">${rec ? 'もう一度' : 'はじめる'}</button></div></div>`; };
    const days = [...Array(14)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); const r = T.daily[dayKey(d)]; return `<i class="${r ? (pct(r.s, r.n) >= 70 ? 'on' : 'mid') : ''}" title="${dayKey(d)}${r ? ` ${r.s}/${r.n}` : ''}"></i>`; }).join('');
    const months = Object.entries(T.monthly).sort().slice(-6), weeks = Object.entries(T.weekly).sort().slice(-8);
    const bars = list => `<div class="tbars">${list.map(([k, r]) => `<div><span>${pct(r.s, r.n)}</span><i style="height:${Math.max(4, pct(r.s, r.n))}%"></i><span>${esc(k.replace(/^\d{4}-/, ''))}</span></div>`).join('')}</div>`;
    return `<div class="tcards">${card('daily', `<div class="tdots" aria-label="過去14日">${days}</div>`)}${card('weekly')}${card('monthly')}</div>
      ${weeks.length ? `<section class="sheet panel" style="gap:6px"><b>週間テストの推移（%）</b>${bars(weeks)}</section>` : ''}
      ${months.length ? `<section class="sheet panel" style="gap:6px"><b>マンスリーテストの推移（%）</b>${bars(months)}<span class="small muted">月ごとの正答率。模擬試験の結果は「模擬試験」タブの履歴で確認できます。</span></section>` : ''}
      <p class="note">同じ日・週・月は同じ問題が出ます（やり直すと最高点を記録）。週間テストは「単語カード」で今週学んだ単語から優先して出題します。</p>`;
  }

  Object.assign(ACT, {
    ttstart: x => start(x.k),
    ttpick: x => { const t = ui.tt; t.picks[t.i] = +x.i; if (!DEF[t.kind].instant && t.i < t.qs.length - 1) { t.i++; render(); autoplay(); } else render(); },
    ttsubmit: () => { const t = ui.tt, v = ($('#ttin')?.value || '').trim(); if (!v) return; t.typed[t.i] = v; if (!DEF[t.kind].instant && t.i < t.qs.length - 1) { t.i++; render(); autoplay(); } else render(); },
    ttnext: () => { const t = ui.tt; if (t.qs[t.i].type === 'type' && t.typed[t.i] == null) { const v = ($('#ttin')?.value || '').trim(); if (v) t.typed[t.i] = v; } t.i = Math.min(t.i + 1, t.qs.length - 1); render(); autoplay(); },
    ttprev: () => { ui.tt.i = Math.max(0, ui.tt.i - 1); render(); },
    ttfinish: () => { const t = ui.tt; if (t.qs[t.i].type === 'type' && t.typed[t.i] == null) { const v = ($('#ttin')?.value || '').trim(); if (v) t.typed[t.i] = v; } finish(); },
    ttquit: () => { if (confirm('テストを中断しますか？（記録されません）')) { clearInterval(timer); ui.tt = null; render(); } },
    ttclose: () => { ui.tt = null; render(); },
    ttsay: x => { const q = ui.tt?.qs[ui.tt.i]; if (q?.say) speak(q.say, !!x.slow); },
  });
  document.addEventListener('submit', e => { if (e.target.dataset?.form === 'ttform') { e.preventDefault(); ACT.ttsubmit(); } });

  /* ---------- home: today's daily test ---------- */
  const baseHome = window.EXTRA_VIEWS.home;
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, tests: vTests, home: () => {
    const h = baseHome(); if (ui.place) return h;
    const r = S.tests.daily[dayKey()];
    return `<section class="sheet panel" style="gap:8px;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div class="panel" style="gap:2px"><b>今日のデイリーテスト</b><span class="small muted">${r ? `済み：${r.s}/${r.n}（${pct(r.s, r.n)}%）` : '10問・約3分。毎日の小テストで定着度を確認'}</span></div>
      <button class="btn ${r ? '' : 'primary'}" data-act="tdaily">${r ? 'もう一度' : 'はじめる'}</button></section>` + h;
  }};
  ACT.tdaily = () => { S.mode = S.mode || 'learn'; ACT.tab({tab: 'tests'}); start('daily'); };
  render();
})();
