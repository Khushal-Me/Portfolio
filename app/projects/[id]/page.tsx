import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectPageClient from "./project-page-client"
import { projects } from "@/lib/projects-data"
import { SITE_NAME, SITE_URL } from "@/lib/site-config"

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) {
    return { title: "Project not found" }
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/projects/${project.id}`,
      title: `${project.title} | ${SITE_NAME}`,
      description: project.description,
      images: [{ url: project.imageUrl, alt: `${project.title} project preview` }],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}
