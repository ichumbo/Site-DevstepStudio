"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Instagram, Phone } from 'lucide-react';

export const Footer = () => {
    const items = [
        { label: "Serviços", url: "/services" },
        { label: "Sobre mim", url: "/about" },
        { label: "Contato", url: "/contact" },
    ];

    const path = usePathname();
    const [isMenuActive, setIsMenuActive] = useState(false);

    // Variantes de animação
    const container = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <footer className="bg-zinc-900 border-t border-zinc-800">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/50 via-zinc-700 to-accent/50" />
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="container mx-auto pt-24 pb-10 flex flex-col gap-10"
            >
                {/* Seções principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                    {/* Seção 1 — Empresa */}
                    <motion.div
                        custom={0}
                        variants={itemVariant}
                        className="flex flex-col gap-2.5 lg:gap-6"
                    >
                        <h3 className="text-lg text-white font-semibold uppercase tracking-wide">
                            Links Úteis
                        </h3>
                        <div className="w-full h-[1px] bg-zinc-700" />
                        <ul className="flex flex-col gap-1 font-semibold">
                            <motion.li
                                whileHover={{ x: 4, color: "#a78bfa" }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                            >
                                <Link href="#cases" className="text-[#7448ff] transition-colors">
                                    Cases
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 4, color: "#a78bfa" }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                            >
                                <Link href="#faq" className="text-[#7448ff] transition-colors">
                                    Dúvidas
                                </Link>
                            </motion.li>
                            <motion.li
                                whileHover={{ x: 4, color: "#a78bfa" }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                            >
                                <Link  href="https://wa.link/kdl2a4" className="text-[#7448ff] transition-colors">
                                    Contato
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
 
                    {/* Seção 3 — Social / Newsletter */}
                    <motion.div
                        custom={2}
                        variants={itemVariant}
                        className="flex flex-col gap-2.5 lg:gap-6"
                    >
                        <h3 className="text-lg text-white font-semibold uppercase tracking-wide">
                            Rede Sociais
                        </h3>
                        <div className="w-full h-[1px] bg-zinc-700" />

                        <div className="flex flex-col gap-4">

                            <motion.a
                                key='i'
                                href="https://www.instagram.com/devstepstudio"
                                target="_blank"
                                whileHover={{ x: 4, color: "#a78bfa" }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                                className="!text-zinc-200 hover:text-accent text-sm font-medium flex items-center gap-2 "
                            >
                                <Instagram className="text-zinc-400" /> Instagram
                            </motion.a>
                            <motion.a
                                key='i2'

                                href="https://wa.link/kdl2a4"
                                target="_blank"
                                whileHover={{ x: 4, color: "#a78bfa" }}
                                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                                className="!text-zinc-200 hover:text-accent text-sm font-medium flex items-center gap-2 "
                            >
                                <Phone className="text-zinc-400" /> WhatsApp
                            </motion.a>
                        </div>
                    </motion.div>
                </div>



                {/* Rodapé inferior */}
                <motion.div
                    variants={itemVariant}
                    custom={4}
                    className="flex flex-col lg:flex-row justify-between lg:gap-4 items-center"
                >
                    <div className="flex-1">
                        <p className="text-2xl w-6/12 text-white lg:text-4xl font-extrabold leading-tight">
                            © 2025 DevStep. <br /> Todos Direitos Reservados.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 lg:mt-0">


                        {/* Botão voltar ao topo */}
                        <motion.button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            whileHover={{
                                rotate: -10,
                                scale: 1.1,
                                backgroundColor: "#18181b",
                            }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                y: [0, -4, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "mirror",
                                duration: 2.5,
                                ease: "easeInOut",
                            }}
                            className="p-3 rounded-full border border-zinc-600 hover:border-zinc-500 transition-colors"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 19V5" stroke="white" strokeWidth="2" />
                                <path d="M5 12L12 5L19 12" stroke="white" strokeWidth="2" />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};