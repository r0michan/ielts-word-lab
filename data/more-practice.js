// More writing prompts, idioms & prepositions, common mistakes and katakana English.
// Loaded after writing.js / expressions.js data / japan.js data, before the scripts that parse them.

window.WRITING.prompts.push(
  {task:'gt1', style:'formal', title:'電車の遅延への苦情', q:'The train you take to work has been late many times recently.\nWrite a letter to the train company. In your letter:', b:['describe the problem','explain how it has affected you','say what you would like the company to do'], model:''},
  {task:'gt1', style:'informal', title:'誕生日パーティーへの招待', q:'You are organising a birthday party for a family member.\nWrite a letter to a friend inviting them. In your letter:', b:['say whose birthday it is and when the party will be','describe what you have planned','ask your friend to help with something'], model:''},
  {task:'gt1', style:'formal', title:'忘れ物の問い合わせ', q:'You left a bag on a bus last week.\nWrite a letter to the bus company. In your letter:', b:['give details of your journey','describe the bag and what was in it','explain why the bag is important to you'], model:''},
  {task:'gt1', style:'semi-formal', title:'上司へ休暇の相談', q:'You need to take some time off work.\nWrite a letter to your manager. In your letter:', b:['explain why you need time off','say how long you need','suggest how your work could be covered'], model:''},
  {task:'ac1', title:'通勤手段の変化（折れ線）', q:'The graph below shows the percentage of commuters in one city who travelled to work by car, bus and bicycle between 2000 and 2020.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
   chart:{type:'line', unit:'%', x:['2000','2005','2010','2015','2020'], series:[['Car',[62,58,50,44,38]],['Bus',[28,27,30,31,30]],['Bicycle',[5,8,12,18,25]]]}, model:''},
  {task:'ac1', title:'年齢別のSNS利用時間（棒）', q:'The chart below shows the average number of hours per day spent on social media by different age groups in 2015 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
   chart:{type:'bar', unit:'hours', x:['16-24','25-34','35-44','45-54','55+'], series:[['2015',[2.5,2,1.5,1,0.5]],['2025',[3.5,3,2.5,2,1.5]]]}, model:''},
  {task:'ac1', title:'家庭ごみの処理方法（棒）', q:'The chart below shows how household waste was disposed of in one country in 2005 and 2025.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
   chart:{type:'bar', unit:'%', x:['Landfill','Recycling','Burning','Composting'], series:[['2005',[70,15,10,5]],['2025',[25,45,15,15]]]}, model:''},
  {task:'t2', kind:'opinion', title:'子どもにスマホを持たせるべきか', q:'Children under the age of 12 should not be allowed to own a smartphone.\nTo what extent do you agree or disagree?', model:''},
  {task:'t2', kind:'discussion', title:'動物園は必要か', q:'Some people think zoos are cruel and should be closed. Others believe zoos are important for education and conservation.\nDiscuss both views and give your own opinion.', model:''},
  {task:'t2', kind:'advantages', title:'オンライン授業の利点と欠点', q:'More and more universities are offering courses online.\nDo the advantages of this outweigh the disadvantages?', model:''},
  {task:'t2', kind:'problem', title:'若者の住宅問題', q:'In many cities, young people cannot afford to buy a home.\nWhat are the causes of this problem, and what can be done to solve it?', model:''},
  {task:'t2', kind:'opinion', title:'芸術への公的支出', q:'Governments should spend money on public services rather than on the arts, such as music and painting.\nTo what extent do you agree or disagree?', model:''},
  {task:'t2', kind:'twopart', title:'外国語学習の目的', q:'Many people learn a foreign language for work. Others learn one for travel or interest.\nWhy do people learn foreign languages? Which reason do you think is most important?', model:''},
  {task:'t2', kind:'discussion', title:'家事は男女で分担すべきか', q:'Some people believe that housework should be shared equally between men and women. Others think each person should do what they are best at.\nDiscuss both views and give your own opinion.', model:''},
  {task:'t2', kind:'advantages', title:'グローバル企業の拡大', q:'International companies are opening branches all over the world.\nDo the advantages of this trend outweigh the disadvantages for local communities?', model:''},
  {task:'t2', kind:'problem', title:'プラスチックごみ', q:'Plastic waste is a growing problem around the world.\nWhat are the main causes, and what measures could be taken to reduce it?', model:''},
  {task:'t2', kind:'opinion', title:'週4日勤務', q:'A four-day working week would benefit both employees and employers.\nTo what extent do you agree or disagree?', model:''},
  {task:'t2', kind:'twopart', title:'AIと仕事', q:'Artificial intelligence is replacing many jobs.\nWhat kinds of jobs are most at risk? How should people prepare for this change?', model:''},
  {task:'t2', kind:'discussion', title:'スポーツ選手の高額報酬', q:'Some people think that top athletes are paid too much. Others believe they deserve their high salaries.\nDiscuss both views and give your own opinion.', model:''},
);

