import { InputAutoComplete } from "@/components/_forms/Inputs/InputAutoComplete";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchAllRoutes } from "@/store/modules/routes/routesActions";
import { RouteState } from "@/store/modules/routes/routesReducers";
import {
  deleteVehiclesRoutes,
  getVehiclesRoutes,
  relationVehiclesRoutes,
} from "@/store/modules/vehicles/vehiclesActions";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
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
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { FaBan } from "react-icons/fa";

type FormValues = {
  route: any;
};
const defaultValues = {
  route: null,
};
export default function RelationshipModal({
  selectedVehicles,
}: {
  selectedVehicles: any;
}) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const routeState = useSelector(RouteState);
  const [rows, setRows] = useState<Array<any>>([]);
  const routes = (routeState && routeState.allRoutes) || null;

  useEffect(() => {
    dispatch(fetchAllRoutes()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setRoutersList(
        routes.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, [routes]);

  useEffect(() => {
    dispatch(getVehiclesRoutes(selectedVehicles.id)).then((response) => {
      if (response.success) {
        setRows(response.data);
      }
    });
  }, [dispatch]);

  const handlerRelationship = (values: FormValues, resetForm: any) => {
    const data = {
      rota_id: values.route.value,
      veiculo_id: selectedVehicles.id,
      active: true,
    };

    dispatch(relationVehiclesRoutes(data))
      .then((res) => {
        if (res.success) {
          Store.addNotification({
            title: "Veiculo vínculado!",
            message: "Veículo vínculado a rota com sucesso!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { duration: 4000 },
          });
          resetForm();
        } else {
          Store.addNotification({
            title: "Error!",
            message:
              "Falha ao tentar víncular veículo. Por favor, tente mais tarde!",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { duration: 4000 },
          });
        }
      })
      .catch((e) => console.warn(e));
  };

  const handlerDeleteRelationship = (id: string) => {
    setIsLoading(true);
    dispatch(deleteVehiclesRoutes(id))
      .then((res) => {
        if (res.success) {
          Store.addNotification({
            title: "Relacionamento Removido!",
            message: "Relacionamento com a rota removido com sucesso!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { duration: 4000 },
          });
          dispatch(getVehiclesRoutes(selectedVehicles.id)).then((response) => {
            if (response.success) {
              setRows(response.data);
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          });
        } else {
          Store.addNotification({
            title: "Error!",
            message:
              "Falha ao tentar remover relacionamento. Por favor, tente mais tarde!",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { duration: 4000 },
          });
          setIsLoading(false);
        }
      })
      .catch((e) => console.warn(e));
  };
  return (
    <>
      <Box sx={{ paddingY: 1, paddingX: 6 }}>
        <Typography>Selecionar Rota</Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(
            values: FormValues,
            { setSubmitting, resetForm }: FormikHelpers<FormValues>
          ) => {
            handlerRelationship(values, resetForm);
            setSubmitting(false);
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <InputAutoComplete
                  id="route"
                  name="route"
                  variant="outlined"
                  label="Selecione uma rota"
                  data={routersList}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  disableElevation
                  fullWidth
                  sx={{
                    height: 40,
                    fontSize: "12px",
                    mt: 2,
                  }}
                  type="submit"
                >
                  Vincular
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
      <Box sx={{ padding: 2, mt: 2 }}>
        <Grid item xs={12} md={12} lg={12}>
          {isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginY: 10 }}
            >
              <CircularProgress />
            </Box>
          ) : rows && rows.length > 0 ? (
            <TableContainer sx={{ paddingX: "1rem" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Nome da Rota
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Quantidade de Alunos
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
                          {row.route.nome}
                        </TableCell>
                        <TableCell component="td" scope="row">
                          {row.route.quantidade_alunos}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ minWidth: "170px" }}
                        >
                          <Tooltip
                            title="Deletar Relacionamento"
                            placement="top"
                          >
                            <IconButton
                              color="error"
                              aria-label="delete student"
                              sx={{
                                marginX: ".4rem",
                                fontSize: "16px",
                              }}
                              onClick={() => {
                                handlerDeleteRelationship(row.id);
                              }}
                            >
                              <FaBan />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <Grid item xs={12} md={12} lg={12}>
                <Alert severity="info">
                  Não há rotas vinculadas ao veículo selecionado!
                </Alert>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
