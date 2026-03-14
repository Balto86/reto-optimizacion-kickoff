export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Court {
  id: string;
  name: string;
  description: string;
  price: number;
  sport: 'futbol' | 'padel' | 'tenis' | 'basquet';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  amenities: string[];
  schedule: {
    [key: string]: { open: string; close: string }[];
  };
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}