import { useState, useEffect } from "react";
import {
  Heart, Gift, ChevronLeft, ChevronRight,
  Calendar, RefreshCw, Trophy, Star, X, ShoppingBag, ExternalLink
} from "lucide-react";
import { Story } from "./components/sections/how-we-met";
import puzzleImg from "./components/assets/IMG_1762.jpeg";
import image1 from "./components/assets/IMG1.jpeg";
import image2 from "./components/assets/IMG2.jpeg";
import image3 from "./components/assets/IMG3.jpeg";
import image4 from "./components/assets/IMG4.jpeg";
import image5 from "./components/assets/IMG5.jpeg";
import image6 from "./components/assets/IMG6.jpeg";
import image7 from "./components/assets/IMG7.jpeg";
import image8 from "./components/assets/ac.jpeg";
import image9 from "./components/assets/solar.jpeg";
import image10 from "./components/assets/air-fryer.jpeg";
import image11 from "./components/assets/blender.jpeg";
import image12 from "./components/assets/cookware.jpeg";
import image13 from "./components/assets/food-processor.jpeg";
import image14 from "./components/assets/kettle.jpeg";
import image15 from "./components/assets/oil-bottle.jpeg";
import image16 from "./components/assets/plates.jpeg";
import image17 from "./components/assets/toaster.jpeg";
import image18 from "./components/assets/tray.jpeg";
import { Events } from "./components/sections/events";
import { ACCOUNTS, COLORS } from "./components/utils/consts";
import { Wishes } from "./components/sections/wishes";

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Gallery", href: "#gallery" },
  { label: "Our Story", href: "#story" },
  { label: "Programme", href: "#programme" },
  { label: "Registry", href: "#registry" },
  { label: "Wishes", href: "#wishes" },
  { label: "Fun Zone", href: "#fun" },
];

const PHOTOS = [
  { url: image1, caption: "Our love across the country" },
  { url: image2, caption: "Us in port hacourt, 2024." },
  { url: image3, caption: "Us in Enugu" },
  { url: image4, caption: "Lagos. The day he proposed" },
  { url: image5, caption: "At Benin, our pre wedding shoot" },
  { url: image6, caption: "At Benin, our pre wedding shoot" },
  { url: image7, caption: "Hanging out in Abuja." }
];

const REGISTRY = [
  { store: "Household Appliances", icon: "🛍️", category: "Home Essentials", desc: "Kitchen, bedroom, and living room items for our new home", color: "#1A4731" },
  { store: "Kitchenware", icon: "🍽️", category: "Kitchen & Dining", desc: "Fine cookware, cutlery, and entertaining pieces", color: "#7C1D3A" },
  { store: "Cash Gift", icon: "💵", category: "Goodwill Contribution", desc: "Your blessing in any form is deeply appreciated", color: "#4A7C59" },
];

type RegistryItem = { name: string; price?: string; img: string; igLink?: string; note?: string };

