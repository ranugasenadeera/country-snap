import { Earth, Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Earth className="h-6 w-6 text-explorer-400 mr-2" />
            <span className="text-lg font-semibold">CountrySnap</span>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="mailto:ranuga01234@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500 ju">
          <p>© 2025 CountrySnap. All rights reserved.</p>
          <p className="mt-1">Data provided by REST Countries API.</p>
        </div>
      </div>
    </footer>
  )
}
