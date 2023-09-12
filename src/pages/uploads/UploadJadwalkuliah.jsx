import { AiOutlineClose } from "react-icons/ai";
import {
   Button,
   InputSelectDefault,
   Loader,
   UploadLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useFetch } from "../../helpers";

/**
 * jadwal kuliah or KRS by kelas
 */
export default function UploadJadwalKuliah() {
   const [changeValue, setChangeValue] = useState({});

   // upload main function
   const { fetchIsLoading, postData } = useFetch();

   // change form input text
   function handleChangeValue(e) {
      setChangeValue(
         (prevValue) =>
            (prevValue = { ...prevValue, [e.target.name]: e.target.value })
      );
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      postData("/jadwal", changeValue, {
         "Content-Type": "application/json",
      });
   };

   const matKul = useFetch();
   const ruangan = useFetch();
   const waktu = useFetch();
   const dosen = useFetch();
   const kelas = useFetch();

   useEffect(() => {
      matKul.getDatas("/matkul");
      ruangan.getDatas("/ruangan");
      waktu.getDatas("/waktu");
      dosen.getDatas("/dosen");
      kelas.getDatas("/kelas");
   }, []);

   return (
      <UploadLayout title={"upload penjadwalan/KRS"}>
         {matKul.fetchIsLoading &&
         waktu.fetchIsLoading &&
         ruangan.fetchIsLoading &&
         kelas.fetchIsLoading &&
         dosen.fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
               <FormData
                  dataDosen={dosen?.data !== null ? dosen?.data : []}
                  dataMatKul={matKul?.data !== null ? matKul?.data : []}
                  dataRuangan={ruangan?.data !== null ? ruangan?.data : []}
                  dataWaktu={waktu?.data !== null ? waktu?.data : []}
                  dataKelas={kelas?.data !== null ? kelas?.data : []}
                  handleChangeValue={handleChangeValue}
               />
               <Button upload type="submit" isLoading={fetchIsLoading}>
                  Tambah
               </Button>
            </form>
         )}
      </UploadLayout>
   );
}

const FormData = ({
   handleChangeValue,
   dataRuangan,
   dataMatKul,
   dataWaktu,
   dataDosen,
   dataKelas,
}) => {
   const days = [
      "minggu",
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jum'at",
      "sabtu",
   ];
   return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
         <InputSelectDefault
            name="mata_kuliah"
            id="mata_kuliah"
            defaultValue={"pilih mata kuliah"}
            options={dataMatKul}
            keyBody={"name"}
            onChange={handleChangeValue}
         />
         <InputSelectDefault
            name="kelas"
            id="kelas"
            defaultValue={"pilih kelas"}
            options={dataKelas}
            keyBody={"name"}
            onChange={handleChangeValue}
         />
         <InputSelectDefault
            id="ruangan"
            keyBody={"name"}
            defaultValue={"pilih ruangan"}
            name="ruangan"
            options={dataRuangan}
            onChange={handleChangeValue}
         />
         {/* select options days */}
         <select
            name="hari"
            id="hari"
            defaultValue={"pilih hari"}
            className="text-sm focus:outline-emerald-400 py-3 bg-emerald-100 px-3 rounded focus:bg-white"
            onChange={handleChangeValue}>
            <option disabled value={"pilih hari"}>
               pilih hari
            </option>
            {days?.map((h, i) => (
               <option value={h} key={i}>
                  {h}
               </option>
            ))}
         </select>
         {/* select options waktu */}
         <select
            name="waktu"
            id="waktu"
            defaultValue={"pilih waktu"}
            className="text-sm focus:outline-emerald-400 py-3 bg-emerald-100 px-3 rounded focus:bg-white"
            onChange={handleChangeValue}>
            <option disabled value={"pilih waktu"}>
               pilih waktu
            </option>
            {dataWaktu?.map((waktu, i) => (
               <option value={waktu.id} key={i}>
                  {waktu.waktu_mulai} - {waktu.waktu_berakhir}
               </option>
            ))}
         </select>

         {/* select options dosen */}
         <select
            name="dosen"
            id="dosen"
            defaultValue={"pilih dosen"}
            className="text-sm focus:outline-emerald-400 py-3 bg-emerald-100 px-3 rounded focus:bg-white"
            onChange={handleChangeValue}>
            <option disabled value={"pilih dosen"}>
               pilih dosen
            </option>
            {dataDosen?.map((dosen, i) => (
               <option value={dosen.nik} key={i}>
                  {dosen.name} - {dosen.nik}
               </option>
            ))}
         </select>
      </div>
   );
};

const Todo = ({ name, kode, handleDelete }) => {
   return (
      <div className="flex justify-between min-w-[200px] p-2 gap-4 items-center rounded shadow-md">
         <div className="flex flex-col gap-2 whitespace-nowrap text-xs">
            <p>name : {name}</p>
            <p>kode : {kode}</p>
         </div>
         <button
            onClick={handleDelete}
            type="button"
            className="flex justify-center items-center bg-red-50 p-2 rounded hover:bg-red-200 text-red-600">
            <AiOutlineClose size={18} />
         </button>
      </div>
   );
};
