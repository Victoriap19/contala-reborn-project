
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, UserPlus, Mail, Facebook } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";

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
  const [searchParams] = useSearchParams();
  const { userType, setUserType } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Check if registering as a creador or if a plan was selected
  useEffect(() => {
    const type = searchParams.get("type");
    const plan = searchParams.get("plan");
    const email = searchParams.get("email") || sessionStorage.getItem("userEmail") || "";
    
    if (type === "creador") {
      setUserType("creador");
    } else if (type === "marca") {
      setUserType("marca");
    }
    
    if (plan) {
      setSelectedPlan(plan);
    }
    
    // Pre-fill the email from URL params or session storage
    if (email) {
      form.setValue("email", email);
    }
    
    // If no plan is selected and user is not a creador, redirect to subscriptions
    if (!plan && type !== "creador" && userType !== "creador") {
      navigate("/subscriptions");
    }

    // Clean up session storage
    return () => {
      sessionStorage.removeItem("userEmail");
    };
  }, [searchParams, navigate, userType, setUserType]);
  
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
    console.log("Register submitted:", values, "Is Creador:", userType === "creador", "Selected Plan:", selectedPlan);
    
    // Save auth token to simulate login
    localStorage.setItem("token", "fake-jwt-token");
    
    toast({
      title: userType === "creador" ? "Registro de creador exitoso" : "Registro exitoso",
      description: "¡Bienvenido a Contala!",
    });
    
    // Redirect to appropriate dashboard after registration
    if (userType === "creador") {
      navigate('/creador-dashboard');
    } else {
      navigate('/marca-dashboard');
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Register with ${provider}`, "Is Creador:", userType === "creador", "Selected Plan:", selectedPlan);
    
    toast({
      title: userType === "creador" ? `Registrando como creador con ${provider}` : `Registrando con ${provider}`,
      description: "Redirigiendo...",
    });
    
    // Save auth token to simulate login
    localStorage.setItem("token", "fake-jwt-token");
    
    // In a real implementation, this would redirect to the provider's OAuth flow
    // For now, we'll just simulate a successful registration
    setTimeout(() => {
      toast({
        title: userType === "creador" ? "Registro de creador exitoso" : "Registro exitoso",
        description: "¡Bienvenido a Contala!",
      });
      
      // Redirect to appropriate dashboard after registration
      if (userType === "creador") {
        navigate('/creador-dashboard');
      } else {
        navigate('/marca-dashboard');
      }
    }, 1500);
  };

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
            {userType === "creador" ? "Registro de Creador" : "Crear cuenta de Marca"}
          </h1>
          
          {selectedPlan && userType !== "creador" && (
            <div className="bg-contala-pink/20 p-3 rounded-lg mb-6">
              <p className="text-contala-cream text-sm text-center">
                Plan seleccionado: <span className="font-bold">{selectedPlan === "1" ? "Free" : selectedPlan === "2" ? "Pro Mensual" : "Pro Anual"}</span>
              </p>
            </div>
          )}
          
          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-3 mb-6">
            <Button 
              type="button" 
              variant="outline" 
              className="bg-white text-contala-green border-none hover:bg-gray-100 flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin("Google")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continuar con Google
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="bg-[#1877F2] text-white border-none hover:bg-[#1877F2]/90 flex items-center justify-center gap-2"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <Facebook size={24} />
              Continuar con Facebook
            </Button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <Separator className="flex-grow bg-contala-cream/30" />
            <span className="px-3 text-sm text-contala-cream">o</span>
            <Separator className="flex-grow bg-contala-cream/30" />
          </div>
          
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
                          disabled={!!searchParams.get("email") || !!sessionStorage.getItem("userEmail")}
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
              
              {userType === "creador" && (
                <div className="p-3 bg-contala-green/80 rounded-lg border border-contala-cream/20">
                  <p className="text-contala-cream text-sm mb-2">
                    Al registrarte como creador, aceptas nuestros términos específicos para creadores y
                    entiendes que tu perfil estará disponible para posibles trabajos.
                  </p>
                </div>
              )}
              
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
                {userType === "creador" ? "Registrarme como Creador" : "Registrarme como Marca"}
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
