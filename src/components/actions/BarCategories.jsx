export function BarCategories({
   navCategory,
   setActiveContent,
   activeContent,
}) {
   return (
      <div className="flex gap-4 border-b">
         {navCategory.map((item) => (
            <button
               onClick={() => setActiveContent(item)}
               key={item}
               className={`${
                  activeContent == item
                     ? "border-emerald-300 text-emerald-500"
                     : "border-transparent"
               } border-b-2 px-4 py-2 min-w-[80px] capitalize font-semibold`}>
               {item}
            </button>
         ))}
      </div>
   );
}
