import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import FeaturedSpaces from '../components/FeaturedSpaces';
import Hero from '../components/Hero';
import MarqueeBar from '../components/MarqueeBar';
import { testimonials } from '../data/testimonials';

/* ─── Reusable fade-up variant ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
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

const stats = [
  { value: '9+', label: 'Distinct Spaces' },
  { value: '500+', label: 'Sessions Hosted' },
  { value: '100%', label: 'Fully Curated' },
];

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'The Social Atelier — Premium Content Studio, Lagos';
  }, []);

  /* Parallax for the studio section image */
  const studioRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: studioProgress } = useScroll({
    target: studioRef,
    offset: ['start end', 'end start'],
  });
  const studioImgY = useTransform(studioProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="bg-neutral-50">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <MarqueeBar />

      {/* ── STUDIO STATEMENT ─────────────────────────────────── */}
      <section
        ref={studioRef}
        className="relative bg-primary-950 overflow-hidden"
        style={{ minHeight: '85vh' }}
      >
        {/* Background image with parallax, right half */}
        <motion.div
          className="absolute right-0 top-0 w-1/2 h-full hidden lg:block"
          style={{ y: studioImgY }}
        >
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/7IshJLtI5Gc4a3Ctjz4JnL/e0bbe8d0c43655df7afcf12d1b988fce/WhatsApp_Image_2025-08-15_at_9.21.47_PM.jpeg"
            alt="The Social Atelier interior"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/60 to-transparent" />
        </motion.div>

        <div className="container-custom relative z-10 py-24 lg:py-36">
          <div className="max-w-2xl">
            {/* Section label */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="block w-8 h-px bg-secondary-300 opacity-60" />
              <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
                Our Studio
              </span>
            </motion.div>

            {/* Large editorial statement */}
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white mb-8"
              style={{
                fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              }}
            >
              Built for creators who{' '}
              <span style={{ color: '#F6EDE4' }}>refuse to compromise</span>{' '}
              on their vision.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-neutral-400 font-light leading-relaxed mb-10"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              The Social Atelier is Lagos' premier curated content studio — a collection
              of European-inspired rooms designed to make every frame exceptional. Whether
              you're a photographer, content creator, brand, or storyteller, this is your
              creative home.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-10 mb-12 border-t border-white/10 pt-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-secondary-300 mb-1"
                    style={{
                      fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-neutral-500 text-xs tracking-[0.15em] uppercase">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <NavLink
                to="/about"
                className="inline-flex items-center gap-3 text-secondary-300 text-sm tracking-[0.1em] uppercase font-light border-b border-secondary-300/40 pb-1 hover:border-secondary-300 transition-colors duration-300"
              >
                Our Story
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </motion.div>
          </div>
        </div>

        {/* Mobile image */}
        <div className="lg:hidden w-full h-64 relative overflow-hidden">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/7IshJLtI5Gc4a3Ctjz4JnL/e0bbe8d0c43655df7afcf12d1b988fce/WhatsApp_Image_2025-08-15_at_9.21.47_PM.jpeg"
            alt="The Social Atelier interior"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent" />
        </div>
      </section>

      {/* ── FEATURED SPACES ───────────────────────────────────── */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="container-custom mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  Our Spaces
                </span>
              </div>
              <h2
                className="text-primary-950"
                style={{
                  fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                }}
              >
                Spaces that speak
                <br />
                <span style={{ color: '#5a1525' }}>for themselves.</span>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <NavLink
                to="/spaces"
                className="inline-flex items-center gap-3 text-primary-800 text-sm tracking-[0.1em] uppercase font-light border-b border-primary-800/30 pb-1 hover:border-primary-800 transition-colors duration-300"
              >
                View All Spaces
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </motion.div>
          </div>
        </div>

        <FeaturedSpaces minimal />
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────── */}
      <section className="bg-secondary-300 py-24 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              <img
                src="https://images.ctfassets.net/g1pxcpqorahb/7E8VmzPBWYrixvdQyJrEWi/90c9b1ac6d8de826625c9e69eb4531e0/WhatsApp_Image_2025-08-15_at_9.21.46_PM.jpeg"
                alt="Social Atelier Space"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
              <motion.div
                className="absolute -bottom-8 -right-6 w-48 h-48 hidden md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <img
                  src="https://images.ctfassets.net/g1pxcpqorahb/73TEHG9mEcoPeuu6SC5psB/6efa39aded5f6e7e811b2f522e412df2/WhatsApp_Image_2025-07-22_at_10.23.44_PM__2_.jpeg"
                  alt="Social Atelier detail"
                  className="w-full h-full object-cover border-4 border-secondary-300"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="lg:pl-8"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
                  The Experience
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
                Every room is a set
                <br />
                <span style={{ color: '#5a1525' }}>waiting for you.</span>
              </h2>

              <p
                className="text-primary-900/70 font-light leading-relaxed mb-6"
                style={{ fontSize: '1.05rem' }}
              >
                Our spaces, inspired by European interiors, are designed to be immediately
                camera-ready. From the grand Piano Room to the intimate Creperie kitchen,
                each room carries its own distinct mood — no extra set design needed.
              </p>

              <p
                className="text-primary-900/70 font-light leading-relaxed mb-10"
                style={{ fontSize: '1.05rem' }}
              >
                We exist for the creator who understands that environment shapes output.
                This is where your best work lives.
              </p>

              <NavLink
                to="/spaces"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 hover:scale-[1.02]"
              >
                Browse All Rooms
              </NavLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL SPOTLIGHT ────────────────────────────── */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <div className="container-custom max-w-4xl text-center">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <span className="block w-8 h-px bg-primary-800 opacity-40" />
            <span className="text-primary-800 text-xs tracking-[0.25em] uppercase font-light">
              What Creators Say
            </span>
            <span className="block w-8 h-px bg-primary-800 opacity-40" />
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p
              className="text-primary-950 font-light leading-relaxed mb-8"
              style={{
                fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.35,
                fontStyle: 'italic',
              }}
            >
              "{testimonials[1].quote}"
            </p>
            <footer>
              <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-medium">
                {testimonials[1].name}
              </span>
              <span className="text-neutral-400 text-xs mx-2">·</span>
              <span className="text-neutral-500 text-xs tracking-[0.1em] uppercase font-light">
                {testimonials[1].role}
              </span>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-950" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/5nxkLuH37DAXSsDPWd6ZWb/cd99552d2bb7dfdbe4e8d59ec0372cba/WhatsApp_Image_2025-07-22_at_10.23.38_PM__1_.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/60 via-primary-950/40 to-primary-950/80" />
        </div>

        <div className="relative z-10 container-custom py-28 lg:py-36 text-center">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="block w-8 h-px bg-secondary-300 opacity-60" />
            <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
              Reserve Your Space
            </span>
            <span className="block w-8 h-px bg-secondary-300 opacity-60" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white mx-auto mb-10 max-w-3xl"
            style={{
              fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Your next shoot starts{' '}
            <span style={{ color: '#F6EDE4' }}>here.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-neutral-400 font-light mb-12 max-w-md mx-auto"
            style={{ fontSize: '1.05rem' }}
          >
            Book by the hour. Arrive inspired. Leave with work you're proud of.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NavLink
              to="https://app.easybookr.com/book/the-social-atelier/"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-secondary-300 text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02]"
            >
              Book a Space
            </NavLink>
            <NavLink
              to="/spaces"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white text-sm font-light tracking-[0.08em] uppercase transition-all duration-300 hover:border-white/70 hover:bg-white/5"
            >
              View All Spaces
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
