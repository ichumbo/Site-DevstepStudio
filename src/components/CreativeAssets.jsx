"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const assets = [
  { title: "Banco de dados", count: "8.8 mi+", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop", h: "h-64" },
  { title: "Pack de artes", count: "140k+", img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop", h: "h-80" },
  { title: "UI & UX", count: "14.9 mi+", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop", h: "h-72" },
  { title: "Designer", count: "330k+", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop", h: "h-96" },
  { title: "Web sites", count: "930k+", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop", h: "h-60" },
  { title: "E-commerce", count: "400k+", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", h: "h-80" },
  { title: "Marketing", count: "72k+", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", h: "h-72" },
 { 
  title: "Gestão Digital", 
  count: "260k+", 
  img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop", 
  h: "h-64" 
},
  { title: "Objetos 3D", count: "370k+", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop", h: "h-72" },
  { title: "Landing Pages", count: "36k+", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop", h: "h-60" },
  { title: "Apresentações", count: "200k+", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop", h: "h-64" },
  { title: "Correção de bugs", count: "26.5 mi+", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop", h: "h-72" },
];

export default function CreativeAssets() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".asset-card", 
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6, stagger: 0.08, ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden font-syne">
      <div className="container mx-auto px-6" ref={containerRef}>
        <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4" style={{opacity: 1, transform: 'none'}}>Serviços</span>
        <h2 className="font-syne font-extrabold text-6xl md:text-8xl text-black tracking-tighter leading-[0.85] mb-16">
          <span className="text-[#7448ff] italic">Criatividade</span> <br />sem limites.
        </h2>

        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          <div className="flex flex-col gap-6 w-full sm:w-[calc(50%-12px)] lg:w-1/4">
            <Card item={assets[0]} />
            <Card item={assets[4]} />
            <Card item={assets[8]} />
          </div>
          <div className="flex flex-col gap-6 w-full sm:w-[calc(50%-12px)] lg:w-1/4 lg:pt-16">
            <Card item={assets[1]} />
            <Card item={assets[5]} />
            <Card item={assets[9]} />
          </div>
          <div className="flex flex-col gap-6 w-full sm:w-[calc(50%-12px)] lg:w-1/4">
            <Card item={assets[2]} />
            <Card item={assets[6]} />
            <Card item={assets[10]} />
          </div>
          <div className="flex flex-col gap-6 w-full sm:w-[calc(50%-12px)] lg:w-1/4 lg:pt-24">
            <Card item={assets[3]} />
            <Card item={assets[7]} />
            <Card item={assets[11]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item }) {
  return (
    <a href="https://wa.link/kdl2a4" target="_blank" rel="noopener noreferrer">
      <div className="asset-card clickable bg-white rounded-[2rem] p-5 border border-zinc-100 transition-all duration-500 hover:border-[#7C3AED] hover:shadow-[0_20px_40px_rgba(124,58,237,0.1)] group cursor-pointer">
      
      {/* Cabeçalho do Card */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-black leading-tight tracking-tight group-hover:text-[#7C3AED] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-[10px] text-zinc-400 font-bold mt-1 uppercase tracking-[0.2em]">
            {item.count}
          </p>
        </div>
        {/* Ícone sutil que aparece no hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      {/* Container da Imagem */}
      <div className={`relative w-full ${item.h} overflow-hidden rounded-[1.2rem] bg-zinc-100`}>
        <img 
          src={item.img} 
          alt={item.title} 
          loading="lazy"
          className="w-full h-full object-cover grayscale scale-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1200ms] ease-out" 
        />

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Detalhe de Texto Extra (Slide Up) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-white/90 backdrop-blur-md py-2 px-4 rounded-full flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-black uppercase tracking-widest">
              Preciso de ajuda
            </span>
          </div>
        </div>
      </div>
      </div>
    </a>
  );
}