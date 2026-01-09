import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, SharedRecords } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Document"
        icon={<SharedRecords />}
        label="No Records Shared Yet"
        subTitle="You haven’t shared any records with doctors yet. Once you share reports, they will appear here along with the history of access."
      />
    </div>
  );
};

export default Page;
