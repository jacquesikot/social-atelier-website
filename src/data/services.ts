import { ServicePage } from '../types';
import { getSpaceBySlugSync } from './spaces';

/**
 * DEMO DATA — service pages, pending the Webflow CMS collection.
 *
 * This file stands in for what scripts/fetch-services.mjs will write to
 * src/data/services.json once the Services collection exists in Webflow. It is
 * shaped exactly like the CMS output so swapping the source is a one-line
 * change in this module, not a rewrite of the page.
 *
 * The content below is a realistic sample written to the same structure every
 * service page will follow, so the design can be reviewed against real-length
 * copy rather than lorem ipsum.
 */
const demoServices: ServicePage[] = [
  {
    id: 'demo-photoshoot',
    title: 'Photoshoot Studio Rental',
    slug: 'photoshoot-studio-rental-lekki',
    heading: 'Photoshoot Studio Rental in Lekki, Lagos',
    intro:
      'Six individually designed shoot rooms in one building on Lekki Phase 1 — book by the hour, move between sets in the same session, and shoot a full campaign without a single location change.',
    heroImage: {
      url: 'https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg',
      alt: 'Nue Ville, a minimalist nude-toned photo studio at The Social Atelier in Lekki',
    },
    body: `<h2>What you are booking</h2>
<p>A photoshoot booking at The Social Atelier gives you the room, the light and the furniture in it, for the block of time you reserve. Most clients book a single room for two to four hours; editorial and campaign shoots take two or three rooms for a full day, which is how you get five different looks out of one call sheet.</p>
<p>Every room is dressed and ready — there is no build day, no set construction and no truck of props to hire. You arrive, you shoot, you leave. What changes between rooms is the palette and the architecture: a nude-toned minimalist wall in Nue Ville, a vaulted European hallway in The Archway, a Parisian lounge in Maison Paris, a working kitchen in The Creperie.</p>
<h2>Natural light, and what to do when it runs out</h2>
<p>The building faces east, so Maison Paris, Nue Ville and The Creperie hold soft, usable window light from about 9am until early afternoon. Bain &amp; Bubbles and The Piano Room are interior rooms and are lit for continuous shooting at any hour. If you are shooting to a strict look, book the morning block for the window rooms and the afternoon for the interiors — that sequencing is the single biggest thing that separates a smooth shoot day here from a rushed one.</p>
<p>You are welcome to bring your own strobes, modifiers, C-stands and backdrops. There are 13A sockets on every wall and the circuits will carry a two-head strobe kit without a generator.</p>
<h2>Who shoots here</h2>
<p>Beauty and skincare brands shooting product and model work in the same session. Fashion labels shooting lookbooks across multiple sets. Photographers running paid portrait days and needing three backdrops without three locations. Content creators batching a month of posts. Agencies shooting brand campaigns where the deliverable is forty assets, not four.</p>`,
    priceFrom: 50000,
    capacityMin: 2,
    capacityMax: 15,
    durationRange: '2–8 hours',
    nounPhrase: 'a photoshoot',
    rooms: [
      {
        spaceSlug: 'nue-ville',
        note: 'The default choice for product, beauty and e-commerce — neutral walls mean nothing in frame fights your brand colours.',
      },
      {
        spaceSlug: 'maison-paris',
        note: 'Best window light in the building until about 2pm. Vintage seating works for seated portraits and interview setups.',
      },
      {
        spaceSlug: 'the-archway',
        note: 'The dramatic option: a vaulted hallway that reads as European architecture. Full-length fashion and movement shots.',
      },
      {
        spaceSlug: 'the-creperie',
        note: 'A working kitchen, so food is cooked and shot in the same room. Marble island doubles as a flat-lay surface.',
      },
      {
        spaceSlug: 'bain-bubbles',
        note: 'Vanity lighting built for beauty close-ups. Jacuzzi and walk-in closet for skincare and self-care narratives.',
      },
      {
        spaceSlug: 'the-piano-room',
        note: 'The hero set — grand piano, chandelier, ballroom scale. Booked most often for covers and campaign key art.',
      },
    ],
    useCases: [
      'Beauty and skincare campaigns',
      'Fashion lookbooks and editorial',
      'Product and e-commerce photography',
      'Portrait and headshot days',
      'Food and beverage photography',
      'Content batching for creators',
      'Brand campaign key art',
      'Pre-wedding and bridal portraits',
    ],
    inclusions: [
      'Exclusive use of the room for your booked block',
      'All existing furniture, styling and props in the room',
      'Power on every wall for strobes and continuous lighting',
      'Fast WiFi for tethered shooting and live client review',
      'Changing area and mirror',
      'Climate control in every interior room',
      'Parking for up to four vehicles on site',
      'A member of the team on site for the whole booking',
    ],
    caseStudies: [
      {
        title: 'A skincare launch shot across three rooms in one day',
        client: 'A Lagos skincare brand',
        spaceName: 'Nue Ville, Bain & Bubbles and The Creperie',
        images: [
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/5nxkLuH37DAXSsDPWd6ZWb/cd99552d2bb7dfdbe4e8d59ec0372cba/WhatsApp_Image_2025-07-22_at_10.23.38_PM__1_.jpeg',
            alt: 'Bain & Bubbles, the vanity and jacuzzi room used for the beauty close-ups',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg',
            alt: 'Nue Ville, where the product stills for the launch were shot',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/4WUj7CaDAyLNxWN5kFy4HW/3eb4d42bfc0cde8d26f4f7f737141fbb/WhatsApp_Image_2025-07-22_at_10.23.39_PM__3_.jpeg',
            alt: 'The Creperie, used for the lifestyle set on the same shoot day',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/6lkk7FsrC7ENWnfnmu42Oz/83bbdce8504798080cb31a4954359da8/WhatsApp_Image_2025-07-22_at_10.23.42_PM__4_.jpeg',
            alt: 'A second angle in Bain & Bubbles used for application shots',
          },
        ],
        story:
          'The brand had a launch date eleven days out and needed product stills, model application shots and a lifestyle set for paid social — normally three separate location days. They booked a full day across three of our rooms and shot all of it in one call sheet, moving the model and the lighting kit down one corridor between setups instead of across Lagos.',
        outcome: 'Six weeks of paid social and full e-commerce imagery delivered from a single 8-hour booking.',
      },
      {
        title: 'A photographer running a paid portrait day',
        client: 'An independent portrait photographer',
        spaceName: 'Maison Paris and The Archway',
        images: [
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/usqCYLpO8UO4fwfIMQOHn/b65c216d284a48d498aafee284e93e33/WhatsApp_Image_2025-07-22_at_10.23.36_PM.jpeg',
            alt: 'The Archway, a vaulted hallway used for the dramatic full-length portraits',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg',
            alt: 'Maison Paris, used for the window-light half of each sitting',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/32wVhQ0g6cTZh7NEVtqW6K/c133d7f2a5aa039d819c812ff447b478/WhatsApp_Image_2025-07-22_at_10.23.38_PM__2_.jpeg',
            alt: 'A second angle in The Archway showing the full length of the hallway',
          },
        ],
        story:
          'She sells a portrait package with three distinct looks and had been paying for three separate studio hires to deliver it. She now books Maison Paris for the window-light half of the session and walks clients into The Archway for the dramatic frames, in a single four-hour block.',
        outcome: 'Eight sitters in one day, three looks each, from one booking instead of three hires.',
      },
      {
        title: 'A month of creator content batched in an afternoon',
        client: 'A beauty and lifestyle creator',
        spaceName: 'The Piano Room and Nue Ville',
        images: [
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/73TEHG9mEcoPeuu6SC5psB/6efa39aded5f6e7e811b2f522e412df2/WhatsApp_Image_2025-07-22_at_10.23.44_PM__2_.jpeg',
            alt: 'The Piano Room, an opulent ballroom-style space with a grand piano and chandelier',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/1cvfX2zHDNqqZxdmJcL9Pw/c32b3b66dbc457985735ed54b7dd72f8/tsa-piano-room-3.png',
            alt: 'A wider frame of The Piano Room used for the month of posts',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/7gY3Mt0n4h019mBBM1EfwA/cb583555f7c075d331c7d7860033b6f8/WhatsApp_Image_2025-07-22_at_10.23.39_PM.jpeg',
            alt: 'Nue Ville, the second backdrop used in the same afternoon block',
          },
        ],
        story:
          'Shooting at home meant every post looked the same and every shoot day started with clearing a living room. She books a four-hour afternoon block once a month, shoots against two completely different backdrops, and leaves with enough footage and stills to schedule four weeks of posts.',
        outcome: 'Around 30 posts per booking, with no set-up or tear-down time.',
      },
    ],
    faqs: [
      {
        question: 'How much does it cost to rent a photo studio in Lekki?',
        answer:
          'At The Social Atelier, photoshoot rooms start at ₦50,000 per hour for The Archway and run to ₦150,000 per hour for The Piano Room. Most rooms sit between ₦75,000 and ₦95,000 per hour. You book in 2-hour, 4-hour or full-day (8-hour) blocks, and the rate covers exclusive use of the room with all of its furniture and styling.',
      },
      {
        question: 'Can I book more than one room in the same session?',
        answer:
          'Yes, and it is the most common way campaigns shoot here. Each room is charged at its own hourly rate for the time you hold it. Because the rooms are in one building you can move a model and a lighting kit between sets in a few minutes rather than relocating.',
      },
      {
        question: 'Do you provide lighting and photography equipment?',
        answer:
          'The rooms are lit for shooting — natural window light in Maison Paris, Nue Ville and The Creperie, and continuous lighting in the interior rooms — but we do not rent out cameras, strobes or modifiers. Most clients bring their own kit. There is power on every wall, and the circuits handle a two-head strobe setup without a generator.',
      },
      {
        question: 'How many people can I bring to a photoshoot?',
        answer:
          'Between 2 and 15 people depending on the room. The smaller sets such as Bain & Bubbles are comfortable for a crew of 2 to 5; The Piano Room and The Archway take a full crew of 12 to 15 including talent, glam and clients.',
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'A week is comfortable for a single room on a weekday. Weekends and full-day multi-room bookings go two to three weeks ahead, and December books out furthest in advance. If your date is tight, message us on WhatsApp — we hold cancellations and can often place a shoot the same week.',
      },
      {
        question: 'What are your opening hours for shoots?',
        answer:
          'Tuesday to Saturday, 10:00 AM to 6:00 PM, and Sunday from 1:00 PM to 6:00 PM. If your shoot needs to start earlier or run past closing, ask — out-of-hours bookings are possible and priced separately.',
      },
      {
        question: 'Can I bring my own props, backdrops and furniture?',
        answer:
          'Yes. Bring what you need, set it up within your booked time, and take it with you at the end. The only limits are that nothing may be fixed to the walls, floors or ceilings, and our own furniture and styling stay in the room.',
      },
      {
        question: 'Is there parking, and where exactly are you?',
        answer:
          'We are at Plot 59 Chuks Onyebuchi Drive, Lekki Phase 1, Lagos, with on-site parking for up to four vehicles. Larger crews usually carpool or park on the street directly outside.',
      },
    ],
    relatedServiceSlugs: ['event-space-rental-lekki'],
    featured: true,
  },
  {
    id: 'demo-events',
    title: 'Event Space Rental',
    slug: 'event-space-rental-lekki',
    heading: 'Event Space Rental in Lekki, Lagos',
    intro:
      'An intimate indoor event room and a garden gazebo for bridal showers, private dinners, launches and workshops — for 20 to 80 guests, on Lekki Phase 1.',
    heroImage: {
      url: 'https://images.ctfassets.net/g1pxcpqorahb/21QSKot59kNpCsWFy8foaB/3faac807ee126b188aee993f06c8e1a5/WhatsApp_Image_2025-07-22_at_10.23.45_PM__1_.jpeg',
      alt: 'Lauren Fair, the intimate indoor event space at The Social Atelier',
    },
    body: `<h2>What you are booking</h2>
<p>Two event spaces that can be used on their own or together: Lauren Fair, an elegant indoor room that seats a private dinner or hosts a shower, and Miguel &amp; Moss Garden, a flower-dressed gazebo for daytime and early-evening events. Booked together they give you an indoor room and an outdoor space at the same address — which is what you want in Lagos, where the weather decides late.</p>
<h2>Who hosts here</h2>
<p>Bridal and baby showers, milestone birthdays, product launches, brand dinners, intimate workshops and small corporate offsites. The scale is deliberate: this is a space for 20 to 80 people who should be able to hear each other, not a 300-guest hall.</p>`,
    priceFrom: 250000,
    capacityMin: 20,
    capacityMax: 80,
    durationRange: '4–8 hours',
    nounPhrase: 'an event',
    rooms: [
      {
        spaceSlug: 'lauren-fair',
        note: 'The indoor room. Seats about 40 for a seated dinner, or 60 standing for a reception.',
      },
      {
        spaceSlug: 'miguel-moss-garden',
        note: 'The garden gazebo. Best for daytime showers and golden-hour receptions; string lights for the evening.',
      },
    ],
    useCases: [
      'Bridal and baby showers',
      'Milestone birthday dinners',
      'Product launches and press previews',
      'Brand dinners',
      'Workshops and masterclasses',
      'Small corporate offsites',
    ],
    inclusions: [
      'Exclusive use of the space for your booked block',
      'Tables, seating and existing decor',
      'Sound system',
      'Kitchenette for caterers',
      'String lighting in the garden',
      'On-site parking',
      'A member of the team on site throughout',
    ],
    caseStudies: [
      {
        title: 'A 45-guest bridal shower that moved indoors at 4pm',
        client: 'A Lagos bride and her planner',
        spaceName: 'Miguel & Moss Garden and Lauren Fair',
        images: [
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/2GPPNzKmkoYkJwoSUIEb2N/4026710b30fdab773839fe27b6ba2f24/WhatsApp_Image_2025-07-22_at_10.23.40_PM__2_.jpeg',
            alt: 'Miguel & Moss Garden, the flower-dressed gazebo where the shower began',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/4McRX9TJeSsXIGu8p5GrSU/e6a472ecb15d82a349a1a79b92317529/WhatsApp_Image_2025-07-22_at_10.23.41_PM.jpeg',
            alt: 'The garden set for a seated daytime gathering',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/21QSKot59kNpCsWFy8foaB/3faac807ee126b188aee993f06c8e1a5/WhatsApp_Image_2025-07-22_at_10.23.45_PM__1_.jpeg',
            alt: 'Lauren Fair, the indoor room the party moved into when the rain came',
          },
        ],
        story:
          'The plan was a garden shower with a photo corner in the gazebo. Rain arrived at four. Because the booking covered both spaces, the party walked indoors into Lauren Fair in about ten minutes and carried on — cake, speeches and all — with no scramble for a backup venue.',
        outcome: 'A full afternoon event delivered through a weather change, at one address.',
      },
      {
        title: 'A press preview for a fragrance launch',
        client: 'A fragrance brand',
        spaceName: 'Lauren Fair',
        images: [
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/1TpyJAFuWZGqiKadgdZOLd/436d33ed178bc250e302e883fee8441f/WhatsApp_Image_2025-07-22_at_10.23.42_PM.jpeg',
            alt: 'Lauren Fair dressed for an evening reception',
          },
          {
            url: 'https://images.ctfassets.net/g1pxcpqorahb/3jA33WuIMDcAng1EPO7Pzq/31f9efc208dd1b0844b2af77e5451fe5/WhatsApp_Image_2025-07-22_at_10.23.44_PM__3_.jpeg',
            alt: 'The room laid out for the 30-person press preview',
          },
        ],
        story:
          'They needed a room that looked like the brand for a 30-person press and creator preview, and content from the same evening. They hosted in Lauren Fair and used the adjoining photo rooms for shots of the product before guests arrived.',
        outcome: 'Event and launch content captured in a single 5-hour booking.',
      },
    ],
    faqs: [
      {
        question: 'How much does an event space in Lekki cost?',
        answer:
          'Miguel & Moss Garden is ₦250,000 per hour and Lauren Fair is ₦400,000 per hour, booked in 4-hour or full-day blocks. Most showers and dinners run as a 4-hour booking of one space.',
      },
      {
        question: 'How many guests can you seat?',
        answer:
          'Between 20 and 80 depending on the space and the layout. Lauren Fair seats around 40 for a seated dinner or 60 standing; the garden holds about 80 standing for a daytime event.',
      },
      {
        question: 'Can we bring our own caterer and decorator?',
        answer:
          'Yes. There is a kitchenette for caterers to plate from, and decorators are welcome within your booked time. Nothing may be fixed to the walls, floors or ceilings.',
      },
      {
        question: 'What happens if it rains during a garden event?',
        answer:
          'Book both spaces and you have an indoor room on standby at the same address. Clients who do this move a whole event inside in about ten minutes.',
      },
    ],
    relatedServiceSlugs: ['photoshoot-studio-rental-lekki'],
    featured: true,
  },
];

export const services = demoServices;

export const getServiceBySlug = (slug: string): ServicePage | undefined =>
  services.find((service) => service.slug === slug);

/**
 * Resolve a service's room references against the space data.
 *
 * Silently drops a slug that matches no space: a typo in the CMS should leave
 * one room off the page, not blank the whole section.
 */
export const getServiceRooms = (service: ServicePage) =>
  service.rooms
    .map((room) => ({ ...room, space: getSpaceBySlugSync(room.spaceSlug) }))
    .filter((room): room is typeof room & { space: NonNullable<typeof room.space> } => Boolean(room.space));

export const getRelatedServices = (service: ServicePage): ServicePage[] =>
  service.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServicePage => Boolean(s) && s!.slug !== service.slug);

/** Naira, no decimals — matches how rates are shown on space pages. */
export const formatNaira = (amount: number): string =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
