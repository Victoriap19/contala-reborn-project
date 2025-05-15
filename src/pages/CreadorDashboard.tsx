
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
import { motion } from "framer-motion";

// Mock function to simulate email notifications
const sendEmailNotification = (type: string, recipient: string) => {
  console.log(`Email notification sent: ${type} to ${recipient}`);
  return Promise.resolve();
};

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
};

export default function CreadorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { userType, setUserType } = useUser();
  
  // Ensure we're in creador user mode
  useEffect(() => {
    if (userType !== "creador") {
      setUserType("creador");
    }
  }, [userType, setUserType]);
  
  // Simulate email notifications when receiving messages or proposals
  useEffect(() => {
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
  }, []);
  
  // Determine which section to show based on the path
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
        <motion.div 
          className="flex-1 p-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {/* Decorative elements - improved contrast and animation */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B771E5]/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#FFFBCA]/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          
          {/* Render the appropriate section based on the path */}
          {activeSection === "perfil" && <CreatorProfile />}
          {activeSection === "proyectos" && <ProjectsSection />}
          {activeSection === "pendientes" && <PendientesSection />}
          {activeSection === "generales" && <GeneralesSection />}
        </motion.div>
      </div>
    </SidebarProvider>
  );
}
