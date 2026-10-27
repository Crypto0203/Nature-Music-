import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Repeat,
  Timer,
  Save,
  Moon,
  Download,
  Trash2,
  Info,
  Code,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store';

export default function SettingsScreen() {
  const { setScreen, sessions, clearSessions } = useAppStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const handleExport = () => {
    if (sessions.length === 0) {
      setExportMessage('No data to export');
      setTimeout(() => setExportMessage(''), 3000);
      return;
    }

    let csv = 'session_id,timestamp,stress,source\n';
    for (const session of sessions) {
      for (const sample of session.samples) {
        csv += `${session.id},${sample.timestamp},${sample.stress.toFixed(3)},${sample.sourceTag}\n`;
      }
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calmnature_sessions.csv';
    a.click();
    URL.revokeObjectURL(url);
    setExportMessage(`Exported ${sessions.length} sessions`);
    setTimeout(() => setExportMessage(''), 3000);
  };

  const handleClear = () => {
    clearSessions();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setScreen('mood')}
          className="flex items-center gap-2 text-[#90CAF9] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-8"
        >
          Settings
        </motion.h1>

        {/* Audio Section */}
        <Section title="Audio">
          <SettingTile icon={<Volume2 size={18} />} label="Default Volume" value="Medium" />
          <SettingTile icon={<Sparkles size={18} />} label="Audio Quality" value="High" />
          <SettingTile icon={<Repeat size={18} />} label="Loop Seamless" value="Enabled" />
        </Section>

        {/* Session Section */}
        <Section title="Session">
          <SettingTile icon={<Timer size={18} />} label="Default Duration" value="30 minutes" />
          <SettingTile icon={<Save size={18} />} label="Auto-save History" value="On" />
        </Section>

        {/* Appearance Section */}
        <Section title="Appearance">
          <SettingTile icon={<Moon size={18} />} label="Theme" value="Dark" />
        </Section>

        {/* Data Section */}
        <Section title="Data">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#243352] transition-colors"
          >
            <Download size={18} className="text-[#4FC3F7]" />
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium">Export CSV</p>
              <p className="text-[#607D8B] text-xs">
                {exportMessage || 'Tap to export'}
              </p>
            </div>
            <ChevronRight size={16} className="text-[#607D8B]" />
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#243352] transition-colors"
          >
            <Trash2 size={18} className="text-[#4FC3F7]" />
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium">Clear History</p>
              <p className="text-[#607D8B] text-xs">Delete all sessions</p>
            </div>
            <ChevronRight size={16} className="text-[#607D8B]" />
          </button>
        </Section>

        {/* About Section */}
        <Section title="About">
          <SettingTile icon={<Info size={18} />} label="Version" value="1.0.0" />
          <SettingTile icon={<Code size={18} />} label="Built With" value="React + Tailwind" />
          <div className="flex items-center gap-4 px-4 py-3.5">
            <Heart size={18} className="text-[#4FC3F7]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Made with ❤️</p>
              <p className="text-[#607D8B] text-xs">By CalmNature Team</p>
            </div>
          </div>
        </Section>

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A2A4A] rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-white mb-2">Clear all sessions?</h3>
              <p className="text-[#90CAF9] text-sm mb-6">This cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-5 py-2 rounded-xl text-[#90CAF9] hover:bg-[#243352] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <p className="text-[#607D8B] text-xs font-bold uppercase tracking-widest mb-2 ml-1">
        {title}
      </p>
      <div className="bg-[#1A2A4A] rounded-2xl overflow-hidden divide-y divide-[#243352]">
        {children}
      </div>
    </motion.div>
  );
}

function SettingTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <div className="text-[#4FC3F7]">{icon}</div>
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-[#607D8B] text-xs">{value}</p>
      </div>
      <ChevronRight size={16} className="text-[#607D8B]" />
    </div>
  );
}
