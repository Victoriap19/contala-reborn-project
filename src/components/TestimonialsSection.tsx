
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Contala cambió la forma en que promocionamos nuestros productos. Las colaboraciones con creadores nos dieron resultados que la publicidad tradicional no pudo.",
      author: "María López",
      role: "Fundadora de Beauty Natural",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      company: "beautynatural",
      stars: 5
    },
    {
      quote: "En tres meses triplicamos nuestras ventas gracias a las reseñas auténticas que conseguimos a través de Contala.",
      author: "Alejandro Torres",
      role: "CEO de ArtesanaBox",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      company: "artesanabox",
      stars: 5
    },
    {
      quote: "La plataforma más fácil de usar para conectar con creadores realmente alineados con nuestra marca.",
      author: "Carolina Méndez",
      role: "Marketing de SofíaSweets",
      avatar: "https://randomuser.me/api/portraits/women/47.jpg",
      company: "sofíasweets",
      stars: 4
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-contala-pink/10 text-contala-pink font-medium">
            <span>Testimonios</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Lo que dicen nuestros clientes</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Marcas de todos los tamaños han impulsado su crecimiento con Contala
          </p>
        </div>

        <div className="relative bg-contala-softgray rounded-2xl p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-50"></div>
          
          <div className="relative z-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${
                  activeIndex === index 
                    ? "opacity-100 transform-none" 
                    : "opacity-0 absolute inset-0 translate-x-8"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                  <div className="w-full max-w-lg">
                    <div className="mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`w-6 h-6 inline-block mr-1 ${i < testimonial.stars ? "text-contala-pink" : "text-gray-300"}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="text-2xl md:text-3xl font-medium text-contala-charcoal mb-8">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-contala-charcoal">{testimonial.author}</div>
                        <div className="text-gray-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full max-w-sm">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-contala-lightgray flex items-center justify-center">
                          <span className="text-contala-navy font-bold">
                            {testimonial.company.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="font-bold">{testimonial.company}</div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Crecimiento en ventas</div>
                          <div className="w-full h-3 bg-contala-lightgray rounded-full overflow-hidden">
                            <div className="h-full bg-contala-navy rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Engagement en redes</div>
                          <div className="w-full h-3 bg-contala-lightgray rounded-full overflow-hidden">
                            <div className="h-full bg-contala-pink rounded-full" style={{width: '70%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">ROI de campañas</div>
                          <div className="w-full h-3 bg-contala-lightgray rounded-full overflow-hidden">
                            <div className="h-full bg-contala-navy rounded-full" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-contala-navy w-10" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
