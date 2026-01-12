"use client";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Zap, ShieldCheck, Rocket } from "lucide-react";

// Componente para o efeito de Ímã nos botões
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function ProcessSection() {
  const carouselRef = useRef(null);

  const steps = [
    { title: "Imersão", desc: "Análise profunda do seu negócio.", icon: <Sparkles className="text-[#7448ff]" />, color: "from-[#7448ff]/10" },
    { title: "Estratégia", desc: "Foco total em conversão e UX.", icon: <Zap className="text-[#7448ff]" />, color: "from-blue-500/5" },
    { title: "Design & Dev", desc: "Criação de interfaces de alta performance.", icon: <ShieldCheck className="text-[#7448ff]" />, color: "from-purple-500/5" },
    { title: "Domínio", desc: "Sua marca pronta para liderar o digital.", icon: <Rocket className="text-[#7448ff]" />, color: "from-indigo-500/5" }
  ];

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const moveDistance = clientWidth * 0.4;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - moveDistance : scrollLeft + moveDistance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* Background Sutil (Grade em cinza claro para fundo branco) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7448ff]/5 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: `radial-gradient(circle, #000 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4" style={{opacity: 1, transform: 'none'}}>Trabalhos Selecionados</span>
            <h2 className="font-syne font-extrabold text-6xl md:text-8xl text-black tracking-tighter leading-[0.85]">
              Como tiramos sua <br />
              <span className="text-[#7448ff] italic">ideia do papel.</span>
            </h2>
          </div>

          {/* Setas com Efeito Magnético (Cores ajustadas para fundo branco) */}
          <div className="flex gap-4">
            <MagneticButton 
              onClick={() => scroll('left')} 
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-50 transition-colors"
            >
              <ArrowLeft size={20} />
            </MagneticButton>
            
            <MagneticButton 
              onClick={() => scroll('right')} 
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#7448ff] transition-colors shadow-lg shadow-purple-200"
            >
              <ArrowRight size={20} />
            </MagneticButton>
          </div>
        </div>

        {/* CARROSSEL - Itens Menores */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
        >
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="w-[280px] md:w-[350px] flex-shrink-0 snap-center group"
            >
              <div className="relative bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem] h-[350px] flex flex-col justify-between transition-all duration-500 group-hover:border-[#7448ff]/30 group-hover:shadow-xl group-hover:shadow-purple-100/50 overflow-hidden">
                
                {/* Gradiente Interno Suave */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3 font-syne tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="relative z-10 flex justify-between items-end">
                  <span className="text-5xl font-black text-zinc-100 font-syne group-hover:text-[#7448ff]/10 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="h-1 w-10 bg-zinc-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#7448ff]" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}