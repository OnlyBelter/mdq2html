import { useEffect, useMemo, useState } from "react";

import type { QuizDocument } from "@/types/quiz";

const optionStyles = [
  "bg-rose-600 hover:bg-rose-500",
  "bg-sky-600 hover:bg-sky-500",
  "bg-amber-500 hover:bg-amber-400 text-slate-950",
  "bg-emerald-600 hover:bg-emerald-500",
];

type QuizPreviewProps = {
  quiz: QuizDocument;
};

function getEvaluationText(correctCount: number, total: number): string {
  if (correctCount === total) {
    return "Perfect score. The full structure of the quiz has landed cleanly.";
  }

  if (correctCount >= Math.ceil(total * 0.7)) {
    return "Strong result. Most relationships are already clear.";
  }

  return "Good start. Review the hints and run another round.";
}

export default function QuizPreview({ quiz }: QuizPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByQuestion, setSelectedByQuestion] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedByQuestion({});
  }, [quiz]);

  const question = quiz.questions[currentIndex];
  const selectedOptionId = selectedByQuestion[question.id];
  const answered = Boolean(selectedOptionId);
  const totalCorrect = useMemo(
    () =>
      quiz.questions.reduce((count, currentQuestion) => {
        const selected = selectedByQuestion[currentQuestion.id];
        const option = currentQuestion.options.find((entry) => entry.id === selected);
        return option?.isCorrect ? count + 1 : count;
      }, 0),
    [quiz.questions, selectedByQuestion],
  );
  const isComplete = quiz.questions.every((currentQuestion) => Boolean(selectedByQuestion[currentQuestion.id]));
  const shouldShowSummary = isComplete && currentIndex === quiz.questions.length - 1 && answered;

  const handleAnswer = (optionId: string) => {
    if (answered) {
      return;
    }

    setSelectedByQuestion((current) => ({
      ...current,
      [question.id]: optionId,
    }));
  };

  const goToNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((current) => current + 1);
    }
  };

  const restart = () => {
    setSelectedByQuestion({});
    setCurrentIndex(0);
  };

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/8 p-6 shadow-[0_32px_90px_rgba(2,6,23,0.35)] backdrop-blur md:p-8">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.26em] text-cyan-100/80">Live preview</div>
          <h3 className="mt-2 font-[Fraunces] text-3xl text-white">{quiz.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            {quiz.description || "Interactive preview generated from the uploaded markdown."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
          <div className="font-semibold text-white">{quiz.questionCount} questions</div>
          <div className="mt-1">One question at a time, with hint reveal and summary scoring.</div>
        </div>
      </div>

      {shouldShowSummary ? (
        <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/45 p-8 text-center">
          <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-emerald-200/70">Completed</div>
          <div className="mt-4 font-[Fraunces] text-5xl text-cyan-200">
            {totalCorrect} / {quiz.questions.length}
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
            {getEvaluationText(totalCorrect, quiz.questions.length)}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Restart preview
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-300">
            <span>
              Question {currentIndex + 1} / {quiz.questions.length}
            </span>
            <span>{totalCorrect} correct so far</span>
          </div>

          <article className="rounded-[28px] border border-white/10 bg-slate-950/45 p-6 md:p-8">
            <h4 className="text-2xl font-bold leading-10 text-white">{question.prompt}</h4>
            <div className="mt-6 grid gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedOptionId === option.id;
                const buttonClass = answered
                  ? isSelected
                    ? option.isCorrect
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-500 text-white"
                    : "bg-white/10 text-slate-400"
                  : optionStyles[index % optionStyles.length];

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleAnswer(option.id)}
                    disabled={answered}
                    className={`rounded-[22px] px-5 py-4 text-left text-base font-extrabold shadow-[0_16px_30px_rgba(15,23,42,0.18)] transition ${buttonClass} ${answered ? "cursor-default" : "hover:-translate-y-0.5"}`}
                  >
                    <span className="mr-2 opacity-80">{option.label}.</span>
                    {option.text}
                    {answered && isSelected ? (
                      <span className="ml-2 text-sm">{option.isCorrect ? "Correct" : "Try again next round"}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {answered ? (
              <div className="mt-5 rounded-[22px] border border-cyan-300/10 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">
                <div className="font-extrabold uppercase tracking-[0.18em] text-cyan-200/80">Hint</div>
                <p className="m-0 mt-2">{question.hint}</p>
              </div>
            ) : null}

            {answered ? (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={currentIndex === quiz.questions.length - 1}
                  className="rounded-full bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentIndex === quiz.questions.length - 1 ? "Score ready below" : "Next question"}
                </button>
              </div>
            ) : null}
          </article>
        </div>
      )}
    </section>
  );
}
