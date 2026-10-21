/* 語彙ドリルのデータ: 言い換え（パラフレーズ）・コロケーション・つづり（英米差／間違えやすい語） */

// cluster|word|synonyms (comma)|日本語|example containing the word
// Distractors are drawn only from other clusters, so a "wrong" option never also fits the sentence.
window.PARA_RAW = `
imp|important|crucial,vital,essential|重要な|Education is important for every child.
imp|main|primary,principal,major|主な|Cost is the main reason people shop online.
imp|mainly|largely,predominantly,primarily|主に|The audience was mainly young people.
size|big|large,substantial,considerable|大きい|There was a big difference between the two groups.
size|many|numerous,countless,a large number of|多くの|Many students study abroad.
size|a lot of|a great deal of,a significant amount of,plenty of|たくさんの（不可算）|Building a bridge takes a lot of money.
size|very|extremely,highly,remarkably|とても|The new policy was very successful.
size|enough|sufficient,adequate|十分な|There is not enough housing in the capital.
size|about|approximately,roughly,around|約|About 40% of people voted.
up|increase|rise,grow,climb|増える|The number of tourists increased in 2019.
up|go up a lot|soar,surge,rocket|急増する|House prices go up a lot every spring.
up|improve|enhance,boost,upgrade|改善する|Reading every day can improve your vocabulary.
up|get better|recover,pick up,progress|良くなる|The economy began to get better in 2021.
down|decrease|fall,decline,drop|減る|Sales decreased last year.
down|go down a lot|plummet,plunge,slump|急減する|Profits can go down a lot in a crisis.
down|reduce|cut,lower,minimise|減らす|We must reduce plastic waste.
down|get worse|deteriorate,worsen,decline|悪化する|Air quality tends to get worse in winter.
flat|stay the same|remain stable,level off,plateau|横ばいになる|Prices stay the same for several years.
show|show|indicate,demonstrate,illustrate|示す|The graph shows the changes in population.
show|explain|clarify,account for,set out|説明する|The manager will explain the new rules.
show|say|state,claim,assert|述べる|The report says that crime has fallen.
show|tell|inform,notify,advise|知らせる|Please tell us if you cannot attend.
think|think|believe,argue,maintain|考える・主張する|Some people think that money brings happiness.
think|think about|consider,reflect on,contemplate|よく考える|You should think about the risks first.
think|in my opinion|in my view,from my perspective,personally|私の意見では|In my opinion, public transport should be free.
think|agree|concur,accept,share the view|賛成する|Most experts agree that the plan is too expensive.
prob|problem|issue,difficulty,challenge|問題|Traffic is a serious problem in big cities.
prob|deal with|tackle,address,handle|対処する|The government must deal with unemployment.
prob|disadvantage|drawback,downside,shortcoming|欠点|The main disadvantage is the high cost.
good|advantage|benefit,merit,strength|利点|One advantage of city life is convenience.
good|good|beneficial,positive,favourable|良い|Exercise has a good effect on mental health.
good|famous|well-known,renowned,celebrated|有名な|Kyoto is famous for its temples.
bad|bad|harmful,negative,detrimental|悪い|Smoking has a bad effect on health.
bad|dangerous|hazardous,risky,unsafe|危険な|Mining can be dangerous work.
bad|difficult|challenging,demanding,tough|難しい|Learning a new language is difficult for adults.
easy|easy|simple,straightforward,effortless|簡単な|The instructions were easy to follow.
easy|cheap|inexpensive,affordable,low-cost|安い|Buses are a cheap way to travel.
easy|expensive|costly,pricey,high-priced|高価な|Living in London is expensive.
act|help|assist,aid,support|助ける|Volunteers help elderly people with shopping.
act|buy|purchase,acquire|買う|More people buy groceries online.
act|use|utilise,employ,make use of|使う|Farmers use drones to check their crops.
act|need|require,call for|必要とする|This job needs a lot of patience.
act|get|obtain,gain,receive|得る|Students can get information from the library.
act|give|provide,offer,supply|与える|Schools should give pupils free lunches.
act|choose|select,opt for,pick|選ぶ|Many graduates choose careers in finance.
act|keep|maintain,preserve,retain|保つ|It is hard to keep old buildings in good condition.
act|start|begin,commence,launch|始める|Construction will start next spring.
act|end|finish,complete,conclude|終える|The course will end in June.
act|try|attempt,endeavour,strive|試みる|The city will try to cut traffic by half.
act|change|alter,modify,transform|変える|Technology has changed the way we work.
act|make sure|ensure,guarantee|確実にする|Parents should make sure children sleep enough.
act|look at|examine,analyse,investigate|調べる|Researchers will look at the data again.
act|find out|discover,learn,determine|突き止める|Scientists want to find out why bees are dying.
act|allow|permit,enable,authorise|許可する|Some schools allow students to use phones.
act|ban|prohibit,forbid,outlaw|禁止する|Many cities ban cars from the centre.
act|ask for|request,call for,seek|求める|Workers ask for higher wages.
cause|cause|lead to,result in,bring about|引き起こす|Stress can cause sleep problems.
cause|because of|due to,owing to,as a result of|〜のために|Flights were cancelled because of the storm.
cause|result|outcome,consequence,upshot|結果|The result of the vote surprised everyone.
cause|reason|factor,motive,grounds|理由|There are several reasons for this trend.
cause|effect|impact,influence|影響|Social media has an effect on teenagers.
cause|so|therefore,consequently,as a result|だから|Rents are high, so many young people live with their parents.
cause|but|however,nevertheless,yet|しかし|The plan is cheap, but it is not popular.
cause|also|moreover,furthermore,in addition|さらに|Cycling is healthy. It is also good for the environment.
cause|for example|for instance,to illustrate,as an example|例えば|For example, Finland offers free university education.
time|nowadays|these days,currently,at present|最近では|Nowadays, most people own a smartphone.
time|in the past|previously,formerly,in earlier times|昔は|In the past, letters took weeks to arrive.
time|in the future|in the years to come,in the coming decades,one day|将来|In the future, cars may drive themselves.
time|finally|eventually,ultimately,in the end|最終的に|Finally, the two sides reached an agreement.
time|suddenly|abruptly,unexpectedly,all of a sudden|突然|The music suddenly stopped.
time|at the same time|simultaneously,concurrently|同時に|The two events happened at the same time.
ppl|people|individuals,citizens,the public|人々|People should have a say in local decisions.
ppl|old people|the elderly,senior citizens,older people|高齢者|Old people often feel lonely in big cities.
ppl|children|youngsters,the young,kids|子どもたち|Children learn languages quickly.
ppl|rich|wealthy,affluent,well-off|裕福な|Rich nations should help developing countries.
ppl|poor|deprived,disadvantaged,low-income|貧しい|Poor families spend more on food.
ppl|job|occupation,profession,employment|仕事|Finding a job is hard for graduates.
ppl|money|funds,finance,capital|資金|The hospital needs more money.
thing|way|method,approach,means|方法|This is the best way to learn grammar.
thing|place|location,site,venue|場所|The park is a popular place for weddings.
thing|idea|concept,notion,view|考え|The idea of a four-day week is spreading.
thing|chance|opportunity,possibility|機会|Students should have the chance to study abroad.
thing|goal|aim,objective,target|目標|Our goal is to cut emissions by 50%.
thing|amount|quantity,volume,level|量|The amount of waste has doubled.
thing|city|urban area,metropolis|都市|More people now live in a city than in the countryside.
thing|everywhere|worldwide,globally,universally|世界中で|Smartphones are used everywhere.
qual|clear|evident,obvious,apparent|明らかな|It is clear that the climate is changing.
qual|quick|rapid,swift,fast|速い|There was a quick rise in prices.
qual|modern|contemporary,up-to-date,current|現代の|Modern offices are open-plan.
qual|different|distinct,dissimilar,varied|異なる|The two cities have different cultures.
qual|whole|entire,complete,total|全体の|The whole village came to the festival.
qual|usual|typical,common,normal|普通の|Rain is usual in June in Japan.
qual|strange|unusual,odd,peculiar|奇妙な|There was a strange noise in the night.
qual|almost|nearly,virtually,practically|ほとんど|Almost every household has a car.
qual|only|merely,solely,just|〜だけ|It was only a small mistake.
`;

