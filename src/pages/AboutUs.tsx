
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sobre Nosotros | Contala</title>
        <meta name="description" content="Conoce más sobre la misión y el equipo detrás de Contala." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-contala-green mb-8 text-center">
              Sobre Nosotros
            </h1>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">Nuestra Misión</h2>
              <p className="text-lg text-contala-green/80 mb-6">
                En Contala, conectamos marcas con creadores de contenido de manera transparente, 
                segura y eficiente. Nuestra plataforma nació de la necesidad de simplificar el proceso 
                de colaboración entre marcas y creadores, eliminando intermediarios y asegurando pagos justos.
              </p>
              <p className="text-lg text-contala-green/80">
                Creemos en el poder de la creatividad auténtica y buscamos facilitar relaciones de trabajo 
                duraderas que beneficien tanto a las marcas como a los creadores de contenido.
              </p>
            </section>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">Nuestros Valores</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Transparencia</h3>
                  <p className="text-contala-green/80">
                    Todas nuestras operaciones, comisiones y procesos son completamente transparentes para todos los usuarios.
                  </p>
                </div>
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Seguridad</h3>
                  <p className="text-contala-green/80">
                    Nuestro sistema de escrow protege tanto a marcas como a creadores, asegurando que el trabajo sea valorado justamente.
                  </p>
                </div>
                <div className="bg-contala-pink/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-contala-green mb-3">Comunidad</h3>
                  <p className="text-contala-green/80">
                    Fomentamos una comunidad de respeto mutuo donde la creatividad y la colaboración son la prioridad.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-contala-green mb-6">Nuestro Equipo</h2>
              <p className="text-lg text-contala-green/80 mb-8">
                Somos un equipo de profesionales apasionados por el marketing, la tecnología y el contenido digital. 
                Entendemos las necesidades tanto de las marcas como de los creadores porque hemos estado en ambos lados del proceso.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-contala-green/10 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-contala-green">Victoria Pérez</h3>
                  <p className="text-contala-green/80">CEO & Fundadora</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-contala-green/10 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-contala-green">Martín González</h3>
                  <p className="text-contala-green/80">CTO</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-contala-green/10 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-contala-green">Lucía Rodríguez</h3>
                  <p className="text-contala-green/80">Directora de Operaciones</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold text-contala-green mb-6">Nuestra Historia</h2>
              <p className="text-lg text-contala-green/80 mb-4">
                Contala nació en 2023 cuando nuestra fundadora, Victoria, experimentó de primera mano la frustración 
                que sentían tanto marcas como creadores al intentar colaborar.
              </p>
              <p className="text-lg text-contala-green/80 mb-4">
                Después de años trabajando en agencias de marketing y como creadora de contenido independiente, 
                Victoria identificó la necesidad de una plataforma que simplificara estos procesos, eliminando 
                intermediarios innecesarios y asegurando pagos justos.
              </p>
              <p className="text-lg text-contala-green/80">
                Hoy, Contala se ha convertido en el puente que conecta marcas innovadoras con talentosos creadores 
                en toda Latinoamérica, facilitando colaboraciones exitosas y ayudando a ambas partes a alcanzar sus objetivos.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
