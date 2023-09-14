import LoadingButton from "@mui/lab/LoadingButton";
import { Box, BoxProps, ButtonProps, styled } from "@mui/material";

export const WrapperMain = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: "100vw",
    height: "100vh",
}))
export const ButtonFormSubmit =
    styled(LoadingButton)<ButtonProps>(({ theme }) => ({
        marginTop: `${theme.spacing(2)}`,
        color: "white",
        width: "100%"
    }))

export const BoxFormLogin = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: "2rem",
    backgroundColor: 'white',
    borderRadius: "20px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
}))