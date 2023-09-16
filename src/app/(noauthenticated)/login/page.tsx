"use client";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { handleSingIn } from "@/store/modules/singIn/singInActions";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { Box, Container, Typography } from "@mui/material";
import { BoxFormLogin, ButtonFormSubmit, WrapperMain } from "./style";
import { Form, Formik, FormikHelpers } from "formik";
import { SingInSchema } from "@/validators/singInSchema";
import { InputText } from "@/components/_forms/Inputs/InputText";
import Copyright from "./copyright";
import { Store } from "react-notifications-component";

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleFormValidation = (data: FormValues) => {
    setLoading(true);

    const body = {
      email: data.email,
      password: data.password,
    };
    dispatch(handleSingIn(body)).then((response) => {
      console.log(response.data);
      if (response.success) {
        router.push("/");
        setLoading(false);
      } else {
        setLoading(false);
        Store.addNotification({
          title: "Error!",
          message: "Falha no login. Por favor, tente novamente!",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: { duration: 4000 },
        });
      }
    });
  };

  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <WrapperMain>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <BoxFormLogin>
              <Image src={Logo} width={210} alt="Picture of the author" />
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#bdbdbd",
                  marginY: "1rem",
                  fontSize: "14px",
                }}
              >
                Bem vindo a nova versão do painel administrativo de gestão de
                rotas e alunos da CNIT.
              </Typography>
              <Box sx={{ mt: 1, width: "100%" }}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={SingInSchema()}
                  onSubmit={(
                    values: FormValues,
                    { setSubmitting }: FormikHelpers<FormValues>
                  ) => {
                    handleFormValidation(values);
                    setSubmitting(false);
                  }}
                >
                  <Form>
                    <InputText
                      required
                      id="email"
                      name="email"
                      type="email"
                      variant="outlined"
                      label="E-mail"
                      size="small"
                      disabled={loading}
                    />
                    <InputText
                      required
                      id="password"
                      name="password"
                      type="password"
                      variant="outlined"
                      size="small"
                      label="Senha"
                      disabled={loading}
                    />
                    <ButtonFormSubmit
                      loading={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 3, mb: 2, color: "#fff", height: 45 }}
                      disableElevation
                    >
                      Entrar
                    </ButtonFormSubmit>
                  </Form>
                </Formik>
              </Box>
            </BoxFormLogin>
            <Copyright />
          </Container>
        </WrapperMain>
      </Suspense>
    </>
  );
}
export default LoginPage;
