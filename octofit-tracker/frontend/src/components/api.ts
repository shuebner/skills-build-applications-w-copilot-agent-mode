export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'
export const buildApiUrl = (endpoint: string) => `${apiBaseUrl}/${endpoint}`

export const normalizeApiResponse = (data: unknown) => {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>

    if (Array.isArray(record.items)) {
      return record.items
    }
    if (Array.isArray(record.results)) {
      return record.results
    }

    const arrays = Object.values(record).filter(Array.isArray)
    if (arrays.length === 1) {
      return arrays[0] as unknown[]
    }
  }

  return []
}
