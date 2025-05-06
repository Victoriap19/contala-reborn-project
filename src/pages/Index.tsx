
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-contala-cream">
      <Helmet>
        <title>Contala - Conectando marcas con creadores</title>
        <meta name="description" content="Conectá tu producto con los mejores creadores de contenido. Fácil, rápido y seguro." />
      </Helmet>
      <Navbar />
      <HeroSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
