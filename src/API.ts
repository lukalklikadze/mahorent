const API_BASE_URL = "http://localhost:5000/api";

export interface Car {
  _id?: string;
  name: string;
  location: string;
  gearsType: string;
  steeringWheelSide: string;
  fuel: string;
  prevPrice: string;
  newPrice: string;
  photos: string[];
  bookedDates?: string[];
}

export interface Hotel {
  _id?: string;
  name: string;
  location: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  prevPrice: string;
  newPrice: string;
  photos: string[];
  tagline?: string;
}

export interface Tour {
  _id?: string;
  name: string;
  prevPrice: string;
  newPrice: string;
  photos: string[];
}

export const carAPI = {
  getAll: async (): Promise<Car[]> => {
    const response = await fetch(`${API_BASE_URL}/cars`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    return response.json();
  },

  getById: async (id: string): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch car");
    }
    return response.json();
  },

  create: async (car: Omit<Car, "_id">): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
    if (!response.ok) {
      throw new Error("Failed to create car");
    }
    return response.json();
  },

  book: async (id: string, dates: string[]): Promise<Car> => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dates }),
    });
    if (!response.ok) {
      throw new Error("Failed to book car");
    }
    return response.json();
  },
};

export const hotelAPI = {
  getAll: async (): Promise<Hotel[]> => {
    const response = await fetch(`${API_BASE_URL}/hotels`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    return response.json();
  },

  getById: async (id: string): Promise<Hotel> => {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotel");
    }
    return response.json();
  },

  create: async (hotel: Omit<Hotel, "_id">): Promise<Hotel> => {
    const response = await fetch(`${API_BASE_URL}/hotels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });
    if (!response.ok) {
      throw new Error("Failed to create hotel");
    }
    return response.json();
  },
};

export const tourAPI = {
  getAll: async (): Promise<Tour[]> => {
    const response = await fetch(`${API_BASE_URL}/tours`);
    if (!response.ok) {
      throw new Error("Failed to fetch tours");
    }
    return response.json();
  },

  getById: async (id: string): Promise<Tour> => {
    const response = await fetch(`${API_BASE_URL}/tours/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tour");
    }
    return response.json();
  },

  create: async (tour: Omit<Tour, "_id">): Promise<Tour> => {
    const response = await fetch(`${API_BASE_URL}/tours`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tour),
    });
    if (!response.ok) {
      throw new Error("Failed to create tour");
    }
    return response.json();
  },
};
