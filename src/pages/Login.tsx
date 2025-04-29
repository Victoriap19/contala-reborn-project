
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would normally connect to your Django backend
    // For now, we're just showing the UI
    console.log("Login submitted");
    // navigate("/"); // Uncomment to redirect after login
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
            Iniciar sesión
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-contala-pink text-sm">
                Usuario
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none"
                required
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-contala-pink text-sm">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="bg-contala-cream text-contala-green placeholder:text-contala-green/50 border-none pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-contala-green"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-contala-pink hover:bg-white text-contala-green font-bold py-3 rounded-lg transition-colors"
            >
              Entrar
            </Button>
          </form>
          
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
