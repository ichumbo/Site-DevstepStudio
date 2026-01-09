"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Form() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://devstep.com.br/wp-json/formulario/v1/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setSuccess("Formulário enviado com sucesso!");
        setFormData({ nome: "", email: "", mensagem: "" });
      } else {
        setSuccess("Erro ao enviar formulário");
      }
    } catch (error) {
      console.error(error);
      setSuccess("Erro ao enviar formulário");
    }
  };

  // Variants do Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white border border-zinc-100 p-8 rounded-lg shadow-sm  "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium">01 Qual seu Nome?</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="John"
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium">02 Seu Celular</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="00000000"
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium">03 Nome da Empresa</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Empresa ABC"
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-gray-700 font-medium">04 Seu Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            type="email"
            className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-gray-700 font-medium">05 Conte mais sobre seu projeto</label>
        <textarea
          name="project"
          value={formData.project}
          onChange={handleChange}
          placeholder="Anything we should know before we have a deeper chat with you"
          className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2 resize-none"
        />
      </motion.div>

      <motion.button
        type="submit"
        className="mt-4 bg-accent font-semibold tracking-wider text-white px-6 py-3 rounded-lg hover:bg-accent-foreground transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enviar Formulario
      </motion.button>

      {success && <motion.p className="text-green-600 mt-2" variants={itemVariants}>{success}</motion.p>}
    </motion.form>
  );
}