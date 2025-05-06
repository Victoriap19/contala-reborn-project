
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
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
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
                  
                  {/* Protected routes that require authentication */}
                  <Route path="/dashboard" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  
                  {/* User Dashboard routes */}
                  <Route path="/user-dashboard" element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/user-dashboard/proyectos" element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/user-dashboard/creadores" element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/user-dashboard/convocatorias" element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } />
                  <Route path="/user-dashboard/descubrir" element={
                    <AuthGuard>
                      <UserDashboard />
                    </AuthGuard>
                  } />
                  
                  {/* Creator Dashboard specific routes */}
                  <Route path="/dashboard/proyectos" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  <Route path="/dashboard/pendientes" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  <Route path="/dashboard/generales" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  
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
