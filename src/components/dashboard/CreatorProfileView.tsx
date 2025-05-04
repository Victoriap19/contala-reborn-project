
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/dashboard/StarRating";
import { User, MapPin, Mail, Instagram, Globe, Phone } from "lucide-react";
import { useState } from "react";

interface Creator {
  id: string;
  name: string;
  image?: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  categories: string[];
  portfolio: {
    title: string;
    image: string;
  }[];
  contact: {
    email: string;
    phone?: string;
    website?: string;
    instagram?: string;
  };
}

interface CreatorProfileViewProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator;
  onContact: (creator: Creator) => void;
}

export function CreatorProfileView({ isOpen, onClose, creator, onContact }: CreatorProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'portfolio'>('info');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px] bg-contala-cream paper-texture border-contala-green/20 p-0">
        <DialogHeader className="p-6 bg-gradient-to-b from-contala-green/10 to-transparent rounded-t-lg">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-contala-green">Perfil de Creador</DialogTitle>
            <DialogClose className="rounded-full hover:bg-contala-pink/10 p-2" />
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              {creator.image ? (
                <AvatarImage src={creator.image} alt={creator.name} />
              ) : (
                <AvatarFallback className="bg-contala-green/10 text-contala-green">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-xl font-bold text-contala-green">{creator.name}</h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{creator.location}</span>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={creator.rating} />
                    <span className="text-sm text-gray-600 ml-1">({creator.reviewCount})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {creator.categories.map((category) => (
                  <Badge key={category} variant="outline" className="bg-contala-green/5">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-center sm:justify-start space-x-2">
                <Button 
                  onClick={() => onContact(creator)}
                  className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1 border-b border-contala-green/10">
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'info' 
                ? 'text-contala-green border-b-2 border-contala-green' 
                : 'text-gray-600 hover:text-contala-green'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Información
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'portfolio' 
                ? 'text-contala-green border-b-2 border-contala-green' 
                : 'text-gray-600 hover:text-contala-green'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
          </div>
          
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-contala-green mb-2">Acerca de</h3>
                <p className="text-gray-600">{creator.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-contala-green mb-2">Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{creator.contact.email}</span>
                  </div>
                  
                  {creator.contact.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">{creator.contact.phone}</span>
                    </div>
                  )}
                  
                  {creator.contact.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-500 mr-2" />
                      <a href={creator.contact.website} target="_blank" rel="noopener noreferrer" className="text-contala-green hover:underline">
                        {creator.contact.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  {creator.contact.instagram && (
                    <div className="flex items-center">
                      <Instagram className="h-4 w-4 text-gray-500 mr-2" />
                      <a href={`https://instagram.com/${creator.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="text-contala-green hover:underline">
                        @{creator.contact.instagram}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <h3 className="font-medium text-contala-green">Trabajos destacados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {creator.portfolio.map((item, index) => (
                  <div key={index} className="vintage-card group">
                    <div className="relative pb-[75%]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
