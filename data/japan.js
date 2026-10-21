// Japanese learners' typical weak points.
// PAIRS: sound|word1|word2|日本語1|日本語2
window.PAIRS_RAW = `
L/R|light|right|光|右・正しい
L/R|lice|rice|シラミ|米
L/R|collect|correct|集める|正しい
L/R|play|pray|遊ぶ|祈る
L/R|glass|grass|ガラス|草
L/R|fly|fry|飛ぶ|揚げる
L/R|long|wrong|長い|間違った
L/R|lead|read|導く|読む
L/R|lock|rock|鍵をかける|岩
L/R|loyal|royal|忠実な|王室の
L/R|climb|crime|登る|犯罪
L/R|cloud|crowd|雲|群衆
B/V|berry|very|ベリー|とても
B/V|best|vest|最高の|ベスト（服）
B/V|boat|vote|ボート|投票する
B/V|ban|van|禁止|バン
B/V|base|vase|基地|花瓶
S/TH|sink|think|流し|考える
S/TH|sank|thank|沈んだ|感謝する
S/TH|mouse|mouth|ネズミ|口
S/TH|sing|thing|歌う|もの
S/TH|pass|path|通る|小道
S/TH|sick|thick|病気の|厚い
Z/TH|close|clothe|閉める|服を着せる
F/H|fold|hold|折る|持つ
F/H|fair|hair|公平な|髪
F/H|fill|hill|満たす|丘
F/H|food|hood|食べ物|フード
SI/SHI|see|she|見る|彼女
SI/SHI|sip|ship|すする|船
SI/SHI|seat|sheet|座席|シート
EAR/YEAR|ear|year|耳|年
I/EE|ship|sheep|船|羊
I/EE|live|leave|住む|去る
I/EE|fill|feel|満たす|感じる
A/U|hat|hut|帽子|小屋
A/U|cap|cup|帽子|カップ
A/U|bag|bug|かばん|虫
WAL/WOR|walk|work|歩く|働く
OO/U|fool|full|ばか|いっぱいの
OW/AW|coat|caught|コート|捕まえた
OW/AW|low|law|低い|法律
`;
// WASEI: カタカナ|直訳しがちな誤り|正しい英語|説明
window.WASEI_RAW = `
マンション|mansion|apartment / condo (US) / flat (UK)|mansion は「大邸宅」。
クレーム|claim|complaint|claim は「主張する・請求する」。苦情は complaint / make a complaint。
サラリーマン|salaryman|office worker|salaryman は日本独特の言葉として説明が必要。
ノートパソコン|note PC|laptop|
コンセント|consent|outlet (US) / socket (UK)|consent は「同意」。
ホッチキス|hotchkiss|stapler|
シャープペンシル|sharp pencil|mechanical pencil|
アンケート|enquete|survey / questionnaire|フランス語由来。英語では通じない。
バイト|bite|part-time job|bite は「かむ」。
パン|pan|bread|pan は「フライパン・鍋」。
ハンドル（車）|handle|steering wheel|handle は「取っ手」。
フロントガラス|front glass|windscreen (UK) / windshield (US)|
ペットボトル|pet bottle|plastic bottle|
ワンピース|one piece|dress|
トレーナー|trainer|sweatshirt|イギリスで trainers はスニーカー。
パーカー|parker|hoodie|
ジェットコースター|jet coaster|roller coaster|
ゴールデンタイム|golden time|prime time|
モーニングコール|morning call|wake-up call|
フリーダイヤル|free dial|toll-free number (US) / freephone (UK)|
ガードマン|guard man|security guard|
キーホルダー|key holder|key ring (UK) / keychain (US)|
オーダーメイド|order made|custom-made / made-to-order|
チャック|chuck|zip (UK) / zipper (US)|
レンジ|range|microwave|range はアメリカでは「コンロ」。
ダンボール|danboru|cardboard box|
リフォーム|reform|renovate / remodel|reform は「（制度を）改革する」。
ホームページ|home page|website|home page はサイトのトップページだけを指す。
サイン（有名人の）|sign|autograph|書類のサインは signature、動詞は sign。
ノルマ|norma|quota / target|ロシア語由来。
ペーパードライバー|paper driver|someone who has a licence but rarely drives|
カンニング|cunning|cheating|cunning は「ずる賢い」。
ゲームセンター|game center|arcade|
シュークリーム|shoe cream|cream puff|shoe cream は「靴クリーム」。
アメリカンドッグ|American dog|corn dog|
ポイントカード|point card|loyalty card / rewards card|
リストラ|restructure|be laid off / layoffs|「リストラされた」は I was laid off.
アフターサービス|after service|after-sales service / customer support|
テンションが高い|high tension|excited / hyped|high tension は「高電圧・緊張状態」。
マイペース|my pace|do things at your own pace|
ナイーブ|naive|sensitive|naive は「世間知らず・単純な」で、ほめ言葉ではない。
スマート（体型）|smart|slim / slender|smart は「賢い」「身なりがきちんとした」。
ドンマイ|don't mind|Don't worry about it. / Never mind.|Don't mind. は自然な励ましにならない。
コストダウン|cost down|cost reduction / cut costs|
イメージアップ|image up|improve one's image|
スキンシップ|skinship|physical affection|
ビジネスホテル|business hotel|budget hotel|
ガソリンスタンド|gasoline stand|gas station (US) / petrol station (UK)|
ベビーカー|baby car|stroller (US) / pushchair (UK)|
フライドポテト|fried potato|fries (US) / chips (UK)|
オーバー（な反応）|over|exaggerated / over the top|
`;
// ERRORS: wrong|correct (alternatives separated by " / ")|explanation
window.ERRORS_RAW = `
I very like it.|I like it very much. / I really like it.|very は動詞を直接修飾しない。very much を文末に。
I'm boring.|I'm bored.|boring は「（人を）退屈させる」。退屈している自分は bored。
I'm interesting in history.|I'm interested in history.|-ed は「（人が）〜している」、-ing は「（物が）〜させる」。
I have been to Tokyo yesterday.|I went to Tokyo yesterday.|yesterday など過去の時点を示す語と現在完了は一緒に使えない。
I live in Tokyo since 2020.|I have lived in Tokyo since 2020.|since で「〜から今まで」は現在完了。
She is good in English.|She is good at English.|be good at 〜。
I look forward to see you.|I look forward to seeing you.|look forward to の to は前置詞。後ろは動名詞。
Please teach me your phone number.|Please tell me your phone number.|teach は勉強・技術を教えるとき。情報は tell。
I went to shopping.|I went shopping.|go shopping / go swimming は to を付けない。
He said me that he was tired.|He told me that he was tired.|say は人を直接目的語にとれない。tell 人 that …。
It is depend on the weather.|It depends on the weather.|depend は一般動詞。is は不要。
I am agree with you.|I agree with you.|agree は動詞。am は不要。
Let's discuss about the plan.|Let's discuss the plan.|discuss は他動詞で about は不要。
I want to study English hardly.|I want to study English hard.|hardly は「ほとんど〜ない」。「一生懸命」は hard。
I want to go to abroad.|I want to go abroad.|abroad は副詞。to は不要。
Everyone have a smartphone.|Everyone has a smartphone.|everyone は単数扱い。
I married with her in 2019.|I married her in 2019. / I got married to her in 2019.|marry は他動詞。with は不要。
I have a lot of homeworks.|I have a lot of homework.|homework は不可算名詞。
I enjoyed to talk with her.|I enjoyed talking with her.|enjoy の後は動名詞。
This is the most biggest city.|This is the biggest city.|最上級を二重にしない。
Although it rained, but we went out.|Although it rained, we went out. / It rained, but we went out.|although と but は一緒に使わない。
If I will have time, I'll call you.|If I have time, I'll call you.|条件の if 節では未来のことも現在形。
He has two childs.|He has two children.|child の複数形は children。
How do you think about this idea?|What do you think about this idea?|「どう思う？」は What do you think。
I don't know what should I do.|I don't know what I should do.|文の中に入った疑問文は「主語＋動詞」の語順。
Can you tell me where is the station?|Can you tell me where the station is?|間接疑問文は「主語＋動詞」の語順。
She made me to clean the room.|She made me clean the room.|make 人 + 動詞の原形（to は付けない）。
Let me to explain.|Let me explain.|let 人 + 動詞の原形。
It was happened last week.|It happened last week.|happen は自動詞で受け身にならない。
The number of tourists are increasing.|The number of tourists is increasing.|the number of 〜 は単数扱い。
He is a person who I respect him.|He is a person who I respect. / He is a person I respect.|関係代名詞の後で目的語を繰り返さない。
Nowadays, many people uses smartphones.|Nowadays, many people use smartphones.|people は複数扱い。
I didn't went to school.|I didn't go to school.|did の後は動詞の原形。
I'm used to get up early.|I'm used to getting up early.|be used to の to は前置詞。後ろは動名詞。
Most of Japanese like rice.|Most Japanese people like rice.|most of の後には the / my などが必要。
Please call me when you will arrive.|Please call me when you arrive.|時を表す when 節も未来のことを現在形で表す。
I recommend you to visit Kyoto.|I recommend visiting Kyoto. / I recommend that you visit Kyoto.|recommend 人 to は不自然。
I'm sorry for late.|I'm sorry for being late. / Sorry I'm late.|for の後は名詞か動名詞。
Today's weather is very hot.|It's very hot today.|天気・気温は it を主語にするのが自然。
The price of this bag is cheap.|The price of this bag is low. / This bag is cheap.|price は high / low。cheap は物を主語に。
I could pass the exam last year.|I was able to pass the exam last year. / I managed to pass the exam last year.|過去に一度できたことには could ではなく was able to。
My hobby is to watch movies.|My hobby is watching movies. / I like watching movies.|hobby の説明は動名詞が自然。
There are many peoples in the park.|There are many people in the park.|people は s を付けない。
I'm looking forward the trip.|I'm looking forward to the trip.|look forward to 〜。
She explained me the rules.|She explained the rules to me.|explain 人 は不可。explain 物 to 人。
I have many informations about it.|I have a lot of information about it.|information は不可算名詞。many は使えない。
I feel very tired, so that I went to bed early.|I felt very tired, so I went to bed early.|so that は「〜するために」。結果は so。時制もそろえる。
He suggested me to take a break.|He suggested that I take a break. / He suggested taking a break.|suggest 人 to は誤り。
I don't have any brothers and sisters.|I don't have any brothers or sisters.|否定文では and ではなく or。
`;
