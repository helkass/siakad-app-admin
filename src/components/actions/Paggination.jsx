const Paggination = ({ handleNextPage, handlePrevPage, current, data }) => {
   return (
      <div className={`flex text-sm gap-2`}>
         <button
            disabled={current === 0}
            onClick={handlePrevPage}
            className={style}>
            Prev <span className="hidden sm:block">page</span>
         </button>
         <button
            disabled={current > data || data < 15}
            onClick={handleNextPage}
            className={style}>
            Next <span className="hidden sm:block">page</span>
         </button>
      </div>
   );
};

const style =
   "px-4 py-1 shadow-sm flex gap-1 rounded bg-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-50";

export default Paggination;
