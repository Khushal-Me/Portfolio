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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#948979]/10 via-[#948979]/20 to-[#948979]/10 z-[100] backdrop-blur-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#948979] via-[#DFD0B8] to-[#948979] relative"
        style={{
          scaleX,
          transformOrigin: "0%",
        }}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#948979] via-[#DFD0B8] to-[#948979] blur-sm"
          style={{
            opacity: glowOpacity,
            scaleY: 3,
          }}
        />
        
        {/* Subtle moving shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "20%",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