window.IDIOM_RAW += `
prep|arrive at / arrive in|〜に到着する（at 地点・in 都市）|We arrived [in] Tokyo late at night.
prep|arrive at|（建物・駅）に着く|What time did you arrive [at] the airport?
prep|on the way|途中で|I'll buy some milk [on] the way home.
prep|in the way|邪魔になって|Your bag is [in] the way.
prep|in charge of|〜を担当して|She is in charge [of] the project.
prep|in favour of|〜に賛成して|Most people are [in] favour of the plan.
prep|in terms of|〜の点で|[In] terms of cost, the bus is better.
prep|in contrast to|〜とは対照的に|In contrast [to] last year, sales rose.
prep|on behalf of|〜を代表して|I'm writing on behalf [of] my company.
prep|on the contrary|それどころか|[On] the contrary, it was very easy.
prep|at risk|危険にさらされて|Many species are [at] risk.
prep|at first|最初は|[At] first, I didn't like London.
prep|by chance|偶然に|We met [by] chance at the station.
prep|by far|はるかに|This is [by] far the best option.
prep|for instance|例えば|Some fruits, [for] instance oranges, are rich in vitamin C.
prep|out of date|時代遅れの|This information is out [of] date.
prep|under pressure|プレッシャーの下で|Students are [under] pressure to succeed.
prep|in common|共通して|We have a lot [in] common.
prep|in particular|特に|I enjoy sport, football [in] particular.
prep|in general|一般に|[In] general, people are friendly here.
prep|on average|平均して|People check their phones 80 times a day [on] average.
prep|at the same time|同時に|It is cheap and, [at] the same time, convenient.
prep|in the long term|長期的には|[In] the long term, the policy will save money.
prep|at all costs|何としても|We must avoid war [at] all costs.
prep|benefit from|〜から恩恵を受ける|Everyone will benefit [from] the new park.
prep|recover from|〜から回復する|She is recovering [from] an illness.
prep|differ from|〜と異なる|British English differs [from] American English.
prep|emerge from|〜から現れる|New ideas emerged [from] the discussion.
prep|object to|〜に反対する|Residents object [to] the new airport.
prep|respond to|〜に応える|The government responded [to] the crisis quickly.
prep|adapt to|〜に適応する|It took me a month to adapt [to] the climate.
prep|refer to|〜に言及する|The writer refers [to] several studies.
prep|commit to|〜に専念する・約束する|The company is committed [to] reducing emissions.
prep|participate in|〜に参加する|All students participate [in] sports day.
prep|specialise in|〜を専門とする|She specialises [in] family law.
prep|engage in|〜に従事する|Children should engage [in] physical activity.
prep|believe in|〜の存在・価値を信じる|I believe [in] equal opportunities.
prep|result from|〜から生じる|Many accidents result [from] tiredness.
prep|consist in|〜にある（本質）|Happiness consists [in] being content.
prep|comment on|〜についてコメントする|He refused to comment [on] the news.
prep|concentrate on|〜に集中する|Concentrate [on] your studies.
prep|pay for|〜の代金を払う|Who will pay [for] the damage?
prep|search for|〜を探す|Police are searching [for] the missing boy.
prep|care for|〜の世話をする|Nurses care [for] patients.
prep|blame A for B|BのことでAを責める|Don't blame me [for] the mistake.
prep|charge A for B|BについてAに請求する|They charged us [for] the extra bag.
prep|accuse A of B|AをBで告発する|He was accused [of] stealing.
prep|remind A of B|AにBを思い出させる|This song reminds me [of] my childhood.
prep|approve of|〜を認める|My parents don't approve [of] my plan.
prep|take care of|〜の世話をする|Who will take care [of] the dog?
prep|get rid of|〜を処分する|We need to get rid [of] old furniture.
prep|make use of|〜を活用する|Make use [of] every opportunity.
prep|keen on|〜に熱心な|I'm not keen [on] horror films.
prep|fond of|〜が好きな|She is fond [of] animals.
prep|tired of|〜にうんざりして|I'm tired [of] waiting.
prep|full of|〜でいっぱいの|The train was full [of] tourists.
prep|short of|〜が不足して|Hospitals are short [of] nurses.
prep|capable of|〜ができる|Robots are capable [of] doing many jobs.
prep|anxious about|〜を心配して|I'm anxious [about] the exam.
prep|excited about|〜にわくわくして|She is excited [about] the trip.
prep|concerned about|〜を懸念して|People are concerned [about] pollution.
prep|enthusiastic about|〜に熱心な|He is enthusiastic [about] his new job.
prep|disappointed with|〜にがっかりして|I was disappointed [with] the results.
prep|bored with|〜に飽きて|I'm bored [with] this game.
prep|involved in|〜に関わって|Parents should be involved [in] their children's education.
prep|based on|〜に基づいて|The film is based [on] a true story.
prep|dependent on|〜に依存して|The economy is dependent [on] tourism.
prep|harmful to|〜に有害な|Smoking is harmful [to] your health.
prep|essential for|〜に不可欠な|Water is essential [for] life.
prep|suitable for|〜に適した|This film isn't suitable [for] children.
prep|known for|〜で知られている|Japan is known [for] its punctual trains.
phrasal|bring about|もたらす|Technology has brought [about] many changes.
phrasal|come across|偶然見つける|I came [across] an interesting article.
phrasal|look up to|尊敬する|I've always looked [up] to my grandfather.
phrasal|run into|偶然会う|I ran [into] an old friend yesterday.
phrasal|turn into|〜に変わる|The old factory was turned [into] flats.
phrasal|give in|屈する|The government refused to give [in] to their demands.
phrasal|hold on|待つ|Hold [on], I'll check.
phrasal|break up|別れる・解散する|They broke [up] last year.
phrasal|bring down|下げる|The government wants to bring [down] prices.
phrasal|cut back on|減らす|We need to cut [back] on spending.
phrasal|do without|〜なしで済ます|I can't do [without] my phone.
phrasal|fall behind|遅れをとる|He fell [behind] with his studies.
phrasal|go up|上がる|Prices have gone [up].
phrasal|go down|下がる|Unemployment has gone [down].
phrasal|keep on|〜し続ける|Keep [on] practising.
phrasal|let down|がっかりさせる|Don't let me [down].
phrasal|make up|作り上げる・構成する|Women make [up] half the workforce.
phrasal|pay off|報われる・完済する|All the hard work paid [off].
phrasal|run out|尽きる|Time is running [out].
phrasal|set off|出発する|We set [off] early in the morning.
phrasal|show up|現れる|Only five people showed [up].
phrasal|sign up|申し込む|I signed [up] for an English course.
phrasal|speak up|はっきり話す|Could you speak [up], please?
phrasal|take on|引き受ける|She took [on] too much work.
phrasal|throw away|捨てる|Don't throw [away] food.
phrasal|try out|試す|Let's try [out] the new app.
phrasal|wake up|目を覚ます|I woke [up] at six.
phrasal|warm up|準備運動をする|Always warm [up] before exercise.
phrasal|wear out|すり減る・疲れ果てる|These shoes are worn [out].
phrasal|back up|支持する・バックアップする|Back [up] your files regularly.
idiom|a dime a dozen|ありふれた（米）|Cheap restaurants are a dime a [dozen] here.
idiom|beat around the bush|遠回しに言う|Stop beating around the [bush] and tell me.
idiom|break the bank|大金がかかる|A short holiday won't break the [bank].
idiom|by the skin of your teeth|かろうじて|I passed by the skin of my [teeth].
idiom|cut to the chase|本題に入る|Let's cut to the [chase].
idiom|get cold feet|怖じ気づく|He got cold [feet] before the wedding.
idiom|go back to the drawing board|一からやり直す|The plan failed, so it's back to the drawing [board].
idiom|hit the road|出発する|It's late. Let's hit the [road].
idiom|in hot water|困った立場で|He's in hot [water] with his boss.
idiom|jump on the bandwagon|時流に乗る|Many companies jumped on the [bandwagon] and launched apps.
idiom|keep your chin up|元気を出して|Keep your [chin] up. You'll pass next time.
idiom|let off steam|うっぷんを晴らす|Exercise helps me let off [steam].
idiom|on the ball|抜け目なく有能で|Our new manager is really on the [ball].
idiom|out of the blue|突然|She called me out of the [blue].
idiom|pull your weight|自分の役割を果たす|Everyone in the team must pull their [weight].
idiom|rule of thumb|経験則|As a rule of [thumb], save 10% of your income.
idiom|speak your mind|思ったことを率直に言う|She always speaks her [mind].
idiom|steal the show|主役を食う|The child actor stole the [show].
idiom|take it easy|気楽にやる・休む|Take it [easy] this weekend.
idiom|the ball is in your court|次はあなたの番だ|I've made my offer. The ball is in your [court].
idiom|throw in the towel|あきらめる|Don't throw in the [towel] yet.
idiom|turn a blind eye|見て見ぬふりをする|The police turned a blind [eye] to the problem.
idiom|under the table|裏で・不正に|He was paid under the [table].
idiom|wrap your head around|理解する|I can't wrap my [head] around this grammar.
idiom|your guess is as good as mine|私にもわからない|"When will it stop raining?" "Your guess is as good as [mine]."
idiom|a far cry from|〜とは大違い|The new flat is a far [cry] from the old one.
idiom|ahead of the curve|時代の先を行って|The company is ahead of the [curve] in AI.
idiom|food for thought|考えるべきこと|The lecture gave me food for [thought].
idiom|the tip of my tongue|喉まで出かかって|His name is on the tip of my [tongue].
idiom|at the end of the day|結局のところ|At the end of the [day], it's your decision.
`;

