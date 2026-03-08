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
      style={{ width: "100%", maxWidth: 420, margin: "0 auto", display: "block" }}>
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
            Four UCL Biomedical Engineers. One mission. Affordable robotic prosthetics for Southeast Asia.
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
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--teal)", lineHeight: 1.1 }}>3%-90%</div>
              <div style={{ fontSize: "0.85rem", color: "var(--white-60)", marginTop: "0.35rem" }}>Assistive-product access range by income level</div>
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
            { number: "830M", title: "People living with diabetes in 2022", desc: "WHO lists diabetes as a major cause of lower-limb amputation alongside kidney failure, stroke, and cardiovascular disease." },
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
          Selected figures: UN World Population Prospects 2024 Revision; WHO Assistive Technology fact sheet (2024); WHO Diabetes fact sheet (2024).
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
              initial: "A", name: "Ahmad, 44", location: "Seremban, Negeri Sembilan",
              story: "Factory worker. Lost his right arm below the elbow in an industrial accident. His SOCSO claim covered a basic cosmetic prosthetic — non-functional, non-robotic. He earns RM 2,200/month. An imported myoelectric arm would cost him 3 years of total savings.",
            },
            {
              initial: "N", name: "Nurul, 28", location: "Kota Bharu, Kelantan",
              story: "Born with a congenital upper limb difference. Has used a basic hook prosthetic her whole life. She has never typed on a keyboard or held her niece's hand properly. A robotic hand would cost her family RM 40,000. Her father is a farmer.",
            },
            {
              initial: "R", name: "Encik Rajan, 61", location: "Ipoh, Perak",
              story: "Diabetic amputation in 2023. Was an active grandfather — now dependent on a wheelchair because a powered prosthetic is RM 60,000 and his pension is RM 900/month. He will never walk again unless something changes.",
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
              { n: "01", title: "Growing chronic-disease burden", desc: "WHO reports 830 million people were living with diabetes in 2022, and diabetes remains a major driver of amputation risk." },
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
          Built in Malaysia. Built for Malaysia.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
          <div className="fade-up" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ArmSVG />
          </div>
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { name: "Myoelectric Control", desc: "EMG sensors read muscle signals from the residual limb. Natural, intuitive movement — multi-grip capability including pinch, grasp, and point." },
              { name: "3D Printed & Custom Fit", desc: "Every device printed to exact patient dimensions. No expensive moulds or long lead times. Iteration in days, not months." },
              { name: "Biocompatible Materials", desc: "ISO 10993-compliant skin-contact components selected by our biomaterials co-founder. Safe, durable, lightweight." },
              { name: "Repairable & Upgradeable", desc: "Modular design means components replace individually. No need to replace the whole arm if a single motor fails. Maintenance accessible locally." },
              { name: "RM 4,000\u20138,000 Target Price", desc: "Intended to sit materially below imported alternatives and closer to what Malaysian hospitals, prosthetists, and families may be able to support." },
              { name: "Tiered Product Range", desc: "From passive 3D-printed devices at RM 500 to full myoelectric arms at RM 8,000. Every patient. Every budget. One platform." },
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
              { n: "01", title: "EMG Sensing", desc: "Surface electrodes detect micro-volt muscle contractions from the residual limb." },
              { n: "02", title: "Signal Processing", desc: "Onboard microcontroller filters noise and classifies grip intent in real time." },
              { n: "03", title: "Motor Actuation", desc: "Servo motors drive individual finger tendons. Multiple independent grip patterns." },
              { n: "04", title: "Structural Shell", desc: "3D-printed outer shell custom fit per patient. Biocompatible TPU inner socket." },
              { n: "05", title: "Power System", desc: "Rechargeable Li-ion battery. USB-C charging. Battery indicator on wrist unit." },
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
              { value: "USD 80M", label: "Year 1\u20133 beachhead model", sub: "Internal estimate for Malaysia + Singapore" },
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
                { year: "Year 1", label: "Malaysia" },
                { year: "Year 2", label: "Singapore" },
                { year: "Year 3", label: "Indonesia + Thailand" },
                { year: "Year 5", label: "SEA-wide" },
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
            We are not competing with Open Bionics.<br />We are filling the gap they cannot fill.
          </h2>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, maxWidth: 680, marginBottom: "3rem" }}>
            Our position combines local manufacturing, custom fit, clinical collaboration, and lower target pricing for the Malaysian market.
          </p>
          <div className="fade-up" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  {["Company", "Price", "Local Support", "Custom Fit", "SEA Focused", "Regulatory"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.78rem", color: "var(--teal)", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { company: "BANGKIT Bionics", highlight: true, price: "RM 4K\u20138K (flagship RM 5,500)", local: "Malaysia-based", fit: "3D custom", sea: "Built for SEA", reg: "MDA pathway planned" },
                  { company: "Open Bionics", highlight: false, price: "Quote-based", local: "Imported", fit: "Partial", sea: "Selective distributor markets", reg: "CE Mark / FDA" },
                  { company: "Ottobock", highlight: false, price: "USD 20K\u201380K", local: "Distributor only", fit: "Limited", sea: "Premium only", reg: "CE Mark / FDA" },
                  { company: "Glomas (MY)", highlight: false, price: "Undisclosed", local: "Malaysia", fit: "Basic passive", sea: "Local", reg: "Limited" },
                  { company: "e-NABLE / DIY", highlight: false, price: "<USD 100", local: "Community", fit: "Basic", sea: "Partial", reg: "None" },
                ].map((row) => (
                  <tr key={row.company} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: row.highlight ? "rgba(2,128,144,0.07)" : "transparent" }}>
                    <td style={{ padding: "1rem", fontFamily: "var(--font-heading)", fontWeight: row.highlight ? 700 : 500, color: row.highlight ? "var(--teal)" : "#fff", whiteSpace: "nowrap" }}>{row.company}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)", whiteSpace: "nowrap" }}>{row.price}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.local}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.fit}</td>
                    <td style={{ padding: "1rem", color: "var(--grey)" }}>{row.sea}</td>
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
              { label: "COGS per unit", value: "RM 2,000\u20133,000", sub: "Materials, print, electronics, labour at prototype scale" },
              { label: "Target selling price", value: "RM 5,500", sub: "Myoelectric flagship ASP. Range RM 4,000\u20138,000 across product tiers. 100% markup on COGS." },
              { label: "Gross margin", value: "~50%", sub: "Improving to 60%+ as volume scale reduces COGS" },
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
            Illustrative path to RM 55M revenue by Year 5.<br />Break-even case from Year 2.
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
                  { year: "Year 1", units: "50", rev: "RM 275K", gp: "RM 137K", margin: "50%", market: "Malaysia", milestone: "Pilot, clinical validation patients", highlight: false },
                  { year: "Year 2", units: "300", rev: "RM 1.65M", gp: "RM 825K", margin: "50%", market: "Malaysia + Singapore", milestone: "First hospital contracts", highlight: false },
                  { year: "Year 3", units: "1,000", rev: "RM 5.5M", gp: "RM 2.75M", margin: "50%", market: "+ Indonesia + Thailand", milestone: "Regional expansion", highlight: true },
                  { year: "Year 4", units: "3,500", rev: "RM 19.25M", gp: "RM 9.6M", margin: "50%+", market: "SEA-wide + UK pilot", milestone: "Series B, UK pilot begins", highlight: true },
                  { year: "Year 5", units: "10,000", rev: "RM 55M", gp: "RM 27.5M", margin: "50%+", market: "SEA + UK + Europe", milestone: "Regional scale, global optionality", highlight: true },
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
              { val: "RM 5,500", lbl: "Flagship ASP", sub: "Range RM 4K\u20138K across tiers" },
              { val: "~50%", lbl: "Gross margin", sub: "Scaling to 60%+ at volume" },
              { val: "Year 2", lbl: "Break-even", sub: "At 300 units / RM 1.65M revenue" },
              { val: "RM 55M", lbl: "Year 5 revenue target", sub: "10,000 units, SEA + UK + Europe" },
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
            Proof before prototype.
          </h2>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, maxWidth: 640, marginBottom: "3rem" }}>
            We have not yet built the physical product. What we have built is the clinical, regulatory, and commercial foundation that makes the product viable at scale.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                label: "01", title: "Clinical Network — Day Zero",
                desc: "Direct access to neurosurgery via our CEO\u2019s father, a practising consultant neurosurgeon. Orthopaedic referral conversations are underway, with early pilot-patient outreach in progress.",
              },
              {
                label: "02", title: "Technology Validated at Component Level",
                desc: "Bench testing is underway on EMG signal capture, filtering, and printed structural parts. The goal is to de-risk core subsystems before full-device prototyping.",
              },
              {
                label: "03", title: "Regulatory Pathway Mapped",
                desc: "The Malaysian regulatory pathway is being mapped against MDA requirements, while ethics-board preparation and ISO 13485 planning are being scoped in parallel.",
              },
              {
                label: "04", title: "Grant Pipeline Active",
                desc: "The team is evaluating Malaysian grant and deep-tech funding pathways, with RM 500K as the current non-dilutive funding target.",
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
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--teal)", fontWeight: 600 }}>This seed round is not starting from a blank page.</span>{" "}Clinical access, regulatory planning, and early technical work are already underway. The capital funds the next stage of product development.
            </p>
          </div>
        </div>
      </section>

      {/* THE TEAM */}
      <section id="team" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">The Team</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Four UCL MEng Biomedical Engineers.<br />Built for this.
          </h2>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {[
              { image: "/images/alwi-alhaddad.jpg", name: "Alwi Al-Haddad", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — deep learning research for early NEC diagnosis in neonates (87.5% accuracy, SE-ResNet50, published dissertation)", "Built and shipped Gunung (e-commerce), SAPOT (healthcare), and MIDPOINT (consumer tech) solo, from zero to live users", "Clinical access via consultant neurosurgeon father and orthopaedic family network in Malaysia", "Malaysian — deep market knowledge, government relationships, and local clinical infrastructure"] },
              { image: "/images/ronit-sarna.jpg", name: "Ronit Sarna", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — co-developed AI-powered assistive smart glasses through full design cycle including prototyping and regulatory research", "Software Development Engineer at Materialise — global leader in 3D printing software for medical devices and prosthetics; Malaysian, based in Kuala Lumpur", "Research and Innovation Intern at Royal National Orthopaedic Hospital — AI for patient-specific surgical guides in live scoliosis procedures", "Research Intern at STMicroelectronics — built stroke detection hardware integrated into an eyeglasses frame"] },
              { image: "/images/martynas-pocius.jpg", name: "Martynas Pocius", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — first-author publication at IEEE ISBI 2024 on reinforcement learning in medical imaging", "Founding Engineer at Drafted.ai (San Francisco); previously Senior ML Engineer at Autodesk Research", "Co-founded UCL AI Foundry — cohort produced Audiogen (seed funding via Entrepreneur First, SF) and other funded AI startups", "Founder in Residence at The Residency (Chapter 3, backed by Sam Altman) and Founders, Inc., San Francisco"] },
              { image: "/images/joonmin-han.jpg", name: "Joonin Han", title: "Co-Founder", bullets: ["UCL MEng Biomedical Engineering — Master's thesis on wheelchair sports accessibility; medical device design, CAD, FEA, and prototyping", "Clinical Data Analyst at Blatchford — inside-industry knowledge from one of the world's leading prosthetics and orthotics manufacturers", "Clinical Trial Assistant at PANORAMIC DIGITAL HEALTH — GCP certified, wearable sensor data analysis, trial management", "Bachelor's research on digital measures of fatigue — wearable sensor analysis and technical data communication"] },
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
            What cannot be easily<br />replicated by a competitor.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Clinical access nobody can buy", desc: "Our CEO's father is a practising neurosurgeon with an established hospital network in Malaysia. Direct access to patients and clinicians from day one. No 18-month procurement cycles to get started." },
              { title: "Biomaterials expertise in-house", desc: "Post-graduation industry experience in biomaterials is rare. Having it on the founding team — not as a consultant — means device compliance is built correctly from the first prototype, not expensively corrected later." },
              { title: "Genuine local advantage", desc: "We are Malaysian. We understand the healthcare system, the B40/M40 purchasing reality, the government grant landscape, and the MDA regulatory pathway. Foreign competitors simply cannot replicate this." },
              { title: "UCL Biomedical Engineering pedigree", desc: "Four MEng graduates from one of the world's top biomedical engineering programmes. We studied medical device regulation, clinical trial design, and biomechanics as examined curriculum — not background reading." },
              { title: "Startup DNA in the team", desc: "Our COO has founded and operated multiple startups. Our CEO has built import businesses and software contracts under real market pressure. This is not a team of academics who have never shipped." },
              { title: "Regulatory-first by design", desc: "Most hardware startups retrofit compliance. We are building for MDA registration from day one. Our clinical co-founder owns this pathway. We reach commercialisation faster and with fewer expensive pivots." },
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
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
            From Malaysia to the world.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "Validate", desc: "Conversations with neurosurgeon network. Identify 10 real patient cases. Confirm unmet need. Zero cost — pure discovery." },
              { n: "02", title: "Fund", desc: "Grant and seed-funding outreach in parallel. RM 500K prototype-round target." },
              { n: "03", title: "Build", desc: "First functional prototype. Biocompatible. Myoelectric. 3D printed. Provisional patent filed on control system." },
              { n: "04", title: "Prove", desc: "Clinical feasibility work. Ethics board approval. Malaysian regulatory submission planning. Singapore market-entry preparation." },
              { n: "05", title: "Scale", desc: "First hospital sales in Malaysia. Public-support and procurement applications where applicable. Singapore expansion. Series A for regional scale." },
              { n: "06", title: "Global", desc: "UCL clinical partnerships and NHS pilot programme in London. CE Mark conversion opens UK, EU and Australia. Martynas Pocius leads European investor relationships and startup network. London as western headquarters. The device built for the hardest market conquers every other one." },
            ].map((step, i, arr) => (
              <div key={step.n} className="fade-up" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid var(--teal)", background: "rgba(2,128,144,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--teal)", flexShrink: 0 }}>{step.n}</div>
                  {i < arr.length - 1 && <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom, rgba(2,128,144,0.5), rgba(2,128,144,0.1))" }} />}
                </div>
                <div style={{ paddingTop: "0.4rem", paddingBottom: i < arr.length - 1 ? "1.5rem" : 0 }}>
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
          <p className="section-label fade-up" style={{ textAlign: "center" }}>Prototype Round</p>
          <div className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.5rem", textAlign: "center" }}>
            RM 500,000
          </div>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, marginBottom: "3.5rem", textAlign: "center" }}>
            Non-dilutive grant funding via Cradle Fund CIP 500, MRANTI Deep Tech, and NIH Malaysia.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", color: "var(--teal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>What this round delivers</div>
              {[
                "Working myoelectric prototype — biocompatible, 3D printed, EMG controlled",
                "Clinical feasibility study with 3\u20135 amputee patients",
                "MDA pre-submission engagement and device classification review initiated",
                "12 months of runway to Series A readiness",
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
                "Series A raise — RM 3M+ from Cradle LCCM and impact investors",
                "First hospital pilot sales and prosthetist channel launch",
                "Full Malaysian regulatory submission and CE Mark planning pathway",
                "Expansion into Singapore and Indonesia markets",
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
              {[{ pct: 40, opacity: 1 }, { pct: 20, opacity: 0.75 }, { pct: 20, opacity: 0.55 }, { pct: 15, opacity: 0.38 }, { pct: 5, opacity: 0.22 }].map((seg, i) => (
                <div key={i} style={{ flex: `0 0 ${seg.pct}%`, background: `rgba(2,128,144,${seg.opacity})`, borderRight: i < 4 ? "2px solid var(--navy)" : "none" }} />
              ))}
            </div>
          </div>
          <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem 2rem" }}>
            {[
              { label: "R&D & Prototyping", pct: "40%" },
              { label: "Regulatory & Compliance", pct: "20%" },
              { label: "Clinical Trial", pct: "20%" },
              { label: "Team & Operations", pct: "15%" },
              { label: "Contingency", pct: "5%" },
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

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", textAlign: "center", marginBottom: "3.5rem", lineHeight: 1.2 }}>
            We are looking for clinical partners,<br />investors, and patients.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14h-2V8h2v8zm0-10h-2V4h2v2z" fill="#028090" /></svg>, title: "Investors", desc: "We are raising RM 500K seed. Reach out to discuss the opportunity." },
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
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Kuala Lumpur, Malaysia &middot; hello@bangkitbionics.com</span>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>UCL MEng Biomedical Engineering &middot; Founded 2024</span>
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
