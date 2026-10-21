/* 表現タブ: regional English (UK / US / AU), casual speech & slang, idiom & preposition tests, spelling differences.
   Loaded after js/extras.js; uses the main script's globals. */
(() => {
  const css = `
  .xgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
  .xcard{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:8px;min-width:0}
  .xcard h3{font-size:15px}
  .xrow{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:8px;align-items:start}
  .xrow .cc{font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--muted);padding-top:4px}
  .xrow .wd{font-family:var(--f-word);font-size:17px;font-weight:700}
  .xrow .sn{font-family:var(--f-word);font-size:14.5px;color:var(--muted)}
  .xnote{font-size:12.5px;color:var(--warn)}
  .xexpr{font-family:var(--f-word);font-size:21px;font-weight:700}
  .xformal{font-size:13.5px}
  .xformal b{font-family:var(--f-word);font-weight:400}
  .xex{font-family:var(--f-word);font-size:15.5px}
  .tags{display:flex;gap:6px;flex-wrap:wrap}
  .warnbox{background:var(--warn-soft);border-radius:10px;padding:10px 14px;font-size:13.5px}
  .spt{width:100%;border-collapse:collapse;font-size:15px}
  .spt td,.spt th{padding:6px 10px;border-bottom:1px solid var(--line);text-align:left}
  .spt td{font-family:var(--f-word)}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- data ---------- */
  const lines = s => (s || '').trim().split('\n').filter(l => l.trim()).map(l => l.split('|').map(x => x.trim()));
  const REG = lines(window.REGION_RAW).map(([cat, ja, uk, us, au, ex, note]) => ({cat, ja, uk, us, au, ex, note}));
  const SPEECH = lines(window.SPEECH_RAW).map(([kind, region, expr, ja, formal, ex, note]) => ({kind, region, expr, ja, formal, ex, note}));
  const IDI = lines(window.IDIOM_RAW).map(([type, phrase, ja, ex]) => {
    const m = ex.match(/\[([^\]]+)\]/);
    return {type, phrase, ja, ex, ans: m ? m[1] : '', plain: ex.replace(/[\[\]]/g, ''), id: type + ':' + ex};
  }).filter(x => x.ans);
  window.IDIOMS = IDI;
  const KIND = {casual: 'くだけた会話', abbr: '口語の短縮', slang: '地域の俗語', net: 'ネットスラング', biz: 'ビジネス略語'};
  const RGN = {all: '共通', UK: 'イギリス', US: 'アメリカ', AU: 'オーストラリア'};
  const LANG = {UK: 'en-GB', US: 'en-US', AU: 'en-AU'};
  const ITYPE = {prep: '前置詞', phrasal: '句動詞', idiom: 'イディオム'};

  /* ---------- speak in a chosen accent ---------- */
  function speakAs(text, lang) {
    if (!('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const all = speechSynthesis.getVoices(), l = lang.toLowerCase();
    const v = all.find(v => v.lang.toLowerCase().replace('_', '-') === l && /natural|online|google/i.test(v.name)) || all.find(v => v.lang.toLowerCase().replace('_', '-') === l);
    if (v) u.voice = v;
    u.lang = lang; u.rate = S.settings.rate;
    speechSynthesis.speak(u);
  }
  const sayAs = (text, rg, label = '') => `<button class="iconbtn" data-act="sayas" data-text="${esc(text)}" data-lang="${LANG[rg] || S.settings.accent}" aria-label="${esc(RGN[rg] || '')}の発音で再生">${ICON.speak}${label}</button>`;

  /* ---------- British → American spelling ---------- */
  const IZE = 'apolog|categor|central|decentral|civil|compartmental|computer|critic|digit|emphas|galvan|general|global|hypothes|incentiv|industrial|jeopard|legal|marginal|material|memor|minim|maxim|mobil|modern|organ|ostrac|polar|priorit|real|recogn|revital|scrutin|social|special|stabil|standard|subsid|summar|urban|util|optim|sympath|final|character|harmon|privat|visual|normal|neutral|author|human|colon|fertil|steril|terror|vandal|patron|symbol|familiar|popular|rational|personal|local|natural|theor|sensational|trivial|victim|agon|item|custom|energ|fantas|monopol|public|democrat|commercial|hospital|immun|national|internation|capital|capital|westerni'.split('|');
  const OUR = 'colo|favo|flavo|hono|humo|labo|neighbo|behavio|harbo|rumo|vigo|rigo|fervo|cando|ranco|demeano|endeavo|savo|odo|vapo|tumo|valo|armo|savio|parlo|splendo|clamo|ardo';
  const WORDMAP = {centre:'center',centres:'centers',metre:'meter',metres:'meters',kilometre:'kilometer',kilometres:'kilometers',litre:'liter',litres:'liters',theatre:'theater',theatres:'theaters',fibre:'fiber',meagre:'meager',sombre:'somber',
    travelled:'traveled',travelling:'traveling',traveller:'traveler',travellers:'travelers',cancelled:'canceled',cancelling:'canceling',counsellor:'counselor',counsellors:'counselors',modelling:'modeling',labelled:'labeled',fuelled:'fueled',gruelling:'grueling',signalled:'signaled',marvellous:'marvelous',jewellery:'jewelry',
    fulfil:'fulfill',fulfils:'fulfills',enrol:'enroll',enrols:'enrolls',enrolment:'enrollment',instil:'instill',distil:'distill',skilful:'skillful',wilful:'willful',
    licence:'license',offence:'offense',offences:'offenses',defence:'defense',pretence:'pretense',programme:'program',programmes:'programs',judgement:'judgment',ageing:'aging',sceptical:'skeptical',scepticism:'skepticism',
    grey:'gray',maths:'math',mum:'mom',tyre:'tire',tyres:'tires',cheque:'check',practise:'practice',practised:'practiced',practising:'practicing',kerb:'curb',cosy:'cozy',plough:'plow',mould:'mold',catalogue:'catalog',
    whilst:'while',amongst:'among',learnt:'learned',spelt:'spelled',aluminium:'aluminum',manoeuvre:'maneuver',paediatric:'pediatric',encyclopaedia:'encyclopedia',anaesthetic:'anesthetic',foetus:'fetus',storey:'story',pyjamas:'pajamas',moustache:'mustache',
    analyse:'analyze',analysed:'analyzed',analysing:'analyzing',catalyse:'catalyze',paralyse:'paralyze',towards:'toward'};
  const keepCase = (src, out) => src[0] === src[0].toUpperCase() ? out[0].toUpperCase() + out.slice(1) : out;
  function toUS(t) {
    return t.replace(/[A-Za-z]+/g, w => {
      const lw = w.toLowerCase();
      if (WORDMAP[lw]) return keepCase(w, WORDMAP[lw]);
      let m = lw.match(new RegExp(`^(${OUR})ur(\\w*)$`));
      if (m) return keepCase(w, m[1] + 'r' + m[2]);
      m = lw.match(/^(\w+?)is(e|es|ed|ing|ation|ations|er|ers)$/);
      if (m && IZE.includes(m[1])) return keepCase(w, m[1] + 'iz' + m[2]);
      return w;
    });
  }
  window.toUS = toUS;
  const SPELL_SEL = '#panel .ex, #panel .sentq, #panel .prompt, #panel .model, #panel .cue, #panel .pitem .en, #panel .passage .tx, #panel .rq .st, #panel .hw, #panel .xex';
  function applySpelling() {
    if (S.spell !== 'us') return;
    document.querySelectorAll(SPELL_SEL).forEach(el => {
      if (el.dataset.sp) return; el.dataset.sp = '1';
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const ns = []; while (w.nextNode()) ns.push(w.currentNode);
      ns.forEach(n => { const v = toUS(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; });
    });
  }
  new MutationObserver(applySpelling).observe(document.getElementById('panel'), {childList: true, subtree: true});

  /* ---------- state ---------- */
  S.iprog = S.iprog || {};
  S.spell = S.spell || 'uk';
  ui.expr = {mode: 'region', cat: 'all', kind: 'all', rg: 'all', itype: 'all', iq: null, rq: null};
  const PREPS = ['in', 'on', 'at', 'for', 'to', 'of', 'with', 'about', 'from', 'by', 'into', 'over'];
  const PARTS = ['up', 'down', 'out', 'off', 'on', 'in', 'over', 'away', 'back', 'through', 'into', 'after', 'for', 'with'];

  /* ---------- views ---------- */
  function vExpr() {
    const x = ui.expr;
    const modes = [['region', '国による違い'], ['speech', '会話・略語・スラング'], ['idiom', 'イディオム・前置詞テスト'], ['spell', '綴りの違い']];
    return `<div class="row"><div class="seg" role="group" aria-label="表現の種類">${modes.map(([k, v]) => `<button data-act="xmode" data-m="${k}" aria-pressed="${x.mode === k}">${v}</button>`).join('')}</div></div>` +
      ({region: vRegion, speech: vSpeech, idiom: vIdiom, spell: vSpell}[x.mode])();
  }
  function vRegion() {
    const x = ui.expr, cats = [...new Set(REG.map(r => r.cat))];
    if (x.rq) return vRegionQuiz();
    const list = REG.filter(r => x.cat === 'all' || r.cat === x.cat);
    const rowFor = (rg, word, ex) => { const first = word.split(' / ')[0]; const s = ex.replace('{w}', first);
      return `<div class="xrow"><span class="cc">${rg}</span><div><div class="wd">${esc(word)}</div><div class="sn xex">${esc(s.charAt(0).toUpperCase() + s.slice(1))}</div></div>${sayAs(s.charAt(0).toUpperCase() + s.slice(1), rg)}</div>`; };
    return `<div class="row"><select id="xcat" aria-label="カテゴリ"><option value="all">すべて（${REG.length}語）</option>${cats.map(c => `<option${x.cat === c ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select>
      <button class="btn primary" data-act="xrquiz">国別クイズ（10問）</button>
      <span class="small muted">同じものでも国で言い方が違います。再生ボタンはその国のアクセントで読み上げます（OSに音声がある場合）。</span></div>
    <div class="xgrid">${list.map(r => `<div class="xcard"><h3>${esc(r.ja)} <span class="tag">${esc(r.cat)}</span></h3>
      ${rowFor('UK', r.uk, r.ex)}${rowFor('US', r.us, r.ex)}${rowFor('AU', r.au, r.ex)}
      ${r.note ? `<span class="xnote">${esc(r.note)}</span>` : ''}</div>`).join('')}</div>`;
  }
  function startRegionQuiz() {
    const regs = ['UK', 'US', 'AU'], key3 = {UK: 'uk', US: 'us', AU: 'au'};
    const pool = REG.filter(r => r.uk !== r.us || r.us !== r.au);
    const qs = shuffle(pool).slice(0, 10).map(r => {
      let from = pick(regs), to = pick(regs.filter(g => g !== from && r[key3[g]] !== r[key3[from]]));
      if (!to) to = regs.find(g => g !== from);
      const others = shuffle(pool.filter(o => o !== r)).slice(0, 3).map(o => o[key3[to]]);
      return {r, from, to, ans: r[key3[to]], opts: shuffle([r[key3[to]], ...others]), pick: null};
    });
    ui.expr.rq = {qs, i: 0, score: 0, done: false};
  }
  function vRegionQuiz() {
    const z = ui.expr.rq;
    if (z.done) return `<div class="sheet panel"><h2>${z.score} / ${z.qs.length} 問正解</h2><div class="row"><button class="btn primary" data-act="xrquiz">もう一度</button><button class="btn" data-act="xrquit">一覧に戻る</button></div></div>`;
    const q = z.qs[z.i], k3 = {UK: 'uk', US: 'us', AU: 'au'}, done = q.pick !== null;
    return `<div class="sheet panel">
      <div class="qhead"><span class="small muted">国別クイズ · ${z.i + 1} / ${z.qs.length}</span><div class="meter"><i style="width:${(z.i + (done ? 1 : 0)) / z.qs.length * 100}%"></i></div></div>
      <p class="small muted">${esc(q.r.ja)}</p>
      <p style="font-size:18px">${RGN[q.from]}で <b class="ex">${esc(q.r[k3[q.from]])}</b> と言うものは、<b>${RGN[q.to]}</b>では？</p>
      <div class="opts">${q.opts.map((o, i) => { let c = 'opt en'; if (done && o === q.ans) c += ' ok'; else if (done && i === q.pick) c += ' ng';
        return `<button class="${c}" data-act="xranswer" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>
      ${done ? `${q.r.note ? `<p class="xnote">${esc(q.r.note)}</p>` : ''}<div class="row">${sayAs(q.r.ex.replace('{w}', q.ans.split(' / ')[0]), q.to, ' 例文')}<button class="btn primary" data-act="xrnext">${z.i + 1 < z.qs.length ? '次へ' : '結果を見る'}</button></div>` : ''}
    </div>`;
  }
  function vSpeech() {
    const x = ui.expr;
    const list = SPEECH.filter(s => (x.kind === 'all' || s.kind === x.kind) && (x.rg === 'all' || s.region === x.rg || (x.rg !== 'all' && s.region === 'all' && false)));
    const chip = (act, val, cur, label) => `<button class="chip" data-act="${act}" data-v="${val}" aria-pressed="${cur === val}" style="font-family:var(--f-ui)">${label}</button>`;
    return `<div class="warnbox"><b>使い分けの注意：</b>ここにある表現は IELTS のライティングでは使いません。スピーキングでは「くだけた会話」の一部（I'm into …, It's not my cup of tea など）は自然に使えますが、略語・スラング・ネット用語は避けましょう。友達との会話・SNS・現地での生活で役立ちます。</div>
    <div class="row"><div class="chips">${chip('xkind', 'all', x.kind, 'すべて')}${Object.entries(KIND).map(([k, v]) => chip('xkind', k, x.kind, v)).join('')}</div></div>
    <div class="row"><div class="chips">${chip('xrg', 'all', x.rg, 'すべての地域')}${['UK', 'US', 'AU'].map(k => chip('xrg', k, x.rg, RGN[k])).join('')}</div><span class="count">${list.length} 件</span></div>
    <div class="xgrid">${list.map(s => `<div class="xcard">
      <div class="row" style="justify-content:space-between"><span class="xexpr">${esc(s.expr)}</span>${sayAs(s.ex && s.ex !== '——' ? s.ex : s.expr, s.region === 'all' ? '' : s.region)}</div>
      <div class="tags"><span class="tag">${KIND[s.kind]}</span><span class="tag">${RGN[s.region]}</span></div>
      <span style="font-weight:700">${esc(s.ja)}</span>
      <span class="xformal">試験・フォーマルでは → <b>${esc(s.formal)}</b></span>
      ${s.ex && s.ex !== '——' ? `<span class="xex">${esc(s.ex)}</span>` : ''}
      ${s.note ? `<span class="small muted">${esc(s.note)}</span>` : ''}</div>`).join('')}</div>`;
  }
  function optionsFor(it) {
    const a = it.ans.toLowerCase();
    let pool;
    if (PREPS.includes(a)) pool = PREPS; else if (PARTS.includes(a)) pool = PARTS;
    else pool = IDI.filter(o => o.type === it.type && !PREPS.includes(o.ans.toLowerCase()) && !PARTS.includes(o.ans.toLowerCase())).map(o => o.ans);
    const others = shuffle([...new Set(pool.filter(o => o.toLowerCase() !== a))]).slice(0, 3);
    return shuffle([it.ans, ...others]);
  }
  function startIdiomQuiz(kind) {
    const x = ui.expr, pool = x.pool || IDI.filter(i => x.itype === 'all' || i.type === x.itype);
    const w = i => (S.iprog[i.id]?.ok || 0) * 2 - (S.iprog[i.id]?.ng || 0) + Math.random() * 2;
    const qs = shuffle(pool).sort((a, b) => w(a) - w(b)).slice(0, 10).map(it => kind === 'blank'
      ? {it, opts: optionsFor(it), ans: it.ans, pick: null}
      : (() => { const others = shuffle(IDI.filter(o => o.ja !== it.ja)).slice(0, 3).map(o => o.ja); return {it, opts: shuffle([it.ja, ...others]), ans: it.ja, pick: null}; })());
    x.iq = {kind, qs, i: 0, score: 0, done: false};
  }
  function vIdiom() {
    const x = ui.expr, z = x.iq;
    const types = `<div class="chips">${[['all', 'すべて'], ...Object.entries(ITYPE)].map(([k, v]) => `<button class="chip" data-act="xitype" data-v="${k}" aria-pressed="${x.itype === k}" style="font-family:var(--f-ui)">${v}</button>`).join('')}</div>`;
    const pool = IDI.filter(i => x.itype === 'all' || i.type === x.itype);
    const learned = pool.filter(i => (S.iprog[i.id]?.ok || 0) > 0).length;
    if (!z) return (x.pool ? `<div class="confirm" style="background:var(--accent-soft)">間違いノートの表現（${x.pool.length}件）から出題します。<button class="btn" data-act="xpoolclear">通常の出題に戻す</button></div>` : '') + `<div class="row">${types}<span class="count">正解したことがある問題 ${learned} / ${pool.length}</span></div>
      <div class="modes">
        <button class="mode" data-act="xiquiz" data-k="blank"><b>空欄テスト</b><span class="muted small">例文の空欄に入る前置詞・副詞・語を選ぶ（depend [on] など）</span></button>
        <button class="mode" data-act="xiquiz" data-k="meaning"><b>意味テスト</b><span class="muted small">表現を見て日本語の意味を選ぶ</span></button>
      </div>
      <div class="sheet"><div class="plist">${pool.map(i => `<div class="pitem">${sayAs(i.plain, '')}<div><span class="pat">${esc(i.phrase)}</span> <span class="tag">${ITYPE[i.type]}</span><div class="en">${esc(i.plain)}</div><div class="jp">${esc(i.ja)}</div></div></div>`).join('')}</div></div>`;
    if (z.done) {
      const wrong = z.qs.filter(q => !q.correct);
      return `<div class="sheet panel"><h2>${z.score} / ${z.qs.length} 問正解</h2>
        ${wrong.length ? `<div class="plist">${wrong.map(q => `<div class="pitem">${sayAs(q.it.plain, '')}<div><span class="pat">${esc(q.it.phrase)}</span><div class="en">${esc(q.it.plain)}</div><div class="jp">${esc(q.it.ja)}</div></div></div>`).join('')}</div>` : '<p>全問正解です。</p>'}
        <div class="row"><button class="btn primary" data-act="xiquiz" data-k="${z.kind}">もう一度</button><button class="btn" data-act="xiquit">メニューに戻る</button></div></div>`;
    }
    const q = z.qs[z.i], done = q.pick !== null;
    const shown = esc(q.it.ex).replace(/\[([^\]]+)\]/, (m, a) => done ? `<b style="color:${q.correct ? 'var(--good)' : 'var(--bad)'}">${a}</b>` : `<span class="blank">&nbsp;?&nbsp;</span>`);
    return `<div class="sheet panel">
      <div class="qhead"><span class="small muted">${z.kind === 'blank' ? '空欄テスト' : '意味テスト'} · ${z.i + 1} / ${z.qs.length}</span><div class="meter"><i style="width:${(z.i + (done ? 1 : 0)) / z.qs.length * 100}%"></i></div><span class="tag">${ITYPE[q.it.type]}</span></div>
      ${z.kind === 'blank' ? `<p class="sentq">${shown}</p><p class="small muted">${esc(q.it.ja)}</p>` : `<p class="hw" style="font-size:clamp(26px,5vw,36px)">${esc(q.it.phrase)}</p><p class="ex">${esc(q.it.plain)}</p>`}
      <div class="opts">${q.opts.map((o, i) => { let c = 'opt' + (z.kind === 'blank' ? ' en' : ''); if (done && o === q.ans) c += ' ok'; else if (done && i === q.pick) c += ' ng';
        return `<button class="${c}" data-act="xianswer" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>
      ${done && window.IMG_SMALL ? IMG_SMALL(q.it.ans) : ''}
      ${done ? `<div class="row"><span class="pat">${esc(q.it.phrase)}</span><span class="small">${esc(q.it.ja)}</span>${sayAs(q.it.plain, '', '')}<button class="btn primary" data-act="xinext">${z.i + 1 < z.qs.length ? '次へ' : '結果を見る'} <kbd>Enter</kbd></button></div>` : ''}
    </div>`;
  }
  function vSpell() {
    const pairs = Object.entries(WORDMAP).filter(([k]) => !/s$|ed$|ing$/.test(k) || ['analysed'].includes(k)).slice(0, 60);
    const rules = [['colour / favour / neighbour', 'color / favor / neighbor', '-our → -or'], ['organise / realise / organisation', 'organize / realize / organization', '-ise → -ize'], ['centre / metre / theatre', 'center / meter / theater', '-re → -er'], ['travelled / cancelled', 'traveled / canceled', '子音字を重ねない'], ['analyse / paralyse', 'analyze / paralyze', '-yse → -yze'], ['licence / defence', 'license / defense', '-ence → -ense']];
    return `<div class="sheet panel" style="gap:10px">
      <b>英文の綴りの表示</b>
      <div class="seg" role="group" aria-label="綴り"><button data-act="xspell" data-v="uk" aria-pressed="${S.spell !== 'us'}">イギリス式（英・豪）</button><button data-act="xspell" data-v="us" aria-pressed="${S.spell === 'us'}">アメリカ式</button></div>
      <p class="small muted">アメリカ式にすると、単語カードの見出しと例文・文トレ・読解・ライティングの英文がアメリカ式の綴りで表示されます。オーストラリアは基本的にイギリス式です。IELTSではどちらの綴りでも正解ですが、1つのエッセイの中では統一しましょう。</p>
    </div>
    <div class="sheet panel"><b>主なルール</b><div class="tablewrap"><table class="spt"><thead><tr><th>イギリス・豪州</th><th>アメリカ</th><th>ルール</th></tr></thead><tbody>${rules.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td style="font-family:var(--f-ui);font-size:13px">${r[2]}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="sheet panel"><b>個別の単語</b><div class="tablewrap"><table class="spt"><thead><tr><th>イギリス・豪州</th><th>アメリカ</th></tr></thead><tbody>${pairs.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div></div>`;
  }

  /* ---------- actions ---------- */
  Object.assign(ACT, {
    sayas: d => speakAs(d.text, d.lang),
    xmode: d => { ui.expr.mode = d.m; render(); },
    xkind: d => { ui.expr.kind = d.v; render(); },
    xrg: d => { ui.expr.rg = d.v; render(); },
    xitype: d => { ui.expr.itype = d.v; render(); },
    xrquiz: () => { startRegionQuiz(); render(); },
    xrquit: () => { ui.expr.rq = null; render(); },
    xranswer: d => { const z = ui.expr.rq, q = z.qs[z.i]; if (q.pick !== null) return; q.pick = +d.i; if (q.opts[q.pick] === q.ans) z.score++; render(); },
    xrnext: () => { const z = ui.expr.rq; if (z.i + 1 >= z.qs.length) z.done = true; else z.i++; render(); },
    xiquiz: d => { startIdiomQuiz(d.k); render(); },
    xiquit: () => { ui.expr.iq = null; render(); },
    xianswer: d => {
      const z = ui.expr.iq, q = z.qs[z.i]; if (q.pick !== null) return;
      q.pick = +d.i; q.correct = q.opts[q.pick] === q.ans; if (q.correct) z.score++;
      const p = S.iprog[q.it.id] || (S.iprog[q.it.id] = {ok: 0, ng: 0}); q.correct ? p.ok++ : p.ng++; save();
      if (q.correct) speakAs(q.it.plain, S.settings.accent);
      render();
    },
    xinext: () => { const z = ui.expr.iq; if (z.i + 1 >= z.qs.length) z.done = true; else z.i++; render(); },
    xpoolclear: () => { ui.expr.pool = null; render(); },
    xspell: d => { S.spell = d.v; save(); render(); },
  });
  document.addEventListener('change', e => { if (e.target.id === 'xcat') { ui.expr.cat = e.target.value; render(); } });
  document.addEventListener('keydown', e => {
    if (S.tab !== 'expr' || e.target.closest('input,textarea,select')) return;
    const z = ui.expr.mode === 'idiom' ? ui.expr.iq : ui.expr.mode === 'region' ? ui.expr.rq : null;
    if (!z || z.done) return;
    const q = z.qs[z.i];
    if (e.key === 'Enter' && q.pick !== null) (ui.expr.mode === 'idiom' ? ACT.xinext : ACT.xrnext)();
    else if (/^[1-4]$/.test(e.key) && q.pick === null) (ui.expr.mode === 'idiom' ? ACT.xianswer : ACT.xranswer)({i: +e.key - 1});
  });

  window.EXTRA_VIEWS = {...(window.EXTRA_VIEWS || {}), expr: vExpr};
  render();
})();
