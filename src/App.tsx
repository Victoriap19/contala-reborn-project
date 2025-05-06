
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserProvider } from "./context/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Subscriptions from "./pages/Subscriptions";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <BrowserRouter>
            <UserProvider>
              <Toaster />
              <Sonner />
              <TooltipProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/proyectos" element={<Dashboard />} />
                  <Route path="/dashboard/creadores" element={<Dashboard />} />
                  <Route path="/dashboard/convocatorias" element={<Dashboard />} />
                  <Route path="/dashboard/pendientes" element={<Dashboard />} />
                  <Route path="/dashboard/generales" element={<Dashboard />} />
                  <Route path="/dashboard/descubrir" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </UserProvider>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
