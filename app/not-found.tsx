import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222831] text-[#DFD0B8] p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-[#948979] mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button className="bg-[#948979] hover:bg-[#948979]/80 text-[#222831]" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
