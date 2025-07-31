import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FeaturedSpaces from '../components/FeaturedSpaces';
import Hero from '../components/Hero';

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
                src="https://images.ctfassets.net/g1pxcpqorahb/4McRX9TJeSsXIGu8p5GrSU/e6a472ecb15d82a349a1a79b92317529/WhatsApp_Image_2025-07-22_at_10.23.41_PM.jpeg"
                alt="Social Atelier Space"
                className="w-full h-64 object-cover rounded-lg shadow-sm"
                loading="lazy"
              />
              <img
                src="https://images.ctfassets.net/g1pxcpqorahb/MGpJLqVtV16etyLRAbQYx/8c4107ba00e02972164d504683d52b19/WhatsApp_Image_2025-07-22_at_10.23.39_PM__2_.jpeg"
                alt="Social Atelier Space"
                className="w-full h-64 object-cover rounded-lg shadow-sm mt-8"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedSpaces />
    </div>
  );
};

export default HomePage;
