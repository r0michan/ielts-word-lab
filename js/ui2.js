/* ホーム画面（作り直し）。
   1枚目のカードで「今の自分」（レベル・今日のXP・連続日数）と「次にやること」をひと目で示し、
   その下に「今日やること」のチェックリスト、積み上げの数字、コース、デイリークエストを並べる。 */
(() => {
  const pad = n => String(n).padStart(2, '0');
  const dk = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';
  const baseHome = window.EXTRA_VIEWS.home;

  function hero() {
    const d = new Date(), h = d.getHours();
    const hi = h < 5 ? 'おつかれさまです' : h < 11 ? 'おはようございます' : h < 18 ? 'こんにちは' : 'こんばんは';
    const xp = S.log?.[dk()]?.xp || 0, goal = S.goal || 50, sk = PATH.streak();
    const L = S.lv?.cur, jp = L && window.LEVEL_JP?.[L];
    let cta;
    if (!S.lv) cta = `<button class="hh-cta" data-act="hplace"><span class="pl">${PLAY}</span><span class="tx"><small>まずはここから（約10分）</small><b>判定テストで今のレベルを知る</b><span>結果に合わせて、毎日のレッスンとテストが決まります</span></span></button>`;
    else {
      const n = PATH.next(), f = n && PATH.info(n);
      cta = n ? `<button class="hh-cta" data-act="pgo" data-k="${esc(n.key)}"><span class="pl">${PLAY}</span><span class="tx"><small>次のレッスン ・ ${n.L} ${PATH.TYPE[n.t]}</small><b>${esc(f.title)}</b><span>${esc(f.sub)}</span></span></button>`
        : `<button class="hh-cta" data-act="tab" data-tab="tests"><span class="pl">${PLAY}</span><span class="tx"><small>全レベル修了</small><b>テストで力を確かめる</b><span>模試・マンスリーテストへ</span></span></button>`;
    }
    return `<section class="hhero">
      <div class="hh-top"><span>${d.getMonth() + 1}月${d.getDate()}日（${'日月火水木金土'[d.getDay()]}）</span><span class="sk">🔥 ${sk}日連続</span></div>
      <div class="hh-main"><div><h2>${hi}</h2>
          <div class="hh-lv">${L ? `<b>${L}</b><span>現在のレベル<br>${jp ? `英検${esc(jp.eiken)}・TOEIC ${esc(jp.toeic)}` : ''}</span>` : '<span>レベル未判定</span>'}</div></div>
        <div class="hh-ring" style="--p:${Math.min(100, xp / goal * 100)}" title="今日の目標"><div><b>${xp}</b><small>/ ${goal} XP</small></div></div></div>
      ${cta}</section>`;
  }

  function todo() {
    const t = S.log?.[dk()] || {}, q = PATH.quest(), miss = Object.keys(S.miss || {}).length, daily = S.tests?.daily?.[dk()];
    const items = [
      {ok: (q.prog.lesson || 0) >= 1, t: 'レッスンを1つ', s: '文法・単語・会話を順番に（約10分）', go: 'はじめる', act: S.lv && PATH.next() ? `data-act="pgo" data-k="${esc(PATH.next().key)}"` : 'data-act="hplace"'},
      {ok: miss === 0 ? (t.quiz || 0) >= 10 : false, t: miss ? `苦手な単語を復習（${miss}語）` : '単語クイズを10問', s: miss ? '2回続けて正解すると苦手リストから卒業' : `今日 ${t.quiz || 0} / 10 問 ・ 間違えた単語は苦手リストへ`, go: miss ? '復習する' : '解く', act: miss ? 'data-act="hmiss"' : 'data-act="tab" data-tab="quiz"'},
      {ok: !!daily, t: 'デイリーテスト', s: daily ? `今日の結果 ${daily.p ?? Math.round(daily.s / daily.n * 100)}点` : '10問・約3分で今日の定着を確認', go: daily ? '結果' : '受ける', act: 'data-act="tab" data-tab="tests"'},
    ];
    const n = items.filter(i => i.ok).length;
    return `<section class="sect"><div class="sect-h"><h3>今日やること</h3><span>${n} / ${items.length} 完了</span></div>
      <div class="todo2">${items.map(i => `<button class="td ${i.ok ? 'ok' : ''}" ${i.act}><span class="ck">✓</span><span class="tt"><b>${i.t}</b><span>${i.s}</span></span><span class="go">${i.ok ? '完了' : i.go + ' ›'}</span></button>`).join('')}</div></section>`;
  }

  function kpis() {
    const known = WORDS.filter(w => status(w.id) === 3).length;
    const lessons = Object.values(S.course || {}).filter(c => (c.best || 0) >= 80).length + Object.values(S.path || {}).filter(v => v >= 80).length;
    const best = Math.max(0, ...Object.values(S.cbres || {}).map(r => r.p));
    return `<div class="kpis"><div class="kpi k1"><b>${known.toLocaleString()}</b><span>覚えた単語</span></div><div class="kpi k2"><b>${lessons}</b><span>完了レッスン</span></div><div class="kpi k3"><b>${best ? best + '%' : '—'}</b><span>模試ベスト</span></div></div>`;
  }

  function vHome() {
    if (ui.place || !window.PATH) return baseHome();
    return `${hero()}${todo()}${kpis()}${window.PLAN_CARD?.() || ''}
      <section class="sect"><div class="sect-h"><h3>コース</h3><span>A1 → C2 を順番に</span></div>${PATH.path({noHero: true})}</section>
      ${PATH.quests()}
      <button class="morelink" data-act="tab" data-tab="hub-record">学習の記録・試験日の設定・弱点レーダー ${SHELL_ICON.chevron}</button>`;
  }

  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, home: vHome};
  Object.assign(ACT, {
    hmiss: () => { ACT.tab({tab: 'quiz'}); ACT.qmiss({mode: 'meaning'}); },
  });
  render();
})();
