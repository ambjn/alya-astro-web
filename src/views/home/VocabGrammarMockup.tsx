import { APP_STORE_URL } from "../../constants";

export const VocabMockup = () => (
  <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
    <div className="flex items-center justify-between mb-4">
      <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">My Words</p>
      <span className="bg-lime-400/20 text-lime-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
        5 due for review
      </span>
    </div>
    <div className="flex gap-5 mb-4 pb-4 border-b border-neutral-800">
      {[
        { n: "47", label: "total", accent: false },
        { n: "5", label: "due", accent: true },
        { n: "12", label: "mastered", accent: false },
      ].map((s) => (
        <div key={s.label}>
          <p className={`text-xl font-bold leading-none ${s.accent ? "text-lime-400" : "text-white"}`}>{s.n}</p>
          <p className="text-neutral-500 text-[9px] uppercase tracking-wider mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="space-y-0">
      {[
        { word: "mariposa", def: "butterfly", status: "mastered" },
        { word: "aprovechar", def: "to make the most of", status: "due now" },
        { word: "añorar", def: "to miss deeply", status: "due now" },
        { word: "cotidiano", def: "everyday, daily", status: "due now" },
      ].map((w) => (
        <div key={w.word} className="flex items-center justify-between py-2.5 border-b border-neutral-800 last:border-0">
          <div>
            <p className="text-white text-xs font-medium">{w.word}</p>
            <p className="text-neutral-500 text-[10px]">{w.def}</p>
          </div>
          <span className={`text-[9px] font-semibold ${w.status === "due now" ? "text-lime-400" : "text-neutral-600"}`}>
            {w.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const GrammarMockup = () => (
  <div className="bg-white rounded-2xl p-5 border border-neutral-200">
    <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Grammar Card ❤️</div>
    <h3 className="text-neutral-900 font-bold text-base mb-1 leading-tight">ser vs. estar</h3>
    <p className="text-neutral-400 text-xs mb-4 leading-relaxed">both mean "to be", but they're not the same.</p>
    <div className="space-y-2 mb-4">
      <div className="bg-lime-50 rounded-xl p-3 border border-lime-100">
        <p className="text-lime-700 text-[9px] font-bold uppercase tracking-wide mb-1">ser: identity, origin</p>
        <p className="text-neutral-500 text-xs italic">Soy estudiante. (I am a student.)</p>
      </div>
      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
        <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-wide mb-1">estar: states, location</p>
        <p className="text-neutral-500 text-xs italic">Estoy cansado. (I am tired.)</p>
      </div>
    </div>
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-neutral-900 hover:bg-lime-500 transition-colors rounded-xl py-2.5 text-center cursor-pointer"
    >
      <span className="text-white text-xs font-semibold">practice with alya →</span>
    </a>
  </div>
);
