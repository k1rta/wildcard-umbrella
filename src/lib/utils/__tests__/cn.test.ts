import { cn } from '../cn'

describe('cn utility', () => {
  describe('Basic functionality', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle single class name', () => {
      expect(cn('foo')).toBe('foo')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    it('should handle undefined and null values', () => {
      expect(cn('foo', undefined, 'bar', null)).toBe('foo bar')
    })
  })

  describe('Conditional classes', () => {
    it('should handle boolean conditions', () => {
      expect(cn('base', true && 'true-class', false && 'false-class')).toBe('base true-class')
    })

    it('should handle object syntax', () => {
      expect(
        cn({
          foo: true,
          bar: false,
          baz: true,
        })
      ).toBe('foo baz')
    })

    it('should handle mixed syntax', () => {
      expect(cn('base', { active: true, disabled: false }, 'extra')).toBe('base active extra')
    })
  })

  describe('Tailwind CSS conflicts', () => {
    it('should resolve conflicting padding classes', () => {
      expect(cn('p-4', 'p-6')).toBe('p-6')
    })

    it('should resolve conflicting margin classes', () => {
      expect(cn('mx-4', 'mx-auto')).toBe('mx-auto')
    })

    it('should resolve conflicting text size classes', () => {
      expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })

    it('should resolve conflicting background colors', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    })

    it('should keep non-conflicting Tailwind classes', () => {
      expect(cn('p-4', 'text-lg', 'bg-blue-500')).toBe('p-4 text-lg bg-blue-500')
    })

    it('should handle responsive variants correctly', () => {
      expect(cn('text-sm', 'md:text-lg', 'lg:text-xl')).toBe('text-sm md:text-lg lg:text-xl')
    })

    it('should resolve conflicts in the same variant group', () => {
      expect(cn('md:p-4', 'md:p-6')).toBe('md:p-6')
    })
  })

  describe('Complex scenarios', () => {
    it('should handle arrays of classes', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('should handle nested conditions', () => {
      const isActive = true
      const isLarge = false
      expect(cn('base', isActive && 'active', isLarge ? 'large' : 'small')).toBe(
        'base active small'
      )
    })

    it('should handle real-world component example', () => {
      const isPrimary = true
      const isLarge = true
      const disabled = false

      const result = cn(
        'inline-flex items-center justify-center',
        'font-medium rounded-md',
        'transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-600': isPrimary,
          'bg-gray-200 text-gray-800': !isPrimary,
          'text-lg px-6 py-3': isLarge,
          'text-base px-4 py-2': !isLarge,
          'opacity-50 cursor-not-allowed': disabled,
        }
      )

      expect(result).toContain('bg-blue-500')
      expect(result).toContain('text-lg')
      expect(result).toContain('px-6')
      expect(result).not.toContain('opacity-50')
    })

    it('should override base classes with conditional classes', () => {
      const result = cn('p-4 text-sm', {
        'p-6 text-lg': true,
      })
      expect(result).toContain('text-lg')
      expect(result).toContain('p-6')
      expect(result).not.toContain('p-4')
      expect(result).not.toContain('text-sm')
    })
  })

  describe('Edge cases', () => {
    it('should handle whitespace', () => {
      expect(cn('  foo  ', '  bar  ')).toBe('foo bar')
    })

    it('should handle duplicate classes', () => {
      expect(cn('foo', 'foo', 'bar')).toBe('foo bar')
    })

    it('should handle empty strings', () => {
      expect(cn('foo', '', 'bar')).toBe('foo bar')
    })

    it('should handle falsy values correctly', () => {
      expect(cn('foo', 0, 'bar')).toBe('foo bar')
      expect(cn('foo', '', 'bar')).toBe('foo bar')
      expect(cn('foo', false, 'bar')).toBe('foo bar')
    })
  })

  describe('Type safety', () => {
    it('should accept string inputs', () => {
      expect(() => cn('foo', 'bar')).not.toThrow()
    })

    it('should accept object inputs', () => {
      expect(() => cn({ foo: true, bar: false })).not.toThrow()
    })

    it('should accept array inputs', () => {
      expect(() => cn(['foo', 'bar'])).not.toThrow()
    })

    it('should accept mixed inputs', () => {
      expect(() => cn('base', { active: true }, ['foo', 'bar'])).not.toThrow()
    })
  })
})
