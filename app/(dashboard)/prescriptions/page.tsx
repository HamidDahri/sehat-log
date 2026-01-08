import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty } from "@/public/icons";
import PrescriptionsEmpty from "@/public/icons/PrescriptionsEmpty";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Prescription"
        icon={<PrescriptionsEmpty />}
        label="No Prescriptions Yet"
        subTitle="Your prescriptions will appear here once your doctor uploads them or you add them manually."
      />
    </div>
  );
};

export default Page;
