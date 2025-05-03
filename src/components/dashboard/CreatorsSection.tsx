
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Search, Users, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

type Creator = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  tag: string;
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
  },
  {
    id: "2",
    name: "Carlos Gómez",
    location: "Córdoba",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    tag: "Gaming",
  },
  {
    id: "3",
    name: "Ana Martínez",
    location: "Rosario",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4,
    tag: "Lifestyle",
  },
  {
    id: "4",
    name: "Daniel López",
    location: "Mendoza",
    avatar: "https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.5,
    tag: "Fitness",
  },
  {
    id: "5",
    name: "Valentina Ruiz",
    location: "Buenos Aires",
    avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 3.5,
    tag: "Gastronomía",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const filteredCreators = creatorsData.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (creator: Creator) => {
    setSelectedCreator(creator);
  };

  const handleNewRating = (creatorId: string, newRating: number) => {
    // In a real app, this would update the rating in the database
    console.log(`Rating creator ${creatorId} with ${newRating} stars`);
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
                  onClick={() => handleViewProfile(creator)}
                >
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
    </div>
  );
}
