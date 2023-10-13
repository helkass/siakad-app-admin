import { useState } from "react";
import {
   Button,
   InputDefault,
   InputFile,
   InputSelectSemester,
   InputSelectTahunAkademik,
   ModalCategory,
   UploadLayout,
} from "../../components";
import { useFetch } from "../../helpers";
import { AiOutlineClose } from "react-icons/ai";

export default function UploadPembayaran() {
   const { fetchIsLoading, postData, fetchIsError } = useFetch();
   const [selectOption, setSelectOption] = useState("add single pembayaran");
   const [changeValue, setChangeValue] = useState({});
   const [dataMany, setDataMany] = useState([]);
   const [file, setFile] = useState(null);

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   function handleAddOnList() {
      const isExist = dataMany.filter((d) => d.nim === changeValue.nim);

      if (isExist.length > 0) {
         toast.warning("terjadi duplikasi data", toastConfig);
      } else {
         setDataMany((prevData) => [...prevData, changeValue]);
      }
   }

   // handle delete todo if selectOptions === tambah banyal mahasiswa
   function handleDeleteTodo(nim) {
      setDataMany(dataMany.filter((d) => d.nim !== nim));
   }

   // handle post submit data
   async function handleSubmit(event) {
      event.preventDefault();

      if (selectOption === "add single pembayaran") {
         await postData("/pembayaran", changeValue, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "tambah banyak pembayaran") {
         await postData("/pembayaran/many", dataMany, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "upload csv file") {
         await postData(
            "/pembayaran/upload/csv",
            { file },
            {
               "Content-Type": "multipart/form-data",
            }
         );
      }

      if (!fetchIsError) {
         event.target.reset();
      }
   }
   return (
      <UploadLayout title={"upload pembayaran"}>
         <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="relative w-max">
               <ModalCategory
                  title={selectOption}
                  options={[
                     "add single pembayaran",
                     "tambah banyak pembayaran",
                  ]}
                  setSelectOption={(e) => setSelectOption(e)}
               />
            </div>
            {selectOption === "add single pembayaran" && (
               <FormData handleChangeValue={handleChangeValue} />
            )}
            {selectOption === "tambah banyak pembayaran" && (
               <>
                  <FormData handleChangeValue={handleChangeValue} />
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
                  selectOption === "tambah banyak pembayaran" &&
                  dataMany.length === 0
               }>
               Tambah
            </Button>
         </form>
         {selectOption === "tambah banyak pembayaran" && (
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
                        nim={item.nim}
                        name={item.name}
                        key={idx}
                        handleDelete={() => handleDeleteTodo(item.nim)}
                     />
                  ))}
               </div>
            </>
         )}
      </UploadLayout>
   );
}

const FormData = ({ handleChangeValue }) => {
   return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
         <InputDefault
            id="jumlah"
            name="jumlah"
            placeholder="exp: 3000000"
            onChange={handleChangeValue}
         />
         <InputSelectSemester onChange={handleChangeValue} />
         <InputSelectTahunAkademik onChange={handleChangeValue} />
      </div>
   );
};

const Todo = ({ name, tahun, handleDelete }) => {
   return (
      <div className="flex justify-between min-w-[200px] p-2 gap-4 items-center rounded shadow-md">
         <div className="flex flex-col gap-2 whitespace-nowrap text-xs">
            <p>name : {name}</p>
            <p>tahun : {tahun}</p>
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
