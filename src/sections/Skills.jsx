import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Languages",
    icon: "{ }",
    color: "#60a5fa",
    items: [
      { name: "Go", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 72 },
      { name: "Rust", level: 65 },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "⬡",
    color: "#34d399",
    items: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 86 },
      { name: "AWS", level: 78 },
      { name: "Terraform", level: 74 },
      { name: "Harbor", level: 95 },
    ],
  },
  {
    category: "Frontend",
    icon: "◈",
    color: "#a78bfa",
    items: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vite", level: 85 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend & Observability",
    icon: "⟳",
    color: "#fb923c",
    items: [
      { name: "gRPC", level: 84 },
      { name: "PostgreSQL", level: 78 },
      { name: "Jaeger", level: 88 },
      { name: "OpenTelemetry", level: 82 },
      { name: "Node.js", level: 76 },
    ],
  },
];

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[13px] font-medium text-white/60 group-hover:text-white/85 transition-colors duration-200"
          data-cursor="true"
        >
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4, duration: 0.4 }}
          className="text-[11px] font-mono text-white/25"
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function SkillGroupCard({ group, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 hover:border-white/[0.09] hover:bg-white/[0.025] transition-all duration-300"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-br-2xl opacity-50 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${group.color}15 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-mono font-semibold"
          style={{
            background: `${group.color}12`,
            border: `1px solid ${group.color}30`,
            color: group.color,
          }}
        >
          {group.icon}
        </div>
        <h4 className="text-[13px] font-semibold tracking-wide text-white/65 uppercase font-mono">
          {group.category}
        </h4>
      </div>

      {/* Skills */}
      <div className="space-y-3.5">
        {group.items.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={group.color}
            delay={index * 0.08 + si * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[var(--bg-base)] border-t border-white/[0.04]">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-6">
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/35">Technical Arsenal</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
            Skills &{" "}
            <span className="text-white/25">Expertise.</span>
          </h2>
          <p className="mt-4 text-white/35 text-[15px] max-w-[45ch] mx-auto leading-relaxed">
            Years of production experience across the full cloud-native stack.
          </p>
        </motion.div>

        {/* 2×2 grid of skill groups */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.category} group={group} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
