# mdq2html

A static React + Vite application that converts quiz-oriented Markdown into:
- a browser preview with one-question-at-a-time quiz interaction
- a downloadable standalone HTML file
- a downloadable copy of the uploaded Markdown file

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run check
npm run test
npm run build
```

## Supported markdown shape

- `# Title` for the quiz title
- introduction paragraph before the first question
- `### Q1. ...` question headings
- exactly four `*` options per question
- one correct option marked with `**[correct answer]**` or `**[正确答案]**`
- one blockquote hint line per question

## GitHub Pages deployment

The repository includes a GitHub Actions workflow that publishes `dist/` to GitHub Pages.
After pushing to the default branch:

1. Enable GitHub Pages in the repository settings
2. Set the source to `GitHub Actions`
3. Push changes to trigger the deployment workflow
