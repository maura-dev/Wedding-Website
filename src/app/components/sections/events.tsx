 
// ─── Events ──────────────────────────────────────────────────────────────────
import { COLORS, styles } from "../utils/consts";
export function Events() {


const EVENTS = [
    {
      icon: "🥁",
      day: "Day one",
      name: "Traditional wedding",
      date: "Thursday, 20 August 2026",
      time: "10:00 AM — onwards",
      venue: "Nduneri Family Compound, Anambra State",
      note: "Igba nkwu nwanyi ceremony, wine carrying & traditional rites",
    },
    {
      icon: "💍",
      day: "Day two — morning",
      name: "White wedding",
      date: "Saturday, 22 August 2026",
      time: "10:00 AM",
      venue: "Abiding Word Ministries, Enugu state",
      note: "Church ceremony & blessing",
    },
    {
      icon: "🎉",
      day: "Day two — evening",
      name: "Reception",
      date: "Saturday, 22 August 2026",
      time: "After church ceremony",
      venue: "Enugu state",
      note: "Come and celebrate with us!",
    },
  ];

    return (
      <section id="programme" className="py-24 px-6" style={{ background: "#1A4731" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#C9A84C" }}>Join Us</p>
            <h2 className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>Wedding Programme</h2>
            <div className="w-14 h-px mx-auto mt-4" style={{ background: "#C9A84C" }} />
          </div>
   
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "10px" }}>
            {EVENTS.map((e:any, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${COLORS.gold},transparent)` }} />
                <div style={{ fontSize: "1.8rem", marginBottom: "1.2rem" }}>{e.icon}</div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.5rem" }}>{e.day}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontStyle: "italic", color: "#fff", marginBottom: "1.2rem" }}>{e.name}</h3>
                {[["📅", e.date], ["🕙", e.time], ["📍", e.venue]].map(([icon, val]) => (
                  <div key={val} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.6rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    <span>{icon}</span><span>{val}</span>
                  </div>
                ))}
                <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontStyle: "italic" }}>{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }