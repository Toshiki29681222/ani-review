// components/Footer.tsx
"use client";

import { Box, Flex, Text, Link, HStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box position="fixed" bg="gray.100" px={4} py={6} mt="auto" shadow="inner">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
      >
        <Text fontSize="sm" color="gray.600">
          &copy; {new Date().getFullYear()} アニメ感想ログ. All rights reserved.
        </Text>

        <HStack gap={4} mt={{ base: 2, md: 0 }}>
          <Link href="/terms" fontSize="sm" color="gray.600">
            利用規約
          </Link>
          <Link href="/privacy" fontSize="sm" color="gray.600">
            プライバシーポリシー
          </Link>
          <Link href="/contact" fontSize="sm" color="gray.600">
            お問い合わせ
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
