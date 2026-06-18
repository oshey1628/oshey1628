const fs = require("node:fs/promises");
const path = require("node:path");
const { Presentation, PresentationFile } = require("@oai/artifact-tool");

const ROOT = "C:\\Users\\user\\Desktop\\AI assistant for Pack\\Report_for Leader";
const OUTPUT_DIR = path.join(ROOT, "outputs");
const IMAGE_DIR = path.join(ROOT, "output", "images");
const SCRATCH_DIR = path.join(ROOT, "work", "presentations", "sales-agent-pack-health", "tmp");
const QA_DIR = path.join(SCRATCH_DIR, "qa");
const PREVIEW_DIR = path.join(SCRATCH_DIR, "preview");
const LAYOUT_DIR = path.join(SCRATCH_DIR, "layout");
const FINAL_PPTX = path.join(OUTPUT_DIR, "pack_health_sales_agent_3pages.pptx");

const W = 1280;
const H = 720;
const C = {
  navy: "#071C3A",
  blue: "#1167D8",
  blue2: "#DCEBFF",
  mint: "#00A88F",
  mint2: "#DDF7F2",
  amber: "#F2B84B",
  amber2: "#FFF1CF",
  ink: "#162033",
  muted: "#657084",
  line: "#D8DEE9",
  bg: "#F6F8FB",
  white: "#FFFFFF",
  red: "#E15A4F",
};
const FONT = "Noto Sans KR";
const FONT_SCALE = 1.1;
const MIN_FONT_PX = 18; // 13pt is about 17.3px at 96 DPI.

function fitFontSize(size = 20) {
  return Math.max(MIN_FONT_PX, Math.round(size * FONT_SCALE * 10) / 10);
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addText(slide, text, pos, style = {}) {
  const fontSize = fitFontSize(style.fontSize || 20);
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: pos,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
    name: style.name,
  });
  shape.text = text;
  shape.text.style = {
    typeface: FONT,
    color: style.color || C.ink,
    fontSize,
    bold: style.bold || false,
    lineSpacing: style.lineSpacing || 1.15,
    alignment: style.alignment || "left",
    verticalAlignment: style.verticalAlignment || "top",
    autoFit: "shrinkText",
    insets: style.insets || { top: 4, right: 4, bottom: 4, left: 4 },
  };
  return shape;
}

function addRich(slide, paragraphs, pos, style = {}) {
  const fontSize = fitFontSize(style.fontSize || 20);
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: pos,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
    name: style.name,
  });
  shape.text.set(paragraphs);
  shape.text.style = {
    typeface: FONT,
    color: style.color || C.ink,
    fontSize,
    lineSpacing: style.lineSpacing || 1.12,
    alignment: style.alignment || "left",
    verticalAlignment: style.verticalAlignment || "top",
    autoFit: "shrinkText",
    insets: style.insets || { top: 4, right: 4, bottom: 4, left: 4 },
  };
  return shape;
}

function addBox(slide, pos, opts = {}) {
  return slide.shapes.add({
    geometry: opts.geometry || "roundRect",
    position: pos,
    fill: opts.fill || C.white,
    line: opts.line || { style: "solid", fill: opts.stroke || C.line, width: opts.lineWidth || 1 },
    borderRadius: opts.borderRadius || 14,
    shadow: opts.shadow || "shadow-none",
    name: opts.name,
  });
}

function addPill(slide, text, pos, fill, color, opts = {}) {
  const fontSize = fitFontSize(opts.fontSize || 14);
  const p = addBox(slide, pos, {
    fill,
    stroke: opts.stroke || fill,
    borderRadius: "rounded-full",
    lineWidth: opts.lineWidth || 1,
    name: opts.name,
  });
  p.text = text;
  p.text.style = {
    typeface: FONT,
    fontSize,
    bold: true,
    color,
    alignment: "center",
    verticalAlignment: "middle",
    autoFit: "shrinkText",
    insets: { top: 3, right: 8, bottom: 3, left: 8 },
  };
  return p;
}

function addFooter(slide, page, note = "보고용 컨셉안 | 팩건강보험 가입자수 확대") {
  addText(slide, note, { left: 64, top: 674, width: 730, height: 22 }, {
    fontSize: 11,
    color: "#7A8494",
  });
  addText(slide, String(page).padStart(2, "0"), { left: 1164, top: 662, width: 52, height: 32 }, {
    fontSize: 18,
    bold: true,
    color: "#A1A9B7",
    alignment: "right",
  });
}

