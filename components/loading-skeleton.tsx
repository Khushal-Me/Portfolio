"use client"

import { motion } from "framer-motion"

export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="skeleton h-10 w-64 mx-auto mb-4 rounded-lg" />
        <div className="skeleton h-4 w-96 mx-auto mb-2 rounded-lg" />
        <div className="skeleton h-4 w-80 mx-auto rounded-lg" />
      </div>

      {/* Search skeleton */}
      <div className="max-w-md mx-auto mb-8">
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>

      {/* Filter pills skeleton */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-8 w-16 rounded-full" />
        ))}
      </div>

      {/* Project cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-[#222831] to-[#1a1f26] rounded-xl overflow-hidden border border-[#948979]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="skeleton h-48 w-full" />
            <div className="p-6">
              <div className="skeleton h-6 w-3/4 mb-3 rounded" />
              <div className="skeleton h-4 w-full mb-2 rounded" />
              <div className="skeleton h-4 w-5/6 mb-4 rounded" />
              <div className="flex gap-2">
                <div className="skeleton h-6 w-16 rounded-full" />
                <div className="skeleton h-6 w-20 rounded-full" />
                <div className="skeleton h-6 w-12 rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#222831] to-[#1a1f26] rounded-xl overflow-hidden border border-[#948979]/20 h-full">
      <div className="skeleton h-48 w-full" />
      <div className="p-6">
        <div className="skeleton h-6 w-3/4 mb-3 rounded" />
        <div className="skeleton h-4 w-full mb-2 rounded" />
        <div className="skeleton h-4 w-5/6 mb-4 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}
