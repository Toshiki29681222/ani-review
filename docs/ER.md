```mermaid
erDiagram
    USER ||--o{ ANIMEREVIEW : "writes"
    ANIME ||--o{ ANIMEREVIEW : "has"
    ANIMEREVIEW ||--o{ REVIEWTAG : "tagged as"
    TAG ||--o{ REVIEWTAG : "contains"

    USER {
      id PK string
      name string
      email "UNIQUE" string
    }

    ANIME {
      string id PK "external ID (e.g., Anilist)"
      string title
      string coverImage "nullable"
      string description "nullable"
    }

    ANIMEREVIEW {
      string id PK
      string userId FK
      string animeId FK
      int    rating "1..5"
      string comment
      datetime viewedAt
    }

    TAG {
      string id PK
      string name "UNIQUE"
    }

    REVIEWTAG {
      string reviewId PK, FK
      string tagId    PK, FK
    }

```
