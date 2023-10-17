import { Link, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 4, mb: 4, fontWeight: "bold", color: "white" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://cnittransportes.com.br/">
        Tecnogatt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
