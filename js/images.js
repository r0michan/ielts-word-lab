/* イメージ図鑑: core-image diagrams for prepositions, time words, tenses, articles and basic verbs.
   Each entry: a drawing, the core meaning, and examples that go from concrete to abstract. */
(() => {
  const css = `
  :root{--im-lm:#E7ECEA;--im-lms:#8A9994;--im-tr:#E2783A;--im-ar:#0D7461;--im-hi:#4C5FC4;--im-tx:#5A6A65}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--im-lm:#24312D;--im-lms:#7E908A;--im-tr:#F0905A;--im-ar:#3FBF9F;--im-hi:#8F9EF0;--im-tx:#9AAAA5}}
  :root[data-theme="dark"]{--im-lm:#24312D;--im-lms:#7E908A;--im-tr:#F0905A;--im-ar:#3FBF9F;--im-hi:#8F9EF0;--im-tx:#9AAAA5}
  .imgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
  .imcard{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;text-align:left;cursor:pointer;min-width:0}
  .imcard:hover{border-color:var(--accent)}
  .imcard .w{font-family:var(--f-word);font-size:24px;font-weight:700;line-height:1.1}
  .imcard .core{font-weight:700;font-size:14px;color:var(--accent)}
  .imsvg{background:var(--sunk);border-radius:10px;padding:4px}
  .imsvg svg{display:block;width:100%;height:auto}
  .imsvg text{font:10.5px var(--f-ui);fill:var(--im-tx)}
  .imdetail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:18px;align-items:start}
  @media (max-width:700px){.imdetail{grid-template-columns:minmax(0,1fr)}}
  .imsteps{display:flex;flex-direction:column;gap:8px;counter-reset:st}
  .imsteps div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;background:var(--sunk);border-radius:10px;padding:10px 12px}
  .imsteps .lvl{font-size:11px;font-weight:700;color:var(--accent);grid-column:1 / -1}
  .imsteps .ex{font-size:16.5px}
  .imsteps .jp{grid-column:2;font-size:13px;color:var(--muted)}
  .imsmall{display:flex;gap:10px;align-items:center;background:var(--sunk);border-radius:10px;padding:8px 10px}
  .imsmall .imsvg{width:120px;flex:none;padding:0;background:none}
  .imsmall b{font-family:var(--f-word);font-size:17px}
  .imsmall span{font-size:13px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- drawing helpers (viewBox 200×130) ---------- */
  const DEFS = '<defs><marker id="ia" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--im-ar)"/></marker></defs>';
  const box = (x, y, w, h, o = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2" ${o}/>`;
  const ball = (x, y, r = 11, c = 'var(--im-tr)') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const ghost = (x, y, r = 11) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--im-tr)" stroke-width="2" stroke-dasharray="3 3"/>`;
  const arr = (d, dash) => `<path d="${d}" fill="none" stroke="var(--im-ar)" stroke-width="3" stroke-linecap="round" ${dash ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#ia)"/>`;
  const ln = (x1, y1, x2, y2, c = 'var(--im-lms)', w = 3, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${dash ? 'stroke-dasharray="4 4"' : ''}/>`;
  const t = (x, y, s, a = 'middle') => `<text x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
  const person = (x, y, lbl) => `<circle cx="${x}" cy="${y - 22}" r="9" fill="var(--im-hi)"/><rect x="${x - 11}" y="${y - 11}" width="22" height="26" rx="9" fill="var(--im-hi)"/>${lbl ? t(x, y + 28, lbl) : ''}`;
  // timeline: past ← now → future
  const axis = (extra = '') => `${ln(12, 96, 188, 96, 'var(--im-lms)', 2)}<path d="M184 91L190 96L184 101" fill="none" stroke="var(--im-lms)" stroke-width="2"/>${ln(118, 26, 118, 104, 'var(--im-hi)', 2, true)}${t(118, 120, '今')}${t(30, 120, '過去')}${t(176, 120, '未来')}${extra}`;
  const wave = (x1, x2, y) => { let d = `M${x1} ${y}`; for (let x = x1; x < x2; x += 10) d += ` q5 -9 10 0`; return `<path d="${d}" fill="none" stroke="var(--im-tr)" stroke-width="3" stroke-linecap="round"/>`; };
  const svg = body => `<svg viewBox="0 0 200 130" role="img">${DEFS}${body}</svg>`;

  /* ---------- entries ---------- */
  // [key, category, title, core, explanation, drawing, examples [en, ja, level 具体/抽象], tip]
  const E = [
    ['in', 'prep', 'in', '包まれている・中に', '何かに「囲まれて、中にある」イメージ。箱の中だけでなく、場所・年・状態の「範囲の中」にも広がります。',
      () => box(50, 22, 100, 82) + ball(100, 66) + t(100, 16, '範囲の中'),
      [['The keys are in the drawer.', '鍵は引き出しの中にある。', '具体'], ['I live in Tokyo.', '東京に住んでいる（東京という範囲の中）。', '場所'], ['The company was founded in 2010.', '2010年（という期間の中）に設立された。', '時'], ['She is in love.', '恋をしている（恋という状態に包まれている）。', '状態'], ['Many species are in danger.', '多くの種が危険な状態にある。', '抽象']], 'at は「点」、in は「範囲」。駅に着くは arrive at the station、国や都市に着くは arrive in Japan。'],
    ['on', 'prep', 'on', 'くっついている（接触）', '上に乗っているだけでなく、「接触している」のが本質。壁に貼ってあっても、天井にくっついていても on です。',
      () => `<rect x="20" y="84" width="120" height="10" rx="3" fill="var(--im-lms)"/>` + ball(80, 72) + `<rect x="168" y="14" width="10" height="100" rx="3" fill="var(--im-lms)"/>` + ball(156, 50) + t(80, 112, '上に接触') + t(150, 124, '壁に接触'),
      [['There is a cup on the table.', 'テーブルの上にカップがある。', '具体'], ['There is a picture on the wall.', '壁に絵がかかっている（壁に接触）。', '具体'], ['The meeting is on Monday.', '会議は月曜日だ（その日にくっついた予定）。', '時'], ['It depends on the weather.', '天気次第だ（天気に寄りかかっている）。', '抽象'], ['She is on the phone.', '彼女は電話中だ（電話につながっている）。', '抽象']], 'on Monday（曜日）、on 5 May（日付）は「その日にくっついている」。'],
    ['at', 'prep', 'at', 'ピンポイント（一点）', '広がりを考えず、「ここ」と一点を指すイメージ。地図上の点、時計の針が指す時刻など。',
      () => ln(15, 92, 185, 92) + ball(120, 92, 9, 'var(--im-hi)') + arr('M50 40 Q90 40 113 84') + t(120, 116, 'この一点'),
      [['Let\'s meet at the station.', '駅で会おう（地図上の一点）。', '具体'], ['The class starts at nine.', '授業は9時に始まる（時刻という点）。', '時'], ['Look at this picture.', 'この絵を見て（視線を一点に向ける）。', '動作'], ['She is good at maths.', '彼女は数学が得意だ（得意な一点）。', '抽象'], ['Prices are at their highest level.', '物価は最高水準にある。', '抽象']], '同じ場所でも、点として見れば at the airport、建物の中を意識すれば in the airport。'],
    ['to', 'prep', 'to', '到達点まで届く', '矢印がゴールに「届いている」イメージ。方向だけでなく、相手や結果にまで届きます。',
      () => ball(28, 65, 8) + box(148, 40, 34, 50) + arr('M40 65 H144') + t(165, 108, 'ゴール'),
      [['I go to school by bus.', 'バスで学校に行く（学校に到達）。', '具体'], ['Give this to your teacher.', 'これを先生に渡して（相手まで届く）。', '相手'], ['The shop is open from 9 to 5.', '9時から5時まで（終点まで）。', '時'], ['Cars contribute to air pollution.', '車は大気汚染の一因となる（結果に届く）。', '抽象'], ['I look forward to seeing you.', 'お会いするのを楽しみにしている（その時に向かって）。', '抽象']], 'to は届く、for は向かうだけ。leave for Tokyo は「東京に向けて出発」（まだ着いていない）。'],
    ['for', 'prep', 'for', '〜に向かって（目的・ため）', 'ゴールの方向を「向いている」けれど、届いているとは限らないイメージ。そこから「目的・〜のために」の意味に。',
      () => ball(28, 65, 8) + box(148, 40, 34, 50, 'stroke-dasharray="5 4"') + arr('M40 65 H118') + ln(124, 65, 140, 65, 'var(--im-ar)', 3, true) + t(165, 108, '目的地'),
      [['This train is for Osaka.', 'この電車は大阪行きだ（大阪の方へ向かう）。', '具体'], ['I\'m waiting for the bus.', 'バスを待っている（バスの方に気持ちが向く）。', '対象'], ['This present is for you.', 'このプレゼントはあなたのためのもの。', '目的'], ['I applied for the job.', 'その仕事に応募した（仕事を目指して）。', '目的'], ['She is famous for her films.', '彼女は映画で有名だ（理由）。', '理由']], '期間の for（for three years）は「その長さに向かって続く」と覚えると自然です。'],
    ['from', 'prep', 'from', '出発点（起点）', '矢印のスタート地点。場所・時間・原因・材料の「出どころ」を表します。',
      () => box(18, 40, 40, 50) + ghost(38, 65) + arr('M62 65 H158') + ball(170, 65) + t(38, 108, 'ここから'),
      [['I\'m from Japan.', '日本出身だ（出発点）。', '具体'], ['It takes ten minutes from here.', 'ここから10分かかる。', '場所'], ['He suffers from headaches.', '頭痛に悩まされている（原因が出どころ）。', '原因'], ['Cheese is made from milk.', 'チーズは牛乳から作られる（元の形が見えない材料）。', '材料'], ['This is different from that.', 'これはあれとは違う（あれから離れている）。', '抽象']], 'made from は材料が変化して見えない、made of は材料がそのまま見える（made of wood）。'],
    ['of', 'prep', 'of', '全体の一部・つながり', '大きなまとまりの「一部を切り取る」イメージ。所属・部分・中身を表します。',
      () => `<circle cx="100" cy="64" r="44" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/><path d="M100 64 L100 20 A44 44 0 0 1 141 50 Z" fill="var(--im-tr)"/>` + t(100, 124, '全体の中の一部'),
      [['a piece of cake', 'ケーキの一切れ（全体の一部）。', '具体'], ['one of my friends', '友達のうちの一人。', '部分'], ['the capital of France', 'フランスの首都（フランスに属する）。', '所属'], ['a cup of tea', 'カップ一杯の紅茶（中身）。', '中身'], ['I\'m proud of you.', 'あなたを誇りに思う（気持ちの対象とのつながり）。', '抽象']], 'most of the students（その学生たちの大部分）のように、of の後には特定のまとまり（the / my など）が来ます。'],
    ['by', 'prep', 'by', 'そばに・〜によって', '「すぐそば」にあるイメージ。そばにいて関わる→手段・行為者、そばまで迫る→期限、の意味に。',
      () => box(40, 30, 64, 70) + ball(124, 66) + t(100, 118, 'すぐそば'),
      [['She sat by the window.', '彼女は窓のそばに座った。', '具体'], ['I go to work by train.', '電車で通勤する（手段）。', '手段'], ['The book was written by a doctor.', 'その本は医者によって書かれた（行為者）。', '行為者'], ['Please finish it by Friday.', '金曜日までに終えて（期限のすぐ手前）。', '期限'], ['Sales increased by 10%.', '売上が10%増えた（差）。', '差']], 'by Friday（までに＝期限）と until Friday（までずっと＝継続）は日本人が最も混同する組み合わせです。'],
    ['with', 'prep', 'with', '一緒に・持って', '2つのものが「つながって一緒にある」イメージ。人・道具・特徴を伴います。',
      () => ball(78, 65) + ball(122, 65, 11, 'var(--im-hi)') + ln(89, 65, 111, 65, 'var(--im-ar)', 4) + t(100, 100, 'いっしょ'),
      [['I went shopping with my sister.', '妹と買い物に行った（一緒に）。', '具体'], ['Cut it with a knife.', 'ナイフで切って（道具を持って）。', '道具'], ['a girl with long hair', '長い髪の女の子（特徴を伴う）。', '特徴'], ['I agree with you.', 'あなたに賛成だ（同じ側にいる）。', '抽象'], ['How do you deal with stress?', 'ストレスにどう対処する？（向き合う）。', '抽象']], ''],
    ['over', 'prep', 'over', '上を覆う・越えて', '上に「弧を描いて覆う・越える」イメージ。接触はしないことが多い。数・時間を越える意味にも。',
      () => box(70, 70, 60, 40) + arr('M30 104 Q100 -10 170 104') + t(100, 124, '上を越えていく'),
      [['The plane flew over the mountains.', '飛行機が山の上を越えて飛んだ。', '具体'], ['Put a blanket over the baby.', '赤ちゃんに毛布をかけて（覆う）。', '覆う'], ['over 100 people', '100人を超える人々（数を越える）。', '数'], ['Prices rose over the past decade.', '過去10年にわたって物価が上がった（期間全体を覆う）。', '期間'], ['The meeting is over.', '会議は終わった（越えてしまった）。', '抽象']], 'above は「より上の位置」だけ、over は「覆う・越える」動きのイメージがあります。'],
    ['under', 'prep', 'under', '下に・覆われて', '何かの「真下にある・覆われている」イメージ。圧力や支配の下、基準より下の意味にも。',
      () => `<rect x="35" y="44" width="130" height="10" rx="3" fill="var(--im-lms)"/>` + ball(100, 82) + t(100, 118, '下にある'),
      [['The cat is under the table.', '猫はテーブルの下にいる。', '具体'], ['Students are under pressure.', '学生はプレッシャーの下にある。', '抽象'], ['Children under 12 travel free.', '12歳未満の子どもは無料（基準より下）。', '数'], ['The road is under construction.', 'その道路は工事中だ（作業の下にある）。', '状態']], ''],
    ['above', 'prep', 'above / below', '基準より上／下（接触なし）', 'ある「基準の線」より上か下かだけを表します。接触しない位置関係です。',
      () => ln(20, 68, 180, 68, 'var(--im-lms)', 2, true) + t(185, 72, '基準', 'end') + ball(70, 36) + t(70, 18, 'above') + ball(130, 98, 11, 'var(--im-hi)') + t(130, 124, 'below'),
      [['The town is 500 metres above sea level.', 'その町は海抜500メートルにある。', '具体'], ['Her score was above average.', '彼女の点は平均より上だった。', '抽象'], ['Temperatures fell below zero.', '気温が氷点下に下がった。', '数'], ['See the chart below.', '下の図を見てください。', '位置']], 'グラフ問題で above / below the average はよく使います。'],
    ['through', 'prep', 'through', '通り抜ける', 'トンネルのように、中に入って「反対側へ抜ける」イメージ。期間を通して、手段を通じて、の意味にも。',
      () => box(60, 38, 80, 54) + arr('M18 65 H184') + t(100, 112, '中を通り抜ける'),
      [['The train went through a tunnel.', '電車はトンネルを通り抜けた。', '具体'], ['We walked through the park.', '公園を通り抜けて歩いた。', '具体'], ['It rained all through the night.', '一晩中ずっと雨が降った（最初から最後まで）。', '時'], ['I found the job through a friend.', '友人を通じてその仕事を見つけた（経由）。', '手段'], ['She went through a difficult time.', '彼女はつらい時期を経験した（くぐり抜けた）。', '抽象']], ''],
    ['across', 'prep', 'across', '横切って（平面の向こうへ）', '川や道路など、平面を「端から端へ横切る」イメージ。',
      () => `<rect x="70" y="14" width="60" height="102" fill="var(--im-hi)" opacity=".25"/>` + t(100, 124, '川・道') + arr('M30 65 H170') + ball(22, 65, 8),
      [['Walk across the road carefully.', '道路を注意して渡って。', '具体'], ['The bank is across the street.', '銀行は通りの向こう側にある。', '位置'], ['The virus spread across the world.', 'ウイルスは世界中に広がった（端から端まで）。', '抽象']], 'through は「立体の中を通る」、across は「平面の上を横切る」。'],
    ['along', 'prep', 'along', '〜に沿って', '細長いものに「沿って進む」イメージ。',
      () => `<path d="M10 98 C60 86 140 110 190 96" fill="none" stroke="var(--im-hi)" stroke-width="8" opacity=".4"/>` + arr('M24 76 C70 64 130 88 178 74') + t(100, 120, '川・道に沿って'),
      [['We walked along the river.', '川沿いを歩いた。', '具体'], ['There are shops along the street.', '通り沿いに店が並んでいる。', '位置'], ['I get along well with my colleagues.', '同僚とうまくやっている（一緒に沿って進む）。', '抽象']], ''],
    ['into', 'prep', 'into', '中へ（外→中の動き）', 'in の「中」に、to の「到達」が合わさったイメージ。外から中に入る動き。変化の意味にも。',
      () => box(104, 26, 76, 80) + ball(26, 66, 8) + arr('M36 66 H146') + t(142, 122, '中へ入る'),
      [['She walked into the room.', '彼女は部屋に入ってきた。', '具体'], ['Translate this into English.', 'これを英語に訳して（別の形の中へ）。', '変化'], ['The old factory was turned into flats.', '古い工場はアパートに変えられた。', '変化'], ['Police are looking into the case.', '警察がその事件を調べている（中をのぞき込む）。', '抽象']], ''],
    ['out', 'prep', 'out of', '中から外へ', 'into の逆。中から「外に出る」イメージ。なくなる・外れる意味にも。',
      () => box(20, 26, 76, 80) + ghost(56, 66) + arr('M66 66 H176') + t(58, 122, '中から外へ'),
      [['He got out of the car.', '彼は車から降りた。', '具体'], ['We have run out of milk.', '牛乳を切らした（中から全部出た）。', '抽象'], ['The lift is out of order.', 'エレベーターは故障中だ（正常な状態の外）。', '状態'], ['Find out the answer.', '答えを見つけ出して（隠れた所から外へ）。', '句動詞']], ''],
    ['off', 'prep', 'off', '接触から離れる', 'on（接触）の反対。くっついていたものが「離れる」イメージ。',
      () => `<rect x="20" y="88" width="160" height="10" rx="3" fill="var(--im-lms)"/>` + ghost(80, 76) + arr('M90 70 Q112 44 128 40') + ball(140, 36) + t(100, 120, '表面から離れる'),
      [['Get off the bus here.', 'ここでバスを降りて（バスから離れる）。', '具体'], ['Turn off the light.', '電気を消して（電気の流れから離れる）。', '抽象'], ['I have a day off tomorrow.', '明日は休みだ（仕事から離れる日）。', '抽象'], ['The plane took off.', '飛行機が離陸した（地面から離れた）。', '句動詞'], ['The match was called off.', '試合は中止された。', '句動詞']], 'on / off はスイッチのイメージ：turn on（つなぐ）、turn off（離す）。'],
    ['up', 'prep', 'up', '上へ・完全に', '上へ向かうイメージ。そこから「最後までやりきる・完全に」の意味が生まれます。',
      () => ln(40, 116, 160, 116, 'var(--im-lms)', 3) + arr('M100 110 V30') + ball(100, 22, 9) + t(150, 70, '上へ／最後まで'),
      [['Stand up, please.', '立ってください。', '具体'], ['Prices went up.', '物価が上がった。', '数'], ['Eat up your vegetables.', '野菜を全部食べなさい（完全に）。', '完了'], ['Don\'t give up.', 'あきらめないで（手放しきる）。', '句動詞'], ['She came up with a great idea.', '彼女はすばらしい考えを思いついた（浮かび上がる）。', '句動詞']], ''],
    ['down', 'prep', 'down', '下へ・減る・落ち着く', '下へ向かうイメージ。減少・記録して固定・落ち着くの意味に。',
      () => ln(40, 116, 160, 116, 'var(--im-lms)', 3) + arr('M100 18 V102') + t(150, 70, '下へ／減る'),
      [['Sit down.', '座って。', '具体'], ['Unemployment has gone down.', '失業率が下がった。', '数'], ['Write down your name.', '名前を書き留めて（紙の上に固定）。', '句動詞'], ['Calm down.', '落ち着いて。', '状態'], ['My car broke down.', '車が故障した（動かなくなる）。', '句動詞']], ''],
    ['around', 'prep', 'around', 'ぐるりと周りに・だいたい', '中心の周りを「ぐるっと回る・取り囲む」イメージ。数字に付くと「だいたい」に。',
      () => box(82, 48, 36, 34) + `<path d="M100 22 A44 40 0 1 1 58 72" fill="none" stroke="var(--im-ar)" stroke-width="3" marker-end="url(#ia)"/>` + t(100, 124, '周りをぐるり'),
      [['We walked around the lake.', '湖の周りを歩いた。', '具体'], ['She travelled around the world.', '世界中を旅した（あちこち回る）。', '場所'], ['It costs around £50.', '約50ポンドだ（50の周り）。', '数'], ['I\'ll see you around six.', '6時ごろに会おう。', '時']], ''],
    ['between', 'prep', 'between', '2つの間', 'はっきり2つ（または区別できる複数）の「間」にあるイメージ。',
      () => box(18, 40, 38, 50) + box(144, 40, 38, 50) + ball(100, 65) + t(37, 108, 'A') + t(163, 108, 'B'),
      [['The bank is between the café and the hotel.', '銀行はカフェとホテルの間にある。', '具体'], ['between 2010 and 2020', '2010年から2020年の間に。', '時'], ['the difference between A and B', 'AとBの違い。', '抽象']], 'グラフ問題では between 2010 and 2020 が頻出。'],
    ['among', 'prep', 'among', '多くの中に混じって', '区別できない「たくさんの中に紛れている」イメージ。',
      () => [[40, 40], [70, 30], [130, 32], [160, 44], [50, 80], [150, 84], [80, 98], [120, 96], [100, 30]].map(([x, y]) => ball(x, y, 9, 'var(--im-lms)')).join('') + ball(100, 64) + t(100, 124, 'たくさんの中の一つ'),
      [['a house among the trees', '木々の間に建つ家。', '具体'], ['Smartphones are popular among teenagers.', 'スマホは10代の間で人気だ。', '抽象']], ''],
    ['behind', 'prep', 'behind / in front of', '後ろ／前', '見る人から見て、物の「後ろに隠れる」か「手前にある」か。',
      () => person(20, 70) + box(90, 40, 40, 56) + ball(156, 68, 11) + t(156, 100, 'behind') + ball(60, 68, 11, 'var(--im-hi)') + t(60, 100, 'in front of') + t(20, 116, '見る人'),
      [['The car park is behind the building.', '駐車場は建物の裏にある。', '具体'], ['There is a bus stop in front of the hotel.', 'ホテルの前にバス停がある。', '具体'], ['Japan is behind in digital technology.', '日本はデジタル技術で遅れている。', '抽象']], ''],
    ['against', 'prep', 'against', '〜に逆らって・寄りかかって', '壁などに「向かって押し付ける・ぶつかる」イメージ。そこから「反対・対抗」の意味に。',
      () => `<rect x="148" y="14" width="14" height="102" rx="3" fill="var(--im-lms)"/>` + arr('M30 65 H120') + ball(134, 65) + ln(146, 50, 146, 80, 'var(--im-tr)', 2) + t(90, 118, '向かって押す'),
      [['He leaned against the wall.', '彼は壁に寄りかかった。', '具体'], ['Many residents are against the plan.', '多くの住民がその計画に反対だ。', '抽象'], ['It\'s against the law.', 'それは法律違反だ（法に逆らう）。', '抽象'], ['the fight against crime', '犯罪との闘い。', '抽象']], 'Task 2 で「〜に反対だ」は be against 〜 / be opposed to 〜。'],
    ['towards', 'prep', 'towards', '〜の方へ（方向）', '到達は気にせず「方向」だけを示すイメージ。気持ちや態度が向かう先にも。',
      () => ball(28, 92, 8) + arr('M38 86 L150 30') + ln(156, 26, 176, 16, 'var(--im-ar)', 3, true) + t(120, 118, 'その方向へ'),
      [['He walked towards the station.', '彼は駅の方へ歩いた。', '具体'], ['There is a trend towards online shopping.', 'ネット通販への傾向がある。', '抽象'], ['Attitudes towards immigration are changing.', '移民に対する考え方が変わりつつある。', '抽象']], ''],
    ['beyond', 'prep', 'beyond', '境界を越えた向こう', 'ある「境界線の向こう側」にあるイメージ。能力や理解の範囲を越える意味にも。',
      () => `<path d="M70 104 L100 34 L130 104 Z" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/>` + ball(166, 92) + arr('M40 92 Q100 0 156 84', true) + t(100, 122, '境界の向こう'),
      [['There is a village beyond the hills.', '丘の向こうに村がある。', '具体'], ['The situation is beyond our control.', '状況は私たちの手に負えない。', '抽象'], ['This is beyond my understanding.', 'これは私の理解を越えている。', '抽象']], ''],
    ['within', 'prep', 'within', '範囲の内側に（以内）', '決められた「枠の内側」に収まるイメージ。時間や距離の「以内」。',
      () => `<path d="M40 30 H30 V100 H40 M160 30 H170 V100 H160" fill="none" stroke="var(--im-ar)" stroke-width="3"/>` + ball(100, 65) + t(100, 122, '枠の内側'),
      [['Reply within 24 hours.', '24時間以内に返信して。', '時'], ['The hotel is within walking distance.', 'ホテルは歩いて行ける距離にある。', '距離'], ['within the budget', '予算内で。', '抽象']], ''],
    ['during', 'time', 'during', '（出来事の）間に', '特定の出来事・期間の「最中のどこか」。後ろには名詞（the summer, the meeting）が来ます。',
      () => axis(`<rect x="50" y="80" width="110" height="14" rx="4" fill="var(--im-hi)" opacity=".3"/>${t(80, 72, '夏休み')}${ball(90, 87, 7)}`),
      [['I worked part-time during the summer.', '夏の間アルバイトをした。', '時'], ['Please don\'t talk during the exam.', '試験中は話さないで。', '時']], 'during + 名詞（during the holiday）、while + 文（while I was on holiday）。for は「長さ」（for two weeks）。'],
    ['for-time', 'time', 'for（期間）', 'その長さの間ずっと', '期間の「長さ」を表します。数字＋単位（three years, two hours）と一緒に使います。',
      () => axis(`${ln(40, 80, 110, 80, 'var(--im-tr)', 4)}<path d="M40 72 V88 M110 72 V88" stroke="var(--im-tr)" stroke-width="2"/>${t(75, 70, '3 years')}`),
      [['I have lived here for three years.', 'ここに3年住んでいる。', '時'], ['We waited for two hours.', '2時間待った。', '時']], ''],
    ['since', 'time', 'since', '〜から今までずっと', '過去の「起点から今まで」続いているイメージ。現在完了と一緒に使います。',
      () => axis(`${ball(50, 96, 7, 'var(--im-hi)')}${t(50, 84, '2020')}${arr('M58 96 H114')}`),
      [['I have studied English since 2020.', '2020年から英語を勉強している。', '時'], ['She has been ill since last week.', '彼女は先週からずっと具合が悪い。', '時']], 'since の後は起点（2020, last week）、for の後は期間（three years）。'],
    ['until', 'time', 'until', '〜までずっと（継続）', 'ある時点まで「ずっと続く」イメージ。終点で状態が終わります。',
      () => axis(`${ln(118, 82, 165, 82, 'var(--im-tr)', 4)}${ln(165, 72, 165, 92, 'var(--im-hi)', 3)}${t(165, 66, '金曜')}${t(126, 72, 'ずっと続く')}`),
      [['I will stay here until Friday.', '金曜日までずっとここにいる。', '時'], ['The shop is open until 9 p.m.', '店は午後9時まで開いている。', '時']], 'until は「ずっと」、by は「までに一度」。I\'ll wait until 5.（5時まで待つ）／Finish it by 5.（5時までに終える）'],
    ['by-time', 'time', 'by（期限）', '〜までに（期限）', '期限の線より「前のどこか」で一度起これば良い、というイメージ。',
      () => axis(`${ln(165, 72, 165, 92, 'var(--im-hi)', 3)}${t(165, 66, '金曜')}${ball(140, 87, 7)}${t(112, 72, 'この前のどこかで')}`),
      [['Please submit it by Friday.', '金曜日までに提出して。', '時'], ['By 2050, the population will reach 10 million.', '2050年までに人口は1000万人に達する。', '時']], ''],
    ['present', 'tense', '現在形', 'いつもそう（習慣・事実）', '過去も今も未来も「いつもそう」であることを表します。今この瞬間だけの話ではありません。',
      () => axis([30, 58, 86, 118, 148, 172].map(x => ball(x, 70, 6)).join('') + t(64, 50, 'いつも・くり返し')),
      [['I walk to work every day.', '毎日歩いて通勤する（習慣）。', '習慣'], ['Water boils at 100°C.', '水は100度で沸騰する（事実）。', '事実']], 'エッセイの一般論（Technology changes our lives.）は現在形。'],
    ['progressive', 'tense', '現在進行形', '今まさに途中', '「今」を中心に、始まっていてまだ終わっていない動作。一時的な状態にも使います。',
      () => axis(wave(84, 152, 70) + t(118, 44, '今まさに進行中')),
      [['I\'m studying English now.', '今英語を勉強している。', '今'], ['More people are working from home.', 'より多くの人が在宅勤務をしている（変化の途中）。', '変化']], ''],
    ['past', 'tense', '過去形', '終わったこと（今とは切れている）', '過去の一点で起きて、今とは「切り離された」出来事。',
      () => axis(ball(54, 70, 9) + ln(70, 70, 104, 70, 'var(--im-lms)', 2, true) + `<path d="M98 60 L110 80 M110 60 L98 80" stroke="var(--im-tr)" stroke-width="2"/>` + t(54, 54, '終わった') + t(96, 32, '今とは切れる')),
      [['I visited Kyoto last year.', '去年京都を訪れた。', '過去'], ['The company was founded in 1990.', 'その会社は1990年に設立された。', '過去']], 'yesterday / last year / in 2019 と一緒に使うのは過去形。'],
    ['perfect', 'tense', '現在完了', '過去から今につながる', '過去に始まったことが「今まで続いている・今に影響している」イメージ。',
      () => axis(ball(44, 70, 7, 'var(--im-hi)') + arr('M52 70 H112') + ball(118, 70, 8) + t(80, 48, '今につながる')),
      [['I have lived here since 2020.', '2020年からここに住んでいる（継続）。', '継続'], ['I have visited London three times.', 'ロンドンに3回行ったことがある（経験）。', '経験'], ['Prices have risen sharply.', '物価が急上昇した（今も高い＝結果）。', '結果']], 'グラフの「〜年以来増えている」やエッセイの In recent years, … has increased で活躍します。'],
    ['pastperfect', 'tense', '過去完了', '過去のある時点よりさらに前', '過去の基準点より「もっと前」に起きたことを表します。',
      () => axis(ball(36, 70, 7) + arr('M44 70 H72') + ball(80, 70, 8, 'var(--im-hi)') + t(34, 54, 'もっと前') + t(84, 32, '過去の基準')),
      [['When I arrived, the train had left.', '着いたときには電車は出てしまっていた。', '過去'], ['It was the first time I had seen snow.', '雪を見たのはそれが初めてだった。', '経験']], ''],
    ['future', 'tense', 'will / be going to', '未来（その場の判断／前からの予定）', 'will は今その場で決めたことや予測、be going to は前から決めていた予定や、今の状況から見える未来。',
      () => axis(arr('M120 62 H168', true) + ball(176, 62, 8) + t(146, 48, 'will：予測') + `<path d="M70 86 Q95 70 120 80 T172 80" fill="none" stroke="var(--im-tr)" stroke-width="3" marker-end="url(#ia)"/>` + t(58, 74, 'going to：前から決めた')),
      [['I think it will rain tomorrow.', '明日は雨が降ると思う（予測）。', '予測'], ['I\'m going to take IELTS in March.', '3月にIELTSを受ける予定だ（決めている）。', '予定']], ''],
    ['a', 'article', 'a / an', 'たくさんある中の「どれか一つ」', '聞き手にとって特定されていない、同じ種類のうちの「ひとつ」。初めて話題に出すときに使います。',
      () => [40, 75, 110, 145].map(x => ball(x, 60, 12, 'var(--im-lms)')).join('') + `<circle cx="110" cy="60" r="18" fill="none" stroke="var(--im-tr)" stroke-width="3"/>` + t(100, 104, 'どれでもいい一つ'),
      [['I bought a car.', '車を一台買った（初めての話題）。', '基本'], ['She is a doctor.', '彼女は医者だ（医者の一人）。', '職業']], ''],
    ['the', 'article', 'the', '「あれね」とお互いにわかる', '話し手と聞き手の両方が「どれのことか」わかっているもの。スポットライトが当たっているイメージ。',
      () => `<path d="M100 8 L72 96 L128 96 Z" fill="var(--im-tr)" opacity=".18"/>` + [40, 100, 160].map(x => ball(x, 84, 12, x === 100 ? 'var(--im-tr)' : 'var(--im-lms)')).join('') + t(100, 120, 'それ（特定）'),
      [['The car is red.', 'その車は赤い（さっき話した車）。', '特定'], ['the sun / the internet', '太陽／インターネット（一つしかない）。', '唯一'], ['the government', '政府（どの政府かわかる）。', '唯一']], ''],
    ['zero', 'article', '無冠詞（一般論）', '「〜というもの」全般', '特定のものではなく、その種類全体をぼんやり指すイメージ。数えられる名詞は複数形にします。',
      () => `<ellipse cx="100" cy="60" rx="78" ry="44" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2" stroke-dasharray="5 4"/>` + [[60, 50], [90, 70], [120, 44], [145, 66], [80, 36], [110, 84]].map(([x, y]) => ball(x, y, 8, 'var(--im-hi)')).join('') + t(100, 122, 'その種類まるごと'),
      [['Children need love.', '子どもには愛が必要だ（子ども全般）。', '一般論'], ['Pollution is a serious problem.', '汚染は深刻な問題だ。', '不可算']], 'エッセイの一般論は無冠詞の複数形（Cars cause pollution.）が基本。'],
    ['get', 'verb', 'get', 'ある状態・物を手に入れる（移動の結果）', '何かが自分のところへ「やってきて、手元に収まる」イメージ。物だけでなく、場所や状態にも「到達」します。',
      () => person(150, 72, '自分') + ball(40, 60) + arr('M54 62 Q96 40 132 58'),
      [['I got a letter.', '手紙を受け取った（物が手元に来る）。', '具体'], ['What time did you get home?', '何時に家に着いた？（場所に到達）。', '移動'], ['It\'s getting dark.', '暗くなってきた（状態に到達）。', '変化'], ['I get it.', 'わかった（意味を手に入れる）。', '抽象']], ''],
    ['take', 'verb', 'take', '自分の方へ取り込んで持っていく', '手を伸ばして「取り、自分のものとして持っていく」イメージ。時間・乗り物・行動を「取る」にも。',
      () => person(60, 72, '自分') + ball(150, 60) + arr('M140 60 Q110 34 80 54') + t(150, 40, '取る'),
      [['Take an umbrella with you.', '傘を持っていって。', '具体'], ['I take the train to work.', '電車で通勤する（乗り物を選び取る）。', '交通'], ['It takes an hour.', '1時間かかる（時間を取る）。', '時間'], ['Take a break.', '休憩を取って。', '行動'], ['Measures should be taken.', '対策が取られるべきだ。', '抽象']], ''],
    ['give', 'verb', 'give', '自分から相手へ渡す', '自分の手元から「相手へ移す」イメージ。物だけでなく、情報・影響・機会も渡せます。',
      () => person(36, 72, '自分') + person(164, 72, '相手') + ball(100, 50) + arr('M56 58 Q100 24 144 56'),
      [['She gave me a present.', '彼女は私にプレゼントをくれた。', '具体'], ['Give me some advice.', 'アドバイスをください。', '情報'], ['Travel gives you a new perspective.', '旅は新しい視点を与えてくれる。', '抽象'], ['Don\'t give up.', 'あきらめないで（手放してしまう）。', '句動詞']], ''],
    ['have', 'verb', 'have', '自分の範囲の中に持っている', '自分の「領域の中にある」状態。持ち物だけでなく、経験・病気・予定・関係にも。',
      () => `<circle cx="100" cy="62" r="48" fill="var(--im-lm)" stroke="var(--im-hi)" stroke-width="2" stroke-dasharray="5 4"/>` + person(84, 74) + ball(124, 60) + t(100, 124, '自分の範囲の中'),
      [['I have two brothers.', '兄弟が2人いる。', '具体'], ['I have a headache.', '頭痛がする（体の中にある）。', '体'], ['We have a meeting at 3.', '3時に会議がある（予定を抱えている）。', '予定'], ['Have a good time!', '楽しんで！（時間を持つ）。', '抽象']], ''],
    ['make', 'verb', 'make', '手を加えて新しく作り出す', '材料に手を加えて「別のものを生み出す」イメージ。状態や結果を生み出す意味にも。',
      () => [[30, 50], [44, 74], [58, 52]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="16" rx="3" fill="var(--im-lms)"/>`).join('') + arr('M84 64 H130') + ball(156, 64, 16) + t(100, 118, '材料 → 新しいもの'),
      [['I made a cake.', 'ケーキを作った。', '具体'], ['Don\'t make a mistake.', '間違いをしないで（間違いを生み出す）。', '行動'], ['The news made me happy.', 'その知らせで嬉しくなった（状態を作る）。', '使役'], ['We need to make a decision.', '決断する必要がある。', '抽象']], ''],
    ['put', 'verb', 'put', 'ある場所に置く', 'ものを「ある位置に動かして置く」イメージ。状態や言葉をある所に置く意味にも。',
      () => `<rect x="30" y="96" width="140" height="8" rx="3" fill="var(--im-lms)"/>` + ghost(80, 30) + arr('M88 40 Q110 60 112 80') + ball(116, 86, 10) + t(100, 122, 'そこに置く'),
      [['Put your bag here.', 'かばんをここに置いて。', '具体'], ['Put on your coat.', 'コートを着て（体に置く）。', '句動詞'], ['Don\'t put off your homework.', '宿題を先延ばしにしないで（離れた所に置く）。', '句動詞'], ['I can\'t put up with the noise.', '騒音に我慢できない。', '句動詞']], ''],
    ['come', 'verb', 'come', '話し手（中心）の方へ来る', '話題の中心に「近づいてくる」イメージ。相手の所へ行くときも、相手が中心なので come を使います。',
      () => person(162, 72, '話の中心') + ball(36, 64) + arr('M50 64 H138'),
      [['Come here.', 'こっちに来て。', '具体'], ['I\'m coming!', '今行きます！（相手の所へ＝相手が中心）。', '相手'], ['Spring has come.', '春が来た。', '時'], ['She came up with an idea.', '彼女はアイデアを思いついた（頭に浮かんできた）。', '句動詞']], 'Dinner\'s ready! への返事は I\'m coming.（I\'m going. は「出かけます」に聞こえる）。'],
    ['go', 'verb', 'go', '中心から離れて行く', '今いる所・話の中心から「離れていく」イメージ。物事が進む・ある状態になる意味にも。',
      () => person(38, 72, '話の中心') + arr('M62 64 H150') + ball(164, 64),
      [['Let\'s go to the park.', '公園に行こう。', '具体'], ['How did the exam go?', '試験はどうだった？（進み具合）。', '進行'], ['The milk has gone bad.', '牛乳が腐った（悪い状態へ離れていく）。', '変化'], ['Prices went up.', '物価が上がった。', '句動詞']], ''],
    ['bring', 'verb', 'bring', '中心の方へ持ってくる', 'come ＋ 持つ。ものを「話の中心の方へ持ってくる」イメージ。take はその逆で「持っていく」。',
      () => person(162, 72, '話の中心') + person(60, 72) + ball(80, 54, 9) + arr('M92 54 H138'),
      [['Bring your passport.', 'パスポートを持ってきて。', '具体'], ['Technology has brought many changes.', 'テクノロジーは多くの変化をもたらした。', '抽象'], ['I was brought up in Osaka.', '大阪で育った（育てられた）。', '句動詞']], ''],
    ['keep', 'verb', 'keep', 'ある状態のまま保ち続ける', '手の中に「ずっと持ち続ける」イメージ。物も状態も、変えずに保ちます。',
      () => `<circle cx="100" cy="62" r="40" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/>` + ball(100, 62) + `<path d="M148 62 A48 48 0 1 1 100 14" fill="none" stroke="var(--im-ar)" stroke-width="3" marker-end="url(#ia)"/>` + t(100, 124, 'ずっと保つ'),
      [['Keep the change.', 'おつりは取っておいて。', '具体'], ['Keep the door closed.', 'ドアを閉めたままにして。', '状態'], ['Keep practising.', '練習を続けて。', '継続'], ['It\'s hard to keep up with technology.', 'テクノロジーについていくのは難しい。', '句動詞']], ''],
  ];
  const CAT = {prep: '前置詞（場所・方向）', time: '時を表す語', tense: '時制', article: '冠詞', verb: '基本動詞'};
  const BY = Object.fromEntries(E.map(e => [e[0], e]));
  // words that should show an image (the tested word in idioms, a tapped word)
  const ALIAS = {inside: 'in', onto: 'on', 'out': 'out', 'out of': 'out', toward: 'towards', below: 'above', 'in front of': 'behind', front: 'behind', an: 'a'};
  const keyFor = w => { const k = String(w || '').toLowerCase().trim(); return BY[k] ? k : ALIAS[k] || null; };

  const pic = e => `<div class="imsvg">${svg(e[5]())}</div>`;
  function card(e) {
    return `<button class="imcard" data-act="imopen" data-k="${e[0]}"><span class="w">${esc(e[2])}</span><span class="core">${esc(e[3])}</span>${pic(e)}</button>`;
  }
  window.IMG_SMALL = w => { const k = keyFor(w); if (!k) return ''; const e = BY[k];
    return `<div class="imsmall"><div class="imsvg">${svg(e[5]())}</div><div><b>${esc(e[2])}</b><br><span>${esc(e[3])}</span><br><button class="btn ghost" data-act="imopen" data-k="${e[0]}" style="padding:2px 0">イメージ図鑑で見る →</button></div></div>`; };
  window.IMG_CARDS = keys => `<div class="imgrid">${keys.map(k => BY[k]).filter(Boolean).map(card).join('')}</div>`;

  ui.img = {cat: 'prep', open: null};
  function vImages() {
    const g = ui.img;
    if (g.open) {
      const e = BY[g.open], same = E.filter(x => x[1] === e[1]), i = same.indexOf(e);
      return `<div class="row"><button class="btn" data-act="imback">← 図鑑に戻る</button><span class="small muted">${esc(CAT[e[1]])} · ${i + 1} / ${same.length}</span></div>
        <article class="sheet panel">
          <div><span class="hw" style="font-size:40px">${esc(e[2])}</span> <span class="core" style="font-size:18px;font-weight:700;color:var(--accent);margin-left:8px">${esc(e[3])}</span></div>
          <div class="imdetail"><div class="panel" style="gap:10px">${pic(e)}<p>${esc(e[4])}</p>${e[7] ? `<div class="ltip" style="background:var(--accent-soft);border-radius:10px;padding:10px 14px;font-size:14px">${esc(e[7])}</div>` : ''}</div>
            <div class="imsteps"><b class="small">具体的な意味から、抽象的な意味へ広がる</b>${e[6].map(([en, ja, lv]) => `<div><span class="lvl">${esc(lv)}</span><button class="iconbtn" data-act="say" data-text="${esc(en)}" aria-label="再生">${ICON.speak}</button><span class="ex">${esc(en)}</span><span class="jp">${esc(ja)}</span></div>`).join('')}</div></div>
          <div class="row" style="justify-content:space-between">${i > 0 ? `<button class="btn" data-act="imopen" data-k="${same[i - 1][0]}">← ${esc(same[i - 1][2])}</button>` : '<span></span>'}${i + 1 < same.length ? `<button class="btn primary" data-act="imopen" data-k="${same[i + 1][0]}">${esc(same[i + 1][2])} →</button>` : ''}</div>
        </article>`;
    }
    const list = E.filter(e => e[1] === g.cat);
    return `<div class="sheet panel" style="gap:8px"><b>イメージ図鑑</b><p class="small muted">英語の基本語は、ひとつの「コアイメージ」から意味が広がっています。図で核のイメージをつかむと、in Tokyo / in 2020 / in love のような使い分けが丸暗記なしで理解できます。</p>
      <div class="chips">${Object.entries(CAT).map(([k, v]) => `<button class="chip" data-act="imcat" data-v="${k}" aria-pressed="${g.cat === k}" style="font-family:var(--f-ui)">${v}</button>`).join('')}</div></div>
      <div class="imgrid">${list.map(card).join('')}</div>`;
  }
  Object.assign(ACT, {
    imcat: d => { ui.img.cat = d.v; ui.img.open = null; render(); },
    imopen: d => { const e = BY[d.k]; if (!e) return; ui.img.cat = e[1]; ui.img.open = d.k; S.tab = 'images'; save(); render(); scrollTo({top: 0}); document.querySelector('.lkpop')?.setAttribute('hidden', ''); },
    imback: () => { ui.img.open = null; render(); },
  });
  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), images: vImages};
  render();
})();
