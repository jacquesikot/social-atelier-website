import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Minus, Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  formatNaira,
  getRelatedServices,
  getServiceBySlug,
  getServiceRooms,
} from '../data/services';
import { ServiceFaq, ServiceImage } from '../types';
import { spaceEnquiryMessage, whatsappLink } from '../config/contact';
import { trackEvent } from '../config/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const headingFont = "'Maison Neue Extended', 'Maison Neue', Arial, sans-serif";

/** The hairline + uppercase label used to open a section across the site. */
const SectionLabel = ({ children, light = false }: { children: string; light?: boolean }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className={`block w-6 h-px ${light ? 'bg-secondary-300 opacity-60' : 'bg-primary-800 opacity-40'}`} />
    <span
      className={`text-xs tracking-[0.2em] uppercase font-light ${light ? 'text-secondary-300' : 'text-primary-800'}`}
    >
      {children}
    </span>
  </div>
);

/**
 * The image carousel on a case study.
 *
 * Only the active slide is in the DOM as a rendered <img> at full opacity, but
 * every slide is present so a crawler sees all of the alt text. Controls are
 * hidden entirely for a single image, which is the common case early on — a
 * carousel with one slide and dead arrows looks broken.
 *
 * Navigation wraps in both directions, matching the lightbox on the space
 * detail page, and supports swiping so the mobile experience is not
 * arrow-only.
 */
