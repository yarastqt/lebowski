import { useMemo } from 'react'

export interface UseNumberFormatterOptions {
  style: string
  currency?: string
  maximumFractionDigits?: number
}

export function useNumberFormatter(options: UseNumberFormatterOptions) {
  return useMemo(() => {
    return new Intl.NumberFormat('ru', options)
  }, [])
}
