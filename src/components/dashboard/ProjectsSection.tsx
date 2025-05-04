
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, User, Filter, Check, Clock, Eye, MessageSquare, Star, AlertTriangle, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProjectChat } from "./ProjectChat";
import { toast } from "sonner";
import { StarRating } from "./StarRating";
import { Input } from "@/components/ui/input";

type ProjectStatus = 'propuesta_enviada' | 'rechazada' | 'aceptado' | 'en_proceso' | 'completado';

interface Project {
  id: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  date: string;
  status: ProjectStatus;
  budget: string;
  budgetAmount: number; // Added for payment processing
  platforms: string[];
  reviewsLeft?: number;
}

// Datos de ejemplo para proyectos
const projectsData: Project[] = [
  {
    id: "1",
    title: "Campaña de primavera",
    description: "Serie de 5 reels mostrando la nueva colección de primavera para Instagram y TikTok.",
    creator: {
      id: "1",
      name: "Laura Rodríguez",
      avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "15/04/2023",
    status: "en_proceso",
    budget: "$25.000",
    budgetAmount: 25000,
    platforms: ["Instagram", "TikTok"],
    reviewsLeft: 3
  },
  {
    id: "2",
    title: "Vídeo promocional",
    description: "Vídeo promocional de 30 segundos para publicidad en redes sociales.",
    creator: {
      id: "2",
      name: "Carlos Gómez",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "02/05/2023",
    status: "completado",
    budget: "$18.000",
    budgetAmount: 18000,
    platforms: ["YouTube", "Facebook"],
    reviewsLeft: 0
  },
  {
    id: "3",
    title: "Sesión fotográfica",
    description: "Sesión de fotos de productos para catálogo web y redes sociales.",
    creator: {
      id: "3",
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "10/05/2023",
    status: "propuesta_enviada",
    budget: "$15.000",
    budgetAmount: 15000,
    platforms: ["Web", "Instagram"],
    reviewsLeft: 3
  },
  {
    id: "4",
    title: "Serie de tutoriales",
    description: "Serie de 3 vídeos tutoriales sobre uso del producto para canal de YouTube.",
    creator: {
      id: "4",
      name: "Daniel López",
      avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "20/05/2023",
    status: "aceptado",
    budget: "$30.000",
    budgetAmount: 30000,
    platforms: ["YouTube"],
    reviewsLeft: 3
  },
  {
    id: "5",
    title: "Fotografía de productos",
    description: "Sesión fotográfica de nuevos productos para tienda online.",
    creator: {
      id: "5",
      name: "María García",
      avatar: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "25/05/2023",
    status: "rechazada",
    budget: "$12.000",
    budgetAmount: 12000,
    platforms: ["Web", "Facebook"],
    reviewsLeft: 3
  }
];

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatProject, setChatProject] = useState<Project | null>(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  
  // New states for the added functionality
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [projectToConfirm, setProjectToConfirm] = useState<Project | null>(null);
  const [resendDialogOpen, setResendDialogOpen] = useState(false);
  const [rejectedProject, setRejectedProject] = useState<Project | null>(null);
  const [newBudget, setNewBudget] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const filteredProjects = statusFilter === "todos" 
    ? projectsData 
    : projectsData.filter(project => project.status === statusFilter);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "propuesta_enviada":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Propuesta enviada</Badge>;
      case "rechazada":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rechazada</Badge>;
      case "aceptado":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Aceptado</Badge>;
      case "en_proceso":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">En proceso</Badge>;
      case "completado":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Completado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "propuesta_enviada":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rechazada":
        return <X className="h-4 w-4 text-red-500" />;
      case "aceptado":
        return <Check className="h-4 w-4 text-blue-500" />;
      case "en_proceso":
        return <Clock className="h-4 w-4 text-purple-500" />;
      case "completado":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const viewProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };
  
  const openChat = (project: Project) => {
    setChatProject(project);
  };
  
  const closeChat = () => {
    setChatProject(null);
  };

  const markAsReceived = (projectId: string) => {
    // This would call an API in a real app
    toast.success("¡Proyecto marcado como recibido! Por favor, deja tu valoración.");
    setRatingDialogOpen(true);
  };

  const submitRating = () => {
    // This would call an API in a real app
    toast.success("¡Gracias por tu valoración!");
    setRatingDialogOpen(false);
    setCurrentRating(0);
    setRecommendation("");
  };

  const fileSupportTicket = () => {
    // This would call an API or open a form in a real app
    toast.success("Ticket de soporte enviado. Un administrador se pondrá en contacto contigo pronto.");
  };

  // New functions for the added functionality
  const handleConfirmProject = (project: Project) => {
    setProjectToConfirm(project);
    setConfirmDialogOpen(true);
  };

  const confirmProject = () => {
    setConfirmDialogOpen(false);
    setPaymentDialogOpen(true);
    // In a real app, you would update the project status in the database
  };

  const handlePayment = async () => {
    if (!projectToConfirm) return;
    
    setPaymentLoading(true);
    
    try {
      // In a real app, this would call your MercadoPago API
      // This is a mock implementation
      setTimeout(() => {
        toast.success("¡Pago procesado con éxito! El proyecto ha cambiado a estado 'En proceso'");
        setPaymentLoading(false);
        setPaymentDialogOpen(false);
        setProjectToConfirm(null);
        
        // Update the project status (in a real app this would happen via API)
        // For now we'll just show a toast
      }, 2000);
    } catch (error) {
      toast.error("Error al procesar el pago. Inténtalo de nuevo.");
      setPaymentLoading(false);
    }
  };

  const handleResendProposal = (project: Project) => {
    setRejectedProject(project);
    setNewBudget(project.budgetAmount.toString());
    setResendDialogOpen(true);
  };

  const resendProposal = () => {
    // In a real app, this would call an API to update the project proposal
    toast.success("¡Propuesta actualizada! Se ha enviado al creador con el nuevo presupuesto.");
    setResendDialogOpen(false);
    // Update the project status (in a real app this would happen via API)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Tus Proyectos
        </h2>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-contala-cream border-contala-green/20 focus:border-contala-green">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="bg-contala-cream">
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="propuesta_enviada">Propuesta enviada</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
              <SelectItem value="aceptado">Aceptado</SelectItem>
              <SelectItem value="en_proceso">En proceso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <Card className="bg-contala-cream/50 border-contala-green/20">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-contala-green/5">
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Creador</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-contala-green/10">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium text-contala-green">{project.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                          <AvatarFallback>{project.creator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{project.creator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        {getStatusBadge(project.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                          onClick={() => openChat(project)}
                          disabled={project.status !== "aceptado" && project.status !== "en_proceso"}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        
                        {project.status === "aceptado" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => handleConfirmProject(project)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirmar
                          </Button>
                        )}
                        
                        {project.status === "en_proceso" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => markAsReceived(project.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Recibido
                          </Button>
                        )}
                        
                        {project.status === "rechazada" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                            onClick={() => handleResendProposal(project)}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Reenviar
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-500 hover:text-contala-green"
                          onClick={() => viewProjectDetails(project)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 bg-contala-cream/50 border-contala-green/20">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">Sin proyectos</CardTitle>
              <CardDescription>
                {statusFilter === "todos" 
                  ? "No tienes proyectos activos en este momento" 
                  : `No tienes proyectos con estado "${statusFilter}"`}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Project Details Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[600px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              Detalles del proyecto
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Creador</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedProject.creator.avatar} alt={selectedProject.creator.name} />
                      <AvatarFallback>{selectedProject.creator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedProject.creator.name}</span>
                  </div>
                </div>
                <div>
                  {getStatusBadge(selectedProject.status)}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Descripción</p>
                <p>{selectedProject.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                  <p>{selectedProject.budget}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Fecha</p>
                  <p>{selectedProject.date}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Plataformas</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.platforms.map((platform, index) => (
                    <Badge key={index} variant="secondary" className="bg-contala-green/10 text-contala-green border-none">{platform}</Badge>
                  ))}
                </div>
              </div>
              
              {(selectedProject.status === "en_proceso" || selectedProject.status === "aceptado") && (
                <div className="space-y-1 pt-2">
                  <p className="text-sm font-medium text-gray-500">Reviews restantes</p>
                  <p>{selectedProject.reviewsLeft} de 3</p>
                </div>
              )}
              
              <div className="pt-4 flex justify-between">
                <Button 
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={fileSupportTicket}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reportar problema
                </Button>
                
                <div className="space-x-3">
                  {selectedProject.status === "aceptado" && (
                    <Button 
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => {
                        setSelectedProject(null);
                        handleConfirmProject(selectedProject);
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Confirmar
                    </Button>
                  )}
                  
                  {(selectedProject.status === "aceptado" || selectedProject.status === "en_proceso") && (
                    <Button 
                      variant="outline"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      onClick={() => {
                        setSelectedProject(null);
                        openChat(selectedProject);
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Abrir chat
                    </Button>
                  )}
                  
                  {selectedProject.status === "rechazada" && (
                    <Button 
                      variant="outline"
                      className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                      onClick={() => {
                        setSelectedProject(null);
                        handleResendProposal(selectedProject);
                      }}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Reenviar propuesta
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Chat dialog */}
      <Dialog open={chatProject !== null} onOpenChange={(open) => !open && closeChat()}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-contala-cream/90">
          {chatProject && (
            <ProjectChat
              projectId={chatProject.id}
              creatorId={chatProject.creator.id}
              creatorName={chatProject.creator.name}
              creatorAvatar={chatProject.creator.avatar}
              onClose={closeChat}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Rating dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>Valora al creador</DialogTitle>
            <DialogDescription>
              Tu valoración ayuda a otros usuarios a encontrar buenos creadores de contenido
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Puntuación</label>
              <div className="flex space-x-2">
                <StarRating rating={currentRating} maxRating={5} setRating={setCurrentRating} editable />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Recomendación (opcional)</label>
              <textarea 
                className="w-full p-2 border rounded-md min-h-[100px] bg-contala-cream border-contala-green/20"
                placeholder="Cuenta tu experiencia con este creador..."
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" className="border-contala-green/20" onClick={() => setRatingDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={submitRating} disabled={currentRating === 0} className="bg-contala-green hover:bg-contala-green/80">
                Enviar valoración
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm project dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>Confirmar Proyecto</DialogTitle>
            <DialogDescription>
              ¿Deseas confirmar este proyecto y proceder con el pago?
            </DialogDescription>
          </DialogHeader>
          
          {projectToConfirm && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="font-medium text-lg text-contala-green">{projectToConfirm.title}</p>
                <p className="text-sm">{projectToConfirm.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Creador</p>
                  <p>{projectToConfirm.creator.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                  <p className="font-medium text-contala-green">{projectToConfirm.budget}</p>
                </div>
              </div>
              
              <DialogFooter className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" className="border-contala-green/20" onClick={() => setConfirmDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={confirmProject} className="bg-contala-green hover:bg-contala-green/80">
                  Confirmar y Pagar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment dialog with MercadoPago */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>Realizar Pago</DialogTitle>
            <DialogDescription>
              Completa el pago para comenzar tu proyecto
            </DialogDescription>
          </DialogHeader>
          
          {projectToConfirm && (
            <div className="space-y-4 py-4">
              <div className="border rounded-md p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">Proyecto</p>
                    <p className="text-sm text-gray-500">{projectToConfirm.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Total a Pagar</p>
                    <p className="text-xl font-bold text-contala-green">{projectToConfirm.budget}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Número de Tarjeta</label>
                    <Input 
                      className="bg-white border-gray-300" 
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Fecha de Vencimiento</label>
                      <Input 
                        className="bg-white border-gray-300" 
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Código de Seguridad</label>
                      <Input 
                        className="bg-white border-gray-300" 
                        placeholder="CVV"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Nombre del Titular</label>
                    <Input 
                      className="bg-white border-gray-300" 
                      placeholder="Como aparece en la tarjeta"
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-6 justify-center">
                  <img 
                    src="https://http2.mlstatic.com/frontend-assets/payment-methods-logos/payment-methods-large.png" 
                    alt="MercadoPago" 
                    className="h-8 object-contain" 
                  />
                </div>
              </div>
              
              <DialogFooter className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" className="border-contala-green/20" onClick={() => setPaymentDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handlePayment} 
                  className="bg-contala-green hover:bg-contala-green/80"
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Procesando..." : "Pagar"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resend proposal dialog */}
      <Dialog open={resendDialogOpen} onOpenChange={setResendDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>Reenviar Propuesta</DialogTitle>
            <DialogDescription>
              Modifica el presupuesto para reenviar tu propuesta
            </DialogDescription>
          </DialogHeader>
          
          {rejectedProject && (
            <div className="space-y-4 py-4">
              <div>
                <p className="font-medium text-lg text-contala-green">{rejectedProject.title}</p>
                <p className="text-sm text-gray-500 mb-4">{rejectedProject.description}</p>
                
                <div>
                  <label className="text-sm font-medium">Creador</label>
                  <p className="mb-4">{rejectedProject.creator.name}</p>
                  
                  <label className="text-sm font-medium">Presupuesto Original</label>
                  <p className="mb-4">{rejectedProject.budget}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nuevo Presupuesto</label>
                  <Input 
                    type="number"
                    className="bg-contala-cream border-contala-green/20" 
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Ajusta el presupuesto para aumentar las posibilidades de aceptación
                  </p>
                </div>
              </div>
              
              <DialogFooter className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" className="border-contala-green/20" onClick={() => setResendDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={resendProposal} 
                  className="bg-contala-green hover:bg-contala-green/80"
                  disabled={!newBudget || parseFloat(newBudget) <= 0}
                >
                  Reenviar Propuesta
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
