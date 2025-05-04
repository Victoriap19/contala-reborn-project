import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Users, MapPin, Filter, ChevronDown, ChevronUp, User, Play, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreatorProfileView } from "./CreatorProfileView";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  lastActivity: string;
  portfolio: Array<{
    type: 'image' | 'video';
    url: string;
    title?: string;
  }>;
};

// Sample creator data
const yourCreatorsData: Creator[] = [
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
    lastActivity: "hace 2 días",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Sesión primavera" },
      { type: 'video', url: "https://player.vimeo.com/video/372185693", title: "Campaña verano" }
    ]
  },
  {
    id: "2",
    name: "Carlos",
    lastName: "Gómez",
    age: 32,
    gender: "Masculino",
    location: "Córdoba",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    tag: "Gaming",
    bio: "Creador de contenido especializado en gaming y tecnología. Colaboro con marcas para promocionar productos tecnológicos y videojuegos.",
    lastActivity: "hace 5 días",
    portfolio: [
      { type: 'image', url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Setup gaming" },
      { type: 'video', url: "https://player.vimeo.com/video/248077971", title: "Review consola" }
    ]
  },
  {
    id: "4",
    name: "Daniel",
    lastName: "López",
    age: 30,
    gender: "Masculino",
    location: "Mendoza",
    avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Fitness",
    bio: "Entrenador personal y creador de contenido fitness. Especializado en rutinas de entrenamiento y nutrición deportiva.",
    lastActivity: "hace 1 semana",
    portfolio: [
      { type: 'video', url: "https://player.vimeo.com/video/414885645", title: "Rutina HIIT" },
      { type: 'image', url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", title: "Antes/Despu��s" }
    ]
  }
];

export function CreatorsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingCreator, setViewingCreator] = useState<Creator | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  
  const filteredCreators = yourCreatorsData.filter(creator => 
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewCreatorProfile = (creator: Creator) => {
    setViewingCreator(creator);
    if (activeVideo) {
      const video = videoRefs.current[activeVideo];
      if (video) {
        video.pause();
      }
    }
    setActiveVideo(null);
  };
  
  const closeCreatorProfile = () => {
    setViewingCreator(null);
  };
  
  const handleVideoPlay = (creatorId: string, videoUrl: string) => {
    // If there's already a video playing, pause it
    if (activeVideo && activeVideo !== videoUrl) {
      const oldVideo = videoRefs.current[activeVideo];
      if (oldVideo) {
        oldVideo.pause();
      }
    }
    setActiveVideo(videoUrl);
  };

  return (
    <div className="space-y-8 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-contala-darkpink/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-contala-green/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-3xl font-bold text-contala-green flex items-center gap-2 font-serif">
          <Users className="h-7 w-7" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-contala-green to-contala-green/70">
            Tus Creadores
          </span>
        </h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar por nombre, categoría o ubicación..."
          className="pl-10 bg-contala-green/5 border-contala-green/20 focus:border-contala-green rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCreators.map((creator) => {
          // Find a video to showcase, if available
          const showcaseVideo = creator.portfolio.find(item => item.type === 'video');
          const showcaseImage = creator.portfolio.find(item => item.type === 'image');
          
          return (
            <Card key={creator.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-contala-cream border-none ring-1 ring-contala-green/10 rounded-2xl">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main content area - video or image */}
                  <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                    {showcaseVideo ? (
                      <div className="relative w-full h-full">
                        <video 
                          ref={(el) => videoRefs.current[showcaseVideo.url] = el}
                          src={showcaseVideo.url} 
                          className="w-full h-full object-cover"
                          loop
                          muted
                          onClick={(e) => {
                            e.preventDefault();
                            const video = e.currentTarget;
                            if (video.paused) {
                              video.play();
                              handleVideoPlay(creator.id, showcaseVideo.url);
                            } else {
                              video.pause();
                              setActiveVideo(null);
                            }
                          }}
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
                            onClick={(e) => {
                              e.preventDefault();
                              const video = videoRefs.current[showcaseVideo.url];
                              if (video) {
                                if (video.paused) {
                                  video.play();
                                  handleVideoPlay(creator.id, showcaseVideo.url);
                                } else {
                                  video.pause();
                                  setActiveVideo(null);
                                }
                              }
                            }}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    ) : showcaseImage ? (
                      <img 
                        src={showcaseImage.url} 
                        alt={creator.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-contala-pink/20 to-contala-green/20"></div>
                    )}
                  </div>
                  
                  {/* Overlaid info bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-lg line-clamp-1">{creator.name}</p>
                          <div className="flex items-center text-xs text-gray-200">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{creator.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <StarRating rating={creator.rating} />
                        <Button 
                          variant="default" 
                          size="sm"
                          className="mt-2 bg-white text-contala-green hover:bg-contala-cream hover:text-contala-green rounded-full shadow-md"
                          onClick={() => viewCreatorProfile(creator)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Creator category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/80 text-contala-green border-none font-medium rounded-full backdrop-blur-sm">
                      {creator.tag}
                    </Badge>
                  </div>
                  
                  {/* Last activity badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-contala-cream/80 text-contala-green border-contala-green/20 rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {creator.lastActivity}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredCreators.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No se encontraron creadores con ese término de búsqueda.</p>
          <p className="text-gray-400 mt-1">Intenta con otras palabras o explora para encontrar nuevos creadores.</p>
        </div>
      )}
      
      {/* Dialog for viewing creator profile */}
      <Dialog open={viewingCreator !== null} onOpenChange={(open) => !open && closeCreatorProfile()}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
          {viewingCreator && (
            <CreatorProfileView
              creator={viewingCreator}
              onClose={closeCreatorProfile}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
