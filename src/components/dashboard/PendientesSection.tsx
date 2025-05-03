
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Check, X, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Proyecto = {
  id: string;
  titulo: string;
  descripcion: string;
  marca: string;
  fecha: string;
  presupuesto: string;
  status: 'pendiente' | 'aceptado' | 'rechazado';
};

export function PendientesSection() {
  const { toast } = useToast();
  const [comentario, setComentario] = useState("");
  const [proyectoActivo, setProyectoActivo] = useState<string | null>(null);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  
  // Datos de ejemplo
  const [proyectos, setProyectos] = useState<Proyecto[]>([
    {
      id: '1',
      titulo: 'Campaña de verano',
      descripcion: 'Necesitamos 3 reels mostrando nuestros nuevos productos de la línea veraniega.',
      marca: 'SummerVibes',
      fecha: '15/06/2023',
      presupuesto: '$25.000',
      status: 'pendiente'
    },
    {
      id: '2',
      titulo: 'Promoción evento',
      descripcion: 'Buscamos creador para promocionar nuestro próximo evento en CABA.',
      marca: 'EventosNow',
      fecha: '22/06/2023',
      presupuesto: '$15.000',
      status: 'pendiente'
    }
  ]);
  
  const handleAceptar = (id: string) => {
    setProyectoActivo(id);
    setMostrarComentario(true);
  };
  
  const handleRechazar = (id: string) => {
    setProyectos(prev => prev.map(p => 
      p.id === id ? {...p, status: 'rechazado' as const} : p
    ));
    
    toast({
      title: "Proyecto rechazado",
      description: "Has rechazado la propuesta"
    });
  };
  
  const handleEnviarComentario = () => {
    if (proyectoActivo) {
      setProyectos(prev => prev.map(p => 
        p.id === proyectoActivo ? {...p, status: 'aceptado' as const} : p
      ));
      
      toast({
        title: "Proyecto aceptado",
        description: "Has aceptado la propuesta y tu comentario ha sido enviado"
      });
      
      setMostrarComentario(false);
      setComentario("");
      setProyectoActivo(null);
    }
  };

  const proyectosPendientes = proyectos.filter(p => p.status === 'pendiente');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-contala-green">Pendientes de Aprobación</h2>
      
      {proyectosPendientes.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardHeader className="flex flex-row items-center justify-center p-6">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-contala-green mb-2" />
              <CardTitle className="text-contala-green">Sin proyectos pendientes</CardTitle>
              <CardDescription>
                Aquí apareceran los proyectos que requieren tu aprobación
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <>
          {proyectosPendientes.map((proyecto) => (
            <Card key={proyecto.id} className={mostrarComentario && proyectoActivo === proyecto.id ? "border-contala-pink" : ""}>
              <CardHeader>
                <CardTitle className="text-contala-green flex justify-between">
                  <span>{proyecto.titulo}</span>
                  <span className="text-sm font-normal text-gray-500">{proyecto.fecha}</span>
                </CardTitle>
                <CardDescription>{proyecto.marca} | Presupuesto: {proyecto.presupuesto}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{proyecto.descripcion}</p>
                
                {mostrarComentario && proyectoActivo === proyecto.id ? (
                  <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded-md">
                    <div className="space-y-2">
                      <label htmlFor="comentario" className="block text-sm font-medium text-contala-green">
                        <MessageSquare className="inline-block mr-1 h-4 w-4" />
                        Deja un comentario para el cliente
                      </label>
                      <Textarea
                        id="comentario"
                        placeholder="Escribe aquí tus preguntas o aclaraciones para el cliente..."
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setMostrarComentario(false)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        className="bg-contala-green text-contala-cream"
                        onClick={handleEnviarComentario}
                        disabled={comentario.trim() === ""}
                      >
                        Confirmar y enviar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleRechazar(proyecto.id)}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Rechazar
                    </Button>
                    <Button 
                      className="bg-contala-green text-contala-cream hover:bg-contala-green/90"
                      onClick={() => handleAceptar(proyecto.id)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Aceptar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
