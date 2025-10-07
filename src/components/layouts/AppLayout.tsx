import { Outlet, useOutletContext } from "react-router-dom";

import Sidebar from "./Sidebar";

import { TAppContextType } from "@/types";

const AppLayout = () => {
  const { loading, setLoading } = useOutletContext<TAppContextType>();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pr-[29px] pl-[31px] p-4 overflow-auto bg-[#F9FAFB]">
        <Outlet context={{ loading, setLoading }} />
      </div>
    </div>
  );
};

export default AppLayout;
