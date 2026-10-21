"""Content checks for IELTS単語ラボ data files. Run: python tools/check_data.py"""
import glob, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
POS = {'n', 'v', 'adj', 'adv', 'prep', 'conj', 'det', 'phr'}
TAGS = {'daily', 'city', 'travel', 'work', 'edu', 'health', 'env', 'tech', 'soc', 'econ', 'gov', 'acad'}
IPA_OK = set("pbtdkgɡfvθðszʃʒhmnŋlrwjiɪeæʌɑɒɔʊuɜəaoɐɛʔɫɾ" + "ːˈˌ.() ‿̃ʲ")
LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']


def words():
    out = []
    for fn in sorted(glob.glob(os.path.join(ROOT, 'data', '*.js'))):
        s = open(fn, encoding='utf-8').read()
        for lv, body in re.findall(r"\['(A1|A2|B1|B2|C1|C2)', `(.*?)`\]", s, re.S):
            for line in body.strip().split('\n'):
                if line.strip():
                    out.append((os.path.basename(fn), lv, line))
    return out


def forms(w):
    b = w.lower()
    f = {b, b + 's', b + 'es', b + 'ed', b + 'd', b + 'ing', b + 'ly', b + 'er', b + 'ers', b + 'est'}
    if b.endswith('e'): f |= {b[:-1] + 'ing', b[:-1] + 'ed'}
    if b.endswith('y'): f |= {b[:-1] + 'ies', b[:-1] + 'ied', b[:-1] + 'ily'}
    if re.search(r'[^aeiou][aeiou][bdgmnprt]$', b): f |= {b + b[-1] + 'ed', b + b[-1] + 'ing', b + b[-1] + 'er'}
    if b.endswith('fe'): f.add(b[:-2] + 'ves')
    if b.endswith('f'): f.add(b[:-1] + 'ves')
    return f


IRREG = {'go': 'went gone', 'buy': 'bought', 'eat': 'ate eaten', 'feel': 'felt', 'find': 'found', 'fly': 'flew flown', 'give': 'gave given', 'grow': 'grew grown',
         'hold': 'held', 'keep': 'kept', 'know': 'knew known', 'lead': 'led', 'leave': 'left', 'lend': 'lent', 'lose': 'lost', 'make': 'made', 'meet': 'met', 'pay': 'paid',
         'rise': 'rose risen', 'say': 'said', 'see': 'saw seen', 'sell': 'sold', 'send': 'sent', 'sit': 'sat', 'sleep': 'slept', 'speak': 'spoke spoken', 'spend': 'spent',
         'stand': 'stood', 'steal': 'stole stolen', 'swim': 'swam swum', 'take': 'took taken', 'teach': 'taught', 'tell': 'told', 'think': 'thought', 'throw': 'threw thrown',
         'understand': 'understood', 'wake': 'woke woken', 'wear': 'wore worn', 'win': 'won', 'write': 'wrote written', 'begin': 'began begun', 'break': 'broke broken',
         'bring': 'brought', 'build': 'built', 'catch': 'caught', 'choose': 'chose chosen', 'come': 'came', 'cost': 'cost', 'cut': 'cut', 'dig': 'dug', 'draw': 'drew drawn',
         'drink': 'drank drunk', 'drive': 'drove driven', 'fall': 'fell fallen', 'feed': 'fed', 'fight': 'fought', 'forget': 'forgot forgotten', 'forgive': 'forgave forgiven',
         'freeze': 'froze frozen', 'hang': 'hung', 'hear': 'heard', 'hide': 'hid hidden', 'hurt': 'hurt', 'lie': 'lay lain', 'ride': 'rode ridden', 'ring': 'rang rung',
         'run': 'ran', 'seek': 'sought', 'shake': 'shook shaken', 'shine': 'shone', 'shrink': 'shrank shrunk', 'sing': 'sang sung', 'sink': 'sank sunk', 'slide': 'slid',
         'spin': 'spun', 'spit': 'spat', 'spread': 'spread', 'sting': 'stung', 'strike': 'struck', 'swear': 'swore sworn', 'sweep': 'swept', 'swell': 'swelled swollen',
         'swing': 'swung', 'tear': 'tore torn', 'weave': 'wove woven', 'weep': 'wept', 'withdraw': 'withdrew withdrawn', 'bear': 'bore born borne', 'bend': 'bent',
         'bet': 'bet', 'bind': 'bound', 'bite': 'bit bitten', 'blow': 'blew blown', 'burn': 'burnt burned', 'deal': 'dealt', 'dream': 'dreamt', 'feed': 'fed', 'flee': 'fled',
         'forbid': 'forbade forbidden', 'foresee': 'foresaw foreseen', 'kneel': 'knelt', 'lay': 'laid', 'lean': 'leant leaned', 'leap': 'leapt leaped', 'mean': 'meant',
         'overcome': 'overcame', 'overtake': 'overtook', 'seize': 'seized', 'shed': 'shed', 'shoot': 'shot', 'undergo': 'underwent undergone', 'undertake': 'undertook undertaken',
         'uphold': 'upheld', 'outweigh': 'outweighed', 'withhold': 'withheld', 'arise': 'arose arisen', 'become': 'became', 'mislead': 'misled', 'oversee': 'oversaw',
         'person': 'people', 'child': 'children', 'man': 'men', 'woman': 'women', 'foot': 'feet', 'tooth': 'teeth', 'mouse': 'mice', 'life': 'lives', 'wolf': 'wolves',
         'criterion': 'criteria', 'phenomenon': 'phenomena', 'analysis': 'analyses', 'crisis': 'crises', 'hypothesis': 'hypotheses', 'good': 'better best', 'bad': 'worse worst',
         'be': 'is are was were been', 'have': 'has had', 'do': 'does did done'}


