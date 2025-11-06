import { useEffect, useMemo, useRef, useState } from 'react';
import { TrendingUp, Activity, Cpu, Gauge } from 'lucide-react';

function StatCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="text-white" size={20} />
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${change >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="text-2xl font-semibold mt-1 tabular-nums">{value}</p>
      </div>
    </div>
  );
}

export default function LiveStats() {
  const [tick, setTick] = useState(0);
  const [series, setSeries] = useState(() => Array.from({ length: 30 }, () => 50 + Math.random() * 30));
  const rafRef = useRef(0);

  useEffect(() => {
    const loop = () => {
      setTick((t) => t + 1);
      setSeries((s) => {
        const next = [...s.slice(1), Math.max(10, Math.min(100, s[s.length - 1] + (Math.random() - 0.5) * 8))];
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const avg = useMemo(() => Math.round(series.reduce((a, b) => a + b, 0) / series.length), [series]);
  const last = series[series.length - 1];
  const change = useMemo(() => Math.round(((last - 50) / 50) * 10) / 10, [last]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={TrendingUp} label="Throughput" value={`${avg} req/s`} change={Math.round((last - avg) / 2)} color="bg-gradient-to-tr from-indigo-500 to-purple-500" />
      <StatCard icon={Activity} label="Latency" value={`${Math.max(10, Math.round(120 - last))} ms`} change={Math.round((last - 50) / 4)} color="bg-gradient-to-tr from-emerald-500 to-teal-500" />
      <StatCard icon={Cpu} label="CPU Load" value={`${Math.min(99, Math.round(last))}%`} change={Math.round((last - 60) / 3)} color="bg-gradient-to-tr from-amber-500 to-orange-500" />
      <StatCard icon={Gauge} label="Memory" value={`${Math.round(32 + (last - 50) / 4)}%`} change={Math.round((last - 55) / 5)} color="bg-gradient-to-tr from-pink-500 to-rose-500" />
    </section>
  );
}
