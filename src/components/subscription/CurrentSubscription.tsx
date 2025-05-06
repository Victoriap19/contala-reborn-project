
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarCheck, Check } from "lucide-react";

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
  
  return (
    <Card className="border-2 border-contala-green">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-contala-green">
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
        <div className="flex items-center space-x-2 text-contala-green">
          <CalendarCheck className="h-5 w-5" />
          <span>
            {subscription.status === "canceled" 
              ? `Activa hasta el ${formattedEndDate}` 
              : `Próxima renovación: ${formattedEndDate}`
            }
          </span>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Tu plan incluye:</h4>
          <ul className="space-y-2">
            {subscription.plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {subscription.status === "past_due" && (
          <Alert className="mt-4 bg-amber-50 border-amber-200">
            <AlertTitle className="text-amber-800">Problema de pago</AlertTitle>
            <AlertDescription className="text-amber-700">
              Hay un problema con tu método de pago. Por favor, actualiza tu información de pago para evitar la interrupción del servicio.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {subscription.status === "active" && (
          <Button 
            variant="outline" 
            className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
            onClick={onCancel}
          >
            Cancelar suscripción
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
