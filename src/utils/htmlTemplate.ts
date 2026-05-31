import type { QuizDocument } from "@/types/quiz";

function escapeForJson(input: string): string {
  return input.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildStandaloneHtml(quiz: QuizDocument): string {
  const quizJson = escapeForJson(JSON.stringify(quiz));
  const safeTitle = escapeHtml(quiz.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle}</title>
  <style>
    :root {
      --bg: #eef2ff;
      --surface: #ffffff;
      --text: #0f172a;
      --muted: #475569;
      --line: rgba(15, 23, 42, 0.12);
      --red: #e21b3c;
      --blue: #1368ce;
      --yellow: #d89e00;
      --green: #26890c;
      --dark: #111827;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(19, 104, 206, 0.15), transparent 24%),
        linear-gradient(180deg, #f8fafc 0%, var(--bg) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .app {
      width: 100%;
      max-width: 780px;
      background: rgba(255, 255, 255, 0.94);
      border: 1px solid var(--line);
      border-radius: 28px;
      box-shadow: 0 24px 80px rgba(15, 23, 42, 0.16);
      overflow: hidden;
    }
    .hero {
      padding: 32px 32px 18px;
      background: linear-gradient(135deg, rgba(19, 104, 206, 0.12), rgba(226, 27, 60, 0.08));
      border-bottom: 1px solid var(--line);
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 8px 12px;
      background: rgba(15, 23, 42, 0.06);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }
    h1 {
      margin: 16px 0 10px;
      font-size: clamp(2rem, 4vw, 2.7rem);
      line-height: 1.05;
    }
    .description {
      margin: 0;
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.65;
    }
    .content {
      padding: 28px 32px 32px;
    }
    .meta {
      margin-bottom: 18px;
      font-size: 0.95rem;
      color: var(--muted);
      font-weight: 700;
    }
    .card {
      border-radius: 24px;
      border: 1px solid var(--line);
      background: var(--surface);
      padding: 24px;
    }
    .question {
      margin: 0 0 20px;
      font-size: 1.35rem;
      line-height: 1.45;
    }
    .options {
      display: grid;
      gap: 14px;
    }
    .option {
      width: 100%;
      border: none;
      border-radius: 18px;
      padding: 18px 20px;
      color: white;
      text-align: left;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
    }
    .option:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.18);
    }
    .option:disabled {
      cursor: default;
    }
    .option.red { background: var(--red); }
    .option.blue { background: var(--blue); }
    .option.yellow { background: var(--yellow); }
    .option.green { background: var(--green); }
    .option.correct { background: var(--green) !important; }
    .option.wrong { background: #64748b !important; }
    .option.dimmed { opacity: 0.32; }
    .feedback {
      margin-top: 20px;
      padding: 16px 18px;
      border-radius: 18px;
      border: 1px solid rgba(19, 104, 206, 0.16);
      background: rgba(19, 104, 206, 0.08);
      color: #0f172a;
      display: none;
    }
    .feedback.visible { display: block; }
    .feedback strong { display: block; margin-bottom: 8px; }
    .actions {
      margin-top: 18px;
      display: flex;
      justify-content: flex-end;
    }
    .next {
      border: none;
      border-radius: 999px;
      background: var(--dark);
      color: white;
      padding: 14px 20px;
      font-weight: 700;
      cursor: pointer;
      display: none;
    }
    .next.visible { display: inline-flex; }
    .summary {
      text-align: center;
      padding: 16px 8px 4px;
    }
    .score {
      font-size: clamp(2.8rem, 8vw, 4.6rem);
      font-weight: 800;
      color: var(--blue);
      margin: 12px 0;
    }
    .restart {
      margin-top: 18px;
      border: none;
      border-radius: 999px;
      background: var(--green);
      color: white;
      padding: 14px 22px;
      font-weight: 700;
      cursor: pointer;
    }
    @media (max-width: 640px) {
      body { padding: 14px; }
      .hero, .content { padding-left: 18px; padding-right: 18px; }
      .card { padding: 18px; }
      .actions { justify-content: stretch; }
      .next, .restart { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="hero">
      <div class="eyebrow">Standalone Quiz</div>
      <h1 id="quiz-title"></h1>
      <p class="description" id="quiz-description"></p>
    </div>
    <div class="content">
      <div id="quiz-root"></div>
    </div>
  </div>
  <script>
    const quiz = ${quizJson};
    const optionColorClasses = ["red", "blue", "yellow", "green"];
    let currentIndex = 0;
    let totalCorrect = 0;
    let answered = false;

    const titleNode = document.getElementById("quiz-title");
    const descriptionNode = document.getElementById("quiz-description");
    const root = document.getElementById("quiz-root");

    titleNode.textContent = quiz.title;
    descriptionNode.textContent = quiz.description || "Quiz generated from Markdown";

    function getEvaluationText(score, total) {
      if (score === total) return "Perfect score. The quiz is fully mastered.";
      if (score >= Math.ceil(total * 0.7)) return "Strong result. The core ideas are already in place.";
      return "Good start. Review the hints and try another round.";
    }

    function renderSummary() {
      root.innerHTML =
        '<div class="card summary">' +
        '<div class="eyebrow">Completed</div>' +
        '<h2>Quiz complete</h2>' +
        '<div class="score">' + totalCorrect + " / " + quiz.questions.length + "</div>" +
        "<p>" + getEvaluationText(totalCorrect, quiz.questions.length) + "</p>" +
        '<button class="restart" id="restart-btn">Restart quiz</button>' +
        "</div>";

      document.getElementById("restart-btn").addEventListener("click", () => {
        currentIndex = 0;
        totalCorrect = 0;
        answered = false;
        renderQuestion();
      });
    }

    function escapeHtml(value) {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function renderQuestion() {
      const question = quiz.questions[currentIndex];
      answered = false;
      root.innerHTML =
        '<div class="meta">Question ' + (currentIndex + 1) + " / " + quiz.questions.length + "</div>" +
        '<div class="card">' +
        '<h2 class="question">' + escapeHtml(question.prompt) + "</h2>" +
        '<div class="options" id="options"></div>' +
        '<div class="feedback" id="feedback"><strong>Hint</strong><span>' + escapeHtml(question.hint) + "</span></div>" +
        '<div class="actions"><button class="next" id="next-btn">' + (currentIndex === quiz.questions.length - 1 ? "See summary" : "Next question") + "</button></div>" +
        "</div>";

      const optionsNode = document.getElementById("options");
      const feedbackNode = document.getElementById("feedback");
      const nextNode = document.getElementById("next-btn");

      question.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.className = "option " + optionColorClasses[optionIndex % optionColorClasses.length];
        button.textContent = option.label + ". " + option.text;
        button.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          if (option.isCorrect) {
            totalCorrect += 1;
            button.classList.add("correct");
            button.textContent += " (Correct)";
          } else {
            button.classList.add("wrong");
            button.textContent += " (Not this one)";
          }

          Array.from(optionsNode.querySelectorAll("button")).forEach((node) => {
            if (node !== button) {
              node.disabled = true;
              node.classList.add("dimmed");
            } else {
              node.disabled = true;
            }
          });

          feedbackNode.classList.add("visible");
          nextNode.classList.add("visible");
        });
        optionsNode.appendChild(button);
      });

      nextNode.addEventListener("click", () => {
        if (currentIndex === quiz.questions.length - 1) {
          renderSummary();
          return;
        }
        currentIndex += 1;
        renderQuestion();
      });
    }

    renderQuestion();
  </script>
</body>
</html>`;
}
