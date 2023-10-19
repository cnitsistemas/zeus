import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Skeleton } from "@mui/material";

const header = [1, 2, 3, 4, 5, 6];
const lines = [1, 2, 3, 4, 5];

export const TableLoading = () => (
  <Box>
    <TableContainer>
      <Table sx={{ minWidth: 650, fontSize: "16px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header &&
              header.length > 0 &&
              header.map((row, index) => {
                return (
                  <TableCell key={index}>
                    <Skeleton variant="rounded" width={180} height={20} />
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {lines &&
            lines.length > 0 &&
            lines.map((row: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={180} height={20} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
