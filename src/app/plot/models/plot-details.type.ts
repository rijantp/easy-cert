export type PlotDetails = {
  plotName: string
  ownership: string
  description: string
  latitude: string
  longitude: string
  unAllowedApplicationsDate: Date | string
  totalSurfaceArea: string
  usedSurface: string
  conventionalArea: string
  irrigation: string
  conversionStart: Date | string
  contractStart?: Date | string
  contractEnd?: Date | string
}
