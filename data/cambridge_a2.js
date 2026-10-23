/* A2 Key 形式（オリジナル問題）。Reading & Writing Part 1–6 ＋ Listening。 */
window.CAMBRIDGE = window.CAMBRIDGE || {};
CAMBRIDGE.A2 = {
  name: "A2 Key 形式", minutes: 50,
  parts: [
    {type: "mcq", short: "Part 1 掲示", title: "Reading Part 1", instr: "掲示やメモを読み、内容に合うものを A〜C から選びます。",
      items: [
        {text: "CAFÉ\nBack in 10 minutes.\nPlease wait here.", q: "What does the sign say?", opts: ["The café is closed today.", "Someone will come back soon.", "You must pay before you sit down."], a: 1, why: "Back in 10 minutes =「10分で戻ります」。"},
        {text: "Mum – I've taken the dog for a walk. Back by 5. Can you buy some milk?\nLily", q: "What does Lily want Mum to do?", opts: ["walk the dog", "get some milk", "come home at 5"], a: 1, why: "Can you buy some milk? = 牛乳を買ってきて。"},
        {text: "LIBRARY\nBooks must be returned within 3 weeks.", q: "What does the sign say?", opts: ["You can keep a book for up to 3 weeks.", "The library is closed for 3 weeks.", "You can only borrow 3 books."], a: 0, why: "within 3 weeks =「3週間以内に」返す。"},
        {text: "NO MOBILE PHONES\nin the exam room", q: "What does the sign mean?", opts: ["You can use your phone in the exam.", "You must not have your phone in the exam room.", "You must turn your phone off in the corridor."], a: 1, why: "No 〜 =「〜禁止」。"},
        {text: "Bus 24 does not stop here on Sundays.\nPlease use the stop on King Street.", q: "What does the notice say?", opts: ["On Sundays, you can catch bus 24 on King Street.", "Bus 24 doesn't run on Sundays.", "King Street is closed on Sundays."], a: 0, why: "日曜は King Street のバス停を使う。バス自体は走っている。"},
        {text: "FOOTBALL CLUB – new players welcome!\nTraining every Tuesday, 6 pm.\nBring water and your own boots.", q: "What does the notice say?", opts: ["Players need their own boots.", "The club only trains at weekends.", "Only good players can join."], a: 0, why: "Bring… your own boots。"},
      ]},
    {type: "matching", short: "Part 2 照合", title: "Reading Part 2", instr: "3人の休暇の話を読み、各質問に合う人を A〜C から選びます。",
      texts: [
        {k: "A", title: "Sam", body: "Last summer I went to New York with my mum and dad. We stayed in a hotel near Central Park for a week. We visited lots of museums, and I loved the Natural History Museum. Eating out was very expensive, so we often had sandwiches in the park. I'd love to go back one day and watch a basketball game."},
        {k: "B", title: "Ruby", body: "In August I went camping in Wales with three friends. It rained almost every day, but we still had fun. We cooked all our meals on a small stove outside the tent. We didn't spend much money because we did everything ourselves. I don't think I'll go camping again, though!"},
        {k: "C", title: "Leo", body: "I spent two weeks in Cornwall with my grandparents. We went by train, and the journey took six hours. Every morning I had surfing lessons on the beach. It was my first time, and I fell off a lot! In the evenings we ate fish and chips by the sea."},
      ],
      items: [
        {q: "Who went on holiday with older members of their family?", a: "C", why: "with my grandparents"},
        {q: "Who had bad weather?", a: "B", why: "It rained almost every day"},
        {q: "Who thought food in restaurants cost a lot?", a: "A", why: "Eating out was very expensive"},
        {q: "Who tried a new sport?", a: "C", why: "surfing lessons… my first time"},
        {q: "Who stayed in a hotel?", a: "A", why: "We stayed in a hotel near Central Park"},
        {q: "Who made their own meals?", a: "B", why: "We cooked all our meals"},
        {q: "Who wants to visit the same place again?", a: "A", why: "I'd love to go back one day。Ruby はもうキャンプはしたくない。"},
      ]},
    {type: "mcq", short: "Part 3 長文", title: "Reading Part 3", instr: "文章を読み、A〜C から答えを選びます。",
      text: `Josh Taylor is nineteen and works at a small restaurant in Liverpool. He started cooking when he was twelve. "My mum worked late, so I made dinner for my little brother," he says. "At first it was just pasta, but I soon wanted to try new things."
After school, Josh went to college to study cooking for two years. He liked the classes, but he learned the most from working in a real kitchen. "At college you have lots of time. In a restaurant, everything has to be ready in minutes," he explains.
Josh starts work at two o'clock in the afternoon and finishes at about eleven at night. The work is hard, and he's often tired. "My friends go out on Saturday nights, and I'm always working," he says. "But I love it when customers send a message to the kitchen to say they enjoyed their food."
Next year, Josh wants to work in a restaurant in London to learn more. One day, he hopes to open his own café by the sea.`,
      items: [
        {q: "Why did Josh start cooking?", opts: ["He wanted to be a chef.", "He had to make meals for his brother.", "His mum taught him."], a: 1, why: "母が遅くまで働いていたので弟の夕食を作った。"},
        {q: "Where did Josh learn the most?", opts: ["at college", "at home", "in a restaurant kitchen"], a: 2, why: "he learned the most from working in a real kitchen。"},
        {q: "What does Josh say about working in a restaurant?", opts: ["There isn't much time.", "The hours are short.", "He has lots of free weekends."], a: 0, why: "everything has to be ready in minutes。"},
        {q: "What does Josh enjoy most about his job?", opts: ["hearing that customers liked his food", "working with his friends", "cooking pasta"], a: 0, why: "I love it when customers… say they enjoyed their food。"},
        {q: "What does Josh want to do next year?", opts: ["open a café", "move to London", "go back to college"], a: 1, why: "Next year → London のレストラン。カフェは One day（いつか）。"},
      ]},
    {type: "mc_cloze", short: "Part 4 語彙", title: "Reading Part 4", instr: "空所に入る語を A〜C から選びます。",
      text: `The Eden Project is in Cornwall, in the south-west of England. It {1} in 2001 and is famous for its two huge "biomes", which look like giant bubbles. Inside one of them, it is hot and wet, {2} a rainforest. You can see trees and plants from all {3} the world.
Visitors can walk through the forest and even climb up to a platform {4} the tops of the trees. There is also a café where you can try food {5} with plants grown at Eden. It's a great day out for families, but it can get very busy in summer, so it's a good {6} to arrive early.`,
      gaps: [
        {opts: ["opened", "born", "made"], a: 0, why: "施設が「開いた・開業した」は open。"},
        {opts: ["as", "like", "same"], a: 1, why: "like a rainforest =「熱帯雨林のように」。"},
        {opts: ["over", "on", "at"], a: 0, why: "from all over the world =「世界中から」。"},
        {opts: ["under", "above", "through"], a: 1, why: "上に登るので above the tops of the trees。"},
        {opts: ["cooked", "done", "built"], a: 0, why: "food cooked with 〜 =「〜で料理された食べ物」。"},
        {opts: ["plan", "idea", "thought"], a: 1, why: "It's a good idea to 〜 =「〜するのがよい」。"},
      ]},
    {type: "open_cloze", short: "Part 5 空所補充", title: "Reading Part 5", instr: "空所に1語ずつ書きます。",
      text: `Hi Emma,
I'm {1} a great time in Edinburgh! The city is beautiful, and there {2} so many interesting things to do. Yesterday we walked up to the castle. It took {3} an hour, but the view from the top was amazing.
{4} the evening we had dinner at a little Scottish restaurant. Tomorrow we're going {5} visit a museum about the history of the city.
{6} you like to come with us next time?
Love,
Kate`,
      gaps: [
        {a: ["having"], why: "have a great time（楽しく過ごす）の現在進行形。"},
        {a: ["are"], why: "there are + 複数名詞（things）。"},
        {a: ["about", "almost", "nearly", "over", "half"], why: "It took about an hour =「約1時間かかった」。"},
        {a: ["in"], why: "in the evening。"},
        {a: ["to"], why: "be going to + 動詞の原形。"},
        {a: ["would"], why: "Would you like to 〜? =「〜しませんか」。"},
      ]},
    {type: "writing", short: "Writing メール", title: "Writing Part 6（短いメール）", instr: "25語以上でメールを書き、チェックリストで自己採点します。",
      prompt: `You want to go to the cinema with your English friend Jamie on Saturday.

Write an email to Jamie. In your email:
• say which film you want to see
• say what time you want to meet
• say where you want to meet

Write 25 words or more.`,
      min: 25, max: 70, points: 6,
      checks: [
        "25語以上で書いた",
        "見たい映画を書いた",
        "会う時間を書いた",
        "会う場所を書いた",
        "Hi Jamie, ではじめ、See you! / Bye! などで結んだ",
        "Let's / Shall we / Would you like to などの誘い方を使い、文頭の大文字とピリオドを見直した",
      ],
      model: `Hi Jamie,

Would you like to see the new Spider-Man film with me on Saturday? Let's meet at half past two outside the cinema on Park Street. The film starts at three.

See you!
Yuki`},
    {type: "listen", short: "Listening", title: "Listening Part 1・2", instr: "短い会話を聞き、A〜C から答えを選びます（各2回まで再生）。",
      items: [
        {q: "What time is the dentist appointment?", opts: ["2.15", "2.30", "3.00"], a: 1, lines: [["W", "Hello, this is Smile Dental. Your appointment on Tuesday is at half past two, not three o'clock. Please arrive fifteen minutes early."]], why: "half past two = 2時半。2.15 は早めに来る時間。"},
        {q: "How much is the T-shirt now?", opts: ["£8", "£10", "£12"], a: 0, lines: [["M", "Excuse me, how much is this T-shirt?"], ["W", "It was twelve pounds, but it's in the sale now, so it's eight."]], why: "セールで8ポンド。"},
        {q: "What will the weather be like tomorrow?", opts: ["cold", "sunny", "rainy"], a: 1, lines: [["W", "Today has been cold and cloudy, but tomorrow it'll be warm and sunny all day."]], why: "cold は今日。明日は sunny。"},
        {q: "Where is the boy's phone?", opts: ["in his bag", "on the kitchen table", "in the car"], a: 2, lines: [["M", "Mum, have you seen my phone? It's not in my bag."], ["W", "I saw it on the kitchen table this morning."], ["M", "It's not there either. Oh wait, I left it in the car!"]], why: "最後に I left it in the car。"},
        {q: "What will they do on Saturday?", opts: ["go swimming", "play tennis", "see a film"], a: 1, lines: [["W", "Do you want to go swimming on Saturday?"], ["M", "The pool's closed for cleaning this weekend."], ["W", "Oh. Tennis, then?"], ["M", "Good idea. I'll book a court."]], why: "プールは閉まっているのでテニス。"},
      ]},
  ],
};
