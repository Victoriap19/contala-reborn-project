
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
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

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Por favor ingresa tu nombre de usuario.",
  }),
  password: z.string().min(1, {
    message: "Por favor ingresa tu contraseña.",
  }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would normally connect to your Django backend
    console.log("Login submitted:", values);
    // navigate("/"); // Uncomment to redirect after login
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
            Iniciar sesión
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-contala-pink text-sm">Usuario</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre de usuario"
                        className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none"
                        autoFocus
                      />
                    </FormControl>
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
              
              <Button 
                type="submit" 
                className="w-full bg-contala-pink hover:bg-white text-contala-green font-bold py-3 rounded-lg transition-colors mt-2"
              >
                Entrar
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <Link to="/register" className="text-contala-pink hover:text-white hover:underline transition-colors">
              ¿No tenés cuenta? Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
