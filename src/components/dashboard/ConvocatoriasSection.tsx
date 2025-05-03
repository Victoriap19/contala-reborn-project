import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Filter, PlusCircle } from "lucide-react";

type Convocatoria = {
  id: string;
  titulo: string;
  descripcion: string;
  genero: string;
  edadMin: number;
  edadMax: number;
  ubicacion: string;
  tipoContenido: string;
  fechaCreacion: Date;
};

export function ConvocatoriasSection() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([
    {
      id: "1",
      titulo: "Marca de accesorios deportivos",
      descripcion: "Buscamos creadores para promocionar nuestra nueva línea de accesorios deportivos. Necesitamos contenido en exterior realizando actividades deportivas.",
      genero: "Todos",
      edadMin: 18,
      edadMax: 35,
      ubicacion: "CABA",
      tipoContenido: "Foto y video",
      fechaCreacion: new Date(2025, 4, 1),
    },
    {
      id: "2",
      titulo: "Restaurante de comida saludable",
      descripcion: "Necesitamos creadores para mostrar la experiencia en nuestro restaurante de comida saludable. Debe incluir unboxing y degustación de nuestros platos.",
      genero: "Todos",
      edadMin: 25,
      edadMax: 45,
      ubicacion: "Palermo",
      tipoContenido: "Video",
      fechaCreacion: new Date(2025, 4, 2),
    },
  ]);
  
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    genero: "Todos",
    edadMin: 18,
    edadMax: 50,
    ubicacion: "",
    tipoContenido: "Foto y video",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newConvocatoria: Convocatoria = {
      id: Date.now().toString(),
      ...formData,
      edadMin: Number(formData.edadMin),
      edadMax: Number(formData.edadMax),
      fechaCreacion: new Date(),
    };
    
    setConvocatorias(prev => [newConvocatoria, ...prev]);
    setFormData({
      titulo: "",
      descripcion: "",
      genero: "Todos",
      edadMin: 18,
      edadMax: 50,
      ubicacion: "",
      tipoContenido: "Foto y video",
    });
    setShowForm(false);
    
    toast({
      title: "Convocatoria creada",
      description: "Tu convocatoria ha sido publicada correctamente",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-contala-green flex items-center">
          <Megaphone className="mr-2 h-5 w-5" />
          Convocatorias
        </h2>
        <Button 
          className="bg-contala-pink text-contala-green hover:bg-contala-pink/90 flex items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {showForm ? "Cancelar" : "Nueva convocatoria"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-contala-green">Crear nueva convocatoria</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título de la convocatoria</Label>
                <Input 
                  id="titulo" 
                  name="titulo" 
                  value={formData.titulo} 
                  onChange={handleInputChange} 
                  placeholder="Ej: Marca de ropa deportiva"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del proyecto</Label>
                <Textarea 
                  id="descripcion" 
                  name="descripcion" 
                  value={formData.descripcion} 
                  onChange={handleInputChange} 
                  placeholder="Describe brevemente el proyecto y qué tipo de contenido necesitas"
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genero">Género</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("genero", value)}
                    defaultValue={formData.genero}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Rango de edad</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      name="edadMin"
                      value={formData.edadMin}
                      onChange={handleInputChange}
                      min={1}
                      max={100}
                      className="w-24"
                    />
                    <span>a</span>
                    <Input 
                      type="number" 
                      name="edadMax"
                      value={formData.edadMax}
                      onChange={handleInputChange}
                      min={1}
                      max={100}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input 
                    id="ubicacion" 
                    name="ubicacion" 
                    value={formData.ubicacion} 
                    onChange={handleInputChange} 
                    placeholder="Ej: Buenos Aires, CABA"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tipoContenido">Tipo de contenido</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("tipoContenido", value)}
                    defaultValue={formData.tipoContenido}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Foto">Solo fotos</SelectItem>
                      <SelectItem value="Video">Solo videos</SelectItem>
                      <SelectItem value="Foto y video">Fotos y videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-contala-green text-contala-cream hover:bg-contala-green/90">
                  Publicar convocatoria
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
        <Filter className="h-4 w-4" />
        <span>Filtrar por:</span>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px] h-8 text-sm">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="recientes">Más recientes</SelectItem>
            <SelectItem value="ubicacion">Ubicación</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {convocatorias.map((convocatoria) => (
          <Card key={convocatoria.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-contala-green/5 pb-2">
              <CardTitle className="text-lg text-contala-green">{convocatoria.titulo}</CardTitle>
              <p className="text-xs text-gray-500">
                Publicado el {convocatoria.fechaCreacion.toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm mb-4">{convocatoria.descripcion}</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Género:</span>
                  <span className="text-gray-600">{convocatoria.genero}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Edad:</span>
                  <span className="text-gray-600">{convocatoria.edadMin} - {convocatoria.edadMax} años</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Ubicación:</span>
                  <span className="text-gray-600">{convocatoria.ubicacion}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Contenido:</span>
                  <span className="text-gray-600">{convocatoria.tipoContenido}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-contala-pink text-contala-green hover:bg-contala-pink/90 text-sm">
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