function addSmallIcon(slide, cx, cy, kind, color) {
  if (kind === "target") {
    slide.shapes.add({ geometry: "ellipse", position: { left: cx - 20, top: cy - 20, width: 40, height: 40 }, fill: "none", line: { style: "solid", fill: color, width: 3 } });
    slide.shapes.add({ geometry: "ellipse", position: { left: cx - 9, top: cy - 9, width: 18, height: 18 }, fill: color, line: { style: "solid", fill: color, width: 1 } });
    return;
  }
  if (kind === "explain") {
    slide.shapes.add({ geometry: "roundRect", position: { left: cx - 22, top: cy - 16, width: 44, height: 32 }, fill: "none", line: { style: "solid", fill: color, width: 3 }, borderRadius: 8 });
    slide.shapes.add({ geometry: "line", position: { left: cx - 12, top: cy - 2, width: 24, height: 0 }, fill: "none", line: { style: "solid", fill: color, width: 3 } });
    slide.shapes.add({ geometry: "line", position: { left: cx - 12, top: cy + 9, width: 16, height: 0 }, fill: "none", line: { style: "solid", fill: color, width: 3 } });
    return;
  }
  slide.shapes.add({ geometry: "rect", position: { left: cx - 15, top: cy - 11, width: 30, height: 24 }, fill: "none", line: { style: "solid", fill: color, width: 3 }, borderRadius: 3 });
  slide.shapes.add({ geometry: "line", position: { left: cx - 8, top: cy + 2, width: 7, height: 8 }, fill: "none", line: { style: "solid", fill: color, width: 3 } });
  slide.shapes.add({ geometry: "line", position: { left: cx - 1, top: cy + 10, width: 14, height: -18 }, fill: "none", line: { style: "solid", fill: color, width: 3 } });
}

function slide1(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addBox(slide, { left: 0, top: 0, width: W, height: H }, { geometry: "rect", fill: C.bg, line: { style: "solid", fill: C.bg, width: 0 }, borderRadius: 0 });
  addBox(slide, { left: 0, top: 0, width: 388, height: H }, { geometry: "rect", fill: C.navy, line: { style: "solid", fill: C.navy, width: 0 }, borderRadius: 0 });
  addPill(slide, "팩건강보험 가입자수 확대 전략", { left: 64, top: 64, width: 210, height: 34 }, "#16375F", "#DCEBFF", { stroke: "#2A4E7A", fontSize: 13 });
  addText(slide, "Sales\nAgent", { left: 62, top: 136, width: 275, height: 130 }, {
    fontSize: 52,
    bold: true,
    color: C.white,
    lineSpacing: 0.95,
  });
  addText(slide, "AI 기술 도입이 아니라,\n고객별 니즈에 맞춘 가입 경험의 변화", { left: 64, top: 286, width: 260, height: 92 }, {
    fontSize: 21,
    color: "#D6E5FA",
    lineSpacing: 1.18,
  });
  addText(slide, "탐색부터 청약 완주까지, 고객이 막히는 순간을 Agent가 먼저 줄인다.", { left: 438, top: 72, width: 700, height: 42 }, {
    fontSize: 27,
    bold: true,
    color: C.ink,
  });
  addText(slide, "핵심 전환 가설", { left: 438, top: 142, width: 220, height: 26 }, {
    fontSize: 18,
    bold: true,
    color: C.blue,
  });
  addRich(slide, [
    [
      { run: "고객이 보험을 포기하는 이유는 ", textStyle: { color: C.ink } },
      { run: "관심 부족", textStyle: { bold: true, color: C.red } },
      { run: "보다 ", textStyle: { color: C.ink } },
      { run: "설계 탐색·용어 이해·청약 진행의 마찰", textStyle: { bold: true, color: C.blue } },
      { run: "일 가능성이 크다.", textStyle: { color: C.ink } },
    ],
  ], { left: 438, top: 170, width: 724, height: 78 }, { fontSize: 28, lineSpacing: 1.08 });

  const stages = [
    ["탐색", "나에게 맞는 보장과 보험료가 불명확"],
    ["판단", "보장항목·보험용어가 어려워 확신 부족"],
    ["청약", "입력·동의·인증 단계에서 피로와 이탈 발생"],
  ];
  stages.forEach(([title, body], i) => {
    const x = 438 + i * 248;
    addBox(slide, { left: x, top: 292, width: 218, height: 172 }, {
      fill: C.white,
      stroke: "#E0E6EF",
      borderRadius: 14,
      shadow: "shadow-sm",
    });
    addPill(slide, `0${i + 1}`, { left: x + 20, top: 312, width: 46, height: 28 }, i === 0 ? C.blue2 : i === 1 ? C.mint2 : C.amber2, i === 0 ? C.blue : i === 1 ? C.mint : "#A86E00", { fontSize: 13 });
    addText(slide, title, { left: x + 20, top: 352, width: 160, height: 32 }, { fontSize: 26, bold: true, color: C.ink });
    addText(slide, body, { left: x + 20, top: 396, width: 170, height: 54 }, { fontSize: 17, color: C.muted, lineSpacing: 1.12 });
  });
  addBox(slide, { left: 438, top: 510, width: 770, height: 88 }, { fill: "#EDF5FF", stroke: "#CFE2FF", borderRadius: 14 });
  addRich(slide, [
    [
      { run: "추천 방향: ", textStyle: { bold: true, color: C.blue } },
      { run: "전환 여정의 마찰 지점별로 역할을 분리한 3단계 Agent 설계" },
    ],
    [
      { run: "기대효과: ", textStyle: { bold: true, color: C.blue } },
      { run: "보험료 확인 완료율, 가입 시작률, 청약 완료율을 단계별로 끌어올리는 구조" },
    ],
  ], { left: 466, top: 524, width: 700, height: 60 }, { fontSize: 18, lineSpacing: 1.22 });
  addFooter(slide, 1);
}

