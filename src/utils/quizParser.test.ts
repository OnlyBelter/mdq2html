import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { buildStandaloneHtml } from "@/utils/htmlTemplate";
import { parseQuizMarkdown } from "@/utils/quizParser";

const sampleMarkdown = `# Kahoot! Classroom Quiz

A short introduction to the quiz.

---

### Q1. If x is the side of a square, what is the perimeter?
* A. x + 4
* B. 4x **[correct answer]**
* C. x - 4
* D. x × x
> **Hint**: A square has four equal sides.

---

### Q2. What does x = 3 mean on a number line?
* A. The whole line
* B. One point at position 3 **[correct answer]**
* C. A plane
* D. A triangle
> **Hint**: One coordinate on a line maps to one point.
`;

describe("parseQuizMarkdown", () => {
  it("extracts quiz metadata and questions from the supported markdown format", () => {
    const quiz = parseQuizMarkdown(sampleMarkdown);

    expect(quiz.title).toBe("Kahoot! Classroom Quiz");
    expect(quiz.description).toBe("A short introduction to the quiz.");
    expect(quiz.questionCount).toBe(2);
    expect(quiz.questions[0].options[1].isCorrect).toBe(true);
    expect(quiz.questions[1].hint).toContain("maps to one point");
  });

  it("throws when a question does not provide exactly one correct answer", () => {
    const invalidMarkdown = `# Broken

### Q1. Broken question
* A. One
* B. Two
* C. Three
* D. Four
> **Hint**: missing marker`;

    expect(() => parseQuizMarkdown(invalidMarkdown)).toThrow(/exactly 1 correct answer/i);
  });

  it("parses the provided project fixture markdown", () => {
    const fixturePath = resolve(process.cwd(), "gemini-code-1780218255961.md");
    const fixtureMarkdown = readFileSync(fixturePath, "utf-8");
    const quiz = parseQuizMarkdown(fixtureMarkdown);

    expect(quiz.title).toContain("Kahoot!");
    expect(quiz.questionCount).toBe(12);
    expect(quiz.questions[0].options).toHaveLength(4);
  });
});

describe("buildStandaloneHtml", () => {
  it("embeds quiz data into a self-contained html string", () => {
    const quiz = parseQuizMarkdown(sampleMarkdown);
    const html = buildStandaloneHtml(quiz);

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Standalone Quiz");
    expect(html).toContain(quiz.title);
    expect(html).toContain("renderQuestion");
  });
});
