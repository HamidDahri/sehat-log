import { DashboardCard } from "@/app/components";
import { Images } from "@/app/ui/images";
import {
  AppointmentsActiveIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  UnCheckIcon,
} from "@/public/icons";

const dashboardCards = [
  {
    value: 15,
    label: "Total Appointments",
    icon: <AppointmentsActiveIcon height="52" width="52" fill="white" />,
    illustration: Images.dashboard.dashCardIllu,

    gradientClass: "from-butterfly-blue to-jordy-blue",
    shadowColor: "#74C5EB",
  },
  {
    value: 12,
    label: "Completed",
    icon: <CheckCircleIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-emerald-500 to-emerald-400",
    shadowColor: "#34D399",
  },
  {
    value: 4,
    label: "Upcoming",
    icon: <ClockIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-amber-500 to-amber-400",
    shadowColor: "#FBBF24",
  },
  {
    value: 3,
    label: "Canceled",
    icon: <UnCheckIcon />,
    illustration: Images.dashboard.dashCardIllu,
    gradientClass: "from-red-500 to-red-400",
    shadowColor: "#F87171",
  },
];

const Page = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <DashboardEmptyState
    //     btnLabel="New Appointment"
    //     icon={<AppointmentsEmpty />}
    //     label="No Appointments Found"
    //     subTitle="Your appointments will appear here once your doctor schedules them or you upload related records."
    //   />
    // </div>
    <div className="p-4 lg:p-6 w-full lg:pt-26 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 lg:gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            value={card.value}
            label={card.label}
            icon={card.icon}
            illustration={card.illustration}
            gradientClass={card.gradientClass}
            shadowColor={card.shadowColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
