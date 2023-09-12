import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/toastConfig";
import { useFetch } from "../../helpers";
import {
   Button,
   InputDefault,
   InputFile,
   ModalCategory,
   UploadLayout,
} from "../../components";

const UploadMahasiswa = () => {
   const [selectOption, setSelectOption] = useState("add single mahasiswa");
   const [changeValue, setChangeValue] = useState({});
   const [dataMany, setDataMany] = useState([]);
   const [file, setFile] = useState(null);

   const { fetchIsLoading, postData, fetchIsError } = useFetch();
   const jurusan = useFetch();

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   function handleAddOnList() {
      const isExist = dataMany.filter((d) => d.nim === changeValue.nim);

      if (isExist.length > 0) {
         toast.warning("terjadi duplikasi data nim", toastConfig);
      } else {
         setDataMany((prevData) => [...prevData, changeValue]);
      }
   }

   // handle delete todo if selectOptions === tambah banyal mahasiswa
   function handleDeleteTodo(nim) {
      setDataMany(dataMany.filter((d) => d.nim !== nim));
   }

   async function handleSubmit(event) {
      event.preventDefault();

      if (selectOption === "add single mahasiswa") {
         await postData("/mahasiswa", changeValue, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "tambah banyak mahasiswa") {
         await postData("/mahasiswa/many", dataMany, {
            "Content-Type": "application/json",
         });
      } else if (selectOption === "upload csv file") {
         await postData(
            "/mahasiswa/upload/csv",
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

   useEffect(() => {
      jurusan.getDatas("/jurusan");
   }, []);

   return (
      <UploadLayout title={"upload mahasiswa"}>
         <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="relative w-max">
               <ModalCategory
                  title={selectOption}
                  options={[
                     "add single mahasiswa",
                     "tambah banyak mahasiswa",
                     "upload csv file",
                  ]}
                  setSelectOption={(e) => setSelectOption(e)}
               />
            </div>
            {selectOption === "add single mahasiswa" && (
               <FormData
                  handleChangeValue={handleChangeValue}
                  jurusanOptions={jurusan?.data}
               />
            )}
            {selectOption === "tambah banyak mahasiswa" && (
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
            {selectOption === "upload csv file" && (
               <InputFile
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
               />
            )}
            <Button
               upload
               type="submit"
               isLoading={fetchIsLoading}
               disabled={
                  selectOption === "tambah banyak mahasiswa" &&
                  dataMany.length === 0
               }>
               Tambah
            </Button>
         </form>
         {selectOption === "tambah banyak mahasiswa" && (
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
};

const FormData = ({ handleChangeValue, jurusanOptions }) => {
   return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
         <InputDefault
            name="name"
            id="name"
            placeholder="name*"
            onChange={handleChangeValue}
         />
         <InputDefault
            id="nim"
            name="nim"
            placeholder="NIM*"
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
         <InputDefault
            onChange={handleChangeValue}
            name="tahun"
            id="tahun"
            placeholder="tahun*"
         />
         <InputDefault
            onChange={handleChangeValue}
            placeholder="no hanphone"
            name="phone"
            id="phone"
         />
         <InputDefault
            onChange={handleChangeValue}
            name="email"
            id="email"
            type="email"
            placeholder="email*"
         />
         <InputDefault
            onChange={handleChangeValue}
            name="alamat"
            id="alamat"
            type="text"
            placeholder="alamat"
         />
         <InputDefault
            onChange={handleChangeValue}
            name="kota"
            id="kota"
            type="text"
            placeholder="kota"
         />
         <InputDefault
            onChange={handleChangeValue}
            name="provinsi"
            id="provinsi"
            type="text"
            placeholder="provinsi"
         />
         <InputDefault
            onChange={handleChangeValue}
            name="born"
            id="born"
            type="text"
            placeholder="tempat/tanggal lahir*"
         />
      </div>
   );
};

const Todo = ({ name, nim, handleDelete }) => {
   return (
      <div className="flex justify-between min-w-[200px] p-2 gap-4 items-center rounded shadow-md">
         <div className="flex flex-col gap-2 whitespace-nowrap text-xs">
            <p>name : {name}</p>
            <p>nim : {nim}</p>
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

export default UploadMahasiswa;
