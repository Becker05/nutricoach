/* Service worker — cache simples para funcionar offline no celular */
const CACHE = 'nutricoach-v3';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './manifest.json',
  './icon-192.png', './icon-512.png',
  './conhecimento/01-persona.md','./conhecimento/02-fluxo-de-atendimento.md',
  './conhecimento/03-anamnese.md','./conhecimento/04-nutricao.md',
  './conhecimento/05-treino.md','./conhecimento/06-banco-de-exercicios.md',
  './conhecimento/07-acompanhamento.md','./conhecimento/08-regras-de-ajustes.md',
  './conhecimento/09-diario.md','./conhecimento/10-evidencias-cientificas.md',
  './conhecimento/11-casos-especiais.md','./conhecimento/12-comunicacao.md',
  './conhecimento/13-sistema-de-evolucao.md','./conhecimento/14-suplementos.md'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
