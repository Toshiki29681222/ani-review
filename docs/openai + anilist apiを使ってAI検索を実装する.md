# OpenAI × AniList API × MCP サーバで自然文アニメ検索を作ってみた

こんにちは。
今回は自分が作っているアプリで\*\*「2020 年以降のスポーツアニメ」\*\*のような自然文検索ができるようにしたいと思い、その過程を記事にまとめます。

---

## やりたいこと

- **ユーザーが自然文で検索**
  例：「2020 年以降のスポーツアニメ」
- **OpenAI で自然文をパラメータ化**
  → JSON 形式でジャンルや年月に分割
- **AniList API から該当作品を取得**
  → 有志の方が作ってくださった MCP サーバを活用

> もし MCP サーバがなければ、OpenAI に直接 GraphQL クエリを作らせる必要がありましたが、ありがたいことに有志の方が **AniList API 用 MCP サーバ** を公開してくださっていたので活用します。感謝です…！

MCP サーバを触るのは今回が初めてなので、その体験記も含めてまとめます。

---

## 実装の流れ

1. **クライアントから自然文を OpenAI に送信**
   → 「ジャンル」「開始年月」などのパラメータを JSON で生成してもらう
2. **返ってきた JSON をもとに MCP サーバへリクエスト**
   → AniList API で該当作品を検索
3. **結果をクライアントで受け取る**

フロー図：

```
AI クライアント → OpenAI → AI クライアント → AniList MCP サーバ → AniList API → MCP → AI クライアント
```

---

## OpenAI API キーの準備

まずは OpenAI API キーを取得します。

1. [OpenAI の管理画面](https://platform.openai.com/)にアクセス
2. \*\*「API キーを作成」\*\*をクリック
   → **注意**：API キーは再表示できないので必ずメモしておく

> 私はメモを忘れてしまい、作り直しました 😓

また、無料ではエラーが出るため、利用には課金が必要です。
テスト用なので、私は最低額の **5 ドル** をチャージしました。

---

## プロジェクトの作成

テスト用のディレクトリを作ります：

```console
mkdir anilist-mcp-test
cd anilist-mcp-test
```

ライブラリをインストールします：

```console
npm install openai
npm install dotenv
```

---

## OpenAI に自然文 → JSON 変換を依頼する

まずは **OpenAI に自然文を渡して JSON で返してもらう**部分を書きます。

### index.js

````javascript
// index.js

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
````

---

### 実行

```console
node index.js
```

返ってきた結果：

```json
{
  "genre": "Sports",
  "startDate_greater": 20200101
}
```

**成功！**
自然文がきれいな検索パラメータになりました。

---

## AniList API で検索

最後に、この JSON を使って **AniList API から該当アニメを取得**します。
有志の方が **型チェック付きの MCP サーバ**を公開してくださっているので、そちらを活用します。
https://github.com/yuna0x0/anilist-mcp?tab=readme-ov-file

---

### まとめ

- **自然文 → JSON** の変換は OpenAI に任せる
- **AniList API へのリクエストは MCP サーバで簡単化**
- **英語プロンプト**を使うことで精度が向上

---
