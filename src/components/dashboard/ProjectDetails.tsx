
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, MessageSquare, Download, File, Clock, Check } from "lucide-react";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectDetailsProps {
  project: Project;
  onShowChat: () => void;
  onShowProposal: () => void;
  onModifyProposal: () => void;
}

export function ProjectDetails({ project, onShowChat, onShowProposal, onModifyProposal }: ProjectDetailsProps) {
  // Mock project deliverables for completed projects
  const projectDeliverables = project.status === "completed" ? [
    { name: "Propuesta_Final.pdf", type: "file", url: "#" },
    { name: "Contenido_Campana.zip", type: "zip", url: "#" },
    { name: "Muestras.jpg", type: "image", url: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=500" },
  ] : [];

  // Mock project milestones
  const milestones = [
    { title: "Propuesta enviada", date: project.date, completed: true },
    { title: "Propuesta aceptada", date: "15/04/2025", completed: project.status === "accepted" || project.status === "completed" },
    { title: "Pago realizado", date: "16/04/2025", completed: project.status === "completed" },
    { title: "Proyecto completado", date: "28/04/2025", completed: project.status === "completed" },
  ];

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Information */}
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
          </div>
        </div>
        
        {/* Milestones */}
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
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{milestone.title}</p>
                    <span className="text-sm text-gray-500">{milestone.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Deliverables (only for completed projects) */}
      {project.status === "completed" && (
        <>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Archivos entregados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {projectDeliverables.map((file, index) => (
                <Card key={index} className="p-3 flex items-center gap-3 bg-transparent border-contala-green/10">
                  {file.type === "image" ? (
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-contala-green/10 rounded flex items-center justify-center">
                      <File className="h-5 w-5 text-contala-green" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.type}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <Download className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
