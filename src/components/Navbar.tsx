import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userType,
    setUserType
  } = useUser();

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
  const handleCreadorClick = () => {
    navigate("/soy-creador");
    setIsMenuOpen(false);
  };
  const handleMarcaClick = () => {
    setUserType("marca");
    navigate("/subscriptions");
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
  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-contala-cream/90 shadow-sm nav-blur" : "py-5"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo size="sm" />
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={scrollToPricing} className="transition-colors text-contala-brown">
            Precios
          </button>
          
          <button onClick={handleAboutUsClick} className="transition-colors text-contala-brown">
            Nosotros
          </button>
          
          {isLoggedIn ? <>
              <Button variant="outline" onClick={handleLogout} className="border-contala-brown bg-contala-green text-contala-brown">Iniciar sesión</Button>
              
            </> : <>
              <Button variant="outline" className="border-contala-brown text-contala-brown" onClick={handleLoginClick}>
                Iniciar sesión
              </Button>
              <Button onClick={handleMarcaClick} className="bg-contala-pink text-white hover:bg-contala-pink/90">
                Soy Marca
              </Button>
            </>}
          
          {!isLoggedIn && <Button variant="ghost" className="text-contala-brown hover:text-contala-pink" onClick={handleCreadorClick}>
              Soy Creador
            </Button>}
        </div>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-contala-brown">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-contala-cream/95 nav-blur shadow-md py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            <button onClick={scrollToPricing} className="text-contala-brown hover:text-contala-pink transition-colors py-2 text-left">
              Precios
            </button>
            
            <button onClick={handleAboutUsClick} className="text-contala-brown hover:text-contala-pink transition-colors py-2 text-left">
              Nosotros
            </button>
            
            <div className="pt-2 border-t border-contala-brown/10">
              {isLoggedIn ? <>
                  <Button variant="outline" className="w-full border-contala-brown text-contala-brown mb-2" onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}>
                    Cerrar sesión
                  </Button>
                  <Button className="w-full bg-contala-pink text-white hover:bg-contala-pink/90" onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                </> : <>
                  <Button variant="outline" className="w-full border-contala-brown text-contala-brown mb-2" onClick={handleLoginClick}>
                    Iniciar sesión
                  </Button>
                  <Button className="w-full bg-contala-pink text-white hover:bg-contala-pink/90 mb-2" onClick={handleMarcaClick}>
                    Soy Marca
                  </Button>
                  <Button variant="ghost" className="w-full text-contala-brown hover:text-contala-pink" onClick={handleCreadorClick}>
                    Soy Creador
                  </Button>
                </>}
            </div>
          </div>
        </div>}
    </nav>;
}