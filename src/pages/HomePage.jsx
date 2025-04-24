"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import { getAllCountries } from "../services/api"
import { Earth, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { initAuth } from "../services/auth"

export default function HomePage() {
  const [featuredCountries, setFeaturedCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize authentication from localStorage if available
    initAuth()

    // Fetch some random countries for the featured section
    const fetchFeaturedCountries = async () => {
      try {
        const allCountries = await getAllCountries()

        // Get 3 random countries with population > 10 million for featured section
        const largePop = allCountries.filter((country) => country.population > 10000000)
        const shuffled = [...largePop].sort(() => 0.5 - Math.random())
        setFeaturedCountries(shuffled.slice(0, 3))
      } catch (error) {
        console.error("Error fetching featured countries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedCountries()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-explorer-800 to-earth-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Earth className="h-16 w-16 text-explorer-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Our World</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200">
            Discover countries, cultures, and facts from around the globe with our interactive explorer
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar className="mb-4" />
            <div className="flex justify-center space-x-4">
              <Link
                to="/explore"
                className="px-6 py-3 bg-white text-explorer-800 rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                Start Exploring
              </Link>
              <Link
                to="/regions"
                className="px-6 py-3 bg-explorer-600 text-white rounded-lg shadow hover:bg-explorer-700 transition-colors"
              >
                Browse by Region
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Countries</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  ))
              : featuredCountries.map((country) => (
                  <Link
                    key={country.cca3}
                    to={`/country/${country.cca3}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={country.flags.svg || "/placeholder.svg"}
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{country.name.common}</h3>
                      {country.capital && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-explorer-500" />
                          <span>{country.capital[0]}</span>
                        </div>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Region:</span> {country.region}
                      </p>
                      <button className="mt-4 px-4 py-2 bg-explorer-100 text-explorer-700 rounded-md hover:bg-explorer-200 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-earth-700 to-explorer-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover the World?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore countries, learn about different cultures, and test your geography knowledge.
          </p>
          <Link
            to="/explore"
            className="px-8 py-3 bg-white text-explorer-800 rounded-lg shadow hover:bg-gray-100 transition-colors inline-block"
          >
            Explore All Countries
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
