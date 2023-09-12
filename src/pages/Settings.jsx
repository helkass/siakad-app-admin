import React, { useEffect, useState } from "react";
import { UploadLayout, InputDefault, Button, Loader } from "../components";
import { useFetch } from "../helpers";

const Settings = () => {
   const { getDatas, data, fetchIsLoading, updateData } = useFetch();
   const [changeValue, setChangeValue] = useState({});

   const handleChange = (e) => {
      setChangeValue(
         (prev) => (prev = { ...prev, [e.target.name]: e.target.value })
      );
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      updateData(`/super/${data[0]?.id}`, changeValue, {
         "Content-Type": "application/json",
      });
   };

   console.log(data);

   useEffect(() => {
      getDatas("/super");
   }, []);
   return (
      <UploadLayout title={"Admin Authentication"}>
         {fetchIsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
               <Loader />
            </div>
         ) : (
            data !== null && (
               <form onSubmit={handleSubmit} className="space-y-4">
                  <InputDefault
                     name="username"
                     id="username"
                     defaultValue={data[0].username}
                     onChange={handleChange}
                  />
                  <InputDefault
                     name="password"
                     id="password"
                     type="password"
                     defaultValue={data[0].password}
                     onChange={handleChange}
                  />
                  <Button isLoading={fetchIsLoading} update type="submit">
                     Update
                  </Button>
               </form>
            )
         )}
      </UploadLayout>
   );
};

export default Settings;
