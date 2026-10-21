// IELTS Writing practice data: tasks, prompts (with practice charts), scaffolds, model answers, check rules
window.WRITING = {
  tasks: {
    gt1: {name:'GT Task 1 · 手紙', min:150, time:20, paras:3},
    ac1: {name:'Academic Task 1 · グラフ', min:150, time:20, paras:3},
    t2:  {name:'Task 2 · エッセイ', min:250, time:40, paras:4},
  },
  prompts: [
    {task:'gt1', style:'formal', title:'ホテルへの苦情',
     q:'You recently stayed at a hotel and were unhappy with the service.\nWrite a letter to the hotel manager. In your letter:',
     b:['describe the problems you had','explain how this affected your stay','say what you would like the manager to do'],
     model:`Dear Sir or Madam,

I am writing to complain about my recent stay at your hotel from 3 to 6 May. Unfortunately, the service I received was far below the standard I expected.

Firstly, my room had not been cleaned when I arrived, and the air conditioning did not work. Although I reported both problems to reception on the first evening, nobody came to fix them until the following afternoon. In addition, breakfast was served thirty minutes late on two mornings.

As a result, I was unable to sleep properly in the heat, and I arrived late for an important business meeting because I had to wait for breakfast. This made my trip extremely stressful.

I would be grateful if you could refund the cost of one night and explain what steps you will take to prevent these problems in the future.

I look forward to hearing from you.

Yours faithfully,
Ken Sato`},
    {task:'gt1', style:'informal', title:'友人の訪問',
     q:'A friend is coming to visit your town for the first time.\nWrite a letter to your friend. In your letter:',
     b:['suggest the best time of year to visit','describe some places your friend should see','give advice about getting around'],
     model:''},
    {task:'gt1', style:'formal', title:'講座の問い合わせ',
     q:'You want to take an evening course at a local college.\nWrite a letter to the college. In your letter:',
     b:['say which course you are interested in and why','describe your previous experience','ask about fees and the timetable'],
     model:''},
    {task:'gt1', style:'semi-formal', title:'隣人の騒音',
     q:'Your neighbour has been making a lot of noise late at night.\nWrite a letter to your neighbour. In your letter:',
     b:['explain the situation','describe how it is affecting you','suggest a solution'],
     model:''},
    {task:'gt1', style:'formal', title:'アルバイトへの応募',
     q:'You have seen an advertisement for a part-time job at a local museum.\nWrite a letter to the museum manager. In your letter:',
     b:['introduce yourself','explain why you are interested in the job','describe the skills and experience you have'],
     model:''},
    {task:'gt1', style:'informal', title:'借りた物を壊した',
     q:'You borrowed something from a friend and accidentally damaged it.\nWrite a letter to your friend. In your letter:',
     b:['explain what happened','apologise for the damage','say what you will do about it'],
     model:''},
    {task:'ac1', title:'インターネット普及率（折れ線）',
     q:'The graph below shows the percentage of households with internet access in three countries between 2000 and 2020.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
     chart:{type:'line', unit:'%', x:['2000','2005','2010','2015','2020'], series:[['Japan',[30,58,78,88,95]],['Germany',[16,52,77,87,93]],['Brazil',[3,14,40,58,80]]]},
     model:`The line graph illustrates the proportion of households that had internet access in Japan, Germany and Brazil over a twenty-year period from 2000 to 2020.

Overall, internet access rose considerably in all three countries. Japan had the highest figures throughout the period, while Brazil remained well behind the other two nations, despite showing the most dramatic growth.

In 2000, 30% of Japanese households were connected to the internet, compared with 16% in Germany and only 3% in Brazil. Over the next ten years, the figures for Japan and Germany rose sharply, reaching 78% and 77% respectively in 2010. After that, growth slowed, and by 2020 almost all homes in both countries had access, at 95% and 93%.

Brazil followed a different pattern. Its figure increased only slightly to 14% by 2005, but then climbed rapidly to 40% in 2010 and 58% in 2015. By the end of the period, 80% of Brazilian households were online, although this was still around 15 percentage points lower than the figure for Japan.`},
    {task:'ac1', title:'余暇の過ごし方（棒）',
     q:'The chart below shows the average number of hours per week that men and women in one country spent on five leisure activities.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
     chart:{type:'bar', unit:'hours', x:['TV','Sport','Reading','Socialising','Gaming'], series:[['Men',[12,5,3,6,7]],['Women',[11,3,5,8,2]]]},
     model:''},
    {task:'ac1', title:'エネルギー源の割合（棒）',
     q:'The chart below shows the share of electricity produced from five sources in one country in 1990 and 2020.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
     chart:{type:'bar', unit:'%', x:['Coal','Oil','Gas','Renewables','Nuclear'], series:[['1990',[45,30,15,5,5]],['2020',[20,25,30,20,5]]]},
     model:''},
    {task:'t2', kind:'opinion', title:'大学教育は無料にすべきか',
     q:'Some people believe that university education should be free for all students.\nTo what extent do you agree or disagree?',
     model:`It is often argued that university education should be free for every student. While I accept that this policy would be expensive for governments, I largely agree with this view because free higher education benefits both individuals and society as a whole.

Firstly, removing tuition fees would give talented young people from poor families the same opportunities as wealthier students. At present, many capable school leavers decide not to go to university because they cannot afford the fees or are afraid of taking on large debts. As a result, their skills are never fully developed. If education were free, admission would depend on ability rather than income, which would make society fairer.

Secondly, a well-educated population brings long-term economic benefits. Graduates tend to earn higher salaries, which means that they pay more tax over their lifetimes. Countries such as Germany and Finland, where university is free or very cheap, have strong economies and highly skilled workforces. In this sense, public spending on universities is an investment rather than a cost.

Admittedly, free education places a heavy burden on taxpayers, and some students may not take their courses seriously if they do not pay for them. However, these problems could be reduced by setting strict entry requirements and limiting the number of years that each student can study for free.

In conclusion, although making university free would be costly, I believe the advantages for equality and economic growth outweigh the disadvantages. Governments should therefore consider funding higher education for all qualified students.`},
    {task:'t2', kind:'discussion', title:'外国語はいつから学ぶべきか',
     q:'Some people think that children should start learning a foreign language at primary school. Others believe they should wait until secondary school.\nDiscuss both views and give your own opinion.', model:''},
    {task:'t2', kind:'advantages', title:'在宅勤務の利点と欠点',
     q:'More and more people are working from home instead of going to an office.\nDo the advantages of this trend outweigh the disadvantages?', model:''},
    {task:'t2', kind:'problem', title:'交通渋滞の原因と対策',
     q:'In many cities, traffic congestion is becoming a serious problem.\nWhat are the causes of this problem, and what measures could be taken to solve it?', model:''},
    {task:'t2', kind:'opinion', title:'道路より公共交通に投資すべきか',
     q:'Governments should spend more money on public transport than on building new roads.\nTo what extent do you agree or disagree?', model:''},
    {task:'t2', kind:'twopart', title:'若者とSNS',
     q:'Many young people today spend several hours a day on social media.\nWhy is this the case? Is this a positive or negative development?', model:''},
    {task:'t2', kind:'discussion', title:'犯罪を減らす方法',
     q:'Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better ways to reduce crime.\nDiscuss both views and give your own opinion.', model:''},
    {task:'t2', kind:'advantages', title:'一人暮らしの増加',
     q:'In many countries, an increasing number of people choose to live alone.\nDo the advantages of this outweigh the disadvantages?', model:''},
    {task:'t2', kind:'problem', title:'肥満の増加',
     q:'Obesity rates are rising in many countries.\nWhat are the main causes of this, and what can be done to solve the problem?', model:''},
    {task:'t2', kind:'opinion', title:'観光は地域に害か',
     q:'Tourism does more harm than good to local communities.\nTo what extent do you agree or disagree?', model:''},
    {task:'t2', kind:'opinion', title:'定年後も働くべきか',
     q:'Older people should be encouraged to continue working after the usual retirement age.\nTo what extent do you agree or disagree?', model:''},
    {task:'t2', kind:'discussion', title:'テクノロジーと孤立',
     q:'Some people say that modern technology makes people more isolated. Others think it brings people closer together.\nDiscuss both views and give your own opinion.', model:''},
  ],
  scaffolds: {
    'gt1:formal': `Dear Sir or Madam,

[1段落目：手紙の目的]
I am writing to ______ .

[2段落目：1つ目の箇条書きに答える]
______ . Unfortunately, ______ .

[3段落目：2つ目の箇条書きに答える]
As a result, ______ .

[4段落目：3つ目の箇条書き＝依頼・提案]
I would be grateful if you could ______ .

I look forward to hearing from you.

Yours faithfully,
(フルネーム)`,
    'gt1:semi-formal': `Dear Mr/Ms ______,

[1段落目：手紙の目的]
I am writing about ______ .

[2段落目：状況の説明]
Recently, ______ .

[3段落目：自分への影響]
This has made it difficult for me to ______ .

[4段落目：解決策の提案]
I was wondering if ______ .

Thank you for your understanding.

Yours sincerely,
(フルネーム)`,
    'gt1:informal': `Dear ______,

[1段落目：あいさつと目的]
Thanks for your last letter! I'm writing to ______ .

[2段落目：1つ目の箇条書き]
______ .

[3段落目：2つ目の箇条書き]
______ .

[4段落目：3つ目の箇条書き]
______ .

Can't wait to see you soon!

Best wishes,
(ファーストネーム)`,
    'ac1': `[序論：問題文の言い換え（1文）]
The ______ shows/compares ______ between ______ and ______ .

[概要：全体の傾向・最大/最小（2文）]
Overall, it is clear that ______ . In addition, ______ .

[詳細1：数字を使って特徴を説明]
In ______ , ______ stood at ______ , compared with ______ . Over the following years, ______ rose/fell ______ to ______ .

[詳細2：対照的な特徴・比較]
By contrast, ______ . By the end of the period, ______ .`,
    't2:opinion': `[序論：話題の言い換え + 自分の立場]
It is often argued that ______ . I [completely agree / largely agree / disagree] with this view because ______ .

[本論1：理由1 → 説明 → 例]
Firstly, ______ . This is because ______ . For example, ______ .

[本論2：理由2 → 説明 → 例]
Secondly, ______ . As a result, ______ . A good example of this is ______ .

[本論3（任意）：反対意見への譲歩と反論]
Admittedly, ______ . However, ______ .

[結論：立場をもう一度]
In conclusion, I believe that ______ .`,
    't2:discussion': `[序論：2つの意見を紹介 + 自分の立場]
Some people believe that ______ , while others argue that ______ . In my view, ______ .

[本論1：意見Aの理由]
On the one hand, supporters of ______ argue that ______ . This is because ______ . For example, ______ .

[本論2：意見Bの理由]
On the other hand, those who believe ______ point out that ______ . Furthermore, ______ .

[本論3：自分の意見とその理由]
Personally, I believe that ______ because ______ .

[結論]
In conclusion, although ______ , I believe that ______ .`,
    't2:advantages': `[序論：話題の言い換え + 立場]
Nowadays, an increasing number of ______ . In my opinion, the advantages of this trend [outweigh / do not outweigh] the disadvantages.

[本論1：利点]
One major advantage is that ______ . For instance, ______ . Another benefit is that ______ .

[本論2：欠点]
On the other hand, one major drawback of ______ is that ______ . This can lead to ______ .

[本論3：比較して自分の判断]
However, I believe ______ because ______ .

[結論]
In conclusion, ______ .`,
    't2:problem': `[序論：問題の言い換え + 本文の予告]
In many countries, ______ has become a serious problem. This essay will discuss the main causes and suggest some possible solutions.

[本論1：原因]
There are several reasons for this. The main reason is that ______ . In addition, ______ . This is largely due to ______ .

[本論2：解決策]
There are a number of measures that could be taken. One possible solution is to ______ . Governments should also ______ . Individuals can also play a part by ______ .

[結論]
In conclusion, ______ is caused by ______ , but it could be solved if ______ .`,
    't2:twopart': `[序論：言い換え + 2つの質問への簡単な答え]
These days, ______ . This is mainly because ______ , and I believe this is a [positive / negative] development.

[本論1：質問1への答え（理由）]
There are several reasons why ______ . Firstly, ______ . Secondly, ______ .

[本論2：質問2への答え（評価）]
In my view, this trend is largely [positive / negative]. ______ . For example, ______ .

[結論]
In conclusion, ______ because ______ , and overall I think this is ______ .`,
  },
  linkers: ['however','therefore','moreover','furthermore','in addition','consequently','as a result','for example','for instance','although','whereas','while','despite','nevertheless','on the other hand','in contrast','by contrast','similarly','firstly','secondly','finally','in conclusion','to sum up','overall','because','since','thus','hence','in particular','such as','not only','what is more','admittedly','unless','provided that','even though','in spite of','due to','this means that','as a result of'],
  // [regex source, flags, 説明]
  errors: [
    ['\\binformations\\b','i','information は不可算名詞（s は付けない）'],
    ['\\badvices\\b','i','advice は不可算名詞（s は付けない）'],
    ['\\bfurnitures\\b','i','furniture は不可算名詞'],
    ['\\bequipments\\b','i','equipment は不可算名詞'],
    ['\\bknowledges\\b','i','knowledge は不可算名詞'],
    ['\\bhomeworks\\b','i','homework は不可算名詞'],
    ['\\bresearches\\b','i','research は通常は不可算名詞'],
    ['\\btraffics\\b','i','traffic は不可算名詞'],
    ['\\bpeoples\\b','i','「人々」の意味なら people（s 不要）'],
    ['\\bmore (better|easier|cheaper|bigger|faster|worse|larger|smaller|higher|lower)\\b','i','比較級に more は重ねない'],
    ['\\bthe most (best|worst)\\b','i','the best / the worst（most は不要）'],
    ['\\bdiscuss about\\b','i','discuss は他動詞（about は不要）'],
    ['\\bexplain (me|him|her|us|them)\\b','i','explain to 人（explain me は誤り）'],
    ['\\baccording to me\\b','i','according to me は不自然 → in my opinion / in my view'],
    ['\\bin my opinion,? i think\\b','i','In my opinion と I think の意味が重複'],
    ['\\bthere (have|has)\\b','i','存在は there is / there are（have は使わない）'],
    ['\\balot\\b','i','a lot（2語）'],
    ['\\bmake (a |the |my |our )?homework\\b','i','homework は do（make は使わない）'],
    ['\\bsuggest (me|him|her|us|them) to\\b','i','suggest 人 to は誤り → suggest that 人 (should) 動詞 / suggest 動詞ing'],
    ['\\bdespite of\\b','i','despite（of は不要）/ in spite of'],
    ['\\bmarried with\\b','i','be married to 人'],
    ['\\bcan able to\\b','i','can か be able to のどちらか一方'],
    ['\\bmany (money|information|advice|time|traffic|pollution|furniture|research)\\b','i','不可算名詞には much / a lot of / a great deal of'],
    ['\\bmuch (people|students|cars|countries|children|problems|jobs)\\b','i','可算名詞の複数形には many'],
    ['\\bspend (time|money|hours) to\\b','i','spend 時間/お金 + 動詞ing'],
    ['\\bit is depend\\b','i','It depends（is は不要）'],
    ['\\bi am agree\\b','i','I agree（am は不要）'],
    ['\\bmost of (people|students|children)\\b','i','most people / most of the people'],
    ['\\blook forward to (hear|see|meet|receive)\\b','i','look forward to + 動詞ing（to hearing）'],
    ['\\bthe (society|nature)\\b(?! of)','i','一般的な意味の society / nature は無冠詞'],
    ['\\bbecause of (the )?(people|it|they|we) (is|are|have|has|can)\\b','i','because of + 名詞。文が続くなら because'],
    ['\\benter (in|into) (the )?(university|school|college)\\b','i','enter university / go to university'],
    ['\\breturn back\\b','i','return は「戻る」を含む（back は不要）'],
    ['\\bresearch about\\b','i','research into / research on'],
    ['\\bevery days\\b','i','every day（day は単数）'],
    ['\\b(a|an) (\\w+ )?(advice|information|furniture|equipment|homework)\\b','i','不可算名詞に a / an は付けない'],
  ],
  // informal → formal (Task 2 / Academic / formal letters)
  informal: [
    ['\\b(don\'t|doesn\'t|didn\'t|can\'t|won\'t|isn\'t|aren\'t|wasn\'t|weren\'t|shouldn\'t|wouldn\'t|couldn\'t|haven\'t|hasn\'t|it\'s|that\'s|there\'s|they\'re|we\'re|you\'re|i\'m|i\'ve|i\'d|let\'s)\\b','i','短縮形 → 省略しない形（do not / cannot など）'],
    ['\\b(a lot of|lots of)\\b','i','a lot of → a large number of / a great deal of / many / much'],
    ['\\bkids?\\b','i','kid(s) → child / children'],
    ['\\b(stuff|things)\\b','i','stuff / things → 具体的な名詞（items, issues, factors など）'],
    ['\\b(gonna|wanna|gotta)\\b','i','くだけた口語 → going to / want to / have to'],
    ['\\betc\\.?','i','etc. → such as ... で具体例を挙げる'],
    ['\\bnowadays,? (kids|guys)\\b','i','くだけた表現'],
  ],
  overused: [
    ['very', 3, 'very の多用 → extremely / highly や強い形容詞（essential, enormous など）'],
    ['really', 2, 'really の多用 → genuinely / particularly / significantly'],
    ['think', 3, 'think の多用 → believe / argue / would say / consider'],
    ['good', 3, 'good の多用 → beneficial / positive / valuable / effective'],
    ['bad', 3, 'bad の多用 → harmful / negative / detrimental / damaging'],
    ['big', 2, 'big の多用 → significant / major / considerable / substantial'],
    ['get', 3, 'get の多用 → obtain / receive / become / achieve'],
    ['important', 3, 'important の多用 → essential / crucial / vital / significant'],
    ['people', 6, 'people の多用 → individuals / citizens / residents / the public'],
    ['many', 4, 'many の多用 → numerous / a large number of / a wide range of'],
  ],
};
