
import { useState } from "react";
import { 
  User, 
  FileText, 
  Users, 
  LogOut,
  Megaphone,
  Clock,
  Globe,
  Search,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { authService } from "@/services/api";

type SidebarItem = {
  icon: React.ElementType;
  title: string;
  path: string;
};

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { userType } = useUser();
  const [activeItem, setActiveItem] = useState("perfil");
  
  // Define sidebar items based on user type
  const regularUserItems: SidebarItem[] = [
    {
      icon: User,
      title: "Tu Perfil",
      path: "/dashboard",
    },
    {
      icon: FileText,
      title: "Tus Proyectos",
      path: "/dashboard/proyectos",
    },
    {
      icon: Search,
      title: "Descubrir",
      path: "/dashboard/descubrir",
    },
    {
      icon: Users,
      title: "Tus Creadores",
      path: "/dashboard/creadores",
    },
    {
      icon: Megaphone,
      title: "Tus Convocatorias",
      path: "/dashboard/convocatorias",
    },
    {
      icon: CreditCard,
      title: "Suscripciones",
      path: "/subscriptions",
    }
  ];
  
  const creatorUserItems: SidebarItem[] = [
    {
      icon: User,
      title: "Tu Perfil",
      path: "/dashboard",
    },
    {
      icon: FileText,
      title: "Tus Proyectos",
      path: "/dashboard/proyectos",
    },
    {
      icon: Clock,
      title: "Pendientes de Aprobación",
      path: "/dashboard/pendientes",
    },
    {
      icon: Globe,
      title: "Generales",
      path: "/dashboard/generales",
    },
    {
      icon: CreditCard,
      title: "Suscripciones",
      path: "/subscriptions",
    }
  ];
  
  // Select items based on user type
  const sidebarItems = userType === "creator" ? creatorUserItems : regularUserItems;

  const handleMenuClick = (path: string, index: number) => {
    const section = path.split("/").pop() || "perfil";
    setActiveItem(section);
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
    // The redirect is handled in the authService.logout function
  };

  return (
    <Sidebar collapsible="none">
      <SidebarHeader className="border-b border-sidebar-border relative">
        <div className="flex items-center p-4">
          <div className="flex-1">
            <Logo size="md" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={
                      (activeItem === "perfil" && item.path === "/dashboard") ||
                      (item.path.includes(activeItem))
                    }
                    onClick={() => handleMenuClick(item.path, index)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-contala-darkpink hover:bg-contala-pink/20"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
