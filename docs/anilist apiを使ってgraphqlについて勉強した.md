## はじめに

現在、個人開発で「アニメ感想管理アプリ」を作成しています。
その中でアニメ情報を取得する外部 API が必要になり、いくつか候補を調べた結果、アニメタイトルや画像などの情報がそろっている、graphql のため、ほしい情報のみを取得することができドキュメントもきれいで見やすいといった理由で**Anilist API**を採用しました。
Graphql を触るのは初めてなのでそのことについて勉強したことを残していきたいと思います。

---

## 🎯 Anilist API とは？

Anilist は、アニメ・マンガなどのデータを提供しているサービスで、**GraphQL で情報を取得する API**を公開しています。

---

## データを取得してみる

GraphQL は、以下のように\*\*クエリ（query）文字列と変数（variables）\*\*を組み合わせて、HTTP POST でサーバーに送信することでデータを取得します。

```
var query = `
query ($id: Int) {
  Media (id: $id, type: ANIME){
    id
    title {
      romaji
      english
      native
    }
  }
}
`;
```

---

## 💻 TypeScript で Anilist にクエリを送るコード

以下は、`fetch` を使って TypeScript（JS 互換）で Anilist API にクエリを送る基本的なコードです。

```ts
type MediaTitle = {
  romaji: string;
  english?: string;
  native: string;
};

type Media = {
  id: number;
  title: MediaTitle;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type MediaQueryResult = {
  Media: Media;
};

const query = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
    }
  }
`;

const variables = {
  id: 15125,
};

fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ query, variables }),
})
  .then(async (response) => {
    const json: GraphQLResponse<MediaQueryResult> = await response.json();
    if (!response.ok || json.errors) {
      throw json.errors ?? new Error("Unknown GraphQL error");
    }
    return json.data;
  })
  .then((data) => {
    console.log("Media:", data?.Media.title.romaji);
  })
  .catch((error) => {
    console.error("GraphQL Error:", error);
  });
```

---

## 📦 アプリが大きくなると出てくる課題

この方法でも十分に動作しますが、開発が進んでクエリが増えると、**毎回レスポンス型を手書きするのが大変**になります。

---

## ✅ Apollo Client + Codegen の活用

Anilist API は GraphQL スキーマが提供されているため、**GraphQL Code Generator**を使って、クエリから型を自動生成できます。

また、**Apollo Client**を使えば以下のようなメリットも得られます：

- 自動的に型付きのクエリ Hooks を生成
- キャッシュやリトライなどの便利機能が標準搭載
- 保守性・拡張性が高い

---

## 🔧 例：Apollo + Codegen 構成（準備中）

```ts
// クエリ
query GetMedia($id: Int!) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
    }
  }
}
```

> ※ クエリファイル（`.graphql`）と `codegen.yml` を使って自動生成する流れについては、別記事で紹介予定です。

---

## ✍️ おわりに

Anilist API は、個人開発でアニメ情報を扱いたい人にとってとても使いやすい API です。
GraphQL と TypeScript を組み合わせることで、**柔軟かつ型安全に扱える**ようになります。

今後は `Apollo Client` + `Codegen` を使った効率的な開発環境についてもまとめていきます。
