import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const FilterDrawer = ({ children }) => {
   const [isOpen, setOpen] = useState(false);
   return (
      <>
         <button
            onClick={() => setOpen(!isOpen)}
            className="flex gap-2 items-center bg-slate-100 px-3 py-1 rounded text-slate-500">
            filter
            <FiFilter />
         </button>
         {isOpen && (
            <div className="absolute right-0 flex flex-col gap-7 px-5 py-3 bg-white z-10 min-h-[30vw] min-w-[230px] shadow-md rounded top-[20%]">
               {children}
            </div>
         )}
      </>
   );
};

export default FilterDrawer;
