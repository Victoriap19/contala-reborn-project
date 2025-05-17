
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

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

interface CurrentSubscriptionProps {
  subscription: Subscription;
  onCancel: () => void;
}

export function CurrentSubscription({ subscription, onCancel }: CurrentSubscriptionProps) {
  const endDate = new Date(subscription.current_period_end);
  const formattedEndDate = endDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div variants={item}>
        <Card className="border-2 border-contala-darkpink">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-contala-darkpink">
              Suscripción actual: {subscription.plan.name}
            </CardTitle>
            <CardDescription>
              {subscription.status === "active" 
                ? "Tu suscripción está activa" 
                : subscription.status === "canceled" 
                ? "Tu suscripción ha sido cancelada pero sigue activa hasta el final del período" 
                : "Hay un problema con tu método de pago"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div 
              className="flex items-center space-x-2 text-contala-darkpink"
              variants={item}
            >
              <CalendarCheck className="h-5 w-5" />
              <span>
                {subscription.status === "canceled" 
                  ? `Activa hasta el ${formattedEndDate}` 
                  : `Próxima renovación: ${formattedEndDate}`
                }
              </span>
            </motion.div>
            
            <motion.div className="mt-4" variants={item}>
              <h4 className="font-semibold mb-2">Tu plan incluye:</h4>
              <ul className="space-y-2">
                {subscription.plan.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Check className="h-5 w-5 text-contala-darkpink mr-2 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {subscription.status === "past_due" && (
              <motion.div variants={item}>
                <Alert className="mt-4 bg-contala-cream border-contala-pink/30">
                  <AlertTitle className="text-contala-darkpink">Problema de pago</AlertTitle>
                  <AlertDescription className="text-contala-darkpink/80">
                    Hay un problema con tu método de pago. Por favor, actualiza tu información de pago para evitar la interrupción del servicio.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            {subscription.status === "active" && (
              <motion.div 
                variants={item}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="outline" 
                  className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
                  onClick={onCancel}
                >
                  Cancelar suscripción
                </Button>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
