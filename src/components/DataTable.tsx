import { PAGE_SIZE_OPTIONS } from "@/constants/common";
import { Box, TablePaginationProps, Typography, styled } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridOverlay,
  GridPagination,
  GridPaginationModel,
  GridRowsProp,
  GridSortModel,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },
}));

interface IDataTableProps {
  rowCount: number;
  pageSize: number;
  className?: string;
  currentPage: number;
  rowsData: GridRowsProp;
  columnsData: GridColDef[];
  handlePaginationModelChange?: (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => void;
  handleSortModelChange?: (
    model: GridSortModel,
    details: GridCallbackDetails<any>
  ) => void;
}

export default function DataTable({
  columnsData,
  rowsData,
  rowCount,
  pageSize,
  currentPage,
  handleSortModelChange,
  handlePaginationModelChange,
}: IDataTableProps) {
  return (
    <StyledDataGrid
      autoHeight
      disableColumnMenu={true}
      pagination
      rows={rowsData}
      rowCount={rowCount}
      columns={columnsData}
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      checkboxSelection={false}
      sx={{ "--DataGrid-overlayHeight": "80px", paddingX: 2 }}
      slots={{
        pagination: CustomPagination,
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      onSortModelChange={handleSortModelChange}
      onPaginationModelChange={handlePaginationModelChange}
      paginationModel={{ page: currentPage, pageSize: pageSize }}
      rowHeight={100}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function Pagination({
  page,
  className,
  onPageChange,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      page={page + 1}
      count={pageCount}
      className={className}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <Typography>No record found</Typography>
    </GridOverlay>
  );
};
