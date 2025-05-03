
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Search, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Convocatoria = {
  id: string;
  titulo: string;
  descripcion: string;
  marca: string;
  ubicacion: string;
  tipoContenido: string;
  genero: string;
  edadMin: number;
  edadMax: number;
};

export function GeneralesSection() {
  const { toast } = useToast();
  const [filtros, setFiltros] = useState({
    ubicacion: "",
    tipoContenido: "",
    genero: "",
  });
  
  // Datos de ejemplo
  const [convocatorias] = useState<Convocatoria[]>([
    {
      id: '1',
      titulo: 'Influencer para producto de belleza',
      descripcion: 'Buscamos influencer para promocionar nuestra línea de productos de belleza natural.',
      marca: 'NaturalBeauty',
      ubicacion: 'Buenos Aires',
      tipoContenido: 'Reels',
      genero: 'Femenino',
      edadMin: 18,
      edadMax: 35
    },
    {
      id: '2',
      titulo: 'Creator para evento deportivo',
      descripcion: 'Necesitamos creator para cubrir evento deportivo y generar contenido dinámico.',
      marca: 'SportEvent',
      ubicacion: 'Córdoba',
      tipoContenido: 'Stories',
      genero: 'Masculino',
      edadMin: 20,
      edadMax: 40
    },
    {
      id: '3',
      titulo: 'Videojuegos - Review de producto',
      descripcion: 'Buscamos gamer para hacer review de nuestro nuevo juego.',
      marca: 'GameDevStudios',
      ubicacion: 'Remoto',
      tipoContenido: 'YouTube',
      genero: 'Todos',
      edadMin: 18,
      edadMax: 45
    }
  ]);
  
  const handleFiltroChange = (key: keyof typeof filtros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };
  
  const convocatoriasFiltradas = convocatorias.filter(c => {
    if (filtros.ubicacion && c.ubicacion !== filtros.ubicacion && filtros.ubicacion !== "Todos") return false;
    if (filtros.tipoContenido && c.tipoContenido !== filtros.tipoContenido && filtros.tipoContenido !== "Todos") return false;
    if (filtros.genero && c.genero !== filtros.genero && filtros.genero !== "Todos") return false;
    return true;
  });
  
  const handleAplicar = (id: string) => {
    toast({
      title: "¡Aplicación enviada!",
      description: "Has aplicado correctamente a la convocatoria"
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-contala-green">Convocatorias Generales</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-contala-green text-lg">Filtrar Convocatorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <Select 
                value={filtros.ubicacion} 
                onValueChange={(value) => handleFiltroChange('ubicacion', value)}
              >
                <SelectTrigger id="ubicacion">
                  <SelectValue placeholder="Todas las ubicaciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todas las ubicaciones</SelectItem>
                  <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                  <SelectItem value="Córdoba">Córdoba</SelectItem>
                  <SelectItem value="Rosario">Rosario</SelectItem>
                  <SelectItem value="Mendoza">Mendoza</SelectItem>
                  <SelectItem value="Remoto">Remoto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipoContenido">Tipo de Contenido</Label>
              <Select 
                value={filtros.tipoContenido} 
                onValueChange={(value) => handleFiltroChange('tipoContenido', value)}
              >
                <SelectTrigger id="tipoContenido">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos los tipos</SelectItem>
                  <SelectItem value="Reels">Reels</SelectItem>
                  <SelectItem value="Stories">Stories</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Fotos">Fotos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genero">Género</Label>
              <Select 
                value={filtros.genero} 
                onValueChange={(value) => handleFiltroChange('genero', value)}
              >
                <SelectTrigger id="genero">
                  <SelectValue placeholder="Todos los géneros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos los géneros</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="No binario">No binario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {convocatoriasFiltradas.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <Search className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">No hay convocatorias</CardTitle>
              <CardDescription>
                No se encontraron convocatorias con los filtros seleccionados
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {convocatoriasFiltradas.map((convocatoria) => (
            <Card key={convocatoria.id}>
              <CardHeader>
                <CardTitle className="text-contala-green">{convocatoria.titulo}</CardTitle>
                <CardDescription>{convocatoria.marca}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{convocatoria.descripcion}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Ubicación:</span> {convocatoria.ubicacion}
                  </div>
                  <div>
                    <span className="font-medium">Contenido:</span> {convocatoria.tipoContenido}
                  </div>
                  <div>
                    <span className="font-medium">Género:</span> {convocatoria.genero}
                  </div>
                  <div>
                    <span className="font-medium">Edad:</span> {convocatoria.edadMin}-{convocatoria.edadMax} años
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-contala-green text-contala-cream hover:bg-contala-green/90"
                  onClick={() => handleAplicar(convocatoria.id)}
                >
                  <User className="mr-1 h-4 w-4" />
                  Aplicar a esta convocatoria
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
