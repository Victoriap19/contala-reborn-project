
export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Contala cambió la forma en que promocionamos nuestros productos. Las colaboraciones con creadores nos dieron resultados que la publicidad tradicional no pudo.",
      author: "María López",
      role: "Fundadora de Beauty Natural"
    },
    {
      quote: "En tres meses triplicamos nuestras ventas gracias a las reseñas auténticas que conseguimos a través de Contala.",
      author: "Alejandro Torres",
      role: "CEO de ArtesanaBox"
    },
    {
      quote: "La plataforma más fácil de usar para conectar con creadores realmente alineados con nuestra marca.",
      author: "Carolina Méndez",
      role: "Marketing de SofíaSweets"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Marcas de todos los tamaños han impulsado su crecimiento con Contala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-contala-softgray p-8 rounded-lg"
            >
              <div className="mb-6 text-contala-green">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 12H9C9 6 14.2 0.8 20.2 0.8V4.8C16.6 4.8 13.5 8 13.5 11.6V12ZM30.2 12H25.7C25.7 6 30.9 0.8 36.9 0.8V4.8C33.3 4.8 30.2 8 30.2 11.6V12Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-lg mb-8">{testimonial.quote}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
