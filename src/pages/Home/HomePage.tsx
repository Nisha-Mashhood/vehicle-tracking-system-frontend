import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "../../utils/auth.utils"
import { useLogout } from "../../hooks/useLogout"
import { useUploadTrip } from "../../hooks/useUploadTrip"
import TripsSection from "../../components/trips/TripSection"
import logo from "../../assets/logo.png"
import { toast } from "react-toastify"

interface UploadFormValues {
  tripName: string
  file: FileList
}

export default function HomePage() {
  const [refreshTrips, setRefreshTrips] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UploadFormValues>()

  const { logout } = useLogout()
  const { upload, loading, error } = useUploadTrip()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/")
    }
  }, [navigate])

  const onSubmit = async (data: UploadFormValues) => {
    try {
      const file = data.file[0]
      const tripName = data.tripName

      await upload(file, tripName)

      toast.success("Trip uploaded successfully")
      reset();
      setRefreshTrips(prev => !prev)
    } catch {
      // handled in hook
    }
  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

        <h2 className="text-xl font-semibold text-gray-700">
          <img src={logo} alt="logo" className="w-16 mb-2" />
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>

      </div>


      <div className="max-w-4xl mx-auto mt-10">

        {/* Upload Card */}

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">

          <h3 className="text-lg font-semibold mb-4">
            Upload GPS CSV File
          </h3>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded mb-4">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Trip Name */}

            <div>
              <input
                type="text"
                placeholder="Enter Trip Name"
                {...register("tripName", {
                  required: "Trip name is required"
                })}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {errors.tripName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tripName.message}
                </p>
              )}
            </div>


            {/* CSV File */}

            <div>
              <input
                type="file"
                accept=".csv"
                {...register("file", {
                  required: "CSV file is required"
                })}
                className="w-full border rounded-md px-3 py-2"
              />

              {errors.file && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.file.message}
                </p>
              )}
            </div>


            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              {loading ? "Uploading..." : "Upload Trip"}
            </button>
          </form>

        </div>

        {/* Trips Table */}
        <TripsSection refreshTrips={refreshTrips} />
      </div>
    </div>
  )
}