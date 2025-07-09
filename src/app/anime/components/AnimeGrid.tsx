// components/AnimeGrid.tsx
"use client";

import { SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

type AnimeTitle = {
  romaji: string;
  english: string;
  native: string;
};

type CoverImage = {
  large: string;
  medium: string;
};

type Anime = {
  id: number;
  title: AnimeTitle;
  coverImage: CoverImage;
};

export default function AnimeGrid() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AnimeGrid component mounted, fetching anime list...");
    const query = `
      query {
        Page(page: 1, perPage: 12) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
          }
        }
      }
    `;
    console.log("Fetching anime list with query:", query);

    const fetchAnimeList = async () => {
      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();
        setAnimeList(json.data.Page.media);
        console.log("Anime list fetched successfully", json.data.Page.media);
      } catch (error) {
        console.error("Anime list fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="xl" />
      </Center>
    );
  }
  return (
    <SimpleGrid columns={[2, null, 4]} p={4}>
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </SimpleGrid>
  );
}
