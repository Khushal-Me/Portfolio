"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects-data"

interface ProjectDetailProps {
  project: Project
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function ProjectDetail({ project, onClose, onNext, onPrevious }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lastScrollY = useRef(0)

  // Refs for 3D effect on buttons
  const demoButtonRef = useRef<HTMLButtonElement>(null)
  const codeButtonRef = useRef<HTMLButtonElement>(null)

  // Motion values for demo button
  const demoX = useMotionValue(0)
  const demoY = useMotionValue(0)
  const demoRotateX = useSpring(useTransform(demoY, [-20, 20], [5, -5]), { stiffness: 300, damping: 30 })
  const demoRotateY = useSpring(useTransform(demoX, [-20, 20], [-5, 5]), { stiffness: 300, damping: 30 })

  // Motion values for code button
  const codeX = useMotionValue(0)
  const codeY = useMotionValue(0)
  const codeRotateX = useSpring(useTransform(codeY, [-20, 20], [5, -5]), { stiffness: 300, damping: 30 })
  const codeRotateY = useSpring(useTransform(codeX, [-20, 20], [-5, 5]), { stiffness: 300, damping: 30 })

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current + 10) {
        setIsHeaderVisible(false)
        lastScrollY.current = currentScrollY
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 50) {
        setIsHeaderVisible(true)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.screenshots.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  // Handle mouse move for demo button
  function handleDemoMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
    if (!demoButtonRef.current) return

    const rect = demoButtonRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the button center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Update motion values
    demoX.set(event.clientX - centerX)
    demoY.set(event.clientY - centerY)
  }

  // Handle mouse move for code button
  function handleCodeMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
    if (!codeButtonRef.current) return

    const rect = codeButtonRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the button center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Update motion values
    codeX.set(event.clientX - centerX)
    codeY.set(event.clientY - centerY)
  }

  // Reset motion values on mouse leave
  function handleMouseLeave() {
    demoX.set(0)
    demoY.set(0)
    codeX.set(0)
    codeY.set(0)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-[#222831] pt-16 overflow-x-hidden">
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleFullscreen}
          >
            <motion.div
              className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              
              {/* Close button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 border-white/20 text-white"
                onClick={toggleFullscreen}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons for fullscreen */}
              {project.screenshots.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border-white/20 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 border-white/20 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image counter */}
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {project.screenshots.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-[#222831] border-b border-[#393E46] h-16 flex items-center px-4"
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -64 }}
        transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <Button variant="ghost" className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent"
            onClick={onNext}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-hidden"
        >
          <div className="relative rounded-lg overflow-hidden mb-8">
            <div className="relative aspect-video w-full max-w-5xl mx-auto" style={{ maxHeight: '500px' }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full h-full cursor-pointer"
                  onClick={toggleFullscreen}
                >
                  <Image
                    src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Fullscreen indicator */}
                  <div className="absolute top-2 left-2 bg-black/50 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                    </svg>
                  </div>
                </motion.div>
              </AnimatePresence>

              {project.screenshots.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-[#DFD0B8]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-[#DFD0B8]" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="lg:col-span-2">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {project.title}
              </motion.h1>

              <motion.p
                className="text-[#DFD0B8]/90 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {project.longDescription}
              </motion.p>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-[#DFD0B8] mb-2">Impact</h3>
                <ul className="list-disc list-inside text-[#DFD0B8]/90">
                  {project.impact.map((item, index) => (
                    <motion.li
                      key={index}
                      className="mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                className="bg-[#393E46] rounded-lg p-6 mb-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-[#DFD0B8] mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Badge className="bg-[#948979] text-[#222831]">{tech}</Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  style={{
                    rotateX: demoRotateX,
                    rotateY: demoRotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Button
                    ref={demoButtonRef}
                    className="bg-[#948979] hover:bg-[#948979]/80 text-[#222831] w-full"
                    onClick={() => window.open(project.demoUrl, "_blank")}
                    onMouseMove={handleDemoMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </motion.div>

                <motion.div
                  style={{
                    rotateX: codeRotateX,
                    rotateY: codeRotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Button
                    ref={codeButtonRef}
                    variant="outline"
                    className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 w-full"
                    onClick={() => window.open(project.repoUrl, "_blank")}
                    onMouseMove={handleCodeMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 border-t border-[#393E46] pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent"
                onClick={onPrevious}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Project
              </Button>
              <Button
                variant="ghost"
                className="text-[#DFD0B8] hover:text-[#948979] hover:bg-transparent"
                onClick={onNext}
              >
                Next Project
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
