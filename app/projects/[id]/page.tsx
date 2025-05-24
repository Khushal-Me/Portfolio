"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects-data"
import ProjectDetail from "@/components/project-detail"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import type { Project } from "@/lib/projects-data"

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params)

  useEffect(() => {
    const foundProject = projects.find((p) => p.id === unwrappedParams.id)
    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push("/#projects")
    }
    setIsLoading(false)
  }, [unwrappedParams.id, router])

  const handleClose = () => {
    router.push("/#projects")
  }

  const handleNext = () => {
    if (!project) return

    const currentIndex = projects.findIndex((p) => p.id === project.id)
    const nextIndex = (currentIndex + 1) % projects.length
    router.push(`/projects/${projects[nextIndex].id}`)
  }

  const handlePrevious = () => {
    if (!project) return

    const currentIndex = projects.findIndex((p) => p.id === project.id)
    const previousIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    router.push(`/projects/${projects[previousIndex].id}`)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#222831]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#DFD0B8]"
        >
          <div className="w-16 h-16 border-4 border-[#948979] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollProgressBar />
        <ProjectDetail project={project} onClose={handleClose} onNext={handleNext} onPrevious={handlePrevious} />
      </motion.div>
    </AnimatePresence>
  )
}
