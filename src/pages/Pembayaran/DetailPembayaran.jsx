import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useFetch } from "../../helpers";
import { ToastContainer } from "react-toastify";
import {
   BarCategories,
   InputSelectSemester,
   InputDefault,
   Loader,
   Button,
   ButtonLinkAdd,
} from "../../components";
import { currencyFormatter } from "../../utilities/formatter";

const DetailPembayaran = () => {
   const { id } = useParams();
   const [changeValue, setChangeValue] = useState({});
   const { updateData, getDatas, data, fetchIsLoading, deleteData } =
      useFetch();
   const tahun = useFetch();
   const jurusan = useFetch();
   // jurusan categories
   const [activeContent, setActiveContent] = useState(
      jurusan.data !== null ? jurusan.data[0]?.name : "all"
   );
   const handleChangeValue = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handleUpdate = async (event) => {
      event.preventDefault();

      await updateData(`/pembayaran/${id}`, changeValue);
   };

   const handleDelete = async () => {
      await deleteData(`/pembayaran/${id}`, "/pembayaran");
   };

   useEffect(() => {
      getDatas(`/pembayaran/${id}`);
      tahun.getDatas("/tahun");
      jurusan.getDatas("/jurusan");
   }, []);

   return (
      <section className="my-12 w-9/12">
         <ToastContainer />
         {fetchIsLoading && tahun.fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            data !== null && (
               <>
                  {/* form updating detail pembayaran */}
                  <div className="flex flex-col gap-y-7 mb-6">
                     <h2 className="text-2xl text-yellow-500 font-semibold">
                        Detail pembayaran semester {data.semester} -{" "}
                        {data.tahun_akademik.tahun_mulai}/
                        {data.tahun_akademik.tahun_akhir}
                     </h2>
                     <form
                        onSubmit={handleUpdate}
                        className="grid sm:grid-cols-2 gap-3">
                        <InputDefault
                           id="jumlah"
                           name="jumlah"
                           type="text"
                           showLabel={true}
                           defaultValue={data.jumlah}
                           onChange={handleChangeValue}
                        />
                        {/* select options days */}
                        <select
                           name="tahun"
                           id="tahun"
                           defaultValue={data.tahun}
                           className="text-sm focus:outline-emerald-400 py-3 bg-emerald-100 px-3 rounded focus:bg-white"
                           onChange={handleChangeValue}>
                           {tahun.data?.map((h, i) => (
                              <option value={h.id} key={i}>
                                 {h.tahun_mulai}/{h.tahun_akhir}
                              </option>
                           ))}
                        </select>
                        {/* select options waktu */}
                        <InputSelectSemester
                           defaultValue={data.semester}
                           onChange={handleChangeValue}
                        />
                        <Button
                           type="submit"
                           update={true}
                           isLoading={fetchIsLoading}>
                           <AiFillEdit size={20} />
                           Update
                        </Button>
                     </form>
                     <div className="mt-8 flex justify-between">
                        <Link to={`/pembayaran/${id}/tagihan`}>
                           <Button>Tagihan Mahasiswa</Button>
                        </Link>
                        <Button
                           onClick={handleDelete}
                           type="button"
                           className="w-max"
                           error>
                           <AiFillDelete size={20} />
                           Hapus Pembayaran
                        </Button>
                     </div>
                  </div>
                  {/* rincian atau uraian pembayaran */}
                  {/* categories jurusan */}
                  {!jurusan.fetchIsLoading && jurusan.data !== null && (
                     <BarCategories
                        setActiveContent={(e) => setActiveContent(e)}
                        activeContent={activeContent}
                        navCategory={jurusan.data
                           .map((j) => j.name)
                           .concat(["all"])}
                     />
                  )}
                  <TableRincianPembayaran jurusan={activeContent === "all"}>
                     {activeContent === "all"
                        ? data?.detail_pembayaran.map((detail) => (
                             <TBody detail={detail} key={detail.id} jurusan />
                          ))
                        : data?.detail_pembayaran
                             .filter((d) => d.jurusan === activeContent)
                             .map((detail) => (
                                <TBody detail={detail} key={detail.id} />
                             ))}
                  </TableRincianPembayaran>
                  <div className="float-right my-12">
                     <ButtonLinkAdd
                        path={`/pembayaran/${id}`}
                        title={"tambahkan rincian"}
                     />
                  </div>
               </>
            )
         )}
      </section>
   );
};

const TBody = ({ detail, jurusan }) => {
   const { deleteData } = useFetch();
   const handleDelete = () => {
      deleteData("/pembayaran/detail/" + detail.id);
   };
   return (
      <tr className="text-center capitalize border-b">
         <td className="py-1">{detail.name}</td>
         <td className="py-1">{currencyFormatter(detail.nominal)}</td>
         {jurusan && <td className="py-1">{detail.jurusan}</td>}
         <td className="py-1">
            <Button error className="mx-auto" onClick={handleDelete}>
               <AiFillDelete size={18} />
            </Button>
         </td>
      </tr>
   );
};

const TableRincianPembayaran = ({ children, jurusan }) => {
   return (
      <table className="w-4/6 table-auto my-6">
         <thead className="bg-slate-50">
            <tr>
               <th className="px-4 py-1">Uraian</th>
               <th className="px-4 py-1">Jumlah</th>
               {jurusan && <th className="px-4 py-1">Jurusan</th>}
               <th className="px-4 py-1">Delete</th>
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   );
};

export default DetailPembayaran;
