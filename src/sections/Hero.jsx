import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, GitBranch, Star, ChevronDown } from "lucide-react";
import { Meteors } from "../components/magicui/meteors";
import { BorderBeam } from "../components/magicui/border-beam";
import { useState, useRef, useEffect } from "react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "../components/magicui/magnetic";

// ── Inline brand SVGs ──────────────────────────────────────────────
function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconMail({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ── Stagger helpers ────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Sub-components ─────────────────────────────────────────────────
function StatusPill() {
  return (
    <motion.div variants={item} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] w-fit">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      <span className="text-[11px] tracking-[0.16em] uppercase text-emerald-400/80 font-medium font-mono">
        Open Source · CNCF Ecosystem
      </span>
    </motion.div>
  );
}

function Heading() {
  return (
    <motion.div variants={item} className="space-y-2">
      <h1 className="text-[clamp(3.2rem,7.5vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
        <span className="block">Govind</span>
        <span className="block text-white/25">Charpe</span>
      </h1>
      <p className="text-[13px] font-mono text-white/30 tracking-[0.12em] uppercase mt-4 ml-1">
        Cloud-Native Engineer · OSS Contributor
      </p>
    </motion.div>
  );
}

function Description() {
  return (
    <motion.p
      variants={item}
      className="text-[1.0625rem] leading-[1.8] text-white/40 max-w-[36ch]"
    >
      Building cloud-native tooling, observability infrastructure, and open source developer experiences. Currently contributing to{" "}
      <a
        href="https://github.com/goharbor/harbor-cli"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/75 font-medium hover:text-blue-400 transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-blue-400/50"
      >
        Harbor CLI
      </a>{" "}
      and{" "}
      <a
        href="https://github.com/jaegertracing/jaeger-ui"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/75 font-medium hover:text-blue-400 transition-colors duration-200 underline underline-offset-4 decoration-white/20 hover:decoration-blue-400/50"
      >
        Jaeger UI
      </a>
      .
    </motion.p>
  );
}

function CTAs() {
  return (
    <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
      <Magnetic intensity={0.2} className="inline-block">
        <a href="#work" className="uiverse-btn" data-cursor="true">
          <span>View Work</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </Magnetic>

      <Magnetic intensity={0.1} className="inline-block">
        <a
          href="https://github.com/gcharpe1604"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="true"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white/50 border border-white/[0.07] hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
        >
          <IconGithub size={14} />
          GitHub
        </a>
      </Magnetic>

      <Magnetic intensity={0.1} className="inline-block">
        <a
          href="#"
          data-cursor="true"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white/50 border border-white/[0.07] hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
        >
          Resume
        </a>
      </Magnetic>
    </motion.div>
  );
}

function Socials() {
  const links = [
    { href: "https://github.com/gcharpe1604", Icon: IconGithub, label: "GitHub" },
    { href: "https://linkedin.com/in/govind-charpe", Icon: IconLinkedin, label: "LinkedIn" },
    { href: "https://twitter.com/gcharpe", Icon: IconX, label: "X / Twitter" },
    { href: "mailto:govind@example.com", Icon: IconMail, label: "Email" },
  ];

  return (
    <motion.div variants={item} className="flex items-center gap-2">
      {links.map((link) => {
        const SocialIcon = link.Icon;
        return (
          <Magnetic key={link.label} intensity={0.3}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              data-cursor="true"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.06] text-white/35 bg-white/[0.02] hover:text-white hover:bg-white/[0.07] hover:border-white/10 hover:scale-110 transition-all duration-200"
            >
              <SocialIcon size={15} />
            </a>
          </Magnetic>
        );
      })}
    </motion.div>
  );
}

