
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-20 hero-gradient">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-10 md:pt-20">
          <div className="flex flex-col space-y-6 text-center md:text-left">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Conectá tu producto con creadores de contenido
              </h1>
              <p className="text-xl md:text-2xl text-contala-green/80">
                Fácil, rápido y seguro. Contala te ayuda a impulsar tu marca a través de los mejores creadores.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Button 
                  className="bg-contala-pink text-contala-green hover:bg-contala-pink/90 h-12 px-8 text-lg"
                  onClick={() => window.location.href = "/register"}
                >
                  Empezar ahora
                </Button>
                <Button 
                  variant="outline" 
                  className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green h-12 px-8 text-lg"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Cómo funciona
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="mx-auto md:mr-0 w-full max-w-md">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-contala-green/5 shadow-xl border border-contala-green/10">
                <img 
                  src="/placeholder.svg" 
                  alt="Creadores de contenido" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 bg-contala-pink/20 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
