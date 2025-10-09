"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#222831]/95 backdrop-blur-md shadow-xl border-b border-[#948979]/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={32} 
                height={32}
                className="rounded-sm"
              />
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <motion.button
                onClick={() => scrollToSection("about")}
                className="text-[#DFD0B8] hover:text-[#948979] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#948979] to-[#DFD0B8] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("experience")}
                className="text-[#DFD0B8] hover:text-[#948979] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#948979] to-[#DFD0B8] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="text-[#DFD0B8] hover:text-[#948979] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#948979] to-[#DFD0B8] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="text-[#DFD0B8] hover:text-[#948979] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#948979] to-[#DFD0B8] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              animate={isOpen ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu} 
                className={`text-[#DFD0B8] transition-all duration-300 ${
                  isOpen ? 'bg-[#948979]/20 shadow-lg' : ''
                }`}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop with blur effect */}
            <motion.div
              className="md:hidden fixed inset-0 bg-[#222831]/90 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="md:hidden bg-[#222831]/95 backdrop-blur-md border-t border-[#393E46] relative z-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md w-full text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                About
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("experience")}
                className="block px-3 py-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md w-full text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Experience
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="block px-3 py-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md w-full text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Projects
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md w-full text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Contact
              </motion.button>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  variant="outline"
                  className="border-[#948979] text-[#DFD0B8] hover:bg-[#948979]/20 w-full mt-2"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                >
                  Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
