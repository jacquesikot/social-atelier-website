import { Space } from '../types';

// API Response interfaces
interface ApiSpace {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  bookingDuration: number;
  cautionFee: number;
  images: string[];
  cojoinedSpaces: string[];
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}

interface ApiResponse {
  success: boolean;
  spaces: ApiSpace[]; // Note: no 'count' field in actual response
}

// Hardcoded data that will be merged with API data
const hardcodedSpaceData: Record<string, Partial<Space>> = {
  '68834e6a058284898c872505': {
    // Maison Paris API ID
    slug: 'maison-paris',
    type: 'photo',
    shortDescription:
      'A vintage inspired Parisian waiting lounge and curated photo corner perfect for French ambiance.',
    features: [
      'Vintage-inspired seating and decor',
      'Large windows with natural light',
      'Customizable lighting setup',
      'WiFi and charging stations',
      'Climate controlled environment',
    ],
    useCases: [
      'Professional photoshoots',
      'Interview settings',
      'Small gatherings',
      'Bridal preparations',
      'Fashion showcases',
    ],
    hourlyRate: 80000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '68838d0a95036160c0726e01': {
    // The Creperie API ID
    slug: 'the-creperie',
    type: 'photo',
    shortDescription: 'A photogenic kitchen designed for light bites, coffee breaks and content creation.',
    features: [
      'High-end appliances and cookware',
      'Spacious island with seating',
      'Premium finishes and fixtures',
      'Professional lighting options',
      'Fully stocked pantry (upon request)',
    ],
    useCases: [
      'Food photography',
      'Cooking demonstrations',
      'Culinary workshops',
      'Recipe video filming',
      'Intimate dinner parties',
    ],
    hourlyRate: 75000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '6883b9ed28abbe958302778e': {
    // The Archway API ID
    slug: 'the-archway',
    type: 'photo',
    shortDescription: 'A stunning, dome-like hallway inspired by iconic European architecture.',
    features: [
      'Architectural moldings and details',
      'Neutral palette for versatility',
      'Natural and artificial lighting options',
      'Artwork display capability',
      'Connected to multiple spaces',
    ],
    useCases: [
      'Fashion photography',
      'Artistic shoots',
      'Transition spaces for events',
      'Gallery-style exhibitions',
      'Dramatic portrait settings',
    ],
    hourlyRate: 50000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '6883baad28abbe9583027796': {
    // The Piano Room API ID
    slug: 'the-piano-room',
    type: 'photo',
    shortDescription: 'An opulent ballroom style space with grand piano and chandelier for striking portraits.',
    features: [
      'Professionally tuned grand piano',
      'Superior room acoustics',
      'Elegant furnishings and decor',
      'Dimmable lighting options',
      'Recording equipment available',
    ],
    useCases: [
      'Piano recitals and recordings',
      'Intimate music performances',
      'Musical photoshoots',
      'Elegant event space',
      'Music video filming',
    ],
    hourlyRate: 150000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '6883bb6128abbe958302779e': {
    // Nue Ville API ID
    slug: 'nue-ville',
    type: 'photo',
    shortDescription: 'A minimalist, nude-toned room designed for clean, modern content creation.',
    features: [
      'Perfect natural lighting with diffusers',
      'Versatile styling options',
      'Multiple backdrop choices',
      'Artistic props and decor',
      'Styling assistance available',
    ],
    useCases: [
      'Fashion photography',
      'Product shoots',
      'Influencer content creation',
      'Beauty tutorials filming',
      'Creative portraits',
    ],
    hourlyRate: 90000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '6883bc0528abbe95830277a6': {
    // Bain & Bubbles API ID
    slug: 'bain-bubbles',
    type: 'photo',
    shortDescription: 'A stylish bathroom with jacuzzi and walk-in closet for glamorous content creation.',
    features: [
      'Designer fixtures and finishes',
      'Perfect beauty lighting',
      'Large vanity area',
      'Luxurious bathtub',
      'Styling props available',
    ],
    useCases: [
      'Beauty content creation',
      'Skincare tutorials',
      'Product photography',
      'Self-care themed shoots',
      'Fashion editorial details',
    ],
    hourlyRate: 95000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  '6883bc6628abbe95830277ae': {
    // Lauren Fair API ID
    slug: 'lauren-fair',
    type: 'event',
    shortDescription: 'An intimate event space designed for private gatherings and memorable celebrations.',
    features: [
      'Flexible seating arrangements',
      'Elegant lighting options',
      'Sound system available',
      'Small kitchenette',
      'Customizable decor elements',
    ],
    useCases: ['Small workshops', 'Intimate celebrations', 'Product launches', 'Networking events', 'Private dinners'],
    hourlyRate: 400000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Available by appointment',
    openingHours: 'Available by appointment',
  },
  '6883bcc528abbe95830277b6': {
    // Miguel & Moss Garden API ID
    slug: 'miguel-moss-garden',
    type: 'event',
    shortDescription: 'A nature inspired gazebo adorned with flowers perfect for outdoor events and photos.',
    features: [
      'Lush landscaping and greenery',
      'Comfortable outdoor furniture',
      'String lights for evening events',
      'Covered patio area',
      'Garden features and planters',
    ],
    useCases: [
      'Outdoor photoshoots',
      'Garden parties',
      'Outdoor workshops',
      'Nature-themed content creation',
      'Intimate ceremonies',
    ],
    hourlyRate: 250000,
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Available by appointment',
    openingHours: 'Available by appointment',
  },
};

const API_URL = 'https://bookspace-server.onrender.com/api/public/spaces';
const API_KEY = 'a81a64bdc43d3cca969e90153ad0945cffd1a85d73293371ce2f07bb31108b87';

export const fetchSpacesFromApi = async (): Promise<Space[]> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success || !data.spaces) {
      throw new Error('Invalid API response format');
    }

    // Map API spaces to our Space interface
    const mappedSpaces: Space[] = data.spaces.map((apiSpace) => {
      const hardcodedData = hardcodedSpaceData[apiSpace.id] || {};

      // Use API data for name, description, and images
      // Use hardcoded data for everything else
      return {
        id: apiSpace.id,
        name: apiSpace.name,
        description: apiSpace.description,
        images: apiSpace.images.length > 0 ? apiSpace.images : [hardcodedData.mainImage || ''],
        mainImage: apiSpace.images[0] || hardcodedData.mainImage || '',
        // Use hardcoded data for remaining fields
        slug: hardcodedData.slug || apiSpace.name.toLowerCase().replace(/\s+/g, '-'),
        type: hardcodedData.type || 'photo',
        shortDescription: hardcodedData.shortDescription || apiSpace.description,
        features: hardcodedData.features || [],
        useCases: hardcodedData.useCases || [],
        hourlyRate: hardcodedData.hourlyRate || apiSpace.pricePerHour, // Use API price if no hardcoded rate
        durationOptions: hardcodedData.durationOptions || [
          { hours: 2, label: '2 hours' },
          { hours: 4, label: '4 hours' },
          { hours: 8, label: 'Full day (8 hours)' },
        ],
        openingDays: hardcodedData.openingDays || 'Tuesday - Sunday',
        openingHours: hardcodedData.openingHours || '10:00 AM - 6:00 PM',
      };
    });

    return mappedSpaces;
  } catch (error) {
    console.error('Error fetching spaces from API:', error);
    throw error;
  }
};
