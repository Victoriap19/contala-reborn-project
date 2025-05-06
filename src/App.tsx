
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserProvider } from "./context/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreadorDashboard from "./pages/CreadorDashboard";
import MarcaDashboard from "./pages/MarcaDashboard";
import NotFound from "./pages/NotFound";
import Subscriptions from "./pages/Subscriptions";
import AuthGuard from "./components/AuthGuard";

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
                  
                  {/* Protected routes that require authentication - MARCA Dashboard */}
                  <Route path="/marca-dashboard" element={
                    <AuthGuard userType="marca">
                      <MarcaDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/marca-dashboard/proyectos" element={
                    <AuthGuard userType="marca">
                      <MarcaDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/marca-dashboard/creadores" element={
                    <AuthGuard userType="marca">
                      <MarcaDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/marca-dashboard/convocatorias" element={
                    <AuthGuard userType="marca">
                      <MarcaDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/marca-dashboard/descubrir" element={
                    <AuthGuard userType="marca">
                      <MarcaDashboard />
                    </AuthGuard>
                  } />
                  
                  {/* Protected routes that require authentication - CREADOR Dashboard */}
                  <Route path="/creador-dashboard" element={
                    <AuthGuard userType="creador">
                      <CreadorDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/creador-dashboard/proyectos" element={
                    <AuthGuard userType="creador">
                      <CreadorDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/creador-dashboard/pendientes" element={
                    <AuthGuard userType="creador">
                      <CreadorDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/creador-dashboard/generales" element={
                    <AuthGuard userType="creador">
                      <CreadorDashboard />
                    </AuthGuard>
                  } />
                  
                  {/* Legacy redirects */}
                  <Route path="/dashboard" element={<Navigate to="/creador-dashboard" replace />} />
                  <Route path="/user-dashboard" element={<Navigate to="/marca-dashboard" replace />} />
                  <Route path="/user-dashboard/*" element={<Navigate to="/marca-dashboard" replace />} />
                  <Route path="/dashboard/*" element={<Navigate to="/creador-dashboard" replace />} />
                  
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
