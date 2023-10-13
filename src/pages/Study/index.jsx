import React, { useEffect, useState } from "react";
import MataKuliah from "./MataKuliah";
import Jadwal from "./Jadwal";
import {
   BarCategories,
   ButtonLinkAdd,
   TableLinkComponent,
   UploadLayout,
} from "../../components";
import { useFetch } from "../../helpers";

const navCategories = [
   "mata kuliah",
   "penjadwalan",
   "tahun period",
   "waktu jadwal",
];

const Study = () => {
   const [activeContent, setActiveContent] = useState(navCategories[1]);
   return (
      <UploadLayout title={"Studi mahasiswa"}>
         <div className="flex md:justify-between flex-wrap gap-3 items-center">
            <BarCategories
               navCategory={navCategories}
               setActiveContent={(e) => setActiveContent(e)}
               activeContent={activeContent}
            />
            <ButtonLinkAdd
               path={
                  activeContent === "mata kuliah"
                     ? "/study/matkul"
                     : activeContent === "mata kuliah"
                     ? "/study/jadwal"
                     : "/study/other"
               }
               title={`upload ${activeContent}`}
            />
         </div>
         {activeContent === "mata kuliah" && <MataKuliah />}
         {activeContent === "penjadwalan" && <Jadwal />}
         {activeContent === "tahun period" && (
            <PeriodComponent content={"tahun period"} />
         )}
         {activeContent === "waktu jadwal" && (
            <PeriodComponent content={"waktu jadwal"} />
         )}
      </UploadLayout>
   );
};

// fetch data tahun periode
const PeriodComponent = ({ content }) => {
   const period = useFetch();
   const [contents, setContents] = useState({
      headers: ["Tahun Mulai", "Tahun Akhir"],
      keyBody: ["tahun_mulai", "tahun_akhir"],
   });

   const handleDelete = (id) => {
      if (content === "tahun period") {
         period.deleteData(`/tahun/${id}`, false, "/tahun");
      }

      if (content === "Waktu Jadwal") {
         period.deleteData(`/waktu/${id}`, false, "/waktu");
      }
   };

   useEffect(() => {
      if (content === "tahun period") {
         period.getDatas("/tahun");
         setContents({
            headers: ["Tahun Mulai", "Tahun Akhir"],
            keyBody: ["tahun_mulai", "tahun_akhir"],
         });
      } else if (content === "waktu jadwal") {
         setContents({
            headers: ["Waktu Mulai", "Waktu Berakhir"],
            keyBody: ["waktu_mulai", "waktu_berakhir"],
         });
         period.getDatas("/waktu");
      }
   }, []);

   return (
      <TableLinkComponent
         isLoading={period.isLoading}
         datas={period.data}
         headers={contents.headers}
         keyBody={contents.keyBody}
         handleDelete={(id) => handleDelete(id)}
      />
   );
};

export default Study;
