import { Box, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function TableSkeleton() {
  return (<Box border='1px' borderColor='gray.100' px={4} borderRadius={10}>
    <TableContainer mt={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th><Skeleton height='20px' w="120px" startColor='gray.200' endColor='gray.100' /></Th>
            <Th><Skeleton height='20px' w="140px" startColor='gray.200' endColor='gray.100' /></Th>
            <Th><Skeleton height='20px' w="100px" startColor='gray.200' endColor='gray.100' /></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
          <Tr >
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
            <Td><Skeleton height='20px' startColor='gray.200' endColor='gray.100' /></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </Box>)
}