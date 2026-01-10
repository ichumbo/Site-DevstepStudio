"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const assets = [
  { title: "Banco de dados", count: "8.8 mi+", img: "https://images.unsplash.com/photo-1635241161466-541f065683ba?q=80&w=800&auto=format&fit=crop", h: "h-64" },
  { title: "Pack de artes", count: "140k+", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", h: "h-80" },
  { title: "UI & UX", count: "14.9 mi+", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop", h: "h-72" },
  { title: "Designer", count: "330k+", img: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=800&auto=format&fit=crop", h: "h-96" },
  { title: "Web sites", count: "930k+", img: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop", h: "h-60" },
  { title: "E-commerce", count: "400k+", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop", h: "h-80" },
  { title: "Marketing", count: "72k+", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop", h: "h-72" },
  { title: "Gráficos", count: "260k+", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", h: "h-64" },
  { title: "Objetos 3D", count: "370k+", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop", h: "h-72" },
  { title: "Landing Pages", count: "36k+", img: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=800&auto=format&fit=crop", h: "h-60" },
  { title: "Apresentações", count: "200k+", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop", h: "h-64" },
  { title: "Correção de bugs", count: "26.5 mi+", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop", h: "h-72" },
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
    <div className="asset-card clickable bg-white rounded-[1.5rem] p-5 border border-zinc-200 transition-all duration-300 hover:border-[#7C3AED] hover:shadow-lg group">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-black leading-tight tracking-tight">{item.title}</h3>
        <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-widest">{item.count}</p>
      </div>
      <div className={`relative w-full ${item.h} overflow-hidden rounded-xl bg-zinc-100 flex items-center justify-center`}>
        <img 
          src={item.img} 
          alt={item.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-in-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}