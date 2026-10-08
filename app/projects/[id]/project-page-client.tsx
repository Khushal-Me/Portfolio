"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects-data"
import ProjectDetail from "@/components/project-detail"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import type { Project } from "@/lib/projects-data"

export default function ProjectPageClient({ project }: { project: Project }) {
  const router = useRouter()

  const handleClose = () => router.push("/#projects")

  const handleNext = () => {
    const currentIndex = projects.findIndex((item) => item.id === project.id)
    router.push(`/projects/${projects[(currentIndex + 1) % projects.length].id}`)
  }

  const handlePrevious = () => {
    const currentIndex = projects.findIndex((item) => item.id === project.id)
    const previousIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    router.push(`/projects/${projects[previousIndex].id}`)
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
