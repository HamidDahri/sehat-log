import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Document"
        icon={<DashboardEmpty />}
        label="No Records Found"
        subTitle=" Your health records will appear here once you start uploading them
            or your doctor shares them with you."
      />
    </div>
  );
};

export default Page;
