"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchAddressByCEP,
  setCEP,
} from "@/store/modules/address/addressActions";
// import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { RouteOption } from "@/domain/route/routeDTO";
import {
  createStudents,
  editStudent,
  fetchStudentId,
} from "@/store/modules/students/studentsActions";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchAllRoutes } from "@/store/modules/routes/routesActions";
import { TitlePage } from "../style";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { Store } from "react-notifications-component";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { StudentSchema } from "@/validators/studanteSchema";
import { InputSelect } from "@/components/_forms/Inputs/InputSelect";
import { InputAutoComplete } from "@/components/_forms/Inputs/InputAutoComplete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { HoursMask } from "@/components/_forms/Masks/HoursMask";
import { CepMask } from "@/components/_forms/Masks/CepMask";
import { AddressState } from "@/store/modules/address/addressReducers";

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
    Alunos
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar aluno
  </Typography>,
];

const shiftList = [
  { value: "Manhã", label: "Manhã" },
  { value: "Tarde", label: "Tarde" },
  { value: "Noite", label: "Noite" },
];
const teachingList = [
  { value: "Infantil", label: "Infantil" },
  { value: "Fundamental", label: "Fundamental" },
  { value: "Médio", label: "Médio" },
  { value: "Superior", label: "Superior" },
];

type FormValues = {
  name: string;
  schoolName: string;
  serie: string;
  teaching: string;
  shift: string;
  route: string;
  departureTime: string;
  backTime: string;
  cep: string;
  address: string;
  neighborhood: string;
  number: string;
  comnplement: string;
  city: string;
  state: string;
};

