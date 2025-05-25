"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const taglines = [
    "Building human-first AI",
    "Crafting intelligent solutions",
    "Bridging AI and human needs",
    "Developing AI with purpose",
    "Innovating for a better tomorrow",
    "Empowering through technology",
    "Transforming ideas into reality",
    "Designing the future of AI",
    "Engineering intelligent systems",
    "Shaping the next generation of technology",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#222831]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#DFD0B8] mb-6" variants={item}>
            Khushal Mehta
          </motion.h1>
          <motion.div className="h-16" variants={item}>
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-[#948979] mb-8"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-4 mt-8" variants={item}>
            <Button onClick={scrollToProjects} className="bg-[#948979] hover:bg-[#948979]/80 text-[#222831]">
              View Projects
            </Button>
            <Button
              variant="outline"
              className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
             View Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const aboutSection = document.getElementById("about")
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent"
          >
            <ArrowDown size={24} />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
