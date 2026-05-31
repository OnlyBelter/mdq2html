import type { Locale } from "@/i18n/siteCopy";
import { siteCopy } from "@/i18n/siteCopy";

type FormatGuideProps = {
  locale: Locale;
};

export default function FormatGuide({ locale }: FormatGuideProps) {
  const copy = siteCopy[locale].guide;

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.18)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400">{copy.eyebrow}</div>
          <h3 className="mt-2 font-[Fraunces] text-3xl text-white">{copy.title}</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {copy.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <pre className="overflow-x-auto rounded-[24px] border border-white/10 bg-[#020617] p-5 text-xs leading-6 text-slate-300 shadow-inner">
          <code>{copy.example}</code>
        </pre>
      </div>
    </section>
  );
}
