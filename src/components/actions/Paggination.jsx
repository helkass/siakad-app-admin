const Paggination = ({ handleNextPage, handlePrevPage, current, data }) => {
   return (
      <div className={`flex text-sm gap-1`}>
         <button
            disabled={current === 0}
            onClick={handlePrevPage}
            className="px-4 py-1 border border-emerald-100 rounded bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-50">
            Prev page
         </button>
         <button
            disabled={current > data || data < 15}
            onClick={handleNextPage}
            className="px-4 py-1 border border-emerald-100 rounded bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-50">
            Next page
         </button>
      </div>
   );
};

export default Paggination;
