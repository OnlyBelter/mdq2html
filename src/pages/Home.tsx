import { Github, LayoutTemplate } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ExportToolbar from "@/components/ExportToolbar";
import FormatGuide from "@/components/FormatGuide";
import QuizPreview from "@/components/QuizPreview";
import UploadPanel from "@/components/UploadPanel";
import type { Locale } from "@/i18n/siteCopy";
import { localizeQuizError, siteCopy } from "@/i18n/siteCopy";
import { useQuizStore } from "@/store/useQuizStore";

const LOCALE_STORAGE_KEY = "mdq2html:locale";

export default function Home() {
  const { quiz, filename, error } = useQuizStore();
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "zh";
    }

    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === "en" ? "en" : "zh";
  });
  const copy = useMemo(() => siteCopy[locale], [locale]);
  const localizedError = error ? localizeQuizError(error, locale) : "";

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = copy.metaTitle;
  }, [copy.metaTitle, locale]);

  return (
    <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-slate-300">
                <LayoutTemplate className="h-4 w-4" />
                mdq2html
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/8 p-1 text-xs font-bold text-slate-300">
                <span className="px-2 text-slate-400">{copy.language.label}</span>
                <button
                  type="button"
                  onClick={() => setLocale("zh")}
                  className={`rounded-full px-3 py-1.5 transition ${locale === "zh" ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10"}`}
                >
                  {copy.language.zh}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-full px-3 py-1.5 transition ${locale === "en" ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10"}`}
                >
                  {copy.language.en}
                </button>
              </div>
            </div>
            <h1 className="mt-5 max-w-3xl font-[Fraunces] text-5xl leading-tight text-white sm:text-6xl">
              {copy.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{copy.home.heroDescription}</p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/8 p-6 text-sm text-slate-300 shadow-[0_32px_90px_rgba(2,6,23,0.22)] backdrop-blur">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-100/80">
              <Github className="h-4 w-4" />
              {copy.home.hostingEyebrow}
            </div>
            <div className="mt-3 text-lg font-bold text-white">{copy.home.hostingTitle}</div>
            <p className="mt-2 leading-7">{copy.home.hostingDescription}</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 font-mono text-xs text-cyan-100/90">
              git@github.com:OnlyBelter/mdq2html.git
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <UploadPanel locale={locale} />
          <ExportToolbar locale={locale} />

          {quiz ? (
            <QuizPreview locale={locale} quiz={quiz} />
          ) : (
            <section className="rounded-[32px] border border-dashed border-white/15 bg-slate-950/35 p-10 text-center text-slate-300">
              <div className="font-[Fraunces] text-3xl text-white">{copy.home.previewEmptyTitle}</div>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7">
                {localizedError ? `${copy.home.previewErrorPrefix} ${localizedError}` : copy.home.previewEmptyDescription}
              </p>
            </section>
          )}

          <FormatGuide locale={locale} />

          <section className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-sm leading-7 text-slate-300">
            <div className="font-semibold text-white">{copy.home.parseContextTitle}</div>
            <div className="mt-2 break-all">{filename || copy.home.parseContextEmpty}</div>
            <div className="mt-3 text-slate-400">{copy.home.parseContextDescription}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
