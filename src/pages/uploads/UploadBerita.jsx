import React from "react";
import UploadLayout from "../../components/Layout/UploadLayout";
import Editor from "../../components/QuillEditor";

const UploadBerita = () => {
   return (
      <UploadLayout title={"Upload berita"}>
         <Editor placeholder="ketik disini" />
      </UploadLayout>
   );
};

export default UploadBerita;
