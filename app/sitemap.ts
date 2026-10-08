import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects-data"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
