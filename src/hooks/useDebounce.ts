import { useState, useEffect } from 'react'

export const useDebounce = (target: string, delay: number) => {
  const [debounceTarget, setDebounceTarget] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTarget(target)
    }, delay)

    return () => clearTimeout(timer)
  })

  return debounceTarget
}
