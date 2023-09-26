import { Typography, TypographyProps, styled } from "@mui/material";

export const TitlePage = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
}));