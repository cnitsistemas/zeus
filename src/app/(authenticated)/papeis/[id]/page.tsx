"use client";
import { Button, Divider, Grid, Link, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Form, Formik } from "formik";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { TitlePage } from "../style";
import InputSelectChip from "@/components/_forms/Inputs/InputSelectChip";
import { Store } from "react-notifications-component";
import { useAppDispatch } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import { fetchAllPermissions } from "@/store/modules/permissions/permissionsActions";
import { PermissionState } from "@/store/modules/permissions/permissionsReducers";
import {
  createRoles,
  editRole,
  fetchRoleId,
} from "@/store/modules/roles/rolesActions";
import { RoleSchema } from "@/validators/roleSchema";

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
    Papéis
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar papéis
  </Typography>,
];

type FormValues = {
  name: string;
  permissions: any[];
};

const defaultValues: FormValues = {
  name: "",
  permissions: [],
};

const User = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [permissionList, setPermissionList] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const permissionState = useSelector(PermissionState);
  const allPermission =
    (permissionState && permissionState.allPermissions) || null;

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchRoleId(id))
        .then((res: any) => {
          if (res.success) {
            const values: FormValues = {
              name: res.data?.name,
              permissions: res.data?.permissions,
            };
            setInitialValues(values);
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao carregar dados do usuário. Por favor, tente mais tarde!",
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
  useEffect(() => {
    if (allPermission && allPermission.length > 0) {
      setPermissionList(
        allPermission.map((permission: any) => {
          return { value: permission, label: permission };
        })
      );
    }
  }, [allPermission]);

  useEffect(() => {
    if (id === "novo") {
      dispatch(fetchAllPermissions());
    }
  }, [dispatch, id]);

  const handleSendForm = async (values: any) => {
    const data = {
      name: values.name,
      roles: values.roles,
      _method: id !== "novo" ? "PUT" : "POST",
    };
    if (id !== "novo") {
      dispatch(editRole({ id: id, data: data }))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Usuário Editado!",
              message: "Usuário editado com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            //clearStatesForm();
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao tentar editar usuário. Por favor, tente mais tarde!",
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
      dispatch(createRoles(data))
        .then((res) => {
          if (res.success) {
            Store.addNotification({
              title: "Usuário Cadastrado!",
              message: "Usuário cadastrado com sucesso!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: { duration: 4000 },
            });
            //clearStatesForm();
          } else {
            Store.addNotification({
              title: "Error!",
              message:
                "Falha ao tentar cadastrar usuário. Por favor, tente mais tarde!",
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
              <TitlePage>Editar papel</TitlePage>
            </>
          ) : (
            <>
              <TitlePage>Cadastrar novo papel</TitlePage>
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
              validationSchema={RoleSchema()}
              onSubmit={(values: FormValues, { setSubmitting }) => {
                handleSendForm(values);
              }}
            >
              <Form>
                <Grid container spacing={1} sx={{ marginBottom: "2rem" }}>
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
                    <InputSelectChip
                      label="Permissões"
                      id="permissions"
                      name="permissions"
                      data={permissionList}
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
                        router.push(`/papeis`);
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
