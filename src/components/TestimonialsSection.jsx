"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Solbikes",
    role: "Landing page para vendas",
    quote:
      "Nosso novo site passou mais seguranca na primeira visita e o volume de contatos qualificados aumentou logo nas primeiras campanhas.",
    image: "/images/logo_solbikes.png",
  },
  {
    name: "European Mint",
    role: "Experiencia premium",
    quote:
      "A equipe entregou uma pagina leve, rapida e pensada para conversao. Ficou muito mais facil escalar o investimento em midia.",
    image: "/images/logo_europeanmint.png",
  },
  {
    name: "World Silver",
    role: "Reposicionamento digital",
    quote:
      "Saiu com cara de empresa grande sem perder clareza. O visual ficou premium e o atendimento recebeu muito mais mensagens com intencao real de compra.",
    image: "/images/logo_worldsilver.png",
  },
  {
    name: "Land",
    role: "Pagina pensada para vender",
    quote:
      "A navegacao ficou objetiva e a experiencia no mobile melhorou bastante. Hoje o site acompanha o nivel da operacao e ajuda no fechamento.",
    image: "/images/logo_land.png",
  },
  {
    name: "SBACEM",
    role: "Presenca institucional",
    quote:
      "Nao foi so design bonito. Cada bloco da pagina conversa com a oferta, organiza a mensagem e conduz o visitante ate a acao principal.",
    image: "/images/logo_sbacem.png",
  },
  {
    name: "Nossas Vozes",
    role: "Site novo em ritmo comercial",
    quote:
      "O projeto ficou moderno, rapido e facil de apresentar para novos clientes. A percepcao da marca mudou completamente depois do lancamento.",
    image: "/images/logo_nossasvozes.png",
  },
  {
    name: "Montalto",
    role: "Visual consistente com a marca",
    quote:
      "A DevStep conseguiu traduzir posicionamento em interface. O resultado ficou elegante, atual e muito mais alinhado com o publico que queremos atrair.",
    image: "/images/logo_montalto.png",
  },
  {
    name: "Empresa Nova",
    role: "Performance e credibilidade",
    quote:
      "Tinha muita preocupacao com velocidade e confianca. O site subiu redondo, com leitura facil, boa hierarquia e uma apresentacao muito mais profissional.",
    image: "/images/empresa_nova.png",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="min-h-[13.5rem] w-[18rem] flex-shrink-0 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:w-[21rem] sm:p-6 lg:w-[23rem] xl:w-[24rem]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg shadow-black/20">
            <img
              src={testimonial.image}
              alt={`Logo ${testimonial.name}`}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight text-white">
              {testimonial.name}
            </p>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              {testimonial.role}
            </p>
          </div>
        </div>
        <Quote className="mt-1 h-5 w-5 flex-shrink-0 text-[#8b5cf6]" />
      </div>

      <p className="mt-5 text-[0.98rem] leading-7 text-zinc-200">
        {testimonial.quote}
      </p>
    </article>
  );
}

function MarqueeRow({ items, reverse = false, duration = 34 }) {
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="testimonials-track-base"
        style={{
          animationName: reverse
            ? "testimonials-marquee-reverse"
            : "testimonials-marquee",
          animationDuration: `${duration}s`,
        }}
      >
        {[0, 1].map((groupIndex) => (
          <div
            className="flex w-max flex-shrink-0 gap-6 pr-6 md:gap-8 md:pr-8"
            key={groupIndex}
          >
            {items.map((testimonial, index) => (
              <TestimonialCard
                key={`${groupIndex}-${testimonial.name}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const rowOne = testimonials;
  const rowTwo = [...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 font-syne md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7448ff]/15 blur-[120px]" />
        <div className="absolute bottom-0 left-[12%] h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 max-w-5xl text-left md:mb-20"
        >
          <h2 className="max-w-5xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl">
            Deixe os resultados <br className="hidden md:block" />
            <span className="text-[#8b5cf6] italic">falarem por nos.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 md:text-lg">
            Experiencias digitais feitas para transmitir confianca, elevar a
            percepcao da marca e transformar visitas em oportunidades reais.
          </p>
        </motion.div>

        <div className="relative space-y-8 md:space-y-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/90 to-transparent md:w-32" />

          <MarqueeRow items={rowOne} reverse duration={38} />
          <MarqueeRow items={rowTwo} duration={42} />
        </div>
      </div>
    </section>
  );
}
