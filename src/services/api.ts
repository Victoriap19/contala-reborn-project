import axios from "axios";

// Base configuration for axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      
      // Try to refresh the token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken })
          .then(response => {
            localStorage.setItem("token", response.data.access);
            
            // Retry the original request
            error.config.headers.Authorization = `Bearer ${response.data.access}`;
            return api.request(error.config);
          })
          .catch(refreshError => {
            console.error("Error refreshing the token:", refreshError);
            // Redirect to login
            window.location.href = "/login";
            return Promise.reject(refreshError);
          });
      } else {
        // No refresh token, redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  // Login function
  login: async (credentials: { username: string; password: string }) => {
    // In a real app, this would call the API
    console.log("Login with", credentials);
    
    // Simulate successful login
    localStorage.setItem("token", "fake-jwt-token");
    return { success: true };
  },
  
  // Register function
  register: async (userData: any) => {
    // In a real app, this would call the API
    console.log("Register with", userData);
    
    // Simulate successful registration
    localStorage.setItem("token", "fake-jwt-token");
    return { success: true };
  },
  
  // Logout function
  logout: () => {
    // Remove token from storage
    localStorage.removeItem("token");
    
    // In a real app, you might want to call an API to invalidate the token
    
    // Redirect to home page
    window.location.href = "/";
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

// User/creator services
export const userService = {
  // Obtain user profile
  getUserProfile: async (userId: number) => {
    return await api.get(`/accounts/users/${userId}/`);
  },
  
  // Update user profile
  updateUserProfile: async (userId: number, userData: any) => {
    return await api.patch(`/accounts/users/${userId}/`, userData);
  },
  
  // Obtain creators
  getCreators: async (params?: any) => {
    return await api.get("/accounts/creators/", { params });
  },
  
  // Obtain social networks
  getSocialNetworks: async () => {
    return await api.get("/accounts/social-networks/");
  },
  
  // Add social network
  addSocialNetwork: async (data: { network: string; url: string; username?: string }) => {
    return await api.post("/accounts/social-networks/", data);
  },
  
  // Delete social network
  deleteSocialNetwork: async (id: number) => {
    return await api.delete(`/accounts/social-networks/${id}/`);
  },
  
  // New function to send email notifications
  sendEmailNotification: async (data: {
    type: 'new_message' | 'proposal_received' | 'proposal_accepted';
    recipient_id: number;
    content?: string;
    project_id?: number;
  }) => {
    return await api.post("/accounts/notifications/email/", data);
  }
};

// Creator profile services
export const creatorService = {
  // Obtain creator profile
  getCreatorProfile: async (id: number) => {
    return await api.get(`/accounts/creator-profiles/${id}/`);
  },
  
  // Update creator profile
  updateCreatorProfile: async (id: number, data: any) => {
    return await api.patch(`/accounts/creator-profiles/${id}/`, data);
  },
  
  // Obtain portfolio
  getPortfolio: async () => {
    return await api.get("/accounts/portfolio/");
  },
  
  // Add item to portfolio
  addPortfolioItem: async (data: { type: "image" | "video"; url: string; title?: string; description?: string }) => {
    return await api.post("/accounts/portfolio/", data);
  },
  
  // Update item in portfolio
  updatePortfolioItem: async (id: number, data: any) => {
    return await api.patch(`/accounts/portfolio/${id}/`, data);
  },
  
  // Delete item from portfolio
  deletePortfolioItem: async (id: number) => {
    return await api.delete(`/accounts/portfolio/${id}/`);
  }
};

// Project services
export const projectService = {
  // Obtain all projects
  getProjects: async () => {
    return await api.get("/projects/projects/");
  },
  
  // Obtain a specific project
  getProject: async (id: number) => {
    return await api.get(`/projects/projects/${id}/`);
  },
  
  // Create a project
  createProject: async (data: any) => {
    return await api.post("/projects/projects/", data);
  },
  
  // Update a project
  updateProject: async (id: number, data: any) => {
    return await api.patch(`/projects/projects/${id}/`, data);
  },
  
  // Obtain proposals for a project
  getProjectProposals: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/proposals/`);
  },
  
  // Updated function to send proposal with notification
  createProposal: async (data: any) => {
    const response = await api.post("/projects/proposals/", data);
    
    // Send email notification
    await userService.sendEmailNotification({
      type: 'proposal_received',
      recipient_id: data.project_client_id, // Assuming this is part of the data
      project_id: data.project
    });
    
    return response;
  },
  
  // Updated function to accept proposal with notification
  acceptProposal: async (id: number, creatorId: number) => {
    const response = await api.post(`/projects/proposals/${id}/accept/`);
    
    // Send email notification
    await userService.sendEmailNotification({
      type: 'proposal_accepted',
      recipient_id: creatorId,
      project_id: id
    });
    
    return response;
  },
  
  // Obtain invitations
  getInvitations: async () => {
    return await api.get("/projects/invitations/");
  },
  
  // Accept an invitation
  acceptInvitation: async (id: number) => {
    return await api.post(`/projects/invitations/${id}/accept/`);
  },
  
  // Reject an invitation
  rejectInvitation: async (id: number) => {
    return await api.post(`/projects/invitations/${id}/reject/`);
  },
  
  // Process payment for a project
  processPayment: async (projectId: number, paymentData: {
    amount: number;
    description: string;
    shipping_id?: string;
  }) => {
    return await api.post(`/projects/projects/${projectId}/payment/`, paymentData);
  }
};

// Message services
export const messageService = {
  // Obtain messages for a project
  getProjectMessages: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/messages/`);
  },
  
  // Updated function to send message with notification
  sendMessage: async (data: { project: number; receiver_id: number; content: string }) => {
    const response = await api.post("/projects/messages/", data);
    
    // Send email notification
    await userService.sendEmailNotification({
      type: 'new_message',
      recipient_id: data.receiver_id,
      content: data.content.substring(0, 100) + (data.content.length > 100 ? '...' : ''),
      project_id: data.project
    });
    
    return response;
  },
  
  // Mark message as read
  markAsRead: async (id: number) => {
    return await api.post(`/projects/messages/${id}/mark_as_read/`);
  }
};

