import { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../api/apiClient";
import { toastConfig } from "../constants/toastConfig";
import { useNavigate } from "react-router-dom";

export const useFetch = () => {
   const [fetchIsLoading, setLoading] = useState(false);
   const [fetchIsError, setError] = useState(false);
   const [fetchIsSuccess, setSuccess] = useState(false);
   const [data, setData] = useState(null);
   const navigate = useNavigate();

   const postData = async (url, body, config, refetchUrl) => {
      setLoading(true);
      await apiClient
         .post(url, body, {
            headers: {
               ...config,
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
            },
         })
         .then((res) => {
            toast.success("berhasil menambahkan data", toastConfig);
            setSuccess(true);
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => {
            getDatas(refetchUrl);
            setLoading(false);
         });
   };

   const getDatas = async (url, params) => {
      setLoading(true);
      await apiClient
         .get(url, {
            params: params,
            headers: {
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
            },
         })
         .then((res) => {
            setData(res.data.data);
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   // content-type constants of json body
   const updateData = async (url, body, refetchUrl) => {
      setLoading(true);
      await apiClient
         .put(url, body, {
            headers: {
               "content-Type": "application/json",
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
            },
         })
         .then((res) => {
            toast.success("data berhasil diupdate", toastConfig);
            if (refetchUrl) {
               getDatas(refetchUrl);
            }
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const deleteData = async (url, redirectUrl, refetchUrl) => {
      setLoading(true);
      await apiClient
         .delete(url, {
            headers: {
               api_key_siakad: JSON.parse(
                  localStorage.getItem("api_key_siakad")
               ),
               admin_key_siakad: JSON.parse(
                  localStorage.getItem("admin_key_siakad")
               ),
            },
         })
         .then((res) => {
            toast.success("data berhasil delete", toastConfig);

            if (redirectUrl) {
               setTimeout(() => {
                  navigate(redirectUrl);
               }, 2500);
            }

            if (refetchUrl) {
               getDatas(refetchUrl);
            }
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => setLoading(false));
   };

   return {
      fetchIsLoading,
      fetchIsError,
      fetchIsSuccess,
      postData,
      getDatas,
      data,
      updateData,
      deleteData,
   };
};
