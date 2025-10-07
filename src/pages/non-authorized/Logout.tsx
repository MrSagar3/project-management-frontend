import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import { PrimaryButton } from "@/components";
import { useLogoutMutation } from "@/services/endpoints/authEndpoints";
import { clearUser } from "@/store/slices/authSlice";
import {
  clearSelectedOrganization,
  clearProjects,
} from "@/store/slices/organizationSlice";
import { TAppContextType, TLogoutProps } from "@/types";

const Logout = ({ setIsDialogOpen }: TLogoutProps) => {
  const { setLoading } = useOutletContext<TAppContextType>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      dispatch(clearUser());
      dispatch(clearSelectedOrganization());
      dispatch(clearProjects());

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/login");

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 flex justify-end gap-4 ">
      <PrimaryButton
        className="bg-secondary-gray text-white hover:bg-secondary-gray-light w-20"
        onClick={handleLogout}>
        Logout
      </PrimaryButton>
      <PrimaryButton
        className="text-secondary-gray bg-white hover:bg-background w-20"
        onClick={() => setIsDialogOpen(false)}>
        Cancel
      </PrimaryButton>
    </div>
  );
};

export default Logout;
