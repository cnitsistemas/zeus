import * as React from "react";
// import Link from '@mui/material/Link';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Alert, Typography } from "@mui/material";
import Link from "@mui/material/Link";

function preventDefault(event: any) {
  event.preventDefault();
}

export default function LastRoutes(props: any) {
  const { rows } = props;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h5" gutterBottom>
        Ultimas Rotas Cadastradas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Horário Inicio</TableCell>
            <TableCell>Horário Fim</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.length > 0 &&
            rows.map((row: any) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.initHours}</TableCell>
                <TableCell>{row.finishHours}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {rows && rows.length === 0 && (
        <Alert severity="info">Não há rotas cadastradas nessa sessão!</Alert>
      )}
      <Link
        color="primary"
        href="/rotas"
        onClick={preventDefault}
        sx={{ mt: 3 }}
      >
        Ver todas as rotas
      </Link>
    </React.Fragment>
  );
}
