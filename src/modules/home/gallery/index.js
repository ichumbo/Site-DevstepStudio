"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/button";

// 🗂️ Projetos categorizados
const projects = [
  {
    id: 1,
    title: "Landing Page Auto Escola",
    img: "/images/artes/Advogado/2.jpg",
    category: "auto-escola",
  },
  {
    id: 2,
    title: "Site Advocacia Legal",
    img: "/images/artes/Advogado/3.jpg",
    category: "auto-escola",
  },
  {
    id: 3,
    title: "Design Jurídico",
    img: "/images/artes/Advogado/4.jpg",
    category: "auto-escola",
  },
  {
    id: 4,
    title: "Landing Page Escritório",
    img: "/images/artes/Advogado/5.jpg",
    category: "auto-escola",
  },
  {
    id: 5,
    title: "Anúncio Profissional",
    img: "/images/artes/Advogado/6.jpg",
    category: "auto-escola",
  },
  {
    id: 6,
    title: "App de Controle de Aulas",
    img: "/images/artes/Advogado/7.jpg",
    category: "auto-escola",
  },
  {
    id: 7,
    title: "Post PetShop",
    img: "/images/artes/PetShop/01.jpg",
    category: "petshop",
  },
  {
    id: 8,
    title: "Campanha PetShop",
    img: "/images/artes/PetShop/02.jpg",
    category: "petshop",
  },
  {
    id: 9,
    title: "Promoção PetShop",
    img: "/images/artes/PetShop/03.jpg",
    category: "petshop",
  },
  {
    id: 10,
    title: "Promoção PetShop",
    img: "/images/artes/PetShop/04.jpg",
    category: "petshop",
  },
  {
    id: 11,
    title: "Promoção PetShop",
    img: "/images/artes/PetShop/04.jpg",
    category: "petshop",
  },
  {
    id: 12,
    title: "Promoção PetShop",
    img: "/images/artes/PetShop/05.jpg",
    category: "petshop",
  },
  {
    id: 13,
    title: "Promoção Lanchonete",
    img: "/images/artes/Hamburgueria/01.jpg",
    category: "hamburgueria",
  },
  {
    id: 14,
    title: "Banner Lanchonete",
    img: "/images/artes/Hamburgueria/02.jpg",
    category: "hamburgueria",
  },
  {
    id: 15,
    title: "Banner Lanchonete",
    img: "/images/artes/Hamburgueria/04.jpg",
    category: "hamburgueria",
  },
  {
    id: 16,
    title: "Banner Lanchonete",
    img: "/images/artes/Hamburgueria/05.jpg",
    category: "hamburgueria",
  },
  {
    id: 17,
    title: "Banner Lanchonete",
    img: "/images/artes/Hamburgueria/06.jpg",
    category: "hamburgueria",
  },
  {
    id: 18,
    title: "Banner Lanchonete",
    img: "/images/artes/Hamburgueria/08.jpg",
    category: "hamburgueria",
  },
  {
    id: 19,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/08.jpg",
    category: "carro",
  },
  {
    id: 20,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/07.jpg",
    category: "carro",
  },
  {
    id: 21,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/06.jpg",
    category: "carro",
  },
  {
    id: 22,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/04.jpg",
    category: "carro",
  },
  {
    id: 23,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/03.jpg",
    category: "carro",
  },
  {
    id: 24,
    title: "Banner Lanchonete",
    img: "/images/artes/Carro/05.jpg",
    category: "carro",
  },
];

// 🔖 Tabs de categorias (sem “todos”)
const categories = [
  { id: "auto-escola", label: "Advogado" },
  { id: "petshop", label: "PetShop" },
  { id: "hamburgueria", label: "Lanchonete" },
  { id: "carro", label: "Seguro de Carro" },
];

export default function ProjectsGalleryTabs() {
  // Começa direto na categoria “auto-escola”
  const [activeCategory, setActiveCategory] = useState("auto-escola");

  // Filtra os projetos pela categoria ativa
  const filteredProjects = projects.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section className="relative mb-24 overflow-hidden text-zinc-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto text-center mb-16"
      >
        <h2 className="md:text-6xl text-4xl font-bold font-syne w-11/12 md:w-5/12 mx-auto mb-4">
        Nossos Pacotes com Selo DevStep
        </h2>
        <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
          Selecione uma categoria para ver as artes e projetos da DevStep Studio.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative px-5 py-2 rounded-full font-medium text-sm transition-all ${
                isActive
                  ? "bg-accent text-white"
                  : "bg-white border border-accent text-accent hover:bg-white/20"
              }`}
            >
              {cat.label}
              {isActive && (
                <motion.div
                  layoutId="tabActive"
                  className="absolute inset-0 rounded-full bg-white/20 -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Grid de projetos */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/10"
            >
              <Image
                src={project.img}
                alt={project.title}
                width={600}
                height={450}
                className="object-cover w-full h-[450px] transition-transform duration-700 group-hover:scale-110"
              />

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/60 transition-opacity duration-500"
              >
                <Button
                  color="white"
                  size="small"
                  className="rounded-[0.2rem] px-5 py-2"
                >
                  Ver Projeto
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}