import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const booksDir = path.join(root, 'Books');
await fs.mkdir(booksDir, { recursive: true });

const entries = await fs.readdir(booksDir, { withFileTypes: true });
const books = [];

for (const entry of entries) {
  if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
  const folder = entry.name;
  const folderPath = path.join(booksDir, folder);
  const files = await fs.readdir(folderPath, { withFileTypes: true });
  const pdfs = files.filter(f => f.isFile() && path.extname(f.name).toLowerCase() === '.pdf');
  if (!pdfs.length) continue;

  // One PDF per book folder is the intended structure. Use the first PDF if more exist.
  const pdf = pdfs.sort((a,b) => a.name.localeCompare(b.name, undefined, { sensitivity:'base', numeric:true }))[0];
  const title = path.basename(pdf.name, '.pdf').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() || folder;
  books.push({
    id: folder,
    title,
    url: `Books/${encodeURIComponent(folder)}/${encodeURIComponent(pdf.name)}`
  });
}

books.sort((a,b) => a.title.localeCompare(b.title, undefined, { sensitivity:'base', numeric:true }));
await fs.writeFile(path.join(root, 'books.json'), JSON.stringify({ books }, null, 2) + '\n', 'utf8');
console.log(`My Book Shelf: found ${books.length} PDF book${books.length === 1 ? '' : 's'}.`);
