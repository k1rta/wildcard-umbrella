'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
        <button
          onClick={reset}
          className="rounded-md bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
