/* A1 形式（Cambridge A1 Movers を大人向けにしたオリジナル問題）。Reading 4パート ＋ Writing ＋ Listening。 */
window.CAMBRIDGE = window.CAMBRIDGE || {};
CAMBRIDGE.A1 = {
  name: "A1（Movers 大人版）形式", minutes: 30,
  parts: [
    {type: "mcq", short: "Part 1 掲示", title: "Reading Part 1", instr: "掲示やメモを読み、答えを A〜C から選びます。",
      items: [
        {text: "OPEN 9 am – 5 pm\nClosed on Sundays", q: "When can you go?", opts: ["Sunday at 10 am", "Monday at 10 am", "Monday at 7 pm"], a: 1, why: "月曜の朝10時は営業時間内。日曜は休み、夜7時は閉店後。"},
        {text: "EXIT →", q: "This sign shows", opts: ["the way out.", "the toilets.", "the shop."], a: 0, why: "exit =「出口」。"},
        {text: "Please do not feed the ducks.", q: "What does the sign say?", opts: ["You can give food to the ducks.", "Don't give food to the ducks.", "The ducks are hungry."], a: 1, why: "do not feed =「えさを与えないで」。"},
        {text: "Coffee £2.50\nTea £2.00\nCake £3.00", q: "How much is a tea and a cake?", opts: ["£4.50", "£5.00", "£5.50"], a: 1, why: "2.00 + 3.00 = 5.00。"},
        {text: "Ben – I'm at the shop. Back at 6.\nMum", q: "Where is Mum?", opts: ["at home", "at the shop", "at work"], a: 1, why: "I'm at the shop。"},
      ]},
    {type: "mc_cloze", short: "Part 2 文法", title: "Reading Part 2", instr: "空所に入る語を A〜C から選びます。",
      text: `My name is Anna. I {1} twenty-five years old and I live in Bristol. I {2} in a hospital. Every morning I go to work {3} bus. I like my job because I help people.
In the evening I {4} dinner and watch TV. At the weekend I often visit my parents. They live {5} a small village near Bath.`,
      gaps: [
        {opts: ["is", "am", "are"], a: 1, why: "I の be 動詞は am。"},
        {opts: ["work", "works", "working"], a: 0, why: "I が主語なので s はつかない。"},
        {opts: ["on", "by", "in"], a: 1, why: "交通手段は by bus / by train。"},
        {opts: ["cooks", "cooking", "cook"], a: 2, why: "主語 I → cook。"},
        {opts: ["at", "in", "on"], a: 1, why: "町や村の中に住む → in a village。"},
      ]},
    {type: "mcq", short: "Part 3 読解", title: "Reading Part 3", instr: "文章を読み、答えを A〜C から選びます。",
      text: `Tom lives in New York with his wife, Kate, and their two children. They have a small flat on the fifth floor. Tom is a taxi driver. He starts work at seven o'clock in the morning and drives all day. Kate is a teacher at a school near their home.
On Saturdays the family goes to Central Park. The children love the park because they can play football and see the ducks on the lake. Tom likes the park because there are no cars! On Sundays they visit Kate's mother. She makes a big lunch for everyone.`,
      items: [
        {q: "Where does Tom live?", opts: ["London", "New York", "Boston"], a: 1, why: "Tom lives in New York。"},
        {q: "What is Tom's job?", opts: ["taxi driver", "teacher", "bus driver"], a: 0, why: "Tom is a taxi driver。teacher は Kate。"},
        {q: "What time does Tom start work?", opts: ["at five o'clock", "at seven o'clock", "at nine o'clock"], a: 1, why: "He starts work at seven o'clock。"},
        {q: "Why does Tom like the park?", opts: ["He can play football.", "There are no cars.", "He can see the ducks."], a: 1, why: "サッカーとアヒルは子どもたちの理由。"},
        {q: "What do they do on Sundays?", opts: ["go to the park", "visit Kate's mother", "go to school"], a: 1, why: "On Sundays they visit Kate's mother。"},
      ]},
    {type: "open_cloze", short: "Part 4 空所補充", title: "Reading Part 4", instr: "空所に1語ずつ書きます。",
      text: `Hi Sara!
How {1} you? I'm in London {2} my sister. The weather is cold, but we are happy. Yesterday we {3} to the British Museum. It was great!
Tomorrow we want {4} see Big Ben. {5} you like London?
Love,
Mia`,
      gaps: [
        {a: ["are"], why: "How are you?"},
        {a: ["with"], why: "with my sister =「姉（妹）と一緒に」。"},
        {a: ["went"], why: "Yesterday なので go の過去形 went。"},
        {a: ["to"], why: "want to + 動詞の原形。"},
        {a: ["do", "did"], why: "一般動詞 like の疑問文は Do you 〜?"},
      ]},
    {type: "writing", short: "Writing 自己紹介", title: "Writing", instr: "20語以上で自己紹介を書き、チェックリストで自己採点します。",
      prompt: `Write about yourself.
• What's your name?
• Where do you live?
• What is your job, or where do you study?
• What do you like doing?

Write 20 words or more.`,
      min: 20, max: 60, points: 5,
      checks: [
        "20語以上で書いた",
        "名前と住んでいる所を書いた",
        "仕事か学校を書いた",
        "好きなことを書いた（I like ～ing）",
        "I, 文の最初, 地名を大文字にし、文の最後にピリオドを打った",
      ],
      model: `My name is Haruto. I live in Osaka with my family. I work in an office. I like playing football and watching films. At the weekend I often go to the park.`},
    {type: "listen", short: "Listening", title: "Listening", instr: "短い会話を聞き、答えを A〜C から選びます（各2回まで再生）。",
      items: [
        {q: "What's the woman's name?", opts: ["Lucy", "Lisa", "Laura"], a: 0, lines: [["M", "What's your name?"], ["W", "It's Lucy. L, U, C, Y."]], why: "L-U-C-Y とつづりを言っている。"},
        {q: "How old is the boy?", opts: ["ten", "eight", "eighteen"], a: 1, lines: [["M", "How old is your son?"], ["W", "He's eight. His sister is ten."]], why: "ten は姉（妹）。"},
        {q: "What does the man want?", opts: ["a coffee and a cake", "a tea", "a coffee"], a: 2, lines: [["M", "Can I have a coffee, please? No sugar."], ["W", "Anything to eat?"], ["M", "No, thank you."]], why: "食べ物はいらない → コーヒーだけ。"},
        {q: "Where is the bank?", opts: ["next to the park", "next to the post office", "opposite the post office"], a: 1, lines: [["W", "Excuse me, where's the bank?"], ["M", "It's next to the post office, opposite the park."]], why: "next to = 隣、opposite = 向かい。"},
        {q: "What day is the party?", opts: ["Friday", "Saturday", "Sunday"], a: 1, lines: [["W", "Is the party on Friday?"], ["M", "No, it's on Saturday, at my house."]], why: "No, it's on Saturday。"},
      ]},
  ],
};
