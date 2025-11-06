import Header from './components/Header';
import Hero3D from './components/Hero3D';
import LiveStats from './components/LiveStats';
import ActivityFeed from './components/ActivityFeed';
import RealtimeChat from './components/RealtimeChat';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Hero3D />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LiveStats />
            <RealtimeChat />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>

      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-neutral-500 dark:text-neutral-400">
          Built as a live, realtime-style dashboard demo.
        </div>
      </footer>
    </div>
  );
}
