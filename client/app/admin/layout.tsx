import AdminSidebar from "@/components/AdminSidebar";
import ConditionalNavBar from "@/components/ConditionalNavbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen ">
        {/* Persistent sidebar – doesn't remount on navigation */}
        <aside className=" ">
          <div className="">
            <AdminSidebar />
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1">
          <main className="p-6 md:p-8">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
