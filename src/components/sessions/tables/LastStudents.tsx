import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Alert, Typography } from "@mui/material";

export default function LastStudents(props: any) {
  const { rows } = props;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        Ultimos Alunos Cadastrados
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Rota</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell>Ensino</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.length > 0 &&
            rows.map((row: any) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.route}</TableCell>
                <TableCell>{row.shift}</TableCell>
                <TableCell>{row.teaching}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {rows && rows.length === 0 && (
        <Alert severity="info">Não há alunos cadastrados nessa sessão!</Alert>
      )}
      <Link color="primary" href="/estudantes" sx={{ mt: 3 }}>
        Ver todos os alunos
      </Link>
    </React.Fragment>
  );
}
