"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { projects } from "@/lib/projects-data"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const router = useRouter()

  // Memoize expensive calculations
  const uniqueTechStacks = useMemo(() => {
    const allTechStacks = projects.flatMap((project) => project.techStack)
    return [...new Set(allTechStacks)].sort()
  }, [])

  // Memoize filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTech = selectedTech ? project.techStack.includes(selectedTech) : true

      return matchesSearch && matchesTech
    })
  }, [searchTerm, selectedTech])

  const handleTechFilter = (tech: string) => {
    if (selectedTech === tech) {
      setSelectedTech(null)
    } else {
      setSelectedTech(tech)
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTech(null)
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
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-[#393E46] via-[#3a424a] to-[#393E46] relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#948979] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#948979] to-[#DFD0B8] mx-auto rounded-full" />
          <p className="text-[#DFD0B8]/80 mt-4 max-w-2xl mx-auto">
            Discover my latest work in AI, web development, and innovative solutions
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Enhanced Search and Filter Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#948979] z-10" size={18} />
                <Input
                  type="text"
                  placeholder="Search projects by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-[#222831]/50 backdrop-blur-sm border-[#948979]/40 text-[#DFD0B8] placeholder:text-[#948979]/70 rounded-xl focus:border-[#948979] focus:ring-2 focus:ring-[#948979]/20 transition-all duration-300"
                />
              </div>
              
              {(searchTerm || selectedTech) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-[#948979]/20 text-[#DFD0B8] rounded-xl hover:bg-[#948979]/30 transition-all duration-300 group"
                >
                  <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                  Clear Filters
                </motion.button>
              )}
            </div>

            {/* Tech Filter Pills */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-[#948979] text-sm font-medium mb-2">
                <Filter size={16} />
                Filter by technology:
              </div>
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {uniqueTechStacks.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4 + index * 0.03,
                      type: "spring",
                      stiffness: 200 
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={selectedTech === tech ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-full ${
                        selectedTech === tech
                          ? "bg-gradient-to-r from-[#948979] to-[#a69686] hover:from-[#948979]/90 hover:to-[#a69686]/90 text-[#222831] shadow-lg shadow-[#948979]/30"
                          : "border-[#948979]/50 text-[#DFD0B8] hover:bg-[#948979]/20 hover:border-[#948979] hover:shadow-md hover:shadow-[#948979]/20"
                      }`}
                      onClick={() => handleTechFilter(tech)}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
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

        {/* Enhanced No Results State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center mt-16 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#222831]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#948979]/20">
              <Search size={48} className="mx-auto text-[#948979]/60 mb-4" />
              <h3 className="text-xl font-semibold text-[#DFD0B8] mb-2">No projects found</h3>
              <p className="text-[#DFD0B8]/70 mb-4">
                No projects match your current search criteria. Try adjusting your filters or search terms.
              </p>
              <motion.button
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#948979] text-[#222831] rounded-lg hover:bg-[#948979]/90 transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Project Count */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[#948979]/80 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </motion.div>
      </div>
    </section>
  )
}
