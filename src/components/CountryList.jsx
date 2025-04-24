"use client"

import { useState, useEffect } from "react"
import CountryCard from "./CountryCard"
import { getAllCountries } from "../services/api"
import { Loader } from "lucide-react"

export default function CountryList({ countries: propCountries, isLoading: propIsLoading, error: propError }) {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // If countries are provided as props, use those
    if (propCountries) {
      setCountries(propCountries)
      setIsLoading(propIsLoading || false)
      setError(propError || "")
      return
    }

    // Otherwise, fetch all countries
    const fetchCountries = async () => {
      try {
        setIsLoading(true)
        const data = await getAllCountries()
        setCountries(data)
        setError("")
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [propCountries, propIsLoading, propError])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="h-10 w-10 text-explorer-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-explorer-600 text-white rounded-md hover:bg-explorer-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (countries.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 text-lg">No countries found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
