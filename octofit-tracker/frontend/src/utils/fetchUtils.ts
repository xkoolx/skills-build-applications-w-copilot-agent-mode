export async function fetchJson<T>(url: string): Promise<T[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  if (Array.isArray(json)) {
    return json as T[]
  }

  if (json && typeof json === 'object' && 'data' in json && Array.isArray((json as any).data)) {
    return (json as any).data as T[]
  }

  return [json as T]
}
