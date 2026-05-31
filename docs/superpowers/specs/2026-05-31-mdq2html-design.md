# mdq2html Design

## Goal
Build a static web application that converts a quiz-oriented Markdown file into:
- an in-browser playable quiz preview
- a downloadable standalone HTML file with the same core behavior as the reference quiz
- a downloadable copy of the source Markdown

## Scope
- Input is a local Markdown file uploaded in the browser
- Output is generated entirely on the client side
- Hosting target is GitHub Pages for the repository `OnlyBelter/mdq2html`
- Feature parity is functional rather than pixel-perfect visual parity with the reference HTML

## User Flow
1. User opens the website
2. User uploads a Markdown file
3. The app parses the Markdown into a normalized quiz data model
4. The app renders an interactive quiz preview
5. The user downloads either the original Markdown or a generated standalone HTML file

## Architecture
- `parser`: converts the constrained Markdown format into typed quiz data
- `renderer`: shows quiz metadata, question cards, answer feedback, progress, and final summary
- `exporter`: injects quiz data into an HTML template and downloads a self-contained file
- `state`: stores source text, parsed quiz, parsing errors, and answer progress

## Parsing Rules
- Title comes from the first level-1 heading
- Intro text comes from the paragraph before the first question
- Questions are defined by level-3 headings beginning with `Q`
- Options are bullet items with an answer marker such as `[correct answer]`
- Hint text is read from blockquote lines under each question
- The initial parser targets the provided sample structure and avoids speculative support for unrelated Markdown dialects

## Output HTML
- The exported HTML is self-contained and does not require external JavaScript or CSS
- It preserves the core interaction model:
  - one question at a time
  - answer checking
  - explanation reveal
  - next-question navigation
  - score summary
  - restart option

## Deployment
- Use Vite for local development and production builds
- Publish the generated static files to GitHub Pages
- Keep runtime fully client-side so no server is required

## Verification
- Parse the provided sample Markdown successfully
- Render a working quiz preview in the app
- Download a standalone HTML file that runs when opened locally
- Build the project successfully for GitHub Pages
