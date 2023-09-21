import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Tooltip } from "@mui/material";
import { styleCustom, styleCustomMenuItem } from "../style";
import {
  FaUserGraduate,
  FaThLarge,
  FaUserFriends,
  FaSuitcase,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const MainListItems = () => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link href={`/`} underline="none" sx={styleCustom}>
        <Tooltip title="Painel" placement="right" arrow>
          <ListItemButton
            sx={{
              ...styleCustomMenuItem,
              background: pathname === "/" ? "#FA6E1D" : "",
            }}
          >
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaThLarge />
            </ListItemIcon>
            <ListItemText primary="Painel" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/estudantes`} underline="none" sx={styleCustom}>
        <Tooltip title="Estudantes" placement="right" arrow>
          <ListItemButton
            sx={{
              ...styleCustomMenuItem,
              background: pathname === "/estudantes" ? "#FA6E1D" : "",
            }}
          >
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaUserGraduate />
            </ListItemIcon>
            <ListItemText primary="Estudantes" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/usuarios`} underline="none" sx={styleCustom}>
        <Tooltip title="Usuários" placement="right" arrow>
          <ListItemButton
            sx={{
              ...styleCustomMenuItem,
              background: pathname === "/usuarios" ? "#FA6E1D" : "",
            }}
          >
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaUserFriends />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </Tooltip>
      </Link>
    </React.Fragment>
  );
};

export default MainListItems;
