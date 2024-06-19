"use client";

import PaginationBar from "@/components/PaginationBar";
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import { Book } from "@/interfaces/Book";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import baseService from "../../../../utils/baseService";

import { ERROR_MESSAGE } from "@/constants/common";
import {
  CenteredLoaderContainer,
  StyledCircularProgress,
} from "@/styles/common";
import {
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
  StyledContainer,
  TitleTypography,
} from "@/styles/books";

const BookListingPage = () => {
  const router = useRouter();
  const [bookList, setBookList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRenting, setIsRenting] = useState<string | number | null>(null);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await baseService.post(API_ROUTES.BOOKS, {
        page: currentPage,
        pageSize: itemsPerPage,
      });
      setBookList(response.data?.data);
      setTotalBooks(response.data.totalRecords);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRentBook = async (id: number | string) => {
    setIsRenting(id);
    try {
      const response = await baseService.post(API_ROUTES.RENT_A_BOOK, {
        bookId: id,
      });
      if (response?.status === 201) {
        router.push(ROUTES.DASHBOARD);
        toast.success("Book rented successfully!");
        setIsRenting(null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || ERROR_MESSAGE);
      setIsRenting(null);
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
    <StyledContainer maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Books Listing
      </Typography>
      {bookList.length ? (
        <>
          <Grid container spacing={4} justifyContent="center">
            {bookList.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <StyledCard>
                  <StyledCardMedia
                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/books/${book.id}/${book.coverImage}`}
                    title={book.title}
                  />
                  <StyledCardContent>
                    <TitleTypography gutterBottom variant="h6">
                      {book.title}
                    </TitleTypography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      by {book.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Genre: {book.genre.join(", ")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Published: {book.publicationYear}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      ISBN no: {book.ISBNNo}
                    </Typography>
                  </StyledCardContent>
                  <Divider />
                  {book.quantity > 0 ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={isRenting === book.id}
                      onClick={() => handleRentBook(book.id)}
                    >
                      {isRenting === book.id ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Rent this book"
                      )}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled
                    >
                      Out of stock
                    </Button>
                  )}
                </StyledCard>
              </Grid>
            ))}
          </Grid>
          <PaginationBar
            currentPage={currentPage}
            totalPages={Math.ceil(totalBooks / itemsPerPage)}
            onPageChange={(value) => setCurrentPage(value)}
          />
        </>
      ) : (
        <Box textAlign="center" mt={10}>
          <Typography variant="h5" color="#414141">
            No Books Found
          </Typography>
        </Box>
      )}
    </StyledContainer>
  );
};

export default BookListingPage;
