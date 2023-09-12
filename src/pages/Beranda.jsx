import { TableLinkComponent } from "../components/Table";
import { memo, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useFetch } from "../helpers";
import Paggination from "../components/actions/Paggination";
import { BarCategories } from "../components/actions/BarCategories";

const navCategory = ["mahasiswa", "dosen"];

const Dashboard = () => {
   const [activeContent, setActiveContent] = useState(navCategory[0]);
   const [current, setCurrent] = useState(0);
   const [nextPage, setNextPage] = useState(30);
   const [dataLength, setDataLength] = useState(0);

   const handleLengthOfPaggination = (data) => {
      if (activeContent == "mahasiswa") {
         setDataLength(data.mahasiswa);
      } else {
         setDataLength(data.dosen);
      }
   };

   const handleNextPage = () => {
      setCurrent((prev) => prev + 30);
      setNextPage((prev) => prev + 30);
   };

   const handlePrevPage = () => {
      setCurrent((prev) => prev - 30);
      setNextPage((prev) => prev - 30);
   };

   return (
      <section className="pt-6 min-w-9/12 w-full pb-20">
         <h1 className="font-bold text-2xl">Databases</h1>
         <div className="flex justify-between mt-8 items-center w-full border-b">
            {/* categories bar */}
            <BarCategories
               setActiveContent={(e) => setActiveContent(e)}
               activeContent={activeContent}
               navCategory={navCategory}
            />
            {/* button pagination */}
            <Paggination
               handleNextPage={() => handleNextPage()}
               handlePrevPage={() => handlePrevPage()}
               current={current}
               data={dataLength}
            />
         </div>
         {activeContent === "mahasiswa" && (
            <ShowMahasiswaData
               current={current}
               nextPage={nextPage}
               length={(num) => handleLengthOfPaggination({ mahasiswa: num })}
            />
         )}
         {activeContent === "dosen" && (
            <ShowDosenData
               current={current}
               nextPage={nextPage}
               length={(num) => handleLengthOfPaggination({ dosen: num })}
            />
         )}
      </section>
   );
};

const ShowMahasiswaData = memo(({ current, nextPage, length }) => {
   const { getDatas, data, fetchIsLoading } = useFetch();

   useEffect(() => {
      getDatas("/mahasiswa");
   }, []);

   return fetchIsLoading ? (
      <div className="w-full flex justify-center items-center h-full">
         <Loader />
      </div>
   ) : (
      <TableLinkComponent
         pathUrl={"/mahasiswa"}
         isLoading={fetchIsLoading}
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
         datas={data?.slice(current, nextPage)}
      />
   );
});

const ShowDosenData = memo(({ current, nextPage, length }) => {
   const { getDatas, data, fetchIsLoading } = useFetch();

   useEffect(() => {
      getDatas("/dosen");
   }, []);
   return (
      <TableLinkComponent
         isLoading={fetchIsLoading}
         headers={["nama", "NIK"]}
         keyBody={["name", "nik"]}
         datas={data?.slice(current, nextPage)}
      />
   );
});

export default Dashboard;
