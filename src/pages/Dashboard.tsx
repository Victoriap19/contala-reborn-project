
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Gallery, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Dashboard() {
  const navigate = useNavigate();
  const [brandInfo, setBrandInfo] = useState({
    name: "",
    description: "",
    category: "",
    website: ""
  });
  
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "Argentina"
  });

  const handleBrandInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrandInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    // This would connect to your backend
    console.log("Saving profile:", { brandInfo, location });
    // Show success notification or redirect
  };

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
    <div className="min-h-screen bg-contala-cream">
      {/* Dashboard Header */}
      <div className="bg-contala-green text-contala-cream py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Dashboard</h1>
          <Button 
            variant="outline" 
            className="border-contala-pink text-contala-pink hover:bg-contala-pink hover:text-contala-green"
            onClick={() => navigate("/")}
          >
            Regresar al inicio
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-contala-green/10">
            <TabsTrigger value="profile" className="data-[state=active]:bg-contala-green data-[state=active]:text-contala-cream">
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </TabsTrigger>
            <TabsTrigger value="creators" className="data-[state=active]:bg-contala-green data-[state=active]:text-contala-cream">
              <Gallery className="w-4 h-4 mr-2" />
              Creadores
            </TabsTrigger>
            <TabsTrigger value="location" className="data-[state=active]:bg-contala-green data-[state=active]:text-contala-cream">
              <MapPin className="w-4 h-4 mr-2" />
              Ubicación
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-contala-green">Información de Marca/Producto</CardTitle>
                <CardDescription>Completa la información sobre tu marca o producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-contala-green">Nombre de la marca</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={brandInfo.name}
                      onChange={handleBrandInfoChange}
                      placeholder="Ej: Mi Marca Genial" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-contala-green">Categoría</Label>
                    <Input 
                      id="category" 
                      name="category" 
                      value={brandInfo.category}
                      onChange={handleBrandInfoChange}
                      placeholder="Ej: Moda, Tecnología, Alimentos..." 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-contala-green">Sitio web</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={brandInfo.website}
                    onChange={handleBrandInfoChange}
                    type="url" 
                    placeholder="https://tu-sitio-web.com" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-contala-green">Descripción</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={brandInfo.description}
                    onChange={handleBrandInfoChange}
                    placeholder="Describe tu marca o producto..." 
                    rows={4} 
                  />
                </div>
                <Button 
                  className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
                  onClick={saveProfile}
                >
                  Guardar Información
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creators Tab */}
          <TabsContent value="creators">
            <Card>
              <CardHeader>
                <CardTitle className="text-contala-green">Galería de Creadores</CardTitle>
                <CardDescription>Explora creadores de contenido y encuentra el adecuado para tu marca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Input 
                      placeholder="Buscar creadores por categoría, ubicación..." 
                      className="pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Image className="h-5 w-5 text-gray-400" />
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle className="text-contala-green">Mi Ubicación</CardTitle>
                <CardDescription>Configura tu ubicación para encontrar creadores cercanos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-contala-green">Ciudad</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={location.city}
                      onChange={handleLocationChange}
                      placeholder="Ej: Buenos Aires" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-contala-green">Provincia</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={location.state}
                      onChange={handleLocationChange}
                      placeholder="Ej: Buenos Aires" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-contala-green">País</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    value={location.country}
                    onChange={handleLocationChange}
                    placeholder="Ej: Argentina" 
                  />
                </div>
                <Button 
                  className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
                  onClick={saveProfile}
                >
                  Guardar Ubicación
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
