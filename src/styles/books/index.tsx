import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  styled,
} from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  textAlign: "center",
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
  width: 170,
  margin: "auto",
  marginTop: theme.spacing(2),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const TitleTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
