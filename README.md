## Anime Review Log（アニメ感想ログ）

アニメの感想や評価を自分のために記録できる、**シンプルなレビューアプリ**です。
作品ごと、エピソードごとに感想を管理できます。

---

### 画面イメージ

<!-- <img src="./docs/アニメ検索画面イメージ.png" height="500px"/> -->

---

## 機能一覧

- 作品の検索（Anilist API を使用）
- 作品・エピソードの一覧表示
- 各アニメ・エピソードに対してレビュー投稿・閲覧
- お気に入り管理機能（予定）

---

## 技術スタック

| 項目           | 使用技術                                      |
| -------------- | --------------------------------------------- |
| フレームワーク | Next.js 15（App Router）                      |
| スタイル       | Tailwind CSS                                  |
| API 連携       | Anilist API（GraphQL）<br/>Annict API（REST） |
| ユーザー認証   | NextAuth.js（Credentials Provider 使用）      |
| デプロイ環境   | Vercel（サーバーレス）                        |
| データベース   | Supabase（PostgreSQL）                        |
| ORM            | Prisma                                        |

---

## ディレクトリ構成（抜粋）

```txt
.
├── app/
│   ├── anime/            # アニメ一覧ページ
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # ホーム画面
│
├── components/
│   ├── Header.tsx        # ヘッダー
│   ├── Footer.tsx        # フッター
│   ├── AnimeGrid.tsx     # アニメ一覧グリッド
│   ├── AnimeCard.tsx     # 各アニメカード
│   ├── SearchBar.tsx     # タイトル検索バー
│
├── styles/
│   └── globals.css       # グローバルスタイル（Tailwindベース）
```

---

## セットアップ方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/Toshiki2968/ani-review.git
   cd anime-review-log
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **開発サーバを起動**

   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**

   ```
   http://localhost:3000
   ```

---

## 外部 API について

このアプリでは、以下の API からアニメ情報を取得しています：

- [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)

- [Annnict REST API](https://developers.annict.com/docs/rest-api/v1)

---

## 今後の予定（ToDo）

- [ ] アニメに対するエピソードの自動取得・表示
- [ ] ユーザーによるレビュー投稿・編集機能
- [ ] フィルタリング
- [ ] AI 検索：気分やジャンルからアニメ提案
- [ ] お気に入り管理

---

## 制作意図

現在は多くのサブスクリプションサービスが存在し、何を観たのか、どう感じたのかを自分のために整理・記録できる機能が欲しいと考えました。
また、私自身がアニメ制作会社やアニメーターに関心を持っているため、そうした切り口から作品を探せるよう、フィルター機能なども取り入れる工夫をしています。
