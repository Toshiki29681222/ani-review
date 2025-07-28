import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const query = "2020年以降のスポーツアニメ";

// OpenAI クライアント
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// JSON生成の指示（プロンプト）
// 英語で書くと精度が上がるため英語で記載
const prompt = `
    Convert this anime search query to AniList search parameters.
    Respond ONLY with valid JSON:
        { 
            "genre": string,
            "startDate_greater": number,
        }
    Rules:
        - If query says "after XXXX" or "以降", set startDate_greater to YYYYMMDD (e.g., 2020年以降 -> 20200101)
        - Use genre for broad category (Sports, Slice of Life, etc.).
        - Do not include any explanation, just JSON.
    Query: "${query}"
`;

// リクエストを送信
const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: prompt,
});

// コードブロック記号を削除して純粋なJSONだけ抽出
let json = response.output_text.replace(/```json|```/g, "").trim();

const params = JSON.parse(json); // { genre: "Sports", startDate_greater: 20200101 }

// 2. GraphQLクエリを組み立て
const gqlQuery = `
query ($genre: String, $startDate: FuzzyDateInt) {
  Page(perPage: 5) {
    media(genre: $genre, startDate_greater: $startDate, type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      seasonYear
      genres
    }
  }
}`;

// 3. AniList API を叩く
const res = await fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: gqlQuery,
    variables: {
      genre: params.genre,
      startDate: params.startDate_greater,
    },
  }),
});
const data = await res.json();

console.log("=== Search Results ===");
data.data.Page.media.forEach((m) => {
  console.log(`${m.title.romaji} (${m.seasonYear})`);
});
