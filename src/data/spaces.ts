import { Space } from '../types';
import { fetchSpacesFromApi } from '../services/spacesApi';

// Fallback spaces data (in case API fails)
const fallbackSpaces: Space[] = [
  {
    id: '1',
    name: 'Maison Paris',
    slug: 'maison-paris',
    type: 'photo',
    shortDescription:
      'A vintage inspired Parisian waiting lounge and curated photo corner perfect for French ambiance.',
    description:
      'Maison Paris is our vintage inspired Parisian waiting lounge and curated photo corner. Perfect for capturing the French ambiance.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/3s5CpLIAbwEC1llFSNk4oL/e2a2d11d2fa34f56a898c3d466be6a51/WhatsApp_Image_2025-07-22_at_10.23.44_PM__1_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/1D9aCk9gUEL2RDhcm430RG/579402909097f6d45e59f63f1fa856a4/WhatsApp_Image_2025-07-22_at_10.23.38_PM.jpeg',
    ],
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
    hourlyRate: 80000, // ₦80,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '2',
    name: 'The Creperie',
    slug: 'the-creperie',
    type: 'photo',
    shortDescription: 'A photogenic kitchen designed for light bites, coffee breaks and content creation.',
    description:
      'A photogenic kitchen designed for light bites, coffee breaks and content creation. The perfect backdrop for culinary shoots, cozy conversations, and playful moments.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/4WUj7CaDAyLNxWN5kFy4HW/3eb4d42bfc0cde8d26f4f7f737141fbb/WhatsApp_Image_2025-07-22_at_10.23.39_PM__3_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/5VsguNqFyck4eSlv2raKgC/17267246f3666260ec24b2f4d7e6ff60/WhatsApp_Image_2025-07-22_at_10.23.39_PM__1_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/6ctQ1IBg0kTZskJDSFPdR/f3949c506110fcb23b2d8f205dc2431a/WhatsApp_Image_2025-07-22_at_10.23.40_PM.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/4WUj7CaDAyLNxWN5kFy4HW/3eb4d42bfc0cde8d26f4f7f737141fbb/WhatsApp_Image_2025-07-22_at_10.23.39_PM__3_.jpeg',
    ],
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
    hourlyRate: 75000, // ₦75,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '3',
    name: 'The Archway',
    slug: 'the-archway',
    type: 'photo',
    shortDescription: 'A stunning, dome-like hallway inspired by iconic European architecture.',
    description:
      'A stunning, dome like hallway inspired by iconic European architecture. The ideal setting for dramatic entrances, fashion shoots, and artistic storytelling.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/usqCYLpO8UO4fwfIMQOHn/b65c216d284a48d498aafee284e93e33/WhatsApp_Image_2025-07-22_at_10.23.36_PM.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/32wVhQ0g6cTZh7NEVtqW6K/c133d7f2a5aa039d819c812ff447b478/WhatsApp_Image_2025-07-22_at_10.23.38_PM__2_.jpeg',
    ],
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
    hourlyRate: 50000, // ₦50,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '5',
    name: 'The Piano Room',
    slug: 'the-piano-room',
    type: 'photo',
    shortDescription: 'An opulent ballroom style space with grand piano and chandelier for striking portraits.',
    description:
      'An opulent ballroom style space featuring a grand piano and chandelier. Ideal for striking portraits, music inspired shoots, and unforgettable moments with a touch of grandeur.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/73TEHG9mEcoPeuu6SC5psB/6efa39aded5f6e7e811b2f522e412df2/WhatsApp_Image_2025-07-22_at_10.23.44_PM__2_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/73TEHG9mEcoPeuu6SC5psB/6efa39aded5f6e7e811b2f522e412df2/WhatsApp_Image_2025-07-22_at_10.23.44_PM__2_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/MGpJLqVtV16etyLRAbQYx/8c4107ba00e02972164d504683d52b19/WhatsApp_Image_2025-07-22_at_10.23.39_PM__2_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/1cvfX2zHDNqqZxdmJcL9Pw/c32b3b66dbc457985735ed54b7dd72f8/tsa-piano-room-3.png',
    ],
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
    hourlyRate: 150000, // ₦150,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '6',
    name: 'Nue Ville',
    slug: 'nue-ville',
    type: 'photo',
    shortDescription: 'A minimalist, nude-toned room designed for clean, modern content creation.',
    description:
      'Nue Ville is a minimalist, nude-toned room designed for clean, modern content creation. Its neutral palette makes it ideal for fashion, branding, and editorial shoots.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/7gY3Mt0n4h019mBBM1EfwA/cb583555f7c075d331c7d7860033b6f8/WhatsApp_Image_2025-07-22_at_10.23.39_PM.jpeg',
    ],
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
    hourlyRate: 90000, // ₦90,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '7',
    name: 'Bain & Bubbles',
    slug: 'bain-bubbles',
    type: 'photo',
    shortDescription: 'A stylish bathroom with jacuzzi and walk-in closet for glamorous content creation.',
    description:
      'A stylish bathroom with a jacuzzi and walk in closet crafted for glamorous content, beauty shoots and indulgent behind the scenes experiences.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/5nxkLuH37DAXSsDPWd6ZWb/cd99552d2bb7dfdbe4e8d59ec0372cba/WhatsApp_Image_2025-07-22_at_10.23.38_PM__1_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/5nxkLuH37DAXSsDPWd6ZWb/cd99552d2bb7dfdbe4e8d59ec0372cba/WhatsApp_Image_2025-07-22_at_10.23.38_PM__1_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/5ezyDak7RyZ1QZYiDkxxYJ/8f7a47088da6b8ee2bce77138dc67a24/WhatsApp_Image_2025-07-22_at_10.23.42_PM__1_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/6lkk7FsrC7ENWnfnmu42Oz/83bbdce8504798080cb31a4954359da8/WhatsApp_Image_2025-07-22_at_10.23.42_PM__4_.jpeg',
    ],
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
    hourlyRate: 95000, // ₦95,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Tuesday - Sunday',
    openingHours: '10:00 AM - 6:00 PM',
  },
  {
    id: '8',
    name: 'Lauren Fair',
    slug: 'lauren-fair',
    type: 'event',
    shortDescription: 'An intimate event space designed for private gatherings and memorable celebrations.',
    description:
      'Our intimate event space, designed for private gatherings, special occasions, and memorable celebrations in an elegant, welcoming atmosphere.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/21QSKot59kNpCsWFy8foaB/3faac807ee126b188aee993f06c8e1a5/WhatsApp_Image_2025-07-22_at_10.23.45_PM__1_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/21QSKot59kNpCsWFy8foaB/3faac807ee126b188aee993f06c8e1a5/WhatsApp_Image_2025-07-22_at_10.23.45_PM__1_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/1TpyJAFuWZGqiKadgdZOLd/436d33ed178bc250e302e883fee8441f/WhatsApp_Image_2025-07-22_at_10.23.42_PM.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/3jA33WuIMDcAng1EPO7Pzq/31f9efc208dd1b0844b2af77e5451fe5/WhatsApp_Image_2025-07-22_at_10.23.44_PM__3_.jpeg',
    ],
    features: [
      'Flexible seating arrangements',
      'Elegant lighting options',
      'Sound system available',
      'Small kitchenette',
      'Customizable decor elements',
    ],
    useCases: ['Small workshops', 'Intimate celebrations', 'Product launches', 'Networking events', 'Private dinners'],
    hourlyRate: 400000, // ₦400,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Available by appointment',
    openingHours: 'Available by appointment',
  },
  {
    id: '9',
    name: 'Miguel & Moss Garden',
    slug: 'miguel-moss-garden',
    type: 'event',
    shortDescription: 'A nature inspired gazebo adorned with flowers perfect for outdoor events and photos.',
    description:
      'A nature inspired gazebo adorned with flowers perfect for picnics, garden parties, sunlit photos and a tranquil creative space.',
    mainImage:
      'https://images.ctfassets.net/g1pxcpqorahb/2GPPNzKmkoYkJwoSUIEb2N/4026710b30fdab773839fe27b6ba2f24/WhatsApp_Image_2025-07-22_at_10.23.40_PM__2_.jpeg',
    images: [
      'https://images.ctfassets.net/g1pxcpqorahb/2GPPNzKmkoYkJwoSUIEb2N/4026710b30fdab773839fe27b6ba2f24/WhatsApp_Image_2025-07-22_at_10.23.40_PM__2_.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/4McRX9TJeSsXIGu8p5GrSU/e6a472ecb15d82a349a1a79b92317529/WhatsApp_Image_2025-07-22_at_10.23.41_PM.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/58iqFXzbNURylUJT60k5IY/5218ff6f99c87bfdcc105152ae5831b2/WhatsApp_Image_2025-07-22_at_10.23.37_PM.jpeg',
      'https://images.ctfassets.net/g1pxcpqorahb/3z5UaD36qIqWhIOOcVtTSs/2fe97e42a29e9273733c05c8622c9dee/WhatsApp_Image_2025-07-22_at_10.23.41_PM__1_.jpeg',
    ],
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
    hourlyRate: 250000, // ₦250,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' },
    ],
    openingDays: 'Available by appointment',
    openingHours: 'Available by appointment',
  },
];

