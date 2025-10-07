import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { PrimaryButton, PrimaryInput } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForgetPasswordMutation } from "@/services/endpoints/authEndpoints";
import { LOGO_NAME, LOGO_CLASSNAME } from "@/utils/constant";
import { validationSchema } from "@/validation";

export default function ForgetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();

  const forgetInitialValue = {
    email: "",
  };

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting }: any,
  ) => {
    try {
      setErrorMessage(null);

      const response: any = await forgotPassword(values);
      if (response?.data?.status) {
        setIsSubmitted(true);
        return;
      }
      throw new Error(response?.data?.message || "Something went wrong.");
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: forgetInitialValue,
    validationSchema: Yup.object({
      email: validationSchema.fields.email,
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div className="h-screen flex items-center justify-center custom-bg">
      <Card className="w-[350px] sm:w-[430px] px-10 pt-3 pb-10 rounded flex flex-col shadow-md bg-white">
        <CardHeader className="text-center">
          <p className={LOGO_CLASSNAME}>{LOGO_NAME}</p>
          {!isSubmitted ? (
            <CardDescription className="text-secondary-gray text-[13px] font-semibold">
              Can't log in? Recover your account
            </CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="px-0 py-0">
          {!isSubmitted ? (
            <form onSubmit={formik.handleSubmit} className="space-y-2">
              <div className="space-y-4 mb-6">
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700">
                    Enter your email to receive a recovery link
                  </Label>

                  <PrimaryInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2"
                    aria-label="Email address for account recovery"
                    value={formik.values.email}
                    onChange={(e) => {
                      const trimmedValue = e.target.value.replace(/\s+/g, "");
                      formik.setFieldValue("email", trimmedValue);
                      formik.validateField("email");
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : undefined
                    }
                    touched={formik.touched.email}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className="text-sm text-red-600 mt-1">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>

              <PrimaryButton
                type="submit"
                disabled={
                  !!formik.errors.email || !formik.values.email || isLoading
                }>
                {isLoading ? "Sending Recovery Link..." : "Send Recovery Link"}
              </PrimaryButton>

              {errorMessage && (
                <div className="text-sm text-red-600 mt-2 text-center">
                  {errorMessage}
                </div>
              )}

              <p className="text-center mt-4 text-sm text-gray-600">
                <Link
                  to="/login"
                  className="text-primary-blue-light hover:underline">
                  Return to Log In
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">
                A recovery link has been sent to your email.
              </p>
              <Link
                to="/login"
                className="text-primary-blue-light text-sm hover:underline">
                Return to Log In
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
