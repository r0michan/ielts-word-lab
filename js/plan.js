/* 1年で B2 を目指す学習プラン。
   開始時のレベルから B2 修了までを、各レベルの分量（単語・文法ユニット）に応じて12か月に割り振り、
   月ごとの到達目標と「今週やること」を出す。アプリ外の教材（公式問題集・多読・ポッドキャスト・オンライン英会話）も段階ごとに案内する。 */
(() => {
  const css = `
  .plhead{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:center}
  .plring{width:76px;height:76px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--accent) calc(var(--p) * 1%),var(--sunk) 0);position:relative}
  .plring::after{content:"";position:absolute;inset:9px;border-radius:50%;background:var(--surface)}
  .plring b{position:relative;z-index:1;font-family:var(--f-word);font-size:16px;text-align:center;line-height:1.1}
  .plring b small{display:block;font-size:10px;color:var(--muted);font-family:var(--f-ui)}
  .tl{display:flex;flex-direction:column;gap:0;position:relative;padding-left:22px}
  .tl::before{content:"";position:absolute;left:8px;top:6px;bottom:6px;width:3px;background:var(--line);border-radius:3px}
  .tlr{position:relative;padding:6px 0}
  .tlr::before{content:"";position:absolute;left:-19px;top:11px;width:13px;height:13px;border-radius:50%;background:var(--surface);border:3px solid var(--line)}
  .tlr.ok::before{background:var(--good);border-color:var(--good)} .tlr.now::before{background:var(--accent);border-color:var(--accent)}
  .tlr b{font-size:14.5px} .tlr span{font-size:12.5px;color:var(--muted);display:block}
  .wk2{display:flex;flex-direction:column;gap:8px}
  .wkr{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:10px;align-items:center;border:1.5px solid var(--line);border-radius:14px;padding:8px 12px;background:var(--surface);text-align:left;cursor:pointer;color:var(--ink)}
  .wkr .ic{font-size:20px;text-align:center} .wkr b{font-size:14px} .wkr .qbar{margin-top:4px}
  .wkr.ok{border-color:color-mix(in srgb,var(--good) 60%,var(--line))}
  .wkr .st{font-size:12px;font-weight:900;color:var(--muted);white-space:nowrap} .wkr.ok .st{color:var(--good)}
  .res{display:flex;flex-direction:column;gap:8px}
  .res div{border-left:4px solid var(--c3);background:var(--sunk);border-radius:0 12px 12px 0;padding:8px 12px}
  .res b{font-size:14px} .res span{font-size:12.5px;color:var(--muted);display:block}
  .plcard{display:flex;align-items:center;gap:12px;background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:12px 14px;cursor:pointer;text-align:left;width:100%;color:var(--ink)}
  .plcard .t{flex:1;min-width:0} .plcard b{font-size:14.5px} .plcard span{font-size:12.5px;color:var(--muted);display:block}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const pad = n => String(n).padStart(2, '0');
  const dk = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const LV = LEVELS, SIZE = 50;
  const units = L => (window.GRAMMAR || []).filter(g => g.lv === L).length + Math.ceil(WORDS.filter(w => w.lv === L).length / SIZE);
  const curLv = () => S.lv?.cur || S.place?.lvl || 'A1';
  // the goal: finish B2 within a year (learners who start at B2 or above aim for C1 / IELTS 7.0)
  function goalOf(from) { return LV.indexOf(from) >= 3 ? 'C1' : 'B2'; }

  function schedule() {
    const p = S.plan, from = p.from, goal = goalOf(from);
    const span = LV.slice(LV.indexOf(from), LV.indexOf(goal) + 1);
    const w = span.map(units), sum = w.reduce((a, b) => a + b, 0);
    let acc = 0;
    return span.map((L, i) => { acc += w[i]; return {L, month: Math.max(1, Math.round(acc / sum * 12))}; });
  }
  const weeksIn = () => Math.max(0, Math.floor((Date.now() - new Date(S.plan.start).getTime()) / (7 * 864e5)));
  function weekRange() { const d = new Date(); const mon = new Date(d); mon.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return [...Array(7)].map((_, i) => { const x = new Date(mon); x.setDate(mon.getDate() + i); return dk(x); }); }
  function weekCount(cat) { return weekRange().reduce((a, k) => a + (S.log?.[k]?.[cat] || 0), 0); }

  function targets() {
    const L = curLv(), goal = goalOf(S.plan.from), weeksLeft = Math.max(4, 52 - weeksIn());
    const span = LV.slice(LV.indexOf(L), LV.indexOf(goal) + 1);
    const wordsLeft = WORDS.filter(w => span.includes(w.lv) && status(w.id) < 3).length;
    const lessonsLeft = span.reduce((a, l) => a + units(l), 0) - (window.GRAMMAR || []).filter(g => span.includes(g.lv) && (S.course?.[g.id]?.best || 0) >= 80).length - Object.keys(S.path || {}).filter(k => span.some(l => k.startsWith('w:' + l)) && S.path[k] >= 80).length;
    const idx = LV.indexOf(L);
    const T = [
      {k: 'cards', ic: '🃏', t: '単語カード', goal: Math.min(350, Math.max(70, Math.ceil(wordsLeft / weeksLeft / 10) * 10)), unit: '枚', tab: 'card', why: `B2 までに覚える単語があと約${wordsLeft}語。毎週この枚数で間に合います。`},
      {k: 'lesson', ic: '📘', t: 'レッスン（文法・単語）', goal: Math.min(10, Math.max(3, Math.ceil(lessonsLeft / weeksLeft))), unit: '回', tab: 'home', why: `残りのレッスン約${lessonsLeft}個を、週ごとに少しずつ。`},
      {k: 'test', ic: '📝', t: 'デイリー・週間テスト', goal: 6, unit: '回', tab: 'tests', why: '平日は毎日デイリー、週末に週間テスト。'},
      {k: 'situ', ic: '💬', t: '会話ロールプレイ', goal: idx <= 1 ? 2 : 1, unit: '回', tab: 'situ', why: '声に出して言う練習。旅行・生活の場面から。'},
      {k: 'read', ic: '📖', t: '読解', goal: 1, unit: '題', tab: 'read', why: `${L === 'A1' ? 'A1' : L} レベルの文章から1題。`},
      {k: 'listen', ic: '🎧', t: 'リスニング', goal: idx <= 1 ? 2 : 1, unit: '題', tab: 'listen', why: '音声を2回聞き、3回目にスクリプトを見て確認。'},
    ];
    if (idx >= 1) T.push({k: 'write', ic: '✏️', t: '作文', goal: 1, unit: '本', tab: idx >= 3 ? 'write' : 'ewrite', why: idx >= 3 ? 'IELTS Task 2 を1本。セルフチェック表で見直し。' : 'レベル別の短い作文を1本。'});
    return T;
  }
  const RES = {
    A1: [['BBC Learning English（無料サイト・アプリ）', 'イギリス英語のやさしい動画。初級コースから順に。'], ['Peppa Pig などイギリスの子ども向けアニメ', '短く、はっきりしたイギリス英語。英語字幕で。'], ['Oxford Bookworms / Penguin Readers（Starter〜Level 1）', '語彙を制限した多読本。1日10分。']],
    A2: [['Oxford Bookworms / Penguin Readers（Level 1〜2）', '週1冊を目安に多読。わからない語は飛ばして読む。'], ['BBC Learning English「6 Minute English」', '6分のポッドキャスト。スクリプト付き。'], ['好きな海外ドラマを英語字幕で（Friends など）', 'アメリカの日常会話のイメージをつかむ。']],
    B1: [['BBC「6 Minute English」・VOA Learning English', 'イギリス英語・アメリカ英語の両方に慣れる。'], ['Graded readers（Level 3〜4）', '週1冊。気に入った表現をメモ。'], ['オンライン英会話（週1回）', 'アプリの会話ロールプレイの場面をそのまま練習。'], ['Cambridge IELTS 公式問題集（後半に1冊）', 'B1 の後半から本番形式に触れ始める。']],
    B2: [['Cambridge IELTS 公式問題集（15〜19 など）', '本物の音声と本番の長さ。リスニング・リーディングは週1セット。'], ['BBC News / The Guardian（英）・NPR（米）', 'IELTS 頻出トピックの記事を週2本。'], ['ライティングの添削（週1本）', '講師や添削サービスで、アプリのセルフチェック後に。'], ['オンライン英会話で IELTS スピーキング模擬（週1〜2回）', 'Part 1〜3 を時間を計って。']],
    C1: [['Cambridge IELTS 公式問題集（最新巻）', '時間を計ってフル模試を月2回。'], ['The Economist / BBC Radio 4', 'C1 の語彙・論理展開に触れる。'], ['添削（週1〜2本）とスピーキング模擬（週2回）', 'バンド7の評価基準で弱点をつぶす。']],
  };
  RES.C2 = RES.C1;

  function vPlan() {
    if (!S.plan) {
      const L = curLv();
      return `<section class="sheet panel" style="gap:12px"><h2 style="font-size:20px">1年で ${goalOf(L)} を目指すプラン</h2>
        <p>今のレベル（<b>${S.lv ? S.lv.cur : '判定テスト未受験'}</b>）から ${goalOf(L)} 修了までを12か月に割り振り、毎週やることを自動で出します。</p>
        <ul class="small" style="margin:0;padding-left:1.2em;line-height:1.9"><li>1日の目安：平日 30分、週末 1時間</li><li>アプリ（単語・文法・会話・テスト）＋ アプリ外の教材（多読・ポッドキャスト・公式問題集・オンライン英会話）を段階ごとに案内</li><li>${goalOf(L) === 'B2' ? 'B2 に届くと IELTS 5.5〜6.5、その先 7.0 を狙える土台になります' : 'C1 は IELTS 7.0〜8.0 の目安です'}</li></ul>
        ${S.lv ? '' : '<p class="small">先に判定テストを受けると、あなたのレベルに合ったプランになります。</p>'}
        <div class="row">${S.lv ? '' : '<button class="btn" data-act="tplace">判定テストを受ける</button>'}<button class="btn primary big" data-act="plstart">プランを始める</button></div></section>`;
    }
    const sch = schedule(), w = weeksIn(), month = Math.min(12, Math.floor(w / 4.345) + 1), L = curLv(), T = targets();
    const passed = l => LV.indexOf(L) > LV.indexOf(l);
    const due = sch.find(x => !passed(x.L));
    const onTrack = !due || month <= due.month;
    const doneN = T.filter(t => weekCount(t.k) >= t.goal).length;
    return `<section class="sheet panel" style="gap:12px">
        <div class="plhead"><div class="plring" style="--p:${Math.min(100, w / 52 * 100)}"><b>${Math.min(52, w + 1)}<small>/ 52週</small></b></div>
          <div class="panel" style="gap:2px"><b style="font-size:18px">${S.plan.from} → ${goalOf(S.plan.from)}（${month}か月目）</b><span class="small muted">開始日 ${S.plan.start} ・ 現在レベル ${L}</span>
          <span class="small ${onTrack ? 'up' : 'dn'}" style="font-weight:800">${onTrack ? '予定どおり進んでいます' : `少し遅れています。${due.L} 修了の目安は ${due.month}か月目です`}</span></div></div>
      </section>
      <section class="sheet panel" style="gap:10px"><div class="row" style="justify-content:space-between"><b>今週やること</b><span class="small muted">${doneN} / ${T.length} 達成</span></div>
        <div class="wk2">${T.map(t => { const v = weekCount(t.k), ok = v >= t.goal; return `<button class="wkr ${ok ? 'ok' : ''}" data-act="tab" data-tab="${t.tab}"><span class="ic">${t.ic}</span><span><b>${t.t}</b><div class="qbar"><i style="width:${Math.min(100, v / t.goal * 100)}%"></i><em>${v} / ${t.goal}${t.unit}</em></div><span class="small muted">${esc(t.why)}</span></span><span class="st">${ok ? '✓ 達成' : '›'}</span></button>`; }).join('')}</div>
        <p class="small muted">平日：デイリーテスト → 単語カード → レッスン1つ（約30分）。週末：読解・リスニング・会話・作文と週間テスト（約1時間）。</p>
      </section>
      <section class="sheet panel" style="gap:10px"><b>1年の到達目標</b>
        <div class="tl"><div class="tlr ok"><b>スタート：${S.plan.from}</b><span>${S.plan.start}</span></div>${sch.map(x => `<div class="tlr ${passed(x.L) ? 'ok' : x === due ? 'now' : ''}"><b>${x.L} 修了 ・ ${x.month}か月目まで</b><span>${passed(x.L) ? '達成！' : x === due ? '今ここを目指しています（昇格テストで80点）' : ''}${window.LEVEL_JP?.[x.L] ? ` ${LEVEL_JP[x.L].school}・英検${LEVEL_JP[x.L].eiken}・TOEIC ${LEVEL_JP[x.L].toeic}` : ''}</span></div>`).join('')}</div>
      </section>
      <section class="sheet panel" style="gap:10px"><b>今の段階でおすすめのアプリ外の教材</b><div class="res">${(RES[L] || RES.B2).map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>
        <p class="small muted">教材名は一例です（無料・有料が混ざっています）。イギリス・アメリカの日常や文化に触れられるものを優先しています。</p></section>
      <div class="row"><button class="btn ghost" data-act="plreset">プランを最初からやり直す</button></div>`;
  }
  function vPlanCard() {
    if (!S.plan) return `<button class="plcard" data-act="tab" data-tab="plan"><span style="font-size:24px">🗓</span><span class="t"><b>1年で${goalOf(curLv())}を目指すプラン</b><span>今のレベルから月ごとの目標と毎週のやることを作成</span></span><span class="cv">›</span></button>`;
    const T = targets(), d = T.filter(t => weekCount(t.k) >= t.goal).length;
    return `<button class="plcard" data-act="tab" data-tab="plan"><span style="font-size:24px">🗓</span><span class="t"><b>1年プラン 第${Math.min(52, weeksIn() + 1)}週</b><span>今週やること ${d}/${T.length} 達成 ・ 目標 ${goalOf(S.plan.from)}</span></span><span class="cv">›</span></button>`;
  }
  window.PLAN_CARD = vPlanCard;
  Object.assign(ACT, {
    plstart: () => { S.plan = {start: dk(), from: curLv()}; save(); render(); scrollTo(0, 0); },
    plreset: () => { if (confirm('プランを最初からやり直しますか？（学習記録は消えません）')) { S.plan = {start: dk(), from: curLv()}; save(); render(); } },
  });
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, plan: vPlan};
})();