window.ERRORS_RAW += `
I'm very interesting in music.|I'm very interested in music.|-ed（人の感情）と -ing（物の性質）の区別。
She has a long hair.|She has long hair.|髪全体の hair は不可算。a は付けない。
I visited to Kyoto last year.|I visited Kyoto last year.|visit は他動詞。to は不要。
I reached to the station at 9.|I reached the station at 9. / I arrived at the station at 9.|reach は他動詞。
We discussed about it for hours.|We discussed it for hours.|discuss の後に about は不要。
I'm going to my home.|I'm going home.|home は副詞として使う（to my は不要）。
He entered into the room.|He entered the room.|「部屋に入る」は enter + 場所（into 不要）。
Please contact with me by email.|Please contact me by email.|contact は他動詞。
I listened the music.|I listened to the music.|listen は自動詞。listen to + 目的語。
She resembles to her mother.|She resembles her mother.|resemble は他動詞。
I'm looking forward to meet you.|I'm looking forward to meeting you.|to は前置詞なので動名詞。
I'm not good at to speak English.|I'm not good at speaking English.|前置詞 at の後は動名詞。
I want to make a travel to Europe.|I want to travel to Europe. / I want to take a trip to Europe.|travel は通常動詞。名詞なら trip。
I have a confidence.|I have confidence. / I am confident.|confidence は不可算。
It's a good news.|It's good news.|news は不可算名詞。
Each students have a computer.|Each student has a computer.|each の後は単数名詞・単数動詞。
One of my friend lives in Paris.|One of my friends lives in Paris.|one of + 複数名詞。動詞は単数（lives）。
There is many problems.|There are many problems.|複数名詞には there are。
The police is coming.|The police are coming.|police は複数扱い。
Mathematics are difficult.|Mathematics is difficult.|学問名の -ics は単数扱い。
I am study English now.|I am studying English now.|進行形は be + 動詞ing。
I am knowing the answer.|I know the answer.|know は状態動詞で進行形にしない。
I have finished my homework yesterday.|I finished my homework yesterday.|yesterday は過去形と使う。
When I was child, I lived in Osaka.|When I was a child, I lived in Osaka.|可算名詞の単数には a が必要。
I go to the school by bus.|I go to school by bus.|授業を受ける目的の school は無冠詞。
She is a doctor and works at the hospital in my town.|She is a doctor and works at a hospital in my town.|初めて話題に出すものは a。
I like the dogs.|I like dogs.|一般的な好みは無冠詞の複数形。
The life is short.|Life is short.|一般的な意味の life は無冠詞。
He is taller than me two centimetres.|He is two centimetres taller than me.|差は比較級の前に置く。
This is more cheap than that.|This is cheaper than that.|短い形容詞は -er。
I'm sure she will come, isn't it?|I'm sure she will come, won't she?|付加疑問文は主節の主語と動詞に合わせる。
Although I studied hard but I failed.|Although I studied hard, I failed.|although と but を一緒に使わない。
Because I was tired. I went to bed.|Because I was tired, I went to bed.|because 節だけでは文にならない（断片）。
I didn't go out. Because it was raining.|I didn't go out because it was raining.|because 節を独立した文にしない。
In my country, there is a lot of people.|In my country, there are a lot of people.|a lot of + 複数名詞には are。
The informations was helpful.|The information was helpful.|information に s は付かない。
I have lived here for 2020.|I have lived here since 2020.|起点は since、期間は for。
I will call you until 5 o'clock.|I will call you by 5 o'clock.|期限は by、継続は until。
We stayed in the hotel during three days.|We stayed in the hotel for three days.|期間の長さは for、出来事の間は during。
Can you borrow me your pen?|Can you lend me your pen? / Can I borrow your pen?|borrow は借りる、lend は貸す。
`;

