export const VocabMockup = () => (
  <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
    <div className="flex items-center justify-between mb-4">
      <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">saved from videos</p>
      <span className="bg-lime-400/20 text-lime-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
        unlimited with Plus
      </span>
    </div>
    <div className="space-y-0">
      {[
        { word: "la estación", def: "the station · from Travel clip", status: "★ +5" },
        { word: "aprovechar", def: "to make the most of · from Vlog", status: "★ +5" },
        { word: "cotidiano", def: "everyday · from Morning Routine", status: "review" },
        { word: "¿Cuánto cuesta?", def: "how much? · from Market clip", status: "mastered" },
      ].map((w) => (
        <div key={w.word} className="flex items-center justify-between py-2.5 border-b border-neutral-800 last:border-0">
          <div>
            <p className="text-white text-xs font-medium">{w.word}</p>
            <p className="text-neutral-500 text-[10px]">{w.def}</p>
          </div>
          <span className="text-[9px] font-semibold text-lime-400">
            {w.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const GrammarMockup = () => (
  <div className="bg-white rounded-2xl p-5 border border-neutral-200">
    <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Explore filters</div>
    <h3 className="text-neutral-900 font-bold text-base mb-1 leading-tight">find your next video</h3>
    <p className="text-neutral-400 text-xs mb-4 leading-relaxed">filter by level, grammar, source, or format.</p>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {["Beginner", "Intermediate", "Advanced"].map((l, i) => (
        <span key={l} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${i === 0 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500"}`}>{l}</span>
      ))}
    </div>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {["Questions", "Past tense", "Commands", "Conversation"].map((g) => (
        <span key={g} className="px-2.5 py-1 rounded-full bg-lime-50 border border-lime-100 text-lime-700 text-[10px] font-medium">{g}</span>
      ))}
    </div>
    <div className="flex flex-wrap gap-1.5">
      {["Shorts", "Videos", "Music", "Vlog", "News"].map((s) => (
        <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-500 text-[10px]">{s}</span>
      ))}
    </div>
  </div>
);
