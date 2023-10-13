import { useState } from "react";
import { superClient } from "../api/apiClient";
import { headerOptions } from "../constants/app";
import { toast } from "react-toastify";
import { toastConfig } from "../constants/toastConfig";

export const useMahasiswa = () => {
   const [mahasiswaIsLoading, setLoading] = useState(false);
   const [mahasiswaIsError, setError] = useState(false);
   const [mahasiswa, setMahasiswa] = useState(null);
   const [waliMahasiswa, setWaliMahasiswa] = useState(null);
   const [tagihan, setTagihan] = useState(null);
   const [transkrip, setTranskrip] = useState(null);
   const [hasilStudi, setHasilStudi] = useState(null);

   const getMahasiswa = async (pathUrl) => {
      const path = pathUrl == undefined || pathUrl == null ? "/" : pathUrl;

      setLoading(true);
      await superClient
         .get(`/mahasiswa${path}`, {
            headers: {
               ...headerOptions,
            },
         })
         .then((res) => {
            setMahasiswa(res.data.data);
            setWaliMahasiswa(res.data.data?.walimahasiswa);
            setTagihan(res.data.data?.tagihan_mahasiswa);
            setTranskrip(res.data.data?.transkrip);
            setHasilStudi(res.data.data?.hasil_studi);
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   const update = async (id, body) => {
      setLoading(true);
      await superClient
         .put(`/mahasiswa/${id}`, body, {
            headers: {
               "content-Type": "application/json",
               ...headerOptions,
            },
         })
         .then((res) => {
            toast.success("mahasiswa berhasil diupdate", toastConfig);
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   const deleteMahasiswa = async (nim) => {
      return await superClient.delete(`/mahasiswa/${nim}`, {
         headers: {
            ...headerOptions,
         },
      });
   };

   return {
      getMahasiswa,
      mahasiswaIsLoading,
      mahasiswaIsError,
      mahasiswa,
      update,
      deleteMahasiswa,
      waliMahasiswa,
      tagihan,
      transkrip,
      hasilStudi,
   };
};