window.WASEI_RAW += `
シール|seal|sticker|seal は「封印・アザラシ」。
アイドル|idol|pop star / celebrity|idol は「偶像」で、日本のアイドル文化は説明が必要。
ガッツポーズ|guts pose|fist pump|
ノースリーブ|no sleeve|sleeveless|
ジーパン|jeans pants|jeans|
タレント|talent|TV personality / celebrity|talent は「才能」。
マジック（ペン）|magic|marker / felt-tip pen|
ゴム（輪ゴム）|gum|rubber band / elastic band (UK)|gum は「ガム・歯ぐき」。
コンビニ|convenience|convenience store|略さず言う。
デパート|depart|department store|depart は「出発する」。
エアコン|air con|air conditioner / AC (US) / air con (UK)|英国では air con も使う。
リモコン|remocon|remote (control)|
スーパー|super|supermarket|super は形容詞（すごい）。
アポ|apo|appointment|
プリント（学校の）|print|handout / worksheet|
ベッドタウン|bed town|commuter town / suburb|
キャッチボール|catch ball|play catch|
フリーター|freeter|part-time worker / someone without a permanent job|
メール（携帯の）|mail|text (message) / email|mail は「郵便」の意味が強い。
ボールペン|ball pen|ballpoint pen / pen|
ストーブ|stove|heater|stove はアメリカでは「コンロ」。
クーラー|cooler|air conditioner|cooler は「保冷箱」。
ハーフ（混血）|half|mixed-race / of mixed heritage|half は失礼に聞こえることがある。
`;
