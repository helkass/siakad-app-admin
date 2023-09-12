import React from "react";
import Button from "../Button";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const CardBerita = ({ title, description, handleDelete, href, isLoading }) => {
   return (
      <div className="flex flex-col gap-y-3 p-3 max-w-[320px] h-max rounded shadow-md hover:shadow-lg cursor-default bg-white relative">
         <p className="font-bold">{title}</p>
         <div
            className="line-clamp-3 text-sm"
            dangerouslySetInnerHTML={{ __html: description }}></div>
         <Link to={href} className="self-end text-sm text-slate-400 underline">
            detail...
         </Link>
         <Button onClick={handleDelete} error isLoading={isLoading}>
            <AiFillDelete size={20} />
         </Button>
      </div>
   );
};

export default CardBerita;
