"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function AutoCarousel() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const cards = gsap.utils.toArray(".carousel-card");

    // Duplicar os cards para efeito infinito
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    const totalWidth = track.scrollWidth / 2;

    const animation = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      duration: 40, // velocidade (quanto menor, mais rápido)
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  const cards = [
    { id: 1, image: "/images/cases-hero/1.png", title: "Case 1" },
    { id: 2, image: "/images/cases-hero/2.png", title: "Case 2" },
    { id: 3, image: "/images/cases-hero/3.png", title: "Case 3" },
    { id: 4, image: "/images/cases-hero/4.png", title: "Case 4" },
    { id: 5, image: "/images/cases-hero/5.png", title: "Case 5" },
    { id: 6, image: "/images/cases-hero/6.png", title: "Case 6" },
    { id: 7, image: "/images/cases-hero/7.png", title: "Case 7" },
    { id: 8, image: "/images/cases-hero/8.png", title: "Case 8" },
    { id: 9, image: "/images/cases-hero/9.png", title: "Case 9" },
    { id: 10, image: "/images/cases-hero/10.png", title: "Case 10" },
    { id: 11, image: "/images/cases-hero/11.png", title: "Case 11" },
    { id: 12, image: "/images/cases-hero/12.png", title: "Case 12" },
    { id: 13, image: "/images/cases-hero/13.png", title: "Case 13" },
    { id: 14, image: "/images/cases-hero/14.png", title: "Case 14" },
    { id: 15, image: "/images/cases-hero/15.png", title: "Case 15" },
    { id: 16, image: "/images/cases-hero/16.png", title: "Case 16" },
    { id: 17, image: "/images/cases-hero/17.png", title: "Case 17" },
    { id: 18, image: "/images/cases-hero/18.png", title: "Case 18" },
    { id: 20, image: "/images/cases-hero/20.png", title: "Case 20" },
    { id: 22, image: "/images/cases-hero/22.png", title: "Case 22" },
    { id: 23, image: "/images/cases-hero/23.png", title: "Case 23" },
    { id: 25, image: "/images/cases-hero/25.png", title: "Case 25" },
    { id: 26, image: "/images/cases-hero/26.png", title: "Case 26" },
  ];

  return (
    <section className="relative w-full overflow-hidden flex items-center">
      <div ref={trackRef} className="flex gap-4 ">
        {cards.map((card) => (
          <div
            key={card.id}
            className="carousel-card relative flex-shrink-0 w-[420px] h-[530px] bg-zinc-800 rounded-2xl overflow-hidden "
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="opacity-100 hover:opacity-80 transition"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-3 font-semibold hidden ">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}