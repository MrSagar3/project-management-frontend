import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Loader } from "@/components/ui/Loader";
import { RootState } from "@/store";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 opacity-50 z-[9999]">
          <Loader />
        </div>
      )}

      <Outlet context={{ loading, setLoading }} />
    </>
  );
};

export default ProtectedRoute;
