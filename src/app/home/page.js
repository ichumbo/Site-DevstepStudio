"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/button";
import { Layers, AppWindowMac, ToolCase, BanknoteArrowUp, Sparkles, Target, Briefcase, Star, TrendingUp, ArrowRight } from 'lucide-react';
import Magnetic from "@/components/Magnetic";
import VerticalCards from "@/modules/home/cards/vertical";
import HeroWithArrow from "@/modules/home/sections/herowitharrow";
import ScrollCarousel from "@/modules/home/cards/scrollcarousel";
import TabsSection from "@/modules/home/cards/tabs";
import FancyCards from "@/modules/home/cards/cards";
import PurpleScrollSection from "@/modules/home/purple";
import ProjectsGallery from "@/modules/home/gallery";
import CreativeAssets from "@/components/CreativeAssets";
import AugeShowcase from "@/components/AugeShowcase";
import PortfolioSection from "@/components/PortfolioSection";


gsap.registerPlugin(ScrollTrigger);

function ArtLayer({ pos, size, img, delay, rotate, opacity, p }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: opacity || 0.4, y: 0, rotate: rotate }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay, ease: "easeOut" }}
      className={`absolute ${pos} ${size} rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:opacity-100 hover:scale-105 border border-white/5 z-20`}
    >
      <img src={`/images/Pack de artes nova/${img}.png`} alt={`Arte ${img}`} className="w-full h-auto" />
    </motion.div>
  );
}

