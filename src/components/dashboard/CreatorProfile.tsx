import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, Mail, MapPin, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { userService, creatorService } from "@/services/api";
export function CreatorProfile() {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<{
    id?: number;
    type: 'image' | 'video';
    url: string;
    title?: string;
  }[]>([]);
  const [creatorProfile, setCreatorProfile] = useState({
    id: 0,
    creatorProfileId: 0,
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    ubicacion: "",
    descripcion: "",
    cache: "",
    aceptaCanje: false,
    specialties: "",
    experienceYears: 0
  });

  // Fetch creator profile data
  useEffect(() => {
    const fetchCreatorProfile = async () => {
      try {
        setIsLoading(true);
        // Assuming the current user ID is stored in localStorage
        const userId = localStorage.getItem("userId");
        if (userId) {
          // Fetch user data
          const userResponse = await userService.getUserProfile(parseInt(userId));
          const userData = userResponse.data;

          // Fetch creator profile data
          const creatorResponse = await creatorService.getCreatorProfile(userData.creator_profile.id);
          const creatorData = creatorResponse.data;
          setCreatorProfile({
            id: userData.id,
            creatorProfileId: creatorData.id,
            nombre: userData.first_name || "",
            apellido: userData.last_name || "",
            telefono: userData.phone || "",
            email: userData.email || "",
            ubicacion: creatorData.location || "",
            descripcion: userData.bio || "",
            cache: "",
            // This might need to be stored elsewhere or calculated
            aceptaCanje: false,
            // This might need to be stored elsewhere
            specialties: creatorData.specialties || "",
            experienceYears: creatorData.experience_years || 0
          });
          if (userData.profile_picture) {
            setProfileImage(userData.profile_picture);
          }

          // Fetch portfolio items
          const portfolioResponse = await creatorService.getPortfolio();
          if (portfolioResponse.data) {
            setPortfolio(portfolioResponse.data.map((item: any) => ({
              id: item.id,
              type: item.type,
              url: item.url,
              title: item.title
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching creator profile:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del perfil de creador",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreatorProfile();
  }, [toast]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setCreatorProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCanjeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatorProfile(prev => ({
      ...prev,
      aceptaCanje: e.target.checked
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePortfolioAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newItems = Array.from(files).map(file => {
      // Explicitly cast to the correct type to satisfy TypeScript
      const fileType: 'image' | 'video' = file.type.startsWith('image/') ? 'image' : 'video';
      return {
        type: fileType,
        url: URL.createObjectURL(file),
        title: file.name
      };
    });
    setPortfolio(prev => [...prev, ...newItems]);
  };
  const handlePortfolioDelete = async (index: number) => {
    const itemToDelete = portfolio[index];
    try {
      if (itemToDelete.id) {
        // If the item has an ID, it exists in the backend and needs to be deleted
        await creatorService.deletePortfolioItem(itemToDelete.id);
      }

      // Remove from local state
      setPortfolio(prev => prev.filter((_, i) => i !== index));
      toast({
        title: "Eliminado",
        description: "Elemento eliminado correctamente"
      });
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el elemento",
        variant: "destructive"
      });
    }
  };
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Update user profile
      const userData = {
        first_name: creatorProfile.nombre,
        last_name: creatorProfile.apellido,
        email: creatorProfile.email,
        phone: creatorProfile.telefono,
        bio: creatorProfile.descripcion,
        profile_picture: profileImage
      };
      await userService.updateUserProfile(creatorProfile.id, userData);

      // Update creator profile
      const creatorData = {
        location: creatorProfile.ubicacion,
        specialties: creatorProfile.specialties,
        experience_years: creatorProfile.experienceYears
      };
      await creatorService.updateCreatorProfile(creatorProfile.creatorProfileId, creatorData);

      // Handle portfolio items - only upload new ones (without ID)
      for (const item of portfolio) {
        if (!item.id) {
          await creatorService.addPortfolioItem({
            type: item.type,
            url: item.url,
            title: item.title || "Sin título"
          });
        }
      }
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente"
      });

      // Refresh portfolio to get the new IDs
      const portfolioResponse = await creatorService.getPortfolio();
      if (portfolioResponse.data) {
        setPortfolio(portfolioResponse.data.map((item: any) => ({
          id: item.id,
          type: item.type,
          url: item.url,
          title: item.title
        })));
      }
    } catch (error) {
      console.error("Error saving creator profile:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la información del perfil",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-contala-green"></div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-brown">Tu Perfil de Creador</h2>
        <Button onClick={handleSaveProfile} disabled={isSaving} className="text-contala-green bg-contala-brown">
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-contala-brown">Información Personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil como creador</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              {profileImage ? <AvatarImage src={profileImage} alt="Profile" /> : <AvatarFallback className="bg-contala-green/10 text-contala-green">
                  <User className="h-12 w-12" />
                </AvatarFallback>}
            </Avatar>
            <div className="flex items-center space-x-2">
              <Label htmlFor="picture" className="cursor-pointer bg-contala-green/10 text-contala-green px-4 py-2 rounded-md hover:bg-contala-green/20 transition">
                Cambiar foto
              </Label>
              <Input id="picture" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-contala-brown">Nombre</Label>
              <Input id="nombre" name="nombre" value={creatorProfile.nombre} onChange={handleInputChange} placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-contala-green">Apellido</Label>
              <Input id="apellido" name="apellido" value={creatorProfile.apellido} onChange={handleInputChange} placeholder="Tu apellido" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-contala-green">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="telefono" name="telefono" value={creatorProfile.telefono} onChange={handleInputChange} className="pl-8" placeholder="+54 11 1234 5678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-contala-green">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="email" name="email" value={creatorProfile.email} onChange={handleInputChange} className="pl-8" placeholder="tu@email.com" type="email" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion" className="text-contala-green">Ubicación</Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="ubicacion" name="ubicacion" value={creatorProfile.ubicacion} onChange={handleInputChange} className="pl-8" placeholder="Ciudad, Provincia" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-contala-green">Descripción</Label>
            <textarea id="descripcion" name="descripcion" value={creatorProfile.descripcion} onChange={handleInputChange} className="w-full min-h-[100px] p-2 border border-input rounded-md bg-background" placeholder="Cuéntanos sobre ti y el tipo de contenido que creas..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cache" className="text-contala-green">Caché aproximado</Label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 h-4 w-4 text-gray-500">$</span>
                <Input id="cache" name="cache" value={creatorProfile.cache} onChange={handleInputChange} className="pl-8" placeholder="Valor aproximado por contenido" />
              </div>
            </div>
            <div className="space-y-2 flex items-center">
              <div className="flex items-center space-x-2 mt-8">
                <input id="aceptaCanje" name="aceptaCanje" type="checkbox" checked={creatorProfile.aceptaCanje} onChange={handleCanjeChange} className="h-4 w-4" />
                <Label htmlFor="aceptaCanje" className="text-contala-green">Acepto canje por productos</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-contala-green">Portfolio</CardTitle>
          <CardDescription>Sube ejemplos de tu trabajo para mostrar a posibles clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery">
            <TabsList className="mb-4">
              <TabsTrigger value="gallery">Galería</TabsTrigger>
              <TabsTrigger value="upload">Subir Nuevo</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery">
              {portfolio.length === 0 ? <div className="text-center py-8 border border-dashed rounded-md">
                  <p className="text-gray-500">No tienes contenido en tu portfolio. ¡Comienza a subir ejemplos de tu trabajo!</p>
                </div> : <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolio.map((item, index) => <div key={index} className="aspect-square rounded-md overflow-hidden relative group">
                      {item.type === 'image' ? <img src={item.url} alt={item.title || `Portfolio item ${index + 1}`} className="w-full h-full object-cover" /> : <video src={item.url} controls className="w-full h-full object-cover">
                          Tu navegador no soporta videos.
                        </video>}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="destructive" size="sm" className="rounded-full h-8 w-8 p-0" onClick={() => handlePortfolioDelete(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>)}
                </div>}
            </TabsContent>
            <TabsContent value="upload">
              <div className="border border-dashed rounded-md p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium">Arrastra o selecciona archivos</h3>
                <p className="text-sm text-gray-500 mb-4">Sube imágenes y videos de tu trabajo</p>
                <Label htmlFor="portfolio" className="cursor-pointer bg-contala-green text-contala-cream px-4 py-2 rounded-md hover:bg-contala-green/90 transition inline-block">
                  Seleccionar Archivos
                </Label>
                <Input id="portfolio" type="file" accept="image/*,video/*" className="hidden" multiple onChange={handlePortfolioAdd} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
}