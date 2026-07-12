import { useEffect, useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'

import { statisticItems } from '../data'
import { fadeUpVariants, SectionHeading, SectionShell, staggerVariants } from '../shared'

const formatNumber = (value: number, decimals = 0) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

const CountUpValue = ({ target, suffix, prefix, decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) => {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })

  useEffect(() => {
    if (!inView) return

    let frame = 0
    const duration = 1200
    const start = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * progress)

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    frame = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl">
        {prefix}
        {formatNumber(value, decimals)}
        {suffix}
      </span>
    </div>
  )
}

const Statistics = () => {
  return (
    <SectionShell id="statistics" className="bg-slate-50">
      <div className="space-y-14">
        <SectionHeading
          centered
          eyebrow="Statistics"
          title="Trusted at scale by organizations that expect reliability."
          description="The platform is designed to support large inventories, multiple departments, and always-on operations without adding clutter."
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {statisticItems.map((item) => (
            <motion.article
              key={item.label}
              variants={fadeUpVariants}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <CountUpValue {...item} />
              <p className="mt-4 text-base font-medium text-slate-500">{item.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Statistics