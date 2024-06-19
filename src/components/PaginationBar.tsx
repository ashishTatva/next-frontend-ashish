import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    fontWeight: "400",
    borderRadius: "5px",
    border: "1px solid #666362",
    color: "#666362", // Text color
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#9c27b0 !important",
    color: "#fff",
  },
  marginTop: "20px !important",
});

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent={"center"}
      padding="10px 0px"
    >
      <StyledPagination
        count={Math.ceil(totalPages)}
        page={currentPage}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
