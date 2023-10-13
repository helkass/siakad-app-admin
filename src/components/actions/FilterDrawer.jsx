import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const FilterDrawer = ({ children }) => {
   const [isOpen, setOpen] = useState(false);
   return (
      <>
         <button
            onClick={() => setOpen(!isOpen)}
            className="flex gap-2 items-center bg-slate-300 px-3 py-1 rounded w-max">
            filter
            <FiFilter />
         </button>
         {isOpen && (
            <div className="absolute right-0 flex flex-col gap-7 px-5 py-3 bg-white/50 backdrop-blur-md z-10 max-w-[500px] min-h-[30vw] min-w-[230px] shadow-md rounded top-[20%]">
               {children}
            </div>
         )}
      </>
   );
};

export default FilterDrawer;
