import {
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const Details = ({ selectedRoute }: { selectedRoute: any }) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs={12} md={6} lg={6} sx={{ paddingRight: "8px" }}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                <TableCell>{selectedRoute.nome}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de Ida (Início)
                </TableCell>
                <TableCell>{selectedRoute.horaIdaInicio}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de Ida (Fim)
                </TableCell>
                <TableCell>{selectedRoute.horaIdaTermino}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de Volta (Início)
                </TableCell>
                <TableCell>{selectedRoute.horaVoltaInicio}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de Volta (Fim)
                </TableCell>
                <TableCell>{selectedRoute.horaVoltaTermino}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Turno matutino
                </TableCell>
                <TableCell>
                  {selectedRoute.turnoMatutino === 1 ? (
                    <Chip label={"Sim"} color="success" size="small" />
                  ) : (
                    <Chip label={"Não"} color="error" size="small" />
                  )}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Turno Vespertino
                </TableCell>
                <TableCell>
                  {selectedRoute.turnoVespertino === 1 ? (
                    <Chip label={"Sim"} color="success" size="small" />
                  ) : (
                    <Chip label={"Não"} color="error" size="small" />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Turno noturno</TableCell>
                <TableCell>
                  {selectedRoute.turnoNoturno === 1 ? (
                    <Chip label={"Sim"} color="success" size="small" />
                  ) : (
                    <Chip label={"Não"} color="error" size="small" />
                  )}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
                <TableCell>{selectedRoute.tipo}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Bairro</TableCell>
                <TableCell>{selectedRoute.neighborhood}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Escolas</TableCell>
                <TableCell>{selectedRoute.escolas}</TableCell>
              </TableRow>
              {selectedRoute.quantidadeAlunos && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Quantidade de alunos
                  </TableCell>
                  <TableCell>{selectedRoute.quantidadeAlunos}</TableCell>
                </TableRow>
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Quantidade de dias no mês
                </TableCell>
                <TableCell>{selectedRoute.quantidadeDiasMes}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Qauntidade de Km
                </TableCell>
                <TableCell>{selectedRoute.quantidadeKm}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;
