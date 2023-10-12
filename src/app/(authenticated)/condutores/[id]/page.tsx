"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAddressByCEP } from "@/store/modules/address/addressActions";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { useAppDispatch } from "@/hooks/useRedux";
import { TitlePage } from "../style";
import { Button, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { Store } from "react-notifications-component";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { InputSelect } from "@/components/_forms/Inputs/InputSelect";
import { CepMask } from "@/components/_forms/Masks/CepMask";
import { AddressState } from "@/store/modules/address/addressReducers";
import {
  createConductors,
  editConductor,
  fetchConductorId,
} from "@/store/modules/conductors/conductorsActions";
import { InputDate } from "@/components/_forms/Inputs/InputDate";
import { InputSwitch } from "@/components/_forms/Inputs/InputSwitch";
import { ConductorSchema } from "@/validators/conductorSchema";

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
    Condutores
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar condutor
  </Typography>,
];

const typeLicenceList = [
  { value: "Terrestre", label: "Terrestre" },
  { value: "Marítima", label: "Marítima" },
];

const categorieLicenceList = [
  { value: "A", label: "A" },
  { value: "AB", label: "AB" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

type FormValues = {
  name: string;
  typeLicence: string;
  categorieLicence: string;
  licenseDocumentIdentifier: string;
  validateLicence: number;
  age: string;
  cep: string;
  address: string;
  city: string;
  active: boolean;
};

const defaultValues = {
  name: "",
  typeLicence: "",
  categorieLicence: "",
  licenseDocumentIdentifier: "",
  validateLicence: 0,
  age: "",
  cep: "",
  address: "",
  city: "",
  active: false,
};

function CreateStudantePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState<boolean>(false);
  const routeState = useSelector(RouteState);
  const addresses = useSelector(AddressState);
  const routes = (routeState && routeState.allRoutes) || null;
  const searchCep = addresses && addresses.cep;

  const AutoGetAddress = () => {
    const { values } = useFormikContext<FormValues>();
    useEffect(() => {
      if (values?.cep.length === 9 && values?.cep !== searchCep) {
        dispatch(fetchAddressByCEP(values?.cep)).then((response: any) => {
          if (response) {
            setInitialValues({
              ...initialValues,
              address: response.main,
              city: response.city,
            });
          }
        });
      }
    }, [values]);
    return null;
  };

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchConductorId(id))
        .then((res: any) => {
          if (res.success) {
            const values: FormValues = {
              name: res.data?.name,
              typeLicence: res.data?.typeLicence,
              categorieLicence: res.data?.categorieLicence,
              licenseDocumentIdentifier: res.data?.licenseDocumentIdentifier,
              age: res.data?.age,
              cep: res.data?.cep,
              validateLicence: Date.parse(res.data?.validateLicence),
              address: res.data?.address,
              active: res.data?.active == 1 ? true : false,
              city: res.data?.city,
            };
            setInitialValues(values);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao carregar dados do condutor. Por favor, tente mais tarde!",
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

  const handleFormValidation = (data: FormValues, resetForm: any) => {
    setLoading(true);
    const formData = {
      nome: data.name,
      tipo_habilitacao: data.typeLicence,
      categoria_habilitacao: data.categorieLicence,
      identificador_documento_habilitacao: data.licenseDocumentIdentifier,
      validade_habilitacao: data.validateLicence,
      idade: data.age,
      ativo: data.active,
      cep: data.cep,
      endereco: data.address,
      cidade: data.city,
      _method: id !== "novo" ? "PUT" : "POST",
    };

    if (id !== "novo") {
      dispatch(editConductor({ id: id, data: formData }))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Condutor Editado!",
              message: "Condutor editado com sucesso!",
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
                "Falha ao tentar editar condutor. Por favor, tente mais tarde!",
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
      dispatch(createConductors(formData))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Condutor Cadastrado!",
              message: "Condutor cadastrado com sucesso!",
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
                "Falha ao cadastrar condutor. Por favor, tente mais tarde!",
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
              <TitlePage>Editar condutor</TitlePage>
            </>
          ) : (
            <>
              <TitlePage>Cadastrar novo condutor</TitlePage>
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
            <Divider variant="middle">Dados Pessoais</Divider>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={ConductorSchema()}
              onSubmit={(
                values: FormValues,
                { setSubmitting, resetForm }: FormikHelpers<FormValues>
              ) => {
                handleFormValidation(values, resetForm);
                setSubmitting(false);
              }}
            >
              <Form>
                <AutoGetAddress />
                <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} md={4} lg={4}>
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
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="age"
                      name="age"
                      type="text"
                      variant="outlined"
                      label="Idade"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputSelect
                      required
                      id="typeLicence"
                      name="typeLicence"
                      variant="outlined"
                      label="Tipo da habilitação"
                      data={typeLicenceList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputSelect
                      required
                      id="categorieLicence"
                      name="categorieLicence"
                      variant="outlined"
                      label="Categoria da Habilitação"
                      data={categorieLicenceList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputText
                      required
                      id="licenseDocumentIdentifier"
                      name="licenseDocumentIdentifier"
                      type="text"
                      variant="outlined"
                      label="Identificador de documento de habilitação"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <InputDate
                      id="validateLicence"
                      name="validateLicence"
                      variant="outlined"
                      label="Validade da Habilitação"
                      disabled={loading}
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
                  <Grid item xs={12} md={1} lg={1}>
                    <InputSwitch
                      id="active"
                      name="active"
                      label="Ativo"
                      checked={initialValues.active}
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
                        router.push("/condutores");
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
