"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Project } from "@/lib/projects-data"

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [direction, setDirection] = useState(0)

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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.screenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1))
  }

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

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
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
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-[#222831] border-[#948979] p-0">
        <motion.div initial="hidden" animate="visible" exit="exit" variants={variants}>
          <div className="relative">
            <div className="relative h-64 sm:h-80 md:h-96 w-full">
              {!showVideo ? (
                <>
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
                      className="absolute w-full h-full"
                    >
                      <Image
                        src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {project.videoUrl && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-4 right-4 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="h-6 w-6 text-[#DFD0B8]" />
                    </Button>
                  )}
                  {project.screenshots.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                        onClick={() => {
                          setDirection(-1)
                          prevImage()
                        }}
                      >
                        <ChevronLeft className="h-6 w-6 text-[#DFD0B8]" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                        onClick={() => {
                          setDirection(1)
                          nextImage()
                        }}
                      >
                        <ChevronRight className="h-6 w-6 text-[#DFD0B8]" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <motion.div
                  className="w-full h-full flex items-center justify-center bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <video controls className="max-h-full max-w-full" poster={project.screenshots[0]}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 bg-[#222831]/70 hover:bg-[#222831] border-[#948979]"
                    onClick={() => setShowVideo(false)}
                  >
                    <X className="h-6 w-6 text-[#DFD0B8]" />
                  </Button>
                </motion.div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-[#222831]/70 hover:bg-[#222831] text-[#DFD0B8] z-10"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-6">
            <motion.h2
              className="text-2xl font-bold text-[#DFD0B8] mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {project.title}
            </motion.h2>

            <motion.p
              className="text-[#DFD0B8]/90 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {project.longDescription}
            </motion.p>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-[#DFD0B8] mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge className="bg-[#948979] text-[#222831]">{tech}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-[#DFD0B8] mb-2">Impact</h3>
              <ul className="list-disc list-inside text-[#DFD0B8]/90">
                {project.impact.map((item, index) => (
                  <motion.li
                    key={index}
                    className="mb-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
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
                  className="bg-[#948979] hover:bg-[#948979]/80 text-[#222831] w-full sm:w-auto"
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
                  className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 w-full sm:w-auto"
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
      </DialogContent>
    </Dialog>
  )
}
