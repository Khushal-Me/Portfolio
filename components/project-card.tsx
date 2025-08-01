"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
  isInView: boolean
}

export default function ProjectCard({ project, onClick, index, isInView }: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.08 * index,
      },
    },
  }

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div variants={item}>
      <motion.div
        variants={hoverVariants}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="cursor-pointer group"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-[#222831] via-[#1f252c] to-[#1a1f26] border-[#948979]/20 hover:border-[#948979]/60 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-[#948979]/20 relative">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#948979]/5 via-transparent to-[#DFD0B8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative h-52 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-[#222831]/20 to-transparent z-10" />
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700 group-hover:scale-105"
              priority={index < 3} // Prioritize first 3 images
            />
            
            {/* Floating action buttons */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#222831]/80 backdrop-blur-sm rounded-full hover:bg-[#948979] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} className="text-[#DFD0B8]" />
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#222831]/80 backdrop-blur-sm rounded-full hover:bg-[#948979] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} className="text-[#DFD0B8]" />
                </motion.a>
              )}
            </div>
          </div>
          
          <CardContent className="p-6 flex-grow relative z-10">
            <h3 className="text-xl font-bold text-[#DFD0B8] mb-3 group-hover:text-[#948979] transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-[#DFD0B8]/80 mb-6 line-clamp-3 leading-relaxed group-hover:text-[#DFD0B8]/90 transition-colors duration-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech, techIndex) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                >
                  <Badge 
                    variant="outline" 
                    className="border-[#948979]/40 text-[#DFD0B8]/80 hover:bg-[#948979]/20 hover:border-[#948979]/60 transition-all duration-300 text-xs px-3 py-1"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="border-[#948979]/40 text-[#948979] bg-[#948979]/10 text-xs px-3 py-1">
                  +{project.techStack.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          
          {/* Subtle bottom gradient indicator */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#948979]/50 to-transparent group-hover:via-[#948979] transition-all duration-500" />
        </Card>
      </motion.div>
    </motion.div>
  )
}
