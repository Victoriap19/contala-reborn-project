import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Mail, Link, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { userService } from "@/services/api";
import { useNavigate } from "react-router-dom";
export function UserProfile() {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [userProfile, setUserProfile] = useState({
    id: 0,
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

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // Assuming the current user ID is stored in localStorage
        // In a real app, you might get this from a context or redux store
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await userService.getUserProfile(parseInt(userId));

          // Transform backend data to match our form structure
          const userData = response.data;
          setUserProfile({
            id: userData.id,
            nombre: userData.first_name || "",
            apellido: userData.last_name || "",
            telefono: userData.phone || "",
            email: userData.email || "",
            marca: userData.brand_name || "",
            urlProducto: userData.product_url || "",
            urlInstagram: userData.social_networks?.find((s: any) => s.network === "instagram")?.url || "",
            urlFacebook: userData.social_networks?.find((s: any) => s.network === "facebook")?.url || "",
            urlTwitter: userData.social_networks?.find((s: any) => s.network === "twitter")?.url || ""
          });
          if (userData.profile_picture) {
            setProfileImage(userData.profile_picture);
          }

          // Fetch subscription data (mock data for now)
          try {
            // En una app real, esto vendría de la API
            setSubscription({
              plan: {
                id: 2,
                name: "Pro Mensual",
                price: 12000,
                interval: "month"
              },
              status: "active",
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            });
          } catch (error) {
            console.log("No hay suscripción activa");
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del perfil",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [toast]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
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
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      // Transform our form data to match backend expectations
      const userData = {
        first_name: userProfile.nombre,
        last_name: userProfile.apellido,
        email: userProfile.email,
        phone: userProfile.telefono,
        brand_name: userProfile.marca,
        product_url: userProfile.urlProducto,
        profile_picture: profileImage
      };

      // Update user profile
      await userService.updateUserProfile(userProfile.id, userData);

      // Handle social networks separately
      // This is simplified - in a real app you would check if they exist and update or create as needed
      const socialNetworks = [{
        network: "instagram",
        url: userProfile.urlInstagram
      }, {
        network: "facebook",
        url: userProfile.urlFacebook
      }, {
        network: "twitter",
        url: userProfile.urlTwitter
      }].filter(sn => sn.url); // Only include networks with URLs

      // Update or create each social network
      for (const sn of socialNetworks) {
        await userService.addSocialNetwork(sn);
      }
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente"
      });
    } catch (error) {
      console.error("Error saving profile:", error);
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
  const handleManageSubscription = () => {
    navigate('/subscriptions');
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-pink">Tu Perfil</h2>
        <Button onClick={handleSaveProfile} disabled={isSaving} className="text-contala-green bg-contala-brown">
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      {/* Subscription Card */}
      <Card className="bg-transparent border border-contala-green/10 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-contala-pink">Tu Suscripción</CardTitle>
            <CardDescription>Detalles de tu plan actual</CardDescription>
          </div>
          <CreditCard className="h-6 w-6 text-contala-green opacity-70" />
        </CardHeader>
        <CardContent>
          {subscription ? <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{subscription.plan.name}</p>
                  <p className="text-sm text-gray-600">
                    {subscription.status === "active" ? `Activa hasta ${new Date(subscription.current_period_end).toLocaleDateString('es-ES')}` : "Inactiva"}
                  </p>
                </div>
                <div className="bg-contala-green/10 px-4 py-2 rounded-full">
                  <p className="font-medium text-contala-green">
                    ${subscription.plan.price.toLocaleString()} / {subscription.plan.interval === "month" ? "mes" : "año"}
                  </p>
                </div>
              </div>
            </div> : <div className="text-center py-4">
              <p className="text-gray-600 mb-2">No tienes una suscripción activa</p>
            </div>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleManageSubscription} className="w-full bg-contala-brown">
            {subscription ? "Administrar suscripción" : "Ver planes disponibles"}
          </Button>
        </CardFooter>
      </Card>

      {/* Personal Information Card */}
      <Card className="bg-transparent border border-contala-green/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-contala-pink">Información Personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
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
              <Label htmlFor="nombre" className="text-contala-pink">Nombre</Label>
              <Input id="nombre" name="nombre" value={userProfile.nombre} onChange={handleInputChange} placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-contala-green">Apellido</Label>
              <Input id="apellido" name="apellido" value={userProfile.apellido} onChange={handleInputChange} placeholder="Tu apellido" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-contala-green">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="telefono" name="telefono" value={userProfile.telefono} onChange={handleInputChange} className="pl-8" placeholder="+54 11 1234 5678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-contala-green">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="email" name="email" value={userProfile.email} onChange={handleInputChange} className="pl-8" placeholder="tu@email.com" type="email" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Information Card */}
      <Card className="bg-transparent border border-contala-green/10 shadow-sm">
        <CardHeader>
          <CardTitle className="text-contala-green">Información de Marca</CardTitle>
          <CardDescription>Completa los datos de tu marca o producto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="marca" className="text-contala-green">Nombre de la Marca o Producto</Label>
            <Input id="marca" name="marca" value={userProfile.marca} onChange={handleInputChange} placeholder="Tu marca" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urlProducto" className="text-contala-green">URL del Producto</Label>
            <div className="relative">
              <Link className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input id="urlProducto" name="urlProducto" value={userProfile.urlProducto} onChange={handleInputChange} className="pl-8" placeholder="https://tuproducto.com" />
            </div>
          </div>

          <Separator />
          
          <div className="space-y-2">
            <Label className="text-contala-green">Redes Sociales</Label>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">IG</div>
                <Input id="urlInstagram" name="urlInstagram" value={userProfile.urlInstagram} onChange={handleInputChange} className="pl-8" placeholder="https://instagram.com/tumarca" />
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">FB</div>
                <Input id="urlFacebook" name="urlFacebook" value={userProfile.urlFacebook} onChange={handleInputChange} className="pl-8" placeholder="https://facebook.com/tumarca" />
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2.5 text-gray-500 font-medium">X</div>
                <Input id="urlTwitter" name="urlTwitter" value={userProfile.urlTwitter} onChange={handleInputChange} className="pl-8" placeholder="https://x.com/tumarca" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}