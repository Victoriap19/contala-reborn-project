
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  
  const handleCreadorClick = () => {
    navigate("/soy-creador");
  };
  
  const handleMarcaClick = () => {
    setUserType("marca");
    navigate("/subscriptions");
  };
  
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Conecta tu marca con <span className="text-contala-green">creadores auténticos</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Contala simplifica la colaboración entre marcas y creadores de contenido para impulsar resultados reales.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className="bg-contala-green hover:bg-contala-green/90 text-white h-14 px-8 text-lg rounded-md shadow-none"
              onClick={handleMarcaClick}
            >
              Empezar como Marca <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-200 hover:bg-gray-50 text-contala-charcoal h-14 px-8 text-lg rounded-md shadow-none"
              onClick={handleCreadorClick}
            >
              Soy creador de contenido
            </Button>
          </div>
        </div>
        
        <div className="mt-20 bg-contala-softgray rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-contala-green/10 rounded-md flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-contala-green font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold">Conecta</h3>
              <p className="text-gray-600">Encuentra creadores que representen los valores de tu marca</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-contala-green/10 rounded-md flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-contala-green font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold">Colabora</h3>
              <p className="text-gray-600">Gestiona proyectos y envíos de forma simple y transparente</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-contala-green/10 rounded-md flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-contala-green font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold">Crece</h3>
              <p className="text-gray-600">Obtén contenido auténtico que impulse tus resultados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
