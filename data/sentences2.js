// More sentence patterns — category|pattern|English|日本語|tip
Object.assign(window.SENTENCE_CATS, {
  purpose:'目的', time:'時・順序', hedge:'控えめに言う', certainty:'確信・推測', describe:'描写（Part 2）', problem:'問題提起',
});
window.SENTENCE_RAW += `
purpose|in order to ~|Many students work part-time in order to pay their fees.|多くの学生は学費を払うためにアルバイトをしている。|in order to + 動詞の原形 = 〜するために（to だけより明確）。
purpose|so that ~ can ~|Cities should build more cycle lanes so that people can travel safely.|人々が安全に移動できるように、都市はもっと自転車レーンを作るべきだ。|so that + 主語 + can/will + 動詞。
purpose|with the aim of ~ing|The campaign was launched with the aim of reducing plastic waste.|その運動はプラスチックごみを減らすことを目的に始められた。|with the aim of + 動名詞。
purpose|so as not to ~|We left early so as not to miss the train.|電車に乗り遅れないように早めに出発した。|否定の目的は so as not to / in order not to。
purpose|for the purpose of ~ing|The data was collected for the purpose of improving services.|そのデータはサービス改善のために集められた。|硬い書き言葉。
time|As soon as ~, ~|As soon as I arrived, I called my parents.|到着するとすぐに両親に電話した。|as soon as = 〜するとすぐに。
time|By the time ~, ~ had ~|By the time we got to the station, the train had left.|駅に着いたときには、電車はもう出ていた。|過去のある時点までに完了したことは過去完了。
time|Once ~, ~|Once you get used to it, driving on the left is easy.|一度慣れてしまえば、左側通行の運転は簡単だ。|once = いったん〜すると。
time|While ~ing, ~|While studying in London, I made friends from many countries.|ロンドンで勉強している間に、多くの国の友達ができた。|主語が同じなら while + 動詞ing と短くできる。
time|Since ~, ~ have ~|Since moving to the city, I have become much more independent.|都会に引っ越してから、私はずっと自立した。|since の後は過去の出来事、主節は現在完了。
time|Before ~ing, ~|Before applying for the job, you should check the requirements.|仕事に応募する前に、条件を確認すべきだ。|前置詞の後は動名詞。
time|After ~ing, ~|After finishing university, she worked abroad for two years.|大学を卒業した後、彼女は2年間海外で働いた。|主語は主節と同じにする。
time|It was not long before ~|It was not long before the new system became popular.|新しい制度はまもなく人気になった。|It was not long before = まもなく〜した。
time|No sooner had ~ than ~|No sooner had I left home than it started to rain.|家を出たとたんに雨が降り出した。|倒置を使う上級表現。
time|In the past, ~, whereas nowadays ~|In the past, people wrote letters, whereas nowadays they send messages.|昔は手紙を書いたが、今はメッセージを送る。|過去と現在の比較。スピーキングでも便利。
time|Over the past decade, ~|Over the past decade, the cost of living has risen sharply.|過去10年で生活費は急上昇した。|Over the past + 期間 は現在完了と使う。
time|In the near future, ~|In the near future, most cars will probably be electric.|近い将来、ほとんどの車はおそらく電気自動車になるだろう。|未来の予測。probably で断定を避ける。
hedge|It could be argued that ~|It could be argued that social media does more harm than good.|ソーシャルメディアは益より害が大きいとも言えるだろう。|控えめに主張を出す学術的な言い方。
hedge|To some extent, ~|To some extent, I agree with this statement.|ある程度は、この意見に賛成だ。|To what extent 型の問題で使える。
hedge|This may be because ~|This may be because young people have less free time.|これは若者の自由な時間が少ないからかもしれない。|may / might で原因を推測する。
hedge|~ tends to ~|Online shopping tends to be cheaper than shopping in stores.|ネット通販は店で買うより安い傾向がある。|一般化を和らげる。
hedge|In many cases, ~|In many cases, children learn languages faster than adults.|多くの場合、子どもは大人より速く言語を覚える。|例外があることを示す。
hedge|It is likely that ~|It is likely that more people will work from home.|より多くの人が在宅勤務をするようになる可能性が高い。|It is likely / unlikely that + 文。
hedge|There is a possibility that ~|There is a possibility that the plan will fail.|その計画が失敗する可能性がある。|possibility that + 文。
hedge|~ seems to ~|The new policy seems to be working.|新しい政策はうまくいっているようだ。|seem to + 動詞。
hedge|Not all ~ are ~|Not all young people are addicted to their phones.|すべての若者が携帯に依存しているわけではない。|部分否定。過度な一般化を避ける。
hedge|Some might say that ~, but ~|Some might say that zoos are outdated, but they still educate the public.|動物園は時代遅れだと言う人もいるかもしれないが、それでも人々を教育している。|反論を予想して答える形。
certainty|There is no question that ~|There is no question that technology has changed our lives.|テクノロジーが私たちの生活を変えたことは疑いない。|強い確信。
certainty|It is clear that ~|It is clear that the current system is not working.|現在の制度が機能していないことは明らかだ。|It is clear / evident that + 文。
certainty|~ must have ~|He must have forgotten about the meeting.|彼は会議のことを忘れていたに違いない。|must have + 過去分詞 = 〜したに違いない。
certainty|~ can't have ~|She can't have finished the essay already.|彼女がもうエッセイを書き終えたはずがない。|can't have + 過去分詞 = 〜したはずがない。
certainty|~ might have ~|The letter might have been lost in the post.|手紙は郵送中に紛失したのかもしれない。|might have + 過去分詞 = 〜したかもしれない。
certainty|I'm fairly sure that ~|I'm fairly sure that the shop closes at six.|その店は6時に閉まるとほぼ確信している。|fairly = かなり。
certainty|~ is bound to ~|Prices are bound to rise next year.|来年は物価がきっと上がる。|be bound to = 必ず〜する。
describe|I'd like to talk about ~|I'd like to talk about a trip I took to Hokkaido last winter.|昨年の冬に行った北海道旅行について話したいと思います。|Part 2 の書き出しの定番。
describe|It was the first time I had ever ~|It was the first time I had ever seen snow.|雪を見たのはそれが初めてだった。|the first time + 過去完了 + ever。
describe|What made it special was ~|What made it special was the people I met there.|それを特別なものにしたのは、そこで出会った人々だった。|What 節で強調する。
describe|I'll never forget ~|I'll never forget the view from the top of the mountain.|山頂からの景色は決して忘れない。|印象を強く伝える。
describe|It reminded me of ~|The town reminded me of my grandparents' village.|その町は祖父母の村を思い出させた。|remind A of B = A に B を思い出させる。
describe|~ is located in ~, about ~ from ~|The café is located in the city centre, about five minutes from the station.|そのカフェは中心街にあり、駅から5分ほどの所にある。|場所の説明。
describe|It's the kind of place where ~|It's the kind of place where you can relax and forget about work.|そこはくつろいで仕事を忘れられるような場所だ。|関係副詞 where で場所を詳しく。
describe|The main reason I chose ~ was that ~|The main reason I chose this course was that it offered practical training.|この講座を選んだ主な理由は、実践的な訓練があったことだ。|理由を述べて話を広げる。
describe|Looking back, ~|Looking back, I think it was the best decision I've ever made.|振り返ると、あれは今までで最高の決断だったと思う。|Part 2 の締めくくりに。
describe|If I'm honest, ~|If I'm honest, I was quite nervous at first.|正直に言うと、最初はかなり緊張していた。|自然な口語の前置き。
describe|~ was much ~er than I had expected|The city was much bigger than I had expected.|その都市は思っていたよりずっと大きかった。|比較級 + than I had expected。
describe|I was impressed by ~|I was impressed by how friendly the local people were.|地元の人々のフレンドリーさに感心した。|how + 形容詞 + 主語 + 動詞。
problem|One of the biggest problems facing ~ is ~|One of the biggest problems facing young people today is the high cost of housing.|今日の若者が直面する最大の問題の一つは、住宅費の高さだ。|facing = 〜が直面している（分詞）。
problem|~ has become a serious concern|Air pollution has become a serious concern in many cities.|大気汚染は多くの都市で深刻な懸念になっている。|問題提起の書き出し。
problem|This raises the question of whether ~|This raises the question of whether exams are a fair way to assess students.|これは、試験が学生を評価する公平な方法かどうかという疑問を生む。|raise the question = 疑問を投げかける。
problem|~ poses a threat to ~|Rising sea levels pose a threat to coastal cities.|海面上昇は沿岸都市に脅威を与えている。|pose a threat / risk / challenge to。
problem|~ is at risk of ~ing|Many species are at risk of becoming extinct.|多くの種が絶滅の危機にある。|at risk of + 動名詞。
problem|What is worse, ~|What is worse, the problem is getting more serious every year.|さらに悪いことに、問題は年々深刻になっている。|What is more の否定的なバージョン。
problem|~ is particularly true of ~|This is particularly true of people living in large cities.|これは特に大都市に住む人々に当てはまる。|be true of = 〜に当てはまる。
opinion|As far as I am concerned, ~|As far as I am concerned, free healthcare is a basic human right.|私に関する限り、無料の医療は基本的人権だ。|In my opinion の言い換え。
opinion|I am in favour of ~|I am in favour of banning cars from city centres.|都心から車を締め出すことに賛成だ。|in favour of + 名詞/動名詞（米: favor）。
opinion|I am opposed to ~|I am opposed to the idea of raising university fees.|大学の授業料を上げる考えに反対だ。|be opposed to + 名詞/動名詞（to は前置詞）。
opinion|My view is that ~|My view is that schools should focus more on practical skills.|私の考えは、学校はもっと実用的な技能に力を入れるべきだというものだ。|My view is that + 文。
opinion|It is my belief that ~|It is my belief that everyone deserves a second chance.|誰もが二度目のチャンスに値するというのが私の信念だ。|硬めの書き言葉。
opinion|I can see why some people ~, but ~|I can see why some people prefer city life, but I would rather live in the countryside.|都会暮らしを好む人がいる理由はわかるが、私は田舎に住みたい。|相手の意見に理解を示してから自分の意見へ。
cause|~ is the result of ~|The rise in obesity is the result of poor diets and lack of exercise.|肥満の増加は、悪い食生活と運動不足の結果だ。|A is the result of B = A は B の結果。
cause|~ is closely linked to ~|Mental health is closely linked to physical health.|心の健康は身体の健康と密接に関連している。|be linked to / associated with。
cause|One reason for this is that ~. Another is that ~|One reason for this is that rents are high. Another is that wages have not increased.|その理由の一つは家賃が高いことだ。もう一つは賃金が上がっていないことだ。|理由を2つ並べる型。
cause|This can be explained by ~|This can be explained by the growth of the tourism industry.|これは観光業の成長によって説明できる。|分析的な書き言葉。
cause|Owing to ~, ~|Owing to heavy snow, all flights were cancelled.|大雪のため、全便が欠航になった。|owing to = due to（硬め）。
cause|Thanks to ~, ~|Thanks to the internet, people can learn almost anything online.|インターネットのおかげで、人々はほとんど何でもオンラインで学べる。|良い原因に使う（皮肉以外）。
effect|~ gives rise to ~|Rapid urbanisation gives rise to many social problems.|急速な都市化は多くの社会問題を生む。|give rise to = 〜を引き起こす。
effect|~ brings about ~|Technology has brought about huge changes in education.|テクノロジーは教育に大きな変化をもたらした。|bring about = もたらす。
effect|As a consequence, ~|As a consequence, many small shops have closed.|その結果として、多くの小さな店が閉店した。|As a result の言い換え。
effect|~ will inevitably ~|Higher taxes will inevitably reduce consumer spending.|増税は必然的に消費支出を減らすだろう。|inevitably = 必然的に。
effect|This, in turn, ~|Exercise improves sleep. This, in turn, improves concentration.|運動は睡眠を改善する。そしてそれが今度は集中力を高める。|in turn = 今度はそれが（連鎖的な影響）。
effect|~ has both positive and negative effects on ~|Tourism has both positive and negative effects on local communities.|観光は地域社会に良い影響と悪い影響の両方を与える。|両面を示す序論の文。
compare|~ is twice as ~ as ~|Living in Tokyo is twice as expensive as living in Osaka.|東京の生活費は大阪の2倍だ。|倍数 + as 形容詞 as。
compare|~, while ~|Some people enjoy city life, while others prefer the countryside.|都会暮らしを楽しむ人もいれば、田舎を好む人もいる。|while = 一方で（対比）。
compare|There are several similarities between ~ and ~|There are several similarities between the two education systems.|2つの教育制度にはいくつかの類似点がある。|比較エッセイの書き出し。
compare|The main difference between ~ and ~ is that ~|The main difference between the two cities is that one is much older.|2つの都市の主な違いは、一方がずっと古いことだ。|the difference between A and B is that + 文。
compare|~ is by far the most ~|English is by far the most widely spoken second language.|英語は群を抜いて最も広く話されている第二言語だ。|最上級の強調は by far。
compare|~ is no longer as ~ as it used to be|The town is no longer as quiet as it used to be.|その町はもう以前ほど静かではない。|no longer = もはや〜ない。
compare|~, just as ~|Children need rules, just as adults do.|大人と同じように、子どもにもルールが必要だ。|just as = 〜と全く同じように。
concede|Granted, ~, but ~|Granted, the new system is expensive, but it will save money in the long run.|確かに新制度は高いが、長い目で見れば節約になる。|Granted = 確かに（譲歩）。
concede|Even if ~, ~|Even if the government lowers taxes, prices may continue to rise.|たとえ政府が減税しても、物価は上がり続けるかもしれない。|even if = たとえ〜でも（仮定）。
concede|However ~ may be, ~|However difficult it may be, we must reduce emissions.|どんなに難しくても、私たちは排出を減らさなければならない。|However + 形容詞 + 主語 + may be。
concede|Whatever ~, ~|Whatever the cost, the bridge must be repaired.|費用がいくらかかろうと、橋は修理しなければならない。|whatever = 何であろうと。
concede|That said, ~|Online learning is convenient. That said, it cannot replace a good teacher.|オンライン学習は便利だ。とはいえ、良い教師の代わりにはならない。|口語・書き言葉どちらでも使える「とはいえ」。
example|Take ~, for example|Take Singapore, for example. It has very little crime.|シンガポールを例にとると、犯罪がとても少ない。|具体例を強く提示する。
example|~, including ~|Many countries, including Japan, have ageing populations.|日本を含む多くの国で人口が高齢化している。|including + 名詞。
example|~ is a case in point|Plastic pollution in the oceans is a case in point.|海洋プラスチック汚染がその好例だ。|a case in point = 好例。
example|Research has shown that ~|Research has shown that children who read regularly perform better at school.|定期的に読書をする子どもは学校の成績が良いことが研究で示されている。|根拠として研究を示す（具体名は不要）。
example|According to a recent study, ~|According to a recent study, most people check their phones within ten minutes of waking up.|最近の研究によると、ほとんどの人が起きて10分以内に携帯を確認する。|according to + 情報源。
cond|Had ~, ~ would have ~|Had I known about the problem, I would have helped.|もしその問題を知っていたら、手伝っただろう。|If I had known の倒置（上級）。
cond|If it were not for ~, ~ would ~|If it were not for the internet, working from home would be impossible.|インターネットがなければ、在宅勤務は不可能だろう。|仮定法過去。Without で言い換え可。
cond|Should ~, ~|Should you have any questions, please contact me.|ご質問があれば、ご連絡ください。|If you should の倒置。手紙で丁寧。
cond|Suppose ~, ~|Suppose cars were banned in cities. How would people travel?|都市で車が禁止されたとしたら、人々はどう移動するだろうか。|suppose = 仮に〜だとしたら。
cond|In case ~|Take an umbrella in case it rains.|雨が降るといけないので傘を持っていきなさい。|in case = 〜するといけないから（if とは違う）。
cond|Only if ~ will ~|Only if we act now will we be able to stop climate change.|今行動して初めて気候変動を止められる。|Only if が文頭だと主節が倒置。
solve|The most effective way to ~ would be to ~|The most effective way to reduce traffic would be to improve public transport.|渋滞を減らす最も効果的な方法は、公共交通を改善することだろう。|would で提案を控えめにする。
solve|Governments could ~ by ~ing|Governments could encourage healthy eating by taxing sugary drinks.|政府は甘い飲み物に課税することで健康的な食事を促すことができる。|could + by 動名詞で具体策。
solve|One way of tackling this problem is to ~|One way of tackling this problem is to provide more affordable housing.|この問題に取り組む一つの方法は、手頃な住宅をもっと供給することだ。|tackle a problem = 問題に取り組む。
solve|It would be wise to ~|It would be wise to invest in renewable energy now.|今のうちに再生可能エネルギーに投資するのが賢明だろう。|提案を丁寧に。
solve|Steps need to be taken to ~|Steps need to be taken to protect young people online.|若者をネット上で守るための対策が必要だ。|take steps = 措置を講じる。
solve|Both ~ and ~ have a role to play in ~ing|Both parents and schools have a role to play in preventing bullying.|いじめを防ぐには、親と学校の両方が果たすべき役割がある。|責任の分担を示す。
general|It goes without saying that ~|It goes without saying that health is more important than money.|健康がお金より大切なのは言うまでもない。|言うまでもなく。
general|It is commonly assumed that ~|It is commonly assumed that older people dislike technology.|高齢者はテクノロジーが嫌いだと一般に思われている。|後で反論する前置きに便利。
general|More and more ~ are ~ing|More and more people are choosing to work remotely.|ますます多くの人がリモートワークを選んでいる。|More and more + 複数名詞。
general|It has become increasingly common for ~ to ~|It has become increasingly common for young people to live with their parents.|若者が親と同居することはますます一般的になっている。|It has become + 形容詞 + for 人 + to 動詞。
general|In today's world, ~|In today's world, it is almost impossible to live without a smartphone.|今日の世界では、スマートフォンなしで生活するのはほぼ不可能だ。|序論の書き出しに。
general|There has been a dramatic change in ~|There has been a dramatic change in the way people shop.|人々の買い物の仕方に劇的な変化があった。|the way + 主語 + 動詞。
add|Not to mention ~|Cycling is good for your health, not to mention the money you save.|自転車は健康に良いし、節約できるお金は言うまでもない。|not to mention = 〜は言うまでもなく。
add|Besides ~ing, ~|Besides improving fitness, sport teaches teamwork.|体力を高めるだけでなく、スポーツはチームワークを教える。|besides + 動名詞 = 〜に加えて。
add|As well as ~ing, ~|As well as being cheap, the bus is very convenient.|安いだけでなく、バスはとても便利だ。|as well as + 動名詞。
add|On top of that, ~|On top of that, the rent is very high.|その上、家賃がとても高い。|口語的な「その上」。スピーキングで自然。
add|Equally important is ~|Equally important is the need to protect wildlife.|同じくらい重要なのは、野生生物を守る必要性だ。|倒置で強調。
add|Last but not least, ~|Last but not least, travelling helps us understand other cultures.|最後に大事なことを一つ、旅は他の文化を理解する助けになる。|最後の論点の導入。
struct|The reason why ~ is that ~|The reason why many people move to cities is that there are more jobs.|多くの人が都市に移る理由は、仕事が多いからだ。|reason why ... is that（because は使わない）。
struct|~ is worth ~ing|The museum is worth visiting.|その博物館は訪れる価値がある。|be worth + 動名詞。
struct|It is no wonder that ~|It is no wonder that so many people feel stressed.|多くの人がストレスを感じるのも不思議ではない。|no wonder = 不思議ではない。
struct|~ used to ~, but now ~|People used to read newspapers, but now they get news online.|人々は以前は新聞を読んでいたが、今はネットでニュースを得る。|used to = 以前は〜していた。
struct|~ is used to ~ing|I am used to getting up early.|早起きには慣れている。|be used to + 動名詞 = 〜に慣れている（used to とは別物）。
struct|It is essential for ~ to ~|It is essential for children to get enough sleep.|子どもが十分な睡眠をとることは不可欠だ。|It is 形容詞 for 人 to 動詞。
struct|~ allow ~ to ~|Smartphones allow us to stay in touch with friends.|スマートフォンのおかげで友達と連絡を取り合える。|allow 人 to 動詞。
struct|~ prevent ~ from ~ing|High fees prevent many students from going to university.|高い学費のせいで、多くの学生が大学に行けない。|prevent 人 from 動名詞。
struct|~ encourage ~ to ~|Schools should encourage students to think critically.|学校は生徒に批判的に考えるよう促すべきだ。|encourage 人 to 動詞。
struct|Not only is ~, but it is also ~|Not only is the train faster, but it is also cheaper.|電車はより速いだけでなく、より安くもある。|Not only が文頭 → 倒置（is the train）。
struct|~ , which means that ~|Prices have doubled, which means that many families cannot afford food.|物価が2倍になり、多くの家庭が食料を買えなくなっている。|, which means that で結果を続ける。
struct|Those who ~ tend to ~|Those who exercise regularly tend to be happier.|定期的に運動する人は、より幸せな傾向がある。|those who = 〜する人々。
struct|The more ~, the less ~|The more time people spend online, the less they sleep.|ネットで過ごす時間が長いほど、人は眠らなくなる。|The 比較級 …, the 比較級 …。
struct|Whether ~ or not, ~|Whether you like it or not, technology is here to stay.|好むと好まざるとにかかわらず、テクノロジーはなくならない。|whether A or not = A であろうとなかろうと。
struct|~ , as ~|Many people prefer trains, as they are more reliable than buses.|バスより信頼できるので、多くの人が電車を好む。|as = since（理由）。
graph|~ experienced a sharp decline|Coal production experienced a sharp decline after 2010.|石炭生産は2010年以降、急激に減少した。|名詞で変化を表す。
graph|~ remained relatively unchanged|The number of visitors remained relatively unchanged.|訪問者数はほぼ変わらなかった。|remain + 形容詞。
graph|~ was the most popular ~, accounting for ~|Cars were the most popular form of transport, accounting for 45% of journeys.|車は最も人気のある交通手段で、移動の45%を占めた。|分詞構文 accounting for で割合を加える。
graph|~ was considerably higher than ~|The figure for men was considerably higher than that for women.|男性の数値は女性よりかなり高かった。|比較の強調 considerably / significantly。
graph|~ is expected to ~ by ~|The population is expected to reach 10 million by 2050.|人口は2050年までに1000万人に達すると予想されている。|予測データに。be expected / projected to。
graph|In terms of ~, ~|In terms of spending, food was the largest category.|支出の点では、食費が最大の項目だった。|in terms of = 〜の観点で。
graph|The process consists of ~ stages|The process consists of six stages, beginning with the collection of raw materials.|その工程は、原材料の収集から始まる6つの段階で構成されている。|プロセス図（Task 1）の書き出し。
graph|Once ~ has been ~, it is ~|Once the glass has been collected, it is cleaned and crushed.|ガラスは回収されると、洗浄されて粉砕される。|プロセスは受動態で説明する。
graph|At the final stage, ~|At the final stage, the finished products are delivered to shops.|最終段階では、完成品が店に配送される。|順序を示す: Initially → Next → Finally。
letter|I am writing to enquire about ~|I am writing to enquire about the evening courses you offer.|貴校が提供する夜間講座について問い合わせたく、お便りしています。|enquire about = 問い合わせる。
letter|I would like to request ~|I would like to request a full refund.|全額返金をお願いしたいと思います。|丁寧な要求。
letter|I would appreciate it if you could ~|I would appreciate it if you could reply by Friday.|金曜日までにお返事いただけると幸いです。|appreciate it if のit を忘れない。
letter|I am afraid that ~|I am afraid that I will not be able to attend the meeting.|申し訳ありませんが、会議に出席できません。|残念な知らせを丁寧に伝える。
letter|I hope this will not cause you any inconvenience|I hope this will not cause you any inconvenience.|ご迷惑をおかけしないことを願っております。|謝罪・変更の連絡の締めに。
letter|It was great to hear from you|It was great to hear from you after such a long time.|久しぶりに連絡をもらえて嬉しかったよ。|インフォーマルな手紙の書き出し。
letter|Let me know if ~|Let me know if you need anything else.|他に何か必要なら知らせてね。|インフォーマルな締め。
letter|I'm writing to let you know that ~|I'm writing to let you know that I've moved to a new flat.|新しいアパートに引っ越したことを知らせたくて書いています。|セミフォーマル〜インフォーマル。
speak|That's a tough question, but I'd say ~|That's a tough question, but I'd say the main reason is cost.|難しい質問ですが、主な理由は費用だと思います。|Part 3 で考える時間を作る。
speak|I've never really thought about it, but ~|I've never really thought about it, but I suppose it depends on the person.|あまり考えたことはありませんが、人によると思います。|正直に前置きしてから答える。
speak|Off the top of my head, ~|Off the top of my head, I can think of two reasons.|ぱっと思いつくのは、2つの理由です。|即答するときの自然な表現。
speak|What I like most about ~ is ~|What I like most about my job is the people I work with.|仕事で一番好きなのは、一緒に働く人たちです。|What 節で強調。
speak|I'm the kind of person who ~|I'm the kind of person who likes to plan everything in advance.|私は何でも前もって計画したいタイプの人間です。|自分の性格を説明する。
speak|To be honest, I'm not a big fan of ~|To be honest, I'm not a big fan of spicy food.|正直に言うと、辛い食べ物はあまり好きではありません。|やわらかく否定的な好みを言う。
speak|It's hard to say, but ~|It's hard to say, but I think the situation will improve.|何とも言えませんが、状況は良くなると思います。|予測が難しいときに。
speak|Generally speaking, people in my country ~|Generally speaking, people in my country work very long hours.|一般的に言って、私の国の人はとても長時間働きます。|Part 3 で自国の例を出すときに。
conclude|Taking everything into account, ~|Taking everything into account, I believe the benefits are greater.|すべてを考慮すると、利点のほうが大きいと思う。|結論の言い換え。
conclude|In the final analysis, ~|In the final analysis, education is the key to solving this problem.|結局のところ、教育がこの問題を解決する鍵だ。|上級の結論表現。
conclude|It is therefore clear that ~|It is therefore clear that action must be taken now.|したがって、今行動を起こさなければならないことは明らかだ。|therefore を文中に置く。
conclude|While there are some drawbacks, ~|While there are some drawbacks, I believe the advantages are more significant.|いくつかの欠点はあるものの、利点のほうが重要だと思う。|譲歩を含めた結論。
`;
