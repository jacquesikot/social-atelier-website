import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Spaces', path: '/spaces' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-md py-3' 
      : isHomePage
        ? 'bg-transparent py-5'
        : 'bg-primary-950 py-5'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className={`text-2xl font-serif font-light tracking-wider ${
              isScrolled 
                ? 'text-primary-950' 
                : isHomePage
                  ? 'text-white'
                  : 'text-white'
            }`}
          >
            The Social Atelier
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive 
                      ? isScrolled 
                        ? 'text-primary-950 border-b-2 border-primary-950' 
                        : 'text-white border-b-2 border-white'
                      : isScrolled 
                        ? 'text-neutral-700 hover:text-primary-950' 
                        : 'text-white hover:text-white/80'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink 
              to="/booking" 
              className={`btn ${
                isScrolled
                  ? 'btn-primary'
                  : 'bg-white text-primary-950 hover:bg-white/90'
              }`}
            >
              Book Now
            </NavLink>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-primary-950' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `block p-2 text-sm font-medium ${
                    isActive 
                      ? 'text-primary-950 bg-primary-50 rounded-md' 
                      : 'text-neutral-700 hover:text-primary-950 hover:bg-primary-50 rounded-md'
                  }`
                }
                onClick={toggleMenu}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink 
              to="/booking" 
              className="block w-full text-center btn btn-primary"
              onClick={toggleMenu}
            >
              Book Now
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;