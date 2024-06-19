"use client";

import { API_ROUTES } from "@/constants/api-routes";
import { ERROR_MESSAGE, TOKEN_KEY, USER } from "@/constants/common";
import { ROUTES } from "@/constants/routes";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import baseService, {
  CustomAxiosRequestConfig,
} from "../../../utils/baseService";
import { setValueInCookie } from "../../../utils/cookie";
import { validationSchema } from "@/validation/login";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await baseService.post(API_ROUTES.LOGIN, values, {
        withAuthToken: false,
      } as CustomAxiosRequestConfig);

      setValueInCookie(
        USER,
        `${response.data?.customer.firstName} ${response.data?.customer.lastName}`
      );
      setValueInCookie(TOKEN_KEY, response.data?.accessToken);
      setIsLoading(false);
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || ERROR_MESSAGE);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
      </Box>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="email"
          name="username"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
}
