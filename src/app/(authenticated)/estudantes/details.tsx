import { Container, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

interface ProposDetails {
    fetchRotaName: (id: String) => React.ReactNode;
    selectedStudent: any;
};

const Details = ({ fetchRotaName, selectedStudent }: ProposDetails) => {
    return (
        <>
            <Flex flexDirection={"row"} h={"full"}>
                <Container>
                    <TableContainer mt={10}>
                        <Table variant='simple'>
                            <Tbody>
                                <Tr>
                                    <Td fontWeight={"bold"}>Nome</Td>
                                    <Td>{selectedStudent.name}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Série</Td>
                                    <Td>{selectedStudent.serie}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Ensino</Td>
                                    <Td>{selectedStudent.teaching}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Turno</Td>
                                    <Td>{selectedStudent.shift}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Nome da escola</Td>
                                    <Td>{selectedStudent.schoolName}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Horário de ida</Td>
                                    <Td>{selectedStudent.departureTime}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Horário de volta</Td>
                                    <Td>{selectedStudent.backTime}</Td>
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
                                    <Td>{selectedStudent.cep}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Endereço</Td>
                                    <Td>{selectedStudent.address}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Bairro</Td>
                                    <Td>{selectedStudent.neighborhood}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Número</Td>
                                    <Td>{selectedStudent.number}</Td>
                                </Tr>
                                {selectedStudent.complement && <><Tr>
                                    <Td fontWeight={"bold"}>Complemento</Td>
                                    <Td>{selectedStudent.complement}</Td>
                                </Tr>
                                </>
                                }
                                <Tr>
                                    <Td fontWeight={"bold"}>Cidade</Td>
                                    <Td>{selectedStudent.city}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Estado</Td>
                                    <Td>{selectedStudent.state}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"}>Rota</Td>
                                    <Td>{fetchRotaName(selectedStudent.rota_id)}</Td>
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