
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function PricingSection() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  const { setUserType } = useUser();
  
  useEffect(() => {
    // Datos actualizados según los nuevos planes
    setPlans([
      {
        id: 1,
        name: "Free",
        price: 0,
        interval: "month",
        description: "Funcionalidades básicas para comenzar",
        features: [
          "1 propuesta o proyecto por mes",
          "Acceso solo a proyectos públicos",
          "Soporte por email"
        ]
      },
      {
        id: 2,
        name: "Pro Mensual",
        price: 12000,
        interval: "month",
        description: "Para usuarios frecuentes",
        features: [
          "Hasta 10 propuestas o proyectos por mes",
          "Filtros avanzados",
          "Mensajes ilimitados",
          "Soporte rápido"
        ],
        popular: true
      },
      {
        id: 3,
        name: "Pro Anual",
        price: 115200, // 12000 x 12 - 20% = 115200
        interval: "year",
        description: "Pro con 20% de descuento anual",
        features: [
          "Todo lo incluido en Pro Mensual",
          "20% de ahorro vs mensual",
          "Hasta 10 propuestas o proyectos por mes",
          "Soporte prioritario"
        ]
      },
      {
        id: 4,
        name: "Empresa Mensual",
        price: 30000,
        interval: "month",
        description: "Para empresas y agencias",
        features: [
          "Hasta 30 propuestas o proyectos por mes",
          "Filtros avanzados",
          "Mensajes ilimitados",
          "Soporte prioritario",
          "API de integración"
        ]
      },
      {
        id: 5,
        name: "Empresa Anual",
        price: 288000, // 30000 x 12 - 20% = 288000
        interval: "year",
        description: "Empresa con 20% de descuento anual",
        features: [
          "Todo lo incluido en Empresa Mensual",
          "20% de ahorro vs mensual",
          "Hasta 30 propuestas o proyectos por mes",
          "Soporte personalizado"
        ]
      }
    ]);
  }, []);

  const handleSubscribe = (planId: number) => {
    // Set user type to marca
    setUserType("marca");
    
    // Redirect to subscriptions page
    navigate(`/subscriptions?plan=${planId}&type=marca`);
  };

  return (
    <section id="pricing" className="py-20 bg-white">
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
            className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-white"
            onClick={() => navigate("/contact")}
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
}
