import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSpaceBySlug } from '../data/spaces';
import { ArrowLeft, Clock, Calendar, DollarSign, Users } from 'lucide-react';

const SpaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const space = getSpaceBySlug(id || '');
  const [activeImage, setActiveImage] = useState('');
  
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
              <h2 className="heading-sm mb-4">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {space.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${space.name} - ${index + 1}`} 
                    className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all ${
                      activeImage === image ? 'ring-2 ring-primary-600' : 'hover:opacity-80'
                    }`}
                    onClick={() => setActiveImage(image)}
                  />
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
              
              <NavLink 
                to={`/booking?space=${space.id}`} 
                className="w-full block text-center btn btn-primary"
              >
                Book This Space
              </NavLink>
              
              <p className="text-neutral-600 text-xs text-center mt-4">
                Have questions? <NavLink to="/contact" className="text-primary-600 hover:underline">Contact us</NavLink>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailPage;