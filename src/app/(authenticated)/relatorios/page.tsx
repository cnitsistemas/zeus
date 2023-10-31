"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
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
import {
  fetchReportRoutes,
  setFrequencyResponse,
  setRouterResponse,
  setStudentResponse,
} from "@/store/modules/reports/reportsActions";
import { ReportState } from "@/store/modules/reports/reportsReducers";
import { TableLoading } from "@/components/TableLoading";
import StudentsTab from "./_tabs/StudantsTab";
import { fetchAllRoutes } from "@/store/modules/routes/routesActions";
import FrequencyTab from "./_tabs/FrequencyTab";
import moment from "moment";

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

type DataProps = {
  value: string;
  label: string;
};

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

const typeList = [
  {
    label: "Terrestre",
    value: "Terrestre",
  },
  {
    label: "Fluvial",
    value: "Fluvial",
  },
  {
    label: "Terrestre/Marítimo",
    value: "Terrestre/Marítimo",
  },
];

const shiftList = [
  { value: "Manhã", label: "Manhã" },
  { value: "Tarde", label: "Tarde" },
  { value: "Noite", label: "Noite" },
  { value: "Manhã/Tarde", label: "Manhã/Tarde" },
  { value: "Tarde/Noite", label: "Tarde/Noite" },
];

function ConductorsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<any>>([]);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [description, setDescription] = useState<string | any>("");
  const [school, setSchool] = useState<string | any>("");
  const [type, setType] = useState<string | any>("");
  const [shift, setShift] = useState<string | any>("");
  const [value, setValue] = React.useState("rota");
  const state = useSelector(ReportState);
  const dispatch = useAppDispatch();
  const routeReports = (state && state.routesReports) || [];
  const startOfQ12022 = moment(new Date(), "YYYY-M-D").subtract(1, "year");

  useEffect(() => {
    dispatch(setRouterResponse([]));
    dispatch(setStudentResponse([]));
    dispatch(setFrequencyResponse([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllRoutes());

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

    const finalDescription = description ? `"${description}"` : "";
    const finalSchool = school ? `"${school}"` : "";
    const finalType = type ? `"${type}"` : "";
    const morning =
      shift === "Manhã" || shift === "Manhã/Tarde" ? "true" : "false";
    const afternoon =
      shift === "Tarde" || shift === "Manhã/Tarde" || shift === "Tarde/Noite"
        ? "true"
        : "false";
    const nocturnal =
      shift === "Noite" || shift === "Tarde/Noite" ? "true" : "false";

    dispatch(
      fetchReportRoutes(
        finalDescription,
        finalSchool,
        finalType,
        morning,
        afternoon,
        nocturnal
      )
    ).then(() => setIsLoading(false));
  };

  const handleRoutesReports = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();

    const finalDescription = description ? `"${description}"` : "";
    const finalSchool = school ? `"${school}"` : "";
    const finalType = type ? `"${type}"` : "";
    const morning =
      shift === "Manhã" || shift === "Manhã/Tarde" ? "true" : "false";
    const afternoon =
      shift === "Tarde" || shift === "Manhã/Tarde" || shift === "Tarde/Noite"
        ? "true"
        : "false";
    const nocturnal =
      shift === "Noite" || shift === "Tarde/Noite" ? "true" : "false";

    apiReports
      .get(
        `/api/v1/relatorios-rotas?descricao=${finalDescription}&escola=${finalSchool}&tipo=${finalType}&matutino=${morning}&vespertino=${afternoon}&noturno=${nocturnal}`,
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

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleChangeShift = (event: SelectChangeEvent) => {
    setShift(event.target.value);
  };

  const disableReport = () => {
    if (!description && !school && !type && !shift) {
      return true;
    } else {
      return false;
    }
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
                <TabContext value={value}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="Rotas" value="rota" />
                    <StyledTab label="Alunos" value="alunos" />
                    <StyledTab label="Frequências" value="frequencia" />
                  </StyledTabs>
                  <TabPanel value="rota">
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4} lg={3}>
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
                      <Grid item xs={12} md={4} lg={3}>
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
                      <Grid item xs={12} md={4} lg={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel id={"shift"}>Tipo de rota</InputLabel>
                          <Select
                            required
                            id="type"
                            name="type"
                            value={type}
                            variant="outlined"
                            label="Tipo de rota"
                            labelId={"type"}
                            onChange={handleChangeSelect}
                            disabled={isLoading}
                          >
                            {typeList.map(({ value, label }: DataProps) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4} lg={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel id={"shift"}>Turno</InputLabel>
                          <Select
                            required
                            id="shift"
                            name="shift"
                            value={shift}
                            variant="outlined"
                            label="Turno"
                            labelId={"shift"}
                            onChange={handleChangeShift}
                            disabled={isLoading}
                          >
                            {shiftList.map(({ value, label }: DataProps) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={12}>
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
                          disabled={disableReport()}
                        >
                          Gerar PDF
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        {isLoading ? (
                          <Grid item xs={12} md={12} lg={12}>
                            <TableLoading />
                          </Grid>
                        ) : routeReports &&
                          routeReports.length > 0 &&
                          !isLoading ? (
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
                                    <StyledTableCell component="th" scope="row">
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
                        ) : (
                          <Grid>
                            <Alert severity="warning">
                              Nenhum dado foi encontrado! Verifique os filtros
                              utilizados para ver se estão de acordo com a sua
                              busca.
                            </Alert>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="alunos">
                    <StudentsTab />
                  </TabPanel>
                  <TabPanel value="frequencia">
                    <FrequencyTab startOfQ12022={startOfQ12022} />
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
        title={`Imprimir relatório`}
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
