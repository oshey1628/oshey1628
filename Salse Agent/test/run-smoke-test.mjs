import fs from "node:fs/promises";
import playwrightPkg from "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js";

const { chromium } = playwrightPkg;

const baseUrl =
  "file:///C:/Users/user/Desktop/AI%20assistant%20for%20Pack/codex-current/files-mentioned-by-the-user-pptx/outputs/pack-ai-agent-stage1";
const indexUrl = `${baseUrl}/index.html`;
const recommendRestoreUrl = `${baseUrl}/index.html?restore=recommend`;
const resultPath = "C:/Users/user/Desktop/AI assistant for Pack/test/smoke-result.json";

const birthMap = {
  "20대 이하": "20050101",
  "30대": "19920101",
  "40대": "19810101",
  "50대 이상": "19680101",
};

const needMap = {
  "암": "암",
  "뇌심장": "뇌·심장 혈관질환",
  "치매": "치매",
  "골고루": "균형",
};

const smokeCases = [
  { id: "S01", age: "20대 이하", gender: "남성", premium: "3~5만원", need: "암" },
  { id: "S02", age: "20대 이하", gender: "여성", premium: "5~10만원", need: "뇌심장" },
  { id: "S03", age: "30대", gender: "남성", premium: "10~15만원", need: "치매" },
  { id: "S04", age: "30대", gender: "여성", premium: "15만원 이상", need: "골고루" },
  { id: "S05", age: "40대", gender: "남성", premium: "5~10만원", need: "암" },
  { id: "S06", age: "40대", gender: "여성", premium: "3~5만원", need: "뇌심장" },
  { id: "S07", age: "50대 이상", gender: "남성", premium: "15만원 이상", need: "치매" },
  { id: "S08", age: "50대 이상", gender: "여성", premium: "10~15만원", need: "골고루" },
  { id: "S09", age: "30대", gender: "남성", premium: "3~5만원", need: "뇌심장" },
  { id: "S10", age: "40대", gender: "여성", premium: "15만원 이상", need: "암" },
  { id: "S11", age: "50대 이상", gender: "남성", premium: "5~10만원", need: "골고루" },
  { id: "S12", age: "20대 이하", gender: "여성", premium: "10~15만원", need: "치매" },
];

