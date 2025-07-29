# OpenAI × AniList API でアニメ検索する

こんにちは。
今回は自分が作っているアプリで\*\*「2020 年以降のスポーツアニメ」\*\*のような 自然文で検索ができるようにしたいと思い、データが取得できるまでを記事にまとめます。

---

## やりたいこと

- **ユーザーが自然文で検索**
  例：「2020 年以降のスポーツアニメ」
- **OpenAI で自然文をパラメータ分割**
  → JSON 形式でジャンルや年月に分割
- **AniList API から該当作品を取得**
  → GraphQL でリクエスト

---

## フロー図

<img src="./openai + anilist apiを使ってAI検索を実装する.png">

---

## 1. OpenAI API キーの準備

まずは OpenAI API キーを取得します。

1. [OpenAI の管理画面](https://platform.openai.com/api-keys)にアクセス
2. \*\*「API キーを作成」\*\*をクリック
   → **注意**：API キーは再表示できないのでメモしておく

> 私はメモを忘れてしまい、作り直しました 😓

また、利用には課金が必要です。
テスト用なので、私は最低額の 5 ドルだけをチャージしました。

---

## 2.プロジェクトの作成

テスト用のディレクトリを作ります：

```console
mkdir openai-anilist-test
cd openai-anilist-test
```

ライブラリをインストールします：

```console
npm install openai
npm install dotenv
```

---

## 3.処理実装 <br>(OpenAI による自然文変換から AniListAPI クエリ送信まで)

\*\*OpenAI に自然文を渡して JSON で返してもらい、取得した情報で AniListAPI へアクセスします。

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
// OpenAIから受け取ったジャンルと開始日を変数に設定
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

```console
=== Search Results ===
Haikyuu!! TO THE TOP (2020)
Blue Lock (2022)
Haikyuu!! TO THE TOP 2 (2020)
SK∞ (2021)
Haikyuu!! Riku VS Kuu (2020)
```

取得できました！

---

### まとめ

OpenAI に細かく指示を出すことで、パラメータをうまく抽出できるようになりました。
ただ現状だとジャンルと開始日でしか検索できません。
そのため、OpenAI への命令内容の強化と動的な GraphQL クエリの組み立てが今後の課題になると思っています。
