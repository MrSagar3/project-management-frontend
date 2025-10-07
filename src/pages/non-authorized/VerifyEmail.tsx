import { useState } from "react";
import { useLocation } from "react-router-dom";

import { PrimaryButton } from "@/components";
import { Header } from "@/components/layouts/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PrimaryDialog } from "@/components/ui/PrimaryDialog";
import { Logout } from "@/pages";
import { useResendEmailMutation } from "@/services/endpoints/authEndpoints";

const VerifyEmail = () => {
  const [resendEmail, { isLoading }] = useResendEmailMutation();
  const [message, setMessage] = useState("");

  const location = useLocation();
  const user = location.state?.user;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const handleResend = async () => {
    try {
      const response = await resendEmail();

      if (response?.data) {
        setMessage("Verification email sent.");
      }
    } catch (e) {
      console.error("Error details:", e);
      setMessage("Failed to resend verification email.");
    }
  };

  return (
    <div className="bg-background h-screen">
      <Header title={`Welcome, ${user?.name}!!`} description="" />
      <main className="flex flex-col pt-20 items-center justify-center px-4 md:px-8 lg:px-12">
        <div className="flex flex-grow justify-center items-center w-full">
          <Card className="w-full max-w-lg p-4 md:p-6 lg:p-8 rounded-lg shadow-lg bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-xl md:text-2xl font-semibold text-primary-blue mb-2">
                Verify Your Email
              </CardTitle>
              <p className="text-xs md:text-sm text-gray-600 text-center mb-4">
                Please check the email below for the verification link.
              </p>
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-gray-100 text-secondary-gray font-medium text-xs md:text-sm py-2 px-4 rounded-md text-center">
                  {user?.email || "No email provided"}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {message && (
                <p className="text-xs md:text-sm text-center text-secondary-gray mb-4">
                  {message}
                </p>
              )}
              <div className="flex justify-center mb-4">
                <PrimaryButton
                  onClick={handleResend}
                  disabled={isLoading}
                  className="w-full">
                  {isLoading ? "Resending..." : "Resend Verification Email"}
                </PrimaryButton>
              </div>
              <p
                className="text-center text-xs md:text-sm hover:underline text-primary-blue-light cursor-pointer"
                onClick={handleLogoutClick}>
                Log out
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <PrimaryDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        content={
          <Logout
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        }
        header="Logout"
        description="Are you sure you want to log out?"
        contentClassName="h-auto"
      />
    </div>
  );
};

export default VerifyEmail;
