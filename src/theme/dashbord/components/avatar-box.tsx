import { Avatar, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdMenu } from "react-icons/md";

interface PropsAvatar {
  collapse: Boolean,
  avatar: string
  name: string;
  email: string;
  handleSingOut: () => void;
  token: string;
}

export const AvatarBox = ({
  collapse,
  avatar,
  name,
  email,
  handleSingOut,
  token,
}: PropsAvatar) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    handleSingOut();
  };

  return (
    <Flex
      borderWidth={collapse ? 1 : 0}
      borderColor="orange.600"
      borderRadius="full"
      w="full"
      p={3}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection={collapse ? "row" : "column-reverse"}
    ><Menu>
        <MenuButton
          transition="all 0.3s"
          _focus={{ boxShadow: "none" }}
        >
          <Avatar name="Design To Chakra UI" bg="teal.300" src={avatar} />
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => handleLogout()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
      {collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text color="white" fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
            {name}
          </Text>
          <Text as="small" color="white" fontSize={12} lineHeight={0}>
            {email}
          </Text>
        </Flex>
      )}
      <IconButton
        mb={!collapse ? 5 : 0}
        size="lg"
        variant="link"
        aria-label="open menu"
        color={colorMode === "light" ? "orange.600" : "white"}
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}
