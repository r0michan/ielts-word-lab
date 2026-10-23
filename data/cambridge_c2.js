/* C2 Proficiency 形式（オリジナル問題）。Reading & Use of English Part 1–7 ＋ Writing Part 1 ＋ Listening Part 1。 */
window.CAMBRIDGE = window.CAMBRIDGE || {};
CAMBRIDGE.C2 = {
  name: "C2 Proficiency 形式", minutes: 120,
  parts: [
    {type: "mc_cloze", short: "Part 1 語彙", title: "Reading & Use of English Part 1", instr: "空所に入る最も適切な語を A〜D から選びます（イディオム・高度なコロケーション）。",
      text: `The notion of the self-made individual has long {1} a central place in American culture. From the rags-to-riches novels of the nineteenth century to the biographies of today's tech founders, the story follows a {2} pattern: a talented outsider overcomes hardship through sheer determination. It is a narrative that {3} deeply with a society that prizes independence.
Yet historians have increasingly called this story into {4}. Closer examination of almost any celebrated success reveals a web of support – family money, influential mentors, a fortunate {5} of timing – that the popular version conveniently {6}. This is not to {7} from the achievements of those involved, but to suggest that luck plays a larger role than many are willing to admit. To acknowledge this is not defeatist; if anything, it {8} the case for ensuring that opportunity is spread more widely.`,
      gaps: [
        {opts: ["seized", "gripped", "occupied", "grasped"], a: 2, why: "occupy a central place =「中心的な位置を占める」。"},
        {opts: ["well-kept", "well-worn", "well-read", "well-spent"], a: 1, why: "a well-worn pattern / story =「使い古された型」。"},
        {opts: ["resonates", "reverberates", "rings", "sounds"], a: 0, why: "resonate with 〜 =「〜の共感を呼ぶ」。"},
        {opts: ["debate", "challenge", "question", "suspicion"], a: 2, why: "call 〜 into question =「〜に疑問を投げかける」。"},
        {opts: ["streak", "quirk", "flake", "strand"], a: 1, why: "a quirk of timing / fate =「偶然のめぐり合わせ」。streak of luck は可だが timing とは結びつかない。"},
        {opts: ["dispenses", "abstains", "omits", "refrains"], a: 2, why: "omit は他動詞で目的語（関係代名詞 that）を取れる。他は with / from が必要。"},
        {opts: ["subtract", "detract", "deduct", "withdraw"], a: 1, why: "detract from 〜 =「〜の価値を損なう」。"},
        {opts: ["hardens", "toughens", "fortifies", "strengthens"], a: 3, why: "strengthen the case for 〜 =「〜を支持する論拠を強める」。"},
      ]},
    {type: "open_cloze", short: "Part 2 空所補充", title: "Reading & Use of English Part 2", instr: "空所に1語ずつ書きます。",
      text: `The Globe Theatre on London's South Bank is not, {1} many visitors assume, the original building in which Shakespeare's plays were performed. That theatre burned down in 1613, when a cannon fired during a performance of Henry VIII set fire to the thatched roof. The present building is a reconstruction based on {2} little evidence survives of the original.
The project was {3} brainchild of the American actor Sam Wanamaker, who was astonished, on his first visit to London, to find no proper memorial to the playwright. He spent more than twenty years raising funds but, sadly, did not live {4} see it open in 1997.
Performing at the Globe is unlike {5} other theatrical experience. There is no artificial lighting during the day, and around 700 "groundlings" stand in the open yard, close enough to touch the stage. Actors cannot, therefore, ignore the audience; {6} anything, they must engage with it directly. {7} unpredictable this can be, many actors describe it as the most rewarding work of their careers. As one put it, "{8} you've played the Globe, a conventional theatre feels strangely quiet."`,
      gaps: [
        {a: ["as"], why: "as many visitors assume =「多くの訪問者が思っているように」。"},
        {a: ["what"], why: "what little evidence survives =「残っているわずかな証拠」。"},
        {a: ["the"], why: "the brainchild of 〜 =「〜の発案」。"},
        {a: ["to"], why: "live to see 〜 =「生きて〜を見る」。"},
        {a: ["any"], why: "unlike any other 〜 =「ほかのどの〜とも違う」。"},
        {a: ["if"], why: "if anything =「むしろ」。"},
        {a: ["however"], why: "However unpredictable this can be =「どれほど予測不能でも」。"},
        {a: ["once"], why: "Once 〜 =「いったん〜すると」。"},
      ]},
    {type: "wordform", short: "Part 3 語形成", title: "Reading & Use of English Part 3", instr: "大文字の語を文に合う形に変えて書きます。",
      text: `The placebo effect – the improvement in symptoms experienced by patients who receive a treatment with no active ingredient – was long regarded by researchers as little more than an {1}, something to be controlled for in clinical trials. Recent findings, however, have prompted a {2} of this view. Brain scans show that placebos can trigger {3} changes in the release of the body's own painkillers, suggesting that the effect is far from {4}.
Perhaps most {5} of all, some studies have found that placebos work even when patients are told openly that the pills contain nothing but sugar. Researchers remain {6} about why this should be so. One theory holds that the ritual of treatment itself – the {7} presence of a doctor, the act of swallowing a pill – sends a powerful signal to the brain. Whatever the explanation, the findings raise difficult ethical questions about the {8} of deceiving patients for their own good.`,
      gaps: [
        {stem: "CONVENIENT", a: ["inconvenience"], why: "an の後の名詞。「厄介なもの」。"},
        {stem: "EVALUATE", a: ["reevaluation", "re-evaluation", "reassessment"], why: "a 〜 of this view =「見直し」。re- を付けた名詞。"},
        {stem: "MEASURE", a: ["measurable"], why: "changes を修飾する形容詞「測定可能な」。"},
        {stem: "IMAGINE", a: ["imaginary"], why: "far from imaginary =「決して想像上のものではない」。imaginative（想像力豊かな）と区別。"},
        {stem: "EXPECT", a: ["unexpected"], why: "most 〜 of all =「何より意外なことに」。"},
        {stem: "DECIDE", a: ["undecided"], why: "remain undecided =「結論が出ていない」。"},
        {stem: "REASSURE", a: ["reassuring"], why: "presence を修飾する「安心させる」。"},
        {stem: "PERMIT", a: ["permissibility"], why: "the 〜 of 〜ing =「〜することが許されるかどうか」。"},
      ]},
    {type: "kwt", short: "Part 4 書き換え", title: "Reading & Use of English Part 4", words: "3〜8", instr: "キーワードを変えずに使い、3〜8語で同じ意味の文を完成させます（1問2点）。",
      items: [
        {s1: "It was only when I got home that I noticed my wallet was missing.", key: "UNTIL", s2: "Not ___ notice that my wallet was missing.", a: ["until i got home did i", "until i had got home did i", "until i arrived home did i"], why: "Not until 〜 did I …（否定語句の文頭で倒置）。"},
        {s1: "He was just about to leave when the phone rang.", key: "VERGE", s2: "He ___ when the phone rang.", a: ["was on the verge of leaving", "was on the verge of going"], why: "be on the verge of 〜ing =「まさに〜しようとしている」。"},
        {s1: "The new manager has made a huge difference to the company.", key: "IMPACT", s2: "The new manager has ___ the company.", a: ["had a huge impact on", "had an enormous impact on", "had a great impact on", "had a big impact on", "had a major impact on"], why: "have an impact on 〜。"},
        {s1: "I had no idea that she was planning to resign.", key: "DARK", s2: "I ___ her plans to resign.", a: ["was in the dark about", "was completely in the dark about", "was kept in the dark about", "had been in the dark about", "had been kept in the dark about"], why: "be (kept) in the dark about 〜 =「〜について何も知らされていない」。"},
        {s1: "They are unlikely to finish the project on time.", key: "CHANCE", s2: "There is ___ finishing the project on time.", a: ["little chance of them", "little chance of their", "not much chance of them", "not much chance of their", "only a slim chance of them", "a slim chance of them", "little chance of them ever"], why: "little chance of 人 〜ing =「〜する見込みはほとんどない」。"},
        {s1: "People generally believe that the painting is a fake.", key: "WIDELY", s2: "The painting ___ a fake.", a: ["is widely believed to be", "is widely thought to be"], why: "S is widely believed to be 〜。"},
      ]},
    {type: "mcq", short: "Part 5 長文", title: "Reading & Use of English Part 5", instr: "長文を読み、A〜D から答えを選びます。",
      text: `Among the papers my grandmother left behind when she died was a shoebox containing some four hundred letters. They spanned six decades, from the wartime notes she exchanged with my grandfather while he was stationed in North Africa to the brisk, slightly impatient postcards she sent me when I was a student and failed, as she saw it, to write home often enough. Reading them over the course of a long winter, I was struck not only by what they revealed about her, but by how thoroughly the form itself has vanished from our lives.
It would be easy to romanticise this. Letters were slow, expensive and frequently lost; they were also, in many households, a duty rather than a pleasure, dashed off on Sunday evenings to relatives one barely knew. My grandmother's correspondence includes a good deal of this dutiful material – thank-you notes, enquiries after health, reports on the weather in Shropshire – and much of it makes for tedious reading. To lament the passing of the letter as such is, I think, to mistake nostalgia for an argument.
And yet there is something in those letters that I have not found in any other form of writing. It lies, I think, in the peculiar relationship between writer and reader that the letter imposes. A letter is written in one moment and read in another, often days or weeks later. The writer knows this, and must therefore imagine the reader not as they are now but as they will be when the envelope is opened. My grandmother's letters are full of this kind of imaginative projection: "By the time this reaches you, the exams will be over, and I hope you are sleeping properly again." There is a generosity in such sentences that the instant reply cannot replicate, because the instant reply has no need of it.
The delay also shaped what was said. Because there was no possibility of immediate clarification, letter-writers had to anticipate misunderstandings and take care to be clear. Paradoxically, this seems to have made them more candid rather than less. Several of the letters between my grandparents address subjects – money, disappointment, a period of serious illness – that I suspect they never discussed face to face. The page, it appears, permitted a kind of honesty that conversation did not.
Defenders of digital communication will reply, with some justification, that email and messaging have given us more writing, not less. We probably produce more words in a week than our grandparents did in a year. But volume is not the point. The messages I send are, for the most part, transactional: arrangements, confirmations, brief exchanges of information. They are written to be read immediately and forgotten almost as quickly. It is hard to imagine anyone keeping them in a shoebox.
I do not propose to start writing letters, or not many. I suspect the attempt would feel self-conscious, an affectation rather than a habit. What I have tried to do instead is to bring some of the letter's qualities into the writing I already do: to take a little more time, to imagine the reader a little more fully, and occasionally to say in writing what I would find difficult to say aloud. These are modest ambitions. But reading my grandmother's letters, I came to feel that she had understood something about attention that I had allowed myself to forget.`,
      items: [
        {q: "In the first paragraph, the writer reveals that his grandmother", opts: ["wrote to him less often than he wrote to her.", "disapproved of how rarely he wrote to her.", "kept every letter she ever received.", "wrote mainly about the war."], a: 1, why: "brisk, slightly impatient postcards… failed, as she saw it, to write home often enough。"},
        {q: "In the second paragraph, the writer is", opts: ["arguing that letters were more trouble than they were worth.", "acknowledging that regret for the loss of letters may be misplaced.", "criticising his grandmother for writing out of duty.", "explaining why letters were so frequently lost."], a: 1, why: "to mistake nostalgia for an argument =「郷愁を論拠と取り違える」→ 惜しむのは見当違いかもしれないと認めている。"},
        {q: "According to the writer, the generosity in his grandmother's letters arose from", opts: ["the need to imagine the reader's future situation.", "a wish to make up for being far away.", "the length of time she spent writing.", "her concern about his health."], a: 0, why: "imagine the reader… as they will be when the envelope is opened。"},
        {q: "What does the writer find paradoxical about letter-writing?", opts: ["It was slow, yet people wrote a great deal.", "The need for clarity encouraged greater openness.", "Letters were private, yet they were often shared.", "People wrote about subjects they knew little about."], a: 1, why: "明確さが必要だった → Paradoxically… more candid（より率直に）。"},
        {q: "The writer accepts that digital communication", opts: ["has produced a greater quantity of writing.", "is more honest than letter-writing.", "will eventually replace speech.", "has made people less willing to keep records."], a: 0, why: "with some justification… more writing, not less。"},
        {q: "What does the writer conclude in the final paragraph?", opts: ["He intends to revive the habit of letter-writing.", "Letters were superior to every modern form of communication.", "He can adopt some qualities of letters without writing them.", "His grandmother was a more thoughtful person than he is."], a: 2, why: "bring some of the letter's qualities into the writing I already do。"},
      ]},
    {type: "gapped", short: "Part 6 文挿入", title: "Reading & Use of English Part 6", instr: "6つの文が抜けています。A〜G から合う文を選びます（1つは使いません）。",
      text: `The British are often said to have a genius for queuing, and visitors to London are frequently astonished by the orderly lines that form at bus stops. {1} Before the Second World War, accounts of British crowds describe pushing and shoving much like anywhere else.
Historians tend to attribute the change to wartime rationing, when standing in line for food became a daily ritual and jumping the queue came to be seen as a betrayal of the collective effort. {2} By the 1950s, the queue had become a symbol of fairness, and fairness, in turn, part of the national self-image.
Psychologists who study queues have found that the experience of waiting is shaped less by its length than by how it is perceived. {3} This is why many airports now make passengers walk further to the baggage hall: the longer walk shortens the time spent standing at the carousel, and complaints fall accordingly.
Perceived fairness matters even more. {4} A single long line feeding several counters, now standard in banks and post offices, is preferred precisely because it guarantees that no one who arrived later is served first.
Technology is now changing the queue altogether. {5} Restaurants send a text when a table is free; theme parks issue virtual tickets for popular rides. In principle, this frees people to do something more useful with their time.
{6} Something, perhaps, is lost when the queue disappears from view: the shared moment of patience, the small exchanges between strangers, and the quiet confidence that everyone is being treated alike.`,
      options: [
        "People will tolerate a long wait far more readily than one in which others appear to be served out of turn.",
        "The government actively encouraged this view, presenting patient waiting as a patriotic virtue.",
        "Unoccupied time, for instance, feels considerably longer than time spent doing something.",
        "Queues in other European countries are, by contrast, notoriously chaotic.",
        "Increasingly, the line exists only as a number in a database.",
        "Yet the habit is more recent than many suppose.",
        "Whether that is entirely a good thing is another matter.",
      ],
      gaps: [
        {a: 5, why: "Yet で「実は新しい習慣」→ 戦前は押し合いへし合いだった、と続く。"},
        {a: 1, why: "this view = 割り込みは裏切り、という見方。政府がそれを後押し。"},
        {a: 2, why: "for instance で「感じ方」の具体例 → 空港の例へ。"},
        {a: 0, why: "公平さの方が重要 → だから1列に並ぶ方式が好まれる。"},
        {a: 4, why: "列がデータベース上の番号になる → レストランのSMS、テーマパークの仮想チケット。"},
        {a: 6, why: "In principle（理屈の上では）良い → それが本当に良いかは別問題 → Something is lost。D はどこにも合わない。"},
      ]},
    {type: "matching", short: "Part 7 照合", title: "Reading & Use of English Part 7", instr: "4人の研究者が週休3日制についてコメントしています。各設問に当てはまる人を A〜D から選びます。",
      texts: [
        {k: "A", title: "Prof. Helen Ward, economist", body: "The results from the British pilot scheme are undeniably encouraging, with the great majority of participating firms opting to continue. Nevertheless, I would urge caution. The companies that volunteered were, almost by definition, those that expected the policy to suit them, and one should be wary of assuming that what works for a software company in Manchester will work for a hospital or a factory. Productivity in such sectors cannot simply be squeezed into fewer hours. My concern is less with the principle than with the haste of those who would make it compulsory."},
        {k: "B", title: "Dr Marcus Bell, psychologist", body: "From a well-being perspective, the evidence is about as clear as such evidence ever gets: reductions in burnout, better sleep, fewer sick days. What interests me more, however, is why. My own research suggests that it is not the extra day off itself that matters so much as the sense of control it gives employees over their time. If that is right, then flexible arrangements of other kinds might deliver many of the same benefits without the organisational upheaval that a universal four-day week would entail."},
        {k: "C", title: "Prof. Lin Zhao, management scholar", body: "Critics often claim that a shorter week is simply unaffordable. This, in my view, misreads the evidence. The most successful firms in the trials did not ask staff to do the same work in less time; they eliminated work that should never have been done at all – pointless meetings, unnecessary reports. The four-day week, in other words, acts as a kind of forcing mechanism for reforms that managers have long been too complacent to undertake. Where it fails, the fault usually lies with leadership rather than with the policy."},
        {k: "D", title: "Dr Owen Price, historian", body: "It is worth remembering that the five-day week, now regarded as natural, was itself the product of fierce argument barely a century ago, with opponents predicting economic ruin. That precedent does not prove that a further reduction will succeed, but it should make us sceptical of claims that the current arrangement is somehow inevitable. What history does suggest is that such shifts tend to happen gradually, sector by sector."},
      ],
      items: [
        {q: "doubts whether the trial results apply to every kind of industry?", a: "A", why: "what works for a software company… will work for a hospital or a factory"},
        {q: "suggests that a different policy might achieve similar results?", a: "B", why: "flexible arrangements of other kinds might deliver many of the same benefits"},
        {q: "argues that the policy exposes unnecessary work?", a: "C", why: "eliminated work that should never have been done at all"},
        {q: "places the current debate in a longer perspective?", a: "D", why: "the five-day week… barely a century ago"},
        {q: "points out that the participating companies may not be representative?", a: "A", why: "those that expected the policy to suit them"},
        {q: "blames managers when the policy does not work?", a: "C", why: "the fault usually lies with leadership"},
        {q: "makes a prediction about how working patterns are likely to change?", a: "D", why: "such shifts tend to happen gradually, sector by sector"},
        {q: "is more interested in the cause of the benefits than the benefits themselves?", a: "B", why: "What interests me more, however, is why."},
        {q: "objects to making the policy a legal requirement too quickly?", a: "A", why: "the haste of those who would make it compulsory"},
        {q: "rejects the claim that the policy is too expensive?", a: "C", why: "a shorter week is simply unaffordable. This… misreads the evidence."},
      ]},
    {type: "writing", short: "Writing エッセイ", title: "Writing Part 1（2つの文章の要約＋評価）", instr: "2つの文章の要点をまとめ、自分の意見を加えて240〜280語のエッセイを書きます。",
      prompt: `Read the two texts below. Write an essay summarising and evaluating the key points from both texts. Use your own words throughout as far as possible, and include your own ideas in your answer.

Text 1 – Tourism in historic cities
Mass tourism has transformed cities such as Venice and Edinburgh into theme parks of themselves. Residents are priced out by short-term rentals, and local shops give way to souvenir stalls. If these cities are to remain living communities rather than museums, strict limits on visitor numbers are unavoidable.

Text 2 – The value of visitors
Tourism funds the restoration of buildings that would otherwise crumble, and supports thousands of jobs. Limiting visitors is a blunt instrument that punishes ordinary travellers while doing little to address the real problem: poorly regulated housing markets. Smarter planning, not exclusion, is the answer.

Write 240–280 words.`,
      min: 240, max: 280, points: 18,
      checks: [
        "240〜280語の範囲で書いた",
        "Text 1 の要点（住民の追い出し・人数制限が必要）を言い換えてまとめた",
        "Text 2 の要点（観光の経済的価値・住宅規制こそが問題）を言い換えてまとめた",
        "2つの文章を比較・評価した（どちらの主張がどこまで妥当か）",
        "本文にない自分のアイデア・具体例を加えた",
        "原文の表現をそのまま写していない",
        "論理的な段落構成と明確な結論",
        "高度な語彙（exacerbate, mitigate, untenable など）を正確に使った",
        "多様で正確な構文（倒置・分詞構文・仮定法など）",
        "誤りのほぼない文法・スペル・句読点",
      ],
      model: `Both texts address the pressures that large numbers of visitors place on historic cities, yet they reach strikingly different conclusions about how those pressures should be managed.

The first text contends that tourism on its current scale is hollowing out such cities. As holiday lets drive up rents and everyday businesses are replaced by shops catering exclusively to visitors, residents are gradually displaced. Its author concludes that capping visitor numbers is the only way to keep these places genuinely inhabited.

The second text, by contrast, emphasises the economic benefits tourism brings, from paying for the upkeep of ancient buildings to sustaining local employment. Its author regards visitor caps as indiscriminate, arguing that they penalise travellers while leaving the underlying cause – an inadequately regulated housing market – untouched.

In my view, the second text offers the more persuasive diagnosis. The displacement described in the first text stems less from visitors as such than from the conversion of homes into short-term rentals, a problem that cities such as Barcelona have begun to tackle through licensing. Restricting visitor numbers would do little to reverse this trend, while depriving local economies of much-needed income.

That said, the first text is right to insist that some limits may be necessary. At the busiest sites, sheer overcrowding can damage fragile structures and spoil the experience for everyone. A combination of the two approaches – stricter housing regulation alongside targeted measures such as timed entry at the most vulnerable locations – would seem the most balanced solution, allowing historic cities to remain both welcoming and liveable.`},
    {type: "listen", short: "Listening Part 1", title: "Listening Part 1", instr: "6つの発言・会話を聞き、A〜C から答えを選びます（各2回まで再生）。含意・態度を聞き取りましょう。",
      items: [
        {q: "You hear a novelist talking about her latest book. What does she say about writing it?", opts: ["The research took longer than the writing.", "She abandoned her original plan.", "She wanted to challenge readers' expectations."], a: 1, lines: [["W", "I had the whole thing mapped out, a tidy little mystery set in Cornwall. Then, about halfway through, one of the minor characters started to interest me far more than my detective, and I realised the book I'd planned simply wasn't the book I wanted to write. So I threw out eighty thousand words and started again."]], why: "threw out eighty thousand words and started again = 当初の計画を捨てた。"},
        {q: "You hear two people discussing a plan to pedestrianise a high street. What is the man's view?", opts: ["It will damage local businesses.", "It is a good idea that has been badly planned.", "It will significantly reduce pollution."], a: 1, lines: [["M", "I'm all for getting cars out of the town centre. Who isn't? But they haven't thought about deliveries at all. Where are the lorries supposed to unload? And the bus diversions will add twenty minutes to everyone's journey."], ["W", "So you'd vote against it?"], ["M", "Not against the idea. Against this version of it."]], why: "Not against the idea, against this version = 理念は賛成、計画がまずい。"},
        {q: "You hear a scientist talking about a research finding. What is her attitude?", opts: ["cautious", "dismissive", "enthusiastic"], a: 0, lines: [["W", "The results are certainly intriguing, and I can understand why the press has picked up on them. But it was a small study, just forty participants, and it hasn't yet been replicated. I'd want to see it repeated on a much larger scale before drawing any firm conclusions."]], why: "興味深いと認めつつ、結論は大規模な再現を待つべき → 慎重。否定（dismissive）まではしていない。"},
        {q: "You hear a man talking about changing career from law to teaching. What does he miss most?", opts: ["the salary", "the intellectual challenge", "the respect of others"], a: 1, lines: [["M", "People assume I must miss the money, and of course it was nice. But honestly, what I miss is the puzzle, those cases where you'd spend weeks unpicking a really complex problem. Teaching's demanding in other ways, but it's rarely that kind of intellectual workout."]], why: "what I miss is the puzzle… intellectual workout。"},
        {q: "You hear a museum curator talking about an exhibition. Why did the museum decide to hold it now?", opts: ["to mark an anniversary", "in response to visitors' requests", "to display newly discovered objects"], a: 2, lines: [["W", "We'd been planning a show on Victorian photography for some time, but the timing was really driven by the discovery last year of a box of glass plate negatives in the attic of a house in Bath. Nobody had seen them for over a century, and we simply had to get them in front of the public."]], why: "the timing was really driven by the discovery = 新発見が理由。"},
        {q: "You hear two friends talking about a play. What do they disagree about?", opts: ["the quality of the acting", "the modern setting", "the length of the play"], a: 1, lines: [["W", "I thought moving it to nineteen-eighties Manchester really worked. It made the politics feel urgent."], ["M", "Did it? It felt like a gimmick to me. Though I'll admit the performances were outstanding."], ["W", "Oh, absolutely. And it didn't drag at all, despite being three hours."], ["M", "No, it flew by."]], why: "現代への設定変更は「効果的」vs「小手先」で対立。演技と長さは一致。"},
      ]},
  ],
};
