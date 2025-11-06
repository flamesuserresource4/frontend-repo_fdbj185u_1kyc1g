import { useEffect, useState } from 'react';
import { Rocket, Wifi, Clock } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <Rocket className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">Realtime Control Center</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Live metrics • Activity • Chat</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50">
            <Clock size={16} className="text-neutral-500" />
            <span className="tabular-nums">{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Wifi size={16} />
            <span className="font-medium">Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}
