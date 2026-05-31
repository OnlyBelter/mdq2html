export type Locale = "zh" | "en";

const DEFAULT_ERROR_ZH = "文件解析失败，请检查 Markdown 结构后重试。";

export const siteCopy = {
  zh: {
    metaTitle: "mdq2html",
    language: {
      label: "语言",
      zh: "中文",
      en: "EN",
    },
    home: {
      heroTitle: "把课程 Markdown 转成互动答题页和可分享的单文件 HTML。",
      heroDescription:
        "这个网站会在浏览器中直接解析结构化题库 Markdown，预览答题流程，并导出可直接分享或发布到 GitHub Pages 的独立 HTML 文件。",
      hostingEyebrow: "部署目标",
      hostingTitle: "GitHub Pages",
      hostingDescription: "生产环境保持纯静态构建，不依赖后端、不做服务端渲染，也不需要浏览器之外的运行时。",
      previewEmptyTitle: "上传有效的 Markdown 后，这里会显示预览",
      previewEmptyDescription: "上传题库 Markdown 后即可生成互动预览，并启用两个下载按钮。",
      previewErrorPrefix: "解析时发现问题：",
      parseContextTitle: "当前解析上下文",
      parseContextEmpty: "尚未加载源文件",
      parseContextDescription: "上传的文件只保留在当前浏览器会话中，不会发送到任何后端服务。",
    },
    upload: {
      eyebrow: "Markdown 输入，HTML 输出",
      title: "上传题库 Markdown 文件，立即生成可独立运行的 HTML 答题页。",
      description: "解析器针对你的题库结构设计：标题、简介、题目标题、四个选项，以及每题对应的提示说明。",
      chooseFile: "选择 Markdown",
      reset: "重置",
      currentFileTitle: "当前文件",
      currentFileEmpty: "尚未选择文件",
      expectedMarkers:
        "期望标记：标题使用 #，题目使用 ### Q1.，每题四个项目符号选项，提示行以 > 开头。",
      parseStatusTitle: "解析状态",
      parseStatusIdle: "等待输入",
      parseStatusReady: "可以导出",
      parseStatusError: "需要修正",
      parseSuccess: (count: number) => `已成功解析 ${count} 道题。`,
      parseIdleDescription: "上传 Markdown 文件后即可生成预览和导出 HTML。",
    },
    exportBar: {
      eyebrow: "导出操作",
      title: "下载源 Markdown，以及生成后的独立页面。",
      downloadMarkdown: "下载 Markdown",
      downloadHtml: "下载 HTML",
    },
    preview: {
      eyebrow: "实时预览",
      fallbackDescription: "这里展示根据上传 Markdown 生成的互动预览。",
      questionCount: (count: number) => `${count} 道题`,
      questionCountDescription: "一次展示一题，支持提示展开、逐题作答与最终得分总结。",
      completed: "已完成",
      restart: "重新开始预览",
      questionProgress: (current: number, total: number) => `第 ${current} / ${total} 题`,
      correctSoFar: (count: number) => `当前答对 ${count} 题`,
      selectedCorrect: "回答正确",
      selectedWrong: "这题下轮再试",
      hint: "提示",
      scoreReady: "得分结果见下方",
      nextQuestion: "下一题",
      summaryPerfect: "满分完成，整套题的结构已经完全掌握。",
      summaryStrong: "表现很好，核心关系已经把握得比较清楚。",
      summaryKeepGoing: "已经有不错的开始，结合提示再做一轮会更稳。",
    },
    guide: {
      eyebrow: "格式说明",
      title: "当前支持的 Markdown 结构",
      bullets: [
        "用一个一级标题作为题库标题。",
        "在第一题前放一段简短课程简介。",
        "每道题使用类似 ### Q1. 的三级标题开头。",
        "每题必须提供 4 个项目符号选项。",
        "用 **[correct answer]** 或 **[正确答案]** 标记唯一正确答案。",
        "每题都需要一行 blockquote 提示。",
      ],
      example: `# 测验标题

课程简介，简要说明这套题的主题。

---

### Q1. x 在这里表示什么？
* A. 一个随机数
* B. 未知数 **[正确答案]**
* C. 一个三角形
* D. 一种颜色
> **提示**：在这里写一小段提示说明。
`,
    },
  },
  en: {
    metaTitle: "mdq2html",
    language: {
      label: "Language",
      zh: "中文",
      en: "EN",
    },
    home: {
      heroTitle: "Turn lesson markdown into a quiz app and a shareable single HTML file.",
      heroDescription:
        "This site parses structured quiz markdown entirely in the browser, previews the interaction flow, and exports a standalone HTML file ready to share or publish on GitHub Pages.",
      hostingEyebrow: "Hosting target",
      hostingTitle: "GitHub Pages",
      hostingDescription: "Production builds stay fully static. No backend, no server-side rendering, and no runtime dependencies beyond the browser.",
      previewEmptyTitle: "Preview waiting for a valid markdown file",
      previewEmptyDescription: "Upload your markdown file to generate the interactive preview and enable both download actions.",
      previewErrorPrefix: "The parser found an issue:",
      parseContextTitle: "Current parse context",
      parseContextEmpty: "No source file loaded",
      parseContextDescription: "The uploaded file stays in the browser session. Nothing is sent to a backend service.",
    },
    upload: {
      eyebrow: "Markdown in, HTML out",
      title: "Upload a quiz-style Markdown file and turn it into a standalone HTML quiz.",
      description:
        "The parser targets your structured question format: a title, short introduction, question headings, four options, and a hint blockquote for each question.",
      chooseFile: "Choose markdown",
      reset: "Reset",
      currentFileTitle: "Current file",
      currentFileEmpty: "No file selected yet",
      expectedMarkers:
        "Expected markers: # for title, ### Q1. for questions, four bullet options, and a hint line starting with >.",
      parseStatusTitle: "Parse status",
      parseStatusIdle: "Waiting for input",
      parseStatusReady: "Ready to export",
      parseStatusError: "Needs fixes",
      parseSuccess: (count: number) => `${count} questions parsed successfully.`,
      parseIdleDescription: "Upload a markdown file to generate the preview and exportable HTML.",
    },
    exportBar: {
      eyebrow: "Export actions",
      title: "Download the source and the generated standalone page.",
      downloadMarkdown: "Download markdown",
      downloadHtml: "Download HTML",
    },
    preview: {
      eyebrow: "Live preview",
      fallbackDescription: "Interactive preview generated from the uploaded markdown.",
      questionCount: (count: number) => `${count} questions`,
      questionCountDescription: "One question at a time, with hint reveal and summary scoring.",
      completed: "Completed",
      restart: "Restart preview",
      questionProgress: (current: number, total: number) => `Question ${current} / ${total}`,
      correctSoFar: (count: number) => `${count} correct so far`,
      selectedCorrect: "Correct",
      selectedWrong: "Try again next round",
      hint: "Hint",
      scoreReady: "Score ready below",
      nextQuestion: "Next question",
      summaryPerfect: "Perfect score. The full structure of the quiz has landed cleanly.",
      summaryStrong: "Strong result. Most relationships are already clear.",
      summaryKeepGoing: "Good start. Review the hints and run another round.",
    },
    guide: {
      eyebrow: "Format guide",
      title: "Supported markdown structure",
      bullets: [
        "Use a single level-1 heading for the quiz title.",
        "Add a short introduction before the first question.",
        "Start each question with a level-3 heading like ### Q1..",
        "Provide exactly four bullet-point options per question.",
        "Mark one correct answer using **[correct answer]** or **[正确答案]**.",
        "Add a blockquote hint line under each question.",
      ],
      example: `# Quiz title

Short introduction about the lesson.

---

### Q1. What does x represent here?
* A. A random value
* B. The unknown number **[correct answer]**
* C. A triangle
* D. A color
> **Hint**: Use a short explanation here.
`,
    },
  },
} as const;

