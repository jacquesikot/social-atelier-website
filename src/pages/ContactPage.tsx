import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | The Social Atelier';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');

    // In a real app, you'd send this to your backend
    console.log('Contact form data:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
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
            <h1 className="heading-lg mb-4">Contact Us</h1>
            <p className="text-neutral-700">
              Have questions or need assistance? We're here to help. Reach out to our team using the form below or
              contact us directly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-sm mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <a href="mailto:hello@socialatelierng.com" className="text-primary-600 hover:underline">
                      hello@socialatelierng.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <a href="tel:+2348012345678" className="text-primary-600 hover:underline">
                      +234 903 118 9697
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <address className="not-italic text-neutral-600">
                      Plot 59 Chuks Onyebuchi Drive
                      <br />
                      Lekki Phase 1
                      <br />
                      Lagos State, Nigeria
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="font-medium mb-4">Business Hours</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex justify-between">
                    <span>Tuesday - Saturday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>1:00 PM - 6:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/thesocialatelierng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="heading-sm mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input"
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="info">General Information</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="input"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary flex items-center">
                      <Send size={16} className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-12">
        <div className="h-[400px] w-full bg-neutral-200">
          {/* Placeholder for Google Map (In a real app, you'd use Google Maps API) */}
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/4OumunhLlUuAkr1t23JwmG/83d2a19ca3b85e1a738292626ed33cfc/WhatsApp_Image_2025-07-22_at_10.23.42_PM__2_.jpeg"
            alt="The Social Atelier Location Map"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
