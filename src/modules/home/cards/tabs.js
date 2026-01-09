"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  Banknote ,
  Code2,
  ClockArrowUp ,
  MessageCircle,
  WandSparkles ,
} from "lucide-react";
import { Button } from "@/components/button";

const tabs = [
  {
    id: "text-ai",
    title: "Quanto custa um projeto da DevStep?",
    subtitle: "Saiba o custo para fazer um projeto com a DevStep Studio",
    icon: <Banknote  className="w-5 h-5" />,
    gradient: "",
    content: (
      <div className="p-10 flex flex-col justify-between h-[24rem]">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Custo para um Projeto</h2>
          <p className="text-zinc-100 text-base leading-relaxed">
     O custo de um projeto da DevStep varia conforme a complexidade e os requisitos específicos. Após uma análise detalhada das suas necessidades, fornecemos um orçamento personalizado. Entre em contato para uma estimativa gratuita.
            </p>
        </div>
        <Button color="white" size="small"  href="https://wa.link/kdl2a4" className="flex rounded-[0.2rem] z-40 py-2.5">
          Comece seu Projeto
        </Button>
      </div>
    ),
  },
  {
    id: "image-ai",
    title: "Quanto tempo levará para concluir meu projeto?",
    subtitle: "Tire sua dúvida sobre o prazo de finalização para um projeto",
    icon: <ClockArrowUp  className="w-5 h-5" />,
    gradient: "",
    content: (
      <div className="p-10 flex flex-col justify-between h-[24rem]">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Prazo para finalizar um Projeto</h2>
          <p className="text-zinc-100 text-base leading-relaxed">
      O tempo para concluir seu projeto varia conforme a complexidade e os requisitos específicos. Geralmente, projetos simples levam algumas semanas, enquanto projetos mais complexos podem levar alguns meses. Forneceremos um cronograma detalhado após analisar suas necessidades.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4"  className="flex rounded-[0.2rem] z-40 py-2.5">
          Comece seu Projeto
        </Button>
      </div>
    ),
  },
  {
    id: "code-ai",
    title: "Quais plataformas nós usamos?",
    subtitle: "Saiba quais plataformas usamos para criação de websites",
    icon: <Code2 className="w-5 h-5" />,
    gradient: "",
    content: (
      <div className="p-10 flex flex-col justify-between h-[24rem]">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Plataformas para Desenvolvimento</h2>
          <p className="text-zinc-100 text-base leading-relaxed">
     Além de WordPress, também utilizamos outras plataformas como Laravel, React e Drupal para atender às diversas necessidades e preferências dos nossos clientes. Cada plataforma é escolhida com base nos requisitos específicos do projeto.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4"  className="flex rounded-[0.2rem] z-40 py-2.5">
          Comece seu Projeto
        </Button>
      </div>
    ),
  },
  {
    id: "chat-ai",
    title: "Por que usar WordPress no meu site?",
    subtitle: "Vantagens de usar WordPress com a DevStep Studio",
    icon: <MessageCircle className="w-5 h-5" />,
    gradient: "",
    content: (
      <div className="p-10 flex flex-col justify-between h-[24rem]">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Vantagem de usar WordPress</h2>
          <p className="text-zinc-100 text-base leading-relaxed">
        WordPress é fácil de usar, altamente personalizável com inúmeros temas e plugins, e possui uma grande comunidade de suporte. É SEO amigável, garantindo melhor visibilidade nos mecanismos de busca. Com atualizações regulares, oferece segurança e funcionalidades modernas.
          </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4"  className="flex rounded-[0.2rem] z-40 py-2.5">
          Comece seu Projeto
        </Button>
      </div>
    ),
  }, {
    id: "chat-ais",
    title: "Quero trabalhar com vocês, como posso começar?",
    subtitle: "Saiba como trabalhar com a gente e começar seu projeto",
    icon: <WandSparkles  className="w-5 h-5" />,
    gradient: "",
    content: (
      <div className="p-10 flex flex-col justify-between h-[24rem]">
        <div>
          <h2 className="text-4xl font-extrabold mb-3">Como começar com a gente?</h2>
          <p className="text-zinc-100 text-base leading-relaxed">
        Basta preencher o formulário com suas informações e uma breve descrição do que você precisa. Assim que recebermos seu contato, analisaremos os detalhes e enviaremos uma proposta personalizada.
Após a aprovação do orçamento, agendamos uma reunião para alinhar expectativas, definir o escopo e dar início ao desenvolvimento do seu projeto.
           </p>
        </div>
        <Button color="white" size="small" href="https://wa.link/kdl2a4" className="flex rounded-[0.2rem] z-40 py-2.5">
          Comece seu Projeto
        </Button>
      </div>
    ),
  },
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("text-ai");

  return (
    <div className="w-full container flex md:flex-row flex-col justify-between gap-14 mt-24 mb-10 text-white">
      {/* Tabs com entrada animada */}
      <motion.div
        className="flex flex-wrap flex-col gap-3 w-[45rem]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-3 rounded-2xl flex w-full items-center gap-2 text-base md:text-lg font-medium transition-all
                ${isActive
                  ? "text-accent bg-white"
                  : "text-gray-600   hover:text-white hover:bg-accent-foreground"
                }`}
            >
          <div className="md:block hidden">
                {tab.icon}
          </div>
              <div className="flex flex-col items-start">
                <span>{tab.title}</span>
                <div className="text-xs">{tab.subtitle}</div>
              </div>

              {isActive && (
                <motion.div
                  layoutId="tabHighlight"
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tab.gradient} -z-10`}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Card */}
      <div className="relative bg-accent w-full md:w-[75%] rounded-2xl shadow-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {tabs.find((t) => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}