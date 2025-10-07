import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { PrimaryButton } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PrimaryInput } from "@/components/ui/PrimaryInput";
import { useLoginMutation } from "@/services/endpoints/authEndpoints";
import { setUser } from "@/store/slices/authSlice";
import { LOGO_NAME, LOGO_CLASSNAME } from "@/utils/constant";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { validationSchema } from "@/validation";

const loginSchema = validationSchema.pick(["email", "loginPassword"]);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login({ email, password });
      if (data) {
        const { user, token } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (!user.email_verified_at) {
          navigate("/verify-email", { state: { user } });
          return;
        }

        dispatch(setUser({ user, token }));
        navigate("/dashboard");
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      loginPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await handleLogin(values.email, values.loginPassword);
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = formik;

  const isButtonDisabled = !isValid || isLoading;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px] sm:w-[430px] px-10 pt-3 pb-10 rounded flex flex-col shadow-md bg-white">
        <CardHeader className="text-center">
          <p className={LOGO_CLASSNAME}>{LOGO_NAME}</p>
          <CardDescription className="text-secondary-gray text-xs md:text-sm font-semibold">
            Log in to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 py-0">
          <form className="space-y-4 mb-4" onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <PrimaryInput
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email}
                  touched={touched.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <PrimaryInput
                  id="loginPassword"
                  name="loginPassword"
                  value={values.loginPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  onClick={togglePasswordVisibility}
                  error={errors.loginPassword}
                  touched={touched.loginPassword}
                />
                {errors.loginPassword && touched.loginPassword && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors.loginPassword}
                  </p>
                )}
              </div>
            </div>
            <PrimaryButton type="submit" disabled={isButtonDisabled}>
              {isLoading ? "Logging in..." : "Log in"}
            </PrimaryButton>

            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">
                {getErrorMessage(error)}
              </p>
            )}

            <div className="flex items-center justify-center space-x-2 text-[0.7rem] md:text-sm lg:text-sm pt-8">
              <Link
                to="/forget-password"
                className="text-primary-blue-light hover:underline">
                Can't log in?
              </Link>
              <span className="text-gray-700 pb-1">•</span>
              <Link
                to="/signup"
                className="text-primary-blue-light hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
