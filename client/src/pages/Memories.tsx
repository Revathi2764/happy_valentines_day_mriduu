import { useMemories } from "@/hooks/use-memories";
import { PolaroidCard } from "@/components/PolaroidCard";
import { Loader2, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, memo } from "react";

// Loading Spinner
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <motion.div
      animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Loader2 className="w-12 h-12 text-pink-400" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-6 font-arial text-xl text-pink-600"
    >
      Loading our precious moments...
    </motion.p>
  </div>
));
LoadingSpinner.displayName = "LoadingSpinner";

// Decorative Sparkles
const DecorativeSparkle = memo(({ delay, index }: { delay: number; index: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${15 + index * 20}%`,
      top: `${10 + (index % 3) * 25}%`,
    }}
    animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15], scale: [0.9, 1, 0.9] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <Sparkles className="w-4 h-4 text-pink-400/40" />
  </motion.div>
));
DecorativeSparkle.displayName = "DecorativeSparkle";

export default function Memories() {
  const { data: memories, isLoading } = useMemories();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const displayMemories =
    memories && memories.length > 0
      ? memories
      : [
          { id: 1, url: "/naturals.jpg", type: "image", caption: "The way you smile",  rotation: -2 },
          { id: 2, url: "/arabian.jpg", type: "image", caption: "Beautiful moments",  rotation: 3 },
          { id: 3, url: "/car.jpg", type: "image", caption: "Never letting go", rotation: -4 },
          { id: 4, url: "/kiss.jpg", type: "image", caption: "Craving for each other", rotation: 2 },
          { id: 5, url: "/call1 edited.jpg", type: "image", caption: "Holding on", rotation: 5 },
          { id: 6, url: "/hi lite mall.jpg", type: "image", caption: "Making time for us", rotation: -3 },
        ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent pointer-events-none" />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-300/25 to-purple-300/25 rounded-full blur-[100px]"
      />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <DecorativeSparkle key={i} delay={i * 0.5} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.h1
          className="text-center text-5xl font-arial leading-[1.3] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 mb-16"
        >
          Our Memory Lane
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {displayMemories.map((memory, index) => (
            <PolaroidCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        {/* Final Letter Section */}
        <motion.div className="flex flex-col items-center justify-center py-16 text-center">

          <Link href="/final">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white rounded-full font-serif shadow-xl shadow-pink-300/40"
            >
              Read My Letter
            </motion.button>
          </Link>

          <p className="text-sm text-gray-500 italic mt-4">
            Something that came to my mind ♡
          </p>
        </motion.div>
      </div>
    </div>
  );
}
