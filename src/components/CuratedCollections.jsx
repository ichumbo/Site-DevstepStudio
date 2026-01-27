"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function CollectionItem({ span, aspect, tag, title, img }) {
  return (
    <motion.div 
      className={`${span} group cursor-pointer`}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
    >
      <div className={`relative overflow-hidden rounded-[2.5rem] bg-zinc-50 ${aspect}`}>
        <img 
          src={img} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={title}
        />
        {/* Tag Mind Market Style */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-bold text-black uppercase tracking-widest">
            {tag}
          </span>
          <span className="bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Case Study
          </span>
        </div>
      </div>
      <div className="mt-6 px-4">
        <h3 className="text-2xl font-bold text-black tracking-tight group-hover:text-zinc-500 transition-colors">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function CuratedCollections() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header com seu título e Botão de Portfólio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4" style={{opacity: 1, transform: 'none'}}>Trabalhos Selecionados</span>
            <h2 className="font-syne font-extrabold text-6xl md:text-8xl text-black tracking-tighter leading-[0.85]">
              Nossas <br /> 
              <span className="text-[#7448ff] italic">Coleções.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-start md:items-end gap-6"
          >
            <p className="text-zinc-500 font-medium max-w-xs md:text-right">
              Soluções visuais focadas em nichos específicos para máxima conversão.
            </p>
            <a 
              href="https://devstep-portifolio.netlify.app/" 
              target="_blank"
              className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-md hover:bg-accent transition-all duration-300"
            >
              <span className="font-bold text-sm uppercase tracking-widest">Explorar Portfólio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Grid Principal - Encaixe Perfeito */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* 1. CONTABILIDADE (Destaque Grande) */}
          <CollectionItem 
            span="md:col-span-8" 
            aspect="aspect-[16/10] md:h-[550px]"
            tag="Finance & Tax"
            title="Contabilidade"
            img="/public/images/Nossas coleções/1.png"
          />

          {/* 2. ACADEMIA (Vertical) */}
          <CollectionItem 
            span="md:col-span-4" 
            aspect="aspect-square md:h-[550px]"
            tag="Fitness & Power"
            title="Academia"
            img="/public/images/Nossas coleções/2.png"
          />

          {/* 3. SUSHI BAR (Médio) */}
          <CollectionItem 
            span="md:col-span-5" 
            aspect="aspect-video md:h-[400px]"
            tag="Japanese Food"
            title="Sushi Bar"
            img="/public/images/Nossas coleções/3.png"
          />

          {/* 4. AÇAÍ & HEALTHY (Médio/Longo) */}
          <CollectionItem 
            span="md:col-span-7" 
            aspect="aspect-video md:h-[400px]"
            tag="Tropical Food"
            title="Açaí Concept"
            img="/public/images/Nossas coleções/5.png"
          />
        </motion.div>
      </div>
    </section>
  );
}