import React from "react";
import { ToastContainer } from "react-toastify";
import { ButtonBackRoute } from "../Button";

function UploadLayout({ children, title }) {
   return (
      <div className="flex py-12 flex-col w-full space-y-3">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold capitalize">{title}</h2>
            <ButtonBackRoute />
         </div>
         <ToastContainer />
         {children}
      </div>
   );
}

export default UploadLayout;
