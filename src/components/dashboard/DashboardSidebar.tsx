
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
  ChevronLeft,
  Menu
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
  useSidebar
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

type SidebarItem = {
  icon: React.ElementType;
  title: string;
  path: string;
};

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { userType } = useUser();
  const [activeItem, setActiveItem] = useState("perfil");
  const { state, toggleSidebar } = useSidebar();
  
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
    <>
      {/* Mobile menu button when sidebar is collapsed */}
      {state === "collapsed" && (
        <div className="fixed top-4 left-4 z-20 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-contala-darkpink hover:bg-contala-pink/20"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}
    
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border relative">
          <div className="flex items-center p-4">
            <div className="flex-1">
              {state === "expanded" ? (
                <Logo size="md" />
              ) : (
                <Logo withText={false} size="sm" />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-contala-darkpink hover:bg-contala-pink/20"
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
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
                      tooltip={state === "collapsed" ? item.title : undefined}
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
            onClick={() => navigate("/")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {state === "expanded" && <span>Cerrar Sesión</span>}
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