function CreateStudantePage({ params }: { params: { id: string } }) {
  const defaultValues = {
    name: "",
    schoolName: "",
    serie: "",
    teaching: "",
    shift: "",
    route: "",
    departureTime: "",
    backTime: "",
    cep: "",
    address: "",
    neighborhood: "",
    number: "",
    comnplement: "",
    city: "",
    state: "",
  };
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<any>(defaultValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [dataCEP, setDataCEP] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const routeState = useSelector(RouteState);
  const addresses = useSelector(AddressState);
  const routes = (routeState && routeState.allRoutes) || null;
  const searchCep = addresses && addresses.cep;
  // const [controllerSubmit, setControllerSubmit] = useState<boolean>(true);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setRoutersList(
        routes.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, [routes]);

  const AutoGetAddress = () => {
    const { values } = useFormikContext<FormValues>();
    useEffect(() => {
      if (values?.cep.length === 9 && values?.cep !== searchCep) {
        dispatch(fetchAddressByCEP(values?.cep)).then((response: any) => {
          setInitialValues({
            ...defaultValues,
            address: response.address,
            neighborhood: response.neighborhood,
            number: response.number,
            comnplement: response.complement,
            city: response.city,
            state: response.state,
          });
        });
      }
    }, [values]);
    return null;
  };

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchStudentId(id))
        .then((res) => {
          if (res.success) {
            const routeSelected = routes.find(
              (route: any) => route.id === res.data?.rota_id
            );
            const defaultValues = {
              name: res.data?.name,
              serie: res.data?.serie,
              schoolName: res.data?.schoolName,
              teaching: {
                value: res.data?.teaching,
                label: res.data?.teaching,
              },
              shift: { value: res.data?.shift, label: res.data?.shift },
              departureTime: res.data?.departureTime,
              backTime: res.data?.backTime,
            };
            setSelectedRoute({
              value: routeSelected.id,
              label: routeSelected.name,
            });
            setDataCEP(res.data?.cep);
            setAddress(res.data?.address);
            setNeighborhood(res.data?.neighborhood);
            setNumber(res.data?.number);
            setComplement(res.data?.complement);
            setCity(res.data?.city);
            setState(res.data?.state);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao carregar dados do aluno. Por favor, tente mais tarde!",
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

  const updateRoutesList = (): void => {
    dispatch(fetchAllRoutes());
  };

  const clearStatesForm = (): void => {
    setInitialValues(defaultValues);
  };

  const handleFormValidation = (data: any) => {
    setIsLoading(true);
    const formData = {
      nome: data.name,
      serie: data.serie,
      ensino: data.teaching,
      turno: data.shift,
      nome_escola: data.schoolName,
      hora_ida: data.departureTime,
      hora_volta: data.backTime,
      cep: data.cep,
      endereco: data.address,
      bairro: data.neighborhood,
      numero: data.number,
      complemento: data.complement,
      cidade: data.city,
      estado: data.state,
      rota_id: data.route?.value,
      _method: id !== "novo" ? "PUT" : "POST",
    };

    if (id !== "novo") {
      dispatch(editStudent({ id: id, data: formData }))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Aluno Editado!",
              message: "Aluno editado com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            clearStatesForm();
            setIsLoading(false);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao tentar editar aluno. Por favor, tente mais tarde!",
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
      dispatch(createStudents(formData))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Aluno Cadastrado!",
              message: "Aluno cadastrado com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            setIsLoading(false);
          } else {
            Store.addNotification({
              title: "Error!",
              message: "Falha ao cadastrar aluno. Por favor, tente mais tarde!",
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

  useEffect(() => {
    if (dataCEP && dataCEP.length === 9) {
      dispatch(
        fetchAddressByCEP([
          {
            name: "address-by-cep",
            type: "error",
            callback: () => {
              console.warn("PostalCode.fetchAddressByCEP.error");
            },
          },
          {
            name: "address-by-cep",
            type: "success",
            callback: (response: any) => {
              setAddress(response.main);
              setNeighborhood(response.neighborhood);
              setComplement(response.complement);
              setCity(response.city);
              setState(response.state);
            },
          },
        ])
      );
    }
  }, [dataCEP, dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          {/* <BreadcrumbComponent breadcrumbItens={breadcrumbItens} /> */}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TitlePage>Cadastrar Membro</TitlePage>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Divider variant="middle">Dados Pessoais</Divider>
            <Formik
              initialValues={initialValues}
              validationSchema={StudentSchema()}
              onSubmit={(
                values: FormValues,
                { setSubmitting }: FormikHelpers<FormValues>
              ) => {
                console.log(values);
                handleFormValidation(values);
                setSubmitting(false);
              }}
            >
              <Form>
                <AutoGetAddress />
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
                      label="Nome da escola"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="serie"
                      name="serie"
                      type="text"
                      variant="outlined"
                      label="Série"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputSelect
                      required
                      id="teaching"
                      name="teaching"
                      variant="outlined"
                      label="Ensino"
                      data={teachingList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputSelect
                      required
                      id="shift"
                      name="shift"
                      variant="outlined"
                      label="Turno"
                      data={shiftList}
                      disabled={loading}
                    />
                  </Grid>

                  <Grid item xs={10} md={5} lg={5}>
                    <InputAutoComplete
                      id="route"
                      name="route"
                      variant="outlined"
                      label="Selecione uma rota"
                      data={routersList}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2} md={1} lg={1}>
                    <Tooltip title="Atualizar rotas">
                      <IconButton
                        onClick={() => updateRoutesList()}
                        size="large"
                        color="primary"
                        aria-label="atualizar-rotas"
                        sx={{ marginTop: ".7rem" }}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="departureTime"
                      name="departureTime"
                      variant="outlined"
                      label="Horário de Ida"
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
                      id="backTime"
                      name="backTime"
                      variant="outlined"
                      label="Horário de Volta"
                      disabled={loading}
                      InputProps={{
                        maxLength: 5,
                        inputComponent: HoursMask,
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle">Dados de endereço</Divider>
                <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      type="tel"
                      size={"small"}
                      id="cep"
                      name="cep"
                      variant="outlined"
                      label="CEP"
                      disabled={loading}
                      onChange={(e: any) => dispatch(setCEP(e.target.value))}
                      InputProps={{
                        maxLength: 9,
                        inputComponent: CepMask,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <InputText
                      required
                      id="address"
                      name="address"
                      type="text"
                      variant="outlined"
                      label="Endereço"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="neighborhood"
                      name="neighborhood"
                      type="text"
                      variant="outlined"
                      label="Bairro"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <InputText
                      required
                      id="number"
                      name="number"
                      type="text"
                      variant="outlined"
                      label="Número"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      id="complement"
                      name="complement"
                      type="text"
                      variant="outlined"
                      label="Complemento"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="city"
                      name="city"
                      type="text"
                      variant="outlined"
                      label="Cidade"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="state"
                      name="state"
                      type="text"
                      variant="outlined"
                      label="Estado"
                      size="small"
                      disabled={loading}
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
                        clearStatesForm();
                      }}
                    >
                      limpar
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        router.push("/estudantes");
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
