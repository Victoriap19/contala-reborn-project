
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, User } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CreatorProfile } from "./CreatorProfile";
import { useIsMobile } from "@/hooks/use-mobile";

export function CreatorsSection() {
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const isMobile = useIsMobile();
  
  // Mock data for content creators with enhanced properties
  const contentCreators = [
    {
      id: 1,
      name: "Laura Martínez",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      category: "Moda",
      followers: "10K",
      location: "Buenos Aires",
      minFee: 500,
      acceptsTrade: false,
      bio: "Influencer de moda con 5 años de experiencia trabajando con marcas nacionales e internacionales. Especializada en contenido fotográfico para redes sociales.",
      tags: ["Fotografía", "Lifestyle"]
    },
    {
      id: 2,
      name: "Carlos Gómez",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      category: "Tecnología",
      followers: "50K",
      location: "Córdoba",
      minFee: 1000,
      acceptsTrade: true,
      bio: "Creador de contenido tecnológico, especializado en reviews de productos y tutoriales de software. Amplia experiencia en videos para YouTube y TikTok.",
      tags: ["Video", "Reviews"]
    },
    {
      id: 3,
      name: "Marta Sánchez",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      category: "Belleza",
      followers: "25K",
      location: "Rosario",
      minFee: 750,
      acceptsTrade: true,
      bio: "Maquilladora profesional y creadora de contenido de belleza. Especializada en tutoriales de maquillaje y reseñas de productos.",
      tags: ["Tutorial", "Reseñas"]
    },
    {
      id: 4,
      name: "Juan Pérez",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      category: "Gaming",
      followers: "100K",
      location: "Mendoza",
      minFee: 1200,
      acceptsTrade: false,
      bio: "Streamer y creador de contenido de videojuegos. Especializado en gameplays y reviews de títulos populares.",
      tags: ["Streaming", "Gameplay"]
    },
    {
      id: 5,
      name: "Ana Castro",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Fitness",
      followers: "75K",
      location: "Buenos Aires",
      minFee: 800,
      acceptsTrade: true,
      bio: "Entrenadora personal y creadora de contenido fitness. Especializada en rutinas de entrenamiento y consejos de nutrición.",
      tags: ["Entrenamiento", "Nutrición"]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-contala-green">Tus Creadores</h2>
      
      <div className="mb-6">
        <div className="relative">
          <Input 
            placeholder="Buscar creadores por categoría, ubicación..." 
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="py-4">
        <h3 className="font-medium text-lg text-contala-green mb-4">Creadores destacados</h3>
        <Carousel className="w-full">
          <CarouselContent>
            {contentCreators.map((creator) => (
              <CarouselItem key={creator.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden h-full">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img 
                      src={creator.image} 
                      alt={creator.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-contala-green">{creator.name}</h4>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{creator.category}</span>
                      <span>{creator.followers} seguidores</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{creator.location}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {creator.acceptsTrade && (
                        <Badge variant="outline" className="text-xs border-contala-pink text-contala-pink">
                          Acepta Canje
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs border-contala-green text-contala-green">
                        Caché Min: ${creator.minFee}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                      onClick={() => setSelectedCreator(creator)}
                    >
                      Ver perfil
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={`${isMobile ? "-left-2" : "-left-4"} bg-contala-green text-contala-cream`} />
          <CarouselNext className={`${isMobile ? "-right-2" : "-right-4"} bg-contala-green text-contala-cream`} />
        </Carousel>
      </div>

      <div className="py-4">
        <h3 className="font-medium text-lg text-contala-green mb-4">Todos los creadores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentCreators.map((creator) => (
            <Card key={creator.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                  src={creator.image} 
                  alt={creator.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium text-contala-green">{creator.name}</h4>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{creator.category}</span>
                  <span>{creator.followers} seguidores</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{creator.location}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {creator.acceptsTrade && (
                    <Badge variant="outline" className="text-xs border-contala-pink text-contala-pink">
                      Acepta Canje
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs border-contala-green text-contala-green">
                    Caché Min: ${creator.minFee}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-3 border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                  onClick={() => setSelectedCreator(creator)}
                >
                  Ver perfil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCreator && (
        <CreatorProfile 
          creator={selectedCreator} 
          isOpen={!!selectedCreator} 
          onClose={() => setSelectedCreator(null)} 
        />
      )}
    </div>
  );
}
