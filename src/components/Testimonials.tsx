import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="heading-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear from creatives who have brought their vision to life in our spaces.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.slice(2, 4).map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index + 2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;