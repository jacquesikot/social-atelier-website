export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  features: string[];
  useCases: string[];
  hourlyRate: number;
  durationOptions: {
    hours: number;
    label: string;
  }[];
  openingDays: string;
  openingHours: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface BookingFormData {
  spaceId: string;
  date: string;
  startTime: string;
  duration: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}
