"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { deleteRoute, fetchRoutes } from "@/store/modules/routes/routesActions";
import {
  Alert,
  Button,
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
import CustomTootip from "@/components/CustomTootip";
import CustomizedDialogs from "@/components/CustomDialog";
import { TitlePage } from "./style";
import AddIcon from "@mui/icons-material/Add";
import Details from "./details";
import { TableLoading } from "@/components/TableLoading";
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
    Inicio
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Rotas
  </Typography>,
];

const Notification = ({
  title,
  message,
  type,
}: {
  title: string;
  message: string;
  type: NOTIFICATION_TYPE | undefined;
}) =>
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: { duration: 4000 },
  });

function RoutesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<any>({});
  const [viewDialog, setViewDialog] = useState(false);
  const routeState = useSelector(RouteState);
  const dispatch = useAppDispatch();
  const routes = routeState && routeState.routes;
  const totalPages =
    (routeState && routeState.pagination && routeState.pagination.totalPages) ||
    1;
  const selectedPage =
    (routeState && routeState.pagination && routeState.pagination.page) || 1;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchRoutes(page)).then(() => setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setRows(routes);
    }
  }, [routes]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchRoutes(value)).then(() => {
      setIsLoading(false);
    });
  };

  const handleOpenDeleteDialog = (): void => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialog(false);
  };

  const handleOpenViewDialog = (): void => {
    setViewDialog(true);
  };

  const handleCloseViewDialog = (): void => {
    setViewDialog(false);
  };

  const handleDeleteRoute = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    await dispatch(deleteRoute(selectedRoute?.id)).then((res: any) => {
      if (res.success) {
        Notification({
          title: "Rota removida!",
          message: "Rota removida com sucesso!",
          type: "success",
        });
        setSelectedRoute({});
        dispatch(fetchRoutes(1)).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        Notification({
          title: "Erro",
          message: "Erro ao remover rota!",
          type: "danger",
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
                  Rotas
                  <CustomTootip
                    placement="right"
                    content={`A tela de rotas é responsável pelo cadastro, edição, visualização e exclusão das rotas de transporte da Tecnogatt.`}
                  />
                </TitlePage>
                <Typography
                  component={"h1"}
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  As rotas são os lugares por onde os veículos da CNIT trafegam.
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
                onClick={() => {
                  router.push("rotas/novo");
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
                  startIcon={<AddIcon />}
                >
                  Cadastar
                </Button>
              </Grid>
              {isLoading ? (
                <Grid item xs={12} md={12} lg={12}>
                  <TableLoading />
                </Grid>
              ) : routes && routes.length > 0 ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <TableContainer sx={{ paddingX: "1rem" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Nome
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Inicio
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Fim
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
                                <TableCell
                                  component="td"
                                  scope="row"
                                  sx={{ maxWidth: 150 }}
                                >
                                  {row.nome}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.horaIdaInicio} - {row.horaIdaTermino}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.horaVoltaInicio} - {row.horaVoltaTermino}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  sx={{ minWidth: "170px" }}
                                >
                                  <Tooltip title="Visualizar" placement="top">
                                    <IconButton
                                      color="secondary"
                                      aria-label="view route"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedRoute(row);
                                        handleOpenViewDialog();
                                      }}
                                    >
                                      <FaEye />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Editar" placement="top">
                                    <IconButton
                                      color="primary"
                                      aria-label="edit route"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        router.push(`/rotas/${row.id}`);
                                      }}
                                    >
                                      <FaEdit />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Deletar" placement="top">
                                    <IconButton
                                      color="error"
                                      aria-label="delete route"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedRoute(row);
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
                      Não há rotas cadastradas nessa sessão! Adicione rotas
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
        open={viewDialog}
        handleClose={handleCloseViewDialog}
        title={`${selectedRoute.nome}`}
        content={<Details selectedRoute={selectedRoute} />}
        confirmButton={false}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="fechar"
        handleConfirm={() => {}}
        confirmButtonError={false}
        fullWidth={true}
        maxWidth={"lg"}
        dividers={true}
        textAling="start"
      />
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar rota`}
        content={`Tem certeza que deseja deletar a rota ${selectedRoute.nome}?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="Não"
        handleConfirm={handleDeleteRoute}
        confirmButtonError={true}
        fullWidth={true}
        maxWidth={"xs"}
        dividers={true}
        textAling="start"
      />
    </>
  );
}

export default RoutesPage;
