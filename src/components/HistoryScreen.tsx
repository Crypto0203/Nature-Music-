import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '../store';
import { SessionRecord } from '../types';
import { getMood } from '../data';

export default function HistoryScreen() {
  const { sessions, setScreen } = useAppStore();

  const totalMinutes = sessions.reduce((sum, s) => {
    const dur = s.end ? new Date(s.end).getTime() - new Date(s.start).getTime() : 0;
    return sum + dur / 60000;
  }, 0);

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7986CB] opacity-[0.06] blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setScreen('mood')}
          className="flex items-center gap-2 text-[#B0BEC5] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Journey</h1>
          <p className="text-[#B0BEC5]">
            {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'} · {Math.round(totalMinutes)} minutes of healing
          </p>
        </motion.div>

        {sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/[0.03] rounded-3xl border border-white/5"
          >
            <span className="text-7xl mb-4 block">🌱</span>
            <p className="text-xl text-white/80 mb-2">Your story begins here</p>
            <p className="text-sm text-[#607D8B]">Start a session to track your wellness journey</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <SessionCard key={s.id} session={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session, index }: { session: SessionRecord; index: number }) {
  const start = new Date(session.start);
  const end = session.end ? new Date(session.end) : new Date();
  const dur = end.getTime() - start.getTime();
  const min = Math.floor(dur / 60000);
  const sec = Math.floor((dur % 60000) / 1000);
  const mood = getMood(session.moodId);
  const accent = mood?.color || '#4FC3F7';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/[0.04] rounded-2xl p-4 border border-white/10 hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${accent}25`, border: `1px solid ${accent}40` }}
        >
          {session.moodEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-base truncate">{session.environmentName}</h3>
            <span
              className="text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded flex-shrink-0"
              style={{ background: `${accent}20`, color: accent }}
            >
              {session.moodLabel}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#90CAF9]/70">
            <span>{format(start, 'MMM d, yyyy · h:mm a')}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1.5 text-white/80">
            <Clock size={12} />
            <span className="text-sm font-mono">{min}m {sec}s</span>
          </div>
          <p className="text-[10px] text-white/40 mt-0.5">{session.samples.length} samples</p>
        </div>
      </div>
    </motion.div>
  );
}
