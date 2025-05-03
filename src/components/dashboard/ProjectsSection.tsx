
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function ProjectsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-contala-green">Tus Proyectos</h2>

      <Card className="border-dashed border-2">
        <CardHeader className="flex flex-row items-center justify-center p-6">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-contala-green mb-2" />
            <CardTitle className="text-contala-green">Sin proyectos aún</CardTitle>
            <CardDescription>
              Aquí aparecerán tus proyectos con creadores de contenido
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
