import { ReactNode } from "react";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0B0C0F] text-[#E7E9EE]">
      <aside className="w-64 border-r border-[#1F2229] bg-[#111318]">
        <div className="h-14 flex items-center px-4 text-lg font-semibold">
          ClinicalTrialApp
        </div>
        <SideNav />
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <section className="p-6 overflow-auto min-w-0">{children}</section>
      </main>
    </div>
  );
}