const REGISTRY_ITEMS: Record<string, RegistryItem[]> = {
  "Kitchenware": [
    { name: "Cast iron cookware", img: image12},
    { name: "Sandwich Maker", img: image17},
    { name: "Electronic Blender", img: image11},
    { name: "Electronic Food processor", img: image13},
    { name: "Air Fryer", img: image10},
    { name: "Ceramic Plates Set", img: image16},
    { name: "Oil dispensers", img: image15},
    { name: "Wooden tray set", img: image18},
    { name: "Whistling Kettle", img: image14},
  ],

  "Household Appliances": [
    { name: "Air Conditioner", img: image8},
    { name: "Solar Inverters", img: image9},
  ],


  "Cash Gift": [
    { name: "₦10,000 Blessing", price: "₦10,000", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&auto=format", igLink: "https://www.instagram.com/", note: "Every naira counts!" },
    { name: "₦25,000 Blessing", price: "₦25,000", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&auto=format", igLink: "https://www.instagram.com/", note: "A generous gesture" },
    { name: "₦50,000 Blessing", price: "₦50,000", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&auto=format", igLink: "https://www.instagram.com/", note: "Truly kind gift" },
    { name: "₦100,000 Blessing", price: "₦100,000", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop&auto=format", igLink: "https://www.instagram.com/", note: "Premium love offering" },
  ],
};
const VENDOR_LINKS: Record<string, { ig: string; wa: string; waMsg: string }> = {
  "Kitchenware": {
    ig: "https://www.instagram.com/dees_homeessentials?igsh=MTVidHNxamtxc2pxcQ%3D%3D&utm_source=qr",
    wa: "https://wa.me/qr/ZCIWI6OIZLQ4O1",
    waMsg: "Hello! I'd like to purchase an item from you. Can you help me?",
  },
};

const TRIVIA = [
  {
    q: "What course did the groom study for bachelors in the university?",
    opts: ["Archeology", "Physics and Astronomy", "Geology", "Petroleum Engineering"],
    ans: 2,
    fact: "Igba Nkwu Nwanyi (wine carrying) is the central moment of the Igbo traditional wedding — the bride searches the crowd and offers palm wine to her groom, signifying her choice.",
  },
  {
    q: "How many siblings does the bride have?",
    opts: ["5", "6", "4", "3"],
    ans: 0,
    fact: "Benin bronzes, created from the 13th century onwards, are considered among the finest sculptures in human history. They are held in major museums worldwide — and Nigeria continues to advocate for their return.",
  },
  {
    q: "What is the groom's favourite football club?",
    opts: ["Manchester United", "Chelsea", "Arsenal", "Manchester City"],
    ans: 1,
    fact: "Osanobua is the supreme deity in traditional Edo spirituality — roughly translated as the Creator God or Almighty. It is among the most sacred words in the Edo language.",
  },
  {
    q: "What is the bride's favourite color",
    opts: ["Red", "Green", "Blue", "Yellow"],
    ans: 3,
    fact: "Ekassa is a royal Edo dance performed during the Oba's celebrations, characterized by powerful drumming, elaborate beaded regalia, and movements that honor the king.",
  },
  {
    q: "How many siblings does the groom have?",
    opts: ["1", "2", "3", "4"],
    ans: 1,
    fact: "Ukwa (African breadfruit) is a beloved Igbo delicacy cooked as a rich, nutty porridge-soup. It is a staple at celebrations and is proudly associated with the Igbo culinary identity.",
  },
];

// ─── Puzzle Logic ──────────────────────────────────────────────────────────

const PUZZLE_IMG = puzzleImg;
const N = 3;

function initSolved(): number[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 0];
}

function getAdj(i: number): number[] {
  const r = Math.floor(i / N), c = i % N;
  return [
    r > 0 ? i - N : -1,
    r < N - 1 ? i + N : -1,
    c > 0 ? i - 1 : -1,
    c < N - 1 ? i + 1 : -1,
  ].filter((x) => x >= 0);
}

function doShuffle(arr: number[]): number[] {
  const a = [...arr];
  let ei = a.indexOf(0);
  for (let k = 0; k < 300; k++) {
    const adj = getAdj(ei);
    const ni = adj[Math.floor(Math.random() * adj.length)];
    [a[ei], a[ni]] = [a[ni], a[ei]];
    ei = ni;
  }
  return a;
}

function checkSolved(a: number[]): boolean {
  return initSolved().every((v, i) => v === a[i]);
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function App() {
  // Slideshow
  const [slide, setSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const goSlide = (dir: number) => {
    setSlide((s) => (s + dir + PHOTOS.length) % PHOTOS.length);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const t = setInterval(() => goSlide(1), 5500);
    return () => clearInterval(t);
  }, [autoSlide]);

  

  // Puzzle
  const [pzl, setPzl] = useState<number[]>(initSolved());
  const [pStarted, setPStarted] = useState(false);
  const [pSolved, setPSolved] = useState(false);
  const [pMoves, setPMoves] = useState(0);
  const startPuzzle = () => {
    setPzl(doShuffle(initSolved()));
    setPStarted(true);
    setPSolved(false);
    setPMoves(0);
  };
  const clickTile = (i: number) => {
    if (pSolved) return;
    const ei = pzl.indexOf(0);
    if (!getAdj(ei).includes(i)) return;
    const next = [...pzl];
    [next[ei], next[i]] = [next[i], next[ei]];
    setPzl(next);
    setPMoves((m) => m + 1);
    if (checkSolved(next)) setPSolved(true);
  };

  // Registry modal
  const [activeRegistry, setActiveRegistry] = useState<string | null>(null);
  const [copied, setCopied] = useState(null);
  const closeModal = () => setActiveRegistry(null);
 
  const copyToClipboard = (text: string, id:any) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { document.body.style.overflow = activeRegistry ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activeRegistry]);


  // Trivia
  const [tIdx, setTIdx] = useState(0);
  const [tAns, setTAns] = useState<number | null>(null);
  const [tScore, setTScore] = useState(0);
  const [tDone, setTDone] = useState(false);
  const answerQ = (i: number) => {
    if (tAns !== null) return;
    setTAns(i);
    if (i === TRIVIA[tIdx].ans) setTScore((s) => s + 1);
    setTimeout(() => {
      if (tIdx + 1 >= TRIVIA.length) setTDone(true);
      else {
        setTIdx((x) => x + 1);
        setTAns(null);
      }
    }, 1800);
  };
  const resetTrivia = () => { setTIdx(0); setTAns(null); setTScore(0); setTDone(false); };

  // Nav scroll
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const activeReg = REGISTRY.find(r => r.store === activeRegistry);
  const activeItems = activeRegistry ? (REGISTRY_ITEMS[activeRegistry] ?? []) : [];


  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "Nunito, system-ui, sans-serif", background: "#FDF8F0" }}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "shadow-lg" : ""}`}
        style={{ background: scrolled ? "rgba(13,43,29,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg tracking-widest" style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif" }}>
            E <span className="opacity-60">&</span> C
          </div>
          <div className="hidden md:flex gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold tracking-wide transition-colors"
                style={{ color: scrolled ? "rgba(255,255,255,0.75)" : "rgb(26, 71, 49)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "rgba(255,255,255,0.75)" : "rgb(26, 71, 49)")}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#wishes" className="hidden md:block px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{ background: "#C9A84C", color: "#1A4731" }}>
            Send Wishes ❤️
          </a>
           {/* Hamburger — mobile only */}
          <button
            id="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ 
              background: "none", border: "none", cursor: "pointer", 
              color: scrolled ? "rgba(255,255,255,0.75)" : "rgb(26, 71, 49)", 
              padding: "0.5rem", display: "flex", flexDirection: "column", gap: 5 }}
          >
            <span className="hamburger-line" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>

            {/* Mobile drawer */}
            {menuOpen && (
              <div style={{
                position: "absolute", top: 64, left: 0, right: 0,
                background: "rgba(13,43,29,0.98)",
                backdropFilter: "blur(12px)",
                padding: "1.5rem 2rem 2rem",
                animation: "slideDown 0.25s ease",
                borderTop: `1px solid ${COLORS.gold}33`,
              }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        style={{ display: "block", padding: "0.85rem 0", textDecoration: "none", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 600,  borderBottom: `1px solid ${COLORS.gold}18`, transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#wishes"
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", marginTop: "1.5rem", padding: "0.85rem", borderRadius: 999, textAlign: "center", background: COLORS.gold, color: "#1A4731", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "'DM Sans',sans-serif" }}
                >
                  Send Wishes ❤️
                </a>
              </div>
            )}
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ 
          background: "linear-gradient(145deg, #0A1E12 0%, #1A4731 55%, #0D2B1D 100%)", 
          marginTop: "68px",
          minHeight: "calc(100vh - 68px)"
        }}>
        {/* Geometric diamond grid overlay */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 28px),repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 28px)", backgroundSize: "56px 56px" }} />
        {/* Frame lines */}
        <div className="absolute inset-8 pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.25)" }} />
        <div className="absolute inset-11 pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.10)" }} />
        {/* Corner ornaments */}
        {["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"].map((pos, pi) => (
          <div key={pi} className={`absolute ${pos} w-6 h-6 pointer-events-none`}
            style={{
              borderTop: pi < 2 ? "2px solid #C9A84C" : "none",
              borderBottom: pi >= 2 ? "2px solid #C9A84C" : "none",
              borderLeft: pi % 2 === 0 ? "2px solid #C9A84C" : "none",
              borderRight: pi % 2 === 1 ? "2px solid #C9A84C" : "none",
            }} />
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-8" style={{ color: "#C9A84C", letterSpacing: "0.35em" }}>
            ✦ The Wedding of ✦
          </p>
          <h1 className="font-bold leading-none" style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(3.0rem, 10vw, 7rem)", color: "#ffffff" }}>
            Eguakhide
          </h1>
          <div className="flex items-center justify-center gap-6 my-2">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C", fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 6vw, 4rem)" }}>&amp;</span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>
          <h1 className="font-bold leading-none" style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "clamp(3.0rem, 10vw, 7rem)", color: "#ffffff" }}>
            Chinwendu
          </h1>
          <p className="mt-4 text-sm font-semibold tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.45)" }}>
            AITONJE · NDUNERI
          </p>
          <div className="flex items-center justify-center gap-3 mt-5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Calendar size={14} style={{ color: "#C9A84C" }} />
            <span className="tracking-wide">22nd August, 2026 · Enugu, Nigeria</span>
          </div>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <a href="#story" className="px-8 py-2 lg:py-3 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105"
              style={{ background: "#C9A84C", color: "#1A4731" }}>
              Our Story
            </a>
            <a href="#programme" className="px-8 py-2 lg:py-3 rounded-full font-semibold text-sm tracking-wide transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#C9A84C" }}>
              View Programme
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span className="text-xs tracking-widest uppercase font-semibold">Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #C9A84C60, transparent)" }} />
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ background: "#0D2B1D" }}>
        <div className="relative overflow-hidden" style={{ height: "clamp(350px, 80vh, 680px)" }}>
          {PHOTOS.map((p, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === slide ? 1 : 0 }}>
              <img src={p.url} alt={p.caption} className="w-full h-full object-contain" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D2B1D 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }} />
              <div className="absolute bottom-16 left-0 right-0 text-center px-6">
                <p className="text-white/80 italic" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
          <button onClick={() => { setAutoSlide(false); goSlide(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
            style={{ background: "rgba(0,0,0,0.35)", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.35)")}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => { setAutoSlide(false); goSlide(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
            style={{ background: "rgba(0,0,0,0.35)", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.35)")}>
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, i) => (
              <button key={i} onClick={() => { setAutoSlide(false); setSlide(i); }}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === slide ? "24px" : "8px", background: i === slide ? "#C9A84C" : "rgba(255,255,255,0.35)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
      <Story/>

      {/* ── PROGRAMME ─────────────────────────────────────────────────────── */}
      <Events/>

      {/* ── REGISTRY ──────────────────────────────────────────────────────── */}
      <section id="registry" className="py-24 px-6" style={{ background: "#FDF8F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#C9A84C" }}>Gift Ideas</p>
            <h2 className="font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#1A4731" }}>Wedding Registry</h2>
            <div className="w-14 h-px mx-auto mt-4" style={{ background: "#C9A84C" }} />
            <p className="mt-5 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(60,35,20,0.6)" }}>
              Your presence is the greatest gift. However, if you wish to bless our new home, here are a few ideas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTRY.map((r, i) => (
              <button
                key={i}
                onClick={() => setActiveRegistry(r.store)}
                className="rounded-2xl p-7 text-center transition-all duration-300 cursor-pointer w-full"
                style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(26,71,49,0.12)"; e.currentTarget.style.borderColor = "#C9A84C"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}
              >
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.05rem", color: "#1A4731" }}>{r.store}</h3>
                <p className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: "#C9A84C" }}>{r.category}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(60,35,20,0.55)" }}>{r.desc}</p>
                <div className="mt-5 flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full mx-auto w-fit transition-colors"
                  style={{ background: "rgba(26,71,49,0.07)", color: "#1A4731" }}>
                  <Gift size={12} /> View Registry
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRY MODAL ───────────────────────────────────────────────── */}
      {activeRegistry && activeReg && (
        <div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          style={{ background: "rgba(10,30,18,0.8)", backdropFilter: "blur(6px)" }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="w-full md:max-w-3xl max-h-[92vh] flex flex-col rounded-t-3xl md:rounded-2xl overflow-hidden"
            style={{ background: "#FDF8F0" }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 shrink-0" style={{ background: "#1A4731" }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeReg.icon}</span>
                <div>
                  <h3 className="font-bold text-white" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem" }}>{activeReg.store}</h3>
                  <p className="text-xs font-bold tracking-wider uppercase" style={{ color: "#C9A84C" }}>{activeReg.category}</p>
                </div>
              </div>
              <button onClick={closeModal}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}>
                <X size={16} />
              </button>
            </div>

            {/* Notice banner — differs by registry type */}
            {activeRegistry === "Household Appliances" && (
              <div className="px-7 py-3 flex items-center gap-2 text-xs font-semibold shrink-0"
                style={{ background: "rgba(26,71,49,0.07)", borderBottom: "1px solid rgba(201,168,76,0.2)", color: "#3D6B4F" }}>
                <Gift size={13} />
                Feel free to get any of these items from a vendor of your choice — no price, no pressure. Your kindness is what counts!
              </div>
            )}

            {/* Kitchenware vendor contact block */}
            {activeRegistry === "Kitchenware" && (() => {
              const v = VENDOR_LINKS["Kitchenware"];
              const waUrl = `${v.wa}?text=${encodeURIComponent(v.waMsg)}`;
              return (
                <div className="px-7 py-4 shrink-0" style={{ background: "rgba(26,71,49,0.05)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: "rgba(60,35,20,0.6)" }}>
                    Browse the items below then reach the vendor directly to purchase — or shop elsewhere, your choice entirely.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={v.ig} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", textDecoration: "none" }}>
                      <ExternalLink size={12} /> View on Instagram
                    </a>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
                      style={{ background: "#25D366", color: "white", textDecoration: "none" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })()}

            {activeRegistry === "Cash Gift" && (
              <div className="px-7 py-3 flex items-center gap-2 text-xs font-semibold shrink-0"
                style={{ background: "rgba(26,71,49,0.07)", borderBottom: "1px solid rgba(201,168,76,0.2)", color: "#3D6B4F" }}>
                <Gift size={13} />
                Send a gift directly. Your generosity means the world to us. Use any of the account details below.
              </div>
            )}

            {/* Items grid */}
            {activeRegistry !== "Cash Gift" ? 
            <div className="overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl overflow-hidden flex flex-col transition-all duration-200"
                    style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(26,71,49,0.13)"; e.currentTarget.style.borderColor = "#C9A84C"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; }}
                  >
                    <div className="overflow-hidden" style={{ height: "170px", background: "#F0E8D8", flexShrink: 0 }}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <p className="font-bold text-sm leading-snug mb-1" style={{ color: "#1A4731" }}>{item.name}</p>
                      {item.note && <p className="text-xs" style={{ color: "rgba(60,35,20,0.5)" }}>{item.note}</p>}
                      <div className="mt-auto pt-2" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.1)", color: "#7A5F20" }}>Any vendor welcome</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> :
              <div style={{ padding: "1.5rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {ACCOUNTS.map((person) => (
                  <div key={person.person} style={{ border: `1px solid ${COLORS.gold}33`, background: "#fff" }}>
                    {/* Person header */}
                    <div style={{ padding: "0.9rem 1.25rem", borderBottom: `1px solid ${COLORS.gold}22`, display: "flex", alignItems: "center", gap: "0.75rem", background: COLORS.goldPale }}>
                      <span style={{ fontSize: "1.4rem" }}>{person.emoji}</span>
                      <div>
                        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, margin: 0, fontWeight: 500 }}>{person.person}</p>
                        <p style={{ fontSize: "1.1rem", color: COLORS.deep, margin: 0 }}>{person.name}</p>
                      </div>
                    </div>

                    {/* Account rows */}
                    {person.accounts.map((acc, ai) => {
                      const copyId = `${person.person}-${ai}`;
                      const isCopied = copied === copyId;
                      return (
                        <div key={ai} style={{
                          padding: "0.9rem 1.25rem",
                          borderBottom: ai < person.accounts.length - 1 ? `1px solid ${COLORS.gold}18` : "none",
                          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                        }}>
                          <div>
                            <p style={{ fontSize: "0.7rem", color: COLORS.muted, margin: "0 0 2px", letterSpacing: "0.05em" }}>{acc.bank} · {acc.type}</p>
                            <p style={{ fontFamily: "monospace", fontSize: "1.05rem", color: COLORS.deep, margin: 0, letterSpacing: "0.12em", fontWeight: 600 }}>{acc.number}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(acc.number, copyId)}
                            style={{
                              background: isCopied ? COLORS.gold : "transparent",
                              border: `1px solid ${isCopied ? COLORS.gold : `${COLORS.gold}55`}`,
                              color: isCopied ? COLORS.deep : COLORS.gold,
                              padding: "0.4rem 0.9rem",
                              fontSize: "0.7rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              fontFamily: "'DM Sans',sans-serif",
                              fontWeight: 500,
                              transition: "all 0.2s",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            {isCopied ? "✓ Copied!" : "Copy"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>}

            {/* Modal footer */}
            <div className="px-7 py-4 shrink-0 flex items-center justify-between" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
              <p className="text-xs" style={{ color: "rgba(60,35,20,0.4)" }}>
               {activeRegistry === "Household Appliances" || activeRegistry === "Kitchenware" ? "Get from any vendor of your choice" : " Please use your name as the transfer description so we know who to thank 🙏🏾"}
              </p>
              <button onClick={closeModal}
                className="px-5 py-2 rounded-full text-xs font-bold"
                style={{ background: "#1A4731", color: "#C9A84C" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ── WISHES ────────────────────────────────────────────────────────── */}
      <Wishes/>

      {/* ── FUN ZONE ─────────────────────────────────────────────────────── */}
      <section id="fun" className="py-24 px-6" style={{ background: "#FDF8F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#C9A84C" }}>Play Time</p>
            <h2 className="font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#1A4731" }}>Fun Zone</h2>
            <div className="w-14 h-px mx-auto mt-4" style={{ background: "#C9A84C" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── Sliding Puzzle ── */}
            <div className="rounded-2xl p-8" style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 8px 40px rgba(26,71,49,0.07)" }}>
              <h3 className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", color: "#1A4731" }}>🧩 Sliding Puzzle</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(60,35,20,0.55)" }}>Slide the tiles to reveal the couple&apos;s photo!</p>

              {!pStarted ? (
                <div className="text-center py-6">
                  <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden mb-5" style={{ opacity: 0.3, filter: "blur(3px)" }}>
                    <img src={PUZZLE_IMG} alt="Puzzle" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm mb-5" style={{ color: "rgba(60,35,20,0.45)" }}>Can you piece them together?</p>
                  <button onClick={startPuzzle} className="px-8 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110"
                    style={{ background: "#1A4731" }}>
                    Start Puzzle
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm" style={{ color: "rgba(60,35,20,0.55)" }}>
                      Moves: <strong style={{ color: "#1A4731" }}>{pMoves}</strong>
                    </span>
                    <button onClick={startPuzzle} className="flex items-center gap-1 text-xs font-bold transition-colors"
                      style={{ color: "#C9A84C" }}>
                      <RefreshCw size={11} /> Shuffle Again
                    </button>
                  </div>

                  {pSolved && (
                    <div className="rounded-xl p-4 mb-4 text-center text-white" style={{ background: "#1A4731" }}>
                      <Trophy size={22} className="mx-auto mb-1" style={{ color: "#C9A84C" }} />
                      <p className="font-bold text-sm">Congratulations! 🎉</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>Solved in {pMoves} moves!</p>
                    </div>
                  )}

                  {/* 3×3 Grid */}
                  <div className="mx-auto" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px", width: "270px", height: "320px" }}>
                    {pzl.map((piece, idx) => {
                      const isEmpty = piece === 0;
                      const srcRow = Math.floor((piece - 1) / 3);
                      const srcCol = (piece - 1) % 3;
                      return (
                        <button
                          key={idx}
                          onClick={() => clickTile(idx)}
                          className="rounded-sm transition-all duration-100"
                          style={isEmpty
                            ? { background: "#F0E8D8", cursor: "default" }
                            : {
                              backgroundImage: `url(${PUZZLE_IMG})`,
                              backgroundSize: "300% 300%",
                              backgroundPosition: `${srcCol * 50}% ${srcRow * 50}%`,
                              cursor: "pointer",
                              border: "2px solid white",
                              outline: "none",
                            }}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* ── Couples Trivia ── */}
            <div className="rounded-2xl p-8" style={{ background: "white", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 8px 40px rgba(26,71,49,0.07)" }}>
              <h3 className="font-bold mb-1" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", color: "#1A4731" }}>🇳🇬 Couples Trivia</h3>
              <p className="text-sm mb-6" style={{ color: "rgba(60,35,20,0.55)" }}>Test your knowledge of the Couple!</p>

              {tDone ? (
                <div className="text-center py-8">
                  <Trophy size={52} className="mx-auto mb-4" style={{ color: tScore >= 4 ? "#C9A84C" : "rgba(60,35,20,0.25)" }} />
                  <p className="font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", color: "#1A4731" }}>{tScore}/{TRIVIA.length}</p>
                  <p className="text-sm mt-2 mb-7 leading-relaxed" style={{ color: "rgba(60,35,20,0.6)" }}>
                    {tScore === 5 ? `Official Third Wheel Status Locked! 🔐\n Wow, you clearly know us better than we know ourselves! 🏆` :
                      tScore >= 3 ? `Passing Grade! 🎓\nYou know us well enough to not get lost on the way to the venue, and honestly, that’s all we can ask for. Can’t wait to celebrate with you!` :
                        "Time to study up! 📚\nLooks like you need to buy the couple a drink at the reception to learn more!"}
                  </p>
                  <button onClick={resetTrivia} className="px-8 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110"
                    style={{ background: "#1A4731" }}>
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold" style={{ color: "rgba(60,35,20,0.45)" }}>Question {tIdx + 1} of {TRIVIA.length}</span>
                    <span className="text-xs font-bold" style={{ color: "#C9A84C" }}>Score: {tScore}</span>
                  </div>
                  <div className="w-full h-1 rounded-full mb-6" style={{ background: "#F0E8D8" }}>
                    <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${(tIdx / TRIVIA.length) * 100}%`, background: "#C9A84C" }} />
                  </div>
                  <p className="font-bold text-sm mb-6 leading-relaxed" style={{ color: "#1A4731" }}>{TRIVIA[tIdx].q}</p>
                  <div className="space-y-3">
                    {TRIVIA[tIdx].opts.map((opt, oi) => {
                      const isCorrect = oi === TRIVIA[tIdx].ans;
                      const isChosen = oi === tAns;
                      const revealed = tAns !== null;
                      let bg = "white", borderColor = "rgba(201,168,76,0.25)", textColor = "rgba(60,35,20,0.85)";
                      if (revealed) {
                        if (isCorrect) { bg = "#ECFDF5"; borderColor = "#34D399"; textColor = "#065F46"; }
                        else if (isChosen) { bg = "#FEF2F2"; borderColor = "#FCA5A5"; textColor = "#991B1B"; }
                        else { textColor = "rgba(60,35,20,0.3)"; }
                      }
                      return (
                        <button key={oi} onClick={() => answerQ(oi)}
                          className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                          style={{ background: bg, border: `1px solid ${borderColor}`, color: textColor }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {/* {tAns !== null && (
                    <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(26,71,49,0.05)", border: "1px solid rgba(26,71,49,0.08)" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "#1A4731" }}>
                        💡 <strong>Did you know?</strong> {TRIVIA[tIdx].fact}
                      </p>
                    </div>
                  )} */}
                </>
              )}
            </div>
          </div>

          {/* Fun cultural fact banner */}
          <div className="mt-12 rounded-2xl p-8 text-center overflow-hidden relative" style={{ background: "#1A4731" }}>
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 20px),repeating-linear-gradient(-45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 20px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#C9A84C" }}>A Note from the Couple</p>
              <p className="text-white font-serif text-lg md:text-xl italic max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
                "Love is a beautiful thing, find your own person and engage in a healthy competition of out-loving each other"
              </p>
              <div className="flex items-center justify-center gap-3 mt-5" style={{ color: "rgba(201,168,76,0.7)" }}>
                <div className="h-px w-12" style={{ background: "rgba(201,168,76,0.4)" }} />
                <Heart size={14} style={{ fill: "#C9A84C", color: "#C9A84C" }} />
                <div className="h-px w-12" style={{ background: "rgba(201,168,76,0.4)" }} />
              </div>
              <p className="mt-3 font-bold text-sm" style={{ color: "#C9A84C" }}>Eguakhide & Chinwendu</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-20 px-6 text-center" style={{ background: "#0A1E12" }}>
        <div className="mb-12" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }} />
        <h2 className="font-bold mb-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#C9A84C" }}>
          Eguakhide & Chinwendu
        </h2>
        <p className="text-sm font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
          August 22, 2026 · Enugu, Nigeria
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-10" style={{ background: "rgba(201,168,76,0.35)" }} />
          <Heart size={16} style={{ color: "#C9A84C", fill: "#C9A84C" }} />
          <div className="h-px w-10" style={{ background: "rgba(201,168,76,0.35)" }} />
        </div>
        <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
          Edo meets Igbo · Two cultures, one love · Nigeria celebrates 🇳🇬
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
          Crafted by Anyanwu Maureen for the Aitonje–Nduneri Wedding 2026
        </p>
      </footer>
    </div>
  );
}