const CaseStudyCarousel = ({ images, title }: { images: ServiceImage[]; title: string }) => {
  const [index, setIndex] = useState(0);
  // Horizontal distance of the current touch, used to detect a swipe.
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = images.length;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    // 40px keeps a vertical page scroll from registering as a swipe.
    if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
    setTouchStartX(null);
  };

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden group/carousel bg-primary-900"
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      // A carousel is a labelled region so screen readers can skip it, and
      // aria-roledescription tells them it is more than a plain image.
      role="group"
      aria-roledescription="carousel"
      aria-label={`Images from ${title}`}
    >
      {images.map((image, i) => (
        <img
          key={image.url}
          src={image.url}
          alt={image.alt || title}
          loading={i === 0 ? 'lazy' : 'eager'}
          aria-hidden={i !== index}
          // Opacity is set inline rather than with Tailwind's opacity-0 /
          // opacity-100 classes: the parent motion.article also animates
          // opacity, and swapping utility classes on these reused nodes did
          // not repaint reliably. An inline value is unambiguous.
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        />
      ))}

      {count > 1 && (
        <>
          {/* Arrows sit on a scrim rather than bare over the photo, which
              would disappear against a light frame. */}
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary-950/50 text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-primary-950/80 hover:text-white opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary-950/50 text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-primary-950/80 hover:text-white opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots double as the position indicator and direct navigation. */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.url}
                onClick={() => go(i)}
                aria-label={`Go to image ${i + 1} of ${count}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * One FAQ, open/closed.
 *
 * The answer stays in the DOM when collapsed rather than being conditionally
 * rendered, so a crawler that does not click still reads every answer — the
 * whole point of an FAQ block for search.
 */
const FaqItem = ({ faq, index }: { faq: ServiceFaq; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <h3
          className="text-primary-950 group-hover:text-primary-700 transition-colors duration-200"
          style={{ fontFamily: headingFont, fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.4 }}
        >
          {faq.question}
        </h3>
        <span className="text-primary-700 shrink-0 mt-1">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[36rem]' : 'max-h-0'}`}>
        <p className="text-neutral-600 font-light leading-relaxed pb-7 pr-10" style={{ fontSize: '0.95rem' }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = service
      ? `${service.heading} | The Social Atelier`
      : 'Service Not Found | The Social Atelier';

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const original = meta?.content;
    if (meta && service?.intro) meta.content = service.intro;

    /*
     * Keep these pages out of search indexes while they are a design demo.
     *
     * The content below is invented sample copy, not real service detail, and
     * the pages carry no CMS data yet. Indexing them now would put fabricated
     * case studies and prices in front of searchers, and would spend the
     * site's crawl budget on URLs that are about to change shape.
     *
     * robots.txt still says Allow: / and the route is reachable by any client
     * that executes the bundle, so the exclusion has to be stated on the page
     * itself rather than assumed from the page's absence from the sitemap.
     * Remove this block — and add the routes to generate-sitemap.mjs and
     * prerender.mjs — when the CMS collection goes live.
     */
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const originalRobots = robots?.content;
    if (robots) robots.content = 'noindex, nofollow';

    if (service) trackEvent('service_page_view', { service_slug: service.slug, service_title: service.title });

    return () => {
      if (meta && original) meta.content = original;
      if (robots && originalRobots) robots.content = originalRobots;
    };
  }, [service]);

  if (!service) {
    return (
      <div className="bg-neutral-50 min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1
            className="text-primary-950 mb-4"
            style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Service Not Found
          </h1>
          <p className="text-neutral-500 font-light mb-8">
            The service you're looking for doesn't exist or may have been moved.
          </p>
          <NavLink
            to="/spaces"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800"
          >
            View All Spaces
          </NavLink>
        </div>
      </div>
    );
  }

  const rooms = getServiceRooms(service);
  const related = getRelatedServices(service);

  return (
    <div className="bg-neutral-50">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="relative bg-primary-950 overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '4.5rem' }}>
        {service.heroImage && (
          <div className="absolute inset-0">
            <img src={service.heroImage.url} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-primary-950" />
          </div>
        )}

        <div className="container-custom relative z-10">
          <NavLink
            to="/spaces"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-xs tracking-[0.15em] uppercase mb-8"
          >
            <ChevronLeft size={14} />
            Our Spaces
          </NavLink>

          <motion.h1
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="text-white mb-5 max-w-3xl"
            style={{
              fontFamily: headingFont,
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(1.9rem, 4.2vw, 3.4rem)',
            }}
          >
            {service.heading}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-2xl mb-10"
            style={{ fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            {service.intro}
          </motion.p>

          {/*
            The at-a-glance facts. These are the first thing a visitor looks
            for and the numbers an AI assistant needs to answer "how much",
            "how many people" and "how long" — so they sit above the fold as
            text rather than being buried in the body copy.
          */}
          <motion.dl
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-white/10 pt-8 max-w-3xl"
          >
            {service.priceFrom !== null && (
              <div>
                <dt className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase mb-2">From</dt>
                <dd className="text-white font-light" style={{ fontFamily: headingFont, fontSize: '1.3rem' }}>
                  {formatNaira(service.priceFrom)}
                  <span className="text-neutral-500 text-sm"> /hr</span>
                </dd>
              </div>
            )}

            {service.capacityMin !== null && service.capacityMax !== null && (
              <div>
                <dt className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase mb-2">Capacity</dt>
                <dd className="text-white font-light" style={{ fontFamily: headingFont, fontSize: '1.3rem' }}>
                  {service.capacityMin}–{service.capacityMax}
                  <span className="text-neutral-500 text-sm"> guests</span>
                </dd>
              </div>
            )}

            {service.durationRange && (
              <div>
                <dt className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase mb-2">Duration</dt>
                <dd className="text-white font-light" style={{ fontFamily: headingFont, fontSize: '1.3rem' }}>
                  {service.durationRange}
                </dd>
              </div>
            )}

            <div>
              <dt className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase mb-2">Rooms</dt>
              <dd className="text-white font-light" style={{ fontFamily: headingFont, fontSize: '1.3rem' }}>
                {rooms.length}
                <span className="text-neutral-500 text-sm"> available</span>
              </dd>
            </div>
          </motion.dl>

          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mt-10"
          >
            <NavLink
              to="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-secondary-300"
            >
              Book a Space
            </NavLink>
            <a
              href={whatsappLink(spaceEnquiryMessage(service.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:border-white"
            >
              Ask on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── BODY + STICKY ENQUIRY ────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:items-start">
            <div className="lg:col-span-2">
              {/*
                Webflow rich text arrives as an HTML string, so it has to be
                injected. The content comes from our own authenticated CMS at
                build time, not from user input.
              */}
              <div className="prose-atelier" dangerouslySetInnerHTML={{ __html: service.body }} />

              {/* Use cases + what's included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 border-t border-neutral-200 pt-12">
                <div>
                  <SectionLabel>Ideal For</SectionLabel>
                  <ul className="space-y-3">
                    {service.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-3 text-neutral-700 font-light text-sm">
                        <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <SectionLabel>What's Included</SectionLabel>
                  <ul className="space-y-3">
                    {service.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-neutral-700 font-light text-sm">
                        <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar — mirrors the space detail page so the site feels of a piece. */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-neutral-200 bg-white p-8">
                {service.priceFrom !== null && (
                  <div className="mb-8 pb-8 border-b border-neutral-100">
                    <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-2">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-primary-950"
                        style={{
                          fontFamily: headingFont,
                          fontWeight: 300,
                          fontSize: '2rem',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {formatNaira(service.priceFrom)}
                      </span>
                      <span className="text-neutral-400 font-light text-sm">/hr</span>
                    </div>
                  </div>
                )}

                <div className="space-y-5 mb-8">
                  {service.capacityMin !== null && service.capacityMax !== null && (
                    <div className="flex gap-4">
                      <Users size={15} className="text-primary-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">Capacity</p>
                        <p className="text-neutral-700 font-light text-sm">
                          {service.capacityMin}–{service.capacityMax} guests
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Clock size={15} className="text-primary-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">Typical Booking</p>
                      <p className="text-neutral-700 font-light text-sm">{service.durationRange}</p>
                    </div>
                  </div>
                </div>

                <NavLink
                  to="/booking"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800 mb-3"
                >
                  Check Availability
                </NavLink>

                <a
                  href={whatsappLink(spaceEnquiryMessage(service.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-neutral-300 text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:border-primary-800 mb-4"
                >
                  Ask on WhatsApp
                </a>

                <p className="text-neutral-400 text-xs text-center font-light">
                  Questions?{' '}
                  <NavLink to="/contact" className="text-primary-600 hover:text-primary-800 transition-colors">
                    Contact us
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOMS ────────────────────────────────────────────── */}
      {rooms.length > 0 && (
        <section className="py-16 lg:py-24 bg-white border-t border-neutral-200">
          <div className="container-custom">
            <SectionLabel>Rooms Available</SectionLabel>

            <h2
              className="text-primary-950 mb-3 max-w-2xl"
              style={{
                fontFamily: headingFont,
                fontWeight: 300,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              {rooms.length} rooms you can book for {service.nounPhrase}
            </h2>
            <p className="text-neutral-500 font-light max-w-2xl mb-12" style={{ fontSize: '0.98rem' }}>
              Every room is in the same building on Lekki Phase 1, so a booking can move between sets without changing
              location.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map(({ space, note }, index) => (
                <motion.article
                  key={space.slug}
                  variants={fadeUp}
                  custom={Math.min(index, 4) * 0.08}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <NavLink to={`/spaces/${space.slug}`} className="group block h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-5">
                      <img
                        src={space.mainImage}
                        alt={space.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3
                        className="text-primary-950 group-hover:text-primary-700 transition-colors duration-200"
                        style={{ fontFamily: headingFont, fontWeight: 300, fontSize: '1.1rem' }}
                      >
                        {space.name}
                      </h3>
                      <span className="text-neutral-400 text-xs font-light shrink-0">
                        {formatNaira(space.hourlyRate)}/hr
                      </span>
                    </div>

                    {note && (
                      <p className="text-neutral-500 text-sm font-light leading-relaxed mb-3">{note}</p>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-primary-700 text-[11px] tracking-[0.12em] uppercase">
                      View Room
                      <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </NavLink>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      {service.caseStudies.length > 0 && (
        <section className="py-16 lg:py-24 bg-primary-950">
          <div className="container-custom">
            <SectionLabel light>Case Studies</SectionLabel>

            <h2
              className="text-white mb-14 max-w-2xl"
              style={{
                fontFamily: headingFont,
                fontWeight: 300,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              What people have actually shot and hosted here
            </h2>

            <div className="space-y-16 lg:space-y-20">
              {service.caseStudies.map((study, index) => (
                <motion.article
                  key={study.title}
                  variants={fadeUp}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
                >
                  {study.images.length > 0 && (
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <CaseStudyCarousel images={study.images} title={study.title} />
                    </div>
                  )}

                  <div>
                    <p className="text-secondary-300/70 text-[10px] tracking-[0.18em] uppercase mb-4">
                      {study.client} · {study.spaceName}
                    </p>

                    <h3
                      className="text-white mb-5"
                      style={{
                        fontFamily: headingFont,
                        fontWeight: 300,
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                        lineHeight: 1.25,
                      }}
                    >
                      {study.title}
                    </h3>

                    <p className="text-neutral-400 font-light leading-relaxed mb-6" style={{ fontSize: '0.98rem' }}>
                      {study.story}
                    </p>

                    <div className="border-l-2 border-secondary-300/40 pl-5">
                      <p className="text-neutral-500 text-[10px] tracking-[0.15em] uppercase mb-1.5">Outcome</p>
                      <p className="text-secondary-300 font-light" style={{ fontSize: '0.98rem' }}>
                        {study.outcome}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ─────────────────────────────────────────────── */}
      {service.faqs.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
              <div className="lg:col-span-1">
                <SectionLabel>Questions</SectionLabel>
                <h2
                  className="text-primary-950 mb-4"
                  style={{
                    fontFamily: headingFont,
                    fontWeight: 300,
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                  }}
                >
                  Frequently asked
                </h2>
                <p className="text-neutral-500 font-light text-sm leading-relaxed mb-6">
                  Still unsure about something? Message us on WhatsApp — we usually reply within the hour.
                </p>
                <a
                  href={whatsappLink(spaceEnquiryMessage(service.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary-700 hover:text-primary-950 text-[11px] tracking-[0.12em] uppercase transition-colors duration-200"
                >
                  Ask a Question
                  <ChevronRight size={12} />
                </a>
              </div>

              <div className="lg:col-span-2 border-t border-neutral-200">
                {service.faqs.map((faq, index) => (
                  <FaqItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING CTA ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-secondary-300">
        <div className="container-custom text-center">
          <h2
            className="text-primary-950 mb-5 max-w-2xl mx-auto"
            style={{
              fontFamily: headingFont,
              fontWeight: 300,
              fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            Ready to book {service.nounPhrase}?
          </h2>
          <p className="text-primary-900/60 font-light max-w-xl mx-auto mb-10" style={{ fontSize: '1rem' }}>
            Tell us your date and what you're making. We'll confirm availability and hold the room.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <NavLink
              to="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800"
            >
              Book a Space
            </NavLink>
            <a
              href={whatsappLink(spaceEnquiryMessage(service.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-primary-950/25 text-primary-950 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:border-primary-950"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-t border-neutral-200">
          <div className="container-custom">
            <SectionLabel>Other Services</SectionLabel>

            <div
              className={`grid gap-8 ${
                related.length === 1
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {related.map((item) => (
                <NavLink key={item.slug} to={`/services/${item.slug}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-100 mb-5">
                    {item.heroImage && (
                      <img
                        src={item.heroImage.url}
                        alt={item.heroImage.alt || item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <h3
                    className="text-primary-950 mb-2 group-hover:text-primary-700 transition-colors duration-200"
                    style={{ fontFamily: headingFont, fontWeight: 300, fontSize: '1.1rem' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-2">{item.intro}</p>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePage;
