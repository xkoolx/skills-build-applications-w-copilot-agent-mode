export async function fetchJson<T>(url: string): Promise<T[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  if (Array.isArray(json)) {
    return json as T[]
  }

  if (json && typeof json === 'object') {
    if ('data' in json && Array.isArray((json as any).data)) {
      return (json as any).data as T[]
    }

    const arrayKey = Object.keys(json).find((key) => Array.isArray((json as any)[key]))
    if (arrayKey) {
      return (json as any)[arrayKey] as T[]
    }
  }

  return [json as T]
}
