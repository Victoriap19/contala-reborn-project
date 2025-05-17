
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { CreatorsSection } from "@/components/dashboard/CreatorsSection";
import { ConvocatoriasSection } from "@/components/dashboard/ConvocatoriasSection";
import { DiscoverSection } from "@/components/dashboard/DiscoverSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { MessageSquare, Check } from "lucide-react";
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

export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { userType } = useUser();
  
  // Ensure we're in regular user mode
  useEffect(() => {
    if (userType === "creador") {
      toast.error("Esta página es solo para usuarios. Redirigiendo al dashboard de creadores.");
      navigate("/dashboard");
    }
  }, [userType, navigate]);
  
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
        <title>Contala - Plataforma para Marcas</title>
      </Helmet>
      <div className="flex min-h-screen w-full bg-white">
        <DashboardSidebar userType="marca" />
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
            {/* Render the appropriate section based on the path */}
            {activeSection === "perfil" && (
              <motion.div variants={itemVariants}>
                <UserProfile />
              </motion.div>
            )}
            {activeSection === "proyectos" && (
              <motion.div variants={itemVariants}>
                <ProjectsSection />
              </motion.div>
            )}
            {activeSection === "creadores" && (
              <motion.div variants={itemVariants}>
                <CreatorsSection />
              </motion.div>
            )}
            {activeSection === "convocatorias" && (
              <motion.div variants={itemVariants}>
                <ConvocatoriasSection />
              </motion.div>
            )}
            {activeSection === "descubrir" && (
              <motion.div variants={itemVariants}>
                <DiscoverSection />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </SidebarProvider>
  );
}
