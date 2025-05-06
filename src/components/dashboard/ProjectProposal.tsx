
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit2, Send, DollarSign, Plus, Minus, Package, Truck, CheckCircle2 } from "lucide-react";
import { ShipmentForm } from "./ShipmentForm";
import { ShipmentTracker } from "./ShipmentTracker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { shipmentService } from "@/services/api";
import { useUser } from "@/context/UserContext";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectProposalProps {
  project: Project;
  onPayment: () => void;
}

export function ProjectProposal({ project, onPayment }: ProjectProposalProps) {
  const [budget, setBudget] = useState<number>(project.budget || 10000);
  const [description, setDescription] = useState<string>(project.description);
  const [isEditing, setIsEditing] = useState<boolean>(project.status === "draft" || project.status === "rejected");
  const [urgentDelivery, setUrgentDelivery] = useState<boolean>(false);
  const [showShipmentForm, setShowShipmentForm] = useState<boolean>(false);
  const [shipmentCompleted, setShipmentCompleted] = useState<boolean>(false);
  const [showShipmentDialog, setShowShipmentDialog] = useState<boolean>(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState<boolean>(false);
  const [showPaymentComplete, setShowPaymentComplete] = useState<boolean>(false);
  
  const { userType } = useUser();
  const isCreator = userType === "creator";
  
  const handleSendProposal = () => {
    // In a real app, this would send the proposal to the backend
    if (project.status === "accepted") {
      setShowShipmentForm(true);
    } else {
      toast.success("Propuesta enviada con éxito!");
    }
  };

  const handleShipmentComplete = (shipmentData: any) => {
    setShipmentCompleted(true);
    setShowShipmentForm(false);
    toast.success("¡Etiqueta de envío generada correctamente!");
  };

  const handleProceedToPayment = () => {
    setIsPaymentProcessing(true);
    // Simulating payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setShowPaymentComplete(true);
      // Call the parent callback
      onPayment();
      toast.success("¡Pago procesado con éxito! Proyecto confirmado.");
    }, 2000);
  };

  const handleViewShipment = () => {
    setShowShipmentDialog(true);
  };

  const handleCheckShipmentStatus = async () => {
    try {
      const response = await shipmentService.getShipmentDetails(parseInt(project.id));
      if (response.data) {
        setShipmentCompleted(true);
        toast.success("Estado de envío actualizado");
      }
    } catch (error) {
      console.error("Error al verificar el estado del envío:", error);
      toast.error("No se pudo obtener información del envío");
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="bg-contala-cream/30 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Detalles de la propuesta</h3>
          {project.status === "sent" && (
            <Badge className="bg-amber-500">En espera de respuesta</Badge>
          )}
          {project.status === "rejected" && (
            <Badge className="bg-red-500">Rechazada</Badge>
          )}
          {project.status === "accepted" && showPaymentComplete && (
            <Badge className="bg-green-500">Proyecto confirmado</Badge>
          )}
        </div>
        
        {/* Proposal details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="creator" className="text-gray-500">Creador</Label>
              <div className="flex items-center mt-2">
                <div className="h-8 w-8 rounded-full bg-contala-green/20 flex items-center justify-center mr-2">
                  {project.creator.substring(0, 1)}
                </div>
                <span className="font-medium">{project.creator}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="budget" className="text-gray-500">Presupuesto</Label>
              {isEditing ? (
                <div className="flex items-center mt-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setBudget(prev => Math.max(1000, prev - 1000))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center border rounded px-3 py-2 mx-2 flex-1 bg-white">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                    <Input 
                      type="number" 
                      value={budget} 
                      onChange={e => setBudget(Math.max(0, parseInt(e.target.value) || 0))} 
                      className="border-0 p-0 focus-visible:ring-0 w-full"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setBudget(prev => prev + 1000)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="mt-2 font-bold text-lg">${budget.toLocaleString()}</div>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-500">Descripción del proyecto</Label>
            {isEditing ? (
              <Textarea 
                id="description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                className="mt-2 h-32 resize-none bg-white"
                placeholder="Describe los detalles del proyecto..."
              />
            ) : (
              <div className="mt-2 p-3 bg-white/50 rounded border">{description}</div>
            )}
          </div>
          
          {/* Urgent delivery option (only when editing) */}
          {isEditing && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="urgent-delivery" 
                checked={urgentDelivery} 
                onCheckedChange={setUrgentDelivery} 
              />
              <Label htmlFor="urgent-delivery">Entrega urgente (24-48h) +20%</Label>
            </div>
          )}
          
          {/* Payment and Shipment section (for accepted projects) */}
          {project.status === "accepted" && !showPaymentComplete && (
            <div className="bg-contala-green/10 p-4 rounded-lg mt-4 border border-contala-green/20">
              <h4 className="font-bold text-contala-green mb-2">Propuesta Aceptada</h4>
              <p className="text-sm mb-4">
                {isCreator ? 
                  "El cliente ha aceptado tu propuesta. Espera a que configure el envío y realice el pago." : 
                  "El creador ha aceptado tu propuesta. Para proceder, necesitas configurar el envío del producto y proceder con el pago."}
              </p>
              
              {isCreator ? (
                // Creator view
                <div className="space-y-4">
                  {shipmentCompleted ? (
                    <div className="flex items-center gap-2 text-sm p-2 bg-green-50 border border-green-200 rounded">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Etiqueta de envío generada por el cliente</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm p-2 bg-amber-50 border border-amber-200 rounded">
                      <Truck className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-700">Esperando que el cliente configure el envío</span>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={handleViewShipment}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Ver estado del envío
                  </Button>
                </div>
              ) : (
                // Client view
                shipmentCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm p-2 bg-green-50 border border-green-200 rounded">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Etiqueta de envío generada correctamente</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={handleViewShipment}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Ver estado del envío
                      </Button>
                      <Button 
                        className="flex-1 bg-contala-green"
                        onClick={handleProceedToPayment}
                        disabled={isPaymentProcessing}
                      >
                        {isPaymentProcessing ? (
                          <>Procesando...</>
                        ) : (
                          <>Proceder al Pago</>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full border-contala-green text-contala-green hover:bg-contala-green/10"
                    onClick={() => setShowShipmentForm(true)}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Configurar Envío
                  </Button>
                )
              )}
            </div>
          )}
          
          {/* Payment complete section */}
          {showPaymentComplete && (
            <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
              <h4 className="font-bold text-green-700 mb-2 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Proyecto Confirmado
              </h4>
              <p className="text-sm mb-4">
                {isCreator ? 
                  "El cliente ha completado el pago. Recibirás el producto a la dirección indicada." : 
                  "Has completado el pago. El creador recibirá el producto y podrás hacer seguimiento del envío."}
              </p>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleViewShipment}
              >
                <Truck className="mr-2 h-4 w-4" />
                Ver estado del envío
              </Button>
            </div>
          )}
          
          {/* Shipment Form */}
          {showShipmentForm && (
            <div className="mt-4">
              <ShipmentForm 
                projectId={project.id} 
                onComplete={handleShipmentComplete}
                onCancel={() => setShowShipmentForm(false)}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        {project.status === "sent" && !isCreator && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editar Propuesta
          </Button>
        )}
        
        {isEditing && !isCreator && (
          <Button 
            className="bg-contala-darkpink hover:bg-contala-darkpink/90"
            onClick={handleSendProposal}
          >
            <Send className="h-4 w-4 mr-2" />
            {project.status === "draft" ? "Enviar Propuesta" : "Actualizar Propuesta"}
          </Button>
        )}
        
        {shipmentCompleted && !showShipmentDialog && !showPaymentComplete && (
          <Button
            variant="outline"
            onClick={handleCheckShipmentStatus}
            className="mr-auto"
          >
            <Truck className="h-4 w-4 mr-2" />
            Actualizar Estado
          </Button>
        )}
      </div>
      
      {/* Shipment Dialog */}
      <Dialog open={showShipmentDialog} onOpenChange={setShowShipmentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Seguimiento de Envío</DialogTitle>
          </DialogHeader>
          <ShipmentTracker projectId={project.id} userRole={isCreator ? "creator" : "client"} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
