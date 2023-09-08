import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronsDown, FiMenu } from "react-icons/fi";
import { FaMoon, FaBell, FaSun } from "react-icons/fa";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  avatar: string;
}

export const MobileNav = ({ onOpen, avatar, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgFlex = useColorModeValue("white", "gray.900");
  const borderFlex = useColorModeValue("gray.200", "gray.700");
  const bgMenuList = useColorModeValue("white", "gray.900")
  const borderColorMenuList = useColorModeValue("gray.200", "gray.700")
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgFlex}
      borderBottomWidth="1px"
      borderBottomColor={borderFlex}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "2" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FaBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={avatar} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronsDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={bgMenuList}
              borderColor={borderColorMenuList}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
