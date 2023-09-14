import type { FC } from "react";
import usePagination from "@/hooks/usePagination";
import { Grid, Button, Typography } from "@mui/material";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <main id="pagination">
      <Grid sx={{ padding: 4, marginY: 3, gap: 2, paddingY: 10, display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Button id="previous-pagination"
          hidden={currentPage === 1} onClick={onPrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return (
              <Typography key={`pagination-${index}`} className="select-none">
                ...
              </Typography>
            );
          }
          return (
            <Button
              key={`pagination-${index}`}
              variant='contained'
              sx={{
                backgroundColor: pageNumber === currentPage ? "primary" : "",
                color: pageNumber === currentPage ? "white" : "black"
              }}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button id="next-pagination"
          hidden={currentPage === lastPage} onClick={onNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </Grid>
    </main>
  );
};

export default Pagination;
