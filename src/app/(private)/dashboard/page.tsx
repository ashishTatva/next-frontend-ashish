"use client";

import { API_ROUTES } from "@/constants/api-routes";
import { ERROR_MESSAGE } from "@/constants/common";
import { Rental } from "@/interfaces/Rental";
import {
  CenteredLoaderContainer,
  StyledCircularProgress,
} from "@/styles/common";
import {
  StyledBox,
  StyledDataTable,
  StyledTypography,
} from "@/styles/dashboard";
import {
  GridCallbackDetails,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseService from "../../../../utils/baseService";
import { getColumns } from "./columns";

export default function Dashboard() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rowCount, setRowCount] = useState<number>(0);
  const [bookListData, setBookListData] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "rentedAt", sort: "desc" },
  ]);

  useEffect(() => {
    (async () => await fetchData(page, pageSize, sortModel))();
  }, [page, pageSize]);

  const fetchData = async (page: number, pageSize: number, sortModel: {}[]) => {
    try {
      setIsLoading(true);
      const response = await baseService.post(API_ROUTES.RENTAL, {
        page,
        pageSize,
        sortModel,
      });
      setBookListData(response.data?.data);
      setRowCount(response.data.totalRecords);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaginationModelChange = async (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => {
    const { page, pageSize } = model;
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSubmitBook = async (id: number) => {
    try {
      const response = await baseService.post(API_ROUTES.RENT_A_BOOK, {
        bookId: id,
        isSubmit: true,
      });
      if (response?.status === 201) {
        toast.success("Book submitted successfully!");
        const newBooks = bookListData.filter((el) => {
          if (el.book.id !== id) {
            return el;
          }
        });
        setBookListData(newBooks);
        setRowCount(newBooks.length);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || ERROR_MESSAGE);
    }
  };

  if (isLoading) {
    return (
      <CenteredLoaderContainer>
        <StyledCircularProgress size={48} />
      </CenteredLoaderContainer>
    );
  }
  return (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        Dashboard
      </StyledTypography>
      <StyledDataTable
        rowCount={rowCount}
        pageSize={pageSize}
        currentPage={page}
        rowsData={bookListData}
        columnsData={getColumns(handleSubmitBook)}
        handlePaginationModelChange={handlePaginationModelChange}
      />
    </StyledBox>
  );
}
