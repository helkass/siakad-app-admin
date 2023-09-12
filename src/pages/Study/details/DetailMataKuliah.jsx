import { useParams } from "react-router-dom";
import { useFetch } from "../../../helpers";
import { useEffect, useState } from "react";
import UploadLayout from "../../../components/Layout/UploadLayout";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { InputDefault } from "../../../components/actions/Input";

const DetailMataKuliah = () => {
   const { id } = useParams();
   const { getDatas, data, fetchIsLoading, updateData, deleteData } =
      useFetch();
   const [changeValue, setChangeValue] = useState({});

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handleUpdate = async (e) => {
      e.preventDefault();

      await updateData(`/matkul/${id}`, changeValue);
   };

   const handleDelete = async () => {
      await deleteData(`/matkul/${id}`, "/study");
   };

   useEffect(() => {
      getDatas("/matkul/" + id);
   }, []);
   return (
      <UploadLayout>
         {fetchIsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : data !== null ? (
            <div className="flex flex-col gap-y-6">
               <h2 className="font-bold text-2xl capitalize">
                  Detail Mata Kuliah{" "}
                  <span className="text-emerald-600 text-2xl underline">
                     {data.name}
                  </span>
               </h2>
               <form
                  onSubmit={handleUpdate}
                  className="grid sm:grid-cols-2 gap-3">
                  <InputDefault
                     name="name"
                     id="nama"
                     showLabel
                     defaultValue={data.name}
                     onChange={handleChangeValue}
                  />
                  <InputDefault
                     id="kode"
                     name="kode"
                     showLabel
                     defaultValue={data.kode}
                     onChange={handleChangeValue}
                  />
                  <InputDefault
                     id="SKS"
                     name="sks"
                     type="text"
                     showLabel
                     defaultValue={data.sks}
                     onChange={handleChangeValue}
                  />
                  <Button type="submit" update isLoading={fetchIsLoading}>
                     <AiFillEdit size={20} />
                     Update
                  </Button>
               </form>
               <Button
                  onClick={handleDelete}
                  type="button"
                  error
                  className="self-end mt-12"
                  isLoading={fetchIsLoading}>
                  <AiFillDelete size={20} />
                  Hapus Mata Kuliah
               </Button>
            </div>
         ) : (
            <p>errror</p>
         )}
      </UploadLayout>
   );
};

export default DetailMataKuliah;
