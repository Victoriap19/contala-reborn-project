
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { shipmentService } from "@/services/api";
import { Package, Truck, Loader2 } from "lucide-react";

interface ShipmentFormProps {
  projectId: string;
  onComplete: (shipmentData: any) => void;
  onCancel: () => void;
}

export function ShipmentForm({ projectId, onComplete, onCancel }: ShipmentFormProps) {
  // Form states
  const [step, setStep] = useState<'address' | 'dimensions' | 'review'>('address');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [shippingQuote, setShippingQuote] = useState<{price: number, estimated_days: number} | null>(null);
  
  // Shipment data
  const [shipmentData, setShipmentData] = useState({
    origin_address: {
      street: "",
      number: "",
      city: "",
      state: "",
      postal_code: "",
      phone: "",
    },
    destination_address: {
      street: "",
      number: "",
      city: "",
      state: "",
      postal_code: "",
      phone: "",
    },
    weight: 1,
    dimensions: {
      width: 20,
      height: 15,
      length: 30,
    },
    return_required: false,
    description: "",
  });
  
  // Handle input changes
  const handleInputChange = (section: 'origin_address' | 'destination_address' | 'dimensions' | '', field: string, value: any) => {
    if (section) {
      setShipmentData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setShipmentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  // Calculate shipping quote
  const calculateShipping = async () => {
    try {
      setIsCalculating(true);
      const response = await shipmentService.getShippingQuote({
        origin_postal_code: shipmentData.origin_address.postal_code,
        destination_postal_code: shipmentData.destination_address.postal_code,
        weight: shipmentData.weight,
        width: shipmentData.dimensions.width,
        height: shipmentData.dimensions.height,
        length: shipmentData.dimensions.length,
        return_required: shipmentData.return_required
      });
      setShippingQuote(response.data);
      setStep('review');
    } catch (error) {
      toast.error("Error al calcular el envío. Por favor verifica los datos ingresados.");
      console.error("Shipping quote error:", error);
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Create shipping label
  const createShippingLabel = async () => {
    try {
      setIsCreatingLabel(true);
      const response = await shipmentService.createShippingLabel(
        parseInt(projectId),
        shipmentData
      );
      toast.success("¡Etiqueta de envío creada correctamente!");
      onComplete(response.data);
    } catch (error) {
      toast.error("Error al crear la etiqueta. Por favor intenta nuevamente.");
      console.error("Shipping label error:", error);
    } finally {
      setIsCreatingLabel(false);
    }
  };
  
  // Render form based on current step
  const renderForm = () => {
    switch(step) {
      case 'address':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Dirección de Origen</h3>
              <p className="text-sm text-gray-500 mb-4">Ingresa la dirección desde donde se enviará el producto</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin-street">Calle</Label>
                  <Input 
                    id="origin-street" 
                    value={shipmentData.origin_address.street}
                    onChange={(e) => handleInputChange('origin_address', 'street', e.target.value)}
                    placeholder="Av. Corrientes"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-number">Número</Label>
                  <Input 
                    id="origin-number" 
                    value={shipmentData.origin_address.number}
                    onChange={(e) => handleInputChange('origin_address', 'number', e.target.value)}
                    placeholder="1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-city">Ciudad</Label>
                  <Input 
                    id="origin-city" 
                    value={shipmentData.origin_address.city}
                    onChange={(e) => handleInputChange('origin_address', 'city', e.target.value)}
                    placeholder="Buenos Aires"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-state">Provincia</Label>
                  <Input 
                    id="origin-state" 
                    value={shipmentData.origin_address.state}
                    onChange={(e) => handleInputChange('origin_address', 'state', e.target.value)}
                    placeholder="CABA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-postal">Código Postal</Label>
                  <Input 
                    id="origin-postal" 
                    value={shipmentData.origin_address.postal_code}
                    onChange={(e) => handleInputChange('origin_address', 'postal_code', e.target.value)}
                    placeholder="C1043"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin-phone">Teléfono</Label>
                  <Input 
                    id="origin-phone" 
                    value={shipmentData.origin_address.phone}
                    onChange={(e) => handleInputChange('origin_address', 'phone', e.target.value)}
                    placeholder="+5491123456789"
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-bold">Dirección de Destino</h3>
              <p className="text-sm text-gray-500 mb-4">Ingresa la dirección donde se entregará el producto</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dest-street">Calle</Label>
                  <Input 
                    id="dest-street" 
                    value={shipmentData.destination_address.street}
                    onChange={(e) => handleInputChange('destination_address', 'street', e.target.value)}
                    placeholder="Av. Santa Fe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-number">Número</Label>
                  <Input 
                    id="dest-number" 
                    value={shipmentData.destination_address.number}
                    onChange={(e) => handleInputChange('destination_address', 'number', e.target.value)}
                    placeholder="5678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-city">Ciudad</Label>
                  <Input 
                    id="dest-city" 
                    value={shipmentData.destination_address.city}
                    onChange={(e) => handleInputChange('destination_address', 'city', e.target.value)}
                    placeholder="Córdoba"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-state">Provincia</Label>
                  <Input 
                    id="dest-state" 
                    value={shipmentData.destination_address.state}
                    onChange={(e) => handleInputChange('destination_address', 'state', e.target.value)}
                    placeholder="Córdoba"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-postal">Código Postal</Label>
                  <Input 
                    id="dest-postal" 
                    value={shipmentData.destination_address.postal_code}
                    onChange={(e) => handleInputChange('destination_address', 'postal_code', e.target.value)}
                    placeholder="X5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest-phone">Teléfono</Label>
                  <Input 
                    id="dest-phone" 
                    value={shipmentData.destination_address.phone}
                    onChange={(e) => handleInputChange('destination_address', 'phone', e.target.value)}
                    placeholder="+5493512345678"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button onClick={() => setStep('dimensions')}>
                Siguiente
              </Button>
            </div>
          </div>
        );
        
      case 'dimensions':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Detalles del Envío</h3>
              <p className="text-sm text-gray-500 mb-4">Ingresa las dimensiones y características del paquete</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={shipmentData.weight}
                    onChange={(e) => handleInputChange('', 'weight', parseFloat(e.target.value))}
                    placeholder="1.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Ancho (cm)</Label>
                  <Input 
                    id="width" 
                    type="number"
                    min="1"
                    value={shipmentData.dimensions.width}
                    onChange={(e) => handleInputChange('dimensions', 'width', parseInt(e.target.value))}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Alto (cm)</Label>
                  <Input 
                    id="height" 
                    type="number"
                    min="1"
                    value={shipmentData.dimensions.height}
                    onChange={(e) => handleInputChange('dimensions', 'height', parseInt(e.target.value))}
                    placeholder="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Largo (cm)</Label>
                  <Input 
                    id="length" 
                    type="number"
                    min="1"
                    value={shipmentData.dimensions.length}
                    onChange={(e) => handleInputChange('dimensions', 'length', parseInt(e.target.value))}
                    placeholder="30"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="description">Descripción del contenido</Label>
                <Textarea 
                  id="description" 
                  value={shipmentData.description}
                  onChange={(e) => handleInputChange('', 'description', e.target.value)}
                  placeholder="Detalla el contenido del paquete"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="return-required" 
                  checked={shipmentData.return_required}
                  onCheckedChange={(checked) => handleInputChange('', 'return_required', checked === true)}
                />
                <Label htmlFor="return-required" className="text-sm font-medium">
                  Este envío requiere devolución
                </Label>
              </div>
              
              {shipmentData.return_required && (
                <Alert className="mt-4 bg-amber-50">
                  <AlertDescription>
                    Se generará automáticamente una etiqueta de devolución que el creador podrá utilizar cuando
                    finalice el proyecto.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('address')}>
                Atrás
              </Button>
              <Button 
                onClick={calculateShipping} 
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    Calcular envío
                  </>
                )}
              </Button>
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Resumen del Envío</h3>
              <p className="text-sm text-gray-500 mb-4">Revisa los detalles antes de confirmar</p>
              
              <div className="bg-contala-cream/30 p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Desde:</p>
                    <p className="text-sm">
                      {shipmentData.origin_address.street} {shipmentData.origin_address.number}
                    </p>
                    <p className="text-sm">
                      {shipmentData.origin_address.city}, {shipmentData.origin_address.state}
                    </p>
                    <p className="text-sm">CP: {shipmentData.origin_address.postal_code}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hacia:</p>
                    <p className="text-sm">
                      {shipmentData.destination_address.street} {shipmentData.destination_address.number}
                    </p>
                    <p className="text-sm">
                      {shipmentData.destination_address.city}, {shipmentData.destination_address.state}
                    </p>
                    <p className="text-sm">CP: {shipmentData.destination_address.postal_code}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium">Detalles del paquete:</p>
                  <p className="text-sm">Peso: {shipmentData.weight} kg</p>
                  <p className="text-sm">
                    Dimensiones: {shipmentData.dimensions.width}x{shipmentData.dimensions.height}x{shipmentData.dimensions.length} cm
                  </p>
                  <p className="text-sm">Descripción: {shipmentData.description}</p>
                  <p className="text-sm">Requiere devolución: {shipmentData.return_required ? 'Sí' : 'No'}</p>
                </div>
                
                <Separator />
                
                {shippingQuote && (
                  <div>
                    <p className="text-sm font-medium">Cotización:</p>
                    <p className="text-lg font-bold text-contala-darkpink">
                      ${shippingQuote.price.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Tiempo estimado de entrega: {shippingQuote.estimated_days} días hábiles
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('dimensions')}>
                Atrás
              </Button>
              <Button 
                className="bg-contala-darkpink hover:bg-contala-darkpink/90"
                onClick={createShippingLabel}
                disabled={isCreatingLabel}
              >
                {isCreatingLabel ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Generar Etiqueta
                  </>
                )}
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-contala-green" />
        <h2 className="text-xl font-bold">Configuración de Envío</h2>
      </div>
      
      <div className="flex mb-6 border-b">
        <div className={`pb-2 px-4 ${step === 'address' ? 'border-b-2 border-contala-green font-medium' : ''}`}>
          1. Direcciones
        </div>
        <div className={`pb-2 px-4 ${step === 'dimensions' ? 'border-b-2 border-contala-green font-medium' : ''}`}>
          2. Detalles
        </div>
        <div className={`pb-2 px-4 ${step === 'review' ? 'border-b-2 border-contala-green font-medium' : ''}`}>
          3. Resumen
        </div>
      </div>
      
      {renderForm()}
    </div>
  );
}
