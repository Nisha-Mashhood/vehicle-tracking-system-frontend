import { useEffect, useState } from "react"
import { getTripDetails } from "../services/tripService"
import type { TripDetails } from "../types/trip-types"

export const useTripDetails = (tripId?: string) => {

  const [trip, setTrip] = useState<TripDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    if (!tripId) return
    const fetchTrip = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getTripDetails(tripId)
        setTrip(data)
      } catch {
        setError("Failed to fetch trip details")
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [tripId])

  return { trip, loading, error }
}