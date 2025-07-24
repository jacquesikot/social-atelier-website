import { Instagram } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { spaces } from '../data/spaces';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <NavLink to="/" className="text-2xl font-serif font-light tracking-wider">
              The Social Atelier
            </NavLink>
            <p className="mt-4 text-neutral-400 text-sm">
              A curated lifestyle event space offering a variety of unique and themed rooms for events, photoshoots,
              podcasts, and gatherings.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://instagram.com/thesocialatelierng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Spaces', 'About', 'Contact', 'Book Now'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Spaces */}
          <div>
            <h3 className="text-lg font-medium mb-4">Our Spaces</h3>
            <ul className="space-y-2">
              {spaces.map((space) => (
                <li key={space.slug}>
                  <NavLink
                    to={`/spaces/${space.slug}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {space.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <address className="not-italic text-neutral-400 text-sm space-y-2">
              <p>Plot 59 Chuks Onyebuchi Drive</p>
              <p>Lekki Phase 1</p>
              <p>Lagos State, Nigeria</p>
              <p className="mt-4">
                <a href="tel:+2348012345678" className="hover:text-white transition-colors">
                  +234 801 234 5678
                </a>
              </p>
              <p>
                <a href="mailto:socialatelierng@gmail.com" className="hover:text-white transition-colors">
                  socialatelierng@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">&copy; {currentYear} The Social Atelier. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