export function localizeQuizError(error: string, locale: Locale): string {
  if (locale === "en") {
    return error;
  }

  if (error === "Failed to read file.") {
    return "读取文件失败，请重新选择文件后再试。";
  }

  let match = error.match(/^Question (\d+) has an invalid option line: (.+)$/);
  if (match) {
    return `第 ${match[1]} 题的选项格式无效：${match[2]}`;
  }

  match = error.match(/^Question (\d+) must contain exactly 4 options\.$/);
  if (match) {
    return `第 ${match[1]} 题必须且只能包含 4 个选项。`;
  }

  match = error.match(/^Question (\d+) must contain exactly 1 correct answer marker\.$/);
  if (match) {
    return `第 ${match[1]} 题必须且只能标记 1 个正确答案。`;
  }

  match = error.match(/^Question (\d+) must include a hint blockquote\.$/);
  if (match) {
    return `第 ${match[1]} 题必须包含一条提示说明。`;
  }

  if (error === 'No quiz questions were found. Expected headings like "### Q1. ...".') {
    return "没有识别到题目，请使用类似 ### Q1. ... 的题目标题格式。";
  }

  if (error === 'Missing title. Expected a first-level heading like "# Quiz Title".') {
    return '缺少标题，请使用类似 "# 测验标题" 的一级标题。';
  }

  return DEFAULT_ERROR_ZH;
}
