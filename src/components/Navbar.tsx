
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useUser();

  // Update login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle scroll events to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Sesión cerrada correctamente");
    // Redirect to home page after logout
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      navigate('/#pricing');
    }
    setIsMenuOpen(false);
  };

  const handleAboutUsClick = () => {
    navigate("/about-us");
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (userType === "creador") {
      navigate("/creador-dashboard");
    } else {
      navigate("/marca-dashboard");
    }
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  // Check if we're not on the home page
  const isNotHomePage = location.pathname !== "/";

  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-contala-cream/90 shadow-sm nav-blur" : "py-5"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          {isNotHomePage && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2 text-contala-darkpink hover:text-contala-pink"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Inicio
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={scrollToPricing} className="transition-colors text-contala-darkpink hover:text-contala-pink">
            Precios
          </button>
          
          <button onClick={handleAboutUsClick} className="transition-colors text-contala-darkpink hover:text-contala-pink">
            Nosotros
          </button>
          
          {isLoggedIn ? (
            <>
              <Button onClick={handleDashboardClick} className="bg-contala-pink text-white hover:bg-contala-pink/90">
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-contala-darkpink text-contala-darkpink">
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button variant="outline" className="border-contala-darkpink text-contala-darkpink" onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-contala-darkpink">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-contala-cream/95 nav-blur shadow-md py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            {isNotHomePage && (
              <Button 
                variant="ghost" 
                className="flex items-center justify-start text-contala-darkpink hover:text-contala-pink w-full text-left py-2"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Inicio
              </Button>
            )}
            <button onClick={scrollToPricing} className="text-contala-darkpink hover:text-contala-pink transition-colors py-2 text-left">
              Precios
            </button>
            
            <button onClick={handleAboutUsClick} className="text-contala-darkpink hover:text-contala-pink transition-colors py-2 text-left">
              Nosotros
            </button>
            
            <div className="pt-2 border-t border-contala-darkpink/10">
              {isLoggedIn ? (
                <>
                  <Button className="w-full bg-contala-pink text-white hover:bg-contala-pink/90 mb-2" onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                  <Button variant="outline" className="w-full border-contala-darkpink text-contala-darkpink" onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full border-contala-darkpink text-contala-darkpink" onClick={handleLoginClick}>
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>;
}
