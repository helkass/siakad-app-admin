import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMahasiswa } from "../../helpers";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../constants/toastConfig";
import Loader from "../../components/Loader";

const DetailMahasiswa = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const {
      mahasiswa,
      getMahasiswa,
      deleteMahasiswa,
      waliMahasiswa,
      mahasiswaIsLoading,
   } = useMahasiswa();

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

   useEffect(() => {
      getMahasiswa(`/${id}`);
   }, []);

   return (
      <section className="my-12 w-9/12 flex flex-col gap-4">
         <ToastContainer />
         {mahasiswaIsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : (
            <div className="flex sm:flex-row gap-6 flex-col">
               <div className="flex flex-col gap-4 w-1/2 rounded shadow-lg p-3">
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
                        <KeyValue keyName={"Nama"} value={mahasiswa.name} />
                        <KeyValue keyName={"NIM"} value={mahasiswa.nim} />
                        <KeyValue keyName={"Kelas"} value={mahasiswa.kelas} />
                        <KeyValue keyName={"Email"} value={mahasiswa.email} />
                        <KeyValue keyName={"Phone"} value={mahasiswa.phone} />
                        <KeyValue
                           keyName={"Jurusan"}
                           value={mahasiswa.jurusan}
                        />
                        <KeyValue keyName={"Tahun"} value={mahasiswa.tahun} />
                        <KeyValue
                           keyName={"Alamat"}
                           value={mahasiswa?.alamat}
                        />
                        <KeyValue keyName={"Kota"} value={mahasiswa?.kota} />
                        <KeyValue
                           keyName={"Provinsi"}
                           value={mahasiswa?.provinsi}
                        />
                     </div>
                  )}
               </div>
               <div className="flex flex-col gap-4 w-1/2 rounded shadow-lg p-3">
                  <h4 className="text-center font-semibold text-xl">
                     Detail Orang Tua
                  </h4>
                  {waliMahasiswa !== null ? (
                     <div className="grid grid-cols-3 gap-x-2 gap-y-4 border-t pt-3">
                        <KeyValue keyName={"Nama"} value={waliMahasiswa.name} />
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
         <Button
            onClick={handleDeleteMahasiswa}
            error={true}
            className="w-max self-end mt-12">
            <AiFillDelete size={20} />
            Hapus Mahasiswa
         </Button>
      </section>
   );
};

const KeyValue = (props) => {
   return (
      <>
         <p className="flex justify-between text-slate-500">
            {props.keyName}
            <span>:</span>
         </p>
         <p className="col-span-2 w-full font-medium">{props.value}</p>
      </>
   );
};

export default DetailMahasiswa;
