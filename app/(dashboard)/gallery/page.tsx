import { DashboardEmptyState } from "@/app/components";
import { DashboardEmpty, GalleryEmpty } from "@/public/icons";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardEmptyState
        btnLabel="Upload to Gallery"
        icon={<GalleryEmpty />}
        label="No Media in Your Gallery"
        subTitle="Your uploaded medical images & media will appear here. Start by uploading your first file."
      />
    </div>
  );
};

export default Page;
