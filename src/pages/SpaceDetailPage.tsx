import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getSpaceBySlug } from '../data/spaces';
import { Space } from '../types';
import { spaceEnquiryMessage, whatsappLink } from '../config/contact';

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

const SpaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadSpace = async () => {
      if (id) {
        try {
          const spaceData = await getSpaceBySlug(id);
          setSpace(spaceData || null);
          if (spaceData) {
            document.title = `${spaceData.name} | The Social Atelier`;
            setActiveImage(spaceData.mainImage);
          } else {
            document.title = 'Space Not Found | The Social Atelier';
          }
        } catch (error) {
          console.error('Error loading space:', error);
          document.title = 'Space Not Found | The Social Atelier';
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadSpace();

    // Listen for spaces updates
    const handleSpacesUpdate = () => {
      console.log('[SpaceDetailPage] Detected spaces update, reloading...');
      loadSpace();
    };

    window.addEventListener('spaces-updated', handleSpacesUpdate);
    return () => window.removeEventListener('spaces-updated', handleSpacesUpdate);
  }, [id]);

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

  if (!space) {
    return (
      <div className="pt-24 min-h-screen bg-neutral-50 flex flex-col items-center justify-center text-center px-4">
        <h1
          className="text-primary-950 mb-4"
          style={{
            fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
          }}
        >
          Space Not Found
        </h1>
        <p className="text-neutral-500 font-light mb-8">The space you're looking for doesn't exist or may have been moved.</p>
        <NavLink
          to="/spaces"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800"
        >
          View All Spaces
        </NavLink>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      {/* ── HERO IMAGE ───────────────────────────────────────── */}
      <div className="relative h-[65vh] overflow-hidden">
        <motion.img
          key={activeImage}
          src={activeImage}
          alt={space.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-24">
          <div className="container-custom">
            <NavLink
              to="/spaces"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs tracking-[0.15em] uppercase font-light transition-colors duration-200"
            >
              <ChevronLeft size={14} />
              All Spaces
            </NavLink>
          </div>
        </div>

        {/* Space name overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="container-custom">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-light">
                {space.type === 'event' ? 'Event Space' : 'Photography Studio'}
              </span>
              <h1
                className="text-white mt-2"
                style={{
                  fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                }}
              >
                {space.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* ── Main column ── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            {/* Description */}
            <p
              className="text-primary-900/65 font-light leading-relaxed mb-12"
              style={{ fontSize: '1.1rem' }}
            >
              {space.description}
            </p>

            {/* Features + Use cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 border-t border-neutral-200 pt-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-6 h-px bg-primary-800 opacity-40" />
                  <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                    Features
                  </span>
                </div>
                <ul className="space-y-3">
                  {space.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-700 font-light text-sm">
                      <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-6 h-px bg-primary-800 opacity-40" />
                  <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">
                    Ideal For
                  </span>
                </div>
                <ul className="space-y-3">
                  {space.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-700 font-light text-sm">
                      <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-6 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">Gallery</span>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {space.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-20 h-20 overflow-hidden transition-all duration-200 ${
                      activeImage === img ? 'ring-2 ring-primary-800 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${space.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {space.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer overflow-hidden aspect-square"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setModalImageIndex(index);
                      setModalOpen(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${space.name} - ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="sticky top-24 border border-neutral-200 bg-white p-8">
              {/* Pricing */}
              <div className="mb-8 pb-8 border-b border-neutral-100">
                <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-2">Starting from</p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-primary-950"
                    style={{
                      fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                      fontWeight: 300,
                      fontSize: '2rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {formatCurrency(space.hourlyRate)}
                  </span>
                  <span className="text-neutral-400 font-light text-sm">/hr</span>
                </div>
              </div>

              {/* Hours info */}
              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <Clock size={15} className="text-primary-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">Opening Hours</p>
                    <p className="text-neutral-700 font-light text-sm">{space.openingHours}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Calendar size={15} className="text-primary-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">Available Days</p>
                    <p className="text-neutral-700 font-light text-sm">{space.openingDays}</p>
                  </div>
                </div>
              </div>

              {/* CTA — carry the chosen space into the booking form */}
              <NavLink
                to={`/booking?space=${space.id}`}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 mb-3"
              >
                Book This Space
              </NavLink>

              <a
                href={whatsappLink(spaceEnquiryMessage(space.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-neutral-300 text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:border-primary-800 mb-4"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Ask on WhatsApp
              </a>

              <p className="text-neutral-400 text-xs text-center font-light">
                Questions?{' '}
                <NavLink to="/contact" className="text-primary-600 hover:text-primary-800 transition-colors">
                  Contact us
                </NavLink>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── IMAGE MODAL ──────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>

            {space.images.length > 1 && (
              <>
                <button
                  onClick={() => setModalImageIndex((prev) => (prev - 1 + space.images.length) % space.images.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/60 hover:text-white transition-colors hidden sm:block"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => setModalImageIndex((prev) => (prev + 1) % space.images.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/60 hover:text-white transition-colors hidden sm:block"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.img
              key={modalImageIndex}
              src={space.images[modalImageIndex]}
              alt={`${space.name} - ${modalImageIndex + 1}`}
              className="max-w-full max-h-[88vh] object-contain mx-auto block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.15em] uppercase">
              {modalImageIndex + 1} / {space.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceDetailPage;
