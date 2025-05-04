
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, User, Filter, Check, Clock, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ProjectStatus = 'propuesta_enviada' | 'aceptado' | 'en_proceso' | 'completado';

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
  platforms: string[];
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
      avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "15/04/2023",
    status: "en_proceso",
    budget: "$25.000",
    platforms: ["Instagram", "TikTok"]
  },
  {
    id: "2",
    title: "Vídeo promocional",
    description: "Vídeo promocional de 30 segundos para publicidad en redes sociales.",
    creator: {
      id: "2",
      name: "Carlos Gómez",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "02/05/2023",
    status: "completado",
    budget: "$18.000",
    platforms: ["YouTube", "Facebook"]
  },
  {
    id: "3",
    title: "Sesión fotográfica",
    description: "Sesión de fotos de productos para catálogo web y redes sociales.",
    creator: {
      id: "3",
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "10/05/2023",
    status: "propuesta_enviada",
    budget: "$15.000",
    platforms: ["Web", "Instagram"]
  },
  {
    id: "4",
    title: "Serie de tutoriales",
    description: "Serie de 3 vídeos tutoriales sobre uso del producto para canal de YouTube.",
    creator: {
      id: "4",
      name: "Daniel López",
      avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    date: "20/05/2023",
    status: "aceptado",
    budget: "$30.000",
    platforms: ["YouTube"]
  }
];

export function ProjectsSection() {
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = statusFilter === "todos" 
    ? projectsData 
    : projectsData.filter(project => project.status === statusFilter);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "propuesta_enviada":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Propuesta enviada</Badge>;
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="propuesta_enviada">Propuesta enviada</SelectItem>
              <SelectItem value="aceptado">Aceptado</SelectItem>
              <SelectItem value="en_proceso">En proceso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Creador</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium text-contala-green">{project.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{project.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.creator.avatar} />
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-500 hover:text-contala-green"
                        onClick={() => viewProjectDetails(project)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2">
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

      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[600px]">
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
                      <AvatarImage src={selectedProject.creator.avatar} />
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
                    <Badge key={index} variant="secondary">{platform}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={() => setSelectedProject(null)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
