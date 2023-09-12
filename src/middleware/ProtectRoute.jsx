import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
   const isToken = localStorage.getItem("api_key_siakad");
   const isAdminToken = localStorage.getItem("admin_key_siakad");

   if (isToken === null || isAdminToken === null) {
      return <Navigate to={"/login"} replace />;
   }
   return children;
};

export default ProtectRoute;
