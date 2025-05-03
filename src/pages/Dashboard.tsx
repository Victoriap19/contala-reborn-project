
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { CreatorsSection } from "@/components/dashboard/CreatorsSection";

export default function Dashboard() {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine which section to show based on the path
  const getActiveSection = () => {
    if (path.includes("/proyectos")) {
      return "proyectos";
    } else if (path.includes("/creadores")) {
      return "creadores";
    } else {
      return "perfil";
    }
  };
  
  const activeSection = getActiveSection();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-contala-cream">
        <DashboardSidebar />
        <SidebarInset className="p-6">
          {activeSection === "perfil" && <UserProfile />}
          {activeSection === "proyectos" && <ProjectsSection />}
          {activeSection === "creadores" && <CreatorsSection />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
