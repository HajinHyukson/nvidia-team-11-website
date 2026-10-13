import { cpSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const out = join(root, 'dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of ['index.html', 'styles.css', 'script.js']) copyFileSync(join(root, f), join(out, f));
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });
console.log('Built static site in dist/');
