```mermaid
flowchart TD
  HOME[ホーム /] -->|検索| SEARCH[アニメ検索結果一覧 /search?q=]
  SEARCH -->|作品選択| DETAIL[アニメ詳細 /anime/:id]
  DETAIL -->|マイレビュー表示/編集| MYPAGE[マイページ /me]
  HOME --> MYPAGE
  MYPAGE -->|視聴履歴から| DETAIL
  HOME --> ADMIN[管理者ダッシュボード /admin]
  ADMIN --> ADMIN_ANIME[アニメ管理 /admin/anime]
  ADMIN --> ADMIN_USERS[ユーザー管理 /admin/users]
  ADMIN_ANIME --> DETAIL

  %% 補助（任意）
  classDef optional stroke-dasharray: 4 4,opacity:0.8
```
