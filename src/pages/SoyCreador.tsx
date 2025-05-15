
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { ArrowRight } from "lucide-react";

export default function SoyCreador() {
  const navigate = useNavigate();
  const { setUserType } = useUser();
  
  const handleRegisterClick = () => {
    setUserType("creador");
    navigate("/register?type=creador");
  };
  
  const handleUgcExplainedClick = () => {
    navigate("/ugc-explained");
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contala - Para Creadores</title>
        <meta name="description" content="Descubre oportunidades como creador de contenido en Contala" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-contala-brown mb-6">
              Monetiza tu creatividad con Contala
            </h1>
            <p className="text-xl text-contala-brown/80 mb-8 max-w-3xl mx-auto">
              Conecta con marcas que buscan a alguien como tú, recibe propuestas de proyectos, y genera ingresos compartiendo tu autenticidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleRegisterClick}
                className="bg-contala-pink text-white hover:bg-contala-pink/90 h-12 px-8 text-lg"
              >
                Comenzar como Creador <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleUgcExplainedClick}
                variant="outline"
                className="border-contala-brown text-contala-brown hover:bg-contala-brown/10 h-12 px-8 text-lg"
              >
                ¿Qué es UGC? 
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 bg-contala-cream/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-contala-brown text-center mb-12">
            ¿Cómo funciona?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-contala-brown">1</span>
              </div>
              <h3 className="text-xl font-bold text-contala-brown text-center mb-4">Regístrate y crea tu perfil</h3>
              <p className="text-contala-brown/80 text-center">
                Crea una cuenta gratuita, completa tu perfil destacando tus habilidades, nicho y trabajos anteriores.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-contala-brown">2</span>
              </div>
              <h3 className="text-xl font-bold text-contala-brown text-center mb-4">Conecta con marcas</h3>
              <p className="text-contala-brown/80 text-center">
                Recibe propuestas directas o explora convocatorias abiertas y postula a las que más te interesen.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="w-16 h-16 bg-contala-pink/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-contala-brown">3</span>
              </div>
              <h3 className="text-xl font-bold text-contala-brown text-center mb-4">Cobra por tu trabajo</h3>
              <p className="text-contala-brown/80 text-center">
                Recibe pagos seguros a través de nuestro sistema una vez que tu entregable sea aprobado.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-contala-brown text-center mb-12">
            Beneficios para creadores
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-contala-pink/20 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-brown"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-contala-brown mb-3 text-center md:text-left">Pagos seguros</h3>
                <p className="text-contala-brown/80">
                  El sistema de escrow retiene el pago hasta que ambas partes están satisfechas con el trabajo. Recibes el 90% del valor acordado (Contala cobra solo 10% de comisión).
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-contala-pink/20 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-brown"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect width="18" height="12" x="3" y="4" rx="2"></rect></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-contala-brown mb-3 text-center md:text-left">Exposición</h3>
                <p className="text-contala-brown/80">
                  Destaca tu perfil y portafolio para ser descubierto por marcas en busca de creadores con tu estilo y audiencia.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-contala-pink/20 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-brown"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-contala-brown mb-3 text-center md:text-left">Sin negociaciones</h3>
                <p className="text-contala-brown/80">
                  Define tu precio, recibe propuestas claras y no pierdas tiempo en negociaciones. Tú decides qué proyectos aceptar.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-contala-pink/20 p-4 rounded-full h-16 w-16 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-contala-brown"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-contala-brown mb-3 text-center md:text-left">Tú eres el dueño</h3>
                <p className="text-contala-brown/80">
                  Mantén tu autenticidad y estilo. Tu creatividad es lo que las marcas valoran, no te pedimos cambiar quién eres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-contala-cream/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-contala-brown text-center mb-12">
            Lo que dicen nuestros creadores
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-contala-pink/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-contala-brown">Sofía Martínez</h4>
                  <p className="text-sm text-contala-brown/70">@sofi.lifestyle</p>
                </div>
              </div>
              <p className="text-contala-brown/80 italic">
                "Contala me permitió conectar con marcas que realmente valoran mi contenido. El proceso de pago es transparente y las propuestas son claras desde el inicio."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-contala-pink/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-contala-brown">Mateo Gómez</h4>
                  <p className="text-sm text-contala-brown/70">@mateofitness</p>
                </div>
              </div>
              <p className="text-contala-brown/80 italic">
                "Lo que más me gusta es que puedo elegir los proyectos que realmente se alinean con mi audiencia. He duplicado mis ingresos mensuales como creador."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-contala-brown/10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-contala-pink/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-contala-brown">Lucía Torres</h4>
                  <p className="text-sm text-contala-brown/70">@luciateaches</p>
                </div>
              </div>
              <p className="text-contala-brown/80 italic">
                "La plataforma facilita mucho la gestión de proyectos. Puedo ver claramente los requisitos y fechas límite, y la comunicación con las marcas es directa."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Commission Info & CTA */}
      <section className="py-16 bg-contala-pink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-contala-brown mb-6">
              Comisiones transparentes
            </h2>
            <p className="text-xl text-contala-brown/80 mb-8">
              En Contala solo cobramos <span className="font-bold">10% de comisión</span> por cada transacción exitosa. Sin costos ocultos, sin cuotas mensuales para creadores.
            </p>
            <p className="text-lg text-contala-brown/80 mb-12">
              Tú te enfocas en crear contenido increíble, nosotros nos encargamos de todo lo demás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleRegisterClick}
                className="bg-contala-pink text-white hover:bg-contala-pink/90 h-12 px-8 text-lg"
              >
                Registrarme como Creador <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleUgcExplainedClick}
                variant="outline"
                className="border-contala-brown text-contala-brown hover:bg-contala-brown/10 h-12 px-8 text-lg"
              >
                Descubre qué es UGC
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-contala-brown text-center mb-12">
            Preguntas frecuentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-contala-brown/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-contala-brown mb-2">¿Cómo recibo mi pago?</h3>
              <p className="text-contala-brown/80">
                Una vez que la marca aprueba tu entregable, el pago se libera automáticamente a tu cuenta de Contala. Puedes transferirlo a tu cuenta bancaria o billetera digital.
              </p>
            </div>
            
            <div className="border border-contala-brown/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-contala-brown mb-2">¿Qué pasa si la marca no está satisfecha?</h3>
              <p className="text-contala-brown/80">
                Contala ofrece un período de revisión para hacer ajustes. Si después de las revisiones no hay acuerdo, nuestro equipo interviene para mediar y encontrar una solución justa.
              </p>
            </div>
            
            <div className="border border-contala-brown/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-contala-brown mb-2">¿Puedo proponer mis propios proyectos?</h3>
              <p className="text-contala-brown/80">
                ¡Absolutamente! Puedes proponer ideas directamente a las marcas con las que quieras colaborar. Muchas colaboraciones exitosas comienzan con una propuesta creativa del creador.
              </p>
            </div>
            
            <div className="border border-contala-brown/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-contala-brown mb-2">¿Hay un mínimo de seguidores requerido?</h3>
              <p className="text-contala-brown/80">
                No, Contala valora la calidad sobre la cantidad. Creemos que los micro y nano influencers tienen gran impacto y autenticidad. Lo importante es tener una audiencia genuina y comprometida.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
