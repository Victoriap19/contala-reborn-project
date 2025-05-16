
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File } from "lucide-react";

interface ProjectDeliverablesProps {
  projectStatus: "draft" | "sent" | "accepted" | "rejected" | "completed";
}

export function ProjectDeliverables({ projectStatus }: ProjectDeliverablesProps) {
  // Only show deliverables for completed projects
  if (projectStatus !== "completed") {
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
      <h3 className="text-lg font-bold">Archivos entregados</h3>
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
    </div>
  );
}
