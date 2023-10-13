import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const ModalCategory = ({ title, options, setSelectOption }) => {
   const [isOpen, setOpen] = React.useState(false);
   return (
      <div className="relative">
         <button
            type="button"
            onClick={() => setOpen(!isOpen)}
            className="px-3 py-1 rounded bg-slate-200 shadow-md">
            {title}
         </button>
         <div
            className={`flex flex-col gap-1 top-0 -right-[135%] p-2 bg-white border border-emerald-200 text-sm rounded min-w-[100px] absolute ${
               isOpen ? "block" : "hidden"
            }`}>
            {options.map((opt, i) => (
               <span
                  onClick={() => {
                     setSelectOption(opt);
                     setOpen(false);
                  }}
                  key={i}
                  className="min-w-[80px] px-3 text-center py-1 hover:bg-emerald-50 cursor-pointer hover:text-emerald-400 text-slate-500">
                  {opt}
               </span>
            ))}
         </div>
      </div>
   );
};

export const ModalDefaultContainer = ({ children, isOpen, setOpen }) => {
   return (
      <div
         className={`fixed ${
            isOpen ? "block" : "hidden"
         } min-w-[300px] min-h-[500px] left-50 md:translate-x-[50%] rounded shadow backdrop-blur flex justify-center items-center bg-white/50 transition-all ease duration-300`}>
         <button onClick={setOpen} className="absolute right-2 top-2">
            <AiOutlineClose size={22} />
         </button>
         <div className="min-w-300px bg-white rounded p-3">{children}</div>
      </div>
   );
};
