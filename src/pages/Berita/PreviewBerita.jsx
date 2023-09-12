import React, { useEffect } from "react";
import { useFetch } from "../../helpers";
import { useParams } from "react-router-dom";
import { Loader } from "../../components";

const PreviewBerita = () => {
   const { data, getDatas, fetchIsLoading } = useFetch();
   const { id } = useParams();

   useEffect(() => {
      getDatas(`/berita/${id}`);
   }, []);
   return (
      <section className="space-y-4 my-20 w-9/12 px-20">
         {fetchIsLoading ? (
            <div className="w-full flex justify-center items-center h-full">
               <Loader />
            </div>
         ) : (
            data !== null && (
               <>
                  <h2 className="font-bold text-xl">{data.title}</h2>
                  <div
                     dangerouslySetInnerHTML={{
                        __html: data.description,
                     }}></div>
               </>
            )
         )}
      </section>
   );
};

export default PreviewBerita;
