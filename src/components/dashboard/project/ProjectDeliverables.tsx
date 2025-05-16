
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File, Package } from "lucide-react";

interface ProjectDeliverablesProps {
  projectStatus: "draft" | "sent" | "accepted" | "rejected" | "completed";
  shipmentInfo?: {
    trackingNumber?: string;
    carrier?: string;
    status?: "pending" | "shipped" | "delivered" | "confirmed";
  };
}

export function ProjectDeliverables({ projectStatus, shipmentInfo }: ProjectDeliverablesProps) {
  // Only show deliverables for completed projects or projects with shipping info
  if (projectStatus !== "completed" && !shipmentInfo) {
    return null;
  }
  
  // Mock project deliverables
  const projectDeliverables = [
    { name: "Propuesta_Final.pdf", type: "file", url: "#" },
    { name: "Contenido_Campana.zip", type: "zip", url: "#" },
    { name: "Muestras.jpg", type: "image", url: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=500" },
  ];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">
        {projectStatus === "completed" ? "Archivos entregados" : "Información de envío"}
      </h3>
      
      {shipmentInfo && (
        <Card className="p-4 border-contala-green/10 mb-4 bg-contala-cream/30">
          <div className="flex items-center gap-2 mb-3">
            <Package className="text-contala-green h-5 w-5" />
            <h4 className="font-medium">Detalles del envío</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-gray-500">Servicio de envío</p>
              <p className="font-medium">{shipmentInfo.carrier || "No especificado"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Número de tracking</p>
              <p className="font-medium">{shipmentInfo.trackingNumber || "No especificado"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Estado</p>
              <p className="font-medium">
                {shipmentInfo.status === "shipped" && "En tránsito"}
                {shipmentInfo.status === "delivered" && "Entregado (pendiente de confirmación)"}
                {shipmentInfo.status === "confirmed" && "Recibido por el creador"}
                {shipmentInfo.status === "pending" && "Pendiente de envío"}
              </p>
            </div>
            {(shipmentInfo.trackingNumber && shipmentInfo.carrier) && (
              <div className="sm:col-span-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-contala-green border-contala-green/50 hover:bg-contala-green/10"
                  onClick={() => window.open(`https://www.google.com/search?q=${shipmentInfo.carrier}+tracking+${shipmentInfo.trackingNumber}`, '_blank')}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Seguir paquete online
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
      
      {projectStatus === "completed" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {projectDeliverables.map((file, index) => (
            <Card key={index} className="p-3 flex items-center gap-3 bg-transparent border-contala-green/10">
              {file.type === "image" ? (
                <img 
                  src={file.url} 
                  alt={file.name} 
                  className="h-10 w-10 object-cover rounded"
                />
              ) : (
                <div className="h-10 w-10 bg-contala-green/10 rounded flex items-center justify-center">
                  <File className="h-5 w-5 text-contala-green" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.type}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Download className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
