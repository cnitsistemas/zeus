"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  createRoutes,
  editRoute,
  fetchRoutesId,
} from "@/store/modules/routes/routesActions";
import { TitlePage } from "../style";
import { Button, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { Store } from "react-notifications-component";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { InputSelect } from "@/components/_forms/Inputs/InputSelect";
import { HoursMask } from "@/components/_forms/Masks/HoursMask";
import { InputSwitch } from "@/components/_forms/Inputs/InputSwitch";
import { RoutesSchema } from "@/validators/routesSchema";

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
    Inicio
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/estudantes"
    onClick={() => {}}
  >
    Rotas
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar rota
  </Typography>,
];

const typeList = [
  {
    label: "Terrestre",
    value: "Terrestre",
  },
  {
    label: "Fluvial",
    value: "Fluvial",
  },
];

type FormValues = {
  name: string;
  schoolName: string;
  type: string;
  qtdStudents: string;
  qtdDayMonth: string;
  qtdKm: any;
  departureTimeInit: string;
  departureTimeFinish: string;
  backTimeInit: string;
  backTimeFinish: string;
  checkedMatutino: boolean;
  checkedVespertino: boolean;
  checkedNoturno: boolean;
};

const defaultValues = {
  name: "",
  schoolName: "",
  type: "",
  qtdStudents: "",
  qtdDayMonth: "",
  qtdKm: "",
  departureTimeInit: "",
  departureTimeFinish: "",
  backTimeInit: "",
  backTimeFinish: "",
  checkedMatutino: false,
  checkedVespertino: false,
  checkedNoturno: false,
};

function CreateStudantePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState<boolean>(false);
  const routeState = useSelector(RouteState);
  const routes = (routeState && routeState.allRoutes) || null;

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchRoutesId(id))
        .then((res) => {
          if (res.success) {
            const values: FormValues = {
              name: res.data?.name,
              schoolName: res.data?.schoolName,
              qtdStudents: res.data?.quantityStudents,
              qtdDayMonth: res.data?.quantityDayMonth,
              qtdKm: res.data?.quantityKm,
              type: res.data?.type,
              departureTimeInit: res.data?.departureTimeInit,
              departureTimeFinish: res.data?.departureTimeFinish,
              backTimeInit: res.data?.backTimeInit,
              backTimeFinish: res.data?.backTimeFinish,
              checkedMatutino: res.data?.checkedMatutino == 1 ? true : false,
              checkedVespertino:
                res.data?.checkedVespertino == 1 ? true : false,
              checkedNoturno: res.data?.checkedNoturno == 1 ? true : false,
            };
            setInitialValues(values);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao carregar dados da rota. Por favor, tente mais tarde!",
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
    }
  }, [id, dispatch, routes]);

  const handleFormValidation = (data: any, resetForm: any) => {
    setLoading(true);
    console.log(data);
    const formData = {
      nome: data.name,
      tipo: data.type,
      escolas: data.schoolName,
      quantidade_alunos: data.qtdStudents,
      quantidade_dia_mes: data.qtdDayMonth,
      quantidade_km: data.qtdKm,
      hora_ida_inicio: data.departureTimeInit,
      hora_ida_termino: data.departureTimeFinish,
      hora_volta_inicio: data.backTimeInit,
      hora_volta_termino: data.backTimeFinish,
      turno_matutino: data.checkedMatutino ? 1 : 0,
      turno_vespertino: data.checkedVespertino ? 1 : 0,
      turno_noturno: data.checkedNoturno ? 1 : 0,
      _method: id !== "novo" ? "PUT" : "POST",
    };

    if (id !== "novo") {
      dispatch(editRoute({ id: id, data: formData }))
        .then((res: any) => {
          if (res.success) {
            Store.addNotification({
              title: "Rota Editada!",
              message: "Rota editada com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            resetForm();
            setInitialValues(defaultValues);
            setLoading(false);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao tentar editar rota. Por favor, tente mais tarde!",
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
    } else {
      dispatch(createRoutes(formData))
        .then((res: any) => {
          if (res.success) {
            Store.addNotification({
              title: "Rota Cadastrada!",
              message: "Rota cadastrada com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            resetForm();
            setInitialValues(defaultValues);
            setLoading(false);
          } else {
            Store.addNotification({
              title: "Error!",
              message: "Falha ao cadastrar rota. Por favor, tente mais tarde!",
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
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <BreadcrumbComponent breadcrumbItens={breadcrumbItens} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {id && id !== "novo" ? (
            <>
              <TitlePage>Editar rota</TitlePage>
            </>
          ) : (
            <>
              <TitlePage>Cadastrar nova rota</TitlePage>
            </>
          )}{" "}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={RoutesSchema()}
              onSubmit={(
                values: FormValues,
                { setSubmitting, resetForm }: FormikHelpers<FormValues>
              ) => {
                console.log(values);
                handleFormValidation(values, resetForm);
                setSubmitting(false);
              }}
            >
              <Form>
                <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="name"
                      name="name"
                      type="text"
                      variant="outlined"
                      label="Nome"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      variant="outlined"
                      label="Escolas"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="departureTimeInit"
                      name="departureTimeInit"
                      variant="outlined"
                      label="Horário de Ida(Início)"
                      disabled={loading}
                      InputProps={{
                        maxLength: 5,
                        inputComponent: HoursMask,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="departureTimeFinish"
                      name="departureTimeFinish"
                      variant="outlined"
                      label="Horário de Ida(Fim)"
                      disabled={loading}
                      InputProps={{
                        maxLength: 5,
                        inputComponent: HoursMask,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="backTimeInit"
                      name="backTimeInit"
                      variant="outlined"
                      label="Horário de Volta(Início)"
                      disabled={loading}
                      InputProps={{
                        maxLength: 5,
                        inputComponent: HoursMask,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="backTimeFinish"
                      name="backTimeFinish"
                      variant="outlined"
                      label="Horário de Volta(Fim)"
                      disabled={loading}
                      InputProps={{
                        maxLength: 5,
                        inputComponent: HoursMask,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="qtdStudents"
                      name="qtdStudents"
                      type="text"
                      variant="outlined"
                      label="Quantidade de Alunos"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="qtdDayMonth"
                      name="qtdDayMonth"
                      type="text"
                      variant="outlined"
                      label="Quantidade de dias do mês"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="qtdKm"
                      name="qtdKm"
                      type="text"
                      variant="outlined"
                      label="Quantidade de KM"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputSelect
                      required
                      id="type"
                      name="type"
                      variant="outlined"
                      label="Ensino"
                      data={typeList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <InputSwitch
                      id="checkedMatutino"
                      name="checkedMatutino"
                      label="Turno Matutino"
                      checked={defaultValues.checkedMatutino}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <InputSwitch
                      id="checkedVespertino"
                      name="checkedVespertino"
                      label="Turno Vespertino"
                      checked={defaultValues.checkedVespertino}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <InputSwitch
                      id="checkedNoturno"
                      name="checkedNoturno"
                      label="Turno Noturno"
                      checked={defaultValues.checkedNoturno}
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle" />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginY: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                  }}
                >
                  <Grid item xs={12} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        router.push("/rotas");
                      }}
                    >
                      Voltar
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ color: "#fff" }}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateStudantePage;
