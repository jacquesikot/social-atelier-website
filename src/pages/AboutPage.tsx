import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_E164 } from '../config/contact';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const values = [
  {
    title: 'Creativity Without Limits',
    body: 'We design our spaces and culture to inspire bold ideas and authentic expression — empowering creators to bring their vision to life without constraints.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence in Every Detail',
    body: 'From the aesthetic of each room to the experience we deliver, every detail is intentional — because great work deserves a great setting.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
  {
    title: 'Community & Collaboration',
    body: "We're a collective of dreamers, doers, and storytellers. Here, creators come together to share ideas, connect, and grow.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | The Social Atelier';
  }, []);

  return (
    <div className="bg-neutral-50">
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div
        className="relative bg-primary-950 overflow-hidden"
        style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/57t34dhvu1129bKHkaiqq4/54f3141aa4551cb0172c6b92a4797227/WhatsApp_Image_Aug_17_2025__1_.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 to-primary-950" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-5"
          >
            <span className="block w-8 h-px bg-secondary-300 opacity-60" />
            <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">Our Story</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-white mb-4"
            style={{
              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            }}
          >
            About Us
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            The story behind Lagos' most elevated content studio.
          </motion.p>
        </div>
      </div>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  Our Story
                </span>
              </div>

              <h2
                className="text-primary-950 mb-7"
                style={{
                  fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                }}
              >
                Born from a belief that creators{' '}
                <span style={{ color: '#5a1525' }}>deserve more.</span>
              </h2>

              <div className="space-y-5 text-primary-900/65 font-light leading-relaxed" style={{ fontSize: '1.05rem' }}>
                <p>
                  The Social Atelier was born from a dream and a deep belief that creators deserve more than
                  ordinary spaces. We set out to create something unique in Nigeria — a studio and event space
                  that blends classic elegance, functionality, and sophistication, giving creators the freedom to
                  express themselves and bring their visions to life.
                </p>
                <p>
                  With eight thoughtfully designed spaces, The Social Atelier offers versatility and inspiration
                  for every project, from bold shoots to intimate gatherings. More than just beautiful backdrops,
                  we provide an environment where artistry thrives and ideas are nurtured.
                </p>
                <p>
                  At our core, The Social Atelier is a creative community — a collective of visionaries and
                  storytellers passionate about content and connection. Here, you'll find not only the tools and
                  settings to realize your ideas, but also the support and sense of belonging that comes from a
                  space dedicated to artistic excellence.
                </p>
              </div>
            </motion.div>

            {/* Staggered images */}
            <motion.div
              className="relative h-[520px]"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <img
                src="https://images.ctfassets.net/g1pxcpqorahb/57t34dhvu1129bKHkaiqq4/54f3141aa4551cb0172c6b92a4797227/WhatsApp_Image_Aug_17_2025__1_.jpeg"
                alt="The Social Atelier Interior"
                className="absolute top-0 left-0 w-9/12 h-72 object-cover shadow-lg z-10"
                loading="lazy"
              />
              <img
                src="https://images.ctfassets.net/g1pxcpqorahb/3jj7U2aJwzlTCQwkt7TnTs/2c1f8a96fb9f79e1287119ab8f9f7e65/WhatsApp_Image_Aug_17_2025.jpeg"
                alt="The Social Atelier Interior"
                className="absolute bottom-0 right-0 w-9/12 h-72 object-cover shadow-lg"
                loading="lazy"
              />
              {/* small accent block */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-secondary-300 z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="bg-primary-950 py-24 lg:py-32">
        <div className="container-custom">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-8 h-px bg-secondary-300 opacity-60" />
              <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
                What We Stand For
              </span>
              <span className="block w-8 h-px bg-secondary-300 opacity-60" />
            </div>
            <h2
              className="text-white"
              style={{
                fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              }}
            >
              Our Mission & Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-primary-950 p-10"
              >
                <div className="w-10 h-10 border border-secondary-300/30 flex items-center justify-center text-secondary-300 mb-6">
                  {val.icon}
                </div>
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                    fontWeight: 300,
                    fontSize: '1.15rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {val.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT US ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  Find Us
                </span>
              </div>

              <h2
                className="text-primary-950 mb-8"
                style={{
                  fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                }}
              >
                Visit Us
              </h2>

              <p className="text-primary-900/65 font-light leading-relaxed mb-10" style={{ fontSize: '1.05rem' }}>
                Located in the heart of Lekki Phase 1, The Social Atelier is easily accessible and surrounded
                by complementary creative businesses.
              </p>

              <div className="space-y-6 border-t border-neutral-200 pt-8">
                {[
                  {
                    label: 'Address',
                    content: (
                      <address className="not-italic text-neutral-600 font-light text-sm leading-relaxed">
                        Plot 59 Chuks Onyebuchi Drive<br />
                        Lekki Phase 1, Lagos State, Nigeria
                      </address>
                    ),
                  },
                  {
                    label: 'Hours',
                    content: (
                      <p className="text-neutral-600 font-light text-sm leading-relaxed">
                        Tuesday – Saturday: 10:00 AM – 6:00 PM<br />
                        Sunday: 1:00 PM – 6:00 PM
                      </p>
                    ),
                  },
                  {
                    label: 'Contact',
                    content: (
                      <div className="space-y-1">
                        <p>
                          <a href={`tel:${PHONE_E164}`} className="text-primary-600 font-light text-sm hover:text-primary-800 transition-colors">
                            {PHONE_DISPLAY}
                          </a>
                        </p>
                        <p>
                          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600 font-light text-sm hover:text-primary-800 transition-colors">
                            {CONTACT_EMAIL}
                          </a>
                        </p>
                      </div>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-8">
                    <span className="text-neutral-400 text-xs tracking-[0.15em] uppercase font-light w-16 pt-0.5 shrink-0">
                      {item.label}
                    </span>
                    {item.content}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="overflow-hidden h-[460px]"
            >
              <img
                src="https://images.ctfassets.net/g1pxcpqorahb/1D9aCk9gUEL2RDhcm430RG/579402909097f6d45e59f63f1fa856a4/WhatsApp_Image_2025-07-22_at_10.23.38_PM.jpeg"
                alt="The Social Atelier"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-secondary-300 py-16 lg:py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-primary-950 mb-5"
            style={{
              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to create something extraordinary?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NavLink
              to="/spaces"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 hover:scale-[1.02]"
            >
              Browse Spaces
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary-950/30 text-primary-950 text-sm font-light tracking-[0.08em] uppercase transition-all duration-300 hover:border-primary-950 hover:bg-primary-950/5"
            >
              Get in Touch
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
