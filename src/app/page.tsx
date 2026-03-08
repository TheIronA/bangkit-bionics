"use client";

import { useEffect, useRef, useState } from "react";

// â”€â”€â”€ Scroll Reveal Hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// â”€â”€â”€ Counter Hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Stat Counter Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  started,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  started: boolean;
}) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--teal)",
          lineHeight: 1.1,
        }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--white-60)",
          marginTop: "0.35rem",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// â”€â”€â”€ Prosthetic Arm SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ArmSVG() {
  return (
    <svg
      viewBox="0 0 280 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 280, margin: "0 auto", display: "block" }}
    >
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
      <rect x="98" y="296" width="10" height="30" rx="5" stroke="#028090" strokeWidth="1.2" fill="rgba(2,128,144,0.06)" transform="rotate(-18 103 310)" />
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

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Home() {
  useScrollReveal();

  const heroRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.4 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => setMobileNavOpen(false);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Team", href: "#team" },
  ];

  return (
    <>
      {/* â”€â”€ NAVBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,37,64,0.92)", backdropFilter: "blur(14px)",
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
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(10,37,64,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileNavOpen(false)} style={{ textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: "1rem", fontWeight: 500 }}>{link.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileNavOpen(false)} style={{ textDecoration: "none", background: "var(--teal)", color: "#fff", fontSize: "0.9rem", fontWeight: 600, padding: "0.65rem 1.2rem", borderRadius: "6px", textAlign: "center" }}>Get In Touch</a>
        </div>
      )}

      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem clamp(1.25rem, 6vw, 4rem) 5rem", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div aria-hidden style={{ position: "absolute", top: "18%", left: "12%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.12) 0%, transparent 70%)", animation: "orbFloat 12s ease-in-out infinite", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "20%", right: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.09) 0%, transparent 70%)", animation: "orbFloat2 15s ease-in-out infinite", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", top: "55%", left: "50%", width: 600, height: 600, transform: "translate(-50%, -50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(2,128,144,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <p className="section-label fade-up visible" style={{ marginBottom: "1.5rem" }}>Restoring Movement. Changing Lives.</p>
          <h1 className="fade-up visible" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.5rem" }}>
            Giving Southeast Asia<br />its movement back.
          </h1>
          <p className="fade-up" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "var(--white-60)", lineHeight: 1.65, maxWidth: 620, margin: "0 auto 2.5rem" }}>
            BANGKIT Bionics builds affordable myoelectric robotic prosthetics for the 600,000+ amputees across Southeast Asia priced out of existing solutions.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="#ask" style={{ textDecoration: "none", background: "var(--teal)", color: "#fff", fontWeight: 600, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", letterSpacing: "0.02em", transition: "background 200ms, transform 200ms", display: "inline-block" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal-light)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--teal)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >View Pitch Deck</a>
            <a href="#contact" style={{ textDecoration: "none", background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", letterSpacing: "0.02em", border: "1.5px solid rgba(255,255,255,0.35)", transition: "border-color 200ms, transform 200ms", display: "inline-block" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >Contact Us</a>
          </div>
          <div ref={heroRef} className="fade-up" style={{ display: "flex", gap: "clamp(1.5rem, 5vw, 4rem)", justifyContent: "center", flexWrap: "wrap", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <StatCounter value={600} suffix="K+" label="Amputees in SEA" started={statsStarted} />
            <StatCounter value={80000} prefix="RM " label="Cost of imported arm" started={statsStarted} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--teal)", lineHeight: 1.1 }}>&lt;5%</div>
              <div style={{ fontSize: "0.85rem", color: "var(--white-60)", marginTop: "0.35rem" }}>Who can afford one</div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ THE PROBLEM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="problem" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label fade-up">The Problem</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "3.5rem", maxWidth: 640 }}>
          Millions have lost limbs. Almost none<br />can afford to move again.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { number: "7,000+", title: "Annual amputations in Malaysia", desc: "Driven primarily by diabetes complications â€” one of the highest rates in Asia." },
            { number: "RM 20Kâ€“80K", title: "Cost of imported robotic prosthetics", desc: "Equivalent to 1â€“3 years of median Malaysian household income. Entirely inaccessible for most." },
            { number: "0", title: "Local robotic prosthetic manufacturers", desc: "Malaysia has no serious local manufacturer of robotic prosthetics. The market is wide open." },
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
        <div className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem 2.5rem" }}>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: 820 }}>
            <span style={{ fontFamily: "var(--font-heading)", color: "#fff", fontWeight: 600 }}>SOCSO and OKU government schemes cover basic passive prosthetics only.</span>{" "}No programme currently subsidises robotic limbs. Patients are left without options.
          </p>
        </div>
      </section>

      {/* â”€â”€ THE SOLUTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="solution" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", maxWidth: 1200, margin: "0 auto" }}>
        <p className="section-label fade-up">The Solution</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
          Built in Malaysia. Built for Malaysia.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <div className="fade-up" style={{ display: "flex", justifyContent: "center" }}>
            <ArmSVG />
          </div>
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { name: "Myoelectric Control", desc: "EMG sensors read muscle signals. Natural, intuitive movement without manual input." },
              { name: "3D Printed & Custom Fit", desc: "Every device printed to exact patient dimensions. No expensive moulds or long lead times." },
              { name: "Biocompatible Materials", desc: "ISO 10993-compliant skin-contact components. Safe, durable, lightweight." },
              { name: "RM 4,000â€“8,000 Target Price", desc: "Up to 90% cheaper than imported alternatives. Designed for the B40-M40 market." },
            ].map((feat) => (
              <div key={feat.name} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", marginTop: "0.45rem", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.3rem" }}>{feat.name}</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--grey)", lineHeight: 1.7 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
            <div className="fade-up" style={{ border: "1px solid var(--teal)", borderRadius: "10px", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                <span style={{ color: "var(--teal)", fontWeight: 600, fontFamily: "var(--font-heading)" }}>Regulatory-first design.</span>{" "}Built for MDA Malaysia Class C registration from day one. Not a prototype looking for approval â€” a device built for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ MARKET OPPORTUNITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="market" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">Market Opportunity</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            A region of 670 million people.<br />No serious local competitor.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {[
              { value: "USD 1.2B", label: "SEA Prosthetics Market", sub: "Growing 8% annually" },
              { value: "USD 11.4B", label: "Global TAM", sub: "6.8% CAGR" },
              { value: "USD 80M", label: "Year 1â€“3 Addressable", sub: "Malaysia + Singapore beachhead" },
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

      {/* â”€â”€ THE TEAM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="team" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label fade-up">The Team</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Four UCL MEng Biomedical Engineers.<br />Built for this.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { initial: "A", name: "Alwi", title: "CEO & Co-Founder", bullets: ["UCL MEng Biomedical Engineering (2:1)", "AI research: smart glasses for the visually impaired", "Serial entrepreneur â€” import and software", "Clinical access via neurosurgeon father and orthopaedic family network"] },
              { initial: "R", name: "Ronit", title: "CTO & Co-Founder", bullets: ["UCL MEng Biomedical Engineering", "Biomaterials industry experience", "Full-stack engineering", "Deep expertise in biocompatible materials and device durability"] },
              { initial: "M", name: "Martynas", title: "COO", bullets: ["Multiple startup experience across Europe", "Fundraising and go-to-market", "Medtech startup advisory", "Bridges technical team to investors"] },
              { initial: "J", name: "Joonmin", title: "Head of Clinical", bullets: ["Clinical testing and validation", "Medical device regulatory experience", "Clinical trial design", "MDA Malaysia and CE Mark pathway"] },
            ].map((member) => (
              <div key={member.name} className="fade-up" style={{ background: "rgba(13,45,71,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "2rem", transition: "border-color 200ms, transform 200ms" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(2,128,144,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(2,128,144,0.2)", border: "1.5px solid var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--teal)", flexShrink: 0 }}>{member.initial}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>{member.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--teal)", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", marginTop: "0.15rem" }}>{member.title}</div>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {member.bullets.map((b) => (
                    <li key={b} style={{ fontSize: "0.82rem", color: "var(--grey)", lineHeight: 1.6, display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--teal)", marginTop: "0.25rem", flexShrink: 0 }}>â€”</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ ROADMAP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="roadmap" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="section-label fade-up">Roadmap</p>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "3.5rem" }}>
            From validation to SEA dominance<br />in 36 months.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "01", title: "Validate", desc: "Clinical discovery. Patient identification. Zero cost." },
              { n: "02", title: "Fund", desc: "Cradle Fund, MRANTI, NIH Malaysia. RM 500K target." },
              { n: "03", title: "Build", desc: "First functional prototype. Biocompatible. Myoelectric. 3D printed." },
              { n: "04", title: "Prove", desc: "Clinical trial. MDA registration. First hospital sales." },
              { n: "05", title: "Scale", desc: "Indonesia, Singapore, Thailand. Series A. Regional dominance." },
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

      {/* â”€â”€ THE ASK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="ask" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p className="section-label fade-up">Seed Round</p>
          <div className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            RM 500,000
          </div>
          <p className="fade-up" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "var(--white-60)", lineHeight: 1.7, marginBottom: "3rem" }}>
            Non-dilutive grant funding via Cradle Fund CIP 500, MRANTI Deep Tech, and NIH Malaysia.
          </p>
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

      {/* â”€â”€ CONTACT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="contact" style={{ padding: "7rem clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", textAlign: "center", marginBottom: "3.5rem", lineHeight: 1.2 }}>
            We are looking for clinical partners,<br />investors, and patients.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14h-2V8h2v8zm0-10h-2V4h2v2z" fill="#028090" /></svg>, title: "Investors", desc: "We are raising RM 500K seed. Reach out to discuss the opportunity." },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="#028090" strokeWidth="1.5" fill="none" /><path d="M9 12l2 2 4-4" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" /></svg>, title: "Clinical Partners", desc: "Orthopaedic surgeons, rehabilitation physicians, and prosthetists â€” we want to hear from you." },
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

      {/* â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "2rem clamp(1.25rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>BANGKIT Bionics</span>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Kuala Lumpur, Malaysia Â· hello@bangkitbionics.com</span>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>UCL MEng Biomedical Engineering Â· Founded 2025</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-nav-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
