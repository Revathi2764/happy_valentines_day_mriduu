import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, memo, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

// Memoized decorative sparkle component
const DecorativeSparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform"
    style={{ left, top }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.2, 0.35, 0.2],
    }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/30" />
  </motion.div>
));

DecorativeSparkle.displayName = "DecorativeSparkle";

// Optimized story section component with memoization
const StorySection = memo(({
  item,
  index,
  total,
}: {
  item: any;
  index: number;
  total: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" });
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Optimized transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 md:px-6 relative"
    >
      {/* Simplified floating decorations - only 2 sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(2)].map((_, i) => (
          <DecorativeSparkle
            key={i}
            delay={i}
            left={`${30 + i * 40}%`}
            top={`${20 + i * 30}%`}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className={cn(
          "max-w-6xl w-full grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10 will-change-transform",
          !isEven && "md:grid-flow-dense",
        )}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={cn("space-y-4 sm:space-y-6", !isEven && "md:col-start-2")}
        >
         

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-700 via-pink-600 to-purple-600 leading-tight"
          >
            {item.title}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
          />

          {/* Content */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-body leading-relaxed md:leading-loose"
          >
            {item.content}
          </motion.p>

          {/* Quote Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-2 text-pink-400/50"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-pink-300/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-pink-300/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Image - touch-friendly */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn("relative group w-full max-w-md mx-auto", !isEven && "md:col-start-1")}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          {/* Simplified decorative layers - reduced rotation and transforms */}
          <motion.div
            animate={{
              rotate: isImageHovered ? 4 : 2,
              scale: isImageHovered ? 1.01 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl sm:rounded-3xl transform shadow-md will-change-transform"
          />

          <motion.div
            animate={{
              rotate: isImageHovered ? -2 : -1,
            }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="absolute inset-0 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-2xl sm:rounded-3xl transform shadow-sm will-change-transform"
          />

          {/* Main image container */}
          <motion.div
            animate={{
              y: isImageHovered ? -6 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="relative bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white overflow-hidden aspect-auto will-change-transform"
          >
            {item.imageUrl ? (
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                animate={{
                  scale: isImageHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <motion.span
                  animate={{
                    scale: isImageHovered ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.6, repeat: isImageHovered ? Infinity : 0 }}
                  className="text-4xl sm:text-6xl md:text-8xl"
                >
                  ❤️
                </motion.span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

StorySection.displayName = "StorySection";

export default function Story() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  // Instant scroll reset on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Placeholder story data
  const sortedStory = [
    {
      id: 1,
      title: "The First Glance",
      content: "We never imagined the first glance that happened years back will lead us to this .Seeing this picture first even before meeting making us realise again that we should have been together way before.",
      imageUrl: "/Gemini_normal.png",
      order: 1
    },
    {
      id: 2,
      title: "Growing Closer",
      content: "Every conversation, every shared laugh, every fight, every quiet moment together brought us closer. I found myself looking forward to seeing you, thinking about you constantly.",
      imageUrl: "/hi lite normal.jpg",
      order: 2
    },
    {
      id: 3,
      title: "Falling Deeper",
      content: "I have no answer to why I love you Mridu , but if I am sure of something then it is that my eyes will always seek and  admire you with this same excitement .",
      imageUrl: "/eyes.jpg",
      order: 3
    },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* Simplified background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent pointer-events-none" />

      {/* Single optimized glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-[100px] will-change-transform"
      />

      {/* Music Player - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header ref={headerRef} className="text-center py-12 sm:py-16 md:py-24 px-4 relative">
          {/* Simplified decorative top element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1
              animate={{
                textShadow: [
                "0 0 15px rgba(244, 114, 182, 0.08)",
                "0 0 20px rgba(244, 114, 182, 0.12)",
                "0 0 15px rgba(244, 114, 182, 0.08)",
              ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-arial text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
            >
              The Two of Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              Every moment with you is a favorite memory waiting to be cherished forever.
            </motion.p>
          </motion.div>

          {/* Simplified floating hearts decoration - only 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="will-change-transform"
              >
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400/50 fill-pink-300/50" />
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* Story Sections */}
        <div className="space-y-0">
          {sortedStory.map((segment, idx) => (
            <StorySection
              key={segment.id}
              item={segment}
              index={idx}
              total={sortedStory.length}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-32 px-4 relative"
        >
          {/* Simplified decorative background */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[60px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center">

            <Link href="/memories">
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white rounded-full font-serif shadow-xl shadow-pink-300/40"
              >
                {/* Simplified button glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />

                <span className="relative flex items-center gap-2 sm:gap-3">
                  See Our Memories
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="will-change-transform"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 italic"
            >
              Every picture holds lot of emotions right ♡
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}