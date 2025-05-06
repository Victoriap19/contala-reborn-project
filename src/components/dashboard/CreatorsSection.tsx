
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Star, Plus, MessageSquare, User, Users, Clock, Calendar, Heart, HeartOff } from "lucide-react";
import { StarRating } from "./StarRating";
import { CreatorProfileView } from "./CreatorProfileView";
import { useToast } from "@/hooks/use-toast";

// Types
type Creator = {
  id: string;
  name: string;
  avatar: string;
  location: string;
  category: string;
  rating: number;
  favorite: boolean;
  lastContact?: string;
  collaborations?: number;
  portfolio?: {
    type: 'image' | 'video';
    url: string;
    title?: string;
  }[];
};

export function CreatorsSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  
  // Sample data for creators
  const [creators, setCreators] = useState<Creator[]>([
    {
      id: "1",
      name: "Laura Rodríguez",
      avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      location: "Buenos Aires",
      category: "Moda",
      rating: 4.5,
      favorite: true,
      lastContact: "2023-05-15",
      collaborations: 3,
      portfolio: [
        { type: 'image', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Sesión primavera" },
        { type: 'video', url: "https://player.vimeo.com/video/372185693", title: "Campaña verano" }
      ]
    },
    {
      id: "2",
      name: "Carlos Gómez",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      location: "Córdoba",
      category: "Gaming",
      rating: 5,
      favorite: false,
      lastContact: "2023-04-20",
      collaborations: 1
    },
    {
      id: "3",
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      location: "Rosario",
      category: "Lifestyle",
      rating: 4,
      favorite: true,
      lastContact: "2023-06-10",
      collaborations: 2
    },
    {
      id: "4",
      name: "Daniel López",
      avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      location: "Mendoza",
      category: "Fitness",
      rating: 4.5,
      favorite: false
    },
  ]);
  
  // Filter creators based on tab and search term
  const filteredCreators = creators.filter(creator => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      creator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === "favorites") {
      return creator.favorite && matchesSearch;
    }
    
    return matchesSearch;
  });
  
  // Toggle favorite status for a creator
  const toggleFavorite = (creatorId: string) => {
    setCreators(prev => prev.map(creator => 
      creator.id === creatorId 
        ? { ...creator, favorite: !creator.favorite } 
        : creator
    ));
    
    const creator = creators.find(c => c.id === creatorId);
    if (creator) {
      toast({
        title: creator.favorite ? "Quitado de favoritos" : "Añadido a favoritos",
        description: `${creator.name} ha sido ${creator.favorite ? "quitado de" : "añadido a"} tus creadores favoritos.`
      });
    }
  };
  
  // Show creator profile
  const viewCreatorProfile = (creator: Creator) => {
    setSelectedCreator(creator);
  };
  
  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Sin contacto";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
          <Users className="h-6 w-6" />
          Tus Creadores
        </h2>
        
        <Button 
          className="bg-contala-green text-contala-cream hover:bg-contala-green/90 flex items-center gap-2"
          onClick={() => toast({
            title: "Función en desarrollo",
            description: "Pronto podrás invitar creadores directamente"
          })}
        >
          <Plus className="h-4 w-4" />
          Invitar Creador
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "all" | "favorites")}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Todos</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Favoritos</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar creador..."
            className="pl-10 bg-contala-green/5 border-contala-green/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCreators.map(creator => (
            <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-contala-green/10">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{creator.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-contala-pink/10 text-contala-green border-contala-pink/20">
                          {creator.category}
                        </Badge>
                        <span className="px-2">•</span>
                        <span className="text-sm text-gray-500">{creator.location}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div>
                    <StarRating rating={creator.rating} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
                  {creator.lastContact && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Último contacto: {formatDate(creator.lastContact)}</span>
                    </div>
                  )}
                  {creator.collaborations !== undefined && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{creator.collaborations} colaboración{creator.collaborations !== 1 ? 'es' : ''}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button 
                  variant={creator.favorite ? "destructive" : "outline"} 
                  className={creator.favorite ? "bg-red-100 text-red-600 hover:bg-red-200 border-red-200" : ""}
                  size="sm"
                  onClick={() => toggleFavorite(creator.id)}
                >
                  {creator.favorite ? (
                    <>
                      <HeartOff className="h-4 w-4 mr-2" />
                      Quitar favorito
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Añadir favorito
                    </>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50"
                    onClick={() => toast({
                      title: "Mensajería",
                      description: "Función de mensajería próximamente"
                    })}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Mensaje
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-contala-green/10 text-contala-green hover:bg-contala-green/20"
                    onClick={() => viewCreatorProfile(creator)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Ver perfil
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 bg-contala-green/5">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">No hay creadores</CardTitle>
              <CardDescription>
                {activeTab === "favorites" 
                  ? "No tienes creadores favoritos. Añade algunos para verlos aquí."
                  : "No tienes creadores en tu red todavía. Explora la sección 'Descubrir' para encontrar creadores."}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Creator profile dialog */}
      <Dialog open={!!selectedCreator} onOpenChange={(open) => !open && setSelectedCreator(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-contala-cream/90">
          {selectedCreator && (
            <CreatorProfileView 
              creator={selectedCreator}
              onClose={() => setSelectedCreator(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
