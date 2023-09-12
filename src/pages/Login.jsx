import React, { useState } from "react";
import image_login from "../assets/login.png";
import Button from "../components/Button";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { apiClient } from "../api/apiClient";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../constants/toastConfig";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleLogin = (e) => {
      e.preventDefault();

      apiClient
         .post(
            "/super/login",
            { username, password },
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         )
         .then((res) => {
            if (res.status === 200) {
               const { token, admin_token, id } = res.data.data;

               localStorage.setItem("api_key_siakad", JSON.stringify(token));
               localStorage.setItem(
                  "admin_key_siakad",
                  JSON.stringify(admin_token)
               );

               navigate("/beranda");
            }
         })
         .catch((err) => toast.error(err.response.data.error, toastConfig));
   };
   return (
      <section className="container mx-auto py-12 h-screen">
         <ToastContainer />
         <h1 className="text-emerald-600 text-2xl font-bold">Siakad Admin</h1>
         <div className="flex gap-3 mt-12">
            <div className="w-full md:w-1/2 flex items-center justify-center">
               <img
                  src={image_login}
                  alt="login images"
                  className="object-contain max-h-[400px]"
               />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12 justify-center items-center">
               <h4 className="text-xl text-emerald-500 font-semibold">
                  Sign in to admin dashboard
               </h4>
               <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-7 w-full md:w-7/12">
                  <label
                     htmlFor="username"
                     className="w-full flex gap-3 items-center border-b border-slate-400">
                     <FaUserAlt size={20} className="text-slate-400" />
                     <input
                        name="username"
                        id="username"
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full h-[40px] focus:outline-none placeholder:text-sm"
                     />
                  </label>
                  <label
                     htmlFor="password"
                     className="border-b border-slate-400 flex gap-3 items-center">
                     <RiLockPasswordFill size={20} className="text-slate-400" />
                     <input
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="password"
                        required
                        className="w-full h-[40px] focus:outline-none placeholder:text-sm"
                     />
                  </label>
                  <Button type="submit">
                     <span>Log in</span>
                  </Button>
               </form>
            </div>
         </div>
      </section>
   );
};

export default Login;
