
import { useState } from "react";
import { 
  User, 
  FileText, 
  Users, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const [activeItem, setActiveItem] = useState("perfil");
  
  const sidebarItems: SidebarItem[] = [
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
  ];

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
                      (activeItem === "proyectos" && item.path === "/dashboard/proyectos") ||
                      (activeItem === "creadores" && item.path === "/dashboard/creadores")
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
