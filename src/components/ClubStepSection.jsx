"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  LayoutGrid,
  Moon,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";

const clubStepUrl = "https://clubstep.com.br/pt_BR";

const categoryOrder = ["artes", "sites", "apps"];

const productCategories = {
  artes: {
    sidebarLabel: "Artes",
    navLabel: "Colecoes",
    eyebrow: "Artes",
    items: [
      {
        title: "Artes de campanha",
        type: "PSD editavel",
        image: "/images/Pack de artes nova/9.png",
        accent: "bg-[#ff6b1a]",
      },
      {
        title: "Packs por nicho",
        type: "Social media",
        image: "/images/Pack de artes nova/7.png",
        accent: "bg-[#f59e0b]",
      },
      {
        title: "Postagens premium",
        type: "Feed e stories",
        image: "/images/Pack de artes nova/4.png",
        accent: "bg-[#ef4444]",
      },
    ],
    marquee: [
      "/images/Pack de artes nova/2.png",
      "/images/Pack de artes nova/3.png",
      "/images/Pack de artes nova/4.png",
      "/images/Pack de artes nova/5.png",
    ],
  },
  sites: {
    sidebarLabel: "Sites",
    navLabel: "Sites",
    eyebrow: "Sites",
    items: [
      {
        title: "Landing pages",
        type: "Conversao",
        image: "/images/Sites/Visual do Projeto Completo.png",
        accent: "bg-[#7448ff]",
      },
      {
        title: "Portfolios comerciais",
        type: "Vitrine digital",
        image: "/images/Sites/Visual do Projeto Completo (2).png",
        accent: "bg-[#60a5fa]",
      },
      {
        title: "Sites institucionais",
        type: "Marca e presenca",
        image: "/images/Sites/Visual do Projeto Completo (1).png",
        accent: "bg-[#2dd4bf]",
      },
    ],
    marquee: [
      "/images/Sites/Visual do Projeto Completo.png",
      "/images/Sites/Visual do Projeto Completo (1).png",
      "/images/Sites/Visual do Projeto Completo (2).png",
      "/images/Sites/Visual do Projeto Completo (3).png",
    ],
  },
  apps: {
    sidebarLabel: "Apps",
    navLabel: "Apps",
    eyebrow: "Apps",
    items: [
      {
        title: "Dashboards",
        type: "Gestao visual",
        image: "/images/Desktop - 3.png",
        accent: "bg-[#2dd4bf]",
      },
      {
        title: "Interfaces mobile",
        type: "Fluxos responsivos",
        image: "/images/cases-hero/17.png",
        accent: "bg-[#f43f5e]",
      },
      {
        title: "Sistemas web",
        type: "Operacao digital",
        image: "/images/cases-hero/11.png",
        accent: "bg-[#7448ff]",
      },
    ],
    marquee: [
      "/images/Desktop - 3.png",
      "/images/cases-hero/11.png",
      "/images/cases-hero/17.png",
      "/images/cases-hero/20.png",
    ],
  },
};

const categoryIcons = {
  artes: Palette,
  sites: LayoutGrid,
  apps: Smartphone,
};

