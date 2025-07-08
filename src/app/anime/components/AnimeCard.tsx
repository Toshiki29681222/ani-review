"use client";

import { useEffect, useState } from "react";

type AnimeTitle = {
  romaji: string;
  english: string;
  native: string;
};

type Anime = {
  id: number;
  title: AnimeTitle;
};

export default function AnimeCard() {
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
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

    const fetchAnime = async () => {
      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query, variables }),
        });

        const json = await response.json();
        if (response.ok) {
          setAnime(json.data.Media);
        } else {
          console.error("GraphQL error:", json);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div>
      <h1>アニメ情報</h1>
      {anime ? (
        <div>
          <p>
            <strong>Romaji:</strong> {anime.title.romaji}
          </p>
          <p>
            <strong>English:</strong> {anime.title.english}
          </p>
          <p>
            <strong>Native:</strong> {anime.title.native}
          </p>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
    </div>
  );
}
