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
  bookingDuration?: number;
  durationOptions: {
    hours: number;
    label: string;
  }[];
  openingDays: string;
  openingHours: string;
  /**
   * Session pricing, for spaces sold as a fixed block rather than by the hour.
   *
   * The Podloft is quoted as "₦150,000 for a 2-hour session", not as an hourly
   * rate — and its recording-support option adds a flat amount to that session
   * rather than to each hour. `hourlyRate` is still set (session price ÷
   * hours), because the booking form multiplies it to estimate a total and
   * every other surface reads it; this block is what lets the UI *say* the
   * honest thing instead of deriving a per-hour figure the space is not
   * actually sold by.
   *
   * Absent on hourly spaces, which is all of them but this one.
   */
  session?: {
    /** Length of one session, in hours. */
    hours: number;
    /** Price of one session, in naira. */
    price: number;
    /** Optional paid extra, e.g. microphones and an engineer. */
    addOn?: {
      label: string;
      /** Total session price *with* the add-on, not the increment. */
      price: number;
      /** What the add-on actually includes. */
      description: string;
    };
  };
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

export interface BlogImage {
  url: string;
  alt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Rich text from Webflow, already HTML. */
  body: string;
  mainImage: BlogImage | null;
  thumbnailImage: BlogImage | null;
  featured: boolean;
  author: string;
  publishedDate: string | null;
}

/**
 * A room offered as part of a service.
 *
 * Rooms are not re-described per service: the CMS stores only the slug of an
 * existing space, and the service page reads the name, image and rate from
 * src/data/spaces.ts so a rate change never has to be chased across pages.
 * `note` is the one service-specific line — the same room reads differently
 * for a baby shower than for a product shoot.
 */
export interface ServiceRoom {
  spaceSlug: string;
  /** Optional service-specific framing, e.g. "seats 40 for a seated lunch". */
  note?: string;
}

/** A real booking written up as proof, held on the service page itself. */
export interface ServiceCaseStudy {
  title: string;
  /** Who it was for — "a beauty brand", "the Adeyemi family". */
  client: string;
  /** Which of our spaces it happened in, for the label. */
  spaceName: string;
  /**
   * Shots from the booking, shown as a carousel. A single image renders as a
   * plain image with no controls; an empty list drops the media column and
   * the story runs full width.
   */
  images: ServiceImage[];
  /** One or two paragraphs of plain text — the brief, and how it ran. */
  story: string;
  /** The concrete result: "3,000 sq ft of content in a 4-hour block". */
  outcome: string;
}

export interface ServiceFaq {
  question: string;
  /** Plain text, so it can go straight into FAQPage JSON-LD. */
  answer: string;
}

export interface ServiceImage {
  url: string;
  alt: string;
}

export interface ServicePage {
  id: string;
  /** Display name, e.g. "Photoshoot Studio Rental". */
  title: string;
  slug: string;
  /** The h1, which carries the keyword: "Photoshoot Studio Rental in Lekki, Lagos". */
  heading: string;
  /** One sentence under the h1, and the meta description. */
  intro: string;
  heroImage: ServiceImage | null;
  /** Rich text from Webflow, already HTML — the long-form body. */
  body: string;
  /** Lowest and highest hourly rate across the service's rooms, in naira. */
  priceFrom: number | null;
  capacityMin: number | null;
  capacityMax: number | null;
  /** Typical booking length, e.g. "2–8 hours". */
  durationRange: string;
  /**
   * The service named as a verb phrase, for sentences: "a photoshoot", "an
   * event". Kept separate from `title` because lowercasing the title mid
   * sentence reads badly ("book photoshoot studio rental?").
   */
  nounPhrase: string;
  rooms: ServiceRoom[];
  useCases: string[];
  inclusions: string[];
  caseStudies: ServiceCaseStudy[];
  faqs: ServiceFaq[];
  /** Slugs of other services to cross-link at the foot of the page. */
  relatedServiceSlugs: string[];
  featured: boolean;
}
