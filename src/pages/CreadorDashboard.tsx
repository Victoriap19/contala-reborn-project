
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

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CreadorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Ensure we're in creador user mode
  useEffect(() => {
    if (userType !== "creador") {
      toast.error("Esta página es solo para creadores. Redirigiendo al dashboard de marcas.");
      navigate("/marca-dashboard");
    }
  }, [userType, navigate]);
  
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-contala-darkpink/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-contala-pink/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          
          {/* Render different sections with animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            {/* Render different profile component based on user type */}
            {activeSection === "perfil" && (
              <motion.div variants={itemVariants}>
                <CreatorProfile />
              </motion.div>
            )}
            
            {/* Creator user sections */}
            {activeSection === "proyectos" && (
              <motion.div variants={itemVariants}>
                <ProjectsSection />
              </motion.div>
            )}
            {activeSection === "pendientes" && (
              <motion.div variants={itemVariants}>
                <PendientesSection />
              </motion.div>
            )}
            {activeSection === "generales" && (
              <motion.div variants={itemVariants}>
                <GeneralesSection />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </SidebarProvider>
  );
}
