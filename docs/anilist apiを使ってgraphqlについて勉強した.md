## はじめに

現在、個人開発で「アニメ感想管理アプリ」を作成しています。
その中でアニメ情報を取得する外部 API が必要になり、いくつか候補を調べた結果、アニメタイトルや画像などの情報がそろっている、graphql のため、ほしい情報のみを取得することができドキュメントもきれいで見やすいといった理由で**Anilist API**を採用しました。
Graphql を触るのは初めてなのでそのことについて勉強したことを残していきたいと思います。

---

## 🎯 Anilist API とは？

Anilist は、アニメ・マンガなどのデータを提供しているサービスで、**GraphQL で情報を取得する API**を公開しています。

---

##　クエリの構造　一部抜粋
Root Query
Media
id(引数)
title
romaji(列)

## アニメデータを取得してみる

GraphQL は、以下のようにクエリ（query）文字列と変数（variables）を組み合わせて、HTTP POST でサーバーに送信することでデータを取得します。

body には以下を追加します

```
{
      query: `
query ($id: Int) {
  Media (id: $id){
    id
    title {
      romaji
    }
  }
}
`,
      variables: {id: 15125},
    }
```

以下のようにデータが返ってきます。

```
{
  "data": {
    "Media": {
      "id": 15125,
      "title": {
        "romaji": "Teekyuu"
      }
    }
  }
}
```

---

---

## ✍️ おわりに

Anilist API は、個人開発でアニメ情報を扱いたい人にとってとても使いやすい API です。
GraphQL と TypeScript を組み合わせることで、**柔軟かつ型安全に扱える**ようになります。

今後は `Apollo Client` + `Codegen` を使った効率的な開発環境についてもまとめていきます。
