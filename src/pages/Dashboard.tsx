
import { useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { CreatorProfile } from "@/components/dashboard/CreatorProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { CreatorsSection } from "@/components/dashboard/CreatorsSection";
import { ConvocatoriasSection } from "@/components/dashboard/ConvocatoriasSection";
import { PendientesSection } from "@/components/dashboard/PendientesSection";
import { GeneralesSection } from "@/components/dashboard/GeneralesSection";
import { DiscoverSection } from "@/components/dashboard/DiscoverSection";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { toast } from "sonner";
import { MessageSquare, Check } from "lucide-react";

// Mock function to simulate email notifications
const sendEmailNotification = (type: string, recipient: string) => {
  console.log(`Email notification sent: ${type} to ${recipient}`);
  return Promise.resolve();
};

export default function Dashboard() {
  const location = useLocation();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Simulate email notifications when receiving messages or proposals
  useEffect(() => {
    // Subscription to new messages would go here in a real app
    // For demo, we'll simulate random notifications
    const intervals: number[] = [];

    if (userType === "regular") {
      // Simulate a creator accepting a proposal
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
      
      intervals.push(acceptanceTimer);
    } 
    
    if (userType === "creator") {
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
      
      intervals.push(proposalTimer);
    }

    return () => {
      intervals.forEach(id => window.clearTimeout(id));
    };
  }, [userType]);
  
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
    } else if (path.includes("/descubrir")) {
      return "descubrir";
    } else {
      return "perfil";
    }
  };
  
  const activeSection = getActiveSection();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-contala-cream paper-texture">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-contala-pink/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-contala-green/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          
          {/* Render different profile component based on user type */}
          {activeSection === "perfil" && (
            userType === "creator" ? <CreatorProfile /> : <UserProfile />
          )}
          
          {/* Common sections */}
          {activeSection === "proyectos" && <ProjectsSection />}
          
          {/* Regular user sections */}
          {userType === "regular" && activeSection === "creadores" && <CreatorsSection />}
          {userType === "regular" && activeSection === "convocatorias" && <ConvocatoriasSection />}
          {userType === "regular" && activeSection === "descubrir" && <DiscoverSection />}
          
          {/* Creator user sections */}
          {userType === "creator" && activeSection === "pendientes" && <PendientesSection />}
          {userType === "creator" && activeSection === "generales" && <GeneralesSection />}
        </div>
      </div>
    </SidebarProvider>
  );
}
