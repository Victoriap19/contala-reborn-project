
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { MessageSquare, X, MapPin, Play, Pause, PauseCircle, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Simulate complete data for viewed creators
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

// Function to get complete creator data
const getCreatorFullData = (creator: Creator): Creator => {
  // In a real case, we would make a request to the backend
  // For now, we simulate data to complete the information
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
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({});
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  
  // Get complete creator data
  const fullCreator = getCreatorFullData(creator);
  
  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposal(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSendProposal = () => {
    // Here would go the logic to send the proposal to the backend
    const proposalData = {
      creatorId: fullCreator.id,
      ...proposal,
      offerType: isBarterProposal ? 'barter' : 'monetary',
      offerAmount: isBarterProposal ? proposal.barter : proposal.offer
    };
    
    console.log("Sending proposal:", proposalData);
    
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

  const handleVideoPlay = (videoUrl: string, videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      // Pause other videos first
      Object.entries(videoRefs.current).forEach(([url, video]) => {
        if (url !== videoUrl && video && !video.paused) {
          video.pause();
          setIsPlaying(prev => ({ ...prev, [url]: false }));
        }
      });
      
      // Play this video
      videoElement.play();
      setIsPlaying(prev => ({ ...prev, [videoUrl]: true }));
    } else {
      videoElement.pause();
      setIsPlaying(prev => ({ ...prev, [videoUrl]: false }));
    }
  };

  return (
    <div className="bg-gradient-to-br from-contala-cream to-white relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-contala-pink/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-contala-green/10 rounded-full blur-2xl -z-10"></div>
      
      {/* Header section with vintage style */}
      <div className="relative h-48 bg-gradient-to-r from-contala-green/90 to-contala-green/70 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute top-20 right-40 w-8 h-8 bg-white/10 rounded-full"></div>
        
        <div className="absolute inset-0 p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white/80 shadow-lg">
              <AvatarImage src={fullCreator.avatar} alt={fullCreator.name} />
              <AvatarFallback>{fullCreator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="text-3xl font-bold font-serif">
                {fullCreator.name} {fullCreator.lastName}
              </h2>
              <div className="flex items-center mt-1">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {fullCreator.rating && <StarRating rating={fullCreator.rating} />}
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-white/20 hover:bg-white/30 text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute -bottom-5 left-28 right-0 h-10 bg-contala-cream transform rotate-2 scale-110"></div>
        <div className="absolute -bottom-5 left-0 right-28 h-10 bg-white transform -rotate-2 scale-110"></div>
      </div>

      <div className="p-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4 bg-gradient-to-br from-contala-green/5 to-white p-4 rounded-xl shadow-sm border border-contala-green/10">
              <h3 className="text-lg font-medium text-contala-green font-serif">Información personal</h3>
              <div className="space-y-2 divide-y divide-contala-green/10">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Edad</span>
                  <span className="font-medium">{fullCreator.age} años</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Género</span>
                  <span className="font-medium">{fullCreator.gender}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Ubicación</span>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-contala-green mr-1" />
                    <span className="font-medium">{fullCreator.location}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Tarifa</span>
                  <div>
                    {fullCreator.price && <span className="font-medium">${fullCreator.price}</span>}
                    {fullCreator.acceptsBarter && (
                      <span className="ml-2 text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
                        Acepta canje
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-contala-green hover:bg-contala-green/90 text-white font-medium"
                  onClick={() => setShowProposalDialog(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar propuesta
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-contala-green/10">
              <h3 className="text-xl font-medium text-contala-green mb-3 font-serif">Presentación</h3>
              <p className="text-gray-700 italic leading-relaxed">{fullCreator.bio}</p>
            </div>
            
            {fullCreator.portfolio && fullCreator.portfolio.length > 0 && (
              <div>
                <h3 className="text-xl font-medium text-contala-green mb-4 font-serif">Portfolio</h3>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {fullCreator.portfolio.map((item, index) => (
                      <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="aspect-square relative overflow-hidden rounded-lg border border-contala-green/10 group">
                          {item.type === 'image' ? (
                            <>
                              <img 
                                src={item.url} 
                                alt={item.title || `Item ${index}`}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                              />
                              {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm backdrop-blur-sm">
                                  {item.title}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full relative">
                              <video 
                                ref={(el) => videoRefs.current[item.url] = el}
                                src={item.url} 
                                className="w-full h-full object-cover"
                                loop
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full bg-white/30 hover:bg-white/50 text-white"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const videoElement = videoRefs.current[item.url];
                                    if (videoElement) {
                                      handleVideoPlay(item.url, videoElement);
                                    }
                                  }}
                                >
                                  {isPlaying[item.url] ? (
                                    <Pause className="h-8 w-8" />
                                  ) : (
                                    <Play className="h-8 w-8" />
                                  )}
                                </Button>
                              </div>
                              {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm backdrop-blur-sm">
                                  {item.title}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="mt-4 flex justify-center gap-2">
                    <CarouselPrevious className="static transform-none mx-1" />
                    <CarouselNext className="static transform-none mx-1" />
                  </div>
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog for sending proposal */}
      <Dialog open={showProposalDialog} onOpenChange={setShowProposalDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-contala-green text-xl font-serif">Enviar propuesta a {fullCreator.name}</DialogTitle>
            <DialogDescription>
              Completa los detalles de tu propuesta para este creador.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-contala-green">Descripción del proyecto</Label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Describe qué necesitas filmar o crear..."
                value={proposal.description}
                onChange={handleProposalChange}
                className="border-contala-green/20 focus:border-contala-green"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platforms" className="text-contala-green">Plataformas</Label>
              <Input 
                id="platforms"
                name="platforms"
                placeholder="Instagram, YouTube, TikTok, etc."
                value={proposal.platforms}
                onChange={handleProposalChange}
                className="border-contala-green/20 focus:border-contala-green"
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
                  <Label htmlFor="barter" className="text-contala-green">Propuesta de canje</Label>
                  <Textarea 
                    id="barter"
                    name="barter"
                    placeholder="Describe los productos o servicios que ofreces a cambio"
                    value={proposal.barter}
                    onChange={handleProposalChange}
                    className="border-contala-green/20 focus:border-contala-green"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="offer" className="text-contala-green">Oferta en $ARS</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <Input 
                      id="offer"
                      name="offer"
                      className="pl-6 border-contala-green/20 focus:border-contala-green"
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
              className="border-contala-green/20 text-contala-green"
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
