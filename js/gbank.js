/* 文法問題バンク：問題パターンを大量に作る。
   ① 組み合わせ生成（主語×動詞×時の表現…）で、1つの文法項目から何百通りもの文を作る
   ② 意味で答えが決まる項目は、手書きのパターン集から出す
   ③ どの問題も「穴埋め4択／正誤判定／誤文訂正」のどれかの形式でランダムに出す（同じ文でも聞き方が変わる）
   ④ 文法ユニットの例文からは「並べ替え・意味選択・聞き取り」も作る
   乱数 r を受け取るので、テスト（同じ日は同じ問題）でもコース練習（毎回ちがう）でも使える。 */
(() => {
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  const sh = (r, a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const low = s => (s === 'I' || /^[A-Z][a-z]+$/.test(s) && NAMES.includes(s)) ? s : s[0].toLowerCase() + s.slice(1);
  const uniq = a => [...new Set(a)];
  const NAMES = ['Tom', 'Yuki', 'Ken', 'Emma', 'Sara'];
  // subject, person key: 1 = I, 3 = he/she/it-like, p = you/we/they-like
  const SUBJ = [['I', '1'], ['You', 'p'], ['He', '3'], ['She', '3'], ['We', 'p'], ['They', 'p'], ['My brother', '3'], ['My parents', 'p'], ['Tom', '3'], ['Yuki', '3'], ['Our teacher', '3'], ['These students', 'p'], ['My friends and I', 'p'], ['Emma', '3']];
  const S3 = SUBJ.filter(s => s[1] === '3'), SP = SUBJ.filter(s => s[1] !== '3');
  const item = (s, a, w, why, tag) => ({s, a, w: uniq(w.filter(x => x && x !== a)).slice(0, 3), why, tag});

  /* ---------- generators (each returns one core item) ---------- */
  const BE_COMP = ['very busy today', 'from Canada', 'in the library now', 'tired after work', 'good at cooking', 'late again', 'at home now', 'interested in history', 'ready for the exam', 'happy with the result', 'in the same class', 'afraid of dogs'];
  const BE_PAST = ['at home yesterday', 'tired last night', 'late for school yesterday', 'in London last week', 'very busy last month', 'sick yesterday'];
  const be = p => p === '1' ? 'am' : p === '3' ? 'is' : 'are', was = p => p === 'p' ? 'were' : 'was';
  const PRES = [['play', 'plays', 'playing', 'tennis on Sundays'], ['live', 'lives', 'living', 'near the station'], ['like', 'likes', 'liking', 'spicy food'], ['watch', 'watches', 'watching', 'TV after dinner'], ['study', 'studies', 'studying', 'English every day'], ['go', 'goes', 'going', 'to the gym twice a week'], ['have', 'has', 'having', 'two cats'], ['teach', 'teaches', 'teaching', 'maths at a high school'], ['work', 'works', 'working', 'in a hospital'], ['drink', 'drinks', 'drinking', 'coffee every morning'], ['speak', 'speaks', 'speaking', 'three languages'], ['wash', 'washes', 'washing', 'the dishes after dinner'], ['finish', 'finishes', 'finishing', 'work at five'], ['carry', 'carries', 'carrying', 'a big bag to school'], ['fly', 'flies', 'flying', 'to Osaka every month']];
  const PROG = [['play', 'plays', 'playing', 'football'], ['watch', 'watches', 'watching', 'a film'], ['study', 'studies', 'studying', 'for the test'], ['cook', 'cooks', 'cooking', 'dinner'], ['read', 'reads', 'reading', 'a newspaper'], ['clean', 'cleans', 'cleaning', 'the kitchen'], ['write', 'writes', 'writing', 'an email'], ['wait', 'waits', 'waiting', 'for the bus']];
  const PAST = [['go', 'went', 'gone', 'to Kyoto', 'goed'], ['see', 'saw', 'seen', 'a great film', 'seed'], ['buy', 'bought', 'bought', 'a new phone', 'buyed'], ['eat', 'ate', 'eaten', 'sushi', 'eated'], ['make', 'made', 'made', 'a cake', 'maked'], ['take', 'took', 'taken', 'a lot of photos', 'taked'], ['write', 'wrote', 'written', 'a long email', 'writed'], ['meet', 'met', 'met', 'an old friend', 'meeted'], ['visit', 'visited', 'visited', 'my grandparents', 'visit'], ['play', 'played', 'played', 'football', 'plaied'], ['study', 'studied', 'studied', 'for the test', 'studyed'], ['stop', 'stopped', 'stopped', 'at a café', 'stoped'], ['forget', 'forgot', 'forgotten', 'my umbrella', 'forgetted'], ['leave', 'left', 'left', 'home early', 'leaved'], ['find', 'found', 'found', 'a wallet on the street', 'finded'], ['bring', 'brought', 'brought', 'some snacks', 'bringed'], ['lose', 'lost', 'lost', 'my keys', 'losed'], ['finish', 'finished', 'finished', 'the report', 'finish']];
  const PAST_T = ['yesterday', 'last weekend', 'two days ago', 'last night', 'in 2019', 'last summer'];
  const s3 = (subj, p) => p === '3';
  const doForm = p => p === '3' ? 'Does' : 'Do', dont = p => p === '3' ? "doesn't" : "don't";
  function gBe(r) {
    const [s, p] = pk(r, SUBJ), mode = r();
    if (mode < .45) { const c = pk(r, BE_COMP); return item(`${s} ___ ${c}.`, be(p), ['am', 'is', 'are', 'be'], `主語 ${s} → ${be(p)}（I は am、he/she/it・1人は is、you・複数は are）。`, 'be動詞'); }
    if (mode < .7) { const c = pk(r, BE_PAST); return item(`${s} ___ ${c}.`, was(p), ['was', 'were', 'is', 'are'], `過去なので was / were。複数・you は were。`, 'be動詞（過去）'); }
    const [s2, p2] = pk(r, SUBJ.filter(x => x[0] !== 'I')), c = pk(r, BE_COMP.slice(0, 10));
    return item(`___ ${low(s2)} ${c}?`, cap(be(p2)), ['Am', 'Is', 'Are', 'Do', 'Does'], `疑問文は be動詞を主語の前へ。${s2} → ${cap(be(p2))}。`, 'be動詞（疑問）');
  }
  function gPres(r) {
    const [s, p] = pk(r, SUBJ), [b, v3, ing, o] = pk(r, PRES), m = r();
    if (m < .45) return item(`${s} ___ ${o}.`, p === '3' ? v3 : b, [b, v3, ing, `is ${b}`, `${p === '3' ? 'is' : 'are'} ${b}`], p === '3' ? `${s} は三人称単数 → ${v3}。` : `${s} は三人称単数ではない → 原形 ${b}。`, '現在形・三単現');
    if (m < .75) return item(`${s} ___ ${b} ${o}.`, dont(p), ["don't", "doesn't", "isn't", 'not', "aren't"], `否定は ${dont(p)} ＋ 原形。`, '現在形（否定）');
    return item(`___ ${low(s)} ${b} ${o}?`, doForm(p), ['Do', 'Does', 'Is', 'Are'], `一般動詞の疑問は ${doForm(p)} ＋主語＋原形。`, '現在形（疑問）');
  }
  function gProg(r) {
    const [s, p] = pk(r, SUBJ), [b, v3, ing, o] = pk(r, PROG), prog = r() < .5;
    const right = prog ? `${be(p)} ${ing}` : (p === '3' ? v3 : b);
    const wrong = prog ? [p === '3' ? v3 : b, ing, `${be(p)} ${b}`] : [`${be(p)} ${ing}`, ing, `${be(p)} ${b}`];
    if (prog) { const pre = pk(r, ['Look! ', 'Listen! ', '', '']), post = pk(r, [' now', ' at the moment', ' right now']); return item(`${pre}${s} ___ ${o}${pre ? '' : post}.`, right, wrong, '「今まさに〜している」→ be ＋ -ing（現在進行形）。', '現在形と進行形'); }
    const t = pk(r, ['every day', 'on Sundays', 'every evening', 'after school', 'twice a week']);
    return item(`${s} usually ___ ${o} ${t}.`, right, wrong, '習慣（usually / every day）→ 現在形。', '現在形と進行形');
  }
  function gPast(r) {
    const [s, p] = pk(r, SUBJ), [b, pa, pp, o, bad] = pk(r, PAST), t = pk(r, PAST_T), m = r();
    if (m < .5) return item(`${s} ___ ${o} ${t}.`, pa, [b, bad, p === '3' ? b + 's' : 'have ' + pp, b + 'ing'], `${t} は過去 → 過去形 ${pa}${pa === b + 'ed' || pa === b + 'd' ? '' : '（不規則変化）'}。`, '過去形');
    if (m < .75) return item(`___ ${low(s)} ${b} ${o} ${t}?`, 'Did', ['Do', 'Does', 'Was', 'Were'], '過去の一般動詞の疑問 → Did ＋主語＋原形。', '過去形（疑問）');
    return item(`${s} didn't ___ ${o} ${t}.`, b, [pa, b + 'ing', 'to ' + b], "didn't の後は原形。", '過去形（否定）');
  }
  const PERF = [['live', 'lived', 'lived', 'in Osaka'], ['work', 'worked', 'worked', 'here'], ['know', 'knew', 'known', 'her'], ['study', 'studied', 'studied', 'French'], ['teach', 'taught', 'taught', 'at this school'], ['play', 'played', 'played', 'the piano'], ['be', 'was', 'been', 'here']];
  const FOR = ['three years', 'a long time', 'six months', 'two weeks', 'ages', 'over ten years'], SINCE = ['2018', 'last summer', 'I was a child', 'April', 'this morning', 'we moved here'];
  const EVENT = [['visit', 'visited', 'visited', 'Paris'], ['see', 'saw', 'seen', 'that film'], ['meet', 'met', 'met', 'her parents'], ['eat', 'ate', 'eaten', 'Thai food'], ['try', 'tried', 'tried', 'surfing'], ['read', 'read', 'read', 'this book'], ['climb', 'climbed', 'climbed', 'Mt Fuji'], ['win', 'won', 'won', 'a prize']];
  const have = p => p === '3' ? 'has' : 'have';
  function gPerf(r) {
    const [s, p] = pk(r, SUBJ), m = r();
    if (m < .4) { const [b, pa, pp, o] = pk(r, PERF), isFor = r() < .5, x = pk(r, isFor ? FOR : SINCE);
      return item(`${s} ${have(p)} ${pp} ${o} ___ ${x}.`, isFor ? 'for' : 'since', ['for', 'since', 'from', 'during', 'ago'], isFor ? 'for ＋ 期間（3年間など）。' : 'since ＋ 起点（2018年から など）。', '現在完了（for / since）'); }
    const [b, pa, pp, o] = pk(r, EVENT), past = r() < .5;
    if (past) { const t = pk(r, ['yesterday', 'last year', 'in 2015', 'two weeks ago', 'when I was ten']); return item(`${s} ___ ${o} ${t}.`, pa, [`${have(p)} ${pp}`, b, `${have(p)} ${pa === pp ? b : pa}`], `${t} は「過去の一点」→ 現在完了ではなく過去形。`, '過去形と現在完了'); }
    const t = pk(r, ['three times', 'before', 'many times', 'twice']);
    return item(`${s} ___ ${o} ${t}.`, `${have(p)} ${pp}`, [pa === pp ? `${have(p)} ${b}` : pa, `${have(p) === 'has' ? 'have' : 'has'} ${pp}`, `${be(p)} ${pp}`], `回数・経験（${t}）→ 現在完了 ${have(p)} ＋ 過去分詞。`, '過去形と現在完了');
  }
  const PASS = [['This castle', 'build', 'built', 'in the 16th century', 'past', 's'], ['These cars', 'make', 'made', 'in Germany', 'pres', 'p'], ['English', 'speak', 'spoken', 'in many countries', 'pres', 's'], ['The meeting', 'cancel', 'cancelled', 'yesterday', 'past', 's'], ['The results', 'announce', 'announced', 'next week', 'fut', 'p'], ['Letters', 'deliver', 'delivered', 'every morning', 'pres', 'p'], ['The thief', 'arrest', 'arrested', 'last night', 'past', 's'], ['Rice', 'grow', 'grown', 'in this area', 'pres', 's'], ['The new hospital', 'build', 'built', 'next year', 'fut', 's'], ['The windows', 'clean', 'cleaned', 'once a month', 'pres', 'p'], ['This novel', 'write', 'written', 'in 1950', 'past', 's'], ['The final', 'watch', 'watched', 'by millions of people last year', 'past', 's'], ['Plastic bottles', 'recycle', 'recycled', 'at this factory', 'pres', 'p'], ['The report', 'finish', 'finished', 'already', 'perf', 's'], ['Two new parks', 'build', 'built', 'since 2020', 'perf', 'p'], ['The winners', 'invite', 'invited', 'to the ceremony next month', 'fut', 'p'], ['Smoking', 'allow', 'allowed', 'here', 'presneg', 's']];
  function gPass(r) {
    const [o, b, pp, t, tense, n] = pk(r, PASS), pl = n === 'p';
    const aux = {past: pl ? 'were' : 'was', pres: pl ? 'are' : 'is', fut: 'will be', perf: pl ? 'have been' : 'has been', presneg: pl ? "aren't" : "isn't"}[tense];
    const right = `${aux} ${pp}`;
    const pastAct = PAST.find(x => x[0] === b)?.[1] || pp;
    const wrongs = [tense === 'presneg' ? `doesn't ${b}` : pastAct === pp ? `${aux} ${b}` : pastAct, `${aux} ${b}ing`.replace(/eing$/, 'ing'), tense === 'fut' ? `will ${b}` : `${pl ? 'is' : 'are'} ${pp}`, tense === 'perf' ? `has ${pp}` : `${aux} ${b}`];
    return item(`${o} ___ ${t}.`, right, wrongs, `${o} は「〜される」側 → 受動態（be ＋ 過去分詞）。${{past: '過去', pres: '現在', fut: '未来', perf: '現在完了', presneg: '現在の否定'}[tense]}なので ${right}。`, '受動態');
  }
  const ADJ = [['cheap', 'cheaper', 'cheapest', 'The bus', 'the train', 'ticket'], ['tall', 'taller', 'tallest', 'My brother', 'my father', 'person'], ['big', 'bigger', 'biggest', 'Tokyo', 'Osaka', 'city'], ['easy', 'easier', 'easiest', 'This test', 'the last one', 'question'], ['busy', 'busier', 'busiest', 'December', 'November', 'month'], ['hot', 'hotter', 'hottest', 'August', 'June', 'month'], ['good', 'better', 'best', 'Her English', 'mine', 'student'], ['bad', 'worse', 'worst', 'The traffic today', 'yesterday', 'day'], ['expensive', 'more expensive', 'most expensive', 'This hotel', 'that one', 'hotel'], ['interesting', 'more interesting', 'most interesting', 'The book', 'the film', 'story'], ['popular', 'more popular', 'most popular', 'Football', 'baseball', 'sport'], ['beautiful', 'more beautiful', 'most beautiful', 'Kyoto', 'my hometown', 'city'], ['important', 'more important', 'most important', 'Health', 'money', 'thing'], ['heavy', 'heavier', 'heaviest', 'This box', 'that one', 'bag'], ['fast', 'faster', 'fastest', 'The train', 'the car', 'way'], ['comfortable', 'more comfortable', 'most comfortable', 'This chair', 'the sofa', 'seat'], ['healthy', 'healthier', 'healthiest', 'Fish', 'red meat', 'food'], ['difficult', 'more difficult', 'most difficult', 'Japanese', 'Spanish', 'language']];
  function gComp(r) {
    const [a, c, s, A, B, n] = pk(r, ADJ), m = r(), more = c.startsWith('more');
    const badC = more ? a + 'er' : 'more ' + c, badS = more ? a + 'est' : 'most ' + s;
    if (m < .4) return item(`${A} is ___ than ${B}.`, c, [a, s, badC, 'the ' + s], `than があるので比較級 ${c}${more ? '（長い語は more）' : ''}。`, '比較');
    if (m < .75) return item(`It is the ___ ${n}${pk(r, [' of all', ' I know', ' of the year'].filter(x => x !== ' of the year' || n === 'month'))}.`, s, [a, c, badS, 'more ' + a], `the ＋最上級 ${s}。`, '最上級');
    return item(`${A} is as ___ as ${B}.`, a, [c, s, 'more ' + a], 'as 〜 as の間は原級（そのままの形）。', '同等比較');
  }
  const VP_ING = [['enjoyed', 'enjoy'], ['finished', 'finish'], ['avoided', 'avoid'], ['suggested', 'suggest'], ['kept', 'keep'], ['practised', 'practise'], ['gave up', 'give up'], ["didn't mind", 'mind']];
  const VP_TO = [['wanted', 'want'], ['decided', 'decide'], ['hoped', 'hope'], ['planned', 'plan'], ['agreed', 'agree'], ['refused', 'refuse'], ['promised', 'promise'], ['needed', 'need'], ['managed', 'manage'], ['learned', 'learn']];
  const ACTS = [['swim', 'swimming'], ['travel abroad', 'travelling abroad'], ['cook dinner', 'cooking dinner'], ['read the report', 'reading the report'], ['study Korean', 'studying Korean'], ['drive to work', 'driving to work'], ['play the guitar', 'playing the guitar'], ['get up early', 'getting up early'], ['eat out', 'eating out'], ['help her', 'helping her'], ['change jobs', 'changing jobs'], ['take the bus', 'taking the bus']];
  function gVP(r) {
    const [s] = pk(r, SUBJ), [b, ing] = pk(r, ACTS), isIng = r() < .5, [v, v0] = pk(r, isIng ? VP_ING : VP_TO);
    return item(`${s} ${v} ___.`, isIng ? ing : 'to ' + b, isIng ? ['to ' + b, b, 'to ' + ing] : [ing, b, 'to ' + ing], isIng ? `${v0} の後は -ing（動名詞）。` : `${v0} の後は to ＋原形（不定詞）。`, '不定詞と動名詞');
  }
  const ART = [['an', 'I waited for ___ hour.'], ['a', 'She studies at ___ university in London.'], ['an', 'Take ___ umbrella with you.'], ['a', 'Spain is ___ European country.'], ['an', 'He is ___ honest man.'], ['a', 'Do you have to wear ___ uniform?'], ['an', 'I had ___ egg for breakfast.'], ['a', 'I bought ___ one-way ticket.'], ['an', 'We saw ___ elephant at the zoo.'], ['a', 'This is ___ useful book.'], ['an', 'That\'s ___ interesting idea.'], ['a', 'She lives in ___ small house.'], ['an', 'He drives ___ old car.'], ['a', 'It was ___ unique chance.'], ['an', 'She works as ___ engineer.'], ['a', 'I need ___ new phone.']];
  function gArt(r) { const [a, s] = pk(r, ART); return item(s, a, [a === 'a' ? 'an' : 'a'], a === 'an' ? '次の語が母音の「音」で始まる → an（hour の h は発音しない）。' : '次の語が子音の「音」で始まる → a（university の u は「ユ」の音）。', '冠詞 a / an'); }
  const TIMES = [['in', '2020'], ['in', 'July'], ['in', 'the morning'], ['in', 'winter'], ['in', 'the 1990s'], ['on', 'Monday'], ['on', '3 May'], ['on', 'my birthday'], ['on', 'Friday evening'], ['on', 'Christmas Day'], ['at', "7 o'clock"], ['at', 'night'], ['at', 'noon'], ['at', 'midnight'], ['at', 'half past six']];
  function gTime(r) { const [p, t] = pk(r, TIMES), f = pk(r, ['We met ___ ' + t + '.', 'It happened ___ ' + t + '.', 'The shop opened ___ ' + t + '.']); return item(f, p, ['in', 'on', 'at'], { in: 'in ＝ 年・月・季節・午前/午後など「長い期間」。', on: 'on ＝ 曜日・日付・特定の日。', at: 'at ＝ 時刻・night などの「点」。'}[p], '時の前置詞'); }
  const UNC = ['information', 'advice', 'furniture', 'homework', 'luggage', 'news', 'research', 'equipment', 'traffic', 'money'], CNT = ['books', 'friends', 'questions', 'students', 'cousins'];
  function gCount(r) {
    if (r() < .5) { const [f, u] = pk(r, [['Can you give me some ___?', 'advice'], ['Can you give me some ___?', 'information'], ['We need more ___ for the project.', 'equipment'], ['We need more ___ before we decide.', 'information'], ['There is too much ___ in this room.', 'furniture'], ['I have a lot of ___ tonight.', 'homework'], ['How heavy is your ___?', 'luggage'], ['Did you hear the ___ about the election?', 'news'], ['She is doing ___ on climate change.', 'research'], ['He gave me some useful ___.', 'advice']]); return item(f, u, [u + 's', 'a ' + u, 'an ' + u].map(x => x.replace(/^a ([aeiou])/, 'an $1')), `${u} は数えられない名詞 → a も s も付けない。`, '数えられない名詞'); }
    const isU = r() < .5, n = isU ? pk(r, UNC) : pk(r, CNT);
    return item(`How ___ ${n} do you have?`.replace('do you have', pk(r, ['do you have', 'did you need', 'are there'])).replace(/are there\?$/, isU ? 'is there?' : 'are there?'), isU ? 'much' : 'many', isU ? ['many', 'a lot', 'few'] : ['much', 'a lot', 'little'], isU ? `${n} は数えられない → much。` : `${n} は数えられる複数 → many。`, 'much と many');
  }
  const PRON = [['me', 'my', 'I', 'mine', '私に'], ['him', 'his', 'he', 'himself', '彼に'], ['her', 'hers', 'she', 'herself', '彼女に'], ['us', 'our', 'we', 'ours', '私たちに'], ['them', 'their', 'they', 'theirs', '彼らに']];
  const POSS = [['my', 'me', 'I', 'mine', '私の'], ['his', 'him', 'he', 'he\'s', '彼の'], ['her', 'she', 'hers', 'herself', '彼女の'], ['our', 'us', 'we', 'ours', '私たちの'], ['their', 'them', 'they', 'theirs', '彼らの']];
  const OWN = [['mine', 'my', 'me', 'I', '私のもの'], ['yours', 'your', 'you', 'you\'re', 'あなたのもの'], ['hers', 'her', 'she', 'herself', '彼女のもの'], ['ours', 'our', 'us', 'we', '私たちのもの'], ['theirs', 'their', 'them', 'they', '彼らのもの']];
  function gPron(r) {
    const m = r();
    if (m < .4) { const [a, ...w] = pk(r, PRON), ja = w.pop(); return item(`（${ja}）${pk(r, ['Please call ___ tonight.', 'Can you help ___?', 'I sent ___ a message.', 'The teacher told ___ the answer.'])}`, a, w, '動詞の後ろ（〜を・〜に）は目的格。', '代名詞'); }
    if (m < .75) { const [a, ...w] = pk(r, POSS), ja = w.pop(); return item(`（${ja}）This is ___ ${pk(r, ['umbrella', 'room', 'car', 'idea', 'teacher'])}.`, a, w, '名詞の前（〜の）は所有格。', '代名詞'); }
    const [a, ...w] = pk(r, OWN), ja = w.pop(); return item(`（${ja}）That bag is ___.`, a, w, '「〜のもの」は所有代名詞（mine / yours / hers …）。', '代名詞');
  }
  const THERE = [['a bank', 'is', ' near my house'], ['two supermarkets', 'are', ' in this town'], ['some milk', 'is', ' in the fridge'], ['many tourists', 'are', ' in Kyoto in spring'], ['a lot of traffic', 'is', ' in the city centre'], ['three bedrooms', 'are', ' in our flat'], ['an old castle', 'is', ' on the hill'], ['some problems', 'are', ' with this plan'], ['a lot of people', 'are', ' at the station'], ['no water', 'is', ' in the bottle'], ['a mistake', 'is', ' in this sentence'], ['twenty students', 'are', ' in my class']];
  function gThere(r) { const [n, a, pl] = pk(r, THERE); return item(`There ___ ${n}${pl}.`, a, ['is', 'are', 'have', 'has'], a === 'is' ? `${n} は単数・数えられない → is。` : `${n} は複数 → are。`, 'There is / are'); }

  /* ---------- pattern banks (meaning decides the answer) ---------- */
  const B = (tag, why, list) => list.map(([s, a, w, y]) => item(s, a, w.split('/'), y || why, tag));
  const MODAL = B('助動詞', '', [
    ["It's a holiday tomorrow, so you ___ get up early.", "don't have to", "must not/must/have to", '休みだから「早起きしなくていい」→ don\'t have to。'],
    ["You ___ use your phone while driving. It's illegal.", 'must not', "don't have to/have to/needn't", '法律で禁止 → must not。'],
    ['Entry is free. You ___ pay.', "don't have to", 'must not/must/should', '無料なので「払わなくていい」。'],
    ['You look pale. You ___ see a doctor.', 'should', "must not/don't have to/mustn't", 'アドバイス → should。'],
    ['Passengers ___ fasten their seatbelts during take-off.', 'must', "don't have to/must not/needn't", '規則で必要 → must。'],
    ["You ___ eat so much junk food. It's bad for you.", "shouldn't", "don't have to/have to/must", 'よくないことへの助言 → shouldn\'t。'],
    ["Children ___ play with matches. It's dangerous.", 'must not', "don't have to/should/have to", '危険なので禁止 → must not。'],
    ["I ___ wear a uniform at work. It's a company rule.", 'have to', "don't have to/mustn't/shouldn't", '会社の規則 → have to。'],
    ['You ___ bring food. Lunch is provided.', "don't have to", 'must/have to/must not', '昼食が出るので「持ってこなくていい」。'],
    ["It's cold outside. You ___ take a coat.", 'should', "mustn't/don't have to/shouldn't", '助言 → should。'],
    ['Visitors ___ take photos inside the museum.', 'must not', "don't have to/have to/should", '館内撮影禁止 → must not。'],
    ['You ___ finish it today. Tomorrow is fine.', "don't have to", 'must/must not/have to', '明日でいい → don\'t have to。'],
    ['Students ___ hand in their essays by Friday.', 'must', "don't have to/mustn't/needn't", '締め切り → must。'],
    ["We ___ hurry. We have plenty of time.", "don't need to", 'must/have to/must not', '時間がある → don\'t need to。'],
    ["You ___ tell anyone. It's a secret.", 'must not', "don't have to/have to/should", '秘密 → must not（言ってはいけない）。'],
  ]);
  const CONTR = [['it was raining', 'the rain', 'we went for a walk'], ['she was tired', 'her tiredness', 'she kept working'], ['the tickets were expensive', 'the high price of the tickets', 'the concert sold out'], ['he had little experience', 'his lack of experience', 'he got the job'], ['the traffic was heavy', 'the heavy traffic', 'we arrived on time'], ['the film had bad reviews', 'the bad reviews', 'it was a big hit'], ['she is very rich', 'her wealth', 'she lives simply'], ['the team played well', 'their good performance', 'they lost the match'], ['it was cold', 'the cold weather', 'the children played outside'], ['he studied hard', 'all his hard work', 'he failed the exam'], ['the shop was small', 'its small size', 'it had everything we needed'], ['the plan was risky', 'the risks', 'the company went ahead']];
  function gContr(r) {
    const [c, n, m] = pk(r, CONTR);
    if (r() < .5) { const a = pk(r, ['Although', 'Even though']); return item(`___ ${c}, ${m}.`, a, ['Despite', 'In spite of', 'However'], '後ろが文（主語＋動詞）→ Although / Even though。', '譲歩'); }
    const a = pk(r, ['Despite', 'In spite of']); return item(`___ ${n}, ${m}.`, a, ['Although', 'Even though', 'However'], '後ろが名詞 → Despite / In spite of。', '譲歩');
  }
  const COND1 = B('条件文', '', [
    ['If it ___ tomorrow, we will cancel the picnic.', 'rains', 'will rain/rained/would rain', 'if の中は未来でも現在形。'],
    ['If you study hard, you ___ the exam.', 'will pass', 'would pass/passed/pass', 'ありえる未来 → will ＋原形。'],
    ['If she ___ me, I will tell her the news.', 'calls', 'will call/called/would call', 'if の中は現在形。'],
    ['If you heat ice, it ___.', 'melts', 'will melted/melted/would melt', '一般的な事実 → 現在形。'],
    ['I ___ you if I need help.', 'will call', 'would call/called/am calling', '現実の条件 → will。'],
    ['If I ___ rich, I would buy a house by the sea.', 'were', 'am/will be/would be', '今の現実と違う想像 → were。'],
    ['If I had more time, I ___ learn the piano.', 'would', 'will/can/am', '仮定法過去 → would ＋原形。'],
    ['If he ___ harder, he would get better grades.', 'studied', 'studies/will study/would study', '仮定法過去 → 過去形。'],
    ['What would you do if you ___ the lottery?', 'won', 'win/will win/would win', '想像 → 過去形 won。'],
    ['If I were you, I ___ apologise.', 'would', 'will/am/did', 'If I were you, I would … の定番。'],
    ['If I ___ about the party, I would have come.', 'had known', 'knew/would know/have known', '過去の事実と違う想像 → had ＋過去分詞。'],
    ['If we had left earlier, we ___ the train.', 'would have caught', 'would catch/will catch/caught', '過去の想像の結果 → would have ＋過去分詞。'],
    ['If she ___ the warning, she would have avoided the accident.', 'had heeded', 'heeded/would heed/has heeded', '過去の想像 → had ＋過去分詞。'],
    ['If I had taken that job, I ___ in London now.', 'would be living', 'would have lived/will live/lived', '過去の想像 → 今の結果（混合条件）。'],
    ['I wish I ___ more money now.', 'had', 'have/will have/would have', '今の願望 → wish ＋過去形。'],
    ['I wish I ___ harder when I was at school.', 'had studied', 'studied/have studied/would study', '過去への後悔 → wish ＋過去完了。'],
  ]);
  const REL = [['The woman ___ lives next door is a doctor.', 'who', 'which/whose/where'], ['I have a friend ___ speaks four languages.', 'who', 'which/where/whose'], ['The man ___ helped me was very kind.', 'who', 'which/whose/what'], ['People ___ exercise regularly live longer.', 'who', 'which/whose/where'], ['The phone ___ I bought last week is broken.', 'which', 'who/whose/where'], ['This is the book ___ changed my life.', 'which', 'who/where/whose'], ['The bus ___ goes to the airport leaves at 9.', 'which', 'who/where/whose'], ['This is the café ___ we first met.', 'where', 'which/who/whose'], ['I visited the town ___ my father grew up.', 'where', 'which/who/what'], ['That\'s the hospital ___ I was born.', 'where', 'which/who/whose'], ['I know a girl ___ father is a pilot.', 'whose', 'who/which/where'], ['He is the writer ___ books are famous worldwide.', 'whose', 'who/which/where'], ['I remember the day ___ we met.', 'when', 'which/where/who'], ['Tokyo, ___ is the capital of Japan, is very crowded.', 'which', 'that/where/who'], ['My sister, ___ lives in Paris, is coming home.', 'who', 'that/which/whose'], ['Prices rose sharply, ___ led to protests.', 'which', 'that/what/it']];
  const RELI = REL.map(([s, a, w]) => item(s, a, w.split('/'), {who: '人を説明 → who。', which: s.includes(', ___') ? 'カンマの後の補足・前の文全体 → which（that は使えない）。' : '物を説明 → which。', where: '場所＋文 → where。', whose: '「その人の〜」→ whose。', when: '時＋文 → when。'}[a], '関係詞'));
  function gReport(r) {
    const s = pk(r, ['He', 'She', 'My boss', 'The teacher', 'Ken']), c = pk(r, ['he was tired', 'she would be late', 'the shop was closed', 'they had finished the work', 'it was raining', 'the train had left']), obj = r() < .5 ? pk(r, ['me', 'us', 'them', 'everyone']) : '';
    return item(`${s} ___ ${obj ? obj + ' ' : ''}that ${c}.`, obj ? 'told' : 'said', obj ? ['said', 'spoke', 'talked'] : ['told', 'spoke', 'talked'], obj ? '人（me など）が続く → told。' : '人が続かない → said。', '話法 say / tell');
  }
  const PASTPERF = B('過去完了', '', [
    ['When we arrived, the film ___ already started.', 'had', 'has/have/was', '到着（過去）より前 → had ＋過去分詞。'],
    ['She realised she ___ her keys at home.', 'had left', 'has left/leaves/was leaving', '気づいた時点より前 → 過去完了。'],
    ['By 2010, the population ___ by 20%.', 'had grown', 'has grown/grows/was grown', 'by ＋過去の時点 → 過去完了。'],
    ['I ___ never seen snow before I went to Canada.', 'had', 'have/was/did', 'カナダに行く前までの経験 → had。'],
    ['When I got to the station, the train ___.', 'had left', 'has left/leaves/is leaving', '着く前に出発済み → had left。'],
    ['He was tired because he ___ all night.', 'had worked', 'has worked/works/is working', '疲れていた（過去）の原因はさらに前。'],
  ]);
  const MODALPERF = B('助動詞＋完了', '', [
    ['The ground is wet. It ___ rained.', 'must have', 'should have/can\'t have/must', '確信「〜したにちがいない」→ must have。'],
    ['I failed. I ___ studied harder.', 'should have', 'must have/can\'t have/may', '後悔 → should have。'],
    ["She ___ seen me. I was hiding.", "can't have", 'must have/should have/might', 'ありえない → can\'t have。'],
    ["He's late. He ___ missed the bus.", 'might have', 'should have/must/can\'t', '可能性 → might have。'],
    ['You ___ told me earlier!', 'should have', 'must have/can have/might', '非難・後悔 → should have。'],
    ['The lights are off. They ___ gone to bed.', 'must have', 'should have/can\'t have/must', '確信 → must have。'],
  ]);
  const INV = B('倒置', '', [
    ['Never ___ such a beautiful view.', 'have I seen', 'I have seen/I saw/seen I have', '否定語文頭 → 疑問文の語順。'],
    ['Not only ___ cheap, but it is also fast.', 'is it', 'it is/it was/does it', 'Not only の後は倒置。'],
    ['Rarely ___ late for work.', 'is he', 'he is/he does be/does he', 'Rarely 文頭 → 倒置。'],
    ['___ I known, I would have helped.', 'Had', 'Have/If/Were', 'If I had known の倒置。'],
    ['___ you need any help, please call me.', 'Should', 'Would/Had/Did', 'If you should need の倒置。'],
    ['Only after the meeting ___ the truth.', 'did I learn', 'I learned/I did learn/learned I', 'Only after … 文頭 → 倒置。'],
    ['No sooner had we sat down ___ the phone rang.', 'than', 'when/then/that', 'No sooner … than。'],
    ['Hardly had the game started ___ it began to rain.', 'when', 'than/then/that', 'Hardly … when。'],
  ]);
  const SUBJV = B('仮定法現在', '', [
    ['The doctor recommended that he ___ smoking.', 'stop', 'stops/stopped/to stop', '提案・推奨の that 節 → 原形。'],
    ['It is essential that every student ___ on time.', 'be', 'is/are/was', 'essential that → 原形 be。'],
    ['She insisted that he ___ immediately.', 'leave', 'leaves/left/to leave', 'insist that → 原形。'],
    ['I suggest that she ___ a lawyer.', 'consult', 'consults/consulted/consulting', 'suggest that → 原形。'],
    ['They demanded that the law ___ changed.', 'be', 'is/was/being', 'demand that → 原形 be。'],
    ["It's high time we ___ action.", 'took', 'take/taking/will take', "It's time ＋過去形。"],
  ]);
  const HEDGE = B('ヘッジ・名詞化', '', [
    ['People who exercise regularly ___ live longer.', 'tend to', 'are always/must/definitely', '断定を避ける → tend to。'],
    ['It ___ be argued that zoos are no longer necessary.', 'could', 'must/will/shall', 'It could be argued that … の定番。'],
    ['There has been a sharp ___ in unemployment.', 'rise', 'rose/rising/risen', '冠詞＋形容詞の後 → 名詞。'],
    ['The ___ of the internet changed communication.', 'development', 'develop/developed/developing', 'the ___ of → 名詞。'],
    ['A ___ of sleep can affect concentration.', 'lack', 'lacking/lacked/lacks', 'a ___ of → 名詞。'],
    ['This is ___ the most serious problem we face.', 'arguably', 'arguable/argue/argument', '形容詞句を修飾 → 副詞。'],
    ['The increase ___ prices surprised everyone.', 'in', 'of/on/at', '増減の名詞 ＋ in。'],
  ]);
  const COHESION = B('結束表現', '', [
    ['Prices rose by 20%. ___ increase was the largest in a decade.', 'This', 'It/That is/These', '単数の名詞を指す → This ＋名詞。'],
    ['Tea and coffee are popular; ___ contains more caffeine.', 'the latter', 'the last/latter/the later', '後者 → the latter。'],
    ['___ policies are unlikely to succeed.', 'Such', 'Such a/So/This', '複数名詞 → Such。'],
    ['Cars and bicycles are common; ___ are cheaper to run.', 'the latter', 'the latters/the later/latter', '後者（bicycles）→ the latter。'],
  ]);
  const REG = B('文体', '', [
    ['(Formal) The event has been ___ due to bad weather.', 'postponed', 'put off/called off later/pushed back off', 'フォーマル → 1語の動詞 postpone。'],
    ['(Formal) I would be ___ if you could send me the details.', 'grateful', 'thankful you/happy for/glad of', 'I would be grateful if … の定番。'],
    ['(Formal) I am writing to ___ about the vacancy.', 'enquire', 'ask a question/wanna ask/check out', 'フォーマルな問い合わせ → enquire。'],
    ['(Informal) ___ coming to the cinema tonight?', 'Fancy', 'Would you be grateful/I request you/Should you', '友人を誘う → Fancy …?'],
  ]);

  const PARTC = B('分詞構文', '', [
    ['___ in 1900, the bridge is still in use.', 'Built', 'Building/Having built/To build', '橋は「建てられた」側 → 過去分詞。'],
    ['___ the email, she realised she had made a mistake.', 'Reading', 'Read by/Been read/To reading', '彼女が「読む」側 → -ing。'],
    ['___ by the noise, the baby started crying.', 'Frightened', 'Frightening/Frighten/Having frightening', '赤ちゃんは「怖がらされた」側 → 過去分詞。'],
    ['___ finished her homework, she went out.', 'Having', 'Have/Had/Being', '先に終わったこと → Having ＋過去分詞。'],
    ['___ from the top, the city looks beautiful.', 'Seen', 'Seeing/Saw/See', '街は「見られる」側 → 過去分詞。'],
    ['___ that it was late, we took a taxi.', 'Realising', 'Realised/Realise/Having realise', '私たちが「気づく」側 → -ing。'],
    ['Not ___ what to do, I called my mother.', 'knowing', 'known/know/to knowing', '否定の分詞構文は Not ＋ -ing。'],
    ['___ in simple English, the book is easy to read.', 'Written', 'Writing/Wrote/Having writing', '本は「書かれた」側 → 過去分詞。'],
    ['___ with last year, sales have doubled.', 'Compared', 'Comparing/Compare/To compare', '売上は「比べられる」側 → Compared with。'],
    ['___ at the graph, we can see a clear upward trend.', 'Looking', 'Looked/Look/To looked', '私たちが「見る」側 → -ing。'],
  ]);
  const FUTPERF = B('未来完了・未来進行', '', [
    ['By 2030, the company ___ 100 new stores.', 'will have opened', 'will open by/opens/has opened', 'by ＋未来の時点 → 未来完了。'],
    ['This time tomorrow, I ___ to London.', 'will be flying', 'will have flown/fly/am fly', '未来の時点で進行中 → 未来進行。'],
    ['By the time you arrive, we ___ dinner.', 'will have finished', 'will finish/finished/have finished', 'その時点までに完了 → 未来完了。'],
    ["Don't call at 9. I ___ a meeting then.", 'will be having', 'will have had/have/am have', '9時に進行中 → 未来進行。'],
    ['By the end of this year, I ___ here for a decade.', 'will have worked', 'will work/work/have worked', '期間＋by 未来 → 未来完了。'],
    ['By 2050, sea levels ___ significantly.', 'will have risen', 'will rise up/rises/have risen', '予測グラフの定番 → 未来完了。'],
  ]);
  const CLEFT = B('強調構文・名詞節', '', [
    ['It was in Paris ___ they first met.', 'that', 'which/where it/what', 'It is … that の強調。'],
    ['___ I need is a long holiday.', 'What', 'That/Which/It', 'What … is の形。'],
    ['It is the government ___ should take action.', 'that', 'what/where/how', '主語を強調 → that。'],
    ['___ surprised me most was the price.', 'What', 'That/Which/It', '「〜したこと」→ What。'],
    ['The reason I chose IELTS ___ that it is widely accepted.', 'is', 'because/was because/for', 'The reason … is that …。'],
    ['All you need ___ a passport.', 'is', 'are/be/have', 'All … is …（必要なのは〜だけ）。'],
    ['It was only when I moved abroad ___ I understood my own culture.', 'that', 'when/which/what', 'It was only when … that …。'],
    ['___ we will win is uncertain.', 'Whether', 'That if/If it/What', '主語になる名詞節 → Whether。'],
    ['I agree with the idea ___ education should be free.', 'that', 'which/what/whether', '内容を説明する同格の that。'],
    ['There is evidence ___ sugar affects mood.', 'that', 'which/what/whether', '同格の that（後ろは完全な文）。'],
  ]);
  const THECOMP = B('the 比較級, the 比較級', '', [
    ['The more you practise, the ___ you become.', 'better', 'good/best/more good', 'the 比較級, the 比較級（〜すればするほど…）。'],
    ['The ___ you leave, the earlier you will arrive.', 'sooner', 'soon/soonest/more soon', '比較級 sooner。'],
    ['The older he gets, the ___ he becomes.', 'wiser', 'wise/wisest/more wise', '比較級 wiser。'],
    ['The more people use cars, the ___ the air becomes.', 'dirtier', 'dirty/dirtiest/more dirty', '比較級 dirtier。'],
    ['The ___ the question, the longer the answer.', 'harder', 'hard/hardest/more hard', '比較級 harder。'],
    ['The ___ you read, the more you learn.', 'more', 'most/much/many', 'the more …, the more …。'],
  ]);
  const NUANCE = B('助動詞のニュアンス', '', [
    ['You ___ brought food. There was plenty.', "needn't have", "mustn't have/shouldn't/can't have", "しなくてよかったのに → needn't have。"],
    ['As children, we ___ spend hours by the river.', 'would', 'will/should/must', '過去の習慣（動作）→ would。'],
    ['The last train has gone. We ___ as well walk.', 'might', 'should/must/can', 'might as well（〜したほうがまし）。'],
    ['Prices may ___ rise again next year.', 'well', 'good/better/much', 'may well（十分ありうる）。'],
    ['He is bound ___ late; he always is.', 'to be', 'be/being/to being', 'be bound to（きっと〜する）。'],
    ['I ___ to live in Kobe when I was young.', 'used', 'would/was used/use', '過去の状態 → used to（would は使えない）。'],
    ["You ___ have worried. Everything was fine.", "needn't", "mustn't/couldn't/wouldn't", "心配する必要はなかった → needn't have。"],
  ]);
  const ELLIP = B('省略と代用', '', [
    ['A: Will it rain tomorrow? B: I hope ___.', 'not', "no/don't/so not", '「そうならないといい」→ I hope not。'],
    ["I can't swim. — ___ can I.", 'Neither', 'So/Either/Nor I', '否定への同意 → Neither can I。'],
    ['I love jazz. — So ___ I.', 'do', 'am/does/love', '一般動詞への同意 → So do I。'],
    ['He earns more than I ___.', 'do', 'am/does/earn it', '比較の後の代用 → do。'],
    ['If you want to leave early, you may do ___.', 'so', 'it so/that/this', 'do so（そうする）。'],
    ['These shoes are too small. Do you have bigger ___?', 'ones', 'one/it/them', '複数の代用 → ones。'],
    ["A: Is it true? B: I'm afraid ___.", 'so', 'yes/it/that', "I'm afraid so（残念ながらそうだ）。"],
    ['She can speak French, and ___ can her brother.', 'so', 'too/also/either', 'and so can …（〜もそうだ）。'],
  ]);
  const PASSMOD = [['All applications', 'submit', 'submitted', 'by Friday', 'must'], ['Plastic waste', 'reduce', 'reduced', 'as soon as possible', 'should'], ['These rules', 'follow', 'followed', 'at all times', 'must'], ['The data', 'check', 'checked', 'again before publication', 'should'], ['Tickets', 'buy', 'bought', 'online', 'can'], ['The problem', 'solve', 'solved', 'quite easily', 'could'], ['Smoking', 'ban', 'banned', 'in all public places', 'should'], ['The old stadium', 'demolish', 'demolished', 'next year', 'will'], ['More houses', 'build', 'built', 'in the suburbs', 'should'], ['The results', 'publish', 'published', 'next month', 'will']];
  function gPassMod(r) { const [o, b, pp, t, m] = pk(r, PASSMOD); return item(`${o} ${m} ___ ${t}.`, 'be ' + pp, [pp, 'be ' + b, 'been ' + pp], `${o} は「〜される」側。助動詞の後は be ＋ 過去分詞。`, '助動詞＋受動態'); }
  const fromDrill = (k, tag) => r => { const list = window.DRILL?.[k]; if (!list?.length) return gComp(r); const it = pk(r, list); return item(it.q, it.a, it.wrong, it.tip, tag); };
  const gForm = fromDrill('FORM', '品詞（TOEIC型）'), gColl = fromDrill('COLL', 'コロケーション');
  INV.push(...B('倒置', '', [
    ['Seldom ___ such dedication.', 'have I seen', 'I have seen/I saw/seen have I', 'Seldom 文頭 → 倒置。'],
    ['Under no circumstances ___ the door.', 'should you open', 'you should open/you open/open you', '否定の句が文頭 → 倒置。'],
    ['Little ___ that he was being watched.', 'did he know', 'he knew/he did know/knew he', 'Little 文頭 → did ＋主語＋原形。'],
    ['Not until I got home ___ I had lost my wallet.', 'did I realise', 'I realised/I did realise/realised I', 'Not until … 文頭 → 倒置。'],
    ['So difficult ___ that nobody passed.', 'was the exam', 'the exam was/did the exam/the exam is', 'So ＋形容詞 文頭 → 倒置。'],
    ['Only then ___ the seriousness of the situation.', 'did we understand', 'we understood/we did understand/understood we', 'Only then 文頭 → 倒置。'],
    ['Were I in your position, I ___ the offer.', 'would accept', 'will accept/accepted/accept', 'Were I … = If I were … → would。'],
    ['___ it not been for your help, I would have failed.', 'Had', 'If/Were/Has', 'Had it not been for … ＝ もし〜がなかったら。'],
    ['Scarcely had I closed my eyes ___ the alarm went off.', 'when', 'than/then/that', 'Scarcely … when。'],
  ]));
  SUBJV.push(...B('仮定法', '', [
    ['The committee proposed that the meeting ___ postponed.', 'be', 'is/was/being', 'propose that → 原形 be。'],
    ['It is vital that she ___ the medicine every day.', 'take', 'takes/took/taking', 'vital that → 原形。'],
    ['They requested that all guests ___ by 10 pm.', 'leave', 'leaves/left/leaving', 'request that → 原形。'],
    ['He talks as if he ___ the boss.', 'were', 'is being/be/will be', 'as if ＋仮定法過去。'],
    ["I'd rather you ___ smoke in here.", "didn't", "don't/won't/not", "I'd rather ＋人＋過去形。"],
    ['If only I ___ listened to your advice.', 'had', 'have/would/did', '過去への後悔 → If only ＋過去完了。'],
    ['Suppose you ___ the lottery, what would you do?', 'won', 'win/will win/had win', 'Suppose ＋仮定法過去。'],
  ]));
  HEDGE.push(...B('ヘッジ・名詞化', '', [
    ['These results ___ to suggest a link between diet and mood.', 'appear', 'appears/appearing/is appearing', 'appear to（〜のようだ）。主語は複数。'],
    ['It is widely ___ that exercise reduces stress.', 'accepted', 'accept/accepting/acceptance', 'It is widely accepted that …。'],
    ['This ___ lead to higher costs in the long term.', 'may', 'must surely/will certainly/is', '断定を避ける → may。'],
    ["The government's ___ to act has been criticised.", 'failure', 'fail/failed/failing', '所有格の後 → 名詞。'],
    ['There is growing ___ that the climate is changing.', 'evidence', 'evident/evidently/evidences', '形容詞 growing の後 → 名詞（数えられない）。'],
    ['The ___ of public transport would reduce congestion.', 'improvement', 'improve/improved/improving', 'the ___ of → 名詞。'],
    ['Their ___ to the problem was surprisingly simple.', 'solution', 'solve/solved/solving', '所有格の後 → 名詞。'],
  ]));
  COHESION.push(...B('結束表現', '', [
    ['Many cities have banned cars. ___ measures have reduced pollution.', 'These', 'This/That/It', '複数の名詞を指す → These。'],
    ['Some people prefer cities; ___ prefer the countryside.', 'others', 'another/the other/other', 'Some …; others …。'],
    ['The first option is cheaper. The second, ___, is faster.', 'however', 'but/although/despite', '文中に挟む逆接 → however。'],
    ['The plan is expensive. ___, it may not work.', 'Moreover', 'However/Despite/Although', '追加 → Moreover。'],
    ['Cars pollute the air. ___, they are very convenient.', 'Nevertheless', 'Therefore/Moreover/Because', '逆接 → Nevertheless。'],
  ]));
  REG.push(...B('文体', '', [
    ['(Formal) We regret to ___ you that your application was unsuccessful.', 'inform', 'tell/let know/say', 'フォーマル → inform。'],
    ['(Formal) Please ___ attached the requested document.', 'find', 'look/see at/check out', 'Please find attached … の定番。'],
    ['(Formal) The company will ___ the complaint.', 'investigate', 'look into it/check out/find out', '句動詞より1語の動詞。'],
    ['(Formal) I look forward to ___ from you.', 'hearing', 'hear/heard/be hearing', 'look forward to ＋ -ing。'],
    ['(Formal) ___ you require further assistance, please contact us.', 'Should', 'Would/Did/Had', 'Should you … の定番。'],
    ['(Informal) Thanks a ___ for your help!', 'lot', 'many/much/plenty', 'Thanks a lot!'],
  ]));

  /* ---------- which generators belong to which unit / level ---------- */
  const GEN = {
    'a1-be': [gBe], 'a1-present': [gPres], 'a1-plural': [gArt, gCount], 'a1-pronoun': [gPron], 'a1-prog': [gProg], 'a1-imp': [],
    'a2-past': [gPast], 'a2-compare': [gComp], 'a2-inf': [gVP], 'a2-gerund': [gVP], 'a2-modal': [MODAL], 'a2-conj': [COND1.slice(0, 5)], 'a2-there': [gThere],
    'b1-perfect': [gPerf], 'b1-passive': [gPass], 'b1-relative': [RELI.slice(0, 13)], 'b1-cond': [COND1.slice(0, 10)], 'b1-perfprog': [gPerf],
    'b2-pastperf': [PASTPERF], 'b2-partclause': [PARTC], 'c1-futureperf': [FUTPERF], 'c1-cleft': [CLEFT], 'c1-nounphrase': [CLEFT.slice(7)], 'c1-nonfinite': [gPassMod], 'c2-modalnuance': [NUANCE], 'c2-ellipsis': [ELLIP], 'c2-fronting': [THECOMP], 'b2-third': [COND1.slice(10)], 'b2-relclause': [RELI.slice(10)], 'b2-contrast': [gContr], 'b2-reported': [gReport], 'b2-modalperf': [MODALPERF], 'b2-nominal': [HEDGE.slice(2)],
    'c1-inversion': [INV], 'c1-advcond': [INV.slice(3, 5), SUBJV.slice(5)], 'c1-hedging': [HEDGE], 'c1-cohesion': [COHESION],
    'c2-subjunctive': [SUBJV], 'c2-nosooner': [INV.slice(6)], 'c2-register': [REG],
  };
  const LEVEL_GEN = {
    A1: [gBe, gPres, gArt, gCount, gPron, gProg, gTime],
    A2: [gPast, gComp, gVP, MODAL, gThere, gTime, gCount, gProg],
    B1: [gPerf, gPass, RELI.slice(0, 13), COND1.slice(0, 10), gVP, gComp, gForm, gPast],
    B2: [PASTPERF, COND1.slice(10), gContr, gReport, MODALPERF, RELI, gPass, HEDGE.slice(2), PARTC, gPassMod, gForm, gColl, gPerf],
    C1: [INV, HEDGE, COHESION, SUBJV.slice(5), COND1.slice(10), MODALPERF, FUTPERF, CLEFT, THECOMP, PARTC, gPassMod, gColl],
    C2: [SUBJV, INV, REG, COHESION, HEDGE, NUANCE, ELLIP, CLEFT, THECOMP, FUTPERF],
  };
  const fromSource = (r, src) => typeof src === 'function' ? src(r) : pk(r, src);

  /* ---------- formats: the same core item asked in different ways ---------- */
  const blank = s => esc(s).replace('___', '<b>＿＿＿</b>');
  const fill = (s, x) => s.replace('___', x);
  function asQuestion(r, it, unitTitle) {
    const tag = it.tag || unitTitle, full = fill(it.s, it.a), m = r();
    if (m < .5 || !it.w.length) return {type: 'mc', tag, lead: '空欄に入るのは？', prompt: blank(it.s), opts: sh(r, [it.a, ...it.w]), ans: it.a, why: it.why, full};
    if (m < .75 || it.w.length < 2) {
      const okVer = r() < .5, shown = okVer ? full : fill(it.s, pk(r, it.w));
      return {type: 'mc', tag, lead: 'この文は文法的に正しい？', prompt: esc(shown), opts: ['正しい', '誤りがある'], ans: okVer ? '正しい' : '誤りがある', why: (okVer ? '' : `正しくは「${full}」。`) + it.why, full, ja: true};
    }
    const bad = pk(r, it.w), shown = esc(it.s).replace('___', `<u style="text-decoration-color:var(--bad);text-decoration-thickness:2px">${esc(bad)}</u>`);
    return {type: 'mc', tag, lead: '下線部の誤りを直すと？', prompt: shown, opts: sh(r, [it.a, ...it.w.filter(x => x !== bad)]), ans: it.a, why: it.why, full};
  }

  /* ---------- extra formats from a unit's own content ---------- */
  function fromUnit(r, g, all) {
    const out = [];
    g.q.forEach(([s, a, w, why]) => out.push(() => asQuestion(r, item(s, a, w.split(',').map(x => x.trim()), why, g.title), g.title)));
    const sentence = s => /^[A-Z][^／]*[.?!]$/.test(s) && !s.includes('...');
    g.trap.filter(([x, o]) => sentence(x.replace(/^×\s*/, '').replace(/（.*?）$/, '')) && sentence(o.replace(/^○\s*/, ''))).forEach(([x, o, why]) => out.push(() => ({type: 'mc', tag: g.title, lead: '正しい文はどれ？', prompt: '', opts: sh(r, [o.replace(/^○\s*/, ''), x.replace(/^×\s*/, '').replace(/（.*?）$/, '')]), ans: o.replace(/^○\s*/, ''), why, full: o.replace(/^○\s*/, '')})));
    g.ex.forEach(([en, ja]) => {
      const others = sh(r, all.filter(x => x.lv === g.lv && x.id !== g.id).flatMap(x => x.ex.map(e => e[1]))).slice(0, 3);
      out.push(() => ({type: 'mc', tag: g.title, lead: 'この英文の意味は？', prompt: esc(en), opts: sh(r, [ja, ...others]), ans: ja, full: en, ja: true}));
      out.push(() => ({type: 'mc', tag: g.title, lead: '音声を聞いて、意味を選んでください', prompt: `<button class="btn primary" data-act="say" data-text="${esc(en)}">${ICON.speak}再生</button> <button class="btn" data-act="say" data-text="${esc(en)}" data-slow="1">${ICON.slow}ゆっくり</button>`, opts: sh(r, [ja, ...others]), ans: ja, full: en, ja: true}));
      const toks = en.replace(/[.!?]$/, '').split(/\s+/);
      if (toks.length >= 4 && toks.length <= 12) out.push(() => { let o = sh(r, toks.map((_, i) => i)); if (o.every((v, i) => v === i)) o = o.reverse(); return {type: 'order', tag: g.title, ja: `「${ja}」`, tokens: o.map(i => toks[i]), answer: toks.join(' '), full: en}; });
    });
    return out;
  }

  window.GRAMMAR_BANK = {
    // course unit practice: generated + unit-derived formats, plus the unit's written questions at the end
    unit(g, n = 10, r = Math.random) {
      const all = window.GRAMMAR || [], derived = fromUnit(r, g, all), gens = GEN[g.id] || [];
      const qs = [], seen = new Set();
      for (let t = 0; qs.length < n - g.w.length && t < 80; t++) {
        const q = gens.length && r() < .55 ? asQuestion(r, fromSource(r, pk(r, gens)), g.title) : pk(r, derived)();
        const k = (q.prompt || '') + (q.ans || q.answer); if (seen.has(k)) continue; seen.add(k); qs.push(q);
      }
      return [...qs, ...g.w.map(([ja, model, alts]) => ({type: 'write', tag: g.title, ja, model, alts: (alts || '').split('|').map(x => x.trim()).filter(Boolean), hint: g.title.replace(/（.*?）/g, '') + ' を使って'}))];
    },
    // level-wide grammar questions (part practice, tests)
    level(L, n = 10, r = Math.random) {
      const all = window.GRAMMAR || [], units = all.filter(g => g.lv === L), gens = LEVEL_GEN[L] || [], qs = [], seen = new Set();
      for (let t = 0; qs.length < n && t < n * 10; t++) {
        let q;
        if (gens.length && r() < .65) q = asQuestion(r, fromSource(r, pk(r, gens)), '文法');
        else { const g = pk(r, units); if (!g) continue; const [s, a, w, why] = pk(r, g.q); q = asQuestion(r, item(s, a, w.split(',').map(x => x.trim()), why, g.title), g.title); }
        const k = q.prompt + q.ans; if (seen.has(k)) continue; seen.add(k); qs.push(q);
      }
      return qs;
    },
    // rough count of distinct core sentences a level can produce (for the UI)
    estimate(L) { const r = Math.random, set = new Set(); (LEVEL_GEN[L] || []).forEach(src => { for (let i = 0; i < 400; i++) { const it = fromSource(r, src); set.add(it.s + it.a); } }); return set.size; },
  };
})();
