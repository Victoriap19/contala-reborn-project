
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { CurrentSubscription } from "@/components/subscription/CurrentSubscription";
import { subscriptionService } from "@/services/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  interval: "month" | "year";
  description: string;
  features: string[];
  popular?: boolean;
};

type Subscription = {
  id: number;
  status: "active" | "canceled" | "past_due";
  current_period_end: string;
  plan: SubscriptionPlan;
};

export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Usar los datos reales de la API cuando estén disponibles
        // const plansResponse = await subscriptionService.getPlans();
        // setPlans(plansResponse.data);
        
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
        
        try {
          // Intentar obtener la suscripción actual
          const subscriptionResponse = await subscriptionService.getCurrentSubscription();
          setCurrentSubscription(subscriptionResponse.data);
        } catch (error) {
          console.log("No hay suscripción activa o error al obtenerla");
          setCurrentSubscription(null);
        }
      } catch (error) {
        console.error("Error al cargar los datos de suscripción:", error);
        toast.error("No se pudieron cargar los planes de suscripción");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSubscribe = async (planId: number) => {
    try {
      // Aquí se implementaría la lógica real para suscribirse
      toast.success("Procesando suscripción...");
      
      // Simular una suscripción exitosa
      setTimeout(() => {
        toast.success("¡Suscripción activada con éxito!");
        // Actualizar el estado local con la nueva suscripción
        const selectedPlan = plans.find(p => p.id === planId);
        if (selectedPlan) {
          setCurrentSubscription({
            id: Math.floor(Math.random() * 1000),
            status: "active",
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            plan: selectedPlan
          });
        }
      }, 2000);
    } catch (error) {
      console.error("Error al suscribirse:", error);
      toast.error("Hubo un problema al procesar tu suscripción");
    }
  };
  
  const handleCancelSubscription = async () => {
    try {
      // Aquí se implementaría la lógica real para cancelar la suscripción
      toast.success("Procesando cancelación...");
      
      // Simular una cancelación exitosa
      setTimeout(() => {
        toast.success("Suscripción cancelada. Seguirá activa hasta el final del período de facturación.");
        // Actualizar el estado local
        if (currentSubscription) {
          setCurrentSubscription({
            ...currentSubscription,
            status: "canceled"
          });
        }
      }, 2000);
    } catch (error) {
      console.error("Error al cancelar la suscripción:", error);
      toast.error("Hubo un problema al cancelar tu suscripción");
    }
  };

  return (
    <>
      <Helmet>
        <title>Suscripciones | Contala</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold text-contala-green mb-8">Suscripciones</h1>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-contala-green animate-spin" />
            <span className="ml-2">Cargando planes de suscripción...</span>
          </div>
        ) : (
          <>
            {currentSubscription && (
              <CurrentSubscription 
                subscription={currentSubscription} 
                onCancel={handleCancelSubscription} 
              />
            )}
            
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-contala-green mb-6">
                {currentSubscription ? "Cambiar plan" : "Elige tu plan"}
              </h2>
              <SubscriptionPlans 
                plans={plans} 
                currentPlanId={currentSubscription?.plan.id} 
                onSubscribe={handleSubscribe} 
              />
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}
