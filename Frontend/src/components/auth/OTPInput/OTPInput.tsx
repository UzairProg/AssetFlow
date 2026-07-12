import { useEffect, useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'

import { cn } from '../../../components/landing/shared'

type OTPInputProps = {
  value: string
  onChange: (value: string) => void
  length?: number
  error?: string
  label: string
}

const OTPInput = ({ value, onChange, length = 6, error, label }: OTPInputProps) => {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const digits = useMemo(() => Array.from({ length }, (_, index) => value[index] ?? ''), [length, value])

  useEffect(() => {
    if (value.length < length) return
    const firstEmptyIndex = digits.findIndex((digit) => digit === '')
    if (firstEmptyIndex >= 0) refs.current[firstEmptyIndex]?.focus()
  }, [digits, length, value.length])

  const focusIndex = (index: number) => refs.current[index]?.focus()

  const handleChange = (index: number, nextValue: string) => {
    const sanitized = nextValue.replace(/\D/g, '').slice(0, 1)
    const nextDigits = [...digits]
    nextDigits[index] = sanitized
    onChange(nextDigits.join('').slice(0, length))
    if (sanitized && index < length - 1) focusIndex(index + 1)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusIndex(index - 1)
    }
    if (event.key === 'ArrowLeft' && index > 0) focusIndex(index - 1)
    if (event.key === 'ArrowRight' && index < length - 1) focusIndex(index + 1)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex flex-wrap gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              refs.current[index] = element
            }}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onFocus={(event) => event.currentTarget.select()}
            inputMode="numeric"
            maxLength={1}
            className={cn(
              'h-14 w-12 rounded-2xl border border-slate-300 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 sm:h-16 sm:w-14',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/15',
            )}
            aria-label={`${label} digit ${index + 1}`}
          />
        ))}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

export default OTPInput
