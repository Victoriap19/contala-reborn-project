
import axios from "axios";

// Configuración base para axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Crear una instancia de axios con la configuración por defecto
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a todas las peticiones
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

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem("token");
      
      // Intentar refrescar el token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken })
          .then(response => {
            localStorage.setItem("token", response.data.access);
            
            // Reintentar la petición original
            error.config.headers.Authorization = `Bearer ${response.data.access}`;
            return api.request(error.config);
          })
          .catch(refreshError => {
            console.error("Error al refrescar el token:", refreshError);
            // Redirigir a login
            window.location.href = "/login";
            return Promise.reject(refreshError);
          });
      } else {
        // No hay refresh token, redirigir a login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post("/token/", { username, password });
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return response.data;
  },
  
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    is_creator?: boolean;
  }) => {
    return await api.post("/accounts/users/", userData);
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
  
  getCurrentUser: async () => {
    return await api.get("/accounts/users/me/");
  },
  
  changePassword: async (userId: number, oldPassword: string, newPassword: string) => {
    return await api.post(`/accounts/users/${userId}/change_password/`, {
      old_password: oldPassword,
      new_password: newPassword
    });
  }
};

// Servicios para usuarios/creadores
export const userService = {
  // Obtener perfil de usuario
  getUserProfile: async (userId: number) => {
    return await api.get(`/accounts/users/${userId}/`);
  },
  
  // Actualizar perfil de usuario
  updateUserProfile: async (userId: number, userData: any) => {
    return await api.patch(`/accounts/users/${userId}/`, userData);
  },
  
  // Obtener creadores
  getCreators: async (params?: any) => {
    return await api.get("/accounts/creators/", { params });
  },
  
  // Obtener redes sociales
  getSocialNetworks: async () => {
    return await api.get("/accounts/social-networks/");
  },
  
  // Añadir red social
  addSocialNetwork: async (data: { network: string; url: string; username?: string }) => {
    return await api.post("/accounts/social-networks/", data);
  },
  
  // Eliminar red social
  deleteSocialNetwork: async (id: number) => {
    return await api.delete(`/accounts/social-networks/${id}/`);
  }
};

// Servicios para perfiles de creadores
export const creatorService = {
  // Obtener perfil de creador
  getCreatorProfile: async (id: number) => {
    return await api.get(`/accounts/creator-profiles/${id}/`);
  },
  
  // Actualizar perfil de creador
  updateCreatorProfile: async (id: number, data: any) => {
    return await api.patch(`/accounts/creator-profiles/${id}/`, data);
  },
  
  // Obtener portafolio
  getPortfolio: async () => {
    return await api.get("/accounts/portfolio/");
  },
  
  // Añadir ítem al portafolio
  addPortfolioItem: async (data: { type: "image" | "video"; url: string; title?: string; description?: string }) => {
    return await api.post("/accounts/portfolio/", data);
  },
  
  // Actualizar ítem del portafolio
  updatePortfolioItem: async (id: number, data: any) => {
    return await api.patch(`/accounts/portfolio/${id}/`, data);
  },
  
  // Eliminar ítem del portafolio
  deletePortfolioItem: async (id: number) => {
    return await api.delete(`/accounts/portfolio/${id}/`);
  }
};

// Servicios para proyectos
export const projectService = {
  // Obtener todos los proyectos
  getProjects: async () => {
    return await api.get("/projects/projects/");
  },
  
  // Obtener un proyecto específico
  getProject: async (id: number) => {
    return await api.get(`/projects/projects/${id}/`);
  },
  
  // Crear un proyecto
  createProject: async (data: any) => {
    return await api.post("/projects/projects/", data);
  },
  
  // Actualizar un proyecto
  updateProject: async (id: number, data: any) => {
    return await api.patch(`/projects/projects/${id}/`, data);
  },
  
  // Obtener propuestas para un proyecto
  getProjectProposals: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/proposals/`);
  },
  
  // Crear una propuesta
  createProposal: async (data: any) => {
    return await api.post("/projects/proposals/", data);
  },
  
  // Aceptar una propuesta
  acceptProposal: async (id: number) => {
    return await api.post(`/projects/proposals/${id}/accept/`);
  },
  
  // Rechazar una propuesta
  rejectProposal: async (id: number) => {
    return await api.post(`/projects/proposals/${id}/reject/`);
  },
  
  // Invitar a un creador a un proyecto
  inviteCreator: async (data: { project_id: number; creator_id: number; message: string }) => {
    return await api.post("/projects/invitations/", data);
  },
  
  // Obtener invitaciones
  getInvitations: async () => {
    return await api.get("/projects/invitations/");
  },
  
  // Aceptar una invitación
  acceptInvitation: async (id: number) => {
    return await api.post(`/projects/invitations/${id}/accept/`);
  },
  
  // Rechazar una invitación
  rejectInvitation: async (id: number) => {
    return await api.post(`/projects/invitations/${id}/reject/`);
  }
};

// Servicios para mensajes
export const messageService = {
  // Obtener mensajes de un proyecto
  getProjectMessages: async (projectId: number) => {
    return await api.get(`/projects/projects/${projectId}/messages/`);
  },
  
  // Enviar un mensaje
  sendMessage: async (data: { project: number; receiver_id: number; content: string }) => {
    return await api.post("/projects/messages/", data);
  },
  
  // Marcar mensaje como leído
  markAsRead: async (id: number) => {
    return await api.post(`/projects/messages/${id}/mark_as_read/`);
  }
};

// Servicios para convocatorias
export const convocatoriaService = {
  // Obtener todas las convocatorias
  getConvocatorias: async () => {
    return await api.get("/projects/convocatorias/");
  },
  
  // Obtener una convocatoria específica
  getConvocatoria: async (id: number) => {
    return await api.get(`/projects/convocatorias/${id}/`);
  },
  
  // Crear una convocatoria
  createConvocatoria: async (data: any) => {
    return await api.post("/projects/convocatorias/", data);
  },
  
  // Actualizar una convocatoria
  updateConvocatoria: async (id: number, data: any) => {
    return await api.patch(`/projects/convocatorias/${id}/`, data);
  },
  
  // Obtener aplicaciones para una convocatoria
  getConvocatoriaApplications: async (convocatoriaId: number) => {
    return await api.get(`/projects/convocatorias/${convocatoriaId}/applications/`);
  },
  
  // Aplicar a una convocatoria
  applyToConvocatoria: async (data: {
    convocatoria: number;
    cover_letter: string;
    price: number;
    estimated_days: number;
  }) => {
    return await api.post("/projects/applications/", data);
  },
  
  // Preseleccionar una aplicación
  shortlistApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/shortlist/`);
  },
  
  // Aceptar una aplicación
  acceptApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/accept/`);
  },
  
  // Rechazar una aplicación
  rejectApplication: async (id: number) => {
    return await api.post(`/projects/applications/${id}/reject/`);
  }
};

export default api;