def main():
    issues = []
    ws = words()
    seen = {}
    for fn, lv, line in ws:
        f = [x.strip() for x in line.split('|')]
        if len(f) != 6:
            issues.append(('形式', fn, line[:60], f'{len(f)}列（6列が必要）')); continue
        w, pos, ipa, ja, ex, tags = f
        key = w.lower()
        if key in seen: issues.append(('重複', fn, w, f'{seen[key]} と重複'))
        seen.setdefault(key, f'{fn}:{lv}')
        if pos not in POS: issues.append(('品詞', fn, w, pos))
        if not ja: issues.append(('意味なし', fn, w, ''))
        if not ipa: issues.append(('発音記号なし', fn, w, ''))
        bad = sorted({c for c in ipa if c not in IPA_OK})
        if bad: issues.append(('発音記号の文字', fn, w, f'/{ipa}/ に {"".join(bad)}'))
        syl = len(re.findall(r'[iɪeæʌɑɒɔʊuɜəaoɐɛ]+ː?', ipa))
        if syl >= 2 and 'ˈ' not in ipa and ' ' not in w: issues.append(('強勢記号なし', fn, w, f'/{ipa}/'))
        for t in [t for t in re.split(r'[,; ]+', tags) if t]:
            if t not in TAGS: issues.append(('タグ', fn, w, t))
        # headword must appear in its example (allowing inflections, multi-word entries and irregular forms)
        toks = re.findall(r"[a-z][a-z'-]*", ex.lower())
        parts = key.split()
        if len(parts) == 1:
            ok = any(t in forms(key) for t in toks) or any(t in IRREG.get(key, '').split() for t in toks)
            ok = ok or any(t.startswith(key) for t in toks)  # compounds like rainforests
        else:
            ok = all(any(t in forms(p) or t in IRREG.get(p, '').split() or t.startswith(p) for t in toks) for p in parts if len(p) > 2)
        if not ok: issues.append(('例文に見出し語なし', fn, w, ex))
    counts = {lv: sum(1 for fn, l, line in ws if l == lv) for lv in LEVELS}
    # idioms: the bracketed answer must belong to the phrase
    s = open(os.path.join(ROOT, 'data', 'expressions.js'), encoding='utf-8').read() + open(os.path.join(ROOT, 'data', 'more-practice.js'), encoding='utf-8').read()
    for raw in re.findall(r"IDIOM_RAW (?:\+)?= `(.*?)`", s, re.S):
        for line in raw.strip().split('\n'):
            if not line.strip(): continue
            p = line.split('|')
            m = re.search(r'\[([^\]]+)\]', p[3] if len(p) > 3 else '')
            if not m: issues.append(('イディオム空欄なし', 'idioms', p[1] if len(p) > 1 else line, '')); continue
            if m.group(1).lower() not in p[1].lower(): issues.append(('イディオム空欄が表現と不一致', 'idioms', p[1], m.group(1)))
    print(f'単語: {sum(counts.values())}語 {counts}')
    by = {}
    for kind, fn, w, note in issues: by.setdefault(kind, []).append((fn, w, note))
    for kind, items in by.items():
        print(f'\n## {kind}: {len(items)}件')
        for fn, w, note in items[:400]: print(f'  {fn} | {w} | {note}')
    return 1 if issues else 0


if __name__ == '__main__':
    sys.exit(main())
