/* アプリの外枠: スマホは下部タブバー、PC は左サイドバー。上部はコンパクトなアプリバー（戻る・ページ名・レベル・連続日数）。
   「学ぶ」「試験対策」「記録」はメニュー画面（ハブ）から各機能へ入る。ホームは「今日やること」に絞り、統計は「記録」へ。 */
(() => {
  const I = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const IC = {
    home: I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>'),
    learn: I('<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>'),
    exam: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),
    tests: I('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/><path d="m9 13 2 2 4-4"/>'),
    record: I('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    back: I('<path d="m15 18-6-6 6-6"/>'),
    flame: I('<path d="M12 22c4 0 7-3 7-7 0-5-5-8-6-13-2 3-6 6-6 11 0 1 .3 2 .8 3C6 15 5 14 5 13c-1 1-2 3-2 4.5C3 20 7 22 12 22z"/>'),
    card: I('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
    quiz: I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><path d="M12 17h.01"/>'),
    vocab: I('<path d="M4 7h10M4 12h16M4 17h7"/><path d="m17 4 3 3-3 3"/>'),
    images: I('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>'),
    list: I('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
    course: I('<path d="M4 19V9l8-5 8 5v10"/><path d="M9 19v-5h6v5"/><path d="M4 19h16"/>'),
    lessons: I('<path d="M3 7l9-4 9 4-9 4z"/><path d="M7 9v5c0 1.5 2.5 3 5 3s5-1.5 5-3V9"/>'),
    sent: I('<path d="M4 6h16M4 10h10M4 14h16M4 18h8"/>'),
    expr: I('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    japan: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>'),
    situ: I('<path d="M14 9a2 2 0 0 1-2 2H6l-3 3V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z"/><path d="M18 9h1a2 2 0 0 1 2 2v10l-3-3h-6a2 2 0 0 1-2-2v-1"/>'),
    dict: I('<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>'),
    pron: I('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>'),
    mock: I('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>'),
    read: I('<path d="M4 4h12l4 4v12H4z"/><path d="M8 12h8M8 16h6M8 8h4"/>'),
    listen: I('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>'),
    write: I('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    speak: I('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>'),
    score: I('<path d="M12 3v18M5 7h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0z"/>'),
    notes: I('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13l2 2 4-4"/>'),
    settings: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    chevron: I('<path d="m9 18 6-6-6-6"/>'),
    filter: I('<path d="M3 5h18M6 12h12M10 19h4"/>'),
  };
  window.SHELL_ICON = IC;

  const DEST = [['home', 'ホーム'], ['learn', '学ぶ'], ['exam', '試験対策'], ['tests', 'テスト'], ['record', '記録']];
  const HUBS = {
    learn: {title: '学ぶ', lead: '単語・文法・発音を、自分のペースで積み上げる', groups: [
      ['レベル別コース', [['course', 'レベル別コース（A1〜C2）', '文法ユニット・単語帳・パート別練習。中学〜大学・英検・TOEIC の目安つき']]],
      ['単語', [['card', '単語カード', '忘れる前に出題する間隔反復'], ['quiz', 'クイズ', '4択・書き取りで定着を確認'], ['vocab', '語彙ドリル', '言い換え・コロケーション・品詞・つづり・トピック'], ['images', 'イメージ図鑑', '前置詞・時制・冠詞を図で理解'], ['list', '単語帳', '5,000語の検索と進み具合']]],
      ['文法・表現', [['lessons', 'レッスン', '文法と表現を順番に学ぶ'], ['sent', '文トレ', '構文の並べ替え・穴埋め・音読'], ['expr', '表現・イディオム', '国ごとの言い方・会話表現・スラング'], ['japan', '日本人の弱点', 'L/R・和製英語・間違えやすい文']]],
      ['聞く・話す', [['situ', 'シチュエーション会話', '76場面 × イギリス・アメリカ・オーストラリアの3バージョン'], ['dict', 'ディクテーション', '聞いて書き取る・数字とつづり'], ['pron', '発音練習', '口の形の図と録音で確認']]],
    ]},
    exam: {title: '試験対策', lead: 'IELTS の4技能を本番形式で練習する', groups: [
      ['本番形式', [['mock', '模擬試験', '4技能を時間を計って通しで']]],
      ['4技能', [['read', '読解', 'T/F/NG・見出し・選択・要約'], ['listen', 'リスニング', 'Section 1〜4・地図・マッチング'], ['write', 'ライティング', 'Task 1・2 と自動チェック・模範解答'], ['speak', 'スピーキング', 'Part 1〜3 を録音して分析']]],
      ['情報', [['score', 'スコア換算・試験比較', '国別の必要スコア・TOEIC/TOEFL/英検との対応']]],
    ]},
    record: {title: '記録', lead: '学習の積み上げと設定', groups: [
      ['復習と設定', [['notes', '間違いノート', '間違えた問題をまとめて復習'], ['settings', '設定・単語追加', '音声・アクセント・自分の単語']]],
    ]},
  };
  const TAB_DEST = {home: 'home', tests: 'tests', 'hub-learn': 'learn', 'hub-exam': 'exam', 'hub-record': 'record'};
  Object.entries(HUBS).forEach(([d, h]) => h.groups.forEach(([, items]) => items.forEach(([k]) => TAB_DEST[k] = d)));
  const destOf = tab => TAB_DEST[tab] || 'learn';
  const isTop = tab => ['home', 'tests', 'hub-learn', 'hub-exam', 'hub-record'].includes(tab);
  const labelOf = tab => { for (const h of Object.values(HUBS)) for (const [, items] of h.groups) { const x = items.find(i => i[0] === tab); if (x) return x[1]; } return (TABS.find(t => t[0] === tab) || [])[1] || ''; };

  /* ---------- shell DOM ---------- */
  const bar = document.createElement('header'); bar.className = 'appbar'; bar.id = 'appbar';
  const nav = document.createElement('nav'); nav.className = 'dock'; nav.id = 'dock'; nav.setAttribute('aria-label', 'メインメニュー');
  document.body.prepend(bar); document.body.appendChild(nav);
  document.documentElement.classList.add('shell');

  const streak = () => { let n = 0; const d = new Date(), k = () => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; if (!S.log?.[k()]?.xp) d.setDate(d.getDate() - 1); while (S.log?.[k()]?.xp) { n++; d.setDate(d.getDate() - 1); } return n; };
  renderTabs = function () {
    document.documentElement.classList.toggle('focus', S.tab === 'course' && !!ui.cs?.run);
    const tab = S.tab, dest = destOf(tab), top = isTop(tab);
    const title = top ? (tab === 'home' ? '' : DEST.find(d => d[0] === dest)[1]) : labelOf(tab);
    const sk = streak();
    bar.innerHTML = `<div class="appbar-in">
      ${top ? (tab === 'home' ? `<div class="brand"><span class="logo">Aa</span><span>IELTS単語ラボ</span></div>` : `<h1 class="ptitle">${title}</h1>`)
        : `<button class="iconbtn" data-act="shellback" aria-label="${DEST.find(d => d[0] === dest)[1]}に戻る">${IC.back}</button><h1 class="ptitle">${esc(title)}</h1>`}
      <div class="appbar-r">${S.lv ? `<button class="pill" data-act="tab" data-tab="tests" title="現在レベル">${S.lv.cur}</button>` : ''}<span class="pill soft" title="連続学習日数">${IC.flame}${sk}</span></div>
    </div>`;
    nav.innerHTML = `<div class="dock-brand"><span class="logo">Aa</span><b>IELTS単語ラボ</b></div>` + DEST.map(([k, v]) => `<button class="dock-item" data-act="shellgo" data-d="${k}" aria-current="${dest === k ? 'page' : 'false'}">${IC[k]}<span>${v}</span></button>`).join('')
      + `<div class="dock-foot">${S.lv ? `現在レベル <b>${S.lv.cur}</b>` : '判定テスト未受験'}<br>目標 IELTS ${(S.exam?.target || S.target?.o || 6.5).toFixed(1)}</div>`;
    document.title = (top && tab === 'home' ? '' : (title ? title + ' · ' : '')) + 'IELTS単語ラボ';
  };

  // filters: one compact "出題範囲" button that opens the full controls
  const baseFilters = renderFilters;
  renderFilters = function () {
    const el = $('#filters');
    if (S.tab.startsWith('hub-')) { el.hidden = true; return; }
    baseFilters(); if (el.hidden) return;
    const inner = el.innerHTML, topic = S.topic === 'all' ? 'すべてのトピック' : (TOPICS[S.topic] || S.topic);
    el.innerHTML = `<button class="fsum" data-act="fopen" aria-expanded="${!!ui.fopen}">${IC.filter}<span>出題範囲</span><b>${S.levels.join('・') || '—'}</b><span class="muted">${esc(topic)} ・ ${filtered().length}語</span><span class="chev">${IC.chevron}</span></button>${ui.fopen ? `<div class="fbody">${inner}</div>` : ''}`;
  };

  /* ---------- hubs ---------- */
  function stat(k) {
    const now = Date.now();
    if (k === 'card') { const due = filtered().filter(w => S.prog[w.id]?.seen && S.prog[w.id].due <= now).length; return due ? `<em class="hot">復習 ${due}</em>` : ''; }
    if (k === 'read') { const n = Object.keys(S.readBest || {}).length; return n ? `<em>${n}題挑戦</em>` : ''; }
    if (k === 'listen') { const n = Object.keys(S.lisBest || {}).length; return n ? `<em>${n}題挑戦</em>` : ''; }
    if (k === 'write') return S.drafts?.length ? `<em>${S.drafts.length}本</em>` : '';
    if (k === 'mock') { const m = (S.mocks || []).slice(-1)[0]; return m ? `<em>前回 L${m.L ?? '—'} R${m.R ?? '—'}</em>` : ''; }
    if (k === 'notes') { const m = S.missed; const n = m ? (m.read?.length || 0) + (m.listen?.length || 0) : 0; return n ? `<em class="hot">${n}問</em>` : ''; }
    return '';
  }
  const tile = ([k, t, d]) => `<button class="tile" data-act="tab" data-tab="${k}"><span class="tile-ic ic-${k}">${IC[k] || IC.learn}</span><span class="tile-tx"><b>${esc(t)}</b><span>${esc(d)}</span></span>${stat(k)}<span class="chev">${IC.chevron}</span></button>`;
  const hub = key => () => {
    const h = HUBS[key];
    return `<p class="lead">${h.lead}</p>${h.groups.map(([g, items]) => `<section class="hubgroup"><h2 class="gtitle">${g}</h2><div class="tiles">${items.map(tile).join('')}</div></section>`).join('')}
      ${key === 'record' ? recordExtras() : ''}`;
  };

  /* ---------- home ↔ record: split the home sections by what they are ---------- */
  const baseHome = window.EXTRA_VIEWS.home;
  function homeParts() {
    const box = document.createElement('div'); box.innerHTML = baseHome();
    const parts = {hero: [], today: [], exam: [], ring: [], record: [], other: []};
    [...box.children].forEach(el => {
      const tx = el.textContent;
      if (/今日のデイリーテスト|まずは判定テスト/.test(tx) && tx.length < 400) parts.hero.push(el);
      else if (/今日のおすすめ/.test(tx)) parts.today.push(el);
      else if (/試験日と目標|試験日まで|試験まで/.test(tx) && !/過去14日/.test(tx)) parts.exam.push(el);
      else if (el.querySelector('.ring')) { [...el.children].forEach(c => { if (c.querySelector('.ring') || c.classList.contains('hero')) parts.ring.push(c); }); }
      else if (/弱点レーダー|学習リマインダー|過去14日|データの保存|バッジ|これまでの成果|Lv\./.test(tx)) parts.record.push(el);
      else parts.other.push(el);
    });
    return parts;
  }
  const html = els => els.map(e => e.outerHTML).join('');
  function greet() {
    const h = new Date().getHours(), d = new Date();
    const hi = h < 5 ? 'おつかれさまです' : h < 11 ? 'おはようございます' : h < 18 ? 'こんにちは' : 'こんばんは';
    const days = S.exam?.date ? Math.ceil((new Date(S.exam.date) - new Date(d.toDateString())) / 864e5) : null;
    return `<div class="hello"><span class="muted">${d.getMonth() + 1}月${d.getDate()}日（${'日月火水木金土'[d.getDay()]}）</span><h2>${hi}</h2>${days != null && days >= 0 ? `<span class="count-chip">試験まで <b>${days}</b> 日</span>` : ''}</div>`;
  }
  function vHome() {
    if (ui.place) return baseHome();
    const p = homeParts();
    if (!window.PATH) return `${greet()}${html(p.hero)}${html(p.today)}<div class="hgrid">${html(p.ring)}${html(p.exam)}</div>${html(p.other)}`;
    return `${PATH.stats()}${html(p.hero)}${PATH.path()}${PATH.quests()}${html(p.other)}
      <button class="morelink" data-act="tab" data-tab="hub-record">今日のおすすめ・試験日の設定・弱点レーダー・バッジ ${IC.chevron}</button>`;
  }
  function recordExtras() {
    const p = homeParts();
    return `<section class="hubgroup"><h2 class="gtitle">今日のおすすめと目標</h2><div class="panel">${html(p.today)}<div class="hgrid">${html(p.ring)}${html(p.exam)}</div></div></section>
      <section class="hubgroup"><h2 class="gtitle">学習の記録</h2><div class="panel">${html(p.record)}</div></section>
      <p class="note">音声認識・録音は Chrome / Edge / Safari で動きます（音声認識にはインターネット接続が必要）。発音スコアと添削チェックは自動判定の目安で、IELTS の公式採点ではありません。</p>`;
  }

  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, home: vHome, 'hub-learn': hub('learn'), 'hub-exam': hub('exam'), 'hub-record': hub('record')};

  const baseTab = ACT.tab;
  Object.assign(ACT, {
    tab: d => { const changed = d.tab !== S.tab; baseTab(d); if (changed) scrollTo(0, 0); },
    shellgo: d => ACT.tab({tab: {home: 'home', tests: 'tests', learn: 'hub-learn', exam: 'hub-exam', record: 'hub-record'}[d.d]}),
    shellback: () => (window.BACK_HANDLERS || []).some(f => f()) ? (render(), scrollTo(0, 0)) : ACT.tab({tab: {learn: 'hub-learn', exam: 'hub-exam', record: 'hub-record', tests: 'tests', home: 'home'}[destOf(S.tab)]}),
    fopen: () => { ui.fopen = !ui.fopen; render(); },
  });
  render();
})();
