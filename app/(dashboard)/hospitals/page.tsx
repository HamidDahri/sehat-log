import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty } from "@/public/icons";
import HospitalEmpty from "@/public/icons/HospitalEmpty";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Link New Hospital"
        icon={<HospitalEmpty />}
        label="No Hospitals Linked"
        subTitle="You haven’t linked any hospitals yet. Once your doctor or lab shares reports or prescriptions, they’ll appear here automatically."
      />
    </div>
  );
};

export default Page;
