import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PHASES = [
  { text: 'Inhale', duration: 4, scale: 1.5, color: '#4FC3F7' },
  { text: 'Hold', duration: 4, scale: 1.5, color: '#4DB6AC' },
  { text: 'Exhale', duration: 4, scale: 1.0, color: '#BA68C8' },
  { text: 'Hold', duration: 2, scale: 1.0, color: '#7986CB' },
];

export default function BreathingGuide() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = (phaseIndex + 1) % PHASES.length;
          setPhaseIndex(nextIndex);
          return PHASES[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phaseIndex]);

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{
            scale: currentPhase.scale,
            borderColor: currentPhase.color,
            boxShadow: `0 0 40px ${currentPhase.color}40`,
          }}
          transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-30"
        />

        {/* Main breathing circle */}
        <motion.div
          animate={{
            scale: currentPhase.scale,
            backgroundColor: currentPhase.color,
            boxShadow: `0 0 60px ${currentPhase.color}60`,
          }}
          transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full flex items-center justify-center relative z-10"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPhase.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-white font-bold text-sm uppercase tracking-wider"
            >
              {currentPhase.text}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <motion.circle
            cx="96"
            cy="96"
            r="90"
            fill="none"
            stroke={currentPhase.color}
            strokeWidth="2"
            strokeDasharray="565"
            animate={{
              strokeDashoffset: [565, 0],
            }}
            transition={{ duration: currentPhase.duration, ease: "linear" }}
            className="opacity-20"
          />
        </svg>
      </div>

      <motion.p
        key={currentPhase.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-[#90CAF9] text-xs font-medium tracking-[0.2em] uppercase"
      >
        {timeLeft}s remaining
      </motion.p>
    </div>
  );
}
