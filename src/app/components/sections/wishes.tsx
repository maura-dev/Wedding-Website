 
// ─── Wishes ──────────────────────────────────────────────────────────────────
import { MapPin, Send, Star, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

type WishItem = { name: string; relation: string; message: string; created_at: string; star: boolean };

export function Wishes() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [wf, setWf] = useState({ name: "", relation: "", message: "" });
  const [wSent, setWSent] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishes = async () => {
        const { data } = await supabase
            .from("wishes")
            .select("*")
            .order("created_at", { ascending: false });
        setWishes(data || []);
        setLoading(false);
        };

        fetchWishes();

        // Real-time: new wishes appear instantly for everyone
        const channel = supabase
        .channel("wishes")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" },
            (payload:any) => {
                // console.log(payload)
                setWishes((prev) => [payload.new, ...prev])
            }
        )
        .subscribe();

        return () => {
        supabase.removeChannel(channel);
        return; // Explicitly return void
        };
    }, []);

    // Submit a wish
    async function submitWish() {
        if (!wf.name.trim() || !wf.message.trim()) return;
        const { data, error } = await supabase.from("wishes").insert([wf]).select().single();
        if (error) throw error;
        else {
            setWishes((w:any) => [{ ...(data ? data : {}), star: false }, ...w]);
            setWf({ name: "", relation: "", message: "" });
            setWSent(true);
            setTimeout(() => setWSent(false), 3500);
        }
    }

    function timeAgo(dateInput: string | Date): string {
        const stored = typeof dateInput === "string"
          ? dateInput.endsWith("Z") ? dateInput : dateInput + "Z"  // force UTC parse
          : dateInput;
      
        const utcDate = new Date(stored);
        const seconds = Math.floor((Date.now() - utcDate.getTime()) / 1000);
      
        if (seconds < 10) return "just now";
        if (seconds < 60) return `${seconds} seconds ago`;
      
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
      
        const weeks = Math.floor(days / 7);
        if (weeks < 5) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
      
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
      
        const years = Math.floor(days / 365);
        return `${years} year${years !== 1 ? "s" : ""} ago`;
      }

    if (loading) return <p>Loading wishes...</p>;
    return (
        <section id="wishes" className="py-24 px-6" style={{ background: "#0D2B1D" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#C9A84C" }}>From the Heart</p>
            <h2 className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>Wishes & Prayers</h2>
            <div className="w-14 h-px mx-auto mt-4" style={{ background: "#C9A84C" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="font-bold mb-6" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", color: "#C9A84C" }}>Leave Your Blessing</h3>
              {wSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-5xl mb-4">🎊</div>
                  <p className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem" }}>Thank you!</p>
                  <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>Your wish has been added to the wall. God bless you!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { label: "Your Name *", key: "name", placeholder: "e.g. Chidinma Okafor" },
                    { label: "Relation", key: "relation", placeholder: "e.g. Friend of the groom" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</label>
                      <input
                        value={wf[key as keyof typeof wf]}
                        onChange={(e) => setWf((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Your Message *</label>
                    <textarea
                      value={wf.message}
                      onChange={(e) => setWf((f) => ({ ...f, message: e.target.value }))}
                      rows={5}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
                      placeholder="Share your prayers and well wishes for the couple..."
                    />
                  </div>
                  <button onClick={submitWish}
                    className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95"
                    style={{ background: "#C9A84C", color: "#1A4731" }}>
                    <Send size={15} /> Send My Wishes
                  </button>
                </div>
              )}
            </div>

            {/* Wish cards */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {wishes.map((w, i) => (
                <div key={i} className="rounded-xl p-5 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-bold text-sm">{w.name}</p>
                      {w.relation && (
                        <p className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                          <UserCheck size={10} />{w.relation}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {w.star && <Star size={12} style={{ color: "#C9A84C", fill: "#C9A84C" }} />}
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{timeAgo(w.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{w.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }