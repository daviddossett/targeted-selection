"use client";

import { AppProvider } from "@/contexts/AppContext";
import { Sidebar } from "@/components/Sidebar";
import { AppPreview } from "@/components/AppPreview";

export default function Home() {
  return (
    <AppProvider>
      <main className="flex min-h-screen">
        <div className="w-80 h-screen overflow-auto no-overscroll">
          <Sidebar />
        </div>
        <div className="flex-1 h-screen">
          <AppPreview />
        </div>
      </main>
    </AppProvider>
  );
}
