
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulación del estado de autenticación - en producción esto vendría de tu autenticación real
  useEffect(() => {
    // Aquí implementarías la lógica para verificar la autenticación real
    const checkAuth = () => {
      // Simulación: 50% probabilidad de estar autenticado para esta demo
      const authenticated = false; // Para producción: obtener del estado real
      const name = authenticated ? "Usuario" : "";
      setIsAuthenticated(authenticated);
      setUsername(name);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = () => {
    // Redirigir a la página de login
    window.location.href = "/login";
  };

  const handleRegister = () => {
    // Redirigir a la página de registro
    window.location.href = "/register";
  };

  const handleCreatorRegister = () => {
    // Redirigir a la página de registro de creadores
    window.location.href = "/register?type=creator";
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    setIsAuthenticated(false);
    setUsername("");
    // En producción: redirigir o ejecutar el logout real
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-6 ${
        isScrolled || isMobileMenuOpen ? "py-3 bg-contala-cream/90 nav-blur shadow-sm" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="font-bold text-2xl text-contala-green">Contala</a>
        </div>
        
        {/* Versión de escritorio */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-contala-green">¡Hola {username}!</span>
              <Button 
                variant="outline" 
                className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
              <Button 
                variant="outline" 
                className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                onClick={handleRegister}
              >
                Registrarme
              </Button>
              <Button 
                variant="outline" 
                className="border-contala-green bg-contala-green text-contala-cream hover:bg-contala-green/90"
                onClick={handleCreatorRegister}
              >
                Soy Creador
              </Button>
            </>
          )}
        </div>
        
        {/* Botón móvil */}
        <button
          className="md:hidden text-contala-green"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-contala-cream/95 nav-blur mt-3 py-4 px-4 rounded-lg shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <span className="text-contala-green text-center">¡Hola {username}!</span>
                <Button 
                  variant="outline" 
                  className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green w-full"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="bg-contala-pink text-contala-green hover:bg-contala-pink/90 w-full"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>
                <Button 
                  variant="outline" 
                  className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green w-full"
                  onClick={handleRegister}
                >
                  Registrarme
                </Button>
                <Button 
                  variant="outline" 
                  className="border-contala-green bg-contala-green text-contala-cream hover:bg-contala-green/90 w-full"
                  onClick={handleCreatorRegister}
                >
                  Soy Creador
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
