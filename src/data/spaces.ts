import { Space } from '../types';

export const spaces: Space[] = [
  {
    id: '1',
    name: 'Parisian Waiting Area',
    slug: 'parisian-waiting-area',
    shortDescription: 'An elegant European-inspired lounge with classic details and warm ambiance.',
    description: 'Step into the charm of Paris with our beautifully curated Parisian Waiting Area. This elegant space features classic moldings, vintage-inspired furniture, and soft, warm lighting that creates an atmosphere of sophisticated comfort. Perfect for intimate conversations, professional photoshoots, or as a welcoming area for your special event.',
    mainImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg'
    ],
    features: [
      'Vintage-inspired seating and decor',
      'Large windows with natural light',
      'Customizable lighting setup',
      'WiFi and charging stations',
      'Climate controlled environment'
    ],
    useCases: [
      'Professional photoshoots',
      'Interview settings',
      'Small gatherings',
      'Bridal preparations',
      'Fashion showcases'
    ],
    hourlyRate: 50000, // ₦50,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '2',
    name: 'Contemporary Kitchen',
    slug: 'contemporary-kitchen',
    shortDescription: 'A sleek, modern kitchen space ideal for culinary content creation and cooking events.',
    description: 'Our Contemporary Kitchen combines functionality with stunning aesthetics. Featuring high-end appliances, a spacious island, and carefully selected finishes, this space is perfect for food photography, cooking demonstrations, or culinary workshops. The space is flooded with natural light, making it ideal for capturing the perfect shot of your culinary creations.',
    mainImage: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/3926542/pexels-photo-3926542.jpeg',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg'
    ],
    features: [
      'High-end appliances and cookware',
      'Spacious island with seating',
      'Premium finishes and fixtures',
      'Professional lighting options',
      'Fully stocked pantry (upon request)'
    ],
    useCases: [
      'Food photography',
      'Cooking demonstrations',
      'Culinary workshops',
      'Recipe video filming',
      'Intimate dinner parties'
    ],
    hourlyRate: 65000, // ₦65,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '3',
    name: 'Hallway',
    slug: 'hallway',
    shortDescription: 'An architecturally stunning hallway with artistic details and excellent lighting.',
    description: 'Our Hallway space offers a unique setting with architectural interest and artistic details. The long, elegant corridor features beautiful moldings, neutral tones, and excellent lighting conditions that photographers love. This versatile space can be styled in multiple ways and connects to other spaces in our atelier.',
    mainImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
      'https://images.pexels.com/photos/380330/pexels-photo-380330.jpeg',
      'https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg'
    ],
    features: [
      'Architectural moldings and details',
      'Neutral palette for versatility',
      'Natural and artificial lighting options',
      'Artwork display capability',
      'Connected to multiple spaces'
    ],
    useCases: [
      'Fashion photography',
      'Artistic shoots',
      'Transition spaces for events',
      'Gallery-style exhibitions',
      'Dramatic portrait settings'
    ],
    hourlyRate: 40000, // ₦40,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '4',
    name: 'Podcast Room',
    slug: 'podcast-room',
    shortDescription: 'A professionally sound-treated studio space designed for crystal-clear audio recording.',
    description: 'The Podcast Room is a professionally designed space for creators who value both aesthetics and audio quality. With sound-absorbing panels, professional microphones, and comfortable seating, this space ensures your conversations sound as good as they look. The warm, inviting decor creates a comfortable atmosphere that helps guests feel at ease during recording sessions.',
    mainImage: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg',
    images: [
      'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg',
      'https://images.pexels.com/photos/1569076/pexels-photo-1569076.jpeg',
      'https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg'
    ],
    features: [
      'Professional sound treatment',
      'High-quality microphones and equipment',
      'Comfortable seating for up to 4 people',
      'Soundproof environment',
      'Recording capabilities'
    ],
    useCases: [
      'Podcast recording',
      'Interview sessions',
      'Voiceover work',
      'Small panel discussions',
      'Audio content creation'
    ],
    hourlyRate: 75000, // ₦75,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '5',
    name: 'Grand Piano Room',
    slug: 'grand-piano-room',
    shortDescription: 'An elegant space centered around a stunning grand piano with superior acoustics.',
    description: 'Our Grand Piano Room exudes sophistication and artistic inspiration. Centered around a beautiful grand piano, this space features high ceilings, exceptional acoustics, and tasteful decor. Whether you\'re recording a musical performance, hosting an intimate concert, or seeking an elegant backdrop for photos, this room provides a refined atmosphere that elevates any creative endeavor.',
    mainImage: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
    images: [
      'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg',
      'https://images.pexels.com/photos/110954/pexels-photo-110954.jpeg',
      'https://images.pexels.com/photos/1021142/pexels-photo-1021142.jpeg'
    ],
    features: [
      'Professionally tuned grand piano',
      'Superior room acoustics',
      'Elegant furnishings and decor',
      'Dimmable lighting options',
      'Recording equipment available'
    ],
    useCases: [
      'Piano recitals and recordings',
      'Intimate music performances',
      'Musical photoshoots',
      'Elegant event space',
      'Music video filming'
    ],
    hourlyRate: 85000, // ₦85,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '6',
    name: 'Aesthetics Room',
    slug: 'aesthetics-room',
    shortDescription: 'A visually captivating space with artistic elements and perfect lighting for content creation.',
    description: 'The Aesthetics Room is a content creators dream. This carefully curated space features artistic elements, perfect lighting, and thoughtfully arranged vignettes that make for stunning photos and videos. With a mix of textures, colors, and decorative objects, this versatile room can be styled to match various themes and moods for your creative projects.',
    mainImage: 'https://images.pexels.com/photos/4846455/pexels-photo-4846455.jpeg',
    images: [
      'https://images.pexels.com/photos/4846455/pexels-photo-4846455.jpeg',
      'https://images.pexels.com/photos/6969809/pexels-photo-6969809.jpeg',
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg'
    ],
    features: [
      'Perfect natural lighting with diffusers',
      'Versatile styling options',
      'Multiple backdrop choices',
      'Artistic props and decor',
      'Styling assistance available'
    ],
    useCases: [
      'Fashion photography',
      'Product shoots',
      'Influencer content creation',
      'Beauty tutorials filming',
      'Creative portraits'
    ],
    hourlyRate: 70000, // ₦70,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '7',
    name: 'Aesthetics Bathroom',
    slug: 'aesthetics-bathroom',
    shortDescription: 'A luxurious bathroom setting with designer fixtures, perfect for beauty content.',
    description: 'Our Aesthetics Bathroom combines luxury and practicality in a stunning setting. Featuring designer fixtures, beautiful tiles, and perfect lighting, this space is ideal for beauty tutorials, product photography, or creative shoots. The generous size allows for comfortable shooting angles while maintaining an intimate atmosphere.',
    mainImage: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg',
    images: [
      'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg',
      'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg'
    ],
    features: [
      'Designer fixtures and finishes',
      'Perfect beauty lighting',
      'Large vanity area',
      'Luxurious bathtub',
      'Styling props available'
    ],
    useCases: [
      'Beauty content creation',
      'Skincare tutorials',
      'Product photography',
      'Self-care themed shoots',
      'Fashion editorial details'
    ],
    hourlyRate: 55000, // ₦55,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '8',
    name: 'Intimate Event Space',
    slug: 'intimate-event-space',
    shortDescription: 'A versatile space for small gatherings with customizable setups and elegant ambiance.',
    description: 'The Intimate Event Space offers a flexible environment for hosting small gatherings with style. With customizable layout options, elegant decor, and a warm atmosphere, this space can be transformed to suit various events from workshops to dinner parties. The neutral palette serves as a perfect canvas for your unique vision, while our amenities ensure your guests are comfortable throughout your event.',
    mainImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg',
      'https://images.pexels.com/photos/5503956/pexels-photo-5503956.jpeg'
    ],
    features: [
      'Flexible seating arrangements',
      'Elegant lighting options',
      'Sound system available',
      'Small kitchenette',
      'Customizable decor elements'
    ],
    useCases: [
      'Small workshops',
      'Intimate celebrations',
      'Product launches',
      'Networking events',
      'Private dinners'
    ],
    hourlyRate: 100000, // ₦100,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday',
    openingHours: '9:00 AM - 9:00 PM'
  },
  {
    id: '9',
    name: 'Outdoor Garden',
    slug: 'outdoor-garden',
    shortDescription: 'A serene outdoor space with lush greenery and charming garden features.',
    description: 'Our Outdoor Garden provides a peaceful natural setting in the heart of Lekki. With lush greenery, comfortable seating areas, and beautiful garden features, this space is perfect for outdoor shoots, small gatherings, or simply enjoying some fresh air during your event. The garden offers various backdrops, from flowering plants to architectural elements, providing endless creative possibilities.',
    mainImage: 'https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg',
    images: [
      'https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg',
      'https://images.pexels.com/photos/4986481/pexels-photo-4986481.jpeg',
      'https://images.pexels.com/photos/2286078/pexels-photo-2286078.jpeg'
    ],
    features: [
      'Lush landscaping and greenery',
      'Comfortable outdoor furniture',
      'String lights for evening events',
      'Covered patio area',
      'Garden features and planters'
    ],
    useCases: [
      'Outdoor photoshoots',
      'Garden parties',
      'Outdoor workshops',
      'Nature-themed content creation',
      'Intimate ceremonies'
    ],
    hourlyRate: 80000, // ₦80,000
    durationOptions: [
      { hours: 2, label: '2 hours' },
      { hours: 4, label: '4 hours' },
      { hours: 8, label: 'Full day (8 hours)' }
    ],
    openingDays: 'Monday - Sunday (Weather Permitting)',
    openingHours: '9:00 AM - 7:00 PM'
  }
];

export const getSpaceBySlug = (slug: string): Space | undefined => {
  return spaces.find(space => space.slug === slug);
};

export const getSpaceById = (id: string): Space | undefined => {
  return spaces.find(space => space.id === id);
};