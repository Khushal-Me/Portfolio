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
    title: "Software Engineer, AI",
    company: "Enterprise Logistics Platform (Stealth)",
    location: "United States (Remote)",
    period: "May 2026 - Present",
    description: [
      "Architected an AI-powered supply chain integration layer connecting enterprise ERP data to an LLM natural language interface, reducing complex logistics query times from hours to under 2 seconds across 1M+ daily data points.",
      "Designed unified data schemas and RAG retrieval pipelines, cutting custom client integration overhead by 40% while maintaining 95%+ retrieval accuracy.",
      "Engineered scalable data pipelines and AI integrations across 10+ enterprise client deployments, processing 2TB+ of daily telemetry data at 99.9% uptime.",
      "Served as primary technical liaison for North American deployments, slashing client onboarding time from 6 weeks to 10 days and accelerating sales deal cycles by 30%.",
    ],
    technologies: ["Python", "LLM", "RAG", "ERP", "AI Integrations", "Data Pipelines"],
  },
  {
    id: "2",
    title: "AI Engineer Intern",
    company: "Zintlr AI",
    location: "Remote",
    period: "May 2025 - December 2025",
    description: [
      "Engineered a real-time ML optimization pipeline on AWS (SageMaker, EC2, S3), cutting infrastructure costs by 30% via automated scaling.",
      "Developed Python microservices on AWS Lambda and DynamoDB serving AI features, processing 10,000+ daily payloads at sub-second p99 latency.",
      "Built Pytest unit and integration suites (90% coverage) and automated CI/CD with GitHub Actions.",
      "Monitored production AI services with AWS CloudWatch, sustaining 99.9% uptime.",
    ],
    technologies: ["Python", "AWS SageMaker", "AWS EC2", "AWS S3", "AWS Lambda", "DynamoDB", "Pytest", "GitHub Actions", "AWS CloudWatch"],
  },
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
