import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, DoctorsEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Document"
        icon={<DoctorsEmpty />}
        label="No doctors added yet"
        subTitle="You can add your primary care physician or specialists here to share your records easily."
      />
    </div>
  );
};

export default Page;
