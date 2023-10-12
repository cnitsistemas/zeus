import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";
import { StatusActive, StatusInactive } from "./style";

const Details = ({ selectedConductor }: { selectedConductor: any }) => {
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
                <TableCell>{selectedConductor.name}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tipo de Licença
                </TableCell>
                <TableCell>{selectedConductor.typeLicence}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Categoria da habilitação
                </TableCell>
                <TableCell>{selectedConductor.categorieLicence}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Identificação da habilitação
                </TableCell>
                <TableCell>
                  {selectedConductor.licenseDocumentIdentifier}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  Validade da habilitação
                </TableCell>
                <TableCell>
                  {moment(selectedConductor.validateLicence).format(
                    "DD/MM/YYYY"
                  )}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Idade</TableCell>
                <TableCell>{selectedConductor.age}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell>
                  {selectedConductor.active === 1 ? (
                    <StatusActive>Ativo</StatusActive>
                  ) : (
                    <StatusInactive>Inativo</StatusInactive>
                  )}
                </TableCell>
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
                <TableCell>{selectedConductor.cep}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Endereço</TableCell>
                <TableCell>{selectedConductor.address}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>Cidade</TableCell>
                <TableCell>{selectedConductor.city}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;
