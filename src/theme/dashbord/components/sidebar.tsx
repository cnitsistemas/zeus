import React from "react";
import { Box } from "@chakra-ui/react";
import { AvatarBox } from "./avatar-box";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

interface PropsSidebar {
  collapse: Boolean,
  avatar: string
  name: string;
  email: string;
  token: string;
  handleSingOut: () => void;
  pathname: string;
};

export const Sidebar = ({
  collapse,
  avatar,
  name,
  email,
  handleSingOut,
  token,
  pathname
}: PropsSidebar) => (
  <React.Fragment>
    <Box w="full">
      <Logo collapse={collapse} />
      <Navigation collapse={collapse} pathname={pathname} />
    </Box>
    <AvatarBox
      collapse={collapse}
      avatar={avatar}
      name={name}
      email={email}
      handleSingOut={handleSingOut}
      token={token}
    />
  </React.Fragment>
);
