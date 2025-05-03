
import { useState } from "react";
import { 
  User, 
  FileText, 
  Users, 
  LogOut,
  Megaphone,
  Clock,
  Globe
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
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

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
      icon: Users,
      title: "Tus Creadores",
      path: "/dashboard/creadores",
    },
    {
      icon: Megaphone,
      title: "Tus Convocatorias",
      path: "/dashboard/convocatorias",
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
    }
  ];
  
  // Select items based on user type
  const sidebarItems = userType === "creator" ? creatorUserItems : regularUserItems;

  const handleMenuClick = (path: string, index: number) => {
    const section = path.split("/").pop() || "perfil";
    setActiveItem(section);
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-contala-green px-2">Contala</h2>
          <SidebarTrigger />
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
          className="w-full justify-start text-contala-pink hover:bg-contala-pink hover:text-contala-cream"
          onClick={() => navigate("/")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
