/* イメージ図鑑: core-image diagrams for prepositions, time words, tenses, articles and basic verbs.
   Each entry: a drawing, the core meaning, and examples that go from concrete to abstract. */
(() => {
  const css = `
  :root{--im-lm:#FFF0E6;--im-lms:#BBA89E;--im-tr:#FF8576;--im-ar:#2FAE93;--im-hi:#7D8CF2;--im-tx:#7A6860;--im-skin:#FFE3CF;--im-face:#4A3838;--im-blush:#FF9EAE}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--im-lm:#3A2F35;--im-lms:#A89890;--im-tr:#FF9A8C;--im-ar:#5ED6B9;--im-hi:#A0ACFF;--im-tx:#D3C3BB;--im-skin:#FFE3CF;--im-face:#4A3838;--im-blush:#FF9EAE}}
  :root[data-theme="dark"]{--im-lm:#3A2F35;--im-lms:#A89890;--im-tr:#FF9A8C;--im-ar:#5ED6B9;--im-hi:#A0ACFF;--im-tx:#D3C3BB;--im-skin:#FFE3CF;--im-face:#4A3838;--im-blush:#FF9EAE}
  .imgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
  .imcard{background:var(--surface);border:1.5px solid var(--line);border-radius:20px;box-shadow:var(--shadow);transition:transform .15s,box-shadow .15s;padding:12px 14px;display:flex;flex-direction:column;gap:6px;text-align:left;cursor:pointer;min-width:0}
  .imcard:hover{border-color:var(--accent);transform:translateY(-3px) rotate(-.4deg)}
  .imcard .w{font-family:var(--f-word);font-size:24px;font-weight:700;line-height:1.1}
  .imcard .core{font-weight:700;font-size:14px;color:var(--accent)}
  .imsvg{background:linear-gradient(180deg,var(--sky) 0%,var(--sunk) 100%);border-radius:16px;padding:4px}
  .imsvg svg{display:block;width:100%;height:auto}
  .imsvg text{font:700 10.5px var(--f-ui);fill:var(--im-tx)}
  .imdetail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:18px;align-items:start}
  @media (max-width:700px){.imdetail{grid-template-columns:minmax(0,1fr)}}
  .imsteps{display:flex;flex-direction:column;gap:8px;counter-reset:st}
  .imsteps div{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;background:var(--sunk);border-radius:16px;padding:10px 12px}
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

  /* ---------- people & scene helpers (pictogram style; feet on the ground at y) ---------- */
  const G = 108;
  // chibi pictogram: skin-coloured round head with hair cap, dot eyes, blush and a smile
  const fig = (x, y = G, o = {}) => {
    const c = o.c || 'var(--im-tr)', s = o.s || 1, f = o.flip ? -1 : 1, p = o.p || 'stand';
    const L = (a, b, cc, d) => `<line x1="${a}" y1="${b}" x2="${cc}" y2="${d}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
    const pose = {
      stand: L(-3, -10, -4, -1) + L(3, -10, 4, -1) + L(-7, -21, -12, -12) + L(7, -21, 12, -12),
      walk: L(-3, -10, -9, -1) + L(3, -10, 8, -1) + L(-7, -21, -13, -14) + L(7, -21, 14, -17),
      jump: L(-3, -10, -10, -3) + L(3, -10, 10, -5) + L(-7, -21, -15, -32) + L(7, -21, 15, -32),
      wave: L(-3, -10, -4, -1) + L(3, -10, 4, -1) + L(-7, -21, -12, -12) + L(7, -21, 14, -36),
      sit: L(-3, -10, 8, -10) + L(8, -10, 8, -1) + L(-7, -21, -11, -13) + L(7, -21, 13, -15),
      lean: L(-3, -10, -6, -1) + L(3, -10, 0, -1) + L(-7, -21, -12, -13) + L(7, -21, 15, -20),
      carry: L(-3, -10, -8, -1) + L(3, -10, 8, -1) + L(-7, -21, 12, -19) + L(7, -21, 15, -19),
      give: L(-3, -10, -4, -1) + L(3, -10, 4, -1) + L(-7, -21, -12, -12) + L(7, -21, 19, -22),
    }[p];
    const face = `<circle cx="0" cy="-35" r="11.5" fill="var(--im-skin)" stroke="${c}" stroke-width="1.5"/>`
      + `<path d="M-11.5 -36 A11.5 11.5 0 0 1 11.5 -36 Q8 -40 4 -38 Q0 -42 -4 -38 Q-8 -40 -11.5 -36Z" fill="${c}"/>`
      + `<circle cx="-4" cy="-34" r="1.6" fill="var(--im-face)"/><circle cx="4" cy="-34" r="1.6" fill="var(--im-face)"/>`
      + `<circle cx="-7" cy="-30.5" r="2.2" fill="var(--im-blush)" opacity=".7"/><circle cx="7" cy="-30.5" r="2.2" fill="var(--im-blush)" opacity=".7"/>`
      + `<path d="M-2.4 -30.5 Q0 -28 2.4 -30.5" fill="none" stroke="var(--im-face)" stroke-width="1.3" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y})${o.rot ? ` rotate(${o.rot})` : ''} scale(${f * s} ${s})">${pose}<rect x="-8" y="-25" width="16" height="17" rx="7" fill="${c}"/>${face}</g>`;
  };
  const grey = 'var(--im-lms)', blue = 'var(--im-hi)';
  const ground = (y = G, x1 = 6, x2 = 194) => ln(x1, y, x2, y, 'var(--im-lms)', 2);
  const house = (x, w, h, o = {}) => `<path d="M${x - 6} ${G - h} L${x + w / 2} ${G - h - 24} L${x + w + 6} ${G - h} Z" fill="var(--im-lms)"/>`
    + `<rect x="${x}" y="${G - h}" width="${w}" height="${h}" fill="${o.cut ? 'var(--surface)' : 'var(--im-lm)'}" stroke="var(--im-lms)" stroke-width="2.5"/>`
    + (o.door === false ? '' : `<rect x="${o.doorX ?? x + w - 24}" y="${G - 30}" width="16" height="30" rx="2" fill="${o.open ? 'var(--surface)' : 'var(--im-lms)'}" stroke="var(--im-lms)" stroke-width="2"/>`);
  const sign = (x, label, y = G) => ln(x, y, x, y - 54, 'var(--im-lms)', 3) + `<rect x="${x - 24}" y="${y - 70}" width="48" height="18" rx="4" fill="var(--im-hi)"/><text x="${x}" y="${y - 57}" text-anchor="middle" style="font-weight:700;fill:#fff">${label}</text>`;
  const fence = (x1, x2, y = G) => { let s = ''; for (let x = x1; x <= x2; x += 10) s += ln(x, y, x, y - 24, 'var(--im-lms)', 3); return s + ln(x1 - 2, y - 18, x2 + 2, y - 18, 'var(--im-lms)', 3) + ln(x1 - 2, y - 8, x2 + 2, y - 8, 'var(--im-lms)', 3); };
  const tree = (x, y = G, s = 1) => `<rect x="${x - 4 * s}" y="${y - 30 * s}" width="${8 * s}" height="${30 * s}" fill="var(--im-lms)"/><circle cx="${x}" cy="${y - 46 * s}" r="${22 * s}" fill="var(--good-soft)" stroke="var(--im-lms)" stroke-width="2"/>`;
  const wall = (x, w = 12) => `<rect x="${x}" y="14" width="${w}" height="${G - 14}" fill="var(--im-lms)"/>`;
  const stairs = (up = true) => { const pts = []; for (let i = 0; i < 6; i++) { const x = 30 + i * 24, y = up ? G - i * 14 : G - (5 - i) * 14; pts.push(`${x},${y} ${x + 24},${y}`); if (i < 5) pts.push(`${x + 24},${up ? y - 14 : y + 14}`); } return `<polyline points="${pts.join(' ')}" fill="none" stroke="var(--im-lms)" stroke-width="3"/>`; };
  const mountain = (x, w, h) => `<path d="M${x} ${G} L${x + w / 2} ${G - h} L${x + w} ${G} Z" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/>`;
  const bus = (x, y) => `<rect x="${x}" y="${y}" width="96" height="44" rx="8" fill="var(--im-hi)" opacity=".85"/>` + [0, 1, 2].map(i => `<rect x="${x + 8 + i * 22}" y="${y + 8}" width="16" height="13" rx="2" fill="var(--surface)"/>`).join('') + `<rect x="${x + 76}" y="${y + 8}" width="14" height="34" rx="2" fill="var(--surface)"/><circle cx="${x + 20}" cy="${y + 46}" r="7" fill="var(--im-lms)"/><circle cx="${x + 72}" cy="${y + 46}" r="7" fill="var(--im-lms)"/>`;
  const label = (x, y, s) => `<text x="${x}" y="${y}" text-anchor="middle" style="font-weight:700;fill:var(--im-ar)">${s}</text>`;
  // timeline with small people
  const tl = (extra = '') => axis(extra);
  const mini = (x, o = {}) => fig(x, 96, {s: .5, ...o});

  /* ---------- entries ---------- */
  // [key, category, title, core, explanation, drawing, examples [en, ja, level 具体/抽象], tip]
  const E = [
    ['in', 'prep', 'in', '包まれている・中に', '何かに「囲まれて、中にある」イメージ。箱の中だけでなく、場所・年・状態の「範囲の中」にも広がります。',
      () => ground() + house(48, 104, 64, {cut: true, door: false}) + fig(100, G, {s: .85}) + label(100, 124, '家の中にいる'),
      [['The keys are in the drawer.', '鍵は引き出しの中にある。', '具体'], ['I live in Tokyo.', '東京に住んでいる（東京という範囲の中）。', '場所'], ['The company was founded in 2010.', '2010年（という期間の中）に設立された。', '時'], ['She is in love.', '恋をしている（恋という状態に包まれている）。', '状態'], ['Many species are in danger.', '多くの種が危険な状態にある。', '抽象']], 'at は「点」、in は「範囲」。駅に着くは arrive at the station、国や都市に着くは arrive in Japan。'],
    ['on', 'prep', 'on', 'くっついている（接触）', '上に乗っているだけでなく、「接触している」のが本質。壁に貼ってあっても、天井にくっついていても on です。',
      () => ground() + `<rect x="56" y="80" width="64" height="28" rx="3" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/>` + fig(88, 80) + wall(176) + `<rect x="158" y="36" width="18" height="24" rx="2" fill="var(--im-hi)"/>` + label(88, 124, '台の上に立つ') + label(158, 76, '壁に貼る'),
      [['There is a cup on the table.', 'テーブルの上にカップがある。', '具体'], ['There is a picture on the wall.', '壁に絵がかかっている（壁に接触）。', '具体'], ['The meeting is on Monday.', '会議は月曜日だ（その日にくっついた予定）。', '時'], ['It depends on the weather.', '天気次第だ（天気に寄りかかっている）。', '抽象'], ['She is on the phone.', '彼女は電話中だ（電話につながっている）。', '抽象']], 'on Monday（曜日）、on 5 May（日付）は「その日にくっついている」。'],
    ['at', 'prep', 'at', 'ピンポイント（一点）', '広がりを考えず、「ここ」と一点を指すイメージ。地図上の点、時計の針が指す時刻など。',
      () => ground() + sign(140, 'BUS') + fig(112) + `<ellipse cx="126" cy="${G}" rx="28" ry="5" fill="none" stroke="var(--im-ar)" stroke-width="2" stroke-dasharray="4 3"/>` + label(100, 124, 'バス停（この一点）にいる'),
      [['Let\'s meet at the station.', '駅で会おう（地図上の一点）。', '具体'], ['The class starts at nine.', '授業は9時に始まる（時刻という点）。', '時'], ['Look at this picture.', 'この絵を見て（視線を一点に向ける）。', '動作'], ['She is good at maths.', '彼女は数学が得意だ（得意な一点）。', '抽象'], ['Prices are at their highest level.', '物価は最高水準にある。', '抽象']], '同じ場所でも、点として見れば at the airport、建物の中を意識すれば in the airport。'],
    ['to', 'prep', 'to', '到達点まで届く', '矢印がゴールに「届いている」イメージ。方向だけでなく、相手や結果にまで届きます。',
      () => ground() + house(132, 56, 52, {doorX: 136}) + fig(40, G, {p: 'walk'}) + arr('M58 80 H130') + label(90, 124, 'ドアまで行き着く'),
      [['I go to school by bus.', 'バスで学校に行く（学校に到達）。', '具体'], ['Give this to your teacher.', 'これを先生に渡して（相手まで届く）。', '相手'], ['The shop is open from 9 to 5.', '9時から5時まで（終点まで）。', '時'], ['Cars contribute to air pollution.', '車は大気汚染の一因となる（結果に届く）。', '抽象'], ['I look forward to seeing you.', 'お会いするのを楽しみにしている（その時に向かって）。', '抽象']], 'to は届く、for は向かうだけ。leave for Tokyo は「東京に向けて出発」（まだ着いていない）。'],
    ['for', 'prep', 'for', '〜に向かって（目的・ため）', 'ゴールの方向を「向いている」けれど、届いているとは限らないイメージ。そこから「目的・〜のために」の意味に。',
      () => ground() + sign(166, 'TOKYO') + fig(36, G, {p: 'walk'}) + arr('M54 80 H104') + ln(112, 80, 134, 80, 'var(--im-ar)', 3, true) + label(96, 124, '東京へ向かう途中'),
      [['This train is for Osaka.', 'この電車は大阪行きだ（大阪の方へ向かう）。', '具体'], ['I\'m waiting for the bus.', 'バスを待っている（バスの方に気持ちが向く）。', '対象'], ['This present is for you.', 'このプレゼントはあなたのためのもの。', '目的'], ['I applied for the job.', 'その仕事に応募した（仕事を目指して）。', '目的'], ['She is famous for her films.', '彼女は映画で有名だ（理由）。', '理由']], '期間の for（for three years）は「その長さに向かって続く」と覚えると自然です。'],
    ['from', 'prep', 'from', '出発点（起点）', '矢印のスタート地点。場所・時間・原因・材料の「出どころ」を表します。',
      () => ground() + house(10, 56, 52, {open: true}) + fig(150, G, {p: 'walk'}) + arr('M64 80 H134') + label(40, 124, 'ここから') + label(150, 124, '出発'),
      [['I\'m from Japan.', '日本出身だ（出発点）。', '具体'], ['It takes ten minutes from here.', 'ここから10分かかる。', '場所'], ['He suffers from headaches.', '頭痛に悩まされている（原因が出どころ）。', '原因'], ['Cheese is made from milk.', 'チーズは牛乳から作られる（元の形が見えない材料）。', '材料'], ['This is different from that.', 'これはあれとは違う（あれから離れている）。', '抽象']], 'made from は材料が変化して見えない、made of は材料がそのまま見える（made of wood）。'],
    ['of', 'prep', 'of', '全体の一部・つながり', '大きなまとまりの「一部を切り取る」イメージ。所属・部分・中身を表します。',
      () => `<ellipse cx="100" cy="70" rx="88" ry="46" fill="none" stroke="var(--im-lms)" stroke-width="2" stroke-dasharray="5 4"/>` + [38, 69, 131, 162].map(x => fig(x, 102, {s: .7, c: grey})).join('') + fig(100, 102, {s: .7}) + label(100, 126, 'グループの中の一人'),
      [['a piece of cake', 'ケーキの一切れ（全体の一部）。', '具体'], ['one of my friends', '友達のうちの一人。', '部分'], ['the capital of France', 'フランスの首都（フランスに属する）。', '所属'], ['a cup of tea', 'カップ一杯の紅茶（中身）。', '中身'], ['I\'m proud of you.', 'あなたを誇りに思う（気持ちの対象とのつながり）。', '抽象']], 'most of the students（その学生たちの大部分）のように、of の後には特定のまとまり（the / my など）が来ます。'],
    ['by', 'prep', 'by', 'そばに・〜によって', '「すぐそば」にあるイメージ。そばにいて関わる→手段・行為者、そばまで迫る→期限、の意味に。',
      () => ground() + house(20, 72, 56, {door: false}) + `<rect x="36" y="66" width="18" height="16" fill="var(--surface)" stroke="var(--im-lms)" stroke-width="2"/>` + fig(120) + label(120, 124, 'すぐそばにいる'),
      [['She sat by the window.', '彼女は窓のそばに座った。', '具体'], ['I go to work by train.', '電車で通勤する（手段）。', '手段'], ['The book was written by a doctor.', 'その本は医者によって書かれた（行為者）。', '行為者'], ['Please finish it by Friday.', '金曜日までに終えて（期限のすぐ手前）。', '期限'], ['Sales increased by 10%.', '売上が10%増えた（差）。', '差']], 'by Friday（までに＝期限）と until Friday（までずっと＝継続）は日本人が最も混同する組み合わせです。'],
    ['with', 'prep', 'with', '一緒に・持って', '2つのものが「つながって一緒にある」イメージ。人・道具・特徴を伴います。',
      () => ground() + fig(84) + fig(116, G, {c: blue, flip: true}) + ln(95, 93, 105, 93, 'var(--im-ar)', 4) + label(100, 124, '一緒にいる'),
      [['I went shopping with my sister.', '妹と買い物に行った（一緒に）。', '具体'], ['Cut it with a knife.', 'ナイフで切って（道具を持って）。', '道具'], ['a girl with long hair', '長い髪の女の子（特徴を伴う）。', '特徴'], ['I agree with you.', 'あなたに賛成だ（同じ側にいる）。', '抽象'], ['How do you deal with stress?', 'ストレスにどう対処する？（向き合う）。', '抽象']], ''],
    ['over', 'prep', 'over', '上を覆う・越えて', '上に「弧を描いて覆う・越える」イメージ。接触はしないことが多い。数・時間を越える意味にも。',
      () => ground() + fence(84, 116) + `<path d="M30 104 Q100 -10 170 104" fill="none" stroke="var(--im-ar)" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#ia)"/>` + fig(100, 60, {p: 'jump'}) + label(100, 124, '柵を跳び越える'),
      [['The plane flew over the mountains.', '飛行機が山の上を越えて飛んだ。', '具体'], ['Put a blanket over the baby.', '赤ちゃんに毛布をかけて（覆う）。', '覆う'], ['over 100 people', '100人を超える人々（数を越える）。', '数'], ['Prices rose over the past decade.', '過去10年にわたって物価が上がった（期間全体を覆う）。', '期間'], ['The meeting is over.', '会議は終わった（越えてしまった）。', '抽象']], 'above は「より上の位置」だけ、over は「覆う・越える」動きのイメージがあります。'],
    ['under', 'prep', 'under', '下に・覆われて', '何かの「真下にある・覆われている」イメージ。圧力や支配の下、基準より下の意味にも。',
      () => ground() + `<path d="M56 56 Q100 6 144 56 Z" fill="var(--im-hi)"/>` + [66, 82, 118, 134].map(x => ln(x, 4, x - 6, 18, 'var(--im-hi)', 2)).join('') + ln(100, 34, 100, 78, 'var(--im-lms)', 3) + fig(100) + label(100, 124, '傘の下（覆われている）'),
      [['The cat is under the table.', '猫はテーブルの下にいる。', '具体'], ['Students are under pressure.', '学生はプレッシャーの下にある。', '抽象'], ['Children under 12 travel free.', '12歳未満の子どもは無料（基準より下）。', '数'], ['The road is under construction.', 'その道路は工事中だ（作業の下にある）。', '状態']], ''],
    ['above', 'prep', 'above / below', '基準より上／下（接触なし）', 'ある「基準の線」より上か下かだけを表します。接触しない位置関係です。',
      () => `<rect x="36" y="18" width="124" height="90" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2"/>` + ln(36, 63, 160, 63, 'var(--im-lms)', 3) + fig(80, 63, {s: .8}) + fig(122, G, {s: .8, c: blue}) + label(180, 46, 'above') + label(180, 92, 'below') + ground(),
      [['The town is 500 metres above sea level.', 'その町は海抜500メートルにある。', '具体'], ['Her score was above average.', '彼女の点は平均より上だった。', '抽象'], ['Temperatures fell below zero.', '気温が氷点下に下がった。', '数'], ['See the chart below.', '下の図を見てください。', '位置']], 'グラフ問題で above / below the average はよく使います。'],
    ['through', 'prep', 'through', '通り抜ける', 'トンネルのように、中に入って「反対側へ抜ける」イメージ。期間を通して、手段を通じて、の意味にも。',
      () => ground() + `<path d="M48 ${G} V64 A52 44 0 0 1 152 64 V${G}" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="3"/>` + `<path d="M64 ${G} V70 A36 30 0 0 1 136 70 V${G}" fill="var(--surface)"/>` + fig(100, G, {p: 'walk', s: .8}) + arr('M16 94 H186') + label(100, 124, 'トンネルを通り抜ける'),
      [['The train went through a tunnel.', '電車はトンネルを通り抜けた。', '具体'], ['We walked through the park.', '公園を通り抜けて歩いた。', '具体'], ['It rained all through the night.', '一晩中ずっと雨が降った（最初から最後まで）。', '時'], ['I found the job through a friend.', '友人を通じてその仕事を見つけた（経由）。', '手段'], ['She went through a difficult time.', '彼女はつらい時期を経験した（くぐり抜けた）。', '抽象']], ''],
    ['across', 'prep', 'across', '横切って（平面の向こうへ）', '川や道路など、平面を「端から端へ横切る」イメージ。',
      () => `<rect x="70" y="8" width="60" height="100" fill="var(--im-lms)" opacity=".45"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="76" y="${14 + i * 19}" width="48" height="8" fill="var(--surface)"/>`).join('') + ground() + fig(100, G, {p: 'walk'}) + arr('M22 44 H180') + label(100, 124, '道路を渡る（向こう側へ）'),
      [['Walk across the road carefully.', '道路を注意して渡って。', '具体'], ['The bank is across the street.', '銀行は通りの向こう側にある。', '位置'], ['The virus spread across the world.', 'ウイルスは世界中に広がった（端から端まで）。', '抽象']], 'through は「立体の中を通る」、across は「平面の上を横切る」。'],
    ['along', 'prep', 'along', '〜に沿って', '細長いものに「沿って進む」イメージ。',
      () => `<path d="M0 112 C50 104 150 120 200 110 V130 H0 Z" fill="var(--im-hi)" opacity=".35"/>` + ln(0, G, 200, G, 'var(--im-lms)', 2) + fig(100, G, {p: 'walk'}) + arr('M26 46 H176') + label(100, 34, '川沿いを歩く'),
      [['We walked along the river.', '川沿いを歩いた。', '具体'], ['There are shops along the street.', '通り沿いに店が並んでいる。', '位置'], ['I get along well with my colleagues.', '同僚とうまくやっている（一緒に沿って進む）。', '抽象']], ''],
    ['into', 'prep', 'into', '中へ（外→中の動き）', 'in の「中」に、to の「到達」が合わさったイメージ。外から中に入る動き。変化の意味にも。',
      () => ground() + house(86, 100, 70, {cut: true, door: false}) + fig(110, G, {p: 'walk', s: .85}) + arr('M22 80 H142') + label(70, 124, '中に入っていく'),
      [['She walked into the room.', '彼女は部屋に入ってきた。', '具体'], ['Translate this into English.', 'これを英語に訳して（別の形の中へ）。', '変化'], ['The old factory was turned into flats.', '古い工場はアパートに変えられた。', '変化'], ['Police are looking into the case.', '警察がその事件を調べている（中をのぞき込む）。', '抽象']], ''],
    ['out', 'prep', 'out of', '中から外へ', 'into の逆。中から「外に出る」イメージ。なくなる・外れる意味にも。',
      () => ground() + house(8, 90, 70, {cut: true, door: false}) + `<g opacity=".3">${fig(50, G, {s: .85})}</g>` + fig(152, G, {p: 'walk'}) + arr('M62 80 H170') + label(120, 124, '中から外へ出る'),
      [['He got out of the car.', '彼は車から降りた。', '具体'], ['We have run out of milk.', '牛乳を切らした（中から全部出た）。', '抽象'], ['The lift is out of order.', 'エレベーターは故障中だ（正常な状態の外）。', '状態'], ['Find out the answer.', '答えを見つけ出して（隠れた所から外へ）。', '句動詞']], ''],
    ['off', 'prep', 'off', '接触から離れる', 'on（接触）の反対。くっついていたものが「離れる」イメージ。',
      () => ground() + bus(8, 50) + fig(146, G, {p: 'walk'}) + arr('M100 82 Q120 64 134 70') + label(100, 124, 'バスから降りる（離れる）'),
      [['Get off the bus here.', 'ここでバスを降りて（バスから離れる）。', '具体'], ['Turn off the light.', '電気を消して（電気の流れから離れる）。', '抽象'], ['I have a day off tomorrow.', '明日は休みだ（仕事から離れる日）。', '抽象'], ['The plane took off.', '飛行機が離陸した（地面から離れた）。', '句動詞'], ['The match was called off.', '試合は中止された。', '句動詞']], 'on / off はスイッチのイメージ：turn on（つなぐ）、turn off（離す）。'],
    ['up', 'prep', 'up', '上へ・完全に', '上へ向かうイメージ。そこから「最後までやりきる・完全に」の意味が生まれます。',
      () => stairs(true) + fig(114, 66, {p: 'walk', s: .8}) + arr('M40 100 L178 22') + label(100, 124, '階段を上る（上へ）'),
      [['Stand up, please.', '立ってください。', '具体'], ['Prices went up.', '物価が上がった。', '数'], ['Eat up your vegetables.', '野菜を全部食べなさい（完全に）。', '完了'], ['Don\'t give up.', 'あきらめないで（手放しきる）。', '句動詞'], ['She came up with a great idea.', '彼女はすばらしい考えを思いついた（浮かび上がる）。', '句動詞']], ''],
    ['down', 'prep', 'down', '下へ・減る・落ち着く', '下へ向かうイメージ。減少・記録して固定・落ち着くの意味に。',
      () => stairs(false) + fig(110, 80, {p: 'walk', s: .8}) + arr('M36 22 L178 100') + label(100, 124, '階段を下りる（下へ）'),
      [['Sit down.', '座って。', '具体'], ['Unemployment has gone down.', '失業率が下がった。', '数'], ['Write down your name.', '名前を書き留めて（紙の上に固定）。', '句動詞'], ['Calm down.', '落ち着いて。', '状態'], ['My car broke down.', '車が故障した（動かなくなる）。', '句動詞']], ''],
    ['around', 'prep', 'around', 'ぐるりと周りに・だいたい', '中心の周りを「ぐるっと回る・取り囲む」イメージ。数字に付くと「だいたい」に。',
      () => ground() + tree(100) + `<path d="M30 94 A70 18 0 1 0 170 94" fill="none" stroke="var(--im-ar)" stroke-width="3" marker-end="url(#ia)"/>` + fig(160, G, {p: 'walk', s: .7, flip: true}) + label(100, 126, '木の周りを回る'),
      [['We walked around the lake.', '湖の周りを歩いた。', '具体'], ['She travelled around the world.', '世界中を旅した（あちこち回る）。', '場所'], ['It costs around £50.', '約50ポンドだ（50の周り）。', '数'], ['I\'ll see you around six.', '6時ごろに会おう。', '時']], ''],
    ['between', 'prep', 'between', '2つの間', 'はっきり2つ（または区別できる複数）の「間」にあるイメージ。',
      () => ground() + fig(46, G, {c: grey}) + fig(100) + fig(154, G, {c: grey, flip: true}) + label(100, 124, '2人の間にいる'),
      [['The bank is between the café and the hotel.', '銀行はカフェとホテルの間にある。', '具体'], ['between 2010 and 2020', '2010年から2020年の間に。', '時'], ['the difference between A and B', 'AとBの違い。', '抽象']], 'グラフ問題では between 2010 and 2020 が頻出。'],
    ['among', 'prep', 'among', '多くの中に混じって', '区別できない「たくさんの中に紛れている」イメージ。',
      () => ground() + [[28, 1], [52, .9], [76, 1], [124, 1], [148, .9], [172, 1]].map(([x, s]) => fig(x, G, {c: grey, s})).join('') + fig(100) + label(100, 124, 'たくさんの人に混じる'),
      [['a house among the trees', '木々の間に建つ家。', '具体'], ['Smartphones are popular among teenagers.', 'スマホは10代の間で人気だ。', '抽象']], ''],
    ['behind', 'prep', 'behind / in front of', '後ろ／前', '見る人から見て、物の「後ろに隠れる」か「手前にある」か。',
      () => ground() + fig(26, G, {c: blue, s: .8}) + label(28, 124, '見る人') + fig(150, G, {s: .8}) + tree(132) + fig(78, G, {s: .9}) + label(78, 26, 'in front of') + label(160, 18, 'behind'),
      [['The car park is behind the building.', '駐車場は建物の裏にある。', '具体'], ['There is a bus stop in front of the hotel.', 'ホテルの前にバス停がある。', '具体'], ['Japan is behind in digital technology.', '日本はデジタル技術で遅れている。', '抽象']], ''],
    ['against', 'prep', 'against', '〜に逆らって・寄りかかって', '壁などに「向かって押し付ける・ぶつかる」イメージ。そこから「反対・対抗」の意味に。',
      () => ground() + wall(150) + fig(128, G, {p: 'lean', rot: 14}) + label(86, 124, '壁にもたれかかる'),
      [['He leaned against the wall.', '彼は壁に寄りかかった。', '具体'], ['Many residents are against the plan.', '多くの住民がその計画に反対だ。', '抽象'], ['It\'s against the law.', 'それは法律違反だ（法に逆らう）。', '抽象'], ['the fight against crime', '犯罪との闘い。', '抽象']], 'Task 2 で「〜に反対だ」は be against 〜 / be opposed to 〜。'],
    ['towards', 'prep', 'towards', '〜の方へ（方向）', '到達は気にせず「方向」だけを示すイメージ。気持ちや態度が向かう先にも。',
      () => ground() + mountain(132, 64, 52) + `<circle cx="172" cy="34" r="12" fill="var(--im-tr)" opacity=".5"/>` + fig(40, G, {p: 'walk'}) + arr('M58 78 L124 62') + label(86, 124, 'あの方向へ向かう'),
      [['He walked towards the station.', '彼は駅の方へ歩いた。', '具体'], ['There is a trend towards online shopping.', 'ネット通販への傾向がある。', '抽象'], ['Attitudes towards immigration are changing.', '移民に対する考え方が変わりつつある。', '抽象']], ''],
    ['beyond', 'prep', 'beyond', '境界を越えた向こう', 'ある「境界線の向こう側」にあるイメージ。能力や理解の範囲を越える意味にも。',
      () => ground() + mountain(62, 80, 66) + fig(28, G, {s: .9}) + fig(170, G, {s: .6, c: blue}) + `<path d="M40 52 Q102 -6 160 70" fill="none" stroke="var(--im-ar)" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#ia)"/>` + label(100, 124, '山の向こう側'),
      [['There is a village beyond the hills.', '丘の向こうに村がある。', '具体'], ['The situation is beyond our control.', '状況は私たちの手に負えない。', '抽象'], ['This is beyond my understanding.', 'これは私の理解を越えている。', '抽象']], ''],
    ['within', 'prep', 'within', '範囲の内側に（以内）', '決められた「枠の内側」に収まるイメージ。時間や距離の「以内」。',
      () => ground() + `<rect x="34" y="28" width="132" height="80" rx="14" fill="var(--good-soft)" stroke="var(--im-ar)" stroke-width="3" stroke-dasharray="7 5"/>` + tree(64, G, .6) + fig(118) + label(100, 124, '敷地（範囲）の内側'),
      [['Reply within 24 hours.', '24時間以内に返信して。', '時'], ['The hotel is within walking distance.', 'ホテルは歩いて行ける距離にある。', '距離'], ['within the budget', '予算内で。', '抽象']], ''],
    ['during', 'time', 'during', '（出来事の）間に', '特定の出来事・期間の「最中のどこか」。後ろには名詞（the summer, the meeting）が来ます。',
      () => tl(`<rect x="46" y="58" width="112" height="38" rx="6" fill="var(--im-hi)" opacity=".18"/>${t(78, 52, '夏休みの間')}${mini(92, {p: 'wave'})}`),
      [['I worked part-time during the summer.', '夏の間アルバイトをした。', '時'], ['Please don\'t talk during the exam.', '試験中は話さないで。', '時']], 'during + 名詞（during the holiday）、while + 文（while I was on holiday）。for は「長さ」（for two weeks）。'],
    ['for-time', 'time', 'for（期間）', 'その長さの間ずっと', '期間の「長さ」を表します。数字＋単位（three years, two hours）と一緒に使います。',
      () => tl(`${ln(40, 64, 110, 64, 'var(--im-tr)', 3)}<path d="M40 56 V72 M110 56 V72" stroke="var(--im-tr)" stroke-width="2"/>${t(75, 50, '3時間ずっと')}${mini(75)}`),
      [['I have lived here for three years.', 'ここに3年住んでいる。', '時'], ['We waited for two hours.', '2時間待った。', '時']], ''],
    ['since', 'time', 'since', '〜から今までずっと', '過去の「起点から今まで」続いているイメージ。現在完了と一緒に使います。',
      () => tl(`${t(44, 50, '2020年')}${ln(44, 56, 44, 96, 'var(--im-hi)', 2, true)}${mini(44, {c: grey})}${arr('M54 80 H106')}${mini(118, {p: 'walk'})}`),
      [['I have studied English since 2020.', '2020年から英語を勉強している。', '時'], ['She has been ill since last week.', '彼女は先週からずっと具合が悪い。', '時']], 'since の後は起点（2020, last week）、for の後は期間（three years）。'],
    ['until', 'time', 'until', '〜までずっと（継続）', 'ある時点まで「ずっと続く」イメージ。終点で状態が終わります。',
      () => tl(`${mini(76, {p: 'sit'})}${mini(132, {p: 'sit'})}${ln(70, 68, 160, 68, 'var(--im-tr)', 3)}${ln(164, 48, 164, 96, 'var(--im-hi)', 3)}${t(164, 42, '金曜')}${t(110, 58, 'ずっと続ける')}`),
      [['I will stay here until Friday.', '金曜日までずっとここにいる。', '時'], ['The shop is open until 9 p.m.', '店は午後9時まで開いている。', '時']], 'until は「ずっと」、by は「までに一度」。I\'ll wait until 5.（5時まで待つ）／Finish it by 5.（5時までに終える）'],
    ['by-time', 'time', 'by（期限）', '〜までに（期限）', '期限の線より「前のどこか」で一度起これば良い、というイメージ。',
      () => tl(`${ln(164, 48, 164, 96, 'var(--im-hi)', 3)}<path d="M164 48 L182 54 L164 60 Z" fill="var(--im-hi)"/>${t(170, 42, '期限')}${mini(140, {p: 'give'})}${t(108, 58, 'その前に一度')}`),
      [['Please submit it by Friday.', '金曜日までに提出して。', '時'], ['By 2050, the population will reach 10 million.', '2050年までに人口は1000万人に達する。', '時']], ''],
    ['present', 'tense', '現在形', 'いつもそう（習慣・事実）', '過去も今も未来も「いつもそう」であることを表します。今この瞬間だけの話ではありません。',
      () => tl([34, 64, 94, 124, 154, 178].map(x => mini(x, {p: 'walk'})).join('') + t(100, 44, '毎日いつも')),
      [['I walk to work every day.', '毎日歩いて通勤する（習慣）。', '習慣'], ['Water boils at 100°C.', '水は100度で沸騰する（事実）。', '事実']], 'エッセイの一般論（Technology changes our lives.）は現在形。'],
    ['progressive', 'tense', '現在進行形', '今まさに途中', '「今」を中心に、始まっていてまだ終わっていない動作。一時的な状態にも使います。',
      () => tl(mini(118, {p: 'walk'}) + `<path d="M100 76 h-10 M102 84 h-12 M100 92 h-8" stroke="var(--im-tr)" stroke-width="2"/>` + t(118, 44, '今まさにしている')),
      [['I\'m studying English now.', '今英語を勉強している。', '今'], ['More people are working from home.', 'より多くの人が在宅勤務をしている（変化の途中）。', '変化']], ''],
    ['past', 'tense', '過去形', '終わったこと（今とは切れている）', '過去の一点で起きて、今とは「切り離された」出来事。',
      () => tl(mini(50, {p: 'wave'}) + `<path d="M26 62 l5 6 l10 -12" fill="none" stroke="var(--good)" stroke-width="3"/>` + ln(70, 82, 104, 82, 'var(--im-lms)', 2, true) + `<path d="M98 74 L110 90 M110 74 L98 90" stroke="var(--im-tr)" stroke-width="2"/>` + t(50, 46, '終わった') + t(86, 68, '今とは切れる')),
      [['I visited Kyoto last year.', '去年京都を訪れた。', '過去'], ['The company was founded in 1990.', 'その会社は1990年に設立された。', '過去']], 'yesterday / last year / in 2019 と一緒に使うのは過去形。'],
    ['perfect', 'tense', '現在完了', '過去から今につながる', '過去に始まったことが「今まで続いている・今に影響している」イメージ。',
      () => tl(mini(40, {c: grey}) + arr('M50 80 H106') + mini(118) + t(80, 62, '今につながる')),
      [['I have lived here since 2020.', '2020年からここに住んでいる（継続）。', '継続'], ['I have visited London three times.', 'ロンドンに3回行ったことがある（経験）。', '経験'], ['Prices have risen sharply.', '物価が急上昇した（今も高い＝結果）。', '結果']], 'グラフの「〜年以来増えている」やエッセイの In recent years, … has increased で活躍します。'],
    ['pastperfect', 'tense', '過去完了', '過去のある時点よりさらに前', '過去の基準点より「もっと前」に起きたことを表します。',
      () => tl(mini(34, {c: grey}) + arr('M42 80 H68') + mini(80, {c: blue}) + t(34, 66, 'もっと前') + t(82, 46, '過去の基準')),
      [['When I arrived, the train had left.', '着いたときには電車は出てしまっていた。', '過去'], ['It was the first time I had seen snow.', '雪を見たのはそれが初めてだった。', '経験']], ''],
    ['future', 'tense', 'will / be going to', '未来（その場の判断／前からの予定）', 'will は今その場で決めたことや予測、be going to は前から決めていた予定や、今の状況から見える未来。',
      () => tl(mini(118) + `<circle cx="152" cy="52" r="16" fill="var(--im-lm)" stroke="var(--im-lms)"/><circle cx="134" cy="68" r="3" fill="var(--im-lms)"/>` + t(152, 56, '予定') + arr('M126 88 H178', true) + t(150, 26, 'will / going to')),
      [['I think it will rain tomorrow.', '明日は雨が降ると思う（予測）。', '予測'], ['I\'m going to take IELTS in March.', '3月にIELTSを受ける予定だ（決めている）。', '予定']], ''],
    ['a', 'article', 'a / an', 'たくさんある中の「どれか一つ」', '聞き手にとって特定されていない、同じ種類のうちの「ひとつ」。初めて話題に出すときに使います。',
      () => ground() + [36, 68, 100, 132, 164].map(x => fig(x, G, {c: x === 132 ? 'var(--im-tr)' : grey, s: .85})).join('') + `<ellipse cx="132" cy="80" rx="18" ry="28" fill="none" stroke="var(--im-tr)" stroke-width="2" stroke-dasharray="4 3"/>` + label(100, 124, 'どれでもいい一人'),
      [['I bought a car.', '車を一台買った（初めての話題）。', '基本'], ['She is a doctor.', '彼女は医者だ（医者の一人）。', '職業']], ''],
    ['the', 'article', 'the', '「あれね」とお互いにわかる', '話し手と聞き手の両方が「どれのことか」わかっているもの。スポットライトが当たっているイメージ。',
      () => ground() + `<path d="M100 2 L72 ${G} L128 ${G} Z" fill="var(--im-tr)" opacity=".18"/>` + [44, 100, 156].map(x => fig(x, G, {c: x === 100 ? 'var(--im-tr)' : grey, s: .85})).join('') + label(100, 124, 'あの人（お互いにわかる）'),
      [['The car is red.', 'その車は赤い（さっき話した車）。', '特定'], ['the sun / the internet', '太陽／インターネット（一つしかない）。', '唯一'], ['the government', '政府（どの政府かわかる）。', '唯一']], ''],
    ['zero', 'article', '無冠詞（一般論）', '「〜というもの」全般', '特定のものではなく、その種類全体をぼんやり指すイメージ。数えられる名詞は複数形にします。',
      () => `<ellipse cx="100" cy="66" rx="92" ry="52" fill="var(--im-lm)" stroke="var(--im-lms)" stroke-width="2" stroke-dasharray="5 4"/>` + [44, 72, 100, 128, 156].map(x => fig(x, 98, {c: blue, s: .62})).join('') + [58, 86, 114, 142].map(x => fig(x, 64, {c: blue, s: .5})).join('') + label(100, 126, '人というもの全般'),
      [['Children need love.', '子どもには愛が必要だ（子ども全般）。', '一般論'], ['Pollution is a serious problem.', '汚染は深刻な問題だ。', '不可算']], 'エッセイの一般論は無冠詞の複数形（Cars cause pollution.）が基本。'],
    ['get', 'verb', 'get', 'ある状態・物を手に入れる（移動の結果）', '何かが自分のところへ「やってきて、手元に収まる」イメージ。物だけでなく、場所や状態にも「到達」します。',
      () => ground() + fig(150, G, {p: 'carry', flip: true, c: blue}) + `<rect x="30" y="54" width="22" height="18" rx="3" fill="var(--im-tr)"/>` + arr('M58 60 Q100 36 126 72') + label(100, 124, '手に入る・たどり着く'),
      [['I got a letter.', '手紙を受け取った（物が手元に来る）。', '具体'], ['What time did you get home?', '何時に家に着いた？（場所に到達）。', '移動'], ['It\'s getting dark.', '暗くなってきた（状態に到達）。', '変化'], ['I get it.', 'わかった（意味を手に入れる）。', '抽象']], ''],
    ['take', 'verb', 'take', '自分の方へ取り込んで持っていく', '手を伸ばして「取り、自分のものとして持っていく」イメージ。時間・乗り物・行動を「取る」にも。',
      () => ground() + fig(54, G, {p: 'carry', c: blue}) + `<rect x="140" y="80" width="22" height="18" rx="3" fill="var(--im-tr)"/>` + arr('M136 80 Q106 54 76 78') + label(100, 124, '取って持っていく'),
      [['Take an umbrella with you.', '傘を持っていって。', '具体'], ['I take the train to work.', '電車で通勤する（乗り物を選び取る）。', '交通'], ['It takes an hour.', '1時間かかる（時間を取る）。', '時間'], ['Take a break.', '休憩を取って。', '行動'], ['Measures should be taken.', '対策が取られるべきだ。', '抽象']], ''],
    ['give', 'verb', 'give', '自分から相手へ渡す', '自分の手元から「相手へ移す」イメージ。物だけでなく、情報・影響・機会も渡せます。',
      () => ground() + fig(44, G, {p: 'give', c: blue}) + fig(156, G, {c: grey, flip: true, p: 'give'}) + `<rect x="91" y="64" width="18" height="14" rx="3" fill="var(--im-tr)"/>` + arr('M66 58 Q100 40 134 58') + label(100, 124, '相手に渡す'),
      [['She gave me a present.', '彼女は私にプレゼントをくれた。', '具体'], ['Give me some advice.', 'アドバイスをください。', '情報'], ['Travel gives you a new perspective.', '旅は新しい視点を与えてくれる。', '抽象'], ['Don\'t give up.', 'あきらめないで（手放してしまう）。', '句動詞']], ''],
    ['have', 'verb', 'have', '自分の範囲の中に持っている', '自分の「領域の中にある」状態。持ち物だけでなく、経験・病気・予定・関係にも。',
      () => `<circle cx="100" cy="58" r="48" fill="var(--im-lm)" stroke="var(--im-hi)" stroke-width="2" stroke-dasharray="5 4"/>` + fig(86, 98, {p: 'carry', c: blue}) + `<rect x="96" y="64" width="20" height="16" rx="3" fill="var(--im-tr)"/>` + label(100, 127, '自分の手元・範囲にある'),
      [['I have two brothers.', '兄弟が2人いる。', '具体'], ['I have a headache.', '頭痛がする（体の中にある）。', '体'], ['We have a meeting at 3.', '3時に会議がある（予定を抱えている）。', '予定'], ['Have a good time!', '楽しんで！（時間を持つ）。', '抽象']], ''],
    ['make', 'verb', 'make', '手を加えて新しく作り出す', '材料に手を加えて「別のものを生み出す」イメージ。状態や結果を生み出す意味にも。',
      () => ground() + [[16, 94], [32, 94], [24, 80]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="14" rx="2" fill="var(--im-lms)"/>`).join('') + fig(78, G, {p: 'carry', c: blue}) + arr('M100 78 H134') + `<path d="M148 108 V76 L166 60 L184 76 V108 Z" fill="var(--im-tr)"/>` + label(100, 126, '材料から作り出す'),
      [['I made a cake.', 'ケーキを作った。', '具体'], ['Don\'t make a mistake.', '間違いをしないで（間違いを生み出す）。', '行動'], ['The news made me happy.', 'その知らせで嬉しくなった（状態を作る）。', '使役'], ['We need to make a decision.', '決断する必要がある。', '抽象']], ''],
    ['put', 'verb', 'put', 'ある場所に置く', 'ものを「ある位置に動かして置く」イメージ。状態や言葉をある所に置く意味にも。',
      () => ground() + `<rect x="104" y="80" width="76" height="8" fill="var(--im-lms)"/>` + ln(112, 88, 112, 108, 'var(--im-lms)', 3) + ln(172, 88, 172, 108, 'var(--im-lms)', 3) + fig(56, G, {p: 'give', c: blue}) + `<rect x="132" y="64" width="20" height="16" rx="3" fill="var(--im-tr)"/>` + arr('M80 74 Q110 50 128 64') + label(100, 124, 'テーブルに置く'),
      [['Put your bag here.', 'かばんをここに置いて。', '具体'], ['Put on your coat.', 'コートを着て（体に置く）。', '句動詞'], ['Don\'t put off your homework.', '宿題を先延ばしにしないで（離れた所に置く）。', '句動詞'], ['I can\'t put up with the noise.', '騒音に我慢できない。', '句動詞']], ''],
    ['come', 'verb', 'come', '話し手（中心）の方へ来る', '話題の中心に「近づいてくる」イメージ。相手の所へ行くときも、相手が中心なので come を使います。',
      () => ground() + fig(164, G, {c: blue, p: 'wave', flip: true}) + fig(40, G, {p: 'walk'}) + arr('M60 78 H142') + label(164, 124, '話の中心') + label(70, 124, 'こちらへ来る'),
      [['Come here.', 'こっちに来て。', '具体'], ['I\'m coming!', '今行きます！（相手の所へ＝相手が中心）。', '相手'], ['Spring has come.', '春が来た。', '時'], ['She came up with an idea.', '彼女はアイデアを思いついた（頭に浮かんできた）。', '句動詞']], 'Dinner\'s ready! への返事は I\'m coming.（I\'m going. は「出かけます」に聞こえる）。'],
    ['go', 'verb', 'go', '中心から離れて行く', '今いる所・話の中心から「離れていく」イメージ。物事が進む・ある状態になる意味にも。',
      () => ground() + fig(36, G, {c: blue, p: 'wave'}) + fig(160, G, {p: 'walk'}) + arr('M56 78 H140') + label(36, 124, '話の中心') + label(130, 124, '離れて行く'),
      [['Let\'s go to the park.', '公園に行こう。', '具体'], ['How did the exam go?', '試験はどうだった？（進み具合）。', '進行'], ['The milk has gone bad.', '牛乳が腐った（悪い状態へ離れていく）。', '変化'], ['Prices went up.', '物価が上がった。', '句動詞']], ''],
    ['bring', 'verb', 'bring', '中心の方へ持ってくる', 'come ＋ 持つ。ものを「話の中心の方へ持ってくる」イメージ。take はその逆で「持っていく」。',
      () => ground() + fig(166, G, {c: blue, flip: true}) + fig(54, G, {p: 'carry'}) + `<rect x="64" y="76" width="18" height="14" rx="3" fill="var(--im-hi)"/>` + arr('M90 70 H146') + label(166, 124, '話の中心') + label(80, 124, '持ってくる'),
      [['Bring your passport.', 'パスポートを持ってきて。', '具体'], ['Technology has brought many changes.', 'テクノロジーは多くの変化をもたらした。', '抽象'], ['I was brought up in Osaka.', '大阪で育った（育てられた）。', '句動詞']], ''],
    ['keep', 'verb', 'keep', 'ある状態のまま保ち続ける', '手の中に「ずっと持ち続ける」イメージ。物も状態も、変えずに保ちます。',
      () => ground() + fig(100, G, {p: 'carry', c: blue}) + `<rect x="106" y="76" width="18" height="14" rx="3" fill="var(--im-tr)"/>` + `<path d="M144 70 A44 44 0 1 1 100 26" fill="none" stroke="var(--im-ar)" stroke-width="3" marker-end="url(#ia)"/>` + label(100, 124, 'ずっと持ち続ける'),
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
