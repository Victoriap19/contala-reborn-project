
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Check, X, MessageSquare, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

type Proyecto = {
  id: string;
  titulo: string;
  descripcion: string;
  marca: string;
  fecha: string;
  presupuesto: string;
  status: 'pendiente' | 'aceptado' | 'rechazado';
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function PendientesSection() {
  const { toast } = useToast();
  const [comentario, setComentario] = useState("");
  const [proyectoActivo, setProyectoActivo] = useState<string | null>(null);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [ocultarRechazados, setOcultarRechazados] = useState(false);
  
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
    },
    {
      id: '3',
      titulo: 'Fotografía catálogo',
      descripcion: 'Fotografía para catálogo de productos de otoño.',
      marca: 'ModaFashion',
      fecha: '10/06/2023',
      presupuesto: '$30.000',
      status: 'rechazado'
    },
    {
      id: '4',
      titulo: 'Video tutorial',
      descripcion: 'Video tutorial mostrando uso de nuestra app.',
      marca: 'TechCorp',
      fecha: '05/06/2023',
      presupuesto: '$20.000',
      status: 'rechazado'
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

  // Filtramos los proyectos según el estado del filtro
  const proyectosMostrados = proyectos.filter(p => 
    p.status === 'pendiente' || (p.status === 'rechazado' && !ocultarRechazados)
  );

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#B771E5]">Pendientes de Aprobación</h2>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="ocultar-rechazados" 
            checked={ocultarRechazados} 
            onCheckedChange={setOcultarRechazados} 
          />
          <label htmlFor="ocultar-rechazados" className="text-sm flex items-center cursor-pointer">
            <Filter className="h-3.5 w-3.5 mr-1 text-[#B771E5]" />
            Ocultar rechazados
          </label>
        </div>
      </div>
      
      {proyectosMostrados.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="border-dashed border-2 border-[#B771E5]/20">
            <CardHeader className="flex flex-row items-center justify-center p-6">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-[#B771E5] mb-2" />
                <CardTitle className="text-[#B771E5]">Sin proyectos pendientes</CardTitle>
                <CardDescription>
                  Aquí aparecerán los proyectos que requieren tu aprobación
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ) : (
        <>
          {proyectosMostrados.map((proyecto) => (
            <motion.div key={proyecto.id} variants={itemVariants}>
              <Card 
                className={`${mostrarComentario && proyectoActivo === proyecto.id ? "border-[#B771E5] shadow-lg" : ""} 
                  ${proyecto.status === 'rechazado' ? "border-red-200 bg-red-50/30" : ""}
                  hover:shadow-md transition-shadow duration-300
                `}
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-[#4635B1] flex gap-2 items-center">
                      <span>{proyecto.titulo}</span>
                      {proyecto.status === 'rechazado' && (
                        <span className="text-xs text-red-500 font-normal bg-red-100 px-2 py-0.5 rounded-full">
                          Rechazado
                        </span>
                      )}
                    </CardTitle>
                    <span className="text-sm font-normal text-gray-500">{proyecto.fecha}</span>
                  </div>
                  <CardDescription>{proyecto.marca} | Presupuesto: {proyecto.presupuesto}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{proyecto.descripcion}</p>
                  
                  {mostrarComentario && proyectoActivo === proyecto.id ? (
                    <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded-md">
                      <div className="space-y-2">
                        <label htmlFor="comentario" className="block text-sm font-medium text-[#B771E5]">
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
                          className="bg-[#B771E5] text-white hover:bg-[#B771E5]/80"
                          onClick={handleEnviarComentario}
                          disabled={comentario.trim() === ""}
                        >
                          Confirmar y enviar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      {proyecto.status === 'pendiente' && (
                        <>
                          <Button 
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleRechazar(proyecto.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Rechazar
                          </Button>
                          <Button 
                            className="bg-[#B771E5] text-white hover:bg-[#B771E5]/90"
                            onClick={() => handleAceptar(proyecto.id)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Aceptar
                          </Button>
                        </>
                      )}
                      {proyecto.status === 'rechazado' && (
                        <Button 
                          variant="outline" 
                          className="border-[#B771E5] text-[#B771E5]"
                          onClick={() => handleAceptar(proyecto.id)}
                        >
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Reconsiderar
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
}
