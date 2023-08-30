"use client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { InfoIcon } from "lucide-react";
import Pagination from "@/components/pagination";
import Dialog from "@/components/dialog";
import { FaPlus } from "react-icons/fa";
import Details from "./details";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from "@/components/breadcrumb";
import TableSkeleton from "@/components/table-skeleton";
import ModalComponent from "@/components/modal";
import { useAppDispatch } from "@/hooks/useRedux";
import { StudantState } from "@/store/modules/students/studentsReducers";
import { RouteState } from "@/store/modules/routes/routesReducers";
import { deleteStudents, fetchStudents } from "@/store/modules/students/studentsActions";
import { fetchRoutes } from "@/store/modules/routes/routesActions";

const breadcrumbItens: Array<any> = [
  { name: "Inicio", link: "/" },
  { name: "Alunos", link: null }
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
  const students = (studantState && studantState.students) || [];
  const totalPages = (studantState && studantState.pagination && studantState.pagination.totalPages) || 1;
  const selectedPage = (studantState && studantState.pagination && studantState.pagination.page) || 1;
  const total = (studantState && studantState.pagination && studantState.pagination.total) || 1;
  const routes = (routeState && routeState.routes) || null;

  useEffect(() => {
    setPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (page) {
      dispatch(fetchStudents(page)).then(() => setIsLoading(false));
      dispatch(fetchRoutes());
    }
  }, [page, dispatch])

  useEffect(() => {
    if (students && students.length > 0) {
      setRows(students);
    }
  }, [students]);

  useEffect(() => {
    if (selectedPage) setCurrentPage(selectedPage);
    if (totalPages) setCurrentTotalPages(totalPages);
    if (total) setCurrentTotalResults(total);

  }, [page, totalPages, total]);

  const handlePageChange = (page: number): void => {
    setIsLoading(true);
    setCurrentPage(page);
    dispatch(fetchStudents(page)).then(() => { setIsLoading(false) });
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
    const studentRoute = routes && routes.find((item: any) => {
      return item.id === id;
    })
    return studentRoute && studentRoute.name;
  };

  const handleDeleteStudent = async () => {
    setIsLoading(true);
    handleCloseDeleteDialog();
    await dispatch(deleteStudents(selectedStudent?.id)).then((res) => {
      if (res.success) {
        toast({
          title: 'Aluno removido',
          description: "Aluno removido com sucesso!",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        setSelectedStudent({});
        dispatch(fetchStudents(page)).then(() => { setIsLoading(false) });
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
            <Heading size='lg' color="primary.400" mr={2}>Alunos</Heading>
            <Tooltip hasArrow label='A tela de alunos é responsável pelo cadastro, edição, visualização e exclusão dos alunos transportados pelo CNIT, 
				sendo possível vinculá-los às mais variadas rotas cadastradas no sistema.' bg='gray.100' color='black'>
              <InfoIcon size={15} />
            </Tooltip>
          </Flex>
          <Text color="gray.600" my={4} mx={2}>Os alunos estão presente nas principais rotas de tráfego do CNIT, sendo um dos principais pilares da aplicação.</Text>
        </Flex>
        <Button
          w="48"
          onClick={() => router.push("/estudantes/new")}
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
        students && students.length > 0 ? <>
          <Box border='1px' borderColor='gray.100' px={4} borderRadius={10}>
            <TableContainer mt={10}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Rota</Th>
                    <Th>Turno</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rows && rows.length > 0 && rows.map((row) => {
                    return <>
                      <Tr key={row.id}>
                        <Td>{row.name}</Td>
                        <Td>{fetchRotaName(row.rota_id)}</Td>
                        <Td>{row.shift}</Td>
                        <Td display="flex" flexDirection="row" justifyContent="center">
                          <Tooltip hasArrow label='Visualizar aluno' bg='gray.200' color='black'>
                            <IconButton
                              size="lg"
                              variant="ghost"
                              aria-label="visualizar aluno"
                              icon={<FaEye />}
                              onClick={() => {
                                setSelectedStudent(row);
                                handleOpenViewDialog();
                              }}
                            />
                          </Tooltip>
                          <Tooltip hasArrow label='Editar aluno' bg='gray.200' color='black'>
                            <IconButton
                              size="lg"
                              variant="ghost"
                              aria-label="editar aluno"
                              icon={<FaEdit />}
                              onClick={() => { router.push(`/estudantes/${row.id}`) }}
                            />
                          </Tooltip>
                          <Tooltip hasArrow label='Deletar aluno' bg='gray.200' color='black'>
                            <IconButton
                              size="lg"
                              variant="ghost"
                              colorScheme="red"
                              aria-label="deletar aluno"
                              icon={<FaTrash />}
                              onClick={() => {
                                setSelectedStudent(row);
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
          Não há alunos cadastrados nessa sessão! Adicione alunos clicando no botão de cadastro!
        </Alert>
      }

      {students && students.length > 0 && <Pagination
        onPageChange={handlePageChange}
        totalCount={currentTotalResults}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={currentTotalPages}
        className="mb-10"
      />}

      {selectedStudent && <ModalComponent
        title={`${selectedStudent.name}`}
        content={
          <Details
            fetchRotaName={fetchRotaName}
            selectedStudent={selectedStudent}
          />}
        confirmButton={false}
        cancelButton={true}
        confirmButtonText="Sim"
        cancelButtonText="Fechar"
        handleConfirm={() => { }}
        confirmButtonError={false}
        openDialog={viewDialog}
        setCloseDialog={handleCloseViewDialog}
        size="6xl"
      />}

      <Dialog
        title="Deletar aluno?"
        content={`Tem certeza que deseja deletar ${selectedStudent.name}?`}
        cancelButton={true}
        cancelButtonText="Não"
        confirmButton={true}
        confirmButtonError={true}
        confirmButtonText="Sim"
        handleConfirm={handleDeleteStudent}
        openDialog={deleteDialog}
        setCloseDialog={handleCloseDeleteDialog}
        size="xl"
      />
    </Container>
  );
};

export default StudentsPage;
