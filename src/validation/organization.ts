import * as Yup from "yup";

export const validationSchemaOrg = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]+$/, "Name cannot contain special characters.")
    .max(255, "Name must be at most 255 characters.")
    .required("Name is required."),
});