// Cache for API data
let cachedSpaces: Space[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to get spaces (from API or fallback)
export const getSpaces = async (): Promise<Space[]> => {
  // Check if we have cached data that's still fresh
  if (cachedSpaces && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedSpaces;
  }

  try {
    const apiSpaces = await fetchSpacesFromApi();
    cachedSpaces = apiSpaces;
    cacheTimestamp = Date.now();
    return apiSpaces;
  } catch (error) {
    console.warn('Failed to fetch spaces from API, using fallback data:', error);
    return fallbackSpaces;
  }
};

// Synchronous access to spaces (for backward compatibility)
// This will return cached data if available, otherwise fallback data
export const spaces: Space[] = cachedSpaces || fallbackSpaces;

// Helper functions
export const getSpaceBySlug = async (slug: string): Promise<Space | undefined> => {
  const allSpaces = await getSpaces();
  return allSpaces.find((space) => space.slug === slug);
};

export const getSpaceById = async (id: string): Promise<Space | undefined> => {
  const allSpaces = await getSpaces();
  return allSpaces.find((space) => space.id === id);
};

// Synchronous helper functions (for backward compatibility)
export const getSpaceBySlugSync = (slug: string): Space | undefined => {
  return spaces.find((space) => space.slug === slug);
};

export const getSpaceByIdSync = (id: string): Space | undefined => {
  return spaces.find((space) => space.id === id);
};
