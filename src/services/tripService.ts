import axiosInstance from "../api/axiosInstance"
import type { TripDetails } from "../types/trip-types"

export interface TripListItem {
  id: string
  tripName: string
  totalDistance: number
  tripDuration: number
  startTime: string
  endTime: string
}

export interface TripPaginationResponse {
  trips: TripListItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const uploadTrip = async (formData: FormData) => {
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

export const getTrips = async (
    page: number,
    limit: number,
    search?: string,
    filter?: string
  ): Promise<TripPaginationResponse> => {

    const response = await axiosInstance.get("/trips/alltrips", {
      params: {
        page,
        limit,
        search,
        filter
      }
    })
    return response.data.data
  }

  export const getTripDetails = async ( tripId: string ): Promise<TripDetails> => {
  const response = await axiosInstance.get(`/trips/details/${tripId}`)
  return response.data.data
}

export const deleteTrip = async (tripId: string) => {
  const response = await axiosInstance.delete(`/trips/delete/${tripId}`)
  return response.data
}