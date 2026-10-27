import { useAppStore } from './store';
import MoodScreen from './components/MoodScreen';
import EnvironmentsScreen from './components/EnvironmentsScreen';
import NowPlayingScreen from './components/NowPlayingScreen';
import BirdsLibraryScreen from './components/BirdsLibraryScreen';
import SoundLabScreen from './components/SoundLabScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';

export default function App() {
  const screen = useAppStore((state) => state.screen);

  switch (screen) {
    case 'mood':
      return <MoodScreen />;
    case 'environments':
      return <EnvironmentsScreen />;
    case 'playing':
      return <NowPlayingScreen />;
    case 'birds':
      return <BirdsLibraryScreen />;
    case 'sound-lab':
      return <SoundLabScreen />;
    case 'history':
      return <HistoryScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <MoodScreen />;
  }
}
