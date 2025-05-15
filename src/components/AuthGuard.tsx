
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
  const { userType: currentUserType, setUserType } = useUser();

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
    if (isLoggedIn && currentUserType !== userType) {
      // Set the correct user type based on the requested page
      setUserType(userType);
      
      toast({
        title: `Cambiando a modo ${userType === 'marca' ? 'Marca' : 'Creador'}`,
        description: `Has iniciado sesión como ${userType === 'marca' ? 'Marca' : 'Creador'}`,
      });
    }
  }, [toast, location, navigate, currentUserType, userType, setUserType]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBCA]">
        <Loader2 className="h-8 w-8 text-[#4635B1] animate-spin" />
        <p className="mt-4 text-[#4635B1]">Verificando sesión...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
