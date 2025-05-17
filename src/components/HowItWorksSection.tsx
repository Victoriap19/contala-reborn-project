
import { useEffect, useState } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Conexión",
      description: "Encuentra los creadores perfectos que representan los valores de tu marca",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Colaboración",
      description: "Gestiona proyectos y envíos de productos de forma simple y transparente",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Crecimiento",
      description: "Obtén contenido auténtico generado por usuarios que impulse tus resultados",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">¿Cómo funciona?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Un proceso simple y eficiente para conectar tu marca con los mejores creadores de contenido
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                    activeStep === index 
                      ? "bg-contala-lightgray border-l-4 border-contala-navy shadow-md" 
                      : "hover:bg-contala-softgray"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      activeStep === index 
                        ? "bg-contala-navy text-white" 
                        : "bg-contala-lightgray text-contala-navy"
                    } transition-colors duration-300`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden shadow-xl transform transition-all duration-700 ${
                  activeStep === index 
                    ? "opacity-100 scale-100 rotate-0 translate-y-0" 
                    : "opacity-0 scale-90 rotate-3 translate-y-8 absolute inset-0"
                }`}
              >
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-md w-fit mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/90 max-w-lg">{step.description}</p>
                </div>
              </div>
            ))}
            
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {steps.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeStep === index 
                      ? "w-8 bg-contala-navy" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ver paso ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
