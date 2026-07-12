import type { PropsWithChildren } from 'react'

import { motion, type Variants } from 'framer-motion'

export const containerClass = 'mx-auto max-w-7xl px-6 lg:px-8'
export const sectionClass = 'py-24 sm:py-28 scroll-mt-24'

export const cn = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ')

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

export const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

type SectionShellProps = PropsWithChildren<{
  id?: string
  className?: string
}>

export const SectionShell = ({ id, className, children }: SectionShellProps) => (
  <section id={id} className={cn(sectionClass, className)}>
    <div className={containerClass}>{children}</div>
  </section>
)

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description: string
  centered?: boolean
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) => (
  <motion.div
    variants={fadeUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    className={cn('max-w-3xl space-y-4', centered && 'mx-auto text-center')}
  >
    {eyebrow ? (
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    <p className="text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
  </motion.div>
)

type BrandMarkProps = {
  compact?: boolean
}

export const BrandMark = ({ compact = false }: BrandMarkProps) => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-900 bg-blue-900 text-sm font-bold text-white shadow-sm">
      AF
    </div>
    <div className="leading-tight">
      <div className="text-base font-semibold text-blue-900">AssetFlow</div>
      {!compact ? (
        <p className="text-xs text-slate-500">Enterprise Asset Intelligence</p>
      ) : null}
    </div>
  </div>
)