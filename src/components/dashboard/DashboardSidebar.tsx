
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Logo } from "@/components/Logo";
import { User, Users, FileText, Search, MessageSquare, X, Menu, LogOut, Calendar, Briefcase, Eye, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: "marca" | "creador";
}

export function DashboardSidebar({
  userType
}: SidebarProps) {
  const {
    open,
    setOpen
  } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    toast: hookToast
  } = useToast();
  const [notifications, setNotifications] = useState(2);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    hookToast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
    navigate("/");
  };
  
  const dismissNotifications = () => {
    setNotifications(0);
    toast.success("Notificaciones marcadas como leídas");
  };

  // Define completely different nav items based on user type
  const navItems = userType === "marca" ? [
    {
      name: "Tu Perfil",
      href: "/marca-dashboard",
      icon: User,
      description: "Información personal y suscripción"
    }, 
    {
      name: "Tus Proyectos",
      href: "/marca-dashboard/proyectos",
      icon: Briefcase,
      description: "Seguimiento de proyectos activos"
    }, 
    {
      name: "Tus Creadores",
      href: "/marca-dashboard/creadores",
      icon: Users,
      description: "Creadores con los que has trabajado"
    }, 
    {
      name: "Tus Convocatorias",
      href: "/marca-dashboard/convocatorias",
      icon: Calendar,
      description: "Convocatorias abiertas para creadores"
    }, 
    {
      name: "Descubrir",
      href: "/marca-dashboard/descubrir",
      icon: Search,
      description: "Encuentra nuevos creadores"
    }
  ] : [
    {
      name: "Tu Perfil",
      href: "/creador-dashboard",
      icon: User,
      description: "Tu información privada"
    }, 
    {
      name: "Tus Proyectos",
      href: "/creador-dashboard/proyectos",
      icon: Briefcase,
      description: "Proyectos en curso y entregados"
    }, 
    {
      name: "Pendientes",
      href: "/creador-dashboard/pendientes",
      icon: FileText,
      description: "Propuestas por revisar"
    }, 
    {
      name: "Generales",
      href: "/creador-dashboard/generales",
      icon: Eye,
      description: "Convocatorias disponibles"
    }
  ];
  
  return <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0", 
        open ? "translate-x-0" : "-translate-x-full",
        userType === "marca" ? "bg-[#4635B1]" : "bg-[#B771E5]"
      )}>
        <div className="flex h-full flex-col overflow-y-auto pt-5 pb-2">
          {/* Close button (mobile only) */}
          <div className="flex items-center justify-between px-4 lg:hidden">
            <Logo size="sm" variant="horizontal" />
            <button onClick={() => setOpen(false)} className="text-white hover:text-[#FFFBCA]">
              <X size={24} />
            </button>
          </div>
          
          {/* Desktop logo */}
          <div className="hidden lg:flex justify-center mt-1 mb-8">
            <Logo size="sm" variant="horizontal" />
          </div>
          
          {/* Notifications */}
          {notifications > 0 && <div className="mx-4 mb-6 p-3 bg-white/10 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  Notificaciones
                </span>
                <button onClick={dismissNotifications} className="text-xs text-white/70 hover:text-white">
                  Marcar leídas
                </button>
              </div>
              <p className="text-xs text-white/80">
                {notifications === 1 ? "Tienes un mensaje sin leer." : `Tienes ${notifications} notificaciones pendientes.`}
              </p>
            </div>}
          
          {/* Navigation */}
          <div className="mb-8 flex-1">
            <div className="space-y-1 px-2">
              {navItems.map(item => {
                const isActive = location.pathname === item.href;
                const isPartialActive = !isActive && location.pathname.includes(item.href) && item.href !== (userType === "marca" ? "/marca-dashboard" : "/creador-dashboard");
                
                return (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className={cn(
                      "group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors",
                      isActive || isPartialActive 
                        ? "bg-white/20 text-white" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )} 
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0", 
                      isActive || isPartialActive 
                        ? "text-[#FFFBCA]" 
                        : "text-white/70 group-hover:text-white"
                    )} />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs font-normal opacity-70">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Chat section */}
          <div className="mx-4 mb-6 p-3 bg-white/10 rounded-lg">
            <h3 className="font-medium text-white flex items-center mb-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensajería
            </h3>
            <p className="text-xs text-white/80 mb-2">
              Comunícate directamente con {userType === "marca" ? "creadores" : "marcas"} para resolver dudas.
            </p>
            <button onClick={() => toast.info("Funcionalidad de chat próximamente")} className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-1 px-2 rounded">
              Abrir mensajes
            </button>
          </div>
          
          {/* Logout button */}
          <div className="px-4 mb-4">
            <button onClick={handleLogout} className="flex items-center w-full px-2 py-2 text-sm font-medium text-white/70 rounded-md hover:bg-white/10 hover:text-white transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile toggle */}
      <div className="fixed bottom-4 right-4 lg:hidden z-30">
        <button 
          onClick={() => setOpen(!open)} 
          className={cn(
            "p-3 rounded-full shadow-lg transition-colors", 
            open ? "bg-white text-[#4635B1]" : 
            userType === "marca" ? "bg-[#4635B1] text-white" : "bg-[#B771E5] text-white"
          )}
        >
          <Menu size={24} />
        </button>
      </div>
    </>;
}
