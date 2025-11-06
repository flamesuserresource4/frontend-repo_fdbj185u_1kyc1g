import { useEffect, useRef, useState } from 'react';
import { Bell, User, Server, MessageSquare } from 'lucide-react';

const eventsPool = [
  { icon: User, color: 'bg-indigo-500', text: 'New user signed up' },
  { icon: Server, color: 'bg-emerald-500', text: 'Deployment finished' },
  { icon: MessageSquare, color: 'bg-amber-500', text: 'New message in support' },
  { icon: Bell, color: 'bg-rose-500', text: 'Alert resolved automatically' },
];

function EventItem({ Icon, color, text, time }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`h-8 w-8 rounded-lg ${color} text-white flex items-center justify-center shadow`}> 
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{time}</p>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const [events, setEvents] = useState([]);
  const intervalRef = useRef(0);

  useEffect(() => {
    // Seed initial events
    setEvents(() => Array.from({ length: 6 }).map(() => {
      const e = eventsPool[Math.floor(Math.random() * eventsPool.length)];
      return { ...e, time: new Date().toLocaleTimeString() };
    }));

    intervalRef.current = window.setInterval(() => {
      const e = eventsPool[Math.floor(Math.random() * eventsPool.length)];
      setEvents((prev) => [{ ...e, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 12));
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Live Activity</h3>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">auto-updating</span>
      </div>
      <div className="overflow-y-auto pr-2" style={{ maxHeight: 320 }}>
        {events.map((e, i) => (
          <EventItem key={i} Icon={e.icon} color={e.color} text={e.text} time={e.time} />
        ))}
      </div>
    </section>
  );
}
