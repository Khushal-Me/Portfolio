"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Refs for social buttons
  const githubRef = useRef<HTMLDivElement>(null)
  const linkedinRef = useRef<HTMLDivElement>(null)

  // Motion values for GitHub button
  const githubX = useMotionValue(0)
  const githubY = useMotionValue(0)
  const githubRotateX = useSpring(useTransform(githubY, [-20, 20], [10, -10]), { stiffness: 300, damping: 30 })
  const githubRotateY = useSpring(useTransform(githubX, [-20, 20], [-10, 10]), { stiffness: 300, damping: 30 })

  // Motion values for LinkedIn button
  const linkedinX = useMotionValue(0)
  const linkedinY = useMotionValue(0)
  const linkedinRotateX = useSpring(useTransform(linkedinY, [-20, 20], [10, -10]), { stiffness: 300, damping: 30 })
  const linkedinRotateY = useSpring(useTransform(linkedinX, [-20, 20], [-10, 10]), { stiffness: 300, damping: 30 })

  // Handle mouse move for GitHub button
  function handleGithubMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!githubRef.current) return

    const rect = githubRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the button center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Update motion values
    githubX.set(event.clientX - centerX)
    githubY.set(event.clientY - centerY)
  }

  // Handle mouse move for LinkedIn button
  function handleLinkedinMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!linkedinRef.current) return

    const rect = linkedinRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the button center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Update motion values
    linkedinX.set(event.clientX - centerX)
    linkedinY.set(event.clientY - centerY)
  }

  // Reset motion values on mouse leave
  function handleMouseLeave() {
    githubX.set(0)
    githubY.set(0)
    linkedinX.set(0)
    linkedinY.set(0)
  }

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
    <section id="contact" className="py-20 bg-[#393E46]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="max-w-md mx-auto text-center"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p className="text-lg text-[#DFD0B8] mb-8" variants={item}>
            I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!
          </motion.p>

          <motion.div className="flex flex-col gap-4" variants={item}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ perspective: 1000 }}>
              <Button
                variant="outline"
                className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 flex items-center justify-center gap-2 w-full"
                onClick={() => (window.location.href = "mailto:khushaldemehta@gmail.com")}
              >
                <Mail className="h-5 w-5" />
                khushaldemehta@gmail.com
              </Button>
            </motion.div>

            <motion.div className="flex gap-4 justify-center" variants={item} style={{ perspective: 1000 }}>
              <motion.div
                ref={githubRef}
                style={{
                  rotateX: githubRotateX,
                  rotateY: githubRotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleGithubMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 h-12 w-12"
                  onClick={() => window.open("https://github.com/Khushal-Me", "_blank")}
                >
                  <motion.div style={{ transform: "translateZ(5px)" }}>
                    <Github className="h-6 w-6" />
                  </motion.div>
                  <span className="sr-only">GitHub</span>
                </Button>
              </motion.div>

              <motion.div
                ref={linkedinRef}
                style={{
                  rotateX: linkedinRotateX,
                  rotateY: linkedinRotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleLinkedinMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 h-12 w-12"
                  onClick={() => window.open("https://www.linkedin.com/in/khushal-mehta/", "_blank")}
                >
                  <motion.div style={{ transform: "translateZ(5px)" }}>
                    <Linkedin className="h-6 w-6" />
                  </motion.div>
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
