import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Eye, MessageSquare, Pencil, X, FileText } from "lucide-react";
import { ProjectChat } from "./ProjectChat";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectProposal } from "./ProjectProposal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Datos de proyectos para marcas (todos los estados)
const marcaProjectsData: Project[] = [
  { id: "1", title: "Campaña Instagram", creator: "Laura Rodríguez", status: "accepted", date: "12/04/2025", budget: 25000, description: "Creación de contenido para campaña de producto nuevo." },
  { id: "2", title: "Video Explicativo", creator: "Carlos Gómez", status: "sent", date: "08/04/2025", budget: 30000, description: "Video explicativo de uso del producto para canal de YouTube." },
  { id: "3", title: "Fotografía Productos", creator: "Ana Martínez", status: "draft", date: "05/04/2025", description: "Sesión de fotografías para catálogo de productos." },
  { id: "4", title: "Contenido Blog", creator: "Daniel López", status: "rejected", date: "01/04/2025", budget: 15000, description: "Creación de 5 artículos para blog corporativo." },
  { id: "5", title: "Reel Promocional", creator: "Valentina Ruiz", status: "completed", date: "20/03/2025", budget: 18000, description: "Reel promocional para lanzamiento de temporada." },
  { id: "6", title: "Post Redes Sociales", creator: "Martín Sánchez", status: "accepted", date: "15/03/2025", budget: 12000, description: "Diseño de 10 posts para redes sociales." },
];

// Datos de proyectos para creadores (solo los aceptados/en curso y completados)
const creadorProjectsData: Project[] = [
  { id: "1", title: "Campaña Instagram", creator: "SummerVibes", status: "accepted", date: "12/04/2025", budget: 25000, description: "Creación de contenido para campaña de producto nuevo." },
  { id: "5", title: "Reel Promocional", creator: "EventosNow", status: "completed", date: "20/03/2025", budget: 18000, description: "Reel promocional para lanzamiento de temporada." },
  { id: "6", title: "Post Redes Sociales", creator: "FashionStyle", status: "accepted", date: "15/03/2025", budget: 12000, description: "Diseño de 10 posts para redes sociales." },
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
      status === "completed" ? "bg-[#4635B1]" :
      ""
    }>
      {config.label}
    </Badge>
  );
};

// Additional Action Button Component
const ActionButton = ({ project, onAction, userRole }: { project: Project; onAction: (action: string, project: Project) => void; userRole: "marca" | "creador" }) => {
  if (userRole === "creador") {
    // Botones específicos para creadores
    if (project.status === "accepted") {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onAction("chat", project)}>
            <MessageSquare className="mr-1 h-3 w-3" />
            Chat
          </Button>
          <Button variant="outline" size="sm" onClick={() => onAction("deliverable", project)}>
            <FileText className="mr-1 h-3 w-3" />
            Entregar
          </Button>
        </div>
      );
    }
    
    if (project.status === "completed") {
      return (
        <Button variant="outline" size="sm" onClick={() => onAction("viewDetails", project)}>
          <FileText className="mr-1 h-3 w-3" />
          Ver Detalles
        </Button>
      );
    }
    
    return (
      <Button variant="outline" size="sm" onClick={() => onAction("viewDetails", project)}>
        <Eye className="mr-1 h-3 w-3" />
        Ver Detalles
      </Button>
    );
  }
  
  // Para marcas se mantiene la lógica original
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
      <Button variant="outline" size="sm" onClick={() => onAction("viewProposal", project)}>
        <Eye className="mr-1 h-3 w-3" />
        Ver Propuesta
      </Button>
    );
  }
  
  if (project.status === "accepted") {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onAction("chat", project)}>
          <MessageSquare className="mr-1 h-3 w-3" />
          Chat
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAction("confirm", project)}>
          <Check className="mr-1 h-3 w-3" />
          Confirmar
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
  
  if (project.status === "completed") {
    return (
      <Button variant="outline" size="sm" onClick={() => onAction("viewDetails", project)}>
        <FileText className="mr-1 h-3 w-3" />
        Ver Detalles
      </Button>
    );
  }
  
  return (
    <Button variant="outline" size="sm" onClick={() => onAction("viewDetails", project)}>
      <Eye className="mr-1 h-3 w-3" />
      Ver Detalles
    </Button>
  );
};

