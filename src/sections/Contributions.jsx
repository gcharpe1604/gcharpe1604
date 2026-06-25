import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitPullRequest, GitCommit, ExternalLink, GitBranch, Star } from "lucide-react";
import { Magnetic } from "../components/magicui/magnetic";
import { BorderBeam } from "../components/magicui/border-beam";

const contributions = [
  {
    repo: "goharbor / harbor-cli",
    org: "goharbor",
    description:
      "Built the Harbor CLI from scratch. Implemented core commands, artifact management, and security vulnerability scanning integrations using Go and Cobra.",
    stats: { prs: 42, commits: 127, stars: "2.1k" },
    tech: ["Go", "Cobra", "Docker"],
    link: "https://github.com/goharbor/harbor-cli",
    status: "Core Contributor",
    color: "#00ADD8",
    accent: "rgba(0, 173, 216, 0.08)",
    accentBorder: "rgba(0, 173, 216, 0.2)",
  },
  {
    repo: "jaegertracing / jaeger-ui",
    org: "jaegertracing",
    description:
      "Resolved critical race conditions in the trace Digraph component and improved render performance for massive trace datasets with 89 commits.",
    stats: { prs: 15, commits: 89, stars: "4.8k" },
    tech: ["TypeScript", "React", "Vite"],
    link: "https://github.com/jaegertracing/jaeger-ui",
    status: "Contributor",
    color: "#3178C6",
    accent: "rgba(49, 120, 198, 0.08)",
    accentBorder: "rgba(49, 120, 198, 0.2)",
  },
  {
    repo: "open-telemetry / opentelemetry-go",
    org: "open-telemetry",
    description:
      "Added instrumentation hooks for emerging database drivers and optimized context propagation overhead across gRPC-connected microservices.",
    stats: { prs: 8, commits: 24, stars: "5.2k" },
    tech: ["Go", "gRPC", "Observability"],
    link: "https://github.com/open-telemetry/opentelemetry-go",
    status: "Contributor",
    color: "#E10098",
    accent: "rgba(225, 0, 152, 0.06)",
    accentBorder: "rgba(225, 0, 152, 0.18)",
  },
];

function ContributionCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="true"
      className="group relative rounded-2xl border overflow-hidden flex flex-col h-full transition-all duration-300"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = item.accentBorder;
        e.currentTarget.style.background = item.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.015)";
      }}
    >
      <BorderBeam size={200} duration={14} delay={index * 3} colorFrom={item.color} colorTo="transparent" />

      {/* Top accent bar */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: item.accent, border: `1px solid ${item.accentBorder}` }}
            >
              <GitBranch className="w-3.5 h-3.5" style={{ color: item.color }} />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                {item.status}
              </span>
            </div>
          </div>
          <Magnetic intensity={0.25}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06] text-white/30 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
        </div>

        {/* Repo name */}
        <h4
          className="text-[14px] font-mono font-medium mb-3 transition-colors duration-300"
          style={{ color: "rgba(255,255,255,0.85)" }}
          onMouseEnter={(e) => (e.target.style.color = item.color)}
          onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
        >
          {item.repo}
        </h4>

        {/* Description */}
        <p className="text-[13.5px] text-white/40 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Stats row */}
        <div className="mt-5 pt-4 border-t border-white/[0.04]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-white/35">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{item.stats.prs} PRs</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/35">
                <GitCommit className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{item.stats.commits} commits</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/35">
                <Star className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{item.stats.stars}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {item.tech.map((t) => (
              <Magnetic key={t} intensity={0.1}>
                <span
                  className="inline-block text-[10px] font-mono font-medium px-2.5 py-1 rounded-md border transition-all duration-200 cursor-default"
                  style={{
                    color: `${item.color}cc`,
                    borderColor: `${item.color}30`,
                    background: `${item.color}08`,
                  }}
                >
                  {t}
                </span>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contributions() {
  return (
    <section id="work" className="relative w-full py-28 md:py-36 bg-[var(--bg-base)]">
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/2 opacity-20"
        style={{ background: "radial-gradient(circle at center, rgba(37,99,235,0.12) 0%, transparent 65%)" }}
      />
      <div className="glow-divider mb-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="section-label text-blue-400/70 mb-5">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase">Open Source</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Significant{" "}
              <span className="text-white/25">Contributions.</span>
            </h2>
            <p className="mt-4 text-white/35 text-[15px] max-w-[45ch] leading-relaxed">
              Building OSS infrastructure used by thousands of engineers every day.
            </p>
          </div>

          <a
            href="https://github.com/gcharpe1604"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[13px] font-mono text-white/35 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            <GitBranch className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
            View all on GitHub
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {contributions.map((item, i) => (
            <ContributionCard key={item.repo} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
