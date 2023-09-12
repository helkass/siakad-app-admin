import React, { useEffect } from "react";
import { ButtonLinkAdd, TableLinkComponent, UploadLayout } from "../components";
import { useFetch } from "../helpers";

const Dosen = () => {
   const { data, getDatas, fetchIsLoading, deleteData } = useFetch();

   const handleDelete = (id) => {
      deleteData(`/dosen/${id}`);
   };

   useEffect(() => {
      getDatas("/dosen");
   }, []);
   return (
      <UploadLayout title={"daftar dosen"}>
         <ButtonLinkAdd title={"Upload dosen"} path={"/dosen"} />
         <TableLinkComponent
            isLoading={fetchIsLoading}
            headers={["nama", "NIK"]}
            keyBody={["name", "nik"]}
            datas={data}
            handleDelete={(e) => handleDelete(e)}
         />
      </UploadLayout>
   );
};

export default Dosen;
