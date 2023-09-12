import React from "react";
import { Button, InputDefault, UploadLayout } from "../../components";
import { useFetch } from "../../helpers";

const UploadDosen = () => {
   const { fetchIsLoading, postData } = useFetch();
   const [changeValue, setChangeValue] = React.useState({});
   const handleChange = (e) => {
      setChangeValue(
         (prevValue) =>
            (prevValue = { ...prevValue, [e.target.name]: e.target.value })
      );
   };

   function handleSubmit(e) {
      e.preventDefault();
      postData("/dosen", changeValue, {
         "Content-Type": "application/json",
      });
   }

   return (
      <UploadLayout title={"Tambah data dosen"}>
         <form onSubmit={handleSubmit} className="space-y-4">
            <InputDefault
               name="name"
               placeholder="nama dosen"
               id="name"
               required
               onChange={handleChange}
            />
            <InputDefault
               name="nik"
               id="nik"
               required
               placeholder="nik dosen"
               onChange={handleChange}
            />
            <Button isLoading={fetchIsLoading} upload type="submit">
               Tambah
            </Button>
         </form>
      </UploadLayout>
   );
};

export default UploadDosen;
