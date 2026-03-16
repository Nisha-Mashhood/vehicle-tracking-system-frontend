import { useNavigate } from "react-router-dom"
import { FiEye, FiTrash2 } from "react-icons/fi"
import { type TripListItem } from "../../services/tripService"
import { metersToKm, secondsToHourMin } from "../../utils/format.utils";
import Swal from "sweetalert2";

interface TripsTableProps {
  trips: TripListItem[];
  onDelete: (id: string) => void
}

export default function TripsTable({ trips, onDelete }: TripsTableProps) {

  const navigate = useNavigate()

  const handleDelete = async(id: string) => {
    //Sweet Alert
      const result = await Swal.fire({
      title: "Delete trip?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    })

    if (result.isConfirmed) {
      onDelete(id)
      Swal.fire("Deleted!", "Trip has been removed.", "success")
    }
  }

  return (

    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Trip Name</th>
            <th className="px-4 py-2 text-left">Distance (KM)</th>
            <th className="px-4 py-2 text-left">Duration (HR)</th>
            <th className="px-4 py-2 text-left">Start Time</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr
              key={trip.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                {trip.tripName}
              </td>
              <td className="px-4 py-2">
               {metersToKm(trip.totalDistance)} Km
              </td>
              <td className="px-4 py-2">
                {secondsToHourMin(trip.tripDuration)}
              </td>
              <td className="px-4 py-2">
                {new Date(trip.startTime).toLocaleString()}
              </td>
              <td className="px-4 py-2 flex justify-center gap-4">
                <button
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEye size={18} />
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}