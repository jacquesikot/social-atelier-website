import { Instagram } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { spaces } from '../data/spaces';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_E164 } from '../config/contact';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white">
      {/* Main footer body */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <NavLink
              to="/"
              className="block text-white mb-5"
              style={{
                fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                fontWeight: 300,
                fontSize: '1.2rem',
                letterSpacing: '0.04em',
              }}
            >
              The Social Atelier
            </NavLink>
            <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6 max-w-xs">
              Lagos' premier curated content studio — where creators come to produce work that stands out.
            </p>
            <a
              href="https://instagram.com/thesocialatelierng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-secondary-300 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
              <span className="text-xs tracking-[0.15em] uppercase font-light">@thesocialatelierng</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase font-light mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Spaces', path: '/spaces' },
                { label: 'About', path: '/about' },
                { label: 'Journal', path: '/blog' },
                { label: 'Contact', path: '/contact' },
                { label: 'Book Now', path: '/booking' },
              ].map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className="text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-sm font-light"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Spaces */}
          <div>
            <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase font-light mb-5">
              Our Spaces
            </p>
            <ul className="space-y-3">
              {spaces.map((space) => (
                <li key={space.slug}>
                  <NavLink
                    to={`/spaces/${space.slug}`}
                    className="text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-sm font-light"
                  >
                    {space.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase font-light mb-5">
              Contact
            </p>
            <address className="not-italic space-y-3">
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Plot 59 Chuks Onyebuchi Drive<br />
                Lekki Phase 1, Lagos State
              </p>
              <p>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-sm font-light"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-sm font-light"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </address>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase font-light mb-2">Hours</p>
              <p className="text-neutral-500 text-xs font-light leading-relaxed">
                Tue–Sat: 10:00 AM – 6:00 PM<br />
                Sun: 1:00 PM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-light">
            &copy; {currentYear} The Social Atelier. All rights reserved.
          </p>
          <a
            href="https://www.freeprivacypolicy.com/live/40d70250-f3bf-439e-b25f-87dcb6ba1e27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-400 text-xs font-light transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
