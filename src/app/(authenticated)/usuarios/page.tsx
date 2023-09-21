"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { UserState } from "@/store/modules/users/usersReducers";
import {
  applyRoleToUser,
  deleteUsers,
  fetchUsers,
} from "@/store/modules/users/usersActions";
import moment from "moment";
import AssignmentRoles from "./roles";
import { fetchAllRoles } from "@/store/modules/roles/rolesActions";
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
    Usuários
  </Typography>,
];
function UsersPage() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [viewDialog, setViewDialog] = useState(false);
  const [selectRoles, setSelectRoles] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  const userState = useSelector(UserState);
  const roleState = useSelector(RoleState);
  const dispatch = useAppDispatch();
  const users = userState && userState.users;
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
      dispatch(fetchUsers(page)).then(() => setIsLoading(false));
    }
    dispatch(fetchAllRoles());
  }, [page, dispatch]);

  useEffect(() => {
    if (allRoles && allRoles.length > 0) {
      setRolesList(
        allRoles.map((route: any) => {
          return { value: route.id, label: route.name };
        })
      );
    }
  }, [allRoles]);

  useEffect(() => {
    if (users && users.length > 0) {
      setRows(users);
    }
  }, [users]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(fetchUsers(value)).then(() => {
      setIsLoading(false);
    });
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

  const handleDeleteUser = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    await dispatch(deleteUsers(selectedUser?.id)).then((res) => {
      if (res.success) {
        toast({
          title: "Aluno removido",
          description: "Aluno removido com sucesso!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setSelectedUser({});
        dispatch(fetchUsers(page)).then(() => {
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

  const handleApplyRoleToUser = (role: any) => {
    handleCloseViewDialog();
    dispatch(
      applyRoleToUser({ id: selectedUser?.id, data: { roles: role?.roles } })
    ).then((response: any) => {
      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Papéis atribuidos ao usuário com sucesso!",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        setSelectedUser({});
        fetchUsers(page);
        dispatch(fetchUsers(page)).then(() => setIsLoading(false));
      } else {
        toast({
          title: "Erro",
          description: "Erro ao atribuir papeis ao usuário!",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    });
  };

  const handleSelectRoles = (roles: any): void => {
    setSelectRoles(roles);
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
                  Usuários
                  <CustomTootip
                    placement="right"
                    content={`Esta área é responsável por cadastrar, visualizar, 
                    editar e deletar usuários. Além disso, é possível atribuir ou remover papéis/perfis para gerenciar as permissões de acesso desses usuários no sistema. `}
                  />
                </TitlePage>
                <Typography
                  component={"h1"}
                  sx={{ fontSize: "14px", color: "#666666" }}
                  gutterBottom
                >
                  Os usuários são responsáveis por gerenciar e realizar ações
                  dentro do sistema.
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
                  router.push("usuarios/novo");
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
              {users && users.length > 0 ? (
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
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Papeis
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
                                  {row.name}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.email}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {row.roles && row.roles.length > 0 ? (
                                    row.roles.map((role: any) => (
                                      <Chip
                                        key={role.id}
                                        label={role.name}
                                        variant="filled"
                                        color="info"
                                        size="small"
                                        sx={{ mr: 1, color: "white" }}
                                      />
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                </TableCell>
                                <TableCell component="td" scope="row">
                                  {moment(row.create).format(
                                    "DD-MM-YYYY HH:mm"
                                  )}
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
                                      color="success"
                                      aria-label="view student"
                                      sx={{
                                        marginX: ".4rem",
                                        fontSize: "16px",
                                      }}
                                      onClick={() => {
                                        handleSelectRoles(row.roles);
                                        setSelectedUser(row);
                                        handleOpenViewDialog();
                                      }}
                                    >
                                      <FaLock />
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
                                        setSelectedUser(row);
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
        open={viewDialog}
        handleClose={handleCloseViewDialog}
        title={`${selectedUser.name}`}
        content={
          <AssignmentRoles
            allRoles={rolesList}
            selectRoles={selectRoles}
            handleClose={handleCloseViewDialog}
            handleApplyRoleToUser={handleApplyRoleToUser}
          />
        }
        confirmButton={false}
        cancelButton={false}
        confirmButtonText=""
        cancelButtonText=""
        handleConfirm={() => {}}
        confirmButtonError={false}
        fullWidth={true}
        maxWidth={"sm"}
        dividers={false}
        textAling="start"
      />
      <CustomizedDialogs
        open={deleteDialog}
        handleClose={handleCloseDeleteDialog}
        title={`Deletar usuário`}
        content={`Tem certeza que deseja deletar usuário ${selectedUser.name}?`}
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
