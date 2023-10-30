import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";

interface PropsDetails {
  fetchRotaName: (id: String) => React.ReactNode;
  selectedStudent: any;
}

const Details = ({ fetchRotaName, selectedStudent }: PropsDetails) => {
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
                <TableCell>{selectedStudent.name}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Série</TableCell>
                <TableCell>{selectedStudent.serie}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Ensino</TableCell>
                <TableCell>{selectedStudent.teaching}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Turno</TableCell>
                <TableCell>{selectedStudent.shift}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nome da escola
                </TableCell>
                <TableCell>{selectedStudent.schoolName}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de ida
                </TableCell>
                <TableCell>{selectedStudent.departureTime}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Horário de volta
                </TableCell>
                <TableCell>{selectedStudent.backTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{ borderLeft: "1px solid #bcbcbc" }}
        >
          <Table aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>CEP</TableCell>
                <TableCell>{selectedStudent.cep}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Endereço</TableCell>
                <TableCell>{selectedStudent.address}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Bairro</TableCell>
                <TableCell>{selectedStudent.neighborhood}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Número</TableCell>
                <TableCell>{selectedStudent.number}</TableCell>
              </TableRow>
              {selectedStudent.complement && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Complemento</TableCell>
                  <TableCell>{selectedStudent.complement}</TableCell>
                </TableRow>
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Cidade</TableCell>
                <TableCell>{selectedStudent.city}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell>{selectedStudent.state}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Rota</TableCell>
                <TableCell>{fetchRotaName(selectedStudent.rota_id)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;
