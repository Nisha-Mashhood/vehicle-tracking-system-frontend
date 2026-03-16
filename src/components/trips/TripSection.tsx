import { useEffect, useState } from "react"
import { useTrips } from "../../hooks/useTrip"
import TripsTable from "./TripsTable"

interface Props{
  refreshTrips: boolean;
}
export default function TripsSection({refreshTrips} : Props) {

  const { data, loading, fetchTrips, deleteTrip } = useTrips()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetchTrips(page, limit, search, filter)
  }, [page, limit, search, filter, refreshTrips, fetchTrips])

  return (

    <div className="bg-white shadow-lg rounded-lg p-6">

      <h3 className="text-lg font-semibold mb-4">
        Trips
      </h3>

      {/* Search + Filter */}

      <div className="flex gap-4 mb-4">

        <input
          type="text"
          placeholder="Search trip name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-60"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          <option value="idling">Idling</option>
          <option value="overspeed">Overspeed</option>
          <option value="stoppage">Stoppage</option>
        </select>

      </div>


      {/* Trips per page */}

      <div className="mb-4">
        <label className="mr-2">Trips per page:</label>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value))
            setPage(1)
          }}
          className="border rounded-md px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>


      {loading && <p>Loading trips...</p>}

      {data && <TripsTable 
      trips={data.trips} 
      onDelete={deleteTrip}
      />}


      {/* Pagination */}

      {data && (

        <div className="flex justify-between items-center mt-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {data.page} of {data.totalPages}
          </span>

          <button
            disabled={page === data.totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  )
}