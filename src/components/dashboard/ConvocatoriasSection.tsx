
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Megaphone, Calendar, Users, Eye, X, Star, MapPin, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Creator {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
  proposal: string;
  price: string;
}

interface Convocatoria {
  id: string;
  title: string;
  description: string;
  budget: string;
  endDate: string;
  platform: string;
  status: 'activa' | 'cerrada';
  applicants: Creator[];
}

// Datos de ejemplo para convocatorias
const convocatoriasData: Convocatoria[] = [
  {
    id: "1",
    title: "Campaña de verano",
    description: "Buscamos creadores para una serie de contenidos promocionando nuestra nueva línea de trajes de baño y accesorios de playa. Necesitamos 5 reels y 10 fotos para Instagram.",
    budget: "$20.000 - $30.000",
    endDate: "30/05/2023",
    platform: "Instagram",
    status: 'activa',
    applicants: [
      {
        id: "1",
        name: "Laura Rodríguez",
        avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        rating: 4.5,
        location: "Buenos Aires",
        proposal: "Me encantaría colaborar con esta campaña. Tengo experiencia creando contenido para marcas de moda y puedo ofrecer locaciones en la costa para las fotos.",
        price: "$25.000"
      },
      {
        id: "3",
        name: "Ana Martínez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        rating: 4.0,
        location: "Rosario",
        proposal: "Me especializo en fotografía de moda y tengo un estilo muy fresco y veraniego que podría funcionar bien con esta campaña.",
        price: "$28.000"
      }
    ]
  },
  {
    id: "2",
    title: "Tutorial de producto",
    description: "Necesitamos un video tutorial que muestre las principales funcionalidades de nuestra app de fitness. Ideal para creadores del rubro deportivo.",
    budget: "$15.000 - $20.000",
    endDate: "15/06/2023",
    platform: "YouTube",
    status: 'activa',
    applicants: [
      {
        id: "4",
        name: "Daniel López",
        avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        rating: 4.5,
        location: "Mendoza",
        proposal: "Como instructor de fitness, puedo crear un tutorial completo mostrando todas las funciones de la app mientras realizo ejercicios prácticos.",
        price: "$18.000"
      }
    ]
  },
  {
    id: "3",
    title: "Recetas saludables",
    description: "Buscamos creadores gastronómicos para una serie de videos cortos con recetas saludables utilizando nuestros productos orgánicos.",
    budget: "$15.000 - $25.000",
    endDate: "10/05/2023",
    platform: "TikTok, Instagram",
    status: 'cerrada',
    applicants: [
      {
        id: "5",
        name: "Valentina Ruiz",
        avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        rating: 3.5,
        location: "Buenos Aires",
        proposal: "Me especializo en recetas saludables y rápidas. Puedo crear 5 videos con diferentes recetas utilizando los productos.",
        price: "$20.000"
      }
    ]
  }
];

// Componente para mostrar la calificación con estrellas
const StarRating = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= roundedRating ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ) : star - 0.5 === roundedRating ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 fill-[50%]" />
          ) : (
            <Star className="w-4 h-4 text-gray-300" />
          )}
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-500">{rating}</span>
    </div>
  );
};

export function ConvocatoriasSection() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<Convocatoria | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const handleViewConvocatoria = (convocatoria: Convocatoria) => {
    setSelectedConvocatoria(convocatoria);
  };

  const handleCloseConvocatoria = (id: string) => {
    // Aquí iría la lógica para cerrar la convocatoria en el backend
    toast({
      title: "Convocatoria cerrada",
      description: "Ya no se aceptarán más propuestas para esta convocatoria",
    });
  };

  const handleViewCreator = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleSendProposal = (creator: Creator) => {
    // Aquí iría la lógica para enviar la propuesta final
    // Para este ejemplo, simplemente redirigimos a la página de descubrir
    toast({
      title: "Redirigiendo",
      description: "Te llevaremos a la página de descubrir para enviar una propuesta personalizada",
    });
    navigate("/dashboard/creadores");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
        <Megaphone className="h-6 w-6" />
        Tus Convocatorias
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {convocatoriasData.map((convocatoria) => (
          <Card key={convocatoria.id} className={convocatoria.status === 'cerrada' ? "opacity-70" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-contala-green">{convocatoria.title}</CardTitle>
                <Badge variant={convocatoria.status === 'activa' ? "default" : "secondary"}>
                  {convocatoria.status === 'activa' ? 'Activa' : 'Cerrada'}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {convocatoria.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Hasta: {convocatoria.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>
                      {convocatoria.applicants.length} {convocatoria.applicants.length === 1 ? "creador" : "creadores"}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{convocatoria.budget}</span>
                  <div className="space-x-2">
                    {convocatoria.status === 'activa' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() => handleCloseConvocatoria(convocatoria.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cerrar
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-contala-green border-contala-green hover:bg-contala-green/10"
                      onClick={() => handleViewConvocatoria(convocatoria)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {convocatoriasData.length === 0 && (
        <Card className="border-dashed border-2">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <Megaphone className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">Sin convocatorias</CardTitle>
              <CardDescription>
                No tienes convocatorias activas en este momento
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Modal para ver detalles de la convocatoria */}
      <Dialog open={selectedConvocatoria !== null} onOpenChange={(open) => !open && setSelectedConvocatoria(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedConvocatoria?.title}</DialogTitle>
            <DialogDescription>
              Detalles de la convocatoria y creadores interesados
            </DialogDescription>
          </DialogHeader>
          
          {selectedConvocatoria && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Descripción</p>
                <p>{selectedConvocatoria.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                  <p>{selectedConvocatoria.budget}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Fecha de cierre</p>
                  <p>{selectedConvocatoria.endDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Plataforma</p>
                  <p>{selectedConvocatoria.platform}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Estado</p>
                  <Badge variant={selectedConvocatoria.status === 'activa' ? "default" : "secondary"}>
                    {selectedConvocatoria.status === 'activa' ? 'Activa' : 'Cerrada'}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-contala-green" />
                  Creadores interesados ({selectedConvocatoria.applicants.length})
                </h3>
                
                <div className="space-y-3">
                  {selectedConvocatoria.applicants.length > 0 ? (
                    selectedConvocatoria.applicants.map((creator) => (
                      <Card key={creator.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{creator.name}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{creator.location}</span>
                                </div>
                                <StarRating rating={creator.rating} />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-contala-green border-contala-green hover:bg-contala-green/10"
                                onClick={() => handleViewCreator(creator)}
                              >
                                Ver propuesta
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Aún no hay creadores interesados en esta convocatoria
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para ver propuesta del creador */}
      <Dialog open={selectedCreator !== null} onOpenChange={(open) => !open && setSelectedCreator(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Propuesta de {selectedCreator?.name}</DialogTitle>
            <DialogDescription>
              Revisa la propuesta y decide si quieres trabajar con este creador
            </DialogDescription>
          </DialogHeader>
          
          {selectedCreator && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedCreator.avatar} />
                    <AvatarFallback>{selectedCreator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedCreator.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{selectedCreator.location}</span>
                    </div>
                    <StarRating rating={selectedCreator.rating} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Precio propuesto</p>
                  <p className="font-medium text-contala-green">{selectedCreator.price}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Propuesta</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p>{selectedCreator.proposal}</p>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCreator(null)}
                >
                  Cerrar
                </Button>
                <Button 
                  className="bg-contala-green hover:bg-contala-green/90"
                  onClick={() => handleSendProposal(selectedCreator)}
                >
                  <ChevronRight className="mr-1 h-4 w-4" />
                  Ver perfil completo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
