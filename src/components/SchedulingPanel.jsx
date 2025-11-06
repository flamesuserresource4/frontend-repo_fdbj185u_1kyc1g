import { CalendarDays, Bell, Clock } from "lucide-react";
import { useState } from "react";

export default function SchedulingPanel({ onCreate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invitees, setInvitees] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !date || !time) return;
    onCreate?.({ title, date, time, invitees });
    setTitle("");
    setDate("");
    setTime("");
    setInvitees("");
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">AI Scheduling</h2>
          <p className="text-sm text-gray-500">Create meetings with smart conflict checks</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="col-span-1 sm:col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Meeting title (e.g., District Review)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          className="col-span-1 sm:col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Invitees (comma-separated: CMO, CS, Collector)"
          value={invitees}
          onChange={(e) => setInvitees(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Bell className="h-4 w-4" /> Create & Notify
        </button>
      </form>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <p>Assistant proposes optimal slots, avoids conflicts, and sends reminders.</p>
      </div>
    </section>
  );
}
