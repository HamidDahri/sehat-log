import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty } from "@/public/icons";
import RaferralsEmpty from "@/public/icons/RaferralsEmpty";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload Document"
        icon={<RaferralsEmpty />}
        label="No Referrals Available Yet"
        subTitle="You don’t have any referrals at the moment. Once your doctor refers you to another specialist, your referral details will appear here."
      />
    </div>
  );
};

export default Page;
