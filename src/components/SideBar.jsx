import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../constants/app";
import { useEffect } from "react";
import { FiPower } from "react-icons/fi";

const SideBar = () => {
   const location = useLocation().pathname.split("/");
   const navigate = useNavigate();

   const handleLogOut = () => {
      localStorage.removeItem("api_key_siakad");
      localStorage.removeItem("admin_key_siakad");
      navigate("/login");
   };

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [location]);

   return (
      <div className="flex flex-col gap-7 w-2/12 py-14 border-r min-h-screen">
         <h1 className="text-2xl font-bold text-center pb-6 border-b">
            <span className="text-emerald-500 text-2xl">Siakad</span> Admin
         </h1>
         {sidebarLinks.map((item, index) => (
            <Link
               to={item.link}
               key={index}
               className={`flex justify-between w-11/12 mx-auto px-3 py-2 rounded hover:bg-emerald-50 hover:text-emerald-400 text-slate-400 items-center ${
                  location.includes(item.title.toLowerCase()) &&
                  "bg-emerald-50 !text-emerald-400"
               }`}>
               <item.Icon size={25} />
               <span>{item.title}</span>
            </Link>
         ))}
         <button
            onClick={handleLogOut}
            className="flex justify-between w-11/12 mx-auto px-3 py-2 rounded bg-red-100 hover:bg-red-200 hover:text-red-600 text-red-500 items-center">
            <FiPower size={20} />
            <span>Keluar</span>
         </button>
      </div>
   );
};

export default SideBar;
