// Model answers for Task 1 (letters and charts). Keyed by prompt title; points = why it scores well.
window.WRITING_MODELS = window.WRITING_MODELS || {};
Object.assign(window.WRITING_MODELS, {
'ホテルへの苦情': {points:['1段落目で手紙の目的と日付を明確にしている','箇条書き3つに1段落ずつ答えている','I would be grateful if you could… で丁寧に要求している']},
'インターネット普及率（折れ線）': {points:['1文目で問題文を言い換えている（shows → illustrates, percentage → proportion）','Overview で「全体の増加」「最大と最小」をまとめている','数字を使い、respectively や compared with で比較している']},
'大学教育は無料にすべきか': {points:['序論で立場（largely agree）を示し、結論まで一貫している','本論1・2で「理由→説明→例」の順に展開している','Admittedly… However… で反対意見に譲歩し反論している']},
'友人の訪問': {model:`Dear Anna,

I'm so glad you've finally booked your trip to Kanazawa! I can't wait to show you around.

The best time to come is probably late October or early November. The summer here is very hot and humid, but in autumn the weather is cool and sunny, and the leaves in the gardens turn a beautiful red and gold.

There are lots of places I'd like to take you. You definitely shouldn't miss Kenrokuen, which is one of the most famous gardens in Japan. We could also walk around the old geisha district, where the streets are lined with traditional wooden tea houses, and visit the fish market for the freshest sushi you'll ever taste.

Getting around is easy. Most of the sights are close together, so you can walk or rent a bicycle. There's also a loop bus that stops at all the main attractions, and a one-day pass only costs about 800 yen.

Let me know your dates as soon as you can, and I'll plan everything.

Best wishes,
Yuki`, points:['友人向けなので短縮形（I\'m, can\'t）やくだけた結びが適切','箇条書き3つ（時期・場所・移動）に順番に1段落ずつ答えている','which / where の関係詞で文をつないでいる']},
'講座の問い合わせ': {model:`Dear Sir or Madam,

I am writing to enquire about the evening course in web design that is advertised on your website. I would like to improve my skills in this area, as my company is planning to launch a new online shop next year and I will be responsible for maintaining it.

I already have some basic experience. I completed a short online course in HTML two years ago, and I have built a simple website for a local sports club. However, I have never studied design in a formal setting, and I would like to learn how to create more professional and user-friendly pages.

I would be grateful if you could send me some further information about the course. In particular, could you please let me know how much the fees are and whether it is possible to pay in instalments? I would also like to know which evenings the classes take place, as I work until six o'clock on weekdays.

I look forward to hearing from you.

Yours faithfully,
Takashi Mori`, points:['目的（enquire about）を最初に書いている','経験を具体的に説明（HTML の講座・スポーツクラブのサイト）','質問を2つに分けて丁寧に依頼している']},
'隣人の騒音': {model:`Dear Mr Patel,

I am writing about the noise that has been coming from your flat late at night over the past few weeks. I hope you will not mind me raising this with you directly.

Most evenings, there has been loud music until around one or two o'clock in the morning. I understand that you may not realise how much sound travels through the walls, as the building is quite old.

Unfortunately, the noise has been affecting me quite badly. I start work at seven, so I need to go to bed early, and I have been finding it very difficult to sleep. As a result, I have been feeling tired and struggling to concentrate at work.

I was wondering if you could keep the volume down after eleven o'clock on weekdays. Alternatively, using headphones late at night might be a good solution. I would be very happy to talk about this in person if that would be easier.

Thank you for your understanding.

Yours sincerely,
Emi Sato`, points:['相手の名前を知っているので Dear Mr Patel → Yours sincerely','責めすぎず、相手の事情を理解する一文で関係を保っている','解決策を I was wondering if… と控えめに提案している']},
'アルバイトへの応募': {model:`Dear Ms Collins,

I am writing to apply for the part-time position of museum assistant, which was advertised in last Saturday's edition of the City News.

My name is Kenji Tanaka, and I am a 24-year-old postgraduate student at the University of Leeds, where I am studying history. I have been living in the UK for two years and am available to work at weekends and on two weekday afternoons.

I am particularly interested in this job because I have always been fascinated by local history, and I would love the opportunity to help visitors learn about it. Working in a museum would also give me practical experience that would be valuable for my future career in education.

I believe I have the right skills for the role. Last summer, I worked as a volunteer guide at a castle in my home town in Japan, where I regularly gave tours in English and Japanese. I am friendly, reliable and comfortable speaking to large groups of people.

I have attached my CV and would be happy to attend an interview at any time.

Yours sincerely,
Kenji Tanaka`, points:['応募する職と求人を見た場所を最初に明記','興味の理由と経験を別段落に分け、具体例で裏付けている','I have attached my CV で締める定番の流れ']},
'借りた物を壊した': {model:`Dear Sam,

I'm afraid I have some bad news, and I feel terrible about it.

Last weekend I took the camera you lent me on a hiking trip in the mountains. On the way down, I slipped on a wet rock and dropped my bag. When I checked the camera that evening, the screen was cracked, and now it won't turn on at all.

I'm really sorry. I know how much that camera means to you, especially since your parents gave it to you for your graduation. I should have been much more careful and kept it in its case.

Of course, I'll pay for everything. I've already found a repair shop near my office that says it can fix the screen within a week. If they can't repair it, I'll buy you a new one of the same model. I'll bring it round as soon as it's ready.

Once again, I'm so sorry. I hope you can forgive me!

All the best,
Mika`, points:['何が起きたかを時系列で説明（Last weekend → On the way down → that evening）','I should have been… で後悔を表現','具体的な対応策（修理・買い替え）を示している']},
'電車の遅延への苦情': {model:`Dear Sir or Madam,

I am writing to complain about the frequent delays on the 7.45 a.m. service from Greenfield to Central Station, which I use every weekday to travel to work.

Over the past month, the train has been late on at least twelve occasions, often by more than twenty minutes. On several mornings, it was cancelled altogether without any explanation, and passengers were left waiting on a crowded platform for the next service.

These delays have caused me serious problems. I have been late for work repeatedly, and last week I missed an important meeting with a client. My manager has now warned me that if this continues, it may affect my performance review. In addition, I pay over £150 a month for a season ticket, so I feel that I am not receiving the service I have paid for.

I would therefore like to request partial compensation for the delays this month. I would also be grateful if you could explain what steps the company is taking to improve the reliability of this service.

I look forward to your reply.

Yours faithfully,
Daniel Ito`, points:['回数・時間など具体的な数字で問題を説明','影響を「仕事」と「お金」の2点で示している','要求を2つ（補償と改善策の説明）明確に書いている']},
'誕生日パーティーへの招待': {model:`Hi Lucy,

How are you? I hope your new job is going well!

I'm writing because we're throwing a surprise party for my mum's 60th birthday, and I'd love you to come. It's on Saturday 14 June, starting at about six in the evening, at our house. Please don't mention it to her if you see her before then!

We've got quite a lot planned. My brother is going to cook a big Italian dinner, since that's Mum's favourite food, and we've booked a local jazz band to play in the garden. We're also putting together a photo slideshow of her life, which I think will make her a bit emotional.

Actually, there's one thing I was hoping you could help with. You're so good at baking, so would you be able to make the birthday cake? Nothing too complicated, maybe a chocolate one with "Happy 60th" written on it. I'd pay for all the ingredients, of course.

Let me know if you can make it. It wouldn't be the same without you!

Love,
Hana`, points:['インフォーマルな書き出し（Hi Lucy, How are you?）','日時・場所・内容を自然な会話調で説明','依頼を Would you be able to…? と柔らかく頼んでいる']},
'忘れ物の問い合わせ': {model:`Dear Sir or Madam,

I am writing to ask whether a bag I left on one of your buses last week has been handed in.

I was travelling on the number 42 bus from the city centre to Riverside on Tuesday 3 March, at around 6.30 in the evening. I got off at the Riverside Library stop and only realised a few minutes later that I had left my bag on the seat near the back of the bus.

It is a small black leather backpack with a red keyring attached to the zip. Inside, there was a laptop, a blue notebook, a pencil case and a green water bottle.

The bag is extremely important to me because the laptop contains all the research for my university dissertation, which I have to submit at the end of this month. Although I have backed up some of my files, I would lose several weeks of work if the laptop cannot be found.

I would be very grateful if you could check your lost property office and contact me on 07700 900123 or at the email address below.

Yours faithfully,
Aya Nakamura`, points:['日時・路線・降りた場所を正確に書いている','持ち物を色・素材など具体的に描写','重要な理由を「論文の締め切り」と結びつけて説得力を出している']},
'上司へ休暇の相談': {model:`Dear Mr Hughes,

I am writing to ask whether it would be possible for me to take some time off work next month.

Unfortunately, my father has been unwell recently, and he is due to have an operation in Osaka on 12 May. As my mother is elderly and cannot look after him on her own, I would like to return to Japan to help him during his recovery.

I would need around two weeks off, from 9 May to 23 May. I have nine days of annual leave remaining this year, and I would be happy to take the rest as unpaid leave if necessary.

I have thought carefully about how my work could be covered while I am away. The monthly sales report is almost finished, and I will complete it before I leave. Rina, who has worked closely with me on the Tanaka account, has kindly agreed to deal with any urgent client requests, and I will be available by email in an emergency.

Thank you for considering my request. I would be happy to discuss it with you at any time.

Yours sincerely,
Ken Watanabe`, points:['理由を具体的かつ簡潔に説明','期間と有給の残り日数を数字で示している','不在中の業務を誰がどう担当するか具体的に提案']},
'余暇の過ごし方（棒）': {model:`The bar chart compares the average number of hours that men and women in one country spent each week on five different leisure activities.

Overall, watching television was the most popular pastime for both genders. Men spent more time than women on sport and gaming, whereas women devoted more time to reading and socialising.

Men and women spent a similar amount of time watching TV, at 12 and 11 hours per week respectively, far more than on any other activity. Socialising was the second most time-consuming activity for women, at 8 hours, compared with 6 hours for men.

The largest difference between the sexes was in gaming. Men played games for an average of 7 hours a week, which was more than three times the figure for women, at just 2 hours. Men also spent slightly more time on sport, at 5 hours compared with 3 for women. In contrast, reading was more popular among women, who read for 5 hours a week, while men read for only 3 hours.`, points:['Overview で「最も多い活動」と「男女の傾向の違い」をまとめている','respectively / compared with / whereas で比較','差が最も大きい項目（gaming）を three times で強調']},
'エネルギー源の割合（棒）': {model:`The bar chart shows how the share of electricity produced from five different sources in one country changed between 1990 and 2020.

Overall, the country became much less dependent on coal and oil over the thirty-year period, while gas and renewable energy became far more significant. The proportion of nuclear power remained the same.

In 1990, coal was by far the largest source of electricity, accounting for 45% of the total, followed by oil at 30%. By 2020, however, the share of coal had fallen by more than half to 20%, and oil had decreased slightly to 25%. As a result, coal lost its position as the leading source of electricity.

Over the same period, gas overtook all other sources to become the most important, doubling from 15% to 30%. The most dramatic change was in renewables, which rose fourfold from just 5% to 20%, making them as significant as coal by the end of the period. Nuclear power, meanwhile, consistently provided 5% of the country's electricity, making it the smallest source in both years.`, points:['1990年と2020年の比較を「減ったもの」「増えたもの」に分けて整理','fell by more than half / doubling / fourfold など変化の大きさを多彩に表現','変化のない項目（nuclear）も一文で触れている']},
'通勤手段の変化（折れ線）': {model:`The line graph illustrates the percentage of commuters in one city who travelled to work by car, bus and bicycle over a twenty-year period from 2000 to 2020.

Overall, the car remained the most common way of getting to work throughout the period, but its popularity declined steadily. In contrast, cycling grew significantly, while the proportion of bus users stayed relatively stable.

In 2000, 62% of commuters drove to work, more than twice the figure for the bus, at 28%. Over the next two decades, car use fell continuously, dropping to 50% in 2010 and reaching a low of 38% in 2020.

Bus use fluctuated only slightly, dipping to 27% in 2005 before recovering to around 30% for the rest of the period. By far the most dramatic change was seen in cycling. Only 5% of people cycled to work in 2000, but this figure rose steadily every year, reaching 25% by 2020, which was five times the original level and close to the share of bus users.`, points:['Overview に「最も多い手段」「減少」「増加」「横ばい」の4つの傾向','fell continuously / reaching a low of / fluctuated only slightly など変化の語彙','five times the original level で変化の大きさを数値で強調']},
'年齢別のSNS利用時間（棒）': {model:`The bar chart compares the average number of hours per day that people in five age groups spent on social media in 2015 and 2025.

Overall, social media use increased in every age group over the ten-year period. Younger people spent the most time on social media in both years, and the amount of time decreased with age. This pattern was the same in both years.

In 2015, people aged 16 to 24 used social media for 2.5 hours a day, compared with 2 hours for those aged 25 to 34. The figures then fell steadily with each older age group, to just half an hour a day among people aged 55 and over.

By 2025, every group was spending exactly one hour more per day on social media than in 2015. The youngest group remained the heaviest users, at 3.5 hours a day. However, the relative increase was largest among the oldest users, whose daily use tripled from 0.5 to 1.5 hours. By contrast, use among the youngest group rose by only 40%, from 2.5 to 3.5 hours.`, points:['年代が上がるほど減るというパターンを Overview で説明','全年代で「ちょうど1時間増えた」という共通点を見つけて書いている','relative increase（増加率）の視点で最年長層の変化を強調']},
'家庭ごみの処理方法（棒）': {model:`The bar chart shows how household waste was disposed of in one country in 2005 and 2025.

Overall, there was a significant shift away from landfill towards recycling. In 2005, most waste ended up in landfill, whereas by 2025 recycling had become the most common method of disposal.

In 2005, landfill accounted for 70% of household waste, while only 15% was recycled. Burning and composting were much less common, at 10% and 5% respectively. In other words, almost three quarters of all household waste was buried in the ground.

Twenty years later, the situation had changed dramatically. The proportion of waste sent to landfill had fallen to just 25%, almost a third of its earlier level. Recycling, by contrast, had tripled to 45%, making it the most important method. Composting also grew considerably, from 5% to 15%, and burning rose slightly to 15%. Taken together, recycling and composting accounted for 60% of all household waste by the end of the period, compared with only a fifth in 2005.`, points:['Overview で「埋め立て → リサイクル」という大きな変化を一文で','almost a third of its earlier level / tripled など比率の表現','Twenty years later, the situation had changed dramatically. で段落をつなぐ']},
});
