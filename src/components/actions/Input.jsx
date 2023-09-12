export const InputDefault = ({ showLabel, ...props }) => {
   return (
      <label
         htmlFor={props.id}
         className="border rounded text-slate-700 flex min-w-[300px] items-center px-2 gap-2 py-1 bg-slate-100">
         <span className="text-gray-400 text-sm capitalize whitespace-nowrap">
            {showLabel ? props.id : ""}:
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
      <label htmlFor="file">
         <input
            type="file"
            name="file"
            id="file"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            {...props}
         />
      </label>
   );
};

export const InputSelectSemester = ({ onChange }) => {
   return (
      <select
         name="semester"
         defaultValue="pilih semester"
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 py-2 rounded focus:bg-white"
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

export const InputSelectDefault = ({
   onChange,
   options,
   keyBody,
   ...props
}) => {
   return (
      <select
         {...props}
         className="text-sm focus:outline-emerald-400 bg-emerald-100 px-3 rounded py-3 focus:bg-white"
         onChange={onChange}>
         {props.defaultValue && (
            <option value={props.defaultValue} disabled>
               {props.defaultValue}
            </option>
         )}
         {options.map((item, i) => (
            <option value={item[keyBody]} key={i}>
               {item[keyBody]}
            </option>
         ))}
      </select>
   );
};
