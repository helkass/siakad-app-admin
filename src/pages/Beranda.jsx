import { useEffect, useState } from "react";
import { useFetch } from "../helpers";
import {
   Button,
   CardPresensi,
   CardSummary,
   EmptyData,
   InputSelectDefault,
   Loader,
   ModalDefaultContainer,
} from "../components";
import { ToastContainer } from "react-toastify";
import { FaUser, FaListCheck } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const Dashboard = () => {
   const presensi = useFetch();
   const kelas = useFetch();
   const mahasiswa = useFetch();
   const dosen = useFetch();
   const matKul = useFetch();
   const fakultas = useFetch();
   const jurusan = useFetch();
   const [isModal, setModal] = useState(false);
   const [isKelas, setKelas] = useState("");
   const [timeKode, setTimeKode] = useState(15);

   const deleteKodePresensi = (id) => {
      presensi.deleteData(`/presensi/kode/${id}`);
   };

   const handleGenerateKode = (e) => {
      e.preventDefault();
      presensi.postData(
         "/presensi/kode",
         { kelas: isKelas, time: timeKode },
         {
            "Content-Type": "application/json",
         },
         "/presensi/kode"
      );
   };

   useEffect(() => {
      presensi.getDatas("/presensi/kode");
      kelas.getDatas("/kelas");
      mahasiswa.getDatas("/mahasiswa");
      dosen.getDatas("/dosen");
      fakultas.getDatas("/fakultas");
      jurusan.getDatas("/jurusan");
      matKul.getDatas("/matkul");
   }, []);
   return (
      <section className="pt-6 min-w-9/12 w-full pb-20 overflow-hidden">
         <ToastContainer />
         <h1 className="font-bold text-2xl">Dashboard</h1>
         <h1 className="font-bold mt-3">Summary</h1>
         {/* cards info db */}
         <CardSummariesWrapper isLoading={matKul.fetchIsLoading}>
            <CardSummary
               iconStyle={"bg-red-500"}
               title={mahasiswa.data?.length}
               subTitle={"Mahasiswa"}
               Icon={FaUser}
            />
            <CardSummary
               iconStyle={"bg-green-500"}
               title={matKul.data?.length}
               subTitle={"Mata Kuliah"}
               Icon={FaListAlt}
            />
            <CardSummary
               iconStyle={"bg-blue-500"}
               title={dosen.data?.length}
               subTitle={"Dosen"}
               Icon={PiStudentFill}
            />
            <CardSummary
               iconStyle={"bg-purple-500"}
               title={fakultas.data?.length}
               subTitle={"Fakultas"}
               Icon={FaListAlt}
            />
            <CardSummary
               iconStyle={"bg-yellow-500"}
               title={jurusan.data?.length}
               subTitle={"Jurusan"}
               Icon={FaListCheck}
            />
         </CardSummariesWrapper>
         {/* modal while generate kode presensi */}
         <ModalDefaultContainer
            isOpen={isModal}
            setOpen={() => setModal(false)}>
            {!kelas.fetchIsLoading && kelas.data !== null && (
               <form onSubmit={handleGenerateKode} className="space-y-6">
                  <InputSelectDefault
                     options={kelas?.data}
                     keyBody={"name"}
                     name="kelas"
                     id="kelas"
                     defaultValue={"pilih kelas"}
                     onChange={(e) => setKelas(e.target.value)}
                  />
                  <InputSelectDefault
                     options={durationsKode}
                     keyBody={"time"}
                     name="time"
                     id="time"
                     defaultValue={"pilih Durasi"}
                     onChange={(e) => setTimeKode(e.target.value)}
                  />
                  <Button
                     upload
                     type="submit"
                     isLoading={presensi.fetchIsLoading}>
                     Generate
                  </Button>
               </form>
            )}
         </ModalDefaultContainer>
         {/* end modal */}
         {presensi.fetchIsLoading && kelas.fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            presensi.data !== null && (
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <strong className="text-xl">Daftar Presensi</strong>
                     <Button
                        isLoading={presensi.fetchIsLoading}
                        upload
                        onClick={() => setModal(!isModal)}>
                        Buat Kode
                     </Button>
                  </div>
                  {presensi.data.length >= 1 ? (
                     <div className="flex gap-3 flex-wrap">
                        {presensi.data.map((pres) => (
                           <CardPresensi
                              {...pres}
                              isLoading={presensi.fetchIsLoading}
                              key={pres.id}
                              handleDelete={() => deleteKodePresensi(pres.id)}
                           />
                        ))}
                     </div>
                  ) : (
                     <EmptyData />
                  )}
               </div>
            )
         )}
      </section>
   );
};

const durationsKode = [
   {
      time: 15,
   },
   {
      time: 30,
   },
   {
      time: 60,
   },
   {
      time: 120,
   },
   {
      time: 1440,
   },
   {
      time: 4320,
   },
];

const CardSummariesWrapper = ({ children, isLoading }) => {
   return (
      <div className="overflow-x-hidden mb-6 md:mb-1">
         {isLoading ? (
            <Loader />
         ) : (
            <div className="flex gap-2 py-3 flex-nowrap overflow-x-auto md:flex-wrap">
               {children}
            </div>
         )}
      </div>
   );
};

export default Dashboard;
