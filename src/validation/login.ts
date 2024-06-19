import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: yup.string().required("Please enter password"),
});
