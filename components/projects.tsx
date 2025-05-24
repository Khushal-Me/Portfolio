"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { projects } from "@/lib/projects-data"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const router = useRouter()

  // Get all unique tech stack items
  const allTechStacks = projects.flatMap((project) => project.techStack)
  const uniqueTechStacks = [...new Set(allTechStacks)].sort()

  // Filter projects based on search term and selected tech
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTech = selectedTech ? project.techStack.includes(selectedTech) : true

    return matchesSearch && matchesTech
  })

  const handleTechFilter = (tech: string) => {
    if (selectedTech === tech) {
      setSelectedTech(null)
    } else {
      setSelectedTech(tech)
    }
  }

  interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    // Add other fields if present in your project object
  }

  interface ProjectCardProps {
    project: Project
    onClick: () => void
    index: number
    isInView: boolean
  }

  const handleProjectClick = (project: Project) => {
    // Navigate to the project page instead of showing modal
    router.push(`/projects/${project.id}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section id="projects" className="py-20 bg-[#222831]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#948979]" size={18} />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#393E46] border-[#948979] text-[#DFD0B8] placeholder:text-[#948979]/70"
            />
          </div>

          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {uniqueTechStacks.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedTech === tech ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTech === tech
                      ? "bg-[#948979] hover:bg-[#948979]/80 text-[#222831]"
                      : "border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20"
                  }`}
                  onClick={() => handleTechFilter(tech)}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center text-[#DFD0B8] mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            No projects found matching your criteria.
          </motion.div>
        )}
      </div>
    </section>
  )
}
