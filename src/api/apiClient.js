import axios from "axios";

const baseURL =
   import.meta.env.MODE === "development"
      ? "http://localhost:5001/api/v1"
      : import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
   baseURL,
});

export const downloadClient = axios.create({
   baseURL,
   responseType: "blob",
});
