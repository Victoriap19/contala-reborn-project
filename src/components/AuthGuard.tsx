
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // In a real app, this would check the auth status from your auth provider
    // For this demo, we'll check localStorage or session
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    
    setIsAuthenticated(isLoggedIn);
    
    if (!isLoggedIn) {
      toast({
        title: "Acceso restringido",
        description: "Debes iniciar sesión para acceder a esta página",
        variant: "destructive",
      });
    }
  }, [toast]);

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

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
