import { useState } from "react";
import { useFetch } from "../../helpers";
import {
   Button,
   InputDefault,
   InputFile,
   UploadLayout,
} from "../../components";
import * as base64Converter from "../../utilities/base64Converter";

const UploadTranskrip = () => {
   const [file, setFile] = useState(null);
   const [changeValue, setChangeValue] = useState({});

   const { fetchIsLoading, postData } = useFetch();

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handlePost = async (event) => {
      event.preventDefault();

      base64Converter.getBase64(file, async (result) => {
         await postData(
            "/transkrip/rencana",
            { ...changeValue, file: result },
            { "Content-Type": "multipart/form-data" }
         );
      });

      event.target.reset();
   };

   return (
      <UploadLayout title={"Upload Rencana Studi"}>
         <form
            onSubmit={handlePost}
            className="flex flex-col gap-y-4"
            encType="multipart/form-data">
            <InputDefault
               name="nim"
               id="NIM"
               placeholder="nim mahasiswa"
               onChange={handleChangeValue}
            />
            <InputFile
               accept=".pdf"
               onChange={(e) => setFile(e.target.files[0])}
            />
            <Button upload isLoading={fetchIsLoading}>
               Upload
            </Button>
         </form>
      </UploadLayout>
   );
};

export default UploadTranskrip;
