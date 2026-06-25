import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const timelineData = [
  {
    role: "Open Source Contributor",
    company: "CNCF Ecosystem",
    companyUrl: "https://cncf.io",
    period: "2023 — Present",
    current: true,
    description:
      "Contributing heavily to core open-source projects including Harbor CLI and Jaeger UI. Focused on improving scalability, CLI tools, and distributed tracing performance. 65+ PRs merged across CNCF projects.",
    highlights: ["Harbor CLI Core Contributor", "Jaeger UI Race Condition Fix", "OpenTelemetry Go Hooks"],
    color: "#10b981",
  },
  {
    role: "Software Engineer",
    company: "Tech Corp",
    companyUrl: "#",
    period: "2021 — 2023",
    current: false,
    description:
      "Designed and built cloud-native backend services using Go and Kubernetes. Streamlined CI/CD pipelines reducing deployment times by 40%. Led migration from monolith to microservices serving 500k daily users.",
    highlights: ["40% faster deployments", "Microservices migration", "Kubernetes at scale"],
    color: "#3b82f6",
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    companyUrl: "#",
    period: "2019 — 2021",
    current: false,
    description:
      "Crafted high-performance, accessible web applications using React and TypeScript. Architected a component library used across 12+ client projects serving millions of users.",
    highlights: ["12+ client projects", "Component library", "Accessibility standards"],
    color: "#8b5cf6",
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 md:pl-16"
    >
      {/* Node */}
      <div
        className="absolute left-[-6px] top-3 w-3 h-3 rounded-full border-2 border-[var(--bg-base)]"
        style={{
          backgroundColor: item.color,
          boxShadow: `0 0 14px ${item.color}60`,
        }}
      />
      {item.current && (
        <div
          className="absolute left-[-6px] top-3 w-3 h-3 rounded-full animate-ping"
          style={{ backgroundColor: item.color, opacity: 0.3 }}
        />
      )}

      <div className="group">
        {/* Period */}
        <span
          className="inline-block text-[11px] font-mono tracking-[0.14em] uppercase mb-3 px-2 py-0.5 rounded"
          style={{
            color: item.color,
            background: `${item.color}12`,
          }}
        >
          {item.period}
          {item.current && (
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              Current
            </span>
          )}
        </span>

        {/* Role & Company */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 mb-3">
          <h4 className="text-[18px] md:text-[20px] font-semibold text-white/88">{item.role}</h4>
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[14px] text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            {item.company}
            {item.companyUrl !== "#" && <ArrowUpRight className="w-3 h-3" />}
          </a>
        </div>

        {/* Description */}
        <p className="text-[14.5px] text-white/40 leading-relaxed mb-4 max-w-[55ch]">
          {item.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md"
              style={{
                color: `${item.color}cc`,
                background: `${item.color}10`,
                border: `1px solid ${item.color}20`,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[var(--bg-base)] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="section-label text-emerald-400/70 mb-5">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase">Experience</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
            The{" "}
            <span className="text-white/25">Journey.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl relative">
          {/* Vertical gradient line */}
          <div className="absolute left-0 top-3 bottom-3 w-px" style={{
            background: "linear-gradient(180deg, rgba(16,185,129,0.4) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.2) 100%)"
          }} />

          <div className="space-y-14">
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
