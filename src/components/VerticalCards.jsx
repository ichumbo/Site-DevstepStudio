"use client";
import { motion } from "framer-motion";

const items = [
  { title: "Estratégia", img: "/images/Nossas coleções/1.png", tag: "01" },
  { title: "Criação", img: "/images/Nossas coleções/2.png", tag: "02" },
  { title: "Domínio", img: "/images/Nossas coleções/3.png", tag: "03" },
];

export default function VerticalCards({ theme = "light" }) {
  const isDark = theme === "dark";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {items.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="group relative"
        >
          {/* Card com Border Radius Alto e Shadow Box */}
          <div className={`
            relative h-[450px] w-full 
            rounded-[2.5rem] 
            overflow-hidden 
            ${isDark ? 'bg-white/10 border border-white/20' : 'bg-zinc-50 border border-zinc-200'} 
            ${isDark ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]'}
            ${isDark ? 'group-hover:border-white/40' : 'group-hover:border-[#7448ff]/50'} 
            transition-all duration-500 
            hover:-translate-y-2
          `}>
            
            {/* Cortina de Revelação */}
            <motion.div 
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.3 + index * 0.1 }}
              className={`absolute inset-0 z-20 origin-top ${isDark ? 'bg-white' : 'bg-[#7448ff]'}`}
            />

            {/* Imagem com Zoom Sutil */}
            <img 
              src={item.img} 
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-in-out"
            />

            {/* Badge Flutuante */}
            <div className="absolute top-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
              <span className={`
                ${isDark ? 'bg-black/90 text-white border-white/20' : 'bg-white/90 text-black border-zinc-200'} 
                backdrop-blur-md font-bold text-xs py-2 px-4 rounded-full border
              `}>
                {item.tag} — EXPLORAR
              </span>
            </div>

            {/* Gradient Glow interno */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${isDark ? 'bg-gradient-to-t from-white/20 to-transparent' : 'bg-gradient-to-t from-[#7448ff]/20 to-transparent'}
            `} />
          </div>

          {/* Texto Inferior Dinâmico */}
          <div className="mt-6 flex items-center justify-between">
            <h4 className={`font-syne font-bold text-xl tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
              {item.title}
            </h4>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
              ${isDark ? 'border border-white/30 group-hover:bg-white group-hover:text-black' : 'border border-zinc-200 group-hover:bg-black group-hover:text-white'}
            `}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}