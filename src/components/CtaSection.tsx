
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GalleryHorizontal } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-contala-darkpink to-contala-darkpink/90 rounded-2xl p-8 md:p-16 shadow-xl overflow-hidden relative">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-contala-pink/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-contala-darkpink/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          {/* Contenido */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 text-white backdrop-blur-sm font-medium">
              <GalleryHorizontal className="w-4 h-4 mr-2" />
              <span>¡Comienza hoy mismo!</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Listo para transformar tu marca con contenido auténtico
            </h2>
            
            <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Conecta con los creadores de contenido perfectos para tu marca y acelera tu crecimiento con contenido que resuene con tu audiencia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-contala-darkpink hover:bg-white/90 h-14 px-8 text-base rounded-md"
                asChild
              >
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base rounded-md"
                asChild
              >
                <Link to="/register">Registrarme</Link>
              </Button>
            </div>
            
            <div className="mt-10">
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-contala-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80">Sin contratos largos</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-contala-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80">Cancelación en cualquier momento</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-contala-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80">Soporte personalizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
