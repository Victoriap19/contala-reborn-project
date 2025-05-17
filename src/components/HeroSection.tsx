
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const {
    setUserType
  } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const imageItems = [{
    src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Fotografía"
  }, {
    src: "https://images.unsplash.com/photo-1501286353178-1ec871814328?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Video"
  }, {
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Reseñas"
  }];
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % imageItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imageItems.length]);
  const handleCreadorClick = () => {
    navigate("/soy-creador");
  };
  const handleMarcaClick = () => {
    setUserType("marca");
    navigate("/subscriptions");
  };
  return <section className="pt-36 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
            <div className="relative"></div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Conecta con <span className="text-contala-darkpink relative inline-block">
                creadores
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-contala-pink/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 C50,0 150,0 200,5 L200,8 L0,8 Z" fill="currentColor"></path>
                </svg>
              </span> auténticos
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-lg">
              Contala simplifica la colaboración entre marcas y creadores de contenido para impulsar resultados reales.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-contala-darkpink hover:bg-contala-darkpink/90 text-white h-14 px-8 text-lg rounded-md shadow-none" onClick={handleMarcaClick}>
                Empezar como Marca <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-200 hover:bg-contala-cream text-contala-darkpink h-14 px-8 text-lg rounded-md shadow-none" onClick={handleCreadorClick}>
                Soy creador de contenido
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Usuario" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Usuario" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Usuario" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-contala-darkpink flex items-center justify-center text-white text-xs font-bold">
                  +50
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Más de 50 marcas</strong> encontraron sus creadores ideales este mes
              </div>
            </div>
          </div>
          
          <div className={`relative h-[500px] transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
            <div className="absolute inset-0 bg-dot-pattern rounded-2xl"></div>
            
            {imageItems.map((item, index) => <div key={index} className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${activeImage === index ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-8 rotate-2"}`}>
                <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8">
                    <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium mb-2">
                      {item.label}
                    </span>
                    <h2 className="text-2xl text-white font-bold">Contenido auténtico generado por creadores reales</h2>
                  </div>
                </div>
              </div>)}
            
            <div className="absolute bottom-6 right-6 flex gap-2 z-10">
              {imageItems.map((_, index) => <button key={index} onClick={() => setActiveImage(index)} className={`w-3 h-3 rounded-full transition-all ${activeImage === index ? "w-10 bg-white" : "bg-white/50 hover:bg-white/70"}`} aria-label={`Ver imagen ${index + 1}`} />)}
            </div>
          </div>
        </div>
        
        {/* Logos de clientes */}
        <div className="mt-24 border-t border-b border-gray-100 py-8">
          <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-wider font-medium">
            Marcas que confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Acme Co.', 'GlobalTech', 'Fusión', 'Natura', 'InnovateLab'].map((name, i) => <div key={i} className="text-gray-300 font-bold text-xl">
                {name}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
