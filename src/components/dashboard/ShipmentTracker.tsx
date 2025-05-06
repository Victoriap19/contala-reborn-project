
import { useEffect, useState } from "react";
import { shipmentService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  Loader2,
  Download,
  Return
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ShipmentData {
  id: number;
  project_id: number;
  status: 'pending' | 'label_created' | 'in_transit' | 'delivered' | 'return_requested' | 'returned';
  tracking_number?: string;
  label_url?: string;
  return_label_url?: string;
  estimated_delivery_date?: string;
  return_required: boolean;
  created_at: string;
  updated_at: string;
}

interface ShipmentTrackerProps {
  projectId: string;
  userRole: 'client' | 'creator';
}

export function ShipmentTracker({ projectId, userRole }: ShipmentTrackerProps) {
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { userType } = useUser();
  const isClient = userType !== "creator";
  
  // Fetch shipment data
  const fetchShipmentData = async () => {
    try {
      setLoading(true);
      const response = await shipmentService.getShipmentDetails(parseInt(projectId));
      setShipment(response.data);
    } catch (error) {
      console.error("Error fetching shipment data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Update shipment status
  const updateStatus = async (status: 'in_transit' | 'delivered') => {
    try {
      setUpdating(true);
      await shipmentService.updateShipmentStatus(parseInt(projectId), status);
      toast.success(`Estado actualizado a: ${getStatusLabel(status)}`);
      fetchShipmentData();
    } catch (error) {
      toast.error("Error al actualizar el estado del envío");
      console.error("Error updating shipment status:", error);
    } finally {
      setUpdating(false);
    }
  };
  
  // Request return
  const requestReturn = async () => {
    try {
      setUpdating(true);
      await shipmentService.requestReturn(parseInt(projectId));
      toast.success("Devolución solicitada correctamente");
      fetchShipmentData();
    } catch (error) {
      toast.error("Error al solicitar la devolución");
      console.error("Error requesting return:", error);
    } finally {
      setUpdating(false);
    }
  };
  
  // Confirm return
  const confirmReturn = async () => {
    try {
      setUpdating(true);
      await shipmentService.confirmReturn(parseInt(projectId));
      toast.success("Devolución confirmada correctamente");
      fetchShipmentData();
    } catch (error) {
      toast.error("Error al confirmar la devolución");
      console.error("Error confirming return:", error);
    } finally {
      setUpdating(false);
    }
  };
  
  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'label_created': return 'Etiqueta creada';
      case 'in_transit': return 'En tránsito';
      case 'delivered': return 'Entregado';
      case 'return_requested': return 'Devolución solicitada';
      case 'returned': return 'Devuelto';
      default: return status;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'bg-gray-500';
      case 'label_created': return 'bg-blue-500';
      case 'in_transit': return 'bg-amber-500';
      case 'delivered': return 'bg-green-500';
      case 'return_requested': return 'bg-purple-500';
      case 'returned': return 'bg-contala-darkpink';
      default: return 'bg-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5" />;
      case 'label_created': return <Package className="h-5 w-5" />;
      case 'in_transit': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle2 className="h-5 w-5" />;
      case 'return_requested': return <AlertTriangle className="h-5 w-5" />;
      case 'returned': return <Package className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };
  
  // Load shipment data on component mount
  useEffect(() => {
    fetchShipmentData();
    // Set up polling to check for updates every 60 seconds
    const interval = setInterval(fetchShipmentData, 60000);
    return () => clearInterval(interval);
  }, [projectId]);
  
  // Show loading state
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-contala-green" />
        </div>
      </Card>
    );
  }
  
  // Show "no shipment" state
  if (!shipment) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <Package className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="font-medium text-lg">Sin información de envío</h3>
          <p className="text-gray-500 text-sm">
            {isClient 
              ? "Aún no has generado la etiqueta de envío para este proyecto."
              : "El cliente aún no ha generado la etiqueta de envío para este proyecto."}
          </p>
        </div>
      </Card>
    );
  }
  
  // Show shipment tracker
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <Package className="mr-2 h-5 w-5 text-contala-green" />
              Seguimiento de Envío
            </h3>
            {shipment.tracking_number && (
              <p className="text-sm text-gray-500">
                N° Seguimiento: <span className="font-medium">{shipment.tracking_number}</span>
              </p>
            )}
          </div>
          <Badge className={`${getStatusColor(shipment.status)} text-white`}>
            {getStatusIcon(shipment.status)}
            <span className="ml-1">{getStatusLabel(shipment.status)}</span>
          </Badge>
        </div>
        
        {/* Status Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute top-5 left-5 h-[calc(100%-20px)] w-0.5 bg-gray-200"></div>
          
          {/* Status steps */}
          <div className="space-y-8">
            <TimelineStep 
              icon={<Package />} 
              title="Etiqueta Generada" 
              date={new Date(shipment.created_at).toLocaleDateString()}
              isCompleted={['label_created', 'in_transit', 'delivered', 'return_requested', 'returned'].includes(shipment.status)} 
            />
            <TimelineStep 
              icon={<Truck />} 
              title="En Tránsito" 
              date={shipment.status === 'in_transit' ? new Date().toLocaleDateString() : undefined}
              isCompleted={['in_transit', 'delivered', 'return_requested', 'returned'].includes(shipment.status)} 
            />
            <TimelineStep 
              icon={<CheckCircle2 />} 
              title="Entregado" 
              date={shipment.status === 'delivered' || shipment.status === 'return_requested' || shipment.status === 'returned' ? new Date().toLocaleDateString() : undefined}
              isCompleted={['delivered', 'return_requested', 'returned'].includes(shipment.status)} 
            />
            
            {/* Show return steps if return required or if already in process */}
            {(shipment.return_required || ['return_requested', 'returned'].includes(shipment.status)) && (
              <>
                <TimelineStep 
                  icon={<Return />} 
                  title="Devolución Solicitada" 
                  date={shipment.status === 'return_requested' || shipment.status === 'returned' ? new Date().toLocaleDateString() : undefined}
                  isCompleted={['return_requested', 'returned'].includes(shipment.status)} 
                />
                <TimelineStep 
                  icon={<Package />} 
                  title="Producto Devuelto" 
                  date={shipment.status === 'returned' ? new Date().toLocaleDateString() : undefined}
                  isCompleted={['returned'].includes(shipment.status)} 
                />
              </>
            )}
          </div>
        </div>
        
        {/* Return info alert */}
        {shipment.return_required && shipment.status !== 'return_requested' && shipment.status !== 'returned' && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription>
              {userRole === 'creator' ? 
                "Al finalizar el proyecto, deberás devolver el producto al cliente. Se generará automáticamente una etiqueta de devolución." : 
                "El creador deberá devolver el producto una vez finalizado el proyecto. La etiqueta de devolución ya está incluida."}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Action buttons based on status and user role */}
        <div className="space-y-2">
          {/* Download labels */}
          {shipment.label_url && shipment.status !== 'pending' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" onClick={() => window.open(shipment.label_url, '_blank')}>
                <Download className="mr-2 h-4 w-4" />
                Descargar etiqueta de envío
              </Button>
              
              {shipment.return_label_url && (shipment.return_required || shipment.status === 'return_requested') && (
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => window.open(shipment.return_label_url, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar etiqueta de devolución
                </Button>
              )}
            </div>
          )}
          
          {/* Status update buttons */}
          {isClient && shipment.status === 'label_created' && (
            <Button 
              className="w-full" 
              onClick={() => updateStatus('in_transit')}
              disabled={updating}
            >
              {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />}
              Confirmar Envío Realizado
            </Button>
          )}
          
          {userRole === 'creator' && shipment.status === 'in_transit' && (
            <Button 
              className="w-full" 
              onClick={() => updateStatus('delivered')}
              disabled={updating}
            >
              {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
              Confirmar Recepción
            </Button>
          )}
          
          {/* For creator - request return after delivery */}
          {userRole === 'creator' && shipment.status === 'delivered' && shipment.return_required && (
            <Button 
              className="w-full" 
              onClick={requestReturn}
              disabled={updating}
            >
              {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Return className="mr-2 h-4 w-4" />}
              Iniciar Devolución
            </Button>
          )}
          
          {/* For client - confirm return received */}
          {userRole === 'client' && shipment.status === 'return_requested' && (
            <Button 
              className="w-full" 
              onClick={confirmReturn}
              disabled={updating}
            >
              {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
              Confirmar Devolución Recibida
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Timeline step component
function TimelineStep({ 
  icon, 
  title, 
  date, 
  isCompleted 
}: { 
  icon: React.ReactNode; 
  title: string; 
  date?: string;
  isCompleted: boolean;
}) {
  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
        isCompleted 
          ? 'bg-contala-green border-contala-green text-white' 
          : 'bg-white border-gray-300 text-gray-400'
      }`}>
        {icon}
      </div>
      <div className="py-1">
        <p className={`font-medium ${isCompleted ? 'text-contala-green' : 'text-gray-500'}`}>{title}</p>
        {date && <p className="text-sm text-gray-500">{date}</p>}
      </div>
    </div>
  );
}
