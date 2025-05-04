
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { MessageSquare, X, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulamos datos completos para los creadores vistos
interface Creator {
  id: string;
  name: string;
  lastName?: string;
  age?: number;
  gender?: string;
  location: string;
  avatar: string;
  rating?: number;
  tag?: string;
  bio?: string;
  price?: number;
  acceptsBarter?: boolean;
  portfolio?: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
}

// Función para obtener datos completos del creador
const getCreatorFullData = (creator: Creator): Creator => {
  // En un caso real, aquí haríamos una petición al backend
  // Por ahora simulamos datos para completar la información
  return {
    ...creator,
    lastName: creator.lastName || "Apellido",
    age: creator.age || 28,
    gender: creator.gender || "No especificado",
    rating: creator.rating || 4.5,
    bio: creator.bio || "Este creador de contenido se especializa en crear material atractivo y de alta calidad para marcas y negocios.",
    price: creator.price || 25000,
    acceptsBarter: creator.acceptsBarter !== undefined ? creator.acceptsBarter : true,
    portfolio: creator.portfolio || [
      { 
        type: 'image', 
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        title: "Proyecto reciente" 
      },
      {
        type: 'image',
        url: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        title: "Colaboración"
      }
    ]
  };
};

interface CreatorProfileViewProps {
  creator: Creator;
  onClose: () => void;
}

export function CreatorProfileView({ creator, onClose }: CreatorProfileViewProps) {
  const { toast } = useToast();
  const [showProposalDialog, setShowProposalDialog] = useState(false);
  const [isBarterProposal, setIsBarterProposal] = useState(false);
  const [proposal, setProposal] = useState({
    description: "",
    platforms: "",
    offer: "",
    barter: ""
  });
  
  // Obtener datos completos del creador
  const fullCreator = getCreatorFullData(creator);
  
  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposal(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSendProposal = () => {
    // Aquí iría la lógica para enviar la propuesta al backend
    const proposalData = {
      creatorId: fullCreator.id,
      ...proposal,
      offerType: isBarterProposal ? 'barter' : 'monetary',
      offerAmount: isBarterProposal ? proposal.barter : proposal.offer
    };
    
    console.log("Enviando propuesta:", proposalData);
    
    toast({
      title: "Propuesta enviada",
      description: `Tu propuesta ha sido enviada a ${fullCreator.name}. Te notificaremos cuando responda.`,
    });
    
    setShowProposalDialog(false);
    setProposal({
      description: "",
      platforms: "",
      offer: "",
      barter: ""
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-contala-cream to-contala-cream/80">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-contala-green">
            <AvatarImage src={fullCreator.avatar} alt={fullCreator.name} />
            <AvatarFallback>{fullCreator.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-contala-green">
              {fullCreator.name} {fullCreator.lastName}
            </h2>
            <div className="flex items-center mt-1">
              {fullCreator.rating && <StarRating rating={fullCreator.rating} />}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-contala-green/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-4 md:col-span-1 bg-contala-green/10 p-4 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Información personal</h3>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Edad:</span> {fullCreator.age} años</p>
              <p><span className="font-medium">Género:</span> {fullCreator.gender}</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-contala-green mr-1" />
                <span>{fullCreator.location}</span>
              </div>
              <p>
                <span className="font-medium">Tarifa:</span> {fullCreator.price && `$${fullCreator.price}`}
                {fullCreator.acceptsBarter && (
                  <span className="ml-2 text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
                    Acepta canje
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 md:col-span-2">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Presentación</h3>
            <p className="text-contala-green">{fullCreator.bio}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-contala-green">Portfolio</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fullCreator.portfolio?.map((item, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md">
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

      <div className="mt-8 flex justify-end">
        <Button 
          className="bg-contala-green hover:bg-contala-green/90"
          onClick={() => setShowProposalDialog(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Enviar propuesta
        </Button>
      </div>

      {/* Dialog for sending proposal */}
      <Dialog open={showProposalDialog} onOpenChange={setShowProposalDialog}>
        <DialogContent className="sm:max-w-[500px] bg-contala-cream/90">
          <DialogHeader>
            <DialogTitle>Enviar propuesta a {fullCreator.name}</DialogTitle>
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
                <input 
                  id="isBarterProposal" 
                  type="checkbox"
                  checked={isBarterProposal}
                  onChange={() => setIsBarterProposal(!isBarterProposal)}
                  className="h-4 w-4 rounded border-gray-300 text-contala-green focus:ring-contala-green"
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
              onClick={() => setShowProposalDialog(false)}
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
