import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PrimaryButton } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PrimaryInput } from "@/components/ui/PrimaryInput";
import { useSignupMutation } from "@/services/endpoints/authEndpoints";
import { LOGO_NAME, LOGO_CLASSNAME } from "@/utils/constant";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";

const signUpSchema = validationSchema.pick([
  "email",
  "name",
  "password",
  "password_confirmation",
]);

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [signup, { isLoading }] = useSignupMutation();

  const signUpInitialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const handleSignupSubmit = async (values: typeof signUpInitialValue) => {
    try {
      const response: any = await signup(values);
      if (response.data === null) {
        showToast({
          type: "success",
          message: "Account created successfully.!",
        });
        navigate("/login");
      }

      if (response?.error.status === 422) {
        showToast({
          type: "error",
          message: response.error.data.message,
        });
      }
    } catch (err) {
      console.error("Signup error", err);
    }
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: signUpInitialValue,
    validationSchema: signUpSchema,
    onSubmit: handleSignupSubmit,
  });

  const isButtonDisabled =
    !isValid || Object.keys(touched).length === 0 || isLoading;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="h-screen flex items-center justify-center custom-bg">
      <Card className="w-[350px] sm:w-[430px] px-10 pt-3 pb-10 rounded flex flex-col shadow-md bg-white">
        <CardHeader className="text-center">
          <p className={LOGO_CLASSNAME}>{LOGO_NAME}</p>
          <CardDescription className=" text-secondary-gray text-[13px] font-semibold">
            Sign up to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 py-0">
          <form className="space-y-2 mb-2" onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <PrimaryInput
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  error={errors.name}
                  touched={touched.name}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-[12px]">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <PrimaryInput
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("email", e.target.value.replace(/\s+/g, ""));
                  }}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email}
                  touched={touched.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-[12px]">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <PrimaryInput
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  onClick={togglePasswordVisibility}
                  error={errors.password}
                  touched={touched.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-[12px]">{errors.password}</p>
                )}
              </div>
              <div className="relative">
                <PrimaryInput
                  id="password_confirmation"
                  name="password_confirmation"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Confirm your password"
                  showPassword={showConfirmPassword}
                  onClick={toggleConfirmPasswordVisibility}
                  error={errors.password_confirmation}
                  touched={touched.password_confirmation}
                />

                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <p className="text-red-500 text-[12px]">
                      {errors.password_confirmation}
                    </p>
                  )}
              </div>
            </div>
            <PrimaryButton type="submit" disabled={isButtonDisabled}>
              {isLoading ? "Signing Up..." : "Sign up"}
            </PrimaryButton>
          </form>

          <p className="text-center text-[12px] pt-5 ml-3 ">
            Already have a Vision Board account?
            <Link to="/login">
              <span className="text-blue-600 hover:underline text-center">
                {""} Log in
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
