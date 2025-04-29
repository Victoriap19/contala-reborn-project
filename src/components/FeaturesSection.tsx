
import { Box, Video, Rocket } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Box size={32} />,
      title: "Envía tu producto",
      description: "Selecciona creadores y envíales tus productos para que los prueben y los muestren a su audiencia."
    },
    {
      icon: <Video size={32} />,
      title: "Recibí tu video",
      description: "Los creadores generan contenido auténtico mostrando tu producto y compartiendo su experiencia real."
    },
    {
      icon: <Rocket size={32} />,
      title: "Impulsá tu marca",
      description: "Aprovecha el contenido generado para amplificar tu alcance y aumentar la confianza en tu marca."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Cómo funciona Contala?</h2>
          <p className="text-xl text-contala-green/80 max-w-2xl mx-auto">
            Un proceso simple para conectar tu marca con los creadores de contenido perfectos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card flex flex-col items-center text-center"
            >
              <div className="bg-contala-green/5 p-4 rounded-2xl mb-4 text-contala-green">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-contala-green/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
