"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart, Stars, Music, Sparkles, Coffee, Sun, Moon, Rocket, PartyPopper, Smile, Star } from "lucide-react";

interface RainHeart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  scale: number;
}

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [activeReason, setActiveReason] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [rainHearts, setRainHearts] = useState<RainHeart[]>([]);
  const controls = useAnimation();

  const reasons = [
    { text: "Your beautiful smile that lights up my day", icon: <Sun className="text-yellow-400" /> },
    { text: "The way you care for everyone around you", icon: <Heart className="text-pink-500" /> },
    // { text: "Our late night conversations", icon: <Moon className="text-blue-400" /> },
    { text: "How you make me want to be a better person", icon: <Rocket className="text-purple-500" /> },
    { text: "The way we share our coffee moments", icon: <Coffee className="text-amber-700" /> },
    // { text: "Your infectious laugh that's music to my ears", icon: <Music className="text-pink-400" /> },
    { text: "The sparkle in your eyes when you're happy", icon: <Stars className="text-yellow-300" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reasons.length]);

  const addHeart = (e: React.MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts((prev) => [...prev, newHeart]);
    setLoveCount((prev) => Math.min(prev + 1, 100));
    
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  const triggerRain = () => {
    const newRainHearts: RainHeart[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
      scale: 0.5 + Math.random() * 1,
    }));
    setRainHearts((prev) => [...prev, ...newRainHearts]);
    setTimeout(() => {
      setRainHearts((prev) => prev.filter((h) => !newRainHearts.find(nh => nh.id === h.id)));
    }, 4000);
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-romantic-50 to-pink-100" 
      onClick={addHeart}
    >
      {/* Background Floating Hearts - More Pink & Varied */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'text-pink-200' : 'text-romantic-300'} opacity-30`}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.4 + 0.3 
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 45, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={20 + Math.random() * 60} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Heart Rain Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {rainHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ top: -50, left: `${heart.left}%`, opacity: 0, scale: heart.scale }}
              animate={{ top: "110%", opacity: [0, 1, 1, 0], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: heart.duration, delay: heart.delay, ease: "linear" }}
              className="absolute text-pink-400 z-40"
            >
              <Heart fill="currentColor" size={32} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Click Hearts */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1, x: heart.x - 12, y: heart.y - 12 }}
            animate={{ 
              scale: [1, 2, 0], 
              opacity: [1, 0.8, 0], 
              y: heart.y - 150,
              x: heart.x - 12 + (Math.random() * 100 - 50)
            }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none text-pink-500"
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-center z-10 relative">
        {/* Love Meter */}
        <div className="fixed top-8 right-8 z-30 flex flex-col items-center gap-2">
          <div className="text-pink-600 font-bold text-sm uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={14} /> Love Level <Sparkles size={14} />
          </div>
          <div className="w-32 h-4 bg-white/50 backdrop-blur-md rounded-full border border-pink-200 overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-400 to-romantic-500"
              initial={{ width: 0 }}
              animate={{ width: `${loveCount}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          <div className="text-pink-500 text-xs font-medium">{loveCount}% Full</div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block group cursor-pointer" onClick={(e) => { e.stopPropagation(); triggerRain(); }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-pink-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              <Heart size={140} fill="currentColor" className="drop-shadow-2xl" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute -top-6 -right-6 text-yellow-400"
            >
              <Star size={48} fill="currentColor" />
            </motion.div>
            <div className="absolute -bottom-2 -left-4 text-romantic-400 animate-bounce">
              <Smile size={32} />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-romantic-800 mb-8 font-serif italic"
        >
          For My Favorite Person
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-romantic-600 mb-12 max-w-2xl leading-relaxed font-medium italic"
        >
          "You are the pink in my cheeks, the skip in my heart, and the smile on my face."
        </motion.p>

        {/* Reasons Section - Enhanced UI */}
        <div className="w-full max-w-lg bg-white/60 backdrop-blur-md p-10 rounded-[40px] shadow-2xl border-2 border-pink-100 mb-12 transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-2xl font-bold text-pink-700 mb-8 flex items-center justify-center gap-3">
            <PartyPopper className="text-pink-400" size={24} />
            Why You're Amazing
            <PartyPopper className="text-pink-400" size={24} />
          </h2>
          <div className="h-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReason}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -10 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="p-4 bg-pink-100 rounded-2xl text-pink-600 shadow-md">
                  {reasons[activeReason].icon}
                </div>
                <p className="text-romantic-900 font-bold italic text-xl md:text-2xl">
                  "{reasons[activeReason].text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMessage(!showMessage);
              triggerRain();
            }}
            className="bg-gradient-to-r from-pink-500 to-romantic-600 hover:from-pink-600 hover:to-romantic-700 text-white px-10 py-5 rounded-full font-black text-xl shadow-[0_10px_20px_rgba(244,63,94,0.4)] transition-all flex items-center gap-3"
          >
            {showMessage ? "Close Love Note" : "Open Love Note"}
            <Heart size={24} fill="white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              triggerRain();
            }}
            className="bg-white text-pink-500 border-2 border-pink-200 px-10 py-5 rounded-full font-black text-xl shadow-lg hover:bg-pink-50 transition-all flex items-center gap-3"
          >
            Send Love Rain
            <Sparkles size={24} />
          </motion.button>
        </div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.8, y: 30 }}
              className="mt-12 overflow-hidden w-full"
            >
              <div className="bg-white p-10 rounded-[50px] shadow-2xl border-4 border-pink-100 text-romantic-900 italic text-2xl leading-relaxed max-w-xl mx-auto relative">
                <div className="absolute -top-4 -left-4 text-pink-300 transform -rotate-12">
                  <Heart size={48} fill="currentColor" />
                </div>
                <div className="absolute -bottom-4 -right-4 text-pink-300 transform rotate-12">
                  <Heart size={48} fill="currentColor" />
                </div>
                "My dear, you are my sun, my moon, and all my stars. 
                Meeting you was the best thing that ever happened to me, 
                and loving you is the easiest thing I've ever done. 
                Thank you for being my everything."
                <div className="mt-8 font-black text-pink-600 not-italic text-3xl">— Forever Yours ❤️</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="absolute bottom-8 w-full text-center text-pink-400 font-black text-sm uppercase tracking-widest">
        Designed with pure love by Ronak
      </footer>
    </main>
  );
}
