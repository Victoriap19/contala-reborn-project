
import { Box, Video, Rocket } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Box className="text-contala-green" size={28} />,
      title: "Envía tu producto",
      description: "Selecciona creadores y envíales tus productos para que los prueben y los muestren a su audiencia."
    },
    {
      icon: <Video className="text-contala-green" size={28} />,
      title: "Recibe tu contenido",
      description: "Los creadores generan contenido auténtico mostrando tu producto y compartiendo su experiencia real."
    },
    {
      icon: <Rocket className="text-contala-green" size={28} />,
      title: "Impulsa tu marca",
      description: "Aprovecha el contenido generado para amplificar tu alcance y aumentar la confianza en tu marca."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-6 bg-contala-softgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Cómo funciona Contala?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un proceso simple para conectar tu marca con los creadores de contenido perfectos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
