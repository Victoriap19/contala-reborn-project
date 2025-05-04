
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Mail, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserProfile() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    marca: "",
    urlProducto: "",
    urlInstagram: "",
    urlFacebook: "",
    urlTwitter: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar el perfil en el backend
    console.log("Guardando perfil:", { ...userProfile, profileImage });
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados correctamente",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green">Tu Perfil</h2>
        <Button 
          className="bg-contala-pink text-contala-green hover:bg-contala-pink/90"
          onClick={handleSaveProfile}
        >
          Guardar Cambios
        </Button>
      </div>

      <Card className="bg-transparent border border-contala-green/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-contala-green">Información Personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-contala-green/10 text-contala-green">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex items-center space-x-2">
              <Label 
                htmlFor="picture" 
                className="cursor-pointer bg-contala-green/10 text-contala-green px-4 py-2 rounded-md hover:bg-contala-green/20 transition"
              >
                Cambiar foto
              </Label>
              <Input 
                id="picture" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-contala-green">Nombre</Label>
              <Input 
                id="nombre" 
                name="nombre"
                value={userProfile.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-contala-green">Apellido</Label>
              <Input 
                id="apellido" 
                name="apellido"
                value={userProfile.apellido}
                onChange={handleInputChange}
                placeholder="Tu apellido" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-contala-green">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  id="telefono" 
                  name="telefono"
                  value={userProfile.telefono}
                  onChange={handleInputChange}
                  className="pl-8" 
                  placeholder="+54 11 1234 5678" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-contala-green">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  id="email" 
                  name="email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                  className="pl-8" 
                  placeholder="tu@email.com" 
                  type="email"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-transparent border border-contala-green/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-contala-green">Información de Marca</CardTitle>
          <CardDescription>Completa los datos de tu marca o producto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marca" className="text-contala-green">Nombre de la Marca o Producto</Label>
            <Input 
              id="marca" 
              name="marca"
              value={userProfile.marca}
              onChange={handleInputChange}
              placeholder="Tu marca" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urlProducto" className="text-contala-green">URL del Producto</Label>
            <div className="relative">
              <Link className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                id="urlProducto" 
                name="urlProducto"
                value={userProfile.urlProducto}
                onChange={handleInputChange}
                className="pl-8" 
                placeholder="https://tuproducto.com" 
              />
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <Label className="text-contala-green">Redes Sociales</Label>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">IG</div>
                <Input 
                  id="urlInstagram" 
                  name="urlInstagram"
                  value={userProfile.urlInstagram}
                  onChange={handleInputChange}
                  className="pl-8" 
                  placeholder="https://instagram.com/tumarca" 
                />
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">FB</div>
                <Input 
                  id="urlFacebook" 
                  name="urlFacebook"
                  value={userProfile.urlFacebook}
                  onChange={handleInputChange}
                  className="pl-8" 
                  placeholder="https://facebook.com/tumarca" 
                />
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">X</div>
                <Input 
                  id="urlTwitter" 
                  name="urlTwitter"
                  value={userProfile.urlTwitter}
                  onChange={handleInputChange}
                  className="pl-8" 
                  placeholder="https://x.com/tumarca" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
