
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15 
      }
    },
    hover: {
      y: -8,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={plans[0]?.interval || 'default'} // Key based on the first plan's interval to force animation when switching
    >
      {plans.map((plan) => {
        const isCurrentPlan = currentPlanId === plan.id;
        const isAnnualPlan = plan.interval === "year";
        
        return (
          <motion.div 
            key={plan.id}
            variants={itemVariants}
            whileHover="hover"
          >
            <Card 
              className={`border rounded-xl ${isCurrentPlan 
                ? 'border-2 border-contala-darkpink' 
                : plan.popular 
                  ? 'ring-2 ring-contala-pink shadow-lg' 
                  : 'border-gray-200'} 
                relative flex flex-col h-full transition-all duration-300 hover:shadow-xl overflow-visible`}
            >
              {plan.popular && !isCurrentPlan && (
                <Badge className="absolute top-0 right-4 transform -translate-y-1/2 bg-contala-pink text-white">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.1, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    Popular
                  </motion.div>
                </Badge>
              )}
              {isCurrentPlan && (
                <Badge className="absolute top-0 right-4 transform -translate-y-1/2 bg-contala-darkpink text-white">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.1, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    Tu Plan
                  </motion.div>
                </Badge>
              )}
              {isAnnualPlan && !isCurrentPlan && !plan.popular && (
                <Badge className="absolute top-0 right-4 transform -translate-y-1/2 bg-contala-green text-contala-darkpink flex items-center gap-1 font-bold">
                  <Sparkles className="h-3 w-3" />
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.1, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    20% OFF
                  </motion.div>
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-contala-darkpink">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="text-3xl font-bold text-contala-darkpink">
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
                  {isAnnualPlan && (
                    <div className="text-sm text-contala-pink font-medium mt-2">
                      Facturación anual con 20% de descuento
                    </div>
                  )}
                </motion.div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Check className="h-5 w-5 text-contala-darkpink mr-2 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => onSubscribe(plan.id)} 
                  className={`w-full ${isCurrentPlan 
                    ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' 
                    : plan.popular 
                      ? 'bg-contala-darkpink hover:bg-opacity-90 text-white' 
                      : 'bg-white border border-contala-darkpink text-contala-darkpink hover:bg-contala-darkpink hover:text-white'}`}
                  disabled={isCurrentPlan}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {isCurrentPlan ? 'Plan actual' : plan.price === 0 ? 'Seleccionar plan gratuito' : 'Suscribirse'}
                  </motion.span>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
