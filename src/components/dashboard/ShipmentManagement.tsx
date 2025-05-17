
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ShipmentTracker } from "./ShipmentTracker";
import { Package, Check, Send, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

// Define the form schema for shipment information
const shipmentFormSchema = z.object({
  trackingNumber: z.string().min(1, { message: "El número de tracking es obligatorio" }),
  carrier: z.string().min(1, { message: "El servicio de envío es obligatorio" }),
  additionalInfo: z.string().optional(),
});

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

interface ShipmentManagementProps {
  projectId: string;
  userRole: "client" | "creator";
  shipmentStatus?: "pending" | "shipped" | "delivered" | "confirmed" | null;
  trackingInfo?: {
    trackingNumber?: string;
    carrier?: string;
    additionalInfo?: string;
  };
  onUpdateShipment: (data: ShipmentFormValues) => void;
  onConfirmReceipt: () => void;
}

export function ShipmentManagement({ 
  projectId, 
  userRole,
  shipmentStatus = null,
  trackingInfo = {},
  onUpdateShipment,
  onConfirmReceipt
}: ShipmentManagementProps) {
  const [viewMode, setViewMode] = useState<"form" | "tracker">(
    shipmentStatus === "shipped" || shipmentStatus === "delivered" ? "tracker" : "form"
  );

  // Initialize form with existing data if available
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      trackingNumber: trackingInfo.trackingNumber || "",
      carrier: trackingInfo.carrier || "",
      additionalInfo: trackingInfo.additionalInfo || "",
    },
  });

  const onSubmit = (data: ShipmentFormValues) => {
    onUpdateShipment(data);
    toast.success("Información de envío actualizada correctamente");
    setViewMode("tracker");
  };

  // Conditionally render based on role and shipment status
  if (userRole === "client" && (shipmentStatus === null || shipmentStatus === "pending")) {
    return (
      <Card className="border border-[#4635B1]/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Información de Envío
          </CardTitle>
          <CardDescription>
            Por favor registra la información de envío del producto para que el creador pueda hacerle seguimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Tracking</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Número de seguimiento proporcionado por el servicio de mensajería
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="carrier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicio de Envío</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fedex">FedEx</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                        <SelectItem value="ups">UPS</SelectItem>
                        <SelectItem value="correo_argentino">Correo Argentino</SelectItem>
                        <SelectItem value="andreani">Andreani</SelectItem>
                        <SelectItem value="oca">OCA</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Información Adicional (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Información adicional sobre el envío" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-[#4635B1]">
                <Send className="mr-2 h-4 w-4" /> Registrar Información de Envío
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  // For shipped products (both client and creator can view)
  if (shipmentStatus === "shipped" || shipmentStatus === "delivered") {
    return (
      <Card className="border border-[#4635B1]/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Seguimiento de Envío
          </CardTitle>
          <CardDescription>
            {userRole === "client" 
              ? "El producto ha sido enviado al creador"
              : "La marca ha enviado un producto para este proyecto"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Servicio de Envío</p>
                <p className="font-medium">{trackingInfo.carrier || "No especificado"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Número de Tracking</p>
                <p className="font-medium">{trackingInfo.trackingNumber || "No especificado"}</p>
              </div>
            </div>
            
            {trackingInfo.additionalInfo && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500">Información Adicional</p>
                <p>{trackingInfo.additionalInfo}</p>
              </div>
            )}
          </div>
          
          <ShipmentTracker projectId={projectId} userRole={userRole === "client" ? "client" : "creator"} />
          
          {userRole === "creator" && shipmentStatus === "delivered" && (
            <div className="mt-4">
              <Button 
                onClick={onConfirmReceipt} 
                className="w-full bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2 h-4 w-4" /> Confirmar Recepción del Producto
              </Button>
            </div>
          )}
        </CardContent>
        
        {userRole === "client" && viewMode === "tracker" && (
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setViewMode("form")}
            >
              Editar Información de Envío
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card className="border border-[#4635B1]/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Estado de Envío
        </CardTitle>
        <CardDescription>
          {userRole === "creator" 
            ? "Esperando que la marca registre la información de envío"
            : "No hay información de envío registrada"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6 text-gray-500">
          <p>Aún no se ha registrado información de envío para este proyecto</p>
        </div>
      </CardContent>
    </Card>
  );
}
