import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet"
import type { GPSPoint, IdlingEvent, StoppageEvent } from "../../types/trip-types"
import L from "leaflet"

interface TripMapProps {
  points: GPSPoint[]
  idlingEvents?: IdlingEvent[];
  stoppageEvents?: StoppageEvent[];
}

/* Popup styles (Leaflet requires global CSS) */
if (typeof document !== "undefined" && !document.getElementById("trip-map-styles")) {
  const style = document.createElement("style")
  style.id = "trip-map-styles"
  style.textContent = `
    .trip-popup .leaflet-popup-content-wrapper {
      background: #1a1a2e;
      color: #fff;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.35);
    }
    .trip-popup .leaflet-popup-content {
      margin: 0;
      padding: 10px 14px;
      font-size: 13px;
    }
    .trip-popup .leaflet-popup-tip { background: #1a1a2e; }
    .leaflet-div-icon { background: transparent; border: none; }
  `
  document.head.appendChild(style)
}

/* Icon factory */

const makeCircleIcon = (fill: string, diameter = 14) => {
  const total = diameter + 6
  const cx = total / 2

  return L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${total}" height="${total}"
           viewBox="0 0 ${total} ${total}">
        <circle cx="${cx}" cy="${cx}" r="${diameter / 2 + 2}" fill="white"/>
        <circle cx="${cx}" cy="${cx}" r="${diameter / 2}" fill="${fill}"/>
      </svg>
    `,
    iconSize: [total, total],
    iconAnchor: [cx, cx],
    popupAnchor: [0, -(cx + 4)],
    className: ""
  })
}

const startIcon = makeCircleIcon("#1a73e8", 16)
const endIcon = makeCircleIcon("#03c744", 16)
const stoppageIcon = makeCircleIcon("#e53935", 13)
const idlingIcon = makeCircleIcon("#fb00ee", 13)

const getOverspeedSegments = (points: GPSPoint[]) => {
  const segs: [number, number][][] = []
  let cur: [number, number][] = []

  for (const p of points) {
    if (p.isOverspeed) cur.push([p.latitude, p.longitude])
    else {
      if (cur.length > 1) segs.push(cur)
      cur = []
    }
  }

  if (cur.length > 1) segs.push(cur)
  return segs
}

/* Legend component */

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
    <div
      className="w-3 h-3 rounded-full border-2 border-white"
      style={{ background: color, boxShadow: `0 0 0 1.5px ${color}` }}
    />
    {label}
  </div>
)

export default function TripMap({ points, idlingEvents, stoppageEvents }: TripMapProps) {

  if (!points.length) return null

  const coordinates = points.map(p => [p.latitude, p.longitude] as [number, number])

  const start = coordinates[0]
  const end = coordinates[coordinates.length - 1]

  // const idlingMarkers = getIdlingMarkers(points)
  // const stoppageMarkers = getStoppageMarkers(points)
  const overspeedSegs = getOverspeedSegments(points)

  const popupRow = (color: string, label: string) => (
    <div className="flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full"
        style={{ background: color }}
      />
      {label}
    </div>
  )

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">

      {/* Legend */}

      <div className="flex items-center gap-6 px-4 py-2 border-b bg-gray-50">
        <LegendDot color="#1a73e8" label="Start" />
        <LegendDot color="#e53935" label="Stopped" />
        <LegendDot color="#fb00ee" label="Idle" />
        <LegendDot color="#00BCD4" label="Overspeed" />
        <LegendDot color="#03c744" label="End" />
      </div>

      {/* Map */}

      <MapContainer
        center={start}
        zoom={14}
        className="h-[420px] w-full"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Full Route */}

        <Polyline
          positions={coordinates}
          pathOptions={{
            color: "#0719bb",
            weight: 5,
            opacity: 0.9
          }}
        />

        {/* Overspeed */}

        {overspeedSegs.map((seg, i) => (
          <Polyline
            key={i}
            positions={seg}
            pathOptions={{
              color: "#00E5FF",
              weight: 6,
              dashArray: "12,7"
            }}
          />
        ))}

        {/* Start */}

        <Marker position={start} icon={startIcon}>
          <Popup className="trip-popup">
            {popupRow("#1a73e8", "Trip Start")}
          </Popup>
        </Marker>

        {/* End */}

        <Marker position={end} icon={endIcon}>
          <Popup className="trip-popup">
            {popupRow("#03c744", "Trip End")}
          </Popup>
        </Marker>

        {/* Stoppages */}

        {/* {stoppageMarkers.map((p, i) => (
          <Marker key={i} position={[p.latitude, p.longitude]} icon={stoppageIcon}>
            <Popup className="trip-popup">
              {popupRow("#e53935", "Vehicle Stopped")}
            </Popup>
          </Marker>
        ))}

        {/* Idling */}

        {/* {idlingMarkers.map((p, i) => (
          <Marker key={i} position={[p.latitude, p.longitude]} icon={idlingIcon}>
            <Popup className="trip-popup">
              {popupRow("#fb00ee", "Vehicle Idling")}
            </Popup>
          </Marker>
        ))} */}

        {/* Stoppages - ONE marker per block + duration */}
        {stoppageEvents?.map((event, i) => (
          <Marker
            key={`stop-${i}`}
            position={[event.location.latitude, event.location.longitude]}
            icon={stoppageIcon}
          >
            <Popup className="trip-popup">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: "#e53935" }} />
                Vehicle Stopped
              </div>
              <div className="text-xs font-medium text-white mt-1">
                Duration: {Math.round(event.duration / 60)} minutes
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Idling - ONE marker per block + duration */}
        {idlingEvents?.map((event, i) => (
          <Marker
            key={`idle-${i}`}
            position={[event.location.latitude, event.location.longitude]}
            icon={idlingIcon}
          >
            <Popup className="trip-popup">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: "#fb00ee" }} />
                Vehicle Idling
              </div>
              <div className="text-xs font-medium text-white mt-1">
                Duration: {Math.round(event.duration / 60)} minutes
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  )
}