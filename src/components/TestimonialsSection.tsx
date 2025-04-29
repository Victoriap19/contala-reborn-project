
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
    <section className="py-20 px-4 md:px-6 bg-contala-green/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-contala-green/80 max-w-2xl mx-auto">
            Marcas de todos los tamaños han impulsado su crecimiento con Contala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-md"
            >
              <div className="mb-6 text-contala-green opacity-70">
                <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 18H9C9 12 14.2 6.8 20.2 6.8V10.8C16.6 10.8 13.5 14 13.5 17.6V18ZM30.2 18H25.7C25.7 12 30.9 6.8 36.9 6.8V10.8C33.3 10.8 30.2 14 30.2 17.6V18Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-lg mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-contala-green/70 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
