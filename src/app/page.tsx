"use client";

import { useEffect, useRef, useState } from "react";

// --- Scroll Reveal Hook ---
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    els.forEach((el) => {
      if (!el.classList.contains("visible")) observer.observe(el);
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
}

// --- Counter Hook ---
function useCounter(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

// --- Stat Counter Component ---
function StatCounter({
  value,
  prefix = "",
  suffix = "",
  displayValue,
  label,
  started,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  displayValue?: string;
  label: string;
  started: boolean;
}) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--teal)", lineHeight: 1.1 }}>
        {displayValue ?? `${prefix}${count.toLocaleString()}${suffix}`}
      </div>
      <div style={{ fontSize: "0.85rem", color: "var(--white-60)", marginTop: "0.35rem", letterSpacing: "0.02em" }}>
        {label}
      </div>
    </div>
  );
}

// --- Prosthetic Arm SVG ---
function ArmSVG() {
  return (
    <svg viewBox="0 0 280 420" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 560, margin: "0 auto", display: "block" }}>
      <ellipse cx="140" cy="38" rx="44" ry="18" stroke="#028090" strokeWidth="1.5" fill="none" />
      <ellipse cx="140" cy="38" rx="30" ry="10" stroke="#028090" strokeWidth="1" fill="rgba(2,128,144,0.07)" />
      <rect x="122" y="54" width="36" height="100" rx="4" stroke="#028090" strokeWidth="1.5" fill="rgba(2,128,144,0.06)" />
      <circle cx="140" cy="164" r="22" stroke="#028090" strokeWidth="1.5" fill="none" />
      <circle cx="140" cy="164" r="12" stroke="#028090" strokeWidth="1" fill="rgba(2,128,144,0.1)" />
      <line x1="128" y1="164" x2="152" y2="164" stroke="#028090" strokeWidth="0.8" />
      <line x1="140" y1="152" x2="140" y2="176" stroke="#028090" strokeWidth="0.8" />
      <rect x="126" y="184" width="28" height="88" rx="4" stroke="#028090" strokeWidth="1.5" fill="rgba(2,128,144,0.06)" />
      <rect x="120" y="270" width="40" height="18" rx="6" stroke="#028090" strokeWidth="1.5" fill="rgba(2,128,144,0.1)" />
      <rect x="112" y="286" width="56" height="52" rx="8" stroke="#028090" strokeWidth="1.5" fill="rgba(2,128,144,0.08)" />
      <rect x="114" y="336" width="10" height="38" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" />
      <rect x="128" y="334" width="10" height="44" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" />
      <rect x="142" y="334" width="10" height="44" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" />
      <rect x="156" y="336" width="10" height="38" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" />
      <rect x="75" y="297" width="37" height="10" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" transform="rotate(-45 112 302)" />
      <circle cx="134" cy="100" r="4" fill="#028090" opacity="0.7" />
      <circle cx="146" cy="118" r="3" fill="#028090" opacity="0.5" />
      <circle cx="134" cy="136" r="3.5" fill="#028090" opacity="0.6" />
      <path d="M138 100 Q 170 90 180 75" stroke="#028090" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
      <path d="M149 118 Q 175 115 185 100" stroke="#028090" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      <line x1="130" y1="205" x2="150" y2="205" stroke="#028090" strokeWidth="0.6" opacity="0.5" />
      <line x1="130" y1="218" x2="150" y2="218" stroke="#028090" strokeWidth="0.6" opacity="0.5" />
      <line x1="130" y1="231" x2="150" y2="231" stroke="#028090" strokeWidth="0.6" opacity="0.5" />
      <line x1="130" y1="244" x2="150" y2="244" stroke="#028090" strokeWidth="0.6" opacity="0.5" />
      <circle cx="220" cy="100" r="3" fill="#028090" opacity="0.6" />
      <line x1="155" y1="100" x2="217" y2="100" stroke="#028090" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.4" />
      <text x="228" y="104" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-body)">EMG</text>
      <circle cx="220" cy="218" r="3" fill="#028090" opacity="0.6" />
      <line x1="155" y1="218" x2="217" y2="218" stroke="#028090" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.4" />
      <text x="228" y="222" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-body)">3D</text>
    </svg>
  );
}

