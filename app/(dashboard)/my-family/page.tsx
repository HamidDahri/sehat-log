import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, MyFamilyEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Add Family Member"
        icon={<MyFamilyEmpty />}
        label="No Family Members Yet"
        subTitle="Start managing your family’s health records by adding their profiles here."
      />
    </div>
  );
};

export default Page;
