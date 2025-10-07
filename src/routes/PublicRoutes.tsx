import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { RootState } from "@/store";

export const PublicRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
