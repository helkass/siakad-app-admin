import KartuHasilStudi from "./KartuHasilStudi";
import { ButtonLinkAdd } from "../../components/Button";
import UploadLayout from "../../components/Layout/UploadLayout";

const Transkrip = () => {
   return (
      <UploadLayout title={"transkrip - Rencana Studi"}>
         <div className="flex justify-between items-center">
            <ButtonLinkAdd path={"/transkrip"} title={`upload rencana studi`} />
            <ButtonLinkAdd path={"/transkrip/new"} title={`upload khs`} />
         </div>
         <KartuHasilStudi />
      </UploadLayout>
   );
};

export default Transkrip;
