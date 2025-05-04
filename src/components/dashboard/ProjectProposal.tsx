
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit2, Send, DollarSign, Plus, Minus, Package, Truck } from "lucide-react";
import { ShipmentForm } from "./ShipmentForm";
import { ShipmentTracker } from "./ShipmentTracker";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

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
    onPayment();
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
          
          {/* Payment section (for accepted projects) */}
          {project.status === "accepted" && !showShipmentForm && (
            <div className="bg-contala-green/10 p-4 rounded-lg mt-4 border border-contala-green/20">
              <h4 className="font-bold text-contala-green mb-2">Propuesta Aceptada</h4>
              <p className="text-sm mb-4">
                El creador ha aceptado tu propuesta. Para proceder, necesitas configurar el envío del producto y proceder con el pago.
              </p>
              {shipmentCompleted ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm p-2 bg-green-50 border border-green-200 rounded">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">Etiqueta de envío generada correctamente</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowShipmentDialog(true)}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Ver estado del envío
                    </Button>
                    <Button 
                      className="flex-1 bg-contala-green"
                      onClick={handleProceedToPayment}
                    >
                      Proceder al Pago
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
              )}
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
        {project.status === "sent" && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editar Propuesta
          </Button>
        )}
        
        {isEditing && (
          <Button 
            className="bg-contala-darkpink hover:bg-contala-darkpink/90"
            onClick={handleSendProposal}
          >
            <Send className="h-4 w-4 mr-2" />
            {project.status === "draft" ? "Enviar Propuesta" : "Actualizar Propuesta"}
          </Button>
        )}
      </div>
      
      {/* Shipment Dialog */}
      <Dialog open={showShipmentDialog} onOpenChange={setShowShipmentDialog}>
        <DialogContent className="max-w-3xl">
          <ShipmentTracker projectId={project.id} userRole="client" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
