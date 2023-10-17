import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Link, Tooltip } from "@mui/material";
import { styleCustom, styleCustomMenuItem } from "../style";
import {
  FaUserGraduate,
  FaThLarge,
  FaUserFriends,
  FaDirections,
  FaUserCog,
  FaCar,
  FaShip,
  FaPrint,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const styleMenu = (pathname: string, item: string) => {
  const verifyPathURL = (pathName: string, menu: string) => {
    const url = pathName.indexOf(menu);

    if (url !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return {
    ...styleCustomMenuItem,
    background: verifyPathURL(pathname, item) ? "#FA6E1D" : "",
  };
};

const MainListItems = () => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link href={`/`} underline="none" sx={styleCustom}>
        <Tooltip title="Painel" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "/home")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaThLarge />
            </ListItemIcon>
            <ListItemText primary="Painel" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/estudantes`} underline="none" sx={styleCustom}>
        <Tooltip title="Alunos" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "estudantes")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaUserGraduate />
            </ListItemIcon>
            <ListItemText primary="Alunos" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/rotas`} underline="none" sx={styleCustom}>
        <Tooltip title="Rotas" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "rotas")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaDirections />
            </ListItemIcon>
            <ListItemText primary="Rotas" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/condutores`} underline="none" sx={styleCustom}>
        <Tooltip title="Condutores" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "condutores")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaShip />
            </ListItemIcon>
            <ListItemText primary="Condutores" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/veiculos`} underline="none" sx={styleCustom}>
        <Tooltip title="Veículos" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "veiculos")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaCar />
            </ListItemIcon>
            <ListItemText primary="Veículos" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/relatorios`} underline="none" sx={styleCustom}>
        <Tooltip title="Relatórios" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "relatorios")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaPrint />
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider sx={{ my: 2, background: "white" }} />

      <Link href={`/usuarios`} underline="none" sx={styleCustom}>
        <Tooltip title="Usuários" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "usuarios")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaUserFriends />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href={`/papeis`} underline="none" sx={styleCustom}>
        <Tooltip title="Papéis" placement="right" arrow>
          <ListItemButton sx={styleMenu(pathname, "papeis")}>
            <ListItemIcon sx={{ color: "white", fontSize: "18px" }}>
              <FaUserCog />
            </ListItemIcon>
            <ListItemText primary="Papéis" />
          </ListItemButton>
        </Tooltip>
      </Link>
    </React.Fragment>
  );
};

export default MainListItems;
