import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const headingVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background with parallax scale */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
        <video
          src="https://videos.ctfassets.net/g1pxcpqorahb/5jLFMzLqLX3GwauwSrJ3px/3257eb50d5a508068219d5f6359fff78/WhatsApp_Video_Aug_8_2025.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dynamic overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          opacity: overlayOpacity,
          background: 'linear-gradient(160deg, #38040E 0%, #0a0608 60%, #1a0205 100%)',
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-center"
        style={{ y: contentY }}
      >
        <div className="container-custom">
          <div className="max-w-5xl">
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-8 h-px bg-secondary-300 opacity-70" />
              <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">
                Premium Content Studio · Lagos
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-white mb-10"
              style={{
                fontFamily: "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              }}
            >
              <motion.span variants={lineVariants} className="block">
                Where Creators
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block italic"
                style={{ color: '#F6EDE4', fontWeight: 300 }}
              >
                Come to Life.
              </motion.span>
            </motion.h1>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              style={{ originX: 0 }}
              className="w-24 h-px bg-secondary-300 mb-8 opacity-60"
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-neutral-300 font-light leading-relaxed mb-10 max-w-md"
              style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', letterSpacing: '0.01em' }}
            >
              Beautifully curated rooms for photoshoots, content creation,
              and elevated creative events.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <NavLink
                to="/spaces"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary-300 text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02]"
              >
                Explore Spaces
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NavLink>

              <NavLink
                to="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-light tracking-[0.08em] uppercase transition-all duration-300 hover:border-white/70 hover:bg-white/5"
              >
                Book a Session
              </NavLink>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
