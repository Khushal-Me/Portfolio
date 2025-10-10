"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollProgressBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Add spring physics for smoother animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  // Create a glowing effect based on scroll progress
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])

  // Only show progress bar after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#948979]/10 z-[100] group"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      title="Reading Progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#948979] via-[#DFD0B8] to-[#948979] shadow-[0_0_10px_rgba(148,137,121,0.5)]"
        style={{
          scaleX,
          transformOrigin: "0%",
          opacity: glowOpacity,
        }}
      />
    </motion.div>
  )
}
