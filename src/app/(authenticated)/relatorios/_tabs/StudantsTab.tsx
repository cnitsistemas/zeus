import { TableLoading } from "@/components/TableLoading";
import { useAppDispatch } from "@/hooks/useRedux";
import { ReportState } from "@/store/modules/reports/reportsReducers";
import { fetchAllRoutes } from "@/store/modules/routes/routesActions";
import { RouteState } from "@/store/modules/routes/routesReducers";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import CustomizedDialogs from "@/components/CustomDialog";
import { StyledTableCell, StyledTableRow } from "../style";
import PrintIcon from "@mui/icons-material/Print";
import {
  fetchReportRoutes,
  fetchReportStudents,
  setStudentResponse,
} from "@/store/modules/reports/reportsActions";
import apiReports from "@/services/reports-api";

const shiftList = [
  { value: "Manhã", label: "Manhã" },
  { value: "Tarde", label: "Tarde" },
  { value: "Noite", label: "Noite" },
  { value: "Manhã/Tarde", label: "Manhã/Tarde" },
  { value: "Tarde/Noite", label: "Tarde/Noite" },
];

type DataProps = {
  value: string;
  label: string;
};

export default function StudentsTab() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<any>>([]);
  const [name, setName] = useState<string | any>("");
  const [school, setSchool] = useState<string | any>("");
  const [route, setRoute] = useState<string | any>("");
  const [shift, setShift] = useState<string | any>("");
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const reportState = useSelector(ReportState);
  const dispatch = useAppDispatch();
  const studentsReports = (reportState && reportState.studentsReport) || [];
  const routeState = useSelector(RouteState);
  const routes = (routeState && routeState.allRoutes) || null;

  useEffect(() => {
    dispatch(setStudentResponse([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllRoutes());

    if (routes && routes.length > 0) {
      setRoutersList(
        routes.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (studentsReports && studentsReports.length > 0) {
      setRows(studentsReports);
    }
  }, [studentsReports]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setRoute(event.target.value);
  };

  const handleChangeShift = (event: SelectChangeEvent) => {
    setShift(event.target.value);
  };

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const generateReportStudent = () => {
    setIsLoading(true);

    const finalDescription = name ? `${name}` : "";
    const finalSchool = school ? `${school}` : "";
    const finalRoute = route ? `${route}` : "";
    const finalshift = shift ? `${shift}` : "";

    dispatch(
      fetchReportStudents(finalDescription, finalSchool, finalRoute, finalshift)
    ).then(() => setIsLoading(false));
  };

  const handleRoutesReports = async () => {
    setIsLoading(true);
    handleCloseDialog();

    const finalDescription = name ? `${name}` : "";
    const finalSchool = school ? `${school}` : "";
    const finalRoute = route ? `${route}` : "";
    const finalshift = shift ? `${shift}` : "";

    apiReports
      .get(
        `/api/v1/relatorios-alunos?name=${finalDescription}&escola=${finalSchool}&rota=${finalRoute}&turno=${finalshift}`,
        { responseType: "blob" }
      )
      .then((response) => {
        setIsLoading(false);
        window.open(URL.createObjectURL(response.data));
      });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            id="description-report"
            label="Nome"
            variant="outlined"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            <InputLabel id={"route"}>Rota</InputLabel>
            <Select
              required
              id="route"
              name="route"
              value={route}
              variant="outlined"
              label="Rota"
              labelId={"route"}
              onChange={handleChangeSelect}
              disabled={isLoading}
            >
              {routersList.map(({ value, label }: DataProps) => (
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
            onClick={() => generateReportStudent()}
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
            onClick={() => handleOpenDialog()}
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
            studentsReports &&
            studentsReports.length > 0 &&
            !isLoading && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Nome</StyledTableCell>
                      <StyledTableCell>Serie</StyledTableCell>
                      <StyledTableCell>Ensino</StyledTableCell>
                      <StyledTableCell>Turno</StyledTableCell>
                      <StyledTableCell>Rota</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.nome}
                        </StyledTableCell>
                        <StyledTableCell>{row.serie}</StyledTableCell>
                        <StyledTableCell>{row.ensino}</StyledTableCell>
                        <StyledTableCell>{row.turno}</StyledTableCell>
                        <StyledTableCell>{row.route}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          )}
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={openDialog}
        handleClose={handleCloseDialog}
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
