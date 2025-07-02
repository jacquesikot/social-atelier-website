import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpaceCard from '../components/SpaceCard';
import { spaces } from '../data/spaces';

const SpacesPage = () => {
  const [filter, setFilter] = useState('all');
  const [filteredSpaces, setFilteredSpaces] = useState(spaces);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Spaces | The Social Atelier';
  }, []);

  // Filter spaces based on selected category
  useEffect(() => {
    if (filter === 'all') {
      setFilteredSpaces(spaces);
      return;
    }

    // Simple filtering based on space name or features
    // In a real app, you'd have proper categories in your data model
    const filtered = spaces.filter((space) => {
      if (filter === 'event') {
        return space.type === 'event';
      }
      if (filter === 'photo') {
        return space.type === 'photo';
      }
      if (filter === 'podcast') {
        return space.type === 'podcast';
      }

      return true;
    });

    setFilteredSpaces(filtered);
  }, [filter]);

  return (
    <div className="pt-24">
      {/* Header */}
      <div className="relative py-16 bg-primary-50">
        <div className="container-custom">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg mb-4">Our Spaces</h1>
            <p className="text-neutral-700">
              Explore our collection of beautifully designed spaces, each offering unique features and ambiance for your
              creative projects and events.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-neutral-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Spaces' },
                { id: 'event', label: 'Event Spaces' },
                { id: 'photo', label: 'Photography' },
                { id: 'podcast', label: 'Podcast & Recording' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    filter === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spaces Grid */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpaces.map((space, index) => (
                <SpaceCard key={space.id} space={space} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600">No spaces found matching your filter criteria.</p>
              <button onClick={() => setFilter('all')} className="mt-4 btn btn-secondary">
                View All Spaces
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpacesPage;
