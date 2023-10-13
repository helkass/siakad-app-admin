import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../constants/app";
import { useEffect, useState } from "react";
import { FiPower } from "react-icons/fi";
import Button from "./Button";
import { FaBars } from "react-icons/fa6";

const SideBar = () => {
   const location = useLocation().pathname.split("/");
   const navigate = useNavigate();
   const [isOpen, setOpen] = useState(false);

   const handleLogOut = () => {
      localStorage.removeItem("api_key_siakad");
      localStorage.removeItem("admin_key_siakad");
      navigate("/login");
   };

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [location]);

   return (
      <>
         <Button
            onClick={() => setOpen(!isOpen)}
            className="h-max fixed top-2 right-2 z-10 sm:hidden">
            <FaBars size={20} />
         </Button>
         <div
            className={`flex flex-col transition-all z-50 ease-out duration-300 gap-7 w-[300px] py-14 border-r min-h-screen bg-white/70 backdrop-blur absolute sm:relative ${
               isOpen
                  ? "translate-x-100 top-10"
                  : "-translate-x-[250%] sm:translate-x-0"
            }`}>
            <h1 className="text-2xl font-bold text-center pb-6 border-b">
               <span className="text-emerald-500 text-2xl">Siakad</span> Admin
            </h1>
            {sidebarLinks.map((item, index) => (
               <Link
                  to={item.link}
                  onClick={() => setOpen(false)}
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
      </>
   );
};

export default SideBar;
