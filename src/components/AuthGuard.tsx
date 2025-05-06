
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface AuthGuardProps {
  children: ReactNode;
  userType: "marca" | "creador";
}

const AuthGuard = ({ children, userType }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { userType: currentUserType } = useUser();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    
    setIsAuthenticated(isLoggedIn);
    
    if (!isLoggedIn) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para acceder a esta página",
        variant: "destructive",
      });
      return;
    }
    
    // If authenticated but wrong user type, redirect to the appropriate dashboard
    if (isLoggedIn) {
      // If marca tries to access creador dashboard
      if (currentUserType === "marca" && userType === "creador") {
        toast({
          title: "Acceso restringido",
          description: "Esta sección es solo para creadores",
          variant: "destructive",
        });
        navigate("/marca-dashboard");
        return;
      }
      
      // If creador tries to access marca dashboard
      if (currentUserType === "creador" && userType === "marca") {
        toast({
          title: "Acceso restringido",
          description: "Esta sección es solo para marcas",
          variant: "destructive",
        });
        navigate("/creador-dashboard");
        return;
      }
    }
  }, [toast, location, navigate, currentUserType, userType]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-contala-cream">
        <Loader2 className="h-8 w-8 text-contala-green animate-spin" />
        <p className="mt-4 text-contala-green">Verificando sesión...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated and correct user type
  return <>{children}</>;
};

export default AuthGuard;
