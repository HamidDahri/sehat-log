"use client";
import { DashboardCard } from "@/app/components";
import { Images } from "@/app/ui/images";
import {
  HospitalCardIcon,
  LabIcon,
  PrescriptionIcon,
  RecordCardIcon,
  VaccineIcon,
} from "@/public/icons";

const Page = () => {
  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-5 gap-6">
        <DashboardCard
          value={18}
          label="Records"
          icon={<RecordCardIcon />}
          illustration={Images.dashboard.dashCardIllu}
          gradientClass="from-emerald-500 to-emerald-400"
        />
        <DashboardCard
          value={18}
          label="Prescriptions"
          icon={<PrescriptionIcon />}
          illustration={Images.dashboard.dashCardIllu}
          gradientClass="from-butterfly-blue to-jordy-blue"
        />
        <DashboardCard
          value={45}
          label="Records"
          icon={<LabIcon />}
          illustration={Images.dashboard.dashCardIllu}
          gradientClass="from-amber-500  to-amber-400"
        />
        <DashboardCard
          value={45}
          label="Records"
          icon={<VaccineIcon />}
          illustration={Images.dashboard.dashCardIllu}
          gradientClass="from-red-500 to-red-400"
        />
        <DashboardCard
          value={45}
          label="Records"
          icon={<HospitalCardIcon />}
          illustration={Images.dashboard.dashCardIllu}
          gradientClass="from-aztex-purple to-crocus-purple"
        />
      </div>
    </div>
  );
};

export default Page;
