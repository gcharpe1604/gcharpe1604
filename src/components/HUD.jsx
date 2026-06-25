import { useState } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import ContactConsole from "./ContactConsole";
import { Magnetic } from "./magicui/magnetic";
import { motion } from "framer-motion";

export default function HUD() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* Fixed HUD Navigation/Actions */}
      <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-40 flex flex-col gap-4">
        
        {/* Social Links */}
        <div className="flex flex-col gap-3">
          {[
            { icon: Github, href: "https://github.com/gcharpe1604" },
            { icon: Linkedin, href: "https://linkedin.com/in/govind-charpe" },
            { icon: Twitter, href: "https://twitter.com/gcharpe1604" },
          ].map((social, i) => (
            <Magnetic key={i} intensity={0.3}>
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.1] transition-all backdrop-blur-md"
                data-cursor="true"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            </Magnetic>
          ))}
        </div>

        {/* Contact Button */}
        <Magnetic intensity={0.4}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            onClick={() => setIsContactOpen(true)}
            className="group relative w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md"
            data-cursor="true"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/0 group-hover:border-blue-400/50 group-hover:animate-ping" style={{ animationDuration: '2s' }} />
          </motion.button>
        </Magnetic>

      </div>

      {/* Contact Console Modal */}
      <ContactConsole isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
