
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { CreatorsSection } from "@/components/dashboard/CreatorsSection";
import { ConvocatoriasSection } from "@/components/dashboard/ConvocatoriasSection";
import { DiscoverSection } from "@/components/dashboard/DiscoverSection";
import { useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { MessageSquare, Check } from "lucide-react";

// Mock function to simulate email notifications
const sendEmailNotification = (type: string, recipient: string) => {
  console.log(`Email notification sent: ${type} to ${recipient}`);
  return Promise.resolve();
};

export default function UserDashboard() {
  const location = useLocation();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Ensure we're in regular user mode
  useEffect(() => {
    if (userType === "creador") {
      toast.error("Esta página es solo para usuarios. Redirigiendo al dashboard de creadores.");
      window.location.href = "/dashboard";
    }
  }, [userType]);
  
  // Simulate email notifications when receiving messages or proposals
  useEffect(() => {
    // Subscription to new messages would go here in a real app
    // For demo, we'll simulate random notifications
    const acceptanceTimer = window.setTimeout(() => {
      toast(
        <div className="flex gap-2">
          <Check className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium">Propuesta aceptada</p>
            <p className="text-sm text-gray-500">Laura ha aceptado tu propuesta</p>
          </div>
        </div>,
        { duration: 5000 }
      );
      sendEmailNotification("proposal_accepted", "user@example.com");
    }, 30000);
      
    return () => {
      window.clearTimeout(acceptanceTimer);
    };
  }, []);
  
  // Determine which section to show based on the path
  const getActiveSection = () => {
    if (path.includes("/proyectos")) {
      return "proyectos";
    } else if (path.includes("/creadores")) {
      return "creadores";
    } else if (path.includes("/convocatorias")) {
      return "convocatorias";
    } else if (path.includes("/descubrir")) {
      return "descubrir";
    } else {
      return "perfil";
    }
  };
  
  const activeSection = getActiveSection();

  return (
    <SidebarProvider defaultOpen={true}>
      <Helmet>
        <title>Dashboard de Usuario - Contala</title>
      </Helmet>
      <div className="flex min-h-screen w-full bg-contala-cream paper-texture">
        <DashboardSidebar userType="marca" />
        <div className="flex-1 p-6">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-contala-pink/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-contala-green/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          
          {/* Display type of dashboard */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-contala-green">
              Dashboard de Usuario
            </h1>
            <p className="text-contala-green/70">
              Gestiona tus proyectos y conexiones con creadores
            </p>
          </div>
          
          {/* Render the appropriate section based on the path */}
          {activeSection === "perfil" && <UserProfile />}
          {activeSection === "proyectos" && <ProjectsSection />}
          {activeSection === "creadores" && <CreatorsSection />}
          {activeSection === "convocatorias" && <ConvocatoriasSection />}
          {activeSection === "descubrir" && <DiscoverSection />}
        </div>
      </div>
    </SidebarProvider>
  );
}
