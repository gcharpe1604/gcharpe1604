import { Marquee } from "../components/magicui/marquee";
import { Magnetic } from "../components/magicui/magnetic";
import { motion } from "framer-motion";

const techStack = [
  { name: "Go", color: "#00ADD8" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Node.js", color: "#339933" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "Redis", color: "#DC382D" },
  { name: "Rust", color: "#CE422B" },
  { name: "gRPC", color: "#6DB8DB" },
  { name: "GraphQL", color: "#E10098" },
  { name: "Terraform", color: "#7B42BC" },
  { name: "Prometheus", color: "#E6522C" },
];

const Row = ({ items, reverse }) => (
  <Marquee pauseOnHover reverse={reverse} className="[--duration:35s] py-3.5">
    {items.map((tech) => (
      <div key={tech.name} className="mx-2">
        <Magnetic intensity={0.15}>
          <motion.div
            whileHover={{
              boxShadow: `0 0 24px ${tech.color}35`,
              borderColor: `${tech.color}55`,
              color: tech.color,
              y: -2,
            }}
            className="flex items-center gap-2.5 justify-center px-6 py-3 rounded-xl bg-white/[0.018] border border-white/[0.045] text-white/50 font-mono text-[13px] tracking-wide transition-colors cursor-default select-none"
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </motion.div>
        </Magnetic>
      </div>
    ))}
  </Marquee>
);

export default function TechStack() {
  const midpoint = Math.ceil(techStack.length / 2);
  const topRow = techStack.slice(0, midpoint);
  const bottomRow = techStack.slice(midpoint);

  return (
    <section className="relative w-full py-16 bg-[var(--bg-base)] overflow-hidden border-t border-white/[0.04]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[200px] bg-blue-500/[0.03] blur-[80px] rounded-[100%]" />
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-500/40" />
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/30">
              Tech Stack
            </p>
          </div>
          <p className="text-[12px] text-white/20 font-mono">{techStack.length} technologies</p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-1">
        <Row items={topRow} />
        <Row items={bottomRow} reverse />

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10" />
      </div>
    </section>
  );
}
