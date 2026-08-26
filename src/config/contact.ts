/**
 * Single source of truth for how visitors reach us.
 *
 * Bookings and enquiries are handled over WhatsApp rather than a backend:
 * the forms format what the visitor typed into a prefilled chat, so nothing
 * is captured and silently dropped.
 */

/** Business WhatsApp number, digits only — the format wa.me expects. */
export const WHATSAPP_NUMBER = '2349031189697';

/** Same number, formatted for display and `tel:` links. */
export const PHONE_DISPLAY = '+234 903 118 9697';
export const PHONE_E164 = '+2349031189697';

export const CONTACT_EMAIL = 'hello@thesocialatelierng.com';
export const INSTAGRAM_HANDLE = '@thesocialatelierng';

/**
 * Build a wa.me link with a prefilled message.
 *
 * Blank lines are meaningful here — WhatsApp preserves them, which keeps a
 * long booking summary readable in the chat.
 */
export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/**
 * Open WhatsApp in a new tab.
 *
 * `noopener` is set because `window.open` otherwise hands the opened tab a
 * reference back to this one.
 */
export const openWhatsApp = (message: string): void => {
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
};

/** Drop empty optional fields so the message has no dangling labels. */
const compose = (lines: (string | false | null | undefined)[]): string =>
  lines.filter((line): line is string => typeof line === 'string').join('\n');

interface BookingMessageInput {
  spaceName: string;
  date: string;
  startTime: string;
  durationLabel: string;
  total?: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export const bookingMessage = ({
  spaceName,
  date,
  startTime,
  durationLabel,
  total,
  name,
  email,
  phone,
  notes,
}: BookingMessageInput): string =>
  compose([
    "Hi The Social Atelier, I'd like to book a space.",
    '',
    `Space: ${spaceName}`,
    `Date: ${date}`,
    `Time: ${startTime}`,
    `Duration: ${durationLabel}`,
    total && `Estimated total: ${total}`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    notes && notes.trim() && '',
    notes && notes.trim() && `Notes: ${notes.trim()}`,
  ]);

interface EnquiryMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const enquiryMessage = ({
  name,
  email,
  phone,
  subject,
  message,
}: EnquiryMessageInput): string =>
  compose([
    'Hi The Social Atelier,',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    phone && phone.trim() && `Phone: ${phone.trim()}`,
    subject && subject.trim() && `Subject: ${subject.trim()}`,
    '',
    message.trim(),
  ]);

/** Opening message for the floating chat button, where there is no form. */
export const GENERAL_ENQUIRY_MESSAGE =
  "Hello! I'm interested in learning more about your creative spaces.";

/** Opening message for a space page, so we know which space prompted the chat. */
export const spaceEnquiryMessage = (spaceName: string): string =>
  `Hello! I'd like to know more about ${spaceName} — availability and pricing.`;
