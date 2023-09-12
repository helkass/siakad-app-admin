import React, { useState } from "react";
import MataKuliah from "./MataKuliah";
import Jadwal from "./Jadwal";
import { BarCategories, ButtonLinkAdd, UploadLayout } from "../../components";

const navCategories = ["mata kuliah", "kartu rencana studi"];

const Study = () => {
   const [activeContent, setActiveContent] = useState(navCategories[1]);
   return (
      <UploadLayout title={"Studi mahasiswa"}>
         <div className="flex justify-between items-center">
            <BarCategories
               navCategory={navCategories}
               setActiveContent={(e) => setActiveContent(e)}
               activeContent={activeContent}
            />
            <ButtonLinkAdd
               path={activeContent === "mata kuliah" ? "/matkul" : "/jadwal"}
               title={`upload ${activeContent}`}
            />
         </div>
         {activeContent === "mata kuliah" ? <MataKuliah /> : <Jadwal />}
      </UploadLayout>
   );
};

export default Study;
