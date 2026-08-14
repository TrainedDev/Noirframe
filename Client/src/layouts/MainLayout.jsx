import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import ScrollToTop from "@/components/common/ScrollToTop";
import AppSidebar from "@/components/common/Sidebar/AppSidebar";
import { Outlet } from "react-router";
import { useState } from "react";
import AppErrorBoundary from "@/pages/Error/MovieErrorPage";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
<AppErrorBoundary>

      <div className="min-h-dvh w-full bg-black">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main>
          <ScrollToTop />
          <Outlet />
        </main>

        <Footer />
      </div>
      </AppErrorBoundary>    
  );
};

export default MainLayout;
