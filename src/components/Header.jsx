import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, Menu, X, Earth, LogIn, User } from "lucide-react"
import { isAuthenticated, logout, getCurrentUser } from "../services/auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const user = getCurrentUser()
  const authenticated = isAuthenticated()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Earth className="h-6 w-6 text-explorer-800" />
            <span className="text-xl font-bold text-explorer-800">CountrySnap</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-explorer-800 hover:text-explorer-600 transition-colors ${
                location.pathname === "/" ? "text-explorer-800 font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`text-explorer-800 hover:text-explorer-600 transition-colors ${
                location.pathname === "/explore" ? "text-explorer-800 font-bold" : ""
              }`}
            >
              Explore
            </Link>
            {authenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-explorer-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user?.username}</span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-explorer-600 hover:text-explorer-700 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for a country..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-explorer-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-explorer-600 text-white rounded-r-md hover:bg-explorer-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <button
                onClick={() => {
                  toggleSearch()
                  setIsMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Search
              </button>
              {authenticated ? (
                <>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-explorer-600 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
