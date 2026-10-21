/* シチュエーション会話の国別バージョン（仕事・人づきあい・トラブル 追加分） */
window.SITU_VARIANTS = Object.assign(window.SITU_VARIANTS || {}, {
meeting: {
 US: {place:'Team meeting', lines:[['A','So the plan is to launch in March. Thoughts?','3月に公開する計画だけど、意見は？'],['Y','Can I jump in here? I love the timeline, but I\'m a little concerned about QA.','ちょっといいですか。スケジュールはいいと思いますが、品質テストが少し心配です。'],['A','Say more.','詳しく。'],['Y','We\'ve only tested on a handful of devices. What if we did a beta first?','数台でしかテストしていません。まずベータ版を出すのはどうでしょう。'],['A','Good call. Can you put together a proposal?','いい判断だね。提案をまとめてくれる？'],['Y','Sure, I\'ll have it to you by Thursday EOD.','はい、木曜の終業までにお送りします。']],
  notes:['Can I jump in here?（割り込んでいい？）、Say more.（詳しく）、Good call.（いい判断）はアメリカの会議の定番。','EOD＝end of day（今日の終業時）。']},
 AU: {place:'Team meeting', lines:[['A','So we\'re thinking of launching in March. What do you reckon?','3月公開を考えてるんだけど、どう思う？'],['Y','I reckon March is doable, but I\'m a bit worried about testing.','3月は可能だと思うけど、テストが少し心配です。'],['A','Fair enough. What would you do?','もっともだね。君ならどうする？'],['Y','Maybe a soft launch in New Zealand first, then roll it out here.','まずニュージーランドで先行公開して、それからこっちで展開するのはどうでしょう。'],['A','Good idea. Can you have a crack at a plan?','いい案だね。計画を作ってみてくれる？'],['Y','Yep, I\'ll send it round by Thursday.','はい、木曜までに皆さんに送ります。']],
  notes:['What do you reckon?（どう思う？）、Fair enough.（もっともだ）、have a crack at（やってみる）はオーストラリアの職場でよく使います。']},
},
clarify: {
 US: {place:'Manager\'s office', lines:[['Y','Hey, do you have a minute?','ちょっとお時間ありますか。'],['A','Sure, what\'s up?','いいよ、どうした？'],['Y','I just want to make sure I\'m on the same page. Is the report due this Friday?','認識を合わせたくて。報告書は今週の金曜締め切りですか。'],['A','Yep, end of day Friday.','うん、金曜の終業まで。'],['Y','Got it. Should I push the client deck to next week?','了解です。クライアント向け資料は来週に回していいですか。'],['A','Yes, the report\'s the priority.','うん、報告書が優先だ。']],
  notes:['on the same page（認識が一致している）、push（後ろにずらす）、deck（プレゼン資料）はアメリカのビジネス英語の定番。']},
 AU: {place:'Manager\'s desk', lines:[['Y','Hey, got a sec?','ちょっといいですか。'],['A','Yeah, what\'s up?','うん、どうした？'],['Y','Just double-checking, is the sales report due this Friday or next?','念のため確認ですが、売上報告は今週の金曜ですか、来週ですか。'],['A','This Friday, sorry. Bit of a tight turnaround.','今週の金曜なんだ、ごめん。ちょっと急ぎだね。'],['Y','No worries. Can the presentation wait till next week?','大丈夫です。プレゼンは来週でもいいですか。'],['A','Yep, too easy.','うん、いいよ。']],
  notes:['tight turnaround（急ぎの対応）、too easy（問題ない）。オーストラリアの職場は上司ともカジュアルに話します。']},
},
sick: {
 US: {place:'Message to your manager', lines:[['Y','Hi Sarah, I woke up with a fever, so I need to take a sick day today.','サラさん、朝起きたら熱があったので今日は病欠させてください。'],['A','Oh no, feel better! Do you need anything covered?','大変、お大事に！何か代わりが必要なことはある？'],['Y','I have a call with the design team at two. Could Tom take it?','2時にデザインチームとの通話があります。トムに頼めますか。'],['A','I\'ll ask him. Just focus on resting.','頼んでおく。休むことに集中して。'],['Y','Thanks. I\'ll keep you posted.','ありがとう。状況を連絡します。']],
  notes:['病欠は sick day。I\'ll keep you posted.（状況を知らせます）は便利な表現。','アメリカの有給の病欠日数は会社や州によって違います。']},
 AU: {place:'Message to your manager', lines:[['Y','Hi Sarah, I\'m crook today, so I won\'t be in.','サラさん、今日は体調が悪いので休みます。'],['A','Oh no, take care of yourself. Do you need to take personal leave?','大変、お大事に。病気休暇を取る？'],['Y','Yes, please. I might need tomorrow off too.','はい、お願いします。明日も休むかもしれません。'],['A','No worries. If it\'s more than a day, just grab a medical certificate.','了解。1日以上なら診断書をもらっておいてね。'],['Y','Will do. Thanks for understanding.','そうします。ありがとうございます。']],
  notes:['crook（具合が悪い）はオーストラリアの口語。病欠は personal / sick leave。','2日以上休むと medical certificate（診断書）を求められることが多いです。']},
},
clientcall: {
 US: {place:'Phone call with a client', lines:[['Y','Hi, this is Ken from Nova Systems. Is this a good time?','ノヴァ・システムズのケンです。今お時間大丈夫ですか。'],['A','Sure, Ken. What can I do for you?','ええ、ケン。どうしました？'],['Y','I wanted to follow up on the proposal we sent over last week.','先週お送りした提案書の件でフォローアップしたくて。'],['A','Thanks for checking in. We like it, but we have some questions about pricing.','連絡ありがとう。気に入っていますが、価格について質問があります。'],['Y','Happy to walk you through it. Would Thursday at two work for a call?','ご説明しますよ。木曜2時の通話はいかがですか。'],['A','Thursday works. Send me an invite.','木曜で大丈夫。招待を送って。']],
  notes:['follow up（フォローする）、check in（様子をうかがう）、walk you through（順を追って説明する）はアメリカのビジネス電話の定番。']},
 AU: {place:'Phone call with a client', lines:[['Y','Hi Michelle, it\'s Ken from Nova. How are you going?','ミシェルさん、ノヴァのケンです。お元気ですか。'],['A','Good thanks, Ken. What can I do for you?','元気よ、ケン。どうしたの？'],['Y','Just touching base about the proposal. Have you had a chance to look at it?','提案書の件でご連絡しました。ご覧いただけましたか。'],['A','I have. Looks good, but we\'ll need to chat about the budget.','見たわ。いいけど、予算について話す必要があるわね。'],['Y','No worries. Are you free Friday morning?','承知しました。金曜の午前は空いていますか。'],['A','Friday at ten works. Chat then.','金曜10時なら大丈夫。じゃあその時に。']],
  notes:['touch base（連絡をとる）はオーストラリアでも定番。取引先ともファーストネームで話すのが普通です。']},
},
review: {
 US: {place:'Performance review', lines:[['A','So, how do you think this year went?','今年はどうだったと思う？'],['Y','Really well. I led the migration project and we shipped two weeks early.','とても良かったです。移行プロジェクトを主導して2週間早くリリースしました。'],['A','That was a big win. What do you want to focus on next year?','大きな成果だったね。来年は何に注力したい？'],['Y','I\'d love to move into a team lead role.','チームリーダーの役割に移りたいです。'],['Y','Also, based on my results, I\'d like to talk about a raise.','それと、成果を踏まえて昇給について話したいです。'],['A','That\'s fair. Let me talk to HR and circle back next week.','もっともだ。人事と話して来週また連絡するよ。']],
  notes:['昇給はアメリカで raise（イギリスは pay rise）。ship（リリースする）、big win（大きな成果）はアメリカの職場の言い方。']},
 AU: {place:'Performance review', lines:[['A','Thanks for coming in. How do you reckon the year\'s gone?','来てくれてありがとう。今年はどうだったと思う？'],['Y','Pretty good. The migration project finished ahead of schedule.','かなり良かったです。移行プロジェクトが予定より早く終わりました。'],['A','Yeah, great work on that. Where do you want to go from here?','うん、あれは素晴らしかった。これからどうしたい？'],['Y','I\'d like to step up into a team lead role.','チームリーダーに挑戦したいです。'],['Y','I was also hoping we could discuss a pay rise.','昇給についても相談できればと思っていました。'],['A','Fair enough. I\'ll chat with HR and get back to you.','もっともだ。人事と話して返事するよ。']],
  notes:['昇給はオーストラリア・イギリスで pay rise。step up（一段上の役割を担う）。']},
},
presentation: {
 US: {place:'Q&A after a presentation', lines:[['A','Great presentation. Can you break down the costs a bit more?','いい発表でした。費用をもう少し詳しく教えてもらえますか。'],['Y','Absolutely. The upfront cost is about sixty thousand dollars, and we expect to break even in two years.','もちろんです。初期費用は約6万ドルで、2年で採算が取れる見込みです。'],['A','How solid is that estimate?','その見積もりはどのくらい確かですか。'],['Y','Great question. It\'s based on last year\'s numbers, so there\'s some wiggle room.','いい質問ですね。昨年の数字が基準なので、多少の幅があります。'],['A','What if the vendor raises prices?','業者が値上げしたら？'],['Y','I don\'t have that data on hand, but I\'ll follow up with you by email.','手元にデータがないので、メールで追ってご連絡します。']],
  notes:['break down（内訳を説明する）、break even（採算が取れる）、wiggle room（余地・幅）はアメリカのプレゼンでよく使います。']},
 AU: {place:'Q&A after a presentation', lines:[['A','Thanks for that. Could you talk us through the costs?','ありがとう。費用について説明してもらえますか。'],['Y','Sure. It\'s around eighty thousand up front, and it should pay for itself in two years.','はい。初期費用が約8万ドルで、2年で回収できる見込みです。'],['A','What happens if the dollar drops?','ドルが下がったらどうなりますか。'],['Y','Good question. Some of our costs are in US dollars, so there is a risk. I\'ll look into hedging options and get back to you.','いい質問です。費用の一部が米ドルなのでリスクはあります。ヘッジの方法を調べてご連絡します。'],['A','Great, thanks.','わかりました、ありがとう。']],
  notes:['オーストラリアは輸入が多く、為替（the Aussie dollar）の質問がよく出ます。']},
},
dinnerhome: {
 US: {place:'Dinner at a friend\'s house', lines:[['A','Hey, come on in! Can I take your jacket?','どうぞ入って！上着を預かるよ。'],['Y','Thanks for having me! I brought a bottle of wine and some Japanese snacks.','招いてくれてありがとう！ワインと日本のお菓子を持ってきたよ。'],['A','Aw, you didn\'t have to do that! Make yourself at home.','わあ、気を使わなくてよかったのに！くつろいでね。'],['Y','This lasagna is amazing. Did you make it from scratch?','このラザニアすごくおいしい。一から作ったの？'],['A','Yeah, it\'s my grandma\'s recipe. Help yourself to seconds!','うん、祖母のレシピなんだ。おかわりどうぞ！'],['Y','I should probably head out. Thanks so much for tonight!','そろそろ帰らなきゃ。今夜は本当にありがとう！']],
  notes:['Help yourself to seconds.（おかわりどうぞ）、head out（帰る・出る）はアメリカの日常会話の定番。']},
 AU: {place:'Barbecue at a friend\'s place', lines:[['A','Hey, come in! Grab a drink from the esky.','いらっしゃい！クーラーボックスから飲み物取って。'],['Y','Thanks! I brought a salad, as you asked.','ありがとう！言われたとおりサラダを持ってきたよ。'],['A','Legend! Make yourself at home.','最高！くつろいでね。'],['Y','These snags are really good.','このソーセージすごくおいしい。'],['A','Have another one, there\'s heaps.','もう1本どうぞ、たくさんあるから。'],['Y','I\'d better head off. Thanks for having me, it was a great arvo.','そろそろ帰るね。招いてくれてありがとう、最高の午後だった。']],
  notes:['オーストラリアのホームパーティーは「各自1品持ち寄り（bring a plate）」が多いです。','esky（クーラーボックス）、snag（ソーセージ）、Legend!（最高！）はオーストラリアらしい言葉。']},
},
langex: {
 US: {place:'Language exchange at a coffee shop', lines:[['A','Hey, are you Yuki? I\'m Jake!','ユキ？ジェイクだよ！'],['Y','Hi Jake! It\'s great to finally meet you.','ジェイク！やっと会えて嬉しい。'],['A','So how long have you been learning English?','英語はどのくらい勉強してるの？'],['Y','Like ten years, but mostly from textbooks. I want to sound more natural.','10年くらいかな、でもほとんど教科書。もっと自然に話したいんだ。'],['A','Honestly, you sound great. Want to do thirty minutes each?','正直、もう上手だよ。30分ずつにする？'],['Y','Sounds good. And feel free to correct me!','いいね。遠慮なく直してね！']],
  notes:['Like ten years（10年くらい）の like はアメリカの話し言葉でよく使う「〜くらい」。']},
 AU: {place:'Language exchange at a café', lines:[['A','Hey, you must be Yuki. I\'m Jake.','やあ、ユキだね。ジェイクです。'],['Y','Hi Jake, nice to meet you!','ジェイク、はじめまして！'],['A','So, what brought you to Australia?','どうしてオーストラリアに？'],['Y','I\'m doing a working holiday. I want to improve my English and travel.','ワーホリ中なの。英語を上達させて旅行もしたくて。'],['A','Nice one. If you hear any Aussie slang you don\'t get, just ask.','いいね。わからないオーストラリアのスラングがあったら聞いて。'],['Y','Thanks! What does "arvo" mean?','ありがとう！「arvo」ってどういう意味？'],['A','Ha, it means afternoon. You\'ll hear it everywhere.','はは、afternoon のことだよ。どこでも聞くよ。']],
  notes:['Nice one.（いいね）。オーストラリアのスラングは聞き返すと喜んで教えてくれる人が多いです。']},
},
club: {
 US: {place:'Rec center', lines:[['Y','Hi, I\'m interested in the adult soccer league.','大人のサッカーリーグに興味があります。'],['A','Awesome! Do you have a team, or are you signing up as a free agent?','いいね！チームはある？それとも個人で登録？'],['Y','Just me. I don\'t know anyone yet.','私だけです。まだ知り合いがいなくて。'],['A','No problem, we\'ll place you on a team. The season starts in two weeks.','大丈夫、チームに振り分けるよ。シーズンは2週間後に始まる。'],['Y','How much is it?','いくらですか。'],['A','Eighty dollars for the season, including a jersey.','シーズン80ドルで、ユニフォーム込み。']],
  notes:['サッカーはアメリカで soccer（football はアメフト）。地域の rec center（レクリエーションセンター）でリーグに参加できます。']},
 AU: {place:'Local footy club', lines:[['Y','Hi, I\'d like to have a go at touch footy. Do you take beginners?','タッチラグビーをやってみたいです。初心者も大丈夫ですか。'],['A','Absolutely. Just turn up on Tuesday night. It\'s pretty social.','もちろん。火曜の夜に来るだけでいいよ。かなりゆるい感じだから。'],['Y','Do I need any gear?','道具は必要ですか。'],['A','Just runners and a water bottle. We\'ll sort you out with a shirt.','運動靴と水筒だけ。シャツはこっちで用意するよ。'],['Y','Great, see you Tuesday!','いいですね、火曜に！'],['A','Too easy. We usually grab a drink after.','了解。終わったらたいてい一杯やるよ。']],
  notes:['footy はオーストラリアでフットボール全般（地域によってラグビーやオージールール）。runners＝スニーカー。','have a go（やってみる）はオーストラリアで前向きな挑戦を表す定番表現。']},
},
apologise: {
 US: {place:'Meeting a friend', lines:[['Y','I\'m so sorry I\'m late! Have you been waiting long?','遅れてごめん！だいぶ待った？'],['A','Like fifteen minutes. Everything OK?','15分くらいかな。大丈夫？'],['Y','The subway was delayed and my phone died.','地下鉄が遅れて、スマホの電池も切れちゃって。'],['A','Ugh, that\'s the worst. Don\'t worry about it.','うわ、最悪だね。気にしないで。'],['Y','Let me buy you a drink to make up for it.','お詫びに一杯おごらせて。'],['A','Deal!','決まり！']],
  notes:['That\'s the worst.（最悪だね）、Deal!（決まり！）はアメリカの口語。']},
 AU: {place:'Meeting a friend', lines:[['Y','Sorry I\'m late! The tram was running behind.','遅れてごめん！トラムが遅れてて。'],['A','All good, I just got here myself.','大丈夫、私も今来たところ。'],['Y','Really? Phew. I tried to text but I had no signal.','本当？よかった。メッセージしようとしたけど圏外で。'],['A','No dramas. Shall we grab a coffee before the movie?','問題ないよ。映画の前にコーヒーでも買う？'],['Y','Yeah, my shout.','うん、私のおごりで。']],
  notes:['my shout（私のおごり）はオーストラリア・イギリスの定番。メルボルンは路面電車（tram）が多いです。']},
},
compliment: {
 US: {place:'Casual chat', lines:[['Y','I love your sneakers! Where\'d you get them?','そのスニーカーいいね！どこで買ったの？'],['A','Thanks! I got them at a thrift store for like twenty bucks.','ありがとう！古着屋で20ドルくらいだった。'],['Y','No way, that\'s such a steal.','うそ、すごく安いね。'],['A','By the way, your English is really good.','そういえば、英語すごく上手だね。'],['Y','Aw, thank you! That means a lot.','わあ、ありがとう！そう言ってもらえて嬉しい。']],
  notes:['thrift store（古着屋・リサイクルショップ）、a steal（すごくお得）はアメリカの口語。']},
 AU: {place:'Casual chat', lines:[['Y','I love your top! It really suits you.','そのトップスいいね！すごく似合ってる。'],['A','Thanks! I got it at an op shop for ten bucks.','ありがとう！リサイクルショップで10ドルだったの。'],['Y','What a bargain!','お買い得だね！'],['A','Your English has come a long way, you know.','英語、すごく上達したよね。'],['Y','Thanks, that\'s really nice of you to say.','ありがとう、そう言ってもらえて嬉しい。']],
  notes:['リサイクルショップはオーストラリアで op shop（opportunity shop）。']},
},
lockedout: {
 US: {place:'Calling a locksmith', lines:[['Y','Hi, I locked myself out of my apartment. Can you send someone?','部屋に閉め出されました。誰か来てもらえますか。'],['A','Sure. What\'s the address?','いいですよ。住所は？'],['Y','520 Pine Street, unit 7.','パイン・ストリート520番地、7号室です。'],['A','We can be there in about thirty minutes. The service call is ninety-five dollars.','30分ほどで行けます。出張費は95ドルです。'],['Y','Should I call my building manager first?','先に管理人に連絡すべきですか。'],['A','If they have a spare, it\'s probably cheaper. Let us know.','合鍵があれば安く済むでしょう。教えてください。']],
  notes:['アメリカのアパートは管理人（building manager / super）が合鍵を持っていることが多いです。']},
 AU: {place:'Calling a locksmith', lines:[['Y','Hi, I\'ve locked myself out. Is anyone available now?','閉め出されてしまいました。今来られる人はいますか。'],['A','Yep, where are you?','はい、どちらですか。'],['Y','Unit 2, 14 Ocean Street, Bondi.','ボンダイのオーシャン・ストリート14番地、2号ユニットです。'],['A','We can get someone there in forty minutes. It\'s a hundred and twenty for a call-out.','40分で行けます。出張費は120ドルです。'],['Y','OK, I\'ll wait out the front.','わかりました、家の前で待っています。']],
  notes:['wait out the front（家の前で待つ）はオーストラリアの言い方。夜間・週末は料金が高くなることが多いです。']},
},
accident: {
 US: {place:'Minor car accident', lines:[['Y','Are you OK? Is anyone hurt?','大丈夫ですか。けが人は？'],['A','I think we\'re fine. Just shaken up.','たぶん大丈夫。動揺しているだけ。'],['Y','Let\'s pull over into that parking lot.','あの駐車場に車を寄せましょう。'],['A','Good idea. Can we swap insurance info?','そうしましょう。保険の情報を交換しましょう。'],['Y','Sure. Here\'s my name, number and insurance card. I\'ll take some photos.','はい。名前、番号、保険証です。写真も撮っておきます。'],['A','Should we call the police?','警察を呼ぶ？'],['Y','Let\'s file a police report just to be safe.','念のため警察に届けましょう。']],
  notes:['駐車場はアメリカで parking lot。州によっては一定額以上の損害があると届け出が必要です。','責任を認める言い方は避け、事実だけを伝えましょう。']},
 AU: {place:'Minor car accident', lines:[['Y','Are you alright? Anyone hurt?','大丈夫ですか。けが人は？'],['A','No, we\'re all good. Bit of a shock, though.','いや、みんな大丈夫。ちょっとびっくりしたけど。'],['Y','Let\'s move off the road.','道路から車をどかしましょう。'],['A','Yep. We\'d better swap details.','うん。連絡先を交換しよう。'],['Y','Here\'s my licence, rego and insurer.','免許証と車の登録番号と保険会社です。'],['A','Thanks. Do we need to call the police?','どうも。警察を呼ぶ必要ある？'],['Y','Not if no one\'s hurt, but let\'s check the rules for reporting in this state.','けが人がいなければ不要だけど、この州の届け出ルールを確認しよう。']],
  notes:['rego＝registration（車の登録）。オーストラリアは州ごとにルールが違います。']},
},
cardblocked: {
 US: {place:'Store, then calling the bank', lines:[['A','Sorry, your card was declined.','すみません、カードが通りませんでした。'],['Y','Huh. Can you try running it again?','あれ。もう一度通してもらえますか。'],['A','Still declined. Do you have another card?','やはりだめです。別のカードはありますか。'],['Y','Here, try this one. ... (to the bank) Hi, my card keeps getting declined. I\'m traveling in the US.','これでお願いします。……（銀行へ）カードが通らないんです。アメリカを旅行中です。'],['A','We flagged a suspicious charge. Did you make a purchase in Miami this morning?','不審な決済を検知しました。今朝マイアミで買い物をしましたか。'],['Y','Yes, that was me.','はい、私です。'],['A','Thanks for confirming. I\'ve removed the hold.','ご確認ありがとうございます。制限を解除しました。']],
  notes:['run the card（カードを通す）、flag（検知する）、hold（保留・制限）は頻出。traveling は L が1つ（アメリカ式）。']},
 AU: {place:'Shop, then calling the bank', lines:[['A','Sorry, that\'s come up as declined.','すみません、通らなかったです。'],['Y','Oh, really? Could I try tapping again?','え、本当？もう一度タッチしてもいいですか。'],['A','Same again, sorry. Have you got another card?','同じですね、すみません。別のカードはありますか。'],['Y','Yep, here. ... (to the bank) Hi, my debit card isn\'t working.','はい、これ。……（銀行へ）デビットカードが使えないんです。'],['A','It looks like you hit your daily limit. Would you like me to raise it?','1日の上限に達したようです。上げましょうか。'],['Y','Yes, please, just for this week.','お願いします、今週だけ。']],
  notes:['カードが止まる理由には、不正検知のほか利用上限（daily limit）もあります。']},
},
roommate: {
 US: {place:'Shared apartment', lines:[['A','Hey, can we figure out a cleaning schedule?','ねえ、掃除の当番を決めない？'],['Y','Sure. Want to switch off every week?','いいよ。毎週交代にする？'],['A','Sounds good. I\'ll take the kitchen this week.','いいね。今週は僕がキッチンをやるよ。'],['Y','Then I\'ll do the bathroom. How should we split utilities?','じゃあ私はバスルーム。光熱費はどう分ける？'],['A','Let\'s just split everything fifty-fifty on Venmo.','全部半々で、送金アプリで払おう。'],['Y','Works for me. And is it cool if my friend crashes here Saturday?','それでいいよ。あと土曜に友達が泊まってもいい？'],['A','Totally, just give me a heads-up.','全然いいよ、前もって教えてね。']],
  notes:['crash（泊まる）、switch off（交代する）、heads-up（事前の知らせ）はアメリカの口語。送金アプリ（Venmo など）で割り勘するのが一般的。']},
 AU: {place:'Share house', lines:[['A','Hey, should we sort out a cleaning roster?','ねえ、掃除当番表を作らない？'],['Y','Yeah, good idea. Weekly rotation?','うん、いいね。週ごとに交代？'],['A','Sounds fair. I\'ll do the bathroom this week.','公平だね。今週は僕がバスルームをやるよ。'],['Y','Cool, I\'ll do the kitchen. Should we split the bills evenly?','了解、私はキッチン。光熱費は均等に分ける？'],['A','Yeah, and let\'s chip in for a shared pantry too.','うん、共用の食料品もみんなで出し合おう。'],['Y','Sounds good. Is it alright if my mate stays over on the weekend?','いいね。週末に友達が泊まっても大丈夫？'],['A','Course, no dramas.','もちろん、問題ないよ。']],
  notes:['オーストラリアでは share house（シェアハウス）、当番表は roster（イギリスは rota）。','chip in（お金を出し合う）、pantry（食料庫）。']},
},
});
