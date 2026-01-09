import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, MyDiseasesEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Add Disease"
        icon={<MyDiseasesEmpty />}
        label="No Diseases Found"
        subTitle="Your diagnosed diseases will appear here once your doctor updates your record or you add them."
      />
    </div>
  );
};

export default Page;
