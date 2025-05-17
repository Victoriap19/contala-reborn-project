
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function PricingSection() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  const { setUserType } = useUser();
  const [isAnnual, setIsAnnual] = useState(false);
  
  useEffect(() => {
    // Update plans based on billing period selection
    const updatePlans = () => {
      // All available plans
      const allPlans = [
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
          name: "Pro",
          price: 20000,
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
          name: "Pro",
          price: 192000, // 20000 x 12 - 20% = 192000
          interval: "year",
          description: "Para usuarios frecuentes con 20% de descuento anual",
          features: [
            "Hasta 10 propuestas o proyectos por mes",
            "Filtros avanzados",
            "Mensajes ilimitados",
            "Soporte rápido"
          ],
          popular: true
        },
        {
          id: 4,
          name: "Empresa",
          price: 45000,
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
          name: "Empresa",
          price: 432000, // 45000 x 12 - 20% = 432000
          interval: "year",
          description: "Para empresas y agencias con 20% de descuento anual",
          features: [
            "Hasta 30 propuestas o proyectos por mes",
            "Filtros avanzados",
            "Mensajes ilimitados",
            "Soporte prioritario",
            "API de integración"
          ]
        }
      ];
      
      // Filter plans based on selected billing period
      const filteredPlans = allPlans.filter(plan => 
        plan.interval === (isAnnual ? "year" : "month") || plan.price === 0
      );
      
      setPlans(filteredPlans);
    };
    
    updatePlans();
  }, [isAnnual]);

  const handleSubscribe = (planId: number) => {
    // Set user type to marca
    setUserType("marca");
    
    // Redirect to subscriptions page with the selected plan and billing period
    navigate(`/subscriptions?plan=${planId}&type=marca&billing=${isAnnual ? 'annual' : 'monthly'}`);
  };

  return (
    <section id="pricing" className="py-20 bg-contala-cream/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-contala-darkpink mb-3">Planes y Precios</h2>
          <p className="text-xl text-contala-darkpink/80 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades para conectar con los mejores creadores.
          </p>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? 'font-bold text-contala-darkpink' : 'text-contala-darkpink/70'}`}>
              Facturación mensual
            </Label>
            
            <Checkbox 
              id="billing-toggle" 
              checked={isAnnual}
              onCheckedChange={(checked) => setIsAnnual(checked as boolean)}
              className="data-[state=checked]:bg-contala-green data-[state=checked]:border-contala-green"
            />
            
            <Label htmlFor="billing-toggle" className={`text-sm flex items-center ${isAnnual ? 'font-bold text-contala-darkpink' : 'text-contala-darkpink/70'}`}>
              Facturación anual
              {isAnnual && (
                <span className="ml-2 text-xs font-medium bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">
                  20% OFF
                </span>
              )}
            </Label>
          </div>
        </div>
        
        <div className="mt-8">
          <SubscriptionPlans 
            plans={plans} 
            onSubscribe={handleSubscribe} 
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-contala-darkpink/70 mb-4">¿Tenés alguna duda sobre nuestros planes?</p>
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
