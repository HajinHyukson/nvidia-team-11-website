import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const root = process.argv.includes('--dist') ? join(projectRoot, 'dist') : projectRoot;
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.json': 'application/json; charset=utf-8' };

createServer(async (req, res) => {
  try {
    let pathname = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname;
    pathname = decodeURIComponent(pathname);
    if (pathname === '/') pathname = '/index.html';
    const target = resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + sep)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    if (!(await stat(target)).isFile()) throw new Error('Not found');
    const bytes = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[extname(target).toLowerCase()] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('404 — Not found');
  }
}).listen(port, () => console.log(`NVIDIA Team 11 · preview at http://localhost:${port} (${root})`));
