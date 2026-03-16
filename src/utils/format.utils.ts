

export const metersToKm = (meters: number) => {
  return (meters / 1000).toFixed(2)
}

export const secondsToMinutes = (seconds: number) => {
  return Math.floor(seconds / 60)
}

export const secondsToHourMin = (seconds: number) => {

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  return `${hours}h ${minutes}m`
}
