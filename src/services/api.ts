
// Mock API services
export const shipmentService = {
  // Get shipment details
  getShipmentDetails: async (projectId: number) => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: String(projectId),
            tracking_number: "1234567890",
            carrier: "fedex",
            status: "shipped",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },
  
  // Create shipment
  createShipment: async (projectId: number, data: any) => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: String(projectId),
            tracking_number: data.trackingNumber,
            carrier: data.carrier,
            status: "shipped",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  },
  
  // Update shipment status
  updateShipmentStatus: async (projectId: number, status: string) => {
    // Simulate API call with a promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: String(projectId),
            status: status,
            updated_at: new Date().toISOString()
          }
        });
      }, 500);
    });
  }
};

export const projectService = {
  // Process payment
  processPayment: async (projectId: number, paymentDetails: any) => {
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
