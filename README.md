# My Book Shelf

A fast, responsive personal PDF bookshelf designed for GitHub + Vercel.

## Add a book
Create a folder inside `Books`, then put one PDF inside it:

```text
Books/
  Book_01/
    My_Book.pdf
  Book_02/
    Another_Book.pdf
```

The PDF filename becomes the title. Run `npm run build` locally, or push to GitHub and let Vercel run the build command.

## Deploy to Vercel
1. Push this entire project to GitHub.
2. Import the repository into Vercel.
3. Keep the build command as `npm run build`.
4. Deploy.

Each deployment rebuilds `books.json` by scanning the `Books` folders. Clicking a book opens its PDF in a new browser tab.

## Important
The PDF files must be inside this project repository under `Books/`. Adding a folder somewhere else on your desktop will not make it visible to the website.
