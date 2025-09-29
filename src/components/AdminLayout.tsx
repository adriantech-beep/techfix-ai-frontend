import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import ModeToggle from "./ModeToggle";

const AdminLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-full h-dvh overflow-hidden flex">
        <div className="flex flex-col gap-3 p-2">
          <ModeToggle />
        </div>
        <div className="h-full w-full p-4">
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
};

export default AdminLayout;
