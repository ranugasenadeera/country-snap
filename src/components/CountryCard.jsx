"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, MapPin } from "lucide-react"
import { isAuthenticated, getCurrentUser, addFavoriteCountry, removeFavoriteCountry } from "../services/auth"

export default function CountryCard({ country }) {
  const user = getCurrentUser()
  const isFavorite = user?.favoriteCountries.includes(country.cca3) || false
  const [favorite, setFavorite] = useState(isFavorite)
  const [isLoading, setIsLoading] = useState(false)

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
  }

  const handleFavoriteToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated()) {
      alert("Please login to save favorite countries")
      return
    }

    setIsLoading(true)
    try {
      if (favorite) {
        await removeFavoriteCountry(country.cca3)
        setFavorite(false)
      } else {
        await addFavoriteCountry(country.cca3)
        setFavorite(true)
      }
    } catch (error) {
      console.error("Failed to update favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={country.flags.svg || "/placeholder.svg"}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {isAuthenticated() && (
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              favorite ? "bg-yellow-400 text-yellow-900" : "bg-white/80 text-gray-500 hover:text-yellow-500"
            } transition-colors`}
          >
            <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{country.name.common}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          {country.capital && country.capital.length > 0 && (
            <p className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-explorer-500" />
              {country.capital[0]}
            </p>
          )}
          <p>
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-medium">Population:</span> {formatPopulation(country.population)}
          </p>
        </div>
      </div>
    </Link>
  )
}
