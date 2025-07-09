// components/AnimeCard.tsx
import { Box, Text, Image } from "@chakra-ui/react";
import { Anime } from "./types";

type AnimeCardProps = {
  anime: Anime;
};

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
    >
      {anime.coverImage && (
        <Image
          src={anime.coverImage.large}
          alt={anime.title.romaji}
          width={300}
          height={400}
          objectFit="cover"
          borderTopRadius="xl"
        />
      )}
      <Box p={4}>
        <Text fontWeight="bold">{anime ? anime.title.romaji : ""}</Text>
        <Text fontSize="sm" color="gray.500">
          {anime ? anime.title.english : ""}
        </Text>
      </Box>
    </Box>
  );
}
