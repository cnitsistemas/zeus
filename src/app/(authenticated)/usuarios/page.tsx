"use client";
import {
  Alert, AlertIcon, Box, Button, Container, Flex, Heading, IconButton,
  Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast, Badge
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash, FaLock } from "react-icons/fa";
import { InfoIcon } from "lucide-react";
import Pagination from "@/components/pagination";
import Dialog from "@/components/dialog";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/breadcrumb";
import TableSkeleton from "@/components/table-skeleton";
import { useAppDispatch } from "@/hooks/useRedux";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { UserState } from "@/store/modules/users/usersReducers";
import { applyRoleToUser, deleteUsers, fetchUsers } from "@/store/modules/users/usersActions";
import moment from "moment";
import AssignmentRoles from "./roles";
import ModalComponent from "@/components/modal";
import { fetchAllRoles } from "@/store/modules/roles/rolesActions";
import { RoleState } from "@/store/modules/roles/rolesReducers";

const breadcrumbItens: Array<any> = [
  { name: "Inicio", link: "/" },
  { name: "Usuários", link: null }
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentTotalResults, setCurrentTotalResults] = useState<number>(1);
  const [selectRoles, setSelectRoles] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  const userState = useSelector(UserState);
  const roleState = useSelector(RoleState);
  const dispatch = useAppDispatch();
  const users = (userState && userState.users) || [];
  const totalPages = (userState && userState.pagination && userState.pagination.totalPages) || 1;
  const selectedPage = (userState && userState.pagination && userState.pagination.page) || 1;
  const total = (userState && userState.pagination && userState.pagination.total) || 1;
  const allRoles = (roleState && roleState.allRoles) || null;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchUsers(page))
        .then(() => setIsLoading(false));
    }
    dispatch(fetchAllRoles())
  }, [page, dispatch])

  useEffect(() => {
    if (allRoles && allRoles.length > 0) {
      setRolesList(allRoles.map((route: any) => { return { value: route.id, label: route.name } }));
    }
  }, [allRoles]);

  useEffect(() => {
    if (users && users.length > 0) {
      setRows(users);
    }
  }, [users]);

  useEffect(() => {
    if (selectedPage) setCurrentPage(selectedPage);
    if (totalPages) setCurrentTotalPages(totalPages);
    if (total) setCurrentTotalResults(total);

  }, [page, totalPages, total]);

  const handlePageChange = (page: number): void => {
    setIsLoading(true);
    setCurrentPage(page);
    dispatch(fetchUsers(page)).then(() => { setIsLoading(false) });
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
          title: 'Aluno removido',
          description: "Aluno removido com sucesso!",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        setSelectedUser({});
        dispatch(fetchUsers(page)).then(() => { setIsLoading(false) });
      } else {
        setIsLoading(false);
        toast({
          title: 'Erro',
          description: "Erro ao remover aluno!",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }
    })
  };

  const handleApplyRoleToUser = () => {
    handleCloseViewDialog();
    const newRoles = selectRoles.map((role: any) => { return role.label })
    dispatch(applyRoleToUser({ id: selectedUser?.id, data: { roles: newRoles } })).then((response) => {
      if (response.success) {

        toast({
          title: 'Sucesso',
          description: "Papéis atribuidos ao usuário com sucesso!",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        setSelectedUser({});
        fetchUsers(page);
        dispatch(fetchUsers(page))
          .then(() => setIsLoading(false));
      } else {
        toast({
          title: 'Erro',
          description: "Erro ao atribuir papeis ao usuário!",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }
    })
  };

  const handleSelectRoles = (roles: any): void => {
    setSelectRoles(roles);
  };


  return (
    <Container maxW='container.2xl' px={{ xl: 20, sm: 0 }}>
      <BreadcrumbComponent breadcrumbItens={breadcrumbItens} />
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex flexDirection={"column"}>
          <Flex
            fontSize={8}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Heading size='lg' color="primary.400" mr={2}>Usuários</Heading>
            <Tooltip hasArrow label='Esta área é responsável por cadastrar, visualizar, 
									editar e deletar usuários. Além disso, é possível atribuir ou remover papéis/perfis para 
                  gerenciar as permissões de acesso desses usuários no sistema.' bg='gray.100' color='black'>
              <InfoIcon size={15} />
            </Tooltip>
          </Flex>
          <Text color="gray.600" my={4} mx={2}>Os usuários são responsáveis por gerenciar e realizar ações dentro do sistema.</Text>
        </Flex>
        <Button
          w="48"
          onClick={() => router.push("/usuarios/new")}
          leftIcon={<FaPlus />}
          bg="primary.400"
          color={"white"}
          _hover={{
            bg: "primary.500",
          }}>
          Cadastrar
        </Button>
      </Flex>

      {isLoading ? <TableSkeleton /> :
        users && users.length > 0 ? <>
          <Box border='1px' borderColor='gray.100' px={4} borderRadius={10}>
            <TableContainer mt={10}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Papeis</Th>
                    <Th>Data de Criação</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rows && rows.length > 0 &&
                    rows.map((row, index) => {
                      return <>
                        <Tr key={index}>
                          <Td>{row.name}</Td>
                          <Td>{row.email}</Td>
                          <Td>
                            {row.roles && row.roles.length > 0 ? row.roles.map((role: any, index: any) => (
                              <Badge background="orange.500" color="white" key={index} marginRight={2}>{role.name}</Badge>
                            )) : <></>}
                          </Td>
                          <Td>{moment(row.create).format('DD-MM-YYYY HH:mm')}</Td>
                          <Td display="flex" flexDirection="row" justifyContent="center">
                            <Tooltip hasArrow label='Editar Papeis' bg='gray.200' color='black'>
                              <IconButton
                                size="lg"
                                variant="ghost"
                                aria-label="editar papeis"
                                color="green.500"
                                icon={<FaLock />}
                                onClick={() => {
                                  setSelectedUser(row);
                                  setSelectRoles(row.roles.map((role: any) => {
                                    return {
                                      value: role.id,
                                      label: role.name
                                    }
                                  }))
                                  handleOpenViewDialog();
                                }}
                              />
                            </Tooltip>
                            <Tooltip hasArrow label='Editar usuario' bg='gray.200' color='black'>
                              <IconButton
                                size="lg"
                                variant="ghost"
                                aria-label="editar usuario"
                                icon={<FaEdit />}
                                onClick={() => { router.push(`/usuarios/${row.id}`) }}
                              />
                            </Tooltip>
                            <Tooltip hasArrow label='Deletar usuario' bg='gray.200' color='black'>
                              <IconButton
                                size="lg"
                                variant="ghost"
                                colorScheme="red"
                                aria-label="deletar usuario"
                                icon={<FaTrash />}
                                onClick={() => {
                                  setSelectedUser(row);
                                  handleOpenDeleteDialog();
                                }}
                              />
                            </Tooltip>
                          </Td>
                        </Tr>
                      </>
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </> : <Alert status='info'>
          <AlertIcon />
          Não há usuários cadastrados nessa sessão! Adicione usuários clicando no botão de cadastro
        </Alert>
      }

      {users && users.length > 0 && <Pagination
        onPageChange={handlePageChange}
        totalCount={currentTotalResults}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={currentTotalPages}
        className="mb-10"
      />}

      {selectedUser && allRoles && <ModalComponent
        title={`Editar papeis do usuário`}
        content={
          <AssignmentRoles
            allRoles={rolesList}
            selectRoles={selectRoles}
            setSelectRoles={handleSelectRoles}
          />}
        confirmButton={true}
        cancelButton={true}
        confirmButtonText="Salvar papéis do usuário"
        cancelButtonText="Fechar"
        handleConfirm={handleApplyRoleToUser}
        confirmButtonError={false}
        openDialog={viewDialog}
        setCloseDialog={handleCloseViewDialog}
        size="4xl"
      />}

      <Dialog
        title="Deletar Usuário?"
        content={`Tem certeza que deseja deletar ${selectedUser.name}?`}
        cancelButton={true}
        cancelButtonText="Não"
        confirmButton={true}
        confirmButtonError={true}
        confirmButtonText="Sim"
        handleConfirm={handleDeleteUser}
        openDialog={deleteDialog}
        setCloseDialog={handleCloseDeleteDialog}
        size="xl"
      />
    </Container>
  );
};

export default UsersPage;
