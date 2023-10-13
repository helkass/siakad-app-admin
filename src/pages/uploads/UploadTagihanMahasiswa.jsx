import React, { useEffect, useState } from "react";
import {
   Button,
   FilterDrawer,
   InputSelectDefault,
   InputSelectSemesterByNumber,
   Loader,
   UploadLayout,
} from "../../components";
import { useFetch } from "../../helpers";
import { useParams } from "react-router-dom";

const UploadTagihanMahasiswa = () => {
   const { id } = useParams();
   const [checked, setChecked] = useState([]);
   const [query, setQuery] = useState({
      semester: "",
      jurusan: "",
   });
   const jurusan = useFetch();
   const mahasiswa = useFetch();
   const tagihan = useFetch();

   const params = new URLSearchParams();

   const handleChecked = (nim) => {
      // check if nim exist an at data
      const exist = checked.includes(nim);

      if (exist) {
         setChecked(checked.filter((data) => data !== nim));
         return;
      }
      setChecked((prev) => [...prev, nim]);
   };

   const handleUpload = async () => {
      // make static default post body form
      const parameter = {
         pembayaran: id,
         nominal: 0,
      };

      const data = [];

      checked.forEach((el) => {
         data.push({ ...parameter, nim: el });
      });

      await tagihan.postData("/tagihan/many", data, {
         "Content-Type": "application/json",
      });

      setChecked([]);
   };

   const handleSearch = (e) => {
      e.preventDefault();

      if (query.semester.length > 0) {
         params.append("semester", query.semester);
      }

      if (query.jurusan.length > 0) {
         params.append("jurusan", query.jurusan);
      }

      mahasiswa.getDatas("/mahasiswa", params);
   };

   useEffect(() => {
      jurusan.getDatas("/jurusan");
      mahasiswa.getDatas("/mahasiswa");
   }, []);

   return (
      <UploadLayout title={"tambahkan tagihan pada mahasiswa"}>
         {!jurusan.fetchIsLoading && jurusan.data !== null && (
            <>
               <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-600">
                     Total Mahasiswa yang dipilih{" "}
                     <strong>{checked.length}</strong>
                  </p>
                  <FilterDrawer>
                     <form
                        onSubmit={handleSearch}
                        className="flex flex-col space-y-6">
                        <strong className="text-emerald-600">By Jurusan</strong>
                        <InputSelectDefault
                           onChange={(e) =>
                              setQuery(
                                 (prev) =>
                                    (prev = {
                                       ...prev,
                                       jurusan: e.target.value,
                                    })
                              )
                           }
                           options={jurusan?.data}
                           keyBody={"name"}
                           name="jurusan"
                           defaultValue="pilih jurusan"
                        />
                        <strong className="text-emerald-600">
                           By Semester
                        </strong>
                        <InputSelectSemesterByNumber
                           onChange={(e) =>
                              setQuery(
                                 (prev) =>
                                    (prev = {
                                       ...prev,
                                       semester: e.target.value,
                                    })
                              )
                           }
                        />
                        <Button type="submit">Search</Button>
                     </form>
                  </FilterDrawer>
               </div>
               <DaftarMahasiswa
                  isLoading={mahasiswa.fetchIsLoading}
                  datas={mahasiswa.data}
                  handleChecked={(nim) => handleChecked(nim)}
                  checked={checked}
               />
               <Button
                  upload
                  isLoading={tagihan.fetchIsLoading}
                  className="fixed bottom-10 right-10"
                  onClick={handleUpload}>
                  Upload Tagihan
               </Button>
            </>
         )}
      </UploadLayout>
   );
};

const DaftarMahasiswa = ({ datas, isLoading, handleChecked, checked }) => {
   return (
      <div className="w-full bg-white">
         {isLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : datas !== null ? (
            <table className="table-auto w-full">
               <thead className={`border-b mb-3 capitalize font-semibold mt-3`}>
                  {/* header table */}
                  <tr>
                     <th className="pl-1 text-left py-2">NIM</th>
                     <th className="pl-1 text-left py-2">Nama</th>
                     <th className="pl-1 text-left py-2">Semester</th>
                     <th className="pl-1 text-left py-2">Jurusan</th>
                  </tr>
               </thead>
               {/* table contents */}
               <tbody>
                  {datas?.map((data, idx) => (
                     <tr
                        onClick={() => handleChecked(data.nim)}
                        key={idx}
                        className={`hover:bg-emerald-50 cursor-default hover:bg-emerald-100 border-b border-gray-100 ${
                           checked.includes(data.nim) && "bg-emerald-300"
                        } `}>
                        <td className="pl-1 py-2">{data?.nim}</td>
                        <td className="pl-1 py-2">{data?.name}</td>
                        <td className="pl-1 py-2">{data?.semester}</td>
                        <td className="pl-1 py-2">{data?.jurusan}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         ) : (
            <p>fetch Data Error</p>
         )}
      </div>
   );
};

export default UploadTagihanMahasiswa;
