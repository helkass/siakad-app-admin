import { AiFillDelete } from "react-icons/ai";
import Button from "../Button";
const CardPresensi = ({ kelas, kode, handleDelete, isLoading }) => {
   return (
      <div className="shadow bg-white rounded p-3 min-w-[120px] space-x-12 flex justify-bwtween">
         <div className="space-y-3 grid">
            <strong>kelas : {kelas}</strong>
            <strong>kode : {kode}</strong>
         </div>
         <Button
            className="h-max"
            isLoading={isLoading}
            type="button"
            error
            onClick={handleDelete}>
            <AiFillDelete size={20} />
         </Button>
      </div>
   );
};

export default CardPresensi;
