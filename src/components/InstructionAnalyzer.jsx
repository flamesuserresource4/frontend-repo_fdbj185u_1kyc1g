import { FileText, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function InstructionAnalyzer({ onAnalyze }) {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");

  async function handleAnalyze(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const payload = { text, lang };
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const res = await fetch(`${base}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      onAnalyze?.(data);
    } catch (err) {
      onAnalyze?.({ summary: "Failed to analyze. Please try again.", actions: [] });
    }
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">Instruction & Document Intelligence</h2>
          <p className="text-sm text-gray-500">Summarize and extract action items (English/Telugu)</p>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-3">
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Paste WhatsApp message or note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center justify-between gap-3">
          <select
            className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="te">Telugu</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Analyze <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </section>
  );
}
