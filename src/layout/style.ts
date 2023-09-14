import { styled } from "@mui/material/styles";
import { Box, BoxProps, IconButton, IconButtonProps, Typography } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { TypographyProps } from "@chakra-ui/react";

const drawerWidth: number = 290;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  marginLeft: "88px !important",
  width: `calc(100% - 88px)`,
  boxShadow: "none",
  // backgroundColor: "transparent",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // backgroundColor: "transparent",
    boxShadow: "none",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      padding: theme.spacing(2),
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: theme.palette.primary.main,
      // border: "none",
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(11),
        },
      }),
    },
  }),
);

export const AccountBox = styled(Box)<BoxProps>(() => ({
  padding: ".5rem",
  borderRadius: "40px",
  textAlign: "center",
  border: "1px solid #C63D2F",
  display: 'flex',
  flexDirection: "row",
}));

export const HeaderIcon = styled(IconButton)<IconButtonProps>(() => ({
  marginRight: ".7rem",
  fontSize: 20
}));

export const styleCustom = {
  color: "white",
  '&:hover': {
    color: "white",
    textDecoration: "none",
    backgroundColor: "black",
  },
}

export const Name = styled(Typography)<TypographyProps>(() => ({
  fontFamily: "Graviola Soft",
  flexGrow: 1,
  fontWeight: "bold",
  color: 'white',
  fontSize: '13px'
}));

export const Email = styled(Typography)<TypographyProps>(() => ({
  fontFamily: "Graviola Soft",
  flexGrow: 1,
  color: "white",
  fontSize: '11px'
}));
