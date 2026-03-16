import { useState } from "react"
import { uploadTrip } from "../services/tripService"

export const useUploadTrip = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = async (file: File, tripName: string) => {
    try {
      setLoading(true)
      setError(null)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tripName", tripName);
      const response = await uploadTrip(formData)
      return response
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Upload failed")
      }
      throw err
    } finally {
      setLoading(false)
    }
  }
  return { upload, loading, error }
}