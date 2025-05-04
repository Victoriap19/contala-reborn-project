
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for calls
type Convocatoria = {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  platforms: string[];
  budget: string;
  interestedCreators: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    rating: number;
  }[];
  status: 'open' | 'closed';
};

const convocatoriasData: Convocatoria[] = [
  {
    id: "1",
    title: "Campaña verano 2023",
    description: "Buscamos fotógrafo para sesión de fotos con nuestra nueva colección de verano.",
    date: "01/05/2023",
    endDate: "15/05/2023",
    platforms: ["Instagram", "Web"],
    budget: "$20.000",
    interestedCreators: [
      {
        id: "1",
        name: "Laura Rodríguez",
        avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Buenos Aires",
        rating: 4.8
      },
      {
        id: "2",
        name: "Carlos Gómez",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Córdoba",
        rating: 4.3
      }
    ],
    status: 'open'
  },
  {
    id: "2",
    title: "Vídeo explicativo producto",
    description: "Necesitamos crear un vídeo explicativo para nuestro nuevo producto, con animaciones y voz en off.",
    date: "15/04/2023",
    endDate: "25/04/2023",
    platforms: ["YouTube", "Web"],
    budget: "$35.000",
    interestedCreators: [
      {
        id: "3",
        name: "Ana Martínez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Rosario",
        rating: 4.5
      }
    ],
    status: 'closed'
  },
  {
    id: "3",
    title: "Contenido para TikTok",
    description: "Buscamos creadores de contenido para hacer 5 vídeos para TikTok promocionando nuestros servicios.",
    date: "10/05/2023",
    endDate: "20/05/2023",
    platforms: ["TikTok"],
    budget: "$15.000",
    interestedCreators: [],
    status: 'open'
  },
  {
    id: "4",
    title: "Diseño de flyers",
    description: "Necesitamos diseñador gráfico para crear flyers digitales para campañas en RRSS.",
    date: "05/04/2023",
    endDate: "15/04/2023",
    platforms: ["Instagram", "Facebook"],
    budget: "$8.000",
    interestedCreators: [
      {
        id: "4",
        name: "Daniel López",
        avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Mendoza",
        rating: 4.2
      },
      {
        id: "5",
        name: "Valentina Ruiz",
        avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Buenos Aires",
        rating: 3.9
      }
    ],
    status: 'closed'
  }
];

export function ConvocatoriasSection() {
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<Convocatoria | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("todas");
  
  const filteredConvocatorias = statusFilter === "todas" 
    ? convocatoriasData 
    : convocatoriasData.filter(conv => conv.status === statusFilter);
  
  const handleViewDetails = (convocatoria: Convocatoria) => {
    setSelectedConvocatoria(convocatoria);
  };
  
  const handleCloseConvocatoria = (convocatoriaId: string) => {
    // In a real app, this would update the status in the database
    console.log(`Closing convocatoria ${convocatoriaId}`);
    // For demonstration, we'll just close the dialog
    setSelectedConvocatoria(null);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {i === fullStars && hasHalfStar ? (
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            )}
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-500">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Tus Convocatorias
        </h2>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="open">Abiertas</SelectItem>
              <SelectItem value="closed">Cerradas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredConvocatorias.map((convocatoria) => (
          <Card 
            key={convocatoria.id} 
            className={`hover:shadow-md transition-shadow ${
              convocatoria.status === 'closed' ? 'opacity-70' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-contala-green">
                  {convocatoria.title}
                </CardTitle>
                <Badge variant={convocatoria.status === 'open' ? 'default' : 'outline'}>
                  {convocatoria.status === 'open' ? 'Abierta' : 'Cerrada'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {convocatoria.description}
                </p>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Fecha límite:</span>{" "}
                    <span className="font-medium">{convocatoria.endDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Presupuesto:</span>{" "}
                    <span className="font-medium">{convocatoria.budget}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {convocatoria.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      {convocatoria.interestedCreators.length} creadores interesados
                    </span>
                    <div className="flex -space-x-2">
                      {convocatoria.interestedCreators.slice(0, 3).map((creator) => (
                        <Avatar key={creator.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={creator.avatar} />
                          <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {convocatoria.interestedCreators.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                          +{convocatoria.interestedCreators.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(convocatoria)}
                  >
                    Ver detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredConvocatorias.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tienes convocatorias {statusFilter === "open" ? "abiertas" : statusFilter === "closed" ? "cerradas" : ""} en este momento.</p>
        </div>
      )}

      <Dialog open={selectedConvocatoria !== null} onOpenChange={(open) => !open && setSelectedConvocatoria(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedConvocatoria?.title}</DialogTitle>
            <DialogDescription>
              Detalles de la convocatoria y creadores interesados
            </DialogDescription>
          </DialogHeader>
          
          {selectedConvocatoria && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                <p className="text-sm">{selectedConvocatoria.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Fecha de creación</h3>
                  <p className="text-sm">{selectedConvocatoria.date}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Fecha límite</h3>
                  <p className="text-sm">{selectedConvocatoria.endDate}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Presupuesto</h3>
                  <p className="text-sm">{selectedConvocatoria.budget}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Plataformas</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedConvocatoria.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Creadores interesados</h3>
                
                {selectedConvocatoria.interestedCreators.length > 0 ? (
                  <div className="space-y-3">
                    {selectedConvocatoria.interestedCreators.map((creator) => (
                      <Card key={creator.id} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{creator.name}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <StarRating rating={creator.rating} />
                                  <span className="mx-2">•</span>
                                  <span>{creator.location}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-contala-green border-contala-green hover:bg-contala-green hover:text-white"
                            >
                              Ver perfil
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Aún no hay creadores interesados en esta convocatoria.</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                {selectedConvocatoria.status === 'open' && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleCloseConvocatoria(selectedConvocatoria.id)}
                  >
                    Cerrar convocatoria
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setSelectedConvocatoria(null)}
                >
                  Volver
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
