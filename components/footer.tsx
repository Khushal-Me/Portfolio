"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="py-6 bg-[#222831] border-t border-[#393E46]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <motion.p 
            className="text-sm text-[#DFD0B8]/70 hover:text-[#DFD0B8] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            &copy; {new Date().getFullYear()} Khushal Mehta. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-sm text-[#DFD0B8]/70 hover:text-[#DFD0B8] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            Built with Next.js and Tailwind CSS
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
