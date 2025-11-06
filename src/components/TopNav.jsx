import { Shield, Settings, User } from "lucide-react";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 leading-tight">RTGS • Govt. of Andhra Pradesh</p>
            <h1 className="text-base font-semibold leading-tight">AI Personal Assistant</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200">
            <User className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
