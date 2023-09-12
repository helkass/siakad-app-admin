import { useEffect, useState } from "react";
import { dataMahasiswa } from "../../constants/dataMahasiswa";
import { TableLinkComponent } from "../../components/Table";
import { FiSearch } from "react-icons/fi";
import Paggination from "../../components/actions/Paggination";
import { superClient } from "../../api/apiClient";
import FilterDrawer from "../../components/actions/FilterDrawer";
import { InputDefault } from "../../components/actions/Input";
import Button, { ButtonLinkAdd } from "../../components/Button";

const Mahasiswa = () => {
   const [current, setCurrent] = useState(0);
   const [nextPage, setNextPage] = useState(30);
   const [data, setData] = useState(null);
   const [records, setRecords] = useState(null);
   const [isLoading, setLoading] = useState(false);

   const query = {
      name: "",
      jurusan: "",
      tahun: "",
      kota: "",
      nim: "",
      kelas: "",
   };

   const params = new URLSearchParams();

   function fetchData() {
      setLoading(true);
      superClient
         .get("/mahasiswa", {
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

   useEffect(() => {
      fetchData();
   }, []);

   function searchByName(e) {
      setRecords(
         data.filter((d) => d.name.toLowerCase().includes(e.target.value))
      );
   }

   const handleAdvanceSearch = (e) => {
      e.preventDefault();
      if (query.tahun.length > 0) {
         params.append("tahun", query.tahun);
      }

      if (query.kota.length > 0) {
         params.append("kota", query.kota);
      }
      if (query.jurusan.length > 0) {
         params.append("jurusan", query.jurusan);
      }

      if (query.nim.length > 0) {
         params.append("nim", query.nim);
      }

      if (query.kelas.length > 0) {
         params.append("kelas", query.kelas);
      }

      superClient
         .get("/mahasiswa", {
            params: params,
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
   };

   const handleNextPage = () => {
      setCurrent((prev) => prev + 10);
      setNextPage((prev) => prev + 10);
   };

   const handlePrevPage = () => {
      setCurrent((prev) => prev - 10);
      setNextPage((prev) => prev - 10);
   };
   return (
      <div className="flex flex-col gap-4 py-12 min-w-9/12 w-full">
         <div className="flex justify-between mt-4 items-center w-full">
            <label
               htmlFor="search"
               className="border rounded text-slate-700 flex min-w-[300px] items-center px-2 gap-2 py-1 bg-slate-100">
               <FiSearch size={20} className="text-slate-400" />
               <input
                  name="search"
                  id="search"
                  onChange={searchByName}
                  placeholder="cari berdasarkan nama mahasiswa"
                  className="bg-transparent focus:outline-none w-full placeholder:text-sm"
               />
            </label>
            <FilterDrawer>
               <form
                  onSubmit={handleAdvanceSearch}
                  className="flex flex-col gap-4">
                  <InputDefault
                     type="text"
                     id="tahun"
                     name="tahun"
                     onChange={(e) => (query.tahun = e.target.value)}
                     placeholder="berdasarkan tahun"
                     max={new Date().getFullYear()}
                  />
                  <InputDefault
                     type="text"
                     onChange={(e) => (query.jurusan = e.target.value)}
                     id="jurusan"
                     name="jurusan"
                     placeholder="berdasarkan jurusan"
                  />
                  <InputDefault
                     type="text"
                     onChange={(e) => (query.kelas = e.target.value)}
                     id="kelas"
                     name="kelas"
                     placeholder="berdasarkan kelas"
                  />
                  <InputDefault
                     id="kota"
                     onChange={(e) => (query.kota = e.target.value)}
                     type="text"
                     name="kota"
                     placeholder="kota"
                  />
                  <InputDefault
                     onChange={(e) => (query.nim = e.target.value)}
                     id="nim"
                     max={13}
                     type="text"
                     name="nim"
                     placeholder="nim"
                  />
                  <Button>Search</Button>
               </form>
            </FilterDrawer>
         </div>
         {/* button pagination */}
         <div className="flex items-center text-sm justify-between mt-4">
            <ButtonLinkAdd path={"/mahasiswa"} title={"upload mahasiswa"} />
            <Paggination
               handleNextPage={() => handleNextPage()}
               handlePrevPage={() => handlePrevPage()}
               current={current}
               data={dataMahasiswa.length}
            />
         </div>
         <span className="text-sm">
            jumlah total mahasiswa :{" "}
            <strong>{data !== null && data.length}</strong>
         </span>
         <div>
            <div className="overflow-y-auto min-w-8/12">
               <TableLinkComponent
                  isLoading={isLoading}
                  headers={[
                     "nama",
                     "NIM",
                     "kelas",
                     "jurusan",
                     "tahun",
                     "email",
                     "phone",
                  ]}
                  keyBody={[
                     "name",
                     "nim",
                     "kelas",
                     "jurusan",
                     "tahun",
                     "email",
                     "phone",
                  ]}
                  datas={records?.slice(current, nextPage)}
               />
            </div>
         </div>
      </div>
   );
};

export default Mahasiswa;
