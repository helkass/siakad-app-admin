import React, { useEffect } from "react";
import { TableFileDownloadComponent } from "../../components/Table";
import { useFetch } from "../../helpers";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa6";

export default function LaporanPembayaran() {
   const buktiPembayaran = useFetch();
   const bank = useFetch();

   function handleDelete(id) {
      buktiPembayaran.deleteData(`/bukti/${id}`);
   }

   const handleSelectChange = (e) => {
      const selected = e.target.value;
      if (selected === "Semua") {
         buktiPembayaran.getDatas("/bukti");
      } else {
         buktiPembayaran.getDatas(`/bukti?bank_id=${selected}`);
      }
   };

   useEffect(() => {
      bank.getDatas("/bank");
      buktiPembayaran.getDatas("/bukti");
   }, []);

   return (
      <div className="space-y-4">
         <select
            name="bank"
            id="bank"
            defaultValue={"Semua"}
            className="text-sm focus:outline-emerald-400 bg-emerald-200 px-3 rounded focus:bg-white py-2 shadow-sm"
            onChange={handleSelectChange}>
            <option value="Semua">Semua</option>
            {bank.data !== null &&
               bank.data.map((item, i) => (
                  <option value={item.id} key={i}>
                     {item.name} - {item.bank_name}
                  </option>
               ))}
         </select>
         <TableFileDownloadComponent
            datas={buktiPembayaran.data}
            isLoading={buktiPembayaran.fetchIsLoading && bank.fetchIsLoading}
            handleDelete={(id) => handleDelete(id)}
            fileDownloadName={"bukti_pembayaran"}
            headers={["NIM", "Catatan"]}
            keyBody={["nim", "catatan"]}
            handleDetailPage={(data) => {
               return (
                  <td className="pl-1 py-2">
                     <Link to={`${data.pembayaran}/tagihan?nim=${data.nim}`}>
                        <FaLink size={23} />
                     </Link>
                  </td>
               );
            }}
         />
      </div>
   );
}