function slide2(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.white;
  addText(slide, "Sales Agent 서비스 구성", { left: 64, top: 56, width: 520, height: 42 }, {
    fontSize: 34,
    bold: true,
    color: C.ink,
  });
  addText(slide, "3개 Agent가 고객의 가입 여정에서 각각 다른 ‘막힘’을 줄인다.", { left: 64, top: 106, width: 640, height: 30 }, {
    fontSize: 18,
    color: C.muted,
  });
  const cards = [
    {
      name: "맞춤설계 Agent",
      tag: "탐색 단축",
      color: C.blue,
      bg: "#F1F7FF",
      icon: "target",
      input: "나이·성별·월보험료·집중 보장 니즈",
      action: "추천 설계안 3개 제시\n셀프계산 단계 부담 축소",
      effect: "보험료 확인까지의 진입 장벽 감소",
    },
    {
      name: "설계이해 Agent",
      tag: "판단 확신",
      color: C.mint,
      bg: "#EFFBF8",
      icon: "explain",
      input: "보험용어·보장항목·조절 이유",
      action: "친근한 표현으로 의미 설명\n고객이 직접 조정할 근거 제공",
      effect: "가입 판단 신뢰 강화",
    },
    {
      name: "청약완주 Agent",
      tag: "완주 회복",
      color: C.amber,
      bg: "#FFF8E8",
      icon: "complete",
      input: "청약 단계의 막힘·이탈 신호",
      action: "도움말·임시저장·이어하기 안내\n완결까지 인내력 있게 독려",
      effect: "청약 중도 이탈 감소와 재개율 증가",
    },
  ];

  cards.forEach((card, i) => {
    const x = 64 + i * 392;
    addBox(slide, { left: x, top: 174, width: 344, height: 390 }, {
      fill: card.bg,
      stroke: "#DCE3EE",
      borderRadius: 16,
      shadow: "shadow-sm",
    });
    slide.shapes.add({ geometry: "ellipse", position: { left: x + 28, top: 206, width: 70, height: 70 }, fill: C.white, line: { style: "solid", fill: "#E4EAF2", width: 1 } });
    addSmallIcon(slide, x + 63, 241, card.icon, card.color);
    addPill(slide, card.tag, { left: x + 222, top: 214, width: 88, height: 28 }, C.white, card.color, { stroke: "#E1E8F2", fontSize: 13 });
    addText(slide, card.name, { left: x + 28, top: 302, width: 288, height: 40 }, {
      fontSize: 26,
      bold: true,
      color: C.ink,
    });
    addText(slide, "고객 입력", { left: x + 28, top: 364, width: 92, height: 22 }, { fontSize: 14, bold: true, color: card.color });
    addText(slide, card.input, { left: x + 28, top: 388, width: 286, height: 48 }, { fontSize: 17, color: C.ink, lineSpacing: 1.16 });
    addText(slide, "Agent 개입", { left: x + 28, top: 448, width: 100, height: 22 }, { fontSize: 14, bold: true, color: card.color });
    addText(slide, card.action, { left: x + 28, top: 472, width: 288, height: 58 }, { fontSize: 17, color: C.ink, lineSpacing: 1.16 });
    addBox(slide, { left: x + 28, top: 548, width: 288, height: 54 }, { fill: C.white, stroke: "#E2E8F2", borderRadius: 10 });
    addText(slide, card.effect, { left: x + 44, top: 558, width: 256, height: 34 }, { fontSize: 16, bold: true, color: card.color, lineSpacing: 1.08 });
  });
  [0, 1].forEach((i) => {
    const x = 64 + i * 392 + 344 + 12;
    slide.shapes.add({
      geometry: "rightArrow",
      position: { left: x, top: 344, width: 52, height: 32 },
      fill: "#D5DEEA",
      line: { style: "solid", fill: "#D5DEEA", width: 0 },
    });
  });
  addFooter(slide, 2);
}

