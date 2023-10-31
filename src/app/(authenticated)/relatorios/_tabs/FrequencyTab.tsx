import { TableLoading } from "@/components/TableLoading";
import { useAppDispatch } from "@/hooks/useRedux";
import { ReportState } from "@/store/modules/reports/reportsReducers";
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
  Alert,
  Tooltip,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import CustomizedDialogs from "@/components/CustomDialog";
import { StyledTableCell, StyledTableRow } from "../style";
import PrintIcon from "@mui/icons-material/Print";
import {
  fetchReportFrequency,
  fetchReportStudents,
} from "@/store/modules/reports/reportsActions";
import apiReports from "@/services/reports-api";
import {
  DatePicker,
  DateTimePicker,
  DateValidationError,
} from "@mui/x-date-pickers";
import moment from "moment";

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

export default function FrequencyTab({
  startOfQ12022,
}: {
  startOfQ12022: any;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<any>>([]);
  const [filterDateInit, setFilterDateInit] = useState<any>(null);
  const [filterDateFinish, setFilterDateFinish] = useState<any>(null);
  const [minDateFinish, setMinDateFinish] = useState<any>(null);
  const [school, setSchool] = useState<string | any>("");
  const [route, setRoute] = useState<string | any>("");
  const [shift, setShift] = useState<string | any>("");
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const state = useSelector(ReportState);
  const dispatch = useAppDispatch();
  const frequencyReports = (state && state.frequencyReports) || [];
  const routeState = useSelector(RouteState);
  const routes = (routeState && routeState.allRoutes) || null;
  const [errorInit, setErrorInit] = useState<DateValidationError | null>(null);
  const [errorFinish, setErrorFinish] = useState<DateValidationError | null>(
    null
  );
  const now = moment(new Date(), "YYYY-M-D");

  useEffect(() => {
    if (filterDateInit) {
      setMinDateFinish(filterDateInit);
    }
  }, [filterDateInit]);

  const errorMessageInit = useMemo(() => {
    switch (errorInit) {
      case "maxDate":
      case "minDate": {
        return `Selecione uma data a partir de ${moment(startOfQ12022).format(
          "DD/MM/YYYY"
        )}`;
      }

      case "invalidDate": {
        return "Sua data não é válida";
      }

      default: {
        return "";
      }
    }
  }, [errorInit]);

  const errorMessageFinish = useMemo(() => {
    switch (errorFinish) {
      case "maxDate":
      case "minDate": {
        return `Selecione uma data a partir de ${moment(minDateFinish).format(
          "DD/MM/YYYY"
        )}`;
      }

      case "invalidDate": {
        return "Sua data não é válida";
      }

      default: {
        return "";
      }
    }
  }, [errorFinish]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setRoutersList(
        routes.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (frequencyReports && frequencyReports.length > 0) {
      setRows(frequencyReports);
    }
  }, [frequencyReports]);

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

  const generateReportFrequency = () => {
    setIsLoading(true);
    const finishInitialDate = filterDateInit
      ? moment(filterDateInit).format()
      : "";
    const finishFinalDate = filterDateFinish
      ? moment(filterDateFinish).format()
      : "";
    const finalRoute = route ? `${route}` : "";
    const finalshift = shift ? `${shift}` : "";

    dispatch(
      fetchReportFrequency(
        finishInitialDate,
        finishFinalDate,
        finalRoute,
        finalshift
      )
    ).then(() => setIsLoading(false));
  };

  const handleRoutesReports = async () => {
    setIsLoading(true);
    handleCloseDialog();

    const finishInitialDate = filterDateInit
      ? moment(filterDateInit).format()
      : "";
    const finishFinalDate = filterDateFinish
      ? moment(filterDateFinish).format()
      : "";
    const finalRoute = route ? `${route}` : "";
    const finalshift = shift ? `${shift}` : "";

    apiReports
      .get(
        `/api/v1/relatorios-frequencias?from_data_chamada=${finishInitialDate}&to_data_chamada=${finishFinalDate}&rota=${finalRoute}&turno=${finalshift}`,
        { responseType: "blob" }
      )
      .then((response) => {
        setIsLoading(false);
        window.open(URL.createObjectURL(response.data));
      });
  };

  const disableReport = () => {
    if (!filterDateInit && !school && !route && !shift) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <FormControl fullWidth>
            <DateTimePicker
              value={filterDateInit}
              onChange={(newValue) => setFilterDateInit(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  helperText: errorMessageInit,
                  placeholder: "Data Inicial",
                },
              }}
              maxDate={now}
              disabled={isLoading}
              format="DD/MM/YYYY hh:mm"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Tooltip
            placement="top"
            title="É necessário selecionar uma data inicial para então, escolher uma data final."
          >
            <FormControl fullWidth>
              <DateTimePicker
                disabled={!filterDateInit || isLoading}
                value={filterDateFinish}
                onChange={(value: any) => {
                  setFilterDateFinish(value);
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    helperText: errorMessageFinish,
                    placeholder: "Data Final",
                  },
                }}
                minDate={minDateFinish}
                maxDate={now}
                format="DD/MM/YYYY hh:mm"
              />
            </FormControl>
          </Tooltip>
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
            onClick={() => generateReportFrequency()}
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
          ) : frequencyReports && frequencyReports.length > 0 && !isLoading ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Data e horário da chamada</StyledTableCell>
                    <StyledTableCell>Turno</StyledTableCell>
                    <StyledTableCell>Finalizada</StyledTableCell>
                    <StyledTableCell>Rota</StyledTableCell>
                    <StyledTableCell>Sentido</StyledTableCell>
                    <StyledTableCell>Horário</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {moment(row.dataChamada).format("YYYY-MM-DD HH:mm")}
                      </StyledTableCell>
                      <StyledTableCell>{row.turno}</StyledTableCell>
                      <StyledTableCell>
                        {row.realizada === 1 ? "Sim" : "Não"}
                      </StyledTableCell>
                      <StyledTableCell>{row.route}</StyledTableCell>
                      <StyledTableCell>{row.sentido}</StyledTableCell>
                      <StyledTableCell>{row.horario}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid>
              <Alert severity="warning">
                Nenhum dado foi encontrado! Verifique os filtros utilizados para
                ver se estão de acordo com a sua busca.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={openDialog}
        handleClose={handleCloseDialog}
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
