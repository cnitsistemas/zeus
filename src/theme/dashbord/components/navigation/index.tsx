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
    path: "/",
  },
  {
    type: "link",
    label: "Papéis",
    icon: FaSuitcase,
    path: "/",
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
    path: "/",
  },
];

export const Navigation = ({ collapse }: { collapse: Boolean }) => (
  <List w="full" my={8}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={index === 0} collapse={collapse} />
      </ListItem>
    ))}
  </List>
);
