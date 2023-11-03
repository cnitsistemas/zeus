"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaMapSigns, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  Alert,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { StatusActive, StatusInactive, TitlePage } from "./style";
import CustomTootip from "@/components/CustomTootip";
import AddIcon from "@mui/icons-material/Add";
import { useToast } from "@chakra-ui/react";
import CustomizedDialogs from "@/components/CustomDialog";
import {
  deleteVehicles,
  fetchVehicles,
} from "@/store/modules/vehicles/vehiclesActions";
import { VehicleState } from "@/store/modules/vehicles/vehiclesReducers";
import RelationshipModal from "./_relationship/RelationshipModal";

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
    Inicio
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Veículos
  </Typography>,
];
function UsersPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [relationDialog, setRelationDialog] = useState<boolean>(false);
  const [selectedVehicles, setSelectedVehicles] = useState<any>({});
  const vehiclesState = useSelector(VehicleState);
  const dispatch = useAppDispatch();
  const vehicles = vehiclesState && vehiclesState.vehicles;
  const totalPages =
    (vehiclesState &&
      vehiclesState.pagination &&
      vehiclesState.pagination.totalPages) ||
    1;
  const selectedPage =
    (vehiclesState &&
      vehiclesState.pagination &&
      vehiclesState.pagination.page) ||
    1;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchVehicles(page)).then(() => setIsLoading(false));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      setRows(vehicles);
    }
  }, [vehicles]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchVehicles(value)).then(() => {
      setIsLoading(false);
    });
  };

  const handleOpenDeleteDialog = (): void => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialog(false);
  };

  const handleOpenRelationDialog = (): void => {
    setRelationDialog(true);
  };

  const handleCloseRelationDialog = (): void => {
    setRelationDialog(false);
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    await dispatch(deleteVehicles(selectedVehicles?.id)).then((res) => {
      if (res.success) {
        toast({
          title: "Veículo removido",
          description: "Veículo removido com sucesso!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setSelectedVehicles({});
        dispatch(fetchVehicles(page)).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Erro",
          description: "Erro ao remover veículo!",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <BreadcrumbComponent breadcrumbItens={breadcrumbItens} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={0} sx={{ padding: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={8} lg={8}>
                <TitlePage component={"h1"}>
                  Veículos
                  <CustomTootip
                    placement="right"
                    content={`Para atender as rotas cadastradas é preciso 
                    uma quantidade de veículos registrados. Nessa tela é possível visualizar, cadastrar, editar e deletar os veículos disponíveis no sistema.`}
                  />
                </TitlePage>
                <Typography
                  component={"h1"}
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  Os veículos podem ser registrados para controle de frota e
                  inventário.
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    color: "#fff",
                    height: 40,
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    router.push("veiculos/novo");
                  }}
                  startIcon={<AddIcon />}
                >
                  Cadastar
                </Button>
              </Grid>
              {vehicles && vehicles.length > 0 ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <TableContainer sx={{ paddingX: "1rem" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Descrição
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Tipo
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Identificacao
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows &&
                            rows.length > 0 &&
                            rows.map((row) => (
                              <TableRow
                                key={row.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="td" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.type}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.identification}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.active === 1 ? (
                                    <StatusActive>Ativo</StatusActive>
                                  ) : (
                                    <StatusInactive>Inativo</StatusInactive>
                                  )}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  sx={{ minWidth: "170px" }}
                                >
                                  <Tooltip
                                    title="Vincular à rotas"
                                    placement="top"
                                  >
                                    <IconButton
                                      color="secondary"
                                      aria-label="edit student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedVehicles(row);
                                        handleOpenRelationDialog();
                                      }}
                                      disabled={row.active !== 1}
                                    >
                                      <FaMapSigns />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Editar" placement="top">
                                    <IconButton
                                      color="primary"
                                      aria-label="edit student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        router.push(`/veiculos/${row.id}`);
                                      }}
                                    >
                                      <FaEdit />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Deletar" placement="top">
                                    <IconButton
                                      color="error"
                                      aria-label="delete student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedVehicles(row);
                                        handleOpenDeleteDialog();
                                      }}
                                    >
                                      <FaTrash />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="secondary"
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <Alert severity="info">
                      Não há veículos cadastrados nessa sessão! Adicione
                      clicando no botão de cadastro.
                    </Alert>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar Veículo`}
        content={`Tem certeza que deseja deletar o veículo ${selectedVehicles.name}?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="Não"
        handleConfirm={handleDeleteUser}
        confirmButtonError={true}
        fullWidth={true}
        maxWidth={"xs"}
        dividers={true}
        textAling="start"
      />
      {relationDialog && (
        <CustomizedDialogs
          open={relationDialog}
          handleClose={handleCloseRelationDialog}
          title={`Vicular rotas ao veículo ${selectedVehicles.name}`}
          content={<RelationshipModal selectedVehicles={selectedVehicles} />}
          confirmButton={false}
          cancelButton={true}
          confirmButtonText="Sim"
          cancelButtonText="Fechar"
          handleConfirm={handleDeleteUser}
          confirmButtonError={false}
          fullWidth={true}
          maxWidth={"md"}
          dividers={true}
          textAling="start"
        />
      )}
    </>
  );
}

export default UsersPage;
