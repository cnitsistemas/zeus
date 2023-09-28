import { Avatar, Box, IconButton, Skeleton, useTheme } from "@mui/material";
import { AccountBox, Email, Name } from "../style";
import { FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { ColorModeContext } from "@/app/ThemeRegistry";

export default function Account({
  open,
  userName,
  userEmail,
  avatar,
}: {
  open: boolean;
  userName: string;
  userEmail: string;
  avatar: string;
}) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: open ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
      }}
    >
      <AccountBox>
        <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 42, height: 42 }} />
        <Box
          sx={{
            display: open ? "flex" : "none",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            margin: "0 .8rem",
          }}
        >
          <Name variant="body1" color="inherit">
            {userName ? (
              userName
            ) : (
              <Skeleton variant="rounded" width={130} height={20} />
            )}
          </Name>
          <Email variant="body2" color="inherit">
            {userEmail ? (
              userEmail
            ) : (
              <Skeleton
                variant="rounded"
                width={150}
                height={10}
                sx={{ mt: 1 }}
              />
            )}
          </Email>
        </Box>
        <IconButton
          sx={{
            ml: 1,
            fontSize: "16px",
            color: "#ff7a2d",
          }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <FaMoon /> : <FaSun />}
        </IconButton>
      </AccountBox>
    </Box>
  );
}
