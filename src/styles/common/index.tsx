import { Box, CircularProgress, styled } from "@mui/material";

export const CenteredLoaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
}));

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
