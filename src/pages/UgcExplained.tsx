
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { ArrowRight } from "lucide-react";

export default function UgcExplained() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  
  const handleRegisterClick = () => {
    setUserType("creador");
    navigate("/register?type=creador");
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>¿Qué es UGC? | Contala</title>
        <meta name="description" content="Descubre qué es el User Generated Content y por qué es una gran oportunidad para creadores" />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-contala-green mb-8 text-center">
              ¿Qué es ser creador UGC?
            </h1>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">Creadores de Contenido Generado por Usuarios</h2>
              <p className="text-lg text-contala-green/80 mb-6">
                UGC son las siglas de "User Generated Content" o "Contenido Generado por Usuarios". 
                Los creadores UGC son personas que producen contenido auténtico para marcas, 
                que parece creado por usuarios reales y no como publicidad tradicional.
              </p>
              <p className="text-lg text-contala-green/80">
                A diferencia de los influencers tradicionales, los creadores UGC no necesariamente promocionan 
                el contenido en sus propias redes sociales. En su lugar, crean contenido para que las marcas lo utilicen 
                en sus canales oficiales, campañas publicitarias o sitios web.
              </p>
            </section>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">¿Por qué convertirse en creador UGC?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Barreras de entrada bajas</h3>
                  <p className="text-contala-green/80">
                    No necesitas miles de seguidores ni métricas de engagement. Lo que importa es tu creatividad y 
                    habilidad para producir contenido auténtico y de calidad.
                  </p>
                </div>
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Flexibilidad total</h3>
                  <p className="text-contala-green/80">
                    Trabaja desde cualquier lugar, elige tus horarios y los proyectos que te interesan. Tú decides cuánto quieres trabajar.
                  </p>
                </div>
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Ingresos constantes</h3>
                  <p className="text-contala-green/80">
                    Mientras que los influencers dependen de su crecimiento en redes, como creador UGC puedes generar ingresos constantes basados en tus habilidades.
                  </p>
                </div>
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Desarrollo profesional</h3>
                  <p className="text-contala-green/80">
                    Adquiere experiencia en marketing, producción audiovisual, y storytelling mientras construyes un portafolio diverso.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">¿Qué tipos de contenido puedes crear?</h2>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-green"><path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="m10 7-2.8-2.9a2 2 0 0 0-1.4-.6H4"></path><circle cx="15" cy="15" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-2 text-center md:text-left">Reseñas de productos</h3>
                    <p className="text-contala-green/80">
                      Comparte tu experiencia real con el producto, destacando características, beneficios y resultados.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-green"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-2 text-center md:text-left">Tutoriales</h3>
                    <p className="text-contala-green/80">
                      Explica paso a paso cómo utilizar un producto o servicio, mostrando su facilidad de uso y versatilidad.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-green"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2"></path><path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-2 text-center md:text-left">Testimonios</h3>
                    <p className="text-contala-green/80">
                      Comparte una historia personal sobre cómo un producto o servicio te ayudó a resolver un problema o mejorar tu vida.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-green"><path d="M15 10v-3h2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2h-3"></path><path d="M15 10 9 4l3 8 3-2 2.5 5.5"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-2 text-center md:text-left">Contenido lifestyle</h3>
                    <p className="text-contala-green/80">
                      Integra productos en situaciones cotidianas, mostrando cómo encajan naturalmente en un estilo de vida específico.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-contala-pink/10 p-8 rounded-xl mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6 text-center">¿Cómo empezar con Contala?</h2>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-contala-green text-white rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-1">Regístrate como creador</h3>
                    <p className="text-contala-green/80">
                      Completa tu perfil con información sobre tu experiencia, estilo y especialidades. 
                      ¡No necesitas tener experiencia previa!
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-contala-green text-white rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-1">Explora proyectos disponibles</h3>
                    <p className="text-contala-green/80">
                      Navega por los proyectos publicados por marcas y envía propuestas a los que te interesen.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-contala-green text-white rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-1">Crea contenido increíble</h3>
                    <p className="text-contala-green/80">
                      Cuando tu propuesta sea aceptada, podrás comenzar a crear contenido siguiendo las pautas del proyecto.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-contala-green text-white rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-contala-green mb-1">Recibe tu pago</h3>
                    <p className="text-contala-green/80">
                      Una vez que la marca apruebe tu contenido, recibirás tu pago de forma segura a través de nuestra plataforma.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
            
            <div className="text-center">
              <Button 
                onClick={handleRegisterClick}
                className="bg-contala-green text-white hover:bg-contala-green/90 h-12 px-8 text-lg"
              >
                Comenzar como Creador UGC <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
