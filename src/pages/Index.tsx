
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CreatorsGallerySection from "@/components/CreatorsGallerySection";
import HowItWorksSection from "@/components/HowItWorksSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contala - Conectando marcas con creadores</title>
        <meta name="description" content="Conectá tu producto con los mejores creadores de contenido. Fácil, rápido y seguro." />
      </Helmet>
      <Navbar />
      <HeroSection />
      <CreatorsGallerySection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
