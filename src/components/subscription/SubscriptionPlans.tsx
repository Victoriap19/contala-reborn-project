
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => {
        const isCurrentPlan = currentPlanId === plan.id;
        return (
          <Card 
            key={plan.id} 
            className={`border-2 ${isCurrentPlan ? 'border-contala-green' : plan.popular ? 'border-contala-pink' : 'border-gray-200'} relative flex flex-col`}
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
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-contala-green">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${plan.price.toLocaleString()}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500 ml-1">
                    {plan.interval === "month" ? "/mes" : "/año"}
                  </span>
                )}
                {plan.price > 0 && (
                  <div className="text-xs text-gray-500 mt-1">+ IVA</div>
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
                className={`w-full ${isCurrentPlan ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : plan.popular ? 'bg-contala-pink hover:bg-contala-pink/90' : 'bg-contala-green hover:bg-contala-green/90'}`}
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
