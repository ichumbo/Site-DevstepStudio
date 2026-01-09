"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioAnimations } from "./animations";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const cases = [
    {
        id: 1,
        title: "MontAlto",
        description: "Website para veículos para motoristas de aplicativo uber, 99 e etc.",
        image: "/images/montalto-case.jpg",
    },
    {
        id: 2,
        title: "Marinho",
        description: "Landing page otimizada com design responsivo e efeitos parallax.",
        image: "/images/(6).png",
    },
    {
        id: 3,
        title: "Academia Rocian Gracie",
        description: "Loja virtual com UI moderna e microinterações animadas.",
        image: "/images/(5).png",
    },
    {
        id: 4,
        title: "App Flow",
        description: "Aplicativo mobile com animações suaves e UX intuitiva.",
        image: "/images/montalto-case.jpg",
    },
];

export default function CasesCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const indicatorsRef = useRef([]);
    const particlesRef = useRef(null);

    // GSAP Animations Avançadas
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação inicial dos cards com efeito magnético
            portfolioAnimations.initCards(cardsRef.current, sectionRef.current);
            
            // Setup hover effects avançados para cada card
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    portfolioAnimations.setupHoverEffects(card, index);
                }
            });
            
            // Efeito magnético nos cards
            portfolioAnimations.magneticEffect(cardsRef.current);
            
            // Criar sistema de partículas avançado
            if (particlesRef.current) {
                portfolioAnimations.createFloatingParticles(particlesRef.current);
            }
            
            // Animação de reveal com efeito de desintegração
            portfolioAnimations.revealAnimation(sectionRef.current);
            
            // Animação do hero banner
            portfolioAnimations.animateHeroBanner('.hero-banner');
            portfolioAnimations.animateHeroBannerContainer('.hero-banner-container');
            
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Autoplay loop
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % cases.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Scroll to active slide with GSAP
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const child = carousel.firstChild;
        const childWidth = child && child instanceof HTMLElement
            ? child.offsetWidth + 48
            : 0;
        
        portfolioAnimations.slideTransition(carousel, activeIndex * childWidth);
        
        // Animar indicadores
        indicatorsRef.current.forEach((indicator, index) => {
            if (indicator) {
                portfolioAnimations.animateIndicator(indicator, index === activeIndex);
            }
        });
    }, [activeIndex]);

    return (
        <section ref={sectionRef} className="relative text-white overflow-hidden min-h-screen flex items-center">
            {/* SVG Wave */}
            <div className="absolute -top-1 left-0 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#f8fafc" fillOpacity="1" d="M0,96L15,106.7C30,117,60,139,90,149.3C120,160,150,160,180,149.3C210,139,240,117,270,138.7C300,160,330,224,360,208C390,192,420,96,450,90.7C480,85,510,171,540,170.7C570,171,600,85,630,64C660,43,690,85,720,128C750,171,780,213,810,240C840,267,870,277,900,245.3C930,213,960,139,990,133.3C1020,128,1050,192,1080,202.7C1110,213,1140,171,1170,160C1200,149,1230,171,1260,197.3C1290,224,1320,256,1350,256C1380,256,1410,224,1425,208L1440,192L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path>
                </svg>
            </div>
            
            {/* Container de partículas */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
            
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Conteúdo à esquerda */}
                <div className="w-1/2 pr-12">
                    {/* Carrossel */}
                    <div
                        ref={carouselRef}
                        className="flex gap-12 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar"
                    >
                        {cases.map((item, index) => (
                            <div
                                key={item.id}
                                ref={el => cardsRef.current[index] = el}
                                className="portfolio-card portfolio-float snap-center relative min-w-full rounded-xl overflow-hidden flex-shrink-0 cursor-pointer transform-gpu perspective-1000"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    backfaceVisibility: 'hidden'
                                }}
                            >
                                <div className="portfolio-shimmer relative h-[35rem] w-full overflow-hidden rounded-xl group bg-gradient-to-br from-violet-900/20 to-purple-900/20 backdrop-blur-sm border border-violet-500/20">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="portfolio-image object-cover w-full h-full rounded-xl transition-all duration-700 filter brightness-90 contrast-110"
                                    />
                                    
                                    {/* Overlay melhorado com gradiente dinâmico */}
                                    <div className="overlay absolute inset-0 bg-gradient-to-t from-black/95 via-violet-900/30 to-transparent opacity-0 transition-all duration-500 flex items-end p-8">
                                        <div className="text-white relative z-10">
                                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-violet-500/20 rounded-full blur-xl"></div>
                                            <h3 className="text-3xl font-bold mb-3 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-200 text-base leading-relaxed transform translate-y-4 transition-transform duration-500 delay-100 group-hover:translate-y-0 max-w-sm">
                                                {item.description}
                                            </p>
                                            
                                            {/* Botão com efeito neon */}
                                            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg transform translate-y-4 opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100 hover:from-violet-400 hover:to-purple-500 hover:shadow-lg hover:shadow-violet-500/25 font-medium">
                                                Ver Projeto →
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Efeito de brilho aprimorado */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out opacity-0 group-hover:opacity-100" />
                                    
                                    {/* Borda animada com gradiente */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-400/60 rounded-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-violet-500/20" />
                                    
                                    {/* Efeito de partículas no hover */}
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-violet-400 rounded-full animate-ping"></div>
                                        <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                                        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-violet-300 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indicadores aprimorados com efeitos */}
                    <div className="flex justify-center mt-8 gap-4">
                        {cases.map((_, i) => (
                            <button
                                key={i}
                                ref={el => indicatorsRef.current[i] = el}
                                onClick={() => setActiveIndex(i)}
                                className={`relative w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 group ${
                                    i === activeIndex 
                                        ? "bg-gradient-to-r from-violet-500 to-purple-600 scale-110 shadow-lg shadow-violet-500/50" 
                                        : "bg-gray-600 hover:bg-gray-500"
                                }`}
                            >
                                {/* Efeito de anel pulsante para o ativo */}
                                {i === activeIndex && (
                                    <div className="absolute inset-0 rounded-full border-2 border-violet-400 animate-ping opacity-75"></div>
                                )}
                                
                                {/* Efeito de brilho no hover */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </button>
                        ))}
                    </div>

                    {/* Setas de navegação aprimoradas */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length)}
                        className="absolute left-6 top-[18rem] -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 bg-opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 hover:from-violet-500 hover:to-purple-500 hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/25 backdrop-blur-sm border border-violet-400/30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % cases.length)}
                        className="absolute right-6 top-[18rem] -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 bg-opacity-90 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 hover:from-violet-500 hover:to-purple-500 hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/25 backdrop-blur-sm border border-violet-400/30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Hero Banner à direita */}
                <div className="w-1/2 flex justify-center items-center">
                    <div className="hero-banner-container relative">
                        <img
                            src="/images/hero-banner.png"
                            alt="Hero Banner"
                            className="hero-banner w-full max-w-lg h-auto object-contain"
                        />
                        
                        {/* Efeitos decorativos */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-violet-500/30 rounded-full blur-sm animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500/40 rounded-full blur-sm animate-bounce"></div>
                        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-violet-400/50 rounded-full blur-sm animate-ping"></div>
                    </div>
                </div>
            </div>
            
            <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        </section>
    );
}