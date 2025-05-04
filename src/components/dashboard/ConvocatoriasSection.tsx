import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Check, Users, Filter, Calendar, Ban } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreatorProfile } from "./CreatorProfile";

interface Creator {
  id: string;
  name: string;
  avatar: string;
  location: string;
}

interface Convocatoria {
  id: string;
  title: string;
  description: string;
  endDate: string;
  status: "open" | "closed";
  interestedCreators: Creator[];
}

// Datos de ejemplo para convocatorias
const convocatoriasData: Convocatoria[] = [
  {
    id: "1",
    title: "Campaña de Verano",
    description: "Buscamos creadores para campaña de verano en redes sociales.",
    endDate: "30/06/2023",
    status: "open",
    interestedCreators: [
      {
        id: "1",
        name: "Laura Rodríguez",
        avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Madrid, España"
      },
      {
        id: "2",
        name: "Carlos Gómez",
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Barcelona, España"
      }
    ]
  },
  {
    id: "2",
    title: "Vídeo Promocional",
    description: "Necesitamos un vídeo promocional para nuestro nuevo producto.",
    endDate: "15/07/2023",
    status: "open",
    interestedCreators: [
      {
        id: "3",
        name: "Ana Martínez",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Valencia, España"
      }
    ]
  },
  {
    id: "3",
    title: "Campaña de Navidad",
    description: "Buscamos creadores para campaña de navidad en redes sociales.",
    endDate: "30/11/2023",
    status: "closed",
    interestedCreators: [
      {
        id: "1",
        name: "Laura Rodríguez",
        avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Madrid, España"
      },
      {
        id: "4",
        name: "Daniel López",
        avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Sevilla, España"
      }
    ]
  }
];

export function ConvocatoriasSection() {
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<Convocatoria | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const filteredConvocatorias = convocatoriasData.filter(
    convocatoria => convocatoria.status === activeTab
  );

  const handleCloseConvocatoria = (convocatoriaId: string) => {
    // In a real app, this would call an API to update the status
    console.log(`Closing convocatoria ${convocatoriaId}`);
  };

  const viewCreatorProfile = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Tus Convocatorias
        </h2>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "open" | "closed")}>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="open">Abiertas</TabsTrigger>
              <TabsTrigger value="closed">Cerradas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredConvocatorias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConvocatorias.map(convocatoria => (
            <Card 
              key={convocatoria.id} 
              className={`overflow-hidden border-l-4 ${
                convocatoria.status === "open" ? "border-l-blue-500 bg-gray-50" : "border-l-gray-300 bg-gray-50 opacity-75"
              }`}
            >
              <CardHeader className="bg-gray-100 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-contala-green">{convocatoria.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Hasta: {convocatoria.endDate}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={convocatoria.status === "open" ? "secondary" : "outline"}
                    className={convocatoria.status === "open" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}
                  >
                    {convocatoria.status === "open" ? "Abierta" : "Cerrada"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-700 mb-4">{convocatoria.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium">
                      {convocatoria.interestedCreators.length} creadores interesados
                    </span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Ver interesados</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Creadores interesados</DialogTitle>
                        <DialogDescription>
                          Estos creadores han mostrado interés en tu convocatoria "{convocatoria.title}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {convocatoria.interestedCreators.map(creator => (
                          <div key={creator.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{creator.name}</p>
                                <p className="text-sm text-gray-500">{creator.location}</p>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => viewCreatorProfile(creator)}>
                              Ver perfil
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {convocatoria.status === "open" && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleCloseConvocatoria(convocatoria.id)}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Cerrar convocatoria
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <FileText className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">Sin convocatorias</CardTitle>
              <CardDescription>
                No tienes convocatorias {activeTab === "open" ? "abiertas" : "cerradas"} en este momento
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Creator profile dialog */}
      <Dialog open={!!selectedCreator} onOpenChange={(open) => !open && setSelectedCreator(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedCreator && (
            <CreatorProfile 
              creator={selectedCreator}
              onClose={() => setSelectedCreator(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
