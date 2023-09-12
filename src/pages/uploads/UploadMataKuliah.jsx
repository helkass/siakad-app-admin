import Button from "../../components/Button";
import UploadLayout from "../../components/Layout/UploadLayout";
import { InputDefault, InputFile } from "../../components/actions/Input";
import { ModalCategory } from "../../components/actions/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { upload } from "../../utilities/uploadData";

export default function UploadMataKuliah() {
   const {
      handleChangeValue,
      setSelectOption,
      selectOption,
      setFile,
      fetchIsLoading,
      clearTodo,
      handleAddOnList,
      handleDeleteTodo,
      dataMany,
      handleAddData,
   } = upload();

   return (
      <UploadLayout title={"upload mata kuliah"}>
         <form
            onSubmit={(e) => handleAddData(e, "matkul")}
            className="flex flex-col gap-7">
            <div className="relative w-max">
               <ModalCategory
                  title={selectOption}
                  options={["satu data", "banyak data", "upload file csv"]}
                  setSelectOption={(e) => setSelectOption(e)}
               />
            </div>
            {selectOption === "satu data" && (
               <FormData handleChangeValue={handleChangeValue} />
            )}
            {selectOption === "banyak data" && (
               <>
                  <FormData handleChangeValue={handleChangeValue} />
                  <Button type="button" onClick={handleAddOnList}>
                     Tambah ke List antrian
                  </Button>
               </>
            )}
            {selectOption === "upload file csv" && (
               <InputFile onChange={(e) => setFile(e)} />
            )}
            <Button
               upload
               type="submit"
               isLoading={fetchIsLoading}
               disabled={
                  selectOption === "banyak data" && dataMany.length == 0
               }>
               Tambah
            </Button>
         </form>
         {selectOption === "banyak data" && (
            <>
               {dataMany.length > 0 && (
                  <button
                     className="w-max bg-red-100 text-red-600 px-6 py-1 mt-2 rounded text-sm font-semibold"
                     type="button"
                     onClick={() => clearTodo()}>
                     Clear data
                  </button>
               )}
               <div className="flex flex-wrap gap-2 mt-6">
                  {dataMany.length > 0 &&
                     dataMany.map((item, idx) => (
                        <Todo
                           kode={item.kode}
                           name={item.name}
                           key={idx}
                           handleDelete={() =>
                              handleDeleteTodo("kode", item.kode)
                           }
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
            name="name"
            id="name"
            placeholder="nama mata kuliah*"
            onChange={handleChangeValue}
         />
         <InputDefault
            id="kode"
            name="kode"
            placeholder="kode mata kuliah"
            onChange={handleChangeValue}
         />
         <InputDefault
            onChange={handleChangeValue}
            name="sks"
            id="sks"
            placeholder="4"
         />
      </div>
   );
};

const Todo = ({ name, kode, handleDelete }) => {
   return (
      <div className="flex justify-between min-w-[200px] p-2 gap-4 items-center rounded shadow-md">
         <div className="flex flex-col gap-2 whitespace-nowrap text-xs">
            <p>name : {name}</p>
            <p>kode : {kode}</p>
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
