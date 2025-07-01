import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { spaces } from '../data/spaces';
import SpaceCard from './SpaceCard';

const FeaturedSpaces = () => {
  // Select 3 spaces to feature
  const featuredSpaces = spaces.slice(0, 3);
  
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
            <SpaceCard key={space.id} space={space} index={index} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <NavLink 
            to="/spaces" 
            className="btn btn-secondary"
          >
            View All Spaces
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;