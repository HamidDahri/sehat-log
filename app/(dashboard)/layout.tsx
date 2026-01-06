import { Sidebar } from "../components";
import TopBar from "../components/ui/layout/TopBar";
import { SidebarProvider } from "../context/SidebarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 pt-[200px] bg-white">
          <TopBar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
