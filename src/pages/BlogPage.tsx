import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { formatPostDate, posts } from '../data/blog';
import { BlogPost } from '../types';

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

const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <motion.article
    variants={fadeUp}
    custom={Math.min(index, 4) * 0.08}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
  >
    <NavLink to={`/blog/${post.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100 mb-5">
        {post.thumbnailImage ? (
          <img
            src={post.thumbnailImage.url}
            alt={post.thumbnailImage.alt || post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-primary-950/5" />
        )}
      </div>

      {post.publishedDate && (
        <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-2">
          {formatPostDate(post.publishedDate)}
        </p>
      )}

      <h2
        className="text-primary-950 mb-2 group-hover:text-primary-700 transition-colors duration-200"
        style={{ fontFamily: headingFont, fontWeight: 300, fontSize: '1.15rem', letterSpacing: '-0.01em' }}
      >
        {post.title}
      </h2>

      {post.excerpt && (
        <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
      )}
    </NavLink>
  </motion.article>
);

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog | The Social Atelier';
  }, []);

  return (
    <div className="bg-neutral-50">
      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <div className="relative bg-primary-950 overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.ctfassets.net/g1pxcpqorahb/5UtPSybebHZE6rvahaDhh2/2df82a01cdbc5e43a3677a1941377366/WhatsApp_Image_2025-07-22_at_10.23.38_PM__3_.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-primary-950" />
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
            <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-light">The Blog</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="text-white mb-4"
            style={{
              fontFamily: headingFont,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            }}
          >
            Blog
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="text-neutral-400 font-light max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            Stories from the studio — shoots, spaces, and the people who create in them.
          </motion.p>
        </div>
      </div>

      {/* ── POSTS ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="border border-dashed border-neutral-300 p-16 text-center">
              <p className="text-neutral-500 font-light">
                No stories published yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
