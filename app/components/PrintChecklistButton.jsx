'use client';

export default function PrintChecklistButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-4 py-2 rounded-xl bg-white text-[#0a1628] font-bold text-xs sm:text-sm hover:bg-slate-100 transition cursor-pointer print:hidden"
    >
      🖨️ Print / Save PDF
    </button>
  );
}
