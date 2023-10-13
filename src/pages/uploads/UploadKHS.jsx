import { useState } from "react";
import { useFetch } from "../../helpers";
import {
   Button,
   InputDefault,
   InputFile,
   InputSelectSemester,
   InputSelectTahunAkademik,
   UploadLayout,
} from "../../components";

const UploadKHS = () => {
   const [file, setFile] = useState(null);
   const [changeValue, setChangeValue] = useState({});

   const { fetchIsLoading, postData } = useFetch();

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handlePost = async (event) => {
      event.preventDefault();

      await postData(
         "/transkrip/studi/upload",
         { ...changeValue, file },
         { "Content-Type": "multipart/form-data" }
      );

      event.target.reset();
   };

   return (
      <UploadLayout title={"Upload Transkrip Nilai atau KHS"}>
         <form
            onSubmit={handlePost}
            className="flex flex-col gap-y-4"
            encType="multipart/form-data">
            <div className="grid grid-cols-3 gap-3">
               <InputDefault
                  name="nim"
                  id="NIM"
                  placeholder="nim mahasiswa"
                  onChange={handleChangeValue}
               />
               <InputSelectTahunAkademik onChange={handleChangeValue} />
               <InputSelectSemester onChange={handleChangeValue} />
               <InputFile
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
               />
               <InputDefault
                  name="nilai"
                  id="nilai"
                  placeholder="Nilai Komulatif"
                  onChange={handleChangeValue}
               />
            </div>
            <Button upload isLoading={fetchIsLoading}>
               Upload
            </Button>
         </form>
      </UploadLayout>
   );
};

export default UploadKHS;
