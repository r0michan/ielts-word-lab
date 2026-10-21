/* 品詞問題（TOEIC Part 5 型）と IELTS 頻出トピック別の語彙セット */

// sentence with ___|correct|wrong,wrong,wrong|解説（空欄の位置から品詞を決める）
window.FORM_RAW = `
The company reported a ___ increase in profits.|significant|significantly,significance,signify|冠詞 a と名詞 increase の間 → 名詞を修飾する形容詞。
Prices have risen ___ over the past year.|sharply|sharp,sharpen,sharpness|自動詞 risen を修飾 → 副詞。
The ___ of the new system took six months.|implementation|implement,implemented,implementing|the ___ of → 名詞。
All employees must ___ with the new safety rules.|comply|compliance,compliant,compliantly|助動詞 must の後 → 動詞の原形。
She gave a very ___ presentation.|informative|inform,information,informatively|very + 形容詞 + 名詞。
The report was written very ___.|carefully|careful,care,carefulness|動詞 written を修飾 → 副詞（very は副詞も修飾できる）。
Our ___ to customer service is well known.|commitment|commit,committed,committing|所有格 Our の後 → 名詞。
The new policy will ___ affect small businesses.|directly|direct,direction,directness|will と動詞の間 → 副詞。
The museum is ___ to the public on weekends.|open|opening,opener,openly|be 動詞の後の補語 → 形容詞。
There has been a ___ decline in the number of students.|gradual|gradually,grade,gradualness|冠詞と名詞の間 → 形容詞。
The number of visitors increased ___ in July.|dramatically|dramatic,drama,dramatise|自動詞 increased を修飾 → 副詞。
Many people are ___ about the future of the economy.|concerned|concern,concerning,concernedly|人が主語で「心配している」→ -ed 形の形容詞。
The results of the survey were ___.|surprising|surprised,surprise,surprisingly|物が主語で「（人を）驚かせる」→ -ing 形。
I was ___ by the size of the city.|amazed|amazing,amaze,amazement|人が「驚かされた」→ -ed 形。
The ___ of the bridge will cost two million pounds.|construction|construct,constructive,constructed|the ___ of → 名詞。
He spoke ___ about his experience.|honestly|honest,honesty,honester|動詞 spoke を修飾 → 副詞。
This software is ___ with most computers.|compatible|compatibility,compatibly,compatibilities|be + 形容詞 + with。
The training is ___ for all new staff.|mandatory|mandate,mandatorily,mandates|be 動詞の後の補語 → 形容詞。
We need to find a ___ solution to this problem.|practical|practice,practically,practise|冠詞と名詞の間 → 形容詞。
The CEO ___ announced her retirement.|officially|official,office,officials|主語と動詞の間 → 副詞。
Tourism makes an important ___ to the local economy.|contribution|contribute,contributive,contributed|形容詞 important の後 → 名詞（make a contribution to）。
The two companies decided to ___ their resources.|combine|combination,combined,combining|to 不定詞 → 動詞の原形。
Online shopping has become ___ popular.|increasingly|increase,increasing,increased|形容詞 popular を修飾 → 副詞。
Applicants must have ___ experience in marketing.|relevant|relevance,relevantly,relevancy|名詞 experience を修飾 → 形容詞。
The hotel offers ___ rooms at reasonable prices.|comfortable|comfort,comfortably,comforts|名詞 rooms を修飾 → 形容詞。
The director was ___ satisfied with the results.|extremely|extreme,extremity,extremes|形容詞 satisfied を修飾 → 副詞。
Recycling helps ___ waste.|reduce|reduction,reductive,reductions|help (to) + 動詞の原形。
There is a growing ___ for nurses in rural areas.|need|needy,needed,needing|形容詞 growing の後 → 名詞。
Our sales team works ___ to meet its targets.|hard|hardly,hardness,harden|work hard（一生懸命）。hardly は「ほとんど〜ない」で意味が逆。
Please read the instructions ___ before you start.|thoroughly|thorough,thoroughness,thoroughfare|動詞 read を修飾 → 副詞。
The new manager is very ___.|knowledgeable|knowledge,know,knowingly|be + very + 形容詞。
Effective ___ is essential in any team.|communication|communicate,communicative,communicatively|形容詞 Effective の後で主語 → 名詞。
The proposal was ___ rejected by the board.|unanimously|unanimous,unanimity,unanimousness|受け身 was rejected の間 → 副詞。
Employees should keep their passwords ___.|confidential|confidence,confidentially,confide|keep + 目的語 + 形容詞（〜の状態に保つ）。
The ___ between the two countries has improved.|relationship|relate,relative,relatively|the ___ between → 名詞。
She is ___ for managing the budget.|responsible|responsibility,responsibly,respond|be responsible for で「〜を担当している」。
The museum attracts ___ two million visitors a year.|approximately|approximate,approximation,approximates|数字を修飾 → 副詞。
This medicine is not ___ for children under 12.|suitable|suit,suitably,suitability|be 動詞の後 → 形容詞。
The government plans to ___ public transport.|expand|expansion,expansive,expansively|to + 動詞の原形。
The documents must be signed and returned ___.|promptly|prompt,promptness,prompted|動詞 returned を修飾 → 副詞。
Customer ___ is our top priority.|satisfaction|satisfy,satisfied,satisfying|名詞 + 名詞の複合語 → 名詞。
The city is ___ for its historic architecture.|famous|fame,famously,famousness|be famous for。
Researchers ___ the data over several months.|analysed|analysis,analytical,analyst|主語の後 → 動詞。
It is ___ to book tickets in advance.|advisable|advice,advise,advisably|It is + 形容詞 + to 不定詞。
The new design is both simple and ___.|elegant|elegance,elegantly,elegances|both A and B で形容詞 simple と並列。
Unemployment remained ___ high throughout the decade.|relatively|relative,relation,relativity|形容詞 high を修飾 → 副詞。
The ___ of the survey were published yesterday.|findings|find,found,findable|the ___ of + 複数動詞 were → 名詞の複数形。
`;

