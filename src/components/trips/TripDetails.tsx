import { useParams } from "react-router-dom"
import { useTripDetails } from "../../hooks/useTripDetails"
import { metersToKm, secondsToHourMin, secondsToMinutes } from "../../utils/format.utils"
import TripMap from "./TripMap"
import { useState } from "react"
import GPSPointsTable from "./GPSPointSection"

export default function TripDetailsPage() {

  const [page, setPage] = useState(1)
  const limit = 10

  const { tripId } = useParams()
  const { trip, loading, error } = useTripDetails(tripId)

  if (loading) return <p className="text-center mt-10">Loading trip...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>
  if (!trip) return null

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedPoints = trip.gpsPoints.slice(startIndex, endIndex)
  const totalPages = Math.ceil(trip.gpsPoints.length / limit)

  return (

    <div className="max-w-6xl mx-auto mt-8 px-4">

      {/* Trip Title */}

      <h2 className="text-2xl font-semibold mb-6">
        {trip.tripName}
      </h2>


      {/* Map */}

      <div className="mb-8">
        <TripMap 
        points={trip.gpsPoints} 
        idlingEvents={trip.idlingEvents}
        stoppageEvents={trip.stoppageEvents}
        />
      </div>


      {/* Trip Summary */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Distance</p>
          <p className="text-lg font-semibold">
            {metersToKm(trip.totalDistance)} km
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Duration</p>
          <p className="text-lg font-semibold">
            {secondsToHourMin(trip.tripDuration)}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Max Speed</p>
          <p className="text-lg font-semibold">
            {trip.maxSpeed} km/h
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Idling Time</p>
          <p className="text-lg font-semibold">
            {secondsToMinutes(trip.totalIdling)} mins
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Stoppage Time</p>
          <p className="text-lg font-semibold">
            {secondsToMinutes(trip.totalStoppage)} mins
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Overspeed Events</p>
          <p className="text-lg font-semibold">
            {trip.overspeedEvents?.length || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Stoppage Events</p>
          <p className="text-lg font-semibold">
            {trip.stoppageEvents?.length || 0}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-500 text-sm">Idling Events</p>
          <p className="text-lg font-semibold">
            {trip.idlingEvents?.length || 0}
          </p>
        </div>

      </div>


      {/* GPS Points Table */}

      <div className="bg-white shadow rounded-lg p-6">

        <h3 className="text-lg font-semibold mb-4">
          GPS Points
        </h3>

        <GPSPointsTable points={paginatedPoints} />

      </div>


      {/* Pagination */}

      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  )
}