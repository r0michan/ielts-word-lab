// IELTS sentence patterns — category|pattern|English|日本語|tip
window.SENTENCE_CATS = {
  opinion:'意見を述べる', cause:'理由・原因', effect:'結果・影響', compare:'比較・対照', concede:'譲歩',
  example:'例を挙げる', cond:'条件・仮定', solve:'提案・解決策', general:'一般論・傾向', add:'追加・強調',
  struct:'複文・構文', graph:'グラフ描写 (Task 1)', letter:'手紙 (GT Task 1)', speak:'スピーキング', conclude:'結論',
};
window.SENTENCE_RAW = `
opinion|I firmly believe that ~|I firmly believe that governments should invest more in public transport.|政府は公共交通にもっと投資すべきだと、私は強く信じている。|believe that + 主語 + 動詞。firmly で確信の強さを出す。
opinion|In my view, ~|In my view, the benefits of tourism outweigh the drawbacks.|私の考えでは、観光の利点は欠点を上回る。|outweigh =「〜より重い・上回る」。Task 2 の定番。
opinion|From my perspective, ~|From my perspective, learning a foreign language is essential for young people.|私の観点からすると、外国語を学ぶことは若者にとって不可欠だ。|In my opinion の言い換えとして使える。
opinion|It seems to me that ~|It seems to me that people are becoming too dependent on technology.|人々はテクノロジーに頼りすぎるようになっていると私には思える。|断定を避けて柔らかく意見を言う形。
opinion|I would argue that ~|I would argue that university education should be free for everyone.|大学教育は誰にとっても無料であるべきだと私は主張したい。|would で丁寧・控えめな主張になる。
opinion|I am convinced that ~|I am convinced that regular exercise improves mental health.|定期的な運動は心の健康を改善すると私は確信している。|be convinced that = 確信している。
opinion|While some people claim that ~, I believe ~|While some people claim that zoos are cruel, I believe they play an important role in conservation.|動物園は残酷だと主張する人もいるが、私は動物園が保護において重要な役割を果たしていると思う。|反対意見を認めてから自分の意見を言う、高評価の構文。
opinion|I partly agree with ~|I partly agree with the idea that children should start school at an early age.|子どもは早い年齢で学校に通い始めるべきだという考えに、私は部分的に賛成だ。|To what extent 型の問題で「一部賛成」を示す。
opinion|I strongly disagree with the view that ~|I strongly disagree with the view that older people cannot learn new skills.|高齢者は新しい技能を学べないという見方に、私は強く反対する。|the view that + 文 で「〜という見方」。
opinion|I tend to think that ~|I tend to think that small schools offer a better learning environment.|小規模な学校のほうがよい学習環境を提供すると私は考えがちだ。|tend to = 〜する傾向がある。控えめな意見。
cause|The main reason for this is that ~|The main reason for this is that housing in cities is too expensive.|その主な理由は、都市の住宅が高すぎることだ。|reason is that + 文（because は使わない）。
cause|This is largely due to ~|This is largely due to the rapid growth of online shopping.|これは主にネット通販の急速な成長によるものだ。|due to + 名詞。largely = 主に。
cause|~ is mainly caused by ~|Air pollution is mainly caused by traffic and factories.|大気汚染は主に交通と工場によって引き起こされる。|受動態 be caused by で原因を述べる。
cause|One factor that contributes to ~ is ~|One factor that contributes to obesity is a lack of physical activity.|肥満の一因となっている要因の一つは、運動不足だ。|contribute to = 〜の一因となる。関係代名詞 that を含む。
cause|Because of ~, ~|Because of rising costs, many families cannot afford to travel abroad.|費用の上昇のため、多くの家庭は海外旅行をする余裕がない。|because of + 名詞、because + 文。区別に注意。
cause|~ stems from ~|Many health problems stem from a poor diet.|多くの健康問題は貧しい食生活から生じている。|stem from = 〜から生じる（C1語彙）。
cause|~ can be attributed to ~|The increase in crime can be attributed to high unemployment.|犯罪の増加は高い失業率が原因だと考えられる。|attribute A to B = A を B のせいにする。
cause|As a result of ~, ~|As a result of climate change, extreme weather is becoming more common.|気候変動の結果、異常気象がより一般的になっている。|as a result of + 名詞。
cause|This is partly because ~|This is partly because young people prefer to live in cities.|これは一部には、若者が都市に住むことを好むからだ。|partly because で原因の一部であることを示す。
effect|As a result, ~|Many young people move to cities. As a result, rural areas are losing their populations.|多くの若者が都市へ移る。その結果、農村部は人口を失っている。|文頭の As a result, は前の文の結果を示す。
effect|Consequently, ~|Fewer people are having children. Consequently, the population is ageing.|子どもを持つ人が減っている。その結果、人口が高齢化している。|Consequently = As a result の硬い言い方。
effect|~ can lead to ~|Spending too much time online can lead to sleep problems.|ネットで時間を使いすぎると、睡眠の問題につながりうる。|lead to + 名詞（to の後は動名詞・名詞）。
effect|~ has a significant impact on ~|Tourism has a significant impact on local culture.|観光は地域の文化に大きな影響を与える。|have an impact on = 〜に影響を与える。
effect|~ results in ~|Deforestation results in the loss of many animal species.|森林破壊は多くの動物種の喪失をもたらす。|result in + 結果。result from + 原因（逆）。
effect|This means that ~|Prices have risen sharply. This means that many families are struggling.|物価が急上昇した。これは、多くの家庭が苦しんでいることを意味する。|前文の内容を受けて説明を加える。
effect|If this trend continues, ~|If this trend continues, there will be a serious shortage of teachers.|この傾向が続けば、深刻な教員不足になるだろう。|条件 + will で将来の結果を予測。
effect|~ has a negative effect on ~|Long working hours have a negative effect on family life.|長時間労働は家庭生活に悪影響を与える。|effect（名詞）と affect（動詞）の区別に注意。
effect|~ makes it difficult for ~ to ~|High rents make it difficult for young people to save money.|高い家賃のせいで、若者がお金を貯めるのは難しい。|make it + 形容詞 + for 人 + to 動詞。
compare|Compared with ~, ~|Compared with people in the past, we now have much easier access to information.|昔の人々と比べると、私たちは今では情報にずっと簡単にアクセスできる。|Compared with/to + 名詞, 主文。
compare|~, whereas ~|Older people prefer reading newspapers, whereas young people get their news online.|高齢者は新聞を読むのを好むが、一方で若者はネットでニュースを得る。|whereas = 一方で（対比）。
compare|In contrast, ~|Sales in Europe fell. In contrast, sales in Asia rose steadily.|ヨーロッパでの売上は減った。対照的に、アジアでの売上は着実に伸びた。|文頭で前文との対比を示す。
compare|On the other hand, ~|Living in a city is convenient. On the other hand, it can be very stressful.|都市に住むことは便利だ。一方で、とてもストレスがたまることもある。|On the one hand … On the other hand … の組み合わせも。
compare|Unlike ~, ~|Unlike traditional classes, online courses allow students to study at their own pace.|従来の授業と違って、オンライン講座では学生が自分のペースで学べる。|Unlike + 名詞, 主文。
compare|~ is far more ~ than ~|Cycling is far more environmentally friendly than driving.|自転車は車の運転よりはるかに環境にやさしい。|比較級の強調は far / much（very は不可）。
compare|Similarly, ~|Similarly, many workers prefer flexible working hours.|同様に、多くの労働者は柔軟な勤務時間を好む。|前文と同じ傾向を加える。
compare|The more ~, the more ~|The more time children spend outdoors, the healthier they become.|子どもが屋外で過ごす時間が長いほど、より健康になる。|The 比較級 + 主語 + 動詞, the 比較級 + 主語 + 動詞。
compare|Both A and B ~|Both parents and teachers are responsible for children's behaviour.|親と教師の両方が子どもの行動に責任がある。|Both A and B は複数扱い（are）。
compare|~ is not as ~ as ~|Public transport in rural areas is not as reliable as in cities.|農村部の公共交通は都市部ほど信頼できない。|not as 形容詞 as = 〜ほど…でない。
concede|Although ~, ~|Although technology has many benefits, it also creates new problems.|テクノロジーには多くの利点があるが、新たな問題も生み出す。|Although + 文, 主文。but と一緒に使わない。
concede|Despite ~, ~|Despite the high cost, many students choose to study abroad.|高い費用にもかかわらず、多くの学生が留学を選ぶ。|despite + 名詞（of は付けない）。
concede|Even though ~, ~|Even though the job was stressful, she enjoyed it.|その仕事はストレスが多かったが、彼女は楽しんでいた。|although より意味が強い。
concede|While it is true that ~, ~|While it is true that cars are convenient, they cause serious pollution.|車が便利なのは確かだが、深刻な汚染を引き起こす。|相手の意見を認めつつ反論する定番。
concede|Admittedly, ~. However, ~|Admittedly, online learning is flexible. However, it lacks face-to-face interaction.|確かにオンライン学習は柔軟だ。しかし、対面での交流が欠けている。|Admittedly = 確かに（譲歩）。
concede|Nevertheless, ~|The plan is expensive. Nevertheless, it is worth the investment.|その計画は費用がかかる。それでも、投資する価値がある。|前文を受けて「それでも」。
concede|In spite of the fact that ~, ~|In spite of the fact that he was tired, he finished the report.|疲れていたにもかかわらず、彼は報告書を仕上げた。|in spite of the fact that + 文。
example|For example, ~|For example, many companies now allow employees to work from home.|例えば、今では多くの会社が従業員の在宅勤務を認めている。|allow 人 to 動詞。
example|For instance, ~|Some countries, for instance Finland, have excellent education systems.|いくつかの国、例えばフィンランドは、優れた教育制度を持っている。|文中に挿入することもできる。
example|~, such as ~|Renewable energy sources, such as wind and solar power, are becoming cheaper.|風力や太陽光のような再生可能エネルギー源は、安くなってきている。|such as + 名詞（文は続けない）。
example|A good example of this is ~|A good example of this is Japan's high-speed rail network.|その良い例が、日本の高速鉄道網だ。|主張の直後に具体例を出す。
example|This is clearly illustrated by ~|This is clearly illustrated by the success of electric cars in Norway.|これはノルウェーにおける電気自動車の成功によってはっきり示されている。|illustrate = 例で示す。
example|To illustrate, ~|To illustrate, a recent survey found that 60% of teenagers feel stressed.|例を挙げると、最近の調査では10代の60%がストレスを感じているとわかった。|数字を使った例はTask 2で説得力が増す。
example|In my own experience, ~|In my own experience, studying in a group helps me stay motivated.|私自身の経験では、グループで勉強するとやる気を保ちやすい。|help 人 + 動詞の原形。
cond|If ~, ~ will ~|If the government lowers taxes, people will spend more money.|政府が減税すれば、人々はもっとお金を使うだろう。|If 節は現在形、主節は will。
cond|If ~ were to ~, ~ would ~|If governments were to ban cars from city centres, air quality would improve.|もし政府が都心から車を締め出せば、空気の質は改善するだろう。|仮定法。were to で「仮に〜したら」。
cond|Unless ~, ~|Unless we take action now, many species will become extinct.|今行動しなければ、多くの種が絶滅するだろう。|unless = if not。否定語を重ねない。
cond|~ as long as ~|Technology is useful as long as it is used responsibly.|責任を持って使われる限り、テクノロジーは役に立つ。|as long as = 〜する限り。
cond|~, provided that ~|Working from home can be productive, provided that employees have a quiet space.|静かな場所があるなら、在宅勤務は生産的になりうる。|provided that = 〜という条件で。
cond|Without ~, ~ would ~|Without public funding, many museums would have to close.|公的資金がなければ、多くの博物館は閉館せざるを得ないだろう。|仮定法。Without = If it were not for。
cond|It would be better if ~|It would be better if schools taught more practical skills.|学校がもっと実用的な技能を教えればよいのだが。|仮定法過去（taught）で提案する。
solve|One possible solution is to ~|One possible solution is to improve public transport.|解決策の一つとして考えられるのは、公共交通を改善することだ。|solution is to + 動詞の原形。
solve|Governments should ~|Governments should provide more support for young families.|政府は若い家族にもっと支援を提供すべきだ。|should で提案。provide A for B。
solve|It is essential that ~|It is essential that children learn how to manage money.|子どもがお金の管理方法を学ぶことは不可欠だ。|It is essential that + 主語 + 動詞の原形（learn）。
solve|An effective way to ~ is to ~|An effective way to reduce waste is to charge for plastic bags.|ごみを減らす効果的な方法は、レジ袋を有料にすることだ。|way to 動詞 is to 動詞。
solve|This problem could be solved by ~ing|This problem could be solved by building more affordable housing.|この問題は、手頃な住宅をもっと建てることで解決できるだろう。|by + 動名詞 = 〜することによって。
solve|Measures should be taken to ~|Measures should be taken to protect endangered animals.|絶滅危惧種を守るための対策を講じるべきだ。|take measures = 対策を講じる（受動態）。
solve|It is high time that ~|It is high time that we took climate change seriously.|そろそろ気候変動を真剣に受け止めるべき時だ。|It is high time + 過去形（took）。
solve|Individuals can also play a part by ~ing|Individuals can also play a part by using less energy at home.|個人も家庭でエネルギー使用を減らすことで役割を果たせる。|play a part = 役割を果たす。
general|It is widely believed that ~|It is widely believed that exercise improves concentration.|運動は集中力を高めると広く信じられている。|一般論を述べる受動態の構文。
general|There is a growing tendency to ~|There is a growing tendency to shop online rather than in stores.|店舗ではなくネットで買い物をする傾向が強まっている。|rather than = 〜よりむしろ。
general|Many people argue that ~|Many people argue that university should be free.|多くの人が大学は無料であるべきだと主張する。|Discuss both views 型の書き出しに。
general|It is often said that ~|It is often said that travel broadens the mind.|旅は視野を広げるとよく言われる。|序論の書き出しに便利。
general|In recent years, ~|In recent years, the number of people working from home has increased dramatically.|近年、在宅勤務をする人の数が劇的に増えた。|In recent years は現在完了と相性がよい。
general|Nowadays, an increasing number of ~|Nowadays, an increasing number of people are choosing to live alone.|今日、ますます多くの人が一人暮らしを選んでいる。|an increasing number of + 複数名詞 + 複数動詞。
general|Generally speaking, ~|Generally speaking, young people are more comfortable with technology.|一般的に言って、若者のほうがテクノロジーに慣れている。|一般化の前置き。
general|There is no doubt that ~|There is no doubt that the internet has changed the way we communicate.|インターネットが私たちのコミュニケーションの仕方を変えたことは間違いない。|the way we 動詞 = 〜する方法。
general|When it comes to ~, ~|When it comes to education, parents play a key role.|教育ということになると、親が重要な役割を果たす。|When it comes to + 名詞/動名詞。
add|Furthermore, ~|Furthermore, public transport reduces traffic congestion.|さらに、公共交通は交通渋滞を減らす。|Moreover / In addition と言い換え可能。
add|In addition, ~|In addition, regular exercise helps people sleep better.|加えて、定期的な運動は人々がよく眠るのを助ける。|help 人 + 動詞の原形。
add|Not only ~, but ~ also ~|Not only does cycling save money, but it also improves fitness.|自転車は節約になるだけでなく、体力も向上させる。|Not only が文頭だと倒置（does cycling）。上級構文。
add|What is more, ~|What is more, online courses are often cheaper.|その上、オンライン講座はたいてい安い。|話し言葉・書き言葉の両方で使える。
add|Another advantage is that ~|Another advantage is that people can work from anywhere.|もう一つの利点は、どこからでも働けることだ。|Advantages/disadvantages 型の本論で。
add|One major drawback of ~ is that ~|One major drawback of city life is the high cost of living.|都市生活の大きな欠点の一つは、生活費の高さだ。|drawback = 欠点。
add|Above all, ~|Above all, children need love and support.|何よりも、子どもには愛情と支えが必要だ。|最も重要な点を述べる。
add|Firstly, ~|Firstly, it is important to consider the cost.|第一に、費用を考慮することが重要だ。|Firstly → Secondly → Finally と順に並べる。
add|It is ~ that ~|It is the government that should take responsibility for this problem.|この問題に責任を持つべきなのは政府だ。|強調構文 It is A that …。
struct|~, which ~|Many people now work from home, which has reduced traffic in city centres.|今では多くの人が在宅勤務をしており、そのことで都心の交通量が減った。|, which で前の文全体を受ける。
struct|People who ~ tend to ~|People who exercise regularly tend to live longer.|定期的に運動する人は長生きする傾向がある。|関係代名詞 who で主語を詳しくする。
struct|~ is one of the most ~|Climate change is one of the most serious problems facing the world today.|気候変動は、今日世界が直面している最も深刻な問題の一つだ。|one of the 最上級 + 複数名詞。
struct|It is important for ~ to ~|It is important for young people to learn how to cook.|若者が料理の仕方を学ぶことは重要だ。|It is 形容詞 for 人 to 動詞。
struct|~ makes it possible for ~ to ~|The internet makes it possible for people to work from anywhere.|インターネットのおかげで、人々はどこからでも働けるようになっている。|make it possible for 人 to 動詞。
struct|It takes ~ to ~|It takes a long time to master a foreign language.|外国語を習得するには長い時間がかかる。|It takes 時間 to 動詞。
struct|~ enables ~ to ~|Scholarships enable students from poor families to attend university.|奨学金は、貧しい家庭の学生が大学に通うことを可能にする。|enable 人 to 動詞。
struct|There is no point in ~ing|There is no point in buying expensive equipment if you never use it.|使わないなら高価な道具を買っても意味がない。|There is no point in + 動名詞。
struct|~ is said to ~|Green tea is said to be good for your health.|緑茶は健康に良いと言われている。|be said to + 動詞 = 〜と言われている。
struct|Having ~, ~|Having finished university, she moved to London.|大学を卒業した後、彼女はロンドンに引っ越した。|完了分詞構文。主語が同じときに使う。
struct|What ~ is ~|What worries me most is the cost of housing.|私が最も心配しているのは住宅費だ。|What 節を主語にして強調する。
struct|so ~ that ~|The traffic was so heavy that I missed my train.|渋滞がひどかったので、電車に乗り遅れた。|so 形容詞 that + 結果。
struct|too ~ to ~|Many young people are too busy to cook at home.|多くの若者は忙しすぎて家で料理ができない。|too 形容詞 to 動詞 = 〜すぎて…できない。
struct|~ not ~ enough to ~|The country is not rich enough to provide free healthcare.|その国は無料の医療を提供できるほど豊かではない。|形容詞 + enough to 動詞（語順に注意）。
struct|The fact that ~|The fact that many students work part-time affects their studies.|多くの学生がアルバイトをしているという事実が、勉強に影響している。|The fact that + 文 が主語。動詞は単数（affects）。
struct|I wish ~|I wish I had started learning English earlier.|もっと早く英語を学び始めていればよかった。|I wish + 過去完了 = 過去への後悔。
struct|~ who ~ should ~|Students who cheat in exams should be punished.|試験で不正をする学生は罰せられるべきだ。|関係代名詞 + 受動態 should be 過去分詞。
struct|It is not until ~ that ~|It was not until I moved abroad that I understood my own culture.|海外に引っ越して初めて、自分の文化を理解した。|It is not until A that B = A して初めて B。
struct|~ rather than ~|Many people choose to rent rather than buy a home.|多くの人が家を買うより借りることを選ぶ。|A rather than B は同じ形を並べる。
struct|~ instead of ~ing|More people should walk instead of driving short distances.|もっと多くの人が、短い距離は車ではなく歩くべきだ。|instead of + 動名詞。
graph|The graph shows ~|The line graph shows the number of tourists visiting Japan between 2010 and 2020.|この折れ線グラフは、2010年から2020年に日本を訪れた観光客の数を示している。|Task 1 の1文目。問題文を言い換える。
graph|The chart compares ~|The bar chart compares the amount of time people in five countries spent online.|この棒グラフは、5か国の人々がネットに費やした時間を比較している。|compare = 比較する。
graph|Overall, it is clear that ~|Overall, it is clear that car use increased while bus use declined.|全体として、車の利用が増えた一方でバスの利用が減ったことは明らかだ。|概要（overview）は Task 1 の採点で必須。
graph|~ rose sharply from ~ to ~|The number of students rose sharply from 2,000 to 5,000.|学生の数は2,000人から5,000人へ急増した。|rise - rose - risen。from A to B で変化の幅。
graph|~ fell slightly in ~|The unemployment rate fell slightly in 2015.|失業率は2015年にわずかに下がった。|fall - fell - fallen。slightly / gradually / dramatically。
graph|~ remained stable at ~|Sales remained stable at around 300 units.|売上は約300個で安定していた。|remain stable / level off。
graph|~ reached a peak of ~ in ~|Visitor numbers reached a peak of 8 million in 2019.|訪問者数は2019年に800万人でピークに達した。|reach a peak / hit a high。
graph|~ fluctuated between ~ and ~|The price fluctuated between 40 and 60 dollars.|価格は40ドルから60ドルの間で変動した。|fluctuate = 上下する。
graph|~ accounted for ~|Coal accounted for 40% of total energy production.|石炭はエネルギー生産全体の40%を占めた。|account for = （割合を）占める。
graph|~ was twice as high as ~|The figure for Canada was twice as high as that for Mexico.|カナダの数値はメキシコの2倍だった。|that for = the figure for の繰り返しを避ける。
graph|~, followed by ~|China had the highest number of users, followed by India.|中国が最も利用者が多く、インドが続いた。|順位を述べるときの定番。
graph|There was a steady increase in ~|There was a steady increase in the use of public transport.|公共交通の利用は着実に増加した。|名詞で変化を表す: a steady increase / a sharp fall。
graph|By contrast, the figure for ~|By contrast, the figure for women dropped to 20%.|対照的に、女性の数値は20%に下がった。|the figure for + 対象。
graph|~ saw a dramatic rise in ~|The 1990s saw a dramatic rise in mobile phone ownership.|1990年代には携帯電話の所有が劇的に増加した。|時代を主語にする上級の言い方。
letter|I am writing to ~|I am writing to complain about the service I received at your hotel.|貴ホテルで受けたサービスについて苦情を申し上げるために書いています。|フォーマルな手紙の1文目。目的を書く。
letter|I am writing with regard to ~|I am writing with regard to the job advertised in yesterday's newspaper.|昨日の新聞に掲載された求人に関してお便りしています。|with regard to = 〜に関して。
letter|I would be grateful if you could ~|I would be grateful if you could send me more information.|詳しい情報をお送りいただけるとありがたいです。|丁寧な依頼の最重要表現。
letter|I would like to apologise for ~|I would like to apologise for missing the meeting last week.|先週の会議を欠席したことをお詫びしたいと思います。|apologise for + 名詞/動名詞。
letter|Unfortunately, ~|Unfortunately, the item I ordered arrived damaged.|あいにく、注文した商品が破損した状態で届きました。|問題を説明するときの書き出し。
letter|I was wondering if ~|I was wondering if you could help me find accommodation.|住む場所を探すのを手伝っていただけないかと思っていました。|過去進行形で控えめな依頼。
letter|Could you please let me know ~?|Could you please let me know when the course starts?|講座がいつ始まるか教えていただけますか。|let me know + 疑問詞 + 主語 + 動詞（語順に注意）。
letter|I look forward to hearing from you.|I look forward to hearing from you soon.|近いうちにお返事をいただけるのを楽しみにしています。|look forward to + 動名詞（to hear は誤り）。
letter|Please do not hesitate to contact me ~|Please do not hesitate to contact me if you need any further information.|さらに情報が必要でしたら、遠慮なくご連絡ください。|フォーマルな手紙の締め。
letter|Thank you for ~|Thank you for your kind invitation to the party.|パーティーへのご親切な招待をありがとう。|Thank you for + 名詞/動名詞。
letter|It would be great if ~|It would be great if you could come and stay with us in the summer.|夏にうちに泊まりに来てくれたら最高だよ。|インフォーマルな依頼・誘い。
letter|I'm really sorry, but ~|I'm really sorry, but I won't be able to come to your wedding.|本当にごめんね、結婚式に行けそうにないんだ。|友人宛ての手紙では短縮形 OK。
speak|That's an interesting question.|That's an interesting question. I've never really thought about it before.|面白い質問ですね。これまで本当に考えたことがありませんでした。|考える時間を稼ぐ表現。Part 3 で有効。
speak|Well, to be honest, ~|Well, to be honest, I don't watch much TV these days.|ええと、正直に言うと、最近はあまりテレビを見ません。|自然な話し始め。
speak|I'd say that ~|I'd say that my hometown is a great place for families.|私の地元は家族にとって素晴らしい場所だと思います。|I think の言い換え。
speak|It depends on ~|It depends on the situation, but I usually prefer to travel by train.|状況によりますが、普段は電車で移動するのが好きです。|It depends on + 名詞。その後に具体例を続ける。
speak|What I mean is ~|What I mean is that people should have more free time.|私が言いたいのは、人々はもっと自由な時間を持つべきだということです。|言い直し・説明の表現。
speak|Let me think...|Let me think... I suppose the main reason is convenience.|そうですね……主な理由は便利さだと思います。|沈黙を避ける。I suppose = 〜だと思う。
speak|The thing is, ~|The thing is, I don't have much time to cook during the week.|実は、平日は料理をする時間があまりないんです。|理由を説明する口語表現。
speak|I used to ~, but now ~|I used to play football, but now I prefer going to the gym.|以前はサッカーをしていましたが、今はジムに行くほうが好きです。|過去と現在の対比。Part 1・2 で頻出。
speak|One thing I really like about ~ is ~|One thing I really like about my city is the variety of food.|私の街で本当に好きなことの一つは、食べ物の種類の多さです。|好きな点を具体的に言う。
speak|If I had the chance, I would ~|If I had the chance, I would travel around South America.|機会があれば、南米を旅して回りたいです。|仮定法過去。Part 2 の締めに。
speak|I'm not really into ~|I'm not really into sports, but I enjoy watching tennis.|スポーツはあまり好きではありませんが、テニスを見るのは楽しいです。|be into = 〜に夢中だ（口語）。
speak|I've been ~ing for ~|I've been learning English for about five years.|英語を学んで約5年になります。|現在完了進行形で継続を表す。
conclude|In conclusion, ~|In conclusion, I believe the advantages of technology far outweigh the disadvantages.|結論として、テクノロジーの利点は欠点をはるかに上回ると私は考える。|結論段落の1文目。序論の意見と一致させる。
conclude|To sum up, ~|To sum up, both individuals and governments must work together to protect the environment.|まとめると、個人と政府の両方が環境保護のために協力しなければならない。|In conclusion の言い換え。
conclude|Overall, ~|Overall, the benefits of studying abroad are greater than the drawbacks.|全体として、留学の利点は欠点よりも大きい。|Task 1 の概要にも Task 2 の結論にも使える。
conclude|All things considered, ~|All things considered, I think living in the countryside is a better option for families.|すべてを考慮すると、家族にとっては田舎暮らしのほうがよい選択だと思う。|上級の結論表現。
conclude|For these reasons, ~|For these reasons, I strongly support the idea of a four-day working week.|これらの理由から、私は週4日勤務の考えを強く支持する。|本論の理由をまとめて結論へ。
`;
