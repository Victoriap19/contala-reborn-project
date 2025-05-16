import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { CurrentSubscription } from "@/components/subscription/CurrentSubscription";
import { subscriptionService } from "@/services/api";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
const emailSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un email válido"
  })
});
export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const navigate = useNavigate();
  const {
    userType,
    setUserType
  } = useUser();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  // Asegurarse de que estamos en el flujo de usuario regular
  useEffect(() => {
    if (userType === "creador") {
      // Si es un creador, redirigir al registro de creador
      navigate("/register?type=creador");
    } else {
      // Si no, asegurarse de que estamos en el flujo de usuario regular
      setUserType("marca");
    }
  }, [userType, setUserType, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Datos actualizados según los nuevos planes
        setPlans([{
          id: 1,
          name: "Free",
          price: 0,
          interval: "month",
          description: "Funcionalidades básicas para comenzar",
          features: ["1 propuesta o proyecto por mes", "Acceso solo a proyectos públicos", "Soporte por email"]
        }, {
          id: 2,
          name: "Pro Mensual",
          price: 12000,
          interval: "month",
          description: "Para usuarios frecuentes",
          features: ["Hasta 10 propuestas o proyectos por mes", "Filtros avanzados", "Mensajes ilimitados", "Soporte rápido"],
          popular: true
        }, {
          id: 3,
          name: "Pro Anual",
          price: 115200,
          // 12000 x 12 - 20% = 115200
          interval: "year",
          description: "Pro con 20% de descuento anual",
          features: ["Todo lo incluido en Pro Mensual", "20% de ahorro vs mensual", "Hasta 10 propuestas o proyectos por mes", "Soporte prioritario"]
        }, {
          id: 4,
          name: "Empresa Mensual",
          price: 30000,
          interval: "month",
          description: "Para empresas y agencias",
          features: ["Hasta 30 propuestas o proyectos por mes", "Filtros avanzados", "Mensajes ilimitados", "Soporte prioritario", "API de integración"]
        }, {
          id: 5,
          name: "Empresa Anual",
          price: 288000,
          // 30000 x 12 - 20% = 288000
          interval: "year",
          description: "Empresa con 20% de descuento anual",
          features: ["Todo lo incluido en Empresa Mensual", "20% de ahorro vs mensual", "Hasta 30 propuestas o proyectos por mes", "Soporte personalizado"]
        }]);
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
  const handleSubscribe = (planId: number) => {
    // Open email dialog and store the selected plan ID
    setSelectedPlanId(planId);
    setEmailDialogOpen(true);
  };
  const proceedToPayment = (email: string) => {
    if (!selectedPlanId) return;

    // Simulate redirection to MercadoPago
    toast.info("Redirigiendo a MercadoPago para procesar el pago...");

    // Store the email temporarily for registration
    sessionStorage.setItem("userEmail", email);

    // In a real scenario, we would call an API to create a payment and get the MP checkout URL
    setTimeout(() => {
      // For demo purposes, we'll simulate a successful payment and redirect to registration
      toast.success("Pago procesado correctamente");
      // Explicitly set marca user type in the URL
      navigate(`/register?plan=${selectedPlanId}&type=marca&email=${encodeURIComponent(email)}`);
    }, 2000);
  };
  const onSubmitEmail = (values: z.infer<typeof emailSchema>) => {
    setEmailDialogOpen(false);
    proceedToPayment(values.email);
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
  return <>
      <Helmet>
        <title>Suscripciones | Contala</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-contala-brown my-[78px] py-[2px]">Suscripciones</h1>
        
        {loading ? <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-contala-green animate-spin" />
            <span className="ml-2">Cargando planes de suscripción...</span>
          </div> : <>
            {currentSubscription && <CurrentSubscription subscription={currentSubscription} onCancel={handleCancelSubscription} />}
            
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-contala-coral my-[39px]">
                {currentSubscription ? "Cambiar plan" : "Elige tu plan"}
              </h2>
              <SubscriptionPlans plans={plans} currentPlanId={currentSubscription?.plan.id} onSubscribe={handleSubscribe} />
            </div>
          </>}
      </main>
      
      <Footer />
      
      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ingresa tu email para continuar</DialogTitle>
            <DialogDescription>
              Necesitamos tu email para procesar el pago y crear tu cuenta.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEmail)} className="space-y-4">
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem>
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <div className="relative">
                      <FormControl>
                        <Input id="email" placeholder="tu@email.com" className="pl-10" {...field} />
                      </FormControl>
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-contala-green/60 h-5 w-5" />
                    </div>
                    <FormMessage />
                  </FormItem>} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEmailDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Continuar al pago</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>;
}