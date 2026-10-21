/* スコア換算・試験比較: CEFR を軸に IELTS / TOEFL iBT / TOEIC / 英検 / ケンブリッジを並べ、
   日本でなじみのある試験の感覚から IELTS の目標を理解できるようにする。国別要件（extras.js）と同じタブに置く。 */
(() => {
  const css = `
  .eqtab{width:100%;border-collapse:collapse;font-size:13.5px;min-width:620px}
  .eqtab th,.eqtab td{border-bottom:1px solid var(--line);padding:8px 8px;text-align:left;font-variant-numeric:tabular-nums}
  .eqtab th{font-size:12px;color:var(--muted);font-weight:700}
  .eqtab tr.me td{background:var(--accent-soft);font-weight:700}
  .eqtab td:first-child{font-family:var(--f-word);font-weight:800}
  .exgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
  .excard{background:var(--sunk);border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;gap:6px}
  .excard h3{font-size:17px;margin:0}
  .excard dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;margin:0;font-size:13.5px}
  .excard dt{color:var(--muted);font-weight:700;white-space:nowrap}
  .excard dd{margin:0}
  .mytarget{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .mytarget span{background:var(--surface);border:1.5px solid var(--line);border-radius:999px;padding:4px 12px;font-weight:700}
  .mytarget span b{color:var(--accent);font-family:var(--f-word)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // CEFR alignment (目安): 文部科学省「各資格・検定試験とCEFRとの対照表」と各団体の公表値をもとに整理
  const EQ = [
    {cefr: 'C2', ielts: '8.5–9.0', toefl: '—', toefl6: '6.0', toeic: '—', eiken: '—', cam: 'C2 Proficiency'},
    {cefr: 'C1', ielts: '7.0–8.0', toefl: '95–120', toefl6: '5.0–5.5', toeic: '945–990', eiken: '1級', cam: 'C1 Advanced'},
    {cefr: 'B2', ielts: '5.5–6.5', toefl: '72–94', toefl6: '4.0–4.5', toeic: '785–940', eiken: '準1級', cam: 'B2 First'},
    {cefr: 'B1', ielts: '4.0–5.0', toefl: '42–71', toefl6: '3.0–3.5', toeic: '550–780', eiken: '2級', cam: 'B1 Preliminary'},
    {cefr: 'A2', ielts: '〜3.5', toefl: '—', toefl6: '2.0–2.5', toeic: '225–545', eiken: '準2級', cam: 'A2 Key'},
    {cefr: 'A1', ielts: '—', toefl: '—', toefl6: '1.0–1.5', toeic: '120–220', eiken: '3級〜5級', cam: 'A1 Movers'},
  ];
  // IELTS band → TOEFL iBT (ETS の公表している比較表)
  const IT = [[9, '118–120'], [8.5, '115–117'], [8, '110–114'], [7.5, '102–109'], [7, '94–101'], [6.5, '79–93'], [6, '60–78'], [5.5, '46–59'], [5, '35–45'], [4.5, '32–34'], [4, '0–31']];
  const cefrOf = b => b >= 8.5 ? 'C2' : b >= 7 ? 'C1' : b >= 5.5 ? 'B2' : b >= 4 ? 'B1' : 'A2';
  window.EXAM_EQ = EQ;

  const EXAMS = [
    {name: 'IELTS', en: 'International English Language Testing System', rows: [['技能', '聞く・読む・書く・話す（4技能）'], ['形式', 'Academic（留学）と General Training（移住・就労）。スピーキングは試験官と対面'], ['スコア', '1.0〜9.0 の 0.5 刻み（バンド）'], ['主な用途', '英・豪・加・NZ などのビザ／移住、海外大学への出願'], ['英語', 'イギリス・オーストラリアなど多様な発音、英国式つづりも可']], tip: '「使える英語」を総合的に見る試験。書く・話すの比重が大きい。'},
    {name: 'TOEFL iBT', en: 'Test of English as a Foreign Language', rows: [['技能', '4技能（すべてコンピュータで受験）'], ['形式', 'スピーキングはマイクに録音。大学の講義・キャンパス場面が中心'], ['スコア', '0〜120。2026年から1〜6の新スケールも導入'], ['主な用途', 'アメリカを中心とした大学・大学院への出願（一部の国のビザにも）'], ['英語', 'アメリカ英語中心のアカデミックな内容']], tip: 'IELTS Academic と用途が近いライバル。形式やスコアの最新情報は ETS の公式サイトで確認を。'},
    {name: 'TOEIC L&R', en: 'Listening & Reading Test', rows: [['技能', '聞く・読むのみ（書く・話すは別試験の S&W）'], ['形式', '2時間・200問のマークシート'], ['スコア', '10〜990'], ['主な用途', '日本・韓国の就職、昇進、社内評価'], ['英語', 'ビジネス場面（会議・メール・広告など）']], tip: '海外のビザや大学出願ではほぼ使えません。高得点でも IELTS の書く・話すは別に対策が必要。'},
    {name: '英検', en: '実用英語技能検定', rows: [['技能', '1次（読む・聞く・書く）＋2次（面接）'], ['形式', '級ごとの合否。準1級・1級は社会問題の英作文と面接'], ['スコア', '合否＋英検CSEスコア'], ['主な用途', '日本の高校・大学入試、単位認定、教員採用など'], ['英語', '日本の学習者向けに作られた試験']], tip: '日本での評価は高いが、移住ビザには使えません。準1級はおおむね IELTS 5.5〜6.5（B2）の感覚。'},
  ];
  const WHY = [
    ['書く・話すがない', 'TOEIC L&R はマークシートで、英文を「作る」力を測りません。IELTS では全体の半分がライティングとスピーキングです。'],
    ['時間内に長く書く', 'IELTS のライティングは60分で150語＋250語。型（序論→本論→結論）を知らないと点が伸びません。'],
    ['つづりが採点される', 'IELTS のリスニングは書いて答えるため、つづりミスは不正解。マーク式に慣れていると落としやすいポイントです。'],
    ['アカデミックな話題', '環境・教育・テクノロジーなど、社会問題について意見を言う力が問われます。'],
  ];
  const APP = {
    'IELTS': [['vocab', '語彙ドリル'], ['read', '読解'], ['listen', 'リスニング'], ['write', 'ライティング'], ['speak', 'スピーキング'], ['mock', '模擬試験']],
    'TOEFL iBT': [['read', '読解'], ['listen', 'リスニング'], ['write', 'ライティング'], ['speak', 'スピーキング'], ['vocab', '言い換え']],
    'TOEIC L&R': [['vocab', '品詞（TOEIC型）'], ['card', '単語カード'], ['dict', 'ディクテーション'], ['listen', 'リスニング']],
    '英検': [['card', '単語カード'], ['sent', '構文トレーニング'], ['write', 'ライティング'], ['speak', '面接（スピーキング）']],
  };

  function vConvert() {
    const tgt = S.exam?.target || S.target?.o || 6.5, c = cefrOf(tgt), row = EQ.find(r => r.cefr === c), tf = (IT.find(([b]) => b <= tgt) || IT[IT.length - 1])[1];
    return `<section class="sheet panel" style="gap:12px"><b>あなたの目標を他の試験に置き換えると</b>
        <div class="mytarget"><span>IELTS <b>${tgt.toFixed(1)}</b></span>≈<span>CEFR <b>${c}</b></span>≈<span>TOEFL iBT <b>${tf}</b></span>≈<span>TOEIC L&R <b>${row.toeic}</b></span>≈<span>英検 <b>${row.eiken}</b></span></div>
        <p class="small muted">TOEIC と英検は「同じ CEFR レベル」に相当する範囲です。TOEIC は聞く・読むだけの試験なので、同じ CEFR でも IELTS の書く・話すまで届いているとは限りません。目標は「ホーム」の試験日カード、または「国別要件」で変えられます。</p>
      </section>
      <section class="sheet panel" style="gap:10px"><b>CEFR を軸にした換算表（目安）</b>
        <div class="tablewrap" style="overflow-x:auto"><table class="eqtab"><thead><tr><th>CEFR</th><th>IELTS</th><th>TOEFL iBT<br>0–120</th><th>TOEFL iBT<br>新 1–6</th><th>TOEIC L&R</th><th>英検</th><th>ケンブリッジ</th></tr></thead>
        <tbody>${EQ.map(r => `<tr class="${r.cefr === c ? 'me' : ''}"><td>${r.cefr}</td><td>${r.ielts}</td><td>${r.toefl}</td><td>${r.toefl6}</td><td>${r.toeic}</td><td>${r.eiken}</td><td>${r.cam}</td></tr>`).join('')}</tbody></table></div>
        <p class="small muted">文部科学省「各資格・検定試験と CEFR との対照表」と各試験団体の公表値をもとにした目安です。TOEIC は L&R の CEFR 下限（ETS 公表）を合計した値。正式な換算は各団体の公式サイトで確認してください。</p>
      </section>
      <section class="sheet panel" style="gap:10px"><b>IELTS と TOEFL iBT（0–120）の比較</b>
        <div class="tablewrap" style="overflow-x:auto"><table class="eqtab" style="min-width:0"><thead><tr><th>IELTS</th>${IT.map(([b]) => `<th>${b.toFixed(1)}</th>`).join('')}</tr></thead>
        <tbody><tr><td>TOEFL</td>${IT.map(([b, t]) => `<td style="${b === tgt ? 'background:var(--accent-soft);font-weight:800' : ''}">${t}</td>`).join('')}</tr></tbody></table></div>
        <p class="small muted">ETS が公表している IELTS との比較表より。</p>
      </section>`;
  }
  function vCompare() {
    return `<section class="sheet panel" style="gap:12px"><b>4つの試験のちがい</b>
        <div class="exgrid">${EXAMS.map(x => `<div class="excard"><h3>${esc(x.name)} <span class="small muted" style="font-weight:500">${esc(x.en)}</span></h3>
          <dl>${x.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
          <p class="small" style="font-weight:700">${esc(x.tip)}</p>
          <div class="row" style="gap:6px"><span class="small muted">このアプリでの対策：</span>${APP[x.name].map(([t, l]) => `<button class="btn" style="padding:4px 10px;font-size:12.5px" data-act="tab" data-tab="${t}">${esc(l)}</button>`).join('')}</div></div>`).join('')}</div>
      </section>
      <section class="sheet panel" style="gap:10px"><b>TOEIC で高得点でも IELTS 6.5 に届かないことがある理由</b>
        ${WHY.map(([h, p]) => `<div><b style="font-size:14.5px">・${esc(h)}</b><p class="small" style="margin-top:2px">${esc(p)}</p></div>`).join('')}
        <p class="small muted">逆に言えば、TOEIC で身につけた語彙とリスニング力は IELTS の土台になります。足りない「書く・話す・つづり」をこのアプリで補いましょう。</p>
      </section>`;
  }
  ui.exv = 'country';
  const baseScore = window.EXTRA_VIEWS.score;
  window.EXTRA_VIEWS = {...window.EXTRA_VIEWS, score: () => {
    const segs = [['country', '国別の必要スコア'], ['conv', 'スコア換算'], ['compare', '試験比較（TOEIC・TOEFL・英検）']];
    const head = `<div class="seg" role="group">${segs.map(([k, v]) => `<button data-act="exview" data-k="${k}" aria-pressed="${ui.exv === k}">${v}</button>`).join('')}</div>`;
    return head + (ui.exv === 'conv' ? vConvert() : ui.exv === 'compare' ? vCompare() : baseScore());
  }};
  ACT.exview = x => { ui.exv = x.k; render(); };
  if (S.tab === 'score') render();
})();
