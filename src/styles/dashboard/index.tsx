import DataTable from "@/components/DataTable";
import { Box, Typography, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  mx: "auto",
  padding: theme.spacing(3),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

export const StyledDataTable = styled(DataTable)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
