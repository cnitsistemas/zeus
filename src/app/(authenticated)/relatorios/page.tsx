"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  Alert,
  Button,
  Grid,
  Link,
  Paper,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CustomTootip from "@/components/CustomTootip";
import CustomizedDialogs from "@/components/CustomDialog";
import { StyledTableCell, StyledTableRow, TitlePage } from "./style";
import PrintIcon from "@mui/icons-material/Print";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import apiReports from "@/services/reports-api";
import { fetchReportRoutes } from "@/store/modules/reports/reportsActions";
import { ReportState } from "@/store/modules/reports/reportsReducers";
import { TableLoading } from "@/components/TableLoading";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<any>>([]);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [description, setDescription] = useState<string | any>("");
  const [school, setSchool] = useState<string | any>("");
  const [value, setValue] = React.useState("rota");
  const reportState = useSelector(ReportState);
  const dispatch = useAppDispatch();
  const routeReports = (reportState && reportState.routesReports) || [];

  useEffect(() => {
    if (routeReports && routeReports.length > 0) {
      setRows(routeReports);
    }
  }, [routeReports]);

  const handleOpenDeleteDialog = (): void => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialog(false);
  };

  const generateReportRoutes = () => {
    setIsLoading(true);

    const finalDescription = description ? `"${description}"` : null;
    const finalSchool = school ? `"${school}"` : null;
    dispatch(fetchReportRoutes(finalDescription, finalSchool)).then(() =>
      setIsLoading(false)
    );
  };

  const handleRoutesReports = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();

    const finalDescription = description ? `"${description}"` : null;
    const finalSchool = school ? `"${school}"` : null;
    apiReports
      .get(
        `/api/v1/relatorios-rotas?descricao=${finalDescription}&escola=${finalSchool}`,
        { responseType: "blob" }
      )
      .then((response) => {
        setIsLoading(false);
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
              <Grid item xs={12} md={12} lg={12}>
                <Alert severity="warning">
                  O modulo de relatórios ainda está em desenvolvimento! Está é
                  uma versão disponivel para testes.
                </Alert>
              </Grid>
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
                          onClick={() => generateReportRoutes()}
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
                      <Grid item xs={12} md={12}>
                        {isLoading ? (
                          <Grid item xs={12} md={12} lg={12}>
                            <TableLoading />
                          </Grid>
                        ) : (
                          routeReports &&
                          routeReports.length > 0 &&
                          !isLoading && (
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 700 }}
                                aria-label="customized table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>
                                      Descrição da rota
                                    </StyledTableCell>
                                    <StyledTableCell>Tipo</StyledTableCell>
                                    <StyledTableCell>Escola</StyledTableCell>
                                    <StyledTableCell>
                                      Quantidade de Alunos
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {row.nome}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.tipo}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.escolas}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.quantidadeAlunos}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="frequencia">
                    Relatórios de Frequencia.
                  </TabPanel>
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
        content={`Tem certeza que deseja imprimir relatório?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Imprimir"
        cancelButtonText="Não"
        handleConfirm={handleRoutesReports}
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
