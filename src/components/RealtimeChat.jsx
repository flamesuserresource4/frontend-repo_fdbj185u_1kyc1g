import { useEffect, useRef, useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

// Simple in-page realtime-like chat using BroadcastChannel (works across tabs)
export default function RealtimeChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const channelRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const channel = new BroadcastChannel('realtime-chat');
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const msg = event.data;
      setMessages((prev) => [...prev, msg]);
    };

    return () => channel.close();
  }, []);

  useEffect(() => {
    // autoscroll to bottom
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const msg = { id: crypto.randomUUID(), text: trimmed, ts: new Date().toLocaleTimeString(), self: true };
    setMessages((prev) => [...prev, msg]);
    channelRef.current?.postMessage({ ...msg, self: false });
    setInput('');
  };

  return (
    <section className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center">
          <MessageCircle size={16} />
        </div>
        <h3 className="font-semibold">Realtime Chat</h3>
        <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">multi-tab demo</span>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto space-y-2 pr-2" style={{ maxHeight: 320 }}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow ${m.self ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-neutral-100 dark:bg-neutral-800 rounded-bl-sm'}`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.self ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-400'}`}>{m.ts}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message and hit Enter"
          className="flex-1 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 ring-indigo-500/30"
        />
        <button onClick={send} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm shadow hover:bg-indigo-500 active:scale-[0.98]">
          <Send size={16} />
          Send
        </button>
      </div>
    </section>
  );
}
