import { Sidebar } from "../components";
import TopBar from "../components/ui/layout/TopBar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="bg-white flex">
        <Sidebar />
        <TopBar />
        <main className="w-full   bg-white">{children}</main>
      </div>
    </SidebarProvider>
  );
}
