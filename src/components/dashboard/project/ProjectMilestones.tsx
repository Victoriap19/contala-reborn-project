
import { Check, Clock, Package, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectMilestonesProps {
  project: Project;
  shipmentStatus?: "pending" | "shipped" | "delivered" | "confirmed" | null;
}

export function ProjectMilestones({ project, shipmentStatus }: ProjectMilestonesProps) {
  // Calculate milestones based on project status and shipment status
  const milestones = [
    { title: "Propuesta enviada", date: project.date, completed: true, icon: Check },
    { title: "Propuesta aceptada", date: "15/04/2025", completed: project.status === "accepted" || project.status === "completed", icon: Check },
    { 
      title: "Pago realizado", 
      date: "16/04/2025", 
      completed: project.status === "accepted" || project.status === "completed", 
      icon: Check 
    },
    { 
      title: "Envío configurado", 
      date: shipmentStatus ? "17/04/2025" : "Pendiente", 
      completed: shipmentStatus === "shipped" || shipmentStatus === "delivered" || shipmentStatus === "confirmed", 
      icon: Package 
    },
    { 
      title: "Producto entregado", 
      date: shipmentStatus === "delivered" || shipmentStatus === "confirmed" ? "25/04/2025" : "Pendiente", 
      completed: shipmentStatus === "delivered" || shipmentStatus === "confirmed", 
      icon: Truck 
    },
    { 
      title: "Proyecto completado", 
      date: project.status === "completed" ? "28/04/2025" : "Pendiente", 
      completed: project.status === "completed", 
      icon: Check 
    },
  ];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Progreso del proyecto</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3"
          >
            <div className={`flex items-center justify-center h-6 w-6 rounded-full mt-0.5 ${
              milestone.completed ? "bg-contala-green text-white" : "bg-gray-200"
            }`}>
              {milestone.completed ? (
                <milestone.icon className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{milestone.title}</p>
                <span className="text-sm text-gray-500">{milestone.date}</span>
              </div>
              {milestone.title === "Envío configurado" && shipmentStatus === "shipped" && (
                <div className="mt-1">
                  <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                    En ruta
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
