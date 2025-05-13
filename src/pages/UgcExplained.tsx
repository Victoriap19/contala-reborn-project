
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Play, Video, Image as ImageIcon, FileText } from "lucide-react";
import { useState } from "react";

const UgcExplained = () => {
  const [activeTab, setActiveTab] = useState(0);

  const ugcTypes = [
    {
      title: "Videos",
      icon: <Video className="h-6 w-6" />,
      description: "Contenido dinámico que muestra tu producto en acción",
      examples: [
        "Unboxing de productos",
        "Tutoriales de uso",
        "Comparativas con otros productos",
        "Testimonios en video"
      ],
      image: "https://images.unsplash.com/photo-1601003570476-90c507d7f353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fotografías",
      icon: <ImageIcon className="h-6 w-6" />,
      description: "Imágenes profesionales que resaltan las características de tu producto",
      examples: [
        "Fotos de estilo de vida",
        "Fotos de detalles del producto",
        "Fotos de antes/después",
        "Imágenes de usuarios reales"
      ],
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Reseñas",
      icon: <FileText className="h-6 w-6" />,
      description: "Opiniones auténticas sobre la experiencia con tus productos",
      examples: [
        "Reseñas detalladas",
        "Historias de transformación",
        "Recomendaciones personales",
        "Testimonios escritos"
      ],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const statistics = [
    { value: "93%", label: "de consumidores confían en recomendaciones de personas reales" },
    { value: "4x", label: "más probabilidades de que los clientes compren después de ver UGC" },
    { value: "86%", label: "de las marcas utilizan contenido generado por usuarios" }
  ];

  const benefits = [
    {
      title: "Autenticidad",
      description: "El contenido creado por usuarios reales transmite autenticidad y confianza"
    },
    {
      title: "Credibilidad",
      description: "Las opiniones genuinas tienen más peso que los mensajes publicitarios tradicionales"
    },
    {
      title: "Engagement",
      description: "El UGC genera mayor interacción y tiempo de permanencia en tus canales"
    },
    {
      title: "Conversión",
      description: "Impulsa las tasas de conversión al mostrar productos en contextos reales"
    },
    {
      title: "Alcance",
      description: "Amplía tu audiencia a través de los seguidores de tus creadores colaboradores"
    },
    {
      title: "Rentabilidad",
      description: "Reduce costos de producción comparado con publicidad tradicional"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>¿Qué es UGC? - Contala</title>
        <meta name="description" content="Aprende sobre el contenido generado por usuarios (UGC) y cómo puede impulsar tu marca" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-contala-cream/30 rounded-bl-[200px] -z-10"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 rounded-full bg-contala-green/20 blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-contala-pink/10 text-contala-pink font-medium mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-contala-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-contala-pink"></span>
              </span>
              Explicado de forma simple
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-contala-navy">
              Cómo el <span className="text-contala-pink">contenido generado</span> por usuarios 
              <span className="relative inline-block">
                <span className="absolute -bottom-1 left-0 right-0 h-4 bg-contala-green/30 -z-10 transform -rotate-1"></span>
                <span className="relative"> impulsa tu marca</span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              El UGC o contenido generado por usuarios es la estrategia más efectiva para crear confianza, 
              autenticidad y conversiones para tu marca. Descubre cómo Contala te ayuda a implementarla.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-contala-navy hover:bg-contala-navy/90 text-white h-14 px-8 text-lg rounded-md"
                asChild
              >
                <Link to="/register">Empezar ahora <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-contala-navy/20 text-contala-navy hover:bg-contala-navy/5 h-14 px-8 text-lg rounded-md flex items-center"
                asChild
              >
                <a href="#video-example">
                  <div className="mr-2 w-8 h-8 rounded-full bg-contala-pink flex items-center justify-center text-white">
                    <Play className="h-4 w-4" />
                  </div>
                  Ver ejemplo
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-contala-cream/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="text-4xl font-bold text-contala-pink mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What is UGC Section */}
      <section id="what-is-ugc" className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-contala-pink font-semibold mb-2 block">Comprendiendo el UGC</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-contala-navy">¿Qué es el contenido generado por usuarios?</h2>
                
                <div className="text-gray-600 space-y-4">
                  <p>
                    El UGC (User-Generated Content) es cualquier tipo de contenido —texto, videos, imágenes, reseñas, etc.— 
                    creado por personas reales en lugar de marcas. Este contenido es valorado por su autenticidad y 
                    capacidad para generar confianza.
                  </p>
                  
                  <p>
                    A diferencia de la publicidad tradicional, el UGC es percibido como más honesto y objetivo, 
                    ya que proviene de experiencias reales de usuarios con los productos o servicios.
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-contala-green/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-contala-navy" />
                    </div>
                    <div>
                      <span className="font-semibold text-contala-navy block">No es publicidad tradicional</span>
                      <span className="text-gray-600">Transmite autenticidad en lugar de mensajes comerciales</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-contala-green/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-contala-navy" />
                    </div>
                    <div>
                      <span className="font-semibold text-contala-navy block">Basado en experiencias reales</span>
                      <span className="text-gray-600">Creado por personas que han utilizado el producto</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-contala-green/20 p-1 rounded-full">
                      <Check className="h-5 w-5 text-contala-navy" />
                    </div>
                    <div>
                      <span className="font-semibold text-contala-navy block">Genera más confianza</span>
                      <span className="text-gray-600">Los consumidores confían más en opiniones de otros usuarios</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              <div className="absolute inset-0 bg-contala-cream/50 rounded-2xl -rotate-3 transform"></div>
              <div className="absolute inset-0 bg-contala-pink/10 rounded-2xl rotate-3 transform"></div>
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Creador de contenido trabajando"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white font-medium inline-block mb-3">
                      Creadores auténticos
                    </span>
                    <h3 className="text-2xl font-bold text-white">Generando contenido que conecta con audiencias reales</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Types of UGC */}
      <section className="py-20 bg-contala-softgray">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-contala-pink font-semibold mb-2 block">Formatos de contenido</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-contala-navy">Tipos de UGC para tu marca</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora los diferentes formatos de contenido que pueden crear tus colaboradores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ugcTypes.map((type, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                  activeTab === index ? "shadow-lg ring-2 ring-contala-pink" : "hover:shadow-md"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      activeTab === index ? "scale-110" : ""
                    }`}
                  />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeTab === index 
                        ? "bg-contala-pink text-white" 
                        : "bg-contala-cream text-contala-navy"
                    }`}>
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {ugcTypes.map((type, index) => (
            <div key={index} className={`${activeTab === index ? "block" : "hidden"}`}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold mb-4 text-contala-navy">Ejemplos de {type.title}</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {type.examples.map((example, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-contala-green/20 p-1 rounded-full mt-1">
                        <Check className="h-4 w-4 text-contala-navy" />
                      </div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-contala-pink font-semibold mb-2 block">Por qué funciona</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-contala-navy">
              Beneficios del UGC para tu marca
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre cómo el contenido generado por usuarios puede transformar tu estrategia de marketing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-contala-cream flex items-center justify-center mb-5">
                  <span className="text-xl font-bold text-contala-navy">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-contala-navy">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Example Section */}
      <section id="video-example" className="py-20 bg-contala-navy text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-contala-green font-semibold mb-2 block">Ve el UGC en acción</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ejemplos de UGC que impulsan resultados
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Mira cómo marcas reales utilizan el contenido generado por usuarios para conectar con su audiencia
            </p>
          </div>
          
          <div className="relative aspect-video max-w-4xl mx-auto overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-contala-pink/20 to-contala-navy/40 flex items-center justify-center">
              <Button 
                className="bg-white text-contala-navy hover:bg-white/90 h-16 w-16 rounded-full p-0"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-2 text-contala-green">Casos de éxito</h4>
              <p className="text-white/80">
                Marcas que han incrementado sus ventas en más de un 200% con estrategias de UGC
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-2 text-contala-green">Mejores prácticas</h4>
              <p className="text-white/80">
                Estrategias probadas para maximizar el impacto del contenido generado por usuarios
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-2 text-contala-green">Integración con tu estrategia</h4>
              <p className="text-white/80">
                Cómo combinar UGC con tus canales de marketing existentes
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-contala-pink to-contala-navy rounded-2xl p-8 md:p-16 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-contala-cream rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Comienza a impulsar tu marca con UGC hoy mismo
                </h2>
                
                <p className="text-xl mb-10 text-white/80">
                  Contala te conecta con creadores de contenido auténticos que comparten los valores de tu marca
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    className="bg-white text-contala-navy hover:bg-white/90 h-14 px-8 text-lg rounded-md"
                    asChild
                  >
                    <Link to="/register">Crear cuenta gratis</Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-md"
                    asChild
                  >
                    <Link to="/contact">Hablar con ventas</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UgcExplained;
