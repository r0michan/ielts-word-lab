// IELTS score requirements by country. Checked October 2026 — rules change often; always confirm on the official pages.
// overall / each = minimum IELTS band (null = no requirement of that kind). none = IELTS not required.
window.COUNTRIES = {
  checked: '2026年10月',
  list: [
    {id:'uk', name:'イギリス', en:'United Kingdom',
     test:'ビザ申請には英国内務省が認めた「IELTS for UKVI」（家族・永住は「IELTS Life Skills」）が必要です。通常の IELTS Academic / General Training はビザでは使えません（大学入学には使えます）。',
     rows:[
      {p:'技能労働者ビザ（Skilled Worker）新規申請', req:'B2 · 各セクション 5.5 以上', each:5.5, note:'2026年1月8日以降の新規申請から B1 → B2 に引き上げ。'},
      {p:'技能労働者ビザ：2026年1月7日以前から保有している人の延長', req:'B1 · 各セクション 4.0 以上', each:4.0, note:'引き上げ前からビザを持つ人は B1 のまま延長できると案内されています。'},
      {p:'学生ビザ（学位課程）', req:'B2 · 各セクション 5.5 以上', each:5.5, note:'大学が独自に英語力を判定する場合もあります。'},
      {p:'大学・大学院の入学条件（目安）', req:'総合 6.0〜7.0（各 5.5〜6.5）', overall:6.5, each:6.0, note:'大学・学部で異なります。上位校の大学院は総合 7.0 以上が多いです。表の判定は「総合6.5・各6.0」で計算。'},
      {p:'永住権（ILR）・市民権', req:'B1（スピーキング・リスニング）', each:4.0, note:'IELTS Life Skills B1 などで証明。2027年3月26日以降、永住申請の多くで B2 を求める予定と報じられています（要確認）。'},
      {p:'配偶者・家族ビザ', req:'入国時 A1 → 延長時 A2 → 永住時 B1', each:null, cefrOnly:true, note:'IELTS Life Skills（合否判定）で証明します。'},
     ],
     links:[['技能労働者ビザの英語要件（GOV.UK）','https://www.gov.uk/skilled-worker-visa/knowledge-of-english'],['学生ビザの英語要件（GOV.UK）','https://www.gov.uk/student-visa/knowledge-of-english'],['認定英語テスト一覧（GOV.UK）','https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt']]},
    {id:'au', name:'オーストラリア', en:'Australia',
     test:'IELTS Academic・General Training のどちらも使えます。2025年8月7日から、オンライン・自宅受験の結果は使えず、指定会場での受験が必要です（IELTS の必要バンドは変更なし）。',
     rows:[
      {p:'技術移民の最低ライン（Competent English）', req:'各セクション 6.0 以上', each:6.0, note:'ポイント加算なし。多くの技術移民ビザの最低条件。'},
      {p:'Proficient English（ポイント +10）', req:'各セクション 7.0 以上', each:7.0, note:'ポイントテストで +10 点。'},
      {p:'Superior English（ポイント +20）', req:'各セクション 8.0 以上', each:8.0, note:'ポイントテストで +20 点（英語の最高加点）。'},
      {p:'Vocational English（一部の就労ビザ）', req:'各セクション 5.0 以上', each:5.0, note:'職種・ビザで異なります。'},
      {p:'卒業生ビザ（Temporary Graduate 485）', req:'総合 6.5 · 各 5.5 以上', overall:6.5, each:5.5, note:'2024年3月の改定後の基準（要確認）。2025年8月以降は One Skill Retake の結果も可。'},
      {p:'学生ビザ（Student 500）', req:'総合 6.0 以上', overall:6.0, note:'英語コースを併用すると、より低いスコアで申請できる場合があります。'},
      {p:'Functional English（家族ビザ・永住の一部）', req:'総合 4.5 以上', overall:4.5, note:'満たさない場合は英語コースの追加料金が必要になることがあります。'},
     ],
     links:[['英語要件の一覧（内務省）','https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language'],['Proficient English（内務省）','https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language/proficient-english'],['Superior English（内務省）','https://immi.homeaffairs.gov.au/help-support/meeting-our-requirements/english-language/superior-english']]},
    {id:'us', name:'アメリカ', en:'United States',
     test:'アメリカの移民制度（就労ビザ・グリーンカード）では、一般に IELTS は求められません。大学入学と、一部の医療職（看護師など）のビザ審査で IELTS Academic が使われます。',
     rows:[
      {p:'就労ビザ・グリーンカード（一般）', req:'IELTS 不要', none:true, note:'職種によっては英語力の証明が必要な場合があります。'},
      {p:'市民権（帰化）', req:'IELTS 不要', none:true, note:'帰化面接の中で英語の読み書き・会話のテストがあります。'},
      {p:'大学（学部）の入学条件（目安）', req:'総合 6.0〜6.5', overall:6.5, note:'大学で異なります。表の判定は総合6.5で計算。'},
      {p:'大学院の入学条件（目安）', req:'総合 6.5〜7.0（上位校は 7.0 以上）', overall:7.0, note:'表の判定は総合7.0で計算。'},
      {p:'看護師など医療職のビザ審査（VisaScreen）', req:'IELTS Academic · 職種別の基準', overall:6.5, speaking:7.0, note:'正看護師は「総合 6.5・スピーキング 7.0」とよく紹介されますが、必ず CGFNS の公式表で確認してください。'},
     ],
     links:[['VisaScreen の英語要件（CGFNS）','https://www.cgfns.org/services/certification/visascreen-visa-credentials-assessment/'],['帰化面接と英語テスト（USCIS）','https://www.uscis.gov/citizenship/learn-about-citizenship/the-naturalization-interview-and-test']]},
  ],
};
