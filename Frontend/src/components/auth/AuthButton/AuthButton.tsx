import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { motion } from 'framer-motion'

import { cn } from '../../../components/landing/shared'

type AuthButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean
    variant?: 'primary' | 'secondary'
    loading?: boolean
  }
>

const AuthButton = ({
  children,
  className,
  fullWidth = false,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: AuthButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70'

  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-900 text-white shadow-md hover:bg-blue-800 hover:shadow-xl'
      : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:text-blue-900'

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variantClasses, fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  )
}

export default AuthButton
