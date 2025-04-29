
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-contala-green text-contala-cream py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contala</h3>
            <p className="text-contala-cream/80">
              La plataforma que conecta marcas con los mejores creadores de contenido.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Sobre nosotros</a></li>
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Cómo funciona</a></li>
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Contacto</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Blog</a></li>
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Guía para marcas</a></li>
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Guía para creadores</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Términos de servicio</a></li>
              <li><a href="#" className="text-contala-cream/80 hover:text-contala-pink">Política de privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-contala-cream/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-contala-cream/80">© Contala 2025. Todos los derechos reservados.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-contala-cream hover:text-contala-pink">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-contala-cream hover:text-contala-pink">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
