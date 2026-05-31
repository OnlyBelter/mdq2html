import { FileUp, Sparkles, Trash2 } from "lucide-react";
import type { ChangeEvent } from "react";
import { useRef } from "react";

import type { Locale } from "@/i18n/siteCopy";
import { localizeQuizError, siteCopy } from "@/i18n/siteCopy";
import { useQuizStore } from "@/store/useQuizStore";

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file."));
    reader.readAsText(file, "utf-8");
  });
}

type UploadPanelProps = {
  locale: Locale;
};

export default function UploadPanel({ locale }: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { filename, quiz, error, setMarkdownFile, clearQuiz } = useQuizStore();
  const copy = siteCopy[locale].upload;
  const localizedError = error ? localizeQuizError(error, locale) : "";

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const content = await readTextFile(file);
    setMarkdownFile({ filename: file.name, content });
  };

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)] backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.28em] text-cyan-100">
            <Sparkles className="h-4 w-4" />
            {copy.eyebrow}
          </div>
          <h2 className="font-[Fraunces] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {copy.title}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{copy.description}</p>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
          >
            <FileUp className="h-4 w-4" />
            {copy.chooseFile}
          </button>
          <button
            type="button"
            onClick={() => {
              clearQuiz();
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12"
          >
            <Trash2 className="h-4 w-4" />
            {copy.reset}
          </button>
        </div>
      </div>

      <input ref={inputRef} type="file" accept=".md,text/markdown" className="hidden" onChange={handleFileChange} />

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-[24px] border border-dashed border-white/15 bg-slate-950/30 p-5 text-sm text-slate-300">
          <div className="font-semibold text-white">{copy.currentFileTitle}</div>
          <div className="mt-2 break-all text-slate-200">{filename || copy.currentFileEmpty}</div>
          <div className="mt-3 text-xs leading-6 text-slate-400">
            {copy.expectedMarkers}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-5 text-sm">
          <div className="font-semibold text-white">{copy.parseStatusTitle}</div>
          <div className={`mt-2 font-semibold ${error ? "text-rose-300" : quiz ? "text-emerald-300" : "text-slate-300"}`}>
            {error ? copy.parseStatusError : quiz ? copy.parseStatusReady : copy.parseStatusIdle}
          </div>
          <div className="mt-3 text-xs leading-6 text-slate-400">
            {localizedError || (quiz ? copy.parseSuccess(quiz.questionCount) : copy.parseIdleDescription)}
          </div>
        </div>
      </div>
    </section>
  );
}
