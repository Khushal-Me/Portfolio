"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section id="about" className="py-20 bg-[#393E46]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          About Me
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p className="text-lg text-[#DFD0B8] leading-relaxed mb-6 text-justify" variants={item}>
            I'm Khushal Mehta, an AI Engineer passionate about creating human-centered artificial intelligence
            solutions. With expertise in machine learning, natural language processing, and full-stack development, I
            build AI systems that solve real-world problems while prioritizing user experience.
          </motion.p>
          <motion.p className="text-lg text-[#DFD0B8] leading-relaxed mb-6 text-justify" variants={item}>
            My work focuses on developing AI applications that are not only technically robust but also intuitive and
            accessible. I believe in creating technology that enhances human capabilities rather than replacing them,
            with a particular interest in AI for productivity, and communication.
          </motion.p>
          <motion.p className="text-lg text-[#DFD0B8] leading-relaxed text-justify" variants={item}>
            When I'm not coding, you'll find me exploring the latest AI research.
            I'm constantly learning and experimenting with new technologies to push
            the boundaries of what's possible with AI!
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
