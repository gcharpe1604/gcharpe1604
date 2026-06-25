import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Send } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import { useSound } from "../hooks/useSound";

export default function ContactConsole({ isOpen, onClose }) {
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState("idle"); // idle, encrypting, sent
  const [encrypted, setEncrypted] = useState("");
  const playSound = useSound();

  useEffect(() => {
    if (step === "encrypting") {
      playSound('click');
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
      let interval = setInterval(() => {
        setEncrypted(
          msg.split("").map(c => (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)])).join("")
        );
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setStep("sent");
        playSound('success');
      }, 2000);
    }
  }, [step, msg, playSound]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("idle");
        setMsg("");
        setEncrypted("");
      }, 500);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      setStep("encrypting");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#080b10] border border-white/[0.1] rounded-2xl overflow-hidden font-mono shadow-2xl shadow-blue-500/10"
          >
            <BorderBeam size={300} duration={12} delay={0} />
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] bg-[#0c1017]">
              <div className="flex items-center gap-3">
                <TerminalIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-[12px] font-semibold text-white/60 tracking-widest uppercase">Secure Transmission</span>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors" data-cursor="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {step === "idle" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-[12px] text-white/40 mb-6 leading-relaxed">
                    Enter your message below. It will be encrypted and transmitted directly to my mainframe.
                  </p>
                  
                  <div className="relative group">
                    <textarea
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-[13px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none h-32 custom-scrollbar"
                      data-cursor="true"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      disabled={!msg.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[12px] font-semibold tracking-widest uppercase hover:bg-blue-500/20 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-cursor="true"
                    >
                      <span>Encrypt & Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {step === "encrypting" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <p className="text-[12px] text-emerald-400/80 animate-pulse tracking-widest uppercase">Encrypting Payload...</p>
                  <p className="text-[10px] text-white/30 text-center break-all max-w-full overflow-hidden opacity-50">
                    {encrypted}
                  </p>
                </div>
              )}

              {step === "sent" && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[14px] text-white/90 font-semibold tracking-wide">Transmission Successful</p>
                  <p className="text-[12px] text-white/40 text-center">Your message has been securely delivered.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
