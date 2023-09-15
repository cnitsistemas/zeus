"use client";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Details from "./details";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import { StudantState } from "@/store/modules/students/studentsReducers";
import { RouteState } from "@/store/modules/routes/routesReducers";
import {
  deleteStudents,
  fetchStudents,
} from "@/store/modules/students/studentsActions";
import { fetchAllRoutes } from "@/store/modules/routes/routesActions";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  Link,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomTootip from "@/components/CustomTootip";
import CustomizedDialogs from "@/components/CustomDialog";
import { TitlePage } from "./style";
import AddIcon from "@mui/icons-material/Add";

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Inicio
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Alunos
  </Typography>,
];

function StudentsPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<any>({});
  const [viewDialog, setViewDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentTotalResults, setCurrentTotalResults] = useState<number>(1);
  const studantState = useSelector(StudantState);
  const routeState = useSelector(RouteState);
  const dispatch = useAppDispatch();
  const students = studantState && studantState.students;
  const totalPages =
    (studantState &&
      studantState.pagination &&
      studantState.pagination.totalPages) ||
    1;
  const selectedPage =
    (studantState && studantState.pagination && studantState.pagination.page) ||
    1;
  const total =
    (studantState &&
      studantState.pagination &&
      studantState.pagination.total) ||
    1;
  const routes = (routeState && routeState.allRoutes) || null;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchStudents(page)).then(() => setIsLoading(false));
      dispatch(fetchAllRoutes());
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (students && students.length > 0) {
      setRows(students);
    }
  }, [students]);

  useEffect(() => {
    if (selectedPage) setCurrentPage(selectedPage);
    if (totalPages) setCurrentTotalPages(totalPages);
    if (total) setCurrentTotalResults(total);
  }, [page, totalPages, total, selectedPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchStudents(value)).then(() => {
      setIsLoading(false);
    });
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

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
    await dispatch(deleteStudents(selectedStudent?.id)).then((res) => {
      if (res.success) {
        toast({
          title: "Aluno removido",
          description: "Aluno removido com sucesso!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setSelectedStudent({});
        dispatch(fetchStudents(page)).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Erro",
          description: "Erro ao remover aluno!",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    });
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
                <TitlePage>
                  Alunos
                  <CustomTootip
                    placement="right"
                    content={`A tela de alunos é responsável pelo cadastro, edição, visualização e exclusão dos alunos transportados pelo CNIT, 
												sendo possível vinculá-los às mais variadas rotas cadastradas no sistema. `}
                  />
                </TitlePage>
                <Typography
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  Os alunos estão presente nas principais rotas de tráfego do
                  CNIT, sendo um dos principais pilares da aplicação.
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "end",
                }}
                onClick={() => {
                  router.push("estudantes/novo");
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    color: "#fff",
                    height: 40,
                    fontSize: "12px",
                  }}
                  startIcon={<AddIcon />}
                >
                  Cadastar
                </Button>
              </Grid>
              {students && students.length > 0 ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <TableContainer sx={{ paddingX: "1rem" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Nome
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Rota
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Turno
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows &&
                            rows.length > 0 &&
                            rows.map((row) => (
                              <TableRow
                                key={row.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="td" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {fetchRotaName(row.rota_id)}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.shift}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  sx={{ minWidth: "170px" }}
                                >
                                  <Tooltip
                                    title="Visualizar Aluno"
                                    placement="top"
                                  >
                                    <IconButton
                                      color="secondary"
                                      aria-label="view student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedStudent(row);
                                        handleOpenViewDialog();
                                      }}
                                    >
                                      <FaEye />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title="Editar Alunos"
                                    placement="top"
                                  >
                                    <IconButton
                                      color="primary"
                                      aria-label="edit student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        router.push(`estudantes/${row.id}`);
                                      }}
                                    >
                                      <FaEdit />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    title="Deletar Alunos"
                                    placement="top"
                                  >
                                    <IconButton
                                      color="error"
                                      aria-label="delete student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        setSelectedStudent(row);
                                        handleOpenDeleteDialog();
                                      }}
                                    >
                                      <FaTrash />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="secondary"
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <Alert severity="info">
                      Não há alunos cadastrados nessa sessão! Adicione alunos
                      clicando no botão de cadastro
                    </Alert>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={viewDialog}
        handleClose={handleCloseViewDialog}
        title={`${selectedStudent.name}`}
        content={
          <Details
            fetchRotaName={fetchRotaName}
            selectedStudent={selectedStudent}
          />
        }
        confirmButton={false}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="fechar"
        handleConfirm={() => {}}
        confirmButtonError={false}
        fullWidth={true}
        maxWidth={"lg"}
        dividers={true}
        textAling="start"
      />
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar aluno`}
        content={`Tem certeza que deseja deletar aluno ${selectedStudent.name}?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="Não"
        handleConfirm={handleDeleteStudent}
        confirmButtonError={true}
        fullWidth={true}
        maxWidth={"xs"}
        dividers={true}
        textAling="start"
      />
    </>
  );
}

export default StudentsPage;
