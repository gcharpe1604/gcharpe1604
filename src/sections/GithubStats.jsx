import { motion } from "framer-motion";
import { Activity, GitCommit, GitPullRequest, Search } from "lucide-react";
import NumberTicker from "../components/magicui/number-ticker";
import Globe from "../components/Globe";

// Helper to generate a realistic-looking mock heatmap
const generateHeatmap = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const grid = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Create a pattern where recent weeks (right side) and middle weeks are denser
      const isActivePeriod = w > 30 || (w > 10 && w < 25);
      const randomValue = Math.random();
      
      let intensity = 0; // 0 = empty, 1-4 = intensity levels
      if (isActivePeriod) {
        if (randomValue > 0.8) intensity = 4;
        else if (randomValue > 0.5) intensity = 3;
        else if (randomValue > 0.3) intensity = 2;
        else if (randomValue > 0.1) intensity = 1;
      } else {
        if (randomValue > 0.95) intensity = 3;
        else if (randomValue > 0.85) intensity = 2;
        else if (randomValue > 0.7) intensity = 1;
      }
      week.push(intensity);
    }
    grid.push(week);
  }
  return grid;
};

const heatmapData = generateHeatmap();

const stats = [
  { label: "Total Commits (2024)", value: 1248, icon: GitCommit },
  { label: "Pull Requests", value: 142, icon: GitPullRequest },
  { label: "Code Reviews", value: 315, icon: Search },
];

export default function GithubStats() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--bg-base)]">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-blue-500/50"></span>
              <h2 className="text-[12px] font-mono tracking-[0.2em] uppercase text-blue-400/80">
                Metrics
              </h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Activity <span className="text-white/40">Graph.</span>
            </h3>
          </div>

          <a
            href="https://github.com/gcharpe1604"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[13px] font-mono text-white/40 hover:text-white transition-colors duration-200"
          >
            <Activity className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
            Live GitHub Profile
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-10"
        >
          {/* Two-column layout: Stats + Globe & Heatmap */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16">
            
            {/* Left Column: Quick Stats */}
            <div className="flex flex-col gap-6 justify-center">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-3xl font-semibold text-white/90 leading-tight">
                        <NumberTicker value={stat.value} />
                      </p>
                      <p className="text-[12px] font-mono uppercase tracking-wider text-white/40 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Globe */}
            <div className="relative flex items-center justify-center min-h-[400px]">
               <Globe />
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="min-w-[800px] flex gap-1">
              {heatmapData.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-1">
                  {week.map((intensity, dIndex) => {
                    // Color mapping based on intensity
                    let bgColor = "bg-white/[0.03]";
                    if (intensity === 1) bgColor = "bg-emerald-900/40";
                    if (intensity === 2) bgColor = "bg-emerald-600/60";
                    if (intensity === 3) bgColor = "bg-emerald-500/80";
                    if (intensity === 4) bgColor = "bg-emerald-400";

                    return (
                      <motion.div
                        key={`${wIndex}-${dIndex}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (wIndex * 0.01) + (dIndex * 0.02),
                          ease: "easeOut"
                        }}
                        className={`w-3 h-3 rounded-[2px] ${bgColor} transition-colors duration-300 hover:ring-1 hover:ring-white/50`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 min-w-[800px] text-[10px] font-mono text-white/30 uppercase tracking-widest">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                <span className="w-3 h-3 rounded-[2px] bg-white/[0.03]" />
                <span className="w-3 h-3 rounded-[2px] bg-emerald-900/40" />
                <span className="w-3 h-3 rounded-[2px] bg-emerald-600/60" />
                <span className="w-3 h-3 rounded-[2px] bg-emerald-500/80" />
                <span className="w-3 h-3 rounded-[2px] bg-emerald-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
