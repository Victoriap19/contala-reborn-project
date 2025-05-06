
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Logo } from "@/components/Logo";
import { 
  User, Users, FileText, Search, MessageSquare,
  X, Menu, LogOut, Calendar, Briefcase, Eye, Bell 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: "marca" | "creador";
}

export function DashboardSidebar({ userType }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast: hookToast } = useToast();
  const [notifications, setNotifications] = useState(2);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    hookToast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/");
  };
  
  const dismissNotifications = () => {
    setNotifications(0);
    toast.success("Notificaciones marcadas como leídas");
  };
  
  // Define nav items based on user type
  const navItems = userType === "marca" 
    ? [
        { name: "Tu Perfil", href: "/marca-dashboard", icon: User },
        { name: "Tus Proyectos", href: "/marca-dashboard/proyectos", icon: Briefcase },
        { name: "Tus Creadores", href: "/marca-dashboard/creadores", icon: Users },
        { name: "Tus Convocatorias", href: "/marca-dashboard/convocatorias", icon: Calendar },
        { name: "Descubrir", href: "/marca-dashboard/descubrir", icon: Search },
      ]
    : [
        { name: "Tu Perfil", href: "/creador-dashboard", icon: User },
        { name: "Tus Proyectos", href: "/creador-dashboard/proyectos", icon: Briefcase },
        { name: "Pendientes", href: "/creador-dashboard/pendientes", icon: FileText },
        { name: "Generales", href: "/creador-dashboard/generales", icon: Eye },
      ];
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-contala-green transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col overflow-y-auto pt-5 pb-2">
          {/* Close button (mobile only) */}
          <div className="flex items-center justify-between px-4 lg:hidden">
            <Logo size="xs" variant="light" />
            <button
              onClick={() => setOpen(false)}
              className="text-contala-cream hover:text-contala-pink"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Desktop logo */}
          <div className="hidden lg:flex justify-center mt-1 mb-8">
            <Logo size="sm" variant="light" />
          </div>
          
          {/* Notifications */}
          {notifications > 0 && (
            <div className="mx-4 mb-6 p-3 bg-contala-pink/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-contala-cream flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificaciones ({notifications})
                </h3>
                <button
                  onClick={dismissNotifications}
                  className="text-xs text-contala-cream/70 hover:text-contala-cream"
                >
                  Marcar leídas
                </button>
              </div>
              <p className="text-xs text-contala-cream/80">
                {notifications === 1 ? (
                  "Tienes un mensaje sin leer."
                ) : (
                  `Tienes ${notifications} notificaciones pendientes.`
                )}
              </p>
            </div>
          )}
          
          {/* Navigation */}
          <div className="mb-8 flex-1">
            <div className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const isPartialActive = 
                  !isActive && 
                  location.pathname.includes(item.href) && 
                  item.href !== (userType === "marca" ? "/marca-dashboard" : "/creador-dashboard");
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      (isActive || isPartialActive)
                        ? "bg-contala-pink/20 text-contala-cream"
                        : "text-contala-cream/70 hover:bg-contala-green-dark hover:text-contala-cream"
                    )}
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <item.icon 
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        (isActive || isPartialActive)
                          ? "text-contala-cream"
                          : "text-contala-cream/70 group-hover:text-contala-cream"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Chat section */}
          <div className="mx-4 mb-6 p-3 bg-contala-pink/10 rounded-lg">
            <h3 className="font-medium text-contala-cream flex items-center mb-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensajería
            </h3>
            <p className="text-xs text-contala-cream/80 mb-2">
              Comunícate directamente con {userType === "marca" ? "creadores" : "marcas"} para resolver dudas.
            </p>
            <button
              onClick={() => toast.info("Funcionalidad de chat próximamente")}
              className="w-full bg-contala-pink/20 hover:bg-contala-pink/30 text-contala-cream text-xs py-1 px-2 rounded"
            >
              Abrir mensajes
            </button>
          </div>
          
          {/* Logout button */}
          <div className="px-4 mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-contala-cream/70 rounded-md hover:bg-contala-green-dark hover:text-contala-cream transition-colors"
            >
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
            open ? "bg-contala-pink text-contala-green" : "bg-contala-green text-contala-cream"
          )}
        >
          <Menu size={24} />
        </button>
      </div>
    </>
  );
}
