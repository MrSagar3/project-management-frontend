import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, PrimaryInput } from "@/components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useResetPasswordMutation } from "@/services/endpoints/authEndpoints";
import { LOGO_NAME, LOGO_CLASSNAME } from "@/utils/constant";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";
const passwordOnlyValidationSchema = validationSchema.pick([
  "password",
  "password_confirmation",
]);

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();

  const resetInitialValue = {
    token: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (values: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const payload = {
        email: values.email,
        token: values.token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      const response = await resetPassword(payload);

      if (response?.data) {
        showToast({
          type: "success",
          message: "Password reset successfully!",
        });
        navigate("/login");
        return;
      }
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  const formik = useFormik({
    initialValues: resetInitialValue,
    validationSchema: passwordOnlyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const urlEmail = urlParams.get("email");

    if (urlToken && urlEmail) {
      formik.setFieldValue("token", urlToken);
      formik.setFieldValue("email", urlEmail);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const isButtonDisabled =
    !formik.isValid ||
    formik.values.password !== formik.values.password_confirmation ||
    isLoading;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
      <Card className="w-[400px] shadow-lg border border-gray-200 rounded-lg">
        <CardHeader>
          <p className={LOGO_CLASSNAME}>{LOGO_NAME}</p>
          <p className="text-center text-gray-600">Choose a new password</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="hidden"
              name="token"
              value={formik.values.token}
              readOnly
            />
            <input
              type="hidden"
              name="email"
              value={formik.values.email}
              readOnly
            />

            <div className="mb-6">
              <PrimaryInput
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder="Enter new password"
                error={formik.errors.password}
                touched={formik.touched.password}
                onClick={togglePasswordVisibility}
                showPassword={showPassword}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="mb-6">
              <PrimaryInput
                id="password_confirmation"
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder="Confirm your password"
                error={formik.errors.password_confirmation}
                touched={formik.touched.password_confirmation}
                onClick={toggleConfirmPasswordVisibility}
                showPassword={showConfirmPassword}
              />
              {formik.touched.password_confirmation &&
                formik.errors.password_confirmation && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.password_confirmation}
                  </p>
                )}
            </div>

            <PrimaryButton
              className="w-full"
              type="submit"
              disabled={isButtonDisabled}>
              {isLoading ? "Submitting..." : "Continue"}
            </PrimaryButton>

            {isError && (
              <p className="text-sm text-red-500 mt-2">
                {getErrorMessage(error)}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
