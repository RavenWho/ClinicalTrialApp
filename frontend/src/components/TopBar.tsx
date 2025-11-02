export default function TopBar() {
  return (
    <header className="h-14 border-b border-[#1F2229] bg-[#0B0C0F] flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-3">
        <select className="bg-[#111318] border border-[#1F2229] rounded-md px-3 py-2 text-sm">
          <option>All Trials</option>
        </select>
        <input
          type="date"
          className="bg-[#111318] border border-[#1F2229] rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#A3A9B6]">Admin</span>
        <div className="w-8 h-8 rounded-full bg-[#335EEA] grid place-items-center text-white text-xs">
          JB
        </div>
      </div>
    </header>
  );
}
