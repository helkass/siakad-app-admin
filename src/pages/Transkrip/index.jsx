import KartuHasilStudi from "./KartuHasilStudi";
import { ButtonLinkAdd } from "../../components/Button";
import UploadLayout from "../../components/Layout/UploadLayout";

const Transkrip = () => {
   return (
      <UploadLayout title={"transkrip nilai"}>
         <div className="flex justify-between items-center">
            <ButtonLinkAdd
               path={"/transkrip"}
               title={`upload transkrip nilai`}
            />
         </div>
         <KartuHasilStudi />
      </UploadLayout>
   );
};

export default Transkrip;
