"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

const assets = [
  { title: "Banco de vídeos", count: "8,8 mi+", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800", h: "h-[320px]" },
  { title: "Modelos de vídeo", count: "140.000+", img: "https://images.unsplash.com/photo-1536243298747-ea8874136d64?q=80&w=800", h: "h-[420px]" },
  { title: "Banco de fotos", count: "14,9 mi+", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800", h: "h-[380px]" },
  { title: "Música & Áudio", count: "330.000+", img: "https://images.unsplash.com/photo-1514320298543-63e3f46df34c?q=80&w=800", h: "h-[480px]" },
  { title: "Efeitos Sonoros", count: "930.000+", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800", h: "h-[300px]" },
  { title: "Modelos gráficos", count: "400.000+", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800", h: "h-[440px]" },
  { title: "Objetos 3D", count: "370.000+", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800", h: "h-[380px]" },
  { title: "Fontes Premium", count: "72.000+", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800", h: "h-[350px]" },
];

export default function AssetGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".asset-card");
    gsap.fromTo(cards, 
      { opacity: 0, y: 120, rotateX: -10 },
      {
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.utils.toArray(".parallax-img").forEach((img) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true,
        },
      });
    });
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="max-w-3xl mb-24">
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4" style={{opacity: 1, transform: 'none'}}>Trabalhos Selecionados</span>
          <h2 className="text-5xl md:text-7xl font-extrabold font-syne text-zinc-900 leading-none">
            Todo tipo de recurso para <br />
            <span className="text-[#7448ff] italic">o seu sucesso.</span>
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-8 space-y-8">
          {assets.map((item, i) => (
            <div
              key={i}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="asset-card break-inside-avoid relative bg-white rounded-[2.8rem] p-5 border border-zinc-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(139,92,246,0.12)] transition-shadow duration-500 overflow-hidden cursor-none group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="px-4 mb-6" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-xl font-bold text-zinc-800 font-syne">{item.title}</h3>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1">{item.count}</p>
              </div>

              <div className={`relative w-full ${item.h} overflow-hidden rounded-[2.2rem] bg-zinc-50`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="parallax-img absolute inset-0 w-full h-[125%] object-cover"
                  style={{ top: "-12%" }} 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}