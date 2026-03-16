import { useCallback, useState } from "react"
import { getTrips, type TripPaginationResponse, deleteTrip as deleteTripAPI } from "../services/tripService"

export const useTrips = () => {

  const [data, setData] = useState<TripPaginationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTrips = useCallback(
        async (
            page: number,
            limit: number,
            search?: string,
            filter?: string
        ) => {
            try {
            setLoading(true)
            setError(null)

            const result = await getTrips(page, limit, search, filter)

            setData(result)

            } catch {
            setError("Failed to fetch trips")
            } finally {
            setLoading(false)
            }
        },
        []
        )

        const deleteTrip = useCallback(async (tripId: string) => {
            try {
             await deleteTripAPI(tripId)
                 setData((prev) => {
                    if (!prev) return prev
                return {
                    ...prev,
                    trips: prev.trips.filter((trip) => trip.id !== tripId)
                }
            })
        } catch {
        setError("Failed to delete trip")
    }
    }, [])

  return { data, loading, error, fetchTrips, deleteTrip }

}
