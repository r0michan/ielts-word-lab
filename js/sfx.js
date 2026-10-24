/* 効果音とお祝い演出（効果音は初期設定でオフ。設定でオンにした人だけ鳴る。紙吹雪などの見た目の演出はそのまま）。音はすべて Web Audio で合成（音声ファイル不要・オフラインで動く）。
   正解：コンボが続くほど音が上がるチャイム ／ 不正解：やわらかい低音 ／ 合格・満点・昇格：ファンファーレ＋紙吹雪。設定でオフにできる。 */
/* 効果音とお祝い演出。音はすべて Web Audio で合成（音声ファイル不要・オフラインで動く）。
   正解：明るい2音のチャイム（連続正解で少しずつ音が上がる） ／ 不正解：短くやわらかい「ブブッ」 ／ ページを進める：小さな「ポッ」
   合格・満点・昇格：ファンファーレ＋紙吹雪。上部バーのスピーカーボタンと「設定」でオン・オフ、音量を変えられる。 */
(() => {
  const set = S.settings;
  if (set.sfxOn == null) set.sfxOn = true;          // 初期設定でオン（上部バーからすぐ消せる）
  if (set.sfxPage == null) set.sfxPage = true;
  if (set.sfxVol == null) set.sfxVol = .7;
  let ctx = null, master = null, combo = 0;
  const ac = () => {
    if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); master = ctx.createGain(); master.connect(ctx.destination); }
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.value = set.sfxVol; return ctx;
  };
  // one tone: fast attack, exponential decay; optional pitch glide and soft overtone
  function tone(freq, t0, dur, vol, {type = 'sine', to = 0, over = .22, lp = 0} = {}) {
    const c = ac(); if (!c) return; const t = c.currentTime + t0;
    [[freq, vol, type], over ? [freq * 2, vol * over, 'sine'] : null].filter(Boolean).forEach(([f, v, ty], k) => {
      const o = c.createOscillator(), g = c.createGain(); let out = g;
      o.type = ty; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to * (k ? 2 : 1), t + dur * .6);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g);
      if (lp) { const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.value = lp; g.connect(f2); out = f2; }
      out.connect(master); o.start(t); o.stop(t + dur + .05);
    });
  }
  const on = () => set.sfxOn !== false;
  const buzz = ms => { try { navigator.vibrate?.(ms); } catch (e) {} };
  const STEP = [0, 2, 4, 5, 7, 9, 11, 12];            // 連続正解でドレミ…と上がる
  const semi = (f, n) => f * Math.pow(2, n / 12);

  window.SFX = {
    ok() {
      combo++;
      if (combo === 5 || combo === 10 || combo === 20) { this.toastCombo(combo); burst(combo >= 10 ? 60 : 30); }
      if (!on()) return;
      const b = semi(880, STEP[Math.min(combo - 1, STEP.length - 1)]);     // A5 から
      tone(b, 0, .16, .2, {type: 'triangle', over: .3});
      tone(semi(b, 7), .085, .42, .2, {type: 'triangle', over: .3});       // 5度上でキラッと
      if (combo >= 3) tone(semi(b, 12), .17, .5, .09);
      buzz(10);
    },
    ng() {
      combo = 0; if (!on()) return;
      tone(233, 0, .13, .17, {type: 'square', over: 0, lp: 900});
      tone(196, .15, .22, .17, {type: 'square', over: 0, lp: 800});
      buzz([18, 40, 18]);
    },
    pop() { if (!on()) return; tone(700, 0, .1, .12, {to: 980, over: .15}); },                 // 選んだ・送った
    page() { if (!on() || set.sfxPage === false) return; tone(520, 0, .09, .07, {to: 760, over: .1}); },   // ページを進める
    fanfare(big = true) {
      combo = 0;
      if (on()) { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * .11, .5, .15, {type: 'triangle'})); if (big) { tone(1318.5, .5, .8, .13, {type: 'triangle'}); tone(1568, .62, 1, .11); } buzz([30, 60, 30]); }
      burst(big ? 120 : 50);
    },
    reset() { combo = 0; },
    get combo() { return combo; },
    toastCombo(n) {
      const el = document.createElement('div'); el.className = 'combo-toast'; el.textContent = `${n} 問連続正解！`;
      document.body.appendChild(el); setTimeout(() => el.remove(), 1600);
    },
  };

  // page-turn sound: moving to another screen or the next question / step
  const NAV = /(next|prev|back)$|^(tab|shellgo|pgo|pnav|psec|cbpart|cbresult|cbclose|ttclose|quizmenu|crclose|lclose|lopen|imopen|stopen|ewopen|csunit|cswunit|cspart|csseg|cbstart|ttstart|quiz|qmiss|qretry|hmiss|hplace)$/;
  document.addEventListener('click', e => { const el = e.target.closest?.('[data-act]'); if (el && !el.disabled && NAV.test(el.dataset.act)) SFX.page(); }, true);

  /* ---------- confetti ---------- */
  const css = `
  .confetti{position:fixed;inset:0;pointer-events:none;z-index:200;overflow:hidden}
  .confetti i{position:absolute;top:-12px;width:9px;height:14px;border-radius:2px;opacity:.95;animation:cf linear forwards}
  @keyframes cf{to{transform:translate3d(var(--dx),110vh,0) rotate(var(--r));opacity:.9}}
  .combo-toast{position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:210;background:var(--accent);color:var(--on-accent);font-weight:900;font-size:20px;padding:12px 22px;border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.18);animation:ct 1.6s ease forwards}
  @keyframes ct{0%{opacity:0;transform:translate(-50%,10px) scale(.8)}15%{opacity:1;transform:translate(-50%,0) scale(1.06)}25%{transform:translate(-50%,0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}
  .opt.ok{animation:okpop .35s ease}
  @keyframes okpop{40%{transform:scale(1.03)}}
  .opt.ng{animation:ngshake .3s ease}
  @keyframes ngshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
  @media (prefers-reduced-motion:reduce){.confetti{display:none}.combo-toast,.opt.ok,.opt.ng{animation:none}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const COLORS = ['#D9506A', '#F08A3C', '#F2B860', '#6F7FE8', '#2E9E6E', '#FF9EAE'];
  function burst(n = 60) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div'); box.className = 'confetti';
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw'; p.style.background = COLORS[i % COLORS.length];
      p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      p.style.animationDuration = 1.6 + Math.random() * 1.4 + 's'; p.style.animationDelay = Math.random() * .3 + 's';
      box.appendChild(p);
    }
    document.body.appendChild(box); setTimeout(() => box.remove(), 3600);
  }
  window.CONFETTI = burst;

  /* ---------- hooks into the core practice types ---------- */
  const wrapOk = (fn, okOf) => function (...a) { const r = fn.apply(this, a); const ok = okOf(...a); if (ok === true) SFX.ok(); else if (ok === false) SFX.ng(); return r; };
  answerQuiz = wrapOk(answerQuiz, ok => !!ok);
  markSent = wrapOk(markSent, (id, ok) => !!ok);
  const prevGrade = grade; grade = function (id, ok) { if (ok) SFX.pop(); return prevGrade.apply(this, arguments); };

  // settings: sound controls at the top of 設定
  const prevSettings = vSettings;
  vSettings = function () {
    const v = set.sfxVol;
    return `<div class="sheet panel" style="gap:10px"><b>効果音</b>
      <label class="row" style="gap:8px"><input type="checkbox" data-act="sfxtoggle" ${on() ? 'checked' : ''}> 正解・不正解の効果音を鳴らす</label>
      <label class="row" style="gap:8px"><input type="checkbox" data-act="sfxpagetoggle" ${set.sfxPage !== false ? 'checked' : ''}> ページを進めるときの音を鳴らす</label>
      <div class="row"><span class="small muted">音量</span><div class="seg" role="group" aria-label="効果音の音量">${[[.35, '小'], [.7, '中'], [1, '大']].map(([x, t]) => `<button data-act="sfxvol" data-v="${x}" aria-pressed="${v === x}">${t}</button>`).join('')}</div></div>
      <div class="row"><button class="btn" data-act="sfxtest">正解の音</button><button class="btn" data-act="sfxtestng">不正解の音</button><button class="btn" data-act="sfxtestpage">ページの音</button></div>
      <p class="small muted">上部バーのスピーカーボタンでも、すぐにオン・オフできます。英語の音声（発音）は再生ボタンを押したときだけ流れます。</p></div>` + prevSettings();
  };
  ACT.sfxtoggle = (x, el) => { set.sfxOn = el.checked; save(); render(); };
  ACT.sfxpagetoggle = (x, el) => { set.sfxPage = el.checked; save(); };
  ACT.sfxvol = x => { set.sfxVol = +x.v; save(); render(); SFX.reset(); SFX.ok(); };
  ACT.sfxmute = () => { set.sfxOn = !on(); save(); render(); if (on()) SFX.pop(); };
  ACT.sfxtest = () => { SFX.reset(); [0, 300, 600].forEach(t => setTimeout(() => SFX.ok(), t)); };
  ACT.sfxtestng = () => SFX.ng();
  ACT.sfxtestpage = () => { SFX.page(); setTimeout(() => SFX.page(), 300); };
})();
