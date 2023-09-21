"use client";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
// import { CustomInput } from "../../components/Common/CustomInput/CustomInput";
// import DashboardLayout from "../../themes/dashboard/DashboardLayout";
// import Title from "../../themes/dashboard/Title";
// import Loading from "../../components/Loading";
// import { fetchUserId, createUsers, editUser } from "../../redux/actions/users";
// // import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import CustomSelectChip from "../../components/CustomSelectChip";
// import { fetchAllRoles } from "../../redux/actions/roles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { Form, Formik } from "formik";
import { InputText } from "@/components/_forms/Inputs/InputText";
import { TitlePage } from "../style";
import { RoleState } from "@/store/modules/roles/rolesReducers";
import InputSelectChip from "@/components/_forms/Inputs/InputSelectChip";
import { InputPassword } from "@/components/_forms/Inputs/InputPassword";
import { UserSchema } from "@/validators/userSchema";
// import CustomBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
// import { DAFAULT_AVATAR } from "../../config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/services/firebase";
// import CustomProgress from "../../components/CustomProgress";
import { v4 as uuidv4 } from "uuid";
import { Store } from "react-notifications-component";
import {
  createUsers,
  editUser,
  fetchUserId,
} from "@/store/modules/users/usersActions";
import { useAppDispatch } from "@/hooks/useRedux";
import CustomProgress from "@/components/CustomProgress";
import { useRouter } from "next/navigation";

const breadcrumbsItens = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
    Inicio
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/usuarios"
    onClick={() => {}}
  >
    Usuários
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Cadastrar/Editar usuário
  </Typography>,
];

type FormValues = {
  fullname: string;
  name: string;
  email: string;
  password: string;
  cpassword: string;
  roles: any[];
};

const defaultValues: FormValues = {
  fullname: "",
  name: "",
  email: "",
  password: "",
  cpassword: "",
  roles: [],
};

const User = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [viewAvatar, setViewAvatar] = useState("");
  const [urlAvatar, setUrlAvatar] = useState("");
  const [percent, setPercent] = useState(0);
  const [viewProgressUpload, setViewProgressUpload] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const roleState = useSelector(RoleState);
  const allRoles = (roleState && roleState.allRoles) || null;

  useEffect(() => {
    if (id && id !== "novo") {
      dispatch(fetchUserId(id))
        .then((res: any) => {
          if (res.success) {
            const values: FormValues = {
              name: res.data?.name,
              fullname: res.data?.fullname,
              email: res.data?.email,
              password: "",
              cpassword: "",
              roles: res.data?.roles,
            };
            setUrlAvatar(res.data?.avatar);
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
    if (allRoles && allRoles.length > 0) {
      setRolesList(
        allRoles.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, [allRoles]);

  const handleUploadSendForm = async (values: FormValues) => {
    if (urlAvatar) {
      handleSendForm(urlAvatar);
    } else {
      setViewProgressUpload(true);
      if (!avatar) {
        Store.addNotification({
          title: "Erro Imagem!",
          message: "É necessario adicionar uma imagem para o usuário!",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: { duration: 4000 },
        });
        setViewProgressUpload(false);
        return;
      }
      const storageRef = ref(storage, `users/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          setViewProgressUpload(false);
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            handleSendForm({
              ...values,
              url: url,
            });
          });
        }
      );
    }
  };

  const handleSendForm = async (values: any) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      c_password: values.cpassword,
      full_name: values.fullName,
      phone: "",
      avatar: values.url || process.env.NEXT_PUBLIC_DAFAULT_AVATAR,
      roles: values.roles,
      _method: id !== "novo" ? "PUT" : "POST",
    };
    if (id !== "novo") {
      dispatch(editUser({ id: id, data: data }))
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
      dispatch(createUsers(data))
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

  const handleChangeAvatar = () => {
    setUrlAvatar("");
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <BreadcrumbComponent breadcrumbItens={breadcrumbsItens} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {id ? (
            <>
              <TitlePage>Editar usuário</TitlePage>
            </>
          ) : (
            <>
              <TitlePage>Cadastrar novo usuário</TitlePage>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ margin: "80px 24px 40px" }}
              >
                {!urlAvatar ? (
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      width: "144px",
                      height: "144px",
                      margin: "auto",
                      display: "flex",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "50%",
                      alignItems: "center",
                      position: "relative",
                      justifyContent: "center",
                      border: "1px dashed rgba(145, 158, 171, 0.32)",
                    }}
                  >
                    {viewAvatar && (
                      <Avatar
                        alt="User Image"
                        src={viewAvatar}
                        sx={{ width: 130, height: 130 }}
                      />
                    )}
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e: any) => {
                        setAvatar(e.target.files[0]);
                        setViewAvatar(URL.createObjectURL(e.target.files[0]));
                      }}
                      //@ts-ignore
                      sx={{ display: !avatar ? "inline" : "none" }}
                    />
                    <PhotoCamera
                      sx={{
                        position: "absolute",
                        color: !avatar ? "#ff7a2d" : "white",
                        opacity: !avatar ? 1 : 0.2,
                        top: "35%",
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        color: !avatar ? "#ff7a2d" : "white",
                        fontSize: "12px",
                        opacity: !avatar ? 1 : 0.2,
                        bottom: "35%",
                      }}
                      variant="body1"
                    >
                      Carregar foto
                    </Typography>
                  </IconButton>
                ) : (
                  <Avatar
                    sx={{
                      margin: "auto",
                      display: "flex",
                      overflow: "hidden",
                      alignItems: "center",
                      position: "relative",
                      justifyContent: "center",
                      width: 130,
                      height: 130,
                    }}
                    alt="User Image"
                    src={urlAvatar}
                  />
                )}
                <Typography
                  sx={{
                    margin: "16px auto 0px",
                    lineHeight: 1.5,
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "rgb(99, 115, 129)",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Permitido *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  tamanho máximo de 3,1 MB
                </Typography>
                {urlAvatar && (
                  <Button
                    onClick={() => handleChangeAvatar()}
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ color: "#fff", marginTop: "10px" }}
                  >
                    Remover Foto
                  </Button>
                )}
                {viewProgressUpload && <CustomProgress progress={percent} />}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
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
              validationSchema={UserSchema()}
              onSubmit={(values: FormValues, { setSubmitting }) => {
                console.log(values);
                handleUploadSendForm(values);
              }}
            >
              <Form>
                <Grid container spacing={1} sx={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="fullname"
                      name="fullname"
                      type="text"
                      variant="outlined"
                      label="Nome Completo"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputText
                      required
                      id="name"
                      name="name"
                      type="text"
                      variant="outlined"
                      label="Nome no app"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputPassword
                      required
                      id="password"
                      name="password"
                      type="password"
                      variant="outlined"
                      label="Senha"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InputPassword
                      required
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      variant="outlined"
                      label="Confirmar senha"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <InputText
                      required
                      id="email"
                      name="email"
                      type="text"
                      variant="outlined"
                      label="E-mail"
                      size="small"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <InputSelectChip
                      label="Papeis"
                      id="roles"
                      name="roles"
                      data={rolesList}
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
                        router.push(`/usuarios`);
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
