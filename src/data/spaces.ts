import { Space } from '../types';

export const spaces: Space[] = [
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
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/380330/pexels-photo-380330.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
    id: '4',
    name: 'The Pod Loft',
    slug: 'the-pod-loft',
    type: 'podcast',
    shortDescription: 'A sleek, soundproof space built for bold voices and unforgettable conversations.',
    description: 'A sleek, soundproof space built for bold voices, clear sound and unforgettable conversations.',
    mainImage:
      'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1569076/pexels-photo-1569076.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ],
    features: [
      'Professional sound treatment',
      'High-quality microphones and equipment',
      'Comfortable seating for up to 4 people',
      'Soundproof environment',
      'Recording capabilities',
    ],
    useCases: [
      'Podcast recording',
      'Interview sessions',
      'Voiceover work',
      'Small panel discussions',
      'Audio content creation',
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
    id: '5',
    name: 'The Piano Room',
    slug: 'the-piano-room',
    type: 'photo',
    shortDescription: 'An opulent ballroom style space with grand piano and chandelier for striking portraits.',
    description:
      'An opulent ballroom style space featuring a grand piano and chandelier. Ideal for striking portraits, music inspired shoots, and unforgettable moments with a touch of grandeur.',
    mainImage:
      'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/110954/pexels-photo-110954.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1021142/pexels-photo-1021142.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/4846455/pexels-photo-4846455.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/4846455/pexels-photo-4846455.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/6969809/pexels-photo-6969809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/5503956/pexels-photo-5503956.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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
      'https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    images: [
      'https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/4986481/pexels-photo-4986481.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/2286078/pexels-photo-2286078.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
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

export const getSpaceBySlug = (slug: string): Space | undefined => {
  return spaces.find((space) => space.slug === slug);
};

export const getSpaceById = (id: string): Space | undefined => {
  return spaces.find((space) => space.id === id);
};
