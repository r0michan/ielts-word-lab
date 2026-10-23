/* C1 Advanced 形式（オリジナル問題）。Reading & Use of English Part 1–5, 7, 8 ＋ Writing Part 1 ＋ Listening Part 1。 */
window.CAMBRIDGE = window.CAMBRIDGE || {};
CAMBRIDGE.C1 = {
  name: "C1 Advanced 形式", minutes: 110,
  parts: [
    {type: "mc_cloze", short: "Part 1 語彙", title: "Reading & Use of English Part 1", instr: "空所に入る最も適切な語を A〜D から選びます（コロケーション・語法の細かい違い）。",
      text: `Sociologists have long argued that people need a "third place" – somewhere that is neither home nor work – in order to {1} a sense of belonging. Traditionally, this role was {2} by pubs, barbershops and community halls. In recent decades, however, coffee chains have {3} on the idea, designing their branches as comfortable spaces where customers are encouraged to linger.
The strategy has proved remarkably successful, but critics {4} out that a café you must pay to enter is not truly a public space. Moreover, the rise of remote working has {5} the balance: many customers now spend hours {6} to a laptop, seemingly oblivious to the people around them. Whether such places can genuinely {7} the place of the old village pub remains, at best, an open question. What is clear is that the {8} for informal gathering spaces is greater than ever.`,
      gaps: [
        {opts: ["breed", "foster", "nurse", "raise"], a: 1, why: "foster a sense of belonging =「帰属意識を育む」は定番コロケーション。"},
        {opts: ["achieved", "completed", "fulfilled", "accomplished"], a: 2, why: "fulfil a role =「役割を果たす」。"},
        {opts: ["profited", "capitalised", "benefited", "exploited"], a: 1, why: "capitalise on 〜 =「〜を利用する」。profit / benefit は from、exploit は他動詞。"},
        {opts: ["point", "bring", "make", "set"], a: 0, why: "point out that 〜 =「〜と指摘する」。"},
        {opts: ["turned", "bent", "tipped", "rolled"], a: 2, why: "tip the balance =「形勢を変える」。"},
        {opts: ["sealed", "glued", "bolted", "fastened"], a: 1, why: "be glued to a screen / laptop =「画面に釘付け」。"},
        {opts: ["make", "take", "have", "get"], a: 1, why: "take the place of 〜 =「〜に取って代わる」。"},
        {opts: ["demand", "request", "claim", "order"], a: 0, why: "demand for 〜 =「〜への需要」。"},
      ]},
    {type: "open_cloze", short: "Part 2 空所補充", title: "Reading & Use of English Part 2", instr: "空所に1語ずつ書きます。",
      text: `Yellowstone, established in 1872, was the first national park in the world, and the idea soon spread {1} the globe. Yet the parks were not created {2} controversy. Native American communities who had lived on the land for thousands of years were often forced to leave, a fact that, until recently, was rarely mentioned in official histories.
Today the parks face a different challenge: their own popularity. More than 300 million visits are made every year, and at peak times some roads become so congested {3} rangers have to close park entrances. {4} a result, several parks have introduced timed-entry systems, {5} which visitors must reserve a slot in advance.
Not everyone welcomes the change. Critics argue that it favours those {6} can plan months ahead, while supporters insist that {7} some form of limit is introduced, the very landscapes people come to see will be damaged beyond repair. {8} the outcome of this debate, one thing is certain: the parks are being loved almost to death.`,
      gaps: [
        {a: ["across", "around", "throughout", "over"], why: "spread across / around the globe =「世界中に広まる」。"},
        {a: ["without"], why: "not 〜 without controversy =「論争なしには〜ない」。"},
        {a: ["that"], why: "so 〜 that …。"},
        {a: ["as"], why: "As a result =「その結果」。"},
        {a: ["under"], why: "under which 〜 =「その制度のもとで」。"},
        {a: ["who"], why: "those who 〜 =「〜する人々」。"},
        {a: ["unless"], why: "unless 〜 is introduced =「〜が導入されない限り」。"},
        {a: ["whatever"], why: "Whatever the outcome =「結果がどうであれ」。"},
      ]},
    {type: "wordform", short: "Part 3 語形成", title: "Reading & Use of English Part 3", instr: "大文字の語を文に合う形に変えて書きます（接頭辞・接尾辞の両方が必要なこともあります）。",
      text: `Despite growing {1} of the importance of sleep, many adults in the UK still get less than the recommended seven hours a night. The consequences are far from {2}. Chronic lack of sleep has been linked to heart disease, weight gain and reduced {3}, and tired drivers are almost as {4} as those who have been drinking.
Part of the problem is that many people regard sleep as a luxury rather than a {5}. Long working hours and the constant glow of screens make it {6} difficult to switch off. Experts recommend a few simple changes: keeping bedrooms cool and dark, avoiding caffeine after lunch, and resisting the {7} to check emails in bed. Such habits may seem {8}, but their combined effect can be considerable.`,
      gaps: [
        {stem: "AWARE", a: ["awareness"], why: "growing の後は名詞。"},
        {stem: "SIGNIFY", a: ["insignificant"], why: "far from 〜 =「決して〜ではない」。結果は深刻 → far from insignificant（否定の接頭辞 in-）。"},
        {stem: "CONCENTRATE", a: ["concentration"], why: "reduced の後は名詞。"},
        {stem: "DANGER", a: ["dangerous"], why: "as 〜 as の間は形容詞。"},
        {stem: "NECESSARY", a: ["necessity"], why: "a の後は名詞。luxury（贅沢品）と対比される necessity（必需品）。"},
        {stem: "INCREASE", a: ["increasingly"], why: "形容詞 difficult を修飾する副詞。"},
        {stem: "TEMPT", a: ["temptation"], why: "resist the temptation to 〜 =「〜したい誘惑に抗う」。"},
        {stem: "IMPORTANT", a: ["unimportant"], why: "but their combined effect can be considerable と対比 → 否定形。"},
      ]},
    {type: "kwt", short: "Part 4 書き換え", title: "Reading & Use of English Part 4", words: "3〜6", instr: "キーワードを変えずに使い、3〜6語で同じ意味の文を完成させます（1問2点）。",
      items: [
        {s1: "People say that the hotel was built in the 1920s.", key: "SAID", s2: "The hotel ___ in the 1920s.", a: ["is said to have been built"], why: "S is said to have been 過去分詞 =「〜されたと言われている」。"},
        {s1: "I'd prefer you not to mention this to anyone.", key: "RATHER", s2: "I'd ___ this to anyone.", a: ["rather you didn't mention", "rather you did not mention"], why: "would rather + S + 過去形 =「（人に）〜してほしい」。"},
        {s1: "She was so talented that everyone expected her to succeed.", key: "SUCH", s2: "She was ___ that everyone expected her to succeed.", a: ["such a talented person", "such a talented woman", "such a talented player", "such a talented girl", "such a talented student", "such a talented musician"], why: "such a + 形容詞 + 名詞 + that。"},
        {s1: "It wasn't necessary for you to bring food, but you did.", key: "NEED", s2: "You ___ food.", a: ["needn't have brought", "need not have brought"], why: "needn't have 過去分詞 =「〜する必要はなかったのに（実際はした）」。"},
        {s1: "Despite the rain, the match went ahead.", key: "EVEN", s2: "The match went ahead ___ raining.", a: ["even though it was", "even though it had been"], why: "even though + S + V。despite（前置詞）を接続詞に。"},
        {s1: "I'm sure he didn't see the sign.", key: "CAN'T", s2: "He ___ the sign.", a: ["can't have seen", "cannot have seen"], why: "過去の強い否定推量 can't have 過去分詞。"},
      ]},
    {type: "mcq", short: "Part 5 長文", title: "Reading & Use of English Part 5", instr: "長文を読み、A〜D から答えを選びます（筆者の態度・含意を問う問題が中心）。",
      text: `When I was a child, the summer holidays seemed to stretch on forever. There were long afternoons in my grandparents' garden in Norfolk with nothing to do and no one to do it with. I remember complaining bitterly about this at the time. Looking back, I suspect those empty hours were among the most productive of my life.
Boredom has a bad reputation. We tend to treat it as a problem to be solved, preferably as quickly as possible, and modern technology has made solving it almost effortless. The moment a queue slows down or a train is delayed, most of us reach for our phones. It is now entirely possible to go through a whole day without experiencing a single moment of genuine boredom – and that, I would argue, is not necessarily something to celebrate.
Psychologists have begun to take boredom more seriously. In one widely reported experiment, participants were asked to copy numbers from a telephone directory for fifteen minutes – a task chosen precisely because it was so tedious. Afterwards, they were set a creative challenge: to think of as many uses as possible for a pair of plastic cups. Those who had endured the boring task came up with significantly more ideas than a control group who had gone straight to the creative challenge. The researchers' explanation was that boredom encourages the mind to wander, and that a wandering mind is more likely to make unexpected connections.
None of this is to say that all boredom is good. The chronic, crushing boredom of a job one hates, or of long periods of unemployment, is closely associated with depression and poor health. What the researchers have in mind is something lighter: the restless, slightly uncomfortable feeling of having nothing in particular to do. It is this feeling, they suggest, that pushes us to look for something new.
The difficulty is that we have become very good at avoiding it. Every gap in our day can now be filled instantly, and the filling is designed to be as satisfying as possible. Social media feeds, in particular, are built to ensure that we never quite reach the end. The result is a kind of permanent low-level stimulation that leaves little room for the mind to drift.
I am not suggesting we throw our phones into the sea. But I have started to experiment, in small ways, with letting boredom back in. On my morning walk to the station, I leave my headphones at home. When I am waiting for a friend in a café, I resist the urge to check my emails. At first these moments felt almost unbearable; my hand would move towards my pocket before I had even decided to reach for my phone. Gradually, however, they have become something I look forward to.
I cannot claim that I have had any great ideas as a result. But I have noticed things I would otherwise have missed: the conversation of the couple at the next table, the changing light on the river, an idea for this article. Perhaps that is the point. Boredom is not valuable in itself, but it creates space – and what we choose to do with that space is up to us.
Children, it is often said, need to learn how to be bored. Increasingly, I suspect, the same is true of adults.`,
      items: [
        {q: "In the first paragraph, the writer suggests that as a child she", opts: ["did not appreciate the value of her free time.", "preferred her grandparents' house to her own.", "was often criticised for complaining.", "used her free time to do schoolwork."], a: 0, why: "当時は文句を言ったが、振り返ると最も実りある時間だった → 価値に気づいていなかった。"},
        {q: "What point does the writer make in the second paragraph?", opts: ["Technology has made people less patient.", "It has become easy to avoid being bored.", "People should spend less time in queues.", "Boredom is a modern problem."], a: 1, why: "solving it almost effortless / go through a whole day without… boredom。"},
        {q: "The experiment described in the third paragraph showed that", opts: ["creative people find boring tasks harder.", "a dull activity can lead to more original thinking.", "people perform better after a short rest.", "copying information improves memory."], a: 1, why: "退屈な作業の後のほうがアイデアが多かった。"},
        {q: "What does the writer say about chronic boredom?", opts: ["It can be useful in small amounts.", "It is the type most researchers study.", "It is different from the kind of boredom she is discussing.", "It is becoming more common."], a: 2, why: "What the researchers have in mind is something lighter = 論じているのは軽い退屈。"},
        {q: "What does the writer imply about social media in the fifth paragraph?", opts: ["It is deliberately designed to keep people using it.", "It is less harmful than other technology.", "It has improved people's concentration.", "It is mainly used during boring moments."], a: 0, why: "built to ensure that we never quite reach the end =「終わりに届かないよう作られている」。"},
        {q: "How does the writer feel about her own experiment?", opts: ["disappointed that it has not made her more creative", "pleased that it has made her more aware of her surroundings", "worried that she is addicted to her phone", "convinced that everyone should give up technology"], a: 1, why: "大発見はないが、見逃していたことに気づけた（I have noticed things…）。"},
      ]},
    {type: "gapped", short: "Part 7 段落挿入", title: "Reading & Use of English Part 7", instr: "6つの段落が抜けています。A〜G から合う段落を選びます（1つは使いません）。",
      text: `When I told friends I planned to walk the entire Appalachian Trail – nearly 3,500 kilometres from Georgia to Maine – most of them assumed I was joking. I had never camped for more than a weekend, and my idea of exercise was a gentle cycle to the office.
{1}
The first fortnight confirmed every doubt I had. My boots, which had felt perfectly comfortable in the shop, gave me blisters within two days. It rained for nine days out of fourteen, and I discovered that a tent described as "waterproof" is not necessarily a tent that keeps water out.
{2}
What kept me going was the trail community. Hikers who set out at roughly the same time tend to meet again and again, at shelters and in the small towns where you stop to buy food. Within a few weeks, I had become part of a loose group of a dozen or so people, ranging from a retired teacher from Ohio to a nineteen-year-old who had just finished school.
{3}
By the time we reached Virginia, my body had adapted. I was walking thirty kilometres a day without much difficulty, and I had stopped thinking about distance altogether. Instead, my days were structured around much simpler concerns: where to find water, where to sleep, and how much food I had left.
{4}
That sense of freedom did not last, of course. In the final weeks, as we approached the mountains of New Hampshire and Maine, the terrain became far more demanding, and the weather began to turn. Several members of our group had to stop because of injuries.
{5}
I reached the summit of Mount Katahdin, the trail's northern end, on a cold, clear morning in late September. I had expected to feel triumphant. Instead, I sat on a rock and cried, partly from exhaustion and partly because I knew it was over.
{6}
Six months on, I am back at my desk. Yet something has shifted. I am calmer, less concerned with things that once seemed important, and I have a much clearer idea of what I actually need to be happy. It turns out that it is not very much.`,
      options: [
        "More than once, I seriously considered catching a bus home. On one particularly miserable evening, I got as far as looking up the timetable.",
        "There was, I realised, a strange luxury in this. For the first time in my adult life, I had no emails to answer and no decisions to make beyond the immediate and practical.",
        "The return to normal life was harder than any mountain. The noise of the city overwhelmed me, and I found myself unable to concentrate in meetings.",
        "To be fair, they had a point. But I had just turned forty, and after years of promising myself I would do something adventurous, I had run out of excuses.",
        "Experienced hikers recommend buying equipment months in advance and testing it thoroughly before setting out.",
        "We had little in common on paper, but the shared experience broke down barriers quickly. Some of those people are now among my closest friends.",
        "Those of us who remained became even closer. We waited for each other at difficult sections and shared what little food we had left.",
      ],
      gaps: [
        {a: 3, why: "they had a point = 冗談だと思った友人にも一理ある → 次の every doubt につながる。"},
        {a: 0, why: "最悪の2週間 → 帰ろうと思った → What kept me going（それでも続けられた理由）。"},
        {a: 5, why: "多様なメンバー（教師〜19歳）→ We had little in common on paper。"},
        {a: 1, why: "simpler concerns → a strange luxury in this → That sense of freedom did not last。"},
        {a: 6, why: "Several… had to stop → Those of us who remained。"},
        {a: 2, why: "ゴール後 → 日常への復帰の苦労 → Six months on。E はどこにも合わない。"},
      ]},
    {type: "matching", short: "Part 8 照合", title: "Reading & Use of English Part 8", instr: "4人が大人になってから始めた習い事について書いています。各設問に当てはまる人を A〜D から選びます。",
      texts: [
        {k: "A", title: "Rachel – pottery (Leeds)", body: "I signed up for an evening pottery class largely on a whim, having seen an advert in the local library. I assumed it would be a relaxing hobby, and in some ways it is, but I hadn't bargained for how physically demanding it would be – centring clay on a wheel requires surprising strength. What I value most is that it forces me to be present; you simply can't think about work while your hands are covered in mud. My early efforts were frankly embarrassing, and I've accepted that I may never produce anything worth displaying. That, oddly, is rather liberating."},
        {k: "B", title: "David – piano (Boston)", body: "I'd played as a child but gave up at twelve, something I've regretted ever since. Returning to it at fifty, I expected my fingers to remember more than they did. The frustrating part is that I can hear exactly how a piece should sound, yet I'm unable to make it sound that way. My teacher insists that adults tend to be too self-critical, and she's probably right. I practise for twenty minutes before work each day, and I've found that this routine, more than any particular method, has been the key to my progress."},
        {k: "C", title: "Amara – Spanish (London)", body: "My motivation was entirely practical: my partner's family live in Seville, and I was tired of sitting silently at family gatherings. I tried several apps first, but found them too fragmented to give me any real sense of how the language fits together. Things improved dramatically once I found a conversation group that meets in a café near Borough Market. Speaking to real people, and making mistakes in front of them, was terrifying at first. Now my partner's grandmother tells me I sound like a local – which is generous, but I'll take it."},
        {k: "D", title: "Tom – sailing (Southampton)", body: "I'd always lived near the sea without ever really being on it, which struck me as absurd. The course I took was intensive – five days, starting at seven each morning – and by the end I was exhausted but hooked. The instructors were superb, though they didn't hesitate to point out my errors in front of the whole group, which I found hard to take at first. What surprised me was how much theory was involved; I had imagined it would be largely practical. I now own a share in a small boat with three friends."},
      ],
      items: [
        {q: "underestimated the physical effort involved?", a: "A", why: "I hadn't bargained for how physically demanding it would be"},
        {q: "regrets giving up the activity in the past?", a: "B", why: "gave up at twelve, something I've regretted ever since"},
        {q: "found that self-study tools were not effective?", a: "C", why: "apps… too fragmented"},
        {q: "was initially uncomfortable with being corrected publicly?", a: "D", why: "point out my errors in front of the whole group, which I found hard to take"},
        {q: "values the way the activity stops them thinking about other things?", a: "A", why: "you simply can't think about work"},
        {q: "believes a regular routine has mattered more than technique?", a: "B", why: "this routine, more than any particular method"},
        {q: "was motivated by a wish to communicate with relatives?", a: "C", why: "tired of sitting silently at family gatherings"},
        {q: "was surprised by how much was learnt away from practical activity?", a: "D", why: "how much theory was involved"},
        {q: "has stopped worrying about producing good results?", a: "A", why: "I may never produce anything worth displaying. That… is rather liberating."},
        {q: "received praise that they consider exaggerated?", a: "C", why: "I sound like a local – which is generous"},
      ]},
    {type: "writing", short: "Writing エッセイ", title: "Writing Part 1（エッセイ）", instr: "220〜260語でエッセイを書き、チェックリストで自己採点します。",
      prompt: `Your class has attended a panel discussion on what governments should do to improve life in cities. You have made the notes below.

Which areas should governments prioritise?
• public transport
• green spaces
• affordable housing

Some opinions expressed in the discussion:
"Better buses and trains would cut traffic overnight."
"Parks matter more for mental health than people realise."
"Nobody can enjoy a city they can't afford to live in."

Write an essay discussing TWO of the areas in your notes. You should explain which area is more important for governments to prioritise, giving reasons in support of your answer. You may use the opinions, but use your own words as far as possible.`,
      min: 220, max: 260, points: 16,
      checks: [
        "220〜260語の範囲で書いた",
        "3つのうち2つの分野だけを取り上げた",
        "どちらがより重要かを明確に結論づけた",
        "それぞれの分野に具体的な理由・例を挙げた",
        "意見の引用をそのまま写さず、自分の言葉で言い換えた",
        "導入・本論2段落・結論の構成になっている",
        "Admittedly / Nevertheless / Given that などC1らしいつなぎの言葉を使った",
        "倒置・分詞構文・名詞化などの多様な構文を使った",
        "フォーマルで一貫した文体（短縮形・口語を避けた）",
        "文法・スペル・句読点を最後に見直した",
      ],
      model: `Cities across the world face mounting pressure as their populations grow, and governments must decide where limited funds will have the greatest impact. Of the many possible priorities, public transport and affordable housing stand out, although I would argue that the latter is more urgent.

Admittedly, investment in public transport brings clear benefits. Reliable, frequent buses and trains reduce congestion, cut air pollution and give residents access to jobs across the city. London's Elizabeth line, for instance, has noticeably shortened commutes for hundreds of thousands of people. However, such projects take many years to complete, and their benefits are felt only gradually.

Affordable housing, by contrast, addresses a problem that is already forcing people out of the places where they work. In cities such as San Francisco, nurses, teachers and bus drivers increasingly cannot afford to live anywhere near their workplaces. Not only does this lengthen their journeys, but it also weakens the communities that make a city worth living in. Without a stable home, residents can hardly benefit from better transport or attractive parks.

Given that housing affects every other aspect of urban life, I believe it should be the government's first priority. Efficient transport is undoubtedly valuable, but it serves little purpose if the people who keep a city running have been priced out of it. Ensuring that ordinary workers can afford to live in the city is therefore the foundation on which all other improvements depend.`},
    {type: "listen", short: "Listening Part 1", title: "Listening Part 1", instr: "6つの短い発言・会話を聞き、A〜C から答えを選びます（各2回まで再生）。話し手の意見・態度・目的に注意。",
      items: [
        {q: "You hear a man talking about a podcast he hosts. What does he say has contributed most to its success?", opts: ["the celebrity guests", "its unscripted format", "regular advertising"], a: 1, lines: [["M", "People assume it's the big-name guests that bring the listeners in, and they certainly help. But when we look at the feedback, what people actually mention is that it feels like overhearing a real conversation. We never use scripts, and I think listeners can tell."]], why: "ゲストは help する程度。リスナーが評価するのは台本なしの自然さ。"},
        {q: "You hear two colleagues discussing a new office layout. What do they both think?", opts: ["It has made it harder to concentrate.", "It encourages useful collaboration.", "It was introduced too quickly."], a: 0, lines: [["W", "So, what do you make of the open-plan layout?"], ["M", "In theory it's meant to get us talking to each other more."], ["W", "Which it does, but mostly about what we had for lunch. I can't get anything done with all that noise."], ["M", "Tell me about it. I've started coming in at seven just to get an hour of quiet."]], why: "Tell me about it =「まったくだ（同感）」。二人とも集中できない。"},
        {q: "You hear a woman talking about moving from London to a small town in Vermont. How does she feel now?", opts: ["She regrets losing her career.", "She is unsure whether she made the right choice.", "She is glad she took the risk."], a: 2, lines: [["W", "Everyone told me I was mad to give up a perfectly good job in London. And there were moments, that first winter especially, when I wondered whether they were right. But I wouldn't change it now. I've built something here that I never could have built in the city."]], why: "迷った時期は過去。I wouldn't change it now = 今は満足。"},
        {q: "You hear a guide talking about a historic building. What is she doing?", opts: ["explaining why it was nearly demolished", "describing its original purpose", "criticising a recent renovation"], a: 0, lines: [["W", "It's hard to believe now, but in the nineteen-seventies the council actually approved plans to knock this building down to make way for a car park. It was only saved because local residents organised a campaign and chained themselves to the railings."]], why: "knock this building down = 取り壊し計画があった話。"},
        {q: "You hear a man talking about a novel. What does he think of the ending?", opts: ["It is too predictable.", "It is deliberately left open.", "It is unconvincing."], a: 2, lines: [["M", "The first three hundred pages are superb, tense and beautifully written. But then everything is tied up far too neatly in the last chapter. The villain confesses, the lovers are reunited. I just didn't believe a word of it."]], why: "I just didn't believe a word of it =「まったく信じられなかった」= 説得力がない。"},
        {q: "You hear two students discussing a lecture. What does the man suggest?", opts: ["asking the lecturer for help", "forming a study group", "reading the textbook first"], a: 0, lines: [["M", "I was completely lost after the first twenty minutes."], ["W", "Me too. The slides weren't much help either."], ["M", "Why don't we email Dr Patel and ask her to go over the second half again? She did say we could contact her."], ["W", "Good idea."]], why: "Why don't we email Dr Patel…? = 講師に聞く提案。"},
      ]},
  ],
};