function CollectionItem({ span, height, tag, title, img }) {
  return (
    <motion.div
      className={`${span} group cursor-pointer w-full`}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
        }
      }}
    >
      <div className={`relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-100 ${height} w-full shadow-sm`}>
        <img
          src={img}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          alt={title}
        />
        <div className="absolute top-6 left-6">
          <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold text-black uppercase tracking-widest shadow-sm">
            {tag}
          </span>
        </div>
      </div>
      <div className="mt-6 px-2">
        <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight group-hover:text-zinc-500 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const textRefs = useRef([]);
  const bgRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  const pathRefs = useRef([]);
  const portfolioRef = useRef(null);
  const portfolioTitleRef = useRef(null);
  const portfolioTextRef = useRef(null);
  const portfolioButtonRef = useRef(null);
  const portfolioCardsRef = useRef(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4, // quando 40% da section estiver visível
    triggerOnce: false, // só anima uma vez
  });
  const [cardsRef, cardsInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const cardsControls = useAnimation();
  useEffect(() => {
    if (cardsInView) {
      cardsControls.start("visible");
    }
  }, [cardsInView, cardsControls]);
  useEffect(() => {
    if (inView) {
      controls.start("open");  // entra na tela → abre
    } else {
      controls.start("closed"); // sai da tela → fecha
    }
  }, [inView, controls]);

  const logos = [
    { src: "/images/logo_solbikes.png", width: "w-32" },
    { src: "/images/logo_montalto.png", width: "w-36" },
    { src: "/images/empresa_nova.png", width: "w-36" },
    { src: "/images/logo_empresa.png", width: "w-36" },
    { src: "/images/logo_empresa_one.png", width: "w-24" },
  ];
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // 🔹 Fade-in inicial (hero)
    if (textRefs.current.length > 0) {
      gsap.fromTo(
        textRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        }
      );
    }

    // 🔹 Resto das animações dependentes de sectionRef
    if (!sectionRef.current || !progressRef.current) return;

    const ctx = gsap.context(() => {
      // Fundo em movimento suave
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -50,
          repeat: -1,
          yoyo: true,
          duration: 20,
          ease: "linear",
        });
      }

      // Barra de progresso vertical
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Título principal
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Blocos de serviço
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    gsap.to(".circle-text", {
      rotation: 360,
      ease: "none",
      transformOrigin: "50% 50%",
      scrollTrigger: {
        trigger: ".circle-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    pathRefs.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(pathRefs.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2,
    });

    // Animações da seção do portfólio
    if (portfolioRef.current) {
      // Título com efeito de escala e rotação
      gsap.fromTo(portfolioTitleRef.current, 
        { opacity: 0, y: 80, scale: 0.8, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 80%",
          }
        }
      );

      // Texto com efeito de typewriter
      gsap.fromTo(portfolioTextRef.current,
        { opacity: 0, y: 50, skewY: 5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 75%",
          }
        }
      );

      // Cards com efeito de flip e bounce
      gsap.fromTo(portfolioCardsRef.current.children,
        { opacity: 0, y: 60, rotationY: -90, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          stagger: 0.15,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 70%",
          }
        }
      );

      // Botão com efeito de pulsação e glow
      gsap.fromTo(portfolioButtonRef.current,
        { opacity: 0, y: 40, scale: 0.6, rotationZ: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationZ: 0,
          duration: 1,
          delay: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: "top 70%",
          }
        }
      );

      // Animação contínua de hover no botão
      gsap.to(portfolioButtonRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2
      });

      // Elementos decorativos flutuantes
      gsap.to(".portfolio-float-1", {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(".portfolio-float-2", {
        y: 15,
        x: -15,
        rotation: -3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1
      });

      gsap.to(".portfolio-float-3", {
        y: -10,
        x: 20,
        rotation: 8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.5
      });
    }

    return () => ctx.revert();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cards = [
    {
      title: "Campanhas de Mídia Social",
      description: "Crie e lance campanhas impressionantes de mídia social sem esforço com fluxos de trabalho automatizados.",
      icon: "📱",
      image: "/images/cases/1.png"
    },
    {
      title: "Marketing com IA e Dados",
      description: "Desenvolvemos estratégias completas que unem posicionamento de marca, conteúdo relevante e publicos junto com funil de vendas.",
      icon: "🤖",
      image: "/images/cases/2.png"
    },
    {
      title: "Análise e Otimização de Resultados",
      description: "Acompanhar métricas é essencial para crescer. Monitoramos o desempenho de cada campanha para o retorno dos lucros",
      icon: "📊",
      image: "/images/cases/3.png"
    },
  ]; 

  const ferramentas = [
    {
      titulo: "Qualidade",
      texto:
        "Trabalhamos com poucos clientes, assegurando uma experiência e resultados de alto padrão.",
      icon: <Layers />,
    },
    {
      titulo: "Serviço",
      texto:
        "Nosso foco é gerar resultados significativos para sua empresa em todas as etapas do processo.",
      icon: <ToolCase />,
    },
    {
      titulo: "Marketing",
      texto:
        "Cada ação de marketing é por resultados e pelo impacto que ela causa para seu negócio.",
      icon: <BanknoteArrowUp />,
    },
    {
      titulo: "Desenvolvimento",
      texto:
        "Fazemos uma única coisa, e fazemos bem: desenvolver sites que impulsionam negócios.",
      icon: <AppWindowMac />,
    },
  ];

  // Animações
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // intervalo entre cada item
      },
    },
  };

  return (
    <div className=" ">
      <div className="  overflow-hidden   ">
        {/* Fundo animado atrás */}
        <div className="bg-accent relative inset-0  sm:h[60%] h-[122rem]  md:h-[95dvh]  lg:h-[95rem] ">
          <div className="container px-4 relative z-10"> 
  
            {/* ==== HERO ==== */}
            <div className="pt-36  md:pt-52  flex flex-col gap-5 items-start justify-start">
              <h1
                ref={(el) => {
                  if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
                }}
                className="text-6xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight text-white max-w-[95%] md:max-w-[65rem] opacity-0"
              >
                Experiência{" "}
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
                    className="inline-block relative"
                  >
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.5
                      }}
                      className="absolute inset-0 bg-white origin-center"
                    />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 1.0,
                        duration: 0.4,
                      }}
                      className="relative text-accent px-1"
                    >
                      digitais
                    </motion.span>
                  </motion.span>
                </span>{" "}
                por meio de{" "}
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.3 }}
                    className="inline-block relative"
                  >
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 1.3,
                      }}
                      className="absolute inset-0 bg-white origin-center"
                    />
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 1.8,
                        duration: 0.4,
                      }}
                      className="relative text-accent px-1"
                    >
                      websites
                    </motion.span>
                  </motion.span>
                </span>
              </h1>

              <div className="flex flex-col items-start gap-5  justify-between">
                <p
                  ref={(el) => el && textRefs.current.push(el)}
                  className="w-full md:w-[39rem] text-sm md:text-base text-zinc-200 font-medium"
                >
                  Step by step e junto com o cliente! Soluções digitais totalmente
                  personalizadas que elevam o seu negócio ou a sua marca a um
                  próximo nível.
                </p>
                <Button
                  ref={(el) => el && textRefs.current.push(el)}
                  color="white"
                  size="medium" 
                href="https://wa.link/kdl2a4"
                  className="flex  py-3"
                >
                  Comece seu Projeto
                </Button>
                <HeroWithArrow />
              </div>
              <div className="relative w-full overflow-hidden   md:mt-24 mt-10 opacity-70">
                {/* Faixa duplicada para looping suave */}
                <motion.div
                  className="flex items-center gap-16 whitespace-nowrap"
                  animate={{
                    x: ["0%", "-50%"], // move metade do tamanho do container
                  }}
                  transition={{
                    duration: 20, // velocidade do loop (aumente p/ mais lento)
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {/* duplicamos o array p/ garantir loop contínuo */}
                  {[...logos, ...logos].map((logo, i) => (
                    <motion.img
                      key={i}
                      src={logo.src}
                      alt={`Logo ${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`${logo.width} h-auto flex-shrink-0 transition-all duration-500`}
                    />
                  ))}
                </motion.div>
              </div>

            </div>

            {/* ==== Cards Section ==== */}
            <div
              ref={(el) => {
                if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
              }}
              className="circle-wrapper absolute right-14 -bottom-5 md:w-[180px] md:h-[180px] mx-auto flex items-center justify-center  hidden"
            >

              <div className="absolute inset-0 circle-text">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text
                    fill="black"
                    fontSize="16"
                    fontWeight="500"
                    letterSpacing="5"
                    textAnchor="start"
                  >
                    <textPath href="#circlePath" startOffset="0%">
                      DESIGN MOCKUP WEBSITES ARTES • DESIGN MOCKUP WEBSITES ARTES •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative mt-20 md:mt-16 md:mb-24">
            <div className="container mb-34">
              <motion.div
                initial={{ opacity: 0, y: 40 }}       // começa invisível e descendo
                whileInView={{ opacity: 1, y: 0 }}    // aparece ao entrar na tela
                exit={{ opacity: 0, y: -40 }}         // some quando sai (opcional)
                viewport={{ once: false, amount: 0.8 }} // anima individualmente, 50% visível
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="mb-10 font-syne font-bold tracking-wide md:text-6xl text-3xl text-white md:leading-16">
                  Soluções que a <br />DevStep Oferece
                </h2>
              </motion.div>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-10"
              >
                {ferramentas.map((ferramenta, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}       // começa invisível e descendo
                    whileInView={{ opacity: 1, y: 0 }}    // aparece ao entrar na tela
                    exit={{ opacity: 0, y: -50 }}         // some quando sai (opcional)
                    viewport={{ once: false, amount: 0.5 }} // anima individualmente, 50% visível
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-2 lg:gap-2 w-full pt-10 border-t border-purple-300"
                  >
                    <div className="mb-2 text-accent flex "><div className=" p-2 rounded-2xl  bg-white"> {ferramenta.icon}</div></div>
                    <h3 className="text-2xl text-white font-bold">{ferramenta.titulo}</h3>
                    <p className="text-zinc-50 text-sm lg:text-sm">{ferramenta.texto}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative sm:mt-24  mt-14 md:-mt-32  ">
          <ScrollCarousel />
        </div>

        <CreativeAssets />

        <PortfolioSection />

        {/* Seção Showcase: Pack de Artes Academia */}
        <section className="relative py-32 bg-[#050505] overflow-hidden font-syne">
          {/* Glow de fundo estático */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Coluna de Texto */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-[#FF5722] font-black text-xs uppercase tracking-[0.5em] mb-4 block">Exclusivo</span>
                  <h2 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-none mb-8">
                    Pack <br /> <span className="text-[#FF5722] italic">Fitness.</span>
                  </h2>
                  <p className="text-zinc-500 text-lg mb-10 max-w-sm">
                    Oito artes estratégicas projetadas para converter no nicho de academia. Design de alto impacto visual.
                  </p>
                  
                  {/* Card de Preço FIXO */}
                  <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-3xl mb-10 inline-block">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Investimento único</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">R$ 69,90</span>
                      <span className="text-zinc-600 line-through text-sm">R$ 197,00</span>
                    </div>
                  </div>

                  <button className="w-full md:w-auto bg-[#FF5722] text-white px-12 py-5 rounded-full font-bold hover:bg-[#e64a19] transition-all flex items-center justify-center gap-3">
                    QUERO O MEU AGORA <ArrowRight size={20} />
                  </button>
                </motion.div>
              </div>

              {/* Área das Artes com Efeito Cascata */}
              <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">
                
                {/* Arte Principal (9.png) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-30 w-[280px] md:w-[380px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <img src="/images/Pack de artes nova/9.png" alt="Destaque" className="w-full" />
                </motion.div>

                {/* Artes Secundárias em Cascata Espalhada */}
                <div className="absolute inset-0 z-10">
                  <ArtLayer img="2" pos="top-0 left-0" size="w-32" delay={0.3} rotate={-15} />
                  <ArtLayer img="3" pos="bottom-0 left-5" size="w-40" delay={0.4} rotate={10} />
                  <ArtLayer img="4" pos="top-10 right-0" size="w-36" delay={0.5} rotate={15} />
                  <ArtLayer img="5" pos="top-1/4 left-1/4" size="w-32" delay={0.6} rotate={-5} />
                  <ArtLayer img="6" pos="bottom-1/4 right-1/4" size="w-36" delay={0.7} rotate={8} />
                  <ArtLayer img="7" pos="top-0 right-1/3" size="w-28" delay={0.8} rotate={-10} />
                  <ArtLayer img="8" pos="bottom-10 right-10" size="w-44" delay={0.9} rotate={-12} />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Espaçador para garantir transição suave entre Pack Nova e Coleções */}
        <div className="bg-white h-20 w-full relative z-20" />

        <section className="relative z-20 bg-white mt-[-2px]">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-4 block"
                >
                  Artes
                </motion.span>
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
                <p className="text-zinc-500 font-medium max-w-xs md:text-right text-lg">
                  Soluções visuais focadas em nichos específicos para máxima conversão.
                </p>
                <a
                  href="https://devstep-portifolio.netlify.app/"
                  target="_blank"
                  className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-md hover:bg-accent transition-all duration-300"
                >
                  <span className="font-bold text-sm uppercase tracking-widest">Explorar Portfólio</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Grid Bento - Milimetricamente Ajustado */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-[50px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {/* LINHA 1: 8 + 4 */}
              <CollectionItem
                span="md:col-span-8"
                height="h-[350px] md:h-[550px]"
                tag="Auto-Escola"
                title="Auto-Escola"
                img="images/Nossas coleções/1.png"
              />
              <CollectionItem
                span="md:col-span-4"
                height="h-[350px] md:h-[550px]"
                tag="Placa Solar"
                title="Placa Solar"
                img="images/Nossas coleções/2.png"
              />

              {/* LINHA 2: 5 + 7 */}
              <CollectionItem
                span="md:col-span-5"
                height="h-[350px] md:h-[450px]"
                tag="Açaiteria"
                title="Açaiteria"
                img="images/Nossas coleções/3.png"
              />
              <CollectionItem
                span="md:col-span-7"
                height="h-[350px] md:h-[450px]"
                tag="Loja de Roupa"
                title="Loja de Roupa"
                img="images/Nossas coleções/4.png"
              />

              {/* LINHA 3: 4 + 4 + 4 */}
              <CollectionItem
                span="md:col-span-4"
                height="h-[300px] md:h-[350px]"
                tag="Pet Shop"
                title="Pet Shop"
                img="images/Nossas coleções/5.png"
              />
              <CollectionItem
                span="md:col-span-4"
                height="h-[300px] md:h-[350px]"
                tag="Loja de construção"
                title="Loja de construção"
                img="images/Nossas coleções/6.png"
              />
              <CollectionItem
                span="md:col-span-4"
                height="h-[300px] md:h-[350px]"
                tag="Seguro"
                title="Seguro"
                img="images/Nossas coleções/7.png"
              />
            </motion.div>
          </div>
        </section>

        <AugeShowcase />

        {/* Seção Design em Movimento - Reestilizada */}
        <section className="bg-[#7448ff] py-32 relative overflow-hidden border-t border-white/10">
          
          {/* Grade em Movimento Constante */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-[0.15]" 
            style={{ 
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px' 
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '60px 60px'] 
            }}
            transition={{ 
              duration: 8, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />

          {/* Glow Decorativo para dar profundidade ao roxo */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                 <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.5em] mb-6 block" style={{opacity: 1, transform: 'none'}}>
                Site novo
              </span>
                {/* Mudança de cor dos textos para Branco (contraste com fundo roxo) */}
                <h2 className="font-syne font-extrabold text-6xl md:text-7xl text-white tracking-tighter leading-[0.9]">
                  Design em <br /> 
                  <span className="text-black/100 italic">movimento constante.</span>
                </h2>
              </div>
              <p className="text-purple-100 font-medium max-w-sm text-right lg:mb-4">
                Cada passo é milimetricamente planejado para que sua marca não apenas exista, mas domine.
              </p>
            </div>

            <VerticalCards theme="dark" />
          </div>
        </section>
        <section id="faq" className=" mb-24 group/section relative bg-white lqd-is-in-view">

          <div className="border border-zinc-200 container"></div>
          <TabsSection />
        </section>

        <PurpleScrollSection />
      </div>
    </div>
  );
}
