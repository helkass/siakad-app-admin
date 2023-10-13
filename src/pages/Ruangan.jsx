import { useEffect, useState } from "react";
import {
   Button,
   InputDefault,
   ModalDefaultContainer,
   TableLinkComponent,
   UploadLayout,
} from "../components";
import { useFetch } from "../helpers";
import { AiFillFileAdd } from "react-icons/ai";

const Ruangan = () => {
   const { getDatas, data, fetchIsLoading, postData, deleteData } = useFetch();
   const [isOpenModal, setOpenModal] = useState(false);
   const [name, setName] = useState("");
   const handleDelete = (id) => {
      deleteData(`/ruangan/${id}`);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await postData(
         `/ruangan`,
         { name },
         {
            "Content-Type": "application/json",
         },
         "/ruangan"
      );

      e.target.reset();
   };

   useEffect(() => {
      getDatas("/ruangan");
   }, []);
   return (
      <UploadLayout title={"Daftar Ruangan"}>
         <button
            onClick={() => setOpenModal(true)}
            className="rounded bg-emerald-50 w-max capitalize font-semibold flex gap-2 items-center text-emerald-600 px-3 py-2">
            <AiFillFileAdd size={20} />
            Tambah data
         </button>
         <ModalDefaultContainer
            isOpen={isOpenModal}
            setOpen={() => setOpenModal(false)}>
            <form onSubmit={handleSubmit} className="space-y-3">
               <InputDefault
                  name="name"
                  id="name"
                  placeholder="nama ruangan"
                  onChange={(e) => setName(e.target.value)}
               />
               <Button isLoading={fetchIsLoading} type="submit">
                  Tambah
               </Button>
            </form>
         </ModalDefaultContainer>
         <TableLinkComponent
            datas={data}
            isLoading={fetchIsLoading}
            headers={["nama"]}
            keyBody={["name"]}
            handleDelete={(id) => handleDelete(id)}
         />
      </UploadLayout>
   );
};

export default Ruangan;
