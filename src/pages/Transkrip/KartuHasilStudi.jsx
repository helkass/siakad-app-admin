import React, { useEffect } from "react";
import { TableFileDownloadComponent } from "../../components/Table";
import { useFetch } from "../../helpers/useFetch";

const KartuHasilStudi = () => {
   const { getDatas, fetchIsLoading, data, deleteData } = useFetch();

   const handleDelete = async (id) => {
      await deleteData(`/transkrip/rencana/${id}`);
      getDatas("/transkrip/rencana");
   };

   const handleDownload = (file) => {
      const downloadLink = document.createElement("a");
      const fileName = "krs_helka_septyawan.pdf";
      downloadLink.href = file;
      downloadLink.download = fileName;
      downloadLink.click();
   };

   useEffect(() => {
      getDatas("/transkrip/rencana");
   }, []);
   return (
      <TableFileDownloadComponent
         datas={data}
         isLoading={fetchIsLoading}
         headers={["NIM"]}
         keyBody={["nim"]}
         fileDownloadName={"KHS"}
         handleDownload={(e) => handleDownload(e)}
         handleDelete={(id) => handleDelete(id)}
      />
   );
};

export default KartuHasilStudi;
