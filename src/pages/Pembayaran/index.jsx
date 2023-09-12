import { useEffect, useState } from "react";
import { useFetch } from "../../helpers";
import { TableLinkComponent } from "../../components/Table";
import Button, { ButtonLinkAdd } from "../../components/Button";
import {
   FilterDrawer,
   BarCategories,
   InputDefault,
} from "../../components/actions";
import LaporanPembayaran from "./LaporanPembayaran";
import UploadLayout from "../../components/Layout/UploadLayout";

const navCategories = ["Daftar", "Laporan"];

const Pembayaran = () => {
   const { getDatas, data, fetchIsLoading, fetchIsError } = useFetch();
   const [activeContent, setActiveContent] = useState(navCategories[0]);
   const query = {
      name: "",
      semester: "",
      tahun: "",
      bank: "",
   };
   const params = new URLSearchParams();

   const handleAdvanceSearch = (e) => {
      e.preventDefault();
      if (query.tahun.length > 0) {
         params.append("tahun", query.tahun);
      }

      if (query.semester.length > 0) {
         params.append("semester", query.semester);
      }
      if (query.bank.length > 0) {
         params.append("bank", query.bank);
      }
      if (query.name.length > 0) {
         params.append("name", query.name);
      }
      getDatas("/pembayaran?" + params);
   };

   useEffect(() => {
      getDatas("/pembayaran?" + params);
   }, []);

   return (
      <UploadLayout>
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Daftar Pembayaran</h2>
            {activeContent === "Daftar" && (
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
                        onChange={(e) => (query.semester = e.target.value)}
                        id="semester"
                        name="semester"
                        placeholder="berdasarkan semester ganjil/genap"
                     />
                     <InputDefault
                        id="kota"
                        onChange={(e) => (query.name = e.target.value)}
                        type="text"
                        name="name"
                        placeholder="nama pembayaran"
                     />
                     <InputDefault
                        onChange={(e) => (query.bank = e.target.value)}
                        id="bank"
                        max={13}
                        type="text"
                        name="banknim"
                        placeholder="berdasarkan kode bank"
                     />
                     <Button>Search</Button>
                  </form>
               </FilterDrawer>
            )}
         </div>
         <div className="w-full flex justify-between items-center">
            <BarCategories
               navCategory={navCategories}
               setActiveContent={(e) => setActiveContent(e)}
               activeContent={activeContent}
            />
            {activeContent === "Daftar" && (
               <ButtonLinkAdd
                  path={"/pembayaran"}
                  title={"upload pembayaran"}
               />
            )}
         </div>
         {/* lists daftar pembayaran */}
         {activeContent === "Daftar" && (
            <TableLinkComponent
               datas={data}
               isLoading={fetchIsLoading}
               headers={["nama", "jumlah", "semester", "tahun"]}
               keyBody={["name", "jumlah", "semester", "tahun"]}
            />
         )}

         {activeContent === "Laporan" && <LaporanPembayaran />}
      </UploadLayout>
   );
};

export default Pembayaran;
