
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  interval: "month" | "year";
  description: string;
  features: string[];
  popular?: boolean;
};

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  currentPlanId?: number;
  onSubscribe: (planId: number) => void;
}

export function SubscriptionPlans({ plans, currentPlanId, onSubscribe }: SubscriptionPlansProps) {
  // Función para formatear el precio
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  // Función para obtener el texto de período
  const getPeriodText = (interval: "month" | "year") => {
    return interval === "month" ? "/mes" : "/año";
  };

  // Función para obtener las clases según el tipo de plan
  const getPlanStyle = (plan: SubscriptionPlan, isCurrentPlan: boolean) => {
    if (isCurrentPlan) {
      return 'border-contala-green';
    }
    
    if (plan.popular) {
      return 'border-contala-pink';
    }
    
    if (plan.interval === "year") {
      return 'border-amber-400';
    }
    
    return 'border-gray-200';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan) => {
        const isCurrentPlan = currentPlanId === plan.id;
        const isAnnual = plan.interval === "year";
        
        return (
          <Card 
            key={plan.id} 
            className={`border-2 ${getPlanStyle(plan, isCurrentPlan)} relative flex flex-col h-full`}
          >
            {plan.popular && (
              <Badge className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 bg-contala-pink text-white">
                Popular
              </Badge>
            )}
            {isCurrentPlan && (
              <Badge className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 bg-contala-green text-white">
                Tu Plan
              </Badge>
            )}
            {isAnnual && !isCurrentPlan && !plan.popular && (
              <Badge className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3 bg-amber-400 text-white flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>20% OFF</span>
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-contala-green">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${formatPrice(plan.price)}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500 ml-1">
                    {getPeriodText(plan.interval)}
                  </span>
                )}
                {plan.price > 0 && (
                  <div className="text-xs text-gray-500 mt-1">+ IVA</div>
                )}
                {isAnnual && (
                  <div className="text-sm text-amber-600 font-medium mt-2">
                    Facturación anual con 20% de descuento
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => onSubscribe(plan.id)} 
                className={`w-full ${isCurrentPlan 
                  ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' 
                  : isAnnual 
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : plan.popular 
                      ? 'bg-contala-pink hover:bg-contala-pink/90' 
                      : 'bg-contala-green hover:bg-contala-green/90'}`}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? 'Plan actual' : plan.price === 0 ? 'Seleccionar plan gratuito' : 'Suscribirse'}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
