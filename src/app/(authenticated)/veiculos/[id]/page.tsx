"use client";
import { Button, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Form, Formik, useFormikContext } from "formik";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { TitlePage } from "../style";
import { Store } from "react-notifications-component";
import { useAppDispatch } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import { InputSelect } from "@/components/_forms/Inputs/InputSelect";
import { VehiclesSchema } from "@/validators/vehicleSchema";
import { InputSwitch } from "@/components/_forms/Inputs/InputSwitch";
import {
  createVehicles,
  editVehicle,
  fetchVehiclesId,
} from "@/store/modules/vehicles/vehiclesActions";

const breadcrumbsItens = [
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
    Veículos
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar veículos
  </Typography>,
];

type FormValues = {
  description: string;
  type: string;
  identification: string;
  active: boolean;
};

const defaultValues: FormValues = {
  description: "",
  type: "",
  identification: "",
  active: false,
};

const typeList = [
  {
    label: "Utilitário",
    value: "Utilitário",
  },
  {
    label: "Ônibus",
    value: "Ônibus",
  },
  {
    label: "Micro ônibus",
    value: "Micro ônibus",
  },
  {
    label: "Van",
    value: "Van",
  },
  {
    label: "Embarcação",
    value: "Embarcação",
  },
];

const User = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [initialValues, setInitialValues] = useState(defaultValues);

  const SelectedTypeVehicles = () => {
    const { values } = useFormikContext<FormValues>();
    useEffect(() => {
      if (values?.type !== "") {
        setSelectedType(values?.type);
      }
    }, [values]);
    return null;
  };

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchVehiclesId(id))
        .then((res: any) => {
          if (res.success) {
            const values: FormValues = {
              description: res.data?.descricao,
              type: res.data?.tipo,
              identification: res.data?.identificacao,
              active: res.data?.ativo == 1 ? true : false,
            };
            setInitialValues(values);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao carregar dados do veículo. Por favor, tente mais tarde!",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
          }
        })
        .catch((e: any) => console.warn(e));
    }
  }, [dispatch, id]);

  const handleSendForm = async (values: FormValues, resetForm: any) => {
    const data = {
      descricao: values.description,
      tipo: values.type,
      identificacao: values.identification,
      ativo: values.active,
      _method: id !== "novo" ? "PUT" : "POST",
    };
    if (id !== "novo") {
      dispatch(editVehicle({ id: id, data: data }))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Veículo Editado!",
              message: "Veículo editado com sucesso!",
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
                "Falha ao tentar editar veículo. Por favor, tente mais tarde!",
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
      dispatch(createVehicles(data))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Veículo Cadastrado!",
              message: "Veículo cadastrado com sucesso!",
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
                "Falha ao tentar cadastrar veículo. Por favor, tente mais tarde!",
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
          <BreadcrumbComponent breadcrumbItens={breadcrumbsItens} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {id && id !== "novo" ? (
            <>
              <TitlePage>Editar Veículo</TitlePage>
            </>
          ) : (
            <>
              <TitlePage>Cadastrar novo Veículo</TitlePage>
            </>
          )}
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
              validationSchema={VehiclesSchema(selectedType)}
              onSubmit={(values: FormValues, { resetForm }) => {
                handleSendForm(values, resetForm);
              }}
            >
              <Form>
                <SelectedTypeVehicles />
                <Grid container spacing={1} sx={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} md={6} lg={3}>
                    <InputText
                      required
                      id="description"
                      name="description"
                      type="text"
                      variant="outlined"
                      label="Descrição"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <InputSelect
                      required
                      id="type"
                      name="type"
                      variant="outlined"
                      label="Tipo"
                      data={typeList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <InputText
                      required
                      id="identification"
                      name="identification"
                      type="text"
                      variant="outlined"
                      label="Identificação"
                      size="small"
                      disabled={loading}
                      topLabel={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} lg={1}>
                    <InputSwitch
                      id="active"
                      name="active"
                      label="Ativo"
                      checked={initialValues?.active}
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
                        router.push(`/veiculos`);
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
};

export default User;
