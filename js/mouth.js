/* 発音ガイド: all 44 English sounds with drawn mouth diagrams (side cross-section + front lips),
   and pronunciation feedback that shows the relevant diagrams after a weak attempt. Uses the main script's globals. */
(() => {
  const css = `
  :root{--m-skin:#F3DCCB;--m-line:#6B4A3A;--m-lip:#D9727A;--m-tongue:#E98C95;--m-teeth:#FFFFFF;--m-cav:#3A1F24;--m-air:#0D7461;--m-bone:#E9D2BE}
  @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--m-skin:#5B4639;--m-line:#E8CDBB;--m-lip:#D66A73;--m-tongue:#E07F89;--m-teeth:#F4F1EC;--m-cav:#1A0D10;--m-air:#3FBF9F;--m-bone:#6E5646}}
  :root[data-theme="dark"]{--m-skin:#5B4639;--m-line:#E8CDBB;--m-lip:#D66A73;--m-tongue:#E07F89;--m-teeth:#F4F1EC;--m-cav:#1A0D10;--m-air:#3FBF9F;--m-bone:#6E5646}
  .mth{display:block;max-width:100%;height:auto}
  .phgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
  .phcard{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;text-align:left;cursor:pointer;min-width:0}
  .phcard:hover{border-color:var(--accent)}
  .phcard.risk{border-left:4px solid var(--warn)}
  .phsym{font-family:"Charis SIL","Noto Sans",serif;font-size:30px;font-weight:700;line-height:1}
  .phpics{display:grid;grid-template-columns:3fr 2fr;gap:6px;align-items:center;background:var(--sunk);border-radius:8px;padding:6px}
  .phdetail .phpics{grid-template-columns:3fr 2fr;padding:12px}
  .phex{display:flex;flex-wrap:wrap;gap:6px}
  .phtip{font-size:13.5px;line-height:1.6}
  .phtrap{font-size:12.5px;color:var(--warn)}
  .fbph{display:flex;flex-direction:column;gap:10px;border-top:1px dashed var(--line);padding-top:12px;width:100%}
  .fbph .phgrid{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
  .pharrow{font-size:12px;color:var(--muted);text-align:center}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- articulation presets ---------- */
  // tongue: tip T and highest body point B in the side view (viewBox 220×170, face to the left)
  const TONGUE = {
    rest:[58,94,106,82], teeth:[38,77,100,80], ridge:[52,62,100,78], curl:[66,70,106,76], blade:[56,66,96,57],
    back:[60,94,132,51], hiF:[56,88,90,59], midF:[56,90,92,66], loF:[58,98,96,80], cen:[58,94,106,68], cenLo:[58,98,108,76],
    hiB:[60,96,124,57], midB:[60,100,124,68], loB:[60,104,128,82],
  };
  // lips: side-view lower-lip mode + front view {w,h}
  const LIPS = {
    closed:{side:'closed', w:46, h:2}, neutral:{side:'neutral', w:42, h:12}, spread:{side:'neutral', w:54, h:9},
    round:{side:'round', w:22, h:20, round:1}, rsmall:{side:'round', w:18, h:13, round:1}, rlight:{side:'round', w:30, h:18, round:1},
    open:{side:'neutral', w:42, h:28}, wide:{side:'neutral', w:52, h:24}, lipteeth:{side:'lipteeth', w:46, h:8, lt:1},
  };
  // symbol | type | 名前 | examples | tongue | lips | jaw(0-1) | flags(n=nasal, s=stop, f=friction, l=lateral, v=voiced, t=tongue visible) | risk(0-3) | tip | 日本人の注意
  const RAW = `
p|c|P の音|pen, happy, stop|rest|closed|0|s|0|唇をしっかり閉じて息をためてから、パッと破裂させる。単語の最初では強い息が出る（口の前に手を置くと感じる）。|語末の p に「プ」と母音を付けない（stop ≠ ストップ）。
b|c|B の音|bed, rubber, job|rest|closed|0|sv|1|p と同じ口の形で、のどを震わせて声を出す。唇は必ず閉じる。|v と混同しやすい（boat / vote）。b は唇を閉じる、v は閉じない。
t|c|T の音|ten, water, cat|ridge|neutral|0.2|s|0|舌先を上の前歯の裏の付け根（歯ぐき）に付けて、強く息を破裂させる。日本語のタより少し後ろ。|語末の t に「ト」を付けない。
d|c|D の音|day, ladder, bad|ridge|neutral|0.2|sv|0|t と同じ位置で声を出す。|
k|c|K の音|key, school, back|back|neutral|0.3|s|0|舌の奥を上あごの奥（やわらかい部分）に付けて、息を破裂させる。|
g|c|G の音|go, bigger, dog|back|neutral|0.3|sv|0|k と同じ位置で声を出す。|
f|c|F の音|fan, coffee, life|rest|lipteeth|0.1|f|2|上の前歯を下唇の内側に軽く当て、すき間から息を出し続ける。|日本語の「フ」は唇どうしで作るので別の音。fan が「ハン」「ファン」に聞こえないように歯を当てる。
v|c|V の音|very, river, love|rest|lipteeth|0.1|fv|3|f と同じ形（上の歯を下唇に当てる）で、のどを震わせて声を出す。下唇がくすぐったく感じれば正解。|日本人は b で代用しがち（very → berry）。唇を閉じないこと。
θ|c|TH（息）の音|think, three, bath|teeth|neutral|0.2|ft|3|舌先を上下の前歯で軽くはさむ（または上の前歯の裏に当てる）。そのすき間から息だけを出す。鏡で舌先が見えればOK。|「ス」や「シ」になりやすい（think → sink）。舌を出すのは恥ずかしくない。
ð|c|TH（声）の音|this, mother, with|teeth|neutral|0.2|ftv|3|θ と同じ形でのどを震わせる。舌先が歯に触れてビリビリする感じ。|「ザ」「ダ」になりやすい（this → dis / zis）。the, this, that で特に注意。
s|c|S の音|see, city, bus|ridge|spread|0.1|f|1|舌先を歯ぐきに近づけ（付けない）、細いすき間から鋭く息を出す。歯は軽く閉じる。|si を「シ」にしない（seat / sheet、see / she）。「スィ」と言う感覚。
z|c|Z の音|zoo, easy, is|ridge|spread|0.1|fv|2|s と同じ形で声を出す。ハチの羽音「ズー」を伸ばす感じ。|「ヅ」のように舌を付けない。語末の s（is, was）も z の音。
ʃ|c|SH の音|she, nation, wish|blade|rlight|0.15|f|1|唇を少し丸めて突き出し、舌を s より少し後ろに引いて広い面で「シュ」と息を出す。|日本語の「シ」より唇を丸めて突き出す。
ʒ|c|ZH の音|vision, usually, garage|blade|rlight|0.15|fv|2|ʃ と同じ形で声を出す。|「ジ」と舌を付けないで、こすれる音を出す。
h|c|H の音|hat, who, behind|rest|open|0.5|f|1|口を次の母音の形にしたまま、のどの奥から息だけを出す。|who, whole の h を「フ」にしない（唇を使わない）。
tʃ|c|CH の音|chair, teacher, watch|blade|rlight|0.15|sf|0|舌先を歯ぐきに付けてから、唇を丸めて「チュ」と離す（t + ʃ）。|
dʒ|c|J の音|job, large, bridge|blade|rlight|0.15|sfv|1|tʃ と同じ動きで声を出す（d + ʒ）。|「ジ」より唇を丸めて突き出す。
m|c|M の音|man, summer, time|rest|closed|0|nv|0|唇を閉じたまま、鼻から声を出す。|語末の m は唇を閉じたまま終える（time を「タイム」と母音で終えない）。
n|c|N の音|no, dinner, ten|ridge|neutral|0.2|nv|1|舌先を歯ぐきに付けたまま、鼻から声を出す。|語末の n でも舌先を歯ぐきに付けたまま（日本語の「ン」は舌が付かないことが多い）。
ŋ|c|NG の音|sing, thinking, long|back|neutral|0.3|nv|2|舌の奥を上あごの奥に付けたまま、鼻から声を出す。|sing の最後に「グ」を付けない。singer は「シンガー」ではなく「スィンァ」に近い。
l|c|L の音|light, hello, feel|ridge|neutral|0.25|lv|3|舌先を歯ぐきにしっかり押し付けたまま、舌の両脇から声を出す。舌先が離れる瞬間に次の母音へ。語末の l（feel, school）は舌を付けたまま奥を下げた暗い音。|日本語のラ行は舌先で一瞬はじくだけなので、L にも R にも聞こえない。L は「付けたまま」。
r|c|R の音|right, very, sorry|curl|rlight|0.15|v|3|舌先をどこにも付けず、少し奥に引いて丸める（反らせる）。唇も軽く丸める。小さな「ウ」から始める感じで。|日本語のラ行のように舌ではじかない。舌先が上あごに触れたら L になってしまう。
w|c|W の音|we, window, away|hiB|round|0.1|v|2|唇を強く丸めて突き出し（口笛の形）、すぐに次の母音へ開く。|woman, wood, would は「ウ」をしっかり唇を丸めて始める（「ウーマン」ではなく w + ʊ）。
j|c|Y の音|yes, year, you|hiF|spread|0.1|v|2|舌を上あごに近づけた「イ」の形から、次の母音へすばやく移る。|year と ear の区別が苦手になりやすい。year は「ィヤ」と舌を上げてから始める。
iː|v|長い「イー」|see, eat, people|hiF|spread|0.1|v|1|唇を横に強く引き、舌を高く前に上げて長く「イー」。筋肉を緊張させる。|短い ɪ との区別（sheep / ship、leave / live）。
ɪ|v|短い「イ」|sit, big, English|hiF|neutral|0.15|v|2|力を抜いた短い「イ」。少し「エ」寄りに、あごを少し下げる。|日本語の「イ」より緩い。ship を「シープ」と伸ばさない。
e|v|「エ」|bed, ten, any|midF|neutral|0.3|v|0|日本語の「エ」に近い。口を少し開ける。|
æ|v|「ア」と「エ」の中間|cat, bag, happy|loF|wide|0.75|v|3|口を横に大きく開き、あごをしっかり下げて「エ」の口で「ア」と言う。|日本語の「ア」で代用すると cap と cup の区別がつかない。口の横幅を意識。
ʌ|v|短く強い「ア」|cup, bus, love|cenLo|neutral|0.4|v|2|口を軽く開け、のどの奥から短く「ア」。あいまいで力強い音。|æ（cat）や ɑː（car）と区別。口を大きく開けすぎない。
ɑː|v|長い「アー」|car, father, start|loB|open|0.85|v|1|口を縦に大きく開け、舌を奥に下げて長く「アー」。|イギリス英語では car の r を発音しない。
ɒ|v|短い「オ」（英）|hot, dog, want|loB|rlight|0.75|v|1|口を大きく開け、唇を少しだけ丸めた短い「オ」。イギリス英語の音。|アメリカ英語では ɑ（「ア」に近い）になる（hot → ハット寄り）。
ɔː|v|長い「オー」|law, caught, more|midB|round|0.5|v|2|唇を丸めて突き出し、口の奥で長い「オー」。|əʊ（boat）と区別（caught / coat、law / low）。
ʊ|v|短い「ウ」|book, good, full|hiB|rlight|0.2|v|2|唇を軽く丸め、力を抜いた短い「ウ」。|uː（fool）と区別。full を「フール」と伸ばさない。
uː|v|長い「ウー」|food, blue, two|hiB|round|0.1|v|1|唇を強く丸めて突き出し（口笛の形）、長く「ウー」。|日本語の「ウ」は唇を丸めないので、突き出しを意識。
ɜː|v|あいまいな長い「アー」|bird, work, learn|cen|neutral|0.3|v|3|口を半開きにし、舌を口の真ん中に浮かせ、力を抜いて長く「アー」（アメリカ英語は舌を丸めて r の響き）。|work と walk、bird と bard の区別が苦手。口を大きく開けない。
ə|v|弱い「ア」（シュワー）|about, banana, teacher|cen|neutral|0.25|v|3|完全に力を抜いた、短く弱い「ア」。アクセントのない音節のほとんどがこの音。|全部の母音をはっきり読むと不自然になる。banana は「バナナ」ではなく「バナーナ」の前後が弱い ə。
eɪ|d|「エイ」|day, make, rain|midF|neutral|0.3|v|1|「エ」から「イ」へなめらかに動かす。|「エー」と伸ばさない（make は「メイク」）。
aɪ|d|「アイ」|my, time, high|loB|open|0.8|v|0|「ア」から「イ」へ。最初の「ア」を大きく。|
ɔɪ|d|「オイ」|boy, enjoy, voice|midB|round|0.5|v|0|唇を丸めた「オ」から「イ」へ。|
əʊ|d|「オウ」（英）|go, boat, phone|cen|rlight|0.3|v|2|あいまいな「ア」から唇を丸めた「ウ」へ（アメリカ英語は oʊ）。|「オー」と伸ばさない（boat を「ボート」と言うと bought に聞こえる）。
aʊ|d|「アウ」|now, house, out|loB|open|0.8|v|0|大きな「ア」から唇を丸めた「ウ」へ。|
ɪə|d|「イア」（英）|near, here, idea|hiF|neutral|0.2|v|1|「イ」から弱い「ア」へ。|アメリカ英語では ɪr（r を発音する）。
eə|d|「エア」（英）|hair, where, care|midF|neutral|0.35|v|1|「エ」から弱い「ア」へ。「エー」と伸ばしてもよい。|アメリカ英語では er（r を発音する）。
ʊə|d|「ウア」（英）|tour, pure, cure|hiB|rlight|0.2|v|0|「ウ」から弱い「ア」へ。若い世代は ɔː で発音することも多い。|
`;
  const PH = RAW.trim().split('\n').map(l => {
    const [s, cat, name, ex, tongue, lips, jaw, flags, risk, tip, trap] = l.split('|');
    return {s, cat, name, ex: ex.split(',').map(x => x.trim()), tongue, lips, jaw: +jaw, flags, risk: +risk, tip, trap};
  });
  const BY = Object.fromEntries(PH.map(p => [p.s, p]));
  // diphthong end shapes for the front view
  const DI_END = {'eɪ':'spread','aɪ':'spread','ɔɪ':'spread','əʊ':'round','aʊ':'round','ɪə':'neutral','eə':'neutral','ʊə':'neutral'};

  /* ---------- drawings ---------- */
  function sideSVG(p) {
    // Cross-section facing left, cropped to the mouth. Dark = air space, pink = tongue, white = teeth.
    const L = LIPS[p.lips], j = p.jaw * 12, f = p.flags;
    let [tx, ty, bx, by] = TONGUE[p.tongue];
    const lowT = ['rest', 'loF', 'cen', 'cenLo', 'hiB', 'midB', 'loB', 'midF', 'hiF', 'back'].includes(p.tongue);
    if (lowT) ty += j * 0.6;
    const nasal = f.includes('n');
    const round = L.side === 'round';
    const lipX = round ? 8 : 14;                              // lips push forward when rounded
    const upY = 72, loY = L.side === 'closed' ? 73 : L.side === 'lipteeth' ? 78 : 80 + j;
    const loLipX = L.side === 'lipteeth' ? 30 : lipX;
    const floor = 112 + j * 0.8;
    // tongue outline: floor → tip → body peak → root against the throat
    const curl = p.tongue === 'curl';
    const tipPath = curl
      ? `C${tx - 10} ${ty + 22} ${tx - 12} ${ty + 4} ${tx - 4} ${ty - 2} C${tx} ${ty - 6} ${tx + 6} ${ty - 2} ${tx + 6} ${ty + 4}`
      : `C${tx - 8} ${ty + 14} ${tx - 6} ${ty + 2} ${tx} ${ty}`;
    const tongue = `M50 ${floor} ${tipPath} C${tx + 14} ${ty - 6} ${bx - 26} ${by} ${bx} ${by} C${bx + 20} ${by} 160 ${by + 8} 164 ${by + 26} L164 140 L54 140 Z`;
    const velum = nasal ? 'M126 49 C142 50 154 58 152 76' : 'M126 49 C144 50 158 54 168 60';
    // contact point (where something must touch)
    let mark = '';
    const ring = (x, y, label) => `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="var(--bad)" stroke-width="1.8" stroke-dasharray="3 2"/>${label ? `<text x="${x}" y="${y - 10}" text-anchor="middle" class="lbl">${label}</text>` : ''}`;
    if (L.side === 'closed') mark = ring(lipX + 4, 72.5, '閉じる');
    else if (L.side === 'lipteeth') mark = ring(36, 78, '歯＋下唇');
    else if (p.tongue === 'teeth') mark = ring(41, 76, '歯ではさむ');
    else if (p.tongue === 'ridge' && /[sln]/.test(f) && !/f/.test(f) || ['t', 'd', 'n', 'l'].includes(p.s)) mark = ring(54, 60, 'ここに付ける');
    else if (p.tongue === 'ridge') mark = ring(54, 61, '近づける');
    else if (p.tongue === 'back' && p.cat === 'c') mark = ring(132, 52, '奥を付ける');
    else if (curl) mark = `<text x="${tx + 2}" y="${ty - 12}" text-anchor="middle" class="lbl">付けない</text>`;
    // airflow
    const mid = (upY + loY) / 2;
    let air;
    if (nasal) air = `M164 128 L164 66 C160 44 120 38 80 40 C56 41 36 44 20 50`;
    else if (p.cat !== 'c' || f.includes('f') || f.includes('l') || f === 'v') air = `M164 128 L164 72 C150 66 ${bx} ${by - 9} ${bx - 34} ${Math.min(by - 6, 66)} C70 64 48 ${mid} 2 ${mid}`;
    else air = `M164 128 L164 72 C150 66 ${bx} ${by - 9} ${bx - 34} ${Math.min(by - 6, 66)} C70 64 56 ${mid} 40 ${mid}`;
    return `<svg class="mth" viewBox="0 34 178 106" role="img" aria-label="${esc(p.name)}の口の断面図">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--m-air)"/></marker></defs>
      <style>.air{fill:none;stroke:var(--m-air);stroke-width:2.4;stroke-linecap:round}.lbl{font:8.5px sans-serif;fill:var(--bad);font-weight:700;paint-order:stroke;stroke:var(--m-skin);stroke-width:3px;stroke-linejoin:round}</style>
      <rect x="0" y="34" width="178" height="106" fill="var(--m-skin)"/>
      <path d="M0 34 L40 34 C30 40 22 46 16 52 C12 55 16 58 24 54 L0 60 Z" fill="var(--m-bone)" opacity=".5"/>
      <path d="M30 50 C60 40 120 36 172 40 L172 140 L44 140 L44 ${86 + j} L46 62 C40 58 34 54 30 50 Z" fill="var(--m-cav)"/>
      <path d="M22 50 C60 44 120 42 168 46" fill="none" stroke="var(--m-line)" stroke-width="1" opacity=".55"/>
      <path d="M38 58 C44 56 50 56 56 56 C80 47 110 45 126 49" fill="var(--m-bone)" stroke="var(--m-line)" stroke-width="1.4"/>
      <path d="M38 58 C44 56 50 56 56 56 C80 47 110 45 126 49 L126 40 L38 44 Z" fill="var(--m-bone)"/>
      <path d="${velum}" fill="none" stroke="var(--m-tongue)" stroke-width="5" stroke-linecap="round"/>
      ${p.tongue === 'teeth' ? '' : `<path d="${tongue}" fill="var(--m-tongue)" stroke="var(--m-line)" stroke-width="1.2"/>`}
      <path d="M36 58 L46 58 L46 76 C44 79 40 79 38 77 Z" fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="1"/>
      <path d="M38 ${84 + j} L46 ${82 + j} L46 ${98 + j} L38 ${98 + j} Z" fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width="1"/>
      ${p.tongue === 'teeth' ? `<path d="${tongue}" fill="var(--m-tongue)" stroke="var(--m-line)" stroke-width="1.2"/>` : ''}
      <path d="M24 54 C20 58 ${lipX - 2} 62 ${lipX} ${upY - 4} C${lipX + 2} ${upY + 2} 26 ${upY + 2} 36 ${upY - 1} L36 58 C32 56 28 54 24 54 Z" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="1.2"/>
      <path d="M${loLipX + 2} ${loY} C${loLipX + 10} ${loY - 3} 32 ${loY - 2} 38 ${loY + 4} L38 ${loY + 14} C30 ${loY + 18} ${lipX} ${loY + 14} ${lipX} ${loY + 6} C${lipX} ${loY + 2} ${loLipX - 2} ${loY} ${loLipX + 2} ${loY} Z" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="1.2"/>
      <path d="M${lipX + 2} ${loY + 14} C10 ${loY + 30} 14 ${118 + j} 30 ${126 + j} C44 ${133 + j} 60 136 74 140 L0 140 L0 ${loY + 10} Z" fill="var(--m-skin)"/>
      <path d="${air}" class="air" ${f.includes('l') ? 'stroke-dasharray="4 3"' : ''} marker-end="url(#ah)"/>
      ${f.includes('s') && !nasal ? `<text x="${lipX - 2}" y="${upY - 12}" class="lbl" style="fill:var(--m-air)">パッ</text>` : ''}
      ${mark}
    </svg>`;
  }
  function frontSVG(lipsKey, opts = {}) {
    const L = LIPS[lipsKey], w = L.w, h = L.h, cx = 60, cy = 45;
    const thick = L.round ? 9 : 6;
    const outer = `M${cx - w / 2 - thick} ${cy} C${cx - w / 2} ${cy - h / 2 - thick - 4} ${cx + w / 2} ${cy - h / 2 - thick - 4} ${cx + w / 2 + thick} ${cy} C${cx + w / 2} ${cy + h / 2 + thick + 6} ${cx - w / 2} ${cy + h / 2 + thick + 6} ${cx - w / 2 - thick} ${cy} Z`;
    const inner = `M${cx - w / 2} ${cy} C${cx - w / 3} ${cy - h / 2 - 1} ${cx + w / 3} ${cy - h / 2 - 1} ${cx + w / 2} ${cy} C${cx + w / 3} ${cy + h / 2 + 1} ${cx - w / 3} ${cy + h / 2 + 1} ${cx - w / 2} ${cy} Z`;
    let teeth = '';
    if (h > 6) teeth += `<rect x="${cx - w / 3}" y="${cy - h / 2}" width="${w * 2 / 3}" height="${Math.min(7, h / 2.4)}" rx="1.5" fill="var(--m-teeth)"/>`;
    if (h > 18) teeth += `<rect x="${cx - w / 3.5}" y="${cy + h / 2 - 5}" width="${w / 1.75}" height="4" rx="1.5" fill="var(--m-teeth)" opacity=".85"/>`;
    if (L.lt) teeth = `<rect x="${cx - w / 3}" y="${cy - 5}" width="${w * 2 / 3}" height="8" rx="1.5" fill="var(--m-teeth)" stroke="var(--m-line)" stroke-width=".6"/>`;
    const tongue = opts.tongue ? `<ellipse cx="${cx}" cy="${cy + 1}" rx="${w / 4}" ry="4.5" fill="var(--m-tongue)" stroke="var(--m-line)" stroke-width=".6"/>` : '';
    return `<svg class="mth" viewBox="0 0 120 90" role="img" aria-label="唇の正面図">
      <ellipse cx="60" cy="48" rx="56" ry="40" fill="var(--m-skin)"/>
      <path d="${outer}" fill="var(--m-lip)" stroke="var(--m-line)" stroke-width="1"/>
      ${h > 3 ? `<path d="${inner}" fill="var(--m-cav)"/>` : `<line x1="${cx - w / 2}" y1="${cy}" x2="${cx + w / 2}" y2="${cy}" stroke="var(--m-line)" stroke-width="1.4"/>`}
      ${teeth}${tongue}
    </svg>`;
  }
  function pics(p) {
    const front = p.cat === 'd'
      ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;align-items:center">${frontSVG(p.lips)}${frontSVG(DI_END[p.s] || 'neutral')}</div><div class="pharrow">はじめ → おわり</div>`
      : frontSVG(p.lips, {tongue: p.flags.includes('t')});
    return `<div class="phpics"><div>${sideSVG(p)}</div><div>${front}</div></div>`;
  }
  function card(p, extra = '') {
    return `<div class="phcard${p.risk >= 3 ? ' risk' : ''}" data-act="phopen" data-s="${esc(p.s)}" role="button" tabindex="0">
      <div class="row" style="justify-content:space-between"><span><span class="phsym">/${esc(p.s)}/</span> <b style="font-size:14px">${esc(p.name)}</b></span>${p.risk >= 3 ? '<span class="tag" style="color:var(--warn)">日本人注意</span>' : ''}</div>
      ${extra}${pics(p)}
      <span class="phtip">${esc(p.tip)}</span>
      ${p.trap ? `<span class="phtrap">${esc(p.trap)}</span>` : ''}
      <div class="phex">${p.ex.map(w => `<button class="wp" data-act="say" data-text="${esc(w)}">${esc(w)}</button>`).join('')}</div>
    </div>`;
  }

  /* ---------- IPA parsing & comparison ---------- */
  const MULTI = ['tʃ', 'dʒ', 'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'oʊ', 'aʊ', 'ɪə', 'eə', 'ʊə', 'iː', 'ɑː', 'ɔː', 'uː', 'ɜː'];
  function phonemes(ipa) {
    const s = (ipa || '').replace(/[ˈˌ.\/\s]/g, '').replace(/ɡ/g, 'g').replace(/ɹ/g, 'r').replace(/oʊ/g, 'əʊ').replace(/ɚ/g, 'ə').replace(/ɝ/g, 'ɜː');
    const out = [];
    for (let i = 0; i < s.length;) {
      const m = MULTI.find(x => s.startsWith(x, i));
      if (m) { out.push(m); i += m.length; continue; }
      const c = s[i]; i++;
      if (c === 'ː' && out.length) { out[out.length - 1] += 'ː'; continue; }
      const alias = {i: 'iː', u: 'ʊ', a: 'æ', o: 'ɒ', 'ɐ': 'ʌ', 'ɛ': 'e', 'ɑ': 'ɑː', 'ɔ': 'ɔː', 'ɫ': 'l', 'ɾ': 't', 'ʔ': 't'}[c];
      if (alias && s[i] !== 'ː') { out.push(alias); continue; }
      if (BY[c]) out.push(c);
    }
    return out.filter(x => BY[x]);
  }
  // which target sounds were replaced or dropped, by aligning the two phoneme strings
  function diffPhonemes(T, H) {
    const n = T.length, m = H.length, d = Array.from({length: n + 1}, (_, i) => Array.from({length: m + 1}, (_, j) => i + j));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (T[i - 1] === H[j - 1] ? 0 : 1));
    const res = []; let i = n, j = m;
    while (i > 0 && j > 0) {
      if (T[i - 1] === H[j - 1] && d[i][j] === d[i - 1][j - 1]) { i--; j--; }
      else if (d[i][j] === d[i - 1][j - 1] + 1) { res.push([T[i - 1], H[j - 1]]); i--; j--; }
      else if (d[i][j] === d[i - 1][j] + 1) { res.push([T[i - 1], null]); i--; }
      else j--;
    }
    while (i > 0) { res.push([T[i - 1], null]); i--; }
    return res.reverse();
  }
  // rough sound guess from spelling, for words without a dictionary IPA
  function guessFromSpelling(word) {
    const w = word.toLowerCase(), out = [];
    if (/th/.test(w)) out.push(/^th(e|is|at|ey|em|ere|ough|an|en|us)$|^th(is|at|ese|ose|ey|em|eir|ere|en|us)\b|the[rm]|ther/.test(w) ? 'ð' : 'θ');
    if (/r/.test(w.replace(/r$/, ''))) out.push('r');
    if (/l/.test(w)) out.push('l');
    if (/v/.test(w)) out.push('v');
    if (/f|ph/.test(w)) out.push('f');
    if (/^w|[^a-z]w|qu/.test(w)) out.push('w');
    if (/ng$/.test(w)) out.push('ŋ');
    if (/(ur|ir|er|or)[^aeiouy]/.test(w) || /^(w|)or[kld]/.test(w)) out.push('ɜː');
    return out;
  }
  const ipaOf = word => { const k = key(word); const w = WORDS.find(x => key(x.w) === k) || (window.LOOKUP_WORD ? window.LOOKUP_WORD(word) : null); return w?.ipa || null; };
  const soundsOf = word => { const ip = ipaOf(word); return ip ? phonemes(ip) : guessFromSpelling(word); };
  const risky = list => [...new Set(list)].map(s => BY[s]).filter(p => p && p.risk >= 2).sort((a, b) => b.risk - a.risk);

  // HTML block shown under a weak pronunciation attempt
  function feedbackFor({target, heard, words, marks, score}) {
    if (score == null || score >= 85) return '';
    let items = [], lead = '';
    if (!words) {                                     // single word
      const T = soundsOf(target), hip = heard && key(heard) !== key(target) ? ipaOf(heard.split(/\s+/).find(t => ipaOf(t)) || heard) : null;
      if (ipaOf(target) && hip) {
        const H = phonemes(hip), diffs = diffPhonemes(phonemes(ipaOf(target)), H).filter(([t]) => BY[t]);
        items = diffs.slice(0, 3).map(([t, h]) => [BY[t], h ? `「${heard}」に聞こえました → /${t}/ が /${h}/ になっている可能性` : `/${t}/ の音が聞こえていない可能性`]);
        lead = '聞き取り結果と比べて、違っていた可能性が高い音です。';
      }
      if (!items.length && T.length) { items = risky(T).slice(0, 2).map(p => [p, `「${target}」に含まれる注意の音`]); lead = 'この単語で日本人がつまずきやすい音です。'; }
    } else {                                          // sentence: look at words that were not recognised
      const missed = words.filter((w, i) => !marks[i]).map(w => w.replace(/[^A-Za-z'-]/g, '')).filter(Boolean);
      const found = new Map();
      missed.forEach(w => { risky(soundsOf(w)).slice(0, 2).forEach(p => { if (!found.has(p.s)) found.set(p.s, [p, `「${w}」の /${p.s}/`]); }); });
      items = [...found.values()].slice(0, 3); lead = '聞き取れなかった語に含まれる、注意が必要な音です。';
    }
    if (!items.length) return '';
    return `<div class="fbph"><b>口の形を確認しましょう</b><span class="small muted">${esc(lead)}図の矢印は息の流れです。</span>
      <div class="phgrid">${items.map(([p, why]) => card(p, `<span class="small" style="color:var(--bad)">${esc(why)}</span>`)).join('')}</div></div>`;
  }
  window.PRON_FEEDBACK = feedbackFor;
  window.PHONEME_CARD = s => BY[s] ? card(BY[s]) : '';

  /* ---------- guide view (発音練習 > 発音記号ガイド) ---------- */
  ui.phon = {f: 'risk', open: null};
  function vGuide() {
    const g = ui.phon;
    if (g.open) {
      const p = BY[g.open];
      const words = WORDS.filter(w => w.ipa && phonemes(w.ipa).includes(p.s) && ['A1', 'A2', 'B1'].includes(w.lv)).slice(0, 14);
      return `<div class="row"><button class="btn" data-act="phback">← 一覧に戻る</button></div>
      <div class="sheet panel phdetail">
        <div class="row" style="gap:14px"><span class="phsym" style="font-size:48px">/${esc(p.s)}/</span><div><b style="font-size:18px">${esc(p.name)}</b><div class="small muted">${{c: '子音', v: '母音', d: '二重母音'}[p.cat]}${p.flags.includes('v') ? ' · 声あり（のどが震える）' : p.cat === 'c' ? ' · 声なし（息だけ）' : ''}</div></div></div>
        ${pics(p)}
        <div class="small muted" style="display:flex;gap:16px;flex-wrap:wrap"><span>左：横から見た口の中（舌・歯・唇の位置）</span><span>右：正面から見た唇</span><span style="color:var(--m-air)">矢印：息の流れ</span></div>
        <p class="phtip" style="font-size:15px">${esc(p.tip)}</p>
        ${p.trap ? `<p class="phtrap" style="font-size:14px">日本人の注意：${esc(p.trap)}</p>` : ''}
        <div><b class="small">例の単語（タップで発音）</b><div class="phex" style="margin-top:6px">${[...p.ex, ...words.map(w => w.w)].filter((v, i, a) => a.indexOf(v) === i).map(w => `<button class="wp" data-act="say" data-text="${esc(w)}">${esc(w)}</button>`).join('')}</div></div>
        <div class="row"><button class="btn primary" data-act="phpractice" data-s="${esc(p.s)}">この音の単語で発音練習する</button></div>
      </div>`;
    }
    const F = {risk: ['日本人が苦手な音', p => p.risk >= 2], c: ['子音', p => p.cat === 'c'], v: ['母音', p => p.cat === 'v'], d: ['二重母音', p => p.cat === 'd'], all: ['すべて', () => true]};
    const list = PH.filter(F[g.f][1]);
    return `<div class="row"><div class="chips">${Object.entries(F).map(([k, [lb]]) => `<button class="chip" data-act="phf" data-v="${k}" aria-pressed="${g.f === k}" style="font-family:var(--f-ui)">${lb}</button>`).join('')}</div><span class="count">${list.length} 音</span></div>
      <p class="small muted">英語の44の音を、口の中の断面図（左）と唇の正面図（右）で説明します。カードを押すと拡大表示と例の単語が出ます。</p>
      <div class="phgrid">${list.map(p => card(p)).join('')}</div>`;
  }
  Object.assign(ACT, {
    phopen: d => { S.tab = 'pron'; ui.pron.mode = 'guide'; ui.phon.open = d.s; save(); render(); scrollTo({top: 0}); },
    phback: () => { ui.phon.open = null; render(); },
    phf: d => { ui.phon.f = d.v; render(); },
    phpractice: d => {
      const list = filtered(); const i = list.findIndex(w => w.ipa && phonemes(w.ipa).includes(d.s));
      ui.pron.mode = 'word'; ui.phon.open = null;
      if (i >= 0) ui.pron.i = i; else { S.levels = ['A1', 'A2', 'B1']; save(); const l2 = filtered(); ui.pron.i = Math.max(0, l2.findIndex(w => w.ipa && phonemes(w.ipa).includes(d.s))); }
      ui.pron.result = null; render();
    },
  });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('phcard')) { e.preventDefault(); ACT.phopen({s: e.target.dataset.s}); } });
  window.PHON_GUIDE = vGuide;
  window.PHONEMES = phonemes;
  window.PH_BY = BY;
})();
