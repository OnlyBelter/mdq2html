import { Github, LayoutTemplate } from "lucide-react";

import ExportToolbar from "@/components/ExportToolbar";
import FormatGuide from "@/components/FormatGuide";
import QuizPreview from "@/components/QuizPreview";
import UploadPanel from "@/components/UploadPanel";
import { useQuizStore } from "@/store/useQuizStore";

export default function Home() {
  const { quiz, filename, error } = useQuizStore();

  return (
    <main className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.28em] text-slate-300">
              <LayoutTemplate className="h-4 w-4" />
              mdq2html
            </div>
            <h1 className="mt-5 max-w-3xl font-[Fraunces] text-5xl leading-tight text-white sm:text-6xl">
              Turn lesson markdown into a quiz app and a shareable single HTML file.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              This site parses structured quiz markdown entirely in the browser, previews the interaction flow, and
              exports a standalone HTML file ready to share or publish on GitHub Pages.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/8 p-6 text-sm text-slate-300 shadow-[0_32px_90px_rgba(2,6,23,0.22)] backdrop-blur">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-cyan-100/80">
              <Github className="h-4 w-4" />
              Hosting target
            </div>
            <div className="mt-3 text-lg font-bold text-white">GitHub Pages</div>
            <p className="mt-2 leading-7">
              Production builds stay fully static. No backend, no server-side rendering, and no runtime dependencies
              beyond the browser.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 font-mono text-xs text-cyan-100/90">
              git@github.com:OnlyBelter/mdq2html.git
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <UploadPanel />
          <ExportToolbar />

          {quiz ? (
            <QuizPreview quiz={quiz} />
          ) : (
            <section className="rounded-[32px] border border-dashed border-white/15 bg-slate-950/35 p-10 text-center text-slate-300">
              <div className="font-[Fraunces] text-3xl text-white">Preview waiting for a valid markdown file</div>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7">
                {error
                  ? `The parser found an issue: ${error}`
                  : "Upload your markdown file to generate the interactive preview and enable both download actions."}
              </p>
            </section>
          )}

          <FormatGuide />

          <section className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-sm leading-7 text-slate-300">
            <div className="font-semibold text-white">Current parse context</div>
            <div className="mt-2 break-all">{filename || "No source file loaded"}</div>
            <div className="mt-3 text-slate-400">
              The uploaded file stays in the browser session. Nothing is sent to a backend service.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
