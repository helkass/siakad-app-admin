import { useState } from "react";
import { toast } from "react-toastify";
import { downloadClient } from "../api/apiClient";
import { toastConfig } from "../constants/toastConfig";
import { headerOptions } from "../constants/app";
import fileDownload from "js-file-download";

export const useDownloadFile = () => {
   const [downloadIsLoading, setLoading] = useState(false);
   const [downloadIsError, setError] = useState(false);

   const downloadFile = async (id, fileName) => {
      setLoading(true);
      // remove path  = uploads\
      id = id.toString().split("\\")[1];

      await downloadClient
         .get(`/download/${id}`, {
            headers: {
               ...headerOptions,
            },
         })
         .then((res) => {
            // generate file name
            id = id.toString().split("-")[1];
            fileDownload(res.data, `${fileName}-${id}`);
            toast.success("file telah didownload", toastConfig);
         })
         .catch((err) => {
            toast.error(err.response?.data.error, toastConfig);
            setError(true);
         })
         .finally(() => setLoading(false));
   };
   return {
      downloadIsLoading,
      downloadIsError,
      downloadFile,
   };
};