export function ProjectsSection() {
  const { userType } = useUser();
  const isCreador = userType === "creador";
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shipmentDialogOpen, setShipmentDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Usar el conjunto de datos correcto según el rol del usuario
  const allProjectsData = isCreador ? creadorProjectsData : marcaProjectsData;
  
  // Filtered projects based on active tab
  const filteredProjects = activeTab === "all" 
    ? allProjectsData
    : allProjectsData.filter(project => project.status === activeTab);
  
  const handleProjectAction = (action: string, project: Project) => {
    setSelectedProject(project);
    
    switch (action) {
      case "chat":
        setChatOpen(true);
        break;
      case "viewDetails":
        setDetailsOpen(true);
        break;
      case "viewProposal":
      case "send":
      case "resend":
        setProposalOpen(true);
        break;
      case "confirm":
      case "deliverable":
        setPaymentOpen(true);
        break;
      case "shipment":
        setShipmentDialogOpen(true);
        break;
      default:
        break;
    }
  };

  // Solo mostrar pestañas relevantes según el rol
  const getTabs = () => {
    if (isCreador) {
      return (
        <TabsList className="bg-[#FFFBCA]/50 border border-[#B771E5]/10">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="accepted">En curso</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="bg-[#AEEA94]/50 border border-[#4635B1]/10">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="draft">Borradores</TabsTrigger>
        <TabsTrigger value="sent">Enviados</TabsTrigger>
        <TabsTrigger value="accepted">Aceptados</TabsTrigger>
        <TabsTrigger value="rejected">Rechazados</TabsTrigger>
        <TabsTrigger value="completed">Completados</TabsTrigger>
      </TabsList>
    );
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#4635B1]">Tus Proyectos</h2>
          <p className="text-gray-500">
            {isCreador 
              ? "Administra y haz seguimiento de tus proyectos en curso"
              : "Administra y haz seguimiento de tus propuestas"}
          </p>
        </div>
        {/* Solo para marcas: crear nuevo proyecto */}
        {!isCreador && (
          <Button className="bg-[#4635B1] hover:bg-[#4635B1]/90 text-white">
            + Nuevo Proyecto
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        {getTabs()}
        
        <TabsContent value={activeTab} className="mt-4">
          <motion.div variants={itemVariants}>
            <Card className="border border-[#4635B1]/10 shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle className={isCreador ? "text-[#B771E5]" : "text-[#4635B1]"}>
                  {isCreador 
                    ? `Proyectos ${activeTab !== "all" ? (activeTab === "accepted" ? "- En Curso" : "- Completados") : ""}`
                    : `Proyectos ${activeTab !== "all" ? `- ${activeTab}` : ""}`}
                </CardTitle>
                <CardDescription>
                  {isCreador
                    ? (activeTab === "all" ? "Todos tus proyectos activos" :
                       activeTab === "accepted" ? "Proyectos que estás desarrollando actualmente" :
                       "Proyectos que ya has completado")
                    : (activeTab === "all" ? "Todos tus proyectos" : 
                       activeTab === "draft" ? "Borradores de propuestas pendientes de enviar" :
                       activeTab === "sent" ? "Propuestas enviadas esperando respuesta" :
                       activeTab === "accepted" ? "Propuestas aceptadas por creadores" :
                       activeTab === "rejected" ? "Propuestas rechazadas por creadores" :
                       "Proyectos completados")}
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
                            <TableHead>{isCreador ? "Cliente" : "Creador"}</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Presupuesto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                              <TableRow key={project.id} className="hover:bg-[#FFFBCA]/10">
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.creator}</TableCell>
                                <TableCell>{project.date}</TableCell>
                                <TableCell>{project.budget ? `$${project.budget.toLocaleString()}` : "-"}</TableCell>
                                <TableCell>
                                  <ProjectStatusBadge status={project.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                  <ActionButton 
                                    project={project} 
                                    onAction={handleProjectAction} 
                                    userRole={isCreador ? "creador" : "marca"}
                                  />
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
          </motion.div>
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

      {/* Project Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <div>
              <DialogHeader>
                <DialogTitle>Detalles del Proyecto</DialogTitle>
                <DialogDescription>
                  {selectedProject.title} - {selectedProject.creator}
                </DialogDescription>
              </DialogHeader>
              <ProjectDetails 
                project={selectedProject} 
                onShowChat={() => {
                  setDetailsOpen(false);
                  setChatOpen(true);
                }}
                onShowProposal={() => {
                  setDetailsOpen(false);
                  setProposalOpen(true);
                }}
                onModifyProposal={() => {
                  setDetailsOpen(false);
                  setProposalOpen(true);
                }} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Project Proposal Dialog */}
      <Dialog open={proposalOpen} onOpenChange={setProposalOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <div>
              <DialogHeader>
                <DialogTitle>
                  {selectedProject.status === "sent" ? "Propuesta Enviada" : 
                   selectedProject.status === "draft" ? "Enviar Propuesta" :
                   "Modificar Propuesta"}
                </DialogTitle>
                <DialogDescription>
                  {selectedProject.title} - {selectedProject.creator}
                </DialogDescription>
              </DialogHeader>
              <ProjectProposal
                project={selectedProject}
                onPayment={() => {
                  setProposalOpen(false);
                  setPaymentOpen(true);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreador ? "Entrega del Proyecto" : "Pago de Proyecto"}
            </DialogTitle>
            <DialogDescription>
              {isCreador 
                ? "Confirma la entrega del proyecto para finalizar" 
                : `Confirma el pago para iniciar el proyecto con ${selectedProject?.creator}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="font-medium">Proyecto:</span>
              <span>{selectedProject?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{isCreador ? "Cliente" : "Creador"}:</span>
              <span>{selectedProject?.creator}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Monto:</span>
              <span className="font-bold">${selectedProject?.budget?.toLocaleString()}</span>
            </div>
            
            <div className="border rounded-lg p-4 bg-[#FFFBCA]/50 mt-4">
              <h4 className="font-bold text-[#4635B1] flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2" /> 
                {isCreador ? "Proceso de Entrega" : "Proceso de Pago"}
              </h4>
              <p className="text-sm text-gray-600">
                {isCreador 
                  ? "Una vez confirmada la entrega, el cliente recibirá una notificación para revisar y aprobar el trabajo. El pago se liberará una vez aprobado."
                  : "El pago se procesará a través de MercadoPago. Una vez confirmado, el creador recibirá una notificación para iniciar el proyecto."}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPaymentOpen(false)}>Cancelar</Button>
            <Button className={isCreador ? "bg-[#B771E5]" : "bg-[#4635B1]"}>
              {isCreador ? "Confirmar Entrega" : "Proceder al Pago"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shipment Dialog */}
      <Dialog open={shipmentDialogOpen} onOpenChange={setShipmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entrega del Proyecto</DialogTitle>
            <DialogDescription>
              {selectedProject?.title} - {selectedProject?.creator}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="font-medium">Proyecto:</span>
              <span>{selectedProject?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{isCreador ? "Cliente" : "Creador"}:</span>
              <span>{selectedProject?.creator}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Monto:</span>
              <span className="font-bold">${selectedProject?.budget?.toLocaleString()}</span>
            </div>
            
            <div className="border rounded-lg p-4 bg-[#FFFBCA]/50 mt-4">
              <h4 className="font-bold text-[#4635B1] flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2" /> 
                Proceso de Entrega
              </h4>
              <p className="text-sm text-gray-600">
                Una vez confirmada la entrega, el cliente recibirá una notificación para revisar y aprobar el trabajo. El pago se liberará una vez aprobado.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShipmentDialogOpen(false)}>Cancelar</Button>
            <Button className="bg-[#4635B1]">
              Confirmar Entrega
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
