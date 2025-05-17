
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Logo size="md" withText={true} className="mb-4" />
            <p className="text-gray-500 text-sm max-w-xs">
              La plataforma que conecta marcas con los mejores creadores de contenido para colaboraciones auténticas y efectivas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-contala-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-contala-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-contala-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-contala-darkpink/70">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Sobre nosotros</a></li>
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Cómo funciona</a></li>
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-contala-darkpink/70">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Guía para marcas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Guía para creadores</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-contala-darkpink/70">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Términos de servicio</a></li>
              <li><a href="#" className="text-gray-600 hover:text-contala-darkpink transition-colors text-sm">Política de privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© Contala 2025. Todos los derechos reservados.</p>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-contala-darkpink">Español</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
