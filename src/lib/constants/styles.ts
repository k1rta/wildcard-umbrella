/**
 * Shared style constants for consistent typography and spacing
 */

// Typography classes for headings and text with responsive design
export const HEADING_CLASSES =
  'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors'

export const SUBHEADING_CLASSES =
  'text-xl sm:text-2xl md:text-3xl font-semibold tracking-normal text-gray-800 dark:text-gray-100 transition-colors'

export const TAGLINE_CLASSES = [
  'mt-2 sm:mt-3', // Reduced spacing
  'text-center',
  'text-lg sm:text-xl md:text-2xl', // Responsive font size
  'font-light', // Lighter weight for elegance
  'tracking-wide',
  'leading-tight', // Even tighter line height
  'max-w-full', // Allow full width
  'mx-auto', // Center the text
  'whitespace-normal lg:whitespace-nowrap', // Force single line on large screens
  'px-4 sm:px-8 md:px-12', // Add padding for text container
  // Text color is handled by the Text component
  'transition-colors', // Smooth color transitions
].join(' ')

export const BODY_TEXT_CLASSES = [
  'text-sm sm:text-base md:text-lg',
  'font-normal',
  'text-gray-700 dark:text-gray-300',
  'transition-colors',
].join(' ')

// Layout spacing constants with responsive design
export const SECTION_SPACING = ['space-y-6 sm:space-y-8', 'py-4 sm:py-6 md:py-8'].join(' ')

export const CONTENT_WRAPPER = [
  'w-full',
  'max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl',
  'mx-auto',
  'px-4 sm:px-6 lg:px-8',
  'transition-all',
].join(' ')

// Container heights for text elements
export const TEXT_CONTAINER_HEIGHTS = [
  'min-h-[4rem] sm:min-h-[4.5rem] md:min-h-[5rem]', // Minimum height
  'h-auto', // Allow content to expand if needed
].join(' ')

// Spacing for icon grid section
export const ICON_GRID_SPACING = [
  'mt-6 sm:mt-8 md:mt-10', // Moderate spacing above icons
].join(' ')
