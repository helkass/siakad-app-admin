import { useState } from "react";
import { useFetch } from "../../helpers";
import {
   Button,
   InputDefault,
   InputFile,
   UploadLayout,
} from "../../components";
import * as base64Converter from "../../utilities/base64Converter";

/**
 * page for rencana studi as a pdf file
 * and mahasiswa can download it
 */
const UploadTranskrip = () => {
   const [file, setFile] = useState(null);
   const [nim, setNim] = useState("");

   const { fetchIsLoading, postData } = useFetch();

   const handlePost = async (event) => {
      event.preventDefault();

      base64Converter.getBase64(file, async (err, result) => {
         await postData(
            "/transkrip/rencana",
            { nim, file: result },
            { "Content-Type": "application/json" }
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
               type="text"
               placeholder="nim mahasiswa"
               onChange={(e) => setNim(e.target.value)}
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
