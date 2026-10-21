/* シチュエーション会話の国別バージョン（海外生活 追加分） */
window.SITU_VARIANTS = Object.assign(window.SITU_VARIANTS || {}, {
utilities: {
 US: {place:'Calling the electric company', lines:[['A','Thanks for calling City Power. How can I help?','シティ電力です。ご用件は？'],['Y','Hi, I\'m moving into a new apartment and need to start service.','新しいアパートに引っ越すので、電気の契約を始めたいです。'],['A','Sure. What\'s the service address and your move-in date?','はい。利用場所の住所と入居日は？'],['Y','1520 Elm Street, apartment 3A, starting June first.','エルム・ストリート1520番地、3A号室で、6月1日からです。'],['A','Do you have a Social Security number for the credit check? If not, we\'ll need a deposit.','信用調査用に社会保障番号はありますか。なければ保証金が必要です。'],['Y','Not yet, so I\'ll pay the deposit. How much is it?','まだないので保証金を払います。いくらですか。'],['A','A hundred and fifty dollars, refunded after twelve months of on-time payments.','150ドルで、12か月遅れずに払えば返金されます。']],
  notes:['アメリカでは電気の契約開始を start service と言います。SSN がないと保証金（deposit）を求められることが多いです。','gas と electric が別会社のことも。']},
 AU: {place:'Calling an energy retailer', lines:[['A','Hi, you\'re speaking with Chloe. How can I help?','クロエです。ご用件は？'],['Y','Hi, I\'ve just moved into a rental and I need to connect the electricity.','賃貸に入居したので電気を開通したいです。'],['A','No worries. What\'s the address?','わかりました。住所は？'],['Y','Unit 6, 25 Smith Street, Fitzroy.','フィッツロイのスミス・ストリート25番地、6号ユニットです。'],['A','Thanks. Would you like gas connected too? We can bundle them for a discount.','ありがとう。ガスも開通しますか。まとめると割引になりますよ。'],['Y','Yes, please. How often will I get a bill?','お願いします。請求はどのくらいの頻度ですか。'],['A','Every three months, but you can switch to monthly in the app.','3か月ごとですが、アプリで毎月に変更できます。']],
  notes:['オーストラリアでは電気・ガスの小売会社を自分で選んで connect します。請求は3か月ごと（quarterly）が多いです。']},
},
internet: {
 US: {place:'Internet provider store', lines:[['Y','Hi, I need internet set up at my new place.','新居にネットを引きたいのですが。'],['A','Sure. Let me check your address. ... We have fiber available, up to one gig.','住所を確認します……最大1ギガの光回線が使えます。'],['Y','How much is it a month?','月いくらですか。'],['A','Seventy dollars, plus fifteen for the router rental. No contract.','70ドル、ルーターのレンタルが15ドル。契約期間の縛りはありません。'],['Y','Can I use my own router?','自分のルーターを使えますか。'],['A','Yes, then you won\'t pay the rental fee. A technician can come out Saturday.','はい、その場合レンタル料はかかりません。土曜に技術者が伺えます。']],
  notes:['アメリカでは光回線は fiber。ルーターのレンタル料が別にかかることが多いです。']},
 AU: {place:'Calling an internet provider', lines:[['Y','Hi, I\'d like to sign up for an NBN plan.','NBN のプランに申し込みたいです。'],['A','Sure. Let me check your address. ... You\'ve got fibre to the premises, so you can get our fastest plan.','住所を確認します……建物まで光回線が来ているので、最速プランが使えます。'],['Y','Is there a lock-in contract?','縛りのある契約ですか。'],['A','No, it\'s month to month. You just need to buy or bring a modem.','いいえ、月ごとの契約です。モデムを購入するか持ち込んでください。'],['Y','When can it be connected?','いつ開通できますか。'],['A','Usually within a few days if there\'s an existing connection.','既存の設備があれば、たいてい数日以内です。']],
  notes:['オーストラリアの固定回線は NBN（National Broadband Network）経由。プロバイダを選んで申し込みます。','lock-in contract（縛りのある契約）があるかを確認しましょう。']},
},
register: {
 US: {place:'Social Security office', lines:[['A','Next, please. How can I help you?','次の方。ご用件は？'],['Y','Hi, I\'d like to apply for a Social Security number. I have a work visa.','社会保障番号を申請したいです。就労ビザがあります。'],['A','Do you have your passport and your I-94 record?','パスポートと I-94 の記録はありますか。'],['Y','Yes, here they are, and my employment letter.','はい、これと雇用証明書です。'],['A','Great. Your card will be mailed to you in about two weeks.','結構です。カードは2週間ほどで郵送されます。'],['Y','Can I start working before it arrives?','届く前に働き始めてもいいですか。'],['A','Yes, your employer can verify that you\'ve applied.','はい、申請済みであることを雇用主が確認できます。']],
  notes:['アメリカでは働くために社会保障番号（SSN）が重要。I-94 は入国記録です。必要書類は時期によって変わるので公式サイトで確認を。']},
 AU: {place:'Applying for a Tax File Number', lines:[['Y','Hi, I\'ve just started a job, and my employer asked for my Tax File Number.','仕事を始めたら、雇用主に TFN（納税者番号）を聞かれました。'],['A','Have you applied for one yet?','もう申請しましたか。'],['Y','No. How do I apply?','いいえ。どうやって申請しますか。'],['A','If you\'re on a visa with work rights, you can apply online through the ATO website.','就労可能なビザなら、ATO（国税庁）のサイトからオンラインで申請できます。'],['Y','What happens if I don\'t give it to my employer?','雇用主に出さないとどうなりますか。'],['A','They\'ll have to take tax at the highest rate, so it\'s best to apply straight away.','最高税率で源泉徴収されてしまうので、すぐに申請するのがいいですよ。']],
  notes:['オーストラリアでは働くために Tax File Number（TFN）が必要。ATO（Australian Taxation Office）のサイトで申請します。']},
},
gym: {
 US: {place:'Gym front desk', lines:[['Y','Hi, I\'m thinking about joining. What are your membership options?','入会を考えています。会員プランは？'],['A','We have a basic plan for twenty-five a month, or premium for forty with classes included.','月25ドルのベーシックか、クラス込みで40ドルのプレミアムです。'],['Y','Is there an annual fee?','年会費はありますか。'],['A','There\'s a forty-nine-dollar annual fee, and you can cancel with thirty days\' notice.','年会費が49ドルで、30日前に連絡すれば解約できます。'],['Y','Can I try it out first?','先にお試しできますか。'],['A','Sure, here\'s a free day pass.','どうぞ、無料の1日パスです。']],
  notes:['アメリカのジムは月額のほかに annual fee（年会費）がかかることがあるので注意。']},
 AU: {place:'Gym reception', lines:[['Y','Hi, how much is a membership?','会員費はいくらですか。'],['A','It\'s fifteen ninety-nine a week, no lock-in contract.','週15ドル99で、縛りなしです。'],['Y','Is it open twenty-four hours?','24時間営業ですか。'],['A','Yep, you just use your fob to get in after hours.','うん、時間外はキー（fob）で入れるよ。'],['Y','Do you have group classes?','グループクラスはありますか。'],['A','Heaps. Boxing, yoga and spin. You can book them in the app.','たくさんあるよ。ボクシング、ヨガ、スピン。アプリで予約できる。']],
  notes:['オーストラリアのジム代は週単位で表示されることが多いです。','heaps（たくさん）は何にでも使えるオーストラリアの口語。']},
},
library: {
 US: {place:'Public library', lines:[['Y','Hi, I\'d like to get a library card.','図書館カードを作りたいです。'],['A','Sure. Do you have a photo ID and proof of your local address?','はい。写真付き身分証と住所の証明はありますか。'],['Y','Here\'s my passport and my lease.','パスポートと賃貸契約書です。'],['A','Perfect. You can check out up to twenty items for three weeks.','完璧です。20点まで3週間借りられます。'],['Y','Do you have ESL conversation groups?','英会話（ESL）グループはありますか。'],['A','Yes, every Tuesday at six. It\'s free.','毎週火曜の6時にあります。無料です。']],
  notes:['借りるはアメリカで check out。ESL（English as a Second Language）の無料講座がある図書館も多いです。']},
 AU: {place:'Local library', lines:[['Y','Hi, could I join the library?','図書館に登録できますか。'],['A','Of course. Do you live in the council area?','もちろん。この地域にお住まいですか。'],['Y','Yes, here\'s my lease.','はい、賃貸契約書です。'],['A','Great. Here\'s your card. You can also borrow e-books on the app.','どうぞ、カードです。アプリで電子書籍も借りられますよ。'],['Y','Are there any English classes?','英語のクラスはありますか。'],['A','We run free English conversation sessions on Wednesday mornings.','水曜の朝に無料の英会話セッションをやっています。']],
  notes:['オーストラリアの公共図書館は地域の council が運営。無料の英会話や移住者向けのイベントが充実しています。']},
},
dentist: {
 US: {place:'Dental office', lines:[['A','So what brings you in today?','今日はどうされましたか。'],['Y','I have a toothache on the lower right side. It\'s sensitive to cold.','右下の歯が痛みます。冷たいものがしみます。'],['A','Let\'s take an X-ray. ... You have a cavity. You\'ll need a filling.','レントゲンを撮りましょう……虫歯です。詰め物が必要です。'],['Y','Will my insurance cover it?','保険は使えますか。'],['A','Your plan covers eighty percent, so you\'d pay about forty dollars.','お客様のプランは80%補償なので、自己負担は40ドルほどです。'],['Y','OK, let\'s do it.','わかりました、お願いします。']],
  notes:['アメリカの歯科保険（dental insurance）は医療保険と別のことが多いです。']},
 AU: {place:'Dental clinic', lines:[['A','What can we do for you today?','今日はどうしましょう。'],['Y','I chipped my tooth on something hard.','硬いものを噛んで歯が欠けました。'],['A','Let me have a look. ... It\'s only a small chip. I can fix it with a filling today.','見てみますね……小さな欠けです。今日詰め物で直せますよ。'],['Y','How much will it cost?','いくらかかりますか。'],['A','About two hundred dollars. If you have extras cover, you can claim part of it.','約200ドルです。民間保険の付帯補償（extras）があれば一部請求できます。'],['Y','Great, thanks.','わかりました、ありがとう。']],
  notes:['オーストラリアの歯科は Medicare の対象外が多く、民間保険の extras cover で補償します。']},
},
school: {
 US: {place:'Elementary school office', lines:[['Y','Hi, I\'d like to enroll my daughter. We just moved into the district.','娘を入学させたいです。学区に越してきたばかりです。'],['A','Welcome! What grade will she be in?','ようこそ！何年生ですか。'],['Y','Third grade. She\'s eight.','3年生です。8歳です。'],['A','I\'ll need proof of address, her birth certificate and her immunization records.','住所の証明、出生証明書、予防接種の記録が必要です。'],['Y','Is there support for English learners?','英語を学ぶ子へのサポートはありますか。'],['A','Yes, we have an ESL teacher, and the school bus stops near your street.','ESL の先生がいますし、スクールバスもお宅の近くに停まりますよ。']],
  notes:['アメリカの公立校は住んでいる学区（school district）で決まります。予防接種の記録が必要です。','学年は first grade, second grade … と数えます。']},
 AU: {place:'Primary school office', lines:[['Y','Hi, we\'ve just moved here and I\'d like to enrol my son.','引っ越してきたので息子を入学させたいです。'],['A','Lovely. What year will he be going into?','わかりました。何年生になりますか。'],['Y','Year 2. He\'s seven.','2年生（Year 2）で、7歳です。'],['A','We\'ll need his visa details, proof of address and his immunisation history.','ビザの詳細、住所の証明、予防接種の履歴が必要です。'],['Y','Does he need a uniform and a hat?','制服と帽子は必要ですか。'],['A','Yes, and the hat is compulsory. "No hat, no play" in the playground!','はい、帽子は必須です。校庭では「帽子なしは遊べない」がルールなの！']],
  notes:['オーストラリアの学年は Year 1, Year 2 … と数えます。','日差し対策で、校庭では帽子必須（No hat, no play）の学校がほとんど。','留学生ビザなどでは公立校の学費がかかる州もあります。']},
},
drycleaning: {
 US: {place:'Dry cleaner', lines:[['Y','Hi, I need these pants and this blazer dry-cleaned.','このズボンとジャケットをドライクリーニングに出したいです。'],['A','Sure. Any stains I should know about?','はい。気になるしみはありますか。'],['Y','There\'s a little coffee stain on the pants.','ズボンに小さなコーヒーのしみがあります。'],['A','We\'ll take care of it. They\'ll be ready Wednesday after three.','対応します。水曜の3時以降に仕上がります。'],['Y','Do you do alterations too?','お直しもしていますか。'],['A','Yes, we can hem pants for twelve dollars.','はい、ズボンの裾上げは12ドルです。']],
  notes:['ズボンはアメリカで pants。裾上げは hem。']},
 AU: {place:'Dry cleaner', lines:[['Y','Hi, could I get this suit dry-cleaned?','このスーツをドライクリーニングに出したいです。'],['A','No worries. Do you need it by a certain day?','いいですよ。いつまでに必要ですか。'],['Y','Friday, if possible. I\'ve got a wedding.','できれば金曜までに。結婚式があるんです。'],['A','That\'s fine. It\'ll be ready Thursday arvo.','大丈夫です。木曜の午後に仕上がります。'],['Y','Great. Can I pay when I pick it up?','よかった。受け取りのときに払えますか。'],['A','Yep, all good.','はい、大丈夫です。']],
  notes:['arvo（午後）、all good（大丈夫）はオーストラリアでとてもよく使います。']},
},
bins: {
 US: {place:'Asking the building manager', lines:[['Y','Hi, which day is trash pickup?','ゴミの回収は何曜日ですか。'],['A','Trash is picked up Monday and Thursday. Recycling is every Wednesday.','ゴミは月曜と木曜、リサイクルは毎週水曜です。'],['Y','Where do I put it?','どこに出せばいいですか。'],['A','There\'s a trash chute on every floor, and recycling goes in the blue bins in the garage.','各階にダストシュートがあって、リサイクルは駐車場の青いゴミ箱です。'],['Y','What about large items like furniture?','家具など大きなものは？'],['A','Call the city for a bulk pickup. It\'s free twice a year.','市に粗大ゴミ回収を頼んで。年2回は無料だよ。']],
  notes:['ゴミはアメリカで trash / garbage。回収は pickup。']},
 AU: {place:'Asking a neighbour', lines:[['Y','Sorry, which night do the bins go out?','すみません、ゴミは何曜の夜に出しますか。'],['A','Red bin goes out Sunday night, and yellow recycling every other week.','赤いゴミ箱は日曜の夜、黄色の資源ゴミは隔週だよ。'],['Y','Where does green waste go?','庭のゴミはどこに？'],['A','The green-lid bin, but only if you\'ve signed up with the council.','緑のふたのゴミ箱。でも市に申し込んでいる場合だけね。'],['Y','And old furniture?','古い家具は？'],['A','Book a council clean-up online. They\'ll pick it up from the kerb.','市の粗大ゴミ回収をオンラインで予約して。歩道脇から持っていってくれるよ。']],
  notes:['オーストラリアは色のふたで分別（赤＝一般、黄＝資源、緑＝庭ゴミ）。粗大ゴミは council clean-up。','歩道の縁石は kerb（アメリカは curb）。']},
},
redelivery: {
 US: {place:'Calling a delivery company', lines:[['Y','Hi, I missed a delivery yesterday. The tracking number is 1Z 849 302.','昨日配達を受け取れませんでした。追跡番号は 1Z 849 302 です。'],['A','Let me pull that up. ... It needs a signature, so we couldn\'t leave it.','確認します……サインが必要なので置いていけませんでした。'],['Y','Could you redeliver it tomorrow?','明日再配達してもらえますか。'],['A','Sure, or you can pick it up at our store on Main Street after six.','はい。またはメイン・ストリートの店舗で6時以降に受け取れます。'],['Y','I\'ll pick it up, thanks.','受け取りに行きます、ありがとう。']],
  notes:['アメリカでは玄関先に置き配されることが多いですが、高額品はサイン（signature）が必要です。']},
 AU: {place:'Parcel card left at the door', lines:[['Y','Hi, I got a card saying my parcel\'s at the post office.','荷物が郵便局にあるという不在票が来ました。'],['A','Sure. Can I see the card and some ID?','はい。不在票と身分証を。'],['Y','Here you go.','どうぞ。'],['A','Here it is. Next time, you can choose a parcel locker or authority to leave.','こちらです。次からは宅配ロッカーか置き配の許可も選べますよ。'],['Y','Authority to leave?','置き配の許可？'],['A','It means the driver can leave it at your door without a signature.','サインなしで玄関に置いていいという意味です。']],
  notes:['authority to leave（ATL）は「置き配の許可」。オーストラリアの通販でよく見る表現です。']},
},
moveout: {
 US: {place:'Property management office', lines:[['Y','Hi, I wanted to give my thirty-day notice. I\'m moving out at the end of next month.','30日前通知をしたいです。来月末に退去します。'],['A','Thanks. Please submit it in writing through the portal.','ありがとうございます。ポータルから書面で提出してください。'],['Y','When will I get my security deposit back?','敷金はいつ返ってきますか。'],['A','Within thirty days after the move-out inspection, minus any damage beyond normal wear and tear.','退去点検から30日以内に、通常の劣化を超える損傷分を差し引いて返します。'],['Y','Should I be there for the inspection?','点検に立ち会うべきですか。'],['A','It\'s a good idea. We\'ll go through the checklist together.','その方がいいですね。一緒にチェックリストを確認します。']],
  notes:['敷金はアメリカで security deposit。返金期限は州の法律で決まっています。']},
 AU: {place:'Real estate agent', lines:[['Y','Hi, I\'d like to give notice that I\'m vacating at the end of the lease.','契約満了で退去することを通知したいです。'],['A','Thanks. We\'ll need it in writing at least twenty-eight days before.','ありがとうございます。最低28日前に書面でお願いします。'],['Y','How do I get my bond back?','敷金（bond）はどう返ってきますか。'],['A','After the final inspection, we both sign a bond claim form, and it\'s released by the bond authority.','最終点検の後、両者で返金申請書にサインし、州の敷金機関から返金されます。'],['Y','Do I need to get the carpets cleaned?','カーペットのクリーニングは必要ですか。'],['A','Check your lease, but most leases require a professional carpet clean.','契約書を確認してください。多くは業者のカーペット清掃が必要です。']],
  notes:['オーストラリアの bond は州の機関が保管し、退去後に双方の合意で返金されます。','退去前の業者清掃（end of lease clean）を頼む人が多いです。']},
},
bikeshop: {
 US: {place:'Bike shop', lines:[['Y','Hi, I got a flat tire. Can you fix it?','パンクしました。直せますか。'],['A','Sure. A new tube is fifteen bucks, including labor.','いいよ。チューブ交換は工賃込みで15ドル。'],['Y','Great. Can you also check the brakes?','お願いします。ブレーキも見てもらえますか。'],['A','They\'re a little worn. A tune-up is sixty dollars.','少しすり減ってるね。全体調整は60ドル。'],['Y','Just the tire for now, thanks.','今はタイヤだけでお願いします。']],
  notes:['タイヤはアメリカで tire、工賃は labor（イギリス式は labour）。全体の点検調整は tune-up。']},
 AU: {place:'Bike shop', lines:[['Y','Hi, I\'ve got a puncture. Could you have a look?','パンクしました。見てもらえますか。'],['A','Yep, chuck it up on the stand. ... There\'s a bit of glass in the tyre.','うん、スタンドに載せて……タイヤにガラスが刺さってるね。'],['Y','Can you fix it today?','今日直せますか。'],['A','Should have it done in half an hour. Twenty bucks all up.','30分でできるよ。全部で20ドル。'],['Y','Great, I\'ll grab a coffee and come back.','よかった、コーヒーを買って戻ってきます。']],
  notes:['chuck（置く・投げる）、all up（全部で）はオーストラリアの口語。パンクは puncture。']},
},
optician: {
 US: {place:'Optometrist', lines:[['Y','Hi, I\'d like to schedule an eye exam.','目の検査を予約したいです。'],['A','Sure. Do you have vision insurance?','はい。眼科の保険はありますか。'],['Y','I think it\'s included in my health plan.','医療保険に含まれていると思います。'],['A','Let me check. ... Yes, the exam is covered, and you get a hundred and fifty toward frames.','確認します……はい、検査は対象で、フレーム代に150ドルの補助があります。'],['Y','Great. How long do contacts take?','よかった。コンタクトはどのくらいでできますか。'],['A','We can do a trial pair today and order the rest.','今日お試しを出して、残りを注文できますよ。']],
  notes:['アメリカでは眼科の検査は optometrist、眼鏡の保険（vision insurance）があることも。コンタクトは contacts。']},
 AU: {place:'Optometrist', lines:[['Y','Hi, could I book an eye test?','視力検査を予約できますか。'],['A','Sure. Do you have a Medicare card?','はい。Medicare カードはありますか。'],['Y','No, I\'m on a working holiday visa.','いいえ、ワーホリビザです。'],['A','That\'s fine, it\'s just seventy dollars for the test.','大丈夫ですよ、検査は70ドルだけです。'],['Y','Do you have cheaper frames?','安いフレームはありますか。'],['A','Yep, this range is two pairs for a hundred and ninety-nine.','はい、このシリーズは2本で199ドルです。']],
  notes:['オーストラリアで Medicare の対象者は視力検査が公費でカバーされることが多いです。']},
},
phonebill: {
 US: {place:'Customer service call', lines:[['A','Thank you for calling. Can I get your account number?','お電話ありがとうございます。アカウント番号を。'],['Y','Sure, it\'s 7720 1934. I was charged twice this month.','7720 1934 です。今月二重請求されています。'],['A','I see that. I apologize for the inconvenience. I\'ll issue a credit right now.','確認しました。ご迷惑をおかけしました。すぐに返金処理をします。'],['Y','When will it show up?','いつ反映されますか。'],['A','It\'ll appear on your next bill.','次回の請求書に反映されます。'],['Y','Great. Can I get a confirmation number?','わかりました。確認番号をもらえますか。']],
  notes:['返金を credit（次回請求からの差し引き）で処理されることがあります。confirmation number は控えておきましょう。']},
 AU: {place:'Customer service chat / call', lines:[['A','Hi, thanks for calling. Who am I speaking with?','お電話ありがとうございます。お名前は？'],['Y','It\'s Ken Tanaka. My bill is a lot higher than usual.','田中健です。請求額がいつもよりずっと高いんです。'],['A','Let me have a look. ... It looks like you went over your data limit.','確認します……データ上限を超えたようです。'],['Y','I didn\'t get a warning.','警告が来なかったんですが。'],['A','Sorry about that. I can waive the extra charges this time and add a data alert.','申し訳ありません。今回は追加料金を免除して、データ通知を設定しますね。'],['Y','Thanks, I appreciate it.','ありがとう、助かります。']],
  notes:['丁寧に事情を説明すると、追加料金を免除（waive）してもらえることがあります。']},
},
});
