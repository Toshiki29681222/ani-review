"use client";

import {
  Box,
  Button,
  Checkbox,
  createListCollection,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Portal,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AnimeSearchPage() {
  const [value, setValue] = useState<string[]>([]);
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
                    medium
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
      setAnimeList(anime);
    };

    fetchKyotoAnimationAnime();
  }, []);

  const frameworks = createListCollection({
    items: [
      { label: "人気順", value: "react" },
      { label: "新しい順", value: "vue" },
      { label: "古い順", value: "angular" },
    ],
  });

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Stack gap={6} maxW="6xl" mx="auto">
        {/* 検索バーとAIボタン */}
        <Stack gap={2}>
          <Heading size="lg">アニメ検索</Heading>
          <HStack gap={2}>
            <Input placeholder="アニメタイトル・スタッフ名で検索" />
            <Button colorScheme="teal">AIにおすすめを聞く</Button>
          </HStack>
        </Stack>

        <Flex gap={6} direction={{ base: "column", md: "row" }}>
          {/* 左側フィルター */}
          <Box minW="200px">
            <Text fontWeight="bold" mb={2}>
              年代で絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>1980年代</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>1990年代</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>2000年代</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
            <Text fontWeight="bold" mt={6} mb={2}>
              ジャンルで絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>バトル</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>ラブコメ</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>SF</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
            <Text fontWeight="bold" mt={6} mb={2}>
              放送形態で絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>TVアニメ</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>劇場版</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>OVA</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
            <Text fontWeight="bold" mt={6} mb={2}>
              制作会社で絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>京都アニメーション</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>ボンズ</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>動画工房</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
            <Text fontWeight="bold" mt={6} mb={2}>
              アニメーターで絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>井上俊之</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>中村豊</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>吉成曜</Checkbox.Label>
              </Checkbox.Root>
            </Stack>

            <Text fontWeight="bold" mt={6} mb={2}>
              声優で絞り込む
            </Text>
            <Stack gap={2}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>杉田智和</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>釘宮理恵</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>小林ゆう</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
          </Box>

          {/* アニメカード一覧 */}
          <Box flex={1}>
            <Flex justify="flex-end" mb={4}>
              <Select.Root
                collection={frameworks}
                width="320px"
                value={value}
                onValueChange={(e) => setValue(e.value)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="人気順" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {frameworks.items.map((framework) => (
                        <Select.Item item={framework} key={framework.value}>
                          {framework.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
              {animeList.map((anime) => (
                <Box
                  key={anime.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  shadow="sm"
                >
                  <Image
                    src={anime.coverImage?.medium}
                    alt={anime.title?.romaji || "no-title"}
                  />
                  <Box p={4}>
                    <Text fontWeight="bold">{anime.title?.romaji}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {anime.title?.native}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
