import { readdir, writeFile } from 'node:fs/promises'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const files = await readdir(dist, { recursive: true, withFileTypes: true })
const urls = files.filter(f => f.isFile() && f.name !== 'sw.js')
  .map(f => '/' + relative(dist, resolve(f.parentPath, f.name)).replaceAll('\\', '/'))
await writeFile(resolve(dist, 'sw.js'), `
const CACHE = 'hzgftech-${Date.now()}';
const FILES = ${JSON.stringify(urls)};
function resolvePath(pathname) {
  if (pathname === '/' || pathname === '/index') return '/index.html';
  const trimmed = pathname.replace(/\\/+$/, '');
  if (FILES.includes(trimmed)) return trimmed;
  if (FILES.includes(trimmed + '.html')) return trimmed + '.html';
  return pathname;
}
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('hzgftech-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;
  const path = resolvePath(url.pathname);
  const known = FILES.includes(path);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || (event.request.mode !== 'navigate' && !known)) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && known) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(path, copy))); }
    return response;
  }).catch(async () => {
    const cached = known ? await caches.match(path, { ignoreVary: true }) : undefined;
    if (cached) return cached;
    return new Response('当前离线，文件尚未缓存。', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
  }));
});
`)
console.log(`离线缓存已生成：${urls.length} 个文件。`)
