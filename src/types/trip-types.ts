export interface GPSPoint {
  latitude: number
  longitude: number
  timestamp: string
  ignition: boolean
  speed: number
  isOverspeed: boolean
  isIdling: boolean
  isStoppage: boolean
}

export interface OverspeedEvent {
  startTime: string
  endTime: string
  startLocation: {
    latitude: number
    longitude: number
  }
  endLocation: {
    latitude: number
    longitude: number
  }
  maxSpeed: number
}

export interface StoppageEvent {
  startTime: string
  endTime: string
  duration: number
  location: {
    latitude: number
    longitude: number
  }
}

export interface IdlingEvent {
  startTime: string
  endTime: string
  duration: number
  location: {
    latitude: number
    longitude: number
  }
}


export interface TripDetails {
  id: string
  tripName: string

  totalDistance: number
  tripDuration: number

  totalIdling: number
  totalStoppage: number

  overspeedCount: number
  maxSpeed: number

  gpsPoints: GPSPoint[]

  overspeedEvents: OverspeedEvent[]
  stoppageEvents: StoppageEvent[]
  idlingEvents: IdlingEvent[]
}