// --- Main Page ---
export default function Home() {
  useScrollReveal();

  const heroRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => setMobileNavOpen(false);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Model", href: "#model" },
    { label: "Team", href: "#team" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Ask", href: "#ask" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(1,8,16,0.97)", backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 clamp(1.25rem, 5vw, 3rem)", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.15rem", color: "var(--teal)", letterSpacing: "0.08em" }}>BANGKIT</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "1.15rem", color: "var(--white)", letterSpacing: "0.08em" }}>BIONICS</span>
        </a>
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} style={{ textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em", transition: "color 200ms" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
            >{link.label}</a>
          ))}
          <a href="#contact" style={{ textDecoration: "none", background: "var(--teal)", color: "#fff", fontSize: "0.875rem", fontWeight: 600, padding: "0.5rem 1.2rem", borderRadius: "6px", letterSpacing: "0.02em", transition: "background 200ms, transform 200ms", display: "inline-block" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >Get In Touch</a>
        </div>
        <button className="mobile-nav-btn" onClick={() => setMobileNavOpen(!mobileNavOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "none", flexDirection: "column", gap: "5px" }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 200ms", transformOrigin: "center",
              transform: mobileNavOpen ? (i === 0 ? "rotate(45deg) translate(5px, 5px)" : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "scaleX(0)") : "none",
              opacity: mobileNavOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {mobileNavOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(1,8,16,0.99)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileNavOpen(false)} style={{ textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: "1rem", fontWeight: 500 }}>{link.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileNavOpen(false)} style={{ textDecoration: "none", background: "var(--teal)", color: "#fff", fontSize: "0.9rem", fontWeight: 600, padding: "0.65rem 1.2rem", borderRadius: "6px", textAlign: "center" }}>Get In Touch</a>
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem clamp(1.25rem, 6vw, 4rem) 5rem", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "18%", left: "12%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.12) 0%, transparent 70%)", animation: "orbFloat 12s ease-in-out infinite", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "20%", right: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.09) 0%, transparent 70%)", animation: "orbFloat2 15s ease-in-out infinite", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", top: "55%", left: "50%", width: 600, height: 600, transform: "translate(-50%, -50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <p className="section-label fade-up visible" style={{ marginBottom: "1.5rem" }}>Restoring Movement. Changing Lives.</p>
          <h1 className="fade-up visible" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.5rem" }}>
            Giving Southeast Asia<br />its movement back.
          </h1>
          <p className="fade-up" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "var(--white-60)", lineHeight: 1.65, maxWidth: 620, margin: "0 auto 2.5rem" }}>
            Two UCL Biomedical Engineers. Built in Malaysia. Entering Singapore first, then the UK.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="/pitch-deck.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "var(--teal)", color: "#fff", fontWeight: 600, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", letterSpacing: "0.02em", transition: "background 200ms, transform 200ms", display: "inline-block" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >View Pitch Deck</a>
            <a href="#contact" style={{ textDecoration: "none", background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", letterSpacing: "0.02em", border: "1.5px solid rgba(255,255,255,0.35)", transition: "border-color 200ms, transform 200ms", display: "inline-block" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >Contact Us</a>
          </div>
          <div ref={heroRef} className="fade-up" style={{ display: "flex", gap: "clamp(1.5rem, 5vw, 4rem)", justifyContent: "center", flexWrap: "wrap", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <StatCounter value={695} suffix="M" label="People across Southeast Asia" started={statsStarted} />
            <StatCounter value={2500} displayValue="2.5B+" label="Need assistive products globally" started={statsStarted} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--teal)", lineHeight: 1.1 }}>SGD 50,000</div>
              <div style={{ fontSize: "0.85rem", color: "var(--white-60)", marginTop: "0.35rem" }}>Top of market for myoelectric arm in Singapore. We enter at SGD 3,000.</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="problem" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label fade-up">The Problem</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "3.5rem", maxWidth: 640 }}>
          Millions live with limb loss.<br />Access is still defined by cost.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { number: "2.5B+", title: "People who need assistive products", desc: "WHO estimates more than 2.5 billion people globally need one or more assistive products." },
            { number: "3%-90%", title: "Access range across countries", desc: "WHO reports access can be as low as 3% in some low-income countries versus 90% in some high-income countries." },
            { number: "Upper-limb", title: "Loss is trauma-driven, not disease-driven", desc: "Upper-limb amputations in SEA are primarily caused by industrial accidents and road injuries — not diabetes, which is a lower-limb issue. Our patient is a young working-age adult priced out of a RM 20K–80K import." },
          ].map((item) => (
            <div key={item.number} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--teal)", marginBottom: "0.75rem", lineHeight: 1 }}>{item.number}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{item.title}</div>
              <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="fade-up" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginBottom: "2rem", letterSpacing: "0.02em" }}>
          Selected figures: UN World Population Prospects 2024 Revision; WHO Assistive Technology fact sheet (2024); WHO Global Report on Assistive Technology (2022).
        </p>
        <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem 2.5rem", marginBottom: "4rem" }}>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: 820 }}>
            <span style={{ fontFamily: "var(--font-heading)", color: "#fff", fontWeight: 600 }}>WHO identifies cost, procurement complexity, workforce gaps, and inadequate funding as core barriers to access.</span>{" "}That is the gap an affordable, locally serviceable prosthetic company in Malaysia is trying to close.
          </p>
        </div>

        {/* Who we're building for */}
        <p className="section-label fade-up" style={{ marginBottom: "1.5rem" }}>Who We Build For</p>
        <h3 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.01em", marginBottom: "2.5rem", color: "#fff" }}>
          These are representative stories.<br />The need is real.
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              initial: "A", name: "Ahmad, 24", location: "Selangor, Malaysia",
              story: "Factory accident at 19. SOCSO covered a hook — non-functional, non-myoelectric. He has not been able to return to skilled work in 5 years. A functional arm costs more than his father earns in two years.",
            },
            {
              initial: "F", name: "Farid, 29", location: "Petaling Jaya, Selangor",
              story: "Motorcycle dispatch rider. Right arm crushed in a road collision in 2022. SOCSO paid hospitalisation and a cosmetic shell — no grip function. He hasn't done a full day of physical work since. The cheapest functional myoelectric arm he was quoted: RM 55,000.",
            },
            {
              initial: "R", name: "Reza, 31", location: "Shah Alam, Selangor",
              story: "Construction site accident in 2022. Lost his right hand below the elbow. Was a site foreman supporting three children. SOCSO covered hospitalisation and a cosmetic shell — non-functional. He cannot drive, cannot operate machinery, cannot return to skilled work. A myoelectric arm quotes at RM 60,000. His monthly take-home was RM 3,800.",
            },
          ].map((p) => (
            <div key={p.name} className="fade-up" style={{ background: "rgba(6,22,34,0.75)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(2,128,144,0.15)", border: "1px solid rgba(2,128,144,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--teal)", flexShrink: 0 }}>{p.initial}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.95rem", color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--grey)" }}>{p.location}</div>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>{p.story}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY NOW */}
      <section id="why-now" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Why Now</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Four forces have aligned.<br />The window is open.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { n: "01", title: "Industrial trauma, unmet need", desc: "Upper-limb loss in SEA is driven by industrial accidents and road injuries, not diabetes. The patient is a young working-age adult who cannot afford a RM 20K–80K imported device and has no functional alternative." },
              { n: "02", title: "3D printing cost collapse", desc: "Industrial FDM hardware costs have fallen over 70% in five years. Small-batch, custom-fit manufacturing is now economically viable at our price point." },
              { n: "03", title: "Defined regulatory pathway", desc: "Malaysia has an established medical-device approval framework, giving the team a concrete route to plan around while final device classification is confirmed with MDA." },
              { n: "04", title: "Regional scale is undeniable", desc: "Southeast Asia is home to roughly 695 million people, yet access to advanced assistive technology remains deeply uneven." },
            ].map((item) => (
              <div key={item.n} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{item.n}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{item.title}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section id="solution" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label fade-up">The Solution</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
          Engineered in Malaysia. Entering Singapore and the UK.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
          <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ArmSVG />
          </div>
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { name: "Surface EMG Signal Acquisition", desc: "Non-invasive surface electrodes capture multi-channel electromyography signals from the residual limb. EMG signal acquisition and threshold-based control has been demonstrated through UCL embedded systems research — this is the signal pipeline the device is built on." },
              { name: "Multi-Grip EMG Classification", desc: "The current pipeline uses threshold-based control: demonstrated and working. The next stage is a patient-specific multi-grip pattern classifier trained on EMG data to replace binary triggers with intent-based grip selection. We are not claiming to solve what Ottobock hasn't — we are building a classifier that covers the 4–6 grips most users actually need, at a BOM that makes the device commercially viable." },
              { name: "Motorized Thumb Architecture", desc: "Target prototype design uses a 5-servo coupled layout covering the three grip states used in 80%+ of daily tasks — power grasp, pinch, open. Motor switching is driven by classified EMG intent, not manual repositioning by the other hand. Full per-finger independent actuation is a post-prototype iteration target, not Year-1 scope." },
              { name: "Custom 3D-Printed Socket Fitting", desc: "At the fitting appointment, our clinical team performs 3D scanning of the residual limb geometry to generate a precise digital model, which drives a patient-specific 3D-printed socket. Variable-density printing — rigid load-bearing shell, flexible skin-contact surfaces — targets better comfort and lower rejection rates than standard measurement-based casting. The patient needs no special hardware; socket fitting is a clinical service delivered by our team." },
              { name: "Self-Contained Power Architecture", desc: "All control logic, motor drivers, and rechargeable Li-ion power are designed to sit within the forearm unit. USB-C charging. Day-long battery target based on current consumption modelling; will be validated in prototype testing." },
              { name: "Built Inside the Clinical Pathway", desc: "We are not designing a device and then figuring out how to sell it in Southeast Asia. The regulatory pathway (MDA), clinical access (Alwi's neurosurgeon network), and commercial entry point (Singapore) are defined from day one. That structural advantage is independent of how the hardware performs." },
            ].map((feat) => (
              <div key={feat.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", marginTop: "0.45rem", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.3rem" }}>{feat.name}</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ border: "1px solid var(--teal)", borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                <span style={{ color: "var(--teal)", fontWeight: 600, fontFamily: "var(--font-heading)" }}>Regulatory-first design.</span>{" "}Built around Malaysian medical-device approval requirements from day one, with final classification and submission route to be confirmed through MDA engagement.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: "5rem" }}>
          <h3 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.01em", marginBottom: "2.5rem", color: "#fff" }}>How it works</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {[
              { n: "01", title: "Surface EMG Acquisition", desc: "Non-invasive surface electrodes capture multi-channel EMG signals from the residual limb skin. Signal acquisition and threshold-based control has been demonstrated through UCL embedded systems research — the same pipeline the prosthetic is built on." },
              { n: "02", title: "EMG Pattern Classification", desc: "Stage one uses threshold-based control: demonstrated and proven. Stage two — in development — replaces binary triggers with a patient-specific multi-grip classifier. Target is 4–6 grip patterns. This is not novel academic research; it is applied engineering on a validated pipeline." },
              { n: "03", title: "Motorized Grip Architecture", desc: "Target prototype design: 5-servo coupled layout covering power grasp, pinch, and open — the three grip states used in 80%+ of daily tasks. Automatic switching driven by classified EMG intent, not manual repositioning. Full independent per-finger actuation is a post-prototype target." },
              { n: "04", title: "Clinical Socket Fitting", desc: "At the fitting appointment, our clinical team performs 3D scanning to capture an accurate model of the residual limb geometry — no special hardware required from the patient. This drives a custom 3D-printed socket with variable density: rigid for load-bearing, flexible for skin comfort. A precisely fitted socket is one of the primary reasons patients keep wearing a prosthetic. Will be validated in prototype trials." },
              { n: "05", title: "Integrated Power Architecture", desc: "All control logic, motor drivers, and rechargeable Li-ion power are housed entirely within the forearm unit. USB-C charging. Day-long battery runtime is a target based on current consumption modelling — will be validated in prototype testing." },
            ].map((step) => (
              <div key={step.n} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1.5rem 1.25rem" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>{step.n}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "#fff", marginBottom: "0.5rem" }}>{step.title}</div>
                <p style={{ fontSize: "0.8rem", color: "var(--grey)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section id="market" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Market Opportunity</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            A region of 695 million people.<br />A global category worth USD 6.56B in 2024.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {[
              { value: "USD 6.56B", label: "Global prosthetics & orthotics market", sub: "Grand View Research estimate for 2024" },
              { value: "695M", label: "Southeast Asia population", sub: "UN-backed regional estimate for 2024" },
              { value: "USD 80M", label: "Year 1\u20133 beachhead model", sub: "Internal estimate: Singapore + UK + SEA" },
            ].map((m) => (
              <div key={m.label} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", textAlign: "center", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--teal)", marginBottom: "0.5rem" }}>{m.value}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "#fff", fontSize: "0.95rem", marginBottom: "0.3rem" }}>{m.label}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--grey)" }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <p className="fade-up" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginBottom: "2rem", letterSpacing: "0.02em" }}>
            Sources: UN World Population Prospects 2024 Revision; Grand View Research Prosthetics and Orthotics Market Summary (updated 2024). Beachhead estimate is an internal model.
          </p>
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {[
                { year: "Year 1", label: "Malaysia (build)" },
                { year: "Year 2", label: "Singapore" },
                { year: "Year 3–4", label: "UK + SEA" },
                { year: "Year 5", label: "EU → US" },
              ].map((step, i, arr) => (
                <div key={step.year} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? "1" : "0 0 auto" }}>
                  <div style={{ textAlign: "center", minWidth: 110 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--teal)", margin: "0 auto 0.6rem" }} />
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--teal)", marginBottom: "0.2rem" }}>{step.year}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{step.label}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 1, background: "var(--teal)", opacity: 0.4, marginBottom: "1.8rem" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITIVE LANDSCAPE */}
      <section id="competitive" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Competitive Landscape</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            We are not trying to be the cheapest bionic hand.<br />We are building the performance tier above low-end imports.
          </h2>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, maxWidth: 760, marginBottom: "3rem" }}>
            The positioning is precise: not the cheapest device, not the most sophisticated. Better than Vulcan (~$1M raised to date, threshold control only, manual thumb, no clinical infrastructure) — not competing with Ottobock. In Singapore, myoelectric prosthetics cost SGD 15,000–50,000. We enter at SGD 3,000. In the UK, the i-limb runs £70,000+. We enter at approximately £1,700. We cover the grip patterns 80% of users actually need, at 5% of the cost of premium imports. That's a different product category — one that currently doesn't exist at this price point with this level of local clinical support.
          </p>
          <div className="fade-up" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  {["Company", "Price", "Control", "Thumb", "Socket", "Malaysia Model", "Regulatory"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--teal)", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { company: "BANGKIT Bionics", highlight: true, price: "RM 4.5K\u201314.5K", control: "Multi-grip EMG classifier", thumb: "Motorized (prototype target)", socket: "Custom 3D-printed socket", model: "KL build, SG/UK sales", reg: "NTIS + MDA → CE Mark" },
                  { company: "Vulcan Augmetics", highlight: false, price: "~RM 5K", control: "Threshold-based only", thumb: "Manual reposition", socket: "Standard clinical fit", model: "Importer. ~$1M raised.", reg: "Importer pathway" },
                  { company: "Open Bionics", highlight: false, price: "Quote-based", control: "Myoelectric", thumb: "Limited preset modes", socket: "Partial custom", model: "Imported", reg: "CE Mark / FDA" },
                  { company: "Ottobock", highlight: false, price: "USD 20K\u201380K", control: "Premium myoelectric", thumb: "Motorized", socket: "Clinical custom", model: "Distributor only", reg: "CE Mark / FDA" },
                  { company: "Body-powered / passive", highlight: false, price: "Low-cost", control: "Mechanical only", thumb: "Manual", socket: "Basic", model: "Local / mixed", reg: "Varies" },
                ].map((row) => (
                  <tr key={row.company} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: row.highlight ? "rgba(2,128,144,0.07)" : "transparent" }}>
                    <td style={{ padding: "1rem", fontFamily: "var(--font-heading)", fontWeight: row.highlight ? 700 : 500, color: row.highlight ? "var(--teal)" : "#fff", whiteSpace: "nowrap" }}>{row.company}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", whiteSpace: "nowrap" }}>{row.price}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.control}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.thumb}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.socket}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.model}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", whiteSpace: "nowrap" }}>{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section id="model" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Business Model</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Three routes to market.<br />One common goal.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { n: "01", title: "Direct to Hospital", desc: "B2B sales to public and private hospitals and rehabilitation centres. Procurement through existing medical device supply chains. Highest margin, longest cycle." },
              { n: "02", title: "Prosthetist Channel", desc: "Licensed prosthetists fit, sell and service devices directly to patients. Faster volume growth, lower CAC. Prosthetist earns a margin; we scale without a direct salesforce." },
              { n: "03", title: "Government and Institutional Funding", desc: "Targeting employer-injury, disability-support, and hospital procurement pathways. If approved, these channels could materially reduce patient out-of-pocket cost." },
            ].map((ch) => (
              <div key={ch.n} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{ch.n}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{ch.title}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{ch.desc}</p>
              </div>
            ))}
          </div>
          <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Fully loaded pilot COGS", value: "RM 2,500\u20133,500", sub: "Direct BOM plus fitting, QA, clinician support, warranty reserve, and pilot-stage labour" },
              { label: "Target selling price", value: "RM 9,500", sub: "Flagship ASP. Commercial range RM 4,500\u201314,500. Research units priced separately to preserve development margin." },
              { label: "Gross margin (pilot)", value: "63\u201374%", sub: "Pilot-stage range at RM 2,500\u20133,500 fully loaded COGS vs RM 9,500 ASP. Targeting 75%+ at volume as COGS reduce." },
              { label: "Imported equivalent", value: "RM 20K\u201380K", sub: "Current market price for comparable Western devices" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "rgba(2,128,144,0.06)", border: "1px solid rgba(2,128,144,0.2)", borderRadius: "10px", padding: "1.25rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "var(--teal)", marginBottom: "0.3rem" }}>{stat.value}</div>
                <div style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600, marginBottom: "0.2rem" }}>{stat.label}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--grey)" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE PROJECTIONS */}
      <section id="projections" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Financial Projections</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Illustrative path to RM 23.75M revenue by Year 5.<br />Commercial sales begin Year 2 post-NTIS validation.
          </h2>
          <div className="fade-up" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(2,128,144,0.4)" }}>
                  {["Year", "Units", "Revenue", "Gross Profit", "Margin", "Market", "Milestone"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { year: "Year 1", units: "5–10 (R&D)", rev: "RM 76K", gp: "Grant-funded", margin: "—", market: "Malaysia (ops)", milestone: "CIP Spark + NTIS — prototype and clinical validation phase. Grant-funded, not commercial.", highlight: false },
                  { year: "Year 2", units: "30", rev: "RM 285K", gp: "RM 200K", margin: "~70%", market: "Singapore", milestone: "First commercial launch in Singapore. HSA registration. Prosthetist channel.", highlight: false },
                  { year: "Year 3", units: "150", rev: "RM 1.43M", gp: "RM 1.0M", margin: "~70%", market: "Singapore + UK", milestone: "CE Mark process underway. UK clinical pilot partnerships. Break-even.", highlight: true },
                  { year: "Year 4", units: "600", rev: "RM 5.7M", gp: "RM 4.28M", margin: "75%", market: "SEA-wide", milestone: "SEA expansion, Series A", highlight: true },
                  { year: "Year 5", units: "2,500", rev: "RM 23.75M", gp: "RM 17.8M", margin: "75%", market: "SEA + EU", milestone: "EU entry begins, US pipeline established", highlight: true },
                ].map((row) => (
                  <tr key={row.year} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: row.highlight ? "rgba(2,128,144,0.06)" : "transparent" }}>
                    <td style={{ padding: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{row.year}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", fontVariantNumeric: "tabular-nums" }}>{row.units}</td>
                    <td style={{ padding: "1rem", color: "#fff", fontWeight: 600, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{row.rev}</td>
                    <td style={{ padding: "1rem", color: "var(--teal)", fontWeight: 600, whiteSpace: "nowrap" }}>{row.gp}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.margin}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", whiteSpace: "nowrap" }}>{row.market}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", fontSize: "0.82rem" }}>{row.milestone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2.5rem" }}>
            {[
              { val: "RM 9,500", lbl: "Flagship ASP", sub: "Range RM 4.5K\u201314.5K across commercial tiers" },
              { val: "63\u201374%", lbl: "Gross margin (pilot)", sub: "Pilot-stage range. Targeting 75%+ at volume as COGS improve." },
              { val: "Year 3", lbl: "Break-even", sub: "150 units, RM 1.43M — Singapore commercial + UK clinical pilot underway" },
              { val: "RM 23.75M", lbl: "Year 5 revenue target", sub: "2,500 units, SEA + EU entry" },
            ].map((s) => (
              <div key={s.lbl} style={{ background: "rgba(2,128,144,0.06)", border: "1px solid rgba(2,128,144,0.2)", borderRadius: "10px", padding: "1.25rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--teal)", marginBottom: "0.3rem" }}>{s.val}</div>
                <div style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600, marginBottom: "0.2rem" }}>{s.lbl}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--grey)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARLY VALIDATION */}
      <section id="validation" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Early Validation</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            The signal pipeline works. Now we build the product.
          </h2>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, maxWidth: 640, marginBottom: "3rem" }}>
            EMG signal acquisition and processing has been demonstrated through UCL embedded systems research — the same signal pipeline that underpins our prosthetic control system. The clinical, regulatory, and commercial foundation is in place. CIP Spark funds the prototype. NTIS validates it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                label: "01", title: "Clinical Network — Day Zero",
                desc: "Direct access to neurosurgery via co-founder Alwi\u2019s father, a practising consultant neurosurgeon. Orthopaedic referral conversations are underway, with early pilot-patient outreach in progress.",
              },
              {
                label: "02", title: "EMG Signal Pipeline Demonstrated",
                desc: "EMG signal acquisition, filtering, and threshold-based control demonstrated through UCL embedded systems research. The same signal pipeline underpins our prosthetic control system design.",
              },
              {
                label: "03", title: "Regulatory Pathway Mapped",
                desc: "The Malaysian regulatory pathway is being mapped against MDA requirements, while ethics-board preparation and ISO 13485 planning are being scoped in parallel.",
              },
              {
                label: "04", title: "CIP Spark — RM 150K to Build It",
                desc: "Cradle\u2019s CIP Spark grant funds pre-prototype development. Up to RM 150K over 18 months, no prototype required to apply, rolling admissions. This is the immediate next step — it builds the device that NTIS will validate.",
              },
            ].map((item) => (
              <div key={item.label} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{item.title}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="fade-up" style={{ background: "rgba(2,128,144,0.06)", border: "1px solid rgba(2,128,144,0.2)", borderRadius: "12px", padding: "2rem 2.5rem", marginTop: "2rem" }}>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: 820 }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--teal)", fontWeight: 600 }}>Two grants. Two stages. One clear path.</span>{" "}CIP Spark (Cradle, RM 150K) funds the prototype — no prototype required to apply, rolling admissions. NTIS Sandbox 1 (RM 250K) follows once the device exists, funding the first clinical trial. Clinical access, regulatory planning, and neurosurgeon network are already in place for both.
            </p>
          </div>
        </div>
      </section>

      {/* THE TEAM */}
      <section id="team" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">The Team</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Two UCL MEng Biomedical Engineers.<br />Built for this.
          </h2>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {[
              { image: "/images/alwi-alhaddad.jpg", name: "Alwi Al-Haddad", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — deep learning research for early NEC diagnosis in neonates (87.5% accuracy, SE-ResNet50, published dissertation)", "Fullstack software engineer — built and shipped Gunung (e-commerce), SAPOT (healthcare), and MIDPOINT (consumer tech) solo, from zero to live users", "Clinical access via consultant neurosurgeon father and orthopaedic family network in Malaysia", "Malaysian — deep market knowledge, government relationships, and local clinical infrastructure"] },
              // RONIT SARNA — commented out temporarily
              // { image: "/images/ronit-sarna.jpg", name: "Ronit Sarna", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — co-developed AI-powered assistive smart glasses through full design cycle including prototyping and regulatory research", "Software Development Engineer at Materialise — global leader in 3D printing software for medical devices and prosthetics; Malaysian, based in Kuala Lumpur", "Research and Innovation Intern at Royal National Orthopaedic Hospital — AI for patient-specific surgical guides in live scoliosis procedures", "Research Intern at STMicroelectronics — built stroke detection hardware integrated into an eyeglasses frame"] },
              { image: "/images/martynas-pocius.jpg", name: "Martynas Pocius", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — first-author publication at IEEE ISBI 2024 on reinforcement learning in medical imaging", "Founding Engineer at Drafted.ai (San Francisco); previously Senior ML Engineer at Autodesk Research", "Co-founded UCL AI Foundry — cohort produced Audiogen (seed funding via Entrepreneur First, SF) and other funded AI startups", "Founder in Residence at The Residency (Chapter 3, backed by Sam Altman) and Founders, Inc., San Francisco"] },
              // JOONMIN HAN — commented out temporarily
              // { image: "/images/joonmin-han.jpg", name: "Joonmin Han", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering", "Clinical Data Analyst at Blatchford — inside knowledge from one of the world's leading prosthetics manufacturers", "GCP certified clinical trial experience", "MDA Malaysia and CE Mark regulatory pathway", "UK-based — leads London clinical operations and NHS partnerships"] },
            ].map((member) => (
              <div key={member.name} className="fade-up" style={{ background: "rgba(6,22,34,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <img src={member.image} alt={`${member.name} portrait`} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", objectPosition: "center", border: "1.5px solid var(--teal)", flexShrink: 0, background: "rgba(2,128,144,0.12)" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{member.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--teal)", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", marginTop: "0.15rem" }}>{member.title}</div>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {member.bullets.map((b) => (
                    <li key={b} style={{ fontSize: "0.82rem", color: "var(--grey)", lineHeight: 1.6, display: "flex", gap: "0.6rem", alignItems: "baseline" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, display: "inline-block", marginBottom: "0.1rem" }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE WIN */}
      <section id="advantages" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Unfair Advantages</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Why a Vulcan-style importer<br />cannot win this market.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Day-zero clinical feedback loop", desc: "Alwi's father is a consultant neurosurgeon. That is an unusually direct link to clinical feedback and patient access at a stage when most hardware founders have zero clinical contact. It's a warm introduction to a referral network — not a distribution operation. That is what it is. But it compresses the prototype feedback loop in a way that matters." },
              { title: "ML pattern classification at this price point", desc: "The primary technical moat: a patient-specific multi-grip EMG pattern classifier running on a RM 45 microcontroller, at a device price of RM 9,500. No competitor in this price bracket ships patient-specific ML grip classification — only binary threshold control or manual repositioning. We cover the 4–6 grip patterns 80% of users actually need, at a price 5–10× below the nearest credible alternative." },
              { title: "Clinical socket fitting as retention moat", desc: "Users abandon prosthetic hands primarily because of socket discomfort and poor fit — not grip specs. Our clinical team uses 3D scanning at every fitting to produce a patient-specific socket. The patient needs no special hardware; socket fitting is a clinical service, not a consumer task. A better fit translates directly to lower abandonment rates and stronger recurring service revenue." },
              { title: "Singapore: insurance-backed first market", desc: "MediShield Life and integrated shield plans cover prosthetic devices. Functioning prosthetist infrastructure. High GDP per capita. 45 minutes from our KL manufacturing base. We price at SGD 3,000 in a market where myoelectric prosthetics cost SGD 15,000–50,000. Singapore is the commercial launch — not a charity market." },
              { title: "Three-country architecture", desc: "Build in Malaysia (low-cost, grant-funded). Sell first in Singapore (insurance-covered, 45 min from KL). Scale in the UK — NHS pathway, CE Mark, and a market where the i-limb costs \u00a370,000+. Cost arbitrage at every stage." },
              { title: "Local service wins the account", desc: "In this category, 48-hour repairs and refits matter as much as grip specs. A faster service loop is a real commercial advantage against imported devices with longer support chains." },
              { title: "Two forms of procurement fit", desc: "In Malaysia, we understand the SOCSO, MDA, and hospital procurement logic. In Singapore, we operate within an established insurance reimbursement framework. In the UK, we target NHS procurement and private insurers. Three different systems — all understood from the inside." },
              { title: "Data and talent compounding", desc: "Each local patient fit, repair, and retraining cycle builds a proprietary operating dataset. Combined with Malaysia's underused biomedical engineering talent base, that compounds into a harder-to-copy company." },
            ].map((adv) => (
              <div key={adv.title} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(2,128,144,0.15)", border: "1px solid rgba(2,128,144,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{adv.title}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-label fade-up">Roadmap</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
            From Malaysia to the world.
          </h2>
          <div className="fade-up" style={{ display: "flex", alignItems: "center", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "3rem" }}>
            {[
              { year: "Year 1", label: "Malaysia (build)" },
            { year: "Year 2", label: "Singapore" },
            { year: "Year 3–4", label: "UK pilot + CE Mark" },
            { year: "Year 5", label: "UK commercial + EU" },
            ].map((step, i, arr) => (
              <div key={step.year} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? "1" : "0 0 auto" }}>
                <div style={{ textAlign: "center", minWidth: 110 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--teal)", margin: "0 auto 0.6rem" }} />
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "var(--teal)", marginBottom: "0.2rem" }}>{step.year}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{step.label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ flex: 1, height: 1, background: "var(--teal)", opacity: 0.4, marginBottom: "1.8rem" }} />}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", year: "Now", title: "Apply: CIP Spark", desc: "Apply for Cradle\u2019s CIP Spark grant — rolling admissions, no prototype required. RM 150K over 18 months to fund prototype development. Simultaneously: neurosurgeon network conversations, identify 10 real patient cases." },
              { n: "02", year: "Year 1–2", title: "Build", desc: "CIP Spark funds the first functional prosthetic prototype. Myoelectric. Biocompatible. 3D printed. Signal pipeline from UCL research integrated into hardware. Provisional patent application on control system submitted." },
              { n: "03", year: "Year 2", title: "Enter NTIS Sandbox 1", desc: "Prototype in hand, apply for NTIS Sandbox 1. RM 250K, 6 months, 100% grant funding for a single-site clinical trial. NTIS validates the device that CIP Spark built." },
              { n: "04", year: "Year 2", title: "Prove", desc: "Single-site validation complete. MDA classification review, submission planning, and multi-site expansion preparation in parallel." },
              { n: "05", year: "Year 2", title: "Enter Singapore", desc: "Singapore commercial launch. MediShield Life and integrated shield plans cover device costs for patients. Existing prosthetist infrastructure drives short sales cycles — 45 minutes from our KL base. We enter at SGD 3,000 where the market prices myoelectric prosthetics at SGD 15,000–50,000." },
              { n: "06", year: "Year 3", title: "UK clinical pilot", desc: "CE Mark process for a Class IIb active device takes 2–4 years minimum. We are not entering the UK commercially in Year 2. What Year 3 looks like: CE Mark process formally initiated, RNOH and NHS clinical pilot conversations underway, CE Mark technical documentation work begun." },
              { n: "07", year: "Year 4\u20135", title: "UK commercial + EU → US", desc: "CE Mark completion enables full UK commercial launch and EU market access. By this point Singapore is generating revenue, clinical data exists from Malaysia and UK pilots, and the Series A case is evidence-based rather than projection-based. The i-limb costs £70,000+. We enter at approximately £1,700. US entry follows as the endgame." },
            ].map((step, i, arr) => (
              <div key={step.n} className="fade-up" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid var(--teal)", background: "rgba(2,128,144,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--teal)", flexShrink: 0 }}>{step.n}</div>
                  {i < arr.length - 1 && <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, rgba(2,128,144,0.5), rgba(2,128,144,0.1))" }} />}
                </div>
                <div style={{ paddingTop: "0.4rem", paddingBottom: i < arr.length - 1 ? "1.5rem" : 0 }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.15rem" }}>{step.year}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "0.3rem" }}>{step.title}</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ASK */}
      <section id="ask" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-label fade-up" style={{ textAlign: "center" }}>First-Stage Goal</p>
          <div className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem", textAlign: "center" }}>
            RM 150,000
          </div>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, marginBottom: "3.5rem", textAlign: "center" }}>
            Cradle Fund CIP Spark — prototype development grant. Up to RM 150K over 18 months. Rolling admissions. No prototype required to apply.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>What this stage delivers</div>
              {[
                "First functional myoelectric prototype — EMG controlled, 3D printed, biocompatible",
                "Signal pipeline integrated from UCL research into working hardware",
                "Provisional patent application on control system submitted",
                "Single pilot patient validation to confirm device function",
                "MDA pre-submission engagement initiated",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", marginTop: "0.4rem", flexShrink: 0 }} />
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>What it unlocks next</div>
              {[
                "NTIS Single Site Sandbox — RM 250K, 6 months, 100% grant funding for clinical trial",
                "Ethics board approval and formal clinical feasibility study",
                "MDA Class C registration pathway initiated",
                "Stronger case for private capital with working device and pilot data",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", marginTop: "0.4rem", flexShrink: 0 }} />
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", height: 12, borderRadius: 8, overflow: "hidden", width: "100%" }}>
              {[{ pct: 25, opacity: 1 }, { pct: 15, opacity: 0.85 }, { pct: 10, opacity: 0.72 }, { pct: 20, opacity: 0.58 }, { pct: 10, opacity: 0.44 }, { pct: 13, opacity: 0.30 }, { pct: 7, opacity: 0.18 }].map((seg, i) => (
                <div key={i} style={{ flex: `0 0 ${seg.pct}%`, background: `rgba(2,128,144,${seg.opacity})`, borderRight: i < 6 ? "2px solid var(--navy)" : "none" }} />
              ))}
            </div>
          </div>
          <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem 2rem" }}>
            {[
              { label: "Hardware components", pct: "25%" },
              { label: "3D printing & materials", pct: "15%" },
              { label: "Software development", pct: "10%" },
              { label: "Clinical feasibility", pct: "20%" },
              { label: "IP", pct: "10%" },
              { label: "Regulatory consultation", pct: "13%" },
              { label: "Operational expenditure", pct: "7%" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "var(--grey)" }}>
                  <span style={{ color: "var(--teal)", fontWeight: 600 }}>{item.pct}</span> {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <p className="section-label fade-up" style={{ textAlign: "center" }}>What Comes After</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem, 4.4vw, 3.5rem)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "1.5rem" }}>
            This starts with one prosthetic hand.
            <br />
            It does not end there.
          </h2>
          <div className="fade-up" style={{ maxWidth: 760, margin: "0 auto 3rem" }}>
            {[
              "Rehabilitation robotics, exoskeletons, diagnostic AI, surgical tools. The entire medical-device landscape is waiting to be rebuilt.",
              "We build in Malaysia: low-cost operations, grant funding through Cradle and NTIS, clinical network access, MDA regulatory pathway. That is not the sales market.",
              "We sell first in Singapore because the insurance ecosystem works, the prosthetist infrastructure exists, and it is 45 minutes from our manufacturing base. We sell in the UK because CE Mark is achievable within a defined timeline, and because the i-limb costs £70,000.",
              "The mission is real. The business is viable on its own terms — not dependent on charity economics or government subsidy to survive.",
            ].map((paragraph) => (
              <p key={paragraph} style={{ fontSize: "1rem", color: "var(--grey)", lineHeight: 1.9, marginBottom: "1rem" }}>
                {paragraph}
              </p>
            ))}
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.9, marginTop: "1.75rem" }}>
              We are starting with one product that changes one life at a time.
              <br />
              <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700 }}>Until we have changed all of them.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", textAlign: "center", marginBottom: "3.5rem", lineHeight: 1.2 }}>
            We are looking for clinical partners,<br />funding partners, and patients.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14h-2V8h2v8zm0-10h-2V4h2v2z" fill="#028090" /></svg>, title: "Funding Partners", desc: "We are targeting RM 150K via Cradle Fund CIP Spark to build the prototype, followed by RM 250K via NTIS Sandbox for clinical validation." },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="#028090" strokeWidth="1.5" fill="none" /><path d="M9 12l2 2 4-4" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" /></svg>, title: "Clinical Partners", desc: "Orthopaedic surgeons, rehabilitation physicians, and prosthetists — we want to hear from you." },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#028090" strokeWidth="1.5" /><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" /></svg>, title: "Patients", desc: "If you or someone you know needs a prosthetic and cannot afford existing options, contact us." },
            ].map((card) => (
              <div key={card.title} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem", textAlign: "center", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>{card.icon}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.6rem" }}>{card.title}</div>
                <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="fade-up" style={{ textAlign: "center" }}>
            <a href="mailto:hello@bangkitbionics.com" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", color: "var(--teal)", textDecoration: "none", letterSpacing: "-0.01em", transition: "color 200ms" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--teal-light)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--teal)")}
            >hello@bangkitbionics.com</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "2rem clamp(1.25rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>BANGKIT Bionics</span>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Kuala Lumpur, Malaysia &middot; London, United Kingdom &middot; hello@bangkitbionics.com</span>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>UCL MEng Biomedical Engineering &middot; Founded 2025</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) {
          .mobile-nav-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
