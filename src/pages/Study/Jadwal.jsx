import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { superClient } from "../../api/apiClient";
import { Paggination, TableLinkComponent } from "../../components";
import { useFetch } from "../../helpers";

const Jadwal = () => {
   const [current, setCurrent] = useState(0);
   const [nextPage, setNextPage] = useState(15);
   const [records, setRecords] = useState(null);
   const [data, setData] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const { deleteData } = useFetch();

   const handleDelete = (id) => {
      deleteData(`/kelas/${id}`);
   };

   function searchByName(e) {
      setRecords(
         data.filter((d) => d.name.toLowerCase().includes(e.target.value))
      );
   }

   function fetchData() {
      setLoading(true);
      superClient
         .get("/kelas", {
            headers: {
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
            },
         })
         .then((d) => {
            setData(d.data.data);
            setRecords(d.data.data);
         })
         .finally(() => setLoading(false));
   }
   const handleNextPage = () => {
      setCurrent((prev) => prev + 10);
      setNextPage((prev) => prev + 10);
   };

   const handlePrevPage = () => {
      setCurrent((prev) => prev - 10);
      setNextPage((prev) => prev - 10);
   };

   useEffect(() => {
      fetchData();
   }, []);
   return (
      <>
         <div className="flex md:justify-between items-center flex-wrap my-6 gap-3">
            <label
               htmlFor="search"
               className="border rounded text-slate-700 flex min-w-[300px] items-center px-2 gap-2 py-1 bg-slate-100 bg-white shadow-sm">
               <FiSearch size={20} className="text-slate-400" />
               <input
                  name="search"
                  id="search"
                  onChange={searchByName}
                  placeholder="cari berdasarkan nama kelas"
                  className="bg-transparent focus:outline-none w-full placeholder:text-sm"
               />
            </label>
            <div className="self-end w-max">
               <Paggination
                  handleNextPage={() => handleNextPage()}
                  handlePrevPage={() => handlePrevPage()}
                  current={current}
                  data={data !== null && data.length}
               />
            </div>
         </div>
         <TableLinkComponent
            isLoading={isLoading}
            datas={records?.slice(current, nextPage)}
            headers={["nama"]}
            pathUrl={"krs"}
            keyBody={["name"]}
            pathId={"name"}
            handleDelete={(id) => handleDelete(id)}
         />
      </>
   );
};

export default Jadwal;
