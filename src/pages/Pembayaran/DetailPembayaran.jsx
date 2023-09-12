import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { InputDefault } from "../../components/actions/Input";
import { useFetch } from "../../helpers";
import Loader from "../../components/Loader";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";

const DetailPembayaran = () => {
   const { id } = useParams();
   const [changeValue, setChangeValue] = useState({});
   const { updateData, getDatas, data, fetchIsLoading, deleteData } =
      useFetch();
   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handleUpdate = async (event) => {
      event.preventDefault();

      await updateData(`/pembayaran/${id}`, changeValue);
   };

   const handleDelete = async () => {
      await deleteData(`pembayaran/${id}`, "/pembayaran");
   };

   useEffect(() => {
      getDatas(`/pembayaran?id=${id}`);
   }, []);

   return (
      <section className="my-12 w-9/12">
         <ToastContainer />
         {fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            data !== null && (
               <div className="flex flex-col gap-y-7">
                  <h2 className="text-2xl text-yellow-500 font-semibold">
                     Update pembayaran
                  </h2>
                  <form
                     onSubmit={handleUpdate}
                     className="grid sm:grid-cols-2 gap-3">
                     <InputDefault
                        name="name"
                        id="name"
                        showLabel={true}
                        defaultValue={data.name}
                        onChange={handleChangeValue}
                     />
                     <InputDefault
                        id="kode bank"
                        name="bank"
                        showLabel={true}
                        defaultValue={data.bank}
                        onChange={handleChangeValue}
                     />
                     <InputDefault
                        id="jumlah"
                        name="jumlah"
                        type="text"
                        showLabel={true}
                        defaultValue={data.jumlah}
                        onChange={handleChangeValue}
                     />
                     <InputDefault
                        onChange={handleChangeValue}
                        defaultValue={data.tahun}
                        name="tahun"
                        id="tahun"
                        showLabel={true}
                     />
                     <InputDefault
                        onChange={handleChangeValue}
                        defaultValue={data.semester}
                        name="semester"
                        id="semester"
                        showLabel={true}
                     />
                     <Button
                        type="submit"
                        update={true}
                        isLoading={fetchIsLoading}>
                        <AiFillEdit size={20} />
                        Update
                     </Button>
                  </form>
                  <Button
                     onClick={handleDelete}
                     type="button"
                     className="w-max self-end mt-8"
                     error>
                     <AiFillDelete size={20} />
                     Hapus Pembayaran
                  </Button>
               </div>
            )
         )}
      </section>
   );
};

export default DetailPembayaran;
