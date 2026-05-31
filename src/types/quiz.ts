export type QuizOption = {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  hint: string;
  options: QuizOption[];
};

export type QuizDocument = {
  title: string;
  description: string;
  questionCount: number;
  questions: QuizQuestion[];
};
