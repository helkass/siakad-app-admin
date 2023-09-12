import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const DashboardLayout = () => {
   return (
      <div className="flex gap-3 mx-auto max-w-[1300px] overflow-y-hidden w-full">
         <SideBar />
         <Outlet />
      </div>
   );
};

export default DashboardLayout;
