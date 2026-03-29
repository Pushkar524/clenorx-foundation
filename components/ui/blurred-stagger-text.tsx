"use client";

import { motion } from "motion/react";

type BlurredStaggerProps = {
  text?: string;
  className?: string;
};

export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  className = "",
}: BlurredStaggerProps) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <div>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className={className}
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.55 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};