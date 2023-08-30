import { Container, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

interface PropsDetails {
  fetchRotaName: (id: String) => React.ReactNode;
  selectedStudent: any;
};

const Details = ({ fetchRotaName, selectedStudent }: PropsDetails) => {
  return (
    <>
      <Flex flexDirection={"row"} h={"full"} w={"full"} key={selectedStudent.id}>
        <Container>
          <TableContainer mt={10}>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Td fontWeight={"bold"}>Nome</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.name}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Série</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.serie}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Ensino</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.teaching}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Turno</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.shift}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Nome da escola</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.schoolName}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Horário de ida</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.departureTime}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Horário de volta</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.backTime}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
        <Container>
          <TableContainer mt={10}>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Td fontWeight={"bold"}>CEP</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.cep}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Endereço</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.address}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Bairro</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.neighborhood}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Número</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.number}</Td>
                </Tr>
                {selectedStudent.complement && <><Tr>
                  <Td fontWeight={"bold"}>Complemento</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.complement}</Td>
                </Tr>
                </>
                }
                <Tr>
                  <Td fontWeight={"bold"}>Cidade</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.city}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Estado</Td>
                  <Td whiteSpace="pre-wrap">{selectedStudent.state}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Rota</Td>
                  <Td whiteSpace="pre-wrap">{fetchRotaName(selectedStudent.rota_id)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </Flex>

    </>
  )
}

export default Details;