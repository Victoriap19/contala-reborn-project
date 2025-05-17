
import { useEffect, useState } from "react";
import { GalleryHorizontal, Image, Video } from "lucide-react";

export default function CreatorsGallerySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  const creatorImages = [
    {
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Creador grabando contenido de gastronomía",
      type: "video",
      category: "Gastronomía"
    },
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Sesión de fotos en naturaleza",
      type: "image",
      category: "Naturaleza"
    },
    {
      src: "https://images.unsplash.com/photo-1501286353178-1ec871814328?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Creador de viajes documentando paisajes",
      type: "video",
      category: "Viajes"
    },
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Sesión de fotos lifestyle",
      type: "image",
      category: "Mascotas"
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-white to-contala-softgray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-contala-lightgray text-contala-navy font-medium">
            <GalleryHorizontal className="w-4 h-4 mr-2" />
            <span>Creadores en acción</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Inspirate con creadores reales</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cómo trabajan nuestros creadores y el contenido auténtico que pueden generar para tu marca
          </p>
        </div>
        
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          {creatorImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative rounded-xl overflow-hidden shadow-lg aspect-[4/5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <div className="inline-flex items-center mb-2">
                  {image.type === "video" ? (
                    <Video className="w-5 h-5 text-white mr-2" />
                  ) : (
                    <Image className="w-5 h-5 text-white mr-2" />
                  )}
                  <span className="text-white font-medium">
                    {image.type === "video" ? "Video" : "Foto"}
                  </span>
                </div>
                <h3 className="text-xl text-white font-bold">{image.category}</h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {image.type === "video" ? (
                  <Video className="w-5 h-5 text-contala-navy" />
                ) : (
                  <Image className="w-5 h-5 text-contala-navy" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="inline-flex items-center text-contala-navy font-medium hover:text-contala-pink transition-colors cursor-pointer">
            Ver más ejemplos de creaciones
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}
