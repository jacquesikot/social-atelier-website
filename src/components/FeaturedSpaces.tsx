import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { getSpaces, spaces as fallbackSpaces } from '../data/spaces';
import { Space } from '../types';
import { useEffect, useState } from 'react';

interface FeaturedSpacesProps {
  minimal?: boolean;
}

const FeaturedSpaces = ({ minimal = false }: FeaturedSpacesProps) => {
  const [featuredSpaces, setFeaturedSpaces] = useState<Space[]>(fallbackSpaces.slice(0, 3));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const spacesData = await getSpaces();
        setFeaturedSpaces(spacesData.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured spaces:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSpaces();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  if (loading) {
    return (
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-neutral-200 aspect-[3/4] mb-4" />
              <div className="h-3 bg-neutral-200 rounded mb-2 w-1/2" />
              <div className="h-3 bg-neutral-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (minimal) {
    return (
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSpaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
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
                  {/* Hover overlay CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase">
                      View Space
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
        </div>
      </div>
    );
  }

  /* Default (non-minimal) for other pages */
  return (
    <section className="section bg-neutral-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Spaces
          </motion.h2>
          <motion.p
            className="text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our most popular rooms, each designed with intention and available for your next creative project.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSpaces.map((space, index) => (
            <motion.div
              key={space.id}
              className="space-card group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={space.mainImage}
                  alt={space.name}
                  className="space-card-image transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-light mb-2">{space.name}</h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{space.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">
                    {formatCurrency(space.hourlyRate)}/hr
                  </span>
                  <NavLink
                    to={`/spaces/${space.slug}`}
                    className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <NavLink to="/spaces" className="btn btn-secondary">
            View All Spaces
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;
