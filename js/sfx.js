/* 効果音とお祝い演出（効果音は初期設定でオフ。設定でオンにした人だけ鳴る。紙吹雪などの見た目の演出はそのまま）。音はすべて Web Audio で合成（音声ファイル不要・オフラインで動く）。
   正解：コンボが続くほど音が上がるチャイム ／ 不正解：やわらかい低音 ／ 合格・満点・昇格：ファンファーレ＋紙吹雪。設定でオフにできる。 */
(() => {
  S.settings.sfx = S.settings.sfxOptIn === true;   // sound only after the learner turns it on in 設定
  let ctx = null, combo = 0;
  const ac = () => { if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); } if (ctx.state === 'suspended') ctx.resume(); return ctx; };
  // one soft bell-like note: sine + a quiet octave, fast attack, exponential decay
  function note(freq, t0, dur = .35, vol = .18, type = 'sine') {
    const c = ac(); if (!c) return; const t = c.currentTime + t0;
    [[freq, vol, type], [freq * 2, vol * .25, 'sine']].forEach(([f, v, ty]) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = ty; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .05);
    });
  }
  const on = () => S.settings.sfxOptIn === true;
  const buzz = ms => { try { navigator.vibrate?.(ms); } catch (e) {} };
  const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];   // C major pentatonic-ish climb

  window.SFX = {
    ok() {
      combo++;
      if (combo === 5 || combo === 10 || combo === 20) { this.toastCombo(combo); burst(combo >= 10 ? 60 : 30); }
      if (!on()) return;
      const base = SCALE[Math.min(combo - 1, SCALE.length - 2)];
      note(base, 0, .22, .16); note(base * 1.5, .07, .32, .14);
      if (combo >= 3) note(base * 2, .14, .4, .1);
      buzz(12);
    },
    ng() { combo = 0; if (!on()) return; note(196, 0, .28, .14, 'triangle'); note(174.6, .1, .32, .1, 'triangle'); buzz([20, 40, 20]); },
    pop() { if (!on()) return; note(880, 0, .12, .1); },
    fanfare(big = true) {
      combo = 0; if (on()) { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, i * .11, .5, .15)); if (big) { note(1318.5, .5, .8, .13); note(1568, .62, 1, .11); } buzz([30, 60, 30]); }
      burst(big ? 120 : 50);
    },
    reset() { combo = 0; },
    get combo() { return combo; },
    toastCombo(n) {
      const el = document.createElement('div'); el.className = 'combo-toast'; el.textContent = `${n} 問連続正解！`;
      document.body.appendChild(el); setTimeout(() => el.remove(), 1600);
    },
  };

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

  // settings: a toggle at the top of 設定
  const prevSettings = vSettings;
  vSettings = function () {
    return `<div class="sheet panel" style="gap:8px"><b>効果音・演出</b><label class="row" style="gap:8px"><input type="checkbox" data-act="sfxtoggle" ${S.settings.sfxOptIn === true ? 'checked' : ''}> 正解・不正解の効果音を鳴らす（初期設定はオフ。紙吹雪などの演出は音なしで表示されます）</label><div><button class="btn" data-act="sfxtest">鳴らしてみる</button></div></div>` + prevSettings();
  };
  ACT.sfxtoggle = (x, el) => { S.settings.sfxOptIn = el.checked; save(); };
  ACT.sfxtest = () => { SFX.reset(); [0, 250, 500].forEach(t => setTimeout(() => SFX.ok(), t)); setTimeout(() => SFX.fanfare(false), 900); };
})();
