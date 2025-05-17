
import { useState } from "react";
import { GalleryHorizontal, Image, Video } from "lucide-react";

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <GalleryHorizontal className="text-contala-navy" size={28} />,
      title: "Envía tu producto",
      description: "Selecciona creadores y envíales tus productos para que los prueben y los muestren a su audiencia.",
      image: "https://images.unsplash.com/photo-1626483654586-2029adc82aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Video className="text-contala-navy" size={28} />,
      title: "Recibe tu contenido",
      description: "Los creadores generan contenido auténtico mostrando tu producto y compartiendo su experiencia real.",
      image: "https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Image className="text-contala-navy" size={28} />,
      title: "Impulsa tu marca",
      description: "Aprovecha el contenido generado para amplificar tu alcance y aumentar la confianza en tu marca.",
      image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-6 bg-contala-softgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-contala-navy/10 text-contala-navy font-medium">
            <GalleryHorizontal className="w-4 h-4 mr-2" />
            <span>Funcionalidades principales</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Cómo funciona Contala?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Un proceso simple para conectar tu marca con los creadores de contenido perfectos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? "bg-white shadow-lg border-l-4 border-contala-pink" 
                      : "hover:bg-white/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeFeature === index 
                        ? "bg-contala-navy text-white" 
                        : "bg-contala-navy/5 text-contala-navy"
                    } transition-colors duration-300`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative h-80 lg:h-full min-h-[400px]">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                  activeFeature === index 
                    ? "opacity-100 scale-100 rotate-0" 
                    : "opacity-0 scale-90 rotate-3 absolute inset-0"
                }`}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium mb-2">
                      Paso {index + 1}
                    </span>
                    <h3 className="text-2xl text-white font-bold">{feature.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
