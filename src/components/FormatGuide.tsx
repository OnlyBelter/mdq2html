const formatExample = `# Quiz title

Short introduction about the lesson.

---

### Q1. What does x represent here?
* A. A random value
* B. The unknown number **[correct answer]**
* C. A triangle
* D. A color
> **Hint**: Use a short explanation here.
`;

export default function FormatGuide() {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.18)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-slate-400">Format guide</div>
          <h3 className="mt-2 font-[Fraunces] text-3xl text-white">Supported markdown structure</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>Use a single level-1 heading for the quiz title.</li>
            <li>Add a short introduction before the first question.</li>
            <li>Start each question with a level-3 heading like <code>### Q1.</code>.</li>
            <li>Provide exactly four bullet-point options per question.</li>
            <li>Mark one correct answer using <code>**[correct answer]**</code> or <code>**[正确答案]**</code>.</li>
            <li>Add a blockquote hint line under each question.</li>
          </ul>
        </div>

        <pre className="overflow-x-auto rounded-[24px] border border-white/10 bg-[#020617] p-5 text-xs leading-6 text-slate-300 shadow-inner">
          <code>{formatExample}</code>
        </pre>
      </div>
    </section>
  );
}
