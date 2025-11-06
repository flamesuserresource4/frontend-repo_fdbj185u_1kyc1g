import { MessageSquare, Phone, Video, Send } from "lucide-react";
import { useState } from "react";

export default function CommPanel() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState([
    { from: "CMO", text: "Please schedule a district review on Friday 11:00 AM." },
  ]);

  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLog((prev) => [...prev, { from: "You", text: message.trim() }]);
    setMessage("");
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-9 w-9 rounded-lg bg-sky-600 text-white flex items-center justify-center">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">Secure Communication</h2>
          <p className="text-sm text-gray-500">In-app messaging with VoIP & video hooks</p>
        </div>
      </div>

      <div className="h-40 overflow-y-auto border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
        {log.map((item, idx) => (
          <div key={idx} className="text-sm">
            <span className="font-medium text-gray-700">{item.from}: </span>
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="mt-3 flex items-center gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Type a secure message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          type="submit"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <Phone className="h-4 w-4" /> Call
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <Video className="h-4 w-4" /> Video
        </button>
      </form>
    </section>
  );
}
