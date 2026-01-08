import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, VaccinationEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Add Vaccination"
        icon={<VaccinationEmpty />}
        label="No Vaccination Records Yet"
        subTitle="Your vaccination details will appear here once you add them or your doctor updates them."
      />
    </div>
  );
};

export default Page;
