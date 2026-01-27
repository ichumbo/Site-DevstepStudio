"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/button";
import { ChevronDown } from "lucide-react";

export default function HeroAppleStyle() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Efeito de escala do vídeo conforme o scroll
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[150vh] bg-black"
    >
      {/* Sticky Container para manter o conteúdo fixo enquanto scrollamos */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. BACKGROUND VIDEO (O Coração da Section) */}
        <motion.div 
          style={{ scale: videoScale, filter: videoBlur }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60"
          >
            {/* Um vídeo de partículas ou líquido roxo fluindo combina muito com o estilo Apple */}
            <source src="https://cdn.pixabay.com/video/2020/09/20/50534-462102148_tiny.mp4" type="video/mp4" />
          </video>
          {/* Vinheta para suavizar as bordas */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>

        {/* 2. CONTEÚDO TEXTUAL (Estilo Apple Manifesto) */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[#7448ff] text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-6"
          >
            Design. Performance. Step by Step.
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-syne font-black text-white tracking-tighter leading-[0.9] max-w-4xl"
          >
            Simplicidade <br />é o novo <span className="text-zinc-400">luxo.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-zinc-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed"
          >
            Criamos experiências digitais que não apenas funcionam, mas encantam. 
            Onde cada pixel conta uma história de inovação.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 items-center"
          >
            <Button
              href="https://wa.link/kdl2a4"
              className="bg-white text-black hover:bg-[#7448ff] hover:text-white rounded-full px-10 py-7 text-lg font-bold transition-all duration-500 shadow-xl shadow-white/5"
            >
              Começar jornada
            </Button>
            
            <a href="#cases" className="text-white font-bold text-sm hover:text-[#7448ff] transition-colors flex items-center gap-2 group">
              Ver Projetos
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* 3. EFEITO DE MÁSCARA (Aparece no Scroll) */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1]),
            y: useTransform(scrollYProgress, [0.3, 0.6], [100, 0])
          }}
          className="absolute bottom-20 z-20"
        >
          <h2 className="text-zinc-500 text-2xl font-syne font-bold tracking-widest uppercase opacity-20">
            DevStep Studio
          </h2>
        </motion.div>

      </div>

      {/* Seção vazia para permitir o scroll e o efeito de sticky */}
      <div className="h-screen" />
    </section>
  );
}