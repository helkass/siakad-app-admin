import React, { useEffect, useState } from "react";
import {
   Button,
   InputDefault,
   ModalCategory,
   UploadLayout,
} from "../../components";
import { useFetch } from "../../helpers";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/toastConfig";
import { useParams } from "react-router-dom";

const UploadRincianPembayaran = () => {
   const { id } = useParams();
   const [dataMany, setDataMany] = useState([]);
   const [selectOption, setSelectOption] = useState("tambah satu rincian");
   const { postData, fetchIsError, fetchIsLoading } = useFetch();
   const [changeValue, setChangeValue] = useState({ pembayaran: id });

   // get data jurusan
   const jurusan = useFetch();

   function handleAddOnList() {
      const isExist = dataMany.filter(
         (d) => d.name === changeValue.name && d.jurusan === changeValue.jurusan
      );

      if (isExist.length > 0) {
         toast.warning("terjadi duplikasi data", toastConfig);
      } else {
         setDataMany((prevData) => [...prevData, changeValue]);
      }
   }

   // handle delete todo if selectOptions === tambah banyal mahasiswa
   function handleDeleteTodo(index) {
      setDataMany(dataMany.slice(0, index));
   }

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   async function handleSubmit(event) {
      event.preventDefault();

      if (selectOption === "tambah satu rincian") {
         await postData("/pembayaran/detail", changeValue, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "tambah banyak rincian") {
         await postData("/pembayaran/detail/many", dataMany, {
            "Content-Type": "application/json",
         });
      }

      if (!fetchIsError) {
         event.target.reset();
      }
   }

   useEffect(() => {
      jurusan.getDatas("/jurusan");
   }, []);
   return (
      <UploadLayout title={"Tambahkan Rincian Pembayaran"}>
         <div className="relative w-max">
            <ModalCategory
               title={selectOption}
               options={["tambah satu rincian", "tambah banyak rincian"]}
               setSelectOption={(e) => setSelectOption(e)}
            />
         </div>
         <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            {selectOption === "tambah satu rincian" && (
               <FormData
                  handleChangeValue={handleChangeValue}
                  jurusanOptions={jurusan?.data}
               />
            )}
            {selectOption === "tambah banyak rincian" && (
               <>
                  <FormData
                     handleChangeValue={handleChangeValue}
                     jurusanOptions={jurusan?.data}
                  />
                  <Button type="button" onClick={handleAddOnList}>
                     Tambah ke List antrian
                  </Button>
               </>
            )}
            <Button
               upload
               type="submit"
               isLoading={fetchIsLoading}
               disabled={
                  selectOption === "tambah banyak rincian" &&
                  dataMany.length === 0
               }>
               Tambah
            </Button>
         </form>
         {selectOption === "tambah banyak rincian" && (
            <>
               {dataMany.length > 0 && (
                  <button
                     className="w-max bg-red-100 text-red-600 px-6 py-1 mt-2 rounded text-sm font-semibold"
                     type="button"
                     onClick={() => setDataMany([])}>
                     Clear data
                  </button>
               )}
               <div className="flex flex-wrap gap-2 mt-6">
                  {dataMany.map((item, idx) => (
                     <Todo
                        name={item.name}
                        nominal={item.nominal}
                        jurusan={item.jurusan}
                        key={idx}
                        handleDelete={() => handleDeleteTodo(idx)}
                     />
                  ))}
               </div>
            </>
         )}
      </UploadLayout>
   );
};

const FormData = ({ handleChangeValue, jurusanOptions }) => {
   return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
         <InputDefault
            name="name"
            id="name"
            placeholder="nama uraian"
            onChange={handleChangeValue}
         />
         <InputDefault
            id="nominal"
            name="nominal"
            placeholder="exp: 3000000"
            onChange={handleChangeValue}
         />
         <select
            name="jurusan"
            defaultValue={"pilih jurusan"}
            className="text-sm focus:outline-emerald-400"
            onChange={handleChangeValue}
            id="jurusan">
            <option disabled value={"pilih jurusan"}>
               pilih jurusan
            </option>
            {jurusanOptions?.map((jurusan, idx) => (
               <option value={jurusan.name} key={idx}>
                  {jurusan.name}
               </option>
            ))}
         </select>
      </div>
   );
};

const Todo = ({ name, jurusan, nominal, handleDelete }) => {
   return (
      <div className="flex justify-between min-w-[200px] p-2 gap-4 items-center rounded shadow-md">
         <div className="flex flex-col gap-2 whitespace-nowrap text-xs">
            <p>name : {name}</p>
            <p>nominal : {nominal}</p>
            <p>jurusan : {jurusan}</p>
         </div>
         <button
            onClick={handleDelete}
            type="button"
            className="flex justify-center items-center bg-red-50 p-2 rounded hover:bg-red-200 text-red-600">
            <AiOutlineClose size={18} />
         </button>
      </div>
   );
};

export default UploadRincianPembayaran;
