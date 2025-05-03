
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { CreatorProfile } from "@/components/dashboard/CreatorProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { CreatorsSection } from "@/components/dashboard/CreatorsSection";
import { ConvocatoriasSection } from "@/components/dashboard/ConvocatoriasSection";
import { PendientesSection } from "@/components/dashboard/PendientesSection";
import { GeneralesSection } from "@/components/dashboard/GeneralesSection";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const location = useLocation();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Determine which section to show based on the path and user type
  const getActiveSection = () => {
    if (path.includes("/proyectos")) {
      return "proyectos";
    } else if (path.includes("/creadores")) {
      return "creadores";
    } else if (path.includes("/convocatorias")) {
      return "convocatorias";
    } else if (path.includes("/pendientes")) {
      return "pendientes";
    } else if (path.includes("/generales")) {
      return "generales";
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
          {/* Render different profile component based on user type */}
          {activeSection === "perfil" && (
            userType === "creator" ? <CreatorProfile /> : <UserProfile />
          )}
          
          {/* Common sections */}
          {activeSection === "proyectos" && <ProjectsSection />}
          
          {/* Regular user sections */}
          {userType === "regular" && activeSection === "creadores" && <CreatorsSection />}
          {userType === "regular" && activeSection === "convocatorias" && <ConvocatoriasSection />}
          
          {/* Creator user sections */}
          {userType === "creator" && activeSection === "pendientes" && <PendientesSection />}
          {userType === "creator" && activeSection === "generales" && <GeneralesSection />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
