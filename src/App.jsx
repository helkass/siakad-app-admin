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
   DaftarTagihan,
} from "./pages";
import {
   UploadBerita,
   UploadDosen,
   UploadJadwalkuliah,
   UploadKHS,
   UploadMahasiswa,
   UploadMataKuliah,
   UploadOtherStudi,
   UploadPembayaran,
   UploadRincianPembayaran,
   UploadTagihanMahasiswa,
   UploadTranskrip,
} from "./pages/uploads";
import ProtectRoute from "./middleware/ProtectRoute";
import { KhsTemplate, ScrollToTop } from "./components";

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
                  <Route path=":id/khs" element={<KhsTemplate />} />
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
                  <Route path=":id">
                     <Route index element={<DetailPembayaran />} />
                     <Route path="tagihan" element={<DaftarTagihan />} />
                  </Route>
               </Route>
               <Route path="*" element={<Error />} />

               {/* upload pages */}
               <Route path="/uploads">
                  <Route path="mahasiswa" element={<UploadMahasiswa />} />
                  <Route path="dosen" element={<UploadDosen />} />
                  <Route path="pembayaran">
                     <Route index element={<UploadPembayaran />} />
                     <Route path=":id" element={<UploadRincianPembayaran />} />
                     <Route
                        path=":id/tagihan"
                        element={<UploadTagihanMahasiswa />}
                     />
                  </Route>
                  <Route path="study">
                     <Route path="matkul" element={<UploadMataKuliah />} />
                     <Route path="jadwal" element={<UploadJadwalkuliah />} />
                     <Route path="other" element={<UploadOtherStudi />} />
                  </Route>
                  <Route path="transkrip">
                     <Route index element={<UploadTranskrip />} />
                     <Route path="new" element={<UploadKHS />} />
                  </Route>
                  <Route path="berita" element={<UploadBerita />} />
               </Route>
            </Route>
         </Routes>
         <ScrollToTop />
      </div>
   );
}

export default App;