// sentence with ___|correct|wrong,wrong,wrong|解説
window.COLLOC_RAW = `
I need to ___ a decision by Friday.|make|do,get,give|decision は make（イギリス英語では take も可）。do a decision とは言いません。
She ___ a mistake in the report.|made|did,took,had|mistake は make。日本語の「ミスをする」につられて do にしがち。
Please ___ your homework before dinner.|do|make,take,give|homework・housework・research は do。
We should ___ an effort to recycle more.|make|do,take,give|make an effort で「努力する」。
Could you ___ me a favour?|do|make,give,take|do someone a favour で「頼みを聞く」。
Let's ___ a break for ten minutes.|take|make,do,get|take a break（have a break も可）。
He ___ a photo of the sunset.|took|made,did,got|写真は take a photo。
They ___ a lot of progress in English this year.|made|did,took,got|progress は make。
There was ___ rain all night.|heavy|strong,big,thick|雨・雪・交通量は heavy。strong rain は不自然。
I like my coffee ___.|strong|heavy,powerful,thick|コーヒーやお茶の濃さは strong。
There was ___ traffic on the motorway.|heavy|strong,big,crowded|traffic は heavy / light。
My uncle is a ___ smoker.|heavy|big,strong,hard|たくさん吸う人は heavy smoker。
I ___ attention to every detail.|paid|gave,made,took|attention は pay。
Could you ___ a look at my essay?|take|make,do,put|take a look（have a look も可）。
She ___ a speech at the conference.|gave|said,told,spoke|speech は give（make a speech も可）。
He ___ me an interesting story.|told|said,spoke,talked|story・lie・the truth・a joke は tell。
The boy ___ a lie to his teacher.|told|said,spoke,made|tell a lie。say a lie は誤り。
We ___ a great time at the party.|had|spent,made,took|have a good time。
I ___ the bus to work every day.|take|drive,go,make|乗り物を利用するのは take（catch / get も可）。
Prices ___ sharply in 2020.|rose|raised,arose,grew up|自動詞「上がる」は rise。raise は「〜を上げる」(他動詞)。
The government ___ taxes last year.|raised|rose,arose,went up|他動詞「〜を上げる」は raise。rise は目的語を取れません。
This medicine will ___ the risk of heart disease.|reduce|low,fall,decline down|risk は reduce / lower。fall は自動詞。
A ___ majority of people voted yes.|vast|wide,tall,heavy|the vast majority で「大多数」。
The college offers a ___ range of courses.|wide|tall,high,heavy|range は wide。
She has a ___ knowledge of art history.|deep|high,heavy,tall|knowledge は deep / broad / extensive。
Obesity is a ___ issue in many countries.|serious|heavy,hard,thick|issue・problem・threat は serious。heavy problem は不自然。
Please pay ___ attention to the instructions.|close|near,narrow,tight|pay close attention で「細心の注意を払う」。
Most students ___ the exam in June.|take|make,play,join|試験を受けるは take（イギリスでは sit / do も可）。
He ___ the driving test on his first try.|passed|succeeded,won,got|試験に受かるは pass。succeed は succeed in。
Young people ___ a lot of money on clothes.|spend|use,pay,consume|お金・時間を費やすは spend。
She always ___ her best.|does|makes,takes,puts|do one's best。
We need to ___ this problem quickly.|solve|answer,fix up,clear|problem は solve / tackle。
New research ___ light on the causes of the disease.|sheds|gives,makes,puts|shed light on で「〜を解明する」。
I ___ asleep during the film.|fell|got,became,came|fall asleep で「眠りに落ちる」。
The new law comes into ___ next month.|effect|act,work,power|come into effect / take effect で「施行される」。
Technology plays an important ___ in education.|role|work,act,job|play a role（play a part も可）。
Pollution ___ a negative impact on wildlife.|has|gives,makes,does|have an impact on。give impact は不自然。
We can ___ a conclusion from these results.|draw|take,write,put|draw / reach a conclusion。
It is common ___ that smoking is harmful.|knowledge|news,sense,thought|common knowledge で「周知の事実」。
The city has a ___ crime rate.|high|big,large,tall|rate・level・price・salary は high / low。
India has a very ___ population.|large|high,many,tall|population は large / small。
Doctors earn a ___ salary in the UK.|high|expensive,tall,costly|salary は high。expensive は「物の値段」。
The ___ of living in Tokyo is high.|cost|price,value,fee|cost of living で「生活費」。
The economy is ___ rapidly.|growing|raising,rising up,arising|経済は grow。
We ___ a meeting every Monday.|hold|make,do,open|meeting は hold（have も可）。
The factory ___ 500 people.|employs|uses,works,jobs|人を雇っているのは employ。
Children should ___ responsibility for their actions.|take|make,do,get|take responsibility for で「責任を取る」。
It ___ sense to save some money each month.|makes|does,has,gives|make sense で「理にかなう」。
He was arrested for ___ the law.|breaking|cutting,destroying,crashing|break the law（法を破る）。
She always ___ her promises.|keeps|protects,holds,saves|keep a promise（約束を守る）。破るは break。
There is a ___ chance of snow tonight.|slight|light,thin,few|a slight chance で「わずかな可能性」。
Commuting ___ a lot of time.|takes|makes,does,spends|時間がかかるは take（人 + spend time）。
I ___ my teeth twice a day.|brush|wash,polish,rub|brush one's teeth。
My sister ___ the piano.|plays|does,makes,hits|楽器は play (the) piano。
She ___ yoga every morning.|does|plays,makes,takes|yoga・judo・karate など -ing 以外の個人競技は do。
They ___ tennis on Saturdays.|play|do,make,go|ボールを使う競技は play。
We ___ swimming in the summer.|go|do,play,make|-ing のスポーツは go（go swimming / skiing）。
Climate change poses a serious ___ to coastal cities.|threat|damage,attack,warning|pose a threat で「脅威となる」。
There has been a ___ increase in unemployment.|sharp|keen,pointed,narrow|急激な増加は sharp / steep / dramatic increase。
Unemployment ___ a peak in 2009.|reached|arrived,got,came|reach a peak（ピークに達する）。arrive は at が必要。
The number of visitors ___ at two million in 2020.|stood|located,placed,sat|グラフ描写：stand at + 数値で「〜だった」。
Sales remained ___ between 2010 and 2015.|stable|still,quiet,calm|remain stable / steady で「横ばい」。
The government should ___ more money in public transport.|invest|put on,spend in,pay|invest in で「投資する」。spend は on。
Many students ___ part-time jobs.|have|make,play,open|have a job（do a job は「仕事をこなす」で別の意味）。
Scientists ___ an experiment to test the theory.|conducted|made,played,took|conduct / carry out an experiment。
The company ___ a profit for the first time.|made|did,took,got|make a profit。
I ___ a cold last week.|caught|took,got in,had in|catch a cold（have a cold は「風邪をひいている」状態）。
This book ___ a big influence on my life.|had|gave,made,did|have an influence on。
We must ___ action now to protect the oceans.|take|make,do,give|take action（行動を起こす）。
He ___ an interest in science at an early age.|developed|grew,made,built|develop / take an interest in。
`;

