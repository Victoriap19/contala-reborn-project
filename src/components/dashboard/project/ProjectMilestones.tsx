
import { Check, Clock } from "lucide-react";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectMilestonesProps {
  project: Project;
}

export function ProjectMilestones({ project }: ProjectMilestonesProps) {
  // Mock project milestones
  const milestones = [
    { title: "Propuesta enviada", date: project.date, completed: true },
    { title: "Propuesta aceptada", date: "15/04/2025", completed: project.status === "accepted" || project.status === "completed" },
    { title: "Pago realizado", date: "16/04/2025", completed: project.status === "completed" },
    { title: "Proyecto completado", date: "28/04/2025", completed: project.status === "completed" },
  ];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Progreso del proyecto</h3>
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3"
          >
            <div className={`flex items-center justify-center h-6 w-6 rounded-full mt-0.5 ${
              milestone.completed ? "bg-contala-green text-white" : "bg-gray-200"
            }`}>
              {milestone.completed ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{milestone.title}</p>
                <span className="text-sm text-gray-500">{milestone.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
