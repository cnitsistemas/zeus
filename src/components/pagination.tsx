import type { FC } from "react";
import usePagination from "@/hooks/usePagination";
import { Button, Flex, Text } from "@chakra-ui/react";

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
  className = "",
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

  const baseStyles =
    "px-2.5 py-2 flex justify-center items-center rounded-md text-[1rem] bg-white hover:bg-grey-300 text-purple-700 font-bold select-none cursor-pointer";

  return (
    <main id="pagination">
      <Flex w='100%' p={4} my={3} gap={2} py={10} flexDirection={"row"} justifyContent={"center"}>
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
              <Text key={index} className="select-none">
                ...
              </Text>
            );
          }
          return (
            <Button
              colorScheme={pageNumber === currentPage ? "primary" : ""}
              color={pageNumber === currentPage ? "white" : "black"}
              variant='solid'
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
      </Flex>
    </main>
  );
};

export default Pagination;
