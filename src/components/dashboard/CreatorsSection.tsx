
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Users } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CreatorsSection() {
  // Mock data for content creators
  const contentCreators = [
    {
      id: 1,
      name: "Laura Martínez",
      image: "/placeholder.svg",
      category: "Moda",
      followers: "10K",
      location: "Buenos Aires"
    },
    {
      id: 2,
      name: "Carlos Gómez",
      image: "/placeholder.svg",
      category: "Tecnología",
      followers: "50K",
      location: "Córdoba"
    },
    {
      id: 3,
      name: "Marta Sánchez",
      image: "/placeholder.svg",
      category: "Belleza",
      followers: "25K",
      location: "Rosario"
    },
    {
      id: 4,
      name: "Juan Pérez",
      image: "/placeholder.svg",
      category: "Gaming",
      followers: "100K",
      location: "Mendoza"
    },
    {
      id: 5,
      name: "Ana Castro",
      image: "/placeholder.svg",
      category: "Fitness",
      followers: "75K",
      location: "Buenos Aires"
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
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                    >
                      Ver perfil
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 bg-contala-green text-contala-cream" />
          <CarouselNext className="-right-4 bg-contala-green text-contala-cream" />
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
                <Button 
                  variant="outline" 
                  className="w-full mt-3 border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
                >
                  Ver perfil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
