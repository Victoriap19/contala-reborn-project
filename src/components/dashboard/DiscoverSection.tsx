
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Search, Users, MapPin, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type Creator = {
  id: string;
  name: string;
  lastName?: string;
  age: number;
  gender: string;
  location: string;
  avatar: string;
  rating: number;
  tag: string;
  bio?: string;
  price: number;
  acceptsBarter: boolean;
  portfolio: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
};

// Datos de ejemplo para creadores
const creatorsData: Creator[] = [
  {
    id: "1",
    name: "Laura",
    lastName: "Rodríguez",
    age: 28,
    gender: "Femenino",
    location: "Buenos Aires",
    avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Moda",
    bio: "Especialista en fotografía y vídeos para marcas de moda y lifestyle. Más de 5 años de experiencia trabajando con marcas nacionales e internacionales.",
    price: 25000,
    acceptsBarter: true,
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Sesión primavera" },
      { type: 'video', url: "https://player.vimeo.com/video/372185693", title: "Campaña verano" },
      { type: 'image', url: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Lookbook" }
    ]
  },
  {
    id: "2",
    name: "Carlos",
    lastName: "Gómez",
    age: 32,
    gender: "Masculino",
    location: "Córdoba",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    tag: "Gaming",
    bio: "Creador de contenido especializado en gaming y tecnología. Colaboro con marcas para promocionar productos tecnológicos y videojuegos.",
    price: 30000,
    acceptsBarter: false,
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Setup gaming" },
      { type: 'video', url: "https://player.vimeo.com/video/248077971", title: "Review consola" }
    ]
  },
  {
    id: "3",
    name: "Ana",
    lastName: "Martínez",
    age: 25,
    gender: "Femenino",
    location: "Rosario",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4,
    tag: "Lifestyle",
    bio: "Creadora de contenido sobre estilo de vida, viajes y bienestar. Me especializo en crear contenido auténtico y cercano para las marcas.",
    price: 18000,
    acceptsBarter: true,
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Colaboración" },
      { type: 'image', url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Rutina matutina" }
    ]
  },
  {
    id: "4",
    name: "Daniel",
    lastName: "López",
    age: 30,
    gender: "Masculino",
    location: "Mendoza",
    avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Fitness",
    bio: "Entrenador personal y creador de contenido fitness. Especializado en rutinas de entrenamiento y nutrición deportiva.",
    price: 22000,
    acceptsBarter: true,
    portfolio: [
      { type: 'video', url: "https://player.vimeo.com/video/414885645", title: "Rutina HIIT" },
      { type: 'image', url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Antes/Después" }
    ]
  },
  {
    id: "5",
    name: "Valentina",
    lastName: "Ruiz",
    age: 27,
    gender: "Femenino",
    location: "Buenos Aires",
    avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 3.5,
    tag: "Gastronomía",
    bio: "Chef y creadora de contenido gastronómico. Me especializo en recetas saludables, rápidas y accesibles para todos los públicos.",
    price: 20000,
    acceptsBarter: false,
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Plato gourmet" },
      { type: 'video', url: "https://player.vimeo.com/video/369662061", title: "Receta navideña" }
    ]
  },
];

// Componente para el rating de estrellas
const StarRating = ({ rating }: { rating: number }) => {
  // Redondear a 0.5 más cercano
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
      <span className="ml-1 text-xs text-gray-500">{rating}</span>
    </div>
  );
};

export function DiscoverSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCreator, setExpandedCreator] = useState<string | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  
  // Estados para filtros
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [genderFilter, setGenderFilter] = useState<string>("todos");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [acceptsBarterOnly, setAcceptsBarterOnly] = useState<boolean>(false);

  // Estado para propuesta
  const [proposal, setProposal] = useState({
    description: "",
    platforms: "",
    offer: "",
    barter: ""
  });
  const [isBarterProposal, setIsBarterProposal] = useState(false);
  
  // Filtrar creadores según los criterios
  const filteredCreators = creatorsData.filter(creator => {
    // Filtro por término de búsqueda
    const searchMatch = 
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por edad
    const ageMatch = creator.age >= ageRange[0] && creator.age <= ageRange[1];
    
    // Filtro por género
    const genderMatch = genderFilter === "todos" || creator.gender === genderFilter;
    
    // Filtro por ubicación
    const locationMatch = locationFilter === "" || 
      creator.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Filtro por precio
    const priceMatch = creator.price >= priceRange[0] && creator.price <= priceRange[1];
    
    // Filtro por aceptación de canje
    const barterMatch = !acceptsBarterOnly || creator.acceptsBarter;
    
    return searchMatch && ageMatch && genderMatch && locationMatch && priceMatch && barterMatch;
  });

  const handleExpandCreator = (creatorId: string) => {
    if (expandedCreator === creatorId) {
      setExpandedCreator(null);
    } else {
      setExpandedCreator(creatorId);
    }
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
    // Aquí iría la lógica para enviar la propuesta al backend
    const proposalData = {
      creatorId: selectedCreator?.id,
      ...proposal,
      offerType: isBarterProposal ? 'barter' : 'monetary',
      offerAmount: isBarterProposal ? proposal.barter : proposal.offer
    };
    
    console.log("Enviando propuesta:", proposalData);
    
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
          Descubrir Creadores
        </h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar creador por nombre, categoría o ubicación..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rango de Edad</Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{ageRange[0]}</span>
                <Slider
                  min={18}
                  max={60}
                  step={1}
                  value={ageRange}
                  onValueChange={(value) => setAgeRange(value as [number, number])}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">{ageRange[1]}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Género</Label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="No binario">No binario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Ubicación</Label>
              <Input 
                placeholder="Ej. Buenos Aires" 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rango de Precios</Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">${priceRange[0]}</span>
                <Slider
                  min={0}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="w-full"
                />
                <span className="text-xs text-gray-500">${priceRange[1]}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="acceptsBarter" 
                checked={acceptsBarterOnly}
                onCheckedChange={setAcceptsBarterOnly}
              />
              <Label htmlFor="acceptsBarter" className="text-sm font-medium">
                Solo creadores que acepten canje
              </Label>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCreators.map((creator) => (
          <div key={creator.id}>
            <Card className={`overflow-hidden hover:shadow-md transition-shadow ${expandedCreator === creator.id ? 'border-contala-green' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4" onClick={() => handleExpandCreator(creator.id)}>
                  <Avatar className="h-16 w-16 border-2 border-contala-green">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 cursor-pointer">
                    <p className="font-medium text-lg text-contala-green">{creator.name}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <span>{creator.age} años</span>
                      <span>•</span>
                      <span>{creator.gender}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{creator.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <StarRating rating={creator.rating} />
                      <span className="text-sm font-medium text-contala-green">
                        {creator.acceptsBarter ? "Acepta canje" : `$${creator.price}`}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-contala-green border-contala-green hover:bg-contala-green hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProposalDialog(creator);
                    }}
                  >
                    Propuesta
                  </Button>
                </div>
                
                {expandedCreator === creator.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="mb-3">
                      <h4 className="font-medium text-contala-green">Bio</h4>
                      <p className="text-sm text-gray-600">{creator.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-contala-green mb-2">Portfolio</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {creator.portfolio.map((item, index) => (
                          <div key={index} className="aspect-square rounded overflow-hidden bg-gray-100">
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
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {filteredCreators.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron creadores con los filtros seleccionados.</p>
        </div>
      )}
      
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
