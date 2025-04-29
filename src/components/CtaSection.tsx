
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-b from-contala-pink/20 to-contala-cream rounded-3xl p-8 md:p-16 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Listo para transformar tu marca</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Conecta con los creadores de contenido perfectos para tu marca y acelera tu crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-contala-green text-contala-cream hover:bg-contala-green/90 h-12 px-8 text-lg"
              onClick={() => window.location.href = "/register"}
            >
              Crear cuenta gratis
            </Button>
            <Button 
              variant="outline" 
              className="border-contala-green text-contala-green hover:bg-contala-green hover:text-contala-cream h-12 px-8 text-lg"
              onClick={() => window.location.href = "/contact"}
            >
              Contactar equipo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
