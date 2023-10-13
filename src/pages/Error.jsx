import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
   return (
      <section className="max-w-[1220px] flex justify-center items-center min-h-screen">
         <div className="p-[3rem] rounded text-center space-y-4 bg-red-50">
            <h2 className="text-3xl text-red-700">Page not found</h2>
            <Link to="/login">Back to Login</Link>
         </div>
      </section>
   );
};

export default Error;
