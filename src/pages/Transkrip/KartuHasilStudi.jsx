import React, { useEffect } from "react";
import { TableFileDownloadComponent } from "../../components/Table";
import { useFetch } from "../../helpers/useFetch";

const KartuHasilStudi = () => {
   const { getDatas, fetchIsLoading, data, deleteData } = useFetch();

   const handleDelete = async (id) => {
      await deleteData(`/khs/${id}`, "/transkrip");
      getDatas("/khs");
   };

   useEffect(() => {
      getDatas("/khs");
   }, []);
   return (
      <TableFileDownloadComponent
         datas={data}
         isLoading={fetchIsLoading}
         headers={["NIM", "Semester", "Tahun"]}
         keyBody={["nim", "semester", "tahun"]}
         fileDownloadName={"KHS"}
         handleDelete={(id) => handleDelete(id)}
      />
   );
};

export default KartuHasilStudi;
