// Reading passages with the full range of IELTS question types (original texts on frequently tested themes).
window.READING.push(
  {id:'money', title:'From Shells to Smartphones: A Short History of Money', lv:'B2', topic:'歴史・経済',
   paras:[
    'Before money existed, people exchanged goods directly. A farmer with extra grain might trade it for a pair of shoes. This system, known as barter, had an obvious weakness: it only worked if both people wanted what the other had at the same moment.',
    'To solve this problem, many societies began to use objects that everyone agreed had value. In parts of Africa and Asia, cowrie shells were used for centuries because they were durable, easy to carry and difficult to fake. Elsewhere, people used salt, cattle or pieces of metal.',
    'The first coins appeared around 600 BC in Lydia, in what is now Turkey. Made from a natural mixture of gold and silver, they were stamped with images that showed their value was guaranteed by the king. Coins spread quickly through the Mediterranean, encouraging trade between distant cities.',
    'Paper money was introduced much later, in China during the Tang and Song dynasties. Merchants who did not want to carry heavy strings of coins left them with trusted dealers in exchange for written receipts. Eventually the government took control of these notes and began printing its own, although over-printing sometimes caused serious inflation.',
    'Today, money is increasingly invisible. In countries such as Sweden, fewer than one in ten purchases are now made with cash. Supporters of digital payments praise their speed and convenience, but critics warn that a cashless society could exclude elderly people and those without bank accounts, and make it easier for companies and governments to track personal spending.',
   ],
   groups:[
    {type:'heading', options:['The disappearance of physical money','Why direct exchange had limits','The role of banks in the modern economy','Early forms of shared value','A royal guarantee of value','How written receipts became currency','The problem of counterfeit coins'],
     items:[[0,1,'物々交換（barter）の弱点を説明している。'],[1,3,'貝殻・塩・家畜など、皆が価値を認めた物の話。'],[2,4,'王の刻印が価値を保証した最初の硬貨。'],[3,5,'受取証が紙幣になった経緯。'],[4,0,'現金が使われなくなっている現代。']]},
    {type:'mc', items:[
      ['Why were cowrie shells useful as money?',['They were beautiful.','They were long-lasting and hard to copy.','They were found everywhere.','The king controlled them.'],1,'B段落「durable, easy to carry and difficult to fake」。'],
      ['What problem was sometimes caused by paper money in China?',['Notes were often stolen.','Merchants refused to use it.','Too much was printed, causing inflation.','It was too heavy to carry.'],2,'D段落「over-printing sometimes caused serious inflation」。'],
    ]},
    {type:'summary', intro:'Complete the summary. Choose ONE WORD ONLY from the passage for each answer.', items:[
      ['Critics say a cashless society may exclude ______ people.','elderly','E段落「could exclude elderly people」。'],
      ['They also say it may allow governments to ______ personal spending.','track','E段落「make it easier ... to track personal spending」。'],
    ]},
   ]},
  {id:'teens', title:'Why Teenagers Need More Sleep', lv:'B2', topic:'健康・教育',
   paras:[
    'Parents often complain that teenagers stay up late and refuse to get out of bed in the morning. For a long time, this behaviour was blamed on laziness or too much screen time. Research now suggests that biology plays a much larger role than previously thought.',
    'During adolescence, the body releases the sleep hormone melatonin about two hours later in the evening than it does in childhood. As a result, most teenagers do not feel tired until around 11 p.m., even if they go to bed earlier. This shift in the body clock is found in young people across many different cultures.',
    'At the same time, teenagers still need between eight and ten hours of sleep a night. When school starts at 8 a.m. or earlier, many simply cannot get enough rest. Studies link sleep shortage in this age group to lower grades, poorer mental health and a higher risk of road accidents among young drivers.',
    'Some schools have responded by starting the day later. In one well-known experiment in the United States, two high schools in Seattle moved their start time from 7.50 to 8.45 a.m. Students gained an average of 34 minutes of sleep per night, attendance improved, and grades in the subject studied rose by around four and a half percent.',
    'Critics argue that later start times create practical difficulties, such as changes to bus schedules and less time for after-school sports or part-time jobs. Nevertheless, a growing number of medical organisations now recommend that secondary schools should not begin before 8.30 a.m.',
   ],
   groups:[
    {type:'info', items:[
      ['a description of a change in when a hormone is produced',1,'B段落：メラトニンが2時間遅く出る。'],
      ['a reference to the dangers of driving without enough sleep',2,'C段落「road accidents among young drivers」。'],
      ['an example of a school changing its timetable',3,'D段落：シアトルの高校。'],
      ['practical objections to a proposed change',4,'E段落「practical difficulties」。'],
    ]},
    {type:'tfng', items:[
      ['Researchers now believe teenagers\' late nights are mainly caused by screen use.','F','A段落「biology plays a much larger role」。'],
      ['The change in teenagers\' body clocks has been observed in many cultures.','T','B段落「found in young people across many different cultures」。'],
      ['Students in the Seattle experiment slept over an hour more each night.','F','D段落「an average of 34 minutes」。'],
      ['All schools in Seattle now start after 8.30 a.m.','NG','2校の実験が書かれているだけで、全校については書かれていない。'],
    ]},
   ]},
  {id:'farms', title:'Farming in the City', lv:'C1', topic:'都市・環境',
   paras:[
    'For most of the twentieth century, farming and cities were seen as opposites. Food was grown in the countryside and transported, often over long distances, to urban consumers. In recent decades, however, a growing movement has sought to bring food production back into cities.',
    'Urban agriculture takes many forms. At the simplest level, residents grow vegetables in community gardens or on balconies. More ambitious projects include rooftop farms on commercial buildings and so-called vertical farms, in which crops are grown indoors in stacked layers under artificial light, often without soil.',
    'Supporters point to several benefits. Growing food close to consumers reduces the emissions associated with transport, and indoor farms can produce crops all year round using a fraction of the water required by conventional agriculture. Community gardens are also valued for social reasons, giving neighbours a place to meet and children an opportunity to learn where food comes from.',
    'Yet the economics remain challenging. Land in cities is expensive, and vertical farms consume large amounts of electricity for lighting and climate control. Several high-profile vertical farming companies have closed in recent years after failing to make a profit, and most have so far focused on high-value crops such as salad leaves and herbs rather than staple foods like wheat or rice.',
    'Most researchers therefore see urban farming as a supplement to, rather than a replacement for, traditional agriculture. Its greatest value may lie less in the quantity of food it produces than in reconnecting city dwellers with the natural world.',
   ],
   groups:[
    {type:'heading', options:['A complement rather than a substitute','The financial difficulties of indoor farming','Why farms moved to the countryside','A change in how food production is viewed','Environmental and social advantages','Government support for urban farmers','The variety of approaches to city farming'],
     items:[[0,3,'都市と農業は対立と見られていたが、変化が起きている。'],[1,6,'コミュニティガーデンから垂直農場まで多様な形。'],[2,4,'輸送の排出削減・水の節約・社会的価値。'],[3,1,'土地代・電気代・企業の撤退。'],[4,0,'従来農業の「補完」であって代わりではない。']]},
    {type:'summary', intro:'Complete the summary using words from the box.', box:['electricity','herbs','water','profit','soil','rice','transport'], items:[
      ['Vertical farms often grow crops without ______.','soil','B段落「often without soil」。'],
      ['They use much less ______ than conventional farms.','water','C段落「a fraction of the water」。'],
      ['However, they need a lot of ______ for lighting.','electricity','D段落「consume large amounts of electricity for lighting」。'],
      ['Most grow salad leaves and ______ rather than staple foods.','herbs','D段落「salad leaves and herbs」。'],
    ]},
   ]},
  {id:'crows', title:'The Surprising Intelligence of Crows', lv:'C1', topic:'動物・科学',
   paras:[
    'Crows have long been associated with bad luck in Western folklore, but scientists increasingly regard them as among the most intelligent animals on the planet. In some tests of problem-solving, members of the crow family perform at a level comparable to that of great apes and young children.',
    'One of the most remarkable examples comes from New Caledonia, an island in the Pacific. Crows there make tools from twigs and leaves, shaping them into hooks to pull insects out of holes in trees. Remarkably, different groups of birds produce slightly different designs, suggesting that techniques are passed on through learning rather than instinct alone.',
    'Laboratory experiments have revealed even more. In a well-known study, crows were presented with a tube of water containing a floating piece of food that was out of reach. Many of the birds dropped stones into the tube to raise the water level, a solution that requires an understanding of cause and effect.',
    'Crows also appear to remember individual human faces. Researchers at the University of Washington wore a particular mask while trapping and tagging birds. Years later, crows scolded and mobbed people wearing the same mask, even birds that had not been trapped themselves, which indicates that the information had been shared within the group.',
    'Why should crows be so clever? One theory is that their varied diet and complex social lives demand flexible thinking. Whatever the reason, their abilities have challenged the long-held assumption that advanced intelligence requires a large, mammalian brain.',
   ],
   groups:[
    {type:'mc', items:[
      ['What does the writer say about tool-making crows in New Caledonia?',['They all make identical tools.','Their skills appear to be learned.','They only use leaves.','They copy humans.'],1,'B段落「passed on through learning rather than instinct alone」。'],
      ['What did the water tube experiment show?',['Crows can swim.','Crows prefer stones to food.','Crows understand cause and effect.','Crows cannot reach deep water.'],2,'C段落「requires an understanding of cause and effect」。'],
      ['What is surprising about the mask experiment?',['Crows attacked all humans.','Crows that were never trapped also reacted.','The masks frightened researchers.','Crows forgot the faces quickly.'],1,'D段落「even birds that had not been trapped themselves」。'],
    ]},
    {type:'tfng', items:[
      ['Crows perform as well as great apes in some problem-solving tests.','T','A段落「comparable to that of great apes」。'],
      ['The mask study lasted for more than ten years.','NG','「Years later」とあるが具体的な年数は書かれていない。'],
      ['Scientists have proved that diet is the reason for crows\' intelligence.','F','E段落「One theory is…」理論の一つにすぎない。'],
    ]},
    {type:'info', items:[
      ['evidence that knowledge is passed between birds',3,'D段落：捕まっていない鳥も反応＝情報が共有された。'],
      ['a belief that crows bring misfortune',0,'A段落「associated with bad luck」。'],
    ]},
   ]},
);
