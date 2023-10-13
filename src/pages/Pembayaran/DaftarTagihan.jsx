import React, { useEffect, useState } from "react";
import {
   Button,
   ButtonLinkAdd,
   InputDefault,
   Loader,
   ModalDefaultContainer,
   UploadLayout,
} from "../../components";
import { useFetch } from "../../helpers";
import { useParams, useSearchParams } from "react-router-dom";
import { currencyFormatter } from "../../utilities/formatter";
import { BiSolidDetail } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const DaftarTagihan = () => {
   const tagihan = useFetch();
   const { id } = useParams();
   const [isOpenModal, setOpenModal] = useState(false);
   const [changeValue, setChangeValue] = useState({});
   const [dataModal, setDataModal] = useState({});
   const [status, setStatus] = useState("belum lunas");
   const [searchByNIM, setSearchByNIM] = useState("");
   const [searchParams, setSearchParams] = useSearchParams();

   const handleChange = (e) => {
      setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
   };

   const handleChangeStatus = () => {
      if (status === "belum lunas") {
         setStatus("lunas");
         return;
      }

      setStatus("belum lunas");
   };

   const handleCloseModal = () => {
      setChangeValue({});
      setDataModal({});
      setOpenModal(false);
   };

   const handleOpenModal = (nim) => {
      // filtering
      const d = tagihan.data.filter((tag) => tag.nim === nim);
      setDataModal(d[0]);

      setTimeout(() => {
         setOpenModal(true);
      }, 500);
   };

   const handleUpdate = (e) => {
      e.preventDefault();

      tagihan.updateData(
         `/tagihan/${dataModal.id}`,
         changeValue,
         `/tagihan?pembayaran=${id}`
      );

      // restart value change
      setChangeValue({});
   };

   const handleSearchByNIM = (e) => {
      e.preventDefault();

      if (searchByNIM.length === 0) {
         searchParams.delete("nim");
         tagihan.getDatas(`/tagihan?pembayaran=${id}`);
      } else {
         setSearchParams({ nim: searchByNIM });
         tagihan.getDatas(`/tagihan?pembayaran=${id}&nim=${searchByNIM}`);
      }
   };

   const handleDeleteAllTagihan = () => {
      tagihan.deleteData(`/tagihan/many/${id}`, false, `/tagihan/many/${id}`);
   };

   useEffect(() => {
      const isNim = searchParams.has("nim");
      if (isNim) {
         tagihan.getDatas(`/tagihan?pembayaran=${id}&${searchParams}`);
      } else {
         tagihan.getDatas(`/tagihan?pembayaran=${id}`);
      }
   }, []);

   return (
      <UploadLayout title={"Daftar Tagihan Mahasiswa"}>
         <form onSubmit={handleSearchByNIM} className="flex gap-4">
            <label
               htmlFor="search"
               className="border rounded text-slate-700 flex min-w-[300px] items-center px-2 gap-2 py-1 bg-white shadow-sm">
               <FiSearch size={20} className="text-slate-400" />
               <input
                  name="search"
                  id="search"
                  defaultValue={
                     searchParams.has("nim")
                        ? searchParams.get("nim")
                        : searchByNIM
                  }
                  onChange={(e) => setSearchByNIM(e.target.value)}
                  placeholder="cari berdasarkan nama mahasiswa"
                  className="bg-transparent focus:outline-none w-full placeholder:text-sm"
               />
            </label>
            <Button type="submit">Cari</Button>
         </form>
         {/* modal */}
         <ModalDefaultContainer
            isOpen={isOpenModal}
            setOpen={() => handleCloseModal()}>
            <form onSubmit={handleUpdate} className="space-y-6">
               <KeyValue keyName={"NIM"} value={dataModal?.nim} />
               <KeyValue keyName={"Nama"} value={dataModal?.mahasiswa?.name} />
               <KeyValue
                  keyName={"Jurusan"}
                  value={dataModal?.mahasiswa?.jurusan}
               />
               <KeyValue
                  keyName={"Semester"}
                  value={dataModal?.mahasiswa?.semester}
               />
               <KeyValue
                  keyName={"Kelas"}
                  value={dataModal?.mahasiswa?.kelas}
               />
               <strong className="mt-2 block text-emerald-600">
                  Jumlah yang sudah dibayarkan
               </strong>
               <InputDefault
                  name="nominal"
                  id="nominal"
                  defaultValue={dataModal?.nominal}
                  onChange={handleChange}
               />
               <div className="flex items-center justify-between space-x-8">
                  <select
                     name="status"
                     defaultValue={dataModal.status}
                     className="text-sm focus:outline-emerald-400"
                     onChange={handleChange}
                     id="status">
                     <option selected value={dataModal.status}>
                        {dataModal.status}
                     </option>
                     <option
                        value={
                           dataModal.status == "belum lunas"
                              ? "lunas"
                              : "belum lunas"
                        }>
                        {dataModal.status == "belum lunas"
                           ? "lunas"
                           : "belum lunas"}
                     </option>
                  </select>
                  <p className="text-xs text-slate-600">
                     jumlah yang harus dibayarkan{" "}
                     <strong className="text-xs text-slate-600">
                        Rp.
                        {currencyFormatter(
                           dataModal?.pembayaran_tagihan?.jumlah
                        )}
                     </strong>
                  </p>
               </div>
               <Button
                  update
                  className="float-right"
                  isLoading={tagihan.fetchIsLoading}
                  type="submit">
                  Update
               </Button>
            </form>
         </ModalDefaultContainer>
         {/* end modal */}
         {tagihan.fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : tagihan.data !== null ? (
            <div className="flex flex-col gap-4">
               <div className="flex justify-between">
                  <Button onClick={handleChangeStatus}>{status}</Button>
                  <Button
                     isLoading={tagihan.fetchIsLoading}
                     error
                     className="flex-end w-max"
                     onClick={handleDeleteAllTagihan}>
                     hapus semua tagihan
                  </Button>
               </div>
               <table className="table-auto w-full bg-white">
                  <thead
                     className={`border-b mb-3 capitalize font-semibold mt-3 px-2`}>
                     {/* header table */}
                     <tr>
                        <th className="pl-1 text-left py-2">NIM</th>
                        <th className="pl-1 text-left py-2">Dibayarkan</th>
                        <th className="pl-1 text-left py-2">Status</th>
                        <th className="pl-1 text-left py-2">Detail</th>
                     </tr>
                  </thead>
                  {/* table contents */}
                  <tbody>
                     {tagihan.data
                        ?.filter((d) => d.status === status)
                        .map((tag, idx) => (
                           <tr
                              key={idx}
                              className={`
                              hover:bg-emerald-100
                                 ${idx % 2 === 0 && "bg-emerald-50"}`}>
                              <td className="py-1">{tag.nim}</td>
                              <td className="py-1">
                                 Rp. {currencyFormatter(tag.nominal)}
                              </td>
                              <td className="py-1">{tag.status}</td>
                              <td className="py-1">
                                 <Button
                                    onClick={() => handleOpenModal(tag.nim)}>
                                    <BiSolidDetail />
                                 </Button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p>fetch Data Error</p>
         )}
         <ButtonLinkAdd
            className={"fixed right-10 bottom-10"}
            path={`/pembayaran/${id}/tagihan`}
            title="Tambah Tagihan Mahasiswa"
         />
      </UploadLayout>
   );
};

const KeyValue = ({ keyName, value }) => {
   return (
      <div className="flex justify-between my-1">
         <span>{keyName} :</span>
         <span>{value}</span>
      </div>
   );
};

export default DaftarTagihan;
