import { motion } from 'framer-motion';

const items = [
  'Photography',
  'Content Creation',
  'Editorial Shoots',
  'Intimate Events',
  'Brand Campaigns',
  'Beauty & Fashion',
  'Podcast Studios',
  'Creative Gatherings',
];

const MarqueeBar = () => {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-primary-950 py-4 border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
              {item}
            </span>
            <span className="text-secondary-300/30 text-xs">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBar;
