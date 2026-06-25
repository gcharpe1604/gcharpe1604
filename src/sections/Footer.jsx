import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart } from "lucide-react";
import { Magnetic } from "../components/magicui/magnetic";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Activity", href: "#activity" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/gcharpe1604", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/govind-charpe", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/gcharpe", label: "Twitter" },
  { icon: Mail, href: "mailto:govind@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg-base)] border-t border-white/[0.04] overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)" }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-8 md:px-14 lg:px-20">

        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Left: Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                Govind Charpe
              </h3>
              <p className="text-[13px] font-mono text-white/30 mb-6">
                Cloud-Native Engineer · OSS Contributor · CNCF Ecosystem
              </p>
              <p className="text-[14px] text-white/35 leading-relaxed max-w-[40ch]">
                Building reliable, observable, and performant software for the open-source community.
              </p>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mt-8"
            >
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <Magnetic key={s.label} intensity={0.3}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      data-cursor="true"
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.06] text-white/30 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.18em] mb-1">Navigation</p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-1.5 text-[14px] text-white/40 hover:text-white/80 transition-colors duration-200 font-medium"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/20 font-mono">
            © {new Date().getFullYear()} Govind Charpe. All rights reserved.
          </p>
          <p className="text-[12px] text-white/20 font-mono flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-red-400/60" /> React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
