import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { InputDefault } from "../../components/actions/Input";
import { useFetch, useMahasiswa } from "../../helpers";
import Loader from "../../components/Loader";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Button";

const UpdateMahasiswa = () => {
   const { id } = useParams();
   const { mahasiswa, getMahasiswa, mahasiswaIsLoading, update } =
      useMahasiswa();
   const jurusan = useFetch();
   const [changeValue, setChangeValue] = useState({});

   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handleUpdate = async (event) => {
      event.preventDefault();

      await update(id, changeValue);
   };

   useEffect(() => {
      getMahasiswa(`/${id}`);
      jurusan.getDatas();
   }, []);

   return (
      <section className="my-12 w-9/12">
         <ToastContainer />
         {mahasiswaIsLoading && jurusan.fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            mahasiswa !== null &&
            jurusan.data !==
               null(
                  <div className="grid gap-y-7">
                     <h2 className="text-2xl text-yellow-500 font-semibold capitalize">
                        Update mahasiswa : {mahasiswa.name}
                     </h2>
                     <form
                        onSubmit={handleUpdate}
                        className="grid sm:grid-cols-2 gap-3">
                        <InputDefault
                           name="name"
                           id="name"
                           showLabel
                           defaultValue={mahasiswa.name}
                           onChange={handleChangeValue}
                        />
                        <InputDefault
                           id="nim"
                           name="nim"
                           showLabel
                           defaultValue={mahasiswa.nim}
                           onChange={handleChangeValue}
                        />
                        <InputDefault
                           id="kelas"
                           name="kelas"
                           showLabel
                           defaultValue={mahasiswa.kelas}
                           onChange={handleChangeValue}
                        />
                        <InputDefault
                           id="password"
                           name="password"
                           type="password"
                           showLabel
                           defaultValue={mahasiswa.password}
                           onChange={handleChangeValue}
                        />
                        <select
                           name="jurusan"
                           showLabel
                           defaultValue={mahasiswa.jurusan}
                           className="text-sm focus:outline-slate-400 border rounded text-slate-700 bg-slate-100"
                           onChange={handleChangeValue}
                           id="jurusan">
                           {jurusan.data?.map((jurusan, idx) => (
                              <option value={jurusan.name} key={idx}>
                                 {jurusan.name}
                              </option>
                           ))}
                        </select>
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.semester}
                           name="semester"
                           id="semester"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.tahun}
                           name="tahun"
                           id="tahun"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.phone}
                           name="phone"
                           id="phone"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.email}
                           name="email"
                           id="email"
                           type="email"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.alamat}
                           name="alamat"
                           showLabel
                           id="alamat"
                           type="text"
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.kota}
                           name="kota"
                           id="kota"
                           type="text"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.provinsi}
                           name="provinsi"
                           id="provinsi"
                           type="text"
                           showLabel
                        />
                        <InputDefault
                           onChange={handleChangeValue}
                           defaultValue={mahasiswa.born}
                           name="born"
                           showLabel
                           id="born"
                           type="text"
                        />
                        <Button
                           type="submit"
                           update
                           isLoading={mahasiswaIsLoading}>
                           <AiFillEdit size={20} />
                           Update
                        </Button>
                     </form>
                  </div>
               )
         )}
      </section>
   );
};

export default UpdateMahasiswa;
