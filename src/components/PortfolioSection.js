"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function PortfolioSection() {
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: "Automotive",
      category: "Site",
      img: "/images/Sites/Visual do Projeto Completo (1).png",
      color: "#7448ff",
      link: "https://automaterun-devstep.netlify.app/"
    },
    {
      title: "GymClub",
      category: "LandingPage",
      img: "/images/Sites/Visual do Projeto Completo.png",
      color: "#000000",
      link: "https://wa.link/kdl2a4"
    },
    {
      title: "Dentelo",
      category: "LandingPage",
      img: "/images/Sites/Visual do Projeto Completo (2).png",
      color: "#7448ff",
      link: "https://devstep-dentelo.netlify.app/"
    },
    {
      title: "Sofisticatto",
      category: "E-commerce",
      img: "/images/Sites/Visual do Projeto Completo (3).png",
      color: "#000000",
      link: "https://devstep-sofisticatto.netlify.app/"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      {/* Background Decorativo - Círculos em movimento sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[10%] w-96 h-96 bg-[#7448ff]/5 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header da Seção */}
        <div className="flex flex-col mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4"
          >
            Portfólio
          </motion.span>
          <h2 className="font-syne font-extrabold text-5xl md:text-7xl text-black tracking-tighter leading-none">
            Projetos que <br />
            <span className="text-[#7448ff] italic">moldam o futuro.</span>
          </h2>
        </div>

        {/* Grid de Projetos com Efeito de Parallax Individual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA Final */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 text-center"
        >
          <a href="https://devstep-portifolio.netlify.app/" target="_blank" className="flex items-center justify-center cursor-pointer outline-none font-syne font-bold duration-200 ease-in-out text-md w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6 mx-auto">
            Explorar Portfólio
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  
  // Efeito de scroll individual para cada card (Parallax)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : -100]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ y }}
      className="group relative"
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
      {/* Container da Imagem */}
      <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[2rem] bg-zinc-100 border border-zinc-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-purple-200">
        
        {/* Overlay de Cor no Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-xl"
          >
            <ExternalLink size={28} />
          </motion.div>
        </div>

        {/* Imagem com Zoom e Escala */}
        <motion.img 
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
      </div>

      {/* Info do Projeto */}
      <div className="mt-8 flex justify-between items-start">
        <div>
          <p className="text-[#7448ff] font-bold text-xs uppercase tracking-widest mb-2">{project.category}</p>
          <h3 className="font-syne font-bold text-3xl text-black group-hover:text-[#7448ff] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <div className="text-zinc-300 font-syne font-black text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
          0{index + 1}
        </div>
      </div>
      </a>
    </motion.div>
  );
}