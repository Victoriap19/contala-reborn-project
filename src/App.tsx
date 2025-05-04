
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/proyectos" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/creadores" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/convocatorias" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/pendientes" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/generales" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="/dashboard/descubrir" element={
            <TooltipProvider>
              <Dashboard />
            </TooltipProvider>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
