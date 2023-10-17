"use client";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import { RouteState } from "@/store/modules/routes/routesReducers";
import {
  Button,
  Grid,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CustomTootip from "@/components/CustomTootip";
import CustomizedDialogs from "@/components/CustomDialog";
import { TitlePage } from "./style";
import PrintIcon from "@mui/icons-material/Print";
import { fetchConductors } from "@/store/modules/conductors/conductorsActions";
import { ConductorState } from "@/store/modules/conductors/conductorsReducers";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import apiReports from "@/services/reports-api";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#ff7a2d",
  },
});

interface StyledTabProps {
  label: string;
  value: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "#32386f",
    "&.Mui-selected": {
      color: "#000",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#ff7a2d",
    },
  })
);

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Inicio
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Relatórios
  </Typography>,
];

function ConductorsPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedConductor, setSelectedConductor] = useState<any>({});
  const [description, setDescription] = useState<any>("");
  const [school, setSchool] = useState<any>("");
  const [viewDialog, setViewDialog] = useState(false);
  const [value, setValue] = React.useState("rota");
  const conductorState = useSelector(ConductorState);
  const routeState = useSelector(RouteState);
  const dispatch = useAppDispatch();
  const conductors = conductorState && conductorState.conductors;
  const totalPages =
    (conductorState &&
      conductorState.pagination &&
      conductorState.pagination.totalPages) ||
    1;
  const selectedPage =
    (conductorState &&
      conductorState.pagination &&
      conductorState.pagination.page) ||
    1;
  const routes = (routeState && routeState.allRoutes) || null;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchConductors(page)).then(() => setIsLoading(false));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (conductors && conductors.length > 0) {
      setRows(conductors);
    }
  }, [conductors]);

  const handleOpenDeleteDialog = (): void => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialog(false);
  };

  const handleOpenViewDialog = (): void => {
    setViewDialog(true);
  };

  const handleCloseViewDialog = (): void => {
    setViewDialog(false);
  };

  const fetchRotaName = (id: String) => {
    const studentRoute =
      routes &&
      routes.find((item: any) => {
        return item.id === id;
      });
    return studentRoute && studentRoute.name;
  };

  const handleDeleteStudent = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    apiReports
      .get(
        `/api/v1/relatorios-rotas?descricao=${description}`,
        { responseType: "blob" } // !!!
      )
      .then((response) => {
        window.open(URL.createObjectURL(response.data));
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <BreadcrumbComponent breadcrumbItens={breadcrumbItens} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={0} sx={{ padding: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={8} lg={8}>
                <TitlePage component={"h1"}>
                  Relatórios
                  <CustomTootip
                    placement="right"
                    content={`A tela de relatórios é responsável pelo emissãos dos dados de relatórios referentes as frequencias e rotas do sistemas.`}
                  />
                </TitlePage>
                <Typography
                  component={"h1"}
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  Tela de relatórios do sistema.
                </Typography>
              </Grid>
              <Grid item xs={6} md={4} lg={4}></Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TabContext value={value}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="Rotas" value="rota" />
                    <StyledTab label="Frequências" value="frequencia" />
                  </StyledTabs>
                  <TabPanel value="rota">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4} lg={4}>
                        <TextField
                          id="description-report"
                          label="Descrição"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <TextField
                          id="school-report"
                          label="Escola"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            color: "#fff",
                            height: 40,
                            fontSize: "12px",
                            marginRight: "10px",
                          }}
                          startIcon={<FaEye />}
                          onClick={() => {}}
                        >
                          Gerar relatório
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            color: "#fff",
                            height: 40,
                            fontSize: "12px",
                          }}
                          startIcon={<PrintIcon />}
                          onClick={() => handleOpenDeleteDialog()}
                        >
                          Gerar PDF
                        </Button>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="frequencia">Item Two</TabPanel>
                </TabContext>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar aluno`}
        content={`Tem certeza que deseja imprimir relatório com os seguintes filtros: ${description}?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Imprimir"
        cancelButtonText="Não"
        handleConfirm={handleDeleteStudent}
        confirmButtonError={false}
        fullWidth={true}
        maxWidth={"xs"}
        dividers={true}
        textAling="start"
      />
    </>
  );
}

export default ConductorsPage;
