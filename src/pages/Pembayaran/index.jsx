import { useEffect, useState } from "react";
import { useFetch } from "../../helpers";
import {
   BarCategories,
   ButtonLinkAdd,
   Loader,
   UploadLayout,
} from "../../components";
import LaporanPembayaran from "./LaporanPembayaran";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { currencyFormatter } from "../../utilities/formatter";

const navCategories = ["Daftar", "Laporan"];

const Pembayaran = () => {
   const { getDatas, data, fetchIsLoading } = useFetch();
   const [activeContent, setActiveContent] = useState(navCategories[0]);

   useEffect(() => {
      getDatas("/pembayaran");
   }, []);

   return (
      <UploadLayout title="Daftar Pembayaran">
         <div className="w-full flex justify-between gap-3 items-center">
            <BarCategories
               navCategory={navCategories}
               setActiveContent={(e) => setActiveContent(e)}
               activeContent={activeContent}
            />
            {activeContent === "Daftar" && (
               <ButtonLinkAdd
                  className={"self-end"}
                  path={"/pembayaran"}
                  title={"upload pembayaran"}
               />
            )}
         </div>
         {/* lists daftar pembayaran */}
         {activeContent === "Daftar" && (
            <DaftarPembayaran datas={data} isLoading={fetchIsLoading} />
         )}

         {activeContent === "Laporan" && <LaporanPembayaran />}
      </UploadLayout>
   );
};

const DaftarPembayaran = ({ datas, isLoading }) => {
   return (
      <div className="w-full bg-white p-2">
         {isLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : datas !== null ? (
            <table className="table-auto w-full">
               <thead className={`border-b mb-3 capitalize font-semibold mt-3`}>
                  {/* header table */}
                  <tr>
                     <th className="pl-1 text-left py-2">Jumlah</th>
                     <th className="pl-1 text-left py-2">Semester</th>
                     <th className="pl-1 text-left py-2">Tahun</th>
                     <th className="pl-1 text-left py-2">detail</th>
                  </tr>
               </thead>
               {/* table contents */}
               <tbody>
                  {datas?.map((data, idx) => (
                     <tr
                        key={idx}
                        className={`hover:bg-emerald-100 ${
                           idx % 2 == 0 && "bg-emerald-50 hover:bg-emerald-100"
                        }`}>
                        <td className="pl-1 py-2">
                           Rp. {currencyFormatter(data?.jumlah)}
                        </td>
                        <td className="pl-1 py-2">{data?.semester}</td>
                        {
                           <td className="pl-1 py-2">
                              {data?.tahun_akademik.tahun_mulai}/
                              {data?.tahun_akademik.tahun_akhir}
                           </td>
                        }
                        <td className="pl-1 py-2">
                           <Link
                              className="bg-emerald-100 text-emerald-600"
                              to={"/pembayaran/" + data.id}>
                              <AiOutlineLink size={20} />
                           </Link>
                        </td>
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

export default Pembayaran;
