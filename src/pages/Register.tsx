
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would normally connect to your Django backend
    console.log("Register submitted:", values);
    toast({
      title: "Registro exitoso",
      description: "¡Bienvenido a Contala!",
    });
    navigate('/dashboard'); // Redirect to dashboard after registration
  }

  return (
    <div className="min-h-screen bg-contala-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold text-contala-green">Contala</h2>
          </Link>
        </div>
        
        <div className="bg-contala-green rounded-3xl p-8 md:p-10 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-contala-cream mb-6 text-center">
            Crear cuenta
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-contala-pink text-sm">Usuario</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nombre de usuario"
                          className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none pl-10"
                          autoFocus
                        />
                      </FormControl>
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-contala-green w-5 h-5" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-contala-pink text-sm">Email</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="tu@email.com"
                          className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none pl-10"
                        />
                      </FormControl>
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-contala-green w-5 h-5" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-contala-pink text-sm">Contraseña</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-contala-green"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-contala-pink text-sm">Confirmar contraseña</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirmar contraseña"
                          className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-contala-green"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-contala-pink data-[state=checked]:border-contala-pink"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-contala-cream text-sm font-normal">
                        Acepto los términos y condiciones
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-contala-pink hover:bg-white text-contala-green font-bold py-3 rounded-lg transition-colors mt-6"
              >
                Registrarme
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-contala-pink hover:text-white hover:underline transition-colors">
              ¿Ya tenés cuenta? Iniciá sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
