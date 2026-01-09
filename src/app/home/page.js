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
      text: "Crie e lance campanhas impressionantes de mídia social sem esforço com fluxos de trabalho automatizados.",
      color: "bg-white  text-zinc-600 border-zinc-300",
    },
    {
      title: "Marketing com IA e Dados",
      text: "Desenvolvemos estratégias completas que unem posicionamento de marca, conteúdo relevante e publicos junto com funil de vendas.",
      color: "bg-white text-zinc-600 border-zinc-300  z-15",
    },
    {
      title: "Análise e Otimização de Resultados",
      text: "Acompanhar métricas é essencial para crescer. Monitoramos o desempenho de cada campanha para o retorno dos lucros",
      color: "bg-white  text-zinc-600   border-zinc-300",
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


        <section className="mt-20 lg:mt-28  relative   lqd-is-in-view">
          <svg className="absolute -top-0 left-0 h-14 w-full rotate-0" width="1440" height="25" viewBox="0 0 1440 25" fill="#fff" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0C576 33.3333 864 33.3333 1440 0H0Z"></path>
          </svg>

          <div className="container relative z-1 text-zinc-900 transition-all duration-700  ">
            <h1 className="text-center font-bold font-syne text-4xl md:text-7xl w-8/12 mx-auto">Turbine sua
              estratégia de marketing
            </h1>
            <FancyCards cards={cards} cardsRef={cardsRef} cardsControls={cardsControls} />
            <div className="mx-auto  flex items-center justify-center">
              <Button
                ref={(el) => el && textRefs.current.push(el)}
                color="purple"
                size="small"
                href="https://wa.link/kdl2a4"
                className="flex  z-40 py-2.5"
              >
                Comece seu Projeto
              </Button>
            </div>
          </div>
        </section>

        {/* Seção do Portfólio */}
        <section ref={portfolioRef} className="relative overflow-hidden mt-20 lg:mt-28" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
          {/* Background de grade animado */}
          <div className="absolute inset-0 opacity-40">
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
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          
          <div className="flex items-center justify-between relative z-10 h-full min-h-[600px] w-full">
            {/* Conteúdo à esquerda */}
            <div className="w-1/2 pr-12" style={{ paddingLeft: '125px' }}>
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" /> Projetos Exclusivos
                </span>
              </div>
              <h2 ref={portfolioTitleRef} className="text-4xl md:text-6xl font-bold font-syne text-zinc-800 mb-6">
                Conheça Meu <span className="text-purple-600">Portfólio</span>
              </h2>
              <p ref={portfolioTextRef} className="text-lg text-zinc-600 mb-8">
                <TrendingUp className="inline w-5 h-5 mr-2" />Explore projetos reais que transformaram negócios e geraram resultados incríveis para meus clientes.
              </p>
              
              
              <Button
                ref={portfolioButtonRef}
                color="purple"
                size="medium"
                href="https://devstep-portifolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Target className="w-5 h-5" /> Acessar Portfólio
              </Button>
            </div>

            {/* Hero Banner à direita */}
            <div className="w-1/2 h-full">
              <div className="hero-banner-container relative w-full h-full">
                <img
                  src="/images/hero-banner.png"
                  alt="Hero Banner"
                  className="hero-banner w-full h-full object-cover object-right-bottom"
                  style={{ margin: 0, padding: 0 }}
                />
                
                {/* Efeitos decorativos menores */}
                <div className="absolute top-1/4 left-4 w-2 h-2 bg-violet-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

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