import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/Layout";
import {
   Mahasiswa,
   Beranda,
   Study,
   Settings,
   Login,
   Error,
   Ruangan,
   Transkrip,
   DetailMahasiswa,
   UpdateMahasiswa,
   Pembayaran,
   DetailPembayaran,
   Berita,
   PreviewBerita,
   DetailMataKuliah,
   DetailJadwalKRS,
   Dosen,
} from "./pages";
import {
   UploadBerita,
   UploadDosen,
   UploadJadwalkuliah,
   UploadMahasiswa,
   UploadMataKuliah,
   UploadPembayaran,
   UploadTranskrip,
} from "./pages/uploads";
import ProtectRoute from "./middleware/ProtectRoute";

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={"/beranda"} />} />
            <Route
               element={
                  <ProtectRoute>
                     <DashboardLayout />
                  </ProtectRoute>
               }>
               <Route path="beranda" element={<Beranda />} />
               <Route path="mahasiswa">
                  <Route index element={<Mahasiswa />} />
                  <Route path=":id" element={<DetailMahasiswa />} />
                  <Route path=":id/update" element={<UpdateMahasiswa />} />
               </Route>
               <Route path="dosen" element={<Dosen />} />
               <Route path="study">
                  <Route index element={<Study />} />
                  <Route path="matkul/:id" element={<DetailMataKuliah />} />
                  <Route path="krs/:id" element={<DetailJadwalKRS />} />
               </Route>
               <Route path="berita">
                  <Route index element={<Berita />} />
                  <Route path=":id" element={<PreviewBerita />} />
               </Route>
               <Route path="ruangan" element={<Ruangan />} />
               <Route path="transkrip" element={<Transkrip />} />
               <Route path="settings" element={<Settings />} />
               <Route path="pembayaran">
                  <Route index element={<Pembayaran />} />
                  <Route path=":id" element={<DetailPembayaran />} />
               </Route>
               <Route path="*" element={<Error />} />

               {/* upload pages */}
               <Route path="/uploads">
                  <Route path="mahasiswa" element={<UploadMahasiswa />} />
                  <Route path="dosen" element={<UploadDosen />} />
                  <Route path="pembayaran" element={<UploadPembayaran />} />
                  <Route path="matkul" element={<UploadMataKuliah />} />
                  <Route path="transkrip" element={<UploadTranskrip />} />
                  <Route path="jadwal" element={<UploadJadwalkuliah />} />
                  <Route path="berita" element={<UploadBerita />} />
               </Route>
            </Route>
         </Routes>
      </div>
   );
}

export default App;
