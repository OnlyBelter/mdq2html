import { create } from "zustand";

import type { QuizDocument } from "@/types/quiz";
import { buildStandaloneHtml } from "@/utils/htmlTemplate";
import { parseQuizMarkdown } from "@/utils/quizParser";

const DEFAULT_ERROR = "The file could not be parsed. Check the expected quiz structure and try again.";

type QuizStoreState = {
  filename: string;
  sourceMarkdown: string;
  quiz: QuizDocument | null;
  generatedHtml: string;
  error: string;
  setMarkdownFile: (payload: { filename: string; content: string }) => void;
  clearQuiz: () => void;
};

export const useQuizStore = create<QuizStoreState>((set) => ({
  filename: "",
  sourceMarkdown: "",
  quiz: null,
  generatedHtml: "",
  error: "",
  setMarkdownFile: ({ filename, content }) => {
    try {
      const quiz = parseQuizMarkdown(content);
      set({
        filename,
        sourceMarkdown: content,
        quiz,
        generatedHtml: buildStandaloneHtml(quiz),
        error: "",
      });
    } catch (error) {
      set({
        filename,
        sourceMarkdown: content,
        quiz: null,
        generatedHtml: "",
        error: error instanceof Error ? error.message : DEFAULT_ERROR,
      });
    }
  },
  clearQuiz: () =>
    set({
      filename: "",
      sourceMarkdown: "",
      quiz: null,
      generatedHtml: "",
      error: "",
    }),
}));
