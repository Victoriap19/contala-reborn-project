
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/dashboard/StarRating";
import { User, MapPin, Mail, Instagram, Globe, Phone, X } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BaseCreator {
  id: string;
  name: string;
  location: string;
}

// The Creator type from CreatorProfileView
interface DetailedCreator extends BaseCreator {
  image?: string;
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

// The Creator type from ConvocatoriasSection
interface ConvocatoriaCreator extends BaseCreator {
  avatar: string;
}

// The Creator type from CreatorsSection and DiscoverSection
interface ExpandedCreator extends BaseCreator {
  lastName?: string;
  age: number;
  gender: string;
  avatar: string;
  rating: number;
  tag: string;
  bio?: string;
  lastActivity?: string;
  price?: number;
  acceptsBarter?: boolean;
  portfolio: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
}

// Union type for any creator that might be passed to this component
type AnyCreator = DetailedCreator | ConvocatoriaCreator | ExpandedCreator;

interface CreatorProfileViewProps {
  creator: AnyCreator;
  onClose?: () => void;
  isOpen?: boolean;
}

export function CreatorProfileView({ creator, onClose, isOpen = true }: CreatorProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'portfolio'>('info');

  // Helper function to get the avatar/image url
  const getCreatorImage = () => {
    if ('image' in creator && creator.image) {
      return creator.image;
    } else if ('avatar' in creator && creator.avatar) {
      return creator.avatar;
    }
    return '';
  };

  // Helper function to get the rating
  const getCreatorRating = () => {
    if ('rating' in creator) {
      return creator.rating;
    }
    return 0;
  };

  // Helper function to get the description/bio
  const getDescription = () => {
    if ('description' in creator) {
      return creator.description;
    } else if ('bio' in creator && creator.bio) {
      return creator.bio;
    }
    return 'Sin descripción disponible';
  };

  // Helper function to get categories or tags
  const getCategories = () => {
    if ('categories' in creator && creator.categories) {
      return creator.categories;
    } else if ('tag' in creator && creator.tag) {
      return [creator.tag];
    }
    return [];
  };

  // Helper to get portfolio items
  const getPortfolioItems = () => {
    if ('portfolio' in creator && Array.isArray(creator.portfolio)) {
      if (creator.portfolio.length > 0) {
        if ('type' in creator.portfolio[0]) {
          // It's ExpandedCreator portfolio
          return (creator.portfolio as Array<{type: 'image' | 'video', url: string, title?: string}>)
            .map(item => ({
              title: item.title || 'Sin título',
              image: item.type === 'image' ? item.url : 'https://via.placeholder.com/300x200?text=Video'
            }));
        } else {
          // It's DetailedCreator portfolio
          return (creator.portfolio as Array<{title: string, image: string}>);
        }
      }
    }
    return [];
  };

  return (
    <div className="bg-contala-cream paper-texture border-contala-green/20 p-0 rounded-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-b from-contala-green/10 to-transparent rounded-t-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-contala-green">Perfil de Creador</h2>
          {onClose && (
            <Button variant="ghost" onClick={onClose} className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
        
      <div className="px-6 pb-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            {getCreatorImage() ? (
              <AvatarImage src={getCreatorImage()} alt={creator.name} />
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
                {'rating' in creator && (
                  <div className="flex items-center">
                    <StarRating rating={getCreatorRating()} />
                    {'reviewCount' in creator && (
                      <span className="text-sm text-gray-600 ml-1">({creator.reviewCount})</span>
                    )}
                  </div>
                )}
              </div>
            </div>
              
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {getCategories().map((category, i) => (
                <Badge key={i} variant="outline" className="bg-contala-green/5">
                  {category}
                </Badge>
              ))}
            </div>
              
            <div className="flex justify-center sm:justify-start space-x-2">
              <Button 
                className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
          
        <Tabs defaultValue="info" value={activeTab} onValueChange={(value) => setActiveTab(value as 'info' | 'portfolio')}>
          <TabsList className="border-b border-contala-green/10 bg-transparent w-full justify-start">
            <TabsTrigger value="info" className="data-[state=active]:border-b-2 data-[state=active]:border-contala-green rounded-none">
              Información
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:border-b-2 data-[state=active]:border-contala-green rounded-none">
              Portfolio
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="pt-4 space-y-6">
            <div>
              <h3 className="font-medium text-contala-green mb-2">Acerca de</h3>
              <p className="text-gray-600">{getDescription()}</p>
            </div>
            
            {'contact' in creator && creator.contact && (
              <div>
                <h3 className="font-medium text-contala-green mb-2">Contacto</h3>
                <div className="space-y-2">
                  {creator.contact.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600">{creator.contact.email}</span>
                    </div>
                  )}
                  
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
            )}
          </TabsContent>
          
          <TabsContent value="portfolio" className="pt-4 space-y-4">
            <h3 className="font-medium text-contala-green">Trabajos destacados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getPortfolioItems().map((item, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
