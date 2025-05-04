
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Search, Users, MapPin, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type Creator = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  tag: string;
  bio?: string;
  price: number;
  acceptsBarter: boolean;
  portfolio?: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
};

// Mock data for creators
const creatorsData: Creator[] = [
  {
    id: "1",
    name: "Laura Rodríguez",
    location: "Buenos Aires",
    avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Moda",
    price: 25000,
    acceptsBarter: true,
    bio: "Especialista en fotografía y vídeos para marcas de moda y lifestyle.",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Sesión primavera" },
      { type: 'video', url: "https://player.vimeo.com/video/372185693", title: "Campaña verano" }
    ]
  },
  {
    id: "2",
    name: "Carlos Gómez",
    location: "Córdoba",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    tag: "Gaming",
    price: 30000,
    acceptsBarter: false,
    bio: "Creador de contenido especializado en gaming y tecnología.",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Setup gaming" }
    ]
  },
  {
    id: "3",
    name: "Ana Martínez",
    location: "Rosario",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4,
    tag: "Lifestyle",
    price: 18000,
    acceptsBarter: true,
    bio: "Creadora de contenido sobre estilo de vida y viajes.",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Colaboración" }
    ]
  },
  {
    id: "4",
    name: "Daniel López",
    location: "Mendoza",
    avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Fitness",
    price: 22000,
    acceptsBarter: true,
    bio: "Entrenador personal y creador de contenido fitness.",
    portfolio: [
      { type: 'video', url: "https://player.vimeo.com/video/414885645", title: "Rutina HIIT" }
    ]
  },
  {
    id: "5",
    name: "Valentina Ruiz",
    location: "Buenos Aires",
    avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 3.5,
    tag: "Gastronomía",
    price: 20000,
    acceptsBarter: false,
    bio: "Chef y creadora de contenido gastronómico.",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Plato gourmet" }
    ]
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  // Round to nearest 0.5
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
    </div>
  );
};

export function CreatorsSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingCreator, setViewingCreator] = useState<Creator | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [proposal, setProposal] = useState({
    description: "",
    platforms: "",
    offer: "",
    barter: ""
  });
  const [isBarterProposal, setIsBarterProposal] = useState(false);

  const filteredCreators = creatorsData.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewCreatorProfile = (creator: Creator) => {
    setViewingCreator(creator);
  };

  const closeCreatorProfile = () => {
    setViewingCreator(null);
  };

  const openProposalDialog = (creator: Creator) => {
    setSelectedCreator(creator);
  };
  
  const closeProposalDialog = () => {
    setSelectedCreator(null);
    setProposal({
      description: "",
      platforms: "",
      offer: "",
      barter: ""
    });
    setIsBarterProposal(false);
  };
  
  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposal(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSendProposal = () => {
    // Here would go the logic to send the proposal to the backend
    console.log("Sending proposal:", {
      creatorId: selectedCreator?.id,
      ...proposal,
      offerType: isBarterProposal ? 'barter' : 'monetary',
      offerAmount: isBarterProposal ? proposal.barter : proposal.offer
    });
    
    toast({
      title: "Propuesta enviada",
      description: `Tu propuesta ha sido enviada a ${selectedCreator?.name}. Te notificaremos cuando responda.`,
    });
    
    closeProposalDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center gap-2">
          <Users className="h-6 w-6" />
          Tus Creadores
        </h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar por nombre, ubicación o categoría..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCreators.map((creator) => (
          <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-lg text-contala-green truncate">{creator.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{creator.location}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <StarRating rating={creator.rating} />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="text-contala-green border-contala-green hover:bg-contala-green hover:text-white"
                  onClick={() => viewCreatorProfile(creator)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Ver
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
        </div>
      )}

      {/* Dialog for viewing creator profile */}
      <Dialog open={viewingCreator !== null} onOpenChange={(open) => !open && closeCreatorProfile()}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14 border-2 border-contala-green">
                <AvatarImage src={viewingCreator?.avatar} alt={viewingCreator?.name} />
                <AvatarFallback>{viewingCreator?.name?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{viewingCreator?.name}</DialogTitle>
                <div className="flex items-center mt-1">
                  <StarRating rating={viewingCreator?.rating || 0} />
                </div>
              </div>
            </div>
          </DialogHeader>
          
          {viewingCreator && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Ubicación</p>
                  <p>{viewingCreator.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Categoría</p>
                  <p>{viewingCreator.tag}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Precio / Canje</p>
                  <p>{viewingCreator.acceptsBarter ? "Acepta canje" : `$${viewingCreator.price}`}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Presentación</p>
                <p className="text-base">{viewingCreator.bio || "Este creador aún no ha añadido una presentación."}</p>
              </div>
              
              {viewingCreator.portfolio && viewingCreator.portfolio.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500 pb-2 border-b">Portfolio</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {viewingCreator.portfolio.map((item, index) => (
                      <div key={index} className="aspect-square rounded-md overflow-hidden shadow-sm border">
                        {item.type === 'image' ? (
                          <img 
                            src={item.url} 
                            alt={item.title || `Item ${index}`}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full">
                            <iframe 
                              src={item.url} 
                              title={item.title || `Video ${index}`}
                              className="w-full h-full" 
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={closeCreatorProfile}
                >
                  Cerrar
                </Button>
                <Button 
                  className="bg-contala-green hover:bg-contala-green/90"
                  onClick={() => {
                    closeCreatorProfile();
                    openProposalDialog(viewingCreator);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Propuesta
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for sending proposal */}
      <Dialog open={selectedCreator !== null} onOpenChange={(open) => !open && closeProposalDialog()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enviar propuesta a {selectedCreator?.name}</DialogTitle>
            <DialogDescription>
              Completa los detalles de tu propuesta para este creador.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del proyecto</Label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Describe qué necesitas filmar o crear..."
                value={proposal.description}
                onChange={handleProposalChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platforms">Plataformas</Label>
              <Input 
                id="platforms"
                name="platforms"
                placeholder="Instagram, YouTube, TikTok, etc."
                value={proposal.platforms}
                onChange={handleProposalChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <Switch 
                  id="isBarterProposal" 
                  checked={isBarterProposal}
                  onCheckedChange={setIsBarterProposal}
                />
                <Label htmlFor="isBarterProposal">Proponer canje</Label>
              </div>
              
              {isBarterProposal ? (
                <div className="space-y-2">
                  <Label htmlFor="barter">Propuesta de canje</Label>
                  <Textarea 
                    id="barter"
                    name="barter"
                    placeholder="Describe los productos o servicios que ofreces a cambio"
                    value={proposal.barter}
                    onChange={handleProposalChange}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="offer">Oferta en $ARS</Label>
                  <div className="relative">
                    <span className="absolute left-2 top-2.5 text-gray-500">$</span>
                    <Input 
                      id="offer"
                      name="offer"
                      className="pl-6"
                      placeholder="Monto ofrecido"
                      value={proposal.offer}
                      onChange={handleProposalChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={closeProposalDialog}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSendProposal}
              disabled={!proposal.description || !proposal.platforms || (isBarterProposal ? !proposal.barter : !proposal.offer)}
              className="bg-contala-green hover:bg-contala-green/90"
            >
              Enviar propuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
