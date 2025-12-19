import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function for merging Tailwind CSS classes with proper deduplication
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  // First merge with clsx to handle conditionals and arrays
  const mergedWithClsx = clsx(inputs)

  // Then use tailwind-merge to handle conflicts and duplicates
  const result = twMerge(mergedWithClsx)

  // Split into array, remove duplicates, and rejoin
  return [...new Set(result.split(' '))].join(' ')
}
