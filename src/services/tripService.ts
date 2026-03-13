import axiosInstance from "../api/axiosInstance"

export const uploadTrip = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await axiosInstance.post( "/trips/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )
  return response.data
}