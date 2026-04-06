import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | The Social Atelier';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-neutral-50">
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div
        className="relative bg-primary-950 overflow-hidden"
        style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-primary-950" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-5"
          >
            <span className="block w-8 h-px bg-secondary-300 opacity-60" />
            <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
              Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-white mb-4"
            style={{
              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-md"
            style={{ fontSize: '1.05rem' }}
          >
            Have questions or need assistance? Our team is here to help.
          </motion.p>
        </div>
      </div>

      {/* ── CONTACT SECTION ──────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* ── Info column ── */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  Contact Info
                </span>
              </div>

              <h2
                className="text-primary-950 mb-8"
                style={{
                  fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                  fontWeight: 300,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Let's talk about your vision.
              </h2>

              <div className="space-y-7">
                {[
                  {
                    icon: <Mail size={16} />,
                    label: 'Email',
                    content: (
                      <a href="mailto:hello@socialatelierng.com" className="text-primary-600 hover:text-primary-800 transition-colors text-sm font-light">
                        hello@socialatelierng.com
                      </a>
                    ),
                  },
                  {
                    icon: <Phone size={16} />,
                    label: 'Phone',
                    content: (
                      <a href="tel:+2349031189697" className="text-primary-600 hover:text-primary-800 transition-colors text-sm font-light">
                        +234 903 118 9697
                      </a>
                    ),
                  },
                  {
                    icon: <MapPin size={16} />,
                    label: 'Visit',
                    content: (
                      <address className="not-italic text-neutral-600 font-light text-sm leading-relaxed">
                        Plot 59 Chuks Onyebuchi Drive<br />
                        Lekki Phase 1, Lagos State, Nigeria
                      </address>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-5">
                    <div className="w-9 h-9 border border-primary-200 flex items-center justify-center text-primary-800 shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="mt-10 pt-8 border-t border-neutral-200">
                <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-4">Business Hours</p>
                <ul className="space-y-2">
                  {[
                    { day: 'Tue – Sat', hours: '10:00 AM – 6:00 PM' },
                    { day: 'Sunday', hours: '1:00 PM – 6:00 PM' },
                  ].map((h) => (
                    <li key={h.day} className="flex justify-between text-sm font-light text-neutral-600">
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-4">Follow Us</p>
                <a
                  href="https://instagram.com/thesocialatelierng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-primary-800 text-sm font-light tracking-[0.1em] uppercase border-b border-primary-800/30 pb-1 hover:border-primary-800 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  @thesocialatelierng
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* ── Form column ── */}
            <motion.div
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  Send a Message
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm placeholder:text-neutral-300 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm placeholder:text-neutral-300 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm placeholder:text-neutral-300 transition-colors duration-200"
                      placeholder="+234 ..."
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm transition-colors duration-200 appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="info">General Information</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm placeholder:text-neutral-300 transition-colors duration-200 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 hover:scale-[1.02]"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE ──────────────────────────────────── */}
      <div className="h-[380px] overflow-hidden">
        <img
          src="https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg"
          alt="The Social Atelier"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ContactPage;
