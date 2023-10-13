import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const DashboardLayout = () => {
   return (
      <div className="flex mx-auto max-w-[1300px] overflow-y-hidden w-full">
         <SideBar />
         <div className="px-2 w-full bg-gr min-h-screen">
            <Outlet />
         </div>
      </div>
   );
};

export default DashboardLayout;
