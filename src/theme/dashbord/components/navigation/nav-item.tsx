import Link from "next/link";
import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface PropsNavItem {
  item: any,
  isActive: Boolean,
  collapse: Boolean,
};

export const NavItem = ({ item, isActive, collapse }: PropsNavItem) => {
  const { label } = item;

  if (item.type === "link") {
    const { icon, notifications, messages, path } = item;
    return (
      <Box display="flex" alignItems="center" my={1} justifyContent="center">
        <LinkChakra
          href={path}
          as={Link}
          gap={1}
          display="flex"
          alignItems="center"
          px={3}
          py={4}
          my={1}
          borderRadius={10}
          bg={isActive ? "primary.600" : ""}
          _hover={{ textDecoration: "none", color: "white", backgroundColor: "primary.600" }}
          color={isActive ? "white" : "white"}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        >
          <ListIcon as={icon} fontSize={24} />
          {collapse && <Text fontSize={16}>{label}</Text>}
        </LinkChakra>
        {collapse && (
          <React.Fragment>
            {notifications && (
              <Badge
                borderRadius="full"
                colorScheme="yellow"
                w={6}
                textAlign="center"
              >
                {notifications}
              </Badge>
            )}
            {messages && (
              <Badge
                borderRadius="full"
                colorScheme="facebook"
                w={6}
                textAlign="center"
              >
                {messages}
              </Badge>
            )}
          </React.Fragment>
        )}
      </Box>
    );
  }
  return (
    <Heading
      color="#2E2D2D"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      pt={collapse ? 8 : 0}
      my={6}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
};
