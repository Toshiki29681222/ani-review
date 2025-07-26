import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function naturalToFilter(query) {
  const prompt = `
Convert this anime search query to AniList search parameters.
Respond ONLY with valid JSON:
{
  "term": "", 
  "filter": { 
    "genre": string | null,
    "tag": string | null,
    "seasonYear": number | null,
    "startDate_greater": number | null,
    "format": string | null
  }
}
Rules:
- If query says "after XXXX" or "以降", set startDate_greater to YYYYMMDD (e.g., 2020年以降 -> 20200101) and leave seasonYear null.
- If query says "in XXXX year" or "XXXX年の", set seasonYear to XXXX and leave startDate_greater null.
- Use genre for broad category (Sports, Slice of Life, etc.).
- Do not include any explanation, just JSON.
Query: "${query}"
`;

  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  // コードブロック除去 & JSONだけ抽出
  let json = res.output_text.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(json);

    // seasonYearもstartDate_greaterも両方nullならデフォルト補完
    if (!parsed.filter.seasonYear && !parsed.filter.startDate_greater) {
      parsed.filter.seasonYear = 2020; // フォールバック（必要なら調整可）
    }

    // null を削除
    function cleanFilter(filter) {
      return Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(filter).filter(([_, v]) => v !== null)
      );
    }

    // 返却時
    return { term: parsed.term, filter: cleanFilter(parsed.filter) };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error("Parse error. Raw:", json);
    // フォールバック
    return {
      term: "",
      filter: {
        genre: null,
        tag: null,
        seasonYear: 2020,
        startDate_greater: null,
        format: null,
      },
    };
  }
}
