import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, ReportEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="New Appointment"
        icon={<ReportEmpty />}
        label="No Appointments Found"
        subTitle="Your appointments will appear here once your doctor schedules them or you upload related records."
      />
    </div>
  );
};

export default Page;
