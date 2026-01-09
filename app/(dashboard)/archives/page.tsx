import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel=" Learn How Archiving Works"
        icon={<DashboardEmpty />}
        label="No Archived Data Yet"
        subTitle="You haven’t archived any data yet. Archived data like old reports, prescriptions, or appointments will appear here."
      />
    </div>
  );
};

export default Page;
