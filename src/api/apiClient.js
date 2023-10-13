import axios from "axios";

const baseURL = import.meta.env.MODE
   ? "http://localhost:5001/api/v1"
   : import.meta.env.VITE_API_URL;
// const baseURL = "http://localhost:5001/api/v1";

export const apiClient = axios.create({
   baseURL,
});

export const superClient = axios.create({
   baseURL,
   headers: {
      api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
      admin_key_siakad: JSON.parse(localStorage.getItem("admin_key_siakad")),
   },
});

export const downloadClient = axios.create({
   baseURL,
   headers: {
      api_key_siakad: JSON.parse(localStorage.getItem("api_key_siakad")),
      admin_key_siakad: JSON.parse(localStorage.getItem("admin_key_siakad")),
   },
   responseType: "blob",
});
