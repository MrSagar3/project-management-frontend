import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]  px-10 pt-3 pb-10 rounded flex flex-col shadow-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-center text-3xl  font-black tracking-wide text-primary-blue">
            404 Error !!
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0 py-0 flex flex-col items-center space-y-6">
          <p className="text-gray-700 text-center text-sm ">
            Oops! The page you're looking for doesn't exist.
          </p>

          <Link to="/">
            <PrimaryButton>Go to Log in</PrimaryButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
