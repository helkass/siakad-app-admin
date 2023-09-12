import React from "react";
import { ToastContainer } from "react-toastify";

function UploadLayout({ children, title }) {
   return (
      <div className="flex py-12 flex-col w-10/12 space-y-3">
         <h2 className="text-2xl font-bold capitalize">{title}</h2>
         <ToastContainer />
         {children}
      </div>
   );
}

export default UploadLayout;
