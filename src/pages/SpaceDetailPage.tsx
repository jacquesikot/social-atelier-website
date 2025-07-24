import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSpaceBySlug } from '../data/spaces';
import { ArrowLeft, Clock, Calendar, DollarSign, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';

const SpaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const space = getSpaceBySlug(id || '');
  const [activeImage, setActiveImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (space) {
      document.title = `${space.name} | The Social Atelier`;
      setActiveImage(space.mainImage);
    } else {
      document.title = 'Space Not Found | The Social Atelier';
    }
  }, [space]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!space) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="heading-lg mb-4">Space Not Found</h1>
        <p className="text-neutral-600 mb-8">The space you're looking for doesn't exist or may have been moved.</p>
        <NavLink to="/spaces" className="btn btn-primary">
          View All Spaces
        </NavLink>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Header Image */}
      <div className="h-[50vh] relative overflow-hidden">
        <img
          src={activeImage}
          srcSet={`${activeImage.replace('w=600&h=400', 'w=800&h=533')} 800w,
                  ${activeImage.replace('w=600&h=400', 'w=1200&h=800')} 1200w,
                  ${activeImage.replace('w=600&h=400', 'w=1600&h=1067')} 1600w,
                  ${activeImage.replace('w=600&h=400', 'w=1920&h=1280')} 1920w`}
          sizes="100vw"
          alt={space.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="flex flex-wrap items-center mb-6 gap-y-4">
          <NavLink
            to="/spaces"
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors mr-auto"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to All Spaces</span>
          </NavLink>

          <NavLink to="/booking" className="btn btn-primary">
            Book This Space
          </NavLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg mb-4">{space.name}</h1>
            <p className="text-neutral-600 mb-8">{space.description}</p>

            <div className="mb-8">
              <h2 className="heading-sm mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {space.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-neutral-700">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="heading-sm mb-4">Ideal For</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {space.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center text-neutral-700">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Gallery */}
            <div>
              <h2 className="heading-sm mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {space.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => {
                      setModalImageIndex(index);
                      setModalOpen(true);
                    }}
                  >
                    <img
                      src={image.replace('w=800&h=600', 'w=400&h=300')}
                      srcSet={`${image.replace('w=800&h=600', 'w=400&h=300')} 400w,
                              ${image.replace('w=800&h=600', 'w=600&h=450')} 600w,
                              ${image.replace('w=800&h=600', 'w=800&h=600')} 800w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={`${space.name} - ${index + 1}`}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 sticky top-24">
              <div className="flex items-center text-primary-800 font-serif text-2xl mb-4">
                <DollarSign size={24} className="mr-1" />
                <span>{formatCurrency(space.hourlyRate)}</span>
                <span className="text-neutral-600 text-base font-sans ml-1">/hour</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock size={20} className="text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Opening Hours</h3>
                    <p className="text-neutral-600 text-sm">{space.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={20} className="text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Available Days</h3>
                    <p className="text-neutral-600 text-sm">{space.openingDays}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users size={20} className="text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Duration Options</h3>
                    <ul className="text-neutral-600 text-sm space-y-1 mt-1">
                      {space.durationOptions.map((option, index) => (
                        <li key={index}>{option.label}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <NavLink to={`/booking?space=${space.id}`} className="w-full block text-center btn btn-primary">
                Book This Space
              </NavLink>

              <p className="text-neutral-600 text-xs text-center mt-4">
                Have questions?{' '}
                <NavLink to="/contact" className="text-primary-600 hover:underline">
                  Contact us
                </NavLink>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-7xl max-h-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {space.images.length > 1 && (
              <>
                <button
                  onClick={() => setModalImageIndex((prev) => (prev - 1 + space.images.length) % space.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setModalImageIndex((prev) => (prev + 1) % space.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={space.images[modalImageIndex].replace('w=800&h=600', 'w=1920&h=1440')}
              alt={`${space.name} - ${modalImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {modalImageIndex + 1} / {space.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceDetailPage;
