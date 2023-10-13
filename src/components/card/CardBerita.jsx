import React from "react";
import Button from "../Button";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const CardBerita = ({ title, handleDelete, href, image, isLoading }) => {
   return (
      <div className="flex flex-col gap-y-3 p-3 w-[320px] h-max rounded cursor-pointer shadow-md hover:shadow-lg cursor-default bg-white relative">
         <Link to={href} className="cursor-pointer">
            {image && (
               <img
                  src={image}
                  alt="article-banner"
                  className="object-contain max-h-[200px] cursor-pointer"
               />
            )}
            <p className="font-bold">{title}</p>
         </Link>
         <Button onClick={handleDelete} error isLoading={isLoading}>
            <AiFillDelete size={20} />
         </Button>
      </div>
   );
};

export default CardBerita;
