import { motion } from 'framer-motion';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-medium text-primary-800">{testimonial.name}</h4>
          <p className="text-sm text-neutral-600">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
      <p className="text-neutral-700 italic">"{testimonial.quote}"</p>
    </motion.div>
  );
};

export default TestimonialCard;