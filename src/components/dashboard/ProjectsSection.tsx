import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Eye, MessageSquare, Pencil, X } from "lucide-react";
import { ProjectChat } from "./ProjectChat";
import { ScrollArea } from "@/components/ui/scroll-area";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

const projectsData: Project[] = [
  { id: "1", title: "Campaña Instagram", creator: "Laura Rodríguez", status: "accepted", date: "12/04/2025", budget: 25000, description: "Creación de contenido para campaña de producto nuevo." },
  { id: "2", title: "Video Explicativo", creator: "Carlos Gómez", status: "sent", date: "08/04/2025", budget: 30000, description: "Video explicativo de uso del producto para canal de YouTube." },
  { id: "3", title: "Fotografía Productos", creator: "Ana Martínez", status: "draft", date: "05/04/2025", description: "Sesión de fotografías para catálogo de productos." },
  { id: "4", title: "Contenido Blog", creator: "Daniel López", status: "rejected", date: "01/04/2025", budget: 15000, description: "Creación de 5 artículos para blog corporativo." },
  { id: "5", title: "Reel Promocional", creator: "Valentina Ruiz", status: "completed", date: "20/03/2025", budget: 18000, description: "Reel promocional para lanzamiento de temporada." },
  { id: "6", title: "Post Redes Sociales", creator: "Martín Sánchez", status: "accepted", date: "15/03/2025", budget: 12000, description: "Diseño de 10 posts para redes sociales." },
];

// Component for displaying project status badge
const ProjectStatusBadge = ({ status }: { status: Project["status"] }) => {
  const statusConfig = {
    draft: { label: "Borrador", variant: "secondary", },
    sent: { label: "Propuesta Enviada", variant: "outline" },
    accepted: { label: "Aceptado", variant: "success" },
    rejected: { label: "Rechazado", variant: "destructive" },
    completed: { label: "Completado", variant: "default" },
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant as any} className={
      status === "accepted" ? "bg-green-500" : 
      status === "rejected" ? "bg-red-500" : 
      status === "completed" ? "bg-contala-green" :
      ""
    }>
      {config.label}
    </Badge>
  );
};

// Additional Action Button Component
const ActionButton = ({ project, onAction }: { project: Project; onAction: (action: string, project: Project) => void }) => {
  if (project.status === "draft") {
    return (
      <Button variant="outline" size="sm" onClick={() => onAction("send", project)}>
        <MessageSquare className="mr-1 h-3 w-3" />
        Enviar Propuesta
      </Button>
    );
  }
  
  if (project.status === "sent") {
    return (
      <Button variant="outline" size="sm" onClick={() => onAction("view", project)}>
        <Eye className="mr-1 h-3 w-3" />
        Ver Propuesta
      </Button>
    );
  }
  
  if (project.status === "accepted") {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onAction("confirm", project)}>
          <Check className="mr-1 h-3 w-3" />
          Confirmar
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAction("cancel", project)}>
          <X className="mr-1 h-3 w-3" />
          Cancelar
        </Button>
      </div>
    );
  }
  
  if (project.status === "rejected") {
    return (
      <Button variant="outline" size="sm" onClick={() => onAction("resend", project)}>
        <Pencil className="mr-1 h-3 w-3" />
        Modificar Propuesta
      </Button>
    );
  }
  
  return (
    <Button variant="outline" size="sm" onClick={() => onAction("view", project)}>
      <Eye className="mr-1 h-3 w-3" />
      Ver Detalles
    </Button>
  );
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filtered projects based on active tab
  const filteredProjects = activeTab === "all" 
    ? projectsData 
    : projectsData.filter(project => project.status === activeTab);
  
  const handleProjectAction = (action: string, project: Project) => {
    setSelectedProject(project);
    
    if (action === "view" || action === "resend") {
      setChatOpen(true);
    } else if (action === "confirm") {
      setPaymentOpen(true);
    } else if (action === "send") {
      setChatOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-contala-green font-serif">Tus Proyectos</h2>
          <p className="text-gray-500">Administra y haz seguimiento de tus propuestas</p>
        </div>
        <Button className="bg-contala-darkpink hover:bg-contala-darkpink/90 text-white">
          Nuevo Proyecto
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-contala-cream/50 border border-contala-green/10">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
          <TabsTrigger value="sent">Enviados</TabsTrigger>
          <TabsTrigger value="accepted">Aceptados</TabsTrigger>
          <TabsTrigger value="rejected">Rechazados</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card className="vintage-card texture-diagonal">
            <CardHeader className="pb-0">
              <CardTitle>Proyectos {activeTab !== "all" ? `- ${activeTab}` : ""}</CardTitle>
              <CardDescription>
                {activeTab === "all" ? "Todos tus proyectos" : 
                 activeTab === "draft" ? "Borradores de propuestas pendientes de enviar" :
                 activeTab === "sent" ? "Propuestas enviadas esperando respuesta" :
                 activeTab === "accepted" ? "Propuestas aceptadas por creadores" :
                 activeTab === "rejected" ? "Propuestas rechazadas por creadores" :
                 "Proyectos completados"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="table-container">
                <ScrollArea className="max-h-[500px]">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Proyecto</TableHead>
                          <TableHead>Creador</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Presupuesto</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.length > 0 ? (
                          filteredProjects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell className="font-medium">{project.title}</TableCell>
                              <TableCell>{project.creator}</TableCell>
                              <TableCell>{project.date}</TableCell>
                              <TableCell>{project.budget ? `$${project.budget.toLocaleString()}` : "-"}</TableCell>
                              <TableCell>
                                <ProjectStatusBadge status={project.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                <ActionButton project={project} onAction={handleProjectAction} />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                              No hay proyectos {activeTab !== "all" ? `en estado ${activeTab}` : ""}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden h-[80vh]">
          {selectedProject && (
            <ProjectChat 
              projectId={selectedProject.id}
              creatorId="creator-123"
              creatorName={selectedProject.creator}
              creatorAvatar="https://i.pravatar.cc/150?img=3"
              onClose={() => setChatOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogHeader>
          <DialogTitle>Pago de Proyecto</DialogTitle>
          <DialogDescription>
            Confirma el pago para iniciar el proyecto con {selectedProject?.creator}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between">
            <span className="font-medium">Proyecto:</span>
            <span>{selectedProject?.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Creador:</span>
            <span>{selectedProject?.creator}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Monto:</span>
            <span className="font-bold">${selectedProject?.budget?.toLocaleString()}</span>
          </div>
          
          <div className="border rounded-lg p-4 bg-contala-cream/50 mt-4">
            <h4 className="font-bold text-contala-green flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2" /> Proceso de Pago
            </h4>
            <p className="text-sm text-gray-600">
              El pago se procesará a través de MercadoPago. Una vez confirmado, 
              el creador recibirá una notificación para iniciar el proyecto.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setPaymentOpen(false)}>Cancelar</Button>
          <Button className="bg-contala-green">Proceder al Pago</Button>
        </div>
      </Dialog>
    </div>
  );
}