// Convocatoria services
export const convocatoriaService = {
  // Obtain all convocatorias
  getConvocatorias: async () => {
    return await api.get("/projects/convocatorias/");
  },
  
  // Obtain a specific convocatoria
  getConvocatoria: async (id: number) => {
    return await api.get(`/projects/convocatorias/${id}/`);
  },
  
  // Create a convocatoria
  createConvocatoria: async (data: any) => {
    return await api.post("/projects/convocatorias/", data);
  },
  
  // Update a convocatoria
  updateConvocatoria: async (id: number, data: any) => {
    return await api.patch(`/projects/convocatorias/${id}/`, data);
  },
  
  // Obtain applications for a convocatoria
  getConvocatoriaApplications: async (convocatoriaId: number) => {
    return await api.get(`/projects/convocatorias/${convocatoriaId}/applications/`);
  },
  
  // Apply to a convocatoria
  applyToConvocatoria: async (data: {
    convocatoria: number;
    cover_letter: string;
    price: number;
    estimated_days: number;
  }) => {
    return await api.post("/projects/applications/", data);
  },
  
  // Preseleccionar an application
  shortlistApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/shortlist/`);
  },
  
  // Accept an application
  acceptApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/accept/`);
  },
  
  // Reject an application
  rejectApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/reject/`);
  }
};

// Enhanced shipping service for handling product shipments
export const shipmentService = {
  // Generate shipping quote from Correo Argentino
  getShippingQuote: async (data: {
    origin_postal_code: string;
    destination_postal_code: string;
    weight: number;
    width?: number;
    height?: number;
    length?: number;
    return_required: boolean;
  }) => {
    return await api.post("/projects/shipping/quote/", data);
  },
  
  // Generate shipping label
  createShippingLabel: async (projectId: number, data: {
    origin_address: {
      street: string;
      number: string;
      city: string;
      state: string;
      postal_code: string;
      phone: string;
    },
    destination_address: {
      street: string;
      number: string;
      city: string;
      state: string;
      postal_code: string;
      phone: string;
    },
    weight: number;
    dimensions?: {
      width: number;
      height: number;
      length: number;
    },
    return_required: boolean;
    description: string;
  }) => {
    return await api.post(`/projects/projects/${projectId}/shipment/label/`, data);
  },
  
  // Get shipment details for a project
  getShipmentDetails: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/shipment/`);
  },
  
  // Update shipment status
  updateShipmentStatus: async (projectId: number, status: 'in_transit' | 'delivered') => {
    return await api.post(`/projects/projects/${projectId}/shipment/status/`, { status });
  },
  
  // Request return for a shipment
  requestReturn: async (projectId: number) => {
    return await api.post(`/projects/projects/${projectId}/shipment/return/`);
  },
  
  // Confirm return received
  confirmReturn: async (projectId: number) => {
    return await api.post(`/projects/projects/${projectId}/shipment/returned/`);
  },
  
  // Print return label
  getReturnLabel: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/shipment/return-label/`);
  },
  
  // Verify shipment status from Correo Argentino
  verifyShipmentStatus: async (trackingNumber: string) => {
    return await api.post(`/projects/shipping/verify/`, { tracking_number: trackingNumber });
  }
};

// Subscription services
export const subscriptionService = {
  // Get subscription plans
  getPlans: async () => {
    return await api.get("/accounts/subscription-plans/");
  },
  
  // Get current subscription
  getCurrentSubscription: async () => {
    return await api.get("/accounts/subscriptions/current/");
  },
  
  // Subscribe to a plan
  subscribe: async (planId: number, paymentData: {
    payment_method: string;
    billing_details?: {
      name: string;
      tax_id?: string;
      address?: {
        line1: string;
        city: string;
        postal_code: string;
      }
    }
  }) => {
    return await api.post(`/accounts/subscriptions/subscribe/${planId}/`, paymentData);
  },
  
  // Cancel subscription
  cancelSubscription: async () => {
    return await api.post("/accounts/subscriptions/cancel/");
  },
  
  // Update subscription
  updateSubscription: async (planId: number) => {
    return await api.post(`/accounts/subscriptions/update/${planId}/`);
  }
};

export default api;
