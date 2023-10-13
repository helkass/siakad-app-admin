import React, { useEffect } from "react";
import CardBerita from "../../components/card/CardBerita";
import UploadLayout from "../../components/Layout/UploadLayout";
import { ButtonLinkAdd } from "../../components/Button";
import { useFetch } from "../../helpers";

const Berita = () => {
   const { data, getDatas, deleteData, fetchIsLoading } = useFetch();
   const handleDelete = (id) => {
      deleteData(`/berita/${id}`, false, "/berita");
   };

   useEffect(() => {
      getDatas("/berita");
   }, []);
   return (
      <UploadLayout title={"Daftar Berita"}>
         <ButtonLinkAdd title={"Upload Berita"} path={"/berita"} />
         <div className="grid grid-cols-3 gap-2">
            {data !== null &&
               data.map((art, i) => (
                  <CardBerita
                     title={art.title}
                     image={art.image}
                     key={i}
                     href={`${art.id}`}
                     handleDelete={() => handleDelete(art.id)}
                     isLoading={fetchIsLoading}
                  />
               ))}
         </div>
      </UploadLayout>
   );
};

export default Berita;