// ── Right panel ────────────────────────────────────────────────────
function ContributingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.18em] font-mono">Active Contributions</p>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-3.5">
        {[
          { name: "goharbor / harbor-cli", lang: "Go", color: "#00ADD8", stars: "2.1k", commits: "+127 commits", pr: "42 PRs" },
          { name: "jaegertracing / jaeger-ui", lang: "TypeScript", color: "#3178C6", stars: "4.8k", commits: "+89 commits", pr: "15 PRs" },
        ].map((repo) => (
          <div key={repo.name} className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-200 cursor-default">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg, ${repo.color}, transparent)` }} />
              <div>
                <p className="text-[12px] text-white/75 font-medium leading-tight font-mono">{repo.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: repo.color }} />
                  <span className="text-[10px] text-white/30">{repo.lang}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-[10px] text-white/30">{repo.pr}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-white/25">
                <Star className="w-2.5 h-2.5" />
                <span className="text-[10px] font-mono">{repo.stars}</span>
              </div>
              <p className="text-[10px] text-emerald-400/70 mt-0.5 font-mono">{repo.commits}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: "cmd", text: "harbor-cli repo list" },
    { type: "out", text: "→ harbor-cli  jaeger-ui  opentelemetry" },
    { type: "cmd", text: "git log --oneline -3" },
    { type: "out", text: "feat: add OIDC token refresh\nfix: digraph layout race condition" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const playSound = useSound();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter" && input.trim()) {
      playSound("click");
      const cmd = input.trim().toLowerCase();
      let out;
      switch (cmd) {
        case "help": out = "Commands: help, clear, whoami, skills, projects, contact"; break;
        case "whoami": out = "Govind Charpe — Cloud-Native Engineer & OSS Contributor"; break;
        case "skills": out = "Go · TypeScript · Rust · Kubernetes · Docker · React · gRPC"; break;
        case "projects": out = "harbor-cli  jaeger-ui  kube-lens  promex  otel-distro"; break;
        case "contact": out = "→ govind@example.com | linkedin.com/in/govind-charpe"; break;
        case "sudo contact": out = "Access Denied. Try the mail button bottom-right."; break;
        case "clear": setHistory([]); setInput(""); return;
        default: out = `zsh: command not found: ${cmd}`;
      }
      setHistory([...history, { type: "cmd", text: input }, { type: "out", text: out }]);
      setInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-white/[0.06] bg-[#060810] overflow-hidden font-mono h-[220px] flex flex-col"
    >
      <BorderBeam size={180} duration={12} delay={9} />
      <div className="terminal-scanline" />

      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-auto text-[10px] text-white/25 tracking-wider">~/govind — zsh</span>
      </div>

      {/* Body */}
      <div
        className="p-3.5 overflow-y-auto flex-1 space-y-1.5 text-[11.5px] leading-relaxed custom-scrollbar"
        onClick={() => document.getElementById("term-input")?.focus()}
      >
        <div className="text-emerald-400/70 mb-1.5">Welcome to GovindOS v1.0 — type <span className="text-white/50">'help'</span> to begin.</div>
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "cmd" ? (
              <div className="flex gap-2">
                <span className="text-pink-400/80 select-none">❯</span>
                <span className="text-blue-400/80 select-none">~/govind</span>
                <span className="text-white/70">{line.text}</span>
              </div>
            ) : (
              <div className="text-white/40 pl-4">{line.text}</div>
            )}
          </div>
        ))}
        <div className="flex gap-2 items-center">
          <span className="text-pink-400/80 select-none">❯</span>
          <span className="text-blue-400/80 select-none">~/govind</span>
          <input
            id="term-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white/70 focus:ring-0 p-0"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={endRef} />
      </div>
    </motion.div>
  );
}

function StatsRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid grid-cols-3 gap-2.5"
    >
      {[
        { value: "847+", label: "Contributions", color: "#3b82f6" },
        { value: "65+", label: "PRs Merged", color: "#10b981" },
        { value: "3", label: "OSS Projects", color: "#8b5cf6" },
      ].map((s) => (
        <div
          key={s.label}
          className="group rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3.5 text-center hover:border-white/[0.09] hover:bg-white/[0.04] transition-all duration-200"
        >
          <p className="text-lg font-semibold text-white/85 leading-none font-mono">{s.value}</p>
          <p className="text-[9px] text-white/25 mt-1.5 tracking-[0.15em] uppercase font-mono">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)]">
      <Meteors number={15} />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-[-200px] left-[-200px] w-[800px] h-[800px] opacity-60"
        style={{ background: "radial-gradient(circle at center, rgba(37,99,235,0.07) 0%, transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[-100px] w-[500px] h-[500px] opacity-40"
        style={{ background: "radial-gradient(circle at center, rgba(139,92,246,0.05) 0%, transparent 60%)" }}
      />

      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20"
      >
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 xl:gap-24 items-center py-28">

          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7"
          >
            <StatusPill />
            <Heading />
            <Description />
            <CTAs />
            <Socials />
          </motion.div>

          {/* RIGHT */}
          <div className="hidden lg:flex flex-col gap-3.5">
            <ContributingCard />
            <InteractiveTerminal />
            <StatsRow />
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent" />
    </section>
  );
}
