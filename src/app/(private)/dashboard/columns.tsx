import { Rental } from "@/interfaces/Rental";
import { Avatar, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../../../utils/helperFunctions";

export function getColumns(
  handleSubmitClick: (id: number) => void
): GridColDef<Rental>[] {
  return [
    {
      field: "coverImage",
      headerName: "Cover",
      display: "flex",
      align: "left",
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { book } }) => {
        return (
          <Avatar
            alt="Avatar"
            variant="rounded"
            sx={{ width: 56, height: 56 }}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/books/${book.id}/${book.coverImage}`}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { book } }) => book.title,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { book } }) => book.author,
    },
    {
      field: "ISBNNo",
      headerName: "ISBN No",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { book } }) => book.ISBNNo,
    },
    {
      field: "rentedAt",
      headerName: "Rented At",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: ({ row: { rentedAt } }) => formatDate(rentedAt),
    },
    {
      field: "action",
      headerName: "Action",
      type: "string",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) =>
        row.submittedAt ? (
          "SUBMITTED"
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmitClick(row.book.id)}
          >
            Submit
          </Button>
        ),
    },
  ];
}
