import React from "react";
import logo from "../../assets/university-logo.png";

export default function KhsTemplate() {
   const name = `Nama Mahasiswa &ensp; helka septyawans`;
   return (
      <section>
         <header
            id="template-khs"
            className="border-b-2 border-black mt-3 relative outline-b-2 flex gap-3 items-center">
            {/* logo */}
            <div className="w-3/12 p-4 flex items-center jusfify-center">
               <img src={logo} className="w-[120px]" alt="logo" />
            </div>
            <div className="flex text-sm text-center flex-col gap-1 font-md">
               <h2 className="text-2xl mb-1 font-bold">IAI AL MUHAMMAD CEPU</h2>
               <p>Alamat : Jalan Blora Nomor 151 Cepu - Blora - Jawa Tengah</p>
               <p className="mt-1">Kodepos : 58312, Telepon : (0296) 421515</p>
               <p>
                  Website : www.staiamc.ac.id | Email : stai_amc@yahoo.co.id |
                  Faximile : (0296) 425136
               </p>
            </div>
         </header>
         {/* head identifier */}
         <div className="space-y-1">
            <h2 className="text-center my-6 text-xl font-bold">
               KARTU HASIL STUDI (KHS)
            </h2>
            <div className="flex gap-24">
               <div>
                  <Head name={"nama mahasiswa"} val={"Helka"} />
                  <Head
                     name={"program studi"}
                     val={"S1 Pendidikan Agama Islam"}
                  />
                  <Head name={"semester"} val={7} />
               </div>
               <div>
                  <Head name={"NIM"} val={"1234.123.123"} />
                  <Head name={"periode"} val={"2022/2023 Ganjil"} />
               </div>
            </div>
         </div>
         {/* results */}
         <table border={2} className="w-full mt-5">
            <tr>
               <Th rowSpan={2}>No</Th>
               <Th rowSpan={2}>Kode Mata Kuliah</Th>
               <Th rowSpan={2}>Nama Mata Kuliah</Th>
               <Th rowSpan={2}>SKS</Th>
               <Th colSpan={3}>Nilai</Th>
               <Th rowSpan={3}>SKS * Indeks</Th>
            </tr>
            <tr>
               <Th>Angka</Th>
               <Th>Huruf</Th>
               <Th>Indeks</Th>
            </tr>
            <tbody>
               {/* editable content here */}
               <tr>
                  <Td styles="text-end">1</Td>
                  <Td styles="text-center">8974987</Td>
                  <Td>Baris 1, Kolom 3</Td>
                  <Td styles="text-end">4</Td>
                  <Td styles="text-end">82.0</Td>
                  <Td styles="text-center">B+</Td>
                  <Td styles="text-end">3.50</Td>
                  <Td styles="text-end">7.50</Td>
               </tr>
               {/* footer content */}
               <tr>
                  <Td styles="text-end font-bold" colspan="3">
                     Total SKS
                  </Td>
                  <Td styles="text-end font-bold">20</Td>
                  <Td colspan="3"></Td>
                  <Td styles="text-end">87.5</Td>
               </tr>
               <tr>
                  <Td styles="text-end font-bold" colspan="7">
                     IPS (Indeks Prestasi Semester)
                  </Td>
                  <Td styles="text-end">3.35</Td>
               </tr>
               <tr>
                  <Td styles="text-end font-bold" colspan="7">
                     IPK (Indeks Prestasi Komulatif)
                  </Td>
                  <Td styles="text-end">3.35</Td>
               </tr>
            </tbody>
         </table>
         <p className="italic mt-4">
            Batas SKS yang bisa diambil di semester berikutnya adalah{" "}
            <strong>24 SKS</strong>
         </p>
         {/* ttd */}
         <div className="flex justify-end items-center mt-3 text-center">
            <div className="flex flex-col">
               <p>Prodi, 07 Maret 2023</p>
               <p>Biro Administras & Akademik (BAAK)</p>
               <div className="mt-20 border-b-2 border-black ">
                  <strong>MUHAMAD WAHYUDIN</strong>
               </div>
               <p>2117128303</p>
            </div>
         </div>
      </section>
   );
}

const Head = ({ name, val }) => {
   return (
      <div className="grid capitalize grid-cols grid-cols-custom-2">
         <strong>{name}</strong>
         <span>:&ensp;{val}</span>
      </div>
   );
};

const Th = (props) => {
   return (
      <th className="border-2 border-black py-1" {...props}>
         {props.children}
      </th>
   );
};

const Td = (props) => {
   return (
      <td className={`p-2 border-2 border-black ${props.styles}`} {...props}>
         {props.children}
      </td>
   );
};
