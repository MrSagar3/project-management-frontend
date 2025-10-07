import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters long.")
    .required("Name is required."),
  email: Yup.string()
    .trim()
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in a valid format and should not contain special characters like '!', '#'.",
    )
    .test(
      "no-consecutive-dots.",
      "Email cannot have consecutive dots.",
      (value) => !value || !/\.\./.test(value),
    )
    .test(
      "no-invalid-characters.",
      "Email cannot contain invalid characters like '&' or '$'.",
      (value) => !value || /^[^&$]*$/.test(value),
    )
    .email("Please enter a valid email address.")
    .max(320, "Email must be less than or equal to 320 characters.")
    .required("Email is required."),

  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character (e.g., !@#$%).",
    )
    .test(
      "no-spaces.",
      "Password cannot contain space.",
      (value) => !(value && /\s/.test(value)),
    ),

  password_confirmation: Yup.string()
    .required("Password confirmation is required.")
    .oneOf([Yup.ref("password")], "Passwords must match."),

  address: Yup.string().min(4).max(255).required("Address is required."),

  phone: Yup.string()
    .matches(/^\+\d{1,4}-\d{10}$/, "Local number must be exactly 10  digits. ")
    .required("Phone is required."),
  logo: Yup.mixed().required("Logo is required."),

  status: Yup.number().required("Status is required."),
  loginPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long."),

  title: Yup.string()
    .matches(/^[a-zA-Z0-9 ]+$/, "Title cannot contain special characters.")
    .required("Project title is required."),

  slug: Yup.string().required("Project slug is required."),

  description: Yup.string().required("Project description is required."),

  color: Yup.string()
    .matches(
      /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
      "Enter a valid hex color code (e.g. #FF5733)",
    )
    .required("Project color is required."),

  deadline: Yup.string().required("Project deadline is required."),

  role: Yup.string().required("Role is required"),
});

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required."),
  status: Yup.string().required("Status is required."),
  assignedTo: Yup.string().required("Assigned to is required."),
});

export const taskValidationSchemaWithProject = taskValidationSchema.concat(
  Yup.object({
    projectId: Yup.string().required("Project is required."),
  }),
);
