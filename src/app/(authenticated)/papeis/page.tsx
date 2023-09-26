"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { UserState } from "@/store/modules/users/usersReducers";
import moment from "moment";
import { deleteRoles, fetchRoles } from "@/store/modules/roles/rolesActions";
import { RoleState } from "@/store/modules/roles/rolesReducers";
import {
  Alert,
  Button,
  Chip,
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
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { TitlePage } from "./style";
import CustomTootip from "@/components/CustomTootip";
import AddIcon from "@mui/icons-material/Add";
import { useToast } from "@chakra-ui/react";
import CustomizedDialogs from "@/components/CustomDialog";

const breadcrumbItens = [
  <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
    Inicio
  </Link>,
  <Typography key="2" color="#ff7a2d" sx={{ fontSize: 14 }}>
    Papéis
  </Typography>,
];
function UsersPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any>({});
  const userState = useSelector(UserState);
  const roleState = useSelector(RoleState);
  const dispatch = useAppDispatch();
  const roles = roleState && roleState.roles;
  const totalPages =
    (userState && userState.pagination && userState.pagination.totalPages) || 1;
  const selectedPage =
    (userState && userState.pagination && userState.pagination.page) || 1;
  const allRoles = (roleState && roleState.allRoles) || null;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchRoles(page)).then(() => setIsLoading(false));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      setRows(roles);
    }
  }, [roles]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchRoles(value)).then(() => {
      setIsLoading(false);
    });
  };

  const handleOpenDeleteDialog = (): void => {
    setDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setDeleteDialog(false);
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    await dispatch(deleteRoles(selectedRole?.id)).then((res) => {
      if (res.success) {
        toast({
          title: "Papel removido",
          description: "Papel removido com sucesso!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setSelectedRole({});
        dispatch(fetchRoles(page)).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Erro",
          description: "Erro ao remover papel!",
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
                <TitlePage component={"h1"}>
                  Papéis
                  <CustomTootip
                    placement="right"
                    content={`Cada papel tem um grupo de permissões que delimita as possíveis ações do usuário dentro da aplicação.
                    Sendo assim é possível atribuir mais de um perfil ao mesmo usuário. Nessa tela é possível visualizar, cadastrar, editar e deletar os papéis disponíveis no sistema.`}
                  />
                </TitlePage>
                <Typography
                  component={"h1"}
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  Os papéis funcionam como perfis que podem ser atribuídos aos
                  usuários.
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
                  router.push("papeis/novo");
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
              {roles && roles.length > 0 ? (
                <>
                  <Grid item xs={12} md={12} lg={12}>
                    <TableContainer sx={{ paddingX: "1rem" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Nome
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Canal
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Data da Criação
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
                                  {row.id}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  <Chip
                                    label={row.guard_name}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.created_at
                                    ? moment(row.created_at).format(
                                        "DD-MM-YYYY HH:mm"
                                      )
                                    : "***"}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  sx={{ minWidth: "170px" }}
                                >
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
                                        router.push(`usuarios/${row.id}`);
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
                                        setSelectedRole(row);
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
                      Não há usuários cadastrados nessa sessão! Adicione
                      usuários clicando no botão de cadastro.
                    </Alert>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar papel`}
        content={`Tem certeza que deseja deletar o papel ${selectedRole.name}?`}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="Não"
        handleConfirm={handleDeleteUser}
        confirmButtonError={true}
        fullWidth={true}
        maxWidth={"xs"}
        dividers={true}
        textAling="start"
      />
    </>
  );
}

export default UsersPage;
