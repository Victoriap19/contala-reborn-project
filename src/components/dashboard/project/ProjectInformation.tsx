
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Truck } from "lucide-react";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectInformationProps {
  project: Project;
  shipmentStatus: "pending" | "shipped" | "delivered" | "confirmed" | null;
  onShowChat: () => void;
  onShowProposal: () => void;
  onModifyProposal: () => void;
  onShowShipment: () => void;
}

export function ProjectInformation({ 
  project, 
  shipmentStatus, 
  onShowChat, 
  onShowProposal, 
  onModifyProposal,
  onShowShipment
}: ProjectInformationProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Información del proyecto</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Título:</span>
          <span className="font-medium">{project.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Creador:</span>
          <span className="font-medium">{project.creator}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Fecha:</span>
          <span>{project.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Presupuesto:</span>
          <span className="font-medium">${project.budget?.toLocaleString() || "No definido"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Estado:</span>
          <Badge variant={
            project.status === "completed" ? "default" :
            project.status === "accepted" ? "secondary" :
            project.status === "rejected" ? "destructive" :
            "outline"
          } className={
            project.status === "accepted" ? "bg-green-500 hover:bg-green-600" : ""
          }>
            {project.status === "draft" ? "Borrador" :
             project.status === "sent" ? "Enviado" :
             project.status === "accepted" ? "Aceptado" :
             project.status === "rejected" ? "Rechazado" :
             "Completado"}
          </Badge>
        </div>
        {shipmentStatus && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Envío:</span>
            <Badge variant={
              shipmentStatus === "confirmed" ? "default" :
              shipmentStatus === "delivered" ? "secondary" :
              shipmentStatus === "shipped" ? "outline" :
              "outline"
            } className={
              shipmentStatus === "confirmed" ? "bg-[#4635B1]" :
              shipmentStatus === "delivered" ? "bg-green-500" : ""
            }>
              {shipmentStatus === "pending" ? "Pendiente" :
               shipmentStatus === "shipped" ? "Enviado" :
               shipmentStatus === "delivered" ? "Entregado" :
               "Confirmado"}
            </Badge>
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-sm font-bold mb-1">Descripción:</h4>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {(project.status === "sent" || project.status === "accepted" || project.status === "completed") && (
          <Button 
            variant="secondary" 
            size="sm"
            className="mt-2"
            onClick={onShowProposal}
          >
            <FileText className="mr-2 h-4 w-4" />
            Ver Propuesta
          </Button>
        )}
        
        {(project.status === "sent") && (
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 border-contala-green text-contala-green hover:bg-contala-green/10"
            onClick={onModifyProposal}
          >
            <FileText className="mr-2 h-4 w-4" />
            Modificar Propuesta
          </Button>
        )}
        
        {(project.status === "accepted" || project.status === "completed") && (
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2"
            onClick={onShowChat}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat con creador
          </Button>
        )}
        
        {(project.status === "accepted" || project.status === "completed") && (
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 border-contala-green text-contala-green hover:bg-contala-green/10"
            onClick={onShowShipment}
          >
            <Truck className="mr-2 h-4 w-4" />
            {shipmentStatus === "pending" ? "Registrar envío" : "Ver envío"}
          </Button>
        )}
      </div>
    </div>
  );
}
