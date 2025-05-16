
// Mock API services

// Type definitions for better TypeScript support
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

// User and profile service
export const userService = {
  // Get user profile
  getUserProfile: async (userId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: userId,
            first_name: "Usuario",
            last_name: "Ejemplo",
            email: "usuario@ejemplo.com",
            phone: "+5491123456789",
            bio: "Descripción de perfil de usuario",
            brand_name: "Marca Ejemplo",
            product_url: "https://ejemplo.com/producto",
            profile_picture: "https://ui-avatars.com/api/?name=Usuario+Ejemplo&background=random",
            social_networks: [
              { network: "instagram", url: "https://instagram.com/ejemplo" },
              { network: "facebook", url: "https://facebook.com/ejemplo" },
              { network: "twitter", url: "https://x.com/ejemplo" }
            ],
            creator_profile: {
              id: userId + 100,
              location: "Buenos Aires, Argentina",
              specialties: "Fotografía, Video",
              experience_years: 5
            }
          }
        });
      }, 500);
    });
  },

  // Update user profile
  updateUserProfile: async (userId: number, data: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: userId,
            ...data,
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },

  // Add social network
  addSocialNetwork: async (socialNetwork: { network: string, url: string }): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000),
            ...socialNetwork,
            created_at: new Date().toISOString()
          }
        });
      }, 300);
    });
  }
};

// Creator service
export const creatorService = {
  // Get creator profile
  getCreatorProfile: async (creatorId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: creatorId,
            user_id: creatorId - 100,
            location: "Buenos Aires, Argentina",
            specialties: "Fotografía, Video, Diseño Gráfico",
            experience_years: 5,
            portfolio_items_count: 12,
            rating: 4.8,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },

  // Update creator profile
  updateCreatorProfile: async (creatorId: number, data: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: creatorId,
            ...data,
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },

  // Get portfolio
  getPortfolio: async (): Promise<ApiResponse<any[]>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              type: "image",
              url: "https://source.unsplash.com/random/300x300?sig=1",
              title: "Portfolio Item 1"
            },
            {
              id: 2,
              type: "image",
              url: "https://source.unsplash.com/random/300x300?sig=2",
              title: "Portfolio Item 2"
            },
            {
              id: 3,
              type: "video",
              url: "https://example.com/video.mp4",
              title: "Video Promocional"
            }
          ]
        });
      }, 500);
    });
  },

  // Add portfolio item
  addPortfolioItem: async (item: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000),
            ...item,
            created_at: new Date().toISOString()
          }
        });
      }, 700);
    });
  },

  // Delete portfolio item
  deletePortfolioItem: async (itemId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: itemId,
            deleted: true
          }
        });
      }, 300);
    });
  }
};

// Subscription service
export const subscriptionService = {
  // Get current subscription
  getCurrentSubscription: async (): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 30% chance to simulate a user without a subscription
        if (Math.random() > 0.7) {
          reject(new Error("No active subscription"));
        } else {
          resolve({
            success: true,
            data: {
              id: 12345,
              status: "active",
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              plan: {
                id: 2,
                name: "Pro Mensual",
                price: 12000,
                interval: "month",
                features: [
                  "Hasta 10 propuestas o proyectos por mes",
                  "Filtros avanzados",
                  "Mensajes ilimitados",
                  "Soporte rápido"
                ]
              }
            }
          });
        }
      }, 700);
    });
  },
  
  // Cancel subscription
  cancelSubscription: async (subscriptionId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: subscriptionId,
            status: "canceled",
            canceled_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },
  
  // Change subscription plan
  changePlan: async (subscriptionId: number, newPlanId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: subscriptionId,
            status: "active",
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            plan: {
              id: newPlanId,
              name: newPlanId === 2 ? "Pro Mensual" : "Empresa Mensual",
              price: newPlanId === 2 ? 12000 : 30000,
              interval: "month"
            },
            updated_at: new Date().toISOString()
          }
        });
      }, 700);
    });
  }
};

// Shipment service with extended methods
export const shipmentService = {
  // Get shipment details
  getShipmentDetails: async (projectId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            tracking_number: "1234567890",
            carrier: "fedex",
            status: "in_transit",
            label_url: "https://example.com/label.pdf",
            return_label_url: "https://example.com/return_label.pdf",
            estimated_delivery_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            return_required: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },
  
  // Create shipment
  createShipment: async (projectId: number, data: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            tracking_number: data.trackingNumber || "9876543210",
            carrier: data.carrier || "fedex",
            status: "shipped",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },
  
  // Update shipment status
  updateShipmentStatus: async (projectId: number, status: string): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            status: status,
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },

  // New method: Get shipping quote
  getShippingQuote: async (quoteData: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        // Calculate a mock price based on weight and dimensions
        const basePrice = 1500;
        const weightFactor = quoteData.weight * 200;
        const volumeFactor = (quoteData.width * quoteData.height * quoteData.length) / 1000;
        const distanceFactor = Math.abs(parseInt(quoteData.origin_postal_code) - parseInt(quoteData.destination_postal_code)) / 100;
        
        let price = basePrice + weightFactor + volumeFactor + distanceFactor;
        
        // Add surcharge for return if required
        if (quoteData.return_required) {
          price = price * 1.5;
        }
        
        // Round to nearest hundred
        price = Math.round(price / 100) * 100;
        
        resolve({
          success: true,
          data: {
            price: price,
            estimated_days: Math.floor(Math.random() * 5) + 3, // 3-7 days
            carrier: "fedex",
            valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          }
        });
      }, 800);
    });
  },

  // New method: Create shipping label
  createShippingLabel: async (projectId: number, shipmentData: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            tracking_number: `TR${Math.floor(Math.random() * 1000000000)}`,
            carrier: "fedex",
            status: "label_created",
            label_url: "https://example.com/label.pdf",
            return_label_url: shipmentData.return_required ? "https://example.com/return_label.pdf" : null,
            estimated_delivery_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            return_required: shipmentData.return_required,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            origin_address: shipmentData.origin_address,
            destination_address: shipmentData.destination_address,
            dimensions: shipmentData.dimensions,
            weight: shipmentData.weight
          }
        });
      }, 1500);
    });
  },

  // New method: Request return
  requestReturn: async (projectId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            status: "return_requested",
            return_requested_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 700);
    });
  },

  // New method: Confirm return
  confirmReturn: async (projectId: number): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Math.floor(Math.random() * 10000),
            project_id: projectId,
            status: "returned",
            return_confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 700);
    });
  }
};

// Project service
export const projectService = {
  // Process payment
  processPayment: async (projectId: number, paymentDetails: any): Promise<ApiResponse<any>> => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: String(projectId),
            payment_id: `pay_${Math.random().toString(36).substring(2, 15)}`,
            amount: paymentDetails.amount,
            status: "completed",
            created_at: new Date().toISOString()
          }
        });
      }, 1500);
    });
  }
};
