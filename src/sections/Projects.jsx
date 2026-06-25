import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink, Terminal, Layers, Cpu, Globe } from "lucide-react";
import { MagicCard } from "../components/magicui/magic-card";
import { cn } from "../lib/utils";
import { Magnetic } from "../components/magicui/magnetic";

const projects = [
  {
    title: "Kube-Lens",
    subtitle: "Cluster Visualizer",
    description:
      "A fast, memory-safe Kubernetes resource visualizer built in Rust. Provides real-time cluster telemetry and dependency mapping without deploying an agent.",
    tags: ["Rust", "Kubernetes", "TUI"],
    link: "https://github.com",
    colSpan: "lg:col-span-2",
    delay: 0.08,
    Icon: Cpu,
    color: "#f97316",
    bgAccent: "rgba(249,115,22,0.05)",
  },
  {
    title: "PromEx",
    subtitle: "Metrics Exporter",
    description:
      "High-throughput Prometheus exporter for custom hardware metrics. Deployed at scale processing 2M+ metrics/sec with sub-millisecond latency.",
    tags: ["Go", "Prometheus"],
    link: "https://github.com",
    colSpan: "lg:col-span-1",
    delay: 0.16,
    Icon: Layers,
    color: "#e11d48",
    bgAccent: "rgba(225,29,72,0.05)",
  },
  {
    title: "Otel-Distro",
    subtitle: "Observability SDK",
    description:
      "Opinionated OpenTelemetry distribution for zero-config tracing in distributed microservices with automatic context propagation.",
    tags: ["OpenTelemetry", "Go", "gRPC"],
    link: "https://github.com",
    colSpan: "lg:col-span-1",
    delay: 0.24,
    Icon: Globe,
    color: "#06b6d4",
    bgAccent: "rgba(6,182,212,0.05)",
  },
  {
    title: "TraceView UI",
    subtitle: "Visualization Engine",
    description:
      "GPU-accelerated UI component library designed for rendering massive distributed trace graphs with 60fps performance at 100k+ spans.",
    tags: ["React", "WebGL", "TypeScript"],
    link: "https://github.com",
    colSpan: "lg:col-span-2",
    delay: 0.32,
    Icon: Terminal,
    color: "#8b5cf6",
    bgAccent: "rgba(139,92,246,0.05)",
  },
];

function ProjectCard({ project }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { Icon } = project;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: project.delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("h-full w-full", project.colSpan)}
    >
      <MagicCard
        className="p-7 flex flex-col justify-between group h-full relative overflow-hidden"
        gradientColor={project.color}
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: project.bgAccent }}
        />

        {/* Top row */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
              style={{
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
              }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: project.color + "cc" }} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/30">{project.subtitle}</p>
            </div>
          </div>
          <Magnetic intensity={0.2}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/[0.07] text-white/25 hover:text-white transition-all group/link border border-transparent hover:border-white/[0.08]"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Magnetic>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h4
            className="text-[19px] font-semibold mb-2.5 transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {project.title}
          </h4>
          <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-md">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <Magnetic key={tag} intensity={0.1}>
                <span
                  className="inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg cursor-default transition-all duration-200"
                  style={{
                    color: `${project.color}cc`,
                    borderColor: `${project.color}25`,
                    background: `${project.color}08`,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  {tag}
                </span>
              </Magnetic>
            ))}
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[var(--bg-base)] border-t border-white/[0.04]">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="section-label text-purple-400/70 mb-5">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Engineering{" "}
              <span className="text-white/25">Projects.</span>
            </h2>
          </div>
          <a
            href="https://github.com/gcharpe1604"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] font-mono text-white/35 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            All Projects
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
