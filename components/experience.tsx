"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface ExperienceItem {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies: string[]
}

// Add your experience data here
const experiences: ExperienceItem[] = [
  {
    id: "1",
    title: "Machine Learning Engineer Intern",
    company: "Zintlr AI",
    location: "Remote",
    period: "May 2025 - Present",
    description: [
      "Developed and optimized deep learning models using PyTorch and TensorFlow for logistics optimization.",
      "Scaled ML inference pipelines to handle over 10,000 delivery orders in real-time.",
      "Implemented reinforcement learning and computer vision algorithms to enhance dispatch optimization.",
      "Deployed and monitored production ML models on AWS, ensuring high performance and reliability."
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS SageMaker", "AWS Lambda", "Amazon EC2", "AWS Elastic Beanstalk"],
  },
  // Add more experiences here
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section id="experience" className="py-20 bg-[#222831]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#DFD0B8] mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Experience
        </motion.h2>
        
        <motion.div
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="mb-12 last:mb-0"
              variants={item}
            >
              <div className="bg-gradient-to-br from-[#222831] to-[#1a1f26] rounded-xl p-6 shadow-xl border border-[#948979]/20 hover:border-[#948979]/60 hover:shadow-2xl hover:shadow-[#948979]/10 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-3 md:mb-0">
                    <h3 className="text-xl font-bold text-[#DFD0B8] mb-2 group-hover:text-[#948979] transition-colors duration-300">
                      {experience.title}
                    </h3>
                    <h4 className="text-lg text-[#948979] font-semibold bg-[#948979]/10 px-3 py-1 rounded-full inline-block">
                      {experience.company}
                    </h4>
                  </div>
                  <div className="flex flex-col md:items-end text-sm text-[#948979] bg-[#393E46]/50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Calendar size={16} className="mr-2 text-[#948979]" />
                      <span className="font-medium">{experience.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-[#948979]" />
                      <span className="font-medium">{experience.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="text-[#DFD0B8] mb-4 space-y-2">
                  {experience.description.map((desc, descIndex) => (
                    <li key={descIndex} className="flex items-start">
                      <span className="text-[#948979] mr-2">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
