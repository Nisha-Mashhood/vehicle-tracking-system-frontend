import type { GPSPoint } from "../../types/trip-types"

interface GPSPointsTableProps {
  points: GPSPoint[]
}

export default function GPSPointsTable({ points }: GPSPointsTableProps) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

        <thead className="bg-gray-100 text-sm text-gray-700">

          <tr>
            <th className="px-4 py-2 text-left border-b">Time</th>
            <th className="px-4 py-2 text-left border-b">Latitude</th>
            <th className="px-4 py-2 text-left border-b">Longitude</th>
            <th className="px-4 py-2 text-left border-b">Ignition</th>
            <th className="px-4 py-2 text-left border-b">Speed (km/h)</th>
          </tr>

        </thead>

        <tbody className="text-sm">

          {points.map((p, i) => (

            <tr
              key={i}
              className="border-b hover:bg-gray-50"
            >

              <td className="px-4 py-2">
                {new Date(p.timestamp).toLocaleTimeString()}
              </td>

              <td className="px-4 py-2">
                {p.latitude}
              </td>

              <td className="px-4 py-2">
                {p.longitude}
              </td>

              <td className="px-4 py-2">

                {p.ignition ? (
                  <span className="text-green-600 font-medium">
                    ON
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">
                    OFF
                  </span>
                )}

              </td>

              <td className="px-4 py-2">
                {p.speed.toFixed(2)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}