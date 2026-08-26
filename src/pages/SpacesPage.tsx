import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getSpaces, spaces as fallbackSpaces } from '../data/spaces';
import { Space } from '../types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const categories = [
  { id: 'all', label: 'All Spaces' },
  { id: 'photo', label: 'Photography' },
  { id: 'event', label: 'Events' },
];

const SpacesPage = () => {
  const [filter, setFilter] = useState('all');
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(fallbackSpaces);
  const [allSpaces, setAllSpaces] = useState<Space[]>(fallbackSpaces);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Spaces | The Social Atelier';

    const loadSpaces = async () => {
      try {
        const spacesData = await getSpaces();
        setAllSpaces(spacesData);
        setFilteredSpaces(spacesData);
      } catch (error) {
        console.error('Error loading spaces:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSpaces();

    // Listen for spaces updates
    const handleSpacesUpdate = () => {
      console.log('[SpacesPage] Detected spaces update, reloading...');
      loadSpaces();
    };

    window.addEventListener('spaces-updated', handleSpacesUpdate);
    return () => window.removeEventListener('spaces-updated', handleSpacesUpdate);
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredSpaces(allSpaces);
      return;
    }
    setFilteredSpaces(allSpaces.filter((s) => s.type === filter));
  }, [filter, allSpaces]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-neutral-50">
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div className="relative bg-primary-950 overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
        {/* subtle background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/usqCYLpO8UO4fwfIMQOHn/b65c216d284a48d498aafee284e93e33/WhatsApp_Image_2025-07-22_at_10.23.36_PM.jpeg"
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
              The Collection
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
            Our Spaces
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            {allSpaces.length} distinct rooms, each designed with intention. Every space is a world of
            its own.
          </motion.p>
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-neutral-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-6">
            <span className="text-neutral-400 text-xs tracking-[0.15em] uppercase font-light hidden sm:block">
              Filter
            </span>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-5 py-2 text-xs tracking-[0.1em] uppercase font-medium transition-all duration-200 ${
                    filter === cat.id
                      ? 'bg-primary-950 text-white'
                      : 'bg-transparent text-neutral-500 hover:text-primary-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SPACES GRID ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 aspect-[3/4] mb-4" />
                  <div className="h-3 bg-neutral-200 rounded mb-2 w-1/2" />
                  <div className="h-3 bg-neutral-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredSpaces.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredSpaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.07,
                      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                    }}
                    className="group"
                  >
                    <NavLink to={`/spaces/${space.slug}`} className="block">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[3/4] mb-5">
                        <img
                          src={space.mainImage}
                          alt={space.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase">
                            View Space
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                        {/* Type badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] tracking-[0.15em] uppercase">
                            {space.type === 'event' ? 'Events' : 'Photography'}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-baseline justify-between mb-2">
                          <h3
                            className="text-primary-950 group-hover:text-primary-700 transition-colors duration-300"
                            style={{
                              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                              fontWeight: 300,
                              fontSize: '1.1rem',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {space.name}
                          </h3>
                          <span className="text-primary-600 text-xs font-medium tracking-wide">
                            {formatCurrency(space.hourlyRate)}<span className="text-neutral-400 font-light">/hr</span>
                          </span>
                        </div>
                        <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-2">
                          {space.shortDescription}
                        </p>
                      </div>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-500 font-light mb-6">No spaces found for this filter.</p>
              <button
                onClick={() => setFilter('all')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800"
              >
                View All Spaces
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section className="bg-secondary-300 py-16 lg:py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-primary-950 mb-5"
            style={{
              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Not sure which space is right for you?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-primary-900/60 font-light mb-8 max-w-md mx-auto"
          >
            Reach out and we'll help you find the perfect match for your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 hover:scale-[1.02]"
            >
              Get in Touch
            </NavLink>
            <NavLink
              to="/booking"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary-950/30 text-primary-950 text-sm font-light tracking-[0.08em] uppercase transition-all duration-300 hover:border-primary-950 hover:bg-primary-950/5"
            >
              Book Directly
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpacesPage;
