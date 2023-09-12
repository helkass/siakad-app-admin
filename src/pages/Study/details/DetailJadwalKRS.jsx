import React, { useEffect } from "react";
import { useFetch } from "../../../helpers";
import { useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { Button, Loader, UploadLayout } from "../../../components";

const DetailJadwalKRS = () => {
   const { getDatas, data, fetchIsLoading, deleteData } = useFetch();
   const { id } = useParams();

   const handleDelete = (id) => {
      deleteData(`/jadwal/${id}`);
   };

   useEffect(() => {
      getDatas(`/jadwal?kelas=${id}`);
   }, []);

   return (
      <UploadLayout title={`Daftar KRS/Jadwal Kelas ${id}`}>
         <div className="w-full">
            {fetchIsLoading ? (
               <div className="w-full flex justify-center items-center h-full">
                  <Loader />
               </div>
            ) : data !== null ? (
               <table className="table-auto w-full">
                  <thead
                     className={`border-b mb-3 capitalize font-semibold mt-3`}>
                     {/* header table */}
                     <tr>
                        <th className="pl-1 text-left py-2">Mata Kuliah</th>
                        <th className="pl-1 text-left py-2">Ruangan</th>
                        <th className="pl-1 text-left py-2">Hari</th>
                        <th className="pl-1 text-left py-2">Waktu</th>
                        <th className="pl-1 text-left py-2">Dosen</th>
                        <th className="pl-1 text-left py-2">action</th>
                     </tr>
                  </thead>
                  {/* table contents */}
                  <tbody className={``}>
                     {data?.map((d, idx) => (
                        <tr
                           key={idx}
                           className={`hover:bg-emerald-100 ${
                              idx % 2 == 0 &&
                              "bg-emerald-50 hover:bg-emerald-100"
                           }`}>
                           <td className="pl-1 py-2">{d.mata_kuliah}</td>
                           <td className="pl-1 py-2">{d.ruangan}</td>
                           <td className="pl-1 py-2">{d.hari}</td>
                           <td className="pl-1 py-2">
                              {d.waktu_jadwal_kuliah.waktu_mulai} -{" "}
                              {d.waktu_jadwal_kuliah.waktu_berakhir}
                           </td>
                           <td className="pl-1 py-2">
                              {d.dosen_jadwal_kuliah.name}
                           </td>
                           <td className="pl-1 py-2">
                              <Button error onClick={() => handleDelete(d.id)}>
                                 <AiFillDelete size={20} />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            ) : (
               <p>fetch Data Error</p>
            )}
         </div>
      </UploadLayout>
   );
};

export default DetailJadwalKRS;