function normalize(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function onlyDigits(text) {
  return (text || "").replace(/[^0-9]/g, "");
}

function categoryOf(label) {
  if (
    label.startsWith("암진단") ||
    label.startsWith("암치료") ||
    label.startsWith("프리미엄 암치료") ||
    label.startsWith("암진단시")
  ) {
    return "암";
  }
  if (label.startsWith("뇌/심장")) return "뇌심장";
  if (label.startsWith("치매") || label.startsWith("간병")) return "치매";
  if (
    label.startsWith("입원") ||
    label.startsWith("수술") ||
    label.startsWith("일상생활") ||
    label.startsWith("사망보장")
  ) {
    return "일상";
  }
  return "기타";
}

function isRelevant(need, labels) {
  const first3 = labels.slice(0, 3);
  if (need === "암") {
    return first3.some((x) => x.startsWith("암") || x.startsWith("프리미엄 암치료"));
  }
  if (need === "뇌심장") {
    return first3.some((x) => x.startsWith("뇌/심장"));
  }
  if (need === "치매") {
    return first3.some((x) => x.startsWith("치매") || x.startsWith("간병"));
  }
  if (need === "골고루") {
    return new Set(labels.map(categoryOf)).size >= 3;
  }
  return false;
}

async function fillCase(page, tc) {
  await page.goto(indexUrl, { waitUntil: "load" });
  await page.locator("#birthInput").fill(birthMap[tc.age]);
  await page.locator(`[data-gender="${tc.gender}"]`).click();
  await page.locator("#openSheet").click();
  await page.locator(`[data-premium="${tc.premium}"]`).click();
  await page.locator(`[data-need="${needMap[tc.need]}"]`).click();
  await page.locator("#recommendList .recommend-card").first().waitFor({ state: "visible", timeout: 12000 });
  const cardCount = await page.locator("#recommendList .recommend-card").count();
  if (cardCount !== 3) {
    throw new Error(`추천카드 수 이상: ${cardCount}`);
  }
}

async function getCardPrices(page) {
  const cards = page.locator("#recommendList .recommend-card");
  const count = await cards.count();
  const prices = [];
  for (let i = 0; i < count; i += 1) {
    prices.push(normalize(await cards.nth(i).locator(".price").innerText()));
  }
  return prices;
}

async function restoreRecommend(page) {
  await page.goto(recommendRestoreUrl, { waitUntil: "load" });
  await page.locator("#recommendList .recommend-card").first().waitFor({ state: "visible", timeout: 8000 });
}

async function getBenefitLabels(page) {
  const count = await page.locator("#modalBenefits li").count();
  const labels = [];
  for (let i = 0; i < count; i += 1) {
    labels.push(normalize(await page.locator("#modalBenefits li .label").nth(i).innerText()));
  }
  return labels;
}

function isTitleOk(need, planIndex, title) {
  if (planIndex === 0) {
    if (need === "암") return title.includes("강력한 암보장 선택!");
    if (need === "뇌심장") return title.includes("강력한 뇌·심보장 선택!");
    if (need === "치매") return title.includes("강력한 치매보장 선택!");
    if (need === "골고루") return title.includes("강력한 균형보장 선택!");
  }
  if (planIndex === 1) return title.includes("균형잡힌 보장을 선택!");
  return title.includes("실속형 보장으로 선택!");
}

async function verifyPlan(page, tc, planIndex, expectedPriceText) {
  await page.locator(`#recommendList .recommend-card[data-plan="${planIndex}"]`).click();
  await page.locator("#modal").waitFor({ state: "visible", timeout: 5000 });

  const title = normalize(await page.locator("#modalTitle").innerText());
  const modalPrice = normalize(await page.locator(".modal-price").innerText());
  const benefitLabels = await getBenefitLabels(page);
  const relevant = isRelevant(tc.need, benefitLabels);
  const titleOk = isTitleOk(tc.need, planIndex, title);
  const priceOkBefore = onlyDigits(modalPrice) === onlyDigits(expectedPriceText);

  await page.locator("#checkCoverage").click();
  await page.locator("#detailConfirm").waitFor({ state: "visible", timeout: 3000 });
  await page.locator("#detailConfirmAccept").click();
  await page.locator("#resultMonthlyPrice").waitFor({ state: "visible", timeout: 8000 });

  const resultPrice = normalize(await page.locator("#resultMonthlyPrice").innerText());
  const resultPriceOk = onlyDigits(resultPrice) === onlyDigits(expectedPriceText);
  const resultUrl = page.url();

  return {
    action: `R${planIndex + 1}`,
    pass: relevant && titleOk && priceOkBefore && resultPriceOk && resultUrl.includes("result-1.html"),
    title,
    titleOk,
    relevant,
    benefitPreview: benefitLabels.slice(0, 4),
    modalPrice,
    expectedPriceText,
    priceOkBefore,
    resultPrice,
    resultPriceOk,
    resultUrl,
  };
}

async function verifyDirect(page) {
  await page.locator("#directDesign").click();
  await page.locator("#resultMonthlyPrice").waitFor({ state: "visible", timeout: 8000 });
  const resultUrl = page.url();
  const visible = await page.locator("#resultMonthlyPrice").isVisible();
  return {
    action: "D",
    pass: visible && resultUrl.includes("result-1.html?from=direct"),
    resultUrl,
    resultPrice: normalize(await page.locator("#resultMonthlyPrice").innerText()),
  };
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

const context = await browser.newContext({
  viewport: { width: 430, height: 932 },
});

const page = await context.newPage();
const results = [];

try {
  for (const tc of smokeCases) {
    const caseResult = {
      id: tc.id,
      age: tc.age,
      gender: tc.gender,
      premium: tc.premium,
      need: tc.need,
      actions: [],
    };

    try {
      await fillCase(page, tc);
      const cardPrices = await getCardPrices(page);

      for (let i = 0; i < 3; i += 1) {
        const planResult = await verifyPlan(page, tc, i, cardPrices[i]);
        caseResult.actions.push(planResult);
        await restoreRecommend(page);
      }

      caseResult.actions.push(await verifyDirect(page));
      caseResult.pass = caseResult.actions.every((x) => x.pass);
    } catch (error) {
      caseResult.pass = false;
      caseResult.error = String(error?.message || error);
    }

    results.push(caseResult);
  }
} finally {
  await browser.close();
}

const summary = {
  executedAt: new Date().toISOString(),
  totalCases: results.length,
  passedCases: results.filter((x) => x.pass).length,
  failedCases: results.filter((x) => !x.pass).length,
  failedIds: results.filter((x) => !x.pass).map((x) => x.id),
  results,
};

await fs.writeFile(resultPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));
