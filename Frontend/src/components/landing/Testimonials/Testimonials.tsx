import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { testimonialItems } from '../data'
import { fadeUpVariants, SectionHeading, SectionShell } from '../shared'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonialItems.length)
    }, 5500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <SectionShell id="testimonials" className="bg-white">
      <div className="space-y-14">
        <SectionHeading
          centered
          eyebrow="Testimonials"
          title="Teams choose AssetFlow because it feels dependable from day one."
          description="A premium enterprise product needs to earn trust quickly, and the interface should feel calm even when the operations behind it are complex."
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm"
        >
          <motion.div
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="flex"
          >
            {testimonialItems.map((item) => (
              <div key={item.name} className="min-w-full px-2 py-2">
                <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-900 bg-blue-900 text-lg font-bold text-white shadow-sm">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">
                        {item.designation} · {item.company}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl">
                    “{item.review}”
                  </p>
                </article>
              </div>
            ))}
          </motion.div>

          <div className="mt-5 flex items-center justify-center gap-2 pb-2">
            {testimonialItems.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-10 bg-blue-900' : 'w-2.5 bg-slate-300'}`}
                aria-label={`Show testimonial from ${item.name}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Testimonials