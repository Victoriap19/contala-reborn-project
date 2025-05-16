
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShipmentManagement } from "./ShipmentManagement";
import { toast } from "sonner";
import { ProjectInformation } from "./project/ProjectInformation";
import { ProjectMilestones } from "./project/ProjectMilestones";
import { ProjectDeliverables } from "./project/ProjectDeliverables";

type Project = {
  id: string;
  title: string;
  creator: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  date: string;
  budget?: number;
  description: string;
};

interface ProjectDetailsProps {
  project: Project;
  onShowChat: () => void;
  onShowProposal: () => void;
  onModifyProposal: () => void;
}

export function ProjectDetails({ project, onShowChat, onShowProposal, onModifyProposal }: ProjectDetailsProps) {
  const [showShipmentDialog, setShowShipmentDialog] = useState<boolean>(false);
  // For demo purposes, we'll use state to manage shipment info
  // In a real app, this would come from the backend
  const [shipmentStatus, setShipmentStatus] = useState<"pending" | "shipped" | "delivered" | "confirmed" | null>(
    project.status === "completed" ? "confirmed" : project.status === "accepted" ? "pending" : null
  );
  const [trackingInfo, setTrackingInfo] = useState({
    trackingNumber: "",
    carrier: "",
    additionalInfo: ""
  });

  // Handle shipping information update (from the form)
  const handleUpdateShipment = (data: any) => {
    setTrackingInfo(data);
    setShipmentStatus("shipped");
    // In a real app, you would send this to the backend
    toast.success("Información de envío registrada correctamente");
  };

  // Handle confirmation of receipt by creator
  const handleConfirmReceipt = () => {
    setShipmentStatus("confirmed");
    // In a real app, you would send this to the backend
    toast.success("Recepción del producto confirmada");
  };

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Information */}
        <ProjectInformation 
          project={project}
          shipmentStatus={shipmentStatus}
          onShowChat={onShowChat}
          onShowProposal={onShowProposal}
          onModifyProposal={onModifyProposal}
          onShowShipment={() => setShowShipmentDialog(true)}
        />
        
        {/* Milestones */}
        <ProjectMilestones project={project} />
      </div>
      
      {/* Project Deliverables */}
      {project.status === "completed" && (
        <>
          <Separator />
          <ProjectDeliverables projectStatus={project.status} />
        </>
      )}
      
      {/* Shipment Dialog */}
      <Dialog open={showShipmentDialog} onOpenChange={setShowShipmentDialog}>
        <DialogContent className="max-w-3xl">
          <ShipmentManagement
            projectId={project.id}
            userRole="client"
            shipmentStatus={shipmentStatus}
            trackingInfo={trackingInfo}
            onUpdateShipment={handleUpdateShipment}
            onConfirmReceipt={handleConfirmReceipt}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