// UK|US|日本語|ルール
window.SPELL_UKUS_RAW = `
colour|color|色|-our / -or
favourite|favorite|お気に入りの|-our / -or
behaviour|behavior|行動|-our / -or
neighbour|neighbor|隣人|-our / -or
labour|labor|労働|-our / -or
humour|humor|ユーモア|-our / -or
centre|center|中心|-re / -er
theatre|theater|劇場|-re / -er
metre|meter|メートル|-re / -er
litre|liter|リットル|-re / -er
fibre|fiber|繊維|-re / -er
organise|organize|組織する|-ise / -ize（イギリスでも -ize は可）
realise|realize|気づく|-ise / -ize（イギリスでも -ize は可）
recognise|recognize|認める|-ise / -ize（イギリスでも -ize は可）
apologise|apologize|謝る|-ise / -ize（イギリスでも -ize は可）
analyse|analyze|分析する|-yse / -yze
travelled|traveled|旅行した|l を重ねる / 重ねない
cancelled|canceled|中止した|l を重ねる / 重ねない
modelling|modeling|モデル作り|l を重ねる / 重ねない
counsellor|counselor|カウンセラー|l を重ねる / 重ねない
programme|program|番組・計画|-mme / -m（コンピュータは英でも program）
catalogue|catalog|カタログ|-ogue / -og
defence|defense|防衛|-ce / -se
offence|offense|違反|-ce / -se
licence|license|免許（名詞）|-ce / -se（英では動詞は license）
practise|practice|練習する（動詞）|-se / -ce（英では名詞は practice）
tyre|tire|タイヤ|個別
cheque|check|小切手|個別
grey|gray|灰色|個別
jewellery|jewelry|宝石類|個別
aluminium|aluminum|アルミニウム|個別
pyjamas|pajamas|パジャマ|個別
mould|mold|カビ|-ou- / -o-
enrol|enroll|入学する|l 1つ / 2つ
fulfil|fulfill|果たす|l 1つ / 2つ
skilful|skillful|熟練した|l 1つ / 2つ
ageing|aging|高齢化|e を残す / 落とす
judgement|judgment|判断|e を残す / 落とす
aeroplane|airplane|飛行機|個別
storey|story|（建物の）階|個別
`;

