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
import { connect } from "react-redux";
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
// import CustomBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
// import { DAFAULT_AVATAR } from "../../config";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase";
// import CustomProgress from "../../components/CustomProgress";
// import { v4 as uuidv4 } from 'uuid';

const breadcrumbs = [
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

const User = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [viewAvatar, setViewAvatar] = useState("");
  const [urlAvatar, setUrlAvatar] = useState("");
  const [name, setName] = useState("");
  const [selectRoles, setSelectRoles] = useState([]);
  const [percent, setPercent] = useState(0);
  const [viewProgressUpload, setViewProgressUpload] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     setUserId(id);
  //     fetchUserId(id).then((res: any) => {
  //       if (res.success) {
  //         setName(res.data?.name);
  //         setEmail(res.data?.email);
  //         setPhone(res.data?.phone);
  //         setUrlAvatar(res.data?.avatar);
  //         setFullName(res.data?.fullName);
  //         setSelectRoles(res.data?.roles);
  //       } else {
  //         // NotificationManager.error('Erro ao carregar aluno!', 'Erro');
  //       }
  //     })
  //       .catch((e: any) => console.warn(e))
  //   }
  // }, [fetchUserId, id]);

  const clearStatesForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setFullName("");
    setSelectRoles([]);
    setAvatar(null);
    setViewAvatar("");
  };

  const handleUploadSendForm = async () => {
    // if (urlAvatar) {
    //   handleSendForm(urlAvatar);
    // } else {
    //   setViewProgressUpload(true);
    //   if (!avatar) {
    //     // NotificationManager.error('É necessario adicionar uma imagem para o usuário!', 'Erro Imagem');
    //     setViewProgressUpload(false);
    //     return;
    //   }
    //   const storageRef = ref(storage, `users/${uuidv4()}`);
    //   const uploadTask = uploadBytesResumable(storageRef, avatar);
    //   uploadTask.on("state_changed",
    //     (snapshot) => {
    //       const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //       setPercent(percent);
    //     },
    //     (err) => console.log(err),
    //     () => {
    //       setViewProgressUpload(false);
    //       getDownloadURL(uploadTask.snapshot.ref).then((url) => { handleSendForm(url) });
    //     }
    //   );
    // }
  };

  const handleSendForm = async (imgUrl: any) => {
    // const data = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   c_password: cPassword,
    //   full_name: fullName,
    //   phone: "",
    //   avatar: imgUrl || DAFAULT_AVATAR,
    //   roles: selectRoles,
    //   _method: userId ? "PUT" : "POST",
    // };
    // if (userId) {
    //   await editUser({ id: userId, data: data }).then((res) => {
    //     if (res.success) {
    //       NotificationManager.success('Usuário editado com sucesso!', 'Sucesso');
    //       clearStatesForm();
    //     } else {
    //       NotificationManager.error('Erro ao editar usuário!', 'Erro');
    //     }
    //   })
    //     .catch((e) => console.warn(e))
    // } else {
    //   await createUsers(data).then((res) => {
    //     if (res.success) {
    //       NotificationManager.success('Usuário cadastrado com sucesso!', 'Sucesso');
    //       clearStatesForm();
    //     } else {
    //       NotificationManager.error('Erro ao cadastrar usuário!', 'Erro');
    //     }
    //   })
    //     .catch((e) => console.warn(e))
    // }
  };

  const handleChangeAvatar = () => {
    setUrlAvatar("");
  };

  return (
    <>
      {/* <Loading isActive={loading} /> */}
      {/* <NotificationContainer /> */}
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={12} lg={12}>
            <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          </Grid> */}
        <Grid item xs={12} md={4} lg={4}>
          {userId ? (
            <>
              <Typography>Editar usuário</Typography>
            </>
          ) : (
            <>
              <Typography>Cadastrar novo usuário</Typography>
            </>
          )}
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
                      style={{
                        display: !avatar ? "inline" : "none",
                      }}
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
                {/* {viewProgressUpload && <CustomProgress progress={percent} />} */}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              marginTop: 5,
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={1} sx={{ marginBottom: "2rem" }}>
              {/* <Grid item xs={12} md={6} lg={6}>
                  <CustomInput
                    margin={"normal"}
                    required
                    fullWidth
                    id={"full-name"}
                    label={"Nome Completo"}
                    name={"full-name"}
                    autoComplete={"full-name"}
                    inputtype={"input"}
                    variant={"outlined"}
                    value={fullName}
                    onChange={(e: any) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CustomInput
                    margin={"normal"}
                    required
                    fullWidth
                    id={"name"}
                    label={"Nome no app"}
                    name={"name"}
                    autoComplete={"name"}
                    inputtype={"input"}
                    variant={"outlined"}
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CustomInput
                    margin={"normal"}
                    required
                    fullWidth
                    id={"email"}
                    label={"Email"}
                    name={"email"}
                    autoComplete={"email"}
                    inputtype={"input"}
                    variant={"outlined"}
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CustomInput
                    margin={"normal"}
                    required
                    fullWidth
                    id={"password"}
                    label={"Senha"}
                    name={"password"}
                    autoComplete={"password"}
                    inputtype={"input"}
                    variant={"outlined"}
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CustomInput
                    margin={"normal"}
                    required
                    fullWidth
                    id={"cpassword"}
                    label={"Confirmar senha"}
                    name={"cpassword"}
                    autoComplete={"cpassword"}
                    inputtype={"input"}
                    type="password"
                    variant={"outlined"}
                    value={cPassword}
                    onChange={(e: any) => setCPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <CustomSelectChip
                    title="Papeis"
                    items={allRoles}
                    selectedItems={selectRoles}
                    setSelectedItems={setSelectRoles}
                  />
                </Grid> */}
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
                <Button variant="outlined" fullWidth onClick={() => {}}>
                  Voltar
                </Button>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Button
                  onClick={() => handleUploadSendForm()}
                  variant="contained"
                  fullWidth
                  sx={{ color: "#fff" }}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
