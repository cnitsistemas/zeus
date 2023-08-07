"use client";
import { fetchStudents } from "@/redux/students/studentsActions";
import {
  Alert,
  AlertIcon,
  Box,
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
  Tr
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { InfoIcon } from "lucide-react";
import Pagination from "@/components/pagination";

interface Props {
  fetchStudents: (page: any) => Promise<any>;
  students: Array<any>;
  totalPages: number;
  selectedPage: number;
  total: number;
};

function StudentsPage({
  fetchStudents,
  students,
  selectedPage,
  totalPages,
  total
}: Props) {
  const [rows, setRows] = useState<Array<any>>([]);
  const [page, setPage] = useState<unknown | String>(null);
  const [deleteDialog, setDeleteDialog] = useState<Boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Object>({});
  const [viewDialog, setViewDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTotalPages, setCurrentTotalPages] = useState<number>(1);
  const [currentTotalResults, setCurrentTotalResults] = useState<number>(1);

  useEffect(() => {
    fetchStudents(1);
  }, [])

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
    setCurrentPage(page);
    fetchStudents(page).then(() => { });
  };

  return (
    <Container maxW='container.2xl' px={20}>
      <Flex
        fontSize={8}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Heading size='lg' color="primary.400" mr={2}>Alunos</Heading>
        <Tooltip hasArrow label='A tela de alunos é responsável pelo cadastro, edição, visualização e exclusão dos alunos transportados pelo CNIT, 
				sendo possível vinculá-los às mais variadas rotas cadastradas no sistema.' bg='gray.200' color='black'>
          <InfoIcon size={15} />
        </Tooltip>
      </Flex>
      <Text color="gray.600" my={4}>Os alunos estão presente nas principais rotas de tráfego do CNIT, sendo um dos principais pilares da aplicação.</Text>
      {students && students.length > 0 ? <>
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
                      <Td>{row.rota_id}</Td>
                      <Td>{row.shift}</Td>
                      <Td>
                        <IconButton
                          size="lg"
                          variant="ghost"
                          aria-label="open menu"
                          icon={<FaEye />}
                          onClick={() => { }}
                        />
                        <IconButton
                          size="lg"
                          variant="ghost"
                          aria-label="open menu"
                          icon={<FaEdit />}
                          onClick={() => { }}
                        />
                        <IconButton
                          size="lg"
                          variant="ghost"
                          aria-label="open menu"
                          icon={<FaTrash />}
                          onClick={() => { }}
                        />
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
      </Alert>}

      {students && students.length > 0 && <Pagination
        onPageChange={handlePageChange}
        totalCount={currentTotalResults}
        siblingCount={1}
        currentPage={currentPage}
        pageSize={currentTotalPages}
        className="mb-10"
      />}
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return {
    accessToken: (state.singin.auth && state.singin.auth.accessToken) || null,
    students: (state.students && state.students.students) || [],
    totalPages: (state.students && state.students.pagination && state.students.pagination.totalPages) || 1,
    selectedPage: (state.students && state.students.pagination && state.students.pagination.page) || 1,
    total: (state.students && state.students.pagination && state.students.pagination.total) || 1,
  };
};
export default connect(mapStateToProps, {
  fetchStudents
})(StudentsPage);
