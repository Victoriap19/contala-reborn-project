
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function PricingSection() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  
  useEffect(() => {
    // Datos de ejemplo para demostración
    setPlans([
      {
        id: 1,
        name: "Free",
        price: 0,
        interval: "month",
        description: "Funcionalidades básicas para comenzar",
        features: [
          "Búsqueda de creadores",
          "Hasta 2 propuestas o proyectos al mes",
          "Acceso solo a proyectos públicos"
        ]
      },
      {
        id: 2,
        name: "Pro Mensual",
        price: 12000,
        interval: "month",
        description: "Para usuarios frecuentes",
        features: [
          "Mensajes ilimitados",
          "Filtros avanzados",
          "Recordatorios",
          "Soporte rápido"
        ],
        popular: true
      },
      {
        id: 3,
        name: "Pro Anual",
        price: 120000,
        interval: "year",
        description: "La mejor relación precio-calidad (2 meses gratis)",
        features: [
          "Todo lo incluido en Pro Mensual",
          "15% de ahorro vs mensual",
          "Soporte prioritario"
        ]
      }
    ]);
  }, []);

  const handleSubscribe = (planId: number) => {
    // Simulate redirection to MercadoPago
    toast.info("Redirigiendo a MercadoPago para procesar el pago...");
    
    // In a real scenario, we would call an API to create a payment and get the MP checkout URL
    setTimeout(() => {
      // For demo purposes, we'll simulate a successful payment and redirect to registration
      toast.success("Pago procesado correctamente");
      navigate(`/register?plan=${planId}`);
    }, 2000);
  };

  return (
    <section id="pricing" className="py-20 bg-contala-cream/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-contala-green mb-3">Planes y Precios</h2>
          <p className="text-xl text-contala-green/80 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades para conectar con los mejores creadores.
          </p>
        </div>
        
        <div className="mt-12">
          <SubscriptionPlans 
            plans={plans} 
            onSubscribe={handleSubscribe} 
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-contala-green/70 mb-4">¿Tenés alguna duda sobre nuestros planes?</p>
          <Button 
            variant="outline"
            className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-cream"
            onClick={() => navigate("/contact")}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
}
