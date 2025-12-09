export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Add extra info to the error object
    const data = await res.json().catch(() => ({}))
    const apiError = error as Error & { status?: number; info?: unknown }
    apiError.status = res.status
    apiError.info = data
    throw error
  }

  return res.json()
}
