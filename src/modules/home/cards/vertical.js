"use client";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    title: "Briefing",
    text: "Onde a ideia nasce e o caos vira estratégia.",
    icon: <Search className="w-5 h-5" />,
    color: "#7C3AED"
  },
  {
    title: "Design",
    text: "Interfaces que saltam aos olhos e convertem.",
    icon: <PenTool className="w-5 h-5" />,
    color: "#A855F7"
  },
  {
    title: "Dev",
    text: "Código limpo transformado em performance bruta.",
    icon: <Code2 className="w-5 h-5" />,
    color: "#C084FC"
  },
  {
    title: "Go Live",
    text: "O salto para o sucesso. Monitorado e seguro.",
    icon: <Rocket className="w-5 h-5" />,
    color: "#7C3AED"
  }
];

export default function VerticalCards() {
  return (
    <div className="relative flex flex-wrap lg:flex-nowrap gap-4 justify-center mt-24">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="clickable relative group flex-1 min-w-[280px] h-[400px]"
        >
          {/* O Número Flutuante (Impacto) */}
          <div className="absolute -top-12 left-8 z-20">
            <span className="text-8xl font-black font-syne text-zinc-900/5 group-hover:text-[#7C3AED]/20 transition-all duration-500 italic">
              0{idx + 1}
            </span>
          </div>

          {/* O Card "Célula" */}
          <div className="h-full w-full bg-white rounded-[3rem] border border-zinc-100 p-8 flex flex-col justify-between transition-all duration-500 group-hover:border-[#7C3AED] group-hover:shadow-[0_20px_40px_rgba(124,58,237,0.1)] relative overflow-hidden">
            
            {/* Detalhe Decorativo de Canto (Linha Tech) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-110" />

            {/* Topo do Card */}
            <div className="relative z-10">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-[#7C3AED] transition-colors duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-black leading-tight mb-4 tracking-tighter">
                {step.title}
              </h3>
            </div>

            {/* Base do Card */}
            <div className="relative z-10">
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-medium">
                {step.text}
              </p>
              
              {/* Barra de Progresso Visual no Card */}
              <div className="w-full h-[2px] bg-zinc-100 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className="absolute inset-0 bg-[#7C3AED]"
                />
              </div>
            </div>

            {/* Efeito de "Luz" interna no Hover */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#7C3AED] blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}