"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  Code2,
  ClockArrowUp,
  MessageCircle,
  WandSparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/button";

const tabs = [
  {
    id: "text-ai",
    title: "Quanto custa um projeto?",
    subtitle: "Orçamentos personalizados para sua ideia.",
    icon: <Banknote className="w-5 h-5" />,
    content: (
      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[26rem]">
        <div>
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Investimento</span>
          <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 text-black tracking-tighter leading-tight">Custo do seu <br/><span className="text-[#7448ff] italic">Projeto.</span></h2>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            O custo varia conforme a complexidade. Após uma análise detalhada, fornecemos um orçamento estratégico focado em retorno.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6">
          Começar Projeto
        </Button>
      </div>
    ),
  },
  {
    id: "image-ai",
    title: "Qual o prazo de entrega?",
    subtitle: "Cronogramas ágeis e eficientes.",
    icon: <ClockArrowUp className="w-5 h-5" />,
    content: (
      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[26rem]">
        <div>
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Tempo</span>
          <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 text-black tracking-tighter leading-tight">Prazo de <br/><span className="text-[#7448ff] italic">Finalização.</span></h2>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            Geralmente, projetos simples levam algumas semanas. Projetos robustos são entregues em etapas planeadas.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6">
          Ver Cronograma
        </Button>
      </div>
    ),
  },
  {
    id: "code-ai",
    title: "Quais plataformas usamos?",
    subtitle: "Tecnologias de ponta.",
    icon: <Code2 className="w-5 h-5" />,
    content: (
      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[26rem]">
        <div>
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Stack Tech</span>
          <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 text-black tracking-tighter leading-tight">Nosso <br/><span className="text-[#7448ff] italic">Ecossistema.</span></h2>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            De WordPress a React e Laravel. Escolhemos a tecnologia que melhor escala o seu modelo de negócio.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6">
          Saber Mais
        </Button>
      </div>
    ),
  },
  {
    id: "chat-ai",
    title: "Vantagens do WordPress?",
    subtitle: "SEO e Performance.",
    icon: <MessageCircle className="w-5 h-5" />,
    content: (
      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[26rem]">
        <div>
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">CMS</span>
          <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 text-black tracking-tighter leading-tight">Poder do <br/><span className="text-[#7448ff] italic">WordPress.</span></h2>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            Fácil de gerir, SEO friendly e altamente escalável. A solução perfeita para marketing e conversão.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6">
          Solicitar Site
        </Button>
      </div>
    ),
  }, {
    id: "chat-ais",
    title: "Como começar agora?",
    subtitle: "Passo a passo da parceria.",
    icon: <WandSparkles className="w-5 h-5" />,
    content: (
      <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[26rem]">
        <div>
          <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Onboarding</span>
          <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-6 text-black tracking-tighter leading-tight">Inicie sua <br/><span className="text-[#7448ff] italic">Jornada.</span></h2>
          <p className="text-zinc-600 text-lg leading-relaxed max-w-md">
            Preencha o formulário, alinhe expectativas e veja sua ideia ganhar vida com especialistas.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="w-fit bg-black text-white hover:bg-[#7448ff] transition-colors rounded-full px-8 py-6">
          Falar com Especialista
        </Button>
      </div>
    ),
  },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("text-ai");
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  // Lógica de Autoplay (5 segundos)
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setActiveTab((prev) => {
          const currentIndex = tabs.findIndex((t) => t.id === prev);
          return tabs[(currentIndex + 1) % tabs.length].id;
        });
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsPaused(true); // Pausa o autoplay quando o utilizador interage
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 flex md:flex-row flex-col gap-12 lg:gap-20">
        
        {/* Menu Lateral (Tabs) */}
        <div className="flex flex-col gap-4 w-full md:w-[450px]">
          <div className="mb-8">
            <span className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.4em] mb-2 block font-syne">FAQ</span>
            <h3 className="text-3xl md:text-4xl font-syne font-extrabold text-black tracking-tight">Perguntas comuns</h3>
          </div>

          <motion.div className="flex flex-col gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`group relative px-6 py-5 rounded-2xl flex items-center justify-between text-left transition-all duration-300 border
                    ${isActive 
                      ? "bg-zinc-50 border-zinc-200 shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-zinc-50/50 hover:border-zinc-100"
                    }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl transition-colors ${isActive ? "bg-[#7448ff] text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"}`}>
                      {tab.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-bold text-sm transition-colors ${isActive ? "text-black" : "text-zinc-500 group-hover:text-black"}`}>
                        {tab.title}
                      </span>
                      <span className={`text-xs ${isActive ? "text-zinc-500" : "text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"}`}>
                        {tab.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeBar" 
                      className="absolute left-0 w-1 h-8 bg-[#7448ff] rounded-full"
                    />
                  )}

                  <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? "rotate-90 text-[#7448ff]" : "text-zinc-300 group-hover:translate-x-1"}`} />
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Card de Conteúdo */}
        <div className="flex-1 relative min-h-[450px]">
          <div className="absolute inset-0 bg-[#7448ff]/5 rounded-[2.5rem] blur-3xl -z-10" />
          
          <div className="relative bg-zinc-50 border border-zinc-100 rounded-[2.5rem] shadow-2xl shadow-purple-100/10 h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                {tabs.find((t) => t.id === activeTab)?.content}
              </motion.div>
            </AnimatePresence>

            {/* Barra de progresso do Autoplay */}
            {!isPaused && (
              <motion.div
                key={`progress-${activeTab}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#7448ff] origin-left"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}