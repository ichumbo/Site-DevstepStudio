"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Phone, ArrowUp, Send } from "lucide-react";

export const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative bg-[#09090b] pt-24 pb-10 overflow-hidden">
      {/* Detalhe de iluminação no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#7448ff]/50 to-transparent" />
      
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 flex flex-col gap-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
          
          {/* Lado Esquerdo: Branding e Manifesto */}
          <motion.div variants={itemVariant} className="md:col-span-5 flex flex-col gap-6">
            <img src="/images/logo.svg" className="w-32 brightness-0 invert opacity-90" alt="Logo" />
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Transformamos visões em experiências digitais de alto impacto. 
              Sua próxima grande ideia começa com um passo.
            </p>
            <div className="flex gap-4 mt-2">
              <SocialButton href="https://instagram.com/devstepstudio" icon={<Instagram size={20} />} />
              <SocialButton href="https://wa.link/kdl2a4" icon={<Phone size={20} />} />
            </div>
          </motion.div>

          {/* Centro: Links Úteis */}
          <motion.div variants={itemVariant} className="md:col-span-3 flex flex-col gap-6">
            <h3 className="text-white font-syne font-bold text-sm uppercase tracking-[0.3em]">Navegação</h3>
            <ul className="flex flex-col gap-4">
              <FooterLink href="#cases" label="Projetos" />
              <FooterLink href="#faq" label="Dúvidas" />
              <FooterLink href="https://wa.link/kdl2a4" label="Contato" />
            </ul>
          </motion.div>

          {/* Lado Direito: Newsletter/CTA Rápido */}
          <motion.div variants={itemVariant} className="md:col-span-4 flex flex-col gap-6">
            <h3 className="text-white font-syne font-bold text-sm uppercase tracking-[0.3em]">Dê o próximo passo</h3>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Como podemos ajudar?"
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl py-4 px-6 text-zinc-300 outline-none focus:border-[#7448ff] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#7448ff] text-white px-4 rounded-xl hover:bg-[#6339e6] transition-colors">
                <Send size={18} />
              </button>
            </div>
            <span className="text-zinc-500 text-xs tracking-tight italic">Respondemos em menos de 24h.</span>
          </motion.div>
        </div>

        {/* Rodapé Inferior Gigante (Visual Moderno) */}
        <motion.div
          variants={itemVariant}
          className="pt-10 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-end gap-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-6xl md:text-[8rem] font-syne font-black text-zinc-800/20 leading-none select-none tracking-tighter">
              DEVSTEP
            </h2>
            <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
              © 2026 DevStep Studio. Todos os direitos reservados.
            </p>
          </div>

          {/* Botão Voltar ao Topo Estilizado */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, backgroundColor: "#7448ff" }}
            whileTap={{ scale: 0.9 }}
            className="group p-6 rounded-full bg-zinc-800 border border-zinc-700 text-white transition-all mb-4"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

// Sub-componentes para manter o código limpo
function FooterLink({ href, label }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-zinc-400 hover:text-[#7448ff] font-medium transition-all flex items-center gap-2 group"
      >
        <span className="w-0 group-hover:w-4 h-[1px] bg-[#7448ff] transition-all" />
        {label}
      </Link>
    </li>
  );
}

function SocialButton({ href, icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ y: -5, backgroundColor: "#7448ff" }}
      className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white transition-all"
    >
      {icon}
    </motion.a>
  );
}