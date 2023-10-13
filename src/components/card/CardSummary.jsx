import React from "react";

/**
 *
 * @param {Icon} ReactIcon component, size 25
 * @param {subTitle} string card, light and small title
 * @param {title} string title, constant bold title
 * @param {iconStyle} string className
 * @returns
 */

export default function CardSummary({ Icon, subTitle, title, iconStyle }) {
   return (
      <div className="shadow-md flex justify-between items-start rounded p-3 min-w-[180px] md:w-[230px] bg-white">
         <div className="grid gap-4">
            <strong className="text-xl">{title}</strong>
            <span className="text-slate-600 text-sm">{subTitle}</span>
         </div>
         <span className={`p-2 text-white ${iconStyle}`}>
            <Icon size={20} />
         </span>
      </div>
   );
}
