"use client";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Estratégia",
    text: "Mapeamos o seu mercado para criar uma fundação sólida.",
    icon: <Search size={20} />,
  },
  {
    number: "02",
    title: "Design UX",
    text: "Interfaces focadas em conversão e estética premium.",
    icon: <PenTool size={20} />,
    isFeatured: true // Este card terá a escala aumentada
  },
  {
    number: "03",
    title: "Dev Elite",
    text: "Código limpo, rápido e otimizado para performance.",
    icon: <Code2 size={20} />,
  },
  {
    number: "04",
    title: "Lançamento",
    text: "O salto final para o sucesso do seu negócio digital.",
    icon: <Rocket size={20} />,
  },
];

export default function VerticalCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center mt-20">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`relative z-10 ${step.isFeatured ? 'lg:scale-110 z-20' : ''}`}
        >
          {/* Card Quadrado Estilo Envato */}
          <div className="bg-white border border-zinc-200 p-8 h-[320px] flex flex-col justify-between transition-colors hover:border-[#7C3AED] group clickable">
            
            {/* Topo: Ícone e Número */}
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center group-hover:bg-[#7C3AED] transition-colors">
                {step.icon}
              </div>
              <span className="text-4xl font-black font-syne text-zinc-100 group-hover:text-[#7C3AED]/10 transition-colors">
                {step.number}
              </span>
            </div>

            {/* Conteúdo: Título e Texto */}
            <div>
              <h3 className="text-xl font-bold text-black mb-3 tracking-tight uppercase">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                {step.text}
              </p>
            </div>

            {/* Linha de Progresso Técnica na Base */}
            <div className="w-full h-[1px] bg-zinc-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#7C3AED] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}