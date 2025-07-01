import { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSpaceById, spaces } from '../data/spaces';
import { BookingFormData } from '../types';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const initialSpaceId = searchParams.get('space') || '';
  
  const [formData, setFormData] = useState<BookingFormData>({
    spaceId: initialSpaceId,
    date: '',
    startTime: '',
    duration: 2,
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const selectedSpace = formData.spaceId ? getSpaceById(formData.spaceId) : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Book a Space | The Social Atelier';
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request submitted! We will contact you shortly.');
    
    // In a real app, you'd send this to your backend
    console.log('Booking form data:', formData);
    
    // Reset form
    setFormData({
      spaceId: '',
      date: '',
      startTime: '',
      duration: 2,
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };
  
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
            <h1 className="heading-lg mb-4">Book Your Space</h1>
            <p className="text-neutral-700">
              Complete the form below to book one of our unique spaces for your next creative project or event.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Form */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="spaceId" className="block text-sm font-medium text-neutral-700 mb-1">
                    Select a Space *
                  </label>
                  <select
                    id="spaceId"
                    name="spaceId"
                    value={formData.spaceId}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select a space</option>
                    {spaces.map(space => (
                      <option key={space.id} value={space.id}>
                        {space.name} (${space.hourlyRate}/hour)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-neutral-700 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-neutral-700 mb-1">
                    Duration *
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value={2}>2 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={8}>Full day (8 hours)</option>
                  </select>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h2 className="text-lg font-medium mb-4">Your Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="input"
                      placeholder="Tell us about your event or any special requirements..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Submit Booking Request
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary-50 p-6 rounded-lg sticky top-24">
                <h2 className="heading-sm mb-4">Booking Information</h2>
                
                {selectedSpace ? (
                  <div className="mb-6">
                    <div className="aspect-video mb-4 overflow-hidden rounded-md">
                      <img 
                        src={selectedSpace.mainImage} 
                        alt={selectedSpace.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="font-medium text-lg">{selectedSpace.name}</h3>
                    <p className="text-primary-600 font-medium">${selectedSpace.hourlyRate}/hour</p>
                    <p className="text-sm text-neutral-600 mt-2">{selectedSpace.shortDescription}</p>
                    
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <h4 className="font-medium mb-2">Available Hours</h4>
                      <p className="text-sm text-neutral-600">{selectedSpace.openingDays}</p>
                      <p className="text-sm text-neutral-600">{selectedSpace.openingHours}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 text-neutral-600">
                    <p>Select a space to see details.</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Booking Process</h3>
                    <ol className="text-sm text-neutral-600 space-y-2 pl-5 list-decimal">
                      <li>Complete and submit the booking form</li>
                      <li>Receive confirmation of availability within 24 hours</li>
                      <li>Pay the deposit to secure your booking</li>
                      <li>Receive all details for your visit</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Cancellation Policy</h3>
                    <p className="text-sm text-neutral-600">
                      Free cancellation up to 48 hours before your booking. Cancellations within 48 hours are subject to a 50% fee.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    Questions about booking? <NavLink to="/contact" className="text-primary-600 hover:underline">Contact us</NavLink>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;