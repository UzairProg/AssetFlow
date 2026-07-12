import { motion } from 'framer-motion'

import { benefitItems } from '../data'
import { fadeUpVariants, SectionHeading, SectionShell, staggerVariants } from '../shared'

const WhyChooseUs = () => {
  return (
    <SectionShell id="why-choose-us" className="bg-white">
      <div className="space-y-14">
        <SectionHeading
          eyebrow="Why Choose AssetFlow"
          title="A measured enterprise design built for control, speed, and confidence."
          description="Every screen is structured to reduce ambiguity, surface status instantly, and support disciplined operational workflows."
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-10"
        >
          {benefitItems.map((item, index) => {
            const Icon = item.icon
            const isReversed = index % 2 === 1

            return (
              <motion.div
                key={item.title}
                variants={fadeUpVariants}
                className="grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm lg:grid-cols-2 lg:p-8"
              >
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                    <Icon className="text-blue-900" />
                    {item.metric}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                    {item.description}
                  </p>
                </div>

                <div className={isReversed ? 'lg:order-1' : ''}>
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Enterprise signal</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{item.title}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-sm">
                        <Icon />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {['Policy aligned', 'Auditable', 'Scalable'].map((label) => (
                        <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                          <div className="mt-4 h-2 rounded-full bg-white shadow-inner">
                            <div className="h-2 w-[82%] rounded-full bg-blue-900" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                        <span>Operational progress</span>
                        <span>92%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white">
                        <div className="h-2 w-[92%] rounded-full bg-blue-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default WhyChooseUs