import { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | The Social Atelier';
  }, []);

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
            <h1 className="heading-lg mb-4">About Us</h1>
            <p className="text-neutral-700">
              Learn about The Social Atelier's story, our mission, and the vision behind our curated spaces.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-neutral-700 mb-4">
                The Social Atelier was born from a passion for beautiful spaces and the creative energy they inspire.
                What began as a personal studio quickly evolved into a multi-faceted venue when founder Chioma Okonkwo
                noticed how different creative professionals constantly asked to use her thoughtfully designed spaces.
              </p>
              <p className="text-neutral-700 mb-4">
                Recognizing a need for versatile, aesthetically pleasing environments for content creation and small
                events in Lagos, Chioma expanded her studio into what is now The Social Atelier—a collection of nine
                distinct spaces, each with its own character and purpose.
              </p>
              <p className="text-neutral-700">
                Since opening our doors in 2022, we've hosted photographers, podcasters, workshop leaders, and event
                planners who share our appreciation for intentional design and inspiring surroundings.
              </p>
            </motion.div>

            <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                srcSet="https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=300&h=225&fit=crop 300w,
                        https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop 400w,
                        https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop 600w"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                alt="The Social Atelier Interior"
                className="absolute top-0 left-0 w-8/12 h-64 object-cover rounded-lg shadow-lg z-10"
                loading="lazy"
              />
              <img
                src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                srcSet="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=300&h=225&fit=crop 300w,
                        https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop 400w,
                        https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop 600w"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                alt="The Social Atelier Interior"
                className="absolute bottom-0 right-0 w-8/12 h-72 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="heading-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Mission & Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Inspire Creativity</h3>
                <p className="text-neutral-600 text-sm">
                  We provide thoughtfully designed environments that spark imagination and elevate creative work.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Foster Community</h3>
                <p className="text-neutral-600 text-sm">
                  We create opportunities for connection and collaboration between diverse creative professionals.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Ensure Quality</h3>
                <p className="text-neutral-600 text-sm">
                  We maintain meticulous standards in our spaces and services to support professional creative work.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </motion.h2>
            <motion.p
              className="text-neutral-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The passionate individuals who make The Social Atelier a reality.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Chioma Okonkwo',
                role: 'Founder & Creative Director',
                image:
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
                bio: 'With a background in interior design and photography, Chioma brings a unique perspective to creating spaces that are both beautiful and functional.',
              },
              {
                name: 'Oluwaseun Adebayo',
                role: 'Operations Manager',
                image:
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
                bio: 'Seun ensures that everything runs smoothly at The Social Atelier, from bookings to maintenance, with a keen eye for detail and exceptional problem-solving skills.',
              },
              {
                name: 'Amara Eze',
                role: 'Events Coordinator',
                image:
                  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
                bio: 'Amara helps clients bring their event visions to life, offering creative solutions and flawless execution that exceed expectations.',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={member.image}
                  srcSet={`${member.image} 300w,
                          ${member.image.replace('w=300&h=400', 'w=400&h=533')} 400w,
                          ${member.image.replace('w=300&h=400', 'w=500&h=667')} 500w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-primary-600 text-sm mb-3">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-lg mb-6">Visit Us</h2>
              <p className="text-neutral-700 mb-6">
                Located in the heart of Lekki Phase 1, The Social Atelier is easily accessible and surrounded by
                complementary creative businesses.
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Address</h3>
                  <address className="not-italic text-neutral-600">
                    15B Admiralty Way
                    <br />
                    Lekki Phase 1<br />
                    Lagos State, Nigeria
                  </address>
                </div>

                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-neutral-600">Monday - Sunday: 9:00 AM - 9:00 PM</p>
                </div>

                <div>
                  <h3 className="font-medium">Contact</h3>
                  <p className="text-neutral-600">
                    Phone: +234 801 234 5678
                    <br />
                    Email: hello@socialatelier.com
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-md h-[400px]"
            >
              {/* Placeholder for Google Map (In a real app, you'd use Google Maps API) */}
              <img
                src="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                srcSet="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=400&h=267&fit=crop 400w,
                        https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop 600w,
                        https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop 800w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="The Social Atelier Location"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
