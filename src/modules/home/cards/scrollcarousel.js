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
      duration: 20, // velocidade (quanto menor, mais rápido)
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
    { id: 1, image: "/images/solbikes-case.jpg", title: "SolBikes" },
    { id: 2, image: "/images/setgoapp-case.jpg", title: "SetGO" }, 
    { id: 4, image: "/images/academy-case.jpg", title: "GymClub" },
    { id: 5, image: "/images/montalto-case.jpg", title: "MontAlto" }, 
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