// correct|wrong,wrong|日本語
window.SPELL_HARD_RAW = `
accommodation|accomodation,acommodation|宿泊施設
necessary|neccessary,necesary|必要な
government|goverment,govenment|政府
environment|enviroment,envirnoment|環境
separate|seperate,separete|別々の
definitely|definately,definitly|確実に
recommend|reccommend,recomend|勧める
beginning|begining,beggining|始まり
occurred|occured,ocurred|起こった
receive|recieve,receeve|受け取る
believe|beleive,belive|信じる
business|buisness,bussiness|ビジネス
tomorrow|tommorow,tomorow|明日
until|untill,untile|〜まで
Wednesday|Wensday,Wednsday|水曜日
February|Febuary,Febrary|2月
library|libary,liberry|図書館
restaurant|restaraunt,resturant|レストラン
embarrass|embarass,embarras|恥ずかしい思いをさせる
address|adress,addres|住所
different|diffrent,differant|異なる
foreign|foriegn,forein|外国の
knowledge|knowlege,knowledje|知識
opportunity|oppurtunity,opportunaty|機会
responsibility|responsability,responsibilty|責任
experience|experiance,expirience|経験
independent|independant,indipendent|独立した
immediately|immediatly,imediately|すぐに
succeed|succede,suceed|成功する
argument|arguement,argumant|議論
truly|truely,truley|本当に
achieve|acheive,achive|達成する
especially|especialy,expecially|特に
advertisement|advertisment,advertisemant|広告
committee|commitee,comittee|委員会
convenient|convinient,convenent|便利な
disappear|dissapear,disapear|消える
professional|proffesional,profesional|専門家の
questionnaire|questionaire,questionnair|アンケート
temperature|temprature,temperture|温度
vegetable|vegtable,vegetible|野菜
pronunciation|pronounciation,pronunciasion|発音
`;
