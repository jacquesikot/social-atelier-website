import { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSpaceById, getSpaces } from '../data/spaces';
import { BookingFormData, Space } from '../types';
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

const inputClass =
  'w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-300 focus:border-primary-800 focus:outline-none text-primary-950 font-light text-sm placeholder:text-neutral-300 transition-colors duration-200';

const labelClass = 'block text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const initialSpaceId = searchParams.get('space') || '';

  const [formData, setFormData] = useState<BookingFormData>({
    spaceId: initialSpaceId,
    date: '',
    startTime: '',
    duration: 2,
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [allSpaces, setAllSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Book a Space | The Social Atelier';

    const loadSpaces = async () => {
      try {
        const spacesData = await getSpaces();
        setAllSpaces(spacesData);
        if (formData.spaceId) {
          const space = await getSpaceById(formData.spaceId);
          setSelectedSpace(space || null);
        }
      } catch (error) {
        console.error('Error loading spaces:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSpaces();
  }, [formData.spaceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'spaceId') {
      setSelectedSpace(allSpaces.find((s) => s.id === value) || null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request submitted! We will contact you shortly.');
    setFormData({ spaceId: '', date: '', startTime: '', duration: 2, name: '', email: '', phone: '', message: '' });
    setSelectedSpace(null);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-px h-12 bg-primary-950 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div
        className="relative bg-primary-950 overflow-hidden"
        style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/73TEHG9mEcoPeuu6SC5psB/6efa39aded5f6e7e811b2f522e412df2/WhatsApp_Image_2025-07-22_at_10.23.44_PM__2_.jpeg"
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
              Reserve Your Space
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
            Book Your Space
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-md"
            style={{ fontSize: '1.05rem' }}
          >
            Complete the form below to reserve one of our curated spaces.
          </motion.p>
        </div>
      </div>

      {/* ── BOOKING FORM ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* ── Form ── */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Space selection */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="block w-6 h-px bg-primary-800 opacity-40" />
                    <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                      Select a Space
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {allSpaces.map((space) => (
                      <label
                        key={space.id}
                        className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200 ${
                          formData.spaceId === space.id
                            ? 'border-primary-800 bg-primary-50/50'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="spaceId"
                          value={space.id}
                          checked={formData.spaceId === space.id}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        <div className="w-12 h-12 overflow-hidden shrink-0">
                          <img src={space.mainImage} alt={space.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-primary-950 text-sm truncate"
                            style={{ fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif", fontWeight: 300 }}
                          >
                            {space.name}
                          </p>
                          <p className="text-primary-600 text-xs font-light">
                            {formatCurrency(space.hourlyRate)}/hr
                          </p>
                        </div>
                        {formData.spaceId === space.id && (
                          <div className="ml-auto shrink-0 w-4 h-4 bg-primary-800 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Booking details */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="block w-6 h-px bg-primary-800 opacity-40" />
                    <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                      Session Details
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label htmlFor="date" className={labelClass}>Date *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="startTime" className={labelClass}>Start Time *</label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="duration" className={labelClass}>Duration *</label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none`}
                      >
                        {selectedSpace?.durationOptions.map((opt) => (
                          <option key={opt.hours} value={opt.hours}>{opt.label}</option>
                        )) || (
                          <>
                            <option value={2}>2 hours</option>
                            <option value={4}>4 hours</option>
                            <option value={8}>Full day (8 hours)</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personal info */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="block w-6 h-px bg-primary-800 opacity-40" />
                    <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                      Your Information
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="phone" className={labelClass}>Phone (preferably WhatsApp) *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+234 ..."
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="message" className={labelClass}>Additional Details</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your project or any special requirements..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 hover:scale-[1.02]"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                {/* Selected space preview */}
                {selectedSpace ? (
                  <div className="mb-8">
                    <div className="aspect-[4/3] overflow-hidden mb-5">
                      <img
                        src={selectedSpace.mainImage}
                        alt={selectedSpace.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3
                      className="text-primary-950 mb-1"
                      style={{
                        fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                        fontWeight: 300,
                        fontSize: '1.1rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {selectedSpace.name}
                    </h3>
                    <p className="text-primary-600 text-sm font-light mb-2">
                      {formatCurrency(selectedSpace.hourlyRate)}/hr
                    </p>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed">
                      {selectedSpace.shortDescription}
                    </p>
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <p className="text-neutral-500 text-sm font-light">{selectedSpace.openingDays}</p>
                      <p className="text-neutral-500 text-sm font-light">{selectedSpace.openingHours}</p>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-neutral-300 p-8 text-center mb-8">
                    <p className="text-neutral-400 text-sm font-light">Select a space to see details.</p>
                  </div>
                )}

                {/* Process */}
                <div className="border border-neutral-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block w-6 h-px bg-primary-800 opacity-40" />
                    <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                      Booking Process
                    </span>
                  </div>
                  <ol className="space-y-4">
                    {[
                      'Submit your booking request',
                      'Receive availability confirmation within 24 hrs',
                      'Pay the deposit to secure your session',
                      'Receive visit details and arrival guide',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4 text-sm text-neutral-600 font-light">
                        <span className="text-primary-800/50 text-xs font-medium w-4 shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <p className="text-neutral-400 text-xs tracking-[0.1em] uppercase mb-2 font-light">
                      Cancellation
                    </p>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed">
                      Free cancellation up to 48 hours before your session. Within 48 hours, a 50% fee applies.
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-100">
                    <p className="text-neutral-500 text-sm font-light">
                      Questions?{' '}
                      <NavLink to="/contact" className="text-primary-600 hover:text-primary-800 transition-colors">
                        Contact us
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
