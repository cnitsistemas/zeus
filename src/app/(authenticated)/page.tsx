"use client";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAccessTokenConecta } from "@/store/modules/address/addressActions";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImgHome from "@/assets/3255469.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { SingInState } from "@/store/modules/singIn/singInReducers";
import { CustomOverview } from "@/components/sessions/overview/CustomOverview";
import {
  FaUserGraduate,
  FaDirections,
  FaPaste,
  FaUserFriends,
} from "react-icons/fa";
import { fetchDataDashboard } from "@/store/modules/home/homeActions";
import { HomeState } from "@/store/modules/home/homeReducers";
import LastStudents from "@/components/sessions/tables/LastStudents";
import LastRoutes from "@/components/sessions/tables/LastRoutes";

function HomeComponent() {
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useAppDispatch();
  const state = useSelector(SingInState);
  const homeState = useSelector(HomeState);
  const userName = (state.auth && state.auth.name) || "";
  const totalStudents = homeState.totalStudents || 0;
  const totalRoutes = homeState.totalRoutes || 0;
  const totalUsers = homeState.totalUsers || 0;
  const rowStudents = homeState.lastStudents || [];
  const rowRoutes = homeState.lastRoutes || [];

  useEffect(() => {
    dispatch(getAccessTokenConecta());
    dispatch(fetchDataDashboard());
  }, [dispatch]);
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              overflow: "hidden",
              position: "relative",
              background: "#ffeee5",
              borderRadius: "16px",
              padding: "1rem 2rem",
            }}
          >
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={7}
                md={7}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#383838",
                  }}
                >
                  Bem-vindo! {userName}
                </Typography>
                <Typography
                  component="h2"
                  variant="body1"
                  sx={{
                    color: "#7a7a7a",
                    margin: "1rem 0",
                    fontSize: "16px",
                  }}
                >
                  Acesse o menu lateral para ter acesso ao controle de alunos,
                  rotas, usuarios e frequências disponíveis no tecnogatt.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Image src={ImgHome} width={200} alt="img home" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomOverview
            title="Alunos Cadastrados"
            value={totalStudents}
            color="#f04438"
            icon={<FaUserGraduate />}
            sx={{ height: "100%" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CustomOverview
            title="Rotas Cadastradas"
            value={totalRoutes}
            color="#10b981"
            icon={<FaDirections />}
            sx={{ height: "100%" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CustomOverview
            title="Frequências Realizadas"
            value={0}
            color="#f79009"
            icon={<FaPaste />}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomOverview
            title="Usuários Ativos"
            value={totalUsers}
            color="#6366f1"
            icon={<FaUserFriends />}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={0}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <LastStudents rows={rowStudents} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={0}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <LastRoutes rows={rowRoutes} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeComponent;
