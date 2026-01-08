import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, ReportEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Document"
        icon={<ReportEmpty />}
        label="No Reports Found"
        subTitle="Once your doctor or lab uploads your medical reports, they will appear here for you to view and download anytime."
      />
    </div>
  );
};

export default Page;
