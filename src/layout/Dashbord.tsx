import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MainListItems from "./Menu/ListItems";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
import { AppBar, Drawer, HeaderIcon, WrapperMain } from "./style";
import { LuBell, LuMenu, LuLogIn } from "react-icons/lu";
import { SingInState } from "@/store/modules/singIn/singInReducers";
import Account from "./Account/Account";
import { useAppDispatch } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import { handleSingOut } from "@/store/modules/singIn/singInActions";
import AvatarComponent from "./Avatar/Avatar";
import SimpleLogo from "@/assets/simple-logo.png";
import LoadingComponent from "@/components/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [newNotificarion, setNewNotificarion] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const state = useSelector(SingInState);
  const userName = (state.auth && state.auth.name) || "";
  const userEmail = (state.auth && state.auth.email) || "";
  const singInState = useSelector(SingInState);
  const dispatch = useAppDispatch();
  const token = (singInState.auth && singInState.auth.accessToken) || null;
  const avatar = (singInState.auth && singInState.auth.avatar) || null;
  const router = useRouter();

  useEffect(() => {
    async function isAuthenticated(value: String) {
      if (value && value !== undefined) {
        setTimeout(() => setLoading(false), 2000);
      } else {
        router.push("/login");
      }
    }
    isAuthenticated(token);
  }, [router, token]);

  const handleLogoff = () => {
    dispatch(handleSingOut(token)).then(() => {
      router.push("/login");
    });
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {loading ? (
        <WrapperMain>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <LoadingComponent loading={loading} color="#ff7a2d" />
          </Container>
        </WrapperMain>
      ) : (
        <Box sx={{ display: "flex" }}>
          <AppBar position="absolute" open={open}>
            <Toolbar sx={{ pr: "24px", color: "white" }}>
              <HeaderIcon
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{ marginRight: "36px" }}
              >
                <LuMenu />
              </HeaderIcon>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Tooltip title="Notificações" placement="bottom" arrow>
                <HeaderIcon color="inherit">
                  <Badge
                    variant="dot"
                    invisible={newNotificarion}
                    color="secondary"
                  >
                    <LuBell />
                  </Badge>
                </HeaderIcon>
              </Tooltip>
              <Tooltip title="Sair" placement="bottom" arrow>
                <HeaderIcon color="inherit" onClick={handleLogoff}>
                  <Badge
                    variant="dot"
                    invisible={newNotificarion}
                    color="secondary"
                  >
                    <LuLogIn />
                  </Badge>
                </HeaderIcon>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar sx={{ padding: "1rem 0 10rem 0" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Image
                  src={SimpleLogo}
                  width={40}
                  alt="Picture of the author"
                />
                <Box
                  sx={{
                    display: open ? "flex" : "none",

                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  Sistema de Gestão CNIT
                </Box>
              </Box>
            </Toolbar>
            <List component="nav">
              <MainListItems />
            </List>
            <Account
              open={open}
              userEmail={userEmail}
              userName={userName}
              avatar={avatar}
            />
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}
