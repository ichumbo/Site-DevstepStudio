"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/button";
import { Layers, AppWindowMac, ToolCase, BanknoteArrowUp, Sparkles, Target, Briefcase, Star, TrendingUp } from 'lucide-react';
import VerticalCards from "@/modules/home/cards/vertical";
import HeroWithArrow from "@/modules/home/sections/herowitharrow";
import ScrollCarousel from "@/modules/home/cards/scrollcarousel";
import TabsSection from "@/modules/home/cards/tabs";
import FancyCards from "@/modules/home/cards/cards";
import PurpleScrollSection from "@/modules/home/purple";
import ProjectsGallery from "@/modules/home/gallery";

gsap.registerPlugin(ScrollTrigger);

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
                className="text-6xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight text-white max-w-[95%] md:max-w-[65rem]"
              >
                Experiência{" "}
                <span className="relative inline-flex items-start justify-start overflow-hidden align-middle">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 bg-white origin-center"
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.4,
                    }}
                    className="relative text-accent px-1"
                  >
                    digitais
                  </motion.span>
                </span>{" "}
                por meio de{" "}
                <span className="relative inline-flex items-center justify-center overflow-hidden align-middle">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.8,
                    }}
                    className="absolute inset-0 bg-white origin-center"
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.3,
                      duration: 0.4,
                    }}
                    className="relative text-accent px-1"
                  >
                    websites
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
                <h2 className="mb-10  font-syne font-bold tracking-wide   md:text-6xl  text-3xl text-white md:leading-16">
                  Soluções que  a <br />DevStep Oferece
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

        {/* Seção de Turbinar */}
        <section className="mt-20 lg:mt-28 relative bg-white overflow-hidden">
          <div className="container py-20">
            {/* Título principal */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-syne font-bold text-4xl md:text-6xl text-black leading-tight">
                <span className="text-zinc-900">Turbine sua</span>                 <span style={{color: '#7448ff'}}>presença digital</span>
              </h2>
            </motion.div>

            {/* Subtítulo */}
            <motion.p 
              className="text-center text-lg text-zinc-600 mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Estratégias personalizadas que transformam sua marca em referência no mercado digital.
            </motion.p>

            {/* Cards deslizáveis com efeitos criativos */}
            <motion.div 
              className="relative mb-16 py-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Linha de onda animada atrás dos cards */}
              <motion.svg 
                className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 z-0"
                viewBox="0 0 1200 100"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0,50 Q300,10 600,50 T1200,50"
                  stroke="#7448ff"
                  strokeWidth="6"
                  fill="none"
                  animate={{
                    d: [
                      "M0,50 Q300,10 600,50 T1200,50",
                      "M0,50 Q300,90 600,50 T1200,50",
                      "M0,50 Q300,10 600,50 T1200,50"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
              
              <div className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-hide relative z-10 justify-center">
                <motion.div 
                  className="flex-shrink-0 w-64 rounded-2xl p-6 transition-all duration-500 snap-center relative overflow-hidden group"
                  style={{backgroundColor: '#7448ff'}}
                  initial={{ rotateY: -30, opacity: 0, x: -200, scale: 0.8 }}
                  whileInView={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.08, 
                    rotateY: 8,
                    rotateX: 5
                  }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white to-purple-100 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{color: '#7448ff'}}>
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-lg text-white mb-3 relative z-10"
                    whileHover={{ scale: 1.1, color: "#f3f4f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    Estratégia
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-100 text-sm leading-relaxed relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    Planejamento completo e personalizado para maximizar seus resultados no mercado digital.
                  </motion.p>
                  
                  <motion.div 
                    className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-80"
                    animate={{ 
                      y: [-8, 8, -8], 
                      rotate: [0, 180, 360],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="flex-shrink-0 w-64 rounded-2xl p-6 transition-all duration-500 snap-center relative overflow-hidden group"
                  style={{backgroundColor: '#7448ff'}}
                  initial={{ rotateY: -30, opacity: 0, x: -200, scale: 0.8 }}
                  whileInView={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.08, 
                    rotateY: -8,
                    rotateX: 5
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white to-purple-100 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ 
                      rotate: -360, 
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{color: '#7448ff'}}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-lg text-white mb-3 relative z-10"
                    whileHover={{ scale: 1.1, color: "#f3f4f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    Execução
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-100 text-sm leading-relaxed relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    Implementação precisa e eficiente de cada etapa do seu projeto digital.
                  </motion.p>
                  
                  <motion.div 
                    className="absolute top-6 right-6 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-80"
                    animate={{ 
                      scale: [1, 2, 1], 
                      opacity: [0.3, 0.9, 0.3],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
                
                <motion.div 
                  className="flex-shrink-0 w-64 rounded-2xl p-6 transition-all duration-500 snap-center relative overflow-hidden group"
                  style={{backgroundColor: '#7448ff'}}
                  initial={{ rotateY: -30, opacity: 0, x: -200, scale: 0.8 }}
                  whileInView={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.08, 
                    rotateY: 8,
                    rotateX: 5
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white to-purple-100 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{color: '#7448ff'}}>
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-lg text-white mb-3 relative z-10"
                    whileHover={{ scale: 1.1, color: "#f3f4f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    Resultados
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-100 text-sm leading-relaxed relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    Métricas claras e crescimento sustentável para o seu negócio.
                  </motion.p>
                  
                  <motion.div 
                    className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-80"
                    animate={{ 
                      x: [-4, 4, -4], 
                      y: [-3, 3, -3],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div 
                  className="flex-shrink-0 w-64 rounded-2xl p-6 transition-all duration-500 snap-center relative overflow-hidden group"
                  style={{backgroundColor: '#7448ff'}}
                  initial={{ rotateY: -30, opacity: 0, x: -200, scale: 0.8 }}
                  whileInView={{ rotateY: 0, opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.08, 
                    rotateY: -8,
                    rotateX: 5
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "100%", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white to-purple-100 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ 
                      rotate: -360, 
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{color: '#7448ff'}}>
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-lg text-white mb-3 relative z-10"
                    whileHover={{ scale: 1.1, color: "#f3f4f6" }}
                    transition={{ duration: 0.3 }}
                  >
                    Suporte
                  </motion.h3>
                  
                  <motion.p 
                    className="text-purple-100 text-sm leading-relaxed relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    Acompanhamento contínuo e suporte especializado em todas as etapas.
                  </motion.p>
                  
                  <motion.div 
                    className="absolute top-8 left-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80"
                    animate={{ 
                      scale: [1, 3, 1], 
                      rotate: [0, 180, 360],
                      opacity: [0.3, 0.9, 0.3]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                color="purple"
                size="medium"
                href="https://wa.link/kdl2a4"
                className="inline-flex items-center gap-2 py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Target className="w-5 h-5" /> Começar agora
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Seção do Portfólio */}
        <motion.section 
          ref={portfolioRef} 
          className="relative overflow-hidden mt-20 lg:mt-28" 
          style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          {/* Background de grade animado */}
          <motion.div 
            className="absolute inset-0 opacity-40"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                animation: 'moveGrid 20s linear infinite'
              }}
            ></div>
          </motion.div>
          
          {/* Elementos decorativos animados */}
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 blur-xl"
            initial={{ scale: 0, x: -100 }}
            whileInView={{ scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"
            initial={{ scale: 0, x: 100 }}
            whileInView={{ scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          ></motion.div>
          <motion.div 
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          ></motion.div>
          
          <div className="flex items-center justify-between relative z-10 h-full min-h-[600px] w-full">
            {/* Conteúdo à esquerda */}
            <div className="w-1/2 pr-12" style={{ paddingLeft: '125px' }}>
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" /> Projetos Exclusivos
                </span>
              </motion.div>
              <motion.h2 
                ref={portfolioTitleRef} 
                className="text-4xl md:text-6xl font-bold font-syne text-zinc-800 mb-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Conheça Nosso Portfólio
              </motion.h2>
              <motion.p 
                ref={portfolioTextRef} 
                className="text-lg text-zinc-600 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <TrendingUp className="inline w-5 h-5 mr-2" />Explore projetos reais que transformaram negócios e geraram resultados incríveis para meus clientes.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  ref={portfolioButtonRef}
                  color="purple"
                  size="medium"
                  href="https://devstep-portifolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Target className="w-5 h-5" /> Acessar Portfólio
                </Button>
              </motion.div>
            </div>

            {/* Hero Banner à direita */}
            <motion.div 
              className="w-1/2 h-full"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="hero-banner-container relative w-full h-full">
                <motion.img
                  src="/images/hero-banner.png"
                  alt="Hero Banner"
                  className="hero-banner w-full h-full object-cover object-right-bottom"
                  style={{ margin: 0, padding: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Efeitos decorativos menores animados */}
                <motion.div 
                  className="absolute top-1/4 left-4 w-2 h-2 bg-violet-400 rounded-full animate-ping"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-1/3 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                ></motion.div>
                <motion.div 
                  className="absolute top-2/3 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 1 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          ref={ref}
          className="bg-zinc-900 py-10 md:py-20 mb-24" 
          initial="closed"
          animate={controls}
        >
          <div className="container">
            <div className="w-[55rem]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <h2 className="font-bold font-syne text-3xl lg:w-full  w-5/12 md:text-7xl text-white tracking-wide">
                  Entenda o nosso processo de criação
                </h2>
              </motion.div>
            </div>

            <VerticalCards />
          </div>
        </motion.div>
        <section className="mt-24"  id="cases">
          <ProjectsGallery />
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