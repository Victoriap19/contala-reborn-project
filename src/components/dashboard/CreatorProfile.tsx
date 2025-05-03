
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Gallery, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../ui/card";

// Define schema for the proposal form
const proposalFormSchema = z.object({
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  offer: z.coerce.number().min(1, {
    message: "La oferta debe ser un número válido mayor que cero.",
  }),
});

type ProposalFormValues = z.infer<typeof proposalFormSchema>;

interface CreatorProfileProps {
  creator: {
    id: number;
    name: string;
    image: string;
    category: string;
    followers: string;
    location: string;
    minFee?: number;
    acceptsTrade?: boolean;
    gallery?: {url: string; type: "image" | "video"}[];
    bio?: string;
    tags?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export function CreatorProfile({ creator, isOpen, onClose }: CreatorProfileProps) {
  const [isProposalFormOpen, setIsProposalFormOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      description: "",
      offer: creator.minFee || 0,
    },
  });

  const onSubmitProposal = (data: ProposalFormValues) => {
    // Validate that offer is greater than or equal to minFee if not accepting trade
    if (!creator.acceptsTrade && data.offer < (creator.minFee || 0)) {
      form.setError("offer", {
        type: "manual",
        message: `La oferta debe ser mayor o igual a ${creator.minFee}`,
      });
      return;
    }

    // Here you would send the proposal data to your backend
    console.log("Sending proposal:", data);
    
    toast({
      title: "Propuesta enviada",
      description: "Tu propuesta ha sido enviada al creador.",
      variant: "default",
    });
    
    setIsProposalFormOpen(false);
    onClose();
  };

  // Mock gallery data until we implement upload functionality
  const galleryItems = creator.gallery || [
    { url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", type: "image" },
    { url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", type: "image" },
    { url: "https://images.unsplash.com/photo-1501286353178-1ec881214838", type: "image" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-contala-green">
              <AvatarImage src={creator.image} alt={creator.name} />
              <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl text-contala-green">{creator.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {creator.location} · {creator.followers} seguidores
              </DialogDescription>
              <div className="flex gap-2 mt-2">
                {creator.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-contala-pink/20 text-contala-pink">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="secondary" className="bg-contala-green/20 text-contala-green">
                  {creator.category}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {creator.bio && (
          <div className="mt-4">
            <h3 className="font-medium text-contala-green mb-1">Sobre mí</h3>
            <p className="text-sm text-gray-600">{creator.bio}</p>
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-contala-green">Portfolio</h3>
            <div className="flex items-center gap-2">
              <Gallery className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{galleryItems.length} elementos</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {galleryItems.map((item, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={item.url} 
                  alt={`Portfolio item ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-200 pt-4">
          <div>
            <h3 className="font-medium text-contala-green">Condiciones de trabajo</h3>
            <div className="flex items-center gap-2 mt-1">
              {creator.minFee && (
                <Badge variant="outline" className="border-contala-green text-contala-green">
                  Caché Min: ${creator.minFee}
                </Badge>
              )}
              {creator.acceptsTrade && (
                <Badge variant="outline" className="border-contala-pink text-contala-pink">
                  Acepta Canje
                </Badge>
              )}
            </div>
          </div>
          <Button 
            onClick={() => setIsProposalFormOpen(true)} 
            className="bg-contala-pink text-white hover:bg-contala-pink/90"
          >
            <Send className="mr-2 h-4 w-4" /> Enviar Propuesta
          </Button>
        </div>
      </DialogContent>

      <Dialog open={isProposalFormOpen} onOpenChange={setIsProposalFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enviar Propuesta a {creator.name}</DialogTitle>
            <DialogDescription>
              Describe el tipo de contenido que buscas y haz una oferta al creador.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitProposal)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Proyecto</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe el tipo de contenido que buscas, detalles sobre tu marca, plazos, etc."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Incluye todos los detalles relevantes para el creador.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu Oferta ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={creator.minFee || 0} {...field} />
                    </FormControl>
                    <FormDescription>
                      {creator.minFee ? (
                        <>La oferta mínima es ${creator.minFee}.</>
                      ) : (
                        <>Ingresa el monto que ofreces por este proyecto.</>
                      )}
                      {creator.acceptsTrade && " Este creador también acepta canje."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsProposalFormOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-contala-pink text-white hover:bg-contala-pink/90"
                >
                  Enviar Propuesta
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
