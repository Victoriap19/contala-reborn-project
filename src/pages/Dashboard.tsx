import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CreatorProfile } from "@/components/dashboard/CreatorProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { PendientesSection } from "@/components/dashboard/PendientesSection";
import { GeneralesSection } from "@/components/dashboard/GeneralesSection";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Mock function to simulate email notifications
const sendEmailNotification = (type: string, recipient: string) => {
  console.log(`Email notification sent: ${type} to ${recipient}`);
  return Promise.resolve();
};

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Route to the appropriate dashboard based on user type
  useEffect(() => {
    if (userType === "marca" && path === "/dashboard") {
      navigate("/marca-dashboard");
    }
  }, [userType, path, navigate]);
  
  // Simulate email notifications when receiving messages or proposals
  useEffect(() => {
    // For creators only
    if (userType !== "creador") return;

    // Simulate receiving a proposal from a user
    const proposalTimer = window.setTimeout(() => {
      toast(
        <div className="flex gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-medium">Nueva propuesta</p>
            <p className="text-sm text-gray-500">Has recibido una nueva propuesta</p>
          </div>
        </div>,
        { duration: 5000 }
      );
      sendEmailNotification("new_proposal", "creator@example.com");
    }, 45000);
    
    return () => {
      window.clearTimeout(proposalTimer);
    };
  }, [userType]);
  
  // Determine which section to show based on the path and user type
  const getActiveSection = () => {
    if (path.includes("/proyectos")) {
      return "proyectos";
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
      <Helmet>
        <title>Contala - Plataforma para Creadores</title>
      </Helmet>
      <div className="flex min-h-screen w-full bg-white">
        <DashboardSidebar userType="creador" />
        <div className="flex-1 p-6">
          {/* Decorative elements - more subtle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-contala-pink/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-contala-green/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          
          {/* Render different profile component based on user type */}
          {activeSection === "perfil" && <CreatorProfile />}
          
          {/* Creator user sections */}
          {activeSection === "proyectos" && <ProjectsSection />}
          {activeSection === "pendientes" && <PendientesSection />}
          {activeSection === "generales" && <GeneralesSection />}
        </div>
      </div>
    </SidebarProvider>
  );
}
