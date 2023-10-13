import {
   BarCategories,
   Button,
   InputDefault,
   Loader,
   UploadLayout,
} from "../../components";
import { useState } from "react";
import { useFetch } from "../../helpers";

/**
 * others data for studi
 */
const navCategories = ["tahun periode", "waktu penjadwalan"];
export default function UploadOtherStudi() {
   const [changeValue, setChangeValue] = useState({});
   const [navCategory, setNavCategory] = useState(navCategories[0]);

   // upload main function
   const { fetchIsLoading, postData } = useFetch();

   // change form input text
   function handleChangeValue(e) {
      setChangeValue(
         (prevValue) =>
            (prevValue = { ...prevValue, [e.target.name]: e.target.value })
      );
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if (navCategory === "tahun periode") {
         postData(
            "/tahun",
            {
               tahun_awal: changeValue.tahun_awal,
               tahun_akhir: changeValue.tahun_akhir,
            },
            {
               "Content-Type": "application/json",
            }
         );
      } else if (navCategory === "waktu penjadwalan") {
         postData(
            "/waktu",
            {
               waktu_mulai: changeValue.waktu_mulai,
               waktu_berakhir: changeValue.waktu_berakhir,
            },
            {
               "Content-Type": "application/json",
            }
         );
      }
   };

   return (
      <UploadLayout title={"Upload Other Data Studi"}>
         <BarCategories
            navCategory={navCategories}
            setActiveContent={(e) => setNavCategory(e)}
            activeContent={navCategory}
         />
         {fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            <form
               onSubmit={handleSubmit}
               className="flex flex-col gap-7 bg-white px-2 py-6">
               {navCategory === "tahun periode" && (
                  <FormDataYearPeriod handleChange={handleChangeValue} />
               )}
               {navCategory === "waktu penjadwalan" && (
                  <FormDataTimePeriod handleChange={handleChangeValue} />
               )}
               <Button upload type="submit" isLoading={fetchIsLoading}>
                  Tambah
               </Button>
            </form>
         )}
      </UploadLayout>
   );
}

const FormDataYearPeriod = ({ handleChange }) => {
   return (
      <>
         <InputDefault
            type="text"
            onChange={handleChange}
            name="tahun_awal"
            placeholder="2018"
            id={"Tahun Awal"}
         />
         <InputDefault
            type="text"
            onChange={handleChange}
            name="tahun_akhir"
            placeholder="2019"
            id={"Tahun Akhir"}
         />
      </>
   );
};

const FormDataTimePeriod = ({ handleChange }) => {
   return (
      <>
         <InputDefault
            type="text"
            onChange={handleChange}
            name="waktu_mulai"
            id={"Waktu Awal"}
            placeholder="10:30"
         />
         <InputDefault
            type="text"
            onChange={handleChange}
            name="waktu_berakhir"
            placeholder="12:30"
            id={"Waktu Berakhir"}
         />
      </>
   );
};
