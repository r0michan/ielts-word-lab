/* B2 First 形式（オリジナル問題）。Reading & Use of English Part 1–7 ＋ Writing Part 1 ＋ Listening Part 1。 */
window.CAMBRIDGE = window.CAMBRIDGE || {};
CAMBRIDGE.B2 = {
  name: "B2 First 形式", minutes: 100,
  parts: [
    {type: "mc_cloze", short: "Part 1 語彙", title: "Reading & Use of English Part 1", instr: "空所に入る最も適切な語を A〜D から選びます（語法・コロケーション）。",
      text: `Few British traditions have {1} as well as the pub quiz. What began in the 1970s as a way for landlords to fill their bars on quiet weeknights has {2} into a national pastime, with an estimated 22,000 quizzes taking place every week.
Part of the appeal is that anyone can {3} part. Teams are usually made up of friends or colleagues, and it is not unusual for a group of students to find themselves {4} against a table of retired teachers. The questions {5} from history and geography to pop music and sport, so no single person is likely to know every answer.
For many regulars, however, winning is {6} the point. The quiz gives them a reason to get together, and the prize – often just a few pounds or a bottle of wine – is {7} less important than the evening itself. As one landlord put it, "People come for the questions, but they stay for the {8}."`,
      gaps: [
        {opts: ["kept", "survived", "stayed", "held"], a: 1, why: "survive (well) = 時代を越えて生き残る。keep / stay / hold はこの形では目的語や補語が必要。"},
        {opts: ["grown", "raised", "risen", "extended"], a: 0, why: "grow into 〜 =「成長して〜になる」。raise は他動詞、rise into は不自然。"},
        {opts: ["make", "take", "have", "play"], a: 1, why: "take part（参加する）は決まった表現。"},
        {opts: ["competing", "fighting", "struggling", "challenging"], a: 0, why: "compete against 〜 =「〜と競う」。challenge は against を取らない。"},
        {opts: ["cover", "range", "include", "reach"], a: 1, why: "range from A to B =「A から B まで幅広い」。"},
        {opts: ["nearly", "hardly", "almost", "quite"], a: 1, why: "hardly the point =「ほとんど目的ではない」。後ろの however と文脈が合う。"},
        {opts: ["far", "very", "too", "so"], a: 0, why: "比較級（less important）を強めるのは far / much。very は比較級を修飾しない。"},
        {opts: ["company", "society", "membership", "audience"], a: 0, why: "company =「一緒にいる人・仲間との時間」。stay for the company で「仲間目当てで残る」。"},
      ]},
    {type: "open_cloze", short: "Part 2 空所補充", title: "Reading & Use of English Part 2", instr: "空所に入る語を1語だけ書きます（前置詞・代名詞・接続詞など文法語が中心）。",
      text: `The NHS running plan Couch to 5K was designed for people {1} have never run before. Over nine weeks, it takes beginners from walking to running five kilometres without stopping. {2} makes the programme so successful is its gradual approach: in the first week, runners alternate {3} sixty seconds of jogging and ninety seconds of walking.
Many people give up exercise plans because they try to do too much too soon. Couch to 5K avoids this {4} building up slowly, and an app offers encouragement from celebrity coaches. By the end, most users find {5} can run for thirty minutes, something they would not have believed possible at the start.
The plan has become so popular {6} local parks now host free weekly 5K runs, known as parkruns, every Saturday morning. Nobody cares how fast you are; what matters is that you turn {7}. As a result, thousands of people who once thought of {8} as "not sporty" are now regular runners.`,
      gaps: [
        {a: ["who", "that"], why: "people を説明する関係代名詞。"},
        {a: ["what"], why: "What makes 〜 is …「〜を…にしているのは…だ」。先行詞を含む what。"},
        {a: ["between"], why: "alternate between A and B =「A と B を交互に行う」。"},
        {a: ["by"], why: "by 〜ing =「〜することによって」。"},
        {a: ["they"], why: "find (that) they can 〜。主語 users を受ける代名詞。"},
        {a: ["that"], why: "so 〜 that …「とても〜なので…」。"},
        {a: ["up"], why: "turn up =「来る・姿を見せる」。"},
        {a: ["themselves"], why: "think of oneself as 〜「自分を〜だと思う」。主語と同じ人なので再帰代名詞。"},
      ]},
    {type: "wordform", short: "Part 3 語形成", title: "Reading & Use of English Part 3", instr: "右の大文字の語を、文に合う形に変えて書きます（名詞・形容詞・副詞・否定の接頭辞など）。",
      text: `Since 2020, working from home has become a {1} for millions of office workers in the UK and the US. For some, the {2} to avoid a long commute has transformed their lives. They report feeling less stressed and more {3}.
Others, however, have found the change {4} difficult. Without colleagues around them, they can feel lonely, and the {5} between work and home life can become unclear. Some managers also worry about {6}, arguing that ideas are shared more {7} in person.
Many companies have now chosen a hybrid model, which offers employees greater {8} by combining days in the office with days at home.`,
      gaps: [
        {stem: "REAL", a: ["reality"], why: "a の後なので名詞。become a reality =「現実になる」。"},
        {stem: "ABLE", a: ["ability"], why: "the 〜 to do の形の名詞。the ability to do =「〜する能力・できること」。"},
        {stem: "PRODUCE", a: ["productive"], why: "feeling more 〜 なので形容詞。productive =「生産的な」。"},
        {stem: "SURPRISE", a: ["surprisingly"], why: "形容詞 difficult を修飾するので副詞。"},
        {stem: "DIVIDE", a: ["division"], why: "the 〜 between A and B の名詞。division =「区切り・境界」。"},
        {stem: "COMMUNICATE", a: ["communication"], why: "worry about の後は名詞。"},
        {stem: "EASY", a: ["easily"], why: "動詞 are shared を修飾するので副詞。"},
        {stem: "FLEXIBLE", a: ["flexibility"], why: "greater の後は名詞。"},
      ]},
    {type: "kwt", short: "Part 4 書き換え", title: "Reading & Use of English Part 4", words: "2〜5", instr: "1文目と同じ意味になるように、太字のキーワードを変えずに使って2〜5語で空所を埋めます（1問2点）。",
      items: [
        {s1: "I haven't been to the cinema for months.", key: "LAST", s2: "It's months ___ to the cinema.", a: ["since i last went", "since i went last"], why: "It's 期間 since S last 過去形 =「最後に〜してから…になる」。"},
        {s1: "\"Don't forget to lock the door,\" Mum said to me.", key: "REMINDED", s2: "Mum ___ the door.", a: ["reminded me to lock"], why: "remind 人 to do =「人に〜するのを思い出させる」。"},
        {s1: "It's possible that Tom missed the train.", key: "MIGHT", s2: "Tom ___ the train.", a: ["might have missed"], why: "過去の推量は might have + 過去分詞。"},
        {s1: "The concert was cancelled because of the bad weather.", key: "CALLED", s2: "The concert ___ because of the bad weather.", a: ["was called off"], why: "call off =「中止する」。受け身で was called off。"},
        {s1: "I regret not studying harder for my exams.", key: "WISH", s2: "I ___ harder for my exams.", a: ["wish i had studied", "wish i'd studied"], why: "過去の後悔は wish + 過去完了。"},
        {s1: "Nobody in the class is taller than Sarah.", key: "TALLEST", s2: "Sarah ___ in the class.", a: ["is the tallest", "is the tallest person", "is the tallest student", "is the tallest girl", "is the tallest one"], why: "最上級 the tallest 〜 in the class。"},
      ]},
    {type: "mcq", short: "Part 5 長文", title: "Reading & Use of English Part 5", instr: "長文を読み、各設問の答えを A〜D から選びます（筆者の意図・語句の意味・詳細）。",
      text: `I passed my driving test last month, at the age of thirty-one. For most of my friends, this was a non-event – they learnt at seventeen, as soon as the law allowed, and have been driving ever since. Growing up in central London, however, I never saw the point. The Underground took me everywhere I needed to go, parking was expensive, and the idea of sitting in traffic on the North Circular filled me with horror.
Things changed when my sister moved to a village in Devon. The nearest station was eleven miles from her house, and buses ran twice a day – if you were lucky. After my third visit involving an expensive taxi, I realised that my independence in London had depended entirely on a city that did the driving for me.
My first lesson was humbling. My instructor, a patient man called Dev who had been teaching for twenty years, asked me to move the car forward a few metres in an empty car park. I stalled it four times. "Don't worry," he said, in a voice that suggested he had seen far worse. "Nobody is born knowing how to use a clutch." I wasn't convinced. Teenagers, I thought, seemed to pick these things up without effort, while I was overthinking every movement of my feet.
Dev had a theory about this. Adult learners, he told me, are often more cautious than younger ones because they understand the risks better. A seventeen-year-old believes nothing bad will ever happen to them; a thirty-year-old has read the news. This caution, he said, was not a weakness, but it did need to be managed. If I let fear take over, I would hesitate at roundabouts and make the situation more dangerous, not less.
Over the next six months, we practised twice a week. Slowly, the separate actions – checking mirrors, signalling, changing gear – stopped feeling like a list I had to remember and became a single, smooth process. I began to understand why people describe driving as "second nature". One evening, I drove home from a lesson and realised I had not thought about my feet once.
The test itself was less dramatic than I had imagined. The examiner barely spoke, which I found strangely calming, and the only moment of real panic came when a cyclist appeared from nowhere on a narrow street. I stopped in time, and afterwards the examiner simply said, "Good observation." I have rarely been so pleased by two words.
I don't drive much in London even now. But last weekend I drove the whole way to Devon, stopping at a motorway service station for terrible coffee, and arrived at my sister's door without anyone's help. It was, I think, the most grown-up thing I have ever done.`,
      items: [
        {q: "Why did the writer not learn to drive as a teenager?", opts: ["She was afraid of having an accident.", "She did not need a car where she lived.", "Lessons were too expensive.", "Her friends discouraged her."], a: 1, why: "第1段落：地下鉄でどこへでも行けたので never saw the point（必要性を感じなかった）。"},
        {q: "What made the writer decide to learn?", opts: ["Her sister asked her to.", "She wanted to move out of London.", "Visiting a relative was difficult without a car.", "She lost her job in the city."], a: 2, why: "第2段落：妹の村は駅から遠くバスも少なく、タクシー代が高くついた。"},
        {q: "What does the writer suggest about her first lesson?", opts: ["Her instructor lost patience with her.", "She felt she was slower than younger learners.", "The car was difficult to control because it was old.", "She was pleased with her progress."], a: 1, why: "Teenagers seemed to pick these things up without effort, while I was overthinking… と若い人と比べている。"},
        {q: "According to Dev, adult learners", opts: ["learn more slowly than teenagers.", "should try to forget about danger completely.", "need to control their natural caution.", "are safer drivers than young people."], a: 2, why: "caution… was not a weakness, but it did need to be managed。D は本文に書かれていない。"},
        {q: "What does the writer mean by driving becoming \"second nature\"?", opts: ["She could do it without thinking.", "She had learnt it from her family.", "It had taken her years to learn.", "It made her feel close to nature."], a: 0, why: "直後の I had not thought about my feet once（足の動きを一度も意識しなかった）が言い換え。"},
        {q: "How did the writer feel about the examiner's comment?", opts: ["surprised that he spoke at all", "very proud", "worried she had made a mistake", "annoyed that he said so little"], a: 1, why: "I have rarely been so pleased by two words =「2語でこれほど嬉しかったことはめったにない」。"},
      ]},
    {type: "gapped", short: "Part 6 文挿入", title: "Reading & Use of English Part 6", instr: "文章から6つの文が抜けています。A〜G から合う文を選びます（1つは使いません）。前後の代名詞・つなぎの言葉が手がかり。",
      text: `Walk through almost any British city after dark and you may see a red fox crossing the road. Foxes first moved into towns in the 1930s, when new suburbs with large gardens offered food and shelter. {1} Today, scientists estimate that around 150,000 foxes live in urban areas across the UK.
Many residents enjoy seeing them. Others are less enthusiastic, complaining about noise and overturned rubbish bins. {2} In fact, research suggests that most urban foxes get only a small part of their diet from human waste.
So what do they eat? Mostly worms, insects, birds and small mammals such as mice. {3} This flexible diet is one of the main reasons the species has done so well in an environment that has driven many other animals away.
City foxes also behave differently from their country relatives. {4} They have learnt that cars follow predictable routes and that people rarely pose a threat, so they are bolder and more willing to come close to houses.
Not everyone agrees on how to deal with them. Some councils have tried to remove foxes from problem areas, but this rarely works for long. {5} Experts now recommend simpler measures, such as securing bins and blocking gaps under sheds.
For the scientists who study them, urban foxes offer a fascinating example of how wildlife can adapt to human life. {6} Whether we welcome them or not, it seems they are here to stay.`,
      options: [
        "When one family is removed, another soon moves into the empty territory.",
        "They will, however, happily take fruit, bread or pet food left out in gardens.",
        "These quickly proved to be an ideal habitat, and the population grew rapidly.",
        "Yet the image of the fox as a bin-raiding pest is largely unfair.",
        "For example, they are far less frightened of traffic and human voices.",
        "They may even help us understand how other species could survive in a changing world.",
        "Foxes in the countryside are often hunted by farmers to protect their animals.",
      ],
      gaps: [
        {a: 2, why: "These = new suburbs。「理想的なすみかとなり数が急増」→ 次の Today の数字につながる。"},
        {a: 3, why: "Yet で前文の苦情に反論 → In fact で根拠を示す流れ。"},
        {a: 1, why: "主食（虫・ネズミ）の後に however で「でも果物やペットフードも食べる」→ This flexible diet。"},
        {a: 4, why: "For example で「田舎のキツネとの違い」の具体例 → 次文で理由。"},
        {a: 0, why: "駆除が長続きしない理由：空いた縄張りにすぐ別の家族が来る。"},
        {a: 5, why: "科学者にとっての意義の続き：他の種の生き残りの理解にも役立つ。G はどこにも合わない。"},
      ]},
    {type: "matching", short: "Part 7 照合", title: "Reading & Use of English Part 7", instr: "4人が初めての仕事について書いています。各設問に当てはまる人を A〜D から選びます（同じ人を何度選んでもよい）。",
      texts: [
        {k: "A", title: "Callum", body: "My first job was making coffee at a busy café near Manchester Piccadilly station. The early starts were brutal – I had to be there at half past five – and for the first few weeks I was exhausted. What I hadn't expected was how much I'd learn about people. Regulars would tell me about their lives while I made their flat whites, and I became quite good at remembering everyone's order. The pay wasn't great, but the tips made up for it. Looking back, the most useful thing I gained was confidence: I used to be terrified of talking to strangers, and by the end I could chat to anyone."},
        {k: "B", title: "Priya", body: "I spent a summer as an intern at a small publishing company in Brooklyn. I'd always dreamed of working with books, so I was thrilled to be offered the place, even though it was unpaid and I had to share a tiny flat with three other interns to afford it. The reality was less glamorous than I'd imagined – I spent most days photocopying and answering emails. However, one of the editors noticed I was reading manuscripts in my lunch break and started asking for my opinions. One of the novels I recommended was eventually published, which still amazes me."},
        {k: "C", title: "Jake", body: "I worked as a lifeguard at a beach in San Diego for two summers. People assume it's an easy job – sitting in the sun all day – but the training was tougher than anything I'd done before. We had to swim long distances in cold water and pass a first-aid exam. Most days were quiet, which meant concentrating for hours on end without anything happening. That was actually the hardest part. I only had to rescue someone twice, and both times my training took over completely. I didn't have time to feel scared until afterwards."},
        {k: "D", title: "Emily", body: "At sixteen I got a Saturday job at a vet's surgery in Bristol. I thought I'd be cuddling puppies, but mostly I cleaned cages and answered the phone. Some days were upsetting, especially when owners had to say goodbye to old pets, and I sometimes went home in tears. My manager was brilliant, though. She explained that dealing with sad moments was part of caring for animals, and she let me watch simple operations when I was ready. That job made me certain about my career – I'm now in my second year studying veterinary science."},
      ],
      items: [
        {q: "was surprised by how much they learnt about other people?", a: "A", why: "What I hadn't expected was how much I'd learn about people."},
        {q: "did not earn any money?", a: "B", why: "it was unpaid"},
        {q: "found that waiting for something to happen was difficult?", a: "C", why: "concentrating for hours… without anything happening. That was the hardest part."},
        {q: "decided what they wanted to do in the future?", a: "D", why: "That job made me certain about my career"},
        {q: "had to pass a test before starting work?", a: "C", why: "pass a first-aid exam"},
        {q: "had their opinion taken seriously by a colleague?", a: "B", why: "an editor started asking for my opinions… a novel I recommended was published"},
        {q: "found some parts of the job emotionally hard?", a: "D", why: "Some days were upsetting… I sometimes went home in tears."},
        {q: "became less shy?", a: "A", why: "I used to be terrified of talking to strangers… I could chat to anyone."},
        {q: "lived in uncomfortable conditions in order to do the job?", a: "B", why: "share a tiny flat with three other interns"},
        {q: "says extra payments made a low wage acceptable?", a: "A", why: "The pay wasn't great, but the tips made up for it."},
      ]},
    {type: "writing", short: "Writing エッセイ", title: "Writing Part 1（エッセイ）", instr: "140〜190語でエッセイを書き、チェックリストで自己採点します。",
      prompt: `In your English class you have been talking about where people live. Now your English teacher has asked you to write an essay.

Is it better to live in a big city or a small town?

Notes – write about:
1. jobs and education
2. the cost of living
3. ........................ (your own idea)`,
      min: 140, max: 190, points: 14,
      checks: [
        "140〜190語の範囲で書いた",
        "ポイント1（仕事・教育）に触れた",
        "ポイント2（生活費）に触れた",
        "自分のアイデア（3つ目のポイント）を加えた",
        "導入 → 本論（段落分け）→ 結論 の構成になっている",
        "自分の意見が結論ではっきり書かれている",
        "However / In addition / On the other hand などつなぎの言葉を3つ以上使った",
        "同じ単語の繰り返しを避け、B2らしい語彙（opportunities, affordable など）を使った",
        "ややフォーマルな文体（短縮形・くだけた表現を避けた）",
        "時制・三単現・冠詞・スペルを見直した",
      ],
      model: `Many young people dream of moving to a big city, while others prefer the peace of a small town. Both options have clear advantages.

The main argument for city life is opportunity. Large cities such as London or New York offer a far wider range of jobs, and the best universities are usually located there. For an ambitious young person, this can make a huge difference to their future.

On the other hand, cities are extremely expensive. Rents in central London, for example, can take more than half of a person's salary, whereas in a small town the same money might pay for a whole house. As a result, many city workers have little left over at the end of the month.

In addition, small towns often have a stronger sense of community. Neighbours know each other, and children can play outside safely.

In my opinion, a big city is the better choice for people in their twenties who are building a career. However, a small town is probably ideal for raising a family.`},
    {type: "listen", short: "Listening Part 1", title: "Listening Part 1", instr: "8つの短い会話・発言を聞き、A〜C から答えを選びます。各音声は2回まで再生できます（再生ボタンを押したときだけ流れます）。",
      items: [
        {q: "You hear a woman talking about a new gym. What does she like most about it?", opts: ["the price", "the classes", "the location"], a: 1, lines: [["W", "I joined that new gym on the high street last week."], ["M", "Is it expensive?"], ["W", "Not really, about the same as my old one. And it's actually a bit further from my flat. But the yoga and spin sessions are brilliant. The instructors really push you."]], why: "値段は前と同じ、場所はむしろ遠い。brilliant と褒めているのはクラス。"},
        {q: "You hear a man leaving a voicemail. Why is he calling?", opts: ["to change a booking", "to cancel an appointment", "to complain about a service"], a: 0, lines: [["M", "Hi, it's Mark Davies. I've got a table booked for six people on Friday at eight. Two more friends want to come, so could you make it eight people instead? And if possible, half an hour later. Thanks very much."]], why: "人数と時間の変更 = 予約の変更。"},
        {q: "You hear two friends talking about a film. What do they agree about?", opts: ["The acting was excellent.", "It was too long.", "The ending was surprising."], a: 2, lines: [["W", "Well, the main actor was amazing, wasn't he?"], ["M", "I thought he was a bit wooden, to be honest. But the ending! I really didn't see that coming."], ["W", "No, nor did I. Though I could have done without the first hour."], ["M", "Really? I thought that part was fine."]], why: "nor did I =「私も予想できなかった」。演技と長さは意見が割れている。"},
        {q: "You hear a student talking about her part-time job. How does she feel about it?", opts: ["It takes too much time from her studies.", "She wishes it paid better.", "She enjoys talking to the customers."], a: 2, lines: [["W", "I work at the bookshop on Saturdays. People think it's boring, but I love it. The money's okay, nothing special, but it covers my phone bill. And it's only one day a week, so it doesn't affect my uni work. What I really like is chatting to the regulars about what they're reading."]], why: "What I really like is chatting to the regulars。"},
        {q: "You hear a man talking about a holiday in Scotland. What went wrong?", opts: ["The weather was bad.", "He lost his luggage.", "The hotel was full."], a: 1, lines: [["M", "Everyone warned me about the rain in the Highlands, but we had sunshine every day. The hotel was lovely too. The only problem was at the airport in Edinburgh. My suitcase ended up in Dublin, and I had to buy clothes for the first three days."]], why: "スーツケースがダブリンへ = 荷物をなくした。雨の話はひっかけ。"},
        {q: "You hear a woman talking on the radio about cooking. What is she doing?", opts: ["recommending a restaurant", "giving advice to beginners", "describing a recipe from her childhood"], a: 1, lines: [["W", "If you've never cooked before, don't start with something complicated. Pick three simple dishes, say a pasta, a soup and a stir-fry, and make them again and again until you don't need the recipe. Once you're confident, you can start experimenting."]], why: "If you've never cooked before… と初心者への助言。"},
        {q: "You hear two colleagues talking. What does the man want the woman to do?", opts: ["help him with a presentation", "go to a meeting in his place", "lend him her laptop"], a: 1, lines: [["M", "Are you free on Thursday afternoon?"], ["W", "I think so. Why?"], ["M", "I'm supposed to be at the budget meeting at two, but my daughter's school play is at the same time. Could you go instead and take notes for me?"], ["W", "Sure, no problem."]], why: "Could you go instead = 代わりに会議に出てほしい。"},
        {q: "You hear a man talking about learning the guitar. What helped him most?", opts: ["online videos", "playing with other people", "practising every day"], a: 1, lines: [["M", "I tried teaching myself with videos for about a year and didn't get very far. Practising alone, I'd just play the same few songs. What changed everything was joining a band with some friends. Suddenly I had to keep up, learn new chords quickly and listen to the others."]], why: "What changed everything was joining a band。"},
      ]},
  ],
};
