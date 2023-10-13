import { useEffect } from "react";
import { useFetch } from "../../helpers";

export const InputDefault = ({ showLabel, ...props }) => {
   return (
      <label
         htmlFor={props.id}
         className="border rounded text-slate-700 flex min-w-[300px] items-center px-2 gap-2 py-1 shadow-sm bg-white">
         <span className="text-gray-400 text-sm capitalize whitespace-nowrap">
            {showLabel ? props.id : ""}
         </span>
         <input
            {...props}
            className="bg-transparent focus:outline-none w-full placeholder:text-sm text-md"
         />
      </label>
   );
};

export const InputFile = (props) => {
   return (
      <div className="flex flex-col gap-1">
         <label htmlFor="file" className="shadow-sm bg-white p-1">
            <input
               type="file"
               name="file"
               id="file"
               className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
               {...props}
            />
         </label>
         <span className="text-xs text-gray-400">
            file type accepted{" "}
            {props.accept
               .toString()
               .split(",")
               .map((i) => i)}
         </span>
      </div>
   );
};

export const InputSelectSemester = ({ onChange, defaultValue }) => {
   return (
      <select
         name="semester"
         defaultValue={defaultValue || "pilih semester"}
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 py-2 rounded focus:bg-white shadow-sm"
         onChange={onChange}
         id="semester">
         <option disabled value="pilih semester">
            pilih semester
         </option>
         <option value="ganjil">Ganjil</option>
         <option value="genap">Genap</option>
      </select>
   );
};
export const InputSelectSemesterByNumber = ({ onChange }) => {
   return (
      <select
         name="semester"
         defaultValue={"pilih semester"}
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 py-2 rounded focus:bg-white shadow-sm"
         onChange={onChange}
         id="semester">
         <option disabled value="pilih semester" selected>
            pilih semester
         </option>
         {Array.from(Array(14)).map((num, idx) => (
            <option value={idx + 1} key={idx}>
               {idx + 1}
            </option>
         ))}
      </select>
   );
};

export const InputSelectDefault = ({
   onChange,
   options,
   keyBody,
   none,
   ...props
}) => {
   return (
      <select
         {...props}
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 rounded py-3 focus:bg-white shadow-sm"
         onChange={onChange}>
         {props.defaultValue && (
            <option value={props.defaultValue} selected disabled>
               {props.defaultValue}
            </option>
         )}
         {none && <option value="none">none</option>}
         {options.map((item, i) => (
            <option value={item[keyBody]} key={i}>
               {item[keyBody]}
            </option>
         ))}
      </select>
   );
};

export const InputSelectTahunAkademik = ({ limit, ...props }) => {
   const years = useFetch();

   const isFetch = !years.fetchIsLoading && years.data !== null;
   useEffect(() => {
      years.getDatas("/tahun");
   }, []);
   return (
      <select
         {...props}
         name="tahun"
         defaultValue={props.defaultValue || "pilih tahun"}
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 py-2 rounded focus:bg-white shadow-sm"
         id="tahun">
         <option disabled value="pilih tahun">
            Pilih Tahun
         </option>
         {isFetch &&
            !limit &&
            years.data.map((year) => (
               <option value={year.id} key={year.id}>
                  {year.tahun_mulai}/{year.tahun_akhir}
               </option>
            ))}
         {isFetch &&
            limit &&
            years.data
               .filter((y) => y.tahun_mulai >= limit)
               .map((year) => (
                  <option value={year.id} key={year.id}>
                     {year.tahun_mulai}/{year.tahun_akhir}
                  </option>
               ))}
      </select>
   );
};
