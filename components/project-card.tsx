"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
  isInView: boolean
}

export default function ProjectCard({ project, onClick, index, isInView }: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: 0.1 * index,
      },
    },
  }

  return (
    <motion.div variants={item}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="cursor-pointer"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-[#222831] to-[#1a1f26] border-[#948979]/30 hover:border-[#948979] transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-[#948979]/20 group">
          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/80 via-transparent to-transparent z-10" />
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-[#948979]/90 text-[#222831] font-semibold">
                {project.techStack[0]}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-[#DFD0B8] mb-3 group-hover:text-[#948979] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-[#DFD0B8]/80 mb-4 line-clamp-3 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="border-[#948979]/50 text-[#DFD0B8]/70 hover:bg-[#948979]/20 transition-colors duration-300">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="border-[#948979]/50 text-[#DFD0B8]/70 bg-[#948979]/10">
                  +{project.techStack.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
