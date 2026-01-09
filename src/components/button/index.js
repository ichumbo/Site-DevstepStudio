"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export const Button = React.forwardRef(
  (
    {
      children,
      color = "blue",
      size = "medium",
      disabled = false,
      className,
      href,
      onClick,
      type = "button",
    },
    ref
  ) => {
    const colors = {
      red: "bg-pink-400 hover:bg-[#EE405D]",
      blue: "bg-blue-200 hover:bg-[#5E75EB]",
      yellow: "bg-[#E4B864] hover:bg-[#E8AB38]",
      purple: "bg-accent hover:bg-accent-foreground",
      white: "bg-white hover:bg-zinc-200 text-accent",
    };

    const sizes = {
      large: "px-4 py-3 text-md w-full rounded-2xl border-none",
      medium: "min-w-[13rem] px-4 py-2 rounded-2xl text-md",
      small: "px-6 py-2 text-md rounded-2xl",
    };

    const merged = twMerge(
      "flex items-center justify-center rounded-2xl cursor-pointer outline-none font-syne font-bold transition-colors duration-200 ease-in-out text-gray-100",
      disabled ? "bg-gray-300 cursor-not-allowed" : colors[color],
      sizes[size],
      className
    );

    const MotionTag = href ? motion.a : motion.button;

    return (
      <MotionTag
        ref={ref}
        href={href}
        onClick={onClick}
        disabled={disabled}
        type={href ? undefined : type}
        className={merged}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {children}
      </MotionTag>
    );
  }
);

Button.displayName = "Button";