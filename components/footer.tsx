export default function Footer() {
  return (
    <footer className="py-6 bg-[#222831] border-t border-[#393E46]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-[#DFD0B8]/70">
            &copy; {new Date().getFullYear()} Khushal Mehta. All rights reserved.
          </p>
          <p className="text-sm text-[#DFD0B8]/70 mt-2 sm:mt-0">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
