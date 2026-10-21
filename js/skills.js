/* リスニング (IELTS Sections 1–4 read by speech voices) and 日本人の弱点 (minimal pairs, katakana English, error correction). */
(() => {
  const css = `
  .lplayer{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .script{display:flex;flex-direction:column;gap:6px;font-family:var(--f-word);font-size:16px;line-height:1.6}
  .script .ln{display:grid;grid-template-columns:96px minmax(0,1fr);gap:8px;padding:3px 6px;border-radius:6px}
  .script .ln.on{background:var(--accent-soft)}
  .script .who{font-family:var(--f-ui);font-size:12.5px;color:var(--muted);padding-top:3px}
  .lq{display:flex;flex-direction:column;gap:12px;margin:0;padding:0}
  .lq li{list-style:none;display:flex;flex-direction:column;gap:6px;border-top:1px solid var(--line);padding-top:10px}
  .lq li:first-child{border-top:0;padding-top:0}
  .lq .qt{font-family:var(--f-word);font-size:16.5px}
  .lq input{font-family:var(--f-word);font-size:17px;max-width:280px}
  .lq .ok{color:var(--good);font-weight:700} .lq .ng{color:var(--bad);font-weight:700}
  .pairbtns{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .pairbtns .opt{text-align:center;font-family:var(--f-word);font-size:26px;padding:20px}
  .pairbtns .opt small{display:block;font-family:var(--f-ui);font-size:13px;color:var(--muted)}
  .weak{display:flex;flex-wrap:wrap;gap:8px}
  .weak span{font-size:13px;background:var(--sunk);border-radius:6px;padding:3px 9px;font-variant-numeric:tabular-nums}
  .kata{font-size:clamp(28px,6vw,40px);font-weight:700}
  .wrongs{font-family:var(--f-word);font-size:20px;color:var(--bad);text-decoration:line-through;text-decoration-thickness:1px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const XP = (n, c) => window.addXP?.(n, c);
  const nz = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

  /* ================= LISTENING ================= */
  const LS = window.LISTENING || [];
  S.lisBest = S.lisBest || {};
  ui.lis = {i: 0, ans: {}, checked: false, script: false, playing: false, line: -1, plays: 0, rate: 1};
  function voicesFor(lang) {
    const all = speechSynthesis.getVoices(), l = lang.toLowerCase();
    const exact = all.filter(v => v.lang.toLowerCase().replace('_', '-') === l);
    return exact.length ? exact : all.filter(v => /^en/i.test(v.lang));
  }
  function play(fromLine = 0) {
    if (!('speechSynthesis' in window)) return;
    const L = ui.lis, T = LS[L.i];
    speechSynthesis.cancel();
    const vs = voicesFor(T.accent), keys = Object.keys(T.speakers);
    L.playing = true; L.plays++; render();
    T.lines.slice(fromLine).forEach(([who, text], k) => {
      const u = new SpeechSynthesisUtterance(text), si = keys.indexOf(who);
      if (vs.length) u.voice = vs[si % vs.length];
      u.lang = T.accent; u.pitch = T.speakers[who].pitch || 1; u.rate = 0.95 * L.rate;
      const idx = fromLine + k;
      u.onstart = () => { L.line = idx; document.querySelectorAll('.script .ln').forEach((el, j) => el.classList.toggle('on', j === idx)); };
      if (idx === T.lines.length - 1) u.onend = () => { L.playing = false; L.line = -1; if (S.tab === 'listen' || S.tab === 'mock') render(); };
      speechSynthesis.speak(u);
    });
  }
  function stop() { speechSynthesis.cancel(); ui.lis.playing = false; ui.lis.line = -1; render(); }
  function vListen() {
    const L = ui.lis, T = LS[L.i];
    if (!T) return '<div class="sheet empty">リスニング問題がありません。</div>';
    const score = L.checked ? T.qs.filter((q, i) => isRight(q, L.ans[i])).length : null;
    return `<div class="row"><select id="lsel" aria-label="問題">${LS.map((x, i) => `<option value="${i}"${i === L.i ? ' selected' : ''}>Section ${x.section}：${esc(x.title)}${S.lisBest[x.id] != null ? ` — ベスト ${S.lisBest[x.id]}/${x.qs.length}` : ''}</option>`).join('')}</select>
      <span class="small muted">${T.lv} · ${T.accent === 'en-AU' ? 'オーストラリア英語' : T.accent === 'en-US' ? 'アメリカ英語' : 'イギリス英語'}</span></div>
    <section class="sheet panel">
      <p class="prompt" style="font-size:16px">${esc(T.intro)}</p>
      <div class="lplayer">
        ${L.playing ? `<button class="btn rec big" data-act="lstop">${ICON.stop}停止</button>` : `<button class="btn primary big" data-act="lplay">${ICON.speak}${L.plays ? 'もう一度聞く' : '音声を再生'}</button>`}
        <label class="small muted">速さ <select id="lrate">${[0.8, 0.9, 1, 1.1].map(r => `<option value="${r}"${L.rate === r ? ' selected' : ''}>${r}×</option>`).join('')}</select></label>
        <span class="small muted">再生 ${L.plays} 回${L.plays > 1 ? '（本番は1回だけです）' : ''}</span>
      </div>
      <p class="small muted">先に問題に目を通してから再生しましょう。音声はブラウザの読み上げ機能で作っているため、本番より機械的に聞こえます。</p>
    </section>
    <section class="sheet panel">
      <b>Questions 1–${T.qs.length}</b>
      <ol class="lq">${T.qs.map((q, i) => {
        const a = L.ans[i] ?? '', right = L.checked && isRight(q, a);
        const res = L.checked ? `<span class="${right ? 'ok' : 'ng'}">${right ? '✓ 正解' : `× 正解：${esc(q[0] === 'mc' ? q[3].split('|').find(o => o.startsWith(q[2])) : q[2].split('/')[0])}`}</span>` : '';
        if (q[0] === 'mc') return `<li><span class="qt">${i + 1}. ${esc(q[1])}</span><div class="opts">${q[3].split('|').map(o => { const k = o[0]; let c = 'opt'; if (L.checked && k === q[2]) c += ' ok'; else if (L.checked && k === a) c += ' ng';
          return `<button class="${c}" data-act="lans" data-q="${i}" data-v="${k}" aria-pressed="${a === k}" ${L.checked ? 'disabled' : ''} style="${a === k && !L.checked ? 'border-color:var(--accent);background:var(--accent-soft)' : ''}">${esc(o)}</button>`; }).join('')}</div>${res}</li>`;
        return `<li><span class="qt">${i + 1}. ${esc(q[1])}</span><input type="text" class="lgap" data-q="${i}" value="${esc(a)}" autocomplete="off" spellcheck="false" ${L.checked ? 'disabled' : ''} aria-label="問${i + 1}の答え">${res}</li>`;
      }).join('')}</ol>
      ${L.checked ? `<div class="row"><b style="font-size:18px">${score} / ${T.qs.length} 問正解</b><button class="btn" data-act="lretry">解き直す</button>${L.i + 1 < LS.length ? '<button class="btn primary" data-act="lnext">次のセクション</button>' : ''}</div>`
        : `<div class="row"><button class="btn primary" data-act="lcheck">答え合わせ</button><span class="small muted">スペルミスは不正解になります（本番と同じ）</span></div>`}
    </section>
    <section class="sheet panel">
      <div class="row" style="justify-content:space-between"><b>スクリプト</b><button class="btn" data-act="lscript">${L.script || L.checked ? '隠す' : '表示する'}</button></div>
      ${L.script || (L.checked && L.script !== false) ? `<div class="script">${T.lines.map(([who, text], j) => `<div class="ln${L.line === j ? ' on' : ''}"><span class="who">${esc(T.speakers[who].name)}<button class="iconbtn" data-act="lfrom" data-l="${j}" aria-label="ここから再生">${ICON.speak}</button></span><span class="ex">${esc(text)}</span></div>`).join('')}</div>`
        : '<p class="small muted">答え合わせの後に、スクリプトを見ながらもう一度聞くのがおすすめです（わからない単語はタップで意味が出ます）。</p>'}
    </section>`;
  }
  function isRight(q, a) {
    if (a == null || a === '') return false;
    if (q[0] === 'mc') return a === q[2];
    return q[2].split('/').some(x => nz(x) === nz(a));
  }
  Object.assign(ACT, {
    lplay: () => play(0),
    lstop: () => stop(),
    lfrom: d => play(+d.l),
    lans: d => { ui.lis.ans[+d.q] = d.v; render(); },
    lcheck: () => {
      const L = ui.lis, T = LS[L.i];
      document.querySelectorAll('.lgap').forEach(inp => { L.ans[+inp.dataset.q] = inp.value; });
      L.checked = true; L.script = true;
      const sc = T.qs.filter((q, i) => isRight(q, L.ans[i])).length;
      S.lisBest[T.id] = Math.max(S.lisBest[T.id] ?? 0, sc); XP(10, 'listen'); save(); render();
    },
    lretry: () => { Object.assign(ui.lis, {ans: {}, checked: false, script: false, plays: 0}); render(); },
    lnext: () => { speechSynthesis.cancel(); Object.assign(ui.lis, {i: ui.lis.i + 1, ans: {}, checked: false, script: false, plays: 0, playing: false}); render(); scrollTo({top: 0}); },
    lscript: () => { ui.lis.script = !(ui.lis.script || ui.lis.checked && ui.lis.script !== false); render(); },
  });
  document.addEventListener('input', e => { if (e.target.classList.contains('lgap')) ui.lis.ans[+e.target.dataset.q] = e.target.value; });

  /* ================= 日本人の弱点 ================= */
  const rows = s => (s || '').trim().split('\n').filter(l => l.trim()).map(l => l.split('|').map(x => x.trim()));
  const PAIRS = rows(window.PAIRS_RAW).map(([snd, a, b, ja, jb]) => ({snd, a, b, ja, jb}));
  const WASEI = rows(window.WASEI_RAW).map(([kata, wrong, right, note]) => ({kata, wrong, right, note}));
  const ERRS = rows(window.ERRORS_RAW).map(([wrong, right, why]) => ({wrong, right, alts: right.split(' / '), why}));
  S.jprog = S.jprog || {pairs: {}, wasei: {}, errs: {}};
  window.JP_DATA = {ERRS, WASEI, PAIRS};
  ui.jp = {mode: 'pairs', snd: 'all', q: null, n: 0, ok: 0};
  const SOUNDS = [...new Set(PAIRS.map(p => p.snd))];
  const SND_PH = {'L/R': ['l', 'r'], 'B/V': ['b', 'v'], 'S/TH': ['s', 'θ'], 'Z/TH': ['z', 'ð'], 'F/H': ['f', 'h'], 'SI/SHI': ['s', 'ʃ'], 'EAR/YEAR': ['ɪə', 'j'], 'I/EE': ['ɪ', 'iː'], 'A/U': ['æ', 'ʌ'], 'WAL/WOR': ['ɔː', 'ɜː'], 'OO/U': ['uː', 'ʊ'], 'OW/AW': ['əʊ', 'ɔː']};

  function newPair() {
    const pool = PAIRS.filter(p => ui.jp.snd === 'all' || p.snd === ui.jp.snd);
    const p = pick(pool), side = Math.random() < 0.5 ? 'a' : 'b';
    ui.jp.q = {kind: 'pair', p, side, pick: null, said: null, err: '', busy: false};
    speak(p[side]);
  }
  function newWasei() {
    const w = pick(WASEI), others = shuffle(WASEI.filter(x => x !== w)).slice(0, 2).map(x => x.right);
    ui.jp.q = {kind: 'wasei', w, opts: shuffle([w.right, w.wrong, ...others]), pick: null};
  }
  function newErr() {
    const sc = e => (S.jprog.errs[e.wrong]?.ok || 0) * 2 - (S.jprog.errs[e.wrong]?.ng || 0) + Math.random() * 2;
    const e = [...ERRS].sort((a, b) => sc(a) - sc(b))[0];
    ui.jp.q = {kind: 'err', e, typed: e.wrong, result: null, hint: false};
  }
  const NEW = {pairs: newPair, wasei: newWasei, errors: newErr};
  function bump(group, key, ok) { const g = S.jprog[group]; const p = g[key] || (g[key] = {ok: 0, ng: 0}); ok ? p.ok++ : p.ng++; save(); }

  function vJapan() {
    const J = ui.jp;
    const modes = [['pairs', '聞き分け・発音（L/R など）'], ['wasei', '和製英語・カタカナ英語'], ['errors', '日本人がよく間違える文']];
    const head = `<div class="row"><div class="seg" role="group" aria-label="練習の種類">${modes.map(([k, v]) => `<button data-act="jmode" data-m="${k}" aria-pressed="${J.mode === k}">${v}</button>`).join('')}</div>${J.n ? `<span class="count">このセット ${J.ok} / ${J.n}</span>` : ''}</div>`;
    if (!J.q || ({pairs: 'pair', wasei: 'wasei', errors: 'err'})[J.mode] !== J.q.kind) { NEW[J.mode](); }
    return head + ({pairs: vPairs, wasei: vWasei, errors: vErrs})[J.mode]();
  }
  function vPairs() {
    const J = ui.jp, q = J.q, p = q.p, done = q.pick !== null;
    const stats = SOUNDS.map(s => { const r = S.jprog.pairs[s]; return r ? [s, Math.round(r.ok / (r.ok + r.ng) * 100), r.ok + r.ng] : null; }).filter(Boolean).sort((a, b) => a[1] - b[1]);
    return `<div class="row"><select id="jsnd" aria-label="音"><option value="all">すべての音</option>${SOUNDS.map(s => `<option${J.snd === s ? ' selected' : ''}>${s}</option>`).join('')}</select>
      <span class="small muted">日本語にない音の区別です。聞こえた方を選んでください。</span></div>
    <section class="sheet panel">
      <div class="row"><span class="tag">${esc(p.snd)}</span><button class="btn primary" data-act="jplay">${ICON.speak}もう一度聞く</button><button class="btn" data-act="jslow">${ICON.slow}ゆっくり</button></div>
      <div class="pairbtns">${['a', 'b'].map(s => { let c = 'opt'; if (done && s === q.side) c += ' ok'; else if (done && s === q.pick) c += ' ng';
        return `<button class="${c}" data-act="jpick" data-s="${s}" ${done ? 'disabled' : ''}>${esc(p[s])}<small>${esc(s === 'a' ? p.ja : p.jb)}</small></button>`; }).join('')}</div>
      ${done ? `<p>${q.pick === q.side ? '<b style="color:var(--good)">正解です。</b>' : `<b style="color:var(--bad)">聞こえたのは「${esc(p[q.side])}」でした。</b>`} 2つを聞き比べましょう。</p>
        <div class="row"><button class="btn" data-act="say" data-text="${esc(p.a)}">${ICON.speak}${esc(p.a)}</button><button class="btn" data-act="say" data-text="${esc(p.b)}">${ICON.speak}${esc(p.b)}</button>
        ${SR ? `<button class="btn ${q.busy ? 'rec pulse' : ''}" data-act="jsay">${q.busy ? ICON.stop + '聞き取り中…' : ICON.mic + `「${esc(p[q.side])}」と言ってみる`}</button>` : ''}
        <button class="btn primary" data-act="jnext">次へ <kbd>Enter</kbd></button></div>
        ${q.err ? `<p class="err">${esc(q.err)}</p>` : ''}
        ${q.said ? `<p>${q.said.ok ? `<b style="color:var(--good)">「${esc(q.said.t)}」と聞き取られました。伝わっています。</b>` : `<b style="color:var(--bad)">「${esc(q.said.t)}」と聞き取られました。</b> 下の口の形を確認してもう一度。`}</p>` : ''}
        ${window.PHONEME_CARD && (q.pick !== q.side || (q.said && !q.said.ok)) ? `<div class="fbph"><b>2つの音の口の形の違い</b><div class="phgrid">${(SND_PH[p.snd] || []).map(s => PHONEME_CARD(s)).join('')}</div></div>` : ''}` : ''}
    </section>
    ${stats.length ? `<section class="panel" style="gap:6px"><span class="small muted">音ごとの正解率（低い順）</span><div class="weak">${stats.map(([s, pc, n]) => `<span>${s} ${pc}%（${n}回）</span>`).join('')}</div></section>` : ''}
    <p class="note">L は舌先を上の歯の裏につける／R は舌をどこにもつけず丸める。TH は舌先を上下の歯で軽くはさむ。V は上の歯を下唇に当てる。</p>`;
  }
  function vWasei() {
    const q = ui.jp.q, done = q.pick !== null;
    return `<section class="sheet panel">
      <p class="small muted">このカタカナ語は英語で何と言う？（そのまま英語にすると通じない言葉です）</p>
      <p class="kata">${esc(q.w.kata)}</p>
      <div class="opts">${q.opts.map((o, i) => { let c = 'opt en'; if (done && o === q.w.right) c += ' ok'; else if (done && i === q.pick) c += ' ng';
        return `<button class="${c}" data-act="jwpick" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>
      ${done ? `<p>${q.opts[q.pick] === q.w.right ? '<b style="color:var(--good)">正解です。</b>' : `<b style="color:var(--bad)">正解は ${esc(q.w.right)}</b>`}${q.w.note ? ` ${esc(q.w.note)}` : ''}</p>
        <div class="row"><button class="btn" data-act="say" data-text="${esc(q.w.right.split(' / ')[0].replace(/\s*\(.*?\)/g, ''))}">${ICON.speak}発音</button><button class="btn primary" data-act="jnext">次へ <kbd>Enter</kbd></button></div>` : ''}
    </section>`;
  }
  function vErrs() {
    const q = ui.jp.q, r = q.result;
    return `<section class="sheet panel">
      <p class="small muted">この文には日本人がよくする間違いがあります。正しい文に直してください。</p>
      <p class="wrongs">${esc(q.e.wrong)}</p>
      ${q.hint || r ? `<p class="small">ヒント：${esc(q.e.why)}</p>` : `<div><button class="btn ghost" data-act="jhint">ヒントを見る</button></div>`}
      <textarea id="jfix" rows="2" spellcheck="false" style="font-size:18px;min-height:70px" ${r ? 'disabled' : ''}>${esc(q.typed)}</textarea>
      ${r ? `<div class="panel" style="gap:8px">
          ${r.exact ? '<b style="color:var(--good)">正解です。</b>' : `<span class="small muted">正解の例（緑 = あなたの文にもある語 / 赤 = 抜けている語）</span><div class="tok">${r.diff.A.map((w, i) => `<span class="${r.diff.mHit[i] ? 'h' : 'm'}">${esc(w)}</span>`).join(' ')}</div>`}
          ${q.e.alts.length > 1 ? `<span class="small">他の正解：${q.e.alts.slice(1).map(esc).join(' / ')}</span>` : ''}
          <div class="row"><button class="btn" data-act="say" data-text="${esc(q.e.alts[0])}">${ICON.speak}正しい文を聞く</button>
          ${r.exact ? '<button class="btn primary" data-act="jnext">次へ</button>' : '<button class="btn bad" data-act="jegrade" data-ok="0">間違えた</button><button class="btn good" data-act="jegrade" data-ok="1">意味は合っていた</button>'}</div></div>`
        : `<div class="row"><button class="btn primary" data-act="jecheck">答え合わせ</button><button class="btn ghost" data-act="jnext">スキップ</button></div>`}
    </section>
    <p class="note">${ERRS.length}文収録。間違えた文ほど繰り返し出題されます。ライティングの添削チェックでも同じ種類の誤りを検出します。</p>`;
  }
  Object.assign(ACT, {
    jmode: d => { ui.jp.mode = d.m; ui.jp.q = null; ui.jp.n = ui.jp.ok = 0; render(); },
    jplay: () => speak(ui.jp.q.p[ui.jp.q.side]),
    jslow: () => speak(ui.jp.q.p[ui.jp.q.side], true),
    jpick: d => { const q = ui.jp.q; if (q.pick !== null) return; q.pick = d.s; const ok = d.s === q.side; ui.jp.n++; if (ok) ui.jp.ok++; bump('pairs', q.p.snd, ok); XP(1, 'japan'); render(); },
    jsay: () => {
      const q = ui.jp.q, target = q.p[q.side], other = q.p[q.side === 'a' ? 'b' : 'a'];
      listenOnce(q, alts => {
        const words = alts.flatMap(a => key(a.t).split(' '));
        const hitT = words.includes(key(target)), hitO = words.includes(key(other));
        q.said = {t: alts[0].t, ok: hitT && (!hitO || key(alts[0].t).includes(key(target)))};
        XP(1, 'japan');
      }, 'japan');
    },
    jwpick: d => { const q = ui.jp.q; if (q.pick !== null) return; q.pick = +d.i; const ok = q.opts[q.pick] === q.w.right; ui.jp.n++; if (ok) ui.jp.ok++; bump('wasei', q.w.kata, ok); XP(1, 'japan'); render(); },
    jhint: () => { ui.jp.q.hint = true; render(); },
    jecheck: () => {
      const q = ui.jp.q; q.typed = $('#jfix').value;
      const exact = q.e.alts.some(a => key(a) === key(q.typed));
      q.result = {exact, diff: diffWords(q.e.alts[0], q.typed)};
      if (exact) { ui.jp.n++; ui.jp.ok++; bump('errs', q.e.wrong, true); XP(2, 'japan'); }
      render();
    },
    jegrade: d => { const ok = d.ok === '1'; ui.jp.n++; if (ok) ui.jp.ok++; bump('errs', ui.jp.q.e.wrong, ok); XP(2, 'japan'); NEW.errors(); render(); },
    jnext: () => { NEW[ui.jp.mode](); render(); setTimeout(() => $('#jfix')?.focus(), 0); },
  });

  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'lsel') { speechSynthesis.cancel(); Object.assign(ui.lis, {i: +t.value, ans: {}, checked: false, script: false, plays: 0, playing: false}); render(); }
    if (t.id === 'lrate') { ui.lis.rate = +t.value; }
    if (t.id === 'jsnd') { ui.jp.snd = t.value; NEW.pairs(); render(); }
  });
  document.addEventListener('keydown', e => {
    if (S.tab !== 'japan' || e.target.closest('input,textarea,select') || e.key !== 'Enter') return;
    const q = ui.jp.q; if (!q) return;
    if ((q.kind === 'pair' || q.kind === 'wasei') && q.pick !== null) ACT.jnext();
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), listen: vListen, japan: vJapan};
  render();
})();
