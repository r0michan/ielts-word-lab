// Offline support: always try the network first (so updates show at once) and fall back to the cache when offline.
const CACHE = 'ielts-word-lab-v29';
const FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "data/a1.js", "data/a2a.js", "data/a2b.js", "data/b1a.js", "data/b1b.js", "data/b1c.js", "data/b2a.js", "data/b2b.js", "data/b2c.js", "data/b2d.js", "data/b2e.js", "data/c1a.js", "data/c1b.js", "data/c1c.js", "data/c2.js", "data/core.js", "data/countries.js", "data/drills.js", "data/drills2.js", "data/expressions.js", "data/japan.js", "data/lessons.js", "data/listening.js", "data/listening2.js", "data/listening3.js", "data/models-apply.js", "data/models-t1.js", "data/models-t2a.js", "data/models-t2b.js", "data/more-practice.js", "data/reading.js", "data/reading2.js", "data/reading3.js", "data/sentences.js", "data/sentences2.js", "data/speaking-models.js", "data/speaking2.js", "data/w2-advanced.js", "data/w2-general-a.js", "data/w2-general-b.js", "data/w2-topics.js", "data/writing.js", "js/drills.js", "js/exams.js", "js/tests.js", "js/shell.js", "js/path.js", "js/course.js", "js/situations.js", "data/situations1.js", "data/situations2.js", "data/situations3.js", "data/situations4.js", "data/situations5.js", "data/situations_hear.js", "data/situ_var1.js", "data/situ_var2.js", "data/situ_var3.js", "data/situ_var4.js", "data/situ_var5.js", "js/gbank.js", "js/sfx.js", "data/grammar1.js", "data/grammar2.js", "css/shell.css", "js/expressions.js", "js/extras.js", "js/home.js", "js/images.js", "js/lessons.js", "js/mock.js", "js/mouth.js", "js/notes.js", "js/progress.js", "js/skills.js"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, {ignoreSearch: true})));
});