export default function ClubStepSection() {
  const [activeCategory, setActiveCategory] = useState("artes");
  const [sortAsc, setSortAsc] = useState(true);
  const activeCollection = productCategories[activeCategory];

  const sortedItems = useMemo(() => {
    return [...activeCollection.items].sort((a, b) => {
      const result = a.title.localeCompare(b.title);
      return sortAsc ? result : -result;
    });
  }, [activeCollection.items, sortAsc]);

  return (
    <section
      id="clubstep"
      className="relative overflow-hidden bg-[#14121f] py-24 font-syne text-white md:py-32"
    >
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-[#7448ff]"
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-[#9b7cff]">
              <Sparkles className="h-4 w-4" />
              Club Step
            </span>

            <h2 className="max-w-3xl text-5xl font-extrabold leading-[0.92] tracking-normal md:text-7xl">
              Sua loja de <span className="text-[#7448ff]">artes</span>,
              sites e apps.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
              Um hub da DevStep para comprar colecoes visuais, paginas prontas e
              solucoes digitais com visual premium, prontas para acelerar sua
              marca.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
              <a
                href={clubStepUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#7448ff]/70 bg-[#7448ff]/12 px-5 text-[11px] font-black uppercase tracking-[0.18em] text-[#b9a7ff] transition-colors duration-300 hover:bg-[#7448ff] hover:text-white"
              >
                Conhecer clubstep
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              <motion.a
                href={clubStepUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-zinc-400 transition-colors duration-300 hover:border-white/20 hover:text-zinc-100"
                whileHover={{ x: 1 }}
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[#7448ff]/35 text-[#9b7cff]">
                  <ShoppingBag className="h-3.5 w-3.5" />
                </span>
                <span>Artes, sites e apps</span>
              </motion.a>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#1d1b29] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex items-center gap-8">
                  <a
                    href={clubStepUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-black tracking-normal text-[#7448ff]"
                  >
                    clubstep
                  </a>
                  <div className="hidden items-center gap-5 text-sm font-bold text-zinc-400 md:flex">
                    {categoryOrder.map((category) => {
                      const Icon = categoryIcons[category];
                      const isActive = activeCategory === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setActiveCategory(category)}
                          className={`flex items-center gap-2 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-zinc-500 hover:text-zinc-200"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              isActive ? "text-[#7448ff]" : "text-zinc-600"
                            }`}
                          />
                          {productCategories[category].navLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <a
                    href={clubStepUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir busca na Club Step"
                    className="transition-colors duration-300 hover:text-[#7448ff]"
                  >
                    <Search className="h-5 w-5" />
                  </a>
                  <a
                    href={clubStepUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir Club Step"
                    className="transition-colors duration-300 hover:text-[#7448ff]"
                  >
                    <Moon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                <aside className="hidden border-r border-white/10 p-5 md:block">
                  <p className="mb-5 text-sm font-black text-[#7448ff]">
                    Filtros
                  </p>
                  <div className="space-y-3 text-sm font-semibold">
                    {categoryOrder.map((category) => {
                      const Icon = categoryIcons[category];

                      return (
                        <FilterButton
                          key={category}
                          active={activeCategory === category}
                          icon={Icon}
                          label={productCategories[category].sidebarLabel}
                          onClick={() => setActiveCategory(category)}
                        />
                      );
                    })}
                  </div>
                </aside>

                <div className="relative min-h-[430px] overflow-hidden p-5 sm:p-7">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-bold text-zinc-400">
                        {activeCollection.eyebrow}
                      </p>
                      <h3 className="mt-1 max-w-md text-2xl font-black leading-tight tracking-normal text-white sm:text-3xl">
                        {activeCollection.heading}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSortAsc((current) => !current)}
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white/10 px-4 text-xs font-bold text-zinc-200 transition-colors duration-300 hover:bg-[#7448ff]"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      {sortAsc ? "Ordem crescente" : "Ordem decrescente"}
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {sortedItems.map((item, index) => (
                      <ProductCard
                        key={`${activeCategory}-${item.title}`}
                        item={item}
                        index={index}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, index }) {
  return (
    <motion.article
      animate={{ y: [0, index % 2 === 0 ? -5 : 5, 0] }}
      transition={{
        duration: 4 + index,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors duration-300 hover:border-[#7448ff]/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#11101a]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute left-3 top-3 h-2 w-10 rounded-full ${item.accent}`} />
      </div>
    </motion.article>
  );
}

function FilterButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
        active
          ? "border-[#7448ff]/70 bg-[#7448ff]/15 text-white"
          : "border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-200"
      }`}
    >
      <span className={active ? "text-[#9b7cff]" : "text-[#7448ff]"}>
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </button>
  );
}
