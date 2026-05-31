import { Download, FileCode2, FileText } from "lucide-react";

import { useQuizStore } from "@/store/useQuizStore";
import { downloadTextFile } from "@/utils/download";

function makeHtmlFilename(sourceName: string): string {
  const baseName = sourceName.replace(/\.[^.]+$/, "") || "quiz";
  return `${baseName}.html`;
}

export default function ExportToolbar() {
  const { filename, sourceMarkdown, generatedHtml, quiz } = useQuizStore();
  const disabled = !quiz;

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.18)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400">
            <Download className="h-4 w-4" />
            Export actions
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">Download the source and the generated standalone page.</h3>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={disabled}
            onClick={() => downloadTextFile(filename || "quiz.md", sourceMarkdown, "text/markdown;charset=utf-8")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-bold text-white transition enabled:hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileText className="h-4 w-4" />
            Download markdown
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => downloadTextFile(makeHtmlFilename(filename), generatedHtml, "text/html;charset=utf-8")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileCode2 className="h-4 w-4" />
            Download HTML
          </button>
        </div>
      </div>
    </section>
  );
}
