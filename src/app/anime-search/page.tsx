"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AnimeGrid from "../components/AnimeGrid";

export default function AnimeSearchPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    const fetchKyotoAnimationAnime = async () => {
      const query = `
        query {
          Studio(id: 2) {
            name
            media(perPage: 20, sort: POPULARITY_DESC) {
              edges {
                node {
                  id
                  title {
                    romaji
                    native
                  }
                  coverImage {
                    large
                  }
                  startDate {
                    year
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      if (json.errors) {
        console.error("GraphQL error:", json.errors);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anime = json.data.Studio.media.edges.map((edge: any) => edge.node);
      const uniqueAnimeList = anime.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (anime: any, index: any, self: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          self.findIndex((a: any) => a.id === anime.id) === index
      );
      setAnimeList(uniqueAnimeList);
    };

    fetchKyotoAnimationAnime();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <SearchBar />
        <AnimeGrid animeList={animeList} />
      </div>
    </div>
  );
}
