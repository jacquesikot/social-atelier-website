import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { formatPostDate, getPostBySlug, getRelatedPosts } from '../data/blog';
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

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const related = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = post ? `${post.title} | The Social Atelier` : 'Story Not Found | The Social Atelier';

    // Set the meta description per post so search results and link previews
    // describe the article rather than the site as a whole.
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const original = meta?.content;
    if (meta && post?.excerpt) meta.content = post.excerpt;

    if (post) trackEvent('blog_post_view', { post_slug: post.slug, post_title: post.title });

    return () => {
      if (meta && original) meta.content = original;
    };
  }, [post]);

  if (!post) {
    return (
      <div className="bg-neutral-50 min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1
            className="text-primary-950 mb-4"
            style={{ fontFamily: headingFont, fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Story Not Found
          </h1>
          <p className="text-neutral-500 font-light mb-8">
            The story you're looking for doesn't exist or may have been moved.
          </p>
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-950 text-white text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-primary-800"
          >
            View All Stories
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      {/* ── HEADER ───────────────────────────────────────────── */}
      <div className="relative bg-primary-950 overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        {post.mainImage && (
          <div className="absolute inset-0">
            <img src={post.mainImage.url} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-primary-950" />
          </div>
        )}

        <div className="container-custom relative z-10">
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-secondary-300 transition-colors duration-200 text-xs tracking-[0.15em] uppercase mb-8"
          >
            <ChevronLeft size={14} />
            The Blog
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
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(1.9rem, 4vw, 3.4rem)',
            }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 text-neutral-400 text-xs tracking-[0.12em] uppercase font-light"
          >
            {post.publishedDate && <span>{formatPostDate(post.publishedDate)}</span>}
            {post.publishedDate && post.author && <span className="w-4 h-px bg-neutral-600" />}
            {post.author && <span>{post.author}</span>}
          </motion.div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <article className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {post.mainImage && (
              <div className="aspect-[16/9] overflow-hidden mb-12">
                <img
                  src={post.mainImage.url}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post.excerpt && (
              <p className="text-primary-800 font-light leading-relaxed mb-10" style={{ fontSize: '1.15rem' }}>
                {post.excerpt}
              </p>
            )}

            {/*
              Webflow rich text is delivered as an HTML string, so it has to be
              injected rather than rendered as React children. The content comes
              from our own authenticated CMS at build time — not from user
              input — so there is no untrusted author here. `prose-atelier`
              styles the injected tags, which cannot carry Tailwind classes.
            */}
            <div
              className="prose-atelier"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </div>
      </article>

      {/* ── RELATED ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="pb-24 lg:pb-32">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-8 pt-12 border-t border-neutral-200">
                <span className="block w-6 h-px bg-primary-800 opacity-40" />
                <span className="text-primary-800 text-xs tracking-[0.2em] uppercase font-light">Keep Reading</span>
              </div>

              <div className="space-y-6">
                {related.map((item) => (
                  <NavLink key={item.id} to={`/blog/${item.slug}`} className="group flex gap-5 items-center">
                    <div className="w-24 h-20 shrink-0 overflow-hidden bg-neutral-100">
                      {item.thumbnailImage && (
                        <img
                          src={item.thumbnailImage.url}
                          alt={item.thumbnailImage.alt || item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      {item.publishedDate && (
                        <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase mb-1">
                          {formatPostDate(item.publishedDate)}
                        </p>
                      )}
                      <p
                        className="text-primary-950 group-hover:text-primary-700 transition-colors duration-200"
                        style={{ fontFamily: headingFont, fontWeight: 300, fontSize: '1rem' }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
