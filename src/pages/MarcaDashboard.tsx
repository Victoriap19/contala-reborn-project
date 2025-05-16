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
import { MessageSquare, Check, Package, Truck } from "lucide-react";
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

export default function MarcaDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { userType, setUserType } = useUser();
  
  // Ensure we're in marca user mode
  useEffect(() => {
    if (userType !== "marca") {
      setUserType("marca");
    }
  }, [userType, setUserType]);
  
  // Enhanced notifications to include shipping updates
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
      
    // Add shipping notifications
    const shippingTimer = window.setTimeout(() => {
      toast(
        <div className="flex gap-2">
          <Truck className="h-5 w-5 text-blue-500" />
          <div>
            <p className="font-medium">Actualización de envío</p>
            <p className="text-sm text-gray-500">Tu paquete está en camino a Carlos Gómez</p>
          </div>
        </div>,
        { duration: 5000 }
      );
    }, 45000);

    const deliveryTimer = window.setTimeout(() => {
      toast(
        <div className="flex gap-2">
          <Package className="h-5 w-5 text-[#4635B1]" />
          <div>
            <p className="font-medium">Envío confirmado</p>
            <p className="text-sm text-gray-500">Carlos Gómez ha confirmado la recepción del envío</p>
          </div>
        </div>,
        { duration: 5000 }
      );
    }, 60000);
      
    return () => {
      window.clearTimeout(acceptanceTimer);
      window.clearTimeout(shippingTimer);
      window.clearTimeout(deliveryTimer);
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
          {/* Decorative elements with updated colors */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4635B1]/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#AEEA94]/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          
          {/* Render the appropriate section based on the path */}
          {activeSection === "perfil" && <UserProfile />}
          {activeSection === "proyectos" && <ProjectsSection />}
          {activeSection === "creadores" && <CreatorsSection />}
          {activeSection === "convocatorias" && <ConvocatoriasSection />}
          {activeSection === "descubrir" && <DiscoverSection />}
        </motion.div>
      </div>
    </SidebarProvider>
  );
}
