import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedSpaces from '../components/FeaturedSpaces';
import Testimonials from '../components/Testimonials';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The Social Atelier - Curated Spaces for Creative Events';
  }, []);

  return (
    <div>
      <Hero />

      {/* About Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-lg mb-6">Welcome to The Social Atelier</h2>
              <p className="text-neutral-700 mb-4">
                The Social Atelier is a curated creative studio empowering storytellers and brands to produce
                high-quality content in a professional, inspiring space.
              </p>
              <p className="text-neutral-700 mb-6">
                Our spaces, inspired by European themes, range from elegant sitting rooms to professionally equipped
                podcast studios—providing the perfect backdrop for any creative vision.
              </p>
              <NavLink to="/about" className="btn btn-secondary">
                Learn More About Us
              </NavLink>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                srcSet="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop 200w,
                        https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop 400w,
                        https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop 600w"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
                alt="Social Atelier Space"
                className="w-full h-64 object-cover rounded-lg shadow-sm"
                loading="lazy"
              />
              <img
                src="https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                srcSet="https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop 200w,
                        https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop 400w,
                        https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop 600w"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
                alt="Social Atelier Space"
                className="w-full h-64 object-cover rounded-lg shadow-sm mt-8"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedSpaces />

      {/* Booking CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
            srcSet="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop 800w,
                    https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop 1200w,
                    https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop 1600w,
                    https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop 1920w"
            sizes="100vw"
            alt="Book your space"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary-900/70"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <motion.h2
              className="heading-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Bring Your Vision to Life?
            </motion.h2>
            <motion.p
              className="text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Book one of our unique spaces for your next creative project, event, or gathering.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink to="/booking" className="btn btn-primary bg-white text-primary-800 hover:bg-neutral-100">
                Book Now
              </NavLink>
            </motion.div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default HomePage;
