import { useEffect } from "react";
import { TableLinkComponent } from "../../components/Table";
import { useFetch } from "../../helpers";

const MataKuliah = () => {
   const { getDatas, data, fetchIsLoading } = useFetch();

   useEffect(() => {
      getDatas("/matkul");
   }, []);
   return (
      <TableLinkComponent
         datas={data}
         isLoading={fetchIsLoading}
         pathUrl={"matkul"}
         headers={["nama", "kode", "SKS"]}
         keyBody={["name", "kode", "sks"]}
      />
   );
};

export default MataKuliah;
