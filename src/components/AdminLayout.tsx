import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
import { ThemeProvider } from "./providers/theme-provider";
import ModeToggle from "./ModeToggle";
import AvatarMenu from "./AvatarMenu";

const AdminLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="w-full h-dvh overflow-hidden flex">
          <div className="flex flex-col gap-3 p-2">
            <AvatarMenu />
            <ModeToggle />
          </div>
          <div className="h-full w-full p-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
