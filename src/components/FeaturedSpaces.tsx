import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { getSpaces, spaces as fallbackSpaces } from '../data/spaces';
import { Space } from '../types';
import SpaceCard from './SpaceCard';
import { useEffect, useState } from 'react';

const FeaturedSpaces = () => {
  const [featuredSpaces, setFeaturedSpaces] = useState<Space[]>(fallbackSpaces.slice(0, 3));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const spacesData = await getSpaces();
        // Select 3 spaces to feature
        setFeaturedSpaces(spacesData.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured spaces:', error);
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    };

    loadSpaces();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpaces.map((space, index) => (
              <SpaceCard key={space.id} space={space} index={index} />
            ))}
          </div>
        )}

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
