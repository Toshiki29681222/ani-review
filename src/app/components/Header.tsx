// components/Header.tsx
"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const Links = [
  { label: "ホーム", href: "/" },
  { label: "アニメ一覧", href: "/anime" },
  { label: "お気に入り", href: "/favorites" },
];

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link href={href}>
    <Button variant="ghost" size="sm">
      {label}
    </Button>
  </Link>
);

export default function Header() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          aria-label="メニューを開く"
          display={{ md: "none" }}
          onClick={open ? onClose : onOpen}
        />

        <HStack alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            アニメ感想ログ
          </Text>
          <HStack as="nav" display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </HStack>
        </HStack>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav">
            {Links.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
