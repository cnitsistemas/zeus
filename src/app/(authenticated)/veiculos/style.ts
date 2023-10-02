import { BoxProps } from "@chakra-ui/react";
import { Box, Typography, TypographyProps, styled } from "@mui/material";

export const TitlePage = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
}));

export const StatusActive = styled(Box)<BoxProps>(({ theme }) => ({
    border: '1px solid #4caf50',
    color: '#4caf50',
    padding: `${theme.spacing(.6)}`,
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '12px'
}))

export const StatusInactive = styled(Box)<BoxProps>(({ theme }) => ({
    border: '1px solid #d32f2f',
    color: '#d32f2f',
    padding: `${theme.spacing(.6)}`,
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '12px'
}))