"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function AugeShowcase() {
  // Função para rolagem suave
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-32 bg-zinc-950 overflow-hidden font-syne">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Coluna de Texto (Esquerda) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.5em] mb-6 block" style={{opacity: 1, transform: 'none'}}>
                Site novo
              </span>
              <h2 className="font-syne font-extrabold text-5xl md:text-7xl text-white tracking-tighter leading-none mb-8">
                Auge <br />
                <span className="text-blue-600 italic">Contabilidade.</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-md">
                Um template Next.js de alta performance desenvolvido para o setor contábil. 
                Design dark-mode refinado, automação limpa e foco total na conversão de leads.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                {['Next.js', 'Tailwind', 'Framer Motion', 'SEO Opt'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botão com Clique Suave */}
              <a 
                href="https://wa.link/kdl2a4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-full font-bold hover:bg-blue-500 transition-all group"
              >
                Solicitar projeto similar
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Coluna do Mockup Animado (Direita) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Frame do Navegador */}
              <div className="bg-zinc-900 rounded-t-2xl p-4 flex items-center gap-2 border-x border-t border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="mx-auto bg-zinc-800 rounded-md px-4 py-1 text-[10px] text-zinc-500 font-mono truncate w-1/2 text-center">
                  auge-devstep.netlify.app
                </div>
              </div>

              {/* Container da Imagem */}
              <div className="relative overflow-hidden rounded-b-2xl border-x border-b border-zinc-800 aspect-[16/10] md:aspect-[4/3] bg-zinc-900">
                <motion.img 
                  src="/images/Site Novo.png" 
                  alt="Preview Auge"
                  className="w-full absolute top-0 left-0"
                  initial={{ y: 0 }}
                  whileInView={{ y: "-50%" }}
                  transition={{ 
                    duration: 12, 
                    ease: "linear", 
                    repeat: Infinity, 
                    repeatType: "mirror" 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              </div>

              {/* Card de Performance SEM box-shadow */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-10 -left-10 z-50 hidden md:block"
              >
                <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1 block">
                      Google Lighthouse
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <TrendingUp className="text-green-500 w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-4xl font-black text-white tracking-tighter leading-none">99/100</span>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">Performance Score</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "99%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-green-500"
                      />
                    </div>
                  </div>
                </div>

                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-4 -right-4 bg-white text-black text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-zinc-200"
                >
                  SEO Otimizado
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}