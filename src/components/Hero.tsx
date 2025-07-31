import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg"
          alt="The Social Atelier Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-white"
          >
            <h1 className="heading-xl mb-6">A Curated Space for Your Creative Vision</h1>

            <p className="text-lg md:text-xl mb-8 text-neutral-100">
              Discover our collection of beautifully designed spaces for events, photoshoots, podcasts, and creative
              gatherings.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <NavLink to="/spaces" className="btn btn-primary">
                Explore Our Spaces
              </NavLink>

              <NavLink
                to={`https://app.easybookr.com/book/the-social-atelier/`}
                target="_blank"
                className="btn btn-secondary !text-white !border-white hover:!bg-white/10"
              >
                Book a Space
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center text-white">
          <p className="text-sm font-light mb-2">Scroll to discover</p>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
