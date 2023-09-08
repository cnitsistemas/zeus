import { IconProps, List, ListItem, Text } from "@chakra-ui/react";
import {
  MdOutlineSettingsInputComposite,
  MdOutlineChatBubbleOutline,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import {
  FaUserGraduate,
  FaThLarge,
  FaUserFriends,
  FaSuitcase
} from "react-icons/fa";
import { NavItem } from "./nav-item";

const items = [
  {
    type: "link",
    label: "Dashboard",
    icon: FaThLarge,
    path: "/",
  },
  {
    type: "link",
    label: "Estudantes",
    icon: FaUserGraduate,
    path: "/estudantes",
  },
  {
    type: "link",
    label: "Usuários",
    icon: FaUserFriends,
    path: "/usuarios",
  },
  {
    type: "link",
    label: "Papéis",
    icon: FaSuitcase,
    path: "/papeis",
  },

  {
    type: "header",
    label: "Account",
  },

  // {
  //   type: "link",
  //   label: "Notifications",
  //   icon: MdOutlineNotificationsActive,
  //   path: "/",
  //   notifications: 24,
  // },
  // {
  //   type: "link",
  //   label: "Chat",
  //   icon: MdOutlineChatBubbleOutline,
  //   path: "/",
  //   messages: 8,
  // },
  {
    type: "link",
    label: "Settings",
    icon: MdOutlineSettingsInputComposite,
    path: "/configuracoes",
  },
];

export const Navigation = ({ collapse, pathname }: { collapse: Boolean, pathname: string }) => (
  <List w="full" my={8}>
    {items.map((item, index) => {
      return <ListItem key={index}>
        <NavItem item={item} isActive={item.path === pathname} collapse={collapse} />
      </ListItem>
    })}
  </List>
);
