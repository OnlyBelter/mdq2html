import type { QuizDocument, QuizOption, QuizQuestion } from "@/types/quiz";

const OPTION_PATTERN = /^\*\s+.*?([A-D])\.\s+(.+?)\s*(?:\*\*\[(?:correct answer|正确答案)\]\*\*)?\s*$/i;
const CORRECT_MARKER_PATTERN = /\*\*\[(?:correct answer|正确答案)\]\*\*/i;
const HEADING_PREFIX_PATTERN = /^Q\d+\.\s*/i;
const LATEX_TOKEN_MAP: Record<string, string> = {
  "\\times": "×",
  "\\div": "÷",
  "\\cdot": "·",
  "\\leq": "≤",
  "\\geq": "≥",
};

function normalizeInlineMarkdown(input: string): string {
  let output = input.trim();

  Object.entries(LATEX_TOKEN_MAP).forEach(([token, replacement]) => {
    output = output.split(token).join(replacement);
  });

  output = output
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return output;
}

function extractDescription(markdown: string): string {
  const lines = markdown.split("\n");
  const descriptionLines: string[] = [];
  let seenTitle = false;

  for (const line of lines) {
    if (!seenTitle) {
      if (line.trim().startsWith("# ")) {
        seenTitle = true;
      }
      continue;
    }

    if (line.trim().startsWith("### ")) {
      break;
    }

    if (!line.trim() || line.trim() === "---") {
      if (descriptionLines.length > 0) {
        descriptionLines.push("");
      }
      continue;
    }

    descriptionLines.push(normalizeInlineMarkdown(line));
  }

  return descriptionLines
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseOptions(block: string, questionIndex: number): QuizOption[] {
  const options = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("* "))
    .filter((line) => OPTION_PATTERN.test(line))
    .map((line, optionIndex) => {
      const match = line.match(OPTION_PATTERN);
      if (!match) {
        throw new Error(`Question ${questionIndex + 1} has an invalid option line: ${line}`);
      }

      return {
        id: `q${questionIndex + 1}-o${optionIndex + 1}`,
        label: match[1].toUpperCase(),
        text: normalizeInlineMarkdown(match[2]),
        isCorrect: CORRECT_MARKER_PATTERN.test(line),
      } satisfies QuizOption;
    });

  if (options.length !== 4) {
    throw new Error(`Question ${questionIndex + 1} must contain exactly 4 options.`);
  }

  if (options.filter((option) => option.isCorrect).length !== 1) {
    throw new Error(`Question ${questionIndex + 1} must contain exactly 1 correct answer marker.`);
  }

  return options;
}

function parseHint(block: string, questionIndex: number): string {
  const hintLines = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith(">"))
    .map((line) => line.replace(/^>\s*/, ""))
    .map((line) => line.replace(/^\*\*(Hint|提示)\*\*[:：]?\s*/i, ""))
    .map((line) => normalizeInlineMarkdown(line))
    .filter(Boolean);

  if (hintLines.length > 0) {
    return hintLines.join(" ");
  }

  const fallbackHintLines = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("* "))
    .filter((line) => !OPTION_PATTERN.test(line))
    .map((line) => line.replace(/^\*\s+/, ""))
    .map((line) => normalizeInlineMarkdown(line))
    .filter(Boolean);

  if (fallbackHintLines.length === 0) {
    throw new Error(`Question ${questionIndex + 1} must include a hint blockquote.`);
  }

  return fallbackHintLines.join(" ");
}

function parseQuestions(markdown: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const sections = markdown.split(/^###\s+/m).slice(1);

  for (const [index, section] of sections.entries()) {
    const [headingLine = "", ...bodyLines] = section.split("\n");
    const rawHeading = normalizeInlineMarkdown(headingLine);
    const block = bodyLines.join("\n").trim();
    const prompt = rawHeading.replace(HEADING_PREFIX_PATTERN, "").trim() || rawHeading;

    questions.push({
      id: `q${index + 1}`,
      prompt,
      hint: parseHint(block, index),
      options: parseOptions(block, index),
    });
  }

  if (questions.length === 0) {
    throw new Error('No quiz questions were found. Expected headings like "### Q1. ...".');
  }

  return questions;
}

export function parseQuizMarkdown(markdown: string): QuizDocument {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const titleMatch = normalized.match(/^#\s+(.+)$/m);

  if (!titleMatch) {
    throw new Error('Missing title. Expected a first-level heading like "# Quiz Title".');
  }

  const questions = parseQuestions(normalized);
  const description = extractDescription(normalized);

  return {
    title: normalizeInlineMarkdown(titleMatch[1]),
    description,
    questionCount: questions.length,
    questions,
  };
}