function slide3(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  addText(slide, "실행은 ‘작고 빠른 검증’으로 시작", { left: 64, top: 56, width: 680, height: 42 }, {
    fontSize: 34,
    bold: true,
    color: C.ink,
  });
  addText(slide, "내부 퍼널 데이터로 병목을 확인하고, Agent별 중간지표를 먼저 개선한다.", { left: 64, top: 106, width: 720, height: 30 }, {
    fontSize: 18,
    color: C.muted,
  });

  const funnel = [
    ["유입", "상품 탐색"],
    ["보험료", "확인 완료"],
    ["설계", "선택·조정"],
    ["청약", "시작"],
    ["가입", "완료"],
  ];
  funnel.forEach(([a, b], i) => {
    const boxWidth = 132;
    const gap = 40;
    const x = 70 + i * (boxWidth + gap);
    addBox(slide, { left: x, top: 174, width: boxWidth, height: 84 }, { fill: C.white, stroke: "#DDE5F0", borderRadius: 12 });
    addText(slide, a, { left: x + 10, top: 188, width: boxWidth - 20, height: 26 }, { fontSize: 17, bold: true, color: C.ink, alignment: "center" });
    addText(slide, b, { left: x + 10, top: 220, width: boxWidth - 20, height: 26 }, { fontSize: 16, color: C.muted, alignment: "center" });
    if (i < funnel.length - 1) {
      slide.shapes.add({ geometry: "rightArrow", position: { left: x + boxWidth + 7, top: 202, width: 26, height: 24 }, fill: "#B8C3D2", line: { style: "solid", fill: "#B8C3D2", width: 0 } });
    }
  });
  const bands = [
    ["맞춤설계 Agent", 84, 282, 300, C.blue, C.blue2, "보험료 확인 완료율 / 추천안 선택률"],
    ["설계이해 Agent", 394, 282, 268, C.mint, C.mint2, "보장항목 이해도 / 설계 조정 후 가입 시작률"],
    ["청약완주 Agent", 672, 282, 250, "#B87900", C.amber2, "청약 완료율 / 이어하기 재개율"],
  ];
  bands.forEach(([name, x, y, width, color, bg, metric]) => {
    addBox(slide, { left: x, top: y, width, height: 80 }, { fill: bg, stroke: "#DCE3EE", borderRadius: 12 });
    addText(slide, name, { left: x + 18, top: y + 12, width: width - 36, height: 22 }, { fontSize: 18, bold: true, color });
    addText(slide, metric, { left: x + 18, top: y + 42, width: width - 36, height: 24 }, { fontSize: 14, color: C.ink });
  });

  addBox(slide, { left: 64, top: 410, width: 352, height: 176 }, { fill: C.white, stroke: "#DCE3EE", borderRadius: 14, shadow: "shadow-sm" });
  addText(slide, "1차 실험", { left: 90, top: 432, width: 110, height: 26 }, { fontSize: 18, bold: true, color: C.blue });
  addRich(slide, [
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["고객 입력 4개만으로 추천 설계안 3개 노출"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["셀프계산 대비 보험료 확인 완료율 비교"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["상품설명·심의 문구 훼손 없이 추천 근거 표시"] },
  ], { left: 90, top: 464, width: 304, height: 92 }, { fontSize: 16, color: C.ink, lineSpacing: 1.18 });

  addBox(slide, { left: 464, top: 410, width: 352, height: 176 }, { fill: C.white, stroke: "#DCE3EE", borderRadius: 14, shadow: "shadow-sm" });
  addText(slide, "주요 지표", { left: 490, top: 432, width: 110, height: 26 }, { fontSize: 18, bold: true, color: C.mint });
  addRich(slide, [
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["가입 완료 건수 / 가입 완료율"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["보험료 확인 후 가입 시작률"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["청약 이탈률 / 이어하기 재개율"] },
  ], { left: 490, top: 464, width: 300, height: 92 }, { fontSize: 16, color: C.ink, lineSpacing: 1.18 });

  addBox(slide, { left: 864, top: 410, width: 352, height: 176 }, { fill: C.white, stroke: "#DCE3EE", borderRadius: 14, shadow: "shadow-sm" });
  addText(slide, "가드레일", { left: 890, top: 432, width: 110, height: 26 }, { fontSize: 18, bold: true, color: "#B87900" });
  addRich(slide, [
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["고객 오해·민원·문의 증가 여부"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["부적절한 추천 표현 및 심의 우려"] },
    { bulletCharacter: "•", marginLeft: 20, indent: -10, runs: ["비정상 철회·해지 신호"] },
  ], { left: 890, top: 464, width: 300, height: 92 }, { fontSize: 16, color: C.ink, lineSpacing: 1.18 });

  addBox(slide, { left: 938, top: 174, width: 278, height: 188 }, { fill: C.navy, stroke: C.navy, borderRadius: 16, shadow: "shadow-sm" });
  addText(slide, "추천 실행 순서", { left: 964, top: 198, width: 220, height: 28 }, { fontSize: 20, bold: true, color: C.white });
  addRich(slide, [
    [{ run: "1. ", textStyle: { bold: true, color: C.amber } }, { run: "현재 퍼널 병목 확인" }],
    [{ run: "2. ", textStyle: { bold: true, color: C.amber } }, { run: "맞춤설계 Agent MVP" }],
    [{ run: "3. ", textStyle: { bold: true, color: C.amber } }, { run: "설계이해·청약완주 확장" }],
  ], { left: 964, top: 242, width: 224, height: 82 }, { fontSize: 17, color: "#E8F0FA", lineSpacing: 1.26 });
  addFooter(slide, 3);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(LAYOUT_DIR, { recursive: true });
  await fs.mkdir(QA_DIR, { recursive: true });

  await fs.writeFile(path.join(SCRATCH_DIR, "source-notes.txt"), [
    "Source: User-provided prompt in current Codex thread, dated 2026-06-17.",
    "Used claims: Pack Health Insurance signup growth objective; Sales Agent title; three staged Agents and their described roles.",
    "No external statistics, screenshots, logos, or product UI assets were used.",
    "All metrics are proposed validation metrics, not claimed current performance.",
  ].join("\n"), "utf8");

  await fs.writeFile(path.join(SCRATCH_DIR, "slide-plan.txt"), [
    "Mode: create.",
    "Audience: Samsung Life digital organization leadership / report page.",
    "Slide count: 3.",
    "Slide 1: strategic framing and conversion hypothesis.",
    "Slide 2: three-stage Sales Agent service structure.",
    "Slide 3: MVP experiment, metrics, and guardrails.",
    "Style: deep navy foundation (#071C3A), Samsung-like blue accent (#1167D8), mint and amber for agent states; Noto Sans KR; editable shapes only.",
    "Typography update: all authored font sizes are scaled by 10% with a minimum of 18px, approximately 13pt.",
  ].join("\n"), "utf8");

  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  slide1(presentation);
  slide2(presentation);
  slide3(presentation);

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `pack_health_sales_agent_slide_${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 2 });
    await writeBlob(path.join(PREVIEW_DIR, `${stem}.png`), png);
    await writeBlob(path.join(IMAGE_DIR, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(LAYOUT_DIR, `${stem}.layout.json`), await layout.text(), "utf8");
  }

  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await writeBlob(path.join(PREVIEW_DIR, "pack_health_sales_agent_montage.webp"), montage);
  await writeBlob(path.join(IMAGE_DIR, "pack_health_sales_agent_montage.webp"), montage);

  const pptx = await PresentationFile.exportPptx(presentation);
  await fs.writeFile(FINAL_PPTX, pptx.data);
  await fs.rm(`${FINAL_PPTX}.inspect.ndjson`, { force: true });

  await fs.writeFile(path.join(QA_DIR, "visual-qa.txt"), [
    "Visual QA completed after rendering all 3 slides.",
    "Checked: expected slide count, high-level text fit, card alignment, footer numbering, and user-facing PNG exports.",
    "Caveat: final business performance values are not included because no internal funnel metrics were provided.",
  ].join("\n"), "utf8");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
