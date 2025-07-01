import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Space } from '../types';

interface SpaceCardProps {
  space: Space;
  index: number;
}

const SpaceCard = ({ space, index }: SpaceCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="space-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={space.mainImage}
          srcSet={`${space.mainImage} 600w,
                  ${space.mainImage.replace('w=600&h=400', 'w=400&h=267')} 400w,
                  ${space.mainImage.replace('w=600&h=400', 'w=800&h=533')} 800w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          alt={space.name}
          className="space-card-image transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-light mb-2">{space.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{space.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 font-medium">{formatCurrency(space.hourlyRate)}/hour</span>
          <NavLink
            to={`/spaces/${space.slug}`}
            className="text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceCard;
