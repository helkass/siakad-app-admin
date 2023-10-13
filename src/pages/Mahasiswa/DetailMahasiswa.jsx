import { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch, useMahasiswa } from "../../helpers";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../constants/toastConfig";
import {
   Button,
   BarCategories,
   Loader,
   TableLinkComponent,
   InputSelectSemester,
   InputSelectTahunAkademik,
   ButtonLinkAdd,
} from "../../components";
import { currencyFormatter } from "../../utilities/formatter";
import { FaLink } from "react-icons/fa6";

const navCategory = ["detail", "tagihan", "hasil studi"];

const DetailMahasiswa = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [category, setCategory] = useState(navCategory[0]);
   const [queryHasilStudi, setQueryHasilStudi] = useState({});
   const {
      mahasiswa,
      getMahasiswa,
      deleteMahasiswa,
      waliMahasiswa,
      mahasiswaIsLoading,
      transkrip,
      hasilStudi,
      tagihan,
   } = useMahasiswa();
   const pembayaran = useFetch();

   const handleDeleteMahasiswa = async () => {
      const response = await deleteMahasiswa(mahasiswa.nim);

      if (response.status === 200) {
         toast.success(response.data.success, toastConfig);

         setTimeout(() => {
            navigate("/mahasiswa");
         }, 2500);
      } else {
         toast.error("gagal menghapus mahasiswa", toastConfig);
      }
   };

   const handleChangeStudi = (e) => {
      setQueryHasilStudi(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   // get specified pembayaran
   function getTahunPembayaran(id) {
      if (pembayaran.data !== null) {
         return pembayaran.data?.filter((pay) => pay.id === id);
      } else {
         return;
      }
   }

   useEffect(() => {
      getMahasiswa(`/${id}`);
      pembayaran.getDatas("/pembayaran");
   }, []);

   return (
      <section className="my-12 w-full flex flex-col gap-4">
         <ToastContainer />
         {mahasiswaIsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : (
            <>
               <BarCategories
                  navCategory={navCategory}
                  setActiveContent={(e) => setCategory(e)}
                  activeContent={category}
               />
               {category === "detail" && (
                  <div className="flex sm:flex-row gap-6 flex-col">
                     <div className="flex flex-col gap-4 w-1/2 rounded shadow-lg p-3 bg-white">
                        <div className="flex justify-between items-center">
                           <h4 className="text-center font-semibold text-xl">
                              Detail Mahasiwa
                           </h4>
                           <Link
                              to={`update`}
                              className="p-2 rounded-lg bg-yellow-100 text-yellow-600 h-max">
                              <AiFillEdit size={20} />
                           </Link>
                        </div>
                        {mahasiswa !== null && (
                           <div className="grid grid-cols-3 gap-x-2 gap-y-4 border-t pt-3">
                              <KeyValue keyName={"ID"} value={mahasiswa.id} />
                              <KeyValue
                                 keyName={"Nama"}
                                 value={mahasiswa.name}
                              />
                              <KeyValue keyName={"NIM"} value={mahasiswa.nim} />
                              <KeyValue
                                 keyName={"IPK"}
                                 value={transkrip.nilai}
                              />
                              <KeyValue
                                 keyName={"Semester"}
                                 value={mahasiswa.semester}
                              />
                              <KeyValue
                                 keyName={"Kelas"}
                                 value={mahasiswa.kelas}
                              />
                              <KeyValue
                                 keyName={"Email"}
                                 value={mahasiswa.email}
                              />
                              <KeyValue
                                 keyName={"Phone"}
                                 value={mahasiswa.phone}
                              />
                              <KeyValue
                                 keyName={"Jurusan"}
                                 value={mahasiswa.jurusan}
                              />
                              <KeyValue
                                 keyName={"Tahun"}
                                 value={mahasiswa.tahun}
                              />
                              <KeyValue
                                 keyName={"Alamat"}
                                 value={mahasiswa?.alamat}
                              />
                              <KeyValue
                                 keyName={"Kota"}
                                 value={mahasiswa?.kota}
                              />
                              <KeyValue
                                 keyName={"Provinsi"}
                                 value={mahasiswa?.provinsi}
                              />
                           </div>
                        )}
                     </div>
                     <div className="flex flex-col gap-4 w-1/2 rounded shadow-lg p-3 bg-white">
                        <h4 className="text-center font-semibold text-xl">
                           Detail Orang Tua
                        </h4>
                        {waliMahasiswa !== null ? (
                           <div className="grid grid-cols-3 gap-x-2 gap-y-4 border-t pt-3">
                              <KeyValue
                                 keyName={"Nama"}
                                 value={waliMahasiswa.name}
                              />
                              <KeyValue
                                 keyName={"Phone"}
                                 value={waliMahasiswa.phone}
                              />
                              <KeyValue
                                 keyName={"Alamat"}
                                 value={waliMahasiswa?.alamat}
                              />
                              <KeyValue
                                 keyName={"Kota"}
                                 value={waliMahasiswa?.kota}
                              />
                              <KeyValue
                                 keyName={"Provinsi"}
                                 value={waliMahasiswa?.provinsi}
                              />
                           </div>
                        ) : (
                           <p>data wali mahasiswa berlum ada</p>
                        )}
                     </div>
                  </div>
               )}
               {category === "tagihan" && (
                  <table className="table-auto w-full bg-white">
                     <thead
                        className={`border-b mb-3 capitalize font-semibold mt-3`}>
                        {/* header table */}
                        <tr>
                           <th className="pl-1 text-left py-2">Di Bayarkan</th>
                           <th className="pl-1 text-left py-2">Jumlah</th>
                           <th className="pl-1 text-left py-2">Semester</th>
                           <th className="pl-1 text-left py-2">Tahun</th>
                           <th className="pl-1 text-left py-2">Status</th>
                           <th className="pl-1 text-left py-2">Detail</th>
                        </tr>
                     </thead>
                     {/* table contents */}
                     <tbody>
                        {tagihan.map((tag, idx) => (
                           <tr
                              key={idx}
                              className={`
                              hover:bg-emerald-100
                                 ${idx % 2 === 0 && "bg-emerald-50"}`}>
                              <td className="py-1">
                                 Rp. {currencyFormatter(tag.nominal)}
                              </td>
                              <td className="py-1">
                                 Rp.{" "}
                                 {currencyFormatter(
                                    getTahunPembayaran(tag.pembayaran)[0]
                                       ?.jumlah
                                 )}
                              </td>
                              <td className="py-1">
                                 {
                                    getTahunPembayaran(tag.pembayaran)[0]
                                       ?.semester
                                 }
                              </td>
                              <td className="py-1">
                                 {getTahunPembayaran(tag.pembayaran)[0]
                                    ?.tahun_akademik.tahun_mulai +
                                    "/" +
                                    getTahunPembayaran(tag.pembayaran)[0]
                                       ?.tahun_akademik.tahun_akhir}
                              </td>
                              <td className="py-1">{tag.status}</td>
                              <td className="py-1">
                                 <Link
                                    to={`/pembayaran/${tag.pembayaran}/tagihan?nim=${tag.nim}`}>
                                    <FaLink size={22} />
                                 </Link>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
               {category === "hasil studi" && (
                  <>
                     <HasilStudi
                        datas={hasilStudi}
                        isLoading={mahasiswaIsLoading}
                        yearLimit={mahasiswa.tahun}
                     />
                     <Link to={"khs"}>
                        <Button>Cetak Khs</Button>
                     </Link>
                  </>
               )}
            </>
         )}
         {category === "detail" && (
            <Button
               onClick={handleDeleteMahasiswa}
               error={true}
               className="w-max self-end mt-12">
               <AiFillDelete size={20} />
               Hapus Mahasiswa
            </Button>
         )}
      </section>
   );
};

const KeyValue = memo((props) => {
   return (
      <>
         <p className="flex justify-between text-slate-500">
            {props.keyName}
            <span>:</span>
         </p>
         <p className="col-span-2 w-full font-medium">{props.value}</p>
      </>
   );
});

const HasilStudi = ({ isLoading, datas, yearLimit }) => {
   const [queryHasilStudi, setQueryHasilStudi] = useState({
      semester: "pilih semester",
   });

   const handleChangeStudi = (e) => {
      setQueryHasilStudi(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   return (
      <>
         <div className="flex gap-6 mb-1">
            <InputSelectTahunAkademik
               limit={yearLimit}
               onChange={handleChangeStudi}
            />
            <InputSelectSemester onChange={handleChangeStudi} />
         </div>
         <TableLinkComponent
            datas={datas.filter(
               (d) =>
                  d.semester === queryHasilStudi.semester &&
                  d.tahun === queryHasilStudi.tahun
            )}
            isLoading={isLoading}
            headers={[
               "Mata Kuliah",
               "angka",
               "huruf",
               "indeks",
               "SKS * Indeks",
            ]}
            keyBody={["mata_kuliah", "angka", "huruf", "indeks", "total"]}
         />
      </>
   );
};

export default DetailMahasiswa;
