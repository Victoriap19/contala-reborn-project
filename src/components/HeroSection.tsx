
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
    <section className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-10 md:pt-20">
          <div className="flex flex-col space-y-8 text-center md:text-left">
            <div className="space-y-5 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-contala-green">
                Conectá tu producto con creadores de contenido
              </h1>
              <p className="text-xl md:text-2xl text-contala-green/70">
                Fácil, rápido y seguro. Contala te ayuda a impulsar tu marca a través de los mejores creadores.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
                <Button 
                  className="bg-contala-green hover:bg-contala-green/90 text-white h-14 px-8 text-lg rounded-full shadow-lg"
                  onClick={handleMarcaClick}
                >
                  Empezar como Marca <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="pt-6 flex justify-center md:justify-start">
                <Button 
                  variant="link" 
                  className="text-contala-green hover:text-contala-green/70 flex items-center gap-2 text-lg"
                  onClick={handleCreadorClick}
                >
                  <span className="underline">Soy creador de contenido</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float hidden md:block">
            <div className="mx-auto md:mr-0 w-full max-w-md">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-contala-green/5 shadow-xl border border-contala-green/10">
                <img 
                  src="/placeholder.svg" 
                  alt="Creadores de contenido" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 bg-contala-green/10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