// key|日本語名|word tag|phrase=日本語;…|Task 2 の出題例
window.TOPIC_RAW = `
env|環境|env|tackle climate change=気候変動に取り組む;reduce carbon emissions=炭素排出を減らす;renewable energy sources=再生可能エネルギー源;endangered species=絶滅危惧種;single-use plastics=使い捨てプラスチック;raise public awareness=人々の意識を高める;sustainable development=持続可能な開発;take a heavy toll on=〜に大きな打撃を与える|Some people think environmental problems should be solved by governments, while others believe individuals should take responsibility. Discuss both views and give your opinion.
edu|教育|edu|compulsory education=義務教育;academic performance=学業成績;tuition fees=授業料;vocational training=職業訓練;critical thinking skills=批判的思考力;rote learning=丸暗記の学習;distance learning=遠隔学習;a well-rounded education=バランスの取れた教育|Some people believe university education should be free for everyone. To what extent do you agree or disagree?
tech|テクノロジー|tech|technological advances=技術の進歩;artificial intelligence=人工知能;replace human workers=人間の労働者に取って代わる;online privacy=ネット上のプライバシー;the digital divide=情報格差;access information instantly=すぐに情報を得る;screen time=画面を見る時間;be addicted to smartphones=スマホに依存している|Artificial intelligence will soon replace many jobs. Is this a positive or negative development?
health|健康|health|a sedentary lifestyle=座りがちな生活;a balanced diet=バランスの良い食事;obesity rates=肥満率;mental health problems=心の健康問題;preventive medicine=予防医療;life expectancy=平均寿命;junk food=ジャンクフード;the healthcare system=医療制度|Governments should tax unhealthy foods to encourage people to eat more healthily. To what extent do you agree or disagree?
work|仕事|work|work-life balance=仕事と生活の両立;job satisfaction=仕事の満足度;remote working=リモートワーク;career prospects=キャリアの見通し;job security=雇用の安定;be under pressure=プレッシャーを受けている;the gender pay gap=男女の賃金格差;a nine-to-five job=定時の仕事|More and more people are working from home. Do the advantages of this outweigh the disadvantages?
city|都市・住まい|city|urban sprawl=都市の無秩序な拡大;traffic congestion=交通渋滞;public transport=公共交通;the cost of living=生活費;affordable housing=手頃な価格の住宅;green spaces=緑地;overcrowded cities=過密都市;rural areas=農村地域|Many people move from the countryside to cities. What problems does this cause, and what can be done to solve them?
soc|社会・家族|soc|an ageing population=高齢化する人口;the generation gap=世代間の差;the nuclear family=核家族;peer pressure=仲間からの圧力;social inequality=社会的不平等;community spirit=地域の連帯感;a role model=手本となる人;juvenile crime=少年犯罪|In many countries, the proportion of older people is increasing. Is this a positive or negative trend?
econ|経済|econ|economic growth=経済成長;consumer spending=消費支出;the global economy=世界経済;the unemployment rate=失業率;boost the economy=経済を活性化させる;income inequality=所得格差;free trade=自由貿易;small businesses=中小企業|Economic growth is the most important goal for any country. To what extent do you agree or disagree?
gov|政府・犯罪|gov|crime rates=犯罪率;a deterrent to crime=犯罪の抑止力;law enforcement=法執行機関;impose strict penalties=厳しい罰則を科す;the rehabilitation of offenders=犯罪者の更生;public spending=公共支出;government funding=政府の資金;raise taxes=増税する|Prison is not the best way to reduce crime. What other measures could be more effective?
travel|観光・文化|travel|mass tourism=大衆観光（観光公害の原因）;the tourism industry=観光業;cultural heritage=文化遺産;local communities=地域社会;broaden your horizons=視野を広げる;a tourist destination=観光地;ecotourism=エコツーリズム;budget airlines=格安航空会社|International tourism brings more problems than benefits. To what extent do you agree or disagree?
`;